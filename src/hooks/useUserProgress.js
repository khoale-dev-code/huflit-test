import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { normalizeScore } from '../utils/scoreUtils';

// ─────────────────────────────────────────────
// Progressive XP Level System
// Level N requires: 100 + (N-1)*50 XP to complete
// L1→L2: 150 XP  |  L2→L3: 200 XP  |  L3→L4: 250 XP ...
// ─────────────────────────────────────────────
export function getXpRequiredForLevel(level) {
  // XP needed to go FROM level N to level N+1
  return 100 + (level - 1) * 50;
}

export function getXpForLevel(level) {
  // Cumulative XP to START level N
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXpRequiredForLevel(i);
  }
  return total;
}

// Given total XP, compute level and progress within that level
export function computeLevelFromXp(totalXp) {
  let level = 1;
  let remaining = totalXp;
  while (true) {
    const required = getXpRequiredForLevel(level);
    if (remaining < required) break;
    remaining -= required;
    level++;
  }
  const xpRequired = getXpRequiredForLevel(level);
  return {
    level,
    xpIntoLevel:          remaining,
    xpRequiredForLevel:   xpRequired,
    progressPercent:      Math.min(100, Math.round((remaining / xpRequired) * 100)),
  };
}

// ─────────────────────────────────────────────
// Exam Unlock Rules
//   Level 1-2  → Exam 1-2
//   Level 3-5  → Exam 1-4
//   Level 6-8  → Exam 1-6
//   Level 9-11 → Exam 1-8
//   Level 12+  → All exams
// ─────────────────────────────────────────────
export function getUnlockedExams(level) {
  if (level >= 12) return Infinity;
  if (level >= 9)  return 8;
  if (level >= 6)  return 6;
  if (level >= 3)  return 4;
  return 2;
}

export function getNextUnlockLevel(level) {
  if (level >= 12) return null;
  if (level >= 9)  return 12;
  if (level >= 6)  return 9;
  if (level >= 3)  return 6;
  return 3;
}

export function getNextUnlockExamCount(level) {
  if (level >= 12) return null;
  if (level >= 9)  return Infinity;
  if (level >= 6)  return 8;
  if (level >= 3)  return 6;
  return 4;
}

// ─────────────────────────────────────────────
// Firestore Timestamp / pending-write → JS Date
// ─────────────────────────────────────────────
function resolveDate(raw) {
  const ts = raw?.completedAt;
  if (ts instanceof Timestamp)                     return ts.toDate();
  if (ts && typeof ts === 'object' && ts.seconds)  return new Date(ts.seconds * 1000);
  if (raw?.clientTs) {
    const d = new Date(raw.clientTs);
    if (!isNaN(d)) return d;
  }
  return new Date();
}

// ─────────────────────────────────────────────
// Streak từ mảng JS Date[]
// ─────────────────────────────────────────────
function calcStreak(dates) {
  if (!dates.length) return 0;
  const toKey = (d) => d.toISOString().split('T')[0];
  const days  = [...new Set(dates.map(toKey))].sort().reverse();
  const today     = toKey(new Date());
  const yesterday = toKey(new Date(Date.now() - 864e5));
  if (days[0] !== today && days[0] !== yesterday) return 0;
  let streak = 0;
  let cursor = new Date(days[0] + 'T12:00:00Z');
  for (const day of days) {
    if (toKey(cursor) === day) {
      streak++;
      cursor = new Date(cursor.getTime() - 864e5);
    } else break;
  }
  return streak;
}

// ─────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────
export const useUserProgress = () => {
  const [firebaseUser, setFirebaseUser] = useState(undefined);
  const [progress,     setProgress]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  // ── Auth ──────────────────────────────────
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user ?? null);
    });
    return unsub;
  }, []);

  const isLoaded = firebaseUser !== undefined;

  // ── currentUser ───────────────────────────
  const currentUser = useMemo(() => {
    if (!firebaseUser) return null;
    return {
      id:          firebaseUser.uid,
      firebaseUid: firebaseUser.uid,
      email:       firebaseUser.email,
      name:        firebaseUser.displayName
                     || firebaseUser.email?.split('@')[0]
                     || 'Anonymous',
      photoURL:    firebaseUser.photoURL,
      provider:    'firebase',
    };
  }, [firebaseUser]);

  // ── Realtime Firestore ────────────────────
  useEffect(() => {
    if (firebaseUser === undefined) return;
    if (!firebaseUser) {
      setProgress([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, 'userProgress'),
      where('firebaseUid', '==', firebaseUser.uid),
      orderBy('completedAt', 'desc'),
      limit(200)
    );

    const unsub = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const raw = doc.data();
          return {
            id:          doc.id,
            isPending:   doc.metadata.hasPendingWrites,
            ...raw,
            score:       normalizeScore(raw),
            completedAt: resolveDate(raw),
          };
        });
        data.sort((a, b) => b.completedAt - a.completedAt);
        setProgress(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('[useUserProgress] snapshot error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsub;
  }, [firebaseUser]);

  // ── Analytics ─────────────────────────────
  const analytics = useMemo(() => {
    const base = {
      totalAttempts: 0, bestScore: 0, averageScore: 0,
      streak: 0, accuracy: 0, xp: 0,
      level: 1, xpIntoLevel: 0,
      xpRequiredForLevel: getXpRequiredForLevel(1),
      levelProgressPercent: 0,
      todayXP: 0, dailyGoal: 150, trend: 0, weaknesses: [],
      unlockedExams: 2, nextUnlockLevel: 3, nextUnlockExamCount: 4,
    };
    if (!progress.length) return base;

    const toKey  = (d) => d.toISOString().split('T')[0];
    const today  = toKey(new Date());
    const scores = progress.map((p) => p.score);
    const total  = scores.reduce((a, b) => a + b, 0);

    // Total XP
    const totalXp = progress.length * 50 + Math.floor(total / 10);

    // Progressive level
    const lvData = computeLevelFromXp(totalXp);

    // Daily goal scales with level
    const dailyGoal = Math.min(500, 100 + (lvData.level - 1) * 25);

    // Today XP
    const todayXP = progress
      .filter((p) => toKey(p.completedAt) === today)
      .length * 50;

    // Streak
    const streak = calcStreak(progress.map((p) => p.completedAt));

    // Trend
    const byDay = progress.reduce((acc, p) => {
      const k = toKey(p.completedAt);
      if (!acc[k]) acc[k] = { sum: 0, n: 0 };
      acc[k].sum += p.score;
      acc[k].n   += 1;
      return acc;
    }, {});

    const dailyAvgs = Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, v]) => v.sum / v.n);

    const last7 = dailyAvgs.slice(-7);
    const prev7 = dailyAvgs.slice(-14, -7);
    const avg7  = last7.reduce((a, b) => a + b, 0) / (last7.length || 1);
    const avgP  = prev7.length
      ? prev7.reduce((a, b) => a + b, 0) / prev7.length
      : avg7;
    const trend = Math.round((avg7 - avgP) * 10) / 10;

    // Weaknesses
    const partStats = progress.reduce((acc, p) => {
      const k = `Part ${p.part ?? '?'}`;
      if (!acc[k]) acc[k] = { sum: 0, n: 0 };
      acc[k].sum += p.score;
      acc[k].n   += 1;
      return acc;
    }, {});

    const weaknesses = Object.entries(partStats)
      .map(([name, s]) => ({ name, accuracy: Math.round(s.sum / s.n) }))
      .filter((w) => w.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3);

    return {
      totalAttempts:        progress.length,
      bestScore:            Math.max(...scores),
      averageScore:         Math.round(total / progress.length),
      streak,
      accuracy:             Math.round(total / progress.length),
      todayXP,
      dailyGoal,
      trend,
      xp:                   totalXp,
      level:                lvData.level,
      xpIntoLevel:          lvData.xpIntoLevel,
      xpRequiredForLevel:   lvData.xpRequiredForLevel,
      levelProgressPercent: lvData.progressPercent,
      unlockedExams:        getUnlockedExams(lvData.level),
      nextUnlockLevel:      getNextUnlockLevel(lvData.level),
      nextUnlockExamCount:  getNextUnlockExamCount(lvData.level),
      weaknesses,
    };
  }, [progress]);

  // ── chartData ─────────────────────────────
  const chartData = useMemo(() => {
    if (!progress.length) return [];
    const toKey = (d) => d.toISOString().split('T')[0];
    const byDay = progress.reduce((acc, p) => {
      const k = toKey(p.completedAt);
      if (!acc[k]) acc[k] = { sum: 0, n: 0, best: 0 };
      acc[k].sum  += p.score;
      acc[k].n    += 1;
      acc[k].best  = Math.max(acc[k].best, p.score);
      return acc;
    }, {});

    return Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([date, v]) => ({
        date,
        name:  new Date(date + 'T12:00:00').toLocaleDateString('vi-VN', {
          day: '2-digit', month: '2-digit',
        }),
        avg:   Math.round(v.sum / v.n),
        best:  v.best,
        count: v.n,
      }));
  }, [progress]);

  // ── saveProgress ──────────────────────────
  const saveProgress = useCallback(async (testData) => {
    if (!firebaseUser) {
      console.warn('[saveProgress] no firebase user');
      return false;
    }
    try {
      const numericScore = normalizeScore(testData);
      const payload = {
        ...testData,
        score:       numericScore,
        firebaseUid: firebaseUser.uid,
        clientTs:    new Date().toISOString(),
        createdAt:   serverTimestamp(),
        completedAt: serverTimestamp(),
      };
      if (testData.score && typeof testData.score === 'object') {
        payload.correct = testData.score.correct ?? testData.correct;
        payload.total   = testData.score.total   ?? testData.total;
      }
      await addDoc(collection(db, 'userProgress'), payload);
      return true;
    } catch (err) {
      console.error('[saveProgress] error:', err);
      setError(err.message);
      return false;
    }
  }, [firebaseUser]);

  return {
    progress,
    loading,
    error,
    isLoaded,
    currentUser,
    analytics,
    chartData,
    saveProgress,
  };
};

export default useUserProgress;
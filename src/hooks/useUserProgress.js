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
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { normalizeScore } from '../utils/scoreUtils'; // ✅ Dùng chung 1 nguồn

// ============================================
// 🎣 HOOK: useUserProgress
// ============================================

export const useUserProgress = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1️⃣ Auth State
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setIsLoaded(true);
    });
    return unsubscribe;
  }, []);

  // 2️⃣ Current User Info
  const currentUser = useMemo(() => {
    if (!firebaseUser) return null;
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name:
        firebaseUser.displayName ||
        firebaseUser.email?.split('@')[0] ||
        'Anonymous',
      photoURL: firebaseUser.photoURL,
    };
  }, [firebaseUser]);

  // 3️⃣ Real-time Firestore Query
  useEffect(() => {
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

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const raw = doc.data();
          return {
            id: doc.id,
            ...raw,
            score: normalizeScore(raw), // ✅ Normalize khi đọc
            completedAt: raw.completedAt?.toDate?.() || new Date(),
          };
        });
        setProgress(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [firebaseUser]);

  // 4️⃣ Analytics Calculation
  const analytics = useMemo(() => {
    const baseStats = {
      totalAttempts: 0,
      bestScore: 0,
      averageScore: 0,
      streak: 0,
      accuracy: 0,
      xp: 0,
      level: 1,
      todayXP: 0,
      dailyGoal: 150,
      trend: 0,
      weaknesses: [],
    };

    if (!progress.length) return baseStats;

    const scores = progress.map((p) => p.score); // đã normalized
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const avgScore = totalScore / progress.length;

    // Streak
    const uniqueDates = [
      ...new Set(progress.map((p) => p.completedAt.toDateString())),
    ];
    let streak = 0;
    const today = new Date().toDateString();
    for (let i = 0; i < uniqueDates.length; i++) {
      const diff = Math.floor(
        (new Date(today) - new Date(uniqueDates[i])) / (1000 * 60 * 60 * 24)
      );
      if (diff === streak) streak++;
      else break;
    }

    // Today XP
    const todayXP =
      progress.filter((p) => p.completedAt.toDateString() === today).length * 50;

    // Trend (7 ngày gần nhất vs 7 ngày trước)
    const last7 = scores.slice(0, 7);
    const prev7 = scores.slice(7, 14);
    const avgLast7 = last7.reduce((a, b) => a + b, 0) / (last7.length || 1);
    const avgPrev7 =
      prev7.length > 0
        ? prev7.reduce((a, b) => a + b, 0) / prev7.length
        : avgLast7;

    // Weaknesses
    const partStats = progress.reduce((acc, curr) => {
      const key = `Part ${curr.part || 0}`;
      if (!acc[key]) acc[key] = { total: 0, count: 0 };
      acc[key].total += curr.score || 0;
      acc[key].count += 1;
      return acc;
    }, {});

    const weaknesses = Object.entries(partStats)
      .map(([name, stat]) => ({ name, accuracy: stat.total / stat.count }))
      .filter((w) => w.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3);

    return {
      totalAttempts: progress.length,
      bestScore: Math.max(...scores),
      averageScore: Math.round(avgScore),
      streak,
      accuracy: Math.round(avgScore),
      todayXP,
      dailyGoal: 150,
      trend: Math.round((avgLast7 - avgPrev7) * 10) / 10,
      xp: progress.length * 50 + Math.floor(totalScore / 10),
      level: Math.floor((progress.length * 50) / 300) + 1,
      weaknesses,
    };
  }, [progress]);

  // 5️⃣ Save Progress
  const saveProgress = useCallback(
    async (testData) => {
      if (!firebaseUser) return false;

      try {
        // ✅ Normalize score TRƯỚC KHI LƯU → đảm bảo luôn là number
        const numericScore = normalizeScore(testData);

        const normalizedData = {
          ...testData,
          // Ghi đè score thành number sạch, loại bỏ object score cũ
          score: numericScore,
          // Nếu testData.score là object, trích xuất thêm correct/total để dễ debug
          ...(testData.score && typeof testData.score === 'object'
            ? {
                correct: testData.score.correct ?? testData.correct,
                total: testData.score.total ?? testData.total,
              }
            : {}),
          firebaseUid: firebaseUser.uid,
          createdAt: serverTimestamp(),
          completedAt: serverTimestamp(),
        };

        await addDoc(collection(db, 'userProgress'), normalizedData);
        return true;
      } catch (err) {
        setError(err.message);
        console.error('Error saving progress:', err);
        return false;
      }
    },
    [firebaseUser]
  );

  return {
    progress,
    loading,
    error,
    currentUser,
    isLoaded,
    analytics,
    saveProgress,
  };
};

export default useUserProgress;
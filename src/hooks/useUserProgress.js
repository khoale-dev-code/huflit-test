import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const useUserProgress = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setIsLoaded(true);
    });
    return unsubscribe;
  }, []);

  // 2. Thông tin người dùng hiện tại
  const currentUser = useMemo(() => {
    if (!firebaseUser) return null;
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Anonymous',
      photoURL: firebaseUser.photoURL,
    };
  }, [firebaseUser]);

  // 3. Lắng nghe dữ liệu Firestore (Realtime)
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
      orderBy('completedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const raw = doc.data();
          return {
            id: doc.id,
            ...raw,
            completedAt: raw.completedAt?.toDate?.() || new Date(),
          };
        });
        setProgress(data);
        setLoading(false);
      }, (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [firebaseUser]);

  // 4. Engine tính toán Analytics (Advanced)
  // Biến này là một Object, KHÔNG PHẢI hàm.
  const analytics = useMemo(() => {
    const baseStats = {
      totalAttempts: 0, bestScore: 0, averageScore: 0, streak: 0, 
      accuracy: 0, xp: 0, level: 1, todayXP: 0, dailyGoal: 150, trend: 0, weaknesses: []
    };

    if (!progress.length) return baseStats;

    const scores = progress.map(p => Number(p.score) || 0);
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const avgScore = totalScore / progress.length;

    // Tính Streak
    const uniqueDates = [...new Set(progress.map(p => p.completedAt.toDateString()))];
    let streak = 0;
    const today = new Date().toDateString();
    for (let i = 0; i < uniqueDates.length; i++) {
      const checkDate = new Date(uniqueDates[i]);
      const diff = Math.floor((new Date(today) - checkDate) / (1000 * 60 * 60 * 24));
      if (diff === streak) streak++; else break;
    }

    // Tính Today XP
    const todayXP = progress
      .filter(p => p.completedAt.toDateString() === today)
      .length * 50;

    // Tính Trend (So sánh 7 bài gần nhất vs 7 bài trước đó)
    const last7 = scores.slice(0, 7);
    const prev7 = scores.slice(7, 14);
    const avgLast7 = last7.length ? last7.reduce((a,b)=>a+b,0)/last7.length : 0;
    const avgPrev7 = prev7.length ? prev7.reduce((a,b)=>a+b,0)/prev7.length : 0;
    const trend = avgLast7 - avgPrev7;

    // Điểm yếu
    const partStats = progress.reduce((acc, curr) => {
      const key = `Part ${curr.part}`;
      if (!acc[key]) acc[key] = { total: 0, count: 0 };
      acc[key].total += Number(curr.score) || 0;
      acc[key].count += 1;
      return acc;
    }, {});

    const weaknesses = Object.entries(partStats)
      .map(([name, stat]) => ({ name, accuracy: stat.total / stat.count }))
      .filter(w => w.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3);

    return {
      totalAttempts: progress.length,
      bestScore: Math.max(...scores),
      averageScore: avgScore,
      streak,
      accuracy: avgScore,
      todayXP,
      dailyGoal: 150,
      trend,
      xp: progress.length * 50 + Math.floor(totalScore / 10),
      level: Math.floor((progress.length * 50) / 300) + 1,
      weaknesses
    };
  }, [progress]);

  const saveProgress = useCallback(async (testData) => {
    if (!firebaseUser) return false;
    try {
      await addDoc(collection(db, 'userProgress'), {
        firebaseUid: firebaseUser.uid,
        ...testData,
        createdAt: serverTimestamp(),
        completedAt: serverTimestamp(),
      });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [firebaseUser]);

  return { progress, loading, error, currentUser, isLoaded, analytics, saveProgress };
};
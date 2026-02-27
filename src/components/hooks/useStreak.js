import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

export const useStreak = () => {
  const { user } = useFirebaseAuth();
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setStreak(0);
      setLoading(false);
      return;
    }

    // ✅ Query chỉ với 1 filter - KHÔNG cần orderBy (tránh composite index)
    const q = query(
      collection(db, 'userProgress'),
      where('firebaseUid', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const dates = snapshot.docs
          .map(doc => {
            const data = doc.data();
            const date = data.completedAt?.toDate?.() || new Date(data.completedAt);
            return date instanceof Date ? date : new Date(date);
          })
          .filter(d => !isNaN(d.getTime()))
          .sort((a, b) => b - a); // ✅ Sắp xếp trong JS thay vì Firestore

        let currentStreak = 0;
        if (dates.length > 0) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          for (let i = 0; i < dates.length; i++) {
            const date = new Date(dates[i]);
            date.setHours(0, 0, 0, 0);
            const daysDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));

            if (daysDiff === currentStreak) {
              currentStreak++;
            } else if (daysDiff > currentStreak) {
              break;
            }
          }
        }
        setStreak(currentStreak);
        setLoading(false);
      },
      (error) => {
        console.error('❌ Streak query error:', error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { streak, loading };
};
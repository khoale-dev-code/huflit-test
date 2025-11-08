import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export const usePreviousAttempts = (selectedExam, selectedPart) => {
  const { user: clerkUser, isLoaded } = useUser();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !clerkUser || !selectedExam || !selectedPart) {
      setAttempts([]);
      setLoading(false);
      return;
    }

    console.log('📊 Fetching previous attempts for:', { selectedExam, selectedPart });

    try {
      const q = query(
        collection(db, 'userProgress'),
        where('clerkId', '==', clerkUser.id),
        where('exam', '==', selectedExam),
        where('part', '==', selectedPart)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            completedAt: doc.data().completedAt?.toDate?.() || new Date(doc.data().completedAt),
          }));

          // Sort by completedAt in memory (no need for Firestore index)
          const sortedData = data.sort((a, b) => {
            const dateA = a.completedAt instanceof Date ? a.completedAt : new Date(0);
            const dateB = b.completedAt instanceof Date ? b.completedAt : new Date(0);
            return dateB - dateA; // Descending (newest first)
          });

          console.log('✅ Previous attempts loaded:', sortedData.length);
          setAttempts(sortedData);
          setLoading(false);
        },
        (err) => {
          console.error('❌ Error fetching attempts:', err.code, err.message);
          setAttempts([]);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error('❌ Error setting up attempts listener:', err);
      setAttempts([]);
      setLoading(false);
    }
  }, [clerkUser, isLoaded, selectedExam, selectedPart]);

  return { attempts, loading };
};
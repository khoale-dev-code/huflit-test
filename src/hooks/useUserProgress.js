import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const useUserProgress = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Subscribe to user's progress
  useEffect(() => {
    if (!isLoaded || !clerkUser) {
      setProgress([]);
      return;
    }

    try {
      const q = query(
        collection(db, 'userProgress'),
        where('clerkId', '==', clerkUser.id)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            completedAt: doc.data().completedAt?.toDate?.() || doc.data().completedAt,
          }));
          setProgress(data);
          setError(null);
        },
        (err) => {
          console.error('Snapshot listener error:', err.code, err.message);
          if (err.code === 'permission-denied') {
            console.warn('Permission denied for reading progress');
          }
          setError(null); // Don't show permission errors in UI
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error('Error setting up listener:', err);
      setError(null);
    }
  }, [clerkUser, isLoaded]);

  // Save or update progress
  const saveProgress = async (testData) => {
    if (!clerkUser) {
      console.warn('User not authenticated');
      return false;
    }

    try {
      setLoading(true);

      const progressData = {
        clerkId: clerkUser.id,
        userEmail: clerkUser.primaryEmailAddress?.emailAddress,
        userName: clerkUser.firstName || 'Anonymous',
        exam: testData.exam,
        part: testData.part,
        score: testData.score,
        answers: testData.answers,
        totalQuestions: testData.totalQuestions,
        isDraft: testData.isDraft || false,
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Check if progress exists
      const existingQuery = query(
        collection(db, 'userProgress'),
        where('clerkId', '==', clerkUser.id),
        where('exam', '==', testData.exam),
        where('part', '==', testData.part)
      );

      const existingDocs = await getDocs(existingQuery);

      if (existingDocs.size > 0) {
        const existingDoc = existingDocs.docs[0];
        await updateDoc(doc(db, 'userProgress', existingDoc.id), progressData);
        console.log('✅ Progress updated:', existingDoc.id);
      } else {
        const docRef = await addDoc(collection(db, 'userProgress'), progressData);
        console.log('✅ Progress saved:', docRef.id);
      }

      setError(null);
      return true;
    } catch (err) {
      console.error('Error saving progress:', err.code, err.message);
      if (err.code === 'permission-denied') {
        setError('Cannot save progress - check Firestore rules');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    progress,
    loading,
    error,
    saveProgress,
  };
};
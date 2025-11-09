import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export const usePreviousAttempts = (selectedExam, selectedPart) => {
  const { user: clerkUser, isLoaded } = useUser();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const unsubscribeRef = useRef(null);
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  // Fetch attempts when exam/part/user changes
  useEffect(() => {
    if (!isLoaded || !clerkUser?.id) {
      if (isMountedRef.current) {
        setAttempts([]);
        setLoading(false);
        setError(null);
      }
      return;
    }

    // If no exam/part selected, don't fetch
    if (!selectedExam || !selectedPart) {
      if (isMountedRef.current) {
        setAttempts([]);
        setLoading(false);
        setError(null);
      }
      return;
    }

    // Cleanup previous subscription
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    try {
      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
      }

      console.log('📊 Fetching previous attempts for:', {
        exam: selectedExam,
        part: selectedPart,
        userId: clerkUser.id,
      });

      // Query: Get all attempts for this exam/part by this user
      // Note: This query needs an index if Firestore hasn't created one
      // Firestore will suggest creating index if needed
      const q = query(
        collection(db, 'userProgress'),
        where('clerkId', '==', clerkUser.id),
        where('exam', '==', selectedExam),
        where('part', '==', selectedPart)
      );

      // Subscribe to real-time updates
      unsubscribeRef.current = onSnapshot(
        q,
        (snapshot) => {
          if (!isMountedRef.current) return;

          try {
            // Map documents to objects
            const data = snapshot.docs.map(doc => {
              const docData = doc.data();
              return {
                id: doc.id,
                ...docData,
                // Ensure completedAt is a Date object
                completedAt: docData.completedAt?.toDate?.() || 
                            (docData.completedAt ? new Date(docData.completedAt) : new Date()),
              };
            });

            // Sort by completedAt descending (newest first)
            const sortedData = data.sort((a, b) => {
              const dateA = a.completedAt instanceof Date ? a.completedAt.getTime() : 0;
              const dateB = b.completedAt instanceof Date ? b.completedAt.getTime() : 0;
              return dateB - dateA;
            });

            console.log('✅ Previous attempts loaded:', sortedData.length);
            setAttempts(sortedData);
            setError(null);
            setLoading(false);
          } catch (err) {
            console.error('Error processing attempts:', err);
            if (isMountedRef.current) {
              setError('Error processing attempts');
              setLoading(false);
            }
          }
        },
        (err) => {
          if (!isMountedRef.current) return;

          console.error('❌ Error fetching attempts:', err.code, err.message);

          // Handle different error types
          if (err.code === 'permission-denied') {
            console.error('   - Check Firestore Rules for READ access');
            console.error('   - Ensure clerkId == request.auth.uid check');
            setError('Permission denied - check Rules');
          } else if (err.code === 'failed-precondition') {
            console.error('   - Query needs an index');
            console.error('   - Click link in Firebase console to create index');
            setError('Index needed - check Firebase console');
          } else if (err.code === 'unavailable') {
            console.error('   - Firestore temporarily unavailable');
            setError('Firestore unavailable - try again');
          } else {
            setError(`Error: ${err.message}`);
          }

          setLoading(false);
          setAttempts([]);
        }
      );
    } catch (err) {
      console.error('❌ Error setting up attempts listener:', err);
      if (isMountedRef.current) {
        setError('Error setting up listener');
        setLoading(false);
        setAttempts([]);
      }
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [clerkUser?.id, isLoaded, selectedExam, selectedPart]);

  return {
    attempts,
    loading,
    error,
  };
};
import { useState, useEffect, useCallback, useRef } from 'react';
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
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const useUserProgress = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const [progress, setProgress] = useState([]);
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

  // ============================================
  // SUBSCRIBE TO USER PROGRESS
  // ============================================
  useEffect(() => {
    if (!isLoaded || !clerkUser?.id) {
      if (isMountedRef.current) {
        setProgress([]);
        setError(null);
      }
      return;
    }

    // Cleanup previous subscription
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    try {
      console.log('📊 Setting up progress listener for:', clerkUser.id);

      // Query to get all documents where clerkId matches user's ID
      const q = query(
        collection(db, 'userProgress'),
        where('clerkId', '==', clerkUser.id)
      );

      // Listen for real-time updates
      unsubscribeRef.current = onSnapshot(
        q,
        (snapshot) => {
          if (!isMountedRef.current) return;

          try {
            const data = snapshot.docs.map(doc => {
              const docData = doc.data();
              return {
                id: doc.id,
                ...docData,
                completedAt: docData.completedAt?.toDate?.() || docData.completedAt,
                updatedAt: docData.updatedAt?.toDate?.() || docData.updatedAt,
              };
            });

            console.log('✅ Progress loaded:', data.length, 'items');
            setProgress(data);
            setError(null);
          } catch (err) {
            console.error('Error processing snapshot:', err);
            if (isMountedRef.current) {
              setError('Error processing progress data');
            }
          }
        },
        (err) => {
          if (!isMountedRef.current) return;

          console.error('❌ Snapshot listener error:', err.code, err.message);
          
          if (err.code === 'permission-denied') {
            console.error('⚠️ Permission denied reading progress');
            console.error('   - Check Firestore Rules');
            console.error('   - Verify clerkId matches request.auth.uid');
            setError('Permission denied reading progress');
          } else if (err.code === 'unauthenticated') {
            console.warn('⚠️ User not authenticated');
            setError('User not authenticated');
          } else {
            console.warn(`⚠️ Listener error: ${err.message}`);
          }
        }
      );
    } catch (err) {
      console.error('Error setting up listener:', err);
      if (isMountedRef.current) {
        setError('Error setting up listener');
      }
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [clerkUser?.id, isLoaded]);

  // ============================================
  // SAVE PROGRESS
  // ============================================
  const saveProgress = useCallback(async (testData) => {
    if (!isLoaded || !clerkUser?.id) {
      console.warn('⚠️ User not loaded or authenticated');
      setError('User not authenticated');
      return false;
    }

    try {
      setLoading(true);
      console.log('💾 Saving progress:', testData);

      // Normalize answers - handle both object and array formats
      let answersData = testData.answers || [];
      if (typeof testData.answers === 'object' && !Array.isArray(testData.answers)) {
        // If it's an object, convert to array
        answersData = Object.entries(testData.answers).map(([questionId, answerIndex]) => ({
          questionId,
          answerIndex,
        }));
      }

      // Build progress data
      const progressData = {
        // CRITICAL: clerkId MUST match clerkUser.id for Rules to allow write
        clerkId: clerkUser.id,
        
        // User info
        userEmail: clerkUser.primaryEmailAddress?.emailAddress || '',
        userName: clerkUser.firstName || 'Anonymous',
        
        // Test info
        exam: String(testData.exam || '').trim(),
        part: String(testData.part || '').trim(),
        score: Math.round(Number(testData.score || 0)),
        answers: answersData, // Already array or converted to array
        totalQuestions: Number(testData.totalQuestions || 0),
        isDraft: testData.isDraft || false,
        
        // Timestamps
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Validate required fields
      if (!progressData.exam || !progressData.part) {
        throw new Error('Missing required fields: exam or part');
      }

      if (progressData.score < 0 || progressData.score > 100) {
        throw new Error('Score must be between 0 and 100');
      }

      if (!Array.isArray(progressData.answers)) {
        throw new Error('Answers must be an array');
      }

      if (progressData.totalQuestions <= 0) {
        throw new Error('Total questions must be greater than 0');
      }

      // Check if document already exists for this exam/part
      const existingQuery = query(
        collection(db, 'userProgress'),
        where('clerkId', '==', clerkUser.id),
        where('exam', '==', progressData.exam),
        where('part', '==', progressData.part)
      );

      const existingDocs = await getDocs(existingQuery);

      if (existingDocs.size > 0) {
        // UPDATE existing document
        const existingDoc = existingDocs.docs[0];
        await updateDoc(
          doc(db, 'userProgress', existingDoc.id),
          progressData
        );
        console.log('✅ Progress updated:', existingDoc.id);
      } else {
        // CREATE new document
        const docRef = await addDoc(
          collection(db, 'userProgress'),
          progressData
        );
        console.log('✅ Progress saved:', docRef.id);
      }

      if (isMountedRef.current) {
        setError(null);
      }
      return true;
    } catch (err) {
      console.error('❌ Error saving progress:', err.code || 'unknown', err.message);
      
      let errorMsg = 'Error saving progress';
      
      if (err.code === 'permission-denied') {
        errorMsg = 'Permission denied - check Firestore Rules';
        console.error('   - Ensure clerkId = request.auth.uid in Rules');
        console.error('   - Ensure all required fields are present');
      } else if (err.code === 'invalid-argument') {
        errorMsg = `Invalid data: ${err.message}`;
      }
      
      if (isMountedRef.current) {
        setError(errorMsg);
      }
      
      return false;
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [clerkUser?.id, isLoaded]);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const getBestScore = useCallback((exam, part) => {
    const matching = progress.filter(p => p.exam === exam && p.part === part);
    if (matching.length === 0) return null;
    return Math.max(...matching.map(p => p.score || 0));
  }, [progress]);

  const getAttemptHistory = useCallback((exam, part) => {
    return progress
      .filter(p => p.exam === exam && p.part === part)
      .sort((a, b) => {
        const timeA = a.completedAt?.getTime?.() || 0;
        const timeB = b.completedAt?.getTime?.() || 0;
        return timeB - timeA;
      });
  }, [progress]);

  const getStats = useCallback(() => {
    const exams = new Set(progress.map(p => p.exam));
    const totalAttempts = progress.length;
    const averageScore = totalAttempts > 0 
      ? Math.round(progress.reduce((sum, p) => sum + (p.score || 0), 0) / totalAttempts)
      : 0;
    const bestScore = totalAttempts > 0
      ? Math.max(...progress.map(p => p.score || 0))
      : 0;

    return {
      totalAttempts,
      uniqueExams: exams.size,
      averageScore,
      bestScore,
    };
  }, [progress]);

  return {
    // Data
    progress,
    loading,
    error,
    
    // Methods
    saveProgress,
    getBestScore,
    getAttemptHistory,
    getStats,
    
    // Status
    isAuthenticated: isLoaded && !!clerkUser?.id,
  };
};
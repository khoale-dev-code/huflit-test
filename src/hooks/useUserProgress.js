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
import { auth, db } from '../config/firebase';

export const useUserProgress = () => {
  // Clerk user
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  
  // Firebase user
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setFirebaseLoaded(true);
    });
    return unsubscribe;
  }, []);

  // ============================================
  // Get Current User with Full Info
  // ============================================
  const getCurrentUser = () => {
    if (clerkUser) {
      return {
        id: clerkUser.id,
        clerkId: clerkUser.id,
        firebaseUid: null,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        name: clerkUser.firstName || clerkUser.primaryEmailAddress?.emailAddress || 'Anonymous',
        provider: 'clerk',
        photoURL: clerkUser.imageUrl,
      };
    }
    
    if (firebaseUser) {
      return {
        id: firebaseUser.uid,
        clerkId: null,
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email || 'Anonymous',
        provider: 'firebase',
        photoURL: firebaseUser.photoURL,
      };
    }
    
    return null;
  };

  // Update currentUser whenever auth changes
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, [clerkUser, firebaseUser]);

  // ============================================
  // Subscribe to User's Progress
  // ============================================
  useEffect(() => {
    // Đợi cả 2 auth providers load xong
    if (!clerkLoaded || !firebaseLoaded) {
      return;
    }

    const user = getCurrentUser();
    
    if (!user) {
      setProgress([]);
      return;
    }

    console.log('📊 Setting up progress listener:', {
      provider: user.provider,
      id: user.id,
      email: user.email,
    });

    try {
      let q;
      
      if (user.provider === 'clerk') {
        console.log('🔐 Querying Clerk user with clerkId:', user.clerkId);
        q = query(
          collection(db, 'userProgress'),
          where('clerkId', '==', user.clerkId)
        );
      } else if (user.provider === 'firebase') {
        console.log('🔥 Querying Firebase user with firebaseUid:', user.firebaseUid);
        q = query(
          collection(db, 'userProgress'),
          where('firebaseUid', '==', user.firebaseUid)
        );
      } else {
        return;
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log(`📥 Progress snapshot received: ${snapshot.size} documents`);
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            completedAt: doc.data().completedAt?.toDate?.() || doc.data().completedAt,
          }));
          
          // Sort by completedAt (newest first)
          const sortedData = data.sort((a, b) => {
            const dateA = a.completedAt instanceof Date ? a.completedAt : new Date(0);
            const dateB = b.completedAt instanceof Date ? b.completedAt : new Date(0);
            return dateB - dateA;
          });

          console.log('📊 Progress data loaded:', sortedData.length, 'documents');
          setProgress(sortedData);
          setError(null);
        },
        (err) => {
          console.error('❌ Snapshot listener error:', err.code, err.message);
          if (err.code === 'permission-denied') {
            console.warn('⚠️ Permission denied - Check Firestore Rules!');
            setError('Permission denied - check Firestore rules');
          }
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error('❌ Error setting up listener:', err);
      setError(err.message);
    }
  }, [clerkUser, firebaseUser, clerkLoaded, firebaseLoaded]);

  // ============================================
  // Save or Update Progress
  // ============================================
  const saveProgress = async (testData) => {
    const user = getCurrentUser();
    
    if (!user) {
      console.warn('⚠️ User not authenticated');
      return false;
    }

    try {
      setLoading(true);

      // ✅ FIX: Build object with ONLY non-null/non-undefined fields
      // Firestore strictly forbids undefined values
      const progressData = {};

      // Required fields - always add (even if null, convert to empty string)
      progressData.provider = user.provider || 'unknown';
      progressData.userEmail = user.email || '';
      progressData.userName = user.name || 'Anonymous';
      progressData.exam = testData.exam;
      progressData.part = testData.part;
      progressData.score = testData.score;
      progressData.answers = testData.answers || {};
      progressData.totalQuestions = testData.totalQuestions || 0;
      progressData.correctAnswers = testData.correctAnswers || 0;
      progressData.isDraft = testData.isDraft || false;
      progressData.testType = testData.testType || 'unknown';
      progressData.createdAt = serverTimestamp();
      progressData.completedAt = serverTimestamp();
      progressData.updatedAt = serverTimestamp();

      // Optional fields - ONLY add if they have actual truthy values
      // This prevents undefined/null from being saved
      if (user.clerkId) {
        progressData.clerkId = user.clerkId;
      }
      if (user.firebaseUid) {
        progressData.firebaseUid = user.firebaseUid;
      }
      if (user.photoURL) {
        progressData.photoURL = user.photoURL;
      }

      // ✅ CRITICAL: Verify no undefined values exist
      for (const [key, value] of Object.entries(progressData)) {
        if (value === undefined) {
          console.warn(`⚠️ WARNING: Field "${key}" is undefined, removing it`);
          delete progressData[key];
        }
      }

      console.log('📋 Final progressData to save:', progressData);

      console.log('💾 Saving progress - User info:', {
        provider: user.provider,
        clerkId: user.clerkId,
        firebaseUid: user.firebaseUid,
        email: user.email,
      });
      
      console.log('💾 Saving progress - Test data:', {
        exam: testData.exam,
        part: testData.part,
        score: testData.score,
      });

      // Check if progress already exists for this test
      let existingQuery;
      
      if (user.provider === 'clerk' && user.clerkId) {
        existingQuery = query(
          collection(db, 'userProgress'),
          where('clerkId', '==', user.clerkId),
          where('exam', '==', testData.exam),
          where('part', '==', testData.part)
        );
      } else if (user.provider === 'firebase' && user.firebaseUid) {
        existingQuery = query(
          collection(db, 'userProgress'),
          where('firebaseUid', '==', user.firebaseUid),
          where('exam', '==', testData.exam),
          where('part', '==', testData.part)
        );
      } else {
        console.warn('⚠️ Cannot determine user provider for query');
        setError('Invalid user provider');
        return false;
      }

      const existingDocs = await getDocs(existingQuery);

      if (existingDocs.size > 0) {
        // Update existing document
        const existingDoc = existingDocs.docs[0];
        await updateDoc(doc(db, 'userProgress', existingDoc.id), progressData);
        console.log(`✅ Progress updated (${user.provider}):`, existingDoc.id);
      } else {
        // Create new document
        const docRef = await addDoc(collection(db, 'userProgress'), progressData);
        console.log(`✅ Progress saved (${user.provider}):`, docRef.id);
      }

      setError(null);
      return true;
    } catch (err) {
      console.error('❌ Error saving progress:', err.code, err.message);
      if (err.code === 'permission-denied') {
        setError('Cannot save progress - check Firestore rules');
        console.error('⚠️ Permission denied! Make sure Firestore rules allow writes.');
      } else {
        setError(err.message);
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
    currentUser, // Unified user info (Clerk or Firebase)
  };
};
import { useState, useEffect } from 'react';
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

/**
 * Hook để quản lý tiến độ luyện thi của người dùng
 * Chỉ sử dụng Firebase Authentication (Clerk đã bị loại bỏ)
 */
export const useUserProgress = () => {
  // Firebase authentication state
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  
  // Progress data và status
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // ============================================
  // Listen to Firebase Auth State
  // ============================================
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setFirebaseLoaded(true);
    });
    return unsubscribe;
  }, []);

  // ============================================
  // Get Current User Info (Firebase Only)
  // ============================================
  const getCurrentUser = () => {
    if (firebaseUser) {
      return {
        id: firebaseUser.uid,
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email || 'Anonymous',
        provider: 'firebase',
        photoURL: firebaseUser.photoURL,
      };
    }
    
    return null;
  };

  // Update currentUser whenever Firebase auth changes
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, [firebaseUser]);

  // ============================================
  // Subscribe to User's Progress from Firestore
  // ============================================
  useEffect(() => {
    // Đợi Firebase auth load xong
    if (!firebaseLoaded) {
      return;
    }

    const user = getCurrentUser();
    
    if (!user) {
      setProgress([]);
      return;
    }

    console.log('📊 Setting up progress listener:', {
      provider: user.provider,
      firebaseUid: user.firebaseUid,
      email: user.email,
    });

    try {
      // Query Firestore cho user này
      const q = query(
        collection(db, 'userProgress'),
        where('firebaseUid', '==', user.firebaseUid)
      );

      console.log('🔥 Querying Firebase user with firebaseUid:', user.firebaseUid);

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log(`📥 Progress snapshot received: ${snapshot.size} documents`);
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore timestamp to JavaScript Date
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
          } else {
            setError(err.message);
          }
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error('❌ Error setting up listener:', err);
      setError(err.message);
    }
  }, [firebaseUser, firebaseLoaded]);

  // ============================================
  // Save or Update Progress to Firestore
  // ============================================
  const saveProgress = async (testData) => {
  const user = getCurrentUser();
  
  if (!user) {
    console.warn('⚠️ User not authenticated');
    return false;
  }

  // ✅ Validate required fields trước
  const requiredFields = ['exam', 'part', 'score', 'answers', 'totalQuestions'];
  for (const field of requiredFields) {
    if (testData[field] === undefined) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

    try {
      setLoading(true);

      // ✅ Build progress data object - ONLY include defined fields
      // Firestore strictly forbids undefined values
      const progressData = {
        // Required user info
        firebaseUid: user.firebaseUid,
        userEmail: user.email || '',
        userName: user.name || 'Anonymous',
        
        // Test data
        exam: testData.exam,
        part: testData.part,
        score: testData.score || 0,
        answers: testData.answers || {},
        totalQuestions: testData.totalQuestions || 0,
        correctAnswers: testData.correctAnswers || 0,
        isDraft: testData.isDraft || false,
        testType: testData.testType || 'unknown',  // ✅ FIXED: testData.testType not testType
        
        // Timestamps
        createdAt: serverTimestamp(),
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Optional fields - only add if they have values
      if (user.photoURL) {
        progressData.photoURL = user.photoURL;
      }

      // Include additional listening/reading specific data if provided
      if (testData.listeningScore !== undefined) {
        progressData.listeningScore = testData.listeningScore;
      }
      if (testData.readingScore !== undefined) {
        progressData.readingScore = testData.readingScore;
      }
      if (testData.listeningCorrect !== undefined) {
        progressData.listeningCorrect = testData.listeningCorrect;
      }
      if (testData.readingCorrect !== undefined) {
        progressData.readingCorrect = testData.readingCorrect;
      }

      // ✅ CRITICAL: Verify no undefined values
      for (const [key, value] of Object.entries(progressData)) {
        if (value === undefined) {
          console.warn(`⚠️ WARNING: Field "${key}" is undefined, removing it`);
          delete progressData[key];
        }
      }

      console.log('📋 Final progressData to save:', progressData);
      console.log('💾 Saving progress - User info:', {
        firebaseUid: user.firebaseUid,
        email: user.email,
      });
      console.log('💾 Saving progress - Test data:', {
        exam: testData.exam,
        part: testData.part,
        score: testData.score,
        testType: testData.testType,
      });

      // Check if progress already exists for this test
      const existingQuery = query(
        collection(db, 'userProgress'),
        where('firebaseUid', '==', user.firebaseUid),
        where('exam', '==', testData.exam),
        where('part', '==', testData.part)
      );

      const existingDocs = await getDocs(existingQuery);

      if (existingDocs.size > 0) {
        // Update existing document
        const existingDoc = existingDocs.docs[0];
        await updateDoc(doc(db, 'userProgress', existingDoc.id), progressData);
        console.log(`✅ Progress updated:`, existingDoc.id);
      } else {
        // Create new document
        const docRef = await addDoc(collection(db, 'userProgress'), progressData);
        console.log(`✅ Progress saved:`, docRef.id);
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
    currentUser, // User info from Firebase
    isLoaded: firebaseLoaded, // Auth state is loaded
  };
};  
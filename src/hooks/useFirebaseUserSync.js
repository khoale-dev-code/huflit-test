import { useEffect, useState } from 'react';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

/**
 * Hook để sync Firebase Auth user vào Firestore
 * Tương tự như useClerkFirebaseSync nhưng cho Firebase Authentication
 */
export const useFirebaseUserSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        return;
      }

      try {
        setSyncing(true);
        setError(null);

        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        const userData = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          authProvider: 'firebase',
          updatedAt: serverTimestamp(),
        };

        if (!userSnap.exists()) {
          // Tạo user mới
          await setDoc(userRef, {
            ...userData,
            createdAt: serverTimestamp(),
          });
          console.log('✅ Firebase user synced to Firestore:', firebaseUser.uid);
        } else {
          // Cập nhật thông tin user
          await setDoc(userRef, userData, { merge: true });
          console.log('✅ Firebase user info updated:', firebaseUser.uid);
        }
      } catch (err) {
        console.error('❌ Error syncing Firebase user:', err);
        setError(err.message);
      } finally {
        setSyncing(false);
      }
    });

    return unsubscribe;
  }, []);

  return { syncing, error };
};
export default useFirebaseUserSync;
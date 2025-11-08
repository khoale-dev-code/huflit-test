import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useClerkFirebaseSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }

    const syncUserToFirebase = async () => {
      try {
        console.log('🔄 Syncing Clerk user to Firebase:', user.id);

        const userRef = doc(db, 'users', user.id);
        
        await setDoc(
          userRef,
          {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            fullName: user.fullName || '',
            imageUrl: user.imageUrl || '',
            lastSyncedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
          },
          { merge: true } // Use merge to avoid overwriting existing data
        );

        console.log('✅ User synced to Firebase successfully');
      } catch (error) {
        // Only log error if it's NOT a permission-denied error
        // (since we might not need the users collection for the app to work)
        if (error.code === 'permission-denied') {
          console.log('⚠️ User sync skipped (permission denied). This is OK if you only use userProgress collection.');
        } else {
          console.error('❌ Error syncing user to Firebase:', error);
        }
      }
    };

    syncUserToFirebase();
  }, [user, isLoaded, isSignedIn]);
};
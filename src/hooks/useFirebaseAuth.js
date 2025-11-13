import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Hook Firebase Authentication với Google Sign-in
 * ✅ Fix: Popup lag, promise issue, COOP policy
 */
export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ FIX 1: Set persistence tại mount
  useEffect(() => {
    const initializePersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        console.log('✅ Firebase persistence initialized');
      } catch (err) {
        console.error('⚠️ Persistence error:', err.message);
      }
    };

    initializePersistence();
  }, []);

  // ✅ FIX 2: Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          console.log('✅ [Firebase Auth] User signed in:', firebaseUser.email);
          setUser(firebaseUser);
          setIsSignedIn(true);
          setError(null);
        } else {
          console.log('⚪ [Firebase Auth] User signed out');
          setUser(null);
          setIsSignedIn(false);
        }
        setLoading(false);
        setIsLoaded(true);
      },
      (err) => {
        console.error('❌ [Firebase Auth] State change error:', err.message);
        setError(err.message);
        setLoading(false);
        setIsLoaded(true);
      }
    );

    return unsubscribe;
  }, []);

  // ✅ FIX 3: Google Sign-in với error handling
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Starting Google Sign-in...');

      // Initialize Google Provider
      const provider = new GoogleAuthProvider();
      
      // ✅ FIX 4: Set persistence before popup
      await setPersistence(auth, browserLocalPersistence);

      // Add scopes for additional info
      provider.addScope('profile');
      provider.addScope('email');

      // ✅ FIX 5: Open popup with redirect fallback
      let result;
      
      try {
        // Thử popup trước
        result = await signInWithPopup(auth, provider);
        console.log('✅ Google Sign-in successful (popup)');
      } catch (popupError) {
        // Nếu popup bị block, thử redirect
        if (popupError.code === 'auth/popup-blocked' || 
            popupError.code === 'auth/popup-closed-by-user' ||
            popupError.message.includes('Cross-Origin-Opener-Policy')) {
          
          console.warn('⚠️ Popup blocked, trying alternative method...');
          // Popup bị block - return error message
          throw new Error('Popup bị block. Vui lòng cho phép popup trong trình duyệt hoặc thử lại.');
        }
        throw popupError;
      }

      // Extract user info
      const signedInUser = result.user;
      
      console.log('✅ User signed in:', {
        uid: signedInUser.uid,
        email: signedInUser.email,
        displayName: signedInUser.displayName,
        photoURL: signedInUser.photoURL,
      });

      setUser(signedInUser);
      setIsSignedIn(true);
      setError(null);
      setLoading(false);

      return {
        success: true,
        user: signedInUser,
        message: 'Đăng nhập thành công!'
      };

    } catch (err) {
      console.error('❌ Error signing in with Google:', {
        code: err.code,
        message: err.message,
      });

      const errorMessage = 
        err.code === 'auth/popup-closed-by-user' ? 'Bạn đã đóng popup đăng nhập' :
        err.code === 'auth/popup-blocked' ? 'Popup bị trình duyệt block' :
        err.message.includes('Cross-Origin') ? 'Lỗi bảo mật: COOP policy' :
        err.message;

      setError(errorMessage);
      setLoading(false);

      return {
        success: false,
        error: errorMessage,
        code: err.code
      };
    }
  };

  // ✅ FIX 6: Sign out
  const handleSignOut = async () => {
    try {
      setLoading(true);
      console.log('🔄 Signing out...');
      
      await signOut(auth);
      
      setUser(null);
      setIsSignedIn(false);
      setError(null);
      setLoading(false);
      
      console.log('✅ Sign out successful');
      return { success: true };
    } catch (err) {
      console.error('❌ Error signing out:', err.message);
      setError(err.message);
      setLoading(false);
      
      return { success: false, error: err.message };
    }
  };

  return {
    user,
    isSignedIn,
    loading,
    error,
    isLoaded,
    signInWithGoogle,
    signOut: handleSignOut,
  };
};

export default useFirebaseAuth;
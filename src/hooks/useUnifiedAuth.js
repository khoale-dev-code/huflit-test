import { useFirebaseAuth } from './useFirebaseAuth';

/**
 * Hook thống nhất authentication - chỉ dùng Firebase
 * Clerk đã bị loại bỏ khỏi dự án
 */
export const useUnifiedAuth = () => {
  // Chỉ sử dụng Firebase authentication
  const firebaseAuth = useFirebaseAuth();

  const isLoaded = firebaseAuth.isLoaded;
  const isSignedIn = firebaseAuth.isSignedIn;
  
  // Lấy user từ Firebase
  let user = null;
  let authProvider = 'firebase'; // Luôn là 'firebase' bây giờ

  if (firebaseAuth.isSignedIn && firebaseAuth.user) {
    user = firebaseAuth.user;
    console.log('✅ [useUnifiedAuth] Firebase user authenticated');
  } else if (isLoaded) {
    console.log('⚪ [useUnifiedAuth] No user logged in (auth loaded)');
  }

  return {
    isSignedIn,
    isLoaded,
    user,
    authProvider, // Luôn là 'firebase'
    firebaseAuth,
  };
};

export default useUnifiedAuth;
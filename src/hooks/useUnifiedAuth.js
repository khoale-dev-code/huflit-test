import { useClerkAuthentication } from './useClerkAuth';
import { useFirebaseAuth } from './useFirebaseAuth';

/**
 * Hook thống nhất authentication từ cả Clerk và Firebase
 * Trả về user từ provider nào đang active
 */
export const useUnifiedAuth = () => {
  const clerkAuth = useClerkAuthentication();
  const firebaseAuth = useFirebaseAuth();

  // ✅ FIX: Chỉ cần một trong hai load xong, KHÔNG phải cả 2
  // Nếu chờ cả 2 cùng load, app sẽ stuck nếu một service bị chậm/lỗi
  const isLoaded = clerkAuth.isLoaded || firebaseAuth.isLoaded;

  // Ưu tiên Clerk nếu cả 2 đều đăng nhập (không nên xảy ra)
  const isSignedIn = clerkAuth.isSignedIn || firebaseAuth.isSignedIn;
  
  // Lấy user từ provider nào đang active
  let user = null;
  let authProvider = null;

  if (clerkAuth.isSignedIn && clerkAuth.user) {
    user = clerkAuth.user;
    authProvider = 'clerk';
    console.log('✅ [useUnifiedAuth] Clerk user authenticated');
  } else if (firebaseAuth.isSignedIn && firebaseAuth.user) {
    user = firebaseAuth.user;
    authProvider = 'firebase';
    console.log('✅ [useUnifiedAuth] Firebase user authenticated');
  } else if (isLoaded) {
    console.log('⚪ [useUnifiedAuth] No user logged in (auth loaded)');
  }

  return {
    isSignedIn,
    isLoaded,
    user,
    authProvider, // 'clerk', 'firebase', hoặc null
    clerkAuth,
    firebaseAuth,
  };
};

export default useUnifiedAuth;
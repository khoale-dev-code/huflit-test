import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const useClerkFirebaseSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }

    const initializeUser = async () => {
      try {
        console.log('✅ User authenticated:', user.id);
        console.log('📧 Email:', user.primaryEmailAddress?.emailAddress);
        console.log('👤 Name:', user.fullName);
        
        // ✅ Không cần sync vào collection 'users'
        // Clerk đã quản lý thông tin user
        // Collection 'userProgress' đã có rule: allow write: if true
        
        console.log('🎯 Ready to use userProgress collection');
      } catch (error) {
        console.error('❌ Error initializing user:', error);
      }
    };

    initializeUser();
  }, [user, isLoaded, isSignedIn]);

  // Return user info for components that need it
  return {
    userId: user?.id,
    email: user?.primaryEmailAddress?.emailAddress,
    fullName: user?.fullName,
    imageUrl: user?.imageUrl,
    isLoaded,
    isSignedIn
  };
};
export default useClerkFirebaseSync;
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';

export const useClerkAuthentication = () => {
  const { isSignedIn, isLoaded } = useClerkAuth();
  const { user } = useUser();

  return {
    isSignedIn,
    isLoaded,
    user: user
      ? {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          displayName: user.firstName ? `${user.firstName} ${user.lastName}` : user.emailAddresses[0]?.emailAddress,
          photoURL: user.profileImageUrl,
        }
      : null,
  };
};
export default useClerkAuthentication;

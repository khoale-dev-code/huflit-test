import React from 'react';
import ClerkAuth from './ClerkAuth';
import FirebaseAuthButtons from './FirebaseAuthButtons';
import { useClerkAuthentication } from '../hooks/useClerkAuth';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

export default function CombinedAuth() {
  const clerkAuth = useClerkAuthentication();
  const firebaseAuth = useFirebaseAuth();

  // Nếu đã đăng nhập bằng Clerk, chỉ hiển thị Clerk
  if (clerkAuth.isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <ClerkAuth />
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-lg border border-orange-200">
          <span className="text-xs font-semibold text-orange-700">Clerk</span>
        </div>
      </div>
    );
  }

  // Nếu đã đăng nhập bằng Firebase, chỉ hiển thị Firebase
  if (firebaseAuth.isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <FirebaseAuthButtons />
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-xs font-semibold text-blue-700">Firebase</span>
        </div>
      </div>
    );
  }

  // Chưa đăng nhập - Hiển thị cả 2 option
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Clerk Auth Buttons */}
      <ClerkAuth />
      
      {/* Divider */}
      <div className="h-8 w-px bg-gray-300"></div>
      
      {/* Firebase Google Sign In */}
      <FirebaseAuthButtons />
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { LogOut, User as UserIcon, CheckCircle, ChevronDown, Loader2 } from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

// Google Logo SVG Component (Giữ nguyên)
const GoogleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function FirebaseAuthButtons() {
  const { user, isSignedIn, loading, signInWithGoogle, signOut } = useFirebaseAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Xử lý click ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    // Logik đăng nhập được giữ lại
    const result = await signInWithGoogle();
    if (result.success) {
      console.log('✅ Đăng nhập Firebase thành công!');
    } else {
      console.error('❌ Đăng nhập thất bại:', result.error);
    }
  };

  const handleSignOut = async () => {
    // Logik đăng xuất được giữ lại
    const result = await signOut();
    if (result.success) {
      console.log('✅ Đăng xuất thành công!');
      setShowDropdown(false);
    }
  };

  // ----------------------------------------------------------------------
  // Signed Out State (Chưa đăng nhập) - Nút Google Sign In
  // ----------------------------------------------------------------------
  if (!isSignedIn) {
    return (
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="group relative overflow-hidden px-4 sm:px-6 py-2 sm:py-2.5 bg-white rounded-full font-bold text-sm sm:text-base text-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-md"
      >
        {/* Gradient background on hover for "pop" effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        
        <div className="relative flex items-center gap-2 sm:gap-3">
          {loading ? (
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          ) : (
            <GoogleLogo />
          )}
          <span className="hidden sm:inline font-bold">Đăng nhập với Google</span>
          <span className="sm:hidden font-bold">Google</span>
        </div>
      </button>
    );
  }

  // ----------------------------------------------------------------------
  // Signed In State (Đã đăng nhập) - User Profile Widget
  // ----------------------------------------------------------------------
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const userInitial = displayName[0]?.toUpperCase() || 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 sm:gap-3 px-2 py-1 bg-white rounded-full shadow-lg border border-blue-100/70 hover:shadow-xl transition-all duration-300 hover:border-blue-400/50 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full ring-2 ring-white/50 ring-offset-1 ring-offset-blue-400/50 transition-all duration-300 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 shadow-md">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
              {userInitial}
            </div>
          )}
        </div>

        {/* Name & Dropdown Icon */}
        <div className='hidden sm:flex items-center gap-1.5'>
          <span className="text-sm font-bold text-gray-800 truncate max-w-[100px]">{displayName}</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-3 w-64 md:w-72 bg-white rounded-xl shadow-2xl border border-blue-200/50 py-2 z-50 origin-top-right transform scale-100 opacity-100 transition-all duration-300">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100 bg-blue-50/50">
            <div className="flex items-center gap-2 mb-2">
              <GoogleLogo />
              <span className="text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-0.5 rounded-full shadow-sm">
                Đã đăng nhập
              </span>
            </div>
            <p className="text-base font-extrabold text-gray-900 truncate">
              {user?.displayName || 'Tài khoản của bạn'}
            </p>
            <p className="text-xs text-gray-500 truncate mt-1">
              {user?.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* Profile Link */}
            <button
              className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-blue-50 transition-colors flex items-center gap-3"
              onClick={() => { setShowDropdown(false); /* Thêm logic chuyển trang Profile ở đây */ }}
            >
              <UserIcon className="w-5 h-5 text-blue-600" />
              Thông tin cá nhân
            </button>
            
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 border-t border-gray-100 mt-1"
            >
              <LogOut className="w-5 h-5" />
              {loading ? 'Đang xử lý...' : 'Đăng xuất'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
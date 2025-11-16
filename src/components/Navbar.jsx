import React, { useMemo, useEffect, useRef, useCallback, useState } from 'react';
import { Menu, X, Headphones, BookOpen, BookMarked, Sparkles, User, ChevronDown, LogOut, GraduationCap, LogIn, ChevronRight, Loader2 } from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import logo from '../assets/logo.png';
import styles from './styles/Navbar.module.css';

// ✅ CSS Module Import ☝️

// ======================================================================
// Google Logo SVG Component
// ======================================================================
const GoogleLogo = React.memo(() => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
));
GoogleLogo.displayName = 'GoogleLogo';

// ======================================================================
// NavItem Component
// ======================================================================
const NavItem = React.memo(({ item, isMobile = false, onItemClick }) => {
  const IconComponent = item.icon;

  if (isMobile) {
    return (
      <button
        onClick={() => onItemClick(item)}
        className={`w-full p-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-between gap-3 group ${
          item.isActive
            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-orange-300/50`
            : 'bg-white text-gray-700 hover:bg-amber-50 border border-transparent hover:border-amber-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              item.isActive ? 'bg-white/25' : 'bg-gradient-to-br from-amber-100 to-orange-100'
            }`}
          >
            <IconComponent
              className={`w-5 h-5 ${item.isActive ? 'text-white' : 'text-orange-600'}`}
            />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-base font-bold truncate">{item.label}</p>
            <p className={`text-xs ${item.isActive ? 'text-white/80' : 'text-gray-500'}`}>
              {item.subtext}
            </p>
          </div>
        </div>
        {!item.isActive && <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />}
      </button>
    );
  }

  return (
    <button
      onClick={() => onItemClick(item)}
      className={`${styles.navItem} ${
        item.isActive
          ? `${styles.navItemActive} bg-gradient-to-r ${item.gradient}`
          : styles.navItemInactive
      }`}
    >
      <IconComponent className="w-4 h-4 flex-shrink-0" />
      <span className="relative">{item.label}</span>
      {item.isActive && (
        <div className="absolute inset-0 z-0 bg-white/10 animate-pulse rounded-full opacity-50"></div>
      )}
    </button>
  );
});
NavItem.displayName = 'NavItem';

// ======================================================================
// ProfileButton Component
// ======================================================================
const ProfileButton = React.memo(({ user, onToggle, showProfileMenu }) => {
  const displayName = user.displayName || user.email?.split('@')[0];
  const imageUrl = user.photoURL;
  const userInitial = displayName[0]?.toUpperCase() || 'U';

  return (
    <button
      onClick={onToggle}
      className={styles.profileBtn}
      aria-expanded={showProfileMenu}
      aria-controls="profile-dropdown"
    >
      <div className={styles.profileAvatar}>
        {imageUrl ? (
          <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
            {userInitial}
          </div>
        )}
      </div>

      <div className={styles.profileName}>
        <span className={styles.profileNameText}>{displayName}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            showProfileMenu ? styles.chevronRotate : ''
          }`}
        />
      </div>
    </button>
  );
});
ProfileButton.displayName = 'ProfileButton';

// ======================================================================
// ProfileDropdown Component
// ======================================================================
const ProfileDropdown = React.memo(({ user, onProfileClick, onSignOut }) => {
  const displayName = user.displayName || user.email;
  const initial = user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';

  return (
    <div id="profile-dropdown" className={styles.profileDropdown}>
      <div className={styles.profileDropdownHeader}>
        <div className="flex items-center gap-2 mb-2">
          <GoogleLogo />
          <span className="text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 px-2 py-0.5 rounded-full shadow-sm">
            Tài khoản Google
          </span>
        </div>
        <p className="text-base font-extrabold text-gray-900 truncate">
          {user?.displayName || 'Tài khoản của bạn'}
        </p>
        <p className="text-xs text-gray-500 truncate mt-1">
          {user?.email}
        </p>
      </div>

      <div className="py-1">
        <button
          onClick={onProfileClick}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-50 transition-all text-sm font-medium"
        >
          <User className="w-5 h-5 text-orange-600 flex-shrink-0" />
          <span>Xem Profile</span>
        </button>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all text-sm font-medium border-t border-gray-100 mt-1"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Đăng Xuất</span>
        </button>
      </div>
    </div>
  );
});
ProfileDropdown.displayName = 'ProfileDropdown';

// ======================================================================
// SignInButton Component
// ======================================================================
const SignInButton = React.memo(({ onSignIn, loading }) => (
  <button
    onClick={onSignIn}
    disabled={loading}
    className={styles.signInBtn}
  >
    <div className={styles.signInBtnHover}></div>

    <div className={styles.signInBtnContent}>
      {loading ? (
        <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />
      ) : (
        <GoogleLogo />
      )}
      <span className="hidden sm:inline font-bold">Đăng nhập với Google</span>
      <span className="sm:hidden font-bold">Google</span>
    </div>
  </button>
));
SignInButton.displayName = 'SignInButton';

// ======================================================================
// Main Navbar Component
// ======================================================================
export default function Navbar({
  testType,
  onTestTypeChange,
  practiceType,
  onPracticeTypeChange,
  onAuthClick,
  onProfileClick,
  viewMode,
}) {
  const { user, isSignedIn, signInWithGoogle, signOut, loading } = useFirebaseAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const testMenuItems = useMemo(() => [
    { 
      id: 'listening', 
      label: 'Thi Nghe', 
      subtext: 'Listening Test', 
      icon: Headphones, 
      gradient: 'from-amber-500 to-orange-600', 
      isActive: testType === 'listening' 
    },
    { 
      id: 'reading', 
      label: 'Thi Đọc', 
      subtext: 'Reading Test', 
      icon: BookOpen, 
      gradient: 'from-yellow-500 to-amber-600', 
      isActive: testType === 'reading' 
    },
    { 
      id: 'full', 
      label: 'Thi Thử', 
      subtext: 'Full Mock Exam', 
      icon: GraduationCap, 
      gradient: 'from-red-500 to-orange-600', 
      isActive: testType === 'full' 
    },
  ], [testType]);

  const practiceMenuItems = useMemo(() => [
    { 
      id: 'grammar', 
      label: 'Ngữ Pháp', 
      subtext: 'Grammar Practice', 
      icon: BookMarked, 
      gradient: 'from-orange-500 to-amber-600', 
      isActive: practiceType === 'grammar' 
    },
    { 
      id: 'vocabulary', 
      label: 'Từ Vựng', 
      subtext: 'Vocabulary Building', 
      icon: Sparkles, 
      gradient: 'from-pink-500 to-red-500', 
      isActive: practiceType === 'vocabulary' 
    },
  ], [practiceType]);

  const allMenuItems = useMemo(() => [...testMenuItems, ...practiceMenuItems], [testMenuItems, practiceMenuItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = useCallback((item) => {
    if (item.id === 'listening' || item.id === 'reading' || item.id === 'full') {
      onTestTypeChange(item.id);
    } else {
      onPracticeTypeChange(item.id);
    }
    setIsOpen(false);
  }, [onTestTypeChange, onPracticeTypeChange]);

  // ✅ UPDATED: Gọi onProfileClick từ App
  const handleProfileClickFromDropdown = useCallback(() => {
    onProfileClick?.();
    setShowProfileMenu(false);
    setIsOpen(false);
  }, [onProfileClick]);

  const handleSignInAndCloseMenu = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      setIsOpen(false);
    }
  };

  const handleSignOutAndCloseMenu = async () => {
    await signOut();
    setShowProfileMenu(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* ====== NAVBAR ====== */}
      <nav className={styles.navContainer}>
        <div className={styles.navContent}>
          {/* Logo Section */}
          <a href="/" className={styles.logoGroup} aria-label="Trang chủ HUFLIT Exam Prep">
            <div className={styles.logoIcon}>
              <img src={logo} alt="Logo" className={styles.logoImg} />
            </div>
            <h1 className={styles.logoText}>HUFLIT Exam Prep</h1>
          </a>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            {allMenuItems.map((item) => (
              <NavItem key={item.id} item={item} onItemClick={handleMenuClick} />
            ))}
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isSignedIn && user ? (
              <div className="relative" ref={profileMenuRef}>
                <ProfileButton
                  user={user}
                  onToggle={() => setShowProfileMenu(!showProfileMenu)}
                  showProfileMenu={showProfileMenu}
                />
                {showProfileMenu && (
                  <ProfileDropdown
                    user={user}
                    onProfileClick={handleProfileClickFromDropdown}
                    onSignOut={handleSignOutAndCloseMenu}
                  />
                )}
              </div>
            ) : (
              <SignInButton onSignIn={handleSignInAndCloseMenu} loading={loading} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.mobileMenuBtn}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* ====== MOBILE MENU OVERLAY ====== */}
      <div
        className={`${styles.mobileOverlay} ${isOpen ? '' : styles.hidden}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      ></div>

      {/* ====== MOBILE MENU ====== */}
      <div
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed}`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-amber-100">
            <h2 className="text-xl font-bold text-orange-600">Menu Chính</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-all"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto pt-4 space-y-4">
            <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider">
              Thi & Luyện Tập
            </h3>
            <div className="space-y-2">
              {allMenuItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isMobile={true}
                  onItemClick={handleMenuClick}
                />
              ))}
            </div>

            <hr className="my-4 border-amber-100" />

            {/* Mobile Profile / Sign In */}
            <div className="pt-2">
              {isSignedIn && user ? (
                <>
                  <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-2">
                    Tài Khoản
                  </h3>
                  <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 mb-4 border border-amber-200">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.displayName?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">
                        {user.displayName || user.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleProfileClickFromDropdown}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-100 transition-all text-sm font-medium rounded-lg"
                  >
                    <User className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span>Xem Profile</span>
                  </button>
                  <button
                    onClick={handleSignOutAndCloseMenu}
                    className="w-full flex items-center gap-3 px-4 py-3 mt-1 text-gray-700 hover:bg-red-100 transition-all text-sm font-medium rounded-lg"
                  >
                    <LogOut className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span>Đăng Xuất</span>
                  </button>
                </>
              ) : (
                <SignInButton onSignIn={handleSignInAndCloseMenu} loading={loading} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
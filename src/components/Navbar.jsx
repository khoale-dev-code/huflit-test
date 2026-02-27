import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Headphones, BookOpen, GraduationCap, Sparkles, 
  LogOut, User, Menu, X, Flame, Languages, Home, FileText
} from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useStreak } from './hooks/useStreak';
import { ROUTES } from '../config/routes';
import logo from '../assets/logo.png';

// Menu items - Static
const MENU_ITEMS = [
  { id: 'listening', label: 'Nghe', icon: Headphones, type: 'test', path: '/test' },
  { id: 'reading', label: 'Đọc', icon: BookOpen, type: 'test', path: '/test' },
  { id: 'full', label: 'Thi Thử', icon: GraduationCap, type: 'exam', path: '/full-exam' },
  { id: 'grammar', label: 'Ngữ Pháp', icon: Sparkles, type: 'practice', path: '/grammar' },
  { id: 'vocabulary', label: 'Từ Vựng', icon: Languages, type: 'practice', path: '/vocabulary' },
];

const BOTTOM_MENU_ITEMS = [
  { id: 'home', label: 'Trang chủ', icon: Home, path: ROUTES.HOME },
  MENU_ITEMS[0],
  MENU_ITEMS[1],
];

// ==========================================
// Animation presets - Optimize motion
// ==========================================
const menuVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 28, stiffness: 300 }
  },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3 }
  })
};

// ==========================================
// Nav Button Component
// ==========================================
const NavButton = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      className={`
        flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold text-sm transition-all
        whitespace-nowrap
        ${isActive
          ? 'bg-[#00358E] text-white shadow-md'
          : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'}
      `}
    >
      <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>{item.label}</span>
    </button>
  );
};

// ==========================================
// Bottom Nav Item
// ==========================================
const BottomNavItem = ({ item, isActive, onClick, prefersReducedMotion }) => {
  const Icon = item.icon;
  
  return (
    <motion.button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
      whileTap={!prefersReducedMotion ? { scale: 0.95 } : undefined}
      className={`
        flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors relative
        ${isActive ? 'text-[#00358E]' : 'text-slate-600 hover:text-[#00358E]'}
      `}
    >
      <div className={`p-2 rounded-lg transition-colors ${
        isActive ? 'bg-blue-100' : 'bg-slate-100'
      }`}>
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <span className="text-[9px] font-bold text-center">{item.label}</span>
      {isActive && (
        <motion.div
          layoutId="bottom-active"
          className="absolute bottom-0 h-1 w-6 bg-[#00358E] rounded-full"
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
};

// ==========================================
// Profile Dropdown
// ==========================================
const ProfileDropdown = ({ user, showMenu, setShowMenu, onProfileClick, onAnswersClick, onSignOut, prefersReducedMotion }) => {
  if (!showMenu) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-20"
        onClick={() => setShowMenu(false)}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        role="menu"
        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-30"
      >
        <button
          onClick={onProfileClick}
          role="menuitem"
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
        >
          <User className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>Trang cá nhân</span>
        </button>
        <button
          onClick={onAnswersClick}
          role="menuitem"
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
        >
          <FileText className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>Đáp án</span>
        </button>
        <div className="border-t border-slate-100 my-1" />
        <button
          onClick={onSignOut}
          role="menuitem"
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>Đăng xuất</span>
        </button>
      </motion.div>
    </>
  );
};

// ==========================================
// Main Navbar Component
// ==========================================
const Navbar = ({ testType, onTestTypeChange, practiceType, onPracticeTypeChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSignedIn, signInWithGoogle, signOut } = useFirebaseAuth();
  const { streak } = useStreak();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Scroll listener - Passive, optimized
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body overflow
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Check if item is active
  const isItemActive = useCallback((item) => {
    const pathMatch = location.pathname === item.path;
    if (item.type === 'test') return pathMatch && testType === item.id;
    if (item.type === 'practice') return pathMatch && practiceType === item.id;
    return pathMatch;
  }, [location.pathname, testType, practiceType]);

  // Handlers
  const handleNavClick = useCallback((item) => {
    if (item.type === 'test') onTestTypeChange?.(item.id);
    if (item.type === 'practice') onPracticeTypeChange?.(item.id);
    navigate(item.path);
    setMobileOpen(false);
    setShowProfileMenu(false);
  }, [navigate, onTestTypeChange, onPracticeTypeChange]);

  const handleLogoClick = useCallback(() => {
    navigate(ROUTES.HOME);
    setMobileOpen(false);
  }, [navigate]);

  const handleSignOut = useCallback(() => {
    signOut();
    setShowProfileMenu(false);
    setMobileOpen(false);
  }, [signOut]);

  const handleProfileClick = useCallback(() => {
    navigate(ROUTES.PROFILE);
    setShowProfileMenu(false);
    setMobileOpen(false);
  }, [navigate]);

  const handleAnswersClick = useCallback(() => {
    navigate(ROUTES.ANSWERS);
    setShowProfileMenu(false);
    setMobileOpen(false);
  }, [navigate]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        role="navigation"
        aria-label="Điều hướng chính"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/50'
            : 'bg-white/80 backdrop-blur-sm border-b border-slate-100/30'
        }`}
        style={{
          WebkitBackdropFilter: 'blur(12px)',
          willChange: 'transform'
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              aria-label="HUFLIT - Trang chủ"
              className="flex items-center gap-2 group flex-shrink-0 transition-opacity hover:opacity-75"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#00358E] rounded-lg flex items-center justify-center shadow-md">
                <img src={logo} alt="" className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </div>
              <div className="hidden xs:flex flex-col leading-tight">
                <h1 className="text-[#00358E] font-black text-base sm:text-lg">HUFLIT</h1>
                <p className="text-[#FF7D00] text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">Exam</p>
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
              {MENU_ITEMS.map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  isActive={isItemActive(item)}
                  onClick={() => handleNavClick(item)}
                />
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Streak - Only show on desktop for performance */}
              {isSignedIn && streak > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden sm:flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200"
                >
                  <Flame className="w-3.5 h-3.5 text-[#FF7D00]" aria-hidden="true" />
                  <span className="text-[#FF7D00] font-bold text-xs" aria-label={`${streak} ngày`}>
                    {streak}
                  </span>
                </motion.div>
              )}

              {/* Auth Button */}
              {isSignedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    aria-label="Menu người dùng"
                    aria-expanded={showProfileMenu}
                    aria-haspopup="menu"
                    className="flex items-center gap-1 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={user?.photoURL}
                      alt={user?.displayName || 'Hồ sơ'}
                      className="w-8 h-8 rounded-full border border-slate-300 object-cover"
                      loading="lazy"
                    />
                  </button>

                  <AnimatePresence>
                    <ProfileDropdown
                      user={user}
                      showMenu={showProfileMenu}
                      setShowMenu={setShowProfileMenu}
                      onProfileClick={handleProfileClick}
                      onAnswersClick={handleAnswersClick}
                      onSignOut={handleSignOut}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                  onClick={signInWithGoogle}
                  className="bg-[#00358E] text-white px-3 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-colors hover:bg-[#002763] active:bg-[#001d42]"
                >
                  <span className="hidden sm:inline">Đăng nhập</span>
                  <span className="sm:hidden">Login</span>
                </motion.button>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors active:bg-slate-200"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-slate-700" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-700" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              id="mobile-menu"
              role="navigation"
              aria-label="Menu di động"
              className="fixed right-0 top-0 h-screen w-64 sm:w-72 bg-white z-30 lg:hidden overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-4 border-b border-slate-200 bg-white z-10">
                <h2 className="text-lg font-bold text-slate-900">Menu</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Đóng menu"
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" aria-hidden="true" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-2 space-y-1">
                {MENU_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => handleNavClick(item)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-semibold text-sm
                      ${isItemActive(item)
                        ? 'bg-[#00358E] text-white shadow-md'
                        : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'}
                    `}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* User Section */}
              {isSignedIn && user && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="border-t border-slate-200 p-4 space-y-3"
                >
                  <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-blue-50 border border-blue-200">
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Người dùng'}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || 'User'}</p>
                      <p className="text-xs text-slate-600 truncate">{user.email}</p>
                    </div>
                  </div>

                  {streak > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 bg-orange-50 px-3 py-3 rounded-lg border border-orange-200"
                    >
                      <Flame className="w-4 h-4 text-[#FF7D00] flex-shrink-0" aria-hidden="true" />
                      <span className="text-[#FF7D00] font-bold text-sm">{streak} ngày liên tiếp</span>
                    </motion.div>
                  )}

                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-blue-100 rounded-lg transition-colors font-semibold text-sm"
                  >
                    <User className="w-4 h-4" aria-hidden="true" />
                    <span>Trang cá nhân</span>
                  </button>

                  <button
                    onClick={handleAnswersClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-blue-100 rounded-lg transition-colors font-semibold text-sm"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    <span>Đáp án</span>
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-semibold text-sm"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    <span>Đăng xuất</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation - Mobile Only */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-slate-200 z-30"
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between px-1 py-2">
          {BOTTOM_MENU_ITEMS.map((item) => (
            <BottomNavItem
              key={item.id}
              item={item}
              isActive={isItemActive(item)}
              onClick={() => handleNavClick(item)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
          <motion.button
            onClick={() => setMobileOpen(true)}
            aria-label="Xem thêm"
            className="flex flex-col items-center gap-1 py-2 px-3 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <div className="p-2 bg-slate-100 rounded-lg">
              <Menu className="w-5 h-5 text-slate-600" aria-hidden="true" />
            </div>
            <span className="text-[9px] font-bold text-slate-700">Thêm</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="h-14 sm:h-16 pointer-events-none" />

      {/* Bottom spacer for mobile with bottom nav */}
      <div className="sm:hidden h-20 pointer-events-none" />
    </>
  );
};

export default Navbar;
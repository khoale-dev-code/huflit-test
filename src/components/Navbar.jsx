import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones, BookOpen, GraduationCap, Sparkles,
  LogOut, User, X, Languages, Home, FileText,
  ChevronRight, Star,
} from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { ROUTES } from '../config/routes';

/* ─────────────────────────────────────────────────────────────
   Route / menu config
   ───────────────────────────────────────────────────────────── */
const ALL_MENU_ITEMS = [
  { id: 'home',       label: 'Trang chủ', icon: Home,          path: ROUTES.HOME,   type: 'link'     },
  { id: 'listening',  label: 'Nghe',      icon: Headphones,    path: '/test',       type: 'test'     },
  { id: 'reading',    label: 'Đọc',       icon: BookOpen,      path: '/test',       type: 'test'     },
  { id: 'full',       label: 'Thi Thử',   icon: GraduationCap, path: '/full-exam',  type: 'exam'     },
  { id: 'grammar',    label: 'Ngữ Pháp',  icon: Sparkles,      path: '/grammar',    type: 'practice' },
  { id: 'vocabulary', label: 'Từ Vựng',   icon: Languages,     path: '/vocabulary', type: 'practice' },
];

const BOTTOM_NAV_ITEMS  = [ALL_MENU_ITEMS[0], ALL_MENU_ITEMS[1], ALL_MENU_ITEMS[3]];
const DESKTOP_MENU_ITEMS = ALL_MENU_ITEMS.slice(1);

/* ─────────────────────────────────────────────────────────────
   Scroll to top helper
   ───────────────────────────────────────────────────────────── */
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

/* ─────────────────────────────────────────────────────────────
   Animation presets
   ───────────────────────────────────────────────────────────── */
const drawerVariants = {
  hidden:  { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0,      transition: { type: 'spring', damping: 32, stiffness: 320 } },
  exit:    { opacity: 0, y: '100%', transition: { duration: 0.22, ease: 'easeIn' } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.045, duration: 0.28 } }),
};

/* ─────────────────────────────────────────────────────────────
   Desktop NavButton
   ───────────────────────────────────────────────────────────── */
const DesktopNavBtn = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      className={`
        flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap
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

/* ─────────────────────────────────────────────────────────────
   Bottom nav tab
   ───────────────────────────────────────────────────────────── */
const BottomTab = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      className="flex flex-col items-center justify-center flex-1 gap-0.5 relative group pt-2"
    >
      <div className={`
        p-1.5 rounded-xl transition-all duration-200
        ${isActive ? 'bg-blue-100 text-[#00358E]' : 'text-slate-500 group-hover:text-[#00358E]'}
      `}>
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <span className={`text-[9px] font-bold tracking-tight transition-colors
        ${isActive ? 'text-[#00358E]' : 'text-slate-500'}`}>
        {item.label}
      </span>
      {isActive && (
        <motion.span
          layoutId="bottom-tab-indicator"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#00358E] rounded-full"
          aria-hidden="true"
        />
      )}
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────
   "More" Drawer
   ───────────────────────────────────────────────────────────── */
const MoreDrawer = ({
  open, onClose, allItems, isItemActive, onNav,
  user, isSignedIn,
  onProfile, onAnswers, onSignOut, onSignIn,
}) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          key="drawer"
          variants={drawerVariants}
          initial="hidden" animate="visible" exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng"
          className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl overflow-hidden"
          style={{ maxHeight: '90vh' }}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-slate-200 rounded-full" aria-hidden="true" />
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-base">Menu</h2>
            <button
              onClick={onClose}
              aria-label="Đóng menu"
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="overflow-y-auto pb-safe" style={{ maxHeight: 'calc(90vh - 80px)' }}>

            {isSignedIn && user ? (
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-11 h-11 rounded-full border-2 border-white object-cover flex-shrink-0 shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || 'Người dùng'}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 pt-4 pb-2">
                <button
                  onClick={() => { onSignIn(); onClose(); }}
                  className="w-full py-3 bg-[#00358E] text-white font-bold rounded-xl text-sm hover:bg-[#002763] transition-colors"
                >
                  Đăng nhập để lưu tiến trình
                </button>
              </div>
            )}

            <div className="px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">
                Luyện tập
              </p>
              <div className="space-y-1">
                {allItems.map((item, i) => {
                  const Icon = item.icon;
                  const active = isItemActive(item);
                  return (
                    <motion.button
                      key={item.id}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => { onNav(item); onClose(); }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm
                        ${active
                          ? 'bg-[#00358E] text-white shadow-md'
                          : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'}
                      `}
                    >
                      <div className={`p-1.5 rounded-lg ${active ? 'bg-white/20' : 'bg-slate-100'}`}>
                        <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      </div>
                      <span className="flex-1 text-left">{item.label}</span>
                      {!active && <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {isSignedIn && (
              <div className="px-4 pb-4">
                <div className="h-px bg-slate-100 my-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">
                  Tài khoản
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => { onProfile(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors font-semibold text-sm"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100"><User className="w-4 h-4" /></div>
                    <span className="flex-1 text-left">Trang cá nhân</span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>

                  <button
                    onClick={() => { onAnswers(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors font-semibold text-sm"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100"><FileText className="w-4 h-4" /></div>
                    <span className="flex-1 text-left">Đáp án của tôi</span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>

                  <button
                    onClick={() => { onSignOut(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-semibold text-sm"
                  >
                    <div className="p-1.5 rounded-lg bg-red-50"><LogOut className="w-4 h-4" /></div>
                    <span className="flex-1 text-left">Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}

            <div className="h-4" />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ─────────────────────────────────────────────────────────────
   Desktop Profile Dropdown
   ───────────────────────────────────────────────────────────── */
const ProfileDropdown = ({ showMenu, setShowMenu, onProfileClick, onAnswersClick, onSignOut }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!showMenu) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setShowMenu(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMenu, setShowMenu]);

  return (
    <AnimatePresence>
      {showMenu && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          role="menu"
          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-30"
        >
          {[
            { label: 'Trang cá nhân', icon: User,     fn: onProfileClick },
            { label: 'Đáp án',         icon: FileText, fn: onAnswersClick  },
          ].map(({ label, icon: Icon, fn }) => (
            <button key={label} onClick={fn} role="menuitem"
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 transition-colors">
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </button>
          ))}
          <div className="border-t border-slate-100 my-1" />
          <button onClick={onSignOut} role="menuitem"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Đăng xuất</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN Navbar
   ───────────────────────────────────────────────────────────── */
const Navbar = ({ testType, onTestTypeChange, practiceType, onPracticeTypeChange }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, isSignedIn, signInWithGoogle, signOut } = useFirebaseAuth();

  const [isScrolled,      setIsScrolled]      = useState(false);
  const [drawerOpen,      setDrawerOpen]      = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Scroll listener
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setIsScrolled(window.scrollY > 10); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  /* ── Active check ── */
  const isItemActive = useCallback((item) => {
    const pathMatch = location.pathname === item.path;
    if (item.type === 'test')     return pathMatch && testType     === item.id;
    if (item.type === 'practice') return pathMatch && practiceType === item.id;
    return pathMatch;
  }, [location.pathname, testType, practiceType]);

  const handleNav = useCallback((item) => {
    if (item.type === 'test')     onTestTypeChange?.(item.id);
    if (item.type === 'practice') onPracticeTypeChange?.(item.id);
    navigate(item.path);
    scrollToTop();
  }, [navigate, onTestTypeChange, onPracticeTypeChange]);

  const handleProfile = useCallback(() => {
    navigate(ROUTES.PROFILE);
    scrollToTop();
    setShowProfileMenu(false);
  }, [navigate]);

  const handleAnswers = useCallback(() => {
    navigate(ROUTES.ANSWERS);
    scrollToTop();
    setShowProfileMenu(false);
  }, [navigate]);

  const handleSignOut = useCallback(() => {
    signOut();
    setShowProfileMenu(false);
  }, [signOut]);

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP top nav
          ════════════════════════════════════════ */}
      <nav
        role="navigation"
        aria-label="Điều hướng chính"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/50'
            : 'bg-white/80 backdrop-blur-sm border-b border-slate-100/30'
        }`}
        style={{ WebkitBackdropFilter: 'blur(12px)', willChange: 'transform' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <button
              onClick={() => { navigate(ROUTES.HOME); scrollToTop(); }}
              aria-label="HubStudy - Trang chủ"
              className="flex items-center gap-2 flex-shrink-0 transition-opacity hover:opacity-75"
            >
              <div className="w-9 h-9 bg-[#1A73E8] rounded-xl flex items-center justify-center shadow-lg">
                <Star className="text-white w-5 h-5 fill-current" aria-hidden="true" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">HubStudy</span>
            </button>

            {/* Desktop menu pills */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
              {DESKTOP_MENU_ITEMS.map(item => (
                <DesktopNavBtn
                  key={item.id}
                  item={item}
                  isActive={isItemActive(item)}
                  onClick={() => handleNav(item)}
                />
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isSignedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(v => !v)}
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
                  <ProfileDropdown
                    showMenu={showProfileMenu}
                    setShowMenu={setShowProfileMenu}
                    onProfileClick={handleProfile}
                    onAnswersClick={handleAnswers}
                    onSignOut={handleSignOut}
                  />
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="bg-[#00358E] text-white px-3 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm hover:bg-[#002763] active:bg-[#001d42] transition-colors"
                >
                  <span className="hidden sm:inline">Đăng nhập</span>
                  <span className="sm:hidden">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Top nav spacer */}
      <div className="h-14 sm:h-16 pointer-events-none" />

      {/* ════════════════════════════════════════
          MOBILE bottom nav
          ════════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200">
        {/* Tabs row — fixed 64px height */}
        <div className="flex items-stretch h-16">
          {BOTTOM_NAV_ITEMS.map(item => (
            <BottomTab
              key={item.id}
              item={item}
              isActive={isItemActive(item)}
              onClick={() => handleNav(item)}
            />
          ))}

          {/* "Thêm" button */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Xem thêm tùy chọn"
            aria-expanded={drawerOpen}
            aria-haspopup="dialog"
            className="flex flex-col items-center justify-center flex-1 gap-0.5 group pt-2"
          >
            {isSignedIn && user?.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-7 h-7 rounded-full border-2 border-slate-200 object-cover"
                aria-hidden="true"
              />
            ) : (
              <div className="p-1.5 rounded-xl text-slate-500 group-hover:text-[#00358E] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <circle cx="5"  cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                </svg>
              </div>
            )}
            <span className="text-[9px] font-bold tracking-tight text-slate-500 group-hover:text-[#00358E] transition-colors">
              {isSignedIn ? 'Tôi' : 'Thêm'}
            </span>
          </button>
        </div>

        {/* ✅ Safe area filler — fills the gap on iPhone notch/home bar */}
        <div style={{ height: 'env(safe-area-inset-bottom)', backgroundColor: 'rgba(255,255,255,0.95)' }} />
      </div>

 
      <div
        className="lg:hidden pointer-events-none"
        style={{ height: 'calc(64px + env(safe-area-inset-bottom))' }}
      />

      {/* ════════════════════════════════════════
          Full-screen "More" drawer
          ════════════════════════════════════════ */}
      <MoreDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        allItems={ALL_MENU_ITEMS}
        isItemActive={isItemActive}
        onNav={handleNav}
        user={user}
        isSignedIn={isSignedIn}
        onProfile={handleProfile}
        onAnswers={handleAnswers}
        onSignOut={handleSignOut}
        onSignIn={signInWithGoogle}
      />
    </>
  );
};

export default Navbar;
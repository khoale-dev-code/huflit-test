import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones, BookOpen, GraduationCap, Sparkles,
  LogOut, User, X, Home, FileText, ChevronRight, Star,
} from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { ROUTES } from '../config/routes';

/* ─── Config ─────────────────────────────────────────────── */
const ALL_MENU_ITEMS = [
  { id: 'home',       label: 'Trang chủ', icon: Home,          path: ROUTES.HOME,   type: 'link' },
  { id: 'listening',  label: 'Nghe',      icon: Headphones,    path: '/test',       type: 'test' },
  { id: 'reading',    label: 'Đọc',       icon: BookOpen,      path: '/test',       type: 'test' },
  { id: 'full',       label: 'Thi Thử',   icon: GraduationCap, path: '/full-exam',  type: 'exam' },
  { id: 'lessons',    label: 'Bài Học',   icon: Sparkles,      path: '/learn',      type: 'link' }, 
];

// Thanh điều hướng Mobile (Chỉ lấy Home, Thi Thử, Bài Học)
const BOTTOM_NAV_ITEMS   = [ALL_MENU_ITEMS[0], ALL_MENU_ITEMS[3], ALL_MENU_ITEMS[4]];
// Thanh điều hướng Desktop (Bỏ Home vì đã có Logo)
const DESKTOP_MENU_ITEMS = ALL_MENU_ITEMS.slice(1);

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ─── Animation presets ──────────────────────────────────── */
const drawerVariants = {
  hidden:  { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0,      transition: { type: 'spring', damping: 28, stiffness: 280 } },
  exit:    { opacity: 0, y: '100%', transition: { duration: 0.2, ease: 'easeIn' } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.25, type: 'spring' } }),
};

/* ─── Desktop Nav Button (Gamified 3D) ───────────────────── */
const DesktopNavBtn = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      className={`flex items-center gap-2 px-4 lg:px-5 py-2.5 lg:py-3 rounded-[16px] lg:rounded-[20px] font-display font-bold text-[14px] lg:text-[16px] uppercase tracking-wider border-2 transition-all outline-none ${
        isActive 
          ? 'bg-[#EAF6FE] text-[#1CB0F6] border-[#1CB0F6] border-b-[4px] -translate-y-1 shadow-sm' 
          : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700 active:bg-slate-200'
      }`}
    >
      <Icon size={18} strokeWidth={isActive ? 3 : 2.5} className="lg:w-5 lg:h-5" aria-hidden="true" />
      {item.label}
    </button>
  );
};

/* ─── Bottom Nav Tab (Mobile) ────────────────────────────── */
const BottomTab = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      className="flex-1 flex flex-col items-center justify-center gap-1 pt-2 pb-1 bg-transparent border-none cursor-pointer outline-none group"
    >
      <div className={`px-4 py-1.5 rounded-[12px] transition-all duration-200 ${
        isActive ? 'bg-[#EAF6FE] text-[#1CB0F6] scale-110' : 'bg-transparent text-slate-400 group-hover:bg-slate-50'
      }`}>
        <Icon size={22} strokeWidth={isActive ? 3 : 2.5} aria-hidden="true" />
      </div>
      <span className={`font-display font-bold text-[10px] uppercase tracking-widest transition-colors ${
        isActive ? 'text-[#1CB0F6]' : 'text-slate-400'
      }`}>
        {item.label}
      </span>
    </button>
  );
};

/* ─── More Drawer (Mobile Menu Khám phá) ─────────────────── */
const MoreDrawer = ({ open, onClose, allItems, isItemActive, onNav, user, isSignedIn, onProfile, onAnswers, onSignOut, onSignIn }) => (
  <AnimatePresence>
    {open && (
      <>
        <Motion.div
          key="backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
        />

        <Motion.div
          key="drawer"
          variants={drawerVariants}
          initial="hidden" animate="visible" exit="exit"
          role="dialog" aria-modal="true"
          className="fixed bottom-0 left-0 right-0 z-[70] bg-slate-50 rounded-t-[32px] shadow-2xl border-t-4 border-slate-200 flex flex-col max-h-[90vh] font-sans lg:hidden"
          style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
        >
          {/* Knob */}
          <div className="flex justify-center py-3 bg-white rounded-t-[32px]">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full" aria-hidden="true" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pb-4 bg-white border-b-2 border-slate-100">
            <h2 className="font-display font-black text-[18px] text-slate-800 m-0">Menu khám phá</h2>
            <button
              onClick={onClose}
              className="p-2 bg-slate-50 border-2 border-slate-200 border-b-[3px] rounded-[12px] text-slate-500 hover:text-slate-700 active:border-b-[1px] active:translate-y-[2px] transition-all"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          <div className="overflow-y-auto px-5 py-6 flex-1 custom-scrollbar">

            {/* Profile / Sign in */}
            {isSignedIn && user ? (
              <div className="mb-6 p-3 bg-white rounded-[20px] border-2 border-slate-200 border-b-[4px] flex items-center gap-4 shadow-sm">
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-12 h-12 rounded-[14px] border-2 border-[#EAF6FE] object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="font-display font-black text-[16px] text-slate-800 m-0 truncate">{user.displayName || 'Người dùng'}</p>
                  <p className="font-body font-bold text-[12px] text-slate-400 m-0 mt-0.5 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <button
                  onClick={() => { onSignIn(); onClose(); }}
                  className="w-full py-3.5 bg-[#58CC02] text-white border-2 border-[#46A302] border-b-[4px] rounded-[16px] font-display font-black text-[15px] uppercase tracking-wider active:border-b-[1px] active:translate-y-[3px] transition-all shadow-sm"
                >
                  Đăng nhập ngay
                </button>
                <p className="text-center font-body font-bold text-[12px] text-slate-400 mt-3">Lưu tiến trình học tập của bạn</p>
              </div>
            )}

            {/* Menu grid */}
            <p className="font-display font-black text-[11px] text-slate-400 uppercase tracking-widest mb-3 ml-2">Khu vực rèn luyện</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {allItems.map((item, i) => {
                const Icon = item.icon;
                const active = isItemActive(item);
                return (
                  <Motion.button
                    key={item.id} custom={i} variants={itemVariants} initial="hidden" animate="visible"
                    onClick={() => { onNav(item); onClose(); }}
                    className={`flex flex-col items-start gap-3 p-4 rounded-[20px] border-2 border-b-[4px] transition-all outline-none text-left ${
                      active 
                        ? 'bg-[#EAF6FE] border-[#1CB0F6] text-[#1CB0F6] shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 active:border-b-2 active:translate-y-[2px]'
                    }`}
                  >
                    <div className={`p-2.5 rounded-[12px] ${active ? 'bg-[#1CB0F6] text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon size={22} strokeWidth={2.5} />
                    </div>
                    <span className="font-display font-black text-[14px] leading-tight">{item.label}</span>
                  </Motion.button>
                );
              })}
            </div>

            {/* Account actions */}
            {isSignedIn && (
              <>
                <p className="font-display font-black text-[11px] text-slate-400 uppercase tracking-widest mb-3 ml-2">Tài khoản</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Hồ sơ của tôi',  icon: User,     onClick: () => { onProfile(); onClose(); }, danger: false },
                    { label: 'Lịch sử đáp án', icon: FileText, onClick: () => { onAnswers(); onClose(); }, danger: false },
                    { label: 'Đăng xuất',      icon: LogOut,   onClick: () => { onSignOut(); onClose(); }, danger: true  },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={btn.onClick}
                      className={`flex items-center gap-3 p-4 rounded-[18px] border-2 border-b-[4px] transition-all text-left outline-none ${
                        btn.danger 
                          ? 'bg-[#fff0f0] border-[#ffc1c1] text-[#FF4B4B] hover:bg-[#FF4B4B] hover:border-[#E54343] hover:text-white active:border-b-2 active:translate-y-[2px]' 
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:border-b-2 active:translate-y-[2px]'
                      }`}
                    >
                      <btn.icon size={20} strokeWidth={2.5} className="shrink-0" />
                      <span className="font-display font-bold text-[15px] flex-1">{btn.label}</span>
                      <ChevronRight size={18} strokeWidth={3} className={btn.danger ? 'opacity-50' : 'text-slate-300'} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </Motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ─── Desktop Profile Dropdown ───────────────────────────── */
const ProfileDropdown = ({ showMenu, setShowMenu, onProfileClick, onAnswersClick, onSignOut }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!showMenu) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setShowMenu(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [showMenu, setShowMenu]);

  return (
    <AnimatePresence>
      {showMenu && (
        <Motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15, type: 'spring', stiffness: 320 }}
          className="absolute right-0 top-[calc(100%+12px)] w-56 bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-xl p-2.5 z-50 flex flex-col gap-1.5 hidden lg:flex"
        >
          {[
            { label: 'Trang cá nhân', icon: User,     fn: onProfileClick },
            { label: 'Đáp án của tôi', icon: FileText, fn: onAnswersClick  },
          ].map(({ label, icon: Icon, fn }) => (
            <button key={label} onClick={fn} className="flex items-center gap-3 p-3 rounded-[16px] font-display font-bold text-[14px] text-slate-700 hover:bg-slate-100 transition-colors text-left outline-none">
              <Icon size={18} strokeWidth={2.5} className="text-slate-500" />
              {label}
            </button>
          ))}
          <div className="h-0.5 bg-slate-100 my-1 mx-2 rounded-full" />
          <button onClick={onSignOut} className="flex items-center gap-3 p-3 rounded-[16px] font-display font-bold text-[14px] text-[#FF4B4B] hover:bg-[#fff0f0] transition-colors text-left outline-none">
            <LogOut size={18} strokeWidth={2.5} />
            Đăng xuất
          </button>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── MAIN Navbar ────────────────────────────────────────── */
const Navbar = ({ testType, onTestTypeChange, practiceType, onPracticeTypeChange }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, isSignedIn, signOut } = useFirebaseAuth();

  const [isScrolled,      setIsScrolled]      = useState(false);
  const [drawerOpen,      setDrawerOpen]      = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  const isItemActive = useCallback((item) => {
    const pathMatch = location.pathname.startsWith(item.path);
    if (item.type === 'test')     return pathMatch && testType     === item.id;
    if (item.type === 'practice') return pathMatch && practiceType === item.id;
    return location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
  }, [location.pathname, testType, practiceType]);

  const handleNav = useCallback((item) => {
    if (item.type === 'test')     onTestTypeChange?.(item.id);
    if (item.type === 'practice') onPracticeTypeChange?.(item.id);
    navigate(item.path);
    scrollToTop();
  }, [navigate, onTestTypeChange, onPracticeTypeChange]);

  const handleProfile = useCallback(() => { navigate(ROUTES.PROFILE); scrollToTop(); setShowProfileMenu(false); }, [navigate]);
  const handleAnswers = useCallback(() => { navigate(ROUTES.ANSWERS); scrollToTop(); setShowProfileMenu(false); }, [navigate]);
  const handleSignOut = useCallback(() => { signOut(); setShowProfileMenu(false); }, [signOut]);

  return (
    <div className="font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* ── Desktop Top Nav ── */}
      <nav
        role="navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl border-b-2 border-slate-200 shadow-sm py-1.5 lg:py-2' : 'bg-white/80 backdrop-blur-md border-b-2 border-slate-100 py-2.5 lg:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-[72px]">

            {/* Logo */}
            <button
              onClick={() => { navigate(ROUTES.HOME); scrollToTop(); }}
              className="flex items-center gap-2.5 lg:gap-3 bg-transparent border-none cursor-pointer outline-none shrink-0 group"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#1CB0F6] rounded-[12px] lg:rounded-[14px] flex items-center justify-center border-b-[3px] lg:border-b-[4px] border-[#1899D6] shadow-sm group-active:translate-y-[2px] group-active:border-b-[1px] transition-all">
                <Star className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="white" strokeWidth={1.5} />
              </div>
              <span className="font-display text-[22px] lg:text-[26px] font-black text-slate-800 tracking-tight">HubStudy</span>
            </button>

            {/* Desktop menu (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center gap-3">
              {DESKTOP_MENU_ITEMS.map(item => (
                <DesktopNavBtn key={item.id} item={item} isActive={isItemActive(item)} onClick={() => handleNav(item)} />
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 lg:gap-4">
              {isSignedIn ? (
                <div className="relative hidden lg:block">
                  <button
                    onClick={() => setShowProfileMenu(v => !v)}
                    className="p-1 lg:p-1.5 bg-transparent border-2 border-slate-200 border-b-[4px] rounded-[14px] lg:rounded-[18px] cursor-pointer outline-none hover:border-[#1CB0F6] hover:-translate-y-0.5 active:translate-y-[2px] active:border-b-[2px] transition-all"
                  >
                    <img src={user?.photoURL} alt={user?.displayName || 'Hồ sơ'} className="w-8 h-8 lg:w-10 lg:h-10 rounded-[10px] lg:rounded-[12px] object-cover bg-slate-100 block" loading="lazy" />
                  </button>
                  <ProfileDropdown showMenu={showProfileMenu} setShowMenu={setShowProfileMenu} onProfileClick={handleProfile} onAnswersClick={handleAnswers} onSignOut={handleSignOut} />
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 lg:px-6 lg:py-3.5 bg-[#58CC02] text-white border-2 border-[#46A302] border-b-[4px] rounded-[16px] lg:rounded-[20px] font-display font-black uppercase text-[13px] lg:text-[15px] tracking-wider cursor-pointer outline-none hover:bg-[#46A302] hover:-translate-y-0.5 active:translate-y-[3px] active:border-b-[1px] transition-all shadow-sm"
                >
                  Bắt đầu ngay
                </button>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Spacer bù đắp chiều cao Header bị fixed */}
      <div className="h-[76px] lg:h-[100px] pointer-events-none" />

      {/* ── Mobile Bottom Nav ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] pb-safe">
        <div className="flex items-stretch h-[68px]">
          {BOTTOM_NAV_ITEMS.map(item => (
            <BottomTab key={item.id} item={item} isActive={isItemActive(item)} onClick={() => handleNav(item)} />
          ))}

          {/* More / Profile tab */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex-1 flex flex-col items-center justify-center gap-1 pt-2 pb-1 bg-transparent border-none cursor-pointer outline-none group"
          >
            {isSignedIn && user?.photoURL ? (
              <div className={`p-1 rounded-[14px] transition-all duration-200 ${drawerOpen ? 'bg-[#EAF6FE] scale-110' : 'bg-transparent group-hover:bg-slate-50'}`}>
                <img src={user.photoURL} alt="" className={`w-7 h-7 rounded-full border-2 object-cover block transition-colors ${drawerOpen ? 'border-[#1CB0F6]' : 'border-slate-300'}`} />
              </div>
            ) : (
              <div className={`px-4 py-2.5 rounded-[12px] transition-all duration-200 flex gap-1 items-center ${drawerOpen ? 'bg-[#EAF6FE] text-[#1CB0F6] scale-110' : 'bg-transparent text-slate-400 group-hover:bg-slate-50'}`}>
                {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />)}
              </div>
            )}
            <span className={`font-display font-bold text-[10px] uppercase tracking-widest transition-colors ${drawerOpen ? 'text-[#1CB0F6]' : 'text-slate-400'}`}>
              {isSignedIn ? 'Hồ sơ' : 'Thêm'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile spacer dưới cùng */}
      <div className="lg:hidden h-[68px] pb-safe pointer-events-none" />

      {/* Drawer Mobile */}
      <MoreDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        allItems={ALL_MENU_ITEMS} isItemActive={isItemActive} onNav={handleNav}
        user={user} isSignedIn={isSignedIn}
        onProfile={handleProfile} onAnswers={handleAnswers}
        onSignOut={handleSignOut} onSignIn={() => navigate('/login')}
      />

    </div>
  );
};

export default Navbar;
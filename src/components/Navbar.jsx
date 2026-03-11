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

/* ─── Config ─────────────────────────────────────────────── */
const ALL_MENU_ITEMS = [
  { id: 'home',       label: 'Trang chủ', icon: Home,          path: ROUTES.HOME,   type: 'link'     },
  { id: 'listening',  label: 'Nghe',      icon: Headphones,    path: '/test',       type: 'test'     },
  { id: 'reading',    label: 'Đọc',       icon: BookOpen,      path: '/test',       type: 'test'     },
  { id: 'full',       label: 'Thi Thử',   icon: GraduationCap, path: '/full-exam',  type: 'exam'     },
  { id: 'grammar',    label: 'Ngữ Pháp',  icon: Sparkles,      path: '/grammar',    type: 'practice' },
  { id: 'vocabulary', label: 'Từ Vựng',   icon: Languages,     path: '/vocabulary', type: 'practice' },
];
const BOTTOM_NAV_ITEMS   = [ALL_MENU_ITEMS[0], ALL_MENU_ITEMS[1], ALL_MENU_ITEMS[3]];
const DESKTOP_MENU_ITEMS = ALL_MENU_ITEMS.slice(1);

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

/* ─── Design tokens ──────────────────────────────────────── */
const C = {
  blue: '#1CB0F6', blueDark: '#1899D6', blueBg: '#EAF6FE',
  green: '#58CC02', greenDark: '#46A302',
  n100: '#F1F5F9', n200: '#E2E8F0', n400: '#94A3B8', n500: '#64748B', n800: '#1E293B',
  red: '#FF4B4B', redBg: '#FFF0F0',
};
const F = { body: '"Nunito", "Baloo 2", sans-serif', display: '"Baloo 2", "Nunito", sans-serif' };

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

/* ─── Desktop nav button ─────────────────────────────────── */
const DesktopNavBtn = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '7px 13px', borderRadius: 13,
        fontFamily: F.body, fontSize: 13, fontWeight: 800,
        whiteSpace: 'nowrap', cursor: 'pointer', outline: 'none',
        border: `2px solid ${isActive ? `${C.blue}40` : 'transparent'}`,
        borderBottom: `${isActive ? 3 : 2}px solid ${isActive ? `${C.blue}60` : 'transparent'}`,
        background: isActive ? C.blueBg : 'transparent',
        color: isActive ? C.blue : C.n500,
        transform: isActive ? 'translateY(-1px)' : 'none',
        transition: 'all 0.15s',
      }}
    >
      <Icon size={15} strokeWidth={isActive ? 3 : 2.5} aria-hidden="true" />
      {item.label}
    </button>
  );
};

/* ─── Bottom nav tab ─────────────────────────────────────── */
const BottomTab = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 3, paddingTop: 8, paddingBottom: 4,
        background: 'none', border: 'none', cursor: 'pointer', outline: 'none',
      }}
    >
      <div style={{
        padding: '5px 14px', borderRadius: 12,
        background: isActive ? C.blueBg : 'transparent',
        color: isActive ? C.blue : C.n400,
        transition: 'all 0.2s',
        transform: isActive ? 'scale(1.1)' : 'scale(1)',
      }}>
        <Icon size={20} strokeWidth={isActive ? 3 : 2.5} aria-hidden="true" />
      </div>
      <span style={{
        fontFamily: F.body, fontSize: 10, fontWeight: 800, letterSpacing: '0.03em',
        color: isActive ? C.blue : C.n400, transition: 'color 0.2s',
      }}>
        {item.label}
      </span>
    </button>
  );
};

/* ─── More Drawer ────────────────────────────────────────── */
const MoreDrawer = ({ open, onClose, allItems, isItemActive, onNav, user, isSignedIn, onProfile, onAnswers, onSignOut, onSignIn }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden="true"
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)', zIndex: 60 }}
        />

        <motion.div
          key="drawer"
          variants={drawerVariants}
          initial="hidden" animate="visible" exit="exit"
          role="dialog" aria-modal="true"
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 70,
            background: C.n100, borderRadius: '28px 28px 0 0',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.08)',
            borderTop: `3px solid ${C.n200}`,
            maxHeight: '92vh', display: 'flex', flexDirection: 'column',
            fontFamily: F.body,
          }}
        >
          {/* Knob */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px', background: '#fff', borderRadius: '28px 28px 0 0' }}>
            <div style={{ width: 40, height: 5, background: C.n200, borderRadius: 99 }} aria-hidden="true" />
          </div>

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 20px 12px', background: '#fff', borderBottom: `2px solid ${C.n100}`,
          }}>
            <h2 style={{ fontFamily: F.display, fontSize: 16, fontWeight: 900, color: C.n800, margin: 0 }}>Menu khám phá</h2>
            <button
              onClick={onClose}
              style={{ padding: 8, background: C.n100, border: `1.5px solid ${C.n200}`, borderRadius: 12, cursor: 'pointer', display: 'flex', color: C.n500 }}
            >
              <X size={18} strokeWidth={3} />
            </button>
          </div>

          <div style={{ overflowY: 'auto', padding: '16px 16px 40px', flex: 1 }}>

            {/* Profile / Sign in */}
            {isSignedIn && user ? (
              <div style={{ marginBottom: 18, padding: '12px 14px', background: '#fff', borderRadius: 20, border: `2px solid ${C.n200}`, boxShadow: `0 3px 0 ${C.n200}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={user.photoURL} alt={user.displayName || 'User'} style={{ width: 44, height: 44, borderRadius: 13, border: `2px solid ${C.blueBg}`, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: C.n800, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.displayName || 'Người dùng'}</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.n400, margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 18 }}>
                <button
                  onClick={() => { onSignIn(); onClose(); }}
                  style={{ width: '100%', padding: '13px', background: C.green, color: '#fff', border: 'none', borderBottom: `4px solid ${C.greenDark}`, borderRadius: 18, fontFamily: F.display, fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer' }}
                >
                  Đăng nhập ngay
                </button>
                <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: C.n400, marginTop: 8 }}>Lưu tiến trình học tập của bạn</p>
              </div>
            )}

            {/* Menu grid */}
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.n400, marginBottom: 10, paddingLeft: 4 }}>Khu vực rèn luyện</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {allItems.map((item, i) => {
                const Icon = item.icon;
                const active = isItemActive(item);
                return (
                  <motion.button
                    key={item.id} custom={i} variants={itemVariants} initial="hidden" animate="visible"
                    onClick={() => { onNav(item); onClose(); }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
                      padding: '14px 14px', borderRadius: 20, cursor: 'pointer', textAlign: 'left', outline: 'none',
                      fontFamily: F.body,
                      background: active ? C.blueBg : '#fff',
                      border: `2px solid ${active ? `${C.blue}50` : C.n200}`,
                      boxShadow: `0 ${active ? 2 : 3}px 0 ${active ? `${C.blue}30` : C.n200}`,
                      color: active ? C.blue : C.n500,
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ padding: 8, borderRadius: 12, background: active ? C.blue : C.n100, color: active ? '#fff' : C.n500, display: 'flex' }}>
                      <Icon size={18} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800 }}>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Account actions */}
            {isSignedIn && (
              <>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.n400, marginBottom: 10, paddingLeft: 4 }}>Tài khoản</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'Hồ sơ của tôi',  icon: User,     onClick: () => { onProfile(); onClose(); }, danger: false },
                    { label: 'Lịch sử đáp án',  icon: FileText, onClick: () => { onAnswers(); onClose(); }, danger: false },
                    { label: 'Đăng xuất',        icon: LogOut,   onClick: () => { onSignOut(); onClose(); }, danger: true  },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={btn.onClick}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 16px', borderRadius: 16, cursor: 'pointer', textAlign: 'left', outline: 'none',
                        fontFamily: F.body, fontSize: 13, fontWeight: 800,
                        background: btn.danger ? C.redBg : '#fff',
                        border: `2px solid ${btn.danger ? '#FFCDD2' : C.n200}`,
                        boxShadow: `0 3px 0 ${btn.danger ? '#FFCDD2' : C.n200}`,
                        color: btn.danger ? C.red : C.n800,
                      }}
                    >
                      <btn.icon size={17} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>{btn.label}</span>
                      <ChevronRight size={15} strokeWidth={3} style={{ opacity: 0.35 }} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
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
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.15, type: 'spring', stiffness: 320 }}
          role="menu"
          style={{
            position: 'absolute', right: 0, top: 'calc(100% + 8px)',
            width: 200, background: '#fff', borderRadius: 20,
            boxShadow: '0 10px 36px rgba(0,0,0,0.1)', border: `2px solid ${C.n200}`,
            padding: '6px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: 2,
            fontFamily: F.body,
          }}
        >
          {[
            { label: 'Trang cá nhân', icon: User,     fn: onProfileClick },
            { label: 'Đáp án của tôi', icon: FileText, fn: onAnswersClick  },
          ].map(({ label, icon: Icon, fn }) => (
            <button key={label} onClick={fn} role="menuitem"
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 13, fontSize: 13, fontWeight: 800, color: C.n800, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none', fontFamily: F.body }}
              onMouseEnter={e => e.currentTarget.style.background = C.n100}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <Icon size={15} strokeWidth={2.5} />
              {label}
            </button>
          ))}
          <div style={{ height: 1, background: C.n100, margin: '2px 8px' }} />
          <button onClick={onSignOut} role="menuitem"
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 13, fontSize: 13, fontWeight: 800, color: C.red, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none', fontFamily: F.body }}
            onMouseEnter={e => e.currentTarget.style.background = C.redBg}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <LogOut size={15} strokeWidth={2.5} />
            Đăng xuất
          </button>
        </motion.div>
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

  const handleProfile = useCallback(() => { navigate(ROUTES.PROFILE); scrollToTop(); setShowProfileMenu(false); }, [navigate]);
  const handleAnswers = useCallback(() => { navigate(ROUTES.ANSWERS); scrollToTop(); setShowProfileMenu(false); }, [navigate]);
  const handleSignOut = useCallback(() => { signOut(); setShowProfileMenu(false); }, [signOut]);

  return (
    <div style={{ fontFamily: F.body }}>
      {/* ── Desktop Top Nav ── */}
      <nav
        role="navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
          background: isScrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(14px)',
          borderBottom: `2px solid ${isScrolled ? C.n200 : C.n100}`,
          boxShadow: isScrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.2s',
          padding: isScrolled ? '2px 0' : '4px 0',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>

            {/* Logo */}
            <button
              onClick={() => { navigate(ROUTES.HOME); scrollToTop(); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', outline: 'none', flexShrink: 0 }}
            >
              <div style={{ width: 38, height: 38, background: C.blue, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: `0 3px 0 ${C.blueDark}` }}>
                <Star size={18} color="#fff" fill="#fff" strokeWidth={1.5} />
              </div>
              <span style={{ fontFamily: F.display, fontSize: 19, fontWeight: 900, color: C.n800, letterSpacing: '-0.02em' }}>HubStudy</span>
            </button>

            {/* Desktop menu */}
            <div style={{ display: 'none', alignItems: 'center', gap: 4 }} className="lg-flex">
              {DESKTOP_MENU_ITEMS.map(item => (
                <DesktopNavBtn key={item.id} item={item} isActive={isItemActive(item)} onClick={() => handleNav(item)} />
              ))}
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {isSignedIn ? (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowProfileMenu(v => !v)}
                    style={{ display: 'flex', padding: 3, background: 'none', border: `2px solid ${C.n200}`, borderRadius: 13, cursor: 'pointer', outline: 'none' }}
                  >
                    <img src={user?.photoURL} alt={user?.displayName || 'Hồ sơ'} style={{ width: 32, height: 32, borderRadius: 9, objectFit: 'cover', background: C.n100, display: 'block' }} loading="lazy" />
                  </button>
                  <ProfileDropdown showMenu={showProfileMenu} setShowMenu={setShowProfileMenu} onProfileClick={handleProfile} onAnswersClick={handleAnswers} onSignOut={handleSignOut} />
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '8px 18px', background: C.green, color: '#fff',
                    border: 'none', borderBottom: `3px solid ${C.greenDark}`,
                    borderRadius: 13, fontFamily: F.display, fontSize: 13, fontWeight: 900,
                    textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', outline: 'none',
                  }}
                >
                  Bắt đầu ngay
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop spacer */}
      <div style={{ height: 64, pointerEvents: 'none' }} className="lg-block" />

      {/* ── Mobile Bottom Nav ── */}
      <div className="lg-hidden" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 45,
        background: '#fff', borderTop: `2px solid ${C.n200}`,
        boxShadow: '0 -3px 16px rgba(0,0,0,0.05)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        <div style={{ display: 'flex', alignItems: 'stretch', height: 62 }}>
          {BOTTOM_NAV_ITEMS.map(item => (
            <BottomTab key={item.id} item={item} isActive={isItemActive(item)} onClick={() => handleNav(item)} />
          ))}

          {/* More / Profile tab */}
          <button
            onClick={() => setDrawerOpen(true)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 3, paddingTop: 8, paddingBottom: 4,
              background: 'none', border: 'none', cursor: 'pointer', outline: 'none',
            }}
          >
            {isSignedIn && user?.photoURL ? (
              <div style={{ padding: '4px 12px', borderRadius: 12, background: drawerOpen ? C.blueBg : 'transparent', transition: 'all 0.2s' }}>
                <img src={user.photoURL} alt="" style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${drawerOpen ? C.blue : C.n200}`, objectFit: 'cover', display: 'block', transition: 'border-color 0.2s' }} />
              </div>
            ) : (
              <div style={{ padding: '6px 14px', borderRadius: 12, background: drawerOpen ? C.blueBg : 'transparent', color: drawerOpen ? C.blue : C.n400, display: 'flex', gap: 3, alignItems: 'center', transition: 'all 0.2s' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />)}
              </div>
            )}
            <span style={{ fontFamily: F.body, fontSize: 10, fontWeight: 800, color: drawerOpen ? C.blue : C.n400, letterSpacing: '0.03em', transition: 'color 0.2s' }}>
              {isSignedIn ? 'Hồ sơ' : 'Thêm'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile spacer */}
      <div className="lg-hidden" style={{ height: 62, pointerEvents: 'none' }} />

      {/* Drawer */}
      <MoreDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        allItems={ALL_MENU_ITEMS} isItemActive={isItemActive} onNav={handleNav}
        user={user} isSignedIn={isSignedIn}
        onProfile={handleProfile} onAnswers={handleAnswers}
        onSignOut={handleSignOut} onSignIn={() => navigate('/login')}
      />

      {/* Responsive helpers */}
      <style>{`
        @media (min-width: 1024px) {
          .lg-flex  { display: flex !important; }
          .lg-block { display: block !important; }
          .lg-hidden { display: none !important; }
        }
        @media (max-width: 1023px) {
          .lg-flex  { display: none !important; }
          .lg-block { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
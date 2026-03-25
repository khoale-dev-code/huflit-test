import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  Headphones, BookOpen, GraduationCap, Sparkles,
  LogOut, User, X, Home, FileText, ChevronDown, Star,
  Target, Menu, Wrench, Bot, MessageCircle, PenTool
} from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { ROUTES } from '../config/routes';

/* ════════════════════════════════════════════════════════════════
   1. DATA CONFIGURATION
════════════════════════════════════════════════════════════════ */
const NAVIGATION_CONFIG = [
  { id: 'home', label: 'Trang chủ', icon: Home, path: ROUTES.HOME, type: 'link' },
  { 
    id: 'exams', label: 'Luyện thi', icon: Target, type: 'dropdown',
    children: [
      { id: 'toeic', label: 'Chứng chỉ TOEIC', icon: Headphones, path: '/exams/toeic', desc: 'Đánh giá kỹ năng giao tiếp', isMaintenance: true },
      { id: 'ielts', label: 'Chứng chỉ IELTS', icon: BookOpen, path: '/exams/ielts', desc: 'Học thuật & Tổng quát', isMaintenance: true },
      { id: 'huflit', label: 'Đầu ra HUFLIT', icon: GraduationCap, path: '/exams/huflit', desc: 'Chuẩn tiếng Anh nội bộ', isMaintenance: false },
      { id: 'thptqg', label: 'THPT Quốc Gia', icon: FileText, path: '/exams/thptqg', desc: 'Ôn thi Đại học', isMaintenance: true },
    ]
  },
  {
    id: 'ai-lab', label: 'Phòng AI', icon: Bot, type: 'dropdown', isNew: true,
    children: [
      { id: 'ai-professor', label: 'Gia sư AI', icon: GraduationCap, path: '/ai-lab/professor', desc: 'Giảng bài & ra bài tập', isMaintenance: false },
      { id: 'ai-grammar', label: 'Trợ giảng Ngữ Pháp', icon: Sparkles, path: '/ai-lab/grammar', desc: 'Phân tích câu khó', isMaintenance: false },
      { id: 'ai-roleplay', label: 'Luyện giao tiếp', icon: MessageCircle, path: '/ai-lab/roleplay', desc: 'Chat thực tế với Bot', isMaintenance: false },
      { id: 'ai-writing', label: 'Chấm điểm Writing', icon: PenTool, path: '/ai-lab/writing', desc: 'Sửa lỗi & gợi ý từ vựng', isMaintenance: false },
    ]
  },
  { id: 'lessons', label: 'Bài học', icon: Sparkles, path: '/learn', type: 'link' }, 
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const drawerVariants = {
  hidden:  { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 28, stiffness: 280 } },
  exit:    { opacity: 0, y: '100%', transition: { duration: 0.2, ease: 'easeIn' } },
};

/* ════════════════════════════════════════════════════════════════
   2. REUSABLE COMPONENTS (Đã bọc React.memo chống giật)
════════════════════════════════════════════════════════════════ */

const DesktopNavItem = memo(({ item, currentPath, onNav }) => {
  const isActive = item.path === currentPath || (item.children && item.children.some(c => currentPath.startsWith(c.path)));
  const Icon = item.icon;

  if (item.type === 'link') {
    return (
      <button
        onClick={() => onNav(item)}
        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-display font-black text-[15px] uppercase tracking-wider border-2 transition-all outline-none ${
          isActive 
            ? 'bg-[#EAF6FE] text-[#1CB0F6] border-[#1CB0F6] border-b-[4px] -translate-y-1 shadow-sm' 
            : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700 active:bg-slate-200'
        }`}
      >
        <Icon size={20} strokeWidth={isActive ? 3 : 2.5} />
        {item.label}
      </button>
    );
  }

  return (
    <div className="relative group">
      <button
        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-display font-black text-[15px] uppercase tracking-wider border-2 transition-all outline-none relative ${
          isActive 
            ? 'bg-[#F0FAE8] text-[#58CC02] border-[#58CC02] border-b-[4px] -translate-y-1 shadow-sm' 
            : 'bg-transparent text-slate-500 border-transparent group-hover:bg-slate-100 group-hover:text-slate-700'
        }`}
      >
        <Icon size={20} strokeWidth={isActive ? 3 : 2.5} />
        {item.label}
        {item.isNew && (
          <span className="absolute -top-3 -right-2 px-2 py-0.5 bg-[#FF4B4B] text-white border-2 border-[#E54343] text-[9px] font-black uppercase tracking-widest rounded-lg animate-bounce shadow-sm">
            MỚI
          </span>
        )}
        <ChevronDown size={16} strokeWidth={3} className="transition-transform group-hover:rotate-180 ml-1 opacity-50" />
      </button>

      <div className="absolute top-[100%] left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50 w-[280px]">
        <div className="bg-white rounded-3xl border-2 border-slate-200 border-b-[6px] shadow-xl p-3 flex flex-col gap-2">
          {item.children.map(child => (
            <button
              key={child.id}
              onClick={() => onNav(child)}
              className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#EAF6FE] group/child transition-colors outline-none text-left relative"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-colors shrink-0 ${
                child.isMaintenance ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-400 group-hover/child:bg-[#1CB0F6] group-hover/child:text-white group-hover/child:border-[#1899D6]'
              }`}>
                {child.isMaintenance ? <Wrench size={18} strokeWidth={2.5} /> : <child.icon size={20} strokeWidth={2.5} />}
              </div>
              <div className="flex-1 min-w-0 pt-0.5 opacity-90">
                <p className={`font-display font-black text-[15px] leading-none mb-1 ${child.isMaintenance ? 'text-slate-400' : 'text-slate-800 group-hover/child:text-[#1CB0F6]'}`}>
                  {child.label}
                </p>
                <p className="font-body font-bold text-[12px] text-slate-400 truncate">{child.desc}</p>
              </div>
              {child.isMaintenance && (
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#FFFBEA] border border-[#FFD8A8] text-[#FF9600] text-[9px] font-black uppercase tracking-widest rounded-lg">
                  Sắp mở
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
DesktopNavItem.displayName = 'DesktopNavItem';

const BottomTab = memo(({ icon: Icon, label, isActive, onClick }) => (
  <button onClick={onClick} className="flex-1 flex flex-col items-center justify-center gap-1.5 pt-2 pb-1 bg-transparent border-none outline-none group">
    <div className={`px-5 py-1.5 rounded-2xl transition-all duration-200 ${isActive ? 'bg-[#EAF6FE] text-[#1CB0F6] scale-110 shadow-sm border-2 border-transparent' : 'bg-transparent text-slate-400 group-hover:bg-slate-50'}`}>
      <Icon size={24} strokeWidth={isActive ? 3 : 2.5} />
    </div>
    <span className={`font-display font-black text-[10px] uppercase tracking-widest transition-colors ${isActive ? 'text-[#1CB0F6]' : 'text-slate-400'}`}>
      {label}
    </span>
  </button>
));
BottomTab.displayName = 'BottomTab';

const MobileDrawer = memo(({ open, onClose, currentPath, onNav, user, isSignedIn, onSignOut }) => (
  <AnimatePresence>
    {open && (
      <>
        <Motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80] lg:hidden" />
        <Motion.div key="drawer" variants={drawerVariants} initial="hidden" animate="visible" exit="exit" className="fixed bottom-0 left-0 right-0 z-[90] bg-slate-50 rounded-t-[32px] shadow-2xl border-t-2 border-slate-200 flex flex-col max-h-[90vh] font-nunito lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div className="flex justify-center py-4 bg-white rounded-t-[32px]"><div className="w-16 h-1.5 bg-slate-200 rounded-full" /></div>
          <div className="flex items-center justify-between px-6 pb-4 bg-white border-b-2 border-slate-100">
            <h2 className="font-display font-black text-[20px] text-slate-800 m-0">Danh mục hệ thống</h2>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-slate-100 border-2 border-slate-200 border-b-[3px] rounded-xl text-slate-500 hover:text-slate-700 active:border-b-2 active:translate-y-[1px] transition-all"><X size={20} strokeWidth={3} /></button>
          </div>

          <div className="overflow-y-auto px-5 py-6 flex-1 custom-scrollbar space-y-6">
            {NAVIGATION_CONFIG.map((item) => {
              if (item.type === 'link') {
                const isActive = item.path === currentPath;
                return (
                  <button key={item.id} onClick={() => { onNav(item); onClose(); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-b-[4px] transition-all outline-none text-left ${isActive ? 'bg-[#EAF6FE] border-[#1CB0F6] text-[#1CB0F6]' : 'bg-white border-slate-200 text-slate-600 active:translate-y-[2px] active:border-b-2'}`}>
                    <item.icon size={24} strokeWidth={2.5} className={isActive ? 'text-[#1CB0F6]' : 'text-slate-400'} />
                    <span className="font-display font-black text-[16px] uppercase tracking-wider">{item.label}</span>
                  </button>
                );
              }

              if (item.type === 'dropdown') {
                return (
                  <div key={item.id}>
                    <div className="flex items-center gap-2 mb-3 pl-2">
                      <item.icon size={18} className="text-[#58CC02]" strokeWidth={3} />
                      <h3 className="font-display font-black text-[14px] text-slate-400 uppercase tracking-widest">{item.label}</h3>
                      {item.isNew && <span className="px-2 py-0.5 bg-[#FF4B4B] text-white text-[9px] font-black rounded-md">MỚI</span>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.children.map(child => (
                        <button key={child.id} onClick={() => { onNav(child); onClose(); }} className="flex items-center gap-4 p-4 bg-white border-2 border-slate-200 border-b-[4px] rounded-2xl hover:border-blue-200 active:border-b-2 active:translate-y-[2px] transition-all text-left outline-none group relative overflow-hidden">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${child.isMaintenance ? 'bg-slate-100 text-slate-400 border-2 border-slate-200' : 'bg-[#F4F7FA] text-slate-400 group-hover:bg-[#1CB0F6] group-hover:text-white'}`}>
                            {child.isMaintenance ? <Wrench size={22} strokeWidth={2.5}/> : <child.icon size={24} strokeWidth={2.5} />}
                          </div>
                          <div className={child.isMaintenance ? 'opacity-60' : ''}>
                            <span className="font-display font-black text-[15px] text-slate-700 block mb-0.5">{child.label}</span>
                            <span className="font-body font-bold text-[12px] text-slate-400 block line-clamp-1">{child.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}

            <div className="pt-6 border-t-2 border-slate-200">
              <h3 className="font-display font-black text-[14px] text-slate-400 uppercase tracking-widest mb-3 pl-2">Tài khoản</h3>
              {isSignedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 bg-white border-2 border-slate-200 rounded-2xl mb-4">
                    <img src={user?.photoURL} alt="Avatar" className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                    <div>
                      <p className="font-display font-black text-[16px] text-slate-800 leading-tight">{user?.displayName}</p>
                      <p className="font-body font-bold text-[13px] text-slate-500 truncate w-[200px]">{user?.email}</p>
                    </div>
                  </div>
                  <button onClick={() => { onNav({path: ROUTES.PROFILE}); onClose(); }} className="w-full flex items-center gap-4 p-4 bg-white border-2 border-slate-200 border-b-[4px] rounded-2xl active:translate-y-[2px] active:border-b-2 transition-all font-display font-black text-[15px] text-slate-700"><User size={20} className="text-slate-400" /> Hồ sơ cá nhân</button>
                  <button onClick={() => { onSignOut(); onClose(); }} className="w-full flex items-center gap-4 p-4 bg-[#FFF0F0] border-2 border-[#ffc1c1] border-b-[4px] rounded-2xl active:translate-y-[2px] active:border-b-2 transition-all font-display font-black text-[15px] text-[#FF4B4B]"><LogOut size={20} /> Đăng xuất</button>
                </div>
              ) : (
                <button onClick={() => { onNav({path: '/login'}); onClose(); }} className="w-full py-4 bg-[#58CC02] text-white border-2 border-[#46A302] border-b-[6px] rounded-2xl font-display font-black text-[16px] uppercase tracking-widest active:border-b-2 active:translate-y-[4px] transition-all shadow-sm">Đăng nhập / Đăng ký</button>
              )}
            </div>
          </div>
        </Motion.div>
      </>
    )}
  </AnimatePresence>
));
MobileDrawer.displayName = 'MobileDrawer';

const MaintenanceModal = memo(({ isOpen, onClose, featureName }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <Motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
          onClick={onClose} 
        />
        <Motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 sm:p-8 relative z-10 shadow-2xl text-center font-nunito"
        >
          <div className="w-20 h-20 mx-auto bg-[#FFFBEA] rounded-[24px] border-2 border-[#FFD8A8] border-b-[6px] flex items-center justify-center mb-6 shadow-sm">
            <Wrench className="w-10 h-10 text-[#FF9600]" strokeWidth={2.5} />
          </div>
          <h2 className="text-[22px] sm:text-[24px] font-display font-black text-slate-800 mb-2 leading-tight">Hệ thống đang cập nhật!</h2>
          <p className="text-[15px] font-body font-bold text-slate-500 mb-8 px-4">
            Tính năng <span className="text-[#1CB0F6] font-black">"{featureName}"</span> hiện đang trong quá trình bảo trì. Quý khách vui lòng quay lại sau nhé!
          </p>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-[#1CB0F6] text-white border-2 border-[#1899D6] border-b-[6px] rounded-2xl font-display font-black text-[16px] uppercase tracking-widest hover:brightness-105 active:border-b-2 active:translate-y-[4px] transition-all outline-none"
          >
            Tôi đã hiểu
          </button>
        </Motion.div>
      </div>
    )}
  </AnimatePresence>
));
MaintenanceModal.displayName = 'MaintenanceModal';

/* ════════════════════════════════════════════════════════════════
   3. MAIN NAVBAR COMPONENT
════════════════════════════════════════════════════════════════ */
const Navbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, isSignedIn, signOut } = useFirebaseAuth();

  const [isScrolled,      setIsScrolled]      = useState(false);
  const [drawerOpen,      setDrawerOpen]      = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [maintenanceTarget, setMaintenanceTarget] = useState(null);

  // Tối ưu hóa Scroll Event bằng requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || maintenanceTarget ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen, maintenanceTarget]);

  const handleNav = useCallback((itemConfig) => {
    if (itemConfig?.isMaintenance) {
      setMaintenanceTarget(itemConfig.label);
      return;
    }
    const path = typeof itemConfig === 'string' ? itemConfig : itemConfig.path;
    navigate(path);
    scrollToTop();
  }, [navigate]);

  return (
    <div className="font-nunito">
      {/* Desktop & General Top Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b-2 border-slate-200 shadow-sm py-2' : 'bg-white border-b-2 border-slate-100 py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-[60px]">
          <div className="flex items-center gap-8">
            <button onClick={() => handleNav(ROUTES.HOME)} className="flex items-center gap-3 outline-none group">
              <div className="w-12 h-12 bg-[#1CB0F6] rounded-2xl flex items-center justify-center border-b-[4px] border-[#1899D6] group-active:translate-y-[2px] group-active:border-b-2 transition-all">
                <Star className="w-6 h-6 text-white" fill="white" strokeWidth={1.5} />
              </div>
              <span className="font-display text-[26px] font-black text-slate-800 tracking-tight">HubStudy</span>
            </button>

            <div className="hidden lg:flex items-center gap-2">
              {NAVIGATION_CONFIG.map(item => (
                <DesktopNavItem key={item.id} item={item} currentPath={location.pathname} onNav={handleNav} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="relative hidden lg:block">
                <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-12 h-12 p-0.5 bg-white border-2 border-slate-200 border-b-[4px] rounded-2xl outline-none hover:border-[#1CB0F6] active:translate-y-[2px] active:border-b-2 transition-all">
                  <img src={user?.photoURL} alt="Profile" className="w-full h-full rounded-xl object-cover bg-slate-100" />
                </button>
                <AnimatePresence>
                  {showProfileMenu && (
                    <Motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-0 top-[calc(100%+12px)] w-64 bg-white rounded-3xl border-2 border-slate-200 border-b-[6px] shadow-xl p-3 z-50 flex flex-col gap-2">
                      <button onClick={() => { handleNav(ROUTES.PROFILE); setShowProfileMenu(false); }} className="flex items-center gap-3 p-4 rounded-2xl font-black text-[15px] text-slate-700 hover:bg-slate-100 transition-colors outline-none"><User size={20} className="text-slate-500" /> Hồ sơ của tôi</button>
                      <button onClick={() => { handleNav(ROUTES.ANSWERS); setShowProfileMenu(false); }} className="flex items-center gap-3 p-4 rounded-2xl font-black text-[15px] text-slate-700 hover:bg-slate-100 transition-colors outline-none"><FileText size={20} className="text-slate-500" /> Lịch sử làm bài</button>
                      <div className="h-0.5 bg-slate-100 my-1 mx-2" />
                      <button onClick={() => { signOut(); setShowProfileMenu(false); }} className="flex items-center gap-3 p-4 rounded-2xl font-black text-[15px] text-[#FF4B4B] hover:bg-[#FFF0F0] transition-colors outline-none"><LogOut size={20} /> Đăng xuất</button>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={() => handleNav('/login')} className="hidden lg:flex px-8 py-3.5 bg-[#58CC02] text-white border-2 border-[#46A302] border-b-[6px] rounded-2xl font-black uppercase text-[15px] tracking-widest outline-none hover:brightness-105 active:translate-y-[4px] active:border-b-2 transition-all shadow-sm">
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Tạo khoảng trống bù cho Fixed Navbar phía trên */}
      <div className="h-[84px] lg:h-[88px]" />

      {/* 🚀 Mobile Bottom Bar Đã Fix Triệt Để */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[50] bg-white border-t-2 border-slate-200 shadow-[0_-8px_20px_rgba(0,0,0,0.06)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch h-[72px] justify-between px-2">
          <BottomTab icon={Home} label="Trang chủ" isActive={location.pathname === ROUTES.HOME} onClick={() => handleNav(ROUTES.HOME)} />
          <BottomTab icon={Target} label="Đề thi" isActive={location.pathname.includes('/exams')} onClick={() => setDrawerOpen(true)} />
          <BottomTab icon={Bot} label="AI Lab" isActive={location.pathname.includes('/ai-lab')} onClick={() => handleNav('/ai-lab/grammar')} />
          <BottomTab icon={Menu} label="Menu" isActive={false} onClick={() => setDrawerOpen(true)} />
        </div>
      </div>
      
      {/* Tạo khoảng trống bù cho Bottom Bar trên mobile */}
      <div className="lg:hidden h-[72px]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} currentPath={location.pathname} onNav={handleNav} user={user} isSignedIn={isSignedIn} onSignOut={signOut} />
      
      <MaintenanceModal isOpen={!!maintenanceTarget} onClose={() => setMaintenanceTarget(null)} featureName={maintenanceTarget} />
    </div>
  );
};

export default Navbar;
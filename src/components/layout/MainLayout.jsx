import React, { memo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, User, BarChart3, LogIn, Bell, Search } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../footer/Footer';

const MainLayout = ({ 
  children, user, onAuthClick, onProfileClick, onAnswersClick,
  testType, onTestTypeChange, practiceType, onPracticeTypeChange,
  onlineCount, totalUsers, viewMode
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [imgLoading, setImgLoading] = useState(true);

  const isActive = (path) => location.pathname === path;

  // Logic: Thu hẹp container ở Desktop cho các trang nội dung ít để tránh loãng
  // Trang /test và /profile thường bị trống hai bên nhất
  const isCompactPage = ['/test', '/profile', '/vocabulary'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col isolate selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- DESKTOP NAVBAR --- */}
      <header className="hidden md:block sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <Navbar
          testType={testType} onTestTypeChange={onTestTypeChange}
          practiceType={practiceType} onPracticeTypeChange={onPracticeTypeChange}
          user={user} onAuthClick={onAuthClick} onProfileClick={onProfileClick}
          viewMode={viewMode} onlineCount={onlineCount} totalUsers={totalUsers}
          onAnswersClick={onAnswersClick}
        />
      </header>

      {/* --- MOBILE COMPACT HEADER --- */}
      <header className="md:hidden sticky top-0 z-[100] w-full bg-white border-b border-slate-100 px-4 h-14 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2.5" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
            <BookOpen size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="font-bold text-[17px] text-slate-900 tracking-tight">HubStudy</h1>
        </div>

        <div className="flex items-center gap-1.5">
          <button className="p-2 text-slate-500 active:bg-slate-100 rounded-full transition-colors">
            <Search size={20} />
          </button>
          
          {user ? (
            <button 
              onClick={onProfileClick}
              className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-200 overflow-hidden bg-slate-100 flex-shrink-0 relative active:scale-90 transition-transform"
            >
              {imgLoading && user.photoURL && <div className="absolute inset-0 bg-slate-200 animate-pulse" />}
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Avatar" 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImgLoading(false)}
                />
              ) : (
                <User size={14} className="m-auto text-slate-500" />
              )}
            </button>
          ) : (
            <button onClick={onAuthClick} className="text-[13px] font-bold text-indigo-600 px-3 py-1.5 bg-indigo-50 rounded-full active:bg-indigo-100">
              LOG IN
            </button>
          )}
        </div>
      </header>

      {/* --- DYNAMIC MAIN CONTENT --- */}
      <main className="flex-1 w-full flex flex-col relative overflow-x-hidden">
        {/* - Nếu là trang Compact: giới hạn max-w-5xl (khoảng 1024px) để tập trung nội dung.
            - Nếu là trang Full (như Full Test): giới hạn max-w-7xl (1280px).
        */}
        <div className={`flex-1 w-full mx-auto px-4 py-6 md:py-10 mb-20 md:mb-0 transition-all duration-500
          ${isCompactPage ? 'max-w-5xl' : 'max-w-[1400px]'}`}
        >
          {/* Box nội dung chính có bo góc nhẹ và bóng đổ trên desktop */}
          <div className="h-full">
            {children}
          </div>
        </div>
      </main>

      {/* --- MOBILE BOTTOM TAB BAR --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-slate-200/50 pb-safe shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <NavButton icon={Home} label="Home" active={isActive('/')} onClick={() => navigate('/')} />
          <NavButton icon={BookOpen} label="Luyện tập" active={isActive('/test')} onClick={() => navigate('/test')} />
          <NavButton icon={BarChart3} label="Kết quả" active={isActive('/answers')} onClick={() => navigate('/answers')} />
          <NavButton icon={User} label="Cá nhân" active={isActive('/profile')} onClick={() => navigate('/profile')} />
        </div>
      </nav>

      {/* --- DESKTOP FOOTER --- */}
      <footer className="hidden md:block w-full bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <Footer onlineCount={onlineCount} totalUsers={totalUsers} />
        </div>
      </footer>
    </div>
  );
};

// Sub-component cho các nút điều hướng Mobile
const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className="flex flex-col items-center justify-center flex-1 h-full transition-all group"
  >
    <div className={`relative p-1.5 rounded-2xl transition-all duration-300 group-active:scale-75
      ${active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}>
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      {/* Indicator bar cho trạng thái active */}
      {active && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-indigo-600 rounded-full" />
      )}
    </div>
    <span className={`text-[10px] mt-1 font-bold tracking-tight transition-colors
      ${active ? 'text-indigo-600' : 'text-slate-500'}`}>
      {label}
    </span>
  </button>
);

export default memo(MainLayout);
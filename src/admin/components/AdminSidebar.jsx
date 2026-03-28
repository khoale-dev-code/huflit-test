// src/admin/components/AdminSidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, FileText, 
  LogOut, X, ChevronRight, ShieldAlert, Shield
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen, admin, onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🚀 Đã thêm mục Quản lý Chat AI và Bảo trì vào danh sách menu
  const menuItems = [
    { icon: LayoutDashboard, label: 'Bảng điều khiển', path: '/admin/dashboard' },
    { icon: Users, label: 'Người dùng', path: '/admin/users' },
    { icon: BookOpen, label: 'Bộ đề thi', path: '/admin/exams' },
    { icon: FileText, label: 'Bài học', path: '/admin/lessons' },
    { icon: ShieldAlert, label: 'Quản lý Chat AI', path: '/admin/chat-logs' }, 
    { icon: Shield, label: 'Bảo trì hệ thống', path: '/admin/maintenance' }, 
  ];

  return (
    <>
      {/* Overlay cho Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 w-[280px] bg-white border-r-2 border-slate-200 flex flex-col z-50 transition-transform duration-300 ease-in-out font-sans ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`} style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
        
        {/* ── Logo Section ── */}
        <div className="h-[72px] sm:h-20 flex items-center justify-between px-5 sm:px-6 border-b-2 border-slate-100">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/admin/dashboard')}>
            {/* Logo 3D Box */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#1CB0F6] rounded-[14px] flex items-center justify-center border-b-[3px] border-[#1899D6] shadow-sm group-hover:-translate-y-0.5 active:translate-y-[1px] active:border-b-[1px] transition-all">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div className="pt-0.5">
              <h1 className="font-display font-black text-slate-800 tracking-tight text-[18px] sm:text-[20px] leading-none">HUBSTUDY</h1>
              <span className="text-[10px] sm:text-[11px] text-[#FF9600] font-display font-black uppercase tracking-widest">Pro Admin</span>
            </div>
          </div>
          {/* Nút đóng Sidebar trên Mobile */}
          <button onClick={() => setIsOpen(false)} className="md:hidden w-8 h-8 flex items-center justify-center bg-slate-100 border-2 border-slate-200 border-b-[3px] rounded-[10px] text-slate-500 hover:text-slate-700 active:border-b-[1px] active:translate-y-[2px] transition-all">
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>

        {/* ── Navigation Links ── */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            // Fix highlight: Dùng startsWith để khi ở trong trang Edit/Create thì Tab gốc vẫn sáng
            const isActive = location.pathname.startsWith(item.path); 
            
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] transition-all outline-none border-2 ${
                  isActive 
                    ? 'bg-[#EAF6FE] border-[#1CB0F6] border-b-[4px] text-[#1CB0F6] -translate-y-[1px] shadow-sm' 
                    : 'border-transparent border-b-[4px] text-slate-500 hover:bg-slate-50 hover:border-slate-200 hover:text-slate-700 active:border-b-2 active:translate-y-[2px]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-[#1CB0F6]' : 'text-slate-400 group-hover:text-slate-600'}`} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`font-display text-[14px] ${isActive ? 'font-black' : 'font-bold'}`}>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-[#1899D6]" strokeWidth={3} />}
              </button>
            );
          })}
        </nav>

        {/* ── User Profile Section ── */}
        <div className="p-4 border-t-2 border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-11 h-11 rounded-[14px] bg-[#CE82FF] border-b-[3px] border-[#B975E5] flex items-center justify-center text-white font-display font-black text-[18px] shadow-sm shrink-0">
              {admin?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="text-[14px] font-display font-black text-slate-800 truncate">Quản trị viên</p>
              <p className="text-[12px] font-body font-bold text-slate-500 truncate">{admin?.email || 'admin@hubstudy.vn'}</p>
            </div>
          </div>
          
          <button 
            onClick={onSignOut}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] border-b-[4px] hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:border-b-2 active:translate-y-[2px] rounded-[16px] text-[14px] font-display font-bold transition-all outline-none"
          >
            <LogOut className="w-4 h-4" strokeWidth={2.5} />
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
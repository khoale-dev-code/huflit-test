// src/admin/components/AdminNavbar.jsx
import React from 'react';
import { Search, Bell, Menu, Plus, Zap } from 'lucide-react';

const AdminNavbar = ({ toggleSidebar, onQuickAction }) => {
  return (
    <header className="h-[72px] sm:h-20 bg-white/90 backdrop-blur-xl border-b-2 border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50 transition-all font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* ── LEFT: Menu Toggle & Search ── */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Nút Menu (3D Gamified) */}
        <button 
          onClick={toggleSidebar}
          className="w-10 h-10 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 border-b-[3px] rounded-[12px] sm:rounded-[14px] flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 hover:bg-blue-50 active:border-b-2 active:translate-y-[1px] transition-all outline-none shrink-0 shadow-sm"
          title="Mở Menu"
        >
          <Menu size={20} strokeWidth={3} />
        </button>
        
        {/* Thanh tìm kiếm (Compact & Bold) */}
        <div className="relative hidden md:block w-56 lg:w-80 ml-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Tìm kiếm nhanh..." 
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-[14px] sm:rounded-[16px] text-[13px] sm:text-[14px] font-body font-bold text-slate-700 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:font-medium placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* ── RIGHT: Actions & Notifications ── */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* Nút Thao tác nhanh (Sét Vàng) */}
        {onQuickAction && (
          <button 
            onClick={onQuickAction}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 bg-[#FFC800]/10 border-2 border-[#FFC800]/40 border-b-[3px] rounded-[14px] text-[#FF9600] font-display font-bold text-[13px] uppercase tracking-wider hover:bg-[#FFC800] hover:text-white hover:border-[#E5B400] active:border-b-2 active:translate-y-[1px] transition-all outline-none shadow-sm"
          >
            <Zap size={16} strokeWidth={2.5} className="fill-current" />
            Tạo nhanh
          </button>
        )}

        {/* Vạch kẻ phân cách */}
        <div className="h-6 w-[2px] bg-slate-200 mx-1 hidden sm:block rounded-full" />

        {/* Nút Thông báo (Bell) */}
        <button 
          className="relative w-10 h-10 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 border-b-[3px] rounded-[12px] sm:rounded-[14px] flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 hover:bg-blue-50 active:border-b-2 active:translate-y-[1px] transition-all outline-none shrink-0 shadow-sm"
          title="Thông báo"
        >
          <Bell size={20} strokeWidth={2.5} />
          {/* Dấu chấm thông báo (Chấm đỏ nổi 3D) */}
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#FF4B4B] rounded-full border-2 border-white shadow-sm flex items-center justify-center"></span>
        </button>
        
      </div>
    </header>
  );
};

export default AdminNavbar;
// src/admin/components/AdminNavbar.jsx
import React from 'react';
import { Search, Bell, Menu, Plus, Zap } from 'lucide-react';

const AdminNavbar = ({ toggleSidebar, onQuickAction }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 transition-all">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative hidden lg:block w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm nhanh..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 rounded-xl text-sm transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">

        <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden sm:block" />

        <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button 
          onClick={onQuickAction}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 md:px-5 md:py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-blue-100"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:inline">Tạo mới</span>
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
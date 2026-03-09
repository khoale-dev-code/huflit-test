// src/admin/pages/Users/components/UserSidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, FileText, Type,
  LogOut, ChevronDown
} from 'lucide-react';

const UserSidebar = ({ admin, onSignOut, sidebarOpen, setSidebarOpen, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarMenu = [
    { icon: LayoutDashboard, label: 'Bảng điều khiển', path: '/admin/dashboard' },
    { icon: Users, label: 'Người dùng', path: '/admin/users' },
    { icon: BookOpen, label: 'Bộ đề thi', path: '/admin/exams' },
    { icon: FileText, label: 'Bài học', path: '/admin/lessons' },
    { icon: Type, label: 'Từ vựng', path: '/admin/vocabulary' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSignOut = async () => {
    await onSignOut();
  };

  return (
    <>
      {/* Logo Section */}
      <div>
        <div className="h-16 md:h-20 flex items-center px-4 md:px-6 gap-3 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
          <div className="w-8 md:w-9 h-8 md:h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            <svg className="w-4 md:w-5 h-4 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-gray-900 tracking-tight text-base md:text-lg leading-none">HUBSTUDY</h1>
            <p className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-1">Admin Console</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="px-3 md:px-4 py-4 space-y-1">
          {sidebarMenu.map((item, index) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <button
                key={index}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all duration-200 text-sm md:text-[15px] ${
                  isActive
                    ? 'bg-blue-50/80 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile & Sign Out */}
      <div className="p-3 md:p-4 border-t border-gray-100 mx-3 md:mx-4 mb-4 flex flex-col gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            <span className="text-orange-700 font-bold text-lg uppercase">
              {admin?.email?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="text-left flex-1 min-w-0 hidden md:block">
            <p className="text-sm font-bold text-gray-900 truncate">
              {admin?.role === 'super_admin' ? 'Quản trị viên cấp cao' : 'Quản trị viên'}
            </p>
            <p className="text-[11px] text-gray-500 font-medium truncate">{admin?.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs md:text-sm font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Đăng xuất</span>
        </button>
      </div>
    </>
  );
};

export default UserSidebar;
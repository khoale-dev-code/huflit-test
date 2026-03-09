// src/admin/pages/Exams/components/ExamSidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, FileText, Type, LogOut } from 'lucide-react';

const MENU = [
  { icon: LayoutDashboard, label: 'Bảng điều khiển', path: '/admin/dashboard'  },
  { icon: Users,           label: 'Người dùng',       path: '/admin/users'      },
  { icon: BookOpen,        label: 'Bộ đề thi',         path: '/admin/exams'      },
  { icon: FileText,        label: 'Bài học',           path: '/admin/lessons'    },
  { icon: Type,            label: 'Từ vựng',           path: '/admin/vocabulary' },
];

const ExamSidebar = ({ admin, onSignOut }) => {
  const navigate        = useNavigate();
  const { pathname }    = useLocation();

  return (
    <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between flex-shrink-0 shadow-sm z-20">
      {/* Logo */}
      <div>
        <div
          className="h-20 flex items-center px-6 gap-3 cursor-pointer"
          onClick={() => navigate('/admin/dashboard')}
        >
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 tracking-tight text-lg leading-none">HUBSTUDY</h1>
            <p className="text-[11px] text-gray-500 font-medium mt-1">Admin Console</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="px-4 py-4 space-y-1">
          {MENU.map((item, i) => {
            const active = pathname.startsWith(item.path);
            return (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${active
                    ? 'bg-blue-50/80 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
              >
                <item.icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="text-[15px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile + Sign out */}
      <div className="p-4 border-t border-gray-100 mx-4 mb-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
            <span className="text-orange-700 font-bold text-lg uppercase">
              {admin?.email?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {admin?.role === 'super_admin' ? 'Super Admin' : 'Quản trị viên'}
            </p>
            <p className="text-[11px] text-gray-500 truncate">{admin?.email}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" /> Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default ExamSidebar;
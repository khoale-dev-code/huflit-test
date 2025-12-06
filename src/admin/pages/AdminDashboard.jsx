// src/admin/pages/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, BookOpen, FileText, Languages } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: Users, label: 'Quản lý Users', path: '/admin/users' },
    { icon: BookOpen, label: 'Quản lý Exams', path: '/admin/exams' },
    { icon: FileText, label: 'Quản lý Grammar', path: '/admin/grammar' },
    { icon: Languages, label: 'Quản lý Vocabulary', path: '/admin/vocabulary' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Xin chào, {admin?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <item.icon className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">{item.label}</h3>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
// src/admin/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Users, BookOpen, FileText, Languages, 
  BarChart3, Settings, Shield, Activity, Database,
  ChevronRight, UserCog, Bell, MessageSquare,
  HelpCircle, AlertCircle, CheckCircle, Clock,
  Eye, Download, Edit, Trash2, Search, Filter,
  Home, TrendingUp, Users as UsersIcon, FileCheck
} from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const mainMenuItems = [
    { 
      icon: Users, 
      label: 'Quản lý Users', 
      path: '/admin/users',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      count: '1.2K',
      description: 'Quản lý người dùng và phân quyền',
      badge: 'New'
    },
    { 
      icon: BookOpen, 
      label: 'Quản lý Exams', 
      path: '/admin/exams',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      count: '45',
      description: 'Tạo và chỉnh sửa đề thi',
      badge: ''
    },
    { 
      icon: FileText, 
      label: 'Quản lý Grammar', 
      path: '/admin/grammar',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      count: '320',
      description: 'Ngữ pháp và bài học',
      badge: 'Updated'
    },
    { 
      icon: Languages, 
      label: 'Quản lý Vocabulary', 
      path: '/admin/vocabulary',
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      count: '5K+',
      description: 'Từ vựng và flashcard',
      badge: ''
    },
    { 
      icon: Database, 
      label: 'Database', 
      path: '/admin/database',
      color: 'bg-gradient-to-br from-indigo-500 to-blue-500',
      count: '12GB',
      description: 'Quản lý dữ liệu hệ thống',
      badge: ''
    },
    { 
      icon: Settings, 
      label: 'Cài đặt', 
      path: '/admin/settings',
      color: 'bg-gradient-to-br from-gray-600 to-gray-800',
      count: '',
      description: 'Cấu hình hệ thống',
      badge: ''
    }
  ];

  const statsCards = [
    { 
      title: 'Total Users', 
      value: '1,254', 
      change: '+12%', 
      icon: UsersIcon,
      color: 'text-blue-600 bg-blue-100',
      trend: 'up'
    },
    { 
      title: 'Active Exams', 
      value: '45', 
      change: '+3', 
      icon: BookOpen,
      color: 'text-purple-600 bg-purple-100',
      trend: 'up'
    },
    { 
      title: 'Questions', 
      value: '1,845', 
      change: '+89', 
      icon: FileCheck,
      color: 'text-green-600 bg-green-100',
      trend: 'up'
    },
    { 
      title: 'Completion Rate', 
      value: '92%', 
      change: '+5%', 
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-100',
      trend: 'up'
    },
  ];

  const recentActivities = [
    { user: 'Nguyễn Văn A', action: 'đã hoàn thành bài test', time: '2 phút trước', type: 'success' },
    { user: 'Trần Thị B', action: 'đã đăng ký tài khoản mới', time: '15 phút trước', type: 'info' },
    { user: 'Lê Văn C', action: 'đã upload tài liệu mới', time: '1 giờ trước', type: 'warning' },
    { user: 'Phạm Thị D', action: 'đã báo cáo lỗi', time: '2 giờ trước', type: 'error' },
  ];

  const quickActions = [
    { icon: Download, label: 'Export Data', color: 'from-blue-500 to-cyan-500' },
    { icon: Edit, label: 'Edit Content', color: 'from-purple-500 to-pink-500' },
    { icon: Eye, label: 'Preview Site', color: 'from-green-500 to-emerald-500' },
    { icon: Filter, label: 'Filter Users', color: 'from-orange-500 to-red-500' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slideIn 0.5s ease-out forwards;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}
      </style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <span>Xin chào,</span>
                  <span className="font-semibold text-blue-600">{admin?.email}</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors group">
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Today: {new Date().toLocaleDateString('vi-VN')}</span>
              </div>
              
              <button
                onClick={handleSignOut}
                className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-in">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">Chào mừng trở lại, Admin!</h2>
                <p className="text-blue-100">Bạn có <span className="font-bold">12</span> công việc mới cần xử lý hôm nay.</p>
              </div>
              <button 
                onClick={() => navigate('/admin/tasks')}
                className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Xem tất cả công việc
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${stat.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, parseInt(stat.value) / 20)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Features Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Quản lý Hệ thống</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm module..."
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mainMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="group relative bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 text-left animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{item.label}</h3>
                            {item.badge && (
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          {item.count && (
                            <p className="text-lg font-bold text-gray-900">{item.count}</p>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="group flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Hoạt động gần đây</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Xem tất cả
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'success' ? 'bg-green-100' :
                      activity.type === 'warning' ? 'bg-yellow-100' :
                      activity.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {activity.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                      {activity.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                      {activity.type === 'info' && <UserCog className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Trạng thái hệ thống</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Server Load</span>
                    <span className="text-sm font-medium text-green-600">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Storage</span>
                    <span className="text-sm font-medium text-orange-600">12.5/20GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '62.5%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Hệ thống hoạt động ổn định</p>
                    <p className="text-xs text-blue-700">Uptime: 99.9% trong 30 ngày qua</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-8 py-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">© 2024 Admin Panel</span> • Version 2.1.0
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-medium text-green-600">All Systems Operational</span>
              </div>
              <span className="text-sm text-gray-600 hidden md:block">
                Last updated: {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
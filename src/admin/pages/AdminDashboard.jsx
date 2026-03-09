// src/admin/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Bell, Plus, LayoutDashboard, Users, FileText, 
  BookOpen, Type, CheckCircle2, File, UserPlus, MessageCircle, 
  MoreVertical, Edit3, ChevronDown, LogOut, Menu, X, Loader2, 
  Sparkles, TrendingUp, Activity, ArrowUpRight, ArrowDownRight,
  Clock, Zap
} from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { supabase } from '../../config/supabaseClient';

// ─── Stat Card Component ──────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, trend, color = 'blue', loading = false }) => {
  const colorMap = {
    blue: { bg: 'from-blue-50 to-blue-100/50', icon: 'text-blue-600', accent: 'bg-blue-100', badge: 'bg-blue-50 text-blue-700' },
    purple: { bg: 'from-purple-50 to-purple-100/50', icon: 'text-purple-600', accent: 'bg-purple-100', badge: 'bg-purple-50 text-purple-700' },
    green: { bg: 'from-green-50 to-green-100/50', icon: 'text-green-600', accent: 'bg-green-100', badge: 'bg-green-50 text-green-700' },
    amber: { bg: 'from-amber-50 to-amber-100/50', icon: 'text-amber-600', accent: 'bg-amber-100', badge: 'bg-amber-50 text-amber-700' },
  };

  const colors = colorMap[color];
  const isTrendUp = trend >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      {/* Gradient background hover effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
      
      {/* Card */}
      <div className="relative bg-white border border-gray-200/80 rounded-2xl p-5 md:p-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bg}`} />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${colors.accent} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
              isTrendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {isTrendUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-600 text-xs md:text-sm font-medium mb-2">{label}</p>
        
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            <p className="text-sm text-gray-500">Đang tải...</p>
          </div>
        ) : (
          <p className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {value}
          </p>
        )}

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent w-0 group-hover:w-full transition-all duration-500" />
      </div>
    </div>
  );
};

// ─── Chart Component ──────────────────────────────────────────────
const GrowthChart = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative h-[150px] md:h-[200px]">
        <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
            <filter id="chartShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
            </filter>
          </defs>
          
          {/* Grid lines */}
          <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="150" x2="600" y2="150" stroke="#f1f5f9" strokeWidth="1" />
          
          {/* Main path */}
          <path 
            d="M 0 140 C 50 120, 100 140, 150 110 C 200 80, 220 50, 300 40 C 350 30, 380 120, 420 140 C 460 160, 520 40, 600 20 L 600 200 L 0 200 Z" 
            fill="url(#chartGradient)" 
            filter="url(#chartShadow)"
            className="animate-fade-in"
          />
          
          {/* Line */}
          <path 
            d="M 0 140 C 50 120, 100 140, 150 110 C 200 80, 220 50, 300 40 C 350 30, 380 120, 420 140 C 460 160, 520 40, 600 20" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="3"
            className="animate-fade-in"
          />
          
          {/* Data points */}
          {[150, 300, 420, 600].map((x, idx) => {
            const yValues = [110, 40, 140, 20];
            return (
              <circle 
                key={idx}
                cx={x} 
                cy={yValues[idx]} 
                r="5" 
                fill="white" 
                stroke="#2563eb" 
                strokeWidth="2"
                className="animate-fade-in"
              />
            );
          })}
        </svg>
      </div>

      {/* Axis labels */}
      <div className="flex justify-between text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mt-4 md:mt-6">
        <span>TH1</span>
        <span>TH2</span>
        <span>TH3</span>
        <span>TH4</span>
        <span>TH5</span>
        <span>TH6</span>
      </div>
    </div>
  );
};

// ─── Activity Item Component ───────────────────────────────────────
const ActivityItem = ({ icon: Icon, name, action, time, color }) => {
  return (
    <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs md:text-sm text-gray-900 font-medium">
          {name} <span className="font-normal text-gray-500">{action}</span>
        </p>
        <p className="text-[10px] md:text-xs text-gray-400 mt-0.5 group-hover:text-gray-600 transition-colors duration-300">{time}</p>
      </div>
    </div>
  );
};

// ─── User Row Component ────────────────────────────────────────────
const UserTableRow = ({ user }) => {
  return (
    <tr className="group border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-300">
      <td className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors duration-300">
              {user.full_name || 'Người dùng ẩn danh'}
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4">
        <span className={`px-2.5 py-1 text-[9px] md:text-[10px] font-bold rounded-md tracking-wide inline-block transition-all duration-300 ${
          user.role === 'admin' 
            ? 'bg-purple-100 text-purple-700 group-hover:bg-purple-200' 
            : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
        }`}>
          {user.role?.toUpperCase()}
        </span>
      </td>
      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-500 text-right group-hover:text-gray-700 transition-colors duration-300">
        {new Date(user.created_at).toLocaleDateString('vi-VN')}
      </td>
    </tr>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, loading, signOut } = useAdminAuth();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExams: 0,
    totalResults: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bảo vệ Route
  useEffect(() => {
    if (!loading && !admin) {
      navigate('/admin/login');
    }
  }, [admin, loading, navigate]);

  // Fetch data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!admin) return;
      setDataLoading(true);
      
      try {
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        const { count: examCount } = await supabase
          .from('exams')
          .select('*', { count: 'exact', head: true });

        let resultCount = 0;
        try {
          const { count } = await supabase
            .from('exam_results')
            .select('*', { count: 'exact', head: true });
          resultCount = count || 0;
        } catch (e) { /* Ignore */ }

        setStats({
          totalUsers: userCount || 0,
          totalExams: examCount || 0,
          totalResults: resultCount
        });

        const { data: newUsers } = await supabase
          .from('profiles')
          .select('id, full_name, email, role, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        if (newUsers) setRecentUsers(newUsers);

      } catch (error) {
        console.error("Lỗi tải dữ liệu Dashboard:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchDashboardData();
  }, [admin]);

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      navigate('/admin/login');
    }
  };

  const sidebarMenu = [
    { icon: LayoutDashboard, label: 'Bảng điều khiển', path: '/admin/dashboard' },
    { icon: Users, label: 'Người dùng', path: '/admin/users' },
    { icon: BookOpen, label: 'Bộ đề thi', path: '/admin/exams' },
    { icon: FileText, label: 'Bài học', path: '/admin/lessons' },
    { icon: Type, label: 'Từ vựng', path: '/admin/vocabulary' },
  ];

  const recentActivities = [
    { name: 'Hệ thống', action: 'vừa được cập nhật dữ liệu mới', time: 'Vài giây trước', icon: Sparkles, color: 'bg-blue-100 text-blue-600' },
    { name: 'Admin', action: 'đã tạo 2 bộ đề thi mới', time: '5 phút trước', icon: Zap, color: 'bg-purple-100 text-purple-600' },
    { name: 'Hệ thống', action: '5 học viên mới đã đăng ký', time: '15 phút trước', icon: UserPlus, color: 'bg-green-100 text-green-600' },
  ];

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
          <p className="text-gray-600 font-medium text-sm md:text-base">Đang tải dữ liệu hệ thống...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans overflow-hidden">
      {/* ─── SIDEBAR ─── */}
      <aside className={`fixed md:static inset-y-0 left-0 w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between flex-shrink-0 z-40 shadow-sm transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div>
          {/* Logo */}
          <div className="h-16 md:h-20 flex items-center px-4 md:px-6 gap-3 cursor-pointer hover:bg-gray-50 transition-colors duration-300" onClick={() => navigate('/admin/dashboard')}>
            <div className="w-8 md:w-9 h-8 md:h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
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

          {/* Menu */}
          <nav className="px-3 md:px-4 py-4 space-y-1">
            {sidebarMenu.map((item, index) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all duration-200 text-sm md:text-[15px] ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' 
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
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
            className="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 z-10 gap-4 shadow-sm">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="relative flex-1 max-w-[400px] hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:bg-white"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 flex-shrink-0">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button 
              onClick={() => navigate('/admin/exams/create')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 md:px-5 py-2.5 rounded-xl flex items-center gap-2 text-xs md:text-sm font-semibold transition-all shadow-md hover:shadow-lg flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Tạo Đề Mới</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="mb-6 md:mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tổng quan Dashboard</h1>
            <p className="text-gray-600 text-xs md:text-sm mt-2">Chào mừng trở lại, đây là những gì đang diễn ra tại HubStudy hôm nay.</p>
          </div>

          {dataLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
                <StatCard 
                  icon={Users} 
                  label="Người dùng hệ thống" 
                  value={stats.totalUsers} 
                  trend={12}
                  color="blue"
                  loading={dataLoading}
                />
                <StatCard 
                  icon={BookOpen} 
                  label="Bộ đề thi hiện có" 
                  value={stats.totalExams} 
                  trend={8}
                  color="purple"
                  loading={dataLoading}
                />
                <StatCard 
                  icon={CheckCircle2} 
                  label="Lượt nộp bài thi" 
                  value={stats.totalResults} 
                  trend={15}
                  color="green"
                  loading={dataLoading}
                />
              </div>

              {/* Chart & Activity Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="p-5 md:p-6 border-b border-gray-100">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Tăng trưởng người dùng</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Tổng quan tương tác trong 6 tháng qua</p>
                  </div>
                  <div className="p-5 md:p-6">
                    <GrowthChart />
                  </div>
                </div>

                {/* Activity */}
                <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="p-5 md:p-6 border-b border-gray-100">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Hoạt động gần đây</h3>
                  </div>
                  <div className="p-5 md:p-6 space-y-1 max-h-80 overflow-y-auto">
                    {recentActivities.map((activity, index) => (
                      <ActivityItem
                        key={index}
                        icon={activity.icon}
                        name={activity.name}
                        action={activity.action}
                        time={activity.time}
                        color={activity.color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in">
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Người dùng mới đăng ký</h3>
                    <p className="text-xs text-gray-500 mt-1">{recentUsers.length} người dùng mới nhất</p>
                  </div>
                  <button 
                    onClick={() => navigate('/admin/users')}
                    className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300"
                  >
                    Xem tất cả
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-bold text-gray-600 uppercase tracking-wider">Học viên</th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-bold text-gray-600 uppercase tracking-wider">Vai trò</th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-bold text-gray-600 uppercase tracking-wider text-right">Ngày tham gia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentUsers.length > 0 ? (
                        recentUsers.map((user) => (
                          <UserTableRow key={user.id} user={user} />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center py-8 text-gray-400 text-sm">Chưa có người dùng nào.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
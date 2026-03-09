// src/admin/pages/Users/UserManagement.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { 
  Search, Shield, User, Clock, ShieldAlert, 
  CheckCircle2, Loader2, RefreshCw, Menu, X, 
  Users, TrendingUp, Activity, MoreVertical, Filter,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { getUsers, updateUserRole } from '../../services/userService';
import UserSidebar from './UserSidebar';

// ─── Role Badge Component ──────────────────────────────────────────
const RoleBadge = ({ role, isUpdating, onClick }) => {
  const isAdmin = role === 'admin';
  
  return (
    <button
      onClick={onClick}
      disabled={isUpdating}
      className={`
        group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isUpdating ? 'opacity-60 cursor-wait pointer-events-none' : 'cursor-pointer hover:scale-105 active:scale-95'}
        ${isAdmin 
          ? 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 hover:from-purple-200 hover:to-purple-100 shadow-sm hover:shadow-md focus:ring-purple-300' 
          : 'bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 hover:from-slate-200 hover:to-slate-100 shadow-sm hover:shadow-md focus:ring-slate-300'}
      `}
      title={isUpdating ? 'Đang cập nhật...' : 'Click để đổi quyền'}
    >
      {/* Icon với animation */}
      <div className="relative">
        {isUpdating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isAdmin ? 'bg-purple-400/20 group-hover:scale-150' : 'bg-slate-400/20 group-hover:scale-150'}`} />
            {isAdmin ? (
              <ShieldAlert className="w-4 h-4 relative z-10" />
            ) : (
              <User className="w-4 h-4 relative z-10" />
            )}
          </>
        )}
      </div>

      {/* Text */}
      <span className="font-semibold">{isAdmin ? 'Admin' : 'Student'}</span>

      {/* Ripple effect on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute inset-0 rounded-full ${isAdmin ? 'bg-purple-300' : 'bg-slate-300'} opacity-10 group-hover:animate-ping`} />
      </div>
    </button>
  );
};

// ─── User Row Component ───────────────────────────────────────────
const UserRow = ({ user, isUpdating, onRoleChange }) => {
  const isAdmin = user.role === 'admin';

  const formatDate = (isoString) => {
    if (!isoString) return 'Chưa đăng nhập';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return `${diffMins}m trước`;
      }
      return `${diffHours}h trước`;
    }
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays}d trước`;
    
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  return (
    <tr className="group border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-300">
      {/* User Info */}
      <td className="px-4 md:px-6 py-4">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {user.avatar_url ? (
              <>
                <img 
                  src={user.avatar_url} 
                  alt={user.full_name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300" 
                />
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${isAdmin ? 'bg-purple-500' : 'bg-green-500'} transition-colors duration-300`} />
              </>
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 group-hover:scale-110 ${
                isAdmin 
                  ? 'bg-gradient-to-br from-purple-100 to-purple-50 text-purple-700 border-purple-200' 
                  : 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 border-blue-200'
              }`}>
                {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
            {isAdmin && (
              <Shield className="absolute -top-1 -right-1 w-3 h-3 text-purple-600 bg-white rounded-full p-0.5" />
            )}
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1">
            <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 truncate">
              {user.full_name || 'Người dùng ẩn danh'}
            </p>
            <p className="text-xs text-gray-500 font-mono mt-0.5 truncate group-hover:text-gray-700 transition-colors duration-300">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Role Toggle */}
      <td className="px-4 md:px-6 py-4">
        <div className="flex justify-center">
          <RoleBadge 
            role={user.role} 
            isUpdating={isUpdating}
            onClick={() => onRoleChange(user.id, user.role)}
          />
        </div>
      </td>

      {/* Last Login */}
      <td className="px-4 md:px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
          <Activity className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
          <span className="text-xs md:text-sm font-medium">{formatDate(user.last_login)}</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 md:px-6 py-4 text-right">
        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100">
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

// ─── Stats Card Component ──────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, trend, color = 'blue' }) => {
  const colorMap = {
    blue: { bg: 'from-blue-50 to-blue-100/50', icon: 'text-blue-600', accent: 'bg-blue-100' },
    purple: { bg: 'from-purple-50 to-purple-100/50', icon: 'text-purple-600', accent: 'bg-purple-100' },
    green: { bg: 'from-green-50 to-green-100/50', icon: 'text-green-600', accent: 'bg-green-100' },
    amber: { bg: 'from-amber-50 to-amber-100/50', icon: 'text-amber-600', accent: 'bg-amber-100' },
  };

  const colors = colorMap[color];
  const isTrendUp = trend >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Card */}
      <div className="relative bg-white border border-gray-200/80 rounded-2xl p-5 md:p-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
        {/* Top section */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${colors.accent} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${isTrendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isTrendUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div>
          <p className="text-gray-600 text-xs md:text-sm font-medium mb-1">{label}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {value}
          </p>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent w-0 group-hover:w-full transition-all duration-500" />
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── FETCH DATA ──
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Lỗi tải users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ── ĐỔI QUYỀN (ROLE) ──
  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'student' : 'admin';
    
    if (newRole === 'student') {
      const confirm = window.confirm("Bạn có chắc muốn gỡ quyền Admin của người này?");
      if (!confirm) return;
    }

    setUpdatingId(userId);
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      alert("Lỗi khi cập nhật quyền: " + error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // ── LỌC VÀ TÌM KIẾM ──
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(u => 
      (u.full_name?.toLowerCase().includes(q)) || 
      (u.email?.toLowerCase().includes(q))
    );
  }, [users, searchQuery]);

  // ── STATS ──
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const studentCount = users.filter(u => u.role === 'student').length;
  const activeToday = users.filter(u => {
    if (!u.last_login) return false;
    const date = new Date(u.last_login);
    const now = new Date();
    const diffHours = (now - date) / (1000 * 60 * 60);
    return diffHours < 24;
  }).length;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between flex-shrink-0 z-40 shadow-sm transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <UserSidebar onSignOut={() => {}} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 flex-shrink-0 gap-4 shadow-sm">
          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-lg md:text-xl font-bold text-gray-900">Quản lý Người dùng</h1>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none max-w-sm">
            <div className="relative flex-1 hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Tìm theo tên hoặc email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:bg-white hover:border-gray-300"
              />
            </div>

            <button
              onClick={fetchUsers}
              className="p-2.5 md:p-2.5 hover:bg-gray-100 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-300 flex-shrink-0"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-blue-500' : ''}`} />
            </button>
          </div>
        </header>

        {/* Mobile Search */}
        <div className="sm:hidden px-4 py-3 bg-white border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            {/* Stats Section */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Thống kê hệ thống</h2>
                  <p className="text-sm text-gray-600 mt-1">Cập nhật realtime</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <StatCard icon={Users} label="Tổng thành viên" value={totalUsers} trend={12} color="blue" />
                <StatCard icon={Shield} label="Admin" value={adminCount} trend={0} color="purple" />
                <StatCard icon={User} label="Học viên" value={studentCount} trend={8} color="green" />
                <StatCard icon={Activity} label="Hoạt động hôm nay" value={activeToday} trend={5} color="amber" />
              </div>
            </div>

            {/* Users Table Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900">Danh sách thành viên</h2>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">{filteredUsers.length} của {totalUsers} người dùng</p>
                </div>
                <button className="p-2.5 hover:bg-gray-100 text-gray-600 rounded-full transition-all duration-300 hidden md:flex">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-50 to-slate-50/50 border-b border-gray-200">
                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Thành viên</th>
                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Vai trò</th>
                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right hidden sm:table-cell">Hoạt động</th>
                        <th className="px-4 md:px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right w-12" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr>
                          <td colSpan={4} className="px-4 md:px-6 py-16 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <div className="relative w-12 h-12">
                                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                              </div>
                              <p className="text-sm font-medium text-gray-600">Đang tải dữ liệu người dùng...</p>
                            </div>
                          </td>
                        </tr>
                      ) : filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 md:px-6 py-16 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                                <Users className="w-8 h-8 text-slate-400" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Không tìm thấy người dùng</p>
                                <p className="text-xs text-gray-500 mt-1">Hãy thử lại với từ khóa khác</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user, index) => (
                          <UserRow
                            key={user.id}
                            user={user}
                            isUpdating={updatingId === user.id}
                            onRoleChange={handleRoleChange}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer info */}
              {filteredUsers.length > 0 && !loading && (
                <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-white rounded-xl border border-gray-200 text-xs md:text-sm text-gray-600">
                  <span>Hiển thị <span className="font-semibold text-gray-900">{filteredUsers.length}</span> kết quả</span>
                  <span className="hidden sm:inline">Sắp xếp: Hoạt động gần nhất</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
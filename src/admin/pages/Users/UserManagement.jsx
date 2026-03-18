// src/admin/pages/Users/UserManagement.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Shield, Clock, ShieldAlert,
  Loader2, RefreshCw, Users,
  Trash2, AlertTriangle,
  ShieldCheck, Info, ChevronRight,
  UserCheck, UserX, Zap, Crown
} from 'lucide-react';
import { motion as Motion , AnimatePresence } from 'framer-motion';
import { getUsers, updateUserRole, deleteUser } from '../../services/userService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { logAdminAction } from '../../utils/adminLogger';

// ─── Helpers ──────────────────────────────────────────────────────
const getStatus = (iso) => {
  if (!iso) return { label: 'Chưa truy cập', color: 'text-slate-400', dot: 'bg-slate-300', ring: 'ring-slate-200' };
  const diffMin = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (diffMin < 5)  return { label: 'Đang online', color: 'text-[#58CC02]', dot: 'bg-[#58CC02] animate-pulse', ring: 'ring-[#b8f0a0]' };
  if (diffMin < 60) return { label: `${diffMin} phút trước`, color: 'text-[#1CB0F6]', dot: 'bg-[#1CB0F6]', ring: 'ring-blue-200' };
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24)   return { label: `${diffH} giờ trước`, color: 'text-[#FF9600]', dot: 'bg-[#FF9600]', ring: 'ring-orange-200' };
  return { label: new Date(iso).toLocaleDateString('vi-VN'), color: 'text-slate-400', dot: 'bg-slate-300', ring: 'ring-slate-200' };
};

// ─── Modal: Delete ─────────────────────────────────────────────────
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, user, isDeleting }) => (
  <AnimatePresence>
    {isOpen && user && (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
           style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={!isDeleting ? onClose : undefined} />

        <Motion.div
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full sm:max-w-[400px] bg-white rounded-t-[28px] sm:rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-2xl overflow-hidden"
        >
          {/* Header strip */}
          <div className="bg-[#FFF0F0] border-b-2 border-[#ffd6d6] px-6 pt-7 pb-5 text-center">
            <div className="w-16 h-16 bg-[#FF4B4B] rounded-[18px] border-b-[5px] border-[#d93535] flex items-center justify-center mx-auto mb-3 shadow-sm">
              <AlertTriangle size={30} strokeWidth={2.5} className="text-white" />
            </div>
            <h3 className="text-[20px] font-black text-slate-800 leading-tight">Xóa tài khoản?</h3>
            <p className="text-[13px] font-bold text-slate-500 mt-1 leading-snug">
              Hành động này <span className="text-[#FF4B4B] font-black">không thể hoàn tác</span>
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-[16px] border-2 border-slate-200 mb-5">
              <div className="w-10 h-10 rounded-[12px] bg-[#FFF0F0] border-2 border-[#ffd6d6] flex items-center justify-center shrink-0 font-black text-[16px] text-[#FF4B4B]">
                {user?.full_name?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="min-w-0">
                <p className="font-black text-slate-800 text-[15px] truncate leading-tight">{user?.full_name || 'Học viên ẩn danh'}</p>
                <p className="text-[12px] font-bold text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} disabled={isDeleting}
                className="flex-1 py-3.5 bg-slate-50 text-slate-600 border-2 border-slate-200 border-b-[4px] rounded-[16px] text-[14px] font-black uppercase tracking-wider hover:bg-slate-100 active:border-b-[2px] active:translate-y-[2px] transition-all outline-none disabled:opacity-50">
                Hủy bỏ
              </button>
              <button onClick={onConfirm} disabled={isDeleting}
                className="flex-1 py-3.5 bg-[#FF4B4B] text-white border-2 border-[#c93535] border-b-[4px] rounded-[16px] text-[14px] font-black uppercase tracking-wider hover:bg-[#e03535] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm flex items-center justify-center gap-2 disabled:opacity-70">
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Trash2 size={16} strokeWidth={3} /> Xóa ngay</>}
              </button>
            </div>
          </div>
        </Motion.div>
      </div>
    )}
  </AnimatePresence>
);

// ─── Modal: Role Change ────────────────────────────────────────────
const RoleChangeModal = ({ isOpen, onClose, onConfirm, user, isUpdating }) => {
  if (!isOpen || !user) return null;
  const toAdmin = user.role !== 'admin';
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
           style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={!isUpdating ? onClose : undefined} />

        <Motion.div
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full sm:max-w-[420px] bg-white rounded-t-[28px] sm:rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-2xl overflow-hidden"
        >
          <div className={`border-b-2 px-6 pt-7 pb-5 text-center ${toAdmin ? 'bg-[#F8EEFF] border-[#e4c8ff]' : 'bg-[#FFFBEA] border-[#FFE5A0]'}`}>
            <div className={`w-16 h-16 rounded-[18px] border-b-[5px] flex items-center justify-center mx-auto mb-3 shadow-sm ${toAdmin ? 'bg-[#CE82FF] border-[#a855cc]' : 'bg-[#FF9600] border-[#cc7a00]'}`}>
              {toAdmin ? <Crown size={30} strokeWidth={2.5} className="text-white" /> : <ShieldAlert size={30} strokeWidth={2.5} className="text-white" />}
            </div>
            <h3 className="text-[20px] font-black text-slate-800 leading-tight">Thay đổi phân quyền</h3>
            <p className="text-[13px] font-bold text-slate-500 mt-1">
              {toAdmin ? 'Cấp quyền Admin cho tài khoản này' : 'Hạ xuống quyền Student'}
            </p>
          </div>

          <div className="px-6 py-5">
            {/* From → To */}
            <div className="flex items-center gap-2 mb-5">
              <div className={`flex-1 py-3 px-4 rounded-[14px] border-2 border-b-[3px] text-center ${user.role === 'admin' ? 'bg-[#F8EEFF] border-[#e4c8ff]' : 'bg-slate-100 border-slate-200'}`}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Hiện tại</p>
                <p className={`text-[15px] font-black ${user.role === 'admin' ? 'text-[#CE82FF]' : 'text-slate-500'}`}>{user.role === 'admin' ? 'Admin' : 'Student'}</p>
              </div>
              <ChevronRight className="text-slate-300 shrink-0" size={22} strokeWidth={3} />
              <div className={`flex-1 py-3 px-4 rounded-[14px] border-2 border-b-[3px] text-center ${toAdmin ? 'bg-[#F8EEFF] border-[#CE82FF]' : 'bg-slate-100 border-slate-300'}`}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Mới</p>
                <p className={`text-[15px] font-black ${toAdmin ? 'text-[#CE82FF]' : 'text-slate-500'}`}>{toAdmin ? 'Admin' : 'Student'}</p>
              </div>
            </div>

            {/* Warning box */}
            <div className={`p-4 rounded-[16px] mb-5 flex items-start gap-3 border-2 ${toAdmin ? 'bg-[#F8EEFF] border-[#e4c8ff]' : 'bg-[#FFFBEA] border-[#FFD8A8]'}`}>
              <Info className={`w-5 h-5 shrink-0 mt-0.5 ${toAdmin ? 'text-[#CE82FF]' : 'text-[#FF9600]'}`} strokeWidth={2.5} />
              <p className={`text-[13px] font-bold leading-snug ${toAdmin ? 'text-purple-800' : 'text-amber-800'}`}>
                {toAdmin
                  ? 'Tài khoản sẽ có toàn quyền quản trị: thêm, sửa, xóa dữ liệu hệ thống.'
                  : 'Tài khoản sẽ mất quyền truy cập vào bảng Admin.'}
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} disabled={isUpdating}
                className="flex-1 py-3.5 bg-slate-50 text-slate-600 border-2 border-slate-200 border-b-[4px] rounded-[16px] text-[14px] font-black uppercase tracking-wider hover:bg-slate-100 active:border-b-[2px] active:translate-y-[2px] transition-all outline-none">
                Hủy
              </button>
              <button onClick={onConfirm} disabled={isUpdating}
                className={`flex-1 py-3.5 text-white border-2 border-b-[4px] rounded-[16px] text-[14px] font-black uppercase tracking-wider transition-all outline-none shadow-sm flex items-center justify-center gap-2
                  ${toAdmin ? 'bg-[#CE82FF] border-[#a855cc] hover:bg-[#b366e0] active:border-b-[2px] active:translate-y-[2px]'
                           : 'bg-[#FF9600] border-[#cc7a00] hover:bg-[#e08800] active:border-b-[2px] active:translate-y-[2px]'}`}>
                {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck size={16} strokeWidth={3} /> Xác nhận</>}
              </button>
            </div>
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
};

// ─── Stat Card ─────────────────────────────────────────────────────
const StatCard = ({ label, value, unit, color, bg, border, icon: Icon }) => (
  <div className={`${bg} p-5 rounded-[22px] border-2 ${border} border-b-[5px] shadow-sm hover:-translate-y-1 transition-transform`}>
    <div className="flex items-start justify-between mb-3">
      <p className={`text-[10px] font-black uppercase tracking-widest ${color} leading-tight`}>{label}</p>
      <div className={`w-8 h-8 rounded-[10px] ${bg} border-2 ${border} flex items-center justify-center`}>
        <Icon size={16} strokeWidth={2.5} className={color} />
      </div>
    </div>
    <p className={`text-[30px] font-black leading-none ${color}`}>
      {value} <span className="text-[15px] opacity-60">{unit}</span>
    </p>
  </div>
);

// ─── User Row Card ─────────────────────────────────────────────────
const UserCard = ({ user, onRoleChange, onDelete }) => {
  const isAdmin = user.role === 'admin';
  const status = getStatus(user.last_login);

  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
      className="bg-white border-2 border-slate-200 border-b-[4px] rounded-[22px] hover:border-slate-300 hover:-translate-y-0.5 transition-all shadow-sm group"
    >
      {/* Main Row */}
      <div className="flex items-center gap-4 p-4 md:p-5">

        {/* Avatar */}
        <div className="relative shrink-0">
          <div className={`w-12 h-12 rounded-[14px] border-b-[3px] flex items-center justify-center font-black text-[17px] shadow-sm overflow-hidden
            ${isAdmin ? 'bg-[#F8EEFF] text-[#CE82FF] border-[#ddb8ff]' : 'bg-[#EAF6FE] text-[#1CB0F6] border-[#a8dcfb]'}`}>
            {user.avatar_url
              ? <img src={user.avatar_url} className="w-full h-full object-cover" alt="avatar" />
              : (user.full_name?.charAt(0).toUpperCase() || '?')}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-[3px] border-white ring-2 ${status.ring} ${status.dot}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h3 className="text-[16px] font-black text-slate-800 truncate leading-tight m-0">
              {user.full_name || 'Học viên ẩn danh'}
            </h3>
            <span className={`shrink-0 px-2.5 py-0.5 rounded-[8px] text-[10px] font-black uppercase tracking-widest border
              ${isAdmin ? 'bg-[#F8EEFF] text-[#CE82FF] border-[#ddb8ff]' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
              {isAdmin ? '👑 Admin' : 'Student'}
            </span>
          </div>
          <p className="text-[13px] font-bold text-slate-400 truncate m-0">{user.email}</p>
        </div>

        {/* Last login — hidden on mobile, shown on md+ */}
        <div className="hidden md:flex flex-col items-end shrink-0 mr-2">
          <span className={`text-[12px] font-black uppercase tracking-wider ${status.color}`}>{status.label}</span>
          <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1"><Clock size={11} strokeWidth={2.5} /> Lần cuối</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onRoleChange(user)}
            title="Đổi phân quyền"
            className="flex items-center gap-1.5 px-3 h-10 rounded-[13px] bg-[#FFFBEA] text-[#FF9600] border-2 border-[#FFD8A8] border-b-[3px] hover:bg-[#FF9600] hover:text-white hover:border-[#cc7a00] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm text-[12px] font-black uppercase tracking-wider"
          >
            <Shield size={15} strokeWidth={2.5} />
            <span className="hidden sm:inline">Quyền</span>
          </button>
          <button
            onClick={() => onDelete(user)}
            title="Xóa tài khoản"
            className="flex items-center gap-1.5 px-3 h-10 rounded-[13px] bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] border-b-[3px] hover:bg-[#FF4B4B] hover:text-white hover:border-[#c93535] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm text-[12px] font-black uppercase tracking-wider"
          >
            <Trash2 size={15} strokeWidth={2.5} />
            <span className="hidden sm:inline">Xóa</span>
          </button>
        </div>
      </div>

      {/* Mobile: last login strip */}
      <div className="flex md:hidden items-center justify-between px-5 py-2.5 border-t-2 border-slate-100 bg-slate-50 rounded-b-[20px]">
        <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5"><Clock size={11} strokeWidth={2.5} /> Lần cuối truy cập</span>
        <span className={`text-[12px] font-black ${status.color}`}>{status.label}</span>
      </div>
    </Motion.div>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────
const UserManagement = () => {
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });
  const [roleModal, setRoleModal] = useState({ isOpen: false, user: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try { const data = await getUsers(); setUsers(data || []); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleConfirmRoleChange = async () => {
    const user = roleModal.user;
    const newRole = user.role === 'admin' ? 'student' : 'admin';
    setIsUpdatingRole(true);
    try {
      await updateUserRole(user.id, newRole);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));
      if (admin) await logAdminAction(admin.id, admin.email, 'UPDATE_USER', `Cấp quyền ${newRole} cho: ${user.email || user.full_name}`);
      setRoleModal({ isOpen: false, user: null });
    } catch { alert('Lỗi cập nhật quyền'); }
    finally { setIsUpdatingRole(false); }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const u = deleteModal.user;
      await deleteUser(u.id);
      setUsers(prev => prev.filter(x => x.id !== u.id));
      if (admin) await logAdminAction(admin.id, admin.email, 'DELETE_USER', `Người dùng: ${u.email || u.full_name}`);
      setDeleteModal({ isOpen: false, user: null });
    } catch { alert('Lỗi xóa người dùng'); }
    finally { setIsDeleting(false); }
  };

  const onlineCount = useMemo(() =>
    users.filter(u => u.last_login && (Date.now() - new Date(u.last_login)) / 60000 < 5).length, [users]);
  const adminCount = useMemo(() => users.filter(u => u.role === 'admin').length, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchSearch = u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole = filterRole === 'all' || u.role === filterRole;
      return matchSearch && matchRole;
    });
  }, [users, searchQuery, filterRole]);

  return (
    <div className="flex h-screen bg-[#F4F7FA] overflow-hidden font-sans"
         style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin}
        onSignOut={async () => { const r = await signOut(); if (r.success) navigate('/admin/login'); }} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => {}} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-5 pb-12">

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[16px] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[4px] flex items-center justify-center shadow-sm shrink-0">
                  <Users className="text-[#1CB0F6] w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-[22px] sm:text-[26px] font-black text-slate-800 leading-none m-0">Quản lý Thành viên</h1>
                  <p className="text-[13px] font-bold text-slate-400 mt-0.5 m-0">Theo dõi hoạt động & phân quyền tài khoản</p>
                </div>
              </div>
              <button onClick={fetchUsers}
                className="self-start sm:self-auto flex items-center gap-2 px-5 py-3 bg-white border-2 border-slate-200 border-b-[4px] rounded-[16px] hover:bg-slate-50 hover:text-[#1CB0F6] active:border-b-[2px] active:translate-y-[2px] transition-all shadow-sm outline-none text-[13px] font-black text-slate-600 uppercase tracking-wider">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#1CB0F6]' : ''}`} strokeWidth={2.5} />
                Làm mới
              </button>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard label="Tổng thành viên" value={users.length} unit="users"
                color="text-[#1CB0F6]" bg="bg-[#EAF6FE]" border="border-[#BAE3FB]" icon={Users} />
              <StatCard label="Đang online" value={onlineCount} unit="active"
                color="text-[#58CC02]" bg="bg-[#F0FDE8]" border="border-[#bef09a]" icon={Zap} />
              <StatCard label="Quản trị viên" value={adminCount} unit="admins"
                color="text-[#CE82FF]" bg="bg-[#F8EEFF]" border="border-[#ddb8ff]" icon={Crown}
                className="col-span-2 md:col-span-1" />
            </div>

            {/* ── Search & Filter Bar ── */}
            <div className="bg-white border-2 border-slate-200 border-b-[4px] rounded-[22px] shadow-sm p-4 flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={3} />
                <input
                  type="text"
                  placeholder="Tìm tên hoặc email..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-[14px] text-[14px] font-bold focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 placeholder:font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Role Filter Tabs */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-[14px] shrink-0">
                {[
                  { key: 'all', label: 'Tất cả' },
                  { key: 'admin', label: '👑 Admin' },
                  { key: 'student', label: 'Student' },
                ].map(tab => (
                  <button key={tab.key}
                    onClick={() => setFilterRole(tab.key)}
                    className={`px-4 py-2.5 rounded-[11px] text-[12px] font-black uppercase tracking-wider transition-all outline-none
                      ${filterRole === tab.key
                        ? 'bg-white border-2 border-slate-200 border-b-[3px] text-slate-700 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Result count ── */}
            {!loading && (
              <div className="flex items-center justify-between px-1">
                <p className="text-[13px] font-bold text-slate-400">
                  Hiển thị <span className="text-slate-700 font-black">{filteredUsers.length}</span> / {users.length} người dùng
                </p>
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}
                    className="text-[12px] font-black text-[#1CB0F6] hover:underline uppercase tracking-wider">
                    Xóa bộ lọc ×
                  </button>
                )}
              </div>
            )}

            {/* ── Users List ── */}
            <div className="space-y-3">
              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin mb-4" />
                  <p className="font-black text-slate-500 text-[15px]">Đang tải dữ liệu...</p>
                  <p className="text-[13px] font-bold text-slate-400 mt-1">Vui lòng chờ trong giây lát</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-20 bg-white border-2 border-dashed border-slate-300 rounded-[24px]">
                  <div className="w-16 h-16 bg-slate-100 border-2 border-slate-200 border-b-[4px] rounded-[18px] flex items-center justify-center mx-auto mb-4">
                    <Search size={26} className="text-slate-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[18px] font-black text-slate-700 m-0">Không tìm thấy!</h3>
                  <p className="text-[14px] font-bold text-slate-400 mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  <button onClick={() => { setSearchQuery(''); setFilterRole('all'); }}
                    className="mt-4 px-5 py-2.5 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] border-b-[3px] rounded-[14px] text-[13px] font-black uppercase tracking-wider hover:bg-[#1CB0F6] hover:text-white hover:border-[#0d8ecf] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none">
                    Xem tất cả
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredUsers.map(user => (
                    <UserCard key={user.id} user={user}
                      onRoleChange={(u) => setRoleModal({ isOpen: true, user: u })}
                      onDelete={(u) => setDeleteModal({ isOpen: true, user: u })}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* ── Modals ── */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen} user={deleteModal.user} isDeleting={isDeleting}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={handleConfirmDelete}
      />
      <RoleChangeModal
        isOpen={roleModal.isOpen} user={roleModal.user} isUpdating={isUpdatingRole}
        onClose={() => setRoleModal({ isOpen: false, user: null })}
        onConfirm={handleConfirmRoleChange}
      />
    </div>
  );
};

export default UserManagement;
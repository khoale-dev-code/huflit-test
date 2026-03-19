// src/admin/pages/Users/UserManagement.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Shield, Clock, ShieldAlert,
  Loader2, RefreshCw, Users,
  Trash2, AlertTriangle,
  ShieldCheck, Info, ChevronRight,
  Zap, Crown
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { getUsers, updateUserRole, deleteUser } from '../../services/userService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { logAdminAction } from '../../utils/adminLogger';

// ─── Helpers ──────────────────────────────────────────────────────
const getStatus = (iso) => {
  if (!iso) return { label: 'Chưa truy cập', color: 'text-slate-400', dot: 'bg-slate-300', ring: 'ring-slate-200' };
  const diffMin = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (diffMin < 5)  return { label: 'Đang online', color: 'text-[#58CC02]', dot: 'bg-[#58CC02] animate-pulse', ring: 'ring-[#bcf096]' };
  if (diffMin < 60) return { label: `${diffMin} phút trước`, color: 'text-[#1CB0F6]', dot: 'bg-[#1CB0F6]', ring: 'ring-[#BAE3FB]' };
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24)   return { label: `${diffH} giờ trước`, color: 'text-[#FF9600]', dot: 'bg-[#FF9600]', ring: 'ring-[#FFD8A8]' };
  return { label: new Date(iso).toLocaleDateString('vi-VN'), color: 'text-slate-400', dot: 'bg-slate-300', ring: 'ring-slate-200' };
};

// ─── Modal: Delete ─────────────────────────────────────────────────
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, user, isDeleting }) => (
  <AnimatePresence>
    {isOpen && user && (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 font-nunito">
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={!isDeleting ? onClose : undefined} />

        <Motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full sm:max-w-[400px] bg-white rounded-t-3xl sm:rounded-3xl border-2 border-slate-200 border-b-[6px] shadow-2xl overflow-hidden"
        >
          {/* Header strip */}
          <div className="bg-[#FFF0F0] border-b-2 border-[#ffd6d6] px-6 pt-8 pb-6 text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-[#FF4B4B] rounded-2xl border-b-[4px] border-[#d93535] flex items-center justify-center mx-auto mb-4 shadow-sm relative z-10">
              <AlertTriangle size={32} strokeWidth={3} className="text-white" />
            </div>
            <h3 className="text-[22px] font-black text-slate-800 leading-tight">Xóa tài khoản?</h3>
            <p className="text-[14px] font-bold text-slate-500 mt-1.5 leading-snug">
              Hành động này <span className="text-[#FF4B4B] font-black">không thể hoàn tác</span>
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#FFF0F0] border-2 border-[#ffd6d6] border-b-[3px] flex items-center justify-center shrink-0 font-black text-[20px] text-[#FF4B4B]">
                {user?.full_name?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="min-w-0">
                <p className="font-black text-slate-800 text-[16px] truncate leading-tight mb-0.5">{user?.full_name || 'Học viên ẩn danh'}</p>
                <p className="text-[13px] font-bold text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} disabled={isDeleting}
                className="flex-1 py-3.5 bg-slate-100 text-slate-500 border-2 border-slate-200 border-b-[4px] rounded-2xl text-[15px] font-black uppercase tracking-wider hover:bg-slate-200 hover:text-slate-700 active:border-b-2 active:translate-y-[2px] transition-all outline-none disabled:opacity-50">
                Hủy bỏ
              </button>
              <button onClick={onConfirm} disabled={isDeleting}
                className="flex-1 py-3.5 bg-[#FF4B4B] text-white border-2 border-[#d93535] border-b-[4px] rounded-2xl text-[15px] font-black uppercase tracking-wider hover:brightness-105 active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm flex items-center justify-center gap-2 disabled:opacity-70">
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Trash2 size={18} strokeWidth={3} /> Xóa ngay</>}
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
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 font-nunito">
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={!isUpdating ? onClose : undefined} />

        <Motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full sm:max-w-[420px] bg-white rounded-t-3xl sm:rounded-3xl border-2 border-slate-200 border-b-[6px] shadow-2xl overflow-hidden"
        >
          <div className={`border-b-2 px-6 pt-8 pb-6 text-center ${toAdmin ? 'bg-[#F8EEFF] border-[#e4c8ff]' : 'bg-[#FFFBEA] border-[#FFE5A0]'}`}>
            <div className={`w-16 h-16 rounded-2xl border-b-[4px] flex items-center justify-center mx-auto mb-4 shadow-sm ${toAdmin ? 'bg-[#CE82FF] border-[#a855cc]' : 'bg-[#FF9600] border-[#cc7a00]'}`}>
              {toAdmin ? <Crown size={32} strokeWidth={3} className="text-white" /> : <ShieldAlert size={32} strokeWidth={3} className="text-white" />}
            </div>
            <h3 className="text-[22px] font-black text-slate-800 leading-tight">Thay đổi phân quyền</h3>
            <p className="text-[14px] font-bold text-slate-500 mt-1.5">
              {toAdmin ? 'Cấp quyền Admin cho tài khoản này' : 'Hạ xuống quyền Student'}
            </p>
          </div>

          <div className="px-6 py-6">
            {/* From → To */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`flex-1 py-3.5 px-4 rounded-2xl border-2 border-b-[4px] text-center ${user.role === 'admin' ? 'bg-[#F8EEFF] border-[#e4c8ff]' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Hiện tại</p>
                <p className={`text-[16px] font-black ${user.role === 'admin' ? 'text-[#CE82FF]' : 'text-slate-600'}`}>{user.role === 'admin' ? 'Admin' : 'Student'}</p>
              </div>
              <ChevronRight className="text-slate-300 shrink-0" size={24} strokeWidth={3} />
              <div className={`flex-1 py-3.5 px-4 rounded-2xl border-2 border-b-[4px] text-center shadow-inner ${toAdmin ? 'bg-[#F8EEFF] border-[#CE82FF]' : 'bg-slate-50 border-slate-300'}`}>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Mới</p>
                <p className={`text-[16px] font-black ${toAdmin ? 'text-[#CE82FF]' : 'text-slate-600'}`}>{toAdmin ? 'Admin' : 'Student'}</p>
              </div>
            </div>

            {/* Warning box */}
            <div className={`p-4 rounded-2xl mb-6 flex items-start gap-3 border-2 border-b-[4px] ${toAdmin ? 'bg-[#F8EEFF] border-[#e4c8ff]' : 'bg-[#FFFBEA] border-[#FFD8A8]'}`}>
              <Info className={`w-6 h-6 shrink-0 mt-0.5 ${toAdmin ? 'text-[#CE82FF]' : 'text-[#FF9600]'}`} strokeWidth={3} />
              <p className={`text-[14px] font-bold leading-relaxed ${toAdmin ? 'text-purple-800' : 'text-amber-800'}`}>
                {toAdmin
                  ? 'Tài khoản sẽ có toàn quyền quản trị: thêm, sửa, xóa dữ liệu hệ thống.'
                  : 'Tài khoản sẽ mất quyền truy cập vào bảng Admin.'}
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} disabled={isUpdating}
                className="flex-1 py-3.5 bg-slate-100 text-slate-500 border-2 border-slate-200 border-b-[4px] rounded-2xl text-[15px] font-black uppercase tracking-wider hover:bg-slate-200 hover:text-slate-700 active:border-b-2 active:translate-y-[2px] transition-all outline-none">
                Hủy
              </button>
              <button onClick={onConfirm} disabled={isUpdating}
                className={`flex-1 py-3.5 text-white border-2 border-b-[4px] rounded-2xl text-[15px] font-black uppercase tracking-wider transition-all outline-none shadow-sm flex items-center justify-center gap-2
                  ${toAdmin ? 'bg-[#CE82FF] border-[#a855cc] hover:brightness-105 active:border-b-2 active:translate-y-[2px]'
                           : 'bg-[#FF9600] border-[#cc7a00] hover:brightness-105 active:border-b-2 active:translate-y-[2px]'}`}>
                {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShieldCheck size={18} strokeWidth={3} /> Xác nhận</>}
              </button>
            </div>
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
};

// ─── Stat Card ─────────────────────────────────────────────────────
const StatCard = ({ label, value, unit, color, bg, border, icon: Icon, className = '' }) => {
  if (!Icon) return null;

  return (
    <div className={`${bg} p-5 sm:p-6 rounded-3xl border-2 ${border} border-b-[6px] shadow-sm hover:-translate-y-1 transition-transform ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <p className={`text-[11px] font-nunito font-black uppercase tracking-widest ${color} leading-tight`}>{label}</p>
        <div className={`w-10 h-10 rounded-xl ${bg} border-2 ${border} border-b-[3px] flex items-center justify-center shadow-sm`}>
          <Icon size={20} strokeWidth={3} className={color} />
        </div>
      </div>
      <p className={`text-[36px] font-nunito font-black leading-none ${color}`}>
        {value} <span className="text-[16px] opacity-60 ml-1">{unit}</span>
      </p>
    </div>
  );
};

// ─── User Row Card ─────────────────────────────────────────────────
const UserCard = ({ user, onRoleChange, onDelete }) => {
  const isAdmin = user.role === 'admin';
  const status = getStatus(user.last_login);

  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
      className="bg-white border-2 border-slate-200 border-b-[6px] rounded-3xl hover:bg-slate-50 active:translate-y-[2px] active:border-b-[4px] transition-all shadow-sm group font-nunito"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 md:p-5">

        {/* Info Area */}
        <div className="flex items-center gap-4 flex-1 w-full">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className={`w-14 h-14 rounded-2xl border-2 border-b-[4px] flex items-center justify-center font-black text-[20px] shadow-sm overflow-hidden
              ${isAdmin ? 'bg-[#F8EEFF] text-[#CE82FF] border-[#eec9ff]' : 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]'}`}>
              {user.avatar_url
                ? <img src={user.avatar_url} className="w-full h-full object-cover" alt="avatar" />
                : (user.full_name?.charAt(0).toUpperCase() || '?')}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[3px] border-white ring-2 ${status.ring} ${status.dot}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-[18px] font-black text-slate-800 truncate leading-tight m-0">
                {user.full_name || 'Học viên ẩn danh'}
              </h3>
              <span className={`shrink-0 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-b-[3px] shadow-sm
                ${isAdmin ? 'bg-[#F8EEFF] text-[#CE82FF] border-[#ddb8ff]' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                {isAdmin ? ' Admin' : 'Student'}
              </span>
            </div>
            <p className="text-[14px] font-bold text-slate-400 truncate m-0">{user.email}</p>
          </div>
        </div>

        {/* Right Area: Last Login + Actions */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6 px-1 md:px-0">
          <div className="flex flex-col items-start md:items-end shrink-0">
            <span className={`text-[13px] font-black uppercase tracking-wider ${status.color}`}>{status.label}</span>
            <span className="text-[12px] text-slate-400 font-bold flex items-center gap-1.5 mt-0.5"><Clock size={12} strokeWidth={3} /> Lần cuối</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onRoleChange(user)}
              title="Đổi phân quyền"
              className="flex items-center justify-center w-12 h-12 md:w-auto md:px-4 md:h-12 rounded-xl bg-[#FFFBEA] text-[#FF9600] border-2 border-[#FFD8A8] border-b-[4px] hover:bg-[#FF9600] hover:text-white hover:border-[#cc7a00] active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm font-black uppercase tracking-wider text-[13px]"
            >
              <Shield size={18} strokeWidth={3} />
              <span className="hidden md:inline ml-2">Quyền</span>
            </button>
            <button
              onClick={() => onDelete(user)}
              title="Xóa tài khoản"
              className="flex items-center justify-center w-12 h-12 md:w-auto md:px-4 md:h-12 rounded-xl bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] border-b-[4px] hover:bg-[#FF4B4B] hover:text-white hover:border-[#c93535] active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm font-black uppercase tracking-wider text-[13px]"
            >
              <Trash2 size={18} strokeWidth={3} />
              <span className="hidden md:inline ml-2">Xóa</span>
            </button>
          </div>
        </div>
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
    try { 
      const data = await getUsers(); 
      setUsers(data || []); 
    } catch { 
      // Linter fix: Optional catch binding (bỏ (err))
      console.error('Lỗi khi tải danh sách người dùng.'); 
    } finally { 
      setLoading(false); 
    }
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
    } catch { 
      alert('Lỗi cập nhật quyền'); 
    } finally { 
      setIsUpdatingRole(false); 
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const u = deleteModal.user;
      await deleteUser(u.id);
      setUsers(prev => prev.filter(x => x.id !== u.id));
      if (admin) await logAdminAction(admin.id, admin.email, 'DELETE_USER', `Người dùng: ${u.email || u.full_name}`);
      setDeleteModal({ isOpen: false, user: null });
    } catch { 
      alert('Lỗi xóa người dùng'); 
    } finally { 
      setIsDeleting(false); 
    }
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
    <div className="flex h-screen bg-[#F4F7FA] overflow-hidden font-nunito selection:bg-[#1CB0F6] selection:text-white">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin}
        onSignOut={async () => { const r = await signOut(); if (r.success) navigate('/admin/login'); }} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => {}} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-6 pb-12">

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[4px] flex items-center justify-center shadow-sm shrink-0">
                  <Users className="text-[#1CB0F6] w-7 h-7" strokeWidth={3} />
                </div>
                <div>
                  <h1 className="text-[24px] sm:text-[28px] font-black text-slate-800 leading-tight m-0">Thành viên</h1>
                  <p className="text-[14px] font-bold text-slate-500 mt-0.5 m-0">Quản lý và phân quyền hệ thống</p>
                </div>
              </div>
              <button onClick={fetchUsers}
                className="self-start sm:self-auto flex items-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 border-b-[4px] rounded-2xl hover:bg-slate-50 hover:border-slate-300 hover:text-[#1CB0F6] active:border-b-2 active:translate-y-[2px] transition-all shadow-sm outline-none text-[14px] font-black text-slate-600 uppercase tracking-widest">
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-[#1CB0F6]' : ''}`} strokeWidth={3} />
                Làm mới
              </button>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              <StatCard label="Tổng cộng" value={users.length} unit="người"
                color="text-[#1CB0F6]" bg="bg-[#EAF6FE]" border="border-[#BAE3FB]" icon={Users} />
              <StatCard label="Đang hoạt động" value={onlineCount} unit="online"
                color="text-[#58CC02]" bg="bg-[#F0FDE8]" border="border-[#bcf096]" icon={Zap} />
              <StatCard label="Quản trị viên" value={adminCount} unit="admin"
                color="text-[#CE82FF]" bg="bg-[#F8EEFF]" border="border-[#eec9ff]" icon={Crown}
                className="col-span-2 md:col-span-1" />
            </div>

            {/* ── Search & Filter Bar ── */}
            <div className="bg-white border-2 border-slate-200 border-b-[6px] rounded-3xl shadow-sm p-4 sm:p-5 flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" strokeWidth={3} />
                <input
                  type="text"
                  placeholder="Tìm tên hoặc email người dùng..."
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-slate-200 border-b-[4px] rounded-2xl text-[15px] font-black text-slate-700 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Role Filter Tabs */}
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl shrink-0 overflow-x-auto custom-scrollbar">
                {[
                  { key: 'all', label: 'Tất cả' },
                  { key: 'admin', label: 'Admin' },
                  { key: 'student', label: 'Học viên' },
                ].map(tab => (
                  <button key={tab.key}
                    onClick={() => setFilterRole(tab.key)}
                    className={`px-5 py-3 rounded-xl text-[13px] font-black uppercase tracking-wider transition-all outline-none whitespace-nowrap
                      ${filterRole === tab.key
                        ? 'bg-white border-2 border-slate-200 border-b-[4px] text-[#1CB0F6] shadow-sm translate-y-[-2px]'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Result count ── */}
            {!loading && (
              <div className="flex items-center justify-between px-2">
                <p className="text-[14px] font-bold text-slate-400">
                  Hiển thị <span className="text-[#1CB0F6] font-black">{filteredUsers.length}</span> / {users.length} tài khoản
                </p>
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}
                    className="text-[12px] font-black text-[#FF4B4B] hover:text-[#d93535] uppercase tracking-widest bg-[#FFF0F0] px-3 py-1.5 rounded-lg border-2 border-[#ffd6d6] active:border-b-0 active:translate-y-[2px] transition-all">
                    Xóa tìm kiếm ×
                  </button>
                )}
              </div>
            )}

            {/* ── Users List ── */}
            <div className="space-y-4">
              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center bg-white border-2 border-slate-200 border-b-[6px] rounded-3xl shadow-sm">
                  <div className="w-16 h-16 border-[4px] border-[#EAF6FE] border-t-[#1CB0F6] rounded-full animate-spin mb-5" />
                  <p className="font-black text-slate-700 text-[18px]">Đang lấy dữ liệu...</p>
                  <p className="text-[14px] font-bold text-slate-400 mt-1">Đợi một chút nhé</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-20 bg-white border-2 border-slate-200 border-b-[6px] rounded-3xl shadow-sm">
                  <div className="w-20 h-20 bg-slate-100 border-2 border-slate-200 border-b-[6px] rounded-[24px] flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <Search size={32} className="text-slate-400" strokeWidth={3} />
                  </div>
                  <h3 className="text-[22px] font-black text-slate-800 m-0">Chưa có ai ở đây!</h3>
                  <p className="text-[15px] font-bold text-slate-500 mt-2">Thử một từ khóa tìm kiếm khác xem sao.</p>
                  <button onClick={() => { setSearchQuery(''); setFilterRole('all'); }}
                    className="mt-6 px-8 py-3.5 bg-[#1CB0F6] text-white border-b-[4px] border-[#1899D6] rounded-2xl text-[14px] font-black uppercase tracking-widest hover:brightness-105 active:border-b-0 active:translate-y-[4px] transition-all outline-none shadow-sm">
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
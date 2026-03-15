// src/admin/pages/Users/UserManagement.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Shield, User, Clock, ShieldAlert, 
  Loader2, RefreshCw, Users, TrendingUp, 
  Activity, MoreVertical, Trash2, AlertTriangle,
  ArrowUpRight, CheckCircle2, ShieldCheck, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUsers, updateUserRole, deleteUser } from '../../services/userService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';

// ── IMPORT HOOK VÀ HÀM GHI LOG ──
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { logAdminAction } from '../../utils/adminLogger';

// ─── Component: Modal Xác Nhận Xóa (Gamified 3D) ──────────────────
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, user, isDeleting }) => {
  return (
    <AnimatePresence>
      {isOpen && user && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={!isDeleting ? onClose : undefined}
          />
          
          {/* Dialog */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 15 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 15 }} 
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[360px] bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-2xl p-6 text-center"
          >
            {/* Icon Nổi */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#FF4B4B] rounded-[16px] border-b-[4px] border-[#E54343] flex items-center justify-center shadow-sm">
              <AlertTriangle size={32} strokeWidth={2.5} className="text-white" />
            </div>
            
            <div className="mt-8 mb-6">
              <h3 className="text-[20px] font-display font-black text-slate-800 mb-2">Xác nhận xóa?</h3>
              <p className="text-[14px] font-body font-bold text-slate-500 leading-snug">
                Bạn đang chuẩn bị xóa tài khoản <span className="text-[#FF4B4B] font-black">{user?.full_name || user?.email}</span>. Mọi dữ liệu học tập sẽ bị mất vĩnh viễn!
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} disabled={isDeleting} className="flex-1 py-3 bg-slate-50 text-slate-500 border-2 border-slate-200 border-b-[4px] rounded-[14px] text-[13px] font-display font-black uppercase tracking-wider hover:bg-slate-100 hover:text-slate-700 active:border-b-[2px] active:translate-y-[2px] transition-all outline-none disabled:opacity-50">
                Hủy bỏ
              </button>
              <button onClick={onConfirm} disabled={isDeleting} className="flex-1 py-3 bg-[#FF4B4B] text-white border-2 border-[#E54343] border-b-[4px] rounded-[14px] text-[13px] font-display font-black uppercase tracking-wider hover:bg-[#E54343] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm flex items-center justify-center gap-2 disabled:opacity-70">
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Xóa ngay'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ─── Component: Modal Phân Quyền (Gamified 3D) ────────────────────
const RoleChangeModal = ({ isOpen, onClose, onConfirm, user, isUpdating }) => {
  if (!isOpen || !user) return null;

  const isCurrentlyAdmin = user.role === 'admin';
  const newRoleText = isCurrentlyAdmin ? 'Học viên (Student)' : 'Quản trị viên (Admin)';

  return (
    <AnimatePresence>
      {isOpen && user && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={!isUpdating ? onClose : undefined}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 15 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 15 }} 
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[380px] bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-2xl p-6 text-center"
          >
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-[16px] border-b-[4px] flex items-center justify-center shadow-sm ${isCurrentlyAdmin ? 'bg-[#FF9600] border-[#E58700]' : 'bg-[#CE82FF] border-[#B975E5]'}`}>
              {isCurrentlyAdmin ? <ShieldAlert size={32} strokeWidth={2.5} className="text-white" /> : <ShieldCheck size={32} strokeWidth={2.5} className="text-white" />}
            </div>
            
            <div className="mt-8 mb-6">
              <h3 className="text-[20px] font-display font-black text-slate-800 mb-2">Thay đổi phân quyền</h3>
              <p className="text-[14px] font-body font-bold text-slate-500 leading-snug">
                Đổi quyền của <span className="text-[#1CB0F6] font-black">{user.full_name || user.email}</span> thành <span className={`font-black ${isCurrentlyAdmin ? 'text-slate-600' : 'text-[#CE82FF]'}`}>{newRoleText}</span>.
              </p>
            </div>

            {/* Hộp Cảnh Báo */}
            <div className={`p-4 rounded-[16px] mb-6 flex items-start gap-3 border-2 text-left ${isCurrentlyAdmin ? 'bg-[#FFFBEA] border-[#FFD8A8]' : 'bg-[#F8EEFF] border-[#eec9ff]'}`}>
              <Info className={`w-5 h-5 shrink-0 mt-0.5 ${isCurrentlyAdmin ? 'text-[#FF9600]' : 'text-[#CE82FF]'}`} strokeWidth={2.5} />
              <div className="text-[13px] font-body font-bold">
                <span className={`font-display font-black uppercase tracking-wider block mb-1 ${isCurrentlyAdmin ? 'text-[#FF9600]' : 'text-[#CE82FF]'}`}>Lưu ý quan trọng:</span>
                <span className={isCurrentlyAdmin ? 'text-amber-800' : 'text-purple-800'}>
                  {isCurrentlyAdmin 
                    ? 'Tài khoản này sẽ mất quyền truy cập vào trang Admin.'
                    : 'Tài khoản này sẽ có toàn quyền Quản trị: thêm, sửa, xóa hệ thống.'}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} disabled={isUpdating} className="flex-1 py-3 bg-slate-50 text-slate-500 border-2 border-slate-200 border-b-[4px] rounded-[14px] text-[13px] font-display font-black uppercase tracking-wider hover:bg-slate-100 active:border-b-[2px] active:translate-y-[2px] transition-all outline-none">
                Hủy
              </button>
              <button 
                onClick={onConfirm} disabled={isUpdating} 
                className={`flex-1 py-3 text-white border-2 border-b-[4px] rounded-[14px] text-[13px] font-display font-black uppercase tracking-wider transition-all outline-none shadow-sm flex items-center justify-center gap-2
                  ${isCurrentlyAdmin 
                    ? 'bg-[#FF9600] border-[#E58700] hover:bg-[#E58700] active:border-b-[2px] active:translate-y-[2px]' 
                    : 'bg-[#CE82FF] border-[#B975E5] hover:bg-[#B975E5] active:border-b-[2px] active:translate-y-[2px]'}`}
              >
                {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Xác nhận'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ─── Component: User Card 3D ───────────────────────────────────────
const UserCard = ({ user, onRoleChange, onDelete }) => {
  const isAdmin = user.role === 'admin';

  const getStatus = (iso) => {
    if (!iso) return { label: 'Chưa truy cập', color: 'text-slate-400', dot: 'bg-slate-300' };
    
    const now = new Date();
    const lastLogin = new Date(iso);
    const diffInMin = Math.floor((now - lastLogin) / 60000);
    const diffInHours = Math.floor(diffInMin / 60);

    if (diffInMin < 5) return { label: 'Đang hoạt động', color: 'text-[#58CC02]', dot: 'bg-[#58CC02] animate-pulse' };
    if (diffInMin < 60) return { label: `${diffInMin} phút trước`, color: 'text-[#1CB0F6]', dot: 'bg-[#1CB0F6]' };
    if (diffInHours < 24) return { label: `${diffInHours} giờ trước`, color: 'text-[#FF9600]', dot: 'bg-[#FF9600]' };
    return { label: lastLogin.toLocaleDateString('vi-VN'), color: 'text-slate-400', dot: 'bg-slate-300' };
  };

  const status = getStatus(user.last_login);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white border-2 border-slate-200 border-b-[4px] rounded-[20px] p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 hover:-translate-y-1 transition-all shadow-sm group"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative shrink-0">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-[14px] border-b-[3px] flex items-center justify-center font-display font-black text-[18px] shadow-sm overflow-hidden ${isAdmin ? 'bg-[#F8EEFF] text-[#CE82FF] border-[#eec9ff]' : 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]'}`}>
            {user.avatar_url ? <img src={user.avatar_url} className="w-full h-full object-cover" alt="avatar" /> : user.full_name?.charAt(0).toUpperCase()}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white ${status.dot}`} />
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[16px] md:text-[18px] font-display font-black text-slate-800 truncate m-0 leading-tight">
              {user.full_name || 'Học viên ẩn danh'}
            </h3>
            <span className={`px-2.5 py-0.5 rounded-[8px] text-[10px] font-display font-black uppercase tracking-widest shrink-0 border ${isAdmin ? 'bg-[#F8EEFF] text-[#CE82FF] border-[#eec9ff]' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
              {isAdmin ? 'Admin' : 'Student'}
            </span>
          </div>
          <p className="text-[12px] md:text-[13px] font-body font-bold text-slate-400 truncate m-0">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t-2 border-slate-100 pt-3 md:border-none md:pt-0">
        <div className="flex flex-col md:items-end">
          <span className={`text-[11px] font-display font-black uppercase tracking-widest leading-tight ${status.color}`}>{status.label}</span>
          <span className="text-[11px] text-slate-400 font-body font-bold">Lần cuối truy cập</span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onRoleChange(user)} 
            title="Đổi phân quyền"
            className="w-10 h-10 rounded-[12px] bg-[#FFFBEA] text-[#FF9600] flex items-center justify-center border-2 border-[#FFD8A8] border-b-[3px] hover:bg-[#FF9600] hover:text-white hover:border-[#E58700] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm"
          >
            <Shield size={18} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => onDelete(user)} 
            title="Xóa tài khoản"
            className="w-10 h-10 rounded-[12px] bg-[#fff0f0] text-[#FF4B4B] flex items-center justify-center border-2 border-[#ffc1c1] border-b-[3px] hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm"
          >
            <Trash2 size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────
const UserManagement = () => {
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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
    } catch (err) { console.error(err); }
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

      if (admin) {
        await logAdminAction(admin.id, admin.email, 'UPDATE_USER', `Cấp quyền ${newRole} cho: ${user.email || user.full_name}`);
      }
      setRoleModal({ isOpen: false, user: null });
    } catch (err) { alert("Lỗi cập nhật quyền"); }
    finally { setIsUpdatingRole(false); }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const userToDelete = deleteModal.user;
      await deleteUser(userToDelete.id);
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      
      if (admin) {
        await logAdminAction(admin.id, admin.email, 'DELETE_USER', `Người dùng: ${userToDelete.email || userToDelete.full_name}`);
      }
      setDeleteModal({ isOpen: false, user: null });
    } catch (err) { alert("Lỗi xóa"); }
    finally { setIsDeleting(false); }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div className="flex h-screen bg-[#F4F7FA] overflow-hidden font-sans selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <AdminSidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        admin={admin} 
        onSignOut={async () => {
          const r = await signOut();
          if (r.success) navigate('/admin/login');
        }} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => {}} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 pb-10">
            
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[14px] bg-[#EAF6FE] flex items-center justify-center border-b-[4px] border-[#BAE3FB] shadow-sm shrink-0">
                  <Users className="text-[#1CB0F6] w-6 h-6" strokeWidth={2.5} />
                </div>
                <div className="pt-0.5">
                  <h1 className="text-[24px] sm:text-[28px] font-display font-black text-slate-800 leading-none m-0">
                    Quản lý Thành viên
                  </h1>
                  <p className="text-[13px] font-body font-bold text-slate-500 mt-1">
                    Theo dõi hoạt động và phân quyền tài khoản.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={3} />
                  <input 
                    type="text" 
                    placeholder="Tìm tên, email..." 
                    className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-200 rounded-[16px] text-[14px] font-body font-bold focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all placeholder:font-medium placeholder:text-slate-400"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button onClick={fetchUsers} className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-200 border-b-[4px] rounded-[16px] hover:bg-slate-50 hover:text-[#1CB0F6] active:border-b-2 active:translate-y-[2px] transition-all shadow-sm shrink-0 outline-none">
                  <RefreshCw className={`w-5 h-5 text-slate-500 ${loading ? 'animate-spin text-[#1CB0F6]' : ''}`} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              <div className="bg-white p-5 md:p-6 rounded-[24px] border-2 border-slate-200 border-b-[5px] shadow-sm hover:-translate-y-1 transition-transform">
                 <p className="text-[10px] md:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-1.5">Tổng cộng</p>
                 <h4 className="text-[28px] md:text-[32px] font-display font-black text-slate-800 leading-none m-0">{users.length} <span className="text-[14px] text-slate-400">user</span></h4>
              </div>
              <div className="bg-white p-5 md:p-6 rounded-[24px] border-2 border-slate-200 border-b-[5px] shadow-sm hover:-translate-y-1 transition-transform">
                 <p className="text-[10px] md:text-[11px] font-display font-black text-[#58CC02] uppercase tracking-widest mb-1.5">Đang Online</p>
                 <h4 className="text-[28px] md:text-[32px] font-display font-black text-[#58CC02] leading-none m-0">{users.filter(u => {
                   if (!u.last_login) return false;
                   const diff = (new Date() - new Date(u.last_login)) / 60000;
                   return diff < 5;
                 }).length} <span className="text-[14px] text-green-400">active</span></h4>
              </div>
            </div>

            {/* Users List (Cards) */}
            <div className="space-y-3 md:space-y-4">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin mb-4" />
                  <p className="font-display font-bold text-slate-500 text-[15px]">Đang tải dữ liệu người dùng...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-16 bg-white border-2 border-dashed border-slate-300 rounded-[24px]">
                  <div className="w-16 h-16 bg-slate-100 border-2 border-slate-200 border-b-[4px] rounded-[16px] flex items-center justify-center mx-auto mb-4">
                    <Search size={28} className="text-slate-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[18px] font-display font-black text-slate-700 m-0">Trống trơn!</h3>
                  <p className="text-[14px] font-body font-bold text-slate-500 mt-1">Không tìm thấy người dùng nào.</p>
                </div>
              ) : (
                filteredUsers.map((user, i) => (
                  <UserCard 
                    key={user.id} 
                    user={user} 
                    onRoleChange={(u) => setRoleModal({ isOpen: true, user: u })}
                    onDelete={(u) => setDeleteModal({ isOpen: true, user: u })}
                  />
                ))
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
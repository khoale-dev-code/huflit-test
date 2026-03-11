// src/admin/pages/Users/UserManagement.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Shield, User, Clock, ShieldAlert, 
  Loader2, RefreshCw, Users, TrendingUp, 
  Activity, MoreVertical, Trash2, AlertTriangle,
  ArrowUpRight, CheckCircle2, ShieldCheck, Info
} from 'lucide-react';
import { getUsers, updateUserRole, deleteUser } from '../../services/userService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';

// ── IMPORT HOOK VÀ HÀM GHI LOG ──
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { logAdminAction } from '../../utils/adminLogger';

// ─── Component: Modal Xác Nhận Xóa ────────────────────────────────
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, user, isDeleting }) => {
  if (!isOpen || !user) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Xác nhận xóa?</h3>
          <p className="text-slate-500 text-sm mb-8 px-4">
            Bạn đang chuẩn bị xóa tài khoản của <span className="font-bold text-slate-900">{user?.full_name}</span>. 
            Mọi dữ liệu học tập sẽ bị mất vĩnh viễn.
          </p>
          <div className="flex gap-4">
            <button onClick={onClose} disabled={isDeleting} className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all disabled:opacity-50">Hủy</button>
            <button onClick={onConfirm} disabled={isDeleting} className="flex-1 px-6 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2">
              {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Xóa ngay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Component: Modal Phân Quyền (MỚI) ────────────────────────────
const RoleChangeModal = ({ isOpen, onClose, onConfirm, user, isUpdating }) => {
  if (!isOpen || !user) return null;

  const isCurrentlyAdmin = user.role === 'admin';
  const newRole = isCurrentlyAdmin ? 'student' : 'admin';
  const newRoleText = isCurrentlyAdmin ? 'Học viên (Student)' : 'Quản trị viên (Admin)';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8">
          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 
            ${isCurrentlyAdmin ? 'bg-amber-50 text-amber-500' : 'bg-purple-50 text-purple-600'}`}>
            {isCurrentlyAdmin ? <ShieldAlert className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
          </div>
          
          <h3 className="text-2xl font-black text-slate-900 mb-2">Thay đổi phân quyền</h3>
          <p className="text-slate-500 text-sm mb-6">
            Bạn đang chuẩn bị đổi quyền của <span className="font-bold text-slate-900">{user.full_name || user.email}</span> thành <span className="font-bold text-slate-900">{newRoleText}</span>.
          </p>

          {/* Hộp Cảnh Báo */}
          <div className={`p-4 rounded-2xl mb-8 flex items-start gap-3 border 
            ${isCurrentlyAdmin 
              ? 'bg-amber-50/50 border-amber-100 text-amber-800' 
              : 'bg-purple-50/50 border-purple-100 text-purple-800'}`}>
            <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isCurrentlyAdmin ? 'text-amber-500' : 'text-purple-500'}`} />
            <div className="text-sm">
              <span className="font-bold block mb-1">Lưu ý quan trọng:</span>
              {isCurrentlyAdmin 
                ? 'Tài khoản này sẽ mất quyền truy cập vào trang Admin và không thể quản lý hệ thống nữa.'
                : 'Tài khoản này sẽ có toàn quyền Quản trị: thêm, sửa, xóa đề thi và quản lý tất cả học viên.'}
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={onClose} disabled={isUpdating} className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all disabled:opacity-50">
              Hủy
            </button>
            <button 
              onClick={onConfirm} 
              disabled={isUpdating} 
              className={`flex-1 px-6 py-4 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2
                ${isCurrentlyAdmin 
                  ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' 
                  : 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'}`}
            >
              {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Xác nhận'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Component: User Row với Trạng thái Hoạt động ──────────────────
const UserRow = ({ user, onRoleChange, onDelete }) => {
  const isAdmin = user.role === 'admin';

  // Hàm xử lý trạng thái thời gian thực
  const getStatus = (iso) => {
    if (!iso) return { label: 'Chưa truy cập', color: 'bg-slate-300', dot: 'bg-slate-300' };
    
    const now = new Date();
    const lastLogin = new Date(iso);
    const diffInMin = Math.floor((now - lastLogin) / 60000);
    const diffInHours = Math.floor(diffInMin / 60);

    if (diffInMin < 5) return { label: 'Đang hoạt động', color: 'text-emerald-600', dot: 'bg-emerald-500 animate-pulse' };
    if (diffInMin < 60) return { label: `${diffInMin} phút trước`, color: 'text-emerald-500', dot: 'bg-emerald-400' };
    if (diffInHours < 24) return { label: `${diffInHours} giờ trước`, color: 'text-amber-500', dot: 'bg-amber-400' };
    return { label: lastLogin.toLocaleDateString('vi-VN'), color: 'text-slate-400', dot: 'bg-slate-300' };
  };

  const status = getStatus(user.last_login);

  return (
    <tr className="group border-b border-slate-50 hover:bg-blue-50/30 transition-all duration-300">
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center font-black text-blue-600 shadow-sm overflow-hidden">
              {user.avatar_url ? <img src={user.avatar_url} className="w-full h-full object-cover" /> : user.full_name?.charAt(0).toUpperCase()}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white ${status.dot}`}></div>
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-black text-slate-900 truncate">{user.full_name || 'Học viên ẩn danh'}</p>
            <p className="text-[11px] font-medium text-slate-400 truncate tracking-tight">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-5 text-center">
        {/* Chỉ mở Modal thay vì update trực tiếp */}
        <button
          onClick={() => onRoleChange(user)}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            isAdmin ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {isAdmin ? 'Admin' : 'Student'}
        </button>
      </td>
      <td className="px-8 py-5 text-right hidden sm:table-cell">
        <div className="flex flex-col items-end">
          <span className={`text-[11px] font-black uppercase tracking-tighter ${status.color}`}>{status.label}</span>
          <span className="text-[10px] text-slate-300 font-bold">Lần cuối truy cập</span>
        </div>
      </td>
      <td className="px-8 py-5 text-right">
        <div className="flex justify-end items-center gap-2">
          <button onClick={() => onDelete(user)} className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
            <Trash2 className="w-5 h-5" />
          </button>
          <button className="p-2.5 text-slate-300 hover:text-blue-600 rounded-xl opacity-0 group-hover:opacity-100">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────
const UserManagement = () => {
  const navigate = useNavigate();
  // ── Thêm Auth để lấy thông tin Admin ──
  const { admin, signOut } = useAdminAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // ── States cho Modal ──
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

  // ── Xử lý khi xác nhận Đổi Quyền trong Modal ──
  const handleConfirmRoleChange = async () => {
    const user = roleModal.user;
    const newRole = user.role === 'admin' ? 'student' : 'admin';
    
    setIsUpdatingRole(true);
    try {
      await updateUserRole(user.id, newRole);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));

      // Ghi Log Thao Tác
      if (admin) {
        await logAdminAction(
          admin.id,
          admin.email,
          'UPDATE_USER',
          `Cấp quyền ${newRole} cho: ${user.email || user.full_name}`
        );
      }
      setRoleModal({ isOpen: false, user: null });
    } catch (err) { alert("Lỗi cập nhật quyền"); }
    finally { setIsUpdatingRole(false); }
  };

  // ── Ghi Log Xóa User ──
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const userToDelete = deleteModal.user;
      await deleteUser(userToDelete.id);
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      
      // Ghi Log Thao Tác
      if (admin) {
        await logAdminAction(
          admin.id,
          admin.email,
          'DELETE_USER',
          `Người dùng: ${userToDelete.email || userToDelete.full_name}`
        );
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
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
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

        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Quản lý <span className="text-blue-600">Thành viên</span></h2>
                <p className="text-slate-500 text-sm mt-1 font-medium">Phân quyền và theo dõi hoạt động của học viên HubStudy.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Tìm tên hoặc email..." 
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button onClick={fetchUsers} className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                  <RefreshCw className={`w-5 h-5 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng thành viên</p>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">{users.length}</h4>
               </div>
               <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đang Online</p>
                  <h4 className="text-2xl font-black text-emerald-500 mt-1">{users.filter(u => {
                    if (!u.last_login) return false;
                    const diff = (new Date() - new Date(u.last_login)) / 60000;
                    return diff < 5;
                  }).length}</h4>
               </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Thông tin thành viên</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Vai trò</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right hidden sm:table-cell">Hoạt động</th>
                      <th className="px-8 py-5 w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      <tr><td colSpan="4" className="py-24 text-center"><Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600 opacity-20" /></td></tr>
                    ) : filteredUsers.map(user => (
                      <UserRow 
                        key={user.id} 
                        user={user} 
                        onRoleChange={(u) => setRoleModal({ isOpen: true, user: u })}
                        onDelete={(u) => setDeleteModal({ isOpen: true, user: u })}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Modals ── */}
      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen}
        user={deleteModal.user}
        isDeleting={isDeleting}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={handleConfirmDelete}
      />

      <RoleChangeModal 
        isOpen={roleModal.isOpen}
        user={roleModal.user}
        isUpdating={isUpdatingRole}
        onClose={() => setRoleModal({ isOpen: false, user: null })}
        onConfirm={handleConfirmRoleChange}
      />
    </div>
  );
};

export default UserManagement;
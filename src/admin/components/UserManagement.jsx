// src/admin/components/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Download, UserX, 
  UserCheck, Edit, Trash2, Eye, Mail, Calendar,
  ChevronLeft, ChevronRight, AlertCircle
} from 'lucide-react';
import { 
  getUsers, 
  toggleUserStatus, 
  deleteUser,
  searchUsers 
} from '../services/userManagementService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvider, setFilterProvider] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const usersPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, [filterProvider]);

  const loadUsers = async () => {
    setLoading(true);
    const filters = {
      orderBy: 'createdAt',
      orderDirection: 'desc'
    };
    
    if (filterProvider !== 'all') {
      filters.authProvider = filterProvider;
    }
    
    const result = await getUsers(filters);
    if (result.success) {
      setUsers(result.users);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadUsers();
      return;
    }
    
    setLoading(true);
    const result = await searchUsers(searchTerm);
    if (result.success) {
      setUsers(result.users);
    }
    setLoading(false);
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    if (!confirm(`Bạn có chắc muốn ${currentStatus ? 'mở khóa' : 'khóa'} user này?`)) {
      return;
    }
    
    const result = await toggleUserStatus(userId, !currentStatus);
    if (result.success) {
      loadUsers();
      alert('Cập nhật trạng thái thành công!');
    } else {
      alert('Lỗi: ' + result.error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Bạn có chắc muốn xóa user này? Hành động này không thể hoàn tác!')) {
      return;
    }
    
    const result = await deleteUser(userId);
    if (result.success) {
      loadUsers();
      alert('Xóa user thành công!');
    } else {
      alert('Lỗi: ' + result.error);
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Email', 'Display Name', 'Provider', 'Created At', 'Status'],
      ...users.map(u => [
        u.email,
        u.displayName || 'N/A',
        u.authProvider,
        new Date(u.createdAt?.toDate()).toLocaleDateString(),
        u.disabled ? 'Disabled' : 'Active'
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${Date.now()}.csv`;
    a.click();
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Quản lý Users
          </h1>
          <p className="text-gray-600 mt-1">Tổng số: {users.length} users</p>
        </div>
        
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo email hoặc tên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filter */}
          <div className="flex gap-2">
            <select
              value={filterProvider}
              onChange={(e) => setFilterProvider(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả Provider</option>
              <option value="firebase">Firebase</option>
              <option value="google">Google</option>
              <option value="github">GitHub</option>
            </select>
            
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.displayName || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.authProvider}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {user.createdAt?.toDate ? 
                        new Date(user.createdAt.toDate()).toLocaleDateString('vi-VN') : 
                        'N/A'
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.disabled ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <UserX className="w-3 h-3 mr-1" />
                        Disabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <button
                        onClick={() => handleToggleStatus(user.id, user.disabled)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={user.disabled ? 'Mở khóa' : 'Khóa user'}
                      >
                        {user.disabled ? (
                          <UserCheck className="w-4 h-4 text-green-600" />
                        ) : (
                          <UserX className="w-4 h-4 text-orange-600" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa user"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Hiển thị {indexOfFirstUser + 1} - {Math.min(indexOfLastUser, users.length)} / {users.length}
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="px-4 py-2 border border-gray-300 rounded-lg">
                {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Chi tiết User</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedUser.photoURL || `https://ui-avatars.com/api/?name=${selectedUser.email}`}
                  alt={selectedUser.displayName}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedUser.displayName || 'N/A'}
                  </h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Provider</p>
                  <p className="font-medium">{selectedUser.authProvider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">User ID</p>
                  <p className="font-medium text-xs">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày tạo</p>
                  <p className="font-medium">
                    {selectedUser.createdAt?.toDate ? 
                      new Date(selectedUser.createdAt.toDate()).toLocaleString('vi-VN') : 
                      'N/A'
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cập nhật cuối</p>
                  <p className="font-medium">
                    {selectedUser.updatedAt?.toDate ? 
                      new Date(selectedUser.updatedAt.toDate()).toLocaleString('vi-VN') : 
                      'N/A'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
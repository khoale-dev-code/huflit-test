// src/admin/components/AdminSetup.jsx
import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import createFirstAdmin from '../../../scripts/createFirstAdmin';

const AdminSetup = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async () => {
    if (!window.confirm('⚠️ Bạn có chắc chắn muốn tạo admin với UID: nxd50HYmtQXkaezI4c8b1bkhDug2?')) {
      return;
    }

    setLoading(true);
    setStatus(null);
    
    const result = await createFirstAdmin();
    
    setStatus(result);
    setLoading(false);

    if (result.success) {
      setTimeout(() => {
        alert('✅ Admin đã được tạo thành công!\n\nBây giờ bạn có thể:\n1. Xóa route /admin/setup\n2. Đăng nhập tại /admin/login');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Khởi tạo Admin
          </h1>
          <p className="text-gray-600">
            Tạo Super Admin đầu tiên cho hệ thống
          </p>
        </div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900 mb-1">
                Lưu ý quan trọng
              </p>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• Chỉ chạy script này <strong>một lần duy nhất</strong></li>
                <li>• Đảm bảo UID đã được tạo trong Firebase Authentication</li>
                <li>• Admin sẽ được tạo trong collection <code>admin_accounts</code></li>
                <li>• Sau khi tạo, xóa route này khỏi code</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Admin UID:</p>
            <code className="block text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto font-mono">
              nxd50HYmtQXkaezI4c8b1bkhDug2
            </code>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Email:</p>
            <code className="block text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto">
              admin@example.com
            </code>
            <p className="text-xs text-amber-600 mt-2">
              ⚠️ Nhớ thay email này trong file script!
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Quyền:</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                Super Admin
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                manage_users
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                manage_exams
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                manage_grammar
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs font-medium">
                manage_vocabulary
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCreateAdmin}
          disabled={loading || status?.success}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Đang tạo Admin...</span>
            </>
          ) : status?.success ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Đã tạo thành công!</span>
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              <span>Tạo Super Admin</span>
            </>
          )}
        </button>

        {/* Status Message */}
        {status && (
          <div className={`mt-4 flex items-start gap-3 p-4 rounded-lg ${
            status.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {status.success ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900 mb-2">
                    🎉 Tạo Super Admin thành công!
                  </p>
                  <div className="space-y-1 text-xs text-green-700">
                    <p>📧 Email: {status.email}</p>
                    <p>🆔 UID: {status.adminUID}</p>
                    <p>📦 Collection: admin_accounts</p>
                  </div>
                  <p className="text-xs text-green-600 mt-3 font-medium">
                    ➡️ Bây giờ bạn có thể đăng nhập tại /admin/login
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900 mb-1">
                    Lỗi khi tạo admin
                  </p>
                  <p className="text-xs text-red-700">
                    {status.error}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            🔒 Admin Panel - Collection: admin_accounts
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
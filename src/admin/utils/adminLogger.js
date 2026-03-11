// src/admin/utils/adminLogger.js
import { supabase } from '../../config/supabaseClient';

/**
 * Hàm ghi nhận lịch sử hoạt động của Admin
 * @param {string} adminId - ID của admin đang đăng nhập
 * @param {string} adminEmail - Email hoặc Tên của admin
 * @param {string} actionType - Loại hành động (VD: 'CREATE_EXAM', 'UPDATE_EXAM', 'DELETE_USER')
 * @param {string} targetName - Tên đối tượng bị tác động (VD: 'Đề thi số 1', 'User nguyenA@gmail.com')
 */
export const logAdminAction = async (adminId, adminEmail, actionType, targetName) => {
  if (!adminId) return;
  
  try {
    const { error } = await supabase.from('admin_logs').insert([{
      admin_id: adminId,
      admin_name: adminEmail || 'Admin',
      action_type: actionType,
      target_name: targetName
    }]);

    if (error) {
      console.error('Lỗi khi ghi Admin Log:', error);
    }
  } catch (err) {
    console.error('Lỗi hệ thống khi ghi Admin Log:', err);
  }
};
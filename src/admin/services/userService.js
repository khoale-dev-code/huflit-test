import { supabase } from '../../config/supabaseClient';

// 1. LẤY DANH SÁCH TẤT CẢ NGƯỜI DÙNG
export const getUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false }); // Mới nhất lên đầu

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('❌ Lỗi lấy danh sách User:', error.message);
    throw error;
  }
};

// 2. CẬP NHẬT QUYỀN (ROLE) NGƯỜI DÙNG
export const updateUserRole = async (userId, newRole) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`❌ Lỗi cập nhật role cho User ${userId}:`, error.message);
    throw error;
  }
};
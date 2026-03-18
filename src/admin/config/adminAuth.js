// src/admin/config/adminAuth.js
import { 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserLocalPersistence 
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { supabase } from '../../config/supabaseClient';

/**
 * 🛡️ Kiểm tra quyền Admin từ Supabase
 */
export const checkAdminRoleFromSupabase = async (uid) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, role, full_name')
      .eq('id', uid)
      .single();

    if (error || !data) {
      return { isAdmin: false, error: 'Không tìm thấy thông tin tài khoản.' };
    }

    if (data.role !== 'admin') {
      return { isAdmin: false, error: 'Bạn không có quyền truy cập Admin.' };
    }

    return { isAdmin: true, adminData: data };
  } catch (error) {
    return { isAdmin: false, error: error.message };
  }
};

/**
 * 🔑 Đăng nhập admin (Dành cho Email/Password)
 */
export const adminSignIn = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Kiểm tra quyền từ Supabase
    const { isAdmin, adminData, error } = await checkAdminRoleFromSupabase(user.uid);
    
    if (!isAdmin) {
      await signOut(auth);
      throw new Error(error);
    }
    
    return { success: true, admin: adminData };
  } catch (error) {
    console.error('❌ Admin sign in error:', error);
    return { success: false, error: error.message };
  }
};
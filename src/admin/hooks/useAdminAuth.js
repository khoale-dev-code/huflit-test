import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Hãy điều chỉnh relative path nếu cần
import { supabase } from '../../config/supabaseClient'; 

/**
 * 🛡️ HOOK: useAdminAuth
 * Mục đích: Đồng bộ trạng thái đăng nhập từ Firebase Auth và kiểm tra phân quyền (Role-Based Access Control) trên Supabase.
 */
export const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Truy vấn bảng `profiles` trên Supabase để xác minh quyền `admin`
   * Tách biệt hàm này giúp logic rõ ràng, tuân thủ Single Responsibility Principle.
   */
  const checkAdminRole = async (uid) => {
    try {
      const { data, error: dbError } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url, role')
        .eq('id', uid)
        .single();

      if (dbError || !data) {
        return { hasRole: false, error: 'Không tìm thấy thông tin quyền hạn.' };
      }

      if (data.role === 'admin') {
        return { hasRole: true, adminData: data };
      }

      return { hasRole: false, error: 'Bạn không có quyền truy cập trang Admin.' };
    } catch (err) {
      return { hasRole: false, error: err.message };
    }
  };

  useEffect(() => {
    // Subscribe vào luồng thay đổi trạng thái đăng nhập của Firebase
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setError(null);

      // Nếu không có user đăng nhập, reset toàn bộ state
      if (!user) {
        setAdmin(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Cross-check Firebase UID với Database Supabase để cấp quyền
      const { hasRole, adminData, error: roleError } = await checkAdminRole(user.uid);

      if (hasRole) {
        setAdmin(adminData);
        setIsAdmin(true);
      } else {
        setAdmin(null);
        setIsAdmin(false);
        setError(roleError);
        
        // Tùy chọn (Optional): Tự động đăng xuất nếu user hợp lệ nhưng không phải là admin
        // await signOut(auth); 
      }

      setLoading(false);
    });

    // Luôn dọn dẹp (Cleanup) listener khi component unmount để tránh Memory Leak
    return () => unsubscribe();
  }, []);

  /**
   * Action Đăng xuất Admin
   */
  const adminSignOut = async () => {
    try {
      await signOut(auth);
      setAdmin(null);
      setIsAdmin(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return { admin, isAdmin, loading, error, signOut: adminSignOut };
};

export default useAdminAuth;
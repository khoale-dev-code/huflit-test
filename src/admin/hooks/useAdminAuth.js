import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase'; 
import { supabase } from '../../config/supabaseClient'; 

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 🛡️ Hàm kiểm tra quyền Admin với cơ chế Retry
   * Mục đích: Nếu database chưa kịp cập nhật user mới, nó sẽ thử lại sau 1s.
   */
  const checkAdminRole = useCallback(async (uid, retryCount = 0) => {
    try {
      const { data, error: dbError } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url, role')
        .eq('id', uid)
        .single();

      // Nếu không thấy dữ liệu, thử lại tối đa 2 lần (đề phòng race condition)
      if (!data && retryCount < 2) {
        console.log(`⏳ [AdminCheck] Chưa thấy data, đang thử lại lần ${retryCount + 1}...`);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        return checkAdminRole(uid, retryCount + 1);
      }

      if (dbError || !data) {
        return { hasRole: false, error: 'Không tìm thấy hồ sơ người dùng trong hệ thống.' };
      }

      if (data.role === 'admin') {
        return { hasRole: true, adminData: data };
      }

      return { hasRole: false, error: 'Bạn không có quyền truy cập trang Quản trị.' };
    } catch (err) {
      return { hasRole: false, error: err.message };
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setError(null);

      if (!user) {
        setAdmin(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      console.log("🔍 [AdminCheck] Bắt đầu kiểm tra quyền cho:", user.email);
      const result = await checkAdminRole(user.uid);

      if (result.hasRole) {
        console.log("✅ [AdminCheck] Đã xác minh Admin thành công!");
        setAdmin(result.adminData);
        setIsAdmin(true);
      } else {
        console.warn("🚫 [AdminCheck] Thất bại:", result.error);
        setAdmin(null);
        setIsAdmin(false);
        setError(result.error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [checkAdminRole]);

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
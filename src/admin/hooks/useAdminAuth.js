import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { supabase } from '../../config/supabaseClient';

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 🛡️ KIỂM TRA QUYỀN: Truy vấn bảng profiles trên Supabase
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (!user) {
        setAdmin(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Bước ngoặt: Thay vì tin Firebase hoàn toàn, ta hỏi Supabase về Role
      const result = await checkAdminRole(user.uid);

      if (result.hasRole) {
        setAdmin(result.adminData);
        setIsAdmin(true);
        setError(null);
      } else {
        setAdmin(null);
        setIsAdmin(false);
        setError(result.error);
        // Nếu không phải admin, có thể lựa chọn đẩy họ ra khỏi trang admin
        // await signOut(auth); 
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const adminSignOut = async () => {
    await signOut(auth);
    setAdmin(null);
    setIsAdmin(false);
    return { success: true };
  };

  return {
    admin,
    isAdmin,
    loading,
    error,
    signOut: adminSignOut
  };
};

export default useAdminAuth;
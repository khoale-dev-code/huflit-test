import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signInWithRedirect,
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { supabase } from '../config/supabaseClient';

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 🔄 HÀM ĐỒNG BỘ DỮ LIỆU SANG SUPABASE
   * Được gọi mỗi khi trạng thái đăng nhập thay đổi
   */
  const syncUserToSupabase = async (fbUser) => {
    if (!fbUser) return;

    console.log("🔄 [Sync] Đang thử đồng bộ user:", fbUser.email);

    try {
      // Thực hiện UPSERT: Nếu chưa có ID thì Insert, có rồi thì Update
      const { data, error: syncError, status } = await supabase
        .from('profiles')
        .upsert({
          id: fbUser.uid,         // ĐẢM BẢO cột 'id' trong SQL là kiểu TEXT
          email: fbUser.email,
          full_name: fbUser.displayName || 'Người dùng mới',
          avatar_url: fbUser.photoURL || '',
          last_login: new Date().toISOString(),
        }, { onConflict: 'id' });

      if (syncError) {
        console.error('❌ [Sync] Lỗi Supabase:', syncError.message);
        console.error('📊 [Sync] Mã trạng thái HTTP:', status);
        setError(`Lỗi đồng bộ: ${syncError.message}`);
      } else {
        console.log('✅ [Sync] Đồng bộ Supabase thành công! Status:', status);
      }
    } catch (err) {
      console.error('🚨 [Sync] Lỗi hệ thống:', err);
    }
  };

  /**
   * 📡 LẮNG NGHE TRẠNG THÁI AUTH
   */
  useEffect(() => {
    // Thiết lập ghi nhớ đăng nhập trên trình duyệt
    setPersistence(auth, browserLocalPersistence);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        console.log("👤 [Firebase] Đã nhận diện User:", firebaseUser.email);
        setUser(firebaseUser);
        setIsSignedIn(true);
        
        // Kích hoạt đồng bộ sang "nhà mới" Supabase
        await syncUserToSupabase(firebaseUser);
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * 🔑 ĐĂNG NHẬP GOOGLE
   * Kết hợp Popup và Redirect để tránh lỗi COOP
   */
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError(null);

    try {
      console.log("🔑 [Auth] Khởi động đăng nhập Google...");
      
      // Thử dùng Popup trước
      const result = await signInWithPopup(auth, provider);
      console.log("✅ [Auth] Đăng nhập Popup thành công");
      return { success: true, user: result.user };

    } catch (err) {
      console.warn("⚠️ [Auth] Lỗi Popup (có thể do COOP):", err.code);
      
      // Nếu lỗi COOP hoặc Popup bị chặn, tự động chuyển sang Redirect
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user' || err.message.includes('Cross-Origin-Opener-Policy')) {
        console.log("🔄 [Auth] Đang chuyển sang phương thức Redirect...");
        await signInWithRedirect(auth, provider);
      } else {
        setError(err.message);
        return { success: false, error: err.message };
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🚪 ĐĂNG XUẤT
   */
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("👋 [Auth] Đã đăng xuất");
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    user,
    isSignedIn,
    loading,
    error,
    signInWithGoogle,
    signOut: handleSignOut,
  };
};

export default useFirebaseAuth;
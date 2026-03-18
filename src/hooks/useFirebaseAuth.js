import { useState, useEffect, useCallback } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider, 
  signOut, 
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

  // 1. Hàm đồng bộ dữ liệu (Đã tối ưu để không làm treo luồng chính)
  const syncUserToSupabase = useCallback(async (fbUser) => {
    if (!fbUser) return;
    console.log("🔄 [Sync] Đang đồng bộ user:", fbUser.email);
    
    try {
      const { error: dbError } = await supabase
        .from('profiles')
        .upsert({
          id: fbUser.uid,
          email: fbUser.email,
          full_name: fbUser.displayName || fbUser.email.split('@')[0],
          avatar_url: fbUser.photoURL || '',
          last_login: new Date().toISOString()
        }, { onConflict: 'id' });

      if (dbError) console.warn("⚠️ [Supabase Sync]:", dbError.message);
      else console.log("✅ [Supabase Sync]: Thành công");
    } catch (err) {
      console.error("🚨 [Sync Critical Error]:", err);
    }
  }, []);

  // 2. Theo dõi trạng thái Auth
  useEffect(() => {
    let isMounted = true;

    // Thiết lập ghi nhớ đăng nhập
    setPersistence(auth, browserLocalPersistence);

    // Xử lý kết quả Redirect ngay khi load trang
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) console.log("✅ [Auth] Đăng nhập Redirect thành công");
      })
      .catch((err) => {
        console.error("❌ [Auth] Lỗi Redirect:", err.code);
        if (isMounted) setError(err.message);
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("📡 [Auth State]:", currentUser ? "Đã đăng nhập" : "Chưa đăng nhập");
      
      if (currentUser) {
        setUser(currentUser);
        setIsSignedIn(true);
        // Chạy sync nhưng không await để tránh block UI
        syncUserToSupabase(currentUser);
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
      
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [syncUserToSupabase]);

  // 3. Hàm đăng nhập (Ép dùng Redirect nếu môi trường không ổn định)
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    setLoading(true);
    setError(null);
    
    try {
      console.log("🔑 [Auth] Khởi động đăng nhập...");
      // Khoa có thể thử đổi dòng dưới thành signInWithRedirect(auth, provider) 
      // nếu Popup vẫn liên tục báo lỗi COOP
      await signInWithPopup(auth, provider);
      return { success: true };
    } catch (err) {
      console.warn("⚠️ [Auth Error]:", err.code);
      
      // Nếu lỗi liên quan đến bảo mật/popup, ép chuyển sang Redirect ngay
      if (err.code === 'auth/popup-blocked' || err.message.includes('policy')) {
        console.log("🔄 [Auth] Chuyển sang chế độ Redirect...");
        await signInWithRedirect(auth, provider);
        return { success: true, method: 'redirect' };
      }
      
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem('exam-progress-draft');
      console.log("👋 [Auth] Đã đăng xuất");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { user, isSignedIn, loading, error, signInWithGoogle, signOut: handleSignOut };
};

export default useFirebaseAuth;
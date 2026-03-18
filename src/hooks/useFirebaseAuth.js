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

/**
 * 🛡️ HOOK: useFirebaseAuth
 * Quản lý xác thực Firebase & Đồng bộ hồ sơ Supabase
 */
export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 🔄 ĐỒNG BỘ DỮ LIỆU SANG SUPABASE
   * Giải quyết lỗi 400 bằng cách chỉ gửi các cột chắc chắn tồn tại.
   */
  const syncUserToSupabase = useCallback(async (fbUser) => {
    if (!fbUser) return;
    
    try {
      const profileData = {
        id: fbUser.uid,
        email: fbUser.email,
        full_name: fbUser.displayName || fbUser.email.split('@')[0],
        avatar_url: fbUser.photoURL || '',
        last_login: new Date().toISOString(), // Theo dõi lần cuối đăng nhập
      };

      // 🚀 LƯU Ý: Chỉ thêm dòng này nếu bạn ĐÃ chạy lệnh SQL thêm cột updated_at
      // profileData.updated_at = new Date().toISOString();

      const { error: _syncError } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' });

      if (_syncError) {
        if (import.meta.env.DEV) console.warn("⚠️ [Supabase Sync]:", _syncError.message);
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("🚨 [Sync Critical Error]:", err);
    }
  }, []);

  /**
   * 📡 LẮNG NGHE TRẠNG THÁI & XỬ LÝ REDIRECT
   */
  useEffect(() => {
    // Thiết lập Persistence một lần duy nhất
    setPersistence(auth, browserLocalPersistence).catch((err) => {
      console.warn("⚠️ [Auth Persistence]:", err.message);
    });

    // Xử lý kết quả trả về từ Redirect (Tránh lỗi cửa sổ không đóng của Popup)
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user && import.meta.env.DEV) {
          console.log("✅ [Auth] Đăng nhập Redirect thành công");
        }
      })
      .catch((err) => {
        if (err.message.includes('Cross-Origin-Opener-Policy')) {
          // Lỗi COOP thường không chặn được Redirect, chỉ hiện cảnh báo
          console.info("ℹ️ [COOP Info]: Redirect handled security policy.");
        } else {
          setError(err.message);
        }
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        setIsSignedIn(true);
        await syncUserToSupabase(currentUser);
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [syncUserToSupabase]);

  /**
   * 🔑 ĐĂNG NHẬP GOOGLE (Hybrid)
   */
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    setLoading(true);
    setError(null);
    
    try {
      // 1. Thử dùng Popup trước cho trải nghiệm nhanh
      const result = await signInWithPopup(auth, provider);
      return { success: true, user: result.user };
    } catch (err) {
      // 2. Nếu bị chặn bởi COOP hoặc Popup Blocked -> Chuyển sang Redirect
      const shouldRedirect = 
        err.code === 'auth/popup-blocked' || 
        err.code === 'auth/popup-closed-by-user' ||
        err.message.includes('Cross-Origin-Opener-Policy');

      if (shouldRedirect) {
        if (import.meta.env.DEV) console.log("🔄 [Auth] Đang chuyển hướng sang Redirect...");
        await signInWithRedirect(auth, provider);
        return { success: true, method: 'redirect' };
      }
      
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🚪 ĐĂNG XUẤT
   */
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // Xóa nháp lưu cục bộ nếu cần
      localStorage.removeItem('exam-progress-draft');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { 
    user, 
    isSignedIn, 
    loading, 
    error, 
    signInWithGoogle, 
    signOut: handleSignOut 
  };
};

export default useFirebaseAuth;
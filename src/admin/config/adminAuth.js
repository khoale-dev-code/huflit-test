// src/admin/config/adminAuth.js
import { 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserLocalPersistence 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

/**
 * Kiểm tra user có phải admin không
 */
export const checkAdminRole = async (uid) => {
  try {
    // ✅ Sửa collection name từ 'admins' → 'admin_accounts'
    const adminRef = doc(db, 'admin_accounts', uid);
    const adminSnap = await getDoc(adminRef);
    
    if (!adminSnap.exists()) {
      return { isAdmin: false, error: 'Không có quyền admin' };
    }
    
    const adminData = adminSnap.data();
    
    // Kiểm tra admin có bị disable không
    if (adminData.disabled || adminData.status !== 'active') {
      return { isAdmin: false, error: 'Tài khoản admin đã bị khóa' };
    }
    
    return { 
      isAdmin: true, 
      adminData: {
        uid,
        email: adminData.email,
        role: adminData.role || 'admin',
        permissions: adminData.permissions || [],
        status: adminData.status,
        createdAt: adminData.createdAt
      }
    };
  } catch (error) {
    console.error('❌ Error checking admin role:', error);
    return { isAdmin: false, error: error.message };
  }
};

/**
 * Đăng nhập admin
 */
export const adminSignIn = async (email, password) => {
  try {
    // Set persistence
    await setPersistence(auth, browserLocalPersistence);
    
    // Đăng nhập
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Kiểm tra quyền admin
    const { isAdmin, adminData, error } = await checkAdminRole(user.uid);
    
    if (!isAdmin) {
      // Nếu không phải admin, đăng xuất luôn
      await signOut(auth);
      throw new Error(error || 'Không có quyền truy cập Admin');
    }
    
    console.log('✅ Admin signed in:', adminData.email);
    
    return { 
      success: true, 
      admin: adminData 
    };
  } catch (error) {
    console.error('❌ Admin sign in error:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

/**
 * Đăng xuất admin
 */
export const adminSignOut = async () => {
  try {
    await signOut(auth);
    console.log('✅ Admin signed out');
    return { success: true };
  } catch (error) {
    console.error('❌ Admin sign out error:', error);
    return { success: false, error: error.message };
  }
};
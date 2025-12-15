// src/admin/services/userManagementService.js
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase';

/**
 * Lấy danh sách users từ Firebase (từ collection 'users')
 */
export const getUsers = async (filters = {}) => {
  try {
    let q = collection(db, 'users');
    
    // Apply filters
    if (filters.authProvider) {
      q = query(q, where('authProvider', '==', filters.authProvider));
    }
    
    if (filters.orderBy) {
      q = query(q, orderBy(filters.orderBy, filters.orderDirection || 'desc'));
    }
    
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, users };
  } catch (error) {
    console.error('❌ Error getting users:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Lấy thông tin chi tiết user
 */
export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return { success: false, error: 'User không tồn tại' };
    }
    
    return { 
      success: true, 
      user: { id: userSnap.id, ...userSnap.data() } 
    };
  } catch (error) {
    console.error('❌ Error getting user:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Cập nhật thông tin user
 */
export const updateUser = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating user:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Xóa user (soft delete)
 */
export const deleteUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      deleted: true,
      deletedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Khóa/Mở khóa user
 */
export const toggleUserStatus = async (userId, disabled) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      disabled,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error toggling user status:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Tìm kiếm users
 */
export const searchUsers = async (searchTerm) => {
  try {
    // Firebase không hỗ trợ full-text search trực tiếp
    // Bạn có thể dùng Algolia hoặc filter ở client-side
    const { users } = await getUsers();
    
    const filtered = users.filter(user => 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return { success: true, users: filtered };
  } catch (error) {
    console.error('❌ Error searching users:', error);
    return { success: false, error: error.message };
  }
};
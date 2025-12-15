// scripts/updateAdminPermissions.js
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/config/firebase.js';

const updateAdminPermissions = async (adminUid) => {
  try {
    const adminRef = doc(db, 'admin_accounts', adminUid);
    
    await updateDoc(adminRef, {
      permissions: ['all'], // ✅ Hoặc cụ thể: ['manage_users', 'manage_exams', 'manage_grammar', 'manage_vocabulary']
      role: 'super_admin',
      status: 'active',
      disabled: false,
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Admin permissions updated successfully');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// Thay YOUR_ADMIN_UID bằng UID thực tế của bạn
updateAdminPermissions('YOUR_ADMIN_UID');
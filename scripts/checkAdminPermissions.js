// scripts/checkAdminPermissions.js
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../src/config/firebase.js';

const checkAdminPermissions = async () => {
  const user = auth.currentUser;
  
  if (!user) {
    console.error('❌ No user logged in');
    return;
  }
  
  console.log('Current User UID:', user.uid);
  console.log('Current User Email:', user.email);
  
  try {
    const adminRef = doc(db, 'admin_accounts', user.uid);
    const adminSnap = await getDoc(adminRef);
    
    if (!adminSnap.exists()) {
      console.error('❌ No admin account found for this user');
      console.log('Creating admin account...');
      
      // Tạo admin account nếu chưa có
      await setDoc(adminRef, {
        email: user.email,
        role: 'super_admin',
        permissions: ['all'], // ✅ Thêm 'all' permission
        status: 'active',
        disabled: false,
        createdAt: serverTimestamp(),
        createdBy: user.uid
      });
      
      console.log('✅ Admin account created with "all" permissions');
    } else {
      const adminData = adminSnap.data();
      console.log('✅ Admin account found:');
      console.log('Role:', adminData.role);
      console.log('Permissions:', adminData.permissions);
      console.log('Status:', adminData.status);
      console.log('Disabled:', adminData.disabled);
      
      // Kiểm tra nếu thiếu permissions
      if (!adminData.permissions || !adminData.permissions.includes('all')) {
        console.log('⚠️ Admin missing "all" permission. Updating...');
        
        await updateDoc(adminRef, {
          permissions: ['all'],
          updatedAt: serverTimestamp()
        });
        
        console.log('✅ Updated permissions to ["all"]');
      }
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// Run check
checkAdminPermissions();
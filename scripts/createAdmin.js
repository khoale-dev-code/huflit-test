// // scripts/createAdmin.js
// import admin from 'firebase-admin';
// import { readFileSync } from 'fs';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // ====================================
// // INITIALIZE FIREBASE ADMIN SDK
// // ====================================
// const serviceAccount = JSON.parse(
//   readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
// );

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
// });

// const db = admin.firestore();
// const auth = admin.auth();

// // ====================================
// // CONFIG - THAY ĐỔI THÔNG TIN NÀY
// // ====================================
// const ADMIN_CONFIG = {
//   uid: 'nxd50HYmtQXkaezI4c8b1bkhDug2', // UID từ Firebase Auth
//   email: 'admin@huflit.edu.vn',          // ✅ THAY email thật của bạn
//   password: 'Admin@123456',            // ✅ THAY password mạnh
//   displayName: 'Super Admin',
//   role: 'super_admin',
//   permissions: [
//     'manage_users',
//     'manage_exams',
//     'manage_grammar',
//     'manage_vocabulary',
//     'view_logs',
//     'manage_admins'
//   ],
//   status: 'active',
//   disabled: false
// };

// // ====================================
// // MAIN FUNCTION
// // ====================================
// async function createSuperAdmin() {
//   try {
//     console.log('🚀 Starting admin creation process...\n');

//     // ====================================
//     // 1. Check if user exists in Auth
//     // ====================================
//     let userExists = false;
//     try {
//       const existingUser = await auth.getUser(ADMIN_CONFIG.uid);
//       userExists = true;
//       console.log('✅ User already exists in Firebase Auth');
//       console.log(`   Current email: ${existingUser.email}`);
//     } catch (error) {
//       if (error.code === 'auth/user-not-found') {
//         console.log('📝 User not found, will create new user');
//       } else {
//         throw error;
//       }
//     }

//     // ====================================
//     // 2. Create or Update Auth User
//     // ====================================
//     if (!userExists) {
//       console.log('🔄 Creating Firebase Auth user...');
      
//       await auth.createUser({
//         uid: ADMIN_CONFIG.uid,
//         email: ADMIN_CONFIG.email,
//         password: ADMIN_CONFIG.password,
//         displayName: ADMIN_CONFIG.displayName,
//         emailVerified: true,
//         disabled: false
//       });
      
//       console.log('✅ Firebase Auth user created');
//       console.log(`   📧 Email: ${ADMIN_CONFIG.email}`);
//       console.log(`   🆔 UID: ${ADMIN_CONFIG.uid}`);
//     } else {
//       console.log('🔄 Updating existing Firebase Auth user...');
      
//       await auth.updateUser(ADMIN_CONFIG.uid, {
//         email: ADMIN_CONFIG.email,
//         displayName: ADMIN_CONFIG.displayName,
//         emailVerified: true,
//         disabled: false,
//         password: ADMIN_CONFIG.password
//       });
      
//       console.log('✅ Firebase Auth user updated');
//       console.log('✅ Password updated');
//     }

//     // ====================================
//     // 3. Create Admin Document in Firestore
//     // ====================================
//     console.log('\n🔄 Creating admin document in Firestore...');
    
//     const adminData = {
//       email: ADMIN_CONFIG.email,
//       role: ADMIN_CONFIG.role,
//       permissions: ADMIN_CONFIG.permissions,
//       status: ADMIN_CONFIG.status,
//       disabled: ADMIN_CONFIG.disabled,
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//       createdBy: 'script',
//       updatedAt: admin.firestore.FieldValue.serverTimestamp()
//     };

//     await db.collection('admin_accounts').doc(ADMIN_CONFIG.uid).set(adminData, { merge: true });
    
//     console.log('✅ Admin document created in Firestore');
//     console.log(`   📦 Collection: admin_accounts`);
//     console.log(`   🆔 Document ID: ${ADMIN_CONFIG.uid}`);

//     // ====================================
//     // 4. Set Custom Claims (Optional)
//     // ====================================
//     console.log('\n🔄 Setting custom claims...');
    
//     await auth.setCustomUserClaims(ADMIN_CONFIG.uid, {
//       admin: true,
//       role: ADMIN_CONFIG.role,
//       permissions: ADMIN_CONFIG.permissions
//     });
    
//     console.log('✅ Custom claims set');

//     // ====================================
//     // 5. Verify creation
//     // ====================================
//     console.log('\n🔍 Verifying...');
    
//     const adminDoc = await db.collection('admin_accounts').doc(ADMIN_CONFIG.uid).get();
//     if (adminDoc.exists) {
//       console.log('✅ Admin document verified in Firestore');
//     }
    
//     const userRecord = await auth.getUser(ADMIN_CONFIG.uid);
//     console.log('✅ Auth user verified');
//     console.log(`   Email verified: ${userRecord.emailVerified}`);

//     // ====================================
//     // 6. Summary
//     // ====================================
//     console.log('\n' + '='.repeat(60));
//     console.log('🎉 SUPER ADMIN CREATED SUCCESSFULLY!');
//     console.log('='.repeat(60));
//     console.log('\n📋 Admin Details:');
//     console.log(`   Email:       ${ADMIN_CONFIG.email}`);
//     console.log(`   Password:    ${ADMIN_CONFIG.password}`);
//     console.log(`   UID:         ${ADMIN_CONFIG.uid}`);
//     console.log(`   Role:        ${ADMIN_CONFIG.role}`);
//     console.log(`   Status:      ${ADMIN_CONFIG.status}`);
//     console.log(`   Permissions: ${ADMIN_CONFIG.permissions.join(', ')}`);
//     console.log('\n🔗 Next Steps:');
//     console.log('   1. Go to: http://localhost:5173/admin/login');
//     console.log(`   2. Login with: ${ADMIN_CONFIG.email}`);
//     console.log(`   3. Password: ${ADMIN_CONFIG.password}`);
//     console.log('\n⚠️  IMPORTANT:');
//     console.log('   - Change password after first login!');
//     console.log('   - Delete /admin/setup route from AdminApp.jsx');
//     console.log('   - Keep serviceAccountKey.json secure (already in .gitignore)');
//     console.log('='.repeat(60) + '\n');

//     process.exit(0);
//   } catch (error) {
//     console.error('\n❌ ERROR:', error.message);
//     if (error.code) {
//       console.error(`   Error code: ${error.code}`);
//     }
//     console.error('\n📋 Troubleshooting:');
//     console.error('   1. Check if serviceAccountKey.json is valid');
//     console.error('   2. Check Firebase project permissions');
//     console.error('   3. Make sure UID format is correct');
//     console.error('\nFull error:', error);
//     process.exit(1);
//   }
// }

// // ====================================
// // RUN SCRIPT
// // ====================================
// console.log('⚡ Firebase Admin Script');
// console.log('📦 Project: huflit-test-4ce25\n');

// createSuperAdmin();
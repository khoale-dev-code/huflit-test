// scripts/syncAuthUsersToFirestore.js
import { auth, db } from '../src/config/firebase.js';
import { collection, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { listUsers } from 'firebase-admin/auth'; // Cần admin SDK

const syncUsersToFirestore = async () => {
  try {
    // ⚠️ Cần dùng Firebase Admin SDK để list all users
    // Cài: npm install firebase-admin
    
    const listAllUsers = async (nextPageToken) => {
      const result = await listUsers(1000, nextPageToken);
      
      for (const user of result.users) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName || null,
            photoURL: user.photoURL || null,
            authProvider: 'firebase',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          
          console.log(`✅ Synced user: ${user.email}`);
        }
      }
      
      if (result.pageToken) {
        await listAllUsers(result.pageToken);
      }
    };
    
    await listAllUsers();
    console.log('✅ All users synced to Firestore');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

syncUsersToFirestore();
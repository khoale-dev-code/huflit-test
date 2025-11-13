// backend/firebase-config.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();

// Set Firestore rules for auto-delete after 24 hours
export const initializeFirestore = async () => {
  console.log('✅ Firestore initialized');
  // Schedule daily cleanup
  setInterval(cleanupOldMessages, 60 * 60 * 1000); // Check every hour
};

// Auto-delete messages older than 24 hours
export const cleanupOldMessages = async () => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const snapshot = await db.collection('messages')
      .where('timestamp', '<', admin.firestore.Timestamp.fromDate(twentyFourHoursAgo))
      .get();

    let deleted = 0;
    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      deleted++;
    });

    if (deleted > 0) {
      await batch.commit();
      console.log(`🗑️ Cleaned up ${deleted} old messages`);
    }
  } catch (error) {
    console.error('❌ Error cleaning up messages:', error);
  }
};

export default db;
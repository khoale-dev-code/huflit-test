// backend/firebase-config.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

let db = null;
let isInitialized = false;

export const initializeFirestore = async () => {
  if (isInitialized) {
    console.log('✅ Firestore already initialized');
    return db;
  }

  try {
    let serviceAccount;

    // Check if running on Render with secret file
    if (process.env.NODE_ENV === 'production') {
      try {
        // Try to read from Render secret file first
        serviceAccount = JSON.parse(
          readFileSync('/etc/secrets/firebase-service-account.json', 'utf8')
        );
        console.log('✅ Loaded Firebase config from secret file');
      } catch (fileError) {
        // Fallback to environment variable if secret file doesn't exist
        console.log('⚠️ Secret file not found, using environment variable');
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
      }
    } else {
      // Local development - use .env
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
      console.log('✅ Loaded Firebase config from .env');
    }

    // Validate service account
    if (!serviceAccount.project_id || !serviceAccount.private_key) {
      throw new Error('Invalid Firebase service account configuration');
    }

    // Initialize Firebase Admin only if not already initialized
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('✅ Firebase Admin initialized');
    }

    db = admin.firestore();
    isInitialized = true;
    
    console.log('✅ Firestore initialized successfully');
    
    // Start cleanup scheduler
    startCleanupScheduler();
    
    return db;

  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
    throw error;
  }
};

// Schedule cleanup
let cleanupInterval = null;

const startCleanupScheduler = () => {
  if (cleanupInterval) {
    console.log('⚠️ Cleanup scheduler already running');
    return;
  }

  // Run cleanup immediately on startup
  cleanupOldMessages();
  
  // Then schedule to run every hour
  cleanupInterval = setInterval(cleanupOldMessages, 60 * 60 * 1000);
  console.log('✅ Cleanup scheduler started (runs every hour)');
};

// Auto-delete messages older than 24 hours
export const cleanupOldMessages = async () => {
  try {
    if (!db) {
      console.log('⚠️ Firestore not initialized, skipping cleanup');
      return;
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const snapshot = await db.collection('messages')
      .where('timestamp', '<', admin.firestore.Timestamp.fromDate(twentyFourHoursAgo))
      .limit(500) // Limit batch size to avoid timeout
      .get();

    if (snapshot.empty) {
      console.log('✅ No old messages to clean up');
      return;
    }

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
    console.error('❌ Error cleaning up messages:', error.message);
  }
};

// Export getter function for db
export const getDb = () => {
  if (!db) {
    throw new Error('Firestore not initialized. Call initializeFirestore() first.');
  }
  return db;
};

// Export db directly (will be set after initialization)
export { db };

export default admin;
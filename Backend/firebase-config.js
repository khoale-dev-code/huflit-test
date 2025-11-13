// backend/firebase-config.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let db;
let isFirebaseEnabled = false;

try {
  const firebaseEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (!firebaseEnv) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT not provided');
  }
  
  let serviceAccount;
  
  // Parse JSON từ environment variable
  if (typeof firebaseEnv === 'string') {
    serviceAccount = JSON.parse(firebaseEnv);
  } else {
    serviceAccount = firebaseEnv;
  }
  
  // Validate credentials
  if (!serviceAccount.project_id || !serviceAccount.private_key) {
    throw new Error('Missing required Firebase credentials');
  }
  
  // Initialize Firebase Admin
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  
  db = admin.firestore();
  isFirebaseEnabled = true;
  
  console.log('✅ Firebase Admin initialized:', serviceAccount.project_id);
  
} catch (error) {
  console.warn('⚠️ Firebase initialization failed:', error.message);
  console.warn('⚠️ Using mock Firestore storage (development mode)');
  
  // Mock Firestore object for development/testing
  db = {
    collection: (name) => ({
      doc: (id) => ({
        set: async (data) => {
          console.log(`📝 [Mock] Set ${name}/${id}:`, JSON.stringify(data).substring(0, 50));
          return Promise.resolve();
        },
        delete: async () => {
          console.log(`🗑️ [Mock] Delete ${name}/${id}`);
          return Promise.resolve();
        },
        get: async () => ({ exists: false, data: () => null }),
      }),
      where: (field, op, value) => ({
        get: async () => {
          console.log(`🔍 [Mock] Query ${name} where ${field} ${op} ${value}`);
          return Promise.resolve({ docs: [] });
        },
      }),
      orderBy: (field, direction = 'asc') => ({
        limit: (n) => ({
          get: async () => {
            console.log(`📊 [Mock] Get ${n} docs from ${name} ordered by ${field}`);
            return Promise.resolve({ docs: [] });
          },
        }),
        get: async () => {
          console.log(`📊 [Mock] Get all docs from ${name} ordered by ${field}`);
          return Promise.resolve({ docs: [] });
        },
      }),
      get: async () => {
        console.log(`📊 [Mock] Get all docs from ${name}`);
        return Promise.resolve({ docs: [] });
      },
      add: async (data) => {
        console.log(`➕ [Mock] Add to ${name}:`, JSON.stringify(data).substring(0, 50));
        return Promise.resolve({ id: Date.now().toString() });
      },
    }),
    batch: () => ({
      set: (ref, data) => console.log(`📝 [Mock Batch] Set`),
      delete: (ref) => console.log(`🗑️ [Mock Batch] Delete`),
      commit: async () => {
        console.log('✅ [Mock Batch] Committed');
        return Promise.resolve();
      },
    }),
  };
  
  isFirebaseEnabled = false;
}

/**
 * Initialize Firestore with cleanup job
 */
export const initializeFirestore = async () => {
  if (isFirebaseEnabled) {
    console.log('✅ Firestore initialized with auto-cleanup');
    // Schedule cleanup every hour
    setInterval(cleanupOldMessages, 60 * 60 * 1000);
  } else {
    console.log('ℹ️ Firestore mock mode - no auto-cleanup');
  }
};

/**
 * Auto-delete messages older than 24 hours
 */
export const cleanupOldMessages = async () => {
  if (!isFirebaseEnabled) {
    console.log('ℹ️ [Mock] Auto-cleanup skipped');
    return;
  }
  
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const snapshot = await db.collection('messages')
      .where('timestamp', '<', admin.firestore.Timestamp.fromDate(twentyFourHoursAgo))
      .get();

    if (snapshot.docs.length > 0) {
      const batch = db.batch();
      
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log(`🗑️ Cleaned up ${snapshot.docs.length} old messages`);
    }
  } catch (error) {
    console.error('❌ Error cleaning up messages:', error.message);
  }
};

export { isFirebaseEnabled };
export { db };
export default db;
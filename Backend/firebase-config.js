import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount = {};

// Skip Firebase if no credentials
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    console.warn('⚠️ Invalid Firebase credentials, using mock');
  }
}

// Mock Firebase nếu không có credentials
if (!serviceAccount.project_id) {
  console.warn('⚠️ Firebase disabled - using mock storage');
  export const db = {
    collection: () => ({
      doc: () => ({ set: async () => {}, delete: async () => {} }),
      where: () => ({ get: async () => ({ docs: [] }) }),
      get: async () => ({ docs: [] })
    })
  };
} else {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  export const db = admin.firestore();
}

export const initializeFirestore = async () => {
  console.log('✅ Firestore initialized');
};

export default db;
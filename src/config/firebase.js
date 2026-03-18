import { initializeApp } from "firebase/app";
// ✅ Đã thêm GoogleAuthProvider vào đây
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from "firebase/auth"; 
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: "https://huflit-test-4ce25-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

if (!firebaseConfig.apiKey) {
  console.warn('Firebase config is missing. Check your .env file.');
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);

// ✅ THÊM DÒNG QUAN TRỌNG NÀY (ĐỂ AUTHPAGE CÓ THỂ GỌI ĐƯỢC GOOGLE LOGIN)
export const googleProvider = new GoogleAuthProvider();

// Emulator
// 🚀 FIX LỖI: Dùng import.meta.env.DEV thay cho process.env.NODE_ENV
if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATOR === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Connected to Firebase Emulators');
  } catch (error) {
    // 🚀 FIX LỖI: In biến error ra để phục vụ debug, giúp ESLint không báo thừa nữa
    console.warn('Firebase Emulators not available:', error);
  }
}

export default app;
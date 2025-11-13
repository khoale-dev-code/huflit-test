import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set persistence on mount
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(err => {
      console.warn('Persistence error:', err);
    });
  }, []);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up with email and password
  const signup = useCallback(async (email, password, displayName) => {
    try {
      setError(null);

      if (!email || !password) {
        throw new Error('Email và mật khẩu không được để trống');
      }

      if (password.length < 6) {
        throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (displayName) {
        await updateProfile(userCredential.user, {
          displayName,
          photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`,
        });
      }

      setUser(userCredential.user);
      return userCredential.user;
    } catch (err) {
      const errorMap = {
        'auth/email-already-in-use': 'Email này đã được đăng ký',
        'auth/weak-password': 'Mật khẩu phải có ít nhất 6 ký tự',
        'auth/invalid-email': 'Email không hợp lệ',
        'auth/operation-not-allowed': 'Đăng ký tạm thời không khả dụng',
      };

      const errorMessage = errorMap[err.code] || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Sign in with email and password
  const signin = useCallback(async (email, password) => {
    try {
      setError(null);

      if (!email || !password) {
        throw new Error('Email và mật khẩu không được để trống');
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (err) {
      const errorMap = {
        'auth/user-not-found': 'Tài khoản không tồn tại',
        'auth/wrong-password': 'Mật khẩu không chính xác',
        'auth/invalid-email': 'Email không hợp lệ',
        'auth/user-disabled': 'Tài khoản đã bị vô hiệu hóa',
        'auth/too-many-requests': 'Quá nhiều lần đăng nhập thất bại, vui lòng thử lại sau',
      };

      const errorMessage = errorMap[err.code] || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        return null;
      }
      const errorMessage = 'Google sign-in failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Send password reset email
  const resetPassword = useCallback(async (email) => {
    try {
      setError(null);
      if (!email) {
        throw new Error('Vui lòng nhập email');
      }
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (err) {
      const errorMap = {
        'auth/user-not-found': 'Email này không được đăng ký',
        'auth/invalid-email': 'Email không hợp lệ',
        'auth/too-many-requests': 'Quá nhiều yêu cầu, vui lòng thử lại sau',
      };

      const errorMessage = errorMap[err.code] || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Sign out
  const logout = useCallback(async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      const errorMessage = 'Đăng xuất thất bại';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Update user profile
  const updateUserProfile = useCallback(async (updates) => {
    try {
      setError(null);
      if (!auth.currentUser) {
        throw new Error('No user logged in');
      }
      await updateProfile(auth.currentUser, updates);
      setUser({ ...auth.currentUser, ...updates });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signInWithGoogle,
    resetPassword,
    logout,
    updateUserProfile,
    clearError: () => setError(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
// src/admin/hooks/useAdminAuth.js
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { checkAdminRole, adminSignIn, adminSignOut } from '../config/adminAuth';

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAdmin(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Kiểm tra quyền admin
      const { isAdmin: hasAdminRole, adminData, error: checkError } = 
        await checkAdminRole(user.uid);

      if (hasAdminRole) {
        setAdmin(adminData);
        setIsAdmin(true);
        setError(null);
      } else {
        setAdmin(null);
        setIsAdmin(false);
        setError(checkError);
        // Tự động đăng xuất nếu không phải admin
        await adminSignOut();
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    
    const result = await adminSignIn(email, password);
    
    if (result.success) {
      setAdmin(result.admin);
      setIsAdmin(true);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    const result = await adminSignOut();
    
    if (result.success) {
      setAdmin(null);
      setIsAdmin(false);
      setError(null);
    }
    
    setLoading(false);
    return result;
  };

  return {
    admin,
    isAdmin,
    loading,
    error,
    signIn,
    signOut
  };
};

export default useAdminAuth;
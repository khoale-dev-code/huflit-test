// src/hooks/useMaintenance.js
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { maintenanceService } from '../services/maintenanceService';
import { supabase } from '../config/supabaseClient';

export const useMaintenance = () => {
  const { user } = useAuth();
  const [config, setConfig] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = useCallback(async (uid) => {
    if (!uid) {
      setIsAdmin(false);
      return;
    }
    try {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', uid)
        .single();
      setIsAdmin(data?.role === 'admin');
    } catch {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = maintenanceService.subscribeToConfig((newConfig) => {
      console.log('🔧 [Maintenance] Config received:', newConfig);
      setConfig(newConfig);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      checkAdminStatus(user.uid);
    } else {
      setIsAdmin(false);
    }
  }, [user, checkAdminStatus]);

  const isMaintenanceActive = config?.isMaintenance === true && !isAdmin;
  const shouldBlockAccess = config?.isMaintenance === true && !isAdmin;

  console.log('🔧 [Maintenance]', 'isMaintenance:', config?.isMaintenance, '| isAdmin:', isAdmin, '| shouldBlock:', shouldBlockAccess, '| loading:', loading, '| user:', !!user);

  return {
    config,
    isAdmin,
    isMaintenanceActive,
    shouldBlockAccess,
    loading,
  };
};

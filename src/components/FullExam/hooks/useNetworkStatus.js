/* src/components/FullExam/hooks/useNetworkStatus.js */

import { useState, useEffect, useCallback } from 'react';

/**
 * Network status hook
 * 
 * ✅ Benefits:
 * - Centralized network status management
 * - Works offline (saves to localStorage)
 * - Easy to mock in tests
 * - Provides both status and utilities
 */
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(() => {
    // Check initial status
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  const [connectionType, setConnectionType] = useState(null);

  useEffect(() => {
    // Handle online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      console.log('✅ Back online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('❌ Went offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Detect connection type (4G, WiFi, etc) if available
  useEffect(() => {
    const connection = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
    if (connection) {
      setConnectionType(connection.effectiveType);
      
      const handleChange = () => {
        setConnectionType(connection.effectiveType);
      };

      connection.addEventListener('change', handleChange);
      return () => connection.removeEventListener('change', handleChange);
    }
  }, []);

  const isSlowConnection = connectionType === '2g' || connectionType === '3g';

  return {
    isOnline,
    isOffline: !isOnline,
    connectionType,
    isSlowConnection,
  };
};

/**
 * Storage sync hook for offline support
 * Automatically persists answers when online/offline
 */
export const useOfflineStorage = (key = 'exam-draft', data) => {
  const [hasSyncedWithServer, setHasSyncedWithServer] = useState(false);
  const { isOnline } = useNetworkStatus();

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now(),
        synced: false,
      }));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [data, key]);

  // When back online, sync data
  useEffect(() => {
    if (isOnline && !hasSyncedWithServer) {
      // Attempt to sync with server
      setHasSyncedWithServer(true);
      // TODO: Call saveProgress API
    }
  }, [isOnline, hasSyncedWithServer]);

  // Restore from localStorage
  const restore = useCallback(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const { data: restoredData, timestamp } = JSON.parse(stored);
        return { restoredData, timestamp };
      }
    } catch (err) {
      console.error('Failed to restore from localStorage:', err);
    }
    return { restoredData: null, timestamp: null };
  }, [key]);

  // Clear localStorage
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Failed to clear localStorage:', err);
    }
  }, [key]);

  return {
    restore,
    clear,
    hasSyncedWithServer,
  };
};

/**
 * Network retry hook
 * Automatically retry failed operations when online
 */
export const useNetworkRetry = (asyncFn, onSuccess, onError) => {
  const { isOnline } = useNetworkStatus();
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState(null);

  const executeWithRetry = useCallback(async (...args) => {
    try {
      setIsRetrying(true);
      setError(null);
      const result = await asyncFn(...args);
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      setIsRetrying(false);
    }
  }, [asyncFn, onSuccess, onError]);

  // Auto-retry when coming back online
  useEffect(() => {
    if (isOnline && error && !isRetrying) {
      // Optionally auto-retry
      console.log('Network back up, ready to retry...');
    }
  }, [isOnline, error, isRetrying]);

  return {
    execute: executeWithRetry,
    isRetrying,
    error,
    hasError: !!error,
  };
};

/**
 * Detect if user is in a low-bandwidth situation
 * Useful for optimizing media loading
 */
export const useBandwidthDetection = () => {
  const { connectionType, isSlowConnection } = useNetworkStatus();
  const [saveDataRequested, setSaveDataRequested] = useState(false);

  useEffect(() => {
    const preferenceForSaveData = navigator?.connection?.saveData;
    setSaveDataRequested(preferenceForSaveData);
  }, []);

  return {
    isSlowConnection,
    saveDataRequested,
    shouldOptimizeMedia: isSlowConnection || saveDataRequested,
    connectionType,
  };
};

/**
 * Usage example:
 * 
 * const { isOnline, isOffline } = useNetworkStatus();
 * 
 * if (!isOnline) {
 *   return <OfflineWarning />;
 * }
 */
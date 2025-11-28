// src/hooks/usePresence.js
import { useEffect, useState } from 'react';
import { ref, set, onValue, onDisconnect, serverTimestamp } from 'firebase/database';
import { rtdb } from '../config/firebase';
import { auth } from '../config/firebase';

/**
 * Hook để track online/offline status của user
 * Sử dụng Realtime Database với .onDisconnect() để tự động cleanup
 */
export const usePresence = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userStatusRef = ref(rtdb, `presence/${user.uid}`);
    const connectedRef = ref(rtdb, '.info/connected');

    // Theo dõi trạng thái kết nối của chính user này
    const unsubscribeConnection = onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        // Khi connected, set status = online
        set(userStatusRef, {
          online: true,
          lastSeen: serverTimestamp(),
          email: user.email,
          displayName: user.displayName || 'Anonymous',
        });

        // Tự động set offline khi disconnect
        onDisconnect(userStatusRef).set({
          online: false,
          lastSeen: serverTimestamp(),
          email: user.email,
          displayName: user.displayName || 'Anonymous',
        });

        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    });

    return () => {
      unsubscribeConnection();
      // Cleanup: set offline khi unmount component
      set(userStatusRef, {
        online: false,
        lastSeen: serverTimestamp(),
        email: user.email,
        displayName: user.displayName || 'Anonymous',
      });
    };
  }, []);

  return { onlineCount, isOnline };
};

export default usePresence;
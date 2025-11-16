// src/hooks/usePresence.js
import { useEffect } from 'react';
import { onDisconnect, ref, set, serverTimestamp } from 'firebase/database';
import { rtdb } from '../config/firebase.js';
import { useFirebaseAuth } from './contexts/FirebaseAuthContext';

export const usePresence = () => {
  const { user, isSignedIn } = useFirebaseAuth();

  useEffect(() => {
    if (!isSignedIn || !user?.uid) return;

    const userStatusRef = ref(rtdb, `presence/${user.uid}`);

    // Ghi trạng thái online
    const goOnline = () => {
      set(userStatusRef, {
        online: true,
        lastSeen: serverTimestamp(),
      });
    };

    // Khi disconnect (đóng tab, mất mạng) → tự động offline
    const goOffline = () => {
      set(userStatusRef, {
        online: false,
        lastSeen: serverTimestamp(),
      });
    };

    // Đánh dấu online
    goOnline();

    // Tự động offline khi disconnect
    onDisconnect(userStatusRef).set({
      online: false,
      lastSeen: serverTimestamp(),
    });

    // Cập nhật lastSeen mỗi 30s (giữ kết nối)
    const interval = setInterval(goOnline, 30_000);

    // Cleanup
    return () => {
      clearInterval(interval);
      goOffline();
    };
  }, [isSignedIn, user?.uid]);
};
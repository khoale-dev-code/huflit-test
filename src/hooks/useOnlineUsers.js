// src/hooks/useOnlineUsers.js
import { useEffect, useState } from 'react';
import { onDisconnect, ref, set, onValue, serverTimestamp } from 'firebase/database';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'; // ✅ THÊM DÒNG NÀY
import { rtdb, db, auth } from '../config/firebase'; // ✅ Đảm bảo export auth

export const useOnlineUsers = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let cleanup = () => {};

      if (user) {
        const userId = user.uid;
        const presenceRef = ref(rtdb, `presence/${userId}`);
        const visitRef = doc(db, 'userVisits', userId);
        const statsRef = doc(db, 'stats', 'appUsage');

        // Ghi nhận online
        await set(presenceRef, {
          online: true,
          lastSeen: serverTimestamp(),
          name: user.displayName || 'Ẩn danh',
        });

        // Tăng tổng người dùng nếu chưa từng truy cập
        const visitSnap = await getDoc(visitRef);
        if (!visitSnap.exists()) {
          const statsSnap = await getDoc(statsRef);
          const currentTotal = statsSnap.exists() ? statsSnap.data().totalUsers || 0 : 0;
          await setDoc(statsRef, { totalUsers: currentTotal + 1 }, { merge: true });
          await setDoc(visitRef, { visited: true });
        }

        // Xóa khi disconnect
        const disconnectRef = onDisconnect(presenceRef);
        await disconnectRef.remove();
        cleanup = () => disconnectRef.cancel();

        // Đếm online real-time
        const presenceListRef = ref(rtdb, 'presence');
        const unsubOnline = onValue(presenceListRef, (snap) => {
          setOnlineCount(snap.numChildren());
        });

        // Lắng nghe tổng người dùng
        const unsubTotal = onSnapshot(statsRef, (snap) => {
          setTotalUsers(snap.data()?.totalUsers || 0);
        });

        return () => {
          unsubOnline();
          unsubTotal();
          cleanup();
        };
      } else {
        setOnlineCount(0);
        setTotalUsers(0);
      }
    });

    return () => unsubscribe();
  }, []);

  return { onlineCount, totalUsers };
};
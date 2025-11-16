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
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      // ---- Cleanup cũ ----
      let cleanup = () => {};
      if (unsubAuth) unsubAuth();

      if (!user) {
        setOnlineCount(0);
        setTotalUsers(0);
        return;
      }

      const uid = user.uid;
      const presenceRef = ref(rtdb, `presence/${uid}`);
      const visitRef = doc(db, 'userVisits', uid);
      const statsRef = doc(db, 'stats', 'appUsage');

      // ---- Ghi presence ----
      await set(presenceRef, {
        online: true,
        lastSeen: serverTimestamp(),
        name: user.displayName || 'Ẩn danh',
      });

      // ---- Tăng totalUsers nếu chưa từng ----
      const visitSnap = await getDoc(visitRef);
      if (!visitSnap.exists()) {
        const statsSnap = await getDoc(statsRef);
        const cur = statsSnap.exists() ? statsSnap.data().totalUsers || 0 : 0;
        await setDoc(statsRef, { totalUsers: cur + 1 }, { merge: true });
        await setDoc(visitRef, { visited: true });
      }

      // ---- Xóa khi disconnect ----
      const disc = onDisconnect(presenceRef);
      await disc.remove();
      cleanup = () => disc.cancel();

      // ---- Lắng nghe số online ----
      const onlineUnsub = onValue(ref(rtdb, 'presence'), (snap) => {
        setOnlineCount(snap.numChildren());
      });

      // ---- Lắng nghe totalUsers ----
      const totalUnsub = onSnapshot(statsRef, (snap) => {
        setTotalUsers(snap.data()?.totalUsers || 0);
      });

      // ---- Cleanup khi user thay đổi ----
      return () => {
        onlineUnsub();
        totalUnsub();
        cleanup();
      };
    });

    return () => unsubAuth && unsubAuth();
  }, []);

  return { onlineCount, totalUsers };
};
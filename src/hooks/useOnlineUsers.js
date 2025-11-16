// src/hooks/useOnlineUsers.js
import { useEffect, useState } from 'react';
import {
  onDisconnect,
  ref,
  set,
  onValue,
  serverTimestamp,
} from 'firebase/database';
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { rtdb, db, auth } from '../config/firebase';

export const useOnlineUsers = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    console.log('🚀 useOnlineUsers hook started'); // DEBUG

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      console.log('🔍 Auth state changed:', user ? user.email : 'No user'); // DEBUG

      if (!user) {
        console.log('❌ No user, clearing online status');
        setOnlineCount(0);
        setTotalUsers(0);
        return;
      }

      try {
        const uid = user.uid;
        console.log('✅ User authenticated:', uid); // DEBUG

        const presenceRef = ref(rtdb, `presence/${uid}`);
        const visitRef = doc(db, 'userVisits', uid);
        const statsRef = doc(db, 'stats', 'appUsage');

        // Ghi presence vào RTDB
        console.log('📝 Writing presence to RTDB...');
        await set(presenceRef, {
          online: true,
          lastSeen: serverTimestamp(),
          name: user.displayName || 'Ẩn danh',
          uid: uid,
        });
        console.log('✅ Presence written to RTDB'); // DEBUG

        // Kiểm tra lần đầu truy cập
        console.log('📊 Checking first visit...');
        const visitSnap = await getDoc(visitRef);
        if (!visitSnap.exists()) {
          console.log('🎉 First visit detected, incrementing totalUsers');
          
          // Tăng totalUsers
          const statsSnap = await getDoc(statsRef);
          const currentTotal = statsSnap.exists() ? statsSnap.data().totalUsers || 0 : 0;
          const newTotal = currentTotal + 1;
          
          console.log('📈 Updating totalUsers from', currentTotal, 'to', newTotal);
          await setDoc(statsRef, { 
            totalUsers: newTotal,
            lastUpdated: serverTimestamp()
          }, { merge: true });
          
          // Đánh dấu đã visit
          await setDoc(visitRef, { visited: true });
          console.log('✅ totalUsers updated to', newTotal); // DEBUG
        }

        // Xóa presence khi disconnect
        const disconnectRef = onDisconnect(presenceRef);
        await disconnectRef.remove();
        console.log('🔌 Disconnect handler set'); // DEBUG

        // Lắng nghe số người online
        const presenceListRef = ref(rtdb, 'presence');
        const unsubOnline = onValue(presenceListRef, (snap) => {
          const count = snap.numChildren();
          console.log('📊 Online count updated:', count); // DEBUG
          setOnlineCount(count);
        });

        // Lắng nghe totalUsers
        const unsubTotal = onSnapshot(statsRef, (snap) => {
          const total = snap.data()?.totalUsers || 0;
          console.log('📈 Total users updated:', total); // DEBUG
          setTotalUsers(total);
        });

        return () => {
          console.log('🧹 Cleaning up listeners');
          unsubOnline();
          unsubTotal();
          disconnectRef.cancel();
        };

      } catch (error) {
        console.error('❌ Error in useOnlineUsers:', error); // DEBUG
      }
    });

    return () => {
      console.log('🧹 useOnlineUsers cleanup');
      unsubAuth();
    };
  }, []);

  console.log('📊 useOnlineUsers returning:', { onlineCount, totalUsers }); // DEBUG
  return { onlineCount, totalUsers };
};
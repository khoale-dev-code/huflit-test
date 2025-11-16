// src/hooks/useOnlineUsers.js
import { useEffect, useState, useRef } from 'react';
import { onValue, ref, query, limitToLast } from 'firebase/database';
import { onSnapshot, doc } from 'firebase/firestore';
import { rtdb, db } from '../config/firebase.js';

/**
 * Hook useOnlineUsers – Theo dõi số lượng người dùng online (RTDB) và tổng người dùng (Firestore)
 * 
 * - onlineCount: Số người dùng hiện đang online (dựa trên /presence, online: true)
 * - totalUsers: Tổng số người dùng duy nhất (lấy từ Firestore /stats/appUsage)
 * 
 * Tối ưu:
 * - Chỉ lắng nghe thay đổi cần thiết
 * - Tránh re-render không cần thiết bằng useRef
 * - Xử lý lỗi và trạng thái loading
 * - Hỗ trợ cả production và emulator
 */
export const useOnlineUsers = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useRef để lưu unsubscribe functions, tránh memory leak
  const unsubscribers = useRef([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // === 1. Lắng nghe số người online từ Realtime Database (/presence) ===
    try {
      const presenceRef = ref(rtdb, 'presence');
      // Dùng query để tối ưu (nếu dữ liệu lớn, chỉ lấy 1000 bản ghi gần nhất)
      const presenceQuery = query(presenceRef, limitToLast(1000));

      const unsubscribePresence = onValue(
        presenceQuery,
        (snapshot) => {
          if (!isMounted) return;

          const data = snapshot.val();
          if (data && typeof data === 'object') {
            const count = Object.values(data).filter(
              (user) => user?.online === true && 
                        user?.lastSeen && 
                        // Optional: chỉ tính người online trong 2 phút gần nhất
                        Date.now() - new Date(user.lastSeen).getTime() < 2 * 60 * 1000
            ).length;
            setOnlineCount(count);
          } else {
            setOnlineCount(0);
          }
          setLoading(false);
        },
        (err) => {
          if (!isMounted) return;
          console.error('Lỗi lắng nghe presence:', err);
          setError(err.message);
          setOnlineCount(0);
          setLoading(false);
        }
      );

      unsubscribers.current.push(unsubscribePresence);
    } catch (err) {
      console.error('Khởi tạo presence listener thất bại:', err);
      setError(err.message);
    }

    // === 2. Lắng nghe tổng người dùng từ Firestore (/stats/appUsage) ===
    try {
      const statsDocRef = doc(db, 'stats', 'appUsage');

      const unsubscribeStats = onSnapshot(
        statsDocRef,
        (docSnap) => {
          if (!isMounted) return;

          if (docSnap.exists()) {
            const data = docSnap.data();
            const total = data?.totalUsers ?? 0;
            setTotalUsers(Number(total));
          } else {
            setTotalUsers(0);
          }
          setLoading(false);
        },
        (err) => {
          if (!isMounted) return;
          console.error('Lỗi lắng nghe appUsage:', err);
          setError(err.message);
          setTotalUsers(0);
          setLoading(false);
        }
      );

      unsubscribers.current.push(unsubscribeStats);
    } catch (err) {
      console.error('Khởi tạo stats listener thất bại:', err);
      setError(err.message);
    }

    // === Cleanup khi component unmount ===
    return () => {
      isMounted = false;
      unsubscribers.current.forEach(unsub => {
        try { unsub?.(); } catch (e) {}
      });
      unsubscribers.current = [];
    };
  }, []);

  return {
    onlineCount,
    totalUsers,
    loading,
    error,
    // Helper: reload thủ công (nếu cần)
    refetch: () => {
      // Kích hoạt lại bằng cách clear cache (không cần thiết với onValue/onSnapshot)
    }
  };
};
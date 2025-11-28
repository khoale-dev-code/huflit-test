// src/hooks/useOnlineUsers.js
import { useEffect, useState } from 'react';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { rtdb } from '../config/firebase';

/**
 * Hook để đếm và lấy danh sách users đang online
 */
export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const presenceRef = ref(rtdb, 'presence');

    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const data = snapshot.val();
      
      if (!data) {
        setOnlineUsers([]);
        setOnlineCount(0);
        setLoading(false);
        return;
      }

      // Lọc users đang online
      const online = Object.entries(data)
        .filter(([_, userData]) => userData.online === true)
        .map(([uid, userData]) => ({
          uid,
          ...userData,
        }));

      setOnlineUsers(online);
      setOnlineCount(online.length);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { onlineUsers, onlineCount, loading };
};

export default useOnlineUsers;
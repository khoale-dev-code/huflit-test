// src/components/OnlineIndicator.jsx
import React from 'react';
import { usePresence } from '../hooks/usePresence';
import { useOnlineUsers } from '../hooks/useOnlineUsers';

const OnlineIndicator = () => {
  const { isOnline } = usePresence(); // Track chính user hiện tại
  const { onlineCount, onlineUsers, loading } = useOnlineUsers(); // Đếm tất cả users

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="online-indicator">
      <div className="status">
        <span className={`dot ${isOnline ? 'online' : 'offline'}`}></span>
        <span>You are {isOnline ? 'online' : 'offline'}</span>
      </div>
      
      <div className="count">
        🟢 {onlineCount} users online
      </div>

      {/* Hiển thị danh sách (optional) */}
      <ul>
        {onlineUsers.map(user => (
          <li key={user.uid}>
            {user.displayName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineIndicator;
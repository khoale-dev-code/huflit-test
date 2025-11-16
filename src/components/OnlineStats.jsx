// src/components/OnlineStats.jsx
import React, { memo } from 'react';
import { Users, Globe } from 'lucide-react';
import { useOnlineUsers } from '../hooks/useOnlineUsers.js'; // ✅ .js

const OnlineStats = memo(() => {
  const { onlineCount, totalUsers } = useOnlineUsers();

  if (onlineCount === 0 && totalUsers === 0) return null;

  return (
    <div className="hidden lg:flex items-center gap-4 text-xs text-gray-600 font-medium">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        <Users className="w-4 h-4 text-green-600" />
        <span>{onlineCount} online</span>
      </div>
      <div className="flex items-center gap-1 text-gray-500">
        <Globe className="w-4 h-4" />
        <span>{totalUsers.toLocaleString()}</span>
      </div>
    </div>
  );
});

OnlineStats.displayName = 'OnlineStats';
export default OnlineStats;
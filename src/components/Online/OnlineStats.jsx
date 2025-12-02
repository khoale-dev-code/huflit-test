// src/components/OnlineStats.jsx
import React, { memo, useMemo } from 'react';
import { Users, Globe, AlertCircle } from 'lucide-react';
import { useOnlineUsers } from '../../hooks/useOnlineUsers.js'; // ← .js

/**
 * OnlineStats Component – Hiển thị thống kê người dùng online & tổng người dùng
 * 
 * Tính năng:
 * - Hiển thị loading skeleton khi đang tải
 * - Hiển thị thông báo lỗi nếu có
 * - Ẩn hoàn toàn nếu không có dữ liệu (tránh flash)
 * - Format số với dấu phẩy (toLocaleString)
 * - Tối ưu re-render với useMemo
 * - Responsive: chỉ hiển thị trên lg trở lên
 */
const OnlineStats = memo(() => {
  const { onlineCount, totalUsers, loading, error } = useOnlineUsers();

  // === 1. Ẩn hoàn toàn nếu không có dữ liệu & không loading/error ===
  const shouldRender = useMemo(() => {
    return loading || error || onlineCount > 0 || totalUsers > 0;
  }, [loading, error, onlineCount, totalUsers]);

  if (!shouldRender) return null;

  // === 2. Loading State: Skeleton UI ===
  if (loading) {
    return (
      <div className="hidden lg:flex items-center gap-4 text-xs text-gray-400 font-medium animate-pulse">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <Users className="w-4 h-4 text-gray-300" />
          <span className="bg-gray-300 text-transparent rounded">000 online</span>
        </div>
        <div className="flex items-center gap-1 text-gray-300">
          <Globe className="w-4 h-4" />
          <span className="bg-gray-300 text-transparent rounded">0,000</span>
        </div>
      </div>
    );
  }

  // === 3. Error State: Hiển thị icon cảnh báo + tooltip (nếu cần) ===
  if (error) {
    return (
      <div
        className="hidden lg:flex items-center gap-1.5 text-xs text-red-500 font-medium"
        title="Không thể tải thống kê người dùng"
      >
        <AlertCircle className="w-4 h-4" />
        <span>Lỗi kết nối</span>
      </div>
    );
  }

  // === 4. Normal State: Hiển thị dữ liệu ===
  return (
    <div className="hidden lg:flex items-center gap-4 text-xs text-gray-600 font-medium">
      {/* Online Users */}
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        <Users className="w-4 h-4 text-green-600" />
        <span>{onlineCount} online</span>
      </div>

      {/* Total Users */}
      <div className="flex items-center gap-1 text-gray-500">
        <Globe className="w-4 h-4" />
        <span>{totalUsers.toLocaleString('vi-VN')}</span>
      </div>
    </div>
  );
});

OnlineStats.displayName = 'OnlineStats';
export default OnlineStats;
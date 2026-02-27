import React, { useMemo } from 'react';
import Dashboard from '../Dashboard.jsx';
import { useUserProgress } from '../../hooks/useUserProgress.js';

export default function UserProfile() {
  // Lấy trực tiếp 'analytics' thay vì 'calculateAnalytics'
  const { currentUser, progress, analytics, loading, isLoaded } = useUserProgress();

  // Xóa bỏ dòng const analytics = useMemo(...) cũ ở đây

  const chartData = useMemo(() => {
    if (!progress) return [];
    return progress.slice(0, 7).reverse().map(p => ({
      name: p.completedAt?.toLocaleDateString?.('vi-VN', { day: '2-digit' }) || '',
      score: Number(p.score) || 0,
      type: p.exam || 'Test'
    }));
  }, [progress]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="w-10 h-10 border-4 border-[#1A73E8]/20 border-t-[#1A73E8] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Dashboard
      currentUser={currentUser}
      analytics={analytics} // analytics giờ là object sạch, truyền thẳng vào Dashboard
      chartData={chartData}
    />
  );
}
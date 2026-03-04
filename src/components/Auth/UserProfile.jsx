import React from 'react';
import DetailedDashboard from '../Dashboard';

// UserProfile chỉ render DetailedDashboard.
// Toàn bộ logic (progress, analytics, chartData) nằm trong useUserProgress
// bên trong DetailedDashboard — không tính lại ở đây để tránh state lệch.
export default function UserProfile() {
  return <DetailedDashboard />;
}
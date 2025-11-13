import React from 'react';

export const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-orange-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-orange-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-900 font-bold text-lg">Đang tải...</p>
      <p className="text-gray-600 text-sm mt-1">Vui lòng chờ trong giây lát</p>
    </div>
  </div>
);
export default LoadingSpinner;

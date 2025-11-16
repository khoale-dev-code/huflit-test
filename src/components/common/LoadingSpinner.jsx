import React from 'react';

export const LoadingSpinner = () => (
  // Nền màu xanh dương đậm hoặc vàng đậm
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm border border-blue-600 dark:border-blue-400">
      
      {/* Spinner tối giản, chỉ một màu xanh dương đậm */}
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-600 dark:border-blue-400 animate-[spin_0.8s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Tiêu đề chính */}
      <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">
        Đang tải...
      </p>
      
      {/* Câu chờ đợi hài hước mới */}
      <blockquote className="text-gray-700 dark:text-gray-300 italic text-md mt-4 p-3 border-l-4 border-blue-500 dark:border-blue-300 bg-gray-50 dark:bg-gray-700/50 rounded-r-lg">
        "Thế giới được xây dựng trên sự kiên nhẫn. Và một chút kết nối internet siêu tốc."
      </blockquote>

      {/* Thông điệp phụ */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Cảm ơn sự kiên nhẫn của bạn.
      </p>
    </div>
  </div>
);

export default LoadingSpinner;
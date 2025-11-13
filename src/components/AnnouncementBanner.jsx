import React, { useState, useEffect } from 'react';
import { X, Bell, Zap, Maximize2 } from 'lucide-react';

/**
 * AnnouncementBanner - Thông báo phiên bản mới cho toàn bộ user
 * Màu chủ đạo: Be/Kem (#FAF0E6), Cam (#FF8C00), Vàng (#FFD700), Đen (#1E1E1E)
 */
export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Lấy trạng thái đóng banner từ localStorage
  useEffect(() => {
    const isBannerClosed = localStorage.getItem('announcementBannerClosed');
    if (isBannerClosed) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('announcementBannerClosed', 'true');
  };

  const handleClearCache = () => {
    localStorage.removeItem('announcementBannerClosed');
    // Tùy chọn: Thêm thông báo nhẹ trước khi reload nếu cần
    window.location.reload();
  };

  if (!isVisible) return null;

  // Màu sắc chính (Tailwind utility classes)
  const colorPrimary = 'bg-orange-500 hover:bg-orange-600'; // Cam
  const colorAccent = 'text-yellow-600'; // Vàng đậm
  const colorTextDark = 'text-gray-900'; // Đen/Gần đen
  const colorBackground = 'bg-amber-50'; // Be/Kem nhạt

  // --- Start of JSX Structure ---
  return (
    // Vị trí cố định (fixed) ở trên cùng, z-index cao
    <div className="fixed top-0 left-0 right-0 z-[100] px-4 py-2 sm:px-6 md:px-8 animate-slideDown">
      <div className="max-w-4xl mx-auto">
        {/* Compact Mode */}
        {!isExpanded && (
          <div className={`relative overflow-hidden rounded-xl shadow-xl ${colorBackground} border-2 border-orange-200`}>
            
            <div className="flex items-center justify-between gap-3 sm:gap-4 p-3">
              
              {/* Icon & Title */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 bg-orange-500 rounded-lg flex-shrink-0">
                  <Bell className="w-5 h-5 text-white animate-wiggle" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h2 className={`text-sm sm:text-base font-bold ${colorTextDark} truncate`}>
                    🎉 Phiên Bản Mới v2.0 Đã Ra Mắt!
                  </h2>
                  <p className="text-xs text-gray-600 truncate mt-0.5 hidden sm:block">
                    Tối ưu tốc độ, cập nhật Reading Part 7 & 8
                  </p>
                </div>
              </div>

              {/* Action Buttons (Compact) */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsExpanded(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 ${colorPrimary} text-white text-xs font-semibold rounded-md transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]`}
                  aria-label="Xem chi tiết thông báo"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Chi tiết</span>
                </button>

                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full text-gray-700 hover:bg-gray-200 transition-all duration-200"
                  aria-label="Đóng thông báo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Expanded Mode */}
        {isExpanded && (
          <div className={`relative overflow-hidden rounded-xl shadow-2xl ${colorBackground} border-4 border-orange-400 p-6 sm:p-8 animate-fadeInDown`}>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-all z-10"
              aria-label="Đóng thông báo"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6 border-b pb-4 border-orange-100">
              <div className="p-3 bg-orange-500 rounded-xl flex-shrink-0 shadow-lg">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold ${colorTextDark} mb-1`}>
                  🎉 Chào Mừng Phiên Bản Mới v2.0!
                </h1>
                <p className="text-sm sm:text-base text-gray-700">
                  HUFLIT Test Practice - Nâng cấp toàn diện cho trải nghiệm luyện thi tốt nhất.
                </p>
              </div>
            </div>

            {/* New Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Feature Item Component (Tái sử dụng cho tính nhất quán) */}
              <FeatureItem 
                icon={<Zap className="w-5 h-5 text-orange-500" />}
                title="Giao diện cải thiện"
                description="UI/UX hoàn toàn mới, tối giản và mượt mà hơn trên mọi thiết bị."
                bgColor="bg-white"
              />
              <FeatureItem 
                icon={<Maximize2 className="w-5 h-5 text-orange-500" />}
                title="Tối ưu Reading Part"
                description="CSS độc lập cho Email/Advertisement và Text Message Chain, dễ đọc hơn."
                bgColor="bg-white"
              />
              <FeatureItem 
                icon={<Bell className="w-5 h-5 text-orange-500" />}
                title="Lưu tiến độ tự động"
                description="Tiến độ được lưu tự động khi đăng nhập (Clerk/Firebase)."
                bgColor="bg-white"
              />
              <FeatureItem 
                icon={<Zap className="w-5 h-5 text-orange-500" />}
                title="Hiệu suất tối ưu"
                description="Tải nhanh hơn, hoạt động trơn tru, tiết kiệm tài nguyên."
                bgColor="bg-white"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleClose}
                className={`flex-1 py-3 px-4 ${colorPrimary} text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95`}
              >
                🚀 Bắt đầu luyện tập ngay
              </button>
              <button
                onClick={handleClearCache}
                className={`py-3 px-4 bg-gray-200 border-2 border-gray-300 text-gray-800 font-bold rounded-lg transition-all hover:bg-gray-300 active:scale-95`}
              >
                🔄 Làm mới (Nếu lỗi hiển thị)
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-6 pt-4 border-t border-orange-200">
              <p className="text-xs text-center text-gray-600">
                <span className={`${colorAccent} font-bold`}>🎯 Lời Khuyên:</span> Đăng nhập để đảm bảo tiến độ của bạn được lưu trữ!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Component phụ cho các tính năng mới
const FeatureItem = ({ icon, title, description, bgColor }) => (
  <div className={`p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ${bgColor}`}>
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-md bg-orange-100 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{description}</p>
      </div>
    </div>
  </div>
);
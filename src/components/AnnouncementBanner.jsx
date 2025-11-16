import React, { useState, useEffect } from 'react';
import { X, Bell, Zap, BookOpen, Flame, Heart } from 'lucide-react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    try {
      const isBannerClosed = window.storage?.get?.('announcementBannerClosed');
      if (isBannerClosed) {
        setIsVisible(false);
      }
    } catch (e) {
      // Fallback nếu storage không available
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    try {
      window.storage?.set?.('announcementBannerClosed', 'true');
    } catch (e) {
      // Fallback
    }
  };

  const handleClearCache = () => {
    try {
      window.storage?.delete?.('announcementBannerClosed');
    } catch (e) {
      // Fallback
    }
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 sm:px-6 md:px-8">
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-banner {
          animation: slideDown 0.4s ease-out;
        }
        .animate-expanded {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Compact Mode */}
        {!isExpanded && (
          <div className="animate-banner">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-2 border-orange-200 shadow-xl backdrop-blur-sm">
              {/* Decorative gradient bars */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-amber-500"></div>

              <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
                {/* Left Section */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex-shrink-0 shadow-lg">
                    <Bell className="w-5 h-5 text-white animate-bounce" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                      ✨ Phiên Bản Mới v3.0 - Trải Nghiệm Tuyệt Vời Hơn!
                    </h2>
                    <p className="text-xs text-gray-600 truncate mt-1 hidden sm:block">
                      Giao diện mới, tốc độ nhanh hơn, bắt đầu luyện tập thôi! 🚀
                    </p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    Chi tiết
                  </button>

                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expanded Mode */}
        {isExpanded && (
          <div className="animate-expanded">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-3 border-orange-300 shadow-2xl p-6 sm:p-8">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-amber-500"></div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2.5 rounded-full text-gray-600 hover:bg-gray-200 transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header Section */}
              <div className="mb-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex-shrink-0 shadow-xl">
                    <Flame className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 leading-tight">
                      🎉 Chào Mừng Phiên Bản v3.0!
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 font-medium">
                      HUFLIT Test Practice - Được cải thiện để giúp bạn ôn tập hiệu quả hơn
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 relative z-10">
                <FeatureItem 
                  icon={<Zap className="w-5 h-5" />}
                  title="⚡ Giao diện mới"
                  description="UI/UX hoàn toàn được thiết kế lại - mượt mà, hiện đại, dễ sử dụng."
                />
                <FeatureItem 
                  icon={<BookOpen className="w-5 h-5" />}
                  title="📖 Reading Parts cập nhật"
                  description="Phần 7 & 8 có CSS độc lập, hiển thị rõ ràng, dễ theo dõi."
                />
                <FeatureItem 
                  icon={<Flame className="w-5 h-5" />}
                  title="⚡ Tối ưu hiệu suất"
                  description="Tải nhanh hơn, hoạt động trơn tru, tiết kiệm pin & data."
                />
                <FeatureItem 
                  icon={<Heart className="w-5 h-5" />}
                  title="💾 Lưu tiến độ tự động"
                  description="Tiến độ được bảo lưu khi đăng nhập, không lo mất dữ liệu."
                />
              </div>

              {/* Motivational Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-orange-100 relative z-10">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">💪</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      Ôn bài thế nào là tốt nhất?
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>✅ <span className="font-semibold">Hàng ngày:</span> Ôn 30-45 phút mỗi ngày hiệu quả hơn 3 giờ một lần</li>
                      <li>✅ <span className="font-semibold">Làm bài đủ phần:</span> Tập hết Reading, Listening, Speaking & Writing</li>
                      <li>✅ <span className="font-semibold">Đăng nhập:</span> Để hệ thống lưu lại tiến độ của bạn</li>
                      <li>✅ <span className="font-semibold">Ôn lại sai:</span> Các câu sai là cơ hội học tập tốt nhất!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 relative z-10">
                <button
                  onClick={handleClose}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95 hover:scale-105"
                >
                  🚀 Bắt Đầu Luyện Tập
                </button>
                <button
                  onClick={handleClearCache}
                  className="py-4 px-6 bg-white border-2 border-gray-300 text-gray-800 font-bold rounded-xl transition-all hover:bg-gray-50 active:scale-95"
                >
                  🔄 Làm Mới (Nếu Lỗi)
                </button>
              </div>

              {/* Footer Messages */}
              <div className="space-y-3 pt-6 border-t-2 border-orange-200 relative z-10">
                <p className="text-center text-gray-700 font-bold text-base">
                  ✨ <span className="text-orange-600">Chúc các bạn ôn bài tốt!</span> ✨
                </p>
                <p className="text-center text-gray-600 text-sm">
                  💡 <span className="font-semibold">Lời khuyên:</span> Đăng nhập để hệ thống ghi nhớ tiến độ của bạn nhé! Cố lên! 💪
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const FeatureItem = ({ icon, title, description }) => (
  <div className="group p-5 rounded-xl bg-white border-2 border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg hover:scale-105">
    <div className="flex items-start gap-3">
      <div className="p-2.5 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);
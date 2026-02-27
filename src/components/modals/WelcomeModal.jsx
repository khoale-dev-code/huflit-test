import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, ArrowRight } from 'lucide-react';

/**
 * WelcomeModal Component - Fully Responsive
 * 
 * Optimized for:
 * - Mobile (320px+)
 * - Tablet (768px+)
 * - Desktop (1024px+)
 * - Extra Large (1280px+)
 * 
 * Features:
 * - Auto-adjusts size based on viewport
 * - Touch-friendly on mobile
 * - Portrait & Landscape support
 * - Safe area consideration
 */

const WelcomeContent = memo(() => (
  <div className="space-y-4 xs:space-y-5 sm:space-y-6">
    {/* Main Heading */}
    <div className="space-y-1.5 xs:space-y-2">
      <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-tight">
        Chào mừng bạn! 👋
      </h2>
      <p className="text-xs xs:text-sm sm:text-base text-slate-500 font-medium">
        Một hành trình học tập mới đang chờ đón
      </p>
    </div>

    {/* Main Message */}
    <div className="space-y-3 xs:space-y-4">
      {/* Section 1: Mission */}
      <div className="flex gap-2.5 xs:gap-3">
        <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 xs:mt-1">
          <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 xs:w-3.5 xs:h-3.5 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs xs:text-sm sm:text-base font-semibold text-slate-900 mb-0.5 xs:mb-1">
            Một Không Gian Học Tập Mở
          </p>
          <p className="text-xs xs:text-sm text-slate-600 leading-relaxed">
            Chúng tôi tạo ra nền tảng này với niềm tin rằng{' '}
            <span className="font-semibold text-slate-900">giáo dục không có ranh giới</span> — nơi mọi
            người, bất kể hoàn cảnh, đều có cơ hội rèn luyện kỹ năng và nâng cao kiến thức một cách{' '}
            <span className="font-semibold text-blue-600">hoàn toàn miễn phí</span>.
          </p>
        </div>
      </div>

      {/* Section 2: Community */}
      <div className="flex gap-2.5 xs:gap-3">
        <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 xs:mt-1">
          <Heart className="w-2.5 h-2.5 xs:w-3 xs:h-3 xs:w-3.5 xs:h-3.5 text-emerald-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs xs:text-sm sm:text-base font-semibold text-slate-900 mb-0.5 xs:mb-1">
            Xây Dựng Bằng Tình Thương Cộng Đồng
          </p>
          <p className="text-xs xs:text-sm text-slate-600 leading-relaxed">
            Mỗi bài học, mỗi tính năng đều được tạo ra với mục đích{' '}
            <span className="font-semibold text-slate-900">giúp bạn thành công</span>. Tất cả những gì
            bạn thấy ở đây là sản phẩm của sự đam mê và cam kết xây dựng một cộng đồng học tập tích
            cực.
          </p>
        </div>
      </div>

      {/* Section 3: Support */}
      <div className="flex gap-2.5 xs:gap-3">
        <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5 xs:mt-1">
          <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 xs:w-3.5 xs:h-3.5 text-purple-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs xs:text-sm sm:text-base font-semibold text-slate-900 mb-0.5 xs:mb-1">
            Hỗ Trợ Dự Án Phát Triển
          </p>
          <p className="text-xs xs:text-sm text-slate-600 leading-relaxed">
            Nếu bạn cảm thấy nền tảng này hữu ích, đóng góp tùy tâm của bạn không chỉ{' '}
            <span className="font-semibold text-slate-900">hỗ trợ tài chính</span> mà còn là{' '}
            <span className="font-semibold text-purple-600">nguồn động lực vô giá</span> để chúng tôi
            tiếp tục cải thiện và mang đến trải nghiệm tốt hơn mỗi ngày.
          </p>
        </div>
      </div>
    </div>

    {/* QR Code Section */}
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-5 border border-slate-200">
      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5 xs:mb-3">
        Ủng hộ qua QR Code
      </p>
      <div className="bg-white rounded p-2.5 xs:p-3 mx-auto w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 flex items-center justify-center border-2 border-slate-300">
        <img 
          src="/src/assets/qr-code.png" 
          alt="QR Code" 
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            const parent = e.target.parentElement;
            parent.innerHTML = '<p class="text-xs text-slate-400 text-center font-medium">QR Code</p>';
          }}
        />
      </div>
      <p className="text-xs text-slate-500 text-center mt-2 xs:mt-2.5 font-medium">
        Hoặc quét mã QR bên trên
      </p>
    </div>

    {/* Closing Message */}
    <div className="bg-blue-50 rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-5 border border-blue-100">
      <p className="text-xs xs:text-sm text-slate-700 leading-relaxed">
        <span className="block font-semibold text-blue-900 mb-1 xs:mb-1.5">💙 Xin chân thành cảm ơn!</span>
        Sự đồng hành của bạn là niềm tự hào của chúng tôi. Chúc bạn có những giờ học thật{' '}
        <span className="font-semibold">hiệu quả, truyền cảm hứng</span> và đạt được mục tiêu của mình.
      </p>
    </div>
  </div>
));

WelcomeContent.displayName = 'WelcomeContent';

/**
 * Main WelcomeModal Component
 */
const WelcomeModal = memo(({ isOpen = false, onClose }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollRef, setScrollRef] = React.useState(null);
  const [windowHeight, setWindowHeight] = useState(0);

  // Track window height for better responsive calculations
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = useCallback((e) => {
    const element = e.currentTarget;
    // Check if scrolled to bottom or close to it
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    setHasScrolled(isAtBottom);
  }, []);

  // Determine modal size based on content
  const getModalDimensions = () => {
    // Mobile: Full height with padding
    if (windowHeight < 600) {
      return 'max-h-[95vh]';
    }
    // Tablet & Desktop: Fixed height
    return 'max-h-[85vh] sm:max-h-[90vh]';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-lg lg:max-w-2xl ${getModalDimensions()} flex flex-col overflow-hidden`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 xs:top-4 sm:top-5 right-3 xs:right-4 sm:right-5 p-1.5 xs:p-2 hover:bg-slate-100 rounded-lg transition-colors z-10 flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 xs:w-5 xs:h-5 text-slate-600" />
            </button>

            {/* Scrollable Content */}
            <div
              ref={setScrollRef}
              onScroll={handleScroll}
              className="overflow-y-auto flex-1 p-4 xs:p-5 sm:p-6 lg:p-8 pt-10 xs:pt-12 sm:pt-14"
              style={{
                scrollBehavior: 'smooth',
              }}
            >
              <WelcomeContent />
            </div>

            {/* Footer Actions */}
            <div className="border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/30 p-4 xs:p-5 sm:p-6 lg:p-8 flex-shrink-0">
              <div className="flex flex-col gap-2.5 xs:gap-3">
                {/* Primary Action */}
                <motion.button
                  onClick={onClose}
                  disabled={!hasScrolled}
                  whileHover={hasScrolled ? { scale: 1.02 } : {}}
                  whileTap={hasScrolled ? { scale: 0.98 } : {}}
                  className={`w-full flex items-center justify-center gap-2 px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3.5 rounded-lg xs:rounded-xl font-bold text-xs xs:text-sm sm:text-base transition-all min-h-[44px] ${
                    hasScrolled
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Bắt Đầu Học Ngay
                  <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                </motion.button>

                {/* Hint Text */}
                {!hasScrolled && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-slate-500 text-center font-medium"
                  >
                    ↓ Vui lòng cuộn xuống để tiếp tục
                  </motion.p>
                )}

                {/* Skip Link */}
                <button
                  onClick={onClose}
                  className="text-xs xs:text-sm text-slate-500 hover:text-slate-700 font-medium underline text-center transition-colors min-h-[40px] flex items-center justify-center"
                >
                  Bỏ qua bước này
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

WelcomeModal.displayName = 'WelcomeModal';

export default WelcomeModal;
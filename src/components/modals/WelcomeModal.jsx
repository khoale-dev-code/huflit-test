import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, ArrowRight, Info, ShieldCheck, Globe, Check } from 'lucide-react';

/**
 * GOOGLE MATERIAL 3 DESIGN CONSTANTS
 */
const MODAL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300, staggerChildren: 0.1 }
  },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

// --- Sub-components ---

const FeatureItem = ({ icon: Icon, title, description, bgColor, iconColor }) => (
  <motion.div 
    variants={ITEM_VARIANTS}
    className="group flex gap-4 p-4 rounded-[28px] transition-all duration-300 hover:bg-slate-50 active:scale-[0.98]"
  >
    <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-6 ${bgColor} ${iconColor}`}>
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <div className="flex flex-col justify-center">
      <h3 className="text-[16px] font-semibold text-slate-900 leading-tight">{title}</h3>
      <p className="text-[14px] text-slate-500 mt-1 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const WelcomeModal = ({ isOpen = false, onClose }) => {
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Ngưỡng 20px để kích hoạt button
    if (scrollHeight - scrollTop <= clientHeight + 20) {
      setIsScrolledToEnd(true);
    }
  }, []);

  // Ngăn chặn scroll body khi modal mở
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6">
          {/* Backdrop với độ mờ cao cấp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            variants={MODAL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white sm:rounded-[32px] rounded-t-[32px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] w-full max-w-[560px] max-h-[95vh] sm:max-h-[85vh] flex flex-col overflow-hidden border border-white/20"
          >
            {/* Header: Cố định để dễ dàng đóng */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">H</div>
                <span className="font-medium text-slate-700">Hub Study</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 active:bg-slate-200 rounded-full transition-colors text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              onScroll={handleScroll}
              className="overflow-y-auto flex-1 px-6 sm:px-10 py-8 scroll-smooth custom-scrollbar"
            >
              {/* Hero Section */}
              <div className="text-center mb-10">
                <motion.div 
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ repeat: Infinity, duration: 4 }}
                   className="inline-flex p-4 bg-blue-50 rounded-[24px] mb-6 text-blue-600"
                >
                  <Sparkles size={32} fill="currentColor" fillOpacity={0.2} />
                </motion.div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  Nâng tầm tri thức <br/><span className="text-blue-600">cùng Hub Study</span>
                </h2>
                <p className="mt-4 text-slate-500 text-[15px] leading-relaxed max-w-[320px] mx-auto">
                  Khám phá kho tàng tài liệu học tập được cá nhân hóa hoàn toàn miễn phí.
                </p>
              </div>

              {/* Features - M3 Grid */}
              <div className="space-y-2 mb-10">
                <FeatureItem 
                  icon={Globe}
                  title="Tài nguyên mở"
                  description="Hàng ngàn đề thi từ các nguồn uy tín được cập nhật mỗi ngày."
                  bgColor="bg-blue-50"
                  iconColor="text-blue-600"
                />
                <FeatureItem 
                  icon={ShieldCheck}
                  title="An toàn & Riêng tư"
                  description="Dữ liệu học tập của bạn được mã hóa và bảo mật tuyệt đối."
                  bgColor="bg-emerald-50"
                  iconColor="text-emerald-600"
                />
                <FeatureItem 
                  icon={Heart}
                  title="Vì cộng đồng"
                  description="Dự án phi lợi nhuận, đồng hành cùng học sinh sinh viên Việt Nam."
                  bgColor="bg-rose-50"
                  iconColor="text-rose-600"
                />
              </div>

              {/* QR Support Section - Glassmorphism style */}
              <div className="bg-slate-50 rounded-[28px] p-6 border border-slate-100 flex flex-col items-center sm:flex-row gap-6">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 group transition-transform hover:scale-105">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SupportHubStudy" 
                    alt="Donate QR" 
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <span className="inline-block px-3 py-1 bg-white rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200 mb-2">
                    Donate
                  </span>
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    Sự ủng hộ của bạn giúp duy trì máy chủ và đội ngũ phát triển nội dung.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 sm:p-8 bg-white border-t border-slate-50">
              <motion.button
                onClick={onClose}
                disabled={!isScrolledToEnd}
                whileHover={isScrolledToEnd ? { scale: 1.01, translateY: -2 } : {}}
                whileTap={isScrolledToEnd ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-full font-semibold text-[15px] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                  isScrolledToEnd
                    ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                {isScrolledToEnd ? (
                  <>Bắt đầu ngay <ArrowRight size={18} /></>
                ) : (
                  <>Cuộn để tiếp tục <Check size={18} className="opacity-50" /></>
                )}
              </motion.button>
              
              {!isScrolledToEnd && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-[12px] text-blue-500 mt-4 font-medium animate-pulse"
                >
                  Vui lòng đọc hết các điều khoản để tiếp tục
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
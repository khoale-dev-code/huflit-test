import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, ArrowRight, Info, ShieldCheck, Globe } from 'lucide-react';

/**
 * Material You (Google Style) Welcome Modal
 */

const FeatureItem = ({ icon: Icon, title, description, colorClass }) => (
  <div className="flex gap-4 p-4 rounded-[24px] transition-colors hover:bg-slate-50">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div className="space-y-1">
      <h3 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

const WelcomeContent = memo(() => (
  <div className="space-y-8">
    {/* Hero Header */}
    <div className="text-center space-y-3 pt-4">
      <div className="inline-flex p-3 bg-blue-50 rounded-2xl mb-2">
        <Sparkles className="w-6 h-6 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
        Chào mừng bạn đến với Hub Study
      </h2>
      <p className="text-slate-500 max-w-sm mx-auto text-sm">
        Nền tảng học tập cá nhân hóa được thiết kế để giúp bạn bứt phá giới hạn.
      </p>
    </div>

    {/* Features List */}
    <div className="grid gap-2">
      <FeatureItem 
        icon={Globe}
        title="Học tập không giới hạn"
        description="Truy cập kho bài thi và tài liệu hoàn toàn miễn phí, mọi lúc mọi nơi."
        colorClass="bg-blue-50 text-blue-600"
      />
      <FeatureItem 
        icon={ShieldCheck}
        title="Dữ liệu minh bạch"
        description="Tiến độ của bạn được lưu trữ an toàn và phân tích một cách khoa học."
        colorClass="bg-emerald-50 text-emerald-600"
      />
      <FeatureItem 
        icon={Heart}
        title="Phát triển vì cộng đồng"
        description="Dự án phi lợi nhuận nhằm mang lại giá trị giáo dục tốt nhất cho người Việt."
        colorClass="bg-purple-50 text-purple-600"
      />
    </div>

    {/* Support Card (Google Style Surface) */}
    <div className="bg-[#F8F9FA] rounded-[32px] p-6 border border-slate-100 flex flex-col md:flex-row items-center gap-6">
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 w-32 h-32 flex-shrink-0">
        <img 
          src="/src/assets/qr-code.png" 
          alt="QR Code" 
          className="w-full h-full object-contain"
          onError={(e) => { e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SupportHubStudy"; }}
        />
      </div>
      <div className="space-y-2 text-center md:text-left">
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Ủng hộ dự án</p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Đóng góp của bạn giúp chúng tôi duy trì máy chủ và phát triển thêm nhiều bài học mới.
        </p>
      </div>
    </div>

    {/* Bottom Note */}
    <div className="flex items-start gap-3 px-4 py-3 bg-blue-50/50 rounded-2xl border border-blue-100/50">
      <Info className="w-5 h-5 text-blue-500 mt-0.5" />
      <p className="text-xs text-blue-700/80 leading-relaxed italic">
        "Sứ mệnh của chúng tôi là làm cho kiến thức trở nên dễ tiếp cận hơn cho tất cả mọi người."
      </p>
    </div>
  </div>
));

const WelcomeModal = memo(({ isOpen = false, onClose }) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = useCallback((e) => {
    const element = e.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 40;
    if (isAtBottom && !hasScrolled) setHasScrolled(true);
  }, [hasScrolled]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop (Darker & blurrer for focus) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Minimal Header */}
            <div className="absolute top-6 right-6 z-20">
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scroll Area */}
            <div
              onScroll={handleScroll}
              className="overflow-y-auto flex-1 px-8 md:px-12 pt-12 pb-8 custom-scrollbar"
            >
              <WelcomeContent />
            </div>

            {/* Google Style Action Footer */}
            <div className="p-8 pt-4 bg-white border-t border-slate-50 flex flex-col items-center gap-4">
              <motion.button
                onClick={onClose}
                disabled={!hasScrolled}
                whileHover={hasScrolled ? { scale: 1.02 } : {}}
                whileTap={hasScrolled ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                  hasScrolled
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                KHÁM PHÁ NGAY
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              {!hasScrolled && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] font-black text-blue-500 uppercase tracking-widest animate-pulse"
                >
                  Cuộn xuống để đọc hết nội dung
                </motion.span>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

export default WelcomeModal;
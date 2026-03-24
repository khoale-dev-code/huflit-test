import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, ArrowRight, ShieldCheck, Globe, ChevronDown, Rocket } from 'lucide-react';

// ─────────────────────────────────────────────
// FEATURES DATA (Gamified Themes)
// ─────────────────────────────────────────────
const FEATURES = [
  {
    Icon: Globe,
    title: 'Tài nguyên mở',
    desc: 'Hàng ngàn đề thi cập nhật hàng ngày từ các nguồn uy tín.',
    theme: { bg: 'bg-[#EAF6FE]', text: 'text-[#1CB0F6]', border: 'border-[#BAE3FB]', iconBg: 'bg-[#1CB0F6]', iconColor: 'text-white' },
  },
  {
    Icon: ShieldCheck,
    title: 'An toàn & Bảo mật',
    desc: 'Dữ liệu mã hóa, quyền riêng tư được bảo vệ tuyệt đối.',
    theme: { bg: 'bg-[#f1faeb]', text: 'text-[#46A302]', border: 'border-[#bcf096]', iconBg: 'bg-[#58CC02]', iconColor: 'text-white' },
  },
  {
    Icon: Heart,
    title: 'Vì cộng đồng',
    desc: 'Phi lợi nhuận, đồng hành cùng học sinh sinh viên Việt Nam.',
    theme: { bg: 'bg-[#fff0f0]', text: 'text-[#E54343]', border: 'border-[#ffc1c1]', iconBg: 'bg-[#FF4B4B]', iconColor: 'text-white' },
  },
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function WelcomeModal({ isOpen = false, onClose }) {
  const [canClose, setCanClose] = useState(false);
  const scrollRef = useRef(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset on reopen
  useEffect(() => {
    if (isOpen) {
      setCanClose(false);
      setTimeout(() => scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' }), 50);
    }
  }, [isOpen]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Trừ hao 50px để dễ trigger trên Mobile
    if (scrollHeight - scrollTop <= clientHeight + 50) setCanClose(true);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 font-sans selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
          
          {/* Inject Scrollbar Style */}
          <style>{`
            .wm-scroll::-webkit-scrollbar { width: 6px; }
            .wm-scroll::-webkit-scrollbar-track { background: transparent; }
            .wm-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            .wm-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
          `}</style>

          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={canClose ? onClose : undefined}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Gamified Sheet / Modal */}
          <Motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-[540px] max-h-[92dvh] md:max-h-[85vh] bg-white flex flex-col rounded-t-[32px] md:rounded-[32px] border-x-2 border-t-2 border-b-0 md:border-b-[8px] border-slate-200 shadow-2xl overflow-hidden"
          >
            {/* Pill (Chỉ hiện trên Mobile) */}
            <div className="md:hidden flex justify-center pt-3 pb-2 bg-white shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-slate-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[12px] bg-[#1CB0F6] border-b-[3px] border-[#1899D6] flex items-center justify-center shadow-sm">
                  <span className="text-white font-quick font-black text-[16px]">H</span>
                </div>
                <span className="font-quick font-black text-[18px] text-slate-800">HubStudy</span>
              </div>

              <AnimatePresence>
                {canClose && (
                  <Motion.button
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors outline-none"
                  >
                    <X size={20} strokeWidth={3} />
                  </Motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Scrollable Body */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto wm-scroll"
            >
              {/* Hero Banner (Gamified Vibrant) */}
              <div className="relative bg-[#1CB0F6] px-6 py-10 text-center overflow-hidden border-b-[6px] border-[#1899D6]">
                {/* Decorative Blobs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-900/20 rounded-full blur-2xl" />

                <Motion.div 
                  animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="inline-flex p-4 rounded-[20px] bg-white shadow-lg border-b-[4px] border-slate-200 mb-6 relative z-10"
                >
                  <Sparkles size={36} className="text-[#FFC800] fill-[#FFC800]" strokeWidth={1.5} />
                </Motion.div>

                <h2 className="font-quick font-black text-[26px] md:text-[32px] text-white leading-tight mb-3 drop-shadow-sm relative z-10">
                  Nâng tầm tri thức <br /> cùng HubStudy!
                </h2>
                <p className="font-nunito font-bold text-[15px] text-blue-100 max-w-[300px] mx-auto relative z-10">
                  Khám phá kho tài liệu học tập được cá nhân hóa — hoàn toàn miễn phí.
                </p>

                {/* Stats Pills */}
                <div className="flex justify-center gap-3 mt-6 flex-wrap relative z-10">
                  {[['1000+', 'Đề thi'], ['50K+', 'Học viên'], ['100%', 'Miễn phí']].map(([val, label]) => (
                    <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 shadow-sm">
                      <div className="font-quick font-black text-[18px] text-white">{val}</div>
                      <div className="font-quick font-bold text-[10px] text-blue-100 uppercase tracking-widest mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="p-6">
                <p className="font-quick font-black text-[12px] text-slate-400 uppercase tracking-widest mb-4 pl-1">
                  Tại sao chọn chúng tôi?
                </p>
                <div className="flex flex-col gap-4">
                  {/* eslint-disable-next-line no-unused-vars */}
                  {FEATURES.map(({ Icon, title, desc, theme }, i) => (
                    <div key={i} className={`flex items-start gap-4 p-4 rounded-[24px] border-2 border-b-[4px] ${theme.bg} ${theme.border}`}>
                      <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border-b-[3px] shadow-sm ${theme.iconBg} border-black/10`}>
                        <Icon size={24} className={theme.iconColor} strokeWidth={2.5} />
                      </div>
                      <div>
                        <span className={`block font-quick font-black text-[16px] mb-1 ${theme.text}`}>{title}</span>
                        <p className="font-nunito font-bold text-[14px] text-slate-600 leading-snug">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donate Box (Bonus Quest) */}
              <div className="mx-6 mb-8 p-5 rounded-[24px] bg-[#FFC800]/10 border-2 border-[#FFC800]/40 border-b-[4px] flex gap-5 items-center">
                <div className="bg-white p-2 rounded-[16px] border-2 border-slate-200 border-b-[4px] shrink-0 shadow-sm hover:scale-105 transition-transform">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=SupportHubStudy"
                    alt="Donate QR"
                    className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-xl"
                  />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFC800] text-white font-quick font-black text-[10px] uppercase tracking-widest rounded-xl mb-2 border-b-2 border-[#E5B400]">
                    <Rocket size={12} strokeWidth={3} /> Ủng hộ dự án
                  </span>
                  <p className="font-nunito font-bold text-[13px] md:text-[14px] text-amber-900/80 leading-snug">
                    Sự ủng hộ của bạn giúp duy trì máy chủ và phát triển thêm các tính năng học tập mới.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Action Area */}
            <div className="p-5 md:p-6 bg-white border-t-2 border-slate-100 shrink-0">
              
              <AnimatePresence mode="wait">
                {!canClose ? (
                  <Motion.div 
                    key="scrolldown"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 mb-4"
                  >
                    <Motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ChevronDown size={16} className="text-slate-400" strokeWidth={3} /></Motion.div>
                    <span className="font-quick font-bold text-[13px] text-slate-400 uppercase tracking-widest">Cuộn xuống để tiếp tục</span>
                    <Motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ChevronDown size={16} className="text-slate-400" strokeWidth={3} /></Motion.div>
                  </Motion.div>
                ) : (
                  <Motion.div key="spacer" className="h-2" />
                )}
              </AnimatePresence>

              <button
                onClick={canClose ? onClose : undefined}
                disabled={!canClose}
                className={`
                  w-full py-4 rounded-[20px] font-quick font-black text-[18px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all outline-none border-2
                  ${canClose 
                    ? 'bg-[#58CC02] text-white border-[#46A302] border-b-[6px] active:border-b-0 active:translate-y-[6px] shadow-sm' 
                    : 'bg-slate-100 text-slate-400 border-slate-200 border-b-[6px] cursor-not-allowed'
                  }
                `}
              >
                Bắt đầu học ngay
                <ArrowRight size={22} strokeWidth={3} />
              </button>

              <p className="text-center font-nunito font-bold text-[12px] text-slate-400 mt-4 mb-1">
                Bằng cách tiếp tục, bạn đồng ý với{' '}
                <span className="text-[#1CB0F6] underline cursor-pointer hover:text-blue-700">điều khoản sử dụng</span>
              </p>
            </div>

          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
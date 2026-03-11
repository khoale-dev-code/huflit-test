/* src/components/FullExam/components/Warnings/TimeWarning.jsx */
/* Gamified Floating Pill · Tailwind CSS · Framer Motion */

import React, { memo, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, X } from 'lucide-react';

// ── Color tokens theo Gamification style ───────────────
const TOKENS = {
  listening: {
    bg: 'bg-amber-500',
    border: 'border-amber-600',
    text: 'text-white',
    iconColor: 'text-white',
    progressBg: 'bg-amber-600',
    progressFill: 'bg-white',
  },
  reading: {
    bg: 'bg-red-500',
    border: 'border-red-600',
    text: 'text-white',
    iconColor: 'text-white',
    progressBg: 'bg-red-600',
    progressFill: 'bg-white',
  },
};

export const TimeWarning = memo(({
  visible,
  section = 'listening',
  isLastListeningPart = false,
  timeLeft = 0,
}) => {
  const [mounted, setMounted] = useState(false);
  const dismissTimer = useRef(null);

  // Mount logic & Auto-dismiss sau 8s
  useEffect(() => {
    if (visible) {
      setMounted(true);
      // Xóa timer cũ nếu có
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      
      dismissTimer.current = setTimeout(() => {
        setMounted(false);
      }, 8000);
    } else {
      setMounted(false);
    }
    return () => clearTimeout(dismissTimer.current);
  }, [visible]);

  const handleDismiss = () => {
    setMounted(false);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
  };

  const t = TOKENS[section] ?? TOKENS.listening;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeStr = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

  const title = section === 'listening' 
    ? 'CẢNH BÁO THỜI GIAN' 
    : 'CHUẨN BỊ NỘP BÀI';

  const body = section === 'listening'
    ? isLastListeningPart
      ? 'Phần Listening sắp kết thúc. Hãy nhanh tay kiểm tra lại đáp án!'
      : 'Sắp hết giờ phần này. Hãy chú ý!'
    : 'Bài thi sẽ tự động nộp khi hết giờ.';

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0, y: -40, scale: 0.9, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, y: -20, scale: 0.9, x: '-50%' }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-[80px] left-1/2 z-[100] w-max max-w-[92vw] md:max-w-[400px]"
          style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
        >
          <div className={`
            relative overflow-hidden flex items-center gap-3 p-3 md:p-4 rounded-2xl md:rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-2 border-b-[4px]
            ${t.bg} ${t.border} ${t.text}
          `}>
            
            {/* Auto-dismiss Progress Bar ở viền dưới */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 md:h-1.5 ${t.progressBg}`}>
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 8, ease: "linear" }}
                className={`h-full ${t.progressFill}`}
              />
            </div>

            {/* Icon nhấp nháy */}
            <div className="relative shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl border-b-2 border-white/30">
              <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-white animate-ping opacity-20" />
              {section === 'listening' ? <Clock size={24} className="text-white" strokeWidth={2.5} /> : <AlertTriangle size={24} className="text-white" strokeWidth={2.5} />}
            </div>

            {/* Nội dung chữ (Nhỏ gọn) */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] md:text-[12px] font-black uppercase tracking-widest text-white/90">
                  {title}
                </span>
                <span className="px-2 py-0.5 bg-white text-black rounded-lg text-[11px] md:text-[13px] font-black tabular-nums border-b-2 border-slate-200">
                  {timeStr}
                </span>
              </div>
              <p className="text-[13px] md:text-[14px] font-bold text-white leading-tight truncate">
                {body}
              </p>
            </div>

            {/* Nút Đóng (Close) */}
            <button
              onClick={handleDismiss}
              className="p-1.5 md:p-2 bg-black/10 hover:bg-black/20 rounded-xl transition-colors shrink-0 active:scale-95 outline-none"
              aria-label="Đóng cảnh báo"
            >
              <X size={18} className="text-white" strokeWidth={3} />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

TimeWarning.displayName = 'TimeWarning';
export default TimeWarning;
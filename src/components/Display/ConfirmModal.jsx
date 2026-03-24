import React, { memo } from 'react';
import { HelpCircle } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

/* ══════════════════════════════════════════════════════
   CONFIRM MODAL — Gamified 3D Compact
   Usage:
     import ConfirmModal from './ConfirmModal';
     <ConfirmModal
       open={confirmOpen}
       answersCount={answersCount}
       totalQuestions={totalQuestions}
       onConfirm={handleConfirm}
       onCancel={() => setConfirmOpen(false)}
     />
══════════════════════════════════════════════════════ */
const ConfirmModal = memo(({ open, answersCount, totalQuestions, onConfirm, onCancel }) => {
  const remaining  = totalQuestions - answersCount;
  const percentage = Math.round((answersCount / totalQuestions) * 100);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
          
          {/* Backdrop Kính Mờ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onCancel}
            aria-hidden="true"
          />

          {/* Dialog 3D Nhỏ Gọn */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[340px] bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-2xl p-5 sm:p-6"
          >
            {/* Icon Cảnh báo Vàng 3D (Đè lên viền trên) */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#FFC800] rounded-[16px] border-b-[4px] border-[#E5B400] flex items-center justify-center shadow-sm">
              <HelpCircle size={28} strokeWidth={2.5} className="text-white" />
            </div>

            {/* Nội dung */}
            <div className="mt-5 text-center">
              <h2 id="confirm-title" className="text-[18px] font-display font-black text-slate-800 mb-1.5">
                Nộp bài luôn sao?
              </h2>
              <p className="text-[13px] font-body font-bold text-slate-500 mb-5 leading-snug">
                Bạn còn <span className="text-[#FF9600] font-black">{remaining} câu</span> chưa trả lời. Bỏ trống sẽ không có điểm đâu nhé!
              </p>

              {/* Progress Bar 3D Mini */}
              <div className="bg-slate-50 border-2 border-slate-100 rounded-[16px] p-3 mb-6 text-left">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest">Tiến độ hiện tại</span>
                  <span className="text-[13px] font-display font-black text-[#1CB0F6]">
                    {answersCount}/{totalQuestions} <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">câu</span>
                  </span>
                </div>
                {/* Thanh chạy bóng lóa */}
                <div className="h-3.5 bg-slate-200 rounded-full overflow-hidden shadow-inner p-[2px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-[#1CB0F6] rounded-full relative"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/30 rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex gap-2.5">
                {/* Nút phụ: Chấp nhận hi sinh điểm */}
                <button
                  onClick={onConfirm}
                  className="flex-1 py-3 rounded-[14px] border-2 border-slate-200 border-b-[4px] bg-slate-50 text-slate-500 text-[13px] font-display font-bold hover:bg-slate-100 hover:text-slate-600 hover:border-slate-300 active:border-b-2 active:translate-y-[2px] transition-all outline-none"
                >
                  Vẫn nộp
                </button>
                {/* Nút chính: Khuyến khích làm tiếp */}
                <button
                  onClick={onCancel}
                  className="flex-1 py-3 rounded-[14px] border-2 border-[#1899D6] border-b-[4px] bg-[#1CB0F6] text-white text-[13px] font-display font-bold hover:bg-[#18A0E0] active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm"
                >
                  Làm tiếp
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

ConfirmModal.displayName = 'ConfirmModal';
export default ConfirmModal;
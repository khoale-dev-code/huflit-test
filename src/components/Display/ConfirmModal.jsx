import React, { memo, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';

/* ══════════════════════════════════════════════════════
   CONFIRM MODAL — M3 Dialog
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
  if (!open) return null;

  const remaining  = totalQuestions - answersCount;
  const percentage = Math.round((answersCount / totalQuestions) * 100);

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0 font-sans-m3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-m3-fadein"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl overflow-hidden animate-m3-slidein"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF3CD] flex items-center justify-center mb-4">
            <AlertCircle size={24} className="text-[#B45309]" />
          </div>
          <h2 id="confirm-title" className="text-lg font-semibold text-[#1A1B1F] font-display-m3 mb-1">
            Nộp bài chưa hoàn thành?
          </h2>
          <p className="text-sm text-[#44464F] leading-relaxed">
            Bạn còn{' '}
            <span className="font-semibold text-[#B45309]">{remaining} câu</span>{' '}
            chưa trả lời. Các câu bỏ trống sẽ bị tính sai.
          </p>
        </div>

        {/* Progress mini */}
        <div className="px-6 pb-5">
          <div className="bg-[#F1F3F9] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-[#44464F]">Tiến độ</span>
                <span className="text-xs font-semibold text-[#1A56DB]">
                  {answersCount}/{totalQuestions} câu
                </span>
              </div>
              <div className="h-1.5 bg-[#E1E2EC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1A56DB] to-[#4D8FFF] rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#D8E2FF] flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-[#1A56DB]">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border-[1.5px] border-[#C4C6D0] text-[#44464F] text-sm font-semibold hover:bg-[#F1F3F9] active:bg-[#E1E2EC] transition-colors"
          >
            Làm tiếp
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-2xl bg-[#00358E] text-white text-sm font-semibold hover:bg-[#002763] active:scale-[0.97] transition-all shadow-[0_2px_12px_rgba(0,53,142,0.3)]"
          >
            Vẫn nộp
          </button>
        </div>
      </div>
    </div>
  );
});

ConfirmModal.displayName = 'ConfirmModal';
export default ConfirmModal;
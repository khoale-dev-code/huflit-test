// src/components/Display/Result/AnswerReviewCard.jsx
import { memo } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import ExplanationSection from '../ExplanationDisplay';

/**
 * Card hiển thị kết quả từng câu hỏi
 *
 * State `expanded` được quản lý ở component cha để:
 * - Tránh N state instances cho N câu hỏi
 * - Dễ control (đóng tất cả, mở tất cả)
 */
const AnswerReviewCard = memo(
  ({ question, questionNum, isCorrect, userAnswer, correctAnswer, options, isExpanded, onToggle }) => {
    const userAnswerText =
      userAnswer !== undefined && userAnswer !== null 
        ? String.fromCharCode(65 + userAnswer) 
        : 'Chưa chọn';
    const correctAnswerText = String.fromCharCode(65 + correctAnswer);

    // ─── Cấu hình Theme theo trạng thái (Đúng / Sai) ───
    const theme = isCorrect 
      ? { 
          bg: 'bg-hub-green-bg', 
          border: 'border-hub-green-border', 
          text: 'text-hub-green-dark', 
          iconBg: 'bg-hub-green', 
          iconBorder: 'border-hub-green-dark' 
        }
      : { 
          bg: 'bg-hub-red-bg', 
          border: 'border-hub-red-border', 
          text: 'text-hub-red-dark', 
          iconBg: 'bg-hub-red', 
          iconBorder: 'border-hub-red-dark' 
        };

    return (
      <div className={`rounded-[20px] md:rounded-[24px] border-2 ${theme.border} ${theme.bg} overflow-hidden transition-all shadow-sm`}>
        
        {/* ─── Nút Toggle (Nhấn để mở rộng) ─── */}
        <button
          onClick={() => onToggle(question.id)}
          className="w-full flex items-start gap-3 md:gap-4 px-4 py-3 md:px-5 md:py-4 text-left outline-none hover:bg-white/40 transition-colors"
          aria-expanded={isExpanded}
        >
          {/* Icon Trạng thái 3D */}
          <div className={`mt-0.5 shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-[10px] md:rounded-[12px] flex items-center justify-center border-2 border-b-[3px] ${theme.iconBg} ${theme.iconBorder} text-white shadow-sm`}>
            {isCorrect ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}
          </div>

          {/* Thông tin Câu hỏi */}
          <div className="flex-1 min-w-0">
            <p className="text-[14px] md:text-[16px] font-body font-bold text-slate-700 mb-2.5 leading-snug">
              <span className={`font-display font-black mr-1.5 uppercase tracking-wide ${theme.text}`}>
                Câu {questionNum}:
              </span>
              {question.question || <span className="italic text-slate-400 font-medium">(Chọn đáp án theo hình ảnh)</span>}
            </p>
            
            {/* Hình ảnh câu hỏi (Nếu có) */}
            {question.imageUrl && (
              <div className="mb-3 bg-white p-1.5 md:p-2 rounded-[12px] border-2 border-slate-200/60 inline-block shadow-sm">
                <img 
                  src={question.imageUrl} 
                  alt={`Câu hỏi ${questionNum}`} 
                  loading="lazy"
                  className="max-w-full max-h-[160px] md:max-h-[200px] object-contain rounded-[8px]" 
                />
              </div>
            )}

            {/* Badges Đáp án */}
            <div className="flex flex-wrap gap-2 mt-1">
              {/* Pill: Đáp án của User */}
              <span className={`flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-[10px] text-[11px] md:text-[12px] font-display font-black uppercase tracking-wider border-2 bg-white shadow-sm ${isCorrect ? 'text-hub-green-dark border-hub-green-border' : 'text-hub-red-dark border-hub-red-border'}`}>
                Bạn chọn
                <span className={`px-1.5 md:px-2 py-0.5 rounded-md text-white leading-none ${theme.iconBg}`}>
                  {userAnswerText}
                </span>
              </span>
              
              {/* Pill: Đáp án Đúng (Chỉ hiện nếu làm sai) */}
              {!isCorrect && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-[10px] text-[11px] md:text-[12px] font-display font-black uppercase tracking-wider border-2 border-hub-blue-border bg-white text-hub-blue shadow-sm">
                  Đáp án
                  <span className="px-1.5 md:px-2 py-0.5 rounded-md bg-hub-blue text-white leading-none">
                    {correctAnswerText}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Chevron trỏ xuống */}
          <div className={`shrink-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200/60 flex items-center justify-center transition-transform duration-300 shadow-sm mt-1 ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={18} className="text-slate-400" strokeWidth={3} />
          </div>
        </button>

        {/* ─── Khu vực Giải thích (Mở rộng với Animation) ─── */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <Motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden bg-white/60 backdrop-blur-sm"
            >
              <div className={`px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4 border-t-2 border-dashed ${theme.border}`}>
                <ExplanationSection
                  explanation={question.explanation}
                  question={question.question}
                  userAnswer={userAnswer}
                  correctAnswer={correctAnswer}
                  isCorrect={isCorrect}
                  options={options}
                  questionId={question.id}
                />
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AnswerReviewCard.displayName = 'AnswerReviewCard';
export default AnswerReviewCard;
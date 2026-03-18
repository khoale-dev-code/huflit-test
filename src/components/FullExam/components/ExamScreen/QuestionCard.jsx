/* src/components/FullExam/components/ExamScreen/QuestionCard.jsx */
/* Gamified UI · Compact & Responsive · WCAG 2.1 AA · Tailwind CSS */

import React, { memo, useCallback, useId } from 'react';
import { Check, Lightbulb, Image as ImageIcon, Star } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

// 👇 ĐÃ THÊM: Import MiniAudioPlayer vào QuestionCard
import { MiniAudioPlayer } from '../../../Display/MiniAudioPlayer';

/* ─────────────────────────────────────────────────────────────
   Option Button (Compact 3D Key)
   ───────────────────────────────────────────────────────────── */
const OptionButton = memo(({
  option,
  isSelected,
  onSelect,
  optionLabel,
  groupId,
  optionId,
  disabled,
  isCorrectExample
}) => {
  // Logic xử lý trạng thái đặc biệt cho câu ví dụ
  const isExampleState = disabled && isCorrectExample;
  const isActuallySelected = isSelected || isExampleState;

  return (
    <li role="none" className="w-full">
      <button
        type="button"
        role="radio"
        aria-checked={isActuallySelected}
        aria-describedby={`${groupId}-label`}
        id={optionId}
        onClick={onSelect}
        disabled={disabled}
        className={`
          relative w-full flex items-center gap-3 px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-[16px] transition-all duration-200 text-left outline-none border-2
          ${isActuallySelected
            ? (isExampleState ? 'bg-[#FFFBEA] border-[#FFD8A8] border-b-[3px] translate-y-[-1px]' : 'bg-[#EAF6FE] border-[#1CB0F6] border-b-[3px] translate-y-[-1px]')
            : (disabled ? 'bg-white border-slate-200 border-b-[3px] opacity-60 cursor-default' : 'bg-white border-slate-200 border-b-[3px] hover:border-slate-300 hover:bg-slate-50 active:border-b-2 active:translate-y-[1px]')}
        `}
      >
        {/* Label Badge (A, B, C, D) */}
        <div className={`
          w-7 h-7 sm:w-8 sm:h-8 rounded-[10px] flex items-center justify-center text-[13px] sm:text-[14px] font-quick font-black shrink-0 transition-colors border-b-[3px]
          ${isActuallySelected 
            ? (isExampleState ? 'bg-[#FF9600] border-[#E58700] text-white shadow-sm' : 'bg-[#1CB0F6] border-[#1899D6] text-white shadow-sm') 
            : 'bg-slate-100 border-slate-200 text-slate-500'}
        `}>
          {isActuallySelected ? <Check size={14} strokeWidth={4} /> : optionLabel}
        </div>

        {/* Option Text */}
        <span className={`
          flex-1 text-[14px] sm:text-[15px] font-body leading-snug break-words whitespace-pre-wrap pr-2 overflow-hidden
          ${isActuallySelected ? (isExampleState ? 'font-bold text-[#D9A600]' : 'font-bold text-blue-900') : 'font-semibold text-slate-700'}
        `}>
          {option || <span className="italic text-slate-400">Trống</span>}
        </span>
      </button>
    </li>
  );
});
OptionButton.displayName = 'OptionButton';

/* ─────────────────────────────────────────────────────────────
   QuestionCard (Main Container)
   ───────────────────────────────────────────────────────────── */
export const QuestionCard = memo(({
  question,
  questionNum,
  selectedAnswer,
  onAnswerSelect,
  questionKey,
}) => {
  const groupId = useId();
  const isExample = question?.isExample || false;

  const handleSelect = useCallback(
    (idx) => {
      if (!isExample) onAnswerSelect(idx);
    },
    [onAnswerSelect, isExample],
  );

  if (!question) return null;
  const options = question.options || [];

  return (
    <Motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      aria-labelledby={`${groupId}-heading`}
      className={`rounded-[24px] p-4 sm:p-5 md:p-6 mb-5 sm:mb-6 border-2 border-b-[5px] shadow-sm font-sans selection:bg-blue-200 transition-colors w-full overflow-hidden
        ${isExample ? 'bg-[#FFFBEA] border-[#FFD8A8] hover:border-[#FFC200]' : 'bg-white border-slate-200'}
      `}
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      <header className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5">
        
        {/* Question Number Badge */}
        <div 
          aria-label={isExample ? 'Câu Ví dụ' : `Câu ${questionNum}`}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] flex items-center justify-center text-white font-quick font-black text-[14px] sm:text-[15px] shrink-0 border-b-[3px] shadow-sm self-start
            ${isExample ? 'bg-[#FF9600] border-[#E58700]' : 'bg-[#1CB0F6] border-[#1899D6]'}
          `}
        >
          {questionNum}
        </div>

        {/* Question Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          
          {/* Badge Câu Ví dụ */}
          {isExample && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-[#FF9600]/20 text-[#FF9600] text-[10px] font-display font-black uppercase tracking-widest mb-3 border border-[#FF9600]/30 shadow-sm">
              <Star size={12} strokeWidth={3} /> Câu Ví Dụ (Mẫu)
            </div>
          )}

          {/* Question Text */}
          <h3 id={`${groupId}-heading`} className={`text-[15px] sm:text-[16px] md:text-[17px] font-display font-extrabold leading-[1.6] m-0 whitespace-pre-wrap break-words overflow-hidden
            ${isExample ? 'text-[#D9A600]' : 'text-slate-800'}
          `}>
            {question.question || (
              question.imageUrl ? (
                <span className="text-slate-400 font-body font-bold text-[14px] sm:text-[15px] flex items-center gap-2 break-words">
                  <ImageIcon size={18} className="shrink-0" /> Hãy chọn đáp án mô tả đúng nhất về hình ảnh bên dưới.
                </span>
              ) : (
                <span className="text-[#FF4B4B] italic break-words">Nội dung câu hỏi bị trống.</span>
              )
            )}
          </h3>

          {/* 👇 ĐÃ THÊM: MiniAudioPlayer hiển thị Audio riêng của từng câu (Nếu có) 👇 */}
          {question.audioUrl && (
             <div className="mt-2 w-full">
                <MiniAudioPlayer audioUrl={question.audioUrl} />
             </div>
          )}

          {/* Hình ảnh câu hỏi */}
          {question.imageUrl && (
            <div className={`mt-4 mb-2 p-2 border-2 border-b-[4px] rounded-[16px] flex justify-center items-center shadow-inner overflow-hidden w-full
              ${isExample ? 'bg-white border-[#FFD8A8]' : 'bg-slate-50 border-slate-200'}
            `}>
              <img
                src={question.imageUrl}
                alt={`Minh họa câu hỏi ${questionNum}`}
                loading="lazy"
                className="max-w-full max-h-[180px] sm:max-h-[220px] object-contain rounded-[12px] bg-white border border-slate-100 shadow-sm"
              />
            </div>
          )}

          {/* Hint Box */}
          {question.hint && (
            <div role="note" aria-label="Hint" className="mt-3 p-3 bg-[#FFC800]/10 border-2 border-[#FFC800]/40 rounded-[16px] border-b-[3px] flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-[10px] bg-[#FFC800] text-white flex items-center justify-center shrink-0 border-b-2 border-[#E5B400] shadow-sm mt-0.5">
                <Lightbulb size={16} strokeWidth={2.5} />
              </div>
              <p className="text-[13px] sm:text-[14px] font-body font-bold text-amber-900/80 leading-snug break-words pt-1 overflow-hidden">
                {question.hint}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Accessible Fieldset for Options */}
      <fieldset aria-labelledby={`${groupId}-heading`} className="border-none m-0 p-0 w-full">
        <legend className="sr-only">
          Chọn một đáp án cho câu hỏi {questionNum}
        </legend>

        {options.length > 0 ? (
          <ul role="radiogroup" aria-label={`Answer options for question ${questionNum}`} className="flex flex-col gap-2.5 m-0 p-0 list-none w-full">
            {options.map((option, idx) => (
              <OptionButton
                key={`${questionKey}-option-${idx}`}
                option={option}
                isSelected={selectedAnswer === idx}
                onSelect={() => handleSelect(idx)}
                optionLabel={String.fromCharCode(65 + idx)}
                groupId={groupId}
                optionId={`${groupId}-opt-${idx}`}
                disabled={isExample}
                isCorrectExample={isExample && question.correct === idx}
              />
            ))}
          </ul>
        ) : (
          <div role="status" className="py-5 px-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-[16px] text-center w-full">
            <p className="text-slate-400 font-quick font-bold text-[14px] break-words">Không có dữ liệu đáp án.</p>
          </div>
        )}
      </fieldset>

    </Motion.article>
  );
});

QuestionCard.displayName = 'QuestionCard';
export default QuestionCard;
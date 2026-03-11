/* src/components/FullExam/components/ExamScreen/QuestionCard.jsx */
/* Google & Duolingo UI · WCAG 2.1 AA · Mobile-first · Tailwind CSS */

import React, { memo, useCallback, useId } from 'react';
import { Check, Lightbulb } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Option Button (Clean & Modern)
   ───────────────────────────────────────────────────────────── */
const OptionButton = memo(({
  option,
  isSelected,
  onSelect,
  optionLabel,
  groupId,
  optionId,
}) => {
  return (
    <li role="none" className="w-full">
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        aria-describedby={`${groupId}-label`}
        id={optionId}
        onClick={onSelect}
        className={`
          w-full flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border transition-all duration-150 text-left outline-none
          ${isSelected
            ? 'bg-blue-50 border-blue-400 shadow-sm'
            : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
        `}
      >
        {/* Label Badge (A, B, C, D) */}
        <div className={`
          w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 transition-colors
          ${isSelected 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-600'}
        `}>
          {optionLabel}
        </div>

        {/* Option Text */}
        <span className={`
          flex-1 text-sm sm:text-base leading-normal
          ${isSelected ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}
        `}>
          {option}
        </span>

        {/* Selected Checkmark */}
        {isSelected && (
          <Check className="w-5 h-5 text-blue-500 shrink-0" strokeWidth={3} />
        )}
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

  const handleSelect = useCallback(
    (idx) => onAnswerSelect(idx),
    [onAnswerSelect],
  );

  if (!question) return null;
  const options = question.options || [];

  return (
    <article
      aria-labelledby={`${groupId}-heading`}
      className="bg-white rounded-2xl p-4 sm:p-6 mb-5 border border-gray-200 shadow-xs font-sans"
      style={{ fontFamily: '-apple-system, "Segoe UI", "Roboto", sans-serif' }}
    >
      <header className="flex gap-3 sm:gap-4 mb-4 sm:mb-5">
        {/* Question Number Badge */}
        <div 
          aria-label={`Question ${questionNum}`}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0 shadow-xs"
        >
          {questionNum}
        </div>

        {/* Question Content */}
        <div className="flex-1">
          <p id={`${groupId}-heading`} className="text-base sm:text-lg font-semibold text-gray-900 leading-snug m-0">
            {question.question || 'Nội dung câu hỏi bị trống.'}
          </p>

          {/* Hint Box */}
          {question.hint && (
            <div role="note" aria-label="Hint" className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2.5 items-start">
              <div className="w-6 h-6 rounded-md bg-amber-400 text-white flex items-center justify-center shrink-0 flex-none">
                <Lightbulb className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-amber-900 leading-normal mt-0.5">
                {question.hint}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Accessible Fieldset for Options */}
      <fieldset aria-labelledby={`${groupId}-heading`} className="border-none m-0 p-0">
        <legend className="sr-only">
          Chọn một đáp án cho câu hỏi {questionNum}
        </legend>

        {options.length > 0 ? (
          <ul role="radiogroup" aria-label={`Answer options for question ${questionNum}`} className="flex flex-col gap-2 m-0 p-0 list-none">
            {options.map((option, idx) => (
              <OptionButton
                key={`${questionKey}-option-${idx}`}
                option={option}
                isSelected={selectedAnswer === idx}
                onSelect={() => handleSelect(idx)}
                optionLabel={String.fromCharCode(65 + idx)}
                groupId={groupId}
                optionId={`${groupId}-opt-${idx}`}
              />
            ))}
          </ul>
        ) : (
          <div role="status" className="py-4 px-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-gray-400 font-medium text-sm">Không có dữ liệu đáp án cho câu hỏi này.</p>
          </div>
        )}
      </fieldset>

    </article>
  );
});

QuestionCard.displayName = 'QuestionCard';
export default QuestionCard;
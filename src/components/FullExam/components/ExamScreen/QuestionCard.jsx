/* src/components/FullExam/components/ExamScreen/QuestionCard.jsx */

import React, { memo } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

/**
 * Question Card - Display a single question with options
 * Shows:
 * - Question text
 * - 4 answer options
 * - Selection state (highlighted if selected)
 * - Checkmark when selected
 */
export const QuestionCard = memo(({
  question,
  questionNum,
  selectedAnswer,
  onAnswerSelect,
  questionKey,
}) => {
  if (!question) {
    return null;
  }

  const options = question.options || [];
  const correct = question.correct;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
      {/* Question Header */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-600 mb-2">
          Question {questionNum}
        </p>
        <p className="text-base font-semibold text-slate-900">
          {question.question || 'No question text'}
        </p>
        
        {question.hint && (
          <p className="text-sm text-slate-600 mt-2 italic">
            Hint: {question.hint}
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {options && options.length > 0 ? (
          options.map((option, idx) => (
            <OptionButton
              key={`${questionKey}-option-${idx}`}
              option={option}
              optionIndex={idx}
              isSelected={selectedAnswer === idx}
              onSelect={() => onAnswerSelect(idx)}
              optionLabel={String.fromCharCode(65 + idx)} // A, B, C, D
            />
          ))
        ) : (
          <p className="text-slate-600 text-sm">No options available</p>
        )}
      </div>

      {/* Selection Indicator */}
      {selectedAnswer !== undefined && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-emerald-600 font-semibold">
            ✓ Answer selected: {String.fromCharCode(65 + selectedAnswer)}
          </p>
        </div>
      )}
    </div>
  );
});

QuestionCard.displayName = 'QuestionCard';

/**
 * Option Button - Individual answer option
 */
const OptionButton = memo(({
  option,
  optionIndex,
  isSelected,
  onSelect,
  optionLabel,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-4 rounded-lg border-2 text-left transition-all duration-150
        flex items-start gap-4 hover:border-blue-400
        ${isSelected
          ? 'border-blue-600 bg-blue-50'
          : 'border-slate-200 bg-white hover:bg-slate-50'
        }
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {isSelected ? (
          <CheckCircle className="w-6 h-6 text-blue-600" />
        ) : (
          <Circle className="w-6 h-6 text-slate-400" />
        )}
      </div>

      {/* Option Content */}
      <div className="flex-1">
        <div className="font-semibold text-slate-900 mb-1">
          {optionLabel}. {option}
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="flex-shrink-0 text-blue-600 font-bold text-sm">
          Selected
        </div>
      )}
    </button>
  );
});

OptionButton.displayName = 'OptionButton';

export default QuestionCard;
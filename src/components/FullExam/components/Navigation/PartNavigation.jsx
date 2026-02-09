/* src/components/FullExam/components/Navigation/PartNavigation.jsx */

import React, { memo } from 'react';
import { CheckCircle, Circle, Lock, AlertCircle } from 'lucide-react';

/**
 * Part Navigation - Select which part to work on
 * Shows all parts with:
 * - Answered questions count
 * - Completion status
 * - Lock status (can't go back to listening parts)
 */
export const PartNavigation = memo(({
  currentPart,
  totalParts,
  startPartNumber,        // 1 for listening, 5 for reading
  answers,                // All answers object
  section,                // 'listening' or 'reading'
  questionsPerPart,       // Questions per part
  onPartChange,           // (newPart) => void
  playedParts = [],       // Array of played listening parts (for listening only)
  isAudioPlaying = false,
}) => {
  const canNavigateToListening = section === 'listening';

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="font-bold text-lg text-slate-900 mb-4">
        {section === 'listening' ? 'Listening Parts' : 'Reading Parts'}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: totalParts }, (_, idx) => {
          const partNumber = startPartNumber + idx;
          const answerCount = countAnswersInPart(answers, section, partNumber, questionsPerPart);
          const isCompleted = answerCount === questionsPerPart;
          const isCurrent = partNumber === currentPart;
          const isLocked = section === 'listening' && playedParts.includes(partNumber) && !isCurrent;

          return (
            <PartButton
              key={partNumber}
              partNumber={partNumber}
              isCurrent={isCurrent}
              isCompleted={isCompleted}
              isLocked={isLocked}
              answerCount={answerCount}
              totalQuestions={questionsPerPart}
              onSelect={() => {
                if (!isLocked && !isAudioPlaying) {
                  onPartChange(partNumber);
                }
              }}
              disabled={isLocked || isAudioPlaying}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-4 h-4 text-blue-600" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-400" />
          <span>Locked</span>
        </div>
      </div>

      {/* Help Text */}
      {section === 'listening' && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-900">
            <strong>Note:</strong> Once you finish a listening part, you cannot return to it. Make sure all answers are ready before moving on.
          </p>
        </div>
      )}
    </div>
  );
});

PartNavigation.displayName = 'PartNavigation';

/**
 * Part Button - Individual part selector
 */
const PartButton = memo(({
  partNumber,
  isCurrent,
  isCompleted,
  isLocked,
  answerCount,
  totalQuestions,
  onSelect,
  disabled,
}) => {
  let bgColor = 'bg-white border-slate-200';
  let textColor = 'text-slate-900';
  let icon = <Circle className="w-5 h-5" />;

  if (isLocked) {
    bgColor = 'bg-slate-100 border-slate-300';
    textColor = 'text-slate-400';
    icon = <Lock className="w-5 h-5" />;
  } else if (isCompleted) {
    bgColor = 'bg-emerald-50 border-emerald-300';
    textColor = 'text-emerald-900';
    icon = <CheckCircle className="w-5 h-5 text-emerald-600" />;
  } else if (isCurrent) {
    bgColor = 'bg-blue-50 border-blue-600';
    textColor = 'text-blue-900';
    icon = <div className="w-5 h-5 rounded-full bg-blue-600" />;
  } else if (answerCount > 0) {
    bgColor = 'bg-amber-50 border-amber-300';
    textColor = 'text-amber-900';
    icon = <AlertCircle className="w-5 h-5 text-amber-600" />;
  }

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        p-3 rounded-lg border-2 transition-all duration-150
        flex flex-col items-center gap-2
        disabled:cursor-not-allowed
        ${bgColor}
        ${disabled ? 'opacity-50' : 'hover:border-blue-400 hover:shadow-sm'}
      `}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${textColor}`}>
        {icon}
      </div>

      {/* Part Number */}
      <div className={`font-bold text-sm ${textColor}`}>
        Part {partNumber}
      </div>

      {/* Answer Count */}
      <div className={`text-xs font-semibold ${textColor}`}>
        {answerCount}/{totalQuestions}
      </div>

      {/* Status Badge */}
      {isCompleted && (
        <div className="text-xs text-emerald-600 font-bold">✓ Done</div>
      )}
      {isCurrent && (
        <div className="text-xs text-blue-600 font-bold">Current</div>
      )}
      {isLocked && (
        <div className="text-xs text-slate-400 font-bold">Locked</div>
      )}
    </button>
  );
});

PartButton.displayName = 'PartButton';

/**
 * Count answers in a specific part
 */
function countAnswersInPart(answers, section, part, questionsPerPart) {
  let count = 0;
  for (let q = 1; q <= questionsPerPart; q++) {
    const key = `${section}-part${part}-q${q}`;
    if (answers[key] !== undefined) {
      count++;
    }
  }
  return count;
}

export default PartNavigation;
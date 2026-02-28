/* src/components/FullExam/components/Navigation/PartNavigation.jsx
 *
 * FIX: countAnswersInPart dùng generateAnswerKey thay vì hardcode format
 * Root cause: `${section}-part${part}-q${q}` ≠ generateAnswerKey output
 */

import React, { memo } from 'react';
import { CheckCircle, Circle, Lock, AlertCircle } from 'lucide-react';
import { generateAnswerKey } from '../../utils/answerKey'; // ✅ FIX

export const PartNavigation = memo(({
  currentPart,
  totalParts,
  startPartNumber,
  answers,
  section,
  questionsPerPart,
  onPartChange,
  playedParts = [],
  isAudioPlaying = false,
}) => {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      padding: '24px',
    }}>
      <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#0f172a', marginBottom: '16px' }}>
        {section === 'listening' ? 'Listening Parts' : 'Reading Parts'}
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
      }}>
        {Array.from({ length: totalParts }, (_, idx) => {
          const partNumber = startPartNumber + idx; // ABSOLUTE part number
          // ✅ FIX: dùng generateAnswerKey để đếm đúng
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
      <div style={{
        marginTop: '20px', paddingTop: '16px',
        borderTop: '1px solid #e2e8f0',
        display: 'flex', flexWrap: 'wrap', gap: '16px',
        fontSize: '12px', color: '#64748b',
      }}>
        {[
          { icon: <CheckCircle size={14} color="#16a34a" />, label: 'Completed' },
          { icon: <Circle size={14} color="#2563eb" />,      label: 'Current' },
          { icon: <AlertCircle size={14} color="#d97706" />, label: 'In Progress' },
          { icon: <Lock size={14} color="#94a3b8" />,        label: 'Locked' },
        ].map(({ icon, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {icon} {label}
          </div>
        ))}
      </div>

      {section === 'listening' && (
        <div style={{
          marginTop: '12px', padding: '10px 14px',
          background: '#fffbeb', borderRadius: '8px',
          border: '1px solid #fde68a',
          fontSize: '12px', color: '#92400e',
        }}>
          <strong>Lưu ý:</strong> Sau khi nghe xong một phần, bạn không thể quay lại.
        </div>
      )}
    </div>
  );
});

PartNavigation.displayName = 'PartNavigation';

/* ── PartButton ── */
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
  let bg     = '#fff';
  let border = '#e2e8f0';
  let color  = '#0f172a';
  let icon   = <Circle size={20} color="#2563eb" />;

  if (isLocked) {
    bg = '#f8fafc'; border = '#cbd5e1'; color = '#94a3b8';
    icon = <Lock size={20} color="#94a3b8" />;
  } else if (isCompleted) {
    bg = '#f0fdf4'; border = '#86efac'; color = '#14532d';
    icon = <CheckCircle size={20} color="#16a34a" />;
  } else if (isCurrent) {
    bg = '#eff6ff'; border = '#2563eb'; color = '#1e3a8a';
    icon = <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#2563eb' }} />;
  } else if (answerCount > 0) {
    bg = '#fffbeb'; border = '#fcd34d'; color = '#78350f';
    icon = <AlertCircle size={20} color="#d97706" />;
  }

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      style={{
        padding: '12px 8px',
        borderRadius: '10px',
        border: `2px solid ${border}`,
        background: bg,
        color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.15s',
        fontFamily: 'inherit',
        width: '100%',
      }}
    >
      {icon}
      <span style={{ fontWeight: 700, fontSize: '13px' }}>Part {partNumber}</span>
      <span style={{ fontSize: '11px', fontWeight: 600 }}>{answerCount}/{totalQuestions}</span>
      {isCompleted && <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: 700 }}>✓ Done</span>}
      {isCurrent && !isCompleted && <span style={{ fontSize: '10px', color: '#2563eb', fontWeight: 700 }}>Current</span>}
      {isLocked && <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>Locked</span>}
    </button>
  );
});

PartButton.displayName = 'PartButton';

/* ── FIX: countAnswersInPart dùng generateAnswerKey ── */
function countAnswersInPart(answers, section, part, questionsPerPart) {
  let count = 0;
  for (let q = 1; q <= questionsPerPart; q++) {
    // ✅ FIX: generateAnswerKey thay vì `${section}-part${part}-q${q}`
    const key = generateAnswerKey({ section, part, question: q });
    if (answers[key] !== undefined) count++;
  }
  return count;
}

export default PartNavigation;
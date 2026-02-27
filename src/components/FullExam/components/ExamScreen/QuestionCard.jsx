/* src/components/FullExam/components/ExamScreen/QuestionCard.jsx */
/* Material Design 3 · WCAG 2.1 AA · Mobile-first · Core Web Vitals optimised */

import React, { memo, useCallback, useId } from 'react';

/* ─────────────────────────────────────────────
   Design tokens (MD3-aligned)
   ───────────────────────────────────────────── */
const tokens = {
  primary:       '#1565C0',   // MD3 primary
  primaryLight:  '#E3F2FD',   // primary-container
  primaryDark:   '#0D47A1',
  surface:       '#FFFFFF',
  surfaceVar:    '#F5F7FA',
  outline:       '#C9D3DF',
  outlineHover:  '#90A4AE',
  onSurface:     '#1A2330',
  onSurfaceMed:  '#4A5568',
  onSurfaceLow:  '#718096',
  success:       '#2E7D32',
  successLight:  '#E8F5E9',
  radius:        '12px',
  radiusSm:      '8px',
  elevation1:    '0 1px 3px rgba(0,0,0,.10), 0 1px 2px rgba(0,0,0,.06)',
  elevation2:    '0 3px 8px rgba(0,0,0,.10), 0 1px 3px rgba(0,0,0,.06)',
  transition:    'all .18s cubic-bezier(.4,0,.2,1)',
};

/* ─────────────────────────────────────────────
   Global styles injected once
   ───────────────────────────────────────────── */
const STYLE_ID = '__qcard_styles__';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    /* Respect motion preferences */
    @media (prefers-reduced-motion: reduce) {
      .qcard-opt { transition: none !important; }
      .qcard-opt:focus-visible { transition: none !important; }
    }

    /* Keyboard focus ring — visible, never clipped */
    .qcard-opt:focus-visible {
      outline: 3px solid ${tokens.primary};
      outline-offset: 2px;
    }
    .qcard-opt:focus:not(:focus-visible) { outline: none; }

    /* Ripple effect (MD) */
    .qcard-opt {
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }
    .qcard-opt::after {
      content: '';
      position: absolute;
      inset: 0;
      background: ${tokens.primary};
      opacity: 0;
      transition: opacity .2s;
    }
    .qcard-opt:active::after { opacity: .08; }

    /* State layer on selected */
    .qcard-opt[aria-pressed="true"]::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${tokens.primary};
      opacity: .05;
      pointer-events: none;
    }

    /* Touch target – minimum 48 × 48 px (WCAG 2.5.5) */
    .qcard-opt { min-height: 56px; }

    @media (min-width: 640px) {
      .qcard-opt { min-height: 52px; }
    }
  `;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────────────
   Inline-style helpers (no Tailwind dependency)
   ───────────────────────────────────────────── */
const s = {
  card: {
    background: tokens.surface,
    border: `1px solid ${tokens.outline}`,
    borderRadius: tokens.radius,
    padding: '24px 20px',
    boxShadow: tokens.elevation1,
    transition: tokens.transition,
    contain: 'content', // CWV: layout containment
  },
  cardHover: {
    boxShadow: tokens.elevation2,
    borderColor: tokens.outlineHover,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: tokens.primary,
    background: tokens.primaryLight,
    padding: '3px 10px',
    borderRadius: '100px',
    marginBottom: '12px',
    userSelect: 'none',
  },
  questionText: {
    fontSize: 'clamp(15px, 2.5vw, 17px)',
    fontWeight: 600,
    lineHeight: 1.55,
    color: tokens.onSurface,
    margin: '0 0 6px',
  },
  hint: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
    fontSize: '13px',
    color: tokens.onSurfaceLow,
    fontStyle: 'italic',
    marginTop: '10px',
    padding: '8px 12px',
    background: tokens.surfaceVar,
    borderRadius: tokens.radiusSm,
    borderLeft: `3px solid ${tokens.outline}`,
    lineHeight: 1.5,
  },
  divider: {
    border: 'none',
    borderTop: `1px solid ${tokens.outline}`,
    margin: '20px 0 16px',
  },
  optList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  selectedTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: 700,
    color: tokens.success,
    padding: '8px 14px',
    background: tokens.successLight,
    borderRadius: tokens.radiusSm,
    marginTop: '18px',
  },
};

/* ─────────────────────────────────────────────
   SVG icons (inline – zero network request)
   ───────────────────────────────────────────── */
const IconCircle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="10" stroke="#90A4AE" strokeWidth="2"/>
  </svg>
);

const IconChecked = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="10" fill={tokens.primary}/>
    <path d="M7.5 12.5l3 3 6-6" stroke="#fff" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconHint = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    aria-hidden="true" focusable="false" style={{flexShrink:0, marginTop:'2px'}}>
    <circle cx="12" cy="12" r="10" stroke={tokens.onSurfaceLow} strokeWidth="2"/>
    <path d="M12 8v4m0 4h.01" stroke={tokens.onSurfaceLow} strokeWidth="2"
      strokeLinecap="round"/>
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    aria-hidden="true" focusable="false">
    <path d="M5 13l4 4L19 7" stroke={tokens.success} strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─────────────────────────────────────────────
   OptionButton
   ───────────────────────────────────────────── */
const OptionButton = memo(({
  option,
  isSelected,
  onSelect,
  optionLabel,
  groupId,
  optionId,
}) => {
  const optStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: tokens.radiusSm,
    border: isSelected
      ? `2px solid ${tokens.primary}`
      : `2px solid ${tokens.outline}`,
    background: isSelected ? tokens.primaryLight : tokens.surface,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    textAlign: 'left',
    transition: tokens.transition,
    color: tokens.onSurface,
    fontFamily: 'inherit',
  };

  return (
    <li role="none">
      {/* Using <button> with role="radio" semantics via aria-pressed */}
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        aria-describedby={`${groupId}-label`}
        id={optionId}
        className="qcard-opt"
        onClick={onSelect}
        style={optStyle}
      >
        {/* Icon */}
        <span style={{ flexShrink: 0, lineHeight: 0 }}
          aria-hidden="true">
          {isSelected ? <IconChecked /> : <IconCircle />}
        </span>

        {/* Label */}
        <span style={{
          flex: 1,
          fontSize: 'clamp(13px, 2vw, 15px)',
          fontWeight: isSelected ? 600 : 400,
          lineHeight: 1.5,
          color: isSelected ? tokens.primary : tokens.onSurface,
        }}>
          <span style={{
            fontWeight: 700,
            marginRight: '6px',
            color: isSelected ? tokens.primary : tokens.onSurfaceMed,
          }}>{optionLabel}.</span>
          {option}
        </span>

        {/* Selected chip */}
        {isSelected && (
          <span style={{
            flexShrink: 0,
            fontSize: '11px',
            fontWeight: 700,
            color: tokens.primary,
            background: tokens.surface,
            border: `1px solid ${tokens.primary}`,
            borderRadius: '100px',
            padding: '2px 10px',
            letterSpacing: '.04em',
          }} aria-hidden="true">
            Selected
          </span>
        )}
      </button>
    </li>
  );
});
OptionButton.displayName = 'OptionButton';

/* ─────────────────────────────────────────────
   QuestionCard
   ───────────────────────────────────────────── */
export const QuestionCard = memo(({
  question,
  questionNum,
  selectedAnswer,
  onAnswerSelect,
  questionKey,
}) => {
  const groupId = useId();
  const [hovered, setHovered] = React.useState(false);

  const handleSelect = useCallback(
    (idx) => onAnswerSelect(idx),
    [onAnswerSelect],
  );

  if (!question) return null;

  const options = question.options || [];

  return (
    <article
      aria-labelledby={`${groupId}-heading`}
      style={{ ...s.card, ...(hovered ? s.cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Question header ── */}
      <header>
        <div style={s.badge} aria-label={`Question ${questionNum}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <circle cx="5" cy="5" r="5" fill={tokens.primary}/>
          </svg>
          Question {questionNum}
        </div>

        <p id={`${groupId}-heading`} style={s.questionText}>
          {question.question || 'No question text'}
        </p>

        {question.hint && (
          <p style={s.hint} role="note" aria-label="Hint">
            <IconHint />
            <span><strong>Hint:</strong> {question.hint}</span>
          </p>
        )}
      </header>

      <hr style={s.divider} aria-hidden="true" />

      {/* ── Options ── */}
      <fieldset
        style={{ border: 'none', margin: 0, padding: 0 }}
        aria-labelledby={`${groupId}-heading`}
      >
        {/* Hidden legend for SR */}
        <legend style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
        }}>
          Choose one answer for question {questionNum}
        </legend>

        {options.length > 0 ? (
          <ul style={s.optList} role="radiogroup"
            aria-label={`Answer options for question ${questionNum}`}>
            {options.map((option, idx) => (
              <OptionButton
                key={`${questionKey}-option-${idx}`}
                option={option}
                optionIndex={idx}
                isSelected={selectedAnswer === idx}
                onSelect={() => handleSelect(idx)}
                optionLabel={String.fromCharCode(65 + idx)}
                groupId={groupId}
                optionId={`${groupId}-opt-${idx}`}
              />
            ))}
          </ul>
        ) : (
          <p style={{ color: tokens.onSurfaceLow, fontSize: '14px' }}
            role="status">
            No options available for this question.
          </p>
        )}
      </fieldset>

      {/* ── Confirmation strip ── */}
      {selectedAnswer !== undefined && (
        <div style={s.selectedTag} role="status"
          aria-live="polite" aria-atomic="true">
          <IconCheck />
          Answer {String.fromCharCode(65 + selectedAnswer)} selected
        </div>
      )}
    </article>
  );
});

QuestionCard.displayName = 'QuestionCard';
export default QuestionCard;
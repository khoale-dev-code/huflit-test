import React, { memo, useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────
   Global styles – injected once
   ───────────────────────────────────────────────────────────── */
const STYLE_ID = '__stepindicator_styles__';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    /* DM Sans for a friendly-yet-professional EdTech feel */
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

    .si-root { font-family: 'DM Sans', system-ui, sans-serif; }

    /* ── Node animations ── */
    @keyframes siBounce {
      0%, 100% { transform: translateY(0) scale(1); }
      40%       { transform: translateY(-6px) scale(1.08); }
      60%       { transform: translateY(-3px) scale(1.04); }
    }
    @keyframes siUnlock {
      0%   { transform: scale(.7) rotate(-15deg); opacity: 0; }
      60%  { transform: scale(1.1) rotate(4deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes siStarPop {
      0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
      70%  { transform: scale(1.2) rotate(8deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes siXpFly {
      0%   { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-28px); }
    }
    @keyframes siPathFill {
      from { stroke-dashoffset: 100; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes siShake {
      0%, 100% { transform: rotate(0); }
      20%       { transform: rotate(-8deg); }
      60%       { transform: rotate(8deg); }
      80%       { transform: rotate(-4deg); }
    }

    /* Confetti particle */
    @keyframes siConfettiDrop {
      0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(60px) rotate(720deg); opacity: 0; }
    }

    /* Streak flame flicker */
    @keyframes siFlicker {
      0%, 100% { transform: scaleY(1) scaleX(1); }
      30%       { transform: scaleY(1.07) scaleX(.95); }
      70%       { transform: scaleY(.95) scaleX(1.04); }
    }

    /* Trail animation (SVG path dash) */
    .si-trail { stroke-dasharray: 100; stroke-dashoffset: 100; }
    .si-trail-filled {
      animation: siPathFill .6s cubic-bezier(.4,0,.2,1) forwards;
    }

    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
      [class^="si-"], [class*=" si-"] {
        animation: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(s);
}

/* ─────────────────────────────────────────────────────────────
   Confetti burst (DOM-based, lightweight, no library)
   ───────────────────────────────────────────────────────────── */
const CONFETTI_COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6', '#EC4899'];

function burstConfetti(anchorEl) {
  if (!anchorEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = anchorEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2 + window.scrollY;

  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('div');
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const size = 5 + Math.random() * 5;
    const angle = (Math.PI * 2 * i) / 18;
    const spread = 30 + Math.random() * 40;

    Object.assign(dot.style, {
      position: 'fixed',
      left: `${cx + Math.cos(angle) * spread}px`,
      top:  `${cy + Math.sin(angle) * spread}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: Math.random() > .5 ? '50%' : '2px',
      background: color,
      pointerEvents: 'none',
      zIndex: 9999,
      animation: `siConfettiDrop ${.6 + Math.random() * .5}s ease-out forwards`,
      animationDelay: `${Math.random() * .2}s`,
    });
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 1200);
  }
}

/* ─────────────────────────────────────────────────────────────
   XP Flyout
   ───────────────────────────────────────────────────────────── */
const XpFlyout = memo(({ xp, visible }) => (
  <div style={{
    position: 'absolute',
    top: '-8px', left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '11px', fontWeight: 800,
    color: '#F59E0B',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    opacity: visible ? 1 : 0,
    animation: visible ? 'siXpFly .9s ease-out forwards' : 'none',
    zIndex: 10,
    textShadow: '0 1px 3px rgba(0,0,0,.15)',
  }}>
    +{xp} XP
  </div>
));
XpFlyout.displayName = 'XpFlyout';

/* ─────────────────────────────────────────────────────────────
   Streak Flame
   ───────────────────────────────────────────────────────────── */
const StreakFlame = memo(({ count }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '3px 9px',
    borderRadius: 100,
    background: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#FCD34D',
    fontSize: 11,
    fontWeight: 700,
    color: '#92400E',
  }}>
    <span style={{ animation: 'siFlicker 1.4s ease-in-out infinite', display: 'inline-block' }}>
      🔥
    </span>
    {count}-day streak
  </div>
));
StreakFlame.displayName = 'StreakFlame';

/* ─────────────────────────────────────────────────────────────
   Step node icons (inline SVG — no emoji, no external library)
   ───────────────────────────────────────────────────────────── */
const NodeIcon = memo(({ type, size = 24 }) => {
  const icons = {
    setup: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9h18M8 4v5M16 4v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 13h4M7 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    listening: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 11a9 9 0 0118 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 11v3a2 2 0 004 0v-3" stroke="currentColor" strokeWidth="2"/>
        <path d="M17 11v3a2 2 0 004 0v-3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    reading: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    results: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    check: (
      <svg width={size * .7} height={size * .7} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    lock: (
      <svg width={size * .7} height={size * .7} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[type] || null;
});
NodeIcon.displayName = 'NodeIcon';

/* ─────────────────────────────────────────────────────────────
   Step config
   ───────────────────────────────────────────────────────────── */
const STEPS = [
  { id: 'setup',     label: 'Select Exam',   subLabel: 'Choose',      xp: 0,  iconType: 'setup'     },
  { id: 'listening', label: 'Listening',     subLabel: '30 min',      xp: 10, iconType: 'listening' },
  { id: 'reading',   label: 'Reading',       subLabel: '60 min',      xp: 20, iconType: 'reading'   },
  { id: 'results',   label: 'Results',       subLabel: 'Your score',  xp: 5,  iconType: 'results'   },
];

/* ─────────────────────────────────────────────────────────────
   Single step node
   ───────────────────────────────────────────────────────────── */
const StepNode = memo(({ step, idx, isCompleted, isCurrent, isLocked, showXp, nodeRef }) => {
  const [hovered, setHovered] = useState(false);

  const nodeSize = isCurrent ? 56 : 48;
  const bg =
    isCompleted ? { bg: '#059669', borderColor: '#047857', shadow: '0 4px 16px rgba(5,150,105,.35)' }
    : isCurrent  ? { bg: '#2563EB', borderColor: '#1D4ED8', shadow: '0 4px 20px rgba(37,99,235,.40)' }
    : isLocked   ? { bg: '#F1F5F9', borderColor: '#E2E8F0', shadow: 'none' }
                 : { bg: '#F8FAFC', borderColor: '#E2E8F0', shadow: 'none' };

  const animation = isCurrent
    ? 'siBounce 2.2s cubic-bezier(.36,.07,.19,.97) infinite'
    : isCompleted
    ? 'siUnlock .5s cubic-bezier(.4,0,.2,1) both'
    : 'none';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* XP flyout */}
      {step.xp > 0 && <XpFlyout xp={step.xp} visible={showXp} />}

      {/* Tooltip (desktop hover) */}
      {hovered && !isCurrent && (
        <div style={{
          position: 'absolute', bottom: '110%', left: '50%',
          transform: 'translateX(-50%)',
          background: '#0F172A', color: '#fff',
          padding: '5px 10px', borderRadius: 7,
          fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
          pointerEvents: 'none', zIndex: 20,
          boxShadow: '0 4px 12px rgba(0,0,0,.25)',
        }}>
          {isLocked ? '🔒 Complete previous step' : step.label}
          <div style={{
            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
            borderTop: '5px solid #0F172A',
          }} />
        </div>
      )}

      {/* Node button */}
      <button
        ref={nodeRef}
        disabled
        role="listitem"
        aria-current={isCurrent ? 'step' : undefined}
        aria-label={`Step ${idx + 1}: ${step.label}${isCompleted ? ' — completed' : isCurrent ? ' — current' : isLocked ? ' — locked' : ''}`}
        tabIndex={-1}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: nodeSize, height: nodeSize,
          borderRadius: '50%',
          background: bg.bg,
          borderWidth: '2.5px',
          borderStyle: 'solid',
          borderColor: bg.borderColor,
          boxShadow: bg.shadow,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'default',
          flexShrink: 0,
          position: 'relative',
          transition: 'all .2s cubic-bezier(.4,0,.2,1)',
          animation,
          color: isLocked ? '#94A3B8' : '#fff',
        }}
      >
        {/* Star badge on completed */}
        {isCompleted && (
          <span style={{
            position: 'absolute', top: -6, right: -6,
            fontSize: 14, lineHeight: 1,
            animation: 'siStarPop .4s .1s cubic-bezier(.4,0,.2,1) both',
          }} aria-hidden="true">⭐</span>
        )}

        {/* Icon */}
        {isCompleted ? (
          <NodeIcon type="check" size={nodeSize * .55} />
        ) : isLocked ? (
          <span style={{ animation: hovered ? 'siShake .4s ease-in-out' : 'none' }}>
            <NodeIcon type="lock" size={nodeSize * .55} />
          </span>
        ) : (
          <NodeIcon type={step.iconType} size={nodeSize * .5} />
        )}
      </button>

      {/* Step label (hidden on xs, visible sm+) */}
      <div style={{ marginTop: 8, textAlign: 'center', maxWidth: 70 }}>
        <p style={{
          fontSize: 11, fontWeight: isCurrent ? 700 : 600,
          color: isCompleted || isCurrent ? '#0F172A' : '#94A3B8',
          margin: 0, lineHeight: 1.3,
          /* Hide label on very small screens */
          display: 'none',
        }} className="si-label">
          {step.label}
        </p>
        {isCurrent && (
          <p style={{
            fontSize: 10, color: '#2563EB', fontWeight: 700,
            margin: '2px 0 0', display: 'none',
          }} className="si-sublabel">
            {step.subLabel}
          </p>
        )}
      </div>
    </div>
  );
});
StepNode.displayName = 'StepNode';

/* ─────────────────────────────────────────────────────────────
   Connector trail between nodes
   ───────────────────────────────────────────────────────────── */
const Trail = memo(({ filled }) => (
  <div style={{ flex: 1, height: 6, borderRadius: 100, position: 'relative', background: '#E2E8F0', margin: '0 6px' }}>
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 100,
      background: 'linear-gradient(90deg,#059669,#10B981)',
      transformOrigin: 'left',
      transform: filled ? 'scaleX(1)' : 'scaleX(0)',
      transition: 'transform .6s cubic-bezier(.4,0,.2,1)',
    }} />
    {/* Animated shimmer on filled trail */}
    {filled && (
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 100,
        background: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,.4) 50%,transparent 100%)',
        animation: 'siPathFill .8s ease-out',
      }} />
    )}
  </div>
));
Trail.displayName = 'Trail';

/* ─────────────────────────────────────────────────────────────
   MAIN StepIndicator
   ───────────────────────────────────────────────────────────── */
const StepIndicator = memo(({ currentMode, listeningComplete = false, streakDays = 3 }) => {
  let currentIndex = 0;
  if (currentMode === 'results') currentIndex = 3;
  else if (currentMode === 'exam' && listeningComplete) currentIndex = 2;
  else if (currentMode === 'exam') currentIndex = 1;

  /* Track which step was previously completed to trigger XP + confetti */
  const prevIndexRef = useRef(currentIndex);
  const [xpVisibleIdx, setXpVisibleIdx] = useState(null);
  const nodeRefs     = useRef([]);

  useEffect(() => {
    if (currentIndex > prevIndexRef.current) {
      const completedIdx = currentIndex - 1;
      setXpVisibleIdx(completedIdx);
      burstConfetti(nodeRefs.current[completedIdx]);
      const t = setTimeout(() => setXpVisibleIdx(null), 1000);
      prevIndexRef.current = currentIndex;
      return () => clearTimeout(t);
    }
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  const totalXp = STEPS.slice(0, currentIndex).reduce((s, st) => s + st.xp, 0);

  return (
    <div className="si-root" style={{ userSelect: 'none' }}>

      {/* ── Responsive label visibility hack (CSS media query via inline style tag) ── */}
      <style>{`
        @media (min-width: 480px) {
          .si-label { display: block !important; }
          .si-sublabel { display: block !important; }
        }
      `}</style>

      {/* ── Top meta bar: XP + streak ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14, flexWrap: 'wrap', gap: 8,
      }}>
        {/* XP total */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '3px 10px', borderRadius: 100,
          background: '#EFF6FF', 
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#BFDBFE',
          fontSize: 11, fontWeight: 700, color: '#1D4ED8',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {totalXp} XP earned
        </div>

        {/* Streak */}
        {streakDays > 0 && <StreakFlame count={streakDays} />}
      </div>

      {/* ── Step path ── */}
      <div
        role="list"
        aria-label="Exam progress steps"
        style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
      >
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent   = idx === currentIndex;
          const isLocked    = idx > currentIndex;
          const showXp      = xpVisibleIdx === idx;

          return (
            <React.Fragment key={step.id}>
              <StepNode
                step={step}
                idx={idx}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isLocked={isLocked}
                showXp={showXp}
                nodeRef={el => nodeRefs.current[idx] = el}
              />
              {idx < STEPS.length - 1 && (
                <Trail filled={idx < currentIndex} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Bottom: step label row (sm+) + progress fraction ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 10, gap: 8,
      }}>
        {/* Current step label */}
        <p style={{
          fontSize: 12, fontWeight: 600,
          color: '#475569', margin: 0,
        }}>
          <span style={{ color: '#2563EB', fontWeight: 700 }}>
            {STEPS[currentIndex]?.label}
          </span>
          {' '}— step {currentIndex + 1} of {STEPS.length}
        </p>

        {/* Compact progress pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '3px 10px', borderRadius: 100,
          background: '#F0FDF4',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#BBF7D0',
          fontSize: 11, fontWeight: 700, color: '#065F46',
        }}>
          {Math.round((currentIndex / STEPS.length) * 100)}% complete
        </div>
      </div>
    </div>
  );
});

StepIndicator.displayName = 'StepIndicator';
export default StepIndicator;

/* ─────────────────────────────────────────────────────────────
   Minimal variant (for compact header contexts)
   ───────────────────────────────────────────────────────────── */
export const StepIndicatorMinimal = memo(({ currentMode, listeningComplete = false }) => {
  let currentIndex = 0;
  if (currentMode === 'results') currentIndex = 3;
  else if (currentMode === 'exam' && listeningComplete) currentIndex = 2;
  else if (currentMode === 'exam') currentIndex = 1;

  return (
    <div className="si-root" role="list" aria-label="Exam steps"
      style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {STEPS.map((step, idx) => {
        const done    = idx < currentIndex;
        const current = idx === currentIndex;
        return (
          <React.Fragment key={step.id}>
            <div
              role="listitem"
              aria-current={current ? 'step' : undefined}
              aria-label={`${step.label}${done ? ' — done' : current ? ' — current' : ''}`}
              style={{
                width: current ? 36 : 28, height: current ? 36 : 28,
                borderRadius: '50%',
                background: done ? '#059669' : current ? '#2563EB' : '#E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: done || current ? '#fff' : '#94A3B8',
                flexShrink: 0,
                transition: 'all .2s cubic-bezier(.4,0,.2,1)',
                boxShadow: current ? '0 2px 10px rgba(37,99,235,.35)' : 'none',
              }}
            >
              {done
                ? <NodeIcon type="check" size={14} />
                : <NodeIcon type={step.iconType} size={current ? 18 : 14} />
              }
            </div>
            {idx < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 3, borderRadius: 100,
                background: idx < currentIndex ? '#059669' : '#E2E8F0',
                transition: 'background .4s ease',
                minWidth: 12,
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
});
StepIndicatorMinimal.displayName = 'StepIndicatorMinimal';
/* src/components/FullExam/components/Warnings/TimeWarning.jsx */
// Material Design 3 – Time Warning Banner
// ─────────────────────────────────────────────────────────────
// Dùng M3 tokens: tonal surface, shape.large, elevation.level2
// Animation: slide-down từ top + auto-dismiss sau 8s
// ─────────────────────────────────────────────────────────────

import React, { memo, useEffect, useState, useRef } from 'react';

// ── Inline keyframes (không cần file CSS riêng) ──────────────
const STYLES = `
@keyframes tw-slide-in {
  from { opacity: 0; transform: translateX(-50%) translateY(-16px) scale(0.96); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);    }
}
@keyframes tw-slide-out {
  from { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);    }
  to   { opacity: 0; transform: translateX(-50%) translateY(-16px) scale(0.96); }
}
@keyframes tw-progress {
  from { width: 100%; }
  to   { width: 0%;   }
}
@keyframes tw-pulse-ring {
  0%   { transform: scale(1);    opacity: 0.6; }
  50%  { transform: scale(1.35); opacity: 0;   }
  100% { transform: scale(1);    opacity: 0;   }
}
`;

// ── Color tokens theo M3 Warning / Error tonal ───────────────
const TOKENS = {
  listening: {
    bg:          '#FFF8E1',   // M3 tertiary-container tinted
    border:      '#F9A825',
    iconBg:      '#FFF3CD',
    iconColor:   '#E65100',
    titleColor:  '#3E2723',
    bodyColor:   '#4E342E',
    progressBg:  '#FFE082',
    progressFill:'#E65100',
    badgeBg:     '#FFE0B2',
    badgeText:   '#BF360C',
    ripple:      '#FF8F00',
  },
  reading: {
    bg:          '#FCE4EC',
    border:      '#E91E63',
    iconBg:      '#FCE4EC',
    iconColor:   '#880E4F',
    titleColor:  '#1A0010',
    bodyColor:   '#4A0020',
    progressBg:  '#F8BBD0',
    progressFill:'#C2185B',
    badgeBg:     '#F8BBD0',
    badgeText:   '#880E4F',
    ripple:      '#E91E63',
  },
};

// ── Icon SVG (clock với exclamation) ─────────────────────────
const TimerAlertIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
      fill={color}
      opacity="0.15"
    />
    <path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
      stroke={color}
      strokeWidth="1.8"
    />
    <path d="M12 7v5.5l3.5 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="17.5" r="0.8" fill={color} />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ── Main Component ────────────────────────────────────────────
export const TimeWarning = memo(({
  visible,
  section = 'listening',
  isLastListeningPart = false,
  timeLeft = 0,
}) => {
  const [mounted,   setMounted]   = useState(false);
  const [animOut,   setAnimOut]   = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const dismissTimer = useRef(null);
  const styleInjected = useRef(false);

  // Inject keyframes 1 lần
  if (!styleInjected.current && typeof document !== 'undefined') {
    const el = document.createElement('style');
    el.textContent = STYLES;
    document.head.appendChild(el);
    styleInjected.current = true;
  }

  // Mount / unmount với animation
  useEffect(() => {
    if (visible && !dismissed) {
      setMounted(true);
      setAnimOut(false);

      // Auto-dismiss sau 8s
      dismissTimer.current = setTimeout(() => handleDismiss(), 8000);
    }
    return () => clearTimeout(dismissTimer.current);
  }, [visible]);

  // Reset dismissed khi visible → false → true lại (section mới)
  useEffect(() => {
    if (!visible) setDismissed(false);
  }, [visible]);

  const handleDismiss = () => {
    setAnimOut(true);
    setTimeout(() => {
      setMounted(false);
      setDismissed(true);
    }, 280);
  };

  if (!mounted || dismissed) return null;

  const t = TOKENS[section] ?? TOKENS.listening;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeStr = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

  const title = section === 'listening'
    ? 'Còn 5 phút – Listening'
    : 'Còn 5 phút – Reading';

  const body = section === 'listening'
    ? isLastListeningPart
      ? 'Đây là phần nghe cuối cùng. Sau khi kết thúc sẽ chuyển sang Reading (60 phút).'
      : 'Thời gian Listening sắp hết. Hãy kiểm tra lại các câu chưa trả lời.'
    : 'Đây là phần cuối. Sau khi hết giờ bài thi sẽ tự nộp.';

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        position:  'fixed',
        top:       '76px',
        left:      '50%',
        transform: 'translateX(-50%)',
        zIndex:    50,
        width:     'min(420px, calc(100vw - 32px))',
        animation: animOut
          ? 'tw-slide-out 0.28s cubic-bezier(0.4,0,1,1) forwards'
          : 'tw-slide-in  0.36s cubic-bezier(0.05,0.7,0.1,1) forwards',
      }}
    >
      {/* ── Card ── */}
      <div style={{
        background:   t.bg,
        border:       `1.5px solid ${t.border}`,
        borderRadius: '16px',
        boxShadow:    '0 4px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
        overflow:     'hidden',
      }}>

        {/* Progress bar (auto-dismiss countdown) */}
        <div style={{ height: '3px', background: t.progressBg, borderRadius: '2px 2px 0 0' }}>
          <div style={{
            height: '100%',
            background: t.progressFill,
            borderRadius: '2px',
            animation: 'tw-progress 8s linear forwards',
          }} />
        </div>

        <div style={{ padding: '14px 16px 16px' }}>
          {/* ── Header row ── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>

            {/* Icon with pulse ring */}
            <div style={{ position: 'relative', flexShrink: 0, marginTop: '1px' }}>
              <div style={{
                position:     'absolute',
                inset:        0,
                borderRadius: '50%',
                border:       `2px solid ${t.ripple}`,
                animation:    'tw-pulse-ring 1.8s ease-out infinite',
              }} />
              <div style={{
                width: '40px', height: '40px',
                borderRadius: '50%',
                background: t.iconBg,
                border: `1.5px solid ${t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <TimerAlertIcon color={t.iconColor} />
              </div>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: 700,
                  color: t.titleColor,
                  lineHeight: 1.3,
                }}>
                  {title}
                </p>
                {/* Time badge */}
                <span style={{
                  padding: '1px 8px',
                  borderRadius: '999px',
                  background: t.badgeBg,
                  color: t.badgeText,
                  fontSize: '12px',
                  fontWeight: 800,
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '0.02em',
                  border: `1px solid ${t.border}`,
                }}>
                  {timeStr}
                </span>
              </div>
              <p style={{
                margin: '5px 0 0',
                fontSize: '13px',
                color: t.bodyColor,
                lineHeight: 1.5,
              }}>
                {body}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              aria-label="Đóng thông báo"
              style={{
                flexShrink: 0,
                width: '32px', height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: 'transparent',
                color: t.bodyColor,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
                marginTop: '-2px',
                marginRight: '-4px',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <CloseIcon />
            </button>
          </div>

          {/* ── Section indicator pills ── */}
          <div style={{
            display: 'flex', gap: '6px', marginTop: '12px',
            paddingTop: '10px',
            borderTop: `1px solid ${t.progressBg}`,
          }}>
            {[
              { label: 'Listening', mins: 30, active: section === 'listening' },
              { label: 'Reading',   mins: 60, active: section === 'reading'   },
            ].map(({ label, mins: m, active }) => (
              <div key={label} style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '10px',
                background: active ? t.badgeBg   : 'rgba(0,0,0,0.04)',
                border:     active ? `1px solid ${t.border}` : '1px solid transparent',
                textAlign:  'center',
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '11px',
                  fontWeight: active ? 700 : 500,
                  color: active ? t.badgeText : '#78909C',
                  lineHeight: 1.2,
                }}>
                  {label}
                </p>
                <p style={{
                  margin: '2px 0 0',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: active ? t.titleColor : '#90A4AE',
                }}>
                  {m} phút
                </p>
              </div>
            ))}
            <div style={{
              flex: 1,
              padding: '6px 10px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.04)',
              textAlign:  'center',
            }}>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 500, color: '#78909C', lineHeight: 1.2 }}>
                Tổng
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 700, color: '#546E7A' }}>
                90 phút
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TimeWarning.displayName = 'TimeWarning';
export default TimeWarning;
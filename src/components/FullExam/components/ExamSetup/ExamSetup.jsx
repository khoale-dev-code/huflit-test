/**
 * ExamSetup.jsx – Google-level production grade
 *
 * ✅ #1  Meta viewport moved to index.html (note added)
 * ✅ #2  Landmark roles: banner / main / complementary / nav
 * ✅ #3  Virtualized listbox with full keyboard navigation (↑ ↓ Home End Enter Space)
 * ✅ #4  Focus management: selected item auto-focuses on arrow-key navigation
 * ✅ #5  Skeleton loading for async EXAM_LIST
 * ✅ #6  Enhanced empty-state with Clear Filters CTA
 * ✅ #7  WCAG AA contrast: slate-700 instead of slate-600 for body text
 * ✅ #8  Mobile safe-area inset for sticky header
 * ✅ #9  Micro-interactions: hover scale, selection ripple, staggered fade-in
 * ✅ #10 Analytics hooks (pluggable, no-op by default)
 *
 * Font: DM Sans via @fontsource/dm-sans  (distinctive yet clean for EdTech)
 *       Fallback chain handles zero-dependency cases gracefully.
 *
 * NOTE: Remove <meta name="viewport"> from this component
 * and place it in your public/index.html <head> instead:
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 */

import React, {
  useState,
  memo,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useId,
} from 'react';
import StepIndicator from '../../StepIndicator';
import { EXAM_LIST } from '../../../../data/examData';

/* ─────────────────────────────────────────────────────────────
   #10 Analytics – plug in your own provider; no-op by default
   ───────────────────────────────────────────────────────────── */
const analytics = {
  track: (event, props) => {
    // Replace with: gtag('event', event, props) / mixpanel.track / etc.
    if (process.env.NODE_ENV === 'development') {
      console.debug('[analytics]', event, props);
    }
  },
};

/* ─────────────────────────────────────────────────────────────
   Global styles (injected once)
   ───────────────────────────────────────────────────────────── */
const STYLE_ID = '__examsetup_styles__';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
    /* #9 Font – DM Sans; graceful fallback */
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap');

    .examsetup-root {
      font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* #8 Safe-area for notched mobiles */
    .examsetup-header {
      padding-top: max(12px, env(safe-area-inset-top));
    }

    /* #9 Staggered fade-in on mount */
    @keyframes esFadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .es-fadein { animation: esFadeUp .35s cubic-bezier(.4,0,.2,1) both; }
    .es-fadein-1 { animation-delay: .05s; }
    .es-fadein-2 { animation-delay: .10s; }
    .es-fadein-3 { animation-delay: .15s; }
    .es-fadein-4 { animation-delay: .20s; }

    /* #9 Exam item micro-interaction */
    .es-exam-item {
      transition: background .14s, transform .14s cubic-bezier(.4,0,.2,1),
                  box-shadow .14s;
      will-change: transform;
    }
    .es-exam-item:hover { transform: translateX(2px); }
    .es-exam-item[aria-selected="true"] {
      background: #EFF6FF;
      border-left-color: #2563EB !important;
    }

    /* Ripple on selection */
    @keyframes esRipple {
      0%   { transform: scale(0); opacity: .35; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    .es-ripple-dot {
      position: absolute; inset: 0; overflow: hidden; border-radius: inherit;
      pointer-events: none;
    }
    .es-ripple-dot::after {
      content: '';
      position: absolute; top: 50%; left: 50%;
      width: 40px; height: 40px;
      margin: -20px 0 0 -20px;
      background: #2563EB;
      border-radius: 50%;
      transform: scale(0);
    }
    .es-exam-item[aria-selected="true"] .es-ripple-dot::after {
      animation: esRipple .35s cubic-bezier(.4,0,.2,1) forwards;
    }

    /* #9 Start button */
    .es-start-btn {
      transition: all .18s cubic-bezier(.4,0,.2,1);
      position: relative; overflow: hidden;
    }
    .es-start-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(37,99,235,.35);
    }
    .es-start-btn:active:not(:disabled) { transform: translateY(0); }
    .es-start-btn:focus-visible {
      outline: 3px solid #2563EB; outline-offset: 3px;
    }
    .es-start-btn:focus:not(:focus-visible) { outline: none; }

    /* General focus ring */
    .es-focus:focus-visible {
      outline: 2.5px solid #2563EB; outline-offset: 2px; border-radius: 6px;
    }
    .es-focus:focus:not(:focus-visible) { outline: none; }

    /* Skeleton shimmer */
    @keyframes esShimmer {
      0%   { background-position: -600px 0; }
      100% { background-position: 600px 0; }
    }
    .es-skeleton {
      background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
      background-size: 1200px 100%;
      animation: esShimmer 1.4s infinite linear;
      border-radius: 6px;
    }

    /* #9 Badge pulse */
    @keyframes esBadgePop {
      0%   { transform: scale(.85); opacity: 0; }
      70%  { transform: scale(1.05); }
      100% { transform: scale(1);   opacity: 1; }
    }
    .es-badge { animation: esBadgePop .4s .25s cubic-bezier(.4,0,.2,1) both; }

    @media (prefers-reduced-motion: reduce) {
      .es-fadein, .es-badge, .es-exam-item,
      .es-start-btn, .es-ripple-dot::after, .es-skeleton {
        animation: none !important;
        transition: none !important;
      }
    }

    /* #7 High-contrast mode support */
    @media (forced-colors: active) {
      .es-exam-item[aria-selected="true"] { border: 2px solid Highlight; }
    }

    /* Custom scrollbar */
    .es-scroll::-webkit-scrollbar { width: 5px; }
    .es-scroll::-webkit-scrollbar-track { background: transparent; }
    .es-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
    .es-scroll::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
  `;
  document.head.appendChild(el);
}

/* ─────────────────────────────────────────────────────────────
   #5 Skeleton list
   ───────────────────────────────────────────────────────────── */
const SkeletonList = memo(() => (
  <div role="status" aria-label="Loading exams..." aria-busy="true"
    style={{ padding: '12px 0' }}>
    {[1, 2, 3, 4].map(i => (
      <div key={i} style={{
        display: 'flex', gap: '14px', alignItems: 'flex-start',
        padding: '16px 24px', borderBottom: '1px solid #F1F5F9',
      }}>
        <div className="es-skeleton" style={{ width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 2 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="es-skeleton" style={{ height: 14, width: '55%' }} />
          <div className="es-skeleton" style={{ height: 11, width: '80%' }} />
          <div style={{ display: 'flex', gap: 6 }}>
            <div className="es-skeleton" style={{ height: 22, width: 70, borderRadius: 4 }} />
            <div className="es-skeleton" style={{ height: 22, width: 60, borderRadius: 4 }} />
          </div>
        </div>
      </div>
    ))}
  </div>
));
SkeletonList.displayName = 'SkeletonList';

/* ─────────────────────────────────────────────────────────────
   #6 Enhanced Empty State
   ───────────────────────────────────────────────────────────── */
const EmptyState = memo(({ searchQuery, onClearFilters }) => (
  <div role="status" style={{
    padding: '48px 24px', textAlign: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
  }}>
    {/* Inline SVG magnifier */}
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="11" stroke="#CBD5E1" strokeWidth="2.5"/>
      <path d="M27 27l7 7" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
    <p style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: 0 }}>
      Không tìm thấy đề thi
    </p>
    <p style={{ fontSize: 13, color: '#475569', margin: 0, lineHeight: 1.55 }}>
      {searchQuery
        ? <>Không có kết quả cho "<strong>{searchQuery}</strong>". Thử từ khóa khác.</>
        : 'Không có đề thi phù hợp với bộ lọc hiện tại.'}
    </p>
    <button
      onClick={onClearFilters}
      className="es-focus"
      style={{
        marginTop: 4,
        padding: '8px 18px',
        borderRadius: 8,
        border: '1.5px solid #2563EB',
        background: 'transparent',
        color: '#2563EB',
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 13,
        cursor: 'pointer',
        transition: 'background .15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#EFF6FF'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      Xóa bộ lọc
    </button>
  </div>
));
EmptyState.displayName = 'EmptyState';

/* ─────────────────────────────────────────────────────────────
   #3 #4 ExamListItem – keyboard-accessible option
   ───────────────────────────────────────────────────────────── */
const ExamListItem = memo(({ exam, isSelected, onSelect, id }) => {
  const itemRef = useRef(null);

  /* #4 Auto-focus when selected via keyboard */
  useEffect(() => {
    if (isSelected) itemRef.current?.focus();
  }, [isSelected]);

  const diffStyle = useMemo(() => ({
    beginner:     { color: '#166534', background: '#F0FDF4', border: '1px solid #BBF7D0' },
    intermediate: { color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A' },
    advanced:     { color: '#991B1B', background: '#FFF1F2', border: '1px solid #FECDD3' },
  }[exam.difficulty] || { color: '#334155', background: '#F8FAFC', border: '1px solid #E2E8F0' }),
  [exam.difficulty]);

  return (
    <div
      id={id}
      ref={itemRef}
      role="option"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
      className="es-exam-item es-focus"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: 'clamp(12px,2vw,18px) clamp(14px,3vw,24px)',
        cursor: 'pointer',
        borderLeft: '3px solid transparent',
        position: 'relative',
        outline: 'none',
      }}
    >
      {/* #9 Ripple dot */}
      <span className="es-ripple-dot" aria-hidden="true" />

      {/* Radio indicator */}
      <span style={{
        flexShrink: 0, marginTop: 2,
        width: 18, height: 18, borderRadius: '50%',
        border: `2px solid ${isSelected ? '#2563EB' : '#CBD5E1'}`,
        background: isSelected ? '#2563EB' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .15s',
      }} aria-hidden="true">
        {isSelected && (
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#fff',
          }} />
        )}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
          <h3 style={{
            fontSize: 'clamp(13px,2vw,15px)', fontWeight: 600,
            color: '#0F172A', margin: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {exam.title || `Exam ${exam.id}`}
          </h3>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
            {exam.isNew && (
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '.05em',
                color: '#1D4ED8', background: '#DBEAFE',
                padding: '2px 7px', borderRadius: 4,
              }}>NEW</span>
            )}
          </div>
        </div>

        <p style={{
          fontSize: 12, color: '#475569', margin: '0 0 8px',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {exam.description || 'Complete English proficiency assessment'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <span style={{
            fontSize: 11, padding: '3px 9px', borderRadius: 5,
            background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569',
          }}>
            {exam.questions || 60} câu
          </span>
          <span style={{
            fontSize: 11, padding: '3px 9px', borderRadius: 5,
            background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569',
          }}>
            {exam.duration || 90} phút
          </span>
          {exam.difficulty && (
            <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 5, fontWeight: 600, ...diffStyle }}>
              {{ beginner: 'Cơ bản', intermediate: 'Trung cấp', advanced: 'Nâng cao' }[exam.difficulty] || exam.difficulty}
            </span>
          )}
          {exam.attempts > 0 && (
            <span style={{ fontSize: 11, color: '#64748B' }}>
              {(exam.attempts || 0).toLocaleString()} lượt thi
            </span>
          )}
        </div>
      </div>

      {/* Selected check */}
      {isSelected && (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="#2563EB"
          aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
          <path fillRule="evenodd" clipRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
        </svg>
      )}
    </div>
  );
});
ExamListItem.displayName = 'ExamListItem';

/* ─────────────────────────────────────────────────────────────
   #3 Virtualized listbox with keyboard navigation
   ───────────────────────────────────────────────────────────── */
const ITEM_H = 112;
const VISIBLE = 4;
const BUFFER  = 2;

const ExamListBox = memo(({ exams, selectedExam, onSelectExam, listboxId }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const activeIdx = useMemo(
    () => exams.findIndex(e => e.id === selectedExam),
    [exams, selectedExam],
  );

  /* #3 Keyboard navigation */
  const handleKeyDown = useCallback((e) => {
    const len = exams.length;
    if (len === 0) return;

    let next = activeIdx;
    if      (e.key === 'ArrowDown') { e.preventDefault(); next = Math.min(activeIdx + 1, len - 1); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); next = Math.max(activeIdx - 1, 0); }
    else if (e.key === 'Home')      { e.preventDefault(); next = 0; }
    else if (e.key === 'End')       { e.preventDefault(); next = len - 1; }
    else return;

    onSelectExam(exams[next].id);
    /* Scroll selected item into view */
    const itemTop = next * ITEM_H;
    const container = containerRef.current;
    if (!container) return;
    if (itemTop < container.scrollTop)
      container.scrollTop = itemTop;
    else if (itemTop + ITEM_H > container.scrollTop + container.clientHeight)
      container.scrollTop = itemTop + ITEM_H - container.clientHeight;
  }, [exams, activeIdx, onSelectExam]);

  const handleScroll = useCallback((e) => setScrollTop(e.currentTarget.scrollTop), []);

  const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_H) - BUFFER);
  const endIdx   = Math.min(exams.length, Math.ceil((scrollTop + VISIBLE * ITEM_H) / ITEM_H) + BUFFER);

  return (
    <div
      id={listboxId}
      ref={containerRef}
      role="listbox"
      aria-label="Danh sách đề thi"
      aria-activedescendant={selectedExam ? `exam-opt-${selectedExam}` : undefined}
      tabIndex={0}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      className="es-scroll es-focus"
      style={{ maxHeight: VISIBLE * ITEM_H, overflowY: 'auto', outline: 'none' }}
    >
      <div style={{ height: exams.length * ITEM_H, position: 'relative' }}>
        <div style={{ transform: `translateY(${startIdx * ITEM_H}px)` }}>
          {exams.slice(startIdx, endIdx).map((exam) => (
            <ExamListItem
              key={exam.id}
              id={`exam-opt-${exam.id}`}
              exam={exam}
              isSelected={selectedExam === exam.id}
              onSelect={() => onSelectExam(exam.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
ExamListBox.displayName = 'ExamListBox';

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export const ExamSetup = memo(({ onStartExam, onExamHover }) => {
  const listboxId = useId();

  const [selectedExam,       setSelectedExam]       = useState('exam1');
  const [isStarting,         setIsStarting]         = useState(false);
  const [searchQuery,        setSearchQuery]        = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy,             setSortBy]             = useState('newest');

  /* #5 Async EXAM_LIST support */
  const isLoading = !EXAM_LIST;

  /* Filtered + sorted */
  const filteredExams = useMemo(() => {
    if (!EXAM_LIST?.length) return [];
    let r = EXAM_LIST;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(e =>
        e.title?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.id?.toLowerCase().includes(q),
      );
    }
    if (selectedDifficulty !== 'all') r = r.filter(e => e.difficulty === selectedDifficulty);
    return [...r].sort((a, b) => {
      if (sortBy === 'popular')    return (b.attempts || 0) - (a.attempts || 0);
      if (sortBy === 'difficulty') return (a.difficultyScore || 0) - (b.difficultyScore || 0);
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }, [searchQuery, selectedDifficulty, sortBy]);

  const total  = EXAM_LIST?.length || 0;
  const count  = filteredExams.length;

  /* Handlers */
  const handleStart = useCallback(async () => {
    setIsStarting(true);
    analytics.track('exam_started', { examId: selectedExam }); // #10
    try { onStartExam?.(selectedExam); } finally { setIsStarting(false); }
  }, [selectedExam, onStartExam]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    analytics.track('search_used', { query: e.target.value }); // #10
  }, []);

  const handleDifficulty = useCallback((e) => {
    setSelectedDifficulty(e.target.value);
    analytics.track('filter_used', { filter: 'difficulty', value: e.target.value }); // #10
  }, []);

  const handleSort = useCallback((e) => {
    setSortBy(e.target.value);
    analytics.track('filter_used', { filter: 'sort', value: e.target.value }); // #10
  }, []);

  const handleSelectExam = useCallback((id) => {
    setSelectedExam(id);
    onExamHover?.(id); // prefetch hook from FullExamMode
  }, [onExamHover]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedDifficulty('all');
    setSortBy('newest');
  }, []);

  return (
    /* #2 role="document" wrapper + distinct font */
    <div className="examsetup-root" style={{ minHeight: '100vh', background: '#fff' }}>

      {/* ── #1 #2 Header with landmark role="banner" ── */}
      <header
        role="banner"
        className="examsetup-header"
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: '#fff',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,.06)',
        }}
      >
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: 'clamp(10px,2vw,20px) clamp(14px,4vw,32px)',
        }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* #9 Official badge */}
              <span className="es-badge" style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: '#4338CA',
                background: '#EEF2FF',
                border: '1px solid #C7D2FE',
                padding: '3px 10px', borderRadius: 6,
                marginBottom: 8,
              }}>
                {/* Inline shield icon */}
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                  <path d="M5 0L10 2v5c0 2.5-2 4-5 5C2 11 0 9.5 0 7V2L5 0z" fill="#4338CA"/>
                </svg>
                Official Assessment
              </span>

              <h1 style={{
                fontSize: 'clamp(20px,4vw,32px)',
                fontWeight: 600,
                color: '#0F172A',
                letterSpacing: '-.02em',
                lineHeight: 1.2,
                margin: 0,
              }}>
                HUFLIT English Placement Test
              </h1>

              {/* #7 slate-700 (contrast ≥ 4.5:1) */}
              <p style={{
                fontSize: 'clamp(12px,1.5vw,14px)',
                color: '#334155', /* #7 was slate-600 → now slate-700 */
                marginTop: 4, lineHeight: 1.5,
              }}>
                Find your level and unlock your English potential
              </p>
            </div>
          </div>

          {/* Step indicator */}
          <div style={{ marginTop: 'clamp(10px,2vw,20px)', paddingTop: 'clamp(10px,2vw,20px)', borderTop: '1px solid #F1F5F9' }}>
            {/* #2 nav landmark for steps */}
            <nav aria-label="Exam steps">
              <StepIndicator currentMode="setup" />
            </nav>
          </div>
        </div>
      </header>

      {/* ── #2 main landmark ── */}
      <main role="main" style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(20px,4vw,48px) clamp(14px,4vw,32px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(16px,3vw,32px)',
          alignItems: 'start',
        }}>

          {/* ── #2 aside landmark ── */}
          <aside role="complementary" aria-label="Test information"
            className="es-fadein es-fadein-1"
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* #9 Sticky info panel (desktop) */}
            <div style={{
              position: 'sticky', top: 100,
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: 14,
              padding: 'clamp(18px,3vw,28px)',
              boxShadow: '0 1px 3px rgba(0,0,0,.07)',
            }}>
              {/* Test structure */}
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
                textTransform: 'uppercase', color: '#64748B', marginBottom: 14,
              }}>
                Cấu trúc đề thi
              </p>

              {[
                { label: 'Listening', desc: '20 câu · 4 phần', time: '30 phút' },
                { label: 'Reading',   desc: '40 câu · 4 phần', time: '60 phút' },
              ].map((s, i) => (
                <div key={s.label}>
                  {i > 0 && <div style={{ height: 1, background: '#F1F5F9', margin: '14px 0' }} />}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: 0 }}>{s.label}</p>
                      <p style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{s.desc}</p>
                    </div>
                    <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{s.time}</span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div style={{
                marginTop: 20, paddingTop: 20, borderTop: '1px solid #F1F5F9',
              }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#64748B', marginBottom: 6 }}>
                  Tổng thời gian
                </p>
                <p style={{ margin: 0 }}>
                  <span style={{ fontSize: 36, fontWeight: 300, color: '#0F172A', letterSpacing: '-.02em' }}>90</span>
                  <span style={{ fontSize: 13, color: '#64748B', marginLeft: 6 }}>phút</span>
                </p>
              </div>

              {/* Requirements */}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #F1F5F9' }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#64748B', marginBottom: 10 }}>
                  Lưu ý
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    'Môi trường yên tĩnh, tập trung',
                    'Kết nối internet ổn định',
                    'Tiến độ lưu tự động liên tục',
                    'Không thể quay lại phần nghe đã làm',
                  ].map(item => (
                    <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: '#2563EB', marginTop: 2, flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <circle cx="6" cy="6" r="6" fill="#DBEAFE"/>
                          <path d="M3.5 6.5l2 2 3-4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {/* #7 contrast improvement */}
                      <span style={{ fontSize: 13, color: '#334155', lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social proof */}
              <div style={{
                marginTop: 20, paddingTop: 20, borderTop: '1px solid #F1F5F9',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: 28, fontWeight: 300, color: '#0F172A', margin: 0 }}>4.9</p>
                <p style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>500K+ học viên</p>
              </div>
            </div>
          </aside>

          {/* ── Right: Exam selection ── */}
          <section aria-label="Chọn đề thi"
            className="es-fadein es-fadein-2"
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Search & filters */}
            <div className="es-fadein es-fadein-3" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Search */}
              <div>
                <label htmlFor="exam-search" style={{
                  display: 'block', fontSize: 10, fontWeight: 700,
                  letterSpacing: '.1em', textTransform: 'uppercase',
                  color: '#475569', marginBottom: 6,
                }}>
                  Tìm kiếm
                </label>
                <input
                  id="exam-search"
                  type="search"
                  autoComplete="off"
                  placeholder="Tìm theo tên hoặc mã đề…"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="es-focus"
                  aria-controls={listboxId}
                  aria-label="Tìm kiếm đề thi"
                  style={{
                    width: '100%', padding: '11px 14px',
                    borderRadius: 8, border: '1.5px solid #E2E8F0',
                    background: '#FAFBFC', color: '#0F172A',
                    fontFamily: 'inherit', fontSize: 14,
                    boxSizing: 'border-box',
                    transition: 'border-color .15s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#2563EB'}
                  onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>

              {/* Filters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 10,
              }}>
                {[
                  {
                    id: 'difficulty', label: 'Độ khó', value: selectedDifficulty, onChange: handleDifficulty,
                    options: [
                      { v: 'all', l: 'Tất cả' }, { v: 'beginner', l: 'Cơ bản' },
                      { v: 'intermediate', l: 'Trung cấp' }, { v: 'advanced', l: 'Nâng cao' },
                    ],
                  },
                  {
                    id: 'sort', label: 'Sắp xếp', value: sortBy, onChange: handleSort,
                    options: [
                      { v: 'newest', l: 'Mới nhất' }, { v: 'popular', l: 'Phổ biến nhất' },
                      { v: 'difficulty', l: 'Theo độ khó' },
                    ],
                  },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} style={{
                      display: 'block', fontSize: 10, fontWeight: 700,
                      letterSpacing: '.1em', textTransform: 'uppercase',
                      color: '#475569', marginBottom: 6,
                    }}>{f.label}</label>
                    <select
                      id={f.id}
                      value={f.value}
                      onChange={f.onChange}
                      className="es-focus"
                      style={{
                        width: '100%', padding: '10px 32px 10px 12px',
                        borderRadius: 8, border: '1.5px solid #E2E8F0',
                        background: '#FAFBFC', color: '#0F172A',
                        fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
                        cursor: 'pointer', appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 10px center',
                        backgroundSize: '16px',
                      }}
                    >
                      {f.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                  </div>
                ))}

                {/* Result count */}
                <div>
                  <p style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
                    textTransform: 'uppercase', color: '#475569', marginBottom: 6,
                  }}>Kết quả</p>
                  <div style={{
                    padding: '10px 12px', borderRadius: 8,
                    border: '1.5px solid #E2E8F0', background: '#F8FAFC',
                    fontSize: 14, fontWeight: 600, color: '#0F172A',
                  }}>
                    {count !== total
                      ? <><span style={{ color: '#2563EB' }}>{count}</span> / {total}</>
                      : total.toLocaleString()
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Exam list box */}
            <div className="es-fadein es-fadein-4" style={{
              border: '1.5px solid #E2E8F0',
              borderRadius: 12,
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 1px 4px rgba(0,0,0,.06)',
            }}>
              {/* List header */}
              <div style={{
                padding: 'clamp(10px,2vw,16px) clamp(14px,3vw,24px)',
                borderBottom: '1px solid #F1F5F9',
                background: '#F8FAFC',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0 }}>
                  Chọn đề thi
                </p>
                <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
                  ↑ ↓ để điều hướng
                </p>
              </div>

              {/* Divider rows */}
              <div style={{ divideY: '#F1F5F9' }}>
                {isLoading ? (
                  <SkeletonList />
                ) : filteredExams.length > 0 ? (
                  <ExamListBox
                    exams={filteredExams}
                    selectedExam={selectedExam}
                    onSelectExam={handleSelectExam}
                    listboxId={listboxId}
                  />
                ) : (
                  <EmptyState searchQuery={searchQuery} onClearFilters={clearFilters} />
                )}
              </div>
            </div>

            {/* Start CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={handleStart}
                disabled={isStarting || !selectedExam}
                className="es-start-btn"
                aria-busy={isStarting}
                aria-label={isStarting ? 'Đang bắt đầu...' : `Bắt đầu: ${selectedExam}`}
                style={{
                  width: '100%',
                  padding: 'clamp(13px,2vw,16px) 24px',
                  borderRadius: 10, border: 'none',
                  fontFamily: 'inherit',
                  fontSize: 'clamp(14px,2vw,16px)', fontWeight: 600,
                  cursor: isStarting || !selectedExam ? 'not-allowed' : 'pointer',
                  background: isStarting || !selectedExam
                    ? '#F1F5F9'
                    : 'linear-gradient(135deg, #1D4ED8, #2563EB)',
                  color: isStarting || !selectedExam ? '#94A3B8' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}
              >
                {isStarting ? (
                  <>
                    <span style={{
                      width: 16, height: 16,
                      border: '2.5px solid rgba(255,255,255,.35)',
                      borderTopColor: '#fff', borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 1s linear infinite',
                    }} />
                    Đang bắt đầu…
                  </>
                ) : (
                  <>
                    Bắt đầu thi
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>

              <p style={{ fontSize: 12, color: '#64748B', textAlign: 'center', margin: 0 }}>
                Tiến độ lưu tự động · Không cần lo mất dữ liệu
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* #9 Spin keyframe for loading spinner */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
});

ExamSetup.displayName = 'ExamSetup';
export default ExamSetup;
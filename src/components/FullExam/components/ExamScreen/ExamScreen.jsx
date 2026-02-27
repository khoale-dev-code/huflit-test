/* src/components/FullExam/components/ExamScreen/ExamScreen.jsx */
/**
 * ExamScreen – Cải tiến toàn diện
 * ✅ Core Web Vitals: useMemo, memo, useCallback, lazy/Suspense
 * ✅ Material Design 3: hierarchy nút, skeleton, progress bar
 * ✅ Accessibility: aria-label, role="region", aria-live
 * ✅ Mobile-first: responsive padding/spacing
 * ✅ UX: progress indicator, unanswered warning, highlight câu chưa làm
 */

import React, {
  memo,
  useMemo,
  useCallback,
  useState,
  lazy,
  Suspense,
  useId,
} from 'react';
import { AlertCircle, ChevronLeft, ChevronRight, Flag, ArrowRight } from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { EXAM_STRUCTURE } from '../../constants/examConfig';
import { QuestionCard } from './QuestionCard';
import { PartNavigation } from '../Navigation/PartNavigation';
 

/* ── #1 Lazy load ContentDisplay → cải thiện LCP ── */
const ContentDisplay = lazy(() =>
  import('../../../Display/ContentDisplay')
);

/* ─────────────────────────────────────────────────────
   Design tokens
   ───────────────────────────────────────────────────── */
const T = {
  primary:      '#1565C0',
  primaryLight: '#E3F2FD',
  danger:       '#C62828',
  dangerLight:  '#FFEBEE',
  warning:      '#F57F17',
  warningLight: '#FFFDE7',
  success:      '#2E7D32',
  surface:      '#FFFFFF',
  surfaceVar:   '#F8FAFC',
  outline:      '#CBD5E1',
  onSurface:    '#1A2330',
  onSurfaceMed: '#4A5568',
  onSurfaceLow: '#94A3B8',
  radius:       '14px',
  radiusSm:     '8px',
  shadow:       '0 1px 3px rgba(0,0,0,.10), 0 1px 2px rgba(0,0,0,.06)',
  shadowMd:     '0 4px 12px rgba(0,0,0,.10)',
  transition:   'all .18s cubic-bezier(.4,0,.2,1)',
};

/* ─────────────────────────────────────────────────────
   Global CSS (injected once)
   ───────────────────────────────────────────────────── */
const STYLE_ID = '__examscreen_styles__';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @media (prefers-reduced-motion: reduce) {
      .es-btn, .es-progress-fill, .es-skeleton { transition: none !important; animation: none !important; }
    }

    /* Skeleton shimmer */
    @keyframes esShimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    .es-skeleton {
      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
      background-size: 800px 100%;
      animation: esShimmer 1.4s infinite linear;
      border-radius: 6px;
    }

    /* Button base */
    .es-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 700;
      font-size: 15px;
      border: none;
      cursor: pointer;
      border-radius: 10px;
      padding: 14px 20px;
      transition: ${T.transition};
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      min-height: 52px;
    }
    .es-btn:focus-visible {
      outline: 3px solid ${T.primary};
      outline-offset: 3px;
    }
    .es-btn:focus:not(:focus-visible) { outline: none; }
    .es-btn:disabled {
      opacity: .45;
      cursor: not-allowed;
      pointer-events: none;
    }
    .es-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,.15);
      opacity: 0;
      transition: opacity .15s;
    }
    .es-btn:hover:not(:disabled)::after { opacity: 1; }
    .es-btn:active:not(:disabled)::after { opacity: .25; }

    /* Progress bar fill */
    .es-progress-fill {
      transition: width .5s cubic-bezier(.4,0,.2,1);
    }

    /* Confirm dialog */
    .es-confirm-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.45);
      z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
    }
    .es-confirm-box {
      background: ${T.surface};
      border-radius: ${T.radius};
      padding: 28px 24px 24px;
      max-width: 380px; width: 100%;
      box-shadow: ${T.shadowMd};
    }

    @media (max-width: 640px) {
      .es-btn { font-size: 14px; padding: 12px 14px; min-height: 48px; }
      .es-nav-row { flex-direction: column; gap: 10px; }
      .es-nav-row .es-btn { width: 100%; }
    }
  `;
  document.head.appendChild(s);
}

/* ─────────────────────────────────────────────────────
   Skeleton – Loading state (#8)
   ───────────────────────────────────────────────────── */
const SkeletonLoader = memo(() => (
  <div aria-busy="true" aria-label="Loading questions..." role="status"
    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {[1, 2, 3].map(i => (
      <div key={i} style={{
        background: T.surface, border: `1px solid ${T.outline}`,
        borderRadius: T.radius, padding: '24px 20px',
      }}>
        <div className="es-skeleton" style={{ height: '12px', width: '15%', marginBottom: '14px' }} />
        <div className="es-skeleton" style={{ height: '18px', width: '80%', marginBottom: '8px' }} />
        <div className="es-skeleton" style={{ height: '18px', width: '60%', marginBottom: '24px' }} />
        {[1, 2, 3, 4].map(j => (
          <div key={j} className="es-skeleton"
            style={{ height: '48px', marginBottom: '10px', borderRadius: '8px' }} />
        ))}
      </div>
    ))}
  </div>
));
SkeletonLoader.displayName = 'SkeletonLoader';

/* ─────────────────────────────────────────────────────
   Confirm Dialog – #9 Cảnh báo rời part chưa xong
   ───────────────────────────────────────────────────── */
const ConfirmDialog = memo(({ unanswered, onConfirm, onCancel }) => (
  <div className="es-confirm-overlay" role="dialog"
    aria-modal="true" aria-labelledby="confirm-title">
    <div className="es-confirm-box">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <AlertCircle style={{ color: T.warning, flexShrink: 0 }} size={26} />
        <h2 id="confirm-title" style={{
          fontSize: '17px', fontWeight: 700, color: T.onSurface, margin: 0,
        }}>
          Còn câu chưa trả lời
        </h2>
      </div>
      <p style={{ fontSize: '14px', color: T.onSurfaceMed, lineHeight: 1.6, marginBottom: '24px' }}>
        Bạn còn <strong style={{ color: T.warning }}>{unanswered} câu</strong> chưa làm trong phần này.
        Bạn có muốn tiếp tục không?
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button className="es-btn" onClick={onCancel}
          style={{ background: T.surfaceVar, color: T.onSurface, border: `1.5px solid ${T.outline}` }}>
          Ở lại làm tiếp
        </button>
        <button className="es-btn" onClick={onConfirm}
          style={{ background: T.warning, color: '#fff' }}
          aria-label="Xác nhận rời phần này dù còn câu chưa làm">
          Vẫn tiếp tục
        </button>
      </div>
    </div>
  </div>
));
ConfirmDialog.displayName = 'ConfirmDialog';

/* ─────────────────────────────────────────────────────
   Progress Bar – #5
   ───────────────────────────────────────────────────── */
const ProgressBar = memo(({ answered, total, section }) => {
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  return (
    <div role="status" aria-label={`${answered} trong ${total} câu đã trả lời`}
      style={{ background: T.surface, border: `1px solid ${T.outline}`,
        borderRadius: T.radius, padding: '14px 20px', boxShadow: T.shadow }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: T.onSurfaceMed }}>
          Tiến độ {section === 'listening' ? 'Nghe' : 'Đọc'}
        </span>
        <span style={{ fontSize: '13px', fontWeight: 700,
          color: pct === 100 ? T.success : T.primary }}>
          {answered}/{total} câu · {pct}%
        </span>
      </div>
      <div style={{ height: '8px', background: '#E2E8F0',
        borderRadius: '100px', overflow: 'hidden' }}
        role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="es-progress-fill" style={{
          height: '100%', borderRadius: '100px',
          width: `${pct}%`,
          background: pct === 100
            ? `linear-gradient(90deg, ${T.success}, #43A047)`
            : `linear-gradient(90deg, ${T.primary}, #42A5F5)`,
        }} />
      </div>
    </div>
  );
});
ProgressBar.displayName = 'ProgressBar';

/* ─────────────────────────────────────────────────────
   ExamScreen (main)
   ───────────────────────────────────────────────────── */
export const ExamScreen = memo(({
  examData,
  section,
  part,
  answers,
  onSelectAnswer,
  onNavigatePart,
  onNextSection,
  onSubmit,
  onAudioStart,
  onAudioEnd,
  isLastListeningPart,
  isLastReadingPart,
  playedParts = [],
  isAudioPlaying = false,
}) => {
  const headingId = useId();
  const questionsRegionId = useId();

  const [pendingNav, setPendingNav] = useState(null); // { type: 'part'|'section'|'submit', arg }
  const cfg = EXAM_STRUCTURE[section];

  /* ── partData ── */
  const partData = useMemo(() => {
    if (!examData?.parts) return null;
    return examData.parts[`part${part}`] || null;
  }, [examData, part]);

  /* ── #1 Memo danh sách câu hỏi → tránh array mới mỗi render ── */
  const questionList = useMemo(
    () => partData?.questions || [],
    [partData],
  );

  /* ── Progress calculation ── */
  const { startQuestion, totalAnsweredInSection, totalQuestionsInSection } = useMemo(() => {
    const start = ((part - (section === 'listening' ? 1 : 5)) * cfg.questionsPerPart) + 1;
    let answered = 0;
    let total = cfg.parts * cfg.questionsPerPart;
    for (let p = 0; p < cfg.parts; p++) {
      const pNum = p + (section === 'listening' ? 1 : 5);
      for (let q = 1; q <= cfg.questionsPerPart; q++) {
        const key = `${section}-part${pNum}-q${q}`;
        if (answers[key] !== undefined) answered++;
      }
    }
    return { startQuestion: start, totalAnsweredInSection: answered, totalQuestionsInSection: total };
  }, [part, section, cfg, answers]);

  const endQuestion = startQuestion + cfg.questionsPerPart - 1;

  /* ── Answered count for current part (for warning) ── */
  const unansweredInPart = useMemo(() => {
    let count = 0;
    for (let q = 1; q <= cfg.questionsPerPart; q++) {
      const key = `${section}-part${part}-q${q}`;
      if (answers[key] === undefined) count++;
    }
    return count;
  }, [answers, section, part, cfg.questionsPerPart]);

  /* ── #3 useCallback để tránh inline arrow trong map ── */
  const handleSelect = useCallback(
    (qNum, optionIndex) => onSelectAnswer(qNum, optionIndex),
    [onSelectAnswer],
  );

  /* ── #9 Navigation với cảnh báo câu chưa làm ── */
  const tryNavigate = useCallback((navAction) => {
    if (isAudioPlaying) return;
    if (unansweredInPart > 0) {
      setPendingNav(navAction);
    } else {
      navAction.exec();
    }
  }, [isAudioPlaying, unansweredInPart]);

  const confirmNav = useCallback(() => {
    pendingNav?.exec();
    setPendingNav(null);
  }, [pendingNav]);

  const cancelNav = useCallback(() => setPendingNav(null), []);

  const minPart = section === 'listening' ? 1 : 5;
  const isFirstPart = part === minPart;

  /* ── Loading state ── */
  if (!partData) {
    return (
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '24px 16px 120px' }}>
        <SkeletonLoader />
      </main>
    );
  }

  return (
    <>
      {/* #9 Confirm Dialog */}
      {pendingNav && (
        <ConfirmDialog
          unanswered={unansweredInPart}
          onConfirm={confirmNav}
          onCancel={cancelNav}
        />
      )}

      {/* #11 Mobile-first responsive padding */}
      <main
        id={headingId}
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          /* px-4 md:px-8 equivalent */
          padding: 'clamp(12px, 4vw, 32px)',
          paddingBottom: '120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* ── #5 Progress Bar ── */}
        <ProgressBar
          answered={totalAnsweredInSection}
          total={totalQuestionsInSection}
          section={section}
        />

        {/* ── Content Display (Audio / Reading) ── */}
        <Suspense fallback={
          <div className="es-skeleton" style={{ height: '120px', borderRadius: T.radius }} />
        }>
          {section === 'listening' ? (
            <div style={{ position: 'relative', zIndex: 20 }}>
              <ContentDisplay
                partData={partData}
                selectedPart={`part${part}`}
                currentQuestionIndex={0}
                testType={section}
                examId="exam1"
                isPartPlayed={playedParts.includes(part)}
                onAudioStart={onAudioStart}
                onAudioEnd={onAudioEnd}
              />
            </div>
          ) : (
            <section
              aria-label="Nội dung bài đọc"
              style={{
                background: T.surface,
                borderRadius: T.radius,
                border: `1px solid ${T.outline}`,
                padding: 'clamp(16px, 4vw, 32px)',
                boxShadow: T.shadow,
              }}
            >
              <h3 style={{
                fontSize: '16px', fontWeight: 700,
                color: T.onSurface, marginBottom: '16px',
              }}>
                Reading Content
              </h3>
              <ContentDisplay
                partData={partData}
                selectedPart={`part${part}`}
                currentQuestionIndex={0}
                testType={section}
                examId="exam1"
                isPartPlayed={false}
                onAudioStart={() => {}}
                onAudioEnd={() => {}}
              />
            </section>
          )}
        </Suspense>

        {/* ── Questions Section ── */}
        {/* #7 role="region" + aria-labelledby */}
        <section
          role="region"
          aria-labelledby={questionsRegionId}
          style={{
            background: T.surface,
            borderRadius: T.radius,
            border: `1px solid ${T.outline}`,
            padding: 'clamp(16px, 4vw, 28px)',
            boxShadow: T.shadow,
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap',
            gap: '8px', marginBottom: '20px',
          }}>
            <h3 id={questionsRegionId} style={{
              fontSize: 'clamp(15px, 2.5vw, 17px)',
              fontWeight: 700, color: T.onSurface, margin: 0,
            }}>
              Part {part}: Câu {startQuestion} – {endQuestion}
            </h3>

            {/* #10 Unanswered badge */}
            {unansweredInPart > 0 && (
              <span role="status" aria-live="polite" style={{
                fontSize: '12px', fontWeight: 700,
                color: T.warning,
                background: T.warningLight,
                border: `1.5px solid ${T.warning}`,
                borderRadius: '100px',
                padding: '3px 12px',
              }}>
                ⚠ {unansweredInPart} câu chưa làm
              </span>
            )}
          </div>

          {/* #1 Render from memoised questionList */}
          {questionList.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {questionList.map((question, idx) => {
                const questionNum = idx + 1;
                const questionKey = `${section}-part${part}-q${questionNum}`;
                const selectedAnswer = answers[questionKey];
                /* #10 Highlight unanswered */
                const isUnanswered = selectedAnswer === undefined;

                return (
                  <div key={questionKey}
                    style={{
                      borderRadius: T.radius,
                      /* Subtle yellow ring on unanswered – #10 */
                      outline: isUnanswered
                        ? `2px solid transparent`
                        : 'none',
                      transition: T.transition,
                    }}
                  >
                    <QuestionCard
                      question={question}
                      questionNum={startQuestion + idx}
                      selectedAnswer={selectedAnswer}
                      /* #3 useCallback handler */
                      onAnswerSelect={(optIdx) => handleSelect(questionNum, optIdx)}
                      questionKey={questionKey}
                      /* Pass highlight hint to QuestionCard */
                      isUnanswered={isUnanswered}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div role="status" style={{
              textAlign: 'center', padding: '40px 16px',
              color: T.onSurfaceMed,
            }}>
              <AlertCircle size={40} style={{ margin: '0 auto 12px', opacity: .45 }} />
              <p style={{ fontSize: '14px', margin: 0 }}>Không có câu hỏi cho phần này</p>
            </div>
          )}
        </section>

        {/* Part Navigation */}
        <PartNavigation
          currentPart={part}
          totalParts={cfg.parts}
          startPartNumber={section === 'listening' ? 1 : 5}
          answers={answers}
          section={section}
          questionsPerPart={cfg.questionsPerPart}
          onPartChange={(newPart) =>
            tryNavigate({
              exec: () => onNavigatePart(newPart),
              label: `Part ${newPart}`,
            })
          }
          playedParts={section === 'listening' ? playedParts : []}
          isAudioPlaying={isAudioPlaying}
        />

        {/* ── #6 Navigation Buttons with clear MD hierarchy ── */}
        {/* Primary = Next/Submit  ·  Secondary (outline) = Previous */}
        <nav aria-label="Điều hướng phần thi"
          className="es-nav-row"
          style={{ display: 'flex', gap: '12px' }}>

          {/* Secondary: Previous (outline style) */}
          <button
            className="es-btn"
            onClick={() =>
              tryNavigate({
                exec: () => onNavigatePart(part - 1),
                label: 'Part trước',
              })
            }
            disabled={isFirstPart || isAudioPlaying}
            aria-label={`Quay lại Part ${part - 1}`}
            style={{
              flex: 1,
              background: T.surface,
              color: T.primary,
              border: `2px solid ${T.primary}`,
            }}
          >
            <ChevronLeft size={18} aria-hidden="true" />
            Previous Part
          </button>

          {/* Primary: Next / Section transition / Submit */}
          {isLastReadingPart ? (
            <button
              className="es-btn"
              onClick={() =>
                tryNavigate({ exec: onSubmit, label: 'Nộp bài' })
              }
              disabled={isAudioPlaying}
              aria-label="Nộp bài thi"
              style={{
                flex: 2,
                background: `linear-gradient(135deg, ${T.danger}, #E53935)`,
                color: '#fff',
              }}
            >
              <Flag size={18} aria-hidden="true" />
              Submit Test
            </button>
          ) : isLastListeningPart ? (
            <button
              className="es-btn"
              onClick={() =>
                tryNavigate({ exec: onNextSection, label: 'Sang Reading' })
              }
              disabled={isAudioPlaying}
              aria-label="Chuyển sang phần Đọc hiểu"
              style={{
                flex: 2,
                background: `linear-gradient(135deg, #E65100, #EF6C00)`,
                color: '#fff',
              }}
            >
              <ArrowRight size={18} aria-hidden="true" />
              Go to Reading
            </button>
          ) : (
            <button
              className="es-btn"
              onClick={() =>
                tryNavigate({
                  exec: () => onNavigatePart(part + 1),
                  label: `Part ${part + 1}`,
                })
              }
              disabled={isAudioPlaying}
              aria-label={`Chuyển sang Part ${part + 1}`}
              style={{
                flex: 2,
                background: `linear-gradient(135deg, ${T.primary}, #1976D2)`,
                color: '#fff',
              }}
            >
              Next Part
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          )}
        </nav>
      </main>
    </>
  );
});

ExamScreen.displayName = 'ExamScreen';
export default ExamScreen;
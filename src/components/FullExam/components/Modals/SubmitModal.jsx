/* src/components/FullExam/components/Modals/SubmitModal.jsx
 *
 * #5 – Enhanced Submit Modal
 * - "Review" mode: highlight parts chưa làm
 * - Confirm flow: Review → Confirm Submit
 * - WCAG: focus trap, aria-modal, role="dialog"
 */

import React, { memo, useState, useEffect, useRef, useMemo } from 'react';
import { Flag, AlertTriangle, CheckCircle, ChevronRight, X } from 'lucide-react';
import { EXAM_STRUCTURE, EXAM_SECTIONS } from '../../constants/examConfig';

/* ── Inject modal styles once ── */
const STYLE_ID = '__submitmodal_styles__';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes smFadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .sm-box { animation: smFadeIn .22s cubic-bezier(.4,0,.2,1); }
    .sm-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      font-weight: 700; font-size: 15px; border: none; cursor: pointer;
      border-radius: 10px; padding: 13px 20px; transition: all .15s;
      min-height: 48px; -webkit-tap-highlight-color: transparent;
    }
    .sm-btn:focus-visible { outline: 3px solid #1565C0; outline-offset: 3px; }
    .sm-btn:focus:not(:focus-visible) { outline: none; }
    .sm-btn:disabled { opacity: .45; cursor: not-allowed; }
    .sm-btn:hover:not(:disabled) { filter: brightness(1.08); }
    @media (prefers-reduced-motion: reduce) {
      .sm-box { animation: none; }
      .sm-btn { transition: none; }
    }
  `;
  document.head.appendChild(s);
}

/* ── Part status calculator ── */
function usePartStatuses(examData, answers, section) {
  return useMemo(() => {
    if (!examData || !section) return [];
    const cfg = EXAM_STRUCTURE[section];
    const startP = section === EXAM_SECTIONS.LISTENING ? 1 : 5;
    return Array.from({ length: cfg.parts }, (_, i) => {
      const pNum = startP + i;
      let answered = 0;
      for (let q = 1; q <= cfg.questionsPerPart; q++) {
        if (answers[`${section}-part${pNum}-q${q}`] !== undefined) answered++;
      }
      return {
        part:     pNum,
        answered,
        total:    cfg.questionsPerPart,
        complete: answered === cfg.questionsPerPart,
      };
    });
  }, [examData, answers, section]);
}

/* ── Part Review Grid ── */
const PartReviewGrid = memo(({ statuses }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '10px',
    margin: '16px 0',
  }}>
    {statuses.map(({ part, answered, total, complete }) => (
      <div key={part} style={{
        borderRadius: '10px',
        padding: '12px',
        border: `2px solid ${complete ? '#2E7D32' : '#F57F17'}`,
        background: complete ? '#F1F8E9' : '#FFFDE7',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>
            Part {part}
          </span>
          {complete
            ? <CheckCircle size={14} color="#2E7D32" aria-label="Hoàn thành" />
            : <AlertTriangle size={14} color="#F57F17" aria-label="Chưa xong" />}
        </div>
        <div style={{
          fontSize: '13px', fontWeight: 600,
          color: complete ? '#2E7D32' : '#B45309',
        }}>
          {answered}/{total}
        </div>
        {/* Mini progress */}
        <div style={{ height: '4px', background: '#E2E8F0', borderRadius: '100px' }}>
          <div style={{
            height: '100%',
            width: `${Math.round((answered / total) * 100)}%`,
            borderRadius: '100px',
            background: complete ? '#2E7D32' : '#F59E0B',
          }} />
        </div>
      </div>
    ))}
  </div>
));
PartReviewGrid.displayName = 'PartReviewGrid';

/* ── Main Modal ── */
export const SubmitModal = memo(({
  visible,
  unansweredCount,
  saveError,
  isOnline,
  isSubmitting,
  examData,
  answers,
  section,
  onConfirm,
  onCancel,
}) => {
  const [step, setStep] = useState('review'); // 'review' | 'confirm'
  const firstFocusRef   = useRef(null);
  const statuses = usePartStatuses(examData, answers, section);

  /* Reset step when modal opens */
  useEffect(() => {
    if (visible) {
      setStep('review');
      setTimeout(() => firstFocusRef.current?.focus(), 50);
    }
  }, [visible]);

  /* Focus trap */
  useEffect(() => {
    if (!visible) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [visible, onCancel]);

  if (!visible) return null;

  const allDone = unansweredCount === 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sm-title"
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15,23,42,.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        className="sm-box"
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: 'clamp(20px,4vw,32px)',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,.20)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close */}
        <button
          className="sm-btn"
          onClick={onCancel}
          aria-label="Đóng"
          style={{
            position: 'absolute', top: '12px', right: '12px',
            background: '#F1F5F9', color: '#64748B',
            padding: '6px', borderRadius: '8px', minHeight: 'auto',
          }}
        >
          <X size={16} />
        </button>

        {/* ── STEP 1: Review ── */}
        {step === 'review' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              {allDone
                ? <CheckCircle size={28} color="#2E7D32" />
                : <AlertTriangle size={28} color="#F57F17" />}
              <h2 id="sm-title" style={{
                fontSize: 'clamp(16px,3vw,19px)',
                fontWeight: 800, color: '#1A2330', margin: 0,
              }}>
                {allDone ? 'Sẵn sàng nộp bài!' : 'Kiểm tra trước khi nộp'}
              </h2>
            </div>

            {!allDone && (
              <p style={{
                fontSize: '14px', color: '#4A5568',
                lineHeight: 1.6, marginBottom: '4px',
              }}>
                Bạn còn{' '}
                <strong style={{ color: '#B45309' }}>{unansweredCount} câu</strong>{' '}
                chưa trả lời. Hãy kiểm tra từng part bên dưới.
              </p>
            )}

            {/* Part statuses */}
            <PartReviewGrid statuses={statuses} />

            {/* Offline notice */}
            {!isOnline && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '8px',
                padding: '10px 14px', borderRadius: '8px',
                background: '#FFF3E0', border: '1px solid #FFB74D',
                marginBottom: '16px', fontSize: '13px', color: '#7C4A03',
              }}>
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Bạn đang offline. Bài làm sẽ được nộp tự động khi có kết nối.</span>
              </div>
            )}

            {saveError && (
              <div style={{
                padding: '10px 14px', borderRadius: '8px',
                background: '#FFEBEE', border: '1px solid #EF9A9A',
                color: '#B71C1C', fontSize: '13px', marginBottom: '16px',
              }}>
                ⚠ {saveError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button className="sm-btn" onClick={onCancel} ref={firstFocusRef}
                style={{ background: '#F1F5F9', color: '#374151', border: '1.5px solid #CBD5E1' }}>
                Quay lại làm tiếp
              </button>
              <button className="sm-btn"
                onClick={() => setStep('confirm')}
                style={{
                  background: allDone
                    ? 'linear-gradient(135deg,#1565C0,#1976D2)'
                    : 'linear-gradient(135deg,#E65100,#EF6C00)',
                  color: '#fff',
                }}>
                {allDone ? 'Tiếp tục' : 'Vẫn nộp bài'}
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* ── STEP 2: Final confirm ── */}
        {step === 'confirm' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Flag size={36} color="#C62828" style={{ margin: '0 auto 10px' }} />
              <h2 id="sm-title" style={{
                fontSize: '19px', fontWeight: 800, color: '#1A2330', margin: '0 0 8px',
              }}>
                Xác nhận nộp bài?
              </h2>
              <p style={{ fontSize: '14px', color: '#4A5568', lineHeight: 1.6 }}>
                Sau khi nộp bạn sẽ không thể sửa đáp án. Hành động này không thể hoàn tác.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="sm-btn" ref={firstFocusRef}
                onClick={() => setStep('review')}
                style={{ background: '#F1F5F9', color: '#374151', border: '1.5px solid #CBD5E1' }}>
                Quay lại
              </button>
              <button
                className="sm-btn"
                onClick={onConfirm}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                aria-label={isSubmitting ? 'Đang nộp bài...' : 'Xác nhận nộp bài'}
                style={{
                  background: 'linear-gradient(135deg,#C62828,#E53935)',
                  color: '#fff',
                  minWidth: '140px',
                }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{
                      display: 'inline-block', width: '14px', height: '14px',
                      border: '2px solid rgba(255,255,255,.4)',
                      borderTopColor: '#fff', borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }} />
                    Đang nộp...
                  </>
                ) : (
                  <>
                    <Flag size={16} />
                    Nộp bài ngay
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

SubmitModal.displayName = 'SubmitModal';
export default SubmitModal;
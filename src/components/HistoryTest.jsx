// src/components/pages/HistoryTest.jsx

import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, X, AlertCircle, Lightbulb, CalendarDays, BookOpen, Trophy, BarChart3 } from 'lucide-react';
import { loadExamData } from '../data/examData';

/* ── Design tokens ── */
const T = {
  green: '#10B981', greenDark: '#059669', greenBg: '#ECFDF5',
  blue: '#3B82F6', blueDark: '#2563EB', blueBg: '#EFF6FF',
  red: '#EF4444', redDark: '#DC2626', redBg: '#FEF2F2',
  amber: '#F59E0B', amberDark: '#D97706', amberBg: '#FFFBEB',
  n50: '#F9FAFB', n100: '#F3F4F6', n200: '#E5E7EB',
  n400: '#9CA3AF', n600: '#4B5563', n800: '#1F2937',
  n900: '#111827', white: '#FFFFFF',
};

const Fd = { fontFamily: '-apple-system, "Segoe UI", "Roboto", sans-serif' };

/* ── Score pill ── */
const ScorePill = ({ score }) => {
  const isHigh = score >= 80, isMid = score >= 50;
  const bg = isHigh ? T.green : isMid ? T.amber : T.red;
  const border = isHigh ? T.greenDark : isMid ? T.amberDark : T.redDark;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      background: bg, color: T.white,
      border: `1px solid ${border}`,
      borderRadius: 10, padding: '6px 12px',
      boxShadow: `0 2px 8px ${bg}40`,
    }}>
      <Trophy size={16} strokeWidth={2} />
      <span style={{ ...Fd, fontWeight: 700, fontSize: 14 }}>{score}%</span>
    </div>
  );
};

/* ── Tag pill ── */
const TagPill = ({ children, color = T.blue }) => (
  <span style={{
    ...Fd,
    display: 'inline-block',
    background: `${color}15`, color,
    border: `1px solid ${color}30`,
    borderRadius: 6, padding: '3px 10px',
    fontSize: 11, fontWeight: 700,
    letterSpacing: '0.05em', textTransform: 'uppercase',
  }}>
    {children}
  </span>
);

/* ── Option row ── */
const OptionRow = ({ opt, optIdx, isSelected, isActualCorrect, isWrongSelected }) => {
  let bg, border, textColor, badgeBg, badgeColor;

  if (isActualCorrect) {
    bg = T.greenBg; border = T.green;
    textColor = T.n900; badgeBg = T.green; badgeColor = T.white;
  } else if (isWrongSelected) {
    bg = T.redBg; border = T.red;
    textColor = T.n900; badgeBg = T.red; badgeColor = T.white;
  } else {
    bg = T.white; border = T.n200;
    textColor = T.n600; badgeBg = T.n100; badgeColor = T.n400;
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 12px',
      background: bg, border: `1px solid ${border}`,
      borderRadius: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
        <span style={{
          ...Fd,
          width: 32, height: 32, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: badgeBg, color: badgeColor,
          borderRadius: 8, fontSize: 13, fontWeight: 700,
        }}>
          {String.fromCharCode(65 + optIdx)}
        </span>
        <span style={{ ...Fd, fontSize: 13, fontWeight: 500, color: textColor, lineHeight: 1.4, flex: 1 }}>
          {opt}
        </span>
      </div>

      {isActualCorrect && (
        <div style={{
          width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginLeft: 8,
          background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Check size={14} color="white" strokeWidth={3} />
        </div>
      )}
      {isWrongSelected && (
        <div style={{
          width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginLeft: 8,
          background: T.red, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <X size={14} color="white" strokeWidth={3} />
        </div>
      )}
    </div>
  );
};

/* ── Question card ── */
const QuestionCard = ({ q, idx, userAnswers }) => {
  const userAnswerIdx = userAnswers[q.id];
  const isAnswered = userAnswerIdx !== undefined && userAnswerIdx !== null;
  const isCorrect = isAnswered && userAnswerIdx === q.correct;

  return (
    <div style={{
      position: 'relative',
      background: T.white,
      border: `1px solid ${T.n200}`,
      borderRadius: 12,
      padding: '14px 12px 12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    }}>
      {/* Number badge */}
      <div style={{
        ...Fd,
        position: 'absolute', top: -10, left: 12,
        width: 28, height: 28,
        background: T.blue, color: T.white,
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 13,
        boxShadow: `0 2px 6px ${T.blue}40`,
        zIndex: 2,
      }}>
        {idx + 1}
      </div>

      <div style={{ paddingTop: 6 }}>
        {/* Script */}
        {q.script && (
          <div style={{
            marginBottom: 10, padding: '10px 12px',
            background: T.n50, border: `1px solid ${T.n200}`, borderRadius: 8,
          }}>
            <p style={{ ...Fd, fontSize: 12, fontWeight: 500, color: T.n600, fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
              "{q.script}"
            </p>
          </div>
        )}

        {/* Question */}
        <p style={{ ...Fd, fontSize: 13, fontWeight: 600, color: T.n900, lineHeight: 1.5, margin: '0 0 11px 0' }}>
          {q.question}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {q.options.map((opt, optIdx) => (
            <OptionRow
              key={optIdx}
              opt={opt} optIdx={optIdx}
              isSelected={userAnswerIdx === optIdx}
              isActualCorrect={q.correct === optIdx}
              isWrongSelected={userAnswerIdx === optIdx && !isCorrect}
            />
          ))}
        </div>

        {/* Skipped */}
        {!isAnswered && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginTop: 11, padding: '10px 12px',
            background: T.amberBg, border: `1px solid ${T.amber}40`, borderRadius: 8,
          }}>
            <AlertCircle size={16} color={T.amber} strokeWidth={2} style={{ flexShrink: 0 }} />
            <p style={{ ...Fd, fontSize: 12, fontWeight: 500, color: T.amberDark, margin: 0 }}>
              Bạn đã bỏ trống câu này
            </p>
          </div>
        )}

        {/* Explanation */}
        {q.explanation && (
          <div style={{
            marginTop: 12, padding: '11px 12px',
            background: T.blueBg, border: `1px solid ${T.blue}30`,
            borderRadius: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                background: T.blue,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 6px ${T.blue}40`,
              }}>
                <Lightbulb size={14} color="white" strokeWidth={2} />
              </div>
              <span style={{ ...Fd, fontSize: 11, fontWeight: 700, color: T.blue, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Giải thích
              </span>
            </div>
            <p style={{ ...Fd, fontSize: 12, fontWeight: 500, color: T.n800, lineHeight: 1.5, margin: 0 }}>
              {q.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Part section ── */
const PartSection = ({ partData, pIndex, userAnswers }) => {
  if (!partData?.questions) return null;
  return (
    <section style={{ marginBottom: 20 }}>
      {/* Part header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 12, padding: '11px 12px',
        background: T.white,
        border: `1px solid ${T.n200}`,
        borderRadius: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: T.blueBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BookOpen size={18} color={T.blue} strokeWidth={2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ ...Fd, fontSize: 13, fontWeight: 700, color: T.n900, margin: 0, lineHeight: 1.2 }}>
            {partData.title || `Phần ${partData.id}`}
          </p>
          {partData.description && (
            <p style={{ ...Fd, fontSize: 11, fontWeight: 500, color: T.n400, margin: '2px 0 0', lineHeight: 1.3 }}>
              {partData.description}
            </p>
          )}
        </div>
        <TagPill color={T.blue}>{partData.questions.length} câu</TagPill>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {partData.questions.map((q, idx) => (
          <QuestionCard key={q.id} q={q} idx={idx} userAnswers={userAnswers} />
        ))}
      </div>
    </section>
  );
};

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
const HistoryTest = () => {
  const { state } = useLocation();
  const { id: progressId } = useParams();
  const navigate = useNavigate();

  const progressItem = state?.progressItem;
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!progressItem) {
      setError('Không tìm thấy thông tin bài làm. Vui lòng quay lại danh sách.');
      setLoading(false);
      return;
    }
    const fetchExam = async () => {
      try {
        const targetExamId = progressItem.exam_id || progressItem.exam;
        if (!targetExamId) throw new Error('Dữ liệu bài làm bị lỗi: Không tìm thấy ID Đề thi.');
        const data = await loadExamData(targetExamId);
        if (!data) throw new Error('Không thể tải dữ liệu đề thi gốc từ hệ thống.');
        setExamData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [progressItem]);

  const allParts = useMemo(() => {
    if (!examData?.parts) return [];
    if (Array.isArray(examData.parts))
      return examData.parts.map(p => ({ ...p, id: String(p.id) }));
    return Object.entries(examData.parts).map(([key, val]) => ({ ...val, id: String(val.id || key) }));
  }, [examData]);

  /* Loading */
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: T.n50, gap: 12, ...Fd }}>
      <div style={{ width: 40, height: 40, border: `3px solid ${T.blueBg}`, borderTop: `3px solid ${T.blue}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: T.n400, fontWeight: 600, fontSize: 13 }}>Đang tải bài làm...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  /* Error */
  if (error || !examData) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: T.n50, padding: '24px', ...Fd }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: T.redBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <AlertCircle size={32} color={T.red} strokeWidth={1.5} />
      </div>
      <h2 style={{ ...Fd, fontSize: 17, fontWeight: 700, color: T.n900, marginBottom: 8, textAlign: 'center' }}>Đã có lỗi xảy ra</h2>
      <p style={{ ...Fd, fontSize: 13, fontWeight: 500, color: T.n400, textAlign: 'center', maxWidth: 320, marginBottom: 24, lineHeight: 1.6 }}>{error}</p>
      <button
        onClick={() => navigate(-1)}
        style={{
          ...Fd, padding: '10px 24px',
          background: T.blue, color: T.white,
          border: 'none', borderRadius: 8,
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          boxShadow: `0 2px 8px ${T.blue}40`,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = T.blueDark}
        onMouseLeave={e => e.currentTarget.style.background = T.blue}
      >
        ← Quay lại danh sách
      </button>
    </div>
  );

  const isFullExam = !progressItem.part || progressItem.part === 'full-exam';
  const partsToRender = isFullExam
    ? allParts
    : allParts.filter(p => p.id === String(progressItem.part));

  const userAnswers = progressItem.answers_detail || progressItem.answers || {};
  const examDate = progressItem.created_at || progressItem.timestamp;
  const partLabel = isFullExam ? 'Full Test' : `Part ${String(progressItem.part).replace('part', '')}`;

  const totalQ = partsToRender.reduce((a, p) => a + (p.questions?.length || 0), 0);
  const correctQ = partsToRender.reduce((acc, p) =>
    acc + (p.questions || []).filter(q => {
      const ua = userAnswers[q.id];
      return ua !== undefined && ua !== null && ua === q.correct;
    }).length, 0);
  const skippedQ = partsToRender.reduce((acc, p) =>
    acc + (p.questions || []).filter(q => {
      const ua = userAnswers[q.id];
      return ua === undefined || ua === null;
    }).length, 0);
  const wrongQ = totalQ - correctQ - skippedQ;

  return (
    <div style={{ minHeight: '100vh', background: T.n50, ...Fd }}>

      {/* ── STICKY HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${T.n200}`,
        padding: '12px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          maxWidth: 720, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12,
        }}>
          {/* Back button + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                width: 40, height: 40, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: T.n100, border: `1px solid ${T.n200}`,
                borderRadius: 8, cursor: 'pointer', color: T.n600,
                transition: 'all 0.2s',
                fontSize: 0,
              }}
              title="Quay lại"
              onMouseEnter={e => { e.currentTarget.style.background = T.blue; e.currentTarget.style.color = T.white; e.currentTarget.style.borderColor = T.blue; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.n100; e.currentTarget.style.color = T.n600; e.currentTarget.style.borderColor = T.n200; }}
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
            </button>

            <div style={{ minWidth: 0 }}>
              <h1 style={{
                ...Fd,
                fontSize: 14, fontWeight: 700, color: T.n900,
                margin: 0, lineHeight: 1.3,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {examData.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
                <TagPill color={T.blue}>{partLabel}</TagPill>
                {examDate && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500, color: T.n400 }}>
                    <CalendarDays size={12} />
                    {new Date(examDate).toLocaleDateString('vi-VN')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <ScorePill score={progressItem.score} />
        </div>
      </header>

      {/* ── SUMMARY STRIP ── */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.n100}` }}>
        <div style={{
          maxWidth: 720, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '0 16px',
        }}>
          {[
            { label: 'Đúng',   value: correctQ,  color: T.green  },
            { label: 'Sai',    value: wrongQ,    color: T.red    },
            { label: 'Bỏ qua', value: skippedQ,  color: T.amber  },
            { label: 'Tổng',   value: totalQ,    color: T.blue   },
          ].map((stat, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '12px 8px',
              borderRight: i < 3 ? `1px solid ${T.n100}` : 'none',
            }}>
              <span style={{ ...Fd, fontSize: 16, fontWeight: 700, color: stat.color, lineHeight: 1 }}>{stat.value}</span>
              <span style={{ ...Fd, fontSize: 11, fontWeight: 600, color: T.n400, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{stat.label}</span>
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div style={{ height: 4, background: T.n100 }}>
          <div style={{
            height: '100%',
            width: `${totalQ > 0 ? (correctQ / totalQ) * 100 : 0}%`,
            background: `linear-gradient(90deg, ${T.green} 0%, ${T.blue} 100%)`,
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '16px 16px 72px' }}>
        {partsToRender.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ ...Fd, color: T.n400, fontWeight: 500, fontSize: 13 }}>
              Không tìm thấy phần thi nào hoặc cấu trúc đề đã bị thay đổi.
            </p>
          </div>
        )}
        {partsToRender.map((partData, pIndex) => (
          <PartSection key={partData.id || pIndex} partData={partData} pIndex={pIndex} userAnswers={userAnswers} />
        ))}
      </main>

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.n200}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.n300}; }
      `}</style>
    </div>
  );
};

export default HistoryTest;
import React, { useMemo, useCallback, useState, memo } from 'react';
import {
  CheckCircle, AlertCircle, Volume2, Check,
  Sparkles, ChevronDown, Lightbulb, Send,
} from 'lucide-react';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';
import ConfirmModal from './ConfirmModal';

/* ─── Design tokens ──────────────────────────────────────── */
const C = {
  blue: '#1CB0F6', blueDark: '#1899D6', blueBg: '#EAF6FE', blueBorder: '#BAE3FB',
  green: '#58CC02', greenDark: '#46A302', greenBg: '#F0FAE8',
  yellow: '#FFC200', yellowDark: '#D9A600', yellowBg: '#FFFBEA',
  n50: '#F8FAFC', n100: '#F1F5F9', n200: '#E2E8F0',
  n400: '#94A3B8', n500: '#64748B', n600: '#475569', n800: '#1E293B',
  white: '#FFFFFF', red: '#FF4B4B',
};
const F = { body: '"Nunito", "Baloo 2", sans-serif', display: '"Baloo 2", "Nunito", sans-serif' };

const anim = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800;900&family=Nunito:wght@600;700;800;900&display=swap');
  @keyframes bounceIn {
    0%   { transform: scale(0.85); opacity: 0; }
    100% { transform: scale(1);    opacity: 1; }
  }
  .bounce-in { animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
`;

/* ─── Progress Bar ───────────────────────────────────────── */
const ProgressBar = memo(({ percentage }) => (
  <div style={{ height: 10, width: '100%', background: C.n200, borderRadius: 99, overflow: 'hidden', border: `1.5px solid ${C.n200}` }}>
    <div style={{
      height: '100%', width: `${percentage}%`,
      background: percentage === 100 ? C.green : C.blue,
      borderRadius: 99, transition: 'width 0.4s ease',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 2, left: 4, right: 4, height: 3, background: 'rgba(255,255,255,0.35)', borderRadius: 99 }} />
    </div>
  </div>
));

/* ─── Script (Audio) Display ─────────────────────────────── */
const ScriptDisplay = memo(({ script }) => {
  const [open, setOpen] = useState(false);
  if (!script) return null;
  return (
    <div style={{ marginBottom: 16, background: C.blueBg, border: `2px solid ${C.blueBorder}`, borderRadius: 18, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', outline: 'none', fontFamily: F.body }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: '#DAEEFB', border: `2px solid ${C.blueBorder}`, boxShadow: `0 3px 0 ${C.blueBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Volume2 size={17} color={C.blue} strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: F.display, fontSize: 11, fontWeight: 900, color: C.blue, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Nội dung âm thanh</span>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#DAEEFB', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
          <ChevronDown size={16} color={C.blue} strokeWidth={3} />
        </div>
      </button>
      {open && (
        <div className="bounce-in" style={{ padding: '10px 16px 14px', borderTop: `2px solid ${C.blueBorder}` }}>
          <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 700, color: C.n600, fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>"{script}"</p>
        </div>
      )}
    </div>
  );
});

/* ─── Question Option ────────────────────────────────────── */
const QuestionOption = memo(({ option, index, isSelected, onSelect, questionId }) => {
  const label = String.fromCharCode(65 + index);
  return (
    <label style={{ display: 'block', cursor: 'pointer' }}>
      <input type="radio" style={{ display: 'none' }} name={`q-${questionId}`} checked={isSelected} onChange={onSelect} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px', borderRadius: 16,
        border: `2px solid ${isSelected ? C.blue : C.n200}`,
        boxShadow: `0 ${isSelected ? 2 : 3}px 0 ${isSelected ? C.blueDark + '60' : C.n200}`,
        background: isSelected ? C.blueBg : C.white,
        transform: isSelected ? 'translateY(-1px)' : 'none',
        transition: 'all 0.12s ease',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: F.display, fontSize: 13, fontWeight: 900,
          background: isSelected ? C.blue : C.n100,
          color: isSelected ? C.white : C.n400,
          border: `2px solid ${isSelected ? C.blueDark : C.n200}`,
          transition: 'all 0.12s',
        }}>
          {isSelected ? <Check size={14} strokeWidth={4} /> : label}
        </div>
        <span style={{ fontFamily: F.body, fontSize: 14, fontWeight: isSelected ? 800 : 700, color: isSelected ? C.blue : C.n600, flex: 1, lineHeight: 1.45 }}>
          {option}
        </span>
      </div>
    </label>
  );
});

/* ─── Question Card ──────────────────────────────────────── */
const QuestionCard = memo(({ question, options, selectedAnswer, onAnswerSelect }) => (
  <article className="bounce-in" style={{
    background: C.white, border: `2px solid ${C.n200}`, borderBottom: `4px solid ${C.n200}`,
    borderRadius: 24, padding: '16px', marginBottom: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  }}>
    <ScriptDisplay script={question.script} />
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 11, flexShrink: 0,
        background: C.blue, border: `2px solid ${C.blueDark}`,
        boxShadow: `0 3px 0 ${C.blueDark}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: F.display, fontSize: 13, fontWeight: 900, color: C.white }}>{question.id}</span>
      </div>
      <h3 style={{ fontFamily: F.display, fontSize: 15, fontWeight: 800, color: C.n800, margin: 0, lineHeight: 1.5, paddingTop: 4 }}>
        {question.question}
      </h3>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {options?.map((opt, i) => (
        <QuestionOption
          key={`${question.id}-${i}`}
          index={i} option={opt}
          isSelected={selectedAnswer === i}
          onSelect={() => onAnswerSelect(question.id, i)}
          questionId={question.id}
        />
      ))}
    </div>
  </article>
));

/* ─── Tips Card ──────────────────────────────────────────── */
const TipsCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.yellowBg, border: `2px solid ${C.yellow}40`, borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', outline: 'none', fontFamily: F.body }}
      >
        <div style={{ width: 34, height: 34, borderRadius: 11, background: C.yellow, border: `2px solid ${C.yellowDark}`, boxShadow: `0 3px 0 ${C.yellowDark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Lightbulb size={17} color="#fff" strokeWidth={2.5} />
        </div>
        <span style={{ fontFamily: F.display, fontSize: 11, fontWeight: 900, color: '#92710A', textTransform: 'uppercase', letterSpacing: '0.08em', flex: 1, textAlign: 'left' }}>Mẹo đạt điểm cao</span>
        <div style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s', display: 'flex', color: C.yellow }}>
          <ChevronDown size={18} strokeWidth={3} />
        </div>
      </button>
      {open && (
        <div className="bounce-in" style={{ padding: '10px 16px 14px', borderTop: `2px solid ${C.yellow}30` }}>
          {[
            { label: 'Scanning', tip: 'Đọc lướt câu hỏi trước khi nghe/đọc.' },
            { label: 'Loại trừ', tip: 'Gạch ngay đáp án có từ khóa trái ngược.' },
          ].map(({ label, tip }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
              <span style={{ fontFamily: F.display, fontSize: 11, fontWeight: 900, color: '#7A5C00', background: C.yellow, padding: '3px 10px', borderRadius: 8, flexShrink: 0, textTransform: 'uppercase', border: `1.5px solid ${C.yellowDark}` }}>
                {label}
              </span>
              <span style={{ fontFamily: F.body, fontSize: 13, fontWeight: 700, color: '#6B5200', lineHeight: 1.5 }}>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Submit Card ────────────────────────────────────────── */
const SubmitCard = ({ isAllAnswered, answersCount, totalQuestions, isSignedIn, onSubmit }) => (
  <div style={{
    marginTop: 8, padding: '18px 18px',
    borderRadius: 24,
    border: `2px solid ${isAllAnswered ? C.green : C.n200}`,
    borderBottom: `4px solid ${isAllAnswered ? C.greenDark : C.n200}`,
    background: isAllAnswered ? C.greenBg : C.white,
    display: 'flex', flexDirection: 'column', gap: 14,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'all 0.25s',
  }}>
    {/* Status row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 13, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isAllAnswered ? C.green : C.n100,
        border: `2px solid ${isAllAnswered ? C.greenDark : C.n200}`,
        boxShadow: `0 3px 0 ${isAllAnswered ? C.greenDark : C.n200}`,
      }}>
        {isAllAnswered
          ? <CheckCircle size={20} color="#fff" strokeWidth={2.5} />
          : <AlertCircle size={20} color={C.n400} strokeWidth={2.5} />}
      </div>
      <div>
        <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 900, color: isAllAnswered ? C.greenDark : C.n800, margin: 0 }}>
          {isAllAnswered ? 'Mọi thứ đã sẵn sàng!' : 'Chưa hoàn thành!'}
        </p>
        <p style={{ fontFamily: F.body, fontSize: 12, fontWeight: 700, color: C.n500, margin: '2px 0 0' }}>
          {isAllAnswered ? 'Bấm nộp bài ngay thôi!' : `Còn ${totalQuestions - answersCount} câu chưa chọn đáp án.`}
        </p>
      </div>
    </div>

    {/* Submit button */}
    <button
      onClick={onSubmit}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '13px 0', borderRadius: 16,
        fontFamily: F.display, fontSize: 15, fontWeight: 900,
        textTransform: 'uppercase', letterSpacing: '0.05em',
        color: C.white, cursor: 'pointer', outline: 'none', border: 'none',
        background: isAllAnswered ? C.green : C.blue,
        boxShadow: `0 4px 0 ${isAllAnswered ? C.greenDark : C.blueDark}`,
        transition: 'all 0.12s',
      }}
      onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.06)'; }}
      onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
      onMouseDown={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(4px)'; }}
      onMouseUp={e => { e.currentTarget.style.boxShadow = `0 4px 0 ${isAllAnswered ? C.greenDark : C.blueDark}`; e.currentTarget.style.transform = 'none'; }}
    >
      <Send size={16} strokeWidth={3} />
      {isSignedIn ? 'Nộp & Lưu' : 'Nộp bài'}
    </button>
  </div>
);

/* ══════════════════════════════════════════════════════
   MAIN — QuestionDisplay
══════════════════════════════════════════════════════ */
const QuestionDisplay = memo(({ selectedPart, selectedExam, partData, answers, onAnswerSelect, showResults, onSubmit, testType }) => {
  const { user: firebaseUser, isSignedIn } = useUnifiedAuth();
  const [status, setStatus]       = useState({ show: false, message: '', success: false });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const answersCount   = useMemo(() => Object.keys(answers).length, [answers]);
  const totalQuestions = useMemo(() => partData?.questions?.length || 0, [partData]);
  const percentage     = useMemo(() => totalQuestions > 0 ? Math.round((answersCount / totalQuestions) * 100) : 0, [answersCount, totalQuestions]);
  const isAllAnswered  = answersCount === totalQuestions && totalQuestions > 0;

  const triggerStatus = useCallback(() => {
    setStatus({ show: true, message: !isSignedIn ? 'Đăng nhập để lưu kết quả nhé!' : 'Tuyệt vời! Kết quả đã được lưu.', success: !!isSignedIn });
    setTimeout(() => setStatus({ show: false, message: '', success: false }), 3000);
  }, [isSignedIn]);

  const handleSubmit = useCallback(() => {
    if (!isAllAnswered) { setConfirmOpen(true); return; }
    onSubmit(); triggerStatus();
  }, [isAllAnswered, onSubmit, triggerStatus]);

  const handleConfirm = useCallback(() => {
    setConfirmOpen(false); onSubmit(); triggerStatus();
  }, [onSubmit, triggerStatus]);

  if (!partData?.questions || showResults) return null;

  return (
    <div style={{ minHeight: '100vh', background: C.n50, fontFamily: F.body, WebkitFontSmoothing: 'antialiased' }}>
      <style>{anim}</style>

      {/* ── Header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `2px solid ${C.n200}`,
        padding: '10px 16px 12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: 11, background: C.blueBg, border: `2px solid ${C.blueBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} color={C.blue} strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: F.display, fontSize: 13, fontWeight: 900, color: C.n600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Luyện tập</span>
            </div>

            {/* Counter pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 12px', borderRadius: 12,
              border: `2px solid ${isAllAnswered ? C.green : C.n200}`,
              background: isAllAnswered ? C.greenBg : C.white,
              transition: 'all 0.25s',
            }}>
              {isAllAnswered && <Check size={13} color={C.green} strokeWidth={4} />}
              <span style={{ fontFamily: F.display, fontSize: 13, fontWeight: 900, color: isAllAnswered ? C.green : C.n500 }}>
                {answersCount} / {totalQuestions}
              </span>
            </div>
          </div>
          <ProgressBar percentage={percentage} />
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '16px 14px 48px' }}>
        {partData.questions.map(q => (
          <QuestionCard key={q.id} question={q} options={q.options} selectedAnswer={answers[q.id]} onAnswerSelect={onAnswerSelect} />
        ))}
        <TipsCard />
        <SubmitCard isAllAnswered={isAllAnswered} answersCount={answersCount} totalQuestions={totalQuestions} isSignedIn={isSignedIn} onSubmit={handleSubmit} />
      </div>

      {/* ── Confirm Modal ── */}
      <ConfirmModal open={confirmOpen} answersCount={answersCount} totalQuestions={totalQuestions} onConfirm={handleConfirm} onCancel={() => setConfirmOpen(false)} />

      {/* ── Toast ── */}
      {status.show && (
        <div className="bounce-in" style={{
          position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
          zIndex: 100, display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 16px', borderRadius: 18,
          background: C.white, border: `2px solid ${status.success ? C.green : C.yellow}40`,
          boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
          fontFamily: F.body, whiteSpace: 'nowrap',
        }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: status.success ? C.greenBg : C.yellowBg, flexShrink: 0 }}>
            {status.success ? <CheckCircle size={18} color={C.green} strokeWidth={2.5} /> : <AlertCircle size={18} color={C.yellow} strokeWidth={2.5} />}
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, color: status.success ? C.greenDark : '#7A5C00' }}>{status.message}</span>
        </div>
      )}
    </div>
  );
});

QuestionDisplay.displayName = 'QuestionDisplay';
export default QuestionDisplay;
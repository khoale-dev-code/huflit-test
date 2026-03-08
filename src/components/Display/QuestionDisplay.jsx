import React, { useMemo, useCallback, useState, memo } from 'react';
import {
  CheckCircle, AlertCircle, Volume2, Check,
  Sparkles, ChevronDown, ChevronUp, Lightbulb, Send,
} from 'lucide-react';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';
import ConfirmModal from './ConfirmModal';

/* ══════════════════════════════════════════════════════
   GLOBAL STYLES & ANIMATIONS
══════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;500;600&family=Google+Sans+Text:wght@400;500&display=swap');
    
    :root {
      --font-sans: 'Google Sans Text', system-ui, sans-serif;
      --font-display: 'Google Sans Display', sans-serif;
    }
    
    .font-sans-m3 { font-family: var(--font-sans); }
    .font-display-m3 { font-family: var(--font-display); }

    @keyframes m3-fadein {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes m3-slidein {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .animate-m3-fadein { animation: m3-fadein 0.24s ease both; }
    .animate-m3-slidein { animation: m3-slidein 0.22s ease both; }
    .animate-shimmer {
      background: linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.35) 60%, transparent 80%);
      background-size: 200% 100%;
      animation: shimmer 1.8s linear infinite;
    }

    .q-card:nth-child(1) { animation-delay: 0.03s; }
    .q-card:nth-child(2) { animation-delay: 0.06s; }
    .q-card:nth-child(3) { animation-delay: 0.09s; }
    .q-card:nth-child(4) { animation-delay: 0.12s; }
    .q-card:nth-child(5) { animation-delay: 0.15s; }
  `}</style>
);

/* ══════════════════════════════════════════════════════
   PROGRESS BAR — M3 Linear Indicator
══════════════════════════════════════════════════════ */
const ProgressBar = memo(({ percentage }) => {
  const done = percentage === 100;
  return (
    <div className="h-1 w-full bg-[#E1E2EC] rounded-full overflow-hidden relative">
      <div
        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out ${
          done ? 'bg-gradient-to-r from-[#006C51] to-[#00A878]' : 'bg-gradient-to-r from-[#1A56DB] to-[#4D8FFF]'
        }`}
        style={{ width: `${percentage}%` }}
      />
      {!done && percentage > 0 && (
        <div
          className="absolute top-0 left-0 h-full w-full animate-shimmer rounded-full"
          style={{ width: `${percentage}%` }}
        />
      )}
    </div>
  );
});

/* ══════════════════════════════════════════════════════
   SCRIPT DISPLAY — M3 Outlined Card Expandable
══════════════════════════════════════════════════════ */
const ScriptDisplay = memo(({ script }) => {
  const [open, setOpen] = useState(false);
  if (!script) return null;
  return (
    <div className="mb-3.5 border border-[#D8E2FF] rounded-2xl overflow-hidden bg-[#D8E2FF]/30 font-sans-m3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-2.5 px-3.5 bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A56DB]"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1A56DB] flex items-center justify-center shrink-0">
            <Volume2 size={14} color="#fff" />
          </div>
          <span className="text-sm font-medium text-[#001257] uppercase tracking-wider">Audio Script</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-[#1A56DB]/10 flex items-center justify-center transition-transform duration-200">
          {open ? <ChevronUp size={14} className="text-[#1A56DB]" /> : <ChevronDown size={14} className="text-[#1A56DB]" />}
        </div>
      </button>
      {open && (
        <div className="px-3.5 pb-3.5 pt-1 border-t border-[#D8E2FF] animate-m3-fadein">
          <p className="text-sm text-[#001257] italic m-0 mt-2 font-sans-m3 leading-relaxed">"{script}"</p>
        </div>
      )}
    </div>
  );
});

/* ══════════════════════════════════════════════════════
   QUESTION OPTION — M3 Selection Control Card
══════════════════════════════════════════════════════ */
const OPT_CLASSES = [
  { base: 'bg-[#1A56DB]', border: 'border-[#1A56DB]', bgSelected: 'bg-[#D8E2FF]', textOn: 'text-[#001257]', ring: 'ring-[#1A56DB]/30' },
  { base: 'bg-[#5F35C4]', border: 'border-[#5F35C4]', bgSelected: 'bg-[#EADDFF]', textOn: 'text-[#21005D]', ring: 'ring-[#5F35C4]/30' },
  { base: 'bg-[#006C51]', border: 'border-[#006C51]', bgSelected: 'bg-[#89F8D2]', textOn: 'text-[#002116]', ring: 'ring-[#006C51]/30' },
  { base: 'bg-[#7E4E00]', border: 'border-[#7E4E00]', bgSelected: 'bg-[#FFDDB0]', textOn: 'text-[#281900]', ring: 'ring-[#7E4E00]/30' },
];

const QuestionOption = memo(({ option, index, isSelected, onSelect, questionId }) => {
  const label = String.fromCharCode(65 + index);
  const theme = OPT_CLASSES[index % OPT_CLASSES.length];

  return (
    <label className="block cursor-pointer group">
      <input
        type="radio"
        className="absolute w-0 h-0 opacity-0"
        name={`q-${questionId}`}
        checked={isSelected}
        onChange={onSelect}
      />
      <div
        className={`relative overflow-hidden flex items-center gap-3 py-2.5 px-3.5 rounded-2xl border-[1.5px] transition-all duration-200 font-sans-m3
          ${isSelected
            ? `${theme.border} ${theme.bgSelected} ring-2 ring-offset-0 ${theme.ring}`
            : 'border-[#C4C6D0] bg-[#FAFAFA] hover:bg-gray-100/80 active:bg-gray-200/60'}`}
      >
        {/* Label badge */}
        <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center transition-colors duration-200 ${isSelected ? theme.base : 'bg-[#E1E2EC]'}`}>
          {isSelected
            ? <Check size={14} color="#fff" strokeWidth={2.5} />
            : <span className="text-sm font-medium text-[#44464F]">{label}</span>}
        </div>

        {/* Text */}
        <span className={`text-[14.5px] flex-1 transition-colors duration-200 ${isSelected ? `${theme.textOn} font-medium` : 'text-[#1A1B1F] font-normal'}`}>
          {option}
        </span>

        {/* Selection indicator */}
        {isSelected && (
          <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center animate-m3-fadein ${theme.base}`}>
            <Check size={11} color="#fff" strokeWidth={3} />
          </div>
        )}
      </div>
    </label>
  );
});

/* ══════════════════════════════════════════════════════
   QUESTION CARD — M3 Elevated Card
══════════════════════════════════════════════════════ */
const QuestionCard = memo(({ question, options, selectedAnswer, onAnswerSelect }) => (
  <article className="q-card animate-m3-fadein bg-white border border-[#C4C6D0] rounded-[28px] p-4 mb-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_12px_rgba(26,86,219,0.08)] transition-shadow duration-300">
    <ScriptDisplay script={question.script} />

    {/* Question header */}
    <div className="flex items-start gap-3 mb-3.5">
      <div className="w-[30px] h-[30px] rounded-lg bg-[#2F3036] text-[#F2F0F4] flex items-center justify-center shrink-0 mt-[2px]">
        <span className="text-sm font-medium font-sans-m3">{question.id}</span>
      </div>
      <h3 className="text-base text-[#1A1B1F] m-0 leading-snug font-display-m3 font-medium">
        {question.question}
      </h3>
    </div>

    {/* Options */}
    <div className="flex flex-col gap-2">
      {options?.map((opt, i) => (
        <QuestionOption
          key={`${question.id}-${i}`}
          index={i}
          option={opt}
          isSelected={selectedAnswer === i}
          onSelect={() => onAnswerSelect(question.id, i)}
          questionId={question.id}
        />
      ))}
    </div>
  </article>
));

/* ══════════════════════════════════════════════════════
   TIPS CARD — M3 Tonal Card
══════════════════════════════════════════════════════ */
const TipsCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#FFFBF0] border border-[#F0E0A0] rounded-[28px] overflow-hidden mb-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2.5 p-3.5 bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB300] font-sans-m3"
      >
        <div className="w-8 h-8 rounded-lg bg-[#FFB300] flex items-center justify-center shrink-0">
          <Lightbulb size={16} color="#fff" />
        </div>
        <span className="text-sm font-medium text-[#5D4E00] flex-1 text-left">Mẹo làm bài</span>
        <ChevronDown
          size={18}
          className="text-[#A08000] transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-[#F0E0A0] animate-m3-fadein font-sans-m3">
          {[
            { label: 'Scanning',    tip: 'Đọc câu hỏi trước khi nghe/đọc đoạn văn.' },
            { label: 'Elimination', tip: 'Loại bỏ đáp án có từ vựng tiêu cực hoặc gây nhiễu.' },
          ].map(({ label, tip }) => (
            <div key={label} className="flex gap-2.5 mt-3">
              <span className="text-xs font-medium text-[#7E5700] bg-[#FFE082] px-2 py-0.5 rounded-full shrink-0 h-fit">
                {label}
              </span>
              <span className="text-sm text-[#5D4E00] leading-tight">{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN — QuestionDisplay
══════════════════════════════════════════════════════ */
const QuestionDisplay = memo(({
  selectedPart, selectedExam, partData, answers,
  onAnswerSelect, showResults, onSubmit, testType,
}) => {
  const { user: firebaseUser, isSignedIn } = useUnifiedAuth();

  const [status,      setStatus]      = useState({ show: false, message: '', success: false });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const answersCount    = useMemo(() => Object.keys(answers).length, [answers]);
  const totalQuestions  = useMemo(() => partData?.questions?.length || 0, [partData]);
  const percentage      = useMemo(() => (totalQuestions > 0 ? Math.round((answersCount / totalQuestions) * 100) : 0), [answersCount, totalQuestions]);
  const isAllAnswered   = answersCount === totalQuestions && totalQuestions > 0;

  const triggerStatus = useCallback(() => {
    setStatus({
      show: true,
      message: !isSignedIn ? 'Đăng nhập để lưu kết quả' : '✓ Kết quả đã được lưu!',
      success: !!isSignedIn,
    });
    setTimeout(() => setStatus({ show: false, message: '', success: false }), 3000);
  }, [isSignedIn]);

  const handleSubmit = useCallback(() => {
    if (!isAllAnswered) {
      setConfirmOpen(true);
      return;
    }
    onSubmit();
    triggerStatus();
  }, [isAllAnswered, onSubmit, triggerStatus]);

  const handleConfirm = useCallback(() => {
    setConfirmOpen(false);
    onSubmit();
    triggerStatus();
  }, [onSubmit, triggerStatus]);

  if (!partData?.questions || showResults) return null;

  return (
    <div className="min-h-screen bg-[#F7F8FF] text-[#1A1B1F] antialiased selection:bg-[#1A56DB]/20">
      <GlobalStyles />

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-30 bg-[#F7F8FF]/95 backdrop-blur-md border-b border-[#C4C6D0] px-4 pt-3 pb-2.5 font-sans-m3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D8E2FF] flex items-center justify-center">
              <Sparkles size={16} className="text-[#1A56DB]" />
            </div>
            <span className="text-sm font-semibold font-display-m3">Practice</span>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors duration-300
            ${isAllAnswered
              ? 'bg-[#89F8D2] border-[#006C51]/40 text-[#002116]'
              : 'bg-[#D8E2FF] border-[#1A56DB]/30 text-[#001257]'}`}
          >
            {isAllAnswered && <Check size={12} className="text-[#006C51]" strokeWidth={2.5} />}
            <span className="text-sm font-medium">{answersCount}/{totalQuestions}</span>
          </div>
        </div>
        <ProgressBar percentage={percentage} />
      </header>

      {/* ── Question List ── */}
      <div className="px-4 py-4 md:px-5 md:py-5 pb-[148px] md:pb-5 max-w-3xl mx-auto">
        {partData.questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            options={q.options}
            selectedAnswer={answers[q.id]}
            onAnswerSelect={onAnswerSelect}
          />
        ))}
        <TipsCard />

        {/* ── Submit Bar ── */}
        <div className="fixed bottom-16 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#C4C6D0] shadow-[0_-2px_20px_rgba(26,86,219,0.08)] px-4 py-3 flex items-center justify-between gap-3 font-sans-m3
                        md:static md:bottom-auto md:mt-2 md:mb-8 md:bg-[#FAFAFA] md:border md:rounded-[28px] md:px-5 md:py-4 md:shadow-[0_1px_6px_rgba(0,0,0,0.04),0_4px_16px_rgba(26,86,219,0.05)]">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{answersCount}/{totalQuestions} câu</span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${isAllAnswered ? 'bg-[#89F8D2] text-[#002116]' : 'bg-[#D8E2FF] text-[#001257]'}`}>
                {percentage}%
              </span>
            </div>
            <span className={`text-xs font-medium ${isAllAnswered ? 'text-[#006C51]' : 'text-[#44464F]'}`}>
              {isAllAnswered ? '✓ Sẵn sàng nộp bài' : `Còn ${totalQuestions - answersCount} câu chưa trả lời`}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-[28px] text-[13px] md:text-sm font-semibold tracking-wide shrink-0 transition-all duration-200 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A56DB] text-white
              ${isAllAnswered
                ? 'bg-[#00358E] hover:bg-[#002763] shadow-[0_2px_12px_rgba(0,53,142,0.35)] hover:shadow-[0_4px_18px_rgba(0,53,142,0.45)]'
                : 'bg-[#1A56DB] hover:bg-[#00358E] shadow-[0_1px_4px_rgba(26,86,219,0.2)] hover:shadow-[0_2px_8px_rgba(26,86,219,0.3)]'}`}
          >
            <Send size={15} />
            {isSignedIn ? 'Nộp & Lưu' : 'Nộp bài'}
          </button>
        </div>
      </div>

      {/* ── Confirm Modal ── */}
      <ConfirmModal
        open={confirmOpen}
        answersCount={answersCount}
        totalQuestions={totalQuestions}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* ── M3 Toast ── */}
      {status.show && (
        <div className={`fixed z-[60] bottom-[90px] left-4 right-4 md:left-auto md:right-5 md:bottom-6 md:w-[340px] px-4 py-3.5 rounded-2xl flex items-center gap-3 shadow-[0_6px_24px_rgba(0,0,0,0.2)] animate-m3-slidein font-sans-m3
          ${status.success ? 'bg-[#006C51] text-white' : 'bg-[#2F3036] text-[#F2F0F4]'}`}
        >
          {status.success
            ? <CheckCircle size={18} className="shrink-0" />
            : <AlertCircle size={18} color="#FFCC02" className="shrink-0" />}
          <span className="text-sm font-medium">{status.message}</span>
        </div>
      )}
    </div>
  );
});

QuestionDisplay.displayName = 'QuestionDisplay';
export default QuestionDisplay;
import React, { useMemo, useCallback, useState, memo } from 'react';
import {
  Save, CheckCircle, AlertCircle, Volume2, Check,
  Sparkles, ChevronDown, ChevronUp, Lightbulb, Send,
} from 'lucide-react';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';

// ─────────────────────────────────────────────
// ProgressBar
// ─────────────────────────────────────────────
const ProgressBar = memo(({ percentage }) => (
  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-500 ease-out"
      style={{
        width: `${percentage}%`,
        background: percentage === 100
          ? 'linear-gradient(90deg, #059669, #10B981)'
          : 'linear-gradient(90deg, #2563EB, #60A5FA)',
      }}
    />
  </div>
));
ProgressBar.displayName = 'ProgressBar';

// ─────────────────────────────────────────────
// QuestionOption
// ─────────────────────────────────────────────
const QuestionOption = memo(({ option, index, isSelected, onSelect, questionId }) => {
  const label = String.fromCharCode(65 + index);
  return (
    <label className="block cursor-pointer group">
      <input type="radio" className="sr-only" name={`q-${questionId}`} checked={isSelected} onChange={onSelect} />
      <div className={`
        flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-150
        ${isSelected
          ? 'border-blue-500 bg-blue-50 shadow-sm'
          : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50'}
      `}>
        <div className={`
          w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0
          ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}
        `}>
          {label}
        </div>
        <span className={`text-[15px] leading-snug flex-1 ${isSelected ? 'text-blue-900 font-semibold' : 'text-slate-700'}`}>
          {option}
        </span>
        {isSelected && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
      </div>
    </label>
  );
});
QuestionOption.displayName = 'QuestionOption';

// ─────────────────────────────────────────────
// ScriptDisplay
// ─────────────────────────────────────────────
const ScriptDisplay = memo(({ script }) => {
  const [open, setOpen] = useState(false);
  if (!script) return null;
  return (
    <div className="mb-3 border border-blue-100 bg-blue-50/40 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors"
      >
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-blue-900 text-xs uppercase tracking-wider">Audio Script</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-blue-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-blue-100 pt-2">
          <p className="text-[14.5px] text-slate-700 leading-relaxed italic">"{script}"</p>
        </div>
      )}
    </div>
  );
});
ScriptDisplay.displayName = 'ScriptDisplay';

// ─────────────────────────────────────────────
// QuestionCard
// ─────────────────────────────────────────────
const QuestionCard = memo(({ question, options, selectedAnswer, onAnswerSelect }) => (
  <article className="bg-white border border-slate-200 rounded-2xl p-4 mb-3">
    <ScriptDisplay script={question.script} />
    <div className="flex items-start gap-3 mb-4">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-[13px] flex-shrink-0 mt-0.5">
        {question.id}
      </span>
      <h3 className="text-base font-bold text-slate-900 leading-snug">{question.question}</h3>
    </div>
    <div className="space-y-2">
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
QuestionCard.displayName = 'QuestionCard';

// ─────────────────────────────────────────────
// SubmitBar — responsive layout
//
// MOBILE  (< md): fixed bottom, padding-bottom = navbar height (env safe-area + 64px)
// DESKTOP (≥ md): sticky, nằm dưới cùng bên phải trong flow bình thường,
//                 luôn visible vì nó theo scroll
// ─────────────────────────────────────────────
const SubmitBar = memo(({ answersCount, totalQuestions, isAllAnswered, isSignedIn, onSubmit, status }) => {
  const remaining = totalQuestions - answersCount;

  return (
    <>
      {/*
        MOBILE: fixed, bottom = navbar height
        Dùng CSS env(safe-area-inset-bottom) để tránh home-indicator iOS.
        Nếu navbar của bạn cao hơn/thấp hơn 64px, đổi giá trị `--nav-h`.
      */}
      <style>{`
        :root { --nav-h: 64px; }
        .submit-bar-mobile {
          display: flex;
          position: fixed;
          left: 0; right: 0;
          bottom: calc(var(--nav-h) + env(safe-area-inset-bottom, 0px));
          z-index: 50;
          background: #fff;
          border-top: 1.5px solid #E2E8F0;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.07);
          padding: 12px 16px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .submit-bar-mobile { display: none; }
        }

        .submit-bar-desktop {
          display: none;
        }
        @media (min-width: 768px) {
          .submit-bar-desktop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            background: #fff;
            border: 1.5px solid #E2E8F0;
            border-radius: 20px;
            padding: 16px 20px;
            margin-top: 8px;
            margin-bottom: 32px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          }
        }
      `}</style>

      {/* ── MOBILE BAR ── */}
      <div className="submit-bar-mobile">
        <BarContent
          answersCount={answersCount}
          totalQuestions={totalQuestions}
          isAllAnswered={isAllAnswered}
          isSignedIn={isSignedIn}
          onSubmit={onSubmit}
          remaining={remaining}
          compact
        />
      </div>

      {/* ── DESKTOP BAR (in-flow, không fixed) ── */}
      <div className="submit-bar-desktop">
        <BarContent
          answersCount={answersCount}
          totalQuestions={totalQuestions}
          isAllAnswered={isAllAnswered}
          isSignedIn={isSignedIn}
          onSubmit={onSubmit}
          remaining={remaining}
          compact={false}
        />
      </div>

      {/* Toast */}
      {status.show && (
        <div className={`
          fixed left-4 right-4 md:left-auto md:right-6 md:w-80
          p-4 rounded-2xl z-[60] shadow-2xl
          animate-in slide-in-from-bottom-6 duration-300
          ${status.success ? 'bg-emerald-600' : 'bg-slate-900'}
          text-white
          /* mobile: di bottom = navbar + submit bar + gap */
          bottom-[calc(var(--nav-h)+env(safe-area-inset-bottom,0px)+72px)]
          md:bottom-8
        `}>
          <div className="flex items-center gap-3">
            {status.success
              ? <CheckCircle className="w-5 h-5 flex-shrink-0" />
              : <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />}
            <p className="text-sm font-bold">{status.message}</p>
          </div>
        </div>
      )}
    </>
  );
});

const BarContent = memo(({ answersCount, totalQuestions, isAllAnswered, isSignedIn, onSubmit, remaining, compact }) => (
  <>
    {/* Left: progress info */}
    <div className="flex flex-col min-w-0">
      <span className="text-[15px] font-bold text-slate-900 tabular-nums leading-tight">
        {answersCount}/{totalQuestions} câu
      </span>
      <span className={`text-[12px] font-semibold leading-tight mt-0.5 ${isAllAnswered ? 'text-emerald-600' : 'text-slate-400'}`}>
        {isAllAnswered ? '✓ Sẵn sàng nộp' : `Còn ${remaining} câu chưa chọn`}
      </span>
    </div>

    {/* Right: submit button */}
    <button
      onClick={onSubmit}
      className={`
        flex items-center gap-2 rounded-xl font-bold text-sm
        transition-all duration-150 active:scale-95 flex-shrink-0
        ${compact ? 'px-5 py-2.5' : 'px-7 py-3 text-base'}
        ${isAllAnswered
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
          : 'bg-slate-800 hover:bg-slate-700 text-white'}
      `}
    >
      <Send className="w-4 h-4" />
      {isSignedIn ? 'Nộp & Lưu' : 'Nộp bài'}
    </button>
  </>
));

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
const QuestionDisplay = memo(({
  selectedPart, selectedExam, partData, answers,
  onAnswerSelect, showResults, onSubmit, testType,
}) => {
  const { user: firebaseUser, isSignedIn } = useUnifiedAuth();
  const [status, setStatus] = useState({ show: false, message: '', success: false });

  const answersCount   = useMemo(() => Object.keys(answers).length, [answers]);
  const totalQuestions = useMemo(() => partData?.questions?.length || 0, [partData]);
  const percentage     = useMemo(() => totalQuestions > 0 ? (answersCount / totalQuestions) * 100 : 0, [answersCount, totalQuestions]);
  const isAllAnswered  = answersCount === totalQuestions && totalQuestions > 0;

  const handleSubmit = useCallback(async () => {
    if (!isAllAnswered) {
      const ok = window.confirm(`Bạn mới hoàn thành ${answersCount}/${totalQuestions} câu. Tiếp tục nộp?`);
      if (!ok) return;
    }

    // Gọi onSubmit (App.jsx đã bake partData vào, tự tính điểm + saveProgress)
    onSubmit();

    if (!isSignedIn) {
      setStatus({ show: true, message: 'Đăng nhập để lưu kết quả', success: false });
      setTimeout(() => setStatus({ show: false, message: '', success: false }), 3000);
      return;
    }

    setStatus({ show: true, message: '✓ Kết quả đã được lưu!', success: true });
    setTimeout(() => setStatus({ show: false, message: '', success: false }), 3000);
  }, [isAllAnswered, answersCount, totalQuestions, onSubmit, isSignedIn]);

  if (!partData?.questions || showResults) return null;

  return (
    <div className="w-full">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-30 px-4 py-3">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-[15px] font-bold text-slate-900">Practice</span>
          </div>
          <span className={`
            text-xs font-bold px-2.5 py-1 rounded-lg
            ${isAllAnswered ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}
          `}>
            {answersCount}/{totalQuestions}
          </span>
        </div>
        <ProgressBar percentage={percentage} />
      </header>

      {/* ── Questions ── */}
      <div className="px-4 pt-4
        pb-[calc(var(--nav-h)+env(safe-area-inset-bottom,0px)+80px)]
        md:pb-4
      ">
        {partData.questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            options={q.options}
            selectedAnswer={answers[q.id]}
            onAnswerSelect={onAnswerSelect}
          />
        ))}

        {/* Tips */}
        <details className="bg-white border border-slate-200 rounded-2xl overflow-hidden group mb-4">
          <summary className="flex items-center gap-2 px-4 py-3.5 cursor-pointer font-bold text-sm text-slate-700 list-none select-none">
            <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
            Mẹo làm bài
            <ChevronDown className="w-4 h-4 ml-auto text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="px-4 pb-4 text-[14px] text-slate-600 leading-relaxed space-y-2 border-t border-slate-100 pt-3">
            <p>• <b>Scanning:</b> Đọc câu hỏi trước khi nghe/đọc đoạn văn.</p>
            <p>• <b>Elimination:</b> Loại bỏ đáp án có từ vựng tiêu cực hoặc gây nhiễu.</p>
          </div>
        </details>

        {/* ── Desktop submit bar (in-flow) ── */}
        <SubmitBar
          answersCount={answersCount}
          totalQuestions={totalQuestions}
          isAllAnswered={isAllAnswered}
          isSignedIn={isSignedIn}
          onSubmit={handleSubmit}
          status={status}
        />
      </div>
    </div>
  );
});

QuestionDisplay.displayName = 'QuestionDisplay';
export default QuestionDisplay; 
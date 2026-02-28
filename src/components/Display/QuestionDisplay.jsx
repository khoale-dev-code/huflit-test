import React, { useMemo, useCallback, useState, memo } from 'react';
import { 
  Save, CheckCircle, AlertCircle, Volume2, Check, 
  Sparkles, ChevronDown, ChevronUp, Lightbulb
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';

// ==========================================
// Progress Bar (Sleek)
// ==========================================
const ProgressBar = memo(({ percentage }) => (
  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-600 transition-all duration-500 ease-out"
      style={{ width: `${percentage}%` }}
    />
  </div>
));
ProgressBar.displayName = 'ProgressBar';

// ==========================================
// Question Option (Optimized Density)
// ==========================================
const QuestionOption = memo(({ option, index, isSelected, onSelect, questionId }) => {
  const label = String.fromCharCode(65 + index);

  return (
    <label className="block cursor-pointer group">
      <input
        type="radio"
        className="sr-only"
        name={`q-${questionId}`}
        checked={isSelected}
        onChange={onSelect}
      />
      <div className={`
        flex items-center gap-3 p-3 rounded-xl border-2 transition-all
        ${isSelected
          ? 'border-blue-500 bg-blue-50/50 shadow-sm'
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

// ==========================================
// Script Display (Mobile Friendly)
// ==========================================
const ScriptDisplay = memo(({ script }) => {
  // Mặc định đóng để tiết kiệm diện tích
  const [isExpanded, setIsExpanded] = useState(false); 
  if (!script) return null;

  return (
    <div className="mb-3 border border-blue-100 bg-blue-50/30 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left active:bg-blue-100/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-blue-900 text-xs uppercase tracking-wider">Audio Script</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-blue-400" />}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
          <p className="text-[14.5px] text-slate-700 leading-relaxed italic border-t border-blue-100 pt-2">
            "{script}"
          </p>
        </div>
      )}
    </div>
  );
});
ScriptDisplay.displayName = 'ScriptDisplay';

// ==========================================
// Question Card (Material Style)
// ==========================================
const QuestionCard = memo(({
  question, script, options, selectedAnswer, onAnswerSelect, questionNumber, totalQuestions
}) => (
  <article className="bg-white border border-slate-200 rounded-2xl p-4 mb-4">
    <ScriptDisplay script={script} />

    <div className="flex items-start gap-3 mb-5">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-[13px] flex-shrink-0 mt-0.5">
        {question.id}
      </span>
      <h3 className="text-base font-bold text-slate-900 leading-snug">
        {question.question}
      </h3>
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

// ==========================================
// MAIN: QuestionDisplay (Single Column Layout)
// ==========================================
const QuestionDisplay = memo(({
  selectedPart, selectedExam, partData, answers, onAnswerSelect, showResults, onSubmit, testType
}) => {
  const { user: firebaseUser, isSignedIn } = useUnifiedAuth();
  const [submitStatus, setSubmitStatus] = useState({ show: false, message: '', success: false });

  const answersCount = useMemo(() => Object.keys(answers).length, [answers]);
  const totalQuestions = useMemo(() => partData?.questions?.length || 0, [partData?.questions?.length]);
  const percentage = useMemo(() => totalQuestions > 0 ? (answersCount / totalQuestions) * 100 : 0, [answersCount, totalQuestions]);
  const isAllAnswered = useMemo(() => answersCount === totalQuestions && totalQuestions > 0, [answersCount, totalQuestions]);

  // Logic nộp bài linh hoạt hơn
  const handleFinalSubmit = useCallback(async () => {
    if (!isAllAnswered) {
      const confirmSubmit = window.confirm(`Bạn mới hoàn thành ${answersCount}/${totalQuestions} câu. Bạn có chắc chắn muốn nộp bài?`);
      if (!confirmSubmit) return;
    }

    try {
      onSubmit();
      if (!isSignedIn) {
        setSubmitStatus({ show: true, message: 'Vui lòng đăng nhập để lưu kết quả', success: false });
        return;
      }

      setSubmitStatus({ show: true, message: 'Đang lưu kết quả...', success: false });
      
      await addDoc(collection(db, 'userProgress'), {
        firebaseUid: firebaseUser.uid,
        exam: selectedExam,
        part: selectedPart,
        answers,
        totalQuestions,
        testType,
        createdAt: serverTimestamp(),
      });

      setSubmitStatus({ show: true, message: '✓ Kết quả đã được lưu!', success: true });
      setTimeout(() => setSubmitStatus({ show: false, success: false }), 3000);
    } catch (e) {
      setSubmitStatus({ show: true, message: 'Lỗi khi lưu: ' + e.message, success: false });
    }
  }, [answers, answersCount, totalQuestions, isAllAnswered, isSignedIn, firebaseUser, onSubmit, selectedExam, selectedPart, testType]);

  if (!partData || showResults || !partData.questions) return null;

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* ── Header: Compact Single Column ── */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-30">
        <div className="w-full px-4 py-2.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h1 className="text-[15px] font-bold text-slate-900">Practice</h1>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              {answersCount}/{totalQuestions} COMPLETED
            </span>
          </div>
          <ProgressBar percentage={percentage} />
        </div>
      </header>

      {/* ── Main Content: Single Column ── */}
      <main className="w-full px-4 pt-4 pb-40">
        <div className="space-y-1 mb-6">
          {partData.questions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              script={q.script}
              options={q.options}
              selectedAnswer={answers[q.id]}
              onAnswerSelect={onAnswerSelect}
              questionNumber={idx + 1}
              totalQuestions={totalQuestions}
            />
          ))}
        </div>

        <details className="bg-white border border-slate-200 rounded-2xl overflow-hidden group mb-8">
            <summary className="flex items-center gap-2 px-4 py-4 cursor-pointer font-bold text-sm text-slate-700 list-none">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Mẹo làm bài chuyên gia
              <ChevronDown className="w-4 h-4 ml-auto text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 text-[14px] text-slate-600 leading-relaxed space-y-2 border-t border-slate-50 pt-3">
              <p>• <b>Scanning:</b> Đọc câu hỏi trước khi nghe/đọc đoạn văn.</p>
              <p>• <b>Elimination:</b> Loại bỏ đáp án gây nhiễu có từ vựng tiêu cực.</p>
            </div>
        </details>
      </main>

      {/* ── Bottom Submit Bar: Fixed Position ── */}
      <div className="fixed left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] bottom-0 px-4 py-3">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-slate-900 tabular-nums">
               Đã chọn {answersCount} câu
            </span>
            <span className={`text-[12px] font-medium ${isAllAnswered ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isAllAnswered ? '● Sẵn sàng nộp bài' : `● Còn thiếu ${totalQuestions - answersCount} câu`}
            </span>
          </div>

          <button
            onClick={handleFinalSubmit}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex-shrink-0
              ${isAllAnswered 
                ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg' 
                : 'bg-slate-800 text-white opacity-90'}
            `}
          >
            <Save className="w-4 h-4" />
            <span>{isSignedIn ? 'Nộp & Lưu' : 'Nộp bài'}</span>
          </button>
        </div>
      </div>

      {/* ── Toast: Floating Toast ── */}
      {submitStatus.show && (
        <div className={`
          fixed left-4 right-4 p-4 rounded-2xl z-50 shadow-2xl animate-in slide-in-from-bottom-10
          bottom-28
          ${submitStatus.success ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'}
        `}>
          <div className="flex items-center gap-3">
            {submitStatus.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-amber-400" />}
            <p className="text-sm font-bold">{submitStatus.message}</p>
          </div>
        </div>
      )}
    </div>
  );
});

QuestionDisplay.displayName = 'QuestionDisplay';
export default QuestionDisplay;
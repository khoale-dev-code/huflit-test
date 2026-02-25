import React, { useMemo, useCallback, useState, memo } from 'react';
import { 
  Save, CheckCircle, AlertCircle, Volume2, Check, 
  Sparkles, Clock, Zap, Lightbulb, ChevronDown, ChevronUp
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';

// ==========================================
// Progress Bar (Simple)
// ==========================================
const ProgressBar = memo(({ percentage }) => (
  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
      style={{ width: `${percentage}%` }}
    />
  </div>
));

ProgressBar.displayName = 'ProgressBar';

// ==========================================
// Question Option (Compact)
// ==========================================
const QuestionOption = memo(({ 
  option, 
  index, 
  isSelected, 
  onSelect, 
  questionId
}) => {
  const label = String.fromCharCode(65 + index);

  return (
    <label className="block cursor-pointer">
      <input
        type="radio"
        className="sr-only"
        name={`q-${questionId}`}
        checked={isSelected}
        onChange={onSelect}
      />
      
      <div className={`
        flex items-center gap-3 p-3 rounded-lg border-2 transition-all
        ${isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'}
      `}>
        <div className={`
          w-7 h-7 rounded-lg flex items-center justify-center font-semibold text-xs
          ${isSelected 
            ? 'bg-blue-600 text-white' 
            : 'bg-slate-100 text-slate-600'}
        `}>
          {label}
        </div>
        
        <span className={`
          text-sm leading-snug flex-1
          ${isSelected ? 'text-slate-900 font-semibold' : 'text-slate-700'}
        `}>
          {option}
        </span>

        {isSelected && (
          <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
        )}
      </div>
    </label>
  );
});

QuestionOption.displayName = 'QuestionOption';

// ==========================================
// Script Display (Collapsible)
// ==========================================
const ScriptDisplay = memo(({ script, questionId }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!script) return null;

  return (
    <div className="mb-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start gap-3 text-left hover:opacity-70 transition-opacity"
      >
        <Volume2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-bold text-blue-900 text-sm">🎧 Bài nghe</p>
          {isExpanded && (
            <p className="text-sm text-slate-700 leading-relaxed mt-2 break-words">
              {script}
            </p>
          )}
        </div>
        <div className="mt-0.5">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-blue-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-blue-600" />
          )}
        </div>
      </button>
    </div>
  );
});

ScriptDisplay.displayName = 'ScriptDisplay';

// ==========================================
// Question Card (Larger, Better Spacing)
// ==========================================
const QuestionCard = memo(({ 
  question, 
  script, 
  options, 
  selectedAnswer, 
  onAnswerSelect,
  questionNumber,
  totalQuestions 
}) => {
  return (
    <article className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
      <ScriptDisplay script={script} questionId={question.id} />

      <div className="flex items-baseline gap-3 mb-5">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex-shrink-0">
          {question.id}
        </span>
        
        <h3 className="text-base font-semibold text-slate-900 flex-1">
          {question.question}
        </h3>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex-shrink-0">
          {questionNumber}/{totalQuestions}
        </span>
      </div>

      <div className="space-y-2.5 mb-3">
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

      {selectedAnswer !== undefined && (
        <div className="pt-3 border-t border-slate-200 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold text-emerald-900">
              ✓ Đã chọn: ({String.fromCharCode(65 + selectedAnswer)})
            </span>
          </div>
        </div>
      )}
    </article>
  );
});

QuestionCard.displayName = 'QuestionCard';

// ==========================================
// MAIN: QuestionDisplay (Optimized)
// ==========================================
const QuestionDisplay = memo(({
  selectedPart,
  selectedExam,
  partData,
  answers,
  onAnswerSelect,
  showResults,
  onSubmit,
  testType
}) => {
  const { user: firebaseUser, isSignedIn } = useUnifiedAuth();
  const [submitStatus, setSubmitStatus] = useState({ show: false, message: '', success: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Computed values
  const answersCount = useMemo(() => Object.keys(answers).length, [answers]);
  const totalQuestions = useMemo(() => partData?.questions?.length || 0, [partData?.questions?.length]);
  const percentage = useMemo(() => totalQuestions > 0 ? (answersCount / totalQuestions) * 100 : 0, [answersCount, totalQuestions]);
  const isAllAnswered = useMemo(() => answersCount === totalQuestions && totalQuestions > 0, [answersCount, totalQuestions]);

  const getUserIdentifier = useCallback(() => {
    if (firebaseUser) {
      return {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Anonymous'
      };
    }
    return null;
  }, [firebaseUser]);

  const handleSubmitWithSave = useCallback(async () => {
    try {
      onSubmit();

      if (!isSignedIn) {
        setSubmitStatus({
          show: true,
          message: 'Vui lòng đăng nhập để lưu kết quả',
          success: false
        });
        setTimeout(() => setSubmitStatus({ show: false, message: '', success: false }), 3000);
        return;
      }

      const userIdentifier = getUserIdentifier();
      if (!userIdentifier) {
        setSubmitStatus({
          show: true,
          message: 'Không thể xác định người dùng',
          success: false
        });
        return;
      }

      setSubmitStatus({
        show: true,
        message: 'Đang lưu kết quả...',
        success: false
      });

      const dataToSave = {
        firebaseUid: userIdentifier.firebaseUid,
        email: userIdentifier.email,
        displayName: userIdentifier.displayName,
        exam: selectedExam,
        part: selectedPart,
        answers: answers,
        totalQuestions: totalQuestions,
        testType: testType,
        createdAt: serverTimestamp(),
        completedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'userProgress'), dataToSave);

      setSubmitStatus({
        show: true,
        message: '✓ Đã lưu thành công!',
        success: true
      });

      setTimeout(() => setSubmitStatus({ show: false, message: '', success: false }), 3000);

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        show: true,
        message: `Lỗi: ${error.message}`,
        success: false
      });
    }
  }, [isSignedIn, getUserIdentifier, onSubmit, selectedExam, selectedPart, answers, totalQuestions, testType]);

  if (!partData || showResults || !partData.questions) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header - Sticky */}
      <header className="sticky top-0 bg-white border-b border-slate-200 shadow-sm z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Sparkles className="w-5 h-5 text-blue-600 fill-blue-600 flex-shrink-0" />
            <h1 className="text-lg font-bold text-slate-900 truncate">Practice Mode</h1>
            <span className="text-xs text-slate-600 hidden sm:inline">TOEIC {testType?.toUpperCase()}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Progress Desktop */}
            <div className="hidden sm:block text-right">
              <div className="text-2xl font-bold text-blue-600">{Math.round(percentage)}%</div>
              <p className="text-xs text-slate-600">{answersCount}/{totalQuestions}</p>
            </div>

            {/* Mobile Progress */}
            <div className="sm:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-bold text-blue-600"
              >
                {answersCount}/{totalQuestions}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout - No nested scroll */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        
        {/* Left: Questions - Full scrollable area */}
        <div className="flex-1 min-w-0">
          <div className="space-y-4">
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

          {/* Mobile Submit Button */}
          <div className="mt-8 sm:hidden">
            <button
              disabled={!isAllAnswered}
              onClick={handleSubmitWithSave}
              className={`
                w-full py-3 px-4 rounded-lg font-bold text-base transition-all
                ${isAllAnswered 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'}
              `}
            >
              <Save className="w-5 h-5 inline mr-2" />
              {isSignedIn ? 'Nộp & Lưu' : 'Nộp bài'}
            </button>
          </div>
        </div>

        {/* Right: Sidebar (Desktop) */}
        <aside className="hidden sm:block w-72 flex-shrink-0 sticky top-24 h-fit z-10">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            {/* Status */}
            <div className="text-center pb-4 border-b border-slate-200">
              <p className="text-xs font-bold text-slate-600 uppercase mb-2">Tiến độ</p>
              <div className="text-4xl font-bold text-blue-600 mb-2">{Math.round(percentage)}%</div>
              <ProgressBar percentage={percentage} />
              <p className="text-xs text-slate-600 mt-2">{answersCount}/{totalQuestions} câu trả lời</p>
            </div>

            {/* Status Message */}
            <div className={`p-3 rounded-lg text-xs font-semibold text-center ${
              isAllAnswered 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
                : 'bg-amber-50 border border-amber-200 text-amber-900'
            }`}>
              {isAllAnswered 
                ? '✓ Sẵn sàng nộp bài!' 
                : `Cần ${totalQuestions - answersCount} câu nữa`}
            </div>

            {/* Submit Button */}
            <button
              disabled={!isAllAnswered}
              onClick={handleSubmitWithSave}
              className={`
                w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all
                ${isAllAnswered 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'}
              `}
            >
              <Save className="w-4 h-4 inline mr-2" />
              {isSignedIn ? 'Nộp & Lưu' : 'Nộp'}
            </button>

            {!isSignedIn && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">Đăng nhập để lưu kết quả</p>
              </div>
            )}

            {/* Tips */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900">Mẹo</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>• Chú ý từ khóa trùng</li>
                <li>• Đọc kỹ tất cả đáp án</li>
                <li>• Không để quá nhiều</li>
              </ul>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-200">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <Clock className="w-4 h-4 text-slate-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-600">Thời gian</p>
                <p className="text-xs font-semibold text-slate-900">Tự do</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <Zap className="w-4 h-4 text-slate-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-600">Độ khó</p>
                <p className="text-xs font-semibold text-slate-900">Trung bình</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Sidebar Modal */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-40 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 z-50 sm:hidden space-y-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-900">Tiến độ</h2>
              <button onClick={() => setSidebarOpen(false)}>×</button>
            </div>

            <div className="text-center pb-4 border-b border-slate-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">{Math.round(percentage)}%</div>
              <ProgressBar percentage={percentage} />
              <p className="text-sm text-slate-600 mt-2">{answersCount}/{totalQuestions} câu</p>
            </div>

            <div className={`p-3 rounded-lg text-sm font-semibold text-center ${
              isAllAnswered 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
                : 'bg-amber-50 border border-amber-200 text-amber-900'
            }`}>
              {isAllAnswered 
                ? '✓ Sẵn sàng nộp!' 
                : `Cần ${totalQuestions - answersCount} câu`}
            </div>

            <button
              disabled={!isAllAnswered}
              onClick={() => {
                handleSubmitWithSave();
                setSidebarOpen(false);
              }}
              className={`
                w-full py-3 px-4 rounded-lg font-bold transition-all
                ${isAllAnswered 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'}
              `}
            >
              {isSignedIn ? 'Nộp & Lưu' : 'Nộp bài'}
            </button>
          </div>
        </>
      )}

      {/* Status Notification */}
      {submitStatus.show && (
        <div className={`
          fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 p-4 rounded-lg z-50
          animate-in fade-in slide-in-from-bottom-4 duration-300
          ${submitStatus.success 
            ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' 
            : 'bg-amber-50 border border-amber-300 text-amber-900'}
        `}>
          <div className="flex items-center gap-3">
            {submitStatus.success ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm font-semibold">{submitStatus.message}</span>
          </div>
        </div>
      )}
    </div>
  );
});

QuestionDisplay.displayName = 'QuestionDisplay';

export default QuestionDisplay;
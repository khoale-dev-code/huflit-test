import React, { useMemo, useCallback, useState, memo, useEffect } from 'react';
import { 
  Save, CheckCircle, AlertCircle, Volume2, Check, 
  ChevronRight, Sparkles, Clock, Zap, Lightbulb, X, Menu
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';

// ==========================================
// SUB-COMPONENT: Animated Progress Bar
// ==========================================
const ProgressBar = memo(({ percentage }) => (
  <div className="relative h-2.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-sm">
    <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
    
    <div
      className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 transition-all duration-900 ease-out rounded-full shadow-lg shadow-blue-500/30 relative overflow-hidden"
      style={{ width: `${percentage}%` }}
    >
      <div className="absolute inset-y-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[slide_3s_infinite] skew-x-12" />
    </div>
  </div>
));

ProgressBar.displayName = 'ProgressBar';

// ==========================================
// SUB-COMPONENT: Question Option
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
    <label className="block group cursor-pointer relative">
      <input
        type="radio"
        className="sr-only"
        name={`q-${questionId}`}
        checked={isSelected}
        onChange={onSelect}
        aria-label={`${label}. ${option}`}
      />
      
      <div className={`
        relative flex items-center gap-3 p-3 sm:p-3.5 rounded-lg border-2 
        transition-all duration-300 ease-out overflow-hidden
        ${isSelected 
          ? 'border-blue-500 bg-gradient-to-r from-blue-50/80 to-cyan-50/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 hover:shadow-md'}
      `}>
        {isSelected && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 animate-pulse" />
        )}

        <div className={`
          relative flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center 
          text-xs font-bold transition-all duration-300
          ${isSelected 
            ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md' 
            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'}
        `}>
          {label}
        </div>
        
        <span className={`
          relative text-sm sm:text-[14px] leading-relaxed transition-colors duration-200 flex-1 line-clamp-2
          ${isSelected ? 'text-slate-900 font-semibold' : 'text-slate-700 group-hover:text-slate-800'}
        `}>
          {option}
        </span>

        {isSelected && (
          <div className="relative animate-in zoom-in duration-300 flex-shrink-0">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>
    </label>
  );
});

QuestionOption.displayName = 'QuestionOption';

// ==========================================
// SUB-COMPONENT: Script Display
// ==========================================
const ScriptDisplay = memo(({ script }) => {
  if (!script) return null;

  return (
    <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-br from-blue-50/80 to-cyan-50/40 rounded-lg border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-3">
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
            📻 Bài nghe
          </p>
          <p className="text-[13px] sm:text-[13.5px] text-slate-700 leading-relaxed font-[450] break-words">
            {script}
          </p>
        </div>
      </div>
    </div>
  );
});

ScriptDisplay.displayName = 'ScriptDisplay';

// ==========================================
// SUB-COMPONENT: Question Card
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
  const isAnswered = selectedAnswer !== undefined;

  return (
    <article 
      className="group relative bg-white border border-slate-200 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:border-blue-300 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 scroll-m-4"
      role="region"
      aria-label={`Question ${question.id}`}
    >
      <ScriptDisplay script={script} />

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-200">
        <div className="flex items-baseline gap-2 sm:gap-3 flex-1 min-w-0">
          <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 text-white text-xs font-bold shadow-md">
            {question.id}
          </span>
          
          <h3 className="text-sm sm:text-[15px] font-semibold text-slate-900 leading-snug flex-1">
            {question.question}
          </h3>
        </div>

        <div className="flex-shrink-0">
          <span className="inline-block text-[11px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap">
            {questionNumber}/{totalQuestions}
          </span>
        </div>
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

      {isAnswered && selectedAnswer !== undefined && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 text-xs bg-emerald-50 p-2.5 sm:p-3 rounded-lg border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" strokeWidth={2.5} />
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
// SUB-COMPONENT: Floating Progress Button (Mobile)
// ==========================================
const FloatingProgressButton = memo(({ 
  onClick, 
  answersCount, 
  totalQuestions,
  isAllAnswered 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-20 sm:bottom-16 md:bottom-12 right-6 lg:hidden z-40 
        w-14 h-14 rounded-full shadow-lg transition-all duration-300
        flex items-center justify-center font-bold text-sm
        ${isAllAnswered
          ? 'bg-gradient-to-br from-blue-600 to-cyan-500 hover:shadow-xl hover:scale-110 text-white'
          : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-50'}
      `}
      aria-label="Show progress and submit"
      disabled={!isAllAnswered}
      title={`${answersCount}/${totalQuestions} answered`}
    >
      <span className="text-lg font-bold">
        {answersCount}/{totalQuestions}
      </span>
    </button>
  );
});

FloatingProgressButton.displayName = 'FloatingProgressButton';

// ==========================================
// SUB-COMPONENT: Mobile Sidebar Modal
// ==========================================
const MobileSidebarModal = memo(({ 
  isOpen, 
  onClose,
  answersCount,
  totalQuestions,
  percentage,
  isSignedIn,
  handleSubmitWithSave,
  isAllAnswered
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 lg:hidden flex items-end">
        <div className="w-full bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
            <h2 className="font-bold text-slate-900 text-lg">Tiến độ & Hành động</h2>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close progress modal"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Status Card */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-xl p-5 sm:p-6 shadow-lg overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-5">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Trạng thái làm bài
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      {answersCount}
                    </span>
                    <span className="text-slate-400 text-sm font-semibold">/{totalQuestions} câu</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <ProgressBar percentage={percentage} />
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Hoàn thành: {Math.round(percentage)}%</span>
                    <span>{totalQuestions - answersCount} còn lại</span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg text-xs font-semibold text-center transition-all ${
                  isAllAnswered 
                    ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-200' 
                    : 'bg-amber-500/20 border border-amber-400/50 text-amber-200'
                }`}>
                  {isAllAnswered 
                    ? '✓ Sẵn sàng nộp bài!' 
                    : `Cần trả lời thêm ${totalQuestions - answersCount} câu`}
                </div>

                <button
                  disabled={!isAllAnswered}
                  onClick={handleSubmitWithSave}
                  className={`
                    w-full group relative flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-lg 
                    font-bold text-xs sm:text-sm transition-all overflow-hidden
                    ${isAllAnswered 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-600/40 active:scale-95 cursor-pointer text-white' 
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-60'}
                  `}
                  aria-disabled={!isAllAnswered}
                >
                  {isAllAnswered && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  )}
                  
                  <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative flex-shrink-0" strokeWidth={2} />
                  <span className="relative whitespace-nowrap">
                    {isSignedIn ? (
                      <>
                        <span className="inline sm:hidden">Nộp & Lưu</span>
                        <span className="hidden sm:inline">Nộp & Lưu kết quả</span>
                      </>
                    ) : 'Nộp bài'}
                  </span>
                </button>

                {!isSignedIn && (
                  <div className="flex items-start gap-2 p-3 bg-amber-500/15 border border-amber-400/30 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-xs text-amber-100/90 font-[450]">
                      Đăng nhập để lưu kết quả và theo dõi tiến độ.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                <h4 className="text-sm font-bold text-slate-900">Mẹo làm bài</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-[450]">
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
                  <span>Chú ý từ khóa "trùng lặp" trong bài nghe</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
                  <span>Đọc kỹ tất cả các đáp án trước khi chọn</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
                  <span>Không để quá nhiều câu để cuối cùng</span>
                </li>
              </ul>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="w-4 h-4 text-slate-600" strokeWidth={2} />
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Thời gian
                </p>
                <p className="text-sm font-bold text-slate-900">Tự do</p>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Zap className="w-4 h-4 text-slate-600" strokeWidth={2} />
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Độ khó
                </p>
                <p className="text-sm font-bold text-slate-900">Trung bình</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

MobileSidebarModal.displayName = 'MobileSidebarModal';

// ==========================================
// SUB-COMPONENT: Desktop Progress Sidebar
// ==========================================
const DesktopSidebar = memo(({ 
  answersCount, 
  totalQuestions, 
  percentage,
  isSignedIn,
  handleSubmitWithSave,
  isAllAnswered
}) => {
  return (
    <aside className="hidden lg:flex flex-col w-80 h-screen sticky top-0 pt-4 pb-6 overflow-hidden">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto pr-3 space-y-4 scroll-smooth scrollbar-hide">
        {/* Status Card */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-lg overflow-hidden flex-shrink-0">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-5">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                Trạng thái làm bài
              </p>
              <p className="text-2xl font-bold">Tiến độ</p>
            </div>

            <div className="text-center">
              <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {answersCount}
              </span>
              <p className="text-slate-400 text-xs font-semibold mt-1">/{totalQuestions} câu</p>
            </div>

            <div className="space-y-2">
              <ProgressBar percentage={percentage} />
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Hoàn thành: {Math.round(percentage)}%</span>
                <span>{totalQuestions - answersCount} còn</span>
              </div>
            </div>

            <div className={`p-3 rounded-lg text-xs font-semibold text-center transition-all ${
              isAllAnswered 
                ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-200' 
                : 'bg-amber-500/20 border border-amber-400/50 text-amber-200'
            }`}>
              {isAllAnswered 
                ? '✓ Sẵn sàng nộp!' 
                : `Cần ${totalQuestions - answersCount} câu`}
            </div>

            <button
              disabled={!isAllAnswered}
              onClick={handleSubmitWithSave}
              className={`
                w-full group relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg 
                font-bold text-xs sm:text-sm transition-all overflow-hidden
                ${isAllAnswered 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-600/40 active:scale-95 cursor-pointer text-white' 
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-60'}
              `}
              aria-disabled={!isAllAnswered}
            >
              {isAllAnswered && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              )}
              
              <Save className="w-4 h-4 relative flex-shrink-0" strokeWidth={2} />
              <span className="relative text-xs">
                {isSignedIn ? 'Nộp & Lưu' : 'Nộp'}
              </span>
            </button>

            {!isSignedIn && (
              <div className="flex items-start gap-2 p-2.5 bg-amber-500/15 border border-amber-400/30 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-xs text-amber-100/90 font-[450] leading-snug">
                  Đăng nhập để lưu.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={2} />
            <h4 className="text-sm font-bold text-slate-900">Mẹo làm bài</h4>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 font-[450]">
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
              <span>Chú ý từ khóa trùng lặp</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
              <span>Đọc kỹ tất cả đáp án</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold flex-shrink-0">•</span>
              <span>Không để quá nhiều câu</span>
            </li>
          </ul>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 flex-shrink-0">
          <div className="bg-white rounded-lg border border-slate-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">
              <Clock className="w-4 h-4 text-slate-600" strokeWidth={2} />
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Thời gian
            </p>
            <p className="text-sm font-bold text-slate-900">Tự do</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">
              <Zap className="w-4 h-4 text-slate-600" strokeWidth={2} />
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Độ khó
            </p>
            <p className="text-sm font-bold text-slate-900">Trung bình</p>
          </div>
        </div>
      </div>

      {/* Scrollbar Style */}
      <style>{`
        aside .scroll-smooth::-webkit-scrollbar {
          width: 6px;
        }
        aside .scroll-smooth::-webkit-scrollbar-track {
          background: transparent;
        }
        aside .scroll-smooth::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        aside .scroll-smooth::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </aside>
  );
});

DesktopSidebar.displayName = 'DesktopSidebar';

// ==========================================
// SUB-COMPONENT: Tablet Sidebar (for md breakpoint)
// ==========================================
const TabletSidebar = memo(({ 
  answersCount, 
  totalQuestions, 
  percentage,
  isSignedIn,
  handleSubmitWithSave,
  isAllAnswered
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="hidden md:flex lg:hidden flex-col w-full">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg mb-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-blue-600">{Math.round(percentage)}%</span>
          <span className="text-sm font-semibold text-slate-600">{answersCount}/{totalQuestions} câu</span>
        </div>
        <ChevronRight className={`w-5 h-5 text-blue-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 mb-8 pb-6">
          {/* Status Card */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-lg overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-4">
              <div className="space-y-2">
                <ProgressBar percentage={percentage} />
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Hoàn thành: {Math.round(percentage)}%</span>
                  <span>{totalQuestions - answersCount} còn</span>
                </div>
              </div>

              <div className={`p-3 rounded-lg text-xs font-semibold text-center transition-all ${
                isAllAnswered 
                  ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-200' 
                  : 'bg-amber-500/20 border border-amber-400/50 text-amber-200'
              }`}>
                {isAllAnswered 
                  ? '✓ Sẵn sàng nộp!' 
                  : `Cần ${totalQuestions - answersCount} câu`}
              </div>

              <button
                disabled={!isAllAnswered}
                onClick={handleSubmitWithSave}
                className={`
                  w-full group relative flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg 
                  font-bold text-xs sm:text-sm transition-all overflow-hidden
                  ${isAllAnswered 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-600/40 active:scale-95 cursor-pointer text-white' 
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-60'}
                `}
                aria-disabled={!isAllAnswered}
              >
                {isAllAnswered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                )}
                
                <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative flex-shrink-0" strokeWidth={2} />
                <span className="relative whitespace-nowrap text-xs sm:text-xs">
                  {isSignedIn ? 'Nộp & Lưu' : 'Nộp'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

TabletSidebar.displayName = 'TabletSidebar';

// ==========================================
// MAIN COMPONENT: QuestionDisplay
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

  // ===== COMPUTED VALUES =====
  const answersCount = useMemo(() => Object.keys(answers).length, [answers]);
  const totalQuestions = useMemo(() => partData?.questions?.length || 0, [partData?.questions?.length]);
  const percentage = useMemo(() => totalQuestions > 0 ? (answersCount / totalQuestions) * 100 : 0, [answersCount, totalQuestions]);
  const isAllAnswered = useMemo(() => answersCount === totalQuestions && totalQuestions > 0, [answersCount, totalQuestions]);

  // ===== HELPERS =====
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

  // ===== SUBMIT HANDLER =====
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
        setTimeout(() => setSubmitStatus({ show: false, message: '', success: false }), 3000);
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
        message: 'Đã lưu thành công!',
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
      setTimeout(() => setSubmitStatus({ show: false, message: '', success: false }), 3000);
    }
  }, [isSignedIn, getUserIdentifier, onSubmit, selectedExam, selectedPart, answers, totalQuestions, testType]);

  // ===== RENDER CONDITION =====
  if (!partData || showResults || !partData.questions) {
    return null;
  }

  // ===== MAIN RENDER =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-x-hidden" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
      
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-60 h-60 md:w-96 md:h-96 bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 md:w-96 md:h-96 bg-slate-100/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-20 sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 fill-blue-600 flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 truncate">Practice Mode</h1>
              <p className="text-[10px] sm:text-xs text-slate-600 font-[450]">
                TOEIC {testType?.toUpperCase() || 'TRAINING'}
              </p>
            </div>
          </div>
          
          {/* Desktop Progress Indicator */}
          <div className="hidden sm:block text-right flex-shrink-0 ml-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Tiến độ
            </div>
            <div className="text-2xl md:text-3xl font-black text-blue-600">
              {Math.round(percentage)}%
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 pb-40 sm:pb-32 md:pb-24 lg:pb-8">
        
        {/* Questions Area */}
        <div className="mb-6 md:mb-0 flex flex-col lg:flex-row gap-6">
          
          {/* Left: Questions (Main Content) */}
          <div className="flex-1 min-w-0">
            <div className="overflow-y-auto max-h-[calc(100vh-240px)] lg:max-h-[calc(100vh-180px)] scroll-smooth pr-2 sm:pr-4">
              <div className="space-y-4 pb-8 sm:pb-6">
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
            </div>

            {/* Scrollbar styling */}
            <style>{`
              div.overflow-y-auto::-webkit-scrollbar {
                width: 6px;
              }
              div.overflow-y-auto::-webkit-scrollbar-track {
                background: transparent;
              }
              div.overflow-y-auto::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 3px;
              }
              div.overflow-y-auto::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
              }
            `}</style>

            {/* Mobile: Submit Button Below Questions */}
            <div className="lg:hidden mt-4 pt-4 border-t border-slate-200">
              <button
                disabled={!isAllAnswered}
                onClick={handleSubmitWithSave}
                className={`
                  w-full group relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg 
                  font-bold text-sm transition-all overflow-hidden
                  ${isAllAnswered 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-600/40 active:scale-95 cursor-pointer text-white' 
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-60'}
                `}
                aria-disabled={!isAllAnswered}
              >
                {isAllAnswered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                )}
                
                <Save className="w-4 h-4 relative flex-shrink-0" strokeWidth={2} />
                <span className="relative">
                  {isSignedIn ? 'Nộp & Lưu kết quả' : 'Nộp bài'}
                </span>
              </button>

              {!isAllAnswered && (
                <p className="text-xs text-slate-500 text-center mt-2 font-[450]">
                  Vui lòng trả lời tất cả {totalQuestions - answersCount} câu còn lại
                </p>
              )}
            </div>
          </div>

          {/* Right: Desktop Sidebar (lg+) */}
          <div className="hidden lg:block">
            <DesktopSidebar
              answersCount={answersCount}
              totalQuestions={totalQuestions}
              percentage={percentage}
              isSignedIn={isSignedIn}
              handleSubmitWithSave={handleSubmitWithSave}
              isAllAnswered={isAllAnswered}
            />
          </div>
        </div>

        {/* Tablet Sidebar (md-lg) */}
        <TabletSidebar
          answersCount={answersCount}
          totalQuestions={totalQuestions}
          percentage={percentage}
          isSignedIn={isSignedIn}
          handleSubmitWithSave={handleSubmitWithSave}
          isAllAnswered={isAllAnswered}
        />
      </div>

      {/* Mobile Floating Button - Hidden since we moved submit button below questions */}
      {/* FloatingProgressButton will no longer be used on mobile */}

      {/* Mobile Sidebar Modal - No longer needed, submit button is now below questions */}
      {/* MobileSidebarModal will no longer be used */}

      {/* Submit Status Notification */}
      {submitStatus.show && (
        <div className={`
          fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm p-4 rounded-lg z-50
          animate-in fade-in slide-in-from-bottom-4 duration-300
          ${submitStatus.success 
            ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' 
            : 'bg-amber-50 border border-amber-300 text-amber-900'}
        `}>
          <div className="flex items-center gap-3">
            {submitStatus.success ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
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
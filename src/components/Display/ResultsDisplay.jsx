import React, { useState, useMemo } from 'react';
import { Trophy, Target, CheckCircle, XCircle, RotateCcw, Award, TrendingUp, Flame, Award as AwardIcon, ArrowRight } from 'lucide-react';
import ExplanationSection from './ExplanationDisplay';

/**
 * ==========================================
 * RESULTS DISPLAY - EXPERT PROFESSIONAL
 * ==========================================
 * 
 * Design Philosophy:
 * - Visual Hierarchy & Gestalt Principles
 * - Color Psychology for emotional engagement
 * - Minimalism with luxury refinement
 * - Marketing Psychology & Conversion Optimization
 * - Pixel-perfect responsive design
 */

// ==========================================
// SUB-COMPONENT: Score Card
// ==========================================
const ScoreCard = ({ icon: Icon, label, value, suffix, accentColor, bgColor }) => (
  <article className={`${bgColor} rounded-2xl border border-slate-200 p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300`}>
    <div className="flex justify-center mb-4">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-md`}>
        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
      </div>
    </div>
    
    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-2">
      {label}
    </p>
    
    <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-1">
      {value}
      <span className="text-2xl md:text-3xl text-slate-400 font-semibold ml-1.5">
        {suffix}
      </span>
    </p>
  </article>
);

// ==========================================
// SUB-COMPONENT: Performance Badge
// ==========================================
const PerformanceBadge = ({ performance, score }) => {
  const bgGradients = {
    emerald: 'from-emerald-50 to-emerald-50/70 border-emerald-300',
    teal: 'from-teal-50 to-teal-50/70 border-teal-300',
    blue: 'from-blue-50 to-blue-50/70 border-blue-300',
    amber: 'from-amber-50 to-amber-50/70 border-amber-300',
    orange: 'from-orange-50 to-orange-50/70 border-orange-300',
    red: 'from-red-50 to-red-50/70 border-red-300'
  };

  const textColors = {
    emerald: 'text-emerald-900',
    teal: 'text-teal-900',
    blue: 'text-blue-900',
    amber: 'text-amber-900',
    orange: 'text-orange-900',
    red: 'text-red-900'
  };

  const iconGradients = {
    emerald: 'from-emerald-600 to-emerald-500',
    teal: 'from-teal-600 to-teal-500',
    blue: 'from-blue-600 to-blue-500',
    amber: 'from-amber-600 to-amber-500',
    orange: 'from-orange-600 to-orange-500',
    red: 'from-red-600 to-red-500'
  };

  return (
    <div className={`bg-gradient-to-br ${bgGradients[performance.color]} border-2 rounded-2xl p-6 md:p-8 text-center`}>
      <div className="flex justify-center mb-4">
        <div className={`text-5xl md:text-6xl filter drop-shadow-lg`}>
          {performance.emoji}
        </div>
      </div>
      
      <p className={`text-2xl md:text-3xl font-bold ${textColors[performance.color]} mb-2`}>
        {performance.label}
      </p>
      
      <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
        {score.percentage.toFixed(0)}% chính xác
      </p>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: Progress Ring
// ==========================================
const ProgressRing = ({ percentage, size = 120 }) => {
  const radius = size / 2 - 8;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (pct) => {
    if (pct >= 90) return '#10b981';
    if (pct >= 80) return '#14b8a6';
    if (pct >= 70) return '#0ea5e9';
    if (pct >= 60) return '#f59e0b';
    if (pct >= 50) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(percentage)}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute text-center">
        <p className="text-2xl md:text-3xl font-bold text-slate-900">
          {percentage.toFixed(0)}%
        </p>
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-1">
          Đạt được
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: Quick Stats
// ==========================================
const QuickStat = ({ icon: Icon, label, value, color }) => (
  <div className={`bg-gradient-to-br from-${color}-50 to-${color}-50/70 rounded-xl border border-${color}-200 p-4 md:p-5`}>
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 text-${color}-700`} strokeWidth={2.2} />
      </div>
      
      <div>
        <p className={`text-xs font-semibold text-${color}-700 uppercase tracking-wider`}>
          {label}
        </p>
        <p className={`text-2xl md:text-3xl font-bold text-${color}-900 mt-0.5`}>
          {value}
        </p>
      </div>
    </div>
  </div>
);

// ==========================================
// SUB-COMPONENT: Answer Review Card
// ==========================================
const AnswerReviewCard = ({ question, isCorrect, userAnswer, correctAnswer, options }) => {
  const [expanded, setExpanded] = useState(false);

  const userAnswerText = userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : 'Chưa chọn';
  const correctAnswerText = String.fromCharCode(65 + correctAnswer);

  return (
    <article 
      className={`
        rounded-xl border-2 overflow-hidden transition-all duration-200
        ${isCorrect
          ? 'bg-emerald-50/80 border-emerald-300 hover:shadow-md'
          : 'bg-red-50/80 border-red-300 hover:shadow-md'
        }
      `}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 md:p-5 flex items-start gap-4 text-left hover:bg-black/5 transition-colors"
      >
        {/* Status Icon */}
        <div className={`
          w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 
          ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}
        `}>
          {isCorrect ? (
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
          ) : (
            <XCircle className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
          )}
        </div>

        {/* Question Info */}
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-sm md:text-base mb-2 ${isCorrect ? 'text-emerald-900' : 'text-red-900'}`}>
            Câu {question.id}: {question.question}
          </p>

          {/* Answer Summary */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Bạn chọn:</span>
            <span className={`
              text-xs font-bold px-3 py-1 rounded-full text-white
              ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}
            `}>
              ({userAnswerText}) {options?.[userAnswer]?.substring(0, 20) || 'Chưa chọn'}
            </span>

            {!isCorrect && (
              <>
                <span className="text-xs font-semibold text-slate-700">| Đáp án:</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500 text-white">
                  ({correctAnswerText}) {options?.[correctAnswer]?.substring(0, 20)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Expand Indicator */}
        <div className={`flex-shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <ArrowRight className="w-5 h-5 text-slate-400" strokeWidth={2} />
        </div>
      </button>

      {/* Explanation Section */}
      {expanded && question.explanation && (
        <div className="border-t border-slate-300/50 px-4 md:px-5 py-4 md:py-5 bg-black/2.5">
          <ExplanationSection 
            explanation={question.explanation}
            question={question.question}
            userAnswer={userAnswer}
            correctAnswer={correctAnswer}
            isCorrect={isCorrect}
            questionId={question.id}
            options={question.options}
          />
        </div>
      )}
    </article>
  );
};

// ==========================================
// SUB-COMPONENT: Motivational Message
// ==========================================
const MotivationalMessage = ({ score }) => {
  const getMotivation = (percentage) => {
    if (percentage >= 90) {
      return {
        emoji: '🎉',
        title: 'Xuất sắc!',
        message: 'Bạn đã làm rất tuyệt vời! Kiến thức của bạn rất vững chắc.',
        color: 'emerald'
      };
    }
    if (percentage >= 80) {
      return {
        emoji: '👏',
        title: 'Rất tốt!',
        message: 'Tuyệt vời! Tiếp tục phát huy và cố gắng vượt qua 90%.',
        color: 'teal'
      };
    }
    if (percentage >= 70) {
      return {
        emoji: '👍',
        title: 'Khá tốt!',
        message: 'Bạn đang trên đường đúng. Hãy luyện tập thêm những phần yếu.',
        color: 'blue'
      };
    }
    if (percentage >= 60) {
      return {
        emoji: '📈',
        title: 'Vẫn được!',
        message: 'Mỗi lần luyện tập bạn sẽ tiến bộ hơn. Tiếp tục cố gắng!',
        color: 'amber'
      };
    }
    return {
      emoji: '💪',
      title: 'Đừng nản lòng!',
      message: 'Đây là bước đầu tiên của hành trình. Cứ tiếp tục luyện tập!',
      color: 'orange'
    };
  };

  const motivation = getMotivation(score.percentage);

  return (
    <div className={`
      bg-gradient-to-br from-${motivation.color}-50 to-${motivation.color}-50/70
      border-2 border-${motivation.color}-300
      rounded-2xl p-6 md:p-8 text-center
    `}>
      <p className="text-5xl md:text-6xl mb-3 filter drop-shadow-lg">
        {motivation.emoji}
      </p>
      
      <h3 className={`text-2xl md:text-3xl font-bold text-${motivation.color}-900 mb-2`}>
        {motivation.title}
      </h3>
      
      <p className={`text-base font-[450] text-${motivation.color}-800 mb-4`}>
        {motivation.message}
      </p>
      
      <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
        Luyện tập đều đặn = Tiến bộ nhanh 🚀
      </p>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT: Action Buttons
// ==========================================
const ActionButtons = ({ onReset }) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <button
      onClick={onReset}
      className={`
        flex-1 flex items-center justify-center gap-2.5
        px-6 py-4 rounded-xl
        bg-gradient-to-r from-blue-700 to-blue-600
        hover:from-blue-800 hover:to-blue-700
        text-white font-bold text-base
        shadow-md hover:shadow-lg
        transition-all duration-300
        active:scale-95
      `}
    >
      <RotateCcw className="w-5 h-5" strokeWidth={2.2} />
      <span>Làm lại bài này</span>
      <ArrowRight className="w-4 h-4 opacity-60" strokeWidth={2.2} />
    </button>

    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`
        flex-1 flex items-center justify-center gap-2.5
        px-6 py-4 rounded-xl
        bg-white hover:bg-slate-50
        text-slate-900 font-bold text-base
        border-2 border-slate-200 hover:border-slate-300
        shadow-sm hover:shadow-md
        transition-all duration-300
        active:scale-95
      `}
    >
      <Target className="w-5 h-5" strokeWidth={2.2} />
      <span>Chọn bài khác</span>
    </button>
  </div>
);

// ==========================================
// MAIN COMPONENT: ResultsDisplay
// ==========================================
const ResultsDisplay = ({ score, partData, answers, onReset }) => {
  if (!partData) return null;

  // ===== COMPUTED VALUES =====
  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { label: 'Xuất sắc', color: 'emerald', emoji: '🌟' };
    if (percentage >= 80) return { label: 'Rất tốt', color: 'teal', emoji: '🎯' };
    if (percentage >= 70) return { label: 'Tốt', color: 'blue', emoji: '✨' };
    if (percentage >= 60) return { label: 'Khá', color: 'amber', emoji: '📈' };
    if (percentage >= 50) return { label: 'Trung bình', color: 'orange', emoji: '⚠️' };
    return { label: 'Cần cố gắng', color: 'red', emoji: '💪' };
  };

  const performance = useMemo(() => getPerformanceLevel(score.percentage), [score.percentage]);
  const wrongCount = useMemo(() => score.total - score.correct, [score.total, score.correct]);

  // ===== RENDER =====
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8 md:space-y-10">
        
        {/* ===== HERO SECTION ===== */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full blur-2xl opacity-20" />
              <Trophy className="w-20 h-20 md:w-24 md:h-24 text-blue-700 relative" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Kết quả bài thi
          </h1>

          <p className="text-base md:text-lg text-slate-600 font-[450] max-w-2xl mx-auto">
            Xem chi tiết từng câu hỏi và những lĩnh vực cần cải thiện
          </p>
        </div>

        {/* ===== SCORE CARDS - GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
          <ScoreCard
            icon={CheckCircle}
            label="Kết quả"
            value={score.correct}
            suffix={`/${score.total}`}
            accentColor="from-blue-700 to-blue-600"
            bgColor="bg-white"
          />

          <ScoreCard
            icon={TrendingUp}
            label="Tỷ lệ"
            value={score.percentage.toFixed(0)}
            suffix="%"
            accentColor="from-emerald-700 to-emerald-600"
            bgColor="bg-white"
          />

          <PerformanceBadge 
            performance={performance}
            score={score}
          />
        </div>

        {/* ===== PROGRESS RING & STATS ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Progress Ring */}
          <div className="lg:col-span-1 flex justify-center items-center bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <ProgressRing percentage={score.percentage} size={160} />
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 md:gap-5">
            <QuickStat
              icon={CheckCircle}
              label="Đúng"
              value={score.correct}
              color="emerald"
            />
            <QuickStat
              icon={XCircle}
              label="Sai"
              value={wrongCount}
              color="red"
            />
            <QuickStat
              icon={Award}
              label="Xếp loại"
              value={performance.label}
              color={performance.color}
            />
            <QuickStat
              icon={Flame}
              label="Độ khó"
              value={score.percentage >= 80 ? 'Dễ' : score.percentage >= 50 ? 'Vừa' : 'Khó'}
              color={score.percentage >= 80 ? 'blue' : score.percentage >= 50 ? 'amber' : 'red'}
            />
          </div>
        </div>

        {/* ===== MOTIVATIONAL MESSAGE ===== */}
        <MotivationalMessage score={score} />

        {/* ===== ACTION BUTTONS ===== */}
        <ActionButtons onReset={onReset} />

        {/* ===== ANSWERS REVIEW SECTION ===== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="px-6 md:px-8 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Chi tiết đáp án
              </h2>
              <span className="text-sm font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
                {partData.questions.length} câu
              </span>
            </div>
          </div>

          {/* Answers List */}
          <div className="px-6 md:px-8 py-6 md:py-8 space-y-3 md:space-y-4">
            {partData.questions.map((q, index) => {
              const isCorrect = answers[q.id] === q.correct;
              const userAnswer = answers[q.id];

              return (
                <AnswerReviewCard
                  key={q.id}
                  question={q}
                  isCorrect={isCorrect}
                  userAnswer={userAnswer}
                  correctAnswer={q.correct}
                  options={q.options}
                />
              );
            })}
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="text-center py-4 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
            🎓 Luyện tập thêm để nâng cao điểm số
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
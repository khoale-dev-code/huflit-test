import React, { useState, useMemo, memo, useEffect } from 'react';
import { 
  Trophy, Target, CheckCircle, XCircle, RotateCcw, 
  Award, TrendingUp, Flame, ArrowRight, 
  BarChart3, BrainCircuit, ChevronRight
} from 'lucide-react';
import ExplanationSection from './ExplanationDisplay';

// --- SUB-COMPONENTS (MEMOIZED) ---
const StatCard = memo(({ icon: Icon, label, value, suffix, accentColor }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm hover:shadow-md transition-all">
    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-sm`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-black text-slate-900">
      {value}<span className="text-lg text-slate-400 ml-0.5">{suffix}</span>
    </p>
  </div>
));

const SkillBar = ({ label, correct, total }) => {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-slate-600">{label}</span>
        <span className={percent >= 70 ? 'text-emerald-600' : 'text-rose-500'}>{percent}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${percent >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

const AnswerReviewCard = memo(({ question, isCorrect, userAnswer, correctAnswer, options }) => {
  const [expanded, setExpanded] = useState(false);
  const userAnswerText = userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : 'Chưa chọn';
  const correctAnswerText = String.fromCharCode(65 + correctAnswer);

  return (
    <div className={`rounded-xl border-2 transition-all ${isCorrect ? 'bg-emerald-50/40 border-emerald-100' : 'bg-rose-50/40 border-rose-100'}`}>
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-start gap-4 text-left"
      >
        <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`}>
          {isCorrect ? <CheckCircle className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 mb-2 truncate md:whitespace-normal text-wrap">
            Câu {question.id}: {question.question}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className={`text-[10px] font-bold px-2 py-1 rounded ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              Bạn: {userAnswerText}
            </span>
            {!isCorrect && (
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 text-blue-700">
                Đáp án: {correctAnswerText}
              </span>
            )}
          </div>
        </div>
        <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${expanded ? 'rotate-90' : ''}`} />
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-white rounded-b-xl overflow-hidden">
          <ExplanationSection 
            explanation={question.explanation}
            question={question.question}
            userAnswer={userAnswer}
            correctAnswer={correctAnswer}
            isCorrect={isCorrect}
            options={options}
            questionId={question.id}
          />
        </div>
      )}
    </div>
  );
});

// --- MAIN RESULTS DISPLAY ---
const ResultsDisplay = ({ score, partData, answers, onReset }) => {
  const [viewFilter, setViewFilter] = useState('all');

  // Cuộn lên đầu khi hiển thị kết quả để tránh bị khuất
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const skillAnalytics = useMemo(() => {
    const categories = {};
    partData?.questions.forEach(q => {
      const cat = q.category || "General Skills";
      if (!categories[cat]) categories[cat] = { correct: 0, total: 0 };
      categories[cat].total++;
      if (answers[q.id] === q.correct) categories[cat].correct++;
    });
    return categories;
  }, [partData, answers]);

  const filteredQuestions = useMemo(() => {
    if (viewFilter === 'all') return partData?.questions || [];
    return partData?.questions.filter(q => answers[q.id] !== q.correct) || [];
  }, [viewFilter, partData, answers]);

  if (!partData) return null;

  return (
    /* LỚP BẢO VỆ CHỐNG BỊ ĐÈ: relative, z-50, isolate */
    <div className="relative isolate z-[50] min-h-screen bg-slate-50 w-full animate-in fade-in duration-500">
      
      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-12 px-4 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full" />
          <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4 relative drop-shadow-sm" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kết quả bài thi</h1>
        <p className="text-slate-500 mt-2 font-medium">Bạn đã hoàn thành phần luyện tập của mình.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 pb-24 space-y-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={CheckCircle} label="Chính xác" value={score.correct} suffix={`/${score.total}`} accentColor="from-blue-600 to-indigo-500" />
          <StatCard icon={TrendingUp} label="Tỷ lệ" value={score.percentage.toFixed(0)} suffix="%" accentColor="from-emerald-600 to-teal-500" />
          <StatCard icon={Flame} label="Cấp độ" value={score.percentage > 70 ? "Giỏi" : "Khá"} accentColor="from-orange-500 to-amber-400" />
          <StatCard icon={Award} label="Xếp loại" value={score.percentage >= 80 ? "A+" : "B"} accentColor="from-purple-600 to-pink-500" />
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-800">Phân tích kỹ năng</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {Object.entries(skillAnalytics).map(([label, data]) => (
              <SkillBar key={label} label={label} correct={data.correct} total={data.total} />
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onReset} 
            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            <RotateCcw className="w-5 h-5" /> Làm lại bài này
          </button>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
            className="flex-1 bg-white text-slate-700 border-2 border-slate-200 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
             <Target className="w-5 h-5" /> Xem lại câu hỏi
          </button>
        </div>

        {/* Detailed List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm py-4">
            <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Chi tiết đáp án
            </h3>
            
            <div className="flex bg-slate-200 p-1 rounded-lg">
              <button 
                onClick={() => setViewFilter('all')}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${viewFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                TẤT CẢ
              </button>
              <button 
                onClick={() => setViewFilter('wrong')}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${viewFilter === 'wrong' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                CÂU SAI
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map(q => (
              <AnswerReviewCard 
                key={q.id}
                question={q}
                isCorrect={answers[q.id] === q.correct}
                userAnswer={answers[q.id]}
                correctAnswer={q.correct}
                options={q.options}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ResultsDisplay);    
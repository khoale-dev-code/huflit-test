import React, { useState } from 'react';
import { Trophy, Target, CheckCircle, XCircle, RotateCcw, Award, TrendingUp, Eye, EyeOff, Lightbulb } from 'lucide-react';

const ResultsDisplay = ({ score, partData, answers, onReset }) => {
  // Sử dụng state để quản lý trạng thái hiển thị/ẩn giải thích
  const [showExplanations, setShowExplanations] = useState(false); // Mặc định ẩn giải thích để trang gọn gàng hơn
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  if (!partData) return null;

  // Function to toggle explanation visibility for a specific question
  const toggleExplanation = (questionId) => {
    setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
  };

  // Calculate performance level
  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { label: 'Xuất sắc', color: 'emerald', emoji: '🌟', bg: 'bg-emerald-600' };
    if (percentage >= 80) return { label: 'Rất tốt', color: 'teal', emoji: '🎯', bg: 'bg-teal-600' };
    if (percentage >= 70) return { label: 'Tốt', color: 'indigo', emoji: '👍', bg: 'bg-indigo-600' };
    if (percentage >= 60) return { label: 'Khá', color: 'amber', emoji: '📈', bg: 'bg-amber-600' };
    if (percentage >= 50) return { label: 'Trung bình', color: 'orange', emoji: '⚠️', bg: 'bg-orange-600' };
    return { label: 'Cần cố gắng', color: 'red', emoji: '💪', bg: 'bg-red-600' };
  };

  const performance = getPerformanceLevel(score.percentage);

  return (
    <div className="relative min-h-screen bg-amber-50/50 p-4 sm:p-6"> 
      
      {/* Blob Background (Tạo sự thú vị) */}
      <style>{`
        @keyframes blob-animate {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0, 0) scale(1); }
          50% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; transform: translate(-20px, 20px) scale(1.05); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {/* Blob 1: Light Amber/Yellow */}
        <div className="absolute top-[-5rem] left-[-5rem] w-80 h-80 bg-yellow-300/60 rounded-full blur-3xl" style={{ animation: 'blob-animate 12s infinite ease-in-out' }} />
        {/* Blob 2: Light Orange/Red */}
        <div className="absolute bottom-[-8rem] right-[-8rem] w-96 h-96 bg-orange-300/60 rounded-full blur-3xl" style={{ animation: 'blob-animate 16s infinite reverse ease-in-out' }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto my-4 sm:my-8 space-y-8">
        
       {/* Header with Trophy - Cải tiến Nổi bật, Ánh sáng */}
        <div 
          className="relative overflow-hidden 
            bg-gradient-to-r from-orange-600 via-red-500 to-yellow-400 
            rounded-3xl shadow-2xl shadow-orange-500/80 p-8 text-white text-center 
            border-4 border-white transform hover:scale-[1.01] transition-transform duration-500"
        >
          
          {/* Hiệu ứng Ánh sáng (Shine Effect) */}
          <div className="absolute inset-0 opacity-10 animate-pulse-slow">
            <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-3xl" />
          </div>
          
          <Trophy className="relative z-10 w-24 h-24 mx-auto mb-4 
            text-yellow-300 fill-white 
            animate-wiggle-3d" /> {/* Animation mới: Wiggle 3D */}
          
          <h2 className="relative z-10 text-4xl sm:text-5xl font-black mb-2 
            drop-shadow-lg text-white tracking-wide">
             KẾT QUẢ BÀI THI
          </h2>
          
          <p className="relative z-10 text-xl sm:text-2xl font-semibold opacity-95 
            text-white drop-shadow">
            Xem lại chi tiết và cải thiện điểm số!
          </p>
        </div>

        {/* Thêm Keyframes Animation vào khối style (đặt ở cuối component hoặc CSS global) */}
        {/* Thêm Keyframes Animation vào khối style */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes pulse-slow {
                0%, 100% { opacity: 0.1; }
                50% { opacity: 0.2; } /* Hiệu ứng ánh sáng tinh tế */
              }
              @keyframes wiggle-3d {
                0%, 100% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(1deg) scale(1.02); }
                75% { transform: rotate(-1deg) scale(1.02); }
              }
              .animate-pulse-slow { animation: pulse-slow 5s infinite ease-in-out; }
              .animate-wiggle-3d { animation: wiggle-3d 3s infinite ease-in-out; }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
            `,
          }}
        />

        {/* Score Summary Cards - Cải tiến design */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Score */}
          <div className="bg-white rounded-3xl shadow-xl border-4 border-amber-300 p-6 text-center transform hover:scale-[1.02] transition-transform duration-300">
            <div className='p-3 rounded-full bg-amber-100 w-fit mx-auto mb-3'>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-gray-700 font-bold text-lg mb-2">Tổng câu đúng</p>
            <p className="text-6xl font-black text-orange-600">
              {score.correct}<span className="text-3xl text-gray-400">/{score.total}</span>
            </p>
          </div>

          {/* Percentage */}
          <div className="bg-white rounded-3xl shadow-xl border-4 border-amber-300 p-6 text-center transform hover:scale-[1.02] transition-transform duration-300">
            <div className='p-3 rounded-full bg-amber-100 w-fit mx-auto mb-3'>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-700 font-bold text-lg mb-2">Tỷ lệ chính xác</p>
            <p className="text-6xl font-black text-green-600">
              {score.percentage.toFixed(1)}<span className="text-3xl">%</span>
            </p>
          </div>

          {/* Performance Level */}
          <div className={`bg-white rounded-3xl shadow-xl border-4 border-amber-300 p-6 text-center transform hover:scale-[1.02] transition-transform duration-300`}>
            <div className='p-3 rounded-full bg-amber-100 w-fit mx-auto mb-3'>
              <Award className={`w-8 h-8 text-${performance.color}-600`} />
            </div>
            <p className="text-gray-700 font-bold text-lg mb-2">Xếp loại</p>
            <p className="text-4xl mb-2">{performance.emoji}</p>
            <p className={`text-2xl font-black text-${performance.color}-600`}>
              {performance.label}
            </p>
          </div>
        </div>

        {/* Progress Bar - Cải tiến gradient */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-amber-300 p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-gray-800">📊 Tiến độ</h3>
            <span className="text-base font-semibold text-gray-600">
              {score.correct} / {score.total} câu đúng
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
            <div
              className="h-full transition-all duration-1000 ease-out flex items-center justify-end pr-3 font-extrabold text-white"
              style={{
                width: `${score.percentage}%`,
                background: score.percentage >= 70 
                  ? 'linear-gradient(to right, #10b981, #34d399)' // Green
                  : score.percentage >= 50 
                  ? 'linear-gradient(to right, #fbbf24, #f59e0b)' // Amber
                  : 'linear-gradient(to right, #f87171, #ef4444)' // Red
              }}
            >
              <span className="text-sm">
                {score.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Answers Review Section */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-amber-300 p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 flex items-center gap-3 border-b-4 border-orange-500 pb-3">
            📖 Chi tiết đáp án & Giải thích
          </h3>

          {/* Toggle All Explanations Button (Use the old toggle for simplicity) */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowExplanations(!showExplanations)}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-base"
            >
              {showExplanations ? (
                <>
                  <EyeOff className="w-5 h-5" />
                  Ẩn tất cả Giải thích
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  Hiện tất cả Giải thích
                </>
              )}
            </button>
          </div>

          {/* Individual Question Review - Cải tiến Accordion cho giải thích */}
          <div className="space-y-6">
            {partData.questions.map((q) => {
              const isCorrect = answers[q.id] === q.correct;
              const userAnswer = answers[q.id];
              const isExpanded = expandedQuestionId === q.id || showExplanations;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border-4 transition-all shadow-md ${
                    isCorrect
                      ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-green-400/50 hover:shadow-lg'
                      : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-400/50 hover:shadow-lg'
                  }`}
                >
                  {/* Question Header & Status */}
                  <div className="flex items-start gap-4 mb-4 border-b pb-4 border-gray-200">
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      isCorrect ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <XCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-extrabold text-gray-900 text-xl">
                        Câu {q.id}:
                      </p>
                      <p className="text-gray-700 text-base italic">{q.question}</p>
                  </div>
                </div>

                {/* Answer Details */}
                <div className="pl-4 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold text-gray-700">
                      Lựa chọn của bạn:
                    </span>
                    <span className={`font-extrabold text-sm px-4 py-1 rounded-full shadow-md ${
                      isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {userAnswer !== undefined 
                        ? `${String.fromCharCode(65 + userAnswer)}`
                        : 'Chưa chọn'}
                    </span>
                  </div>

                  {!isCorrect && (
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-bold text-gray-700">
                        Đáp án đúng:
                      </span>
                      <span className="font-extrabold text-sm px-4 py-1 rounded-full bg-green-500 text-white shadow-md">
                        {String.fromCharCode(65 + q.correct)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Explanation Toggle Button */}
                {q.explanation && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => toggleExplanation(q.id)}
                      className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {isExpanded ? 'Ẩn Giải thích chi tiết' : 'Xem Giải thích chi tiết'}
                    </button>
                  </div>
                )}

                {/* Explanation Content (Conditional rendering based on state) */}
                {q.explanation && isExpanded && (
                  <div className="mt-3 p-4 bg-amber-100 border-l-4 border-amber-500 rounded-lg animate-fadeIn">
                    <p className="text-base font-semibold text-amber-900 mb-1">
                      💡 Chi tiết:
                    </p>
                    <p className="text-base text-gray-800 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>

        {/* Action Buttons - Nổi bật nút Làm lại */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onReset}
            className="w-full sm:w-auto flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-extrabold shadow-2xl shadow-orange-400/70 transform hover:scale-105 transition-all duration-300 text-lg sm:text-xl"
          >
            <RotateCcw className="w-6 h-6" />
            LÀM LẠI BÀI THI
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full sm:w-auto flex items-center gap-2 px-10 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-lg"
          >
            <Target className="w-6 h-6" />
            Làm bài khác
          </button>
        </div>

        {/* Motivational Message - Tăng cường màu sắc chủ đạo */}
        <div className={`bg-gradient-to-r ${
          score.percentage >= 70 
            ? 'from-green-100 to-emerald-100 border-green-400' 
            : 'from-yellow-100 to-orange-100 border-orange-400'
        } rounded-2xl border-4 p-6 text-center shadow-lg`}>
          <p className="text-xl font-extrabold text-gray-800 mb-2">
            {score.percentage >= 90 && '🎉 Tuyệt vời! Bạn đã làm xuất sắc!'}
            {score.percentage >= 70 && score.percentage < 90 && '👏 Rất tốt! Tiếp tục cố gắng nhé!'}
            {score.percentage >= 50 && score.percentage < 70 && '💪 Khá tốt! Hãy luyện tập thêm để tiến bộ hơn!'}
            {score.percentage < 50 && '📚 Đừng nản chí! Hãy xem lại bài và thử lại nhé!'}
          </p>
          <p className="text-base text-gray-700 font-medium">
            Luyện tập thường xuyên sẽ giúp bạn cải thiện kỹ năng! 🚀
          </p>
        </div>
      </div>
      
      {/* Animation CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
          `,
        }}
      />
    </div>
  );
};

export default ResultsDisplay;
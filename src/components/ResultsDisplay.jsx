import React, { useState } from 'react';
import { Trophy, Target, CheckCircle, XCircle, RotateCcw, Award, TrendingUp, Eye, EyeOff } from 'lucide-react';

const ResultsDisplay = ({ score, partData, answers, onReset }) => {
  const [showExplanations, setShowExplanations] = useState(true); // Mặc định hiển thị explanations

  if (!partData) return null;

  // Calculate performance level
  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { label: 'Xuất sắc', color: 'green', emoji: '🌟' };
    if (percentage >= 80) return { label: 'Rất tốt', color: 'blue', emoji: '🎯' };
    if (percentage >= 70) return { label: 'Tốt', color: 'indigo', emoji: '👍' };
    if (percentage >= 60) return { label: 'Khá', color: 'yellow', emoji: '📈' };
    if (percentage >= 50) return { label: 'Trung bình', color: 'orange', emoji: '⚠️' };
    return { label: 'Cần cố gắng', color: 'red', emoji: '💪' };
  };

  const performance = getPerformanceLevel(score.percentage);

  return (
    <div className="max-w-5xl mx-auto my-8 p-4 space-y-6">
      {/* Header with Trophy */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-8 text-white text-center">
        <Trophy className="w-20 h-20 mx-auto mb-4 animate-bounce" />
        <h2 className="text-4xl font-black mb-2">🎉 Kết quả bài thi</h2>
        <p className="text-xl opacity-90">Bạn đã hoàn thành xuất sắc!</p>
      </div>

      {/* Score Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Score */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 text-center hover:shadow-xl transition-shadow">
          <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <p className="text-gray-600 font-semibold mb-2">Tổng điểm</p>
          <p className="text-5xl font-black text-blue-600 mb-2">
            {score.correct}<span className="text-3xl text-gray-400">/{score.total}</span>
          </p>
          <p className="text-sm text-gray-500">câu đúng</p>
        </div>

        {/* Percentage */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6 text-center hover:shadow-xl transition-shadow">
          <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <p className="text-gray-600 font-semibold mb-2">Tỷ lệ đúng</p>
          <p className="text-5xl font-black text-green-600 mb-2">
            {score.percentage.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">độ chính xác</p>
        </div>

        {/* Performance Level */}
        <div className={`bg-white rounded-xl shadow-lg border-2 border-${performance.color}-200 p-6 text-center hover:shadow-xl transition-shadow`}>
          <Award className={`w-12 h-12 text-${performance.color}-600 mx-auto mb-3`} />
          <p className="text-gray-600 font-semibold mb-2">Xếp loại</p>
          <p className="text-4xl mb-2">{performance.emoji}</p>
          <p className={`text-xl font-black text-${performance.color}-600`}>
            {performance.label}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">📊 Tiến độ hoàn thành</h3>
          <span className="text-sm font-semibold text-gray-600">
            {score.correct} / {score.total} câu đúng
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
          <div
            className="h-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
            style={{
              width: `${score.percentage}%`,
              backgroundColor: 
                score.percentage >= 70 ? '#10b981' : 
                score.percentage >= 50 ? '#f59e0b' : '#ef4444'
            }}
          >
            <span className="text-white text-xs font-bold">
              {score.percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Toggle Explanations Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowExplanations(!showExplanations)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          {showExplanations ? (
            <>
              <EyeOff className="w-5 h-5" />
              Ẩn giải thích
            </>
          ) : (
            <>
              <Eye className="w-5 h-5" />
              Xem giải thích chi tiết
            </>
          )}
        </button>
      </div>

      {/* Answers Review */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200 p-6">
        <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2 border-b-4 border-orange-400 pb-3">
          <span>📝</span>
          Chi tiết đáp án
        </h3>

        <div className="space-y-4">
          {partData.questions.map((q) => {
            const isCorrect = answers[q.id] === q.correct;
            const userAnswer = answers[q.id];

            return (
              <div
                key={q.id}
                className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                  isCorrect
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                    : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-full ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <XCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">
                      Câu {q.id}: {q.question}
                    </p>
                  </div>
                </div>

                {/* Answer Details */}
                <div className="ml-14 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Câu trả lời của bạn:
                    </span>
                    <span className={`font-bold px-3 py-1 rounded-lg ${
                      isCorrect
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}>
                      {userAnswer !== undefined 
                        ? `${String.fromCharCode(65 + userAnswer)}. ${q.options[userAnswer]}`
                        : 'Chưa chọn'}
                    </span>
                  </div>

                  {!isCorrect && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Đáp án đúng:
                      </span>
                      <span className="font-bold px-3 py-1 rounded-lg bg-green-200 text-green-800">
                        {String.fromCharCode(65 + q.correct)}. {q.options[q.correct]}
                      </span>
                    </div>
                  )}

                  {/* Explanation (always shown if available, or toggled) */}
                  {q.explanation && (
                    <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        💡 Giải thích:
                      </p>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg"
        >
          <RotateCcw className="w-6 h-6" />
          Làm lại bài thi
        </button>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg"
        >
          <Target className="w-6 h-6" />
          Làm bài khác
        </button>
      </div>

      {/* Motivational Message */}
      <div className={`bg-gradient-to-r ${
        score.percentage >= 70 
          ? 'from-green-100 to-emerald-100 border-green-300' 
          : 'from-orange-100 to-yellow-100 border-orange-300'
      } rounded-xl border-2 p-6 text-center`}>
        <p className="text-lg font-bold text-gray-800 mb-2">
          {score.percentage >= 90 && '🎉 Tuyệt vời! Bạn đã làm xuất sắc!'}
          {score.percentage >= 70 && score.percentage < 90 && '👏 Rất tốt! Tiếp tục cố gắng nhé!'}
          {score.percentage >= 50 && score.percentage < 70 && '💪 Khá tốt! Hãy luyện tập thêm để tiến bộ hơn!'}
          {score.percentage < 50 && '📚 Đừng nản chí! Hãy xem lại bài và thử lại nhé!'}
        </p>
        <p className="text-sm text-gray-600">
          Luyện tập thường xuyên sẽ giúp bạn cải thiện kỹ năng! 🚀
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
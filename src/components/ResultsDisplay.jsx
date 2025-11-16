import React, { useState } from 'react';
import { Trophy, Target, CheckCircle, XCircle, RotateCcw, Award, TrendingUp, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

const ResultsDisplay = ({ score, partData, answers, onReset }) => {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  if (!partData) return null;

  const toggleExplanation = (questionId) => {
    setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { label: 'Xuất sắc', color: 'emerald', emoji: '🌟' };
    if (percentage >= 80) return { label: 'Rất tốt', color: 'teal', emoji: '🎯' };
    if (percentage >= 70) return { label: 'Tốt', color: 'blue', emoji: '👍' };
    if (percentage >= 60) return { label: 'Khá', color: 'amber', emoji: '📈' };
    if (percentage >= 50) return { label: 'Trung bình', color: 'orange', emoji: '⚠️' };
    return { label: 'Cần cố gắng', color: 'red', emoji: '💪' };
  };

  const performance = getPerformanceLevel(score.percentage);

  // Tính số câu sai
  const wrongCount = score.total - score.correct;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6">
      {/* Simplified Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-8rem] right-[-8rem] w-96 h-96 bg-orange-200/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-4">
        
        {/* Header - Đơn giản hơn */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white text-center">
          <Trophy className="w-16 h-16 mx-auto mb-3 text-yellow-200" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">KẾT QUẢ BÀI THI</h2>
          <p className="text-lg opacity-90">Xem chi tiết và cải thiện kỹ năng!</p>
        </div>

        {/* Score Summary - 3 cards ngang */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Điểm số */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-medium mb-1">Kết quả</p>
            <p className="text-4xl font-bold text-orange-600">
              {score.correct}<span className="text-xl text-gray-400">/{score.total}</span>
            </p>
          </div>

          {/* Phần trăm */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-medium mb-1">Tỷ lệ chính xác</p>
            <p className="text-4xl font-bold text-green-600">
              {score.percentage.toFixed(0)}<span className="text-xl">%</span>
            </p>
          </div>

          {/* Xếp loại */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Award className={`w-8 h-8 text-${performance.color}-500 mx-auto mb-2`} />
            <p className="text-sm text-gray-600 font-medium mb-1">Xếp loại</p>
            <p className="text-3xl mb-1">{performance.emoji}</p>
            <p className={`text-xl font-bold text-${performance.color}-600`}>
              {performance.label}
            </p>
          </div>
        </div>

        {/* Progress Bar - Gọn hơn */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Tiến độ hoàn thành</h3>
            <span className="text-sm font-medium text-gray-600">
              {score.correct}/{score.total} câu
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full transition-all duration-1000"
              style={{
                width: `${score.percentage}%`,
                background: score.percentage >= 70 
                  ? 'linear-gradient(to right, #10b981, #34d399)'
                  : score.percentage >= 50 
                  ? 'linear-gradient(to right, #f59e0b, #fbbf24)'
                  : 'linear-gradient(to right, #ef4444, #f87171)'
              }}
            />
          </div>
        </div>

        {/* Quick Stats - Tóm tắt nhanh */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Thống kê nhanh</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Câu đúng</p>
                <p className="text-2xl font-bold text-green-600">{score.correct}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Câu sai</p>
                <p className="text-2xl font-bold text-red-600">{wrongCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Đặt trước phần review để dễ thao tác */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-semibold transition-all text-base"
          >
            <RotateCcw className="w-5 h-5" />
            Làm lại bài này
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-lg font-semibold transition-all text-base"
          >
            <Target className="w-5 h-5" />
            Chọn bài khác
          </button>
        </div>

        {/* Answers Review - Tối ưu logic hiển thị */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Chi tiết đáp án</h3>
            <span className="text-sm font-medium text-gray-600">
              {partData.questions.length} câu hỏi
            </span>
          </div>

          <div className="space-y-3">
            {partData.questions.map((q) => {
              const isCorrect = answers[q.id] === q.correct;
              const userAnswer = answers[q.id];
              const isExpanded = expandedQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  className={`rounded-lg border-2 transition-all ${
                    isCorrect
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  {/* Question Header - Click để expand */}
                  <button
                    onClick={() => toggleExplanation(q.id)}
                    className="w-full p-4 text-left hover:bg-white/50 transition-colors rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`p-1.5 rounded-full flex-shrink-0 ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <XCircle className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Question Text */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-base">
                          Câu {q.id}: {q.question}
                        </p>
                        
                        {/* Answer Summary */}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-xs text-gray-600">Bạn chọn:</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            isCorrect
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}>
                            {userAnswer !== undefined 
                              ? String.fromCharCode(65 + userAnswer)
                              : 'Chưa chọn'}
                          </span>
                          
                          {!isCorrect && (
                            <>
                              <span className="text-xs text-gray-600">| Đáp án:</span>
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500 text-white">
                                {String.fromCharCode(65 + q.correct)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Expand Icon */}
                      {q.explanation && (
                        <div className="flex-shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Explanation - Chỉ hiện khi expand */}
                  {q.explanation && isExpanded && (
                    <div className="px-4 pb-4">
                      <div className="p-3 bg-amber-100 border-l-2 border-amber-500 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-amber-900 mb-1">
                              Giải thích:
                            </p>
                            <p className="text-sm text-gray-800 leading-relaxed">
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational Message - Đơn giản hơn */}
        <div className={`rounded-xl border-2 p-5 text-center ${
          score.percentage >= 70 
            ? 'bg-green-50 border-green-300' 
            : 'bg-orange-50 border-orange-300'
        }`}>
          <p className="text-lg font-bold text-gray-800 mb-2">
            {score.percentage >= 90 && '🎉 Xuất sắc! Bạn đã làm rất tốt!'}
            {score.percentage >= 70 && score.percentage < 90 && '👏 Rất tốt! Tiếp tục phát huy nhé!'}
            {score.percentage >= 50 && score.percentage < 70 && '💪 Khá tốt! Hãy luyện tập thêm!'}
            {score.percentage < 50 && '📚 Đừng nản lòng! Cố gắng lên bạn nhé!'}
          </p>
          <p className="text-sm text-gray-700">
            Luyện tập đều đặn sẽ giúp bạn tiến bộ nhanh hơn! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
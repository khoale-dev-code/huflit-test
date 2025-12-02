import React from 'react';
import { TrendingUp, Trophy, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function PreviousResults({ attempts, loading, selectedExam, selectedPart }) {
  if (loading) {
    return (
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 border-gray-200">
        <p className="text-gray-600 font-semibold text-sm sm:text-base">⏳ Đang tải...</p>
      </div>
    );
  }

  if (!attempts || attempts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 border-2 border-blue-200">
        <p className="text-blue-700 font-semibold text-sm sm:text-base">📝 Lần đầu tiên</p>
        <p className="text-xs sm:text-sm text-blue-600 mt-1">Kết quả sẽ được lưu sau khi nộp bài</p>
      </div>
    );
  }

  const bestAttempt = attempts.reduce((best, current) => 
    (current.score > best.score) ? current : best
  );
  
  const latestAttempt = attempts[0];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Summary Cards - Optimized for mobile */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-3">
        {/* Best Score */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border-2 border-green-200 flex flex-col items-center sm:items-start">
          <Trophy className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 mb-1 sm:mb-2" />
          <p className="text-xs sm:text-sm text-green-700 font-semibold">Cao nhất</p>
          <p className="text-xl sm:text-3xl font-black text-green-600 mt-0.5 sm:mt-2">
            {bestAttempt.score?.toFixed(0)}%
          </p>
        </div>

        {/* Latest Score */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border-2 border-orange-200 flex flex-col items-center sm:items-start">
          <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600 mb-1 sm:mb-2" />
          <p className="text-xs sm:text-sm text-orange-700 font-semibold">Lần cuối</p>
          <p className="text-xl sm:text-3xl font-black text-orange-600 mt-0.5 sm:mt-2">
            {latestAttempt.score?.toFixed(0)}%
          </p>
        </div>

        {/* Attempts Count */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border-2 border-purple-200 flex flex-col items-center sm:items-start">
          <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 mb-1 sm:mb-2" />
          <p className="text-xs sm:text-sm text-purple-700 font-semibold">Số lần</p>
          <p className="text-xl sm:text-3xl font-black text-purple-600 mt-0.5 sm:mt-2">
            {attempts.length}
          </p>
        </div>
      </div>

      {/* Attempts History */}
      <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-6 border-2 border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
          <span>Lịch sử</span>
        </h3>

        <div className="space-y-1.5 sm:space-y-2 max-h-80 overflow-y-auto scrollbar-thin">
          {attempts.map((attempt, index) => {
            const correct = Object.entries(attempt.answers || {}).filter(
              ([questionId, answerIndex]) => {
                return answerIndex !== undefined;
              }
            ).length;

            const total = attempt.totalQuestions || 0;
            const isBest = attempt.score === bestAttempt.score;
            const isDraft = attempt.isDraft;

            return (
              <div
                key={attempt.id}
                className={`p-2.5 sm:p-4 rounded-lg border-2 transition-all text-sm sm:text-base ${
                  isBest
                    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300'
                    : isDraft
                    ? 'bg-gray-50 border-gray-300'
                    : 'bg-white border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-bold text-gray-900 text-sm sm:text-base">
                        Lần {attempts.length - index}
                      </p>
                      {isBest && (
                        <span className="text-xs font-bold bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                          🏆 Cao
                        </span>
                      )}
                      {isDraft && (
                        <span className="text-xs font-bold bg-gray-300 text-gray-700 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                          💾 Nháp
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {attempt.completedAt
                        ? new Date(attempt.completedAt).toLocaleString('vi-VN', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Đang làm'}
                    </p>
                  </div>

                  {/* Right Content */}
                  <div className="text-right flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                    <div>
                      <p className="text-lg sm:text-2xl font-black text-orange-600">
                        {attempt.score?.toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-600">
                        {correct}/{total}
                      </p>
                    </div>

                    {attempt.score >= 70 ? (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        {attempts.length > 1 && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-2">
              Tiến độ: {bestAttempt.score > latestAttempt.score ? '📈' : '📊'} {bestAttempt.score > latestAttempt.score ? 'Tốt hơn' : 'Tương tự'}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(bestAttempt.score, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
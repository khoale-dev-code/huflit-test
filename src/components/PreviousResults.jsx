import React from 'react';
import { TrendingUp, Trophy, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function PreviousResults({ attempts, loading, selectedExam, selectedPart }) {
  if (loading) {
    return (
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border-2 border-gray-200">
        <p className="text-gray-600 font-semibold">⏳ Đang tải kết quả trước đó...</p>
      </div>
    );
  }

  if (!attempts || attempts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
        <p className="text-blue-700 font-semibold">📝 Lần đầu tiên làm bài tập này</p>
        <p className="text-sm text-blue-600 mt-1">Kết quả sẽ được lưu lại sau khi bạn nộp bài</p>
      </div>
    );
  }

  const bestAttempt = attempts.reduce((best, current) => 
    (current.score > best.score) ? current : best
  );
  
  const latestAttempt = attempts[0];

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Best Score */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-semibold">Điểm cao nhất</p>
              <p className="text-3xl font-black text-green-600 mt-2">
                {bestAttempt.score?.toFixed(0)}%
              </p>
            </div>
            <Trophy className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Latest Score */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700 font-semibold">Lần cuối</p>
              <p className="text-3xl font-black text-orange-600 mt-2">
                {latestAttempt.score?.toFixed(0)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        {/* Attempts Count */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-semibold">Số lần làm</p>
              <p className="text-3xl font-black text-purple-600 mt-2">
                {attempts.length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Attempts History */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border-2 border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-600" />
          Lịch sử làm bài
        </h3>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {attempts.map((attempt, index) => {
            const correct = Object.entries(attempt.answers || {}).filter(
              ([questionId, answerIndex]) => {
                // Count correct answers
                return answerIndex !== undefined;
              }
            ).length;

            const total = attempt.totalQuestions || 0;
            const isBest = attempt.score === bestAttempt.score;
            const isDraft = attempt.isDraft;

            return (
              <div
                key={attempt.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isBest
                    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300'
                    : isDraft
                    ? 'bg-gray-50 border-gray-300'
                    : 'bg-white border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900">
                        Lần {attempts.length - index}
                      </p>
                      {isBest && (
                        <span className="text-xs font-bold bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">
                          🏆 Cao nhất
                        </span>
                      )}
                      {isDraft && (
                        <span className="text-xs font-bold bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                          💾 Nháp
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {attempt.completedAt
                        ? new Date(attempt.completedAt).toLocaleString('vi-VN')
                        : 'Đang làm'}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-orange-600">
                      {attempt.score?.toFixed(0)}%
                    </p>
                    <p className="text-xs text-gray-600">
                      {correct}/{total} đúng
                    </p>
                  </div>

                  {attempt.score >= 70 ? (
                    <CheckCircle className="w-6 h-6 text-green-600 ml-3 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 ml-3 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        {attempts.length > 1 && (
          <div className="mt-4 pt-4 border-t-2 border-gray-200">
            <p className="text-sm text-gray-600 font-semibold mb-2">
              Tiến độ: {bestAttempt.score > latestAttempt.score ? '📈 Tốt hơn' : '📊 Tương tự'}
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
import React from 'react';
import { TrendingUp, Trophy, Clock, CheckCircle, XCircle, Activity } from 'lucide-react';

export default function PreviousResults({ attempts, loading, selectedExam, selectedPart }) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-slate-300 rounded-full animate-pulse" />
          <p className="text-slate-600 font-medium text-sm">Đang tải kết quả...</p>
        </div>
      </div>
    );
  }

  if (!attempts || attempts.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <p className="text-slate-900 font-semibold text-sm mb-1">Lần đầu tiên</p>
        <p className="text-slate-600 text-sm">Kết quả sẽ được lưu sau khi nộp bài</p>
      </div>
    );
  }

  const bestAttempt = attempts.reduce((best, current) => 
    (current.score > best.score) ? current : best
  );
  
  const latestAttempt = attempts[0];
  const scoreImprovement = latestAttempt.score - bestAttempt.score;
  const isImproving = scoreImprovement >= 0;

  return (
    <div className="space-y-5">
      {/* Summary Stats Grid - Flat & Minimal */}
      <div className="grid grid-cols-3 gap-3">
        {/* Best Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-start justify-between mb-3">
            <Trophy className="w-4 h-4 text-slate-700" strokeWidth={1.5} />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cao nhất</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {bestAttempt.score?.toFixed(0)}%
          </p>
          <p className="text-xs text-slate-500 mt-2">Điểm tốt nhất</p>
        </div>

        {/* Latest Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-start justify-between mb-3">
            <TrendingUp className="w-4 h-4 text-slate-700" strokeWidth={1.5} />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gần nhất</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {latestAttempt.score?.toFixed(0)}%
          </p>
          <p className="text-xs text-slate-500 mt-2">Lần làm cuối</p>
        </div>

        {/* Attempts Count */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-shadow duration-200">
          <div className="flex items-start justify-between mb-3">
            <Activity className="w-4 h-4 text-slate-700" strokeWidth={1.5} />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Số lần</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {attempts.length}
          </p>
          <p className="text-xs text-slate-500 mt-2">Lần nộp bài</p>
        </div>
      </div>

      {/* Trend Indicator - Subtle Progress */}
      {attempts.length > 1 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-900">Xu hướng</p>
            <span className={`text-xs font-bold ${
              isImproving 
                ? 'text-emerald-600' 
                : 'text-amber-600'
            }`}>
              {isImproving ? '↗' : '↘'} {Math.abs(scoreImprovement).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-lg h-2">
            <div
              className={`h-2 rounded-lg transition-all duration-500 ${
                isImproving
                  ? 'bg-emerald-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(latestAttempt.score, 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 mt-2">
            {isImproving 
              ? `Tăng ${scoreImprovement.toFixed(1)}% so với lần trước` 
              : `Giảm ${Math.abs(scoreImprovement).toFixed(1)}% so với lần trước`}
          </p>
        </div>
      )}

      {/* Attempts History - Clean Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-700" strokeWidth={1.5} />
            <h3 className="font-semibold text-slate-900 text-sm">Lịch sử nộp bài</h3>
            <span className="ml-auto text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              {attempts.length}
            </span>
          </div>
        </div>

        {/* Attempts List */}
        <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
          {attempts.map((attempt, index) => {
            const correct = Object.entries(attempt.answers || {}).filter(
              ([questionId, answerIndex]) => answerIndex !== undefined
            ).length;

            const total = attempt.totalQuestions || 0;
            const isBest = attempt.score === bestAttempt.score;
            const isDraft = attempt.isDraft;
            const attemptNumber = attempts.length - index;

            return (
              <div
                key={attempt.id}
                className={`px-5 py-4 transition-colors duration-200 hover:bg-slate-50 ${
                  isBest ? 'bg-amber-50/30' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Left: Meta Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-semibold text-slate-900 text-sm">
                        Lần {attemptNumber}
                      </span>
                      {isBest && (
                        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-md">
                          🏆 Tốt nhất
                        </span>
                      )}
                      {isDraft && (
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                          💾 Nháp
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">
                      {attempt.completedAt
                        ? new Date(attempt.completedAt).toLocaleString('vi-VN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Đang làm'}
                    </p>
                  </div>

                  {/* Right: Score & Status */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Stats */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">
                        {attempt.score?.toFixed(0)}%
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {correct}/{total}
                      </p>
                    </div>

                    {/* Icon Status */}
                    {attempt.score >= 70 ? (
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                      </div>
                    ) : (
                      <div className="p-2 bg-rose-50 rounded-lg">
                        <XCircle className="w-5 h-5 text-rose-600" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Summary */}
      {attempts.length > 2 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-indigo-900 mb-2">
            📊 Phân tích hiệu suất
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs text-indigo-800">
            <div>
              <p className="text-slate-600 text-xs mb-1">Điểm trung bình</p>
              <p className="font-bold text-lg">
                {(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-xs mb-1">Cải thiện</p>
              <p className={`font-bold text-lg ${
                bestAttempt.score > latestAttempt.score 
                  ? 'text-amber-600' 
                  : 'text-emerald-600'
              }`}>
                {Math.abs(bestAttempt.score - attempts[attempts.length - 1].score).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
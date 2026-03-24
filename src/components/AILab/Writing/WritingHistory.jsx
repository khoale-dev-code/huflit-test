// src/components/AILab/WritingHistory.jsx
// HUBSTUDY Design: Nunito Font, Brand Colors, 3D Shadow Buttons

import React from 'react';
import { History, ChevronRight, Trophy, Calendar, FileText, Loader2 } from 'lucide-react';

const WritingHistory = ({ submissions, onViewDetail, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 font-nunito border-b-[6px] border-slate-200">
        <div className="animate-pulse">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-slate-200 rounded-2xl"></div>
            <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-slate-100 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!submissions || submissions.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8 text-center font-nunito border-b-[6px] border-slate-200">
        <div className="w-16 h-16 bg-[#1CB0F6]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-b-[4px] border-[#159EE0]">
          <History className="w-8 h-8 text-[#1CB0F6]" />
        </div>
        <h3 className="font-black text-xl text-slate-700 mb-2">Chưa có bài viết nào</h3>
        <p className="text-slate-500">Hãy bắt đầu viết bài đầu tiên của bạn!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 7) return 'bg-[#58CC02] text-white border-[#4BAD02]';
    if (score >= 5.5) return 'bg-[#1CB0F6] text-white border-[#159EE0]';
    return 'bg-[#FF4B4B] text-white border-[#E04343]';
  };

  const getWritingTypeLabel = (type) => {
    const types = {
      essay: 'Essay',
      email: 'Email',
      letter: 'Letter',
      report: 'Report',
      paragraph: 'Paragraph'
    };
    return types[type] || type;
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 font-nunito border-b-[6px] border-slate-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-[#1CB0F6]/10 rounded-2xl border-b-[3px] border-[#159EE0]">
          <History className="w-5 h-5 text-[#1CB0F6]" />
        </div>
        <h3 className="font-black text-lg text-slate-700">Lịch sử nộp bài</h3>
        <span className="ml-auto text-sm font-bold text-slate-500">{submissions.length} bài</span>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {submissions.map((submission) => (
          <button
            key={submission.id}
            onClick={() => onViewDetail(submission)}
            className="w-full p-4 bg-slate-50 hover:bg-[#1CB0F6]/5 rounded-2xl transition-all text-left group border-b-[4px] border-slate-200 hover:border-[#1CB0F6] shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-[#1CB0F6]/10 text-[#1CB0F6] rounded-lg text-xs font-bold border-b-[2px] border-[#159EE0]">
                    {getWritingTypeLabel(submission.writing_type)}
                  </span>
                  {submission.overall_score && (
                    <span className={`px-2 py-1 rounded-lg text-xs font-black border-b-[2px] ${getScoreColor(submission.overall_score)}`}>
                      <Trophy className="w-3 h-3 inline mr-1" />
                      {submission.overall_score.toFixed(1)}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                  {submission.prompt?.substring(0, 100)}...
                </p>
                
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(submission.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {submission.word_count} từ
                  </span>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#1CB0F6] transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WritingHistory;

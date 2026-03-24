// src/components/AILab/Writing/WritingResults.jsx
// HUBSTUDY Design: Nunito Font, Brand Colors, 3D Shadow Buttons

import React, { useState } from 'react';
import { Trophy, Star, RotateCcw, CheckCircle, Target, TrendingUp, BookOpen, MessageSquare, Zap, Sparkles } from 'lucide-react';

const WritingResults = ({ result, onReset, userText }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  if (!result) return null;

  // Parse đúng key từ AI response
  const overallScore = result.overallScore || result.overall_score || 0;
  const criteria = result.criteria || result;

  // Safe score
  const safeOverallScore = Number(overallScore) || 0;
  const wordCount = userText?.trim().split(/\s+/).filter(w => w.length > 0).length || 0;

  // Parse criteria
  const criteriaData = {
    taskAchievement: { 
      score: Number(criteria.task_achievement?.score || criteria.taskAchievement?.score || 6),
      comment: criteria.task_achievement?.comment || criteria.taskAchievement?.comment || ''
    },
    coherenceCohesion: { 
      score: Number(criteria.coherence?.score || criteria.coherenceCohesion?.score || 6),
      comment: criteria.coherence?.comment || criteria.coherenceCohesion?.comment || ''
    },
    lexicalResource: { 
      score: Number(criteria.lexical?.score || criteria.lexicalResource?.score || 6),
      comment: criteria.lexical?.comment || criteria.lexicalResource?.comment || ''
    },
    grammaticalRange: { 
      score: Number(criteria.grammar?.score || criteria.grammaticalRange?.score || 6),
      comment: criteria.grammar?.comment || criteria.grammaticalRange?.comment || ''
    },
  };

  const getScoreColor = (score) => {
    const s = Number(score) || 0;
    if (s >= 7) return { bg: 'bg-[#58CC02]', text: 'text-white', border: 'border-[#4BAD02]' };
    if (s >= 5.5) return { bg: 'bg-[#1CB0F6]', text: 'text-white', border: 'border-[#159EE0]' };
    return { bg: 'bg-[#FF4B4B]', text: 'text-white', border: 'border-[#E04343]' };
  };

  const getBandDescription = (score) => {
    if (score >= 8) return 'Xuất sắc';
    if (score >= 7) return 'Tốt';
    if (score >= 6) return 'Khá';
    if (score >= 5) return 'Trung bình';
    return 'Cần cải thiện';
  };

  return (
    <div className="space-y-6 font-nunito">
      
      {/* 🎯 Main Score Card - HUBSTUDY Style */}
      <div className="bg-gradient-to-br from-[#1CB0F6] to-[#159EE0] rounded-3xl shadow-xl p-8 text-white relative overflow-hidden border-b-[8px] border-[#159EE0]">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border-b-[4px] border-white/30">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/90">Điểm Writing của bạn</p>
                <p className="text-xs text-white/60">Band Score</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(safeOverallScore / 2) ? 'fill-yellow-300 text-yellow-300' : 'text-white/30'}`} 
                  />
                ))}
              </div>
              <p className="text-sm text-white/90">{getBandDescription(safeOverallScore)}</p>
            </div>
          </div>
          
          <div className="text-center py-6">
            <div className="text-8xl font-black mb-2">{safeOverallScore.toFixed(1)}</div>
            <p className="text-lg text-white/80">{wordCount} từ đã viết</p>
          </div>
          
          {/* Score progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/60 mb-2">
              <span>0</span>
              <span>5.0</span>
              <span>9.0</span>
            </div>
            <div className="h-4 bg-white/20 rounded-full overflow-hidden border-b-[3px] border-white/20">
              <div 
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full transition-all duration-1000"
                style={{ width: `${(safeOverallScore / 9) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 📊 Criteria Breakdown - 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Task Achievement */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border-b-[6px] border-[#159EE0] hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1CB0F6]/10 rounded-xl">
                <Target className="w-5 h-5 text-[#1CB0F6]" />
              </div>
              <h4 className="font-bold text-slate-700">Task Achievement</h4>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border-b-[3px] ${getScoreColor(criteriaData.taskAchievement.score).bg} ${getScoreColor(criteriaData.taskAchievement.score).text} ${getScoreColor(criteriaData.taskAchievement.score).border}`}>
              {criteriaData.taskAchievement.score.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            {criteriaData.taskAchievement.comment || 'Mức độ hoàn thành yêu cầu đề bài'}
          </p>
        </div>

        {/* Coherence & Cohesion */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border-b-[6px] border-[#159EE0] hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1CB0F6]/10 rounded-xl">
                <TrendingUp className="w-5 h-5 text-[#1CB0F6]" />
              </div>
              <h4 className="font-bold text-slate-700">Coherence & Cohesion</h4>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border-b-[3px] ${getScoreColor(criteriaData.coherenceCohesion.score).bg} ${getScoreColor(criteriaData.coherenceCohesion.score).text} ${getScoreColor(criteriaData.coherenceCohesion.score).border}`}>
              {criteriaData.coherenceCohesion.score.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            {criteriaData.coherenceCohesion.comment || 'Tính mạch lạc và liên kết'}
          </p>
        </div>

        {/* Lexical Resource */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border-b-[6px] border-[#159EE0] hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1CB0F6]/10 rounded-xl">
                <BookOpen className="w-5 h-5 text-[#1CB0F6]" />
              </div>
              <h4 className="font-bold text-slate-700">Lexical Resource</h4>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border-b-[3px] ${getScoreColor(criteriaData.lexicalResource.score).bg} ${getScoreColor(criteriaData.lexicalResource.score).text} ${getScoreColor(criteriaData.lexicalResource.score).border}`}>
              {criteriaData.lexicalResource.score.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            {criteriaData.lexicalResource.comment || 'Vốn từ vựng và cách sử dụng'}
          </p>
        </div>

        {/* Grammatical Range */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border-b-[6px] border-[#159EE0] hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1CB0F6]/10 rounded-xl">
                <MessageSquare className="w-5 h-5 text-[#1CB0F6]" />
              </div>
              <h4 className="font-bold text-slate-700">Grammatical Range</h4>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border-b-[3px] ${getScoreColor(criteriaData.grammaticalRange.score).bg} ${getScoreColor(criteriaData.grammaticalRange.score).text} ${getScoreColor(criteriaData.grammaticalRange.score).border}`}>
              {criteriaData.grammaticalRange.score.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            {criteriaData.grammaticalRange.comment || 'Sự đa dạng ngữ pháp'}
          </p>
        </div>
      </div>

      {/* 💡 Detailed Feedback */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border-b-[6px] border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF4B4B]/10 rounded-xl">
              <Zap className="w-5 h-5 text-[#FF4B4B]" />
            </div>
            <h3 className="font-bold text-lg text-slate-700">Nhận xét chi tiết</h3>
          </div>
          <button
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="text-sm text-[#1CB0F6] hover:text-[#159EE0] font-bold"
          >
            {showFullDetails ? 'Thu gọn' : 'Xem thêm'}
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Strengths */}
          {result.strengths?.length > 0 && (
            <div className="bg-[#58CC02]/10 rounded-2xl p-4 border-b-[4px] border-[#4BAD02]">
              <h4 className="font-bold text-[#58CC02] mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Điểm mạnh
              </h4>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-[#58CC02] mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Weaknesses */}
          {result.weaknesses?.length > 0 && (
            <div className="bg-[#FF4B4B]/10 rounded-2xl p-4 border-b-[4px] border-[#E04343]">
              <h4 className="font-bold text-[#FF4B4B] mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Cần cải thiện
              </h4>
              <ul className="space-y-2">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-[#FF4B4B] mt-0.5">!</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Suggestions */}
          {result.suggestions?.length > 0 && showFullDetails && (
            <div className="bg-[#1CB0F6]/10 rounded-2xl p-4 border-b-[4px] border-[#159EE0]">
              <h4 className="font-bold text-[#1CB0F6] mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Gợi ý
              </h4>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-[#1CB0F6] mt-0.5">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Overall comment */}
          {(result.evaluation || result.feedback) && (
            <div className="bg-slate-50 rounded-2xl p-4 border-b-[4px] border-slate-200">
              <p className="text-sm text-slate-600 leading-relaxed">
                {result.evaluation || result.feedback}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 🔄 Action Button - HUBSTUDY 3D Style */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-3 bg-[#58CC02] hover:bg-[#4BAD02] text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg border-b-[6px] border-[#4BAD02] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-[2px] active:border-b-[4px]"
      >
        <RotateCcw className="w-5 h-5" />
        Viết bài khác
      </button>
    </div>
  );
};

export default WritingResults;

// src/components/AILab/WritingEditor.jsx
// HUBSTUDY Design: Nunito Font, Brand Colors, 3D Shadow Buttons

import React, { useRef, useEffect } from 'react';
import { FileText, Send, Loader2, Save, Clock, Sparkles } from 'lucide-react';

const WritingEditor = ({
  text,
  setText,
  onSubmit,
  onSaveDraft,
  savingDraft,
  submitting,
  wordCount,
  minWords,
  maxWords,
  showTimer,
  timeLeft,
  formatTime
}) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(300, textareaRef.current.scrollHeight) + 'px';
    }
  }, [text]);

  const wordPercentage = Math.min(100, ((text.split(/\s+/).filter(w => w.length > 0).length) / maxWords) * 100);
  const isValidLength = wordCount >= minWords && wordCount <= maxWords * 1.2;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border-b-[6px] border-slate-200 font-nunito">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#1CB0F6]/10 rounded-2xl border-b-[4px] border-[#159EE0]">
            <FileText className="w-6 h-6 text-[#1CB0F6]" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-700">Bài viết của bạn</h3>
            <p className="text-sm text-slate-500">Viết ít nhất {minWords} từ (khuyến nghị {minWords}-{maxWords} từ)</p>
          </div>
        </div>
        
        {/* Timer */}
        {showTimer && (
          <div className="flex items-center gap-2 bg-[#FF4B4B]/10 px-4 py-2 rounded-xl border-b-[4px] border-[#E04343]">
            <Clock className="w-5 h-5 text-[#FF4B4B]" />
            <span className={`font-black text-lg ${timeLeft < 60 ? 'text-[#FF4B4B]' : 'text-[#FF4B4B]'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {/* Writing Area */}
      <div className="relative mb-5">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Bắt đầu viết bài của bạn ở đây..."
          className="w-full p-5 border-2 border-slate-200 rounded-2xl resize-none focus:border-[#1CB0F6] focus:ring-0 min-h-[300px] text-slate-700 leading-relaxed text-[15px] font-nunito"
          disabled={submitting}
        />
        
        {/* Word count indicator */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <div className={`px-4 py-2 rounded-full text-sm font-bold border-b-[4px] ${
            wordCount < minWords 
              ? 'bg-[#FF4B4B]/10 text-[#FF4B4B] border-[#E04343]' 
              : isValidLength 
                ? 'bg-[#58CC02]/10 text-[#58CC02] border-[#4BAD02]' 
                : 'bg-[#1CB0F6]/10 text-[#1CB0F6] border-[#159EE0]'
          }`}>
            {wordCount} từ
          </div>
          
          {/* Progress bar */}
          <div className="w-28 h-3 bg-slate-100 rounded-full overflow-hidden border-b-[2px] border-slate-200">
            <div 
              className={`h-full transition-all rounded-full ${
                wordCount < minWords 
                  ? 'bg-[#FF4B4B]' 
                  : isValidLength 
                    ? 'bg-[#58CC02]' 
                    : 'bg-[#1CB0F6]'
              }`}
              style={{ width: `${wordPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Word requirement message */}
      {!isValidLength && (
        <div className={`p-4 rounded-2xl text-sm font-bold mb-5 border-b-[4px] ${
          wordCount < minWords 
            ? 'bg-[#FF4B4B]/10 text-[#FF4B4B] border-[#E04343]' 
            : 'bg-[#1CB0F6]/10 text-[#1CB0F6] border-[#159EE0]'
        }`}>
          {wordCount < minWords 
            ? `Cần thêm ${minWords - wordCount} từ nữa để đạt yêu cầu tối thiểu.`
            : 'Bài viết đã vượt quá giới hạn khuyến nghị.'}
        </div>
      )}

      {/* Action buttons - HUBSTUDY 3D Style */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSaveDraft}
          disabled={!text.trim() || savingDraft}
          className="flex items-center gap-2 bg-white text-slate-700 px-6 py-3.5 rounded-2xl font-bold border-b-[6px] border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {savingDraft ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>Lưu nháp</span>
        </button>
        
        <button
          onClick={onSubmit}
          disabled={!text.trim() || submitting}
          className="flex-1 flex items-center justify-center gap-3 bg-[#1CB0F6] hover:bg-[#159EE0] text-white px-6 py-4 rounded-2xl font-black text-lg shadow-lg border-b-[6px] border-[#159EE0] hover:-translate-y-0.5 active:translate-y-[2px] active:border-b-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Đang chấm điểm...</span>
            </>
          ) : (
            <>
              <Send className="w-6 h-6" />
              <span>Nộp bài & Chấm điểm</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default WritingEditor;

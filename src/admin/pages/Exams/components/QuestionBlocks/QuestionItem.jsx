import React, { useState } from 'react';
import { Star, ChevronUp, Zap, X, CheckCircle2, Edit2, Trash2, Music, Plus, Check, Volume2 } from 'lucide-react';
import { QuestionImageUploader, QuestionAudioUploader } from './Uploaders';

// ✅ Thêm prop hideMedia
export const QuestionItem = ({ question, index, onRemove, onUpdate, hideOptions = false, hideMedia = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const currentOpts = question.options || ['A', 'B', 'C', 'D'];

  const handleUpdateOption = (oi, val) => {
    const newOptions = [...currentOpts];
    newOptions[oi] = val;
    if (onUpdate) onUpdate({ options: newOptions });
  };

  const handleQuickFill3 = (e) => {
    e.preventDefault();
    if (onUpdate) onUpdate({ options: ['A', 'B', 'C'], correct: question.correct >= 3 ? 0 : question.correct });
  };

  const handleQuickFill4 = (e) => {
    e.preventDefault();
    if (onUpdate) onUpdate({ options: ['A', 'B', 'C', 'D'] });
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    if (onUpdate) onUpdate({ options: [...currentOpts, ''] });
  };

  const handleRemoveOption = (e, indexToRemove) => {
    e.preventDefault();
    if (currentOpts.length <= 2) return;
    const newOpts = currentOpts.filter((_, i) => i !== indexToRemove);
    let newCorrect = question.correct;
    if (newCorrect === indexToRemove) newCorrect = 0;
    else if (newCorrect > indexToRemove) newCorrect--;
    if (onUpdate) onUpdate({ options: newOpts, correct: newCorrect });
  };

  // ─── EDITING MODE ───
  if (isEditing) {
    return (
      <div
        className="bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[6px] rounded-[24px] p-5 sm:p-6 shadow-sm transition-all animate-in fade-in duration-200 font-sans"
        style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-[12px] bg-[#1CB0F6] border-b-[3px] border-[#1899D6] text-white flex items-center justify-center text-[16px] font-display font-black flex-shrink-0 shadow-sm">
              {question.isExample ? <Star size={18} strokeWidth={3} /> : (index === -1 ? 'VD' : index + 1)}
            </span>
            <span className="text-[16px] font-display font-black text-[#1CB0F6]">Chỉnh sửa câu hỏi</span>
          </div>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 rounded-[14px] text-[12px] font-display font-bold uppercase tracking-wider hover:bg-slate-50 hover:text-slate-700 active:border-b-2 active:translate-y-[2px] flex items-center gap-1.5 transition-all shadow-sm outline-none"
          >
            <ChevronUp className="w-4 h-4" strokeWidth={3} /> Thu gọn
          </button>
        </div>

        <div className="space-y-5">
          {/* Toggle Example */}
          <label className={`relative flex items-center justify-between cursor-pointer p-4 rounded-[20px] border-2 transition-all ${
            question.isExample ? 'bg-[#FFFBEA] border-[#FFD8A8]' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border-b-[3px] shadow-sm ${
                question.isExample ? 'bg-[#FF9600] text-white border-[#E58700]' : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}>
                <Star size={18} strokeWidth={3} />
              </div>
              <div>
                <p className={`font-display font-extrabold text-[15px] leading-tight ${question.isExample ? 'text-[#FF9600]' : 'text-slate-700'}`}>
                  Đây là câu Ví dụ (Example)
                </p>
                <p className="text-[12px] font-body font-bold text-slate-500 mt-0.5">Không tính điểm, hiện sẵn đáp án mẫu.</p>
              </div>
            </div>
            <div className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 border-2 ${
              question.isExample ? 'bg-[#FF9600] border-[#E58700]' : 'bg-slate-200 border-slate-300'
            }`}>
              <input
                type="checkbox"
                className="sr-only"
                checked={question.isExample || false}
                onChange={(e) => onUpdate({ isExample: e.target.checked })}
              />
              <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${question.isExample ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </label>

          {/* Image / Audio uploaders */}
          {!hideOptions && !hideMedia && (
            <div className="flex flex-col sm:flex-row gap-4">
              <QuestionImageUploader
                imageUrl={question.imageUrl}
                imageStoragePath={question.imageStoragePath}
                onUpdate={(updates) => onUpdate && onUpdate(updates)}
              />
              <QuestionAudioUploader
                audioUrl={question.audioUrl}
                audioStoragePath={question.audioStoragePath}
                onUpdate={(updates) => onUpdate && onUpdate(updates)}
              />
            </div>
          )}

          {/* Nội dung câu hỏi */}
          <div>
            <label className="text-[12px] font-display font-black text-[#1CB0F6] uppercase tracking-widest block mb-2.5">
              Nội dung câu hỏi (Tùy chọn)
            </label>
            <textarea
              value={question.question || ''}
              onChange={(e) => onUpdate && onUpdate({ question: e.target.value })}
              rows={2}
              placeholder="Nhập nội dung câu hỏi..."
              className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-white shadow-sm resize-y transition-all placeholder:font-medium placeholder:text-slate-400"
            />
          </div>

          {/* 🚀 THÊM Ô NHẬP TRANSCRIPT CHO CÂU LẺ NẰM Ở ĐÂY */}
          {!hideMedia && (
            <div>
              <label className="text-[12px] font-display font-black text-[#1CB0F6] uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                <Volume2 size={14} strokeWidth={3} /> Transcript / Lời thoại Audio (Part 1, 2)
              </label>
              <textarea 
                value={question.script || ''} 
                onChange={(e) => onUpdate && onUpdate({ script: e.target.value })} 
                rows={2} 
                placeholder="Nhập Transcript... (Sẽ ẨN khi đang thi, chỉ HIỆN khi học viên xem lại đáp án)" 
                className="w-full border-2 border-[#BAE3FB] rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-[#EAF6FE]/30 focus:bg-white resize-y transition-all placeholder:text-slate-400" 
              />
            </div>
          )}

          {/* Các lựa chọn */}
          {!hideOptions && (
            <div>
              <div className="flex flex-wrap items-center justify-between mb-2.5 gap-3">
                <label className="text-[12px] font-display font-black text-[#1CB0F6] uppercase tracking-widest block">
                  Các lựa chọn
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={handleQuickFill3}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFBEA] text-[#FF9600] border-2 border-[#FFD8A8] border-b-[3px] rounded-[10px] text-[11px] font-display font-black uppercase tracking-wider hover:bg-[#FF9600] hover:text-white hover:border-[#E58700] active:border-b-2 active:translate-y-[1px] transition-all outline-none"
                  >
                    <Zap size={14} strokeWidth={3} /> 3 Lựa chọn
                  </button>
                  <button
                    onClick={handleQuickFill4}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] border-b-[3px] rounded-[10px] text-[11px] font-display font-black uppercase tracking-wider hover:bg-[#1CB0F6] hover:text-white hover:border-[#1899D6] active:border-b-2 active:translate-y-[1px] transition-all outline-none"
                  >
                    <Zap size={14} strokeWidth={3} /> 4 Lựa chọn
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentOpts.map((opt, i) => {
                  const isCorrect = question.correct === i;
                  return (
                    <div
                      key={i}
                      className={`relative flex items-center gap-3 p-2 pr-14 rounded-[20px] border-2 transition-all shadow-sm ${
                        isCorrect ? 'bg-[#f1faeb] border-[#bcf096]' : 'bg-white border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => onUpdate && onUpdate({ correct: i })}
                        className={`w-11 h-11 rounded-[14px] flex-shrink-0 flex items-center justify-center text-[15px] font-display font-black transition-all outline-none border-b-[3px] ${
                          isCorrect ? 'bg-[#58CC02] border-[#46A302] text-white shadow-sm -translate-y-px' : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </button>
                      <input
                        value={opt}
                        onChange={(e) => handleUpdateOption(i, e.target.value)}
                        placeholder={`Lựa chọn ${String.fromCharCode(65 + i)}`}
                        className={`flex-1 min-w-0 border-0 px-2 py-2 text-[14px] font-body font-bold outline-none bg-transparent placeholder:font-medium placeholder:text-slate-400 ${
                          isCorrect ? 'text-[#46A302]' : 'text-slate-700'
                        }`}
                      />

                      {currentOpts.length > 2 && (
                        <button
                          onClick={(e) => handleRemoveOption(e, i)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#fff0f0] border-2 border-[#ffc1c1] border-b-[4px] rounded-[12px] text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:border-b-[2px] active:translate-y-[2px] active:scale-95 transition-all outline-none shadow-md z-10"
                          title="Xóa lựa chọn này"
                        >
                          <X size={20} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-3">
                <button
                  onClick={handleAddOption}
                  className="text-[13px] font-body font-bold text-[#1CB0F6] flex items-center gap-1 hover:underline outline-none"
                >
                  <Plus size={16} strokeWidth={3} /> Thêm 1 đáp án
                </button>
              </div>
            </div>
          )}

          {/* Giải thích */}
          <div>
            <label className="text-[12px] font-display font-black text-[#1CB0F6] uppercase tracking-widest block mb-2.5">
              Giải thích chi tiết (Tùy chọn)
            </label>
            <textarea
              value={question.explanation || ''}
              onChange={(e) => onUpdate && onUpdate({ explanation: e.target.value })}
              rows={2}
              placeholder="Giải thích vì sao đáp án này đúng..."
              className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-600 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-white shadow-sm resize-y transition-all placeholder:font-medium placeholder:text-slate-400"
            />
          </div>

          {/* ── NÚT LƯU & THU GỌN ── */}
          <div className="pt-2 border-t-2 border-[#BAE3FB]">
            <button
              onClick={() => setIsEditing(false)}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#1CB0F6] text-white border-2 border-[#1899D6] border-b-[4px] rounded-[20px] font-display font-black text-[15px] uppercase tracking-wider shadow-md hover:bg-[#1899D6] hover:border-[#1582BE] active:border-b-[2px] active:translate-y-[2px] active:scale-[0.99] transition-all outline-none"
            >
              <Check size={22} strokeWidth={3} />
              Lưu câu hỏi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── VIEW MODE ───
  return (
    <div
      className={`rounded-[24px] p-5 sm:p-6 border-2 border-b-[4px] hover:shadow-sm transition-all group relative font-sans ${
        question.isExample ? 'bg-[#FFFBEA] border-[#FFD8A8] hover:border-[#FFC200]' : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >

      {/* Nút Edit + Delete */}
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 bg-white p-2 rounded-[18px] shadow-md border-2 border-slate-100 z-10">
        <button
          onClick={() => setIsEditing(true)}
          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-[#1CB0F6] hover:bg-blue-50 border-2 border-transparent hover:border-[#BAE3FB] rounded-[12px] transition-all outline-none active:scale-95"
        >
          <Edit2 className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => onRemove(question.id)}
          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-[#FF4B4B] hover:bg-[#fff0f0] border-2 border-transparent hover:border-[#ffc1c1] rounded-[12px] transition-all outline-none active:scale-95"
        >
          <Trash2 className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Question header */}
      <div className="flex items-start gap-4 mb-5 pr-24">
        <span className={`w-10 h-10 border-2 border-b-[3px] rounded-[12px] flex items-center justify-center text-[15px] font-display font-black flex-shrink-0 shadow-sm mt-0.5 ${
          question.isExample ? 'bg-[#FF9600] border-[#E58700] text-white' : 'bg-slate-100 border-slate-200 text-slate-500'
        }`}>
          {question.isExample ? 'VD' : (index === -1 ? 'VD' : index + 1)}
        </span>

        <div className="flex-1 pt-1">
          {question.isExample && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[8px] bg-[#FF9600]/20 text-[#FF9600] text-[10px] font-display font-black uppercase tracking-widest mb-2">
              <Star size={12} strokeWidth={3} /> Câu Ví Dụ (Không tính điểm)
            </span>
          )}

          <div className="flex flex-wrap gap-4 mb-4">
            {question.imageUrl && (
              <img
                src={question.imageUrl}
                alt={`Question ${index + 1}`}
                className="max-h-48 rounded-[16px] border-2 border-slate-200 bg-white p-1.5 object-contain"
              />
            )}
            {question.audioUrl && (
              <div className="flex items-center gap-3 p-3 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[16px] shadow-sm self-end">
                <Music className="w-5 h-5 text-[#1CB0F6]" />
                <audio src={question.audioUrl} controls className="h-8 w-40" />
              </div>
            )}
          </div>

          <p className={`text-[15px] font-body font-bold leading-snug whitespace-pre-wrap m-0 ${
            question.isExample ? 'text-[#D9A600]' : 'text-slate-800'
          }`}>
            {question.question || <span className="opacity-50 italic">(Không có nội dung câu hỏi)</span>}
          </p>
        </div>
      </div>

      {/* 🚀 HIỂN THỊ TRƯỚC SCRIPT KHI Ở CHẾ ĐỘ XEM TRONG ADMIN */}
      {question.script && (
        <div className="mt-4 mb-4 pl-14">
          <div className="text-[14px] font-body font-bold leading-relaxed text-slate-600 bg-[#EAF6FE]/50 border-2 border-[#BAE3FB] p-4 rounded-[16px] whitespace-pre-wrap italic">
            <div className="flex items-center gap-1.5 mb-2 text-[#1CB0F6] not-italic">
              <Volume2 size={16} strokeWidth={3}/> 
              <span className="text-[11px] font-display font-black uppercase tracking-widest">Transcript Lời thoại</span>
            </div>
            "{question.script}"
          </div>
        </div>
      )}

      {/* Options */}
      {!hideOptions && question.options?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-14">
          {question.options.map((opt, oi) => {
            const isCorrect = oi === question.correct;
            return (
              <div
                key={oi}
                className={`flex items-center gap-3 px-4 py-3 rounded-[16px] border-2 transition-all ${
                  isCorrect ? 'border-[#bcf096] bg-[#f1faeb] text-[#58CC02] border-b-[4px]' : 'border-slate-100 bg-white/50 text-slate-600'
                }`}
              >
                <span className={`w-7 h-7 rounded-[8px] flex items-center justify-center text-[12px] font-display font-black flex-shrink-0 ${
                  isCorrect ? 'bg-[#58CC02] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + oi)}
                </span>
                <span className="flex-1 break-words leading-snug font-body font-bold text-[14px]">
                  {opt || <span className="text-slate-400 italic font-medium">🎧 Đáp án trong Audio</span>}
                </span>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-[#58CC02] flex-shrink-0" strokeWidth={2.5} />}
              </div>
            );
          })}
        </div>
      )}

      {/* Explanation */}
      {question.explanation && (
        <div className="mt-5 pl-14">
          <div className="bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[16px] p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#1CB0F6]" />
            <p className="text-[14px] font-body font-bold text-slate-700 leading-relaxed m-0 whitespace-pre-wrap pl-2">
              <span className="font-display font-black text-[#1CB0F6] uppercase tracking-wider mr-2">💡 Giải thích:</span>
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
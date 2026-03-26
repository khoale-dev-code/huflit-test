import React, { useState } from 'react';
import { Star, ChevronUp, ChevronDown, Zap, X, CheckCircle2, Edit2, Trash2, Music, Plus, Check, Volume2, ChevronRight } from 'lucide-react';
import { QuestionImageUploader, QuestionAudioUploader } from './Uploaders';

// ✅ Thêm props: totalQuestions, onMoveUp, onMoveDown
export const QuestionItem = ({ 
  question, 
  index, 
  totalQuestions, // Tổng số câu hỏi để biết khi nào bị disable nút Move Down
  onRemove, 
  onUpdate, 
  onMoveUp, 
  onMoveDown, 
  hideOptions = false, 
  hideMedia = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
      <div className="bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[6px] rounded-3xl p-5 sm:p-6 shadow-sm transition-all animate-in fade-in duration-200 font-nunito">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-[#1CB0F6] border-b-[4px] border-[#1899D6] text-white flex items-center justify-center text-[18px] font-black shrink-0 shadow-sm">
              {question.isExample ? <Star size={20} strokeWidth={3} /> : (index === -1 ? 'VD' : index + 1)}
            </span>
            <span className="text-[18px] font-black text-[#1CB0F6] uppercase tracking-wider">Chỉnh sửa câu hỏi</span>
          </div>
          <button
            onClick={() => setIsEditing(false)}
            className="px-5 py-2.5 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 rounded-xl text-[13px] font-black uppercase tracking-widest hover:bg-slate-50 hover:text-slate-700 active:border-b-2 active:translate-y-[2px] flex items-center gap-2 transition-all shadow-sm outline-none"
          >
            <ChevronUp className="w-5 h-5" strokeWidth={3} /> Thu gọn
          </button>
        </div>

        <div className="space-y-6">
          {/* Toggle Example */}
          <label className={`relative flex items-center justify-between cursor-pointer p-4 sm:p-5 rounded-2xl border-2 transition-all ${
            question.isExample ? 'bg-[#FFFBEA] border-[#FFD8A8] border-b-[4px]' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-b-[4px] shadow-sm ${
                question.isExample ? 'bg-[#FF9600] text-white border-[#E58700]' : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}>
                <Star size={20} strokeWidth={3} />
              </div>
              <div>
                <p className={`font-black text-[16px] leading-tight ${question.isExample ? 'text-[#D9A600]' : 'text-slate-700'}`}>
                  Đây là câu Ví dụ (Example)
                </p>
                <p className="text-[13px] font-bold text-slate-500 mt-1">Không tính điểm, hiện sẵn đáp án mẫu.</p>
              </div>
            </div>
            <div className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 border-2 shadow-inner ${
              question.isExample ? 'bg-[#FF9600] border-[#E58700]' : 'bg-slate-200 border-slate-300'
            }`}>
              <input type="checkbox" className="sr-only" checked={question.isExample || false} onChange={(e) => onUpdate({ isExample: e.target.checked })} />
              <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ${question.isExample ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </label>

          {/* Image / Audio uploaders */}
          {!hideOptions && !hideMedia && (
            <div className="flex flex-col sm:flex-row gap-4">
              <QuestionImageUploader imageUrl={question.imageUrl} imageStoragePath={question.imageStoragePath} onUpdate={(updates) => onUpdate && onUpdate(updates)} />
              <QuestionAudioUploader audioUrl={question.audioUrl} audioStoragePath={question.audioStoragePath} onUpdate={(updates) => onUpdate && onUpdate(updates)} />
            </div>
          )}

          {/* Nội dung câu hỏi */}
          <div>
            <label className="text-[13px] font-black text-[#1CB0F6] uppercase tracking-widest block mb-3">Nội dung câu hỏi (Tùy chọn)</label>
            <textarea
              value={question.question || ''} onChange={(e) => onUpdate && onUpdate({ question: e.target.value })} rows={2} placeholder="Nhập nội dung câu hỏi..."
              className="w-full border-2 border-slate-200 border-b-[4px] rounded-2xl px-5 py-4 text-[16px] font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-white shadow-sm resize-y transition-all placeholder:font-medium placeholder:text-slate-400"
            />
          </div>

          {/* Transcript cho Audio */}
          {!hideMedia && (
            <div>
              <label className="text-[13px] font-black text-[#1CB0F6] uppercase tracking-widest flex items-center gap-2 mb-3">
                <Volume2 size={18} strokeWidth={3} /> Transcript / Lời thoại Audio
              </label>
              <textarea 
                value={question.script || ''} onChange={(e) => onUpdate && onUpdate({ script: e.target.value })} rows={2} 
                placeholder="Sẽ ẨN khi đang thi, chỉ HIỆN khi học viên xem lại đáp án..." 
                className="w-full border-2 border-[#BAE3FB] border-b-[4px] rounded-2xl px-5 py-4 text-[16px] font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-[#EAF6FE]/50 focus:bg-white resize-y transition-all placeholder:text-slate-400" 
              />
            </div>
          )}

          {/* Các lựa chọn (Options) */}
          {!hideOptions && (
            <div className="bg-white p-5 rounded-2xl border-2 border-slate-200">
              <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                <label className="text-[13px] font-black text-slate-500 uppercase tracking-widest block">
                  Danh sách đáp án
                </label>
                <div className="flex gap-2">
                  <button onClick={handleQuickFill3} className="flex items-center gap-1.5 px-3 py-2 bg-[#FFFBEA] text-[#FF9600] border-2 border-[#FFD8A8] border-b-[3px] rounded-xl text-[12px] font-black uppercase tracking-wider hover:brightness-105 active:border-b-2 active:translate-y-[1px] transition-all outline-none">
                    <Zap size={16} strokeWidth={3} /> 3 Lựa chọn
                  </button>
                  <button onClick={handleQuickFill4} className="flex items-center gap-1.5 px-3 py-2 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] border-b-[3px] rounded-xl text-[12px] font-black uppercase tracking-wider hover:brightness-105 active:border-b-2 active:translate-y-[1px] transition-all outline-none">
                    <Zap size={16} strokeWidth={3} /> 4 Lựa chọn
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentOpts.map((opt, i) => {
                  const isCorrect = question.correct === i;
                  return (
                    <div key={i} className={`relative flex items-center gap-3 p-2.5 pr-14 rounded-2xl border-2 border-b-[4px] transition-all shadow-sm ${
                        isCorrect ? 'bg-[#F0FAE8] border-[#bcf096]' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => onUpdate && onUpdate({ correct: i })}
                        className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-[16px] font-black transition-all outline-none border-b-[3px] ${
                          isCorrect ? 'bg-[#58CC02] border-[#46A302] text-white shadow-sm -translate-y-0.5' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </button>
                      <input
                        value={opt} onChange={(e) => handleUpdateOption(i, e.target.value)} placeholder={`Lựa chọn ${String.fromCharCode(65 + i)}`}
                        className={`flex-1 min-w-0 border-0 px-2 py-2 text-[15px] font-bold outline-none bg-transparent placeholder:font-medium placeholder:text-slate-400 ${
                          isCorrect ? 'text-[#46A302]' : 'text-slate-700'
                        }`}
                      />
                      {currentOpts.length > 2 && (
                        <button
                          onClick={(e) => handleRemoveOption(e, i)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#fff0f0] border-2 border-[#ffc1c1] border-b-[3px] rounded-xl text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:border-b-2 active:translate-y-[1px] active:scale-95 transition-all outline-none shadow-sm z-10"
                          title="Xóa lựa chọn này"
                        >
                          <X size={18} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <button onClick={handleAddOption} className="text-[13px] font-black text-[#1CB0F6] flex items-center gap-1.5 hover:underline outline-none uppercase tracking-widest bg-[#EAF6FE] px-4 py-2 rounded-lg">
                  <Plus size={18} strokeWidth={3} /> Thêm đáp án
                </button>
              </div>
            </div>
          )}

          {/* Giải thích */}
          <div>
            <label className="text-[13px] font-black text-[#1CB0F6] uppercase tracking-widest block mb-3">Giải thích chi tiết (Tùy chọn)</label>
            <textarea
              value={question.explanation || ''} onChange={(e) => onUpdate && onUpdate({ explanation: e.target.value })} rows={2} placeholder="Giải thích vì sao đáp án này đúng..."
              className="w-full border-2 border-slate-200 border-b-[4px] rounded-2xl px-5 py-4 text-[15px] font-bold text-slate-700 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-white shadow-sm resize-y transition-all placeholder:font-medium placeholder:text-slate-400"
            />
          </div>

          {/* ── NÚT LƯU ── */}
          <div className="pt-4 border-t-2 border-[#BAE3FB]">
            <button
              onClick={() => setIsEditing(false)}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#1CB0F6] text-white border-2 border-[#1899D6] border-b-[6px] rounded-2xl font-black text-[16px] uppercase tracking-widest shadow-sm hover:brightness-105 active:border-b-2 active:translate-y-[4px] transition-all outline-none"
            >
              <Check size={24} strokeWidth={3} /> Hoàn tất chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── VIEW MODE ───
  const truncateText = (text, maxLength = 60) => {
    if (!text) return 'Chưa có nội dung';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className={`rounded-3xl border-2 border-b-[6px] transition-all group relative font-nunito ${
        question.isExample ? 'bg-[#FFFBEA] border-[#FFD8A8] hover:border-[#FFC200]' : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Collapsed Summary Header */}
      <div 
        className="flex items-center gap-3 p-4 sm:p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={`w-10 h-10 border-2 border-b-[4px] rounded-xl flex items-center justify-center text-[14px] font-black flex-shrink-0 shadow-sm ${
          question.isExample ? 'bg-[#FF9600] border-[#E58700] text-white' : 'bg-slate-100 border-slate-200 text-slate-500'
        }`}>
          {question.isExample ? 'VD' : (index === -1 ? 'VD' : index + 1)}
        </span>

        <div className="flex-1 min-w-0">
          <p className={`text-[14px] font-bold truncate ${question.isExample ? 'text-[#D9A600]' : 'text-slate-700'}`}>
            {truncateText(question.question)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold text-slate-400">
              {question.options?.length || 0} đáp án
            </span>
            {question.isExample && (
              <span className="text-[10px] font-black text-[#FF9600]">• Ví dụ</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Actions in collapsed state */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-[#1CB0F6] hover:bg-[#EAF6FE] rounded-lg transition-all"
            title="Sửa"
          >
            <Edit2 size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove && onRemove(question.id); }}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-[#FF4B4B] hover:bg-[#fff0f0] rounded-lg transition-all"
            title="Xóa"
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-[#CE82FF] hover:bg-[#F8EEFF] rounded-lg transition-all"
            title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            {isExpanded ? <ChevronUp size={18} strokeWidth={3} /> : <ChevronDown size={18} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-200 p-5 sm:p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-end gap-1.5 mb-4 pb-4 border-b border-slate-100">
            {onMoveUp && (
              <button
                onClick={() => onMoveUp(index)}
                disabled={index === 0}
                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#1CB0F6] hover:bg-[#EAF6FE] rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 outline-none"
                title="Chuyển lên"
              >
                <ChevronUp size={20} strokeWidth={3} />
              </button>
            )}
            {onMoveDown && (
              <button
                onClick={() => onMoveDown(index)}
                disabled={index === totalQuestions - 1}
                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#1CB0F6] hover:bg-[#EAF6FE] rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 outline-none"
                title="Chuyển xuống"
              >
                <ChevronDown size={20} strokeWidth={3} />
              </button>
            )}
            {(onMoveUp || onMoveDown) && <div className="w-px h-6 bg-slate-200 mx-1" />}
            <button
              onClick={() => setIsEditing(true)}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#FF9600] hover:bg-[#FFFBEA] rounded-xl transition-all outline-none"
              title="Chỉnh sửa"
            >
              <Edit2 size={18} strokeWidth={3} />
            </button>
            <button
              onClick={() => onRemove && onRemove(question.id)}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#FF4B4B] hover:bg-[#fff0f0] rounded-xl transition-all outline-none"
              title="Xóa"
            >
              <Trash2 size={18} strokeWidth={3} />
            </button>
          </div>

          {/* Question header */}
          <div className="flex items-start gap-4 mb-6">
            <span className={`w-12 h-12 border-2 border-b-[4px] rounded-2xl flex items-center justify-center text-[16px] font-black flex-shrink-0 shadow-sm mt-1 ${
              question.isExample ? 'bg-[#FF9600] border-[#E58700] text-white' : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}>
              {question.isExample ? 'VD' : (index === -1 ? 'VD' : index + 1)}
            </span>

            <div className="flex-1 pt-1.5">
              {question.isExample && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FF9600]/10 text-[#FF9600] text-[11px] font-black uppercase tracking-widest mb-3 border border-[#FFD8A8]">
                  <Star size={14} strokeWidth={3} /> Câu Ví Dụ
                </span>
              )}

              <div className="flex flex-wrap gap-4 mb-4">
                {question.imageUrl && (
                  <img
                    src={question.imageUrl}
                    alt={`Question ${index + 1}`}
                    className="max-h-56 rounded-2xl border-2 border-slate-200 bg-white p-2 object-contain shadow-sm"
                  />
                )}
                {question.audioUrl && (
                  <div className="flex items-center gap-3 p-3.5 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-2xl shadow-sm self-start">
                    <Music className="w-5 h-5 text-[#1CB0F6]" strokeWidth={3} />
                    <audio src={question.audioUrl} controls className="h-8 w-48" />
                  </div>
                )}
              </div>

              <p className={`text-[17px] font-bold leading-relaxed whitespace-pre-wrap m-0 ${
                question.isExample ? 'text-[#D9A600]' : 'text-slate-800'
              }`}>
                {question.question || <span className="opacity-50 italic text-[15px]">(Chưa nhập nội dung câu hỏi)</span>}
              </p>
            </div>
          </div>

          {/* Script Audio Preview */}
          {question.script && (
            <div className="mt-4 mb-6">
              <div className="text-[15px] font-bold leading-relaxed text-slate-600 bg-[#EAF6FE]/50 border-2 border-[#BAE3FB] p-5 rounded-2xl whitespace-pre-wrap italic">
                <div className="flex items-center gap-2 mb-2 text-[#1CB0F6] not-italic">
                  <Volume2 size={18} strokeWidth={3}/> 
                  <span className="text-[12px] font-black uppercase tracking-widest">Transcript / Lời thoại</span>
                </div>
                "{question.script}"
              </div>
            </div>
          )}

          {/* Options View */}
          {!hideOptions && question.options?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((opt, oi) => {
                const isCorrect = oi === question.correct;
                return (
                  <div
                    key={oi}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-b-[4px] transition-all shadow-sm ${
                      isCorrect ? 'border-[#bcf096] bg-[#F0FAE8] text-[#58CC02]' : 'border-slate-100 bg-white/50 text-slate-600'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[14px] font-black shrink-0 border-b-2 ${
                      isCorrect ? 'bg-[#58CC02] border-[#46A302] text-white shadow-sm' : 'bg-slate-200 border-slate-300 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className={`flex-1 break-words leading-snug font-bold text-[15px] ${isCorrect ? 'text-[#46A302]' : ''}`}>
                      {opt || <span className="text-slate-400 italic font-medium">🎧 Nghe trong Audio</span>}
                    </span>
                    {isCorrect && <CheckCircle2 className="w-6 h-6 text-[#58CC02] shrink-0" strokeWidth={3} />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Explanation View */}
          {question.explanation && (
            <div className="mt-6">
              <div className="bg-[#FFFBEA] border-2 border-[#FFD8A8] rounded-2xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#FF9600]" />
                <p className="text-[15px] font-bold text-slate-700 leading-relaxed m-0 whitespace-pre-wrap pl-3">
                  <span className="font-black text-[#D9A600] uppercase tracking-widest mr-2 block mb-1">💡 Giải thích đáp án:</span>
                  {question.explanation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
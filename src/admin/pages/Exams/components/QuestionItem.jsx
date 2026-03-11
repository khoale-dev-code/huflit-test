// src/admin/pages/Exams/components/QuestionItem.jsx
import React, { useState } from 'react';
import { X, Plus, Check, Edit2, ChevronUp, GripVertical, CheckCircle2 } from 'lucide-react';

// ─── QuestionItem (Hiển thị & Chỉnh sửa real-time) ──────────────────────────
export const QuestionItem = ({ question, index, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateOption = (oi, val) => {
    const newOptions = [...(question.options || ['', '', '', ''])];
    newOptions[oi] = val;
    if (onUpdate) onUpdate({ options: newOptions });
  };

  // NẾU ĐANG Ở CHẾ ĐỘ CHỈNH SỬA
  if (isEditing) {
    return (
      <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all animate-in fade-in duration-200">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-sm font-bold text-slate-800">Chỉnh sửa câu hỏi</span>
          </div>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:text-slate-900 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <ChevronUp className="w-4 h-4" /> Đóng
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Question Input */}
          <div>
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">Nội dung câu hỏi</label>
            <textarea
              value={question.question || ''}
              onChange={(e) => onUpdate && onUpdate({ question: e.target.value })}
              rows={2}
              placeholder="Nhập nội dung câu hỏi..."
              className="w-full border-0 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 focus:ring-4 focus:ring-blue-500/20 bg-white shadow-sm resize-y transition-all"
            />
          </div>

          {/* Options */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block">Đáp án</label>
              <span className="text-xs text-slate-400 font-medium">Click vào chữ cái để đặt làm đáp án đúng</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {(question.options || ['', '', '', '']).map((opt, i) => {
                const isCorrect = question.correct === i;
                return (
                  <div key={i} className={`flex items-center gap-3 p-1.5 rounded-2xl border transition-all ${isCorrect ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-transparent shadow-sm'}`}>
                    <button
                      onClick={() => onUpdate && onUpdate({ correct: i })}
                      className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-black transition-all
                        ${isCorrect 
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200 scale-105' 
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                    >
                      {String.fromCharCode(65 + i)}
                    </button>
                    <input
                      value={opt}
                      onChange={(e) => handleUpdateOption(i, e.target.value)}
                      placeholder={`Lựa chọn ${String.fromCharCode(65 + i)}`}
                      className={`flex-1 min-w-0 border-0 px-2 py-2 text-sm font-medium focus:ring-0 bg-transparent outline-none
                        ${isCorrect ? 'text-emerald-900 placeholder:text-emerald-300' : 'text-slate-700 placeholder:text-slate-300'}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">Giải thích <span className="text-slate-400 font-medium normal-case tracking-normal">(Tuỳ chọn)</span></label>
            <textarea
              value={question.explanation || ''}
              onChange={(e) => onUpdate && onUpdate({ explanation: e.target.value })}
              rows={2}
              placeholder="Giải thích vì sao đáp án này đúng..."
              className="w-full border-0 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-600 focus:ring-4 focus:ring-blue-500/20 bg-white shadow-sm resize-y transition-all placeholder:italic"
            />
          </div>
        </div>
      </div>
    );
  }

  // NẾU Ở CHẾ ĐỘ XEM (Mặc định)
  return (
    <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5 transition-all group relative">
      
      {/* Action Buttons - Hiện khi Hover */}
      <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 bg-white p-1 rounded-xl shadow-sm border border-slate-100 z-10">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
          title="Chỉnh sửa câu hỏi"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onRemove(question.id)}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
          title="Xóa câu hỏi này"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start gap-3 sm:gap-4 mb-4 pr-20">
        <span className="w-8 h-8 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-center text-xs font-black text-slate-600 flex-shrink-0 mt-0.5">
          {index + 1}
        </span>
        <p className="text-sm font-bold text-slate-800 leading-relaxed pt-1 whitespace-pre-wrap">
          {question.question || <span className="text-slate-400 italic">(Chưa có nội dung câu hỏi)</span>}
        </p>
      </div>

      {question.options?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pl-11 sm:pl-12">
          {question.options.map((opt, oi) => {
            const isCorrect = oi === question.correct;
            return (
              <div
                key={oi}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all
                  ${isCorrect
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600'}`}
              >
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0
                    ${isCorrect ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-slate-100 text-slate-500'}`}
                >
                  {String.fromCharCode(65 + oi)}
                </span>
                <span className="flex-1 break-words leading-snug">{opt || <span className="text-slate-300 italic">Trống</span>}</span>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      )}

      {question.explanation && (
        <div className="mt-4 pl-11 sm:pl-12">
          <div className="bg-amber-50/50 border border-amber-100 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-800/80 font-medium leading-relaxed italic">
              <span className="font-bold not-italic text-amber-600 mr-2">💡 Giải thích:</span>
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── AddQuestionForm ───────────────────────────────────────────────
export const AddQuestionForm = ({ onAdd, onCancel }) => {
  const [q, setQ] = useState({
    question:    '',
    options:     ['', '', '', ''],
    correct:     0,
    explanation: '',
  });

  const updateOption = (i, val) =>
    setQ(p => { const o = [...p.options]; o[i] = val; return { ...p, options: o }; });

  const handleSubmit = () => {
    if (!q.question.trim() || q.options.filter(Boolean).length < 2) return;
    onAdd(q);
  };

  return (
    <div className="bg-white border-2 border-blue-500 rounded-2xl p-5 sm:p-6 shadow-lg shadow-blue-500/10 animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
          <Plus className="w-5 h-5" />
        </div>
        <h4 className="text-base font-black text-slate-800">Thêm câu hỏi mới</h4>
      </div>

      <div className="space-y-6">
        {/* Question text */}
        <div>
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">
            Nội dung câu hỏi <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Ví dụ: Đâu là thủ đô của Việt Nam?"
            value={q.question}
            onChange={e => setQ(p => ({ ...p, question: e.target.value }))}
            rows={2}
            className="w-full border-2 border-slate-100 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-blue-50/20 resize-y transition-all placeholder:text-slate-300"
          />
        </div>

        {/* Options */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block">Đáp án</label>
            <span className="text-xs text-slate-400 font-medium">Click vào chữ cái để chọn đáp án đúng</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {q.options.map((opt, i) => {
              const isCorrect = q.correct === i;
              return (
                <div key={i} className={`flex items-center gap-3 p-1.5 rounded-2xl border-2 transition-all ${isCorrect ? 'bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-100' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
                  <button
                    onClick={() => setQ(p => ({ ...p, correct: i }))}
                    className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-black transition-all
                      ${isCorrect 
                        ? 'bg-emerald-500 text-white scale-105' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </button>
                  <input
                    placeholder={`Nhập lựa chọn ${String.fromCharCode(65 + i)}...`}
                    value={opt}
                    onChange={e => updateOption(i, e.target.value)}
                    className={`flex-1 min-w-0 border-0 px-2 py-2 text-sm font-medium focus:ring-0 bg-transparent outline-none
                      ${isCorrect ? 'text-emerald-900 placeholder:text-emerald-300' : 'text-slate-700 placeholder:text-slate-300'}`}
                  />
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        <div>
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">
            Giải thích <span className="text-slate-400 font-medium normal-case tracking-normal">(tuỳ chọn)</span>
          </label>
          <textarea
            placeholder="Cung cấp lời giải thích cho học sinh sau khi họ làm xong..."
            value={q.explanation}
            onChange={e => setQ(p => ({ ...p, explanation: e.target.value }))}
            rows={2}
            className="w-full border-2 border-slate-100 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-blue-50/20 resize-y transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 border-2 border-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" /> Thêm câu hỏi
          </button>
        </div>
      </div>
    </div>
  );
};
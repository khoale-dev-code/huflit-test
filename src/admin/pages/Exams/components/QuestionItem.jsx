// src/admin/pages/Exams/components/QuestionItem.jsx
import React, { useState } from 'react';
import { X, Plus, Check, Edit2, ChevronUp } from 'lucide-react';

// ─── QuestionItem (Hiển thị & Chỉnh sửa real-time) ──────────────────────────
export const QuestionItem = ({ question, index, onRemove, onUpdate }) => {
  // State quản lý chế độ: đang xem hay đang sửa
  const [isEditing, setIsEditing] = useState(false);

  // Hàm cập nhật mảng options
  const handleUpdateOption = (oi, val) => {
    const newOptions = [...(question.options || ['', '', '', ''])];
    newOptions[oi] = val;
    if (onUpdate) onUpdate({ options: newOptions });
  };

  // NẾU ĐANG Ở CHẾ ĐỘ CHỈNH SỬA
  if (isEditing) {
    return (
      <div className="border-2 border-blue-300 bg-blue-50/20 rounded-xl p-5 space-y-4 shadow-sm transition-all">
        <div className="flex justify-between items-center border-b border-blue-100 pb-3 mb-2">
          <span className="text-sm font-bold text-blue-800">Đang sửa câu hỏi {index + 1}</span>
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-50 flex items-center gap-1 transition-colors"
          >
            <ChevronUp className="w-3.5 h-3.5" /> Thu gọn
          </button>
        </div>
        
        {/* Sửa câu hỏi - Cập nhật trực tiếp lên prop question */}
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-1.5">Nội dung câu hỏi</label>
          <textarea
            value={question.question || ''}
            onChange={(e) => onUpdate && onUpdate({ question: e.target.value })}
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none bg-white shadow-sm"
          />
        </div>

        {/* Sửa đáp án */}
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-2">
            Đáp án <span className="text-gray-400 font-normal">(click chữ cái để đổi đáp án đúng)</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(question.options || ['', '', '', '']).map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => onUpdate && onUpdate({ correct: i })}
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold border-2 transition-colors
                    ${question.correct === i
                      ? 'bg-green-500 border-green-500 text-white shadow-md'
                      : 'border-gray-300 text-gray-400 hover:border-green-400 bg-white'}`}
                >
                  {String.fromCharCode(65 + i)}
                </button>
                <input
                  value={opt}
                  onChange={(e) => handleUpdateOption(i, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sửa giải thích */}
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-1.5">Giải thích (tuỳ chọn)</label>
          <input
            value={question.explanation || ''}
            onChange={(e) => onUpdate && onUpdate({ explanation: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white shadow-sm"
          />
        </div>
      </div>
    );
  }

  // NẾU Ở CHẾ ĐỘ XEM (Mặc định)
  return (
    <div className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all group bg-white">
      <div className="flex items-start gap-3 mb-3">
        <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0 mt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="text-sm text-gray-900 flex-1 leading-relaxed">
          {question.question || '(Chưa có nội dung câu hỏi)'}
        </p>
        
        {/* Nút hành động hiện khi hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
            title="Sửa câu hỏi"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemove(question.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
            title="Xóa câu hỏi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {question.options?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 pl-10">
          {question.options.map((opt, oi) => (
            <div
              key={oi}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium
                ${oi === question.correct
                  ? 'border-green-200 bg-green-50 text-green-800'
                  : 'border-gray-100 text-gray-600'}`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0
                  ${oi === question.correct ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {String.fromCharCode(65 + oi)}
              </span>
              <span className="truncate">{opt}</span>
              {oi === question.correct && <Check className="w-3 h-3 text-green-600 ml-auto flex-shrink-0" />}
            </div>
          ))}
        </div>
      )}

      {question.explanation && (
        <p className="mt-3 ml-10 text-xs text-gray-500 italic border-l-2 border-gray-200 pl-3">
          💡 {question.explanation}
        </p>
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
    <div className="border-2 border-blue-200 bg-blue-50/20 rounded-xl p-5 space-y-4 shadow-sm">
      {/* Question text */}
      <div>
        <label className="text-xs font-bold text-gray-700 block mb-1.5">
          Nội dung câu hỏi mới <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Nhập câu hỏi..."
          value={q.question}
          onChange={e => setQ(p => ({ ...p, question: e.target.value }))}
          rows={2}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none bg-white shadow-sm"
        />
      </div>

      {/* Options */}
      <div>
        <label className="text-xs font-bold text-gray-700 block mb-2">
          Đáp án <span className="text-gray-400 font-normal">(click chữ cái để chọn đáp án đúng)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {q.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => setQ(p => ({ ...p, correct: i }))}
                className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold border-2 transition-colors
                  ${q.correct === i
                    ? 'bg-green-500 border-green-500 text-white shadow-md'
                    : 'border-gray-300 text-gray-400 hover:border-green-400 bg-white'}`}
              >
                {String.fromCharCode(65 + i)}
              </button>
              <input
                placeholder={`Đáp án ${String.fromCharCode(65 + i)}`}
                value={opt}
                onChange={e => updateOption(i, e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div>
        <label className="text-xs font-bold text-gray-700 block mb-1.5">
          Giải thích <span className="text-gray-400 font-normal">(tuỳ chọn)</span>
        </label>
        <input
          placeholder="VD: Michael nói 'the prices were way too high' → ..."
          value={q.explanation}
          onChange={e => setQ(p => ({ ...p, explanation: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white shadow-sm"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Thêm câu hỏi
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 bg-white shadow-sm"
        >
          Hủy
        </button>
      </div>
    </div>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Trash2, Check, Edit2, Copy, ChevronUp, ChevronDown,
  FileText, AlertCircle, CheckCircle2, GripVertical
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const QUESTION_TYPES = [
  { value: 'multiple_choice', label: 'Trắc nghiệm', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'fill_in', label: 'Điền từ', color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'matching', label: 'Nối chọn', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { value: 'true_false', label: 'Đúng/Sai', color: 'bg-orange-100 text-orange-700 border-orange-200' },
];

export const SortableQuestion = ({
  question,
  index,
  onRemove = () => {},
  onUpdate = () => {},
  onDuplicate = () => {},
  isDragOverlay = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localQuestion, setLocalQuestion] = useState(question);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalQuestion(question);
  }, [question]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: question.id,
    disabled: isDragOverlay
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto'
  };

  const getQuestionTypeConfig = (type) => {
    return QUESTION_TYPES.find(t => t.value === type) || QUESTION_TYPES[0];
  };

  const handleSave = () => {
    onUpdate(localQuestion);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalQuestion(question);
    setIsEditing(false);
  };

  const handleOptionChange = (optIndex, value) => {
    const newOptions = [...(localQuestion.options || [])];
    newOptions[optIndex] = value;
    setLocalQuestion({ ...localQuestion, options: newOptions });
  };

  const handleCorrectChange = (correct) => {
    setLocalQuestion({ ...localQuestion, correct });
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text) return 'Chưa có nội dung';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const typeConfig = getQuestionTypeConfig(question.questionType || question.type);

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`bg-white border-2 border-slate-200 rounded-xl overflow-visible transition-all duration-200 ${
        isDragging 
          ? 'ring-4 ring-[#1CB0F6]/30 shadow-xl scale-[1.02] border-[#1CB0F6]' 
          : 'hover:border-slate-300 hover:shadow-sm'
      } ${isDragOverlay ? 'cursor-grabbing' : ''}`}
    >
      {/* Question Header */}
      <div 
        className="p-3 flex items-center gap-2 bg-slate-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Drag Handle */}
        <div 
          className="w-11 h-11 min-w-[44px] rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-500 cursor-grab active:cursor-grabbing hover:bg-[#EAF6FE] hover:border-[#BAE3FB] hover:text-[#1CB0F6] shrink-0 transition-colors"
          title="Kéo để di chuyển"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={22} strokeWidth={3} />
        </div>

        {/* Question Number */}
        <div className="w-11 h-11 min-w-[44px] rounded-xl bg-[#1CB0F6] text-white flex items-center justify-center font-black text-[14px] shrink-0">
          {index + 1}
        </div>

        {/* Question Type Badge */}
        <span className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${typeConfig.color}`}>
          {typeConfig.label}
        </span>

        {/* Preview Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-slate-700 truncate">
            {truncateText(question.question)}
          </p>
        </div>

        {/* Expand Icon */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
          className="w-11 h-11 min-w-[44px] rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-300 transition-all"
          title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
        >
          {isExpanded ? (
            <ChevronUp size={22} strokeWidth={3} />
          ) : (
            <ChevronDown size={22} strokeWidth={3} />
          )}
        </button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-200"
          >
            {isEditing ? (
              <div className="p-4 space-y-4">
                {/* Question Input */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">
                    Nội dung câu hỏi
                  </label>
                  <textarea
                    ref={inputRef}
                    value={localQuestion.question || ''}
                    onChange={(e) => setLocalQuestion({ ...localQuestion, question: e.target.value })}
                    rows={2}
                    className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] bg-slate-50"
                    placeholder="Nhập nội dung câu hỏi..."
                  />
                </div>

                {/* Options */}
                {localQuestion.options && localQuestion.options.length > 0 && (
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">
                      Đáp án
                    </label>
                    <div className="space-y-2">
                      {localQuestion.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <button
                            onClick={() => handleCorrectChange(i)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-colors ${
                              localQuestion.correct === i
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'bg-white border-slate-200 text-slate-400 hover:border-green-300'
                            }`}
                          >
                            {String.fromCharCode(65 + i)}
                          </button>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleOptionChange(i, e.target.value)}
                            className="flex-1 border-2 border-slate-200 rounded-lg px-3 py-1.5 text-[13px] font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] bg-slate-50"
                            placeholder={`Đáp án ${String.fromCharCode(65 + i)}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explanation */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">
                    Giải thích
                  </label>
                  <textarea
                    value={localQuestion.explanation || ''}
                    onChange={(e) => setLocalQuestion({ ...localQuestion, explanation: e.target.value })}
                    rows={2}
                    className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] bg-slate-50"
                    placeholder="Nhập giải thích..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-slate-200">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[48px] bg-[#58CC02] text-white border-b-[4px] border-[#46A302] rounded-xl font-black text-[13px] uppercase tracking-wider hover:brightness-105 active:border-b-0 active:translate-y-[2px] transition-all outline-none focus:ring-2 focus:ring-[#58CC02] focus:ring-offset-2"
                  >
                    <Check size={18} strokeWidth={3} /> Lưu
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[48px] bg-slate-200 text-slate-700 border-b-[4px] border-slate-300 rounded-xl font-black text-[13px] uppercase tracking-wider hover:bg-slate-300 active:border-b-0 active:translate-y-[2px] transition-all outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {/* Question Content */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={14} strokeWidth={3} className="text-[#1CB0F6]" />
                    <span className="text-[10px] font-black text-[#1CB0F6] uppercase tracking-widest">Câu hỏi</span>
                  </div>
                  <p className="text-[14px] font-bold text-slate-800 leading-relaxed pl-6">
                    {question.question || 'Chưa có nội dung'}
                  </p>
                </div>

                {/* Options Preview */}
                {question.options && question.options.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 size={14} strokeWidth={3} className="text-[#58CC02]" />
                      <span className="text-[10px] font-black text-[#58CC02] uppercase tracking-widest">Đáp án đúng</span>
                    </div>
                    <div className="space-y-1.5 pl-6">
                      {question.options.map((opt, i) => (
                        <div 
                          key={i} 
                          className={`flex items-center gap-2 p-2 rounded-lg text-[13px] font-bold ${
                            question.correct === i 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : 'bg-slate-50 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-black ${
                            question.correct === i ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt || '(trống)'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explanation */}
                {question.explanation && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1.5">
                      <AlertCircle size={14} strokeWidth={3} className="text-amber-600" />
                      <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Giải thích</span>
                    </div>
                    <p className="text-[13px] font-bold text-amber-800 leading-relaxed pl-6">
                      {question.explanation}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[48px] bg-[#1CB0F6] text-white border-b-[4px] border-[#1899D6] rounded-xl font-black text-[12px] uppercase tracking-wider hover:brightness-105 active:border-b-0 active:translate-y-[2px] transition-all outline-none focus:ring-2 focus:ring-[#1CB0F6] focus:ring-offset-2"
                  >
                    <Edit2 size={18} strokeWidth={3} /> Sửa
                  </button>
                  <button
                    onClick={() => onDuplicate && onDuplicate(question.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[48px] bg-purple-500 text-white border-b-[4px] border-purple-600 rounded-xl font-black text-[12px] uppercase tracking-wider hover:brightness-110 active:border-b-0 active:translate-y-[2px] transition-all outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <Copy size={18} strokeWidth={3} /> Sao chép
                  </button>
                  <button
                    onClick={() => onRemove && onRemove(question.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[48px] bg-red-500 text-white border-b-[4px] border-red-600 rounded-xl font-black text-[12px] uppercase tracking-wider hover:bg-red-600 active:border-b-0 active:translate-y-[2px] transition-all outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <Trash2 size={18} strokeWidth={3} /> Xóa
                  </button>
                </div>
              </div>
            )}
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Quick Actions */}
      {!isExpanded && (
        <div className="px-3 py-2 flex items-center gap-2 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => setIsEditing(true)}
            className="w-11 h-11 min-w-[44px] rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:bg-[#EAF6FE] hover:border-[#BAE3FB] transition-all"
            title="Sửa"
          >
            <Edit2 size={20} strokeWidth={2} />
          </button>
          <button
            onClick={() => onDuplicate && onDuplicate(question.id)}
            className="w-11 h-11 min-w-[44px] rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition-all"
            title="Sao chép"
          >
            <Copy size={20} strokeWidth={2} />
          </button>
          <button
            onClick={() => onRemove && onRemove(question.id)}
            className="w-11 h-11 min-w-[44px] rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all"
            title="Xóa"
          >
            <Trash2 size={20} strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SortableQuestion;

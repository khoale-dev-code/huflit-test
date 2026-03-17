import React, { useState } from 'react';
import { Trash2, Layers, Check, Edit2, Music, Plus, Zap, Volume2, BookOpen, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionItem } from './QuestionItem';
import { AddQuestionForm } from './AddQuestionForm';
import { QuestionImageUploader, QuestionAudioUploader } from './Uploaders';

export const QuestionGroupItem = ({ group, groupIndex, partId, onRemoveGroup, onUpdateGroup }) => {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [showAddSubQ, setShowAddSubQ] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const subQuestionsCount = group.subQuestions?.length || 0;

  const handleUpdateSubQuestion = (qId, updates) => {
    const updatedSubQuestions = group.subQuestions.map(q => q.id === qId ? { ...q, ...updates } : q);
    onUpdateGroup({ subQuestions: updatedSubQuestions });
  };

  const handleRemoveSubQuestion = (qId) => {
    const updatedSubQuestions = group.subQuestions.filter(q => q.id !== qId);
    onUpdateGroup({ subQuestions: updatedSubQuestions });
  };

  const handleAddSubQuestion = (newQ) => {
    const updatedSubQuestions = [...(group.subQuestions || []), { ...newQ, id: `sq_${Date.now()}` }];
    onUpdateGroup({ subQuestions: updatedSubQuestions });
    setShowAddSubQ(false);
    setIsExpanded(true);
  };

  const handleQuickAdd3 = () => {
    const newSubQs = [1, 2, 3].map((_, i) => ({
      id: `sq_${Date.now()}_${i}`,
      question: '',
      options: ['A', 'B', 'C', 'D'],
      correct: 0,
      explanation: '',
      isExample: false
    }));
    onUpdateGroup({ subQuestions: [...(group.subQuestions || []), ...newSubQs] });
  };

  return (
    <div
      className="bg-[#F8EEFF] border-2 border-[#eec9ff] border-b-[6px] rounded-[28px] overflow-hidden shadow-sm relative group font-sans"
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >

      {/* ── HEADER (Click để Thu gọn / Mở rộng) ── */}
      <div
        onClick={() => !isEditingContent && setIsExpanded(!isExpanded)}
        className={`p-4 sm:p-5 bg-white flex items-center justify-between cursor-pointer transition-colors ${isExpanded ? 'border-b-2 border-[#eec9ff]' : 'hover:bg-slate-50'}`}
      >
        {/* Tiêu đề nhóm */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#CE82FF] border-b-[3px] border-[#B975E5] text-white flex items-center justify-center shadow-sm shrink-0">
            <Layers size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-[16px] font-display font-black text-slate-800 leading-none m-0">
              Nhóm Câu Hỏi (Group)
            </h4>
            <p className="text-[12px] font-body font-bold text-slate-500 mt-1">
              Chứa {subQuestionsCount} câu hỏi con
            </p>
          </div>
        </div>

        {/* Nút Xóa + Chevron */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Xóa nhóm này sẽ mất tất cả câu hỏi nhỏ bên trong?')) onRemoveGroup(group.id);
            }}
            className="w-12 h-12 bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] border-b-[4px] flex items-center justify-center rounded-[12px] shadow-md hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:border-b-[2px] active:translate-y-[2px] active:scale-95 transition-all outline-none"
            title="Xóa nhóm câu hỏi"
          >
            <Trash2 className="w-6 h-6" strokeWidth={2.5} />
          </button>

          <div className="w-10 h-10 rounded-[12px] bg-slate-100 border-2 border-slate-200 border-b-[3px] flex items-center justify-center text-slate-500 shadow-sm pointer-events-none">
            {isExpanded ? <ChevronUp size={20} strokeWidth={3} /> : <ChevronDown size={20} strokeWidth={3} />}
          </div>
        </div>
      </div>

      {/* ── NỘI DUNG (AnimatePresence) ── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >

            {/* ── PHẦN NỘI DUNG ĐOẠN VĂN / PASSAGE ── */}
            <div className="p-5 sm:p-7 border-b-2 border-[#eec9ff] bg-white rounded-b-[24px]">
              {isEditingContent ? (
                /* ─── EDITING MODE ─── */
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-10 h-10 rounded-[12px] bg-[#CE82FF] border-b-[3px] border-[#B975E5] text-white flex items-center justify-center shadow-sm">
                      <Layers size={20} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-[18px] font-display font-black text-slate-800">
                      Chỉnh sửa Đoạn văn / Nhóm
                    </h4>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <QuestionImageUploader
                      imageUrl={group.imageUrl}
                      imageStoragePath={group.imageStoragePath}
                      onUpdate={(updates) => onUpdateGroup(updates)}
                    />
                    <QuestionAudioUploader
                      audioUrl={group.audioUrl}
                      audioStoragePath={group.audioStoragePath}
                      onUpdate={(updates) => onUpdateGroup(updates)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="text-[12px] font-display font-black text-[#CE82FF] uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                        <BookOpen size={14} strokeWidth={3} /> Đoạn văn bài đọc (Part 6, 7)
                      </label>
                      <textarea
                        value={group.content || ''}
                        onChange={(e) => onUpdateGroup({ content: e.target.value })}
                        rows={4}
                        placeholder="Nhập nội dung bài đọc... (Sẽ luôn hiển thị khi thi)"
                        className="w-full border-2 border-[#eec9ff] rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#CE82FF] focus:ring-4 focus:ring-purple-500/10 bg-slate-50 focus:bg-white resize-y transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] font-display font-black text-[#1CB0F6] uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                        <Volume2 size={14} strokeWidth={3} /> Transcript / Lời thoại Audio (Part 3, 4)
                      </label>
                      <textarea
                        value={group.script || ''}
                        onChange={(e) => onUpdateGroup({ script: e.target.value })}
                        rows={3}
                        placeholder="Nhập Transcript... (Sẽ ẨN khi đang thi, chỉ HIỆN khi học viên xem lại đáp án)"
                        className="w-full border-2 border-[#BAE3FB] rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-[#EAF6FE]/30 focus:bg-white resize-y transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditingContent(false)}
                    className="px-5 py-3 w-full sm:w-auto bg-[#CE82FF] text-white border-2 border-[#B975E5] border-b-[4px] rounded-[14px] text-[14px] font-display font-black uppercase tracking-wider hover:bg-[#B975E5] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none flex items-center justify-center gap-2"
                  >
                    <Check size={18} strokeWidth={3} /> Lưu thông tin nhóm
                  </button>
                </div>
              ) : (
                /* ─── VIEW MODE ─── */
                <div className="relative pr-16 group/content">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 bg-[#F8EEFF] text-[#CE82FF] border border-[#eec9ff] rounded-[8px] text-[10px] font-display font-black uppercase tracking-widest flex items-center gap-1.5">
                      <Layers size={14} strokeWidth={3} /> Nội dung chung
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4">
                    {group.imageUrl && (
                      <img
                        src={group.imageUrl}
                        alt="Group"
                        className="max-h-48 rounded-[16px] border-2 border-slate-200 bg-white p-1.5 object-contain"
                      />
                    )}
                    {group.audioUrl && (
                      <div className="flex items-center gap-3 p-3 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[16px] shadow-sm">
                        <Music className="w-5 h-5 text-[#1CB0F6]" />
                        <audio src={group.audioUrl} controls className="h-8 w-40" />
                      </div>
                    )}
                  </div>

                  {group.content && (
                    <div className="mb-4 text-[15px] font-body font-bold leading-relaxed text-slate-800 bg-slate-50 border-2 border-[#eec9ff] p-4 sm:p-5 rounded-[16px] whitespace-pre-wrap">
                      <div className="flex items-center gap-1.5 mb-2 text-[#CE82FF]">
                        <BookOpen size={16} strokeWidth={3} />
                        <span className="text-[11px] font-display font-black uppercase tracking-widest">Đoạn văn đọc hiểu</span>
                      </div>
                      {group.content}
                    </div>
                  )}

                  {group.script && (
                    <div className="mb-4 text-[14px] font-body font-bold leading-relaxed text-slate-600 bg-[#EAF6FE]/50 border-2 border-[#BAE3FB] p-4 sm:p-5 rounded-[16px] whitespace-pre-wrap italic">
                      <div className="flex items-center gap-1.5 mb-2 text-[#1CB0F6] not-italic">
                        <Volume2 size={16} strokeWidth={3} />
                        <span className="text-[11px] font-display font-black uppercase tracking-widest">Transcript Lời thoại</span>
                      </div>
                      "{group.script}"
                    </div>
                  )}

                  {!group.content && !group.script && (
                    <div className="p-4 border-2 border-dashed border-slate-200 rounded-[16px] text-center text-slate-400 italic text-[14px] font-body font-medium">
                      Chưa có nội dung đoạn văn hoặc Transcript.
                    </div>
                  )}

                  {/* Nút Edit nội dung nhóm */}
                  <button
                    onClick={() => setIsEditingContent(true)}
                    className="absolute right-0 top-0 w-12 h-12 bg-white border-2 border-slate-200 border-b-[4px] rounded-[14px] flex items-center justify-center text-slate-400 hover:text-[#CE82FF] hover:border-purple-200 hover:bg-purple-50 active:border-b-[2px] active:translate-y-[2px] active:scale-95 transition-all opacity-0 group-hover/content:opacity-100 shadow-md"
                    title="Chỉnh sửa nội dung nhóm"
                  >
                    <Edit2 size={20} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>

            {/* ── DANH SÁCH CÂU HỎI TRONG NHÓM ── */}
            <div className="p-5 sm:p-7 space-y-5 bg-[#F8EEFF]">
              <h5 className="text-[13px] font-display font-black text-[#CE82FF] uppercase tracking-widest flex items-center gap-2">
                Câu hỏi phụ
                <span className="bg-white border-2 border-[#eec9ff] text-[#CE82FF] px-2 py-0.5 rounded-[8px]">
                  {subQuestionsCount}
                </span>
              </h5>

              {group.subQuestions?.map((sq, sIdx) => (
                <QuestionItem
                  key={sq.id}
                  question={sq}
                  index={groupIndex + sIdx}
                  onRemove={handleRemoveSubQuestion}
                  onUpdate={(updates) => handleUpdateSubQuestion(sq.id, updates)}
                  hideOptions={false}
                  hideMedia={true}
                />
              ))}

              {/* Form thêm câu hỏi mới */}
              {showAddSubQ && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <AddQuestionForm
                    onAdd={handleAddSubQuestion}
                    onCancel={() => setShowAddSubQ(false)}
                    hideMedia={true}
                  />
                </motion.div>
              )}

              {/* Nút thêm câu hỏi */}
              {!showAddSubQ && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowAddSubQ(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/50 border-2 border-dashed border-[#eec9ff] text-[#CE82FF] rounded-[20px] font-display font-black text-[14px] hover:bg-white hover:border-[#CE82FF] hover:shadow-sm transition-all active:translate-y-[1px] uppercase tracking-wider"
                  >
                    <Plus size={20} strokeWidth={3} /> Thêm 1 câu
                  </button>
                  <button
                    onClick={handleQuickAdd3}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FFFBEA] border-2 border-dashed border-[#FFD8A8] text-[#FF9600] rounded-[20px] font-display font-black text-[14px] hover:bg-[#FFf0B3] hover:border-[#FFC200] hover:shadow-sm transition-all active:translate-y-[1px] uppercase tracking-wider"
                  >
                    <Zap size={20} strokeWidth={3} /> ⚡ Tạo nhanh 3 câu (Part 3, 4)
                  </button>
                </div>
              )}

              {/* ── NÚT LƯU & THU GỌN ── chỉ hiện khi có câu hỏi và không đang mở form thêm */}
              {!showAddSubQ && subQuestionsCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setIsExpanded(false)}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#CE82FF] text-white border-2 border-[#B975E5] border-b-[4px] rounded-[20px] font-display font-black text-[14px] uppercase tracking-wider shadow-md hover:bg-[#B975E5] hover:border-[#A366CC] active:border-b-[2px] active:translate-y-[2px] active:scale-[0.99] transition-all outline-none"
                >
                  <Check size={20} strokeWidth={3} />
                  Lưu & Thu gọn nhóm ({subQuestionsCount} câu)
                </motion.button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
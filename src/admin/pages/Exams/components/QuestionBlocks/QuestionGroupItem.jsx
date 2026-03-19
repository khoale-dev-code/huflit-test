import React, { useState, useCallback } from 'react';
import { 
  Trash2, Layers, Check, Edit2, Music, Plus, Zap, 
  Volume2, BookOpen, ChevronUp, ChevronDown 
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { QuestionItem } from './QuestionItem';
import { AddQuestionForm } from './AddQuestionForm';
import { QuestionImageUploader, QuestionAudioUploader } from './Uploaders';

export const QuestionGroupItem = ({ 
  group, 
  groupIndex, 
  totalGroups,
  onRemoveGroup, 
  onUpdateGroup,
  onMoveUp,    // Hàm di chuyển nhóm lên (truyền từ cha)
  onMoveDown   // Hàm di chuyển nhóm xuống (truyền từ cha)
}) => {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [showAddSubQ, setShowAddSubQ] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const subQuestionsCount = group.subQuestions?.length || 0;

  // ─── LOGIC DI CHUYỂN CÂU HỎI CON (NỘI BỘ NHÓM) ───
  const moveSubQuestion = useCallback((index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= subQuestionsCount) return;

    const newSubQuestions = [...group.subQuestions];
    [newSubQuestions[index], newSubQuestions[newIndex]] = [newSubQuestions[newIndex], newSubQuestions[index]];
    
    onUpdateGroup({ subQuestions: newSubQuestions });
  }, [group.subQuestions, subQuestionsCount, onUpdateGroup]);

  // ─── CÁC HÀM XỬ LÝ CÂU HỎI CON ───
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
      options: ['', '', '', ''],
      correct: 0,
      explanation: '',
      isExample: false
    }));
    onUpdateGroup({ subQuestions: [...(group.subQuestions || []), ...newSubQs] });
  };

  return (
    <div className="bg-[#F8EEFF] border-2 border-[#eec9ff] border-b-[6px] rounded-[32px] overflow-hidden shadow-sm relative group font-nunito selection:bg-[#CE82FF] selection:text-white">
      
      {/* ── HEADER ── */}
      <div
        onClick={() => !isEditingContent && setIsExpanded(!isExpanded)}
        className={`p-5 sm:p-6 bg-white flex items-center justify-between cursor-pointer transition-all ${isExpanded ? 'border-b-2 border-[#eec9ff]' : 'hover:bg-slate-50'}`}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#CE82FF] border-b-[4px] border-[#B975E5] text-white flex items-center justify-center shadow-sm shrink-0">
            <Layers size={24} strokeWidth={3} />
          </div>
          <div>
            <h4 className="text-[17px] font-black text-slate-800 leading-none m-0 uppercase tracking-tight">
              Nhóm Câu Hỏi #{groupIndex + 1}
            </h4>
            <p className="text-[13px] font-bold text-[#B975E5] mt-1.5 flex items-center gap-2">
              <span className="bg-[#F8EEFF] px-2 py-0.5 rounded-lg border border-[#eec9ff]">{subQuestionsCount} câu hỏi con</span>
              <span className="opacity-40">•</span>
              <span>{isExpanded ? 'Nhấn để thu gọn' : 'Nhấn để mở rộng'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Nút Move Up */}
          <button
            onClick={(e) => { e.stopPropagation(); onMoveUp(groupIndex); }}
            disabled={groupIndex === 0}
            className="w-10 h-10 bg-white border-2 border-slate-200 border-b-[4px] rounded-xl flex items-center justify-center text-slate-400 hover:text-[#1CB0F6] hover:border-[#BAE3FB] hover:bg-[#EAF6FE] active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-30 outline-none"
            title="Chuyển nhóm lên"
          >
            <ChevronUp size={22} strokeWidth={3} />
          </button>

          {/* Nút Move Down */}
          <button
            onClick={(e) => { e.stopPropagation(); onMoveDown(groupIndex); }}
            disabled={groupIndex === totalGroups - 1}
            className="w-10 h-10 bg-white border-2 border-slate-200 border-b-[4px] rounded-xl flex items-center justify-center text-slate-400 hover:text-[#1CB0F6] hover:border-[#BAE3FB] hover:bg-[#EAF6FE] active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-30 outline-none"
            title="Chuyển nhóm xuống"
          >
            <ChevronDown size={22} strokeWidth={3} />
          </button>

          <div className="w-px h-8 bg-slate-100 mx-1" />

          {/* Nút Xóa Nhóm */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Xóa nhóm này sẽ mất tất cả câu hỏi nhỏ bên trong?')) onRemoveGroup(group.id);
            }}
            className="w-11 h-11 bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] border-b-[4px] flex items-center justify-center rounded-xl shadow-sm hover:bg-[#FF4B4B] hover:text-white transition-all outline-none active:translate-y-[2px] active:border-b-2"
            title="Xóa nhóm"
          >
            <Trash2 size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* ── NỘI DUNG ── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* PHẦN PASSAGE / TRANSCRIPT */}
            <div className="p-6 sm:p-8 bg-white rounded-b-[32px] border-b-2 border-[#eec9ff]">
              {isEditingContent ? (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <QuestionImageUploader imageUrl={group.imageUrl} imageStoragePath={group.imageStoragePath} onUpdate={(updates) => onUpdateGroup(updates)} />
                    <QuestionAudioUploader audioUrl={group.audioUrl} audioStoragePath={group.audioStoragePath} onUpdate={(updates) => onUpdateGroup(updates)} />
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="text-[12px] font-black text-[#CE82FF] uppercase tracking-widest flex items-center gap-2 mb-2.5">
                        <BookOpen size={16} strokeWidth={3} /> Nội dung bài đọc (Part 6, 7)
                      </label>
                      <textarea
                        value={group.content || ''} onChange={(e) => onUpdateGroup({ content: e.target.value })} rows={4}
                        className="w-full border-2 border-[#eec9ff] rounded-2xl px-5 py-4 text-[15px] font-bold text-slate-800 focus:outline-none focus:border-[#CE82FF] focus:ring-4 focus:ring-purple-500/10 bg-slate-50 transition-all"
                        placeholder="Nhập đoạn văn tại đây..."
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-black text-[#1CB0F6] uppercase tracking-widest flex items-center gap-2 mb-2.5">
                        <Volume2 size={16} strokeWidth={3} /> Transcript hội thoại (Part 3, 4)
                      </label>
                      <textarea
                        value={group.script || ''} onChange={(e) => onUpdateGroup({ script: e.target.value })} rows={3}
                        className="w-full border-2 border-[#BAE3FB] rounded-2xl px-5 py-4 text-[15px] font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-[#EAF6FE]/30 transition-all"
                        placeholder="Nhập lời thoại (ẩn khi làm bài)..."
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditingContent(false)}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#CE82FF] text-white border-b-[4px] border-[#B975E5] rounded-2xl font-black uppercase tracking-widest hover:brightness-105 active:border-b-0 active:translate-y-[4px] transition-all outline-none shadow-sm"
                  >
                    <Check size={20} strokeWidth={3} /> Lưu nội dung nhóm
                  </button>
                </div>
              ) : (
                <div className="relative group/content">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      {group.imageUrl && <img src={group.imageUrl} alt="Group" className="max-h-52 rounded-2xl border-2 border-slate-200 bg-white p-2 object-contain shadow-sm" />}
                      {group.audioUrl && (
                        <div className="flex items-center gap-3 p-3.5 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-2xl shadow-sm self-start">
                          <Music className="w-5 h-5 text-[#1CB0F6]" strokeWidth={3} />
                          <audio src={group.audioUrl} controls className="h-8 w-48" />
                        </div>
                      )}
                    </div>

                    {group.content && (
                      <div className="p-5 bg-slate-50 border-2 border-[#eec9ff] rounded-2xl relative">
                        <div className="flex items-center gap-2 mb-3 text-[#CE82FF] font-black text-[11px] uppercase tracking-widest">
                          <BookOpen size={16} strokeWidth={3} /> Nội dung bài đọc
                        </div>
                        <p className="text-[16px] font-bold text-slate-700 leading-relaxed whitespace-pre-wrap m-0">{group.content}</p>
                      </div>
                    )}

                    {group.script && (
                      <div className="p-5 bg-[#EAF6FE]/40 border-2 border-[#BAE3FB] rounded-2xl italic shadow-inner">
                        <div className="flex items-center gap-2 mb-2 text-[#1CB0F6] font-black text-[11px] uppercase tracking-widest not-italic">
                          <Volume2 size={16} strokeWidth={3} /> Transcript (Lời thoại)
                        </div>
                        <p className="text-[15px] font-bold text-slate-500 leading-relaxed m-0">"{group.script}"</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setIsEditingContent(true)}
                    className="absolute top-0 right-0 w-12 h-12 bg-white border-2 border-slate-200 border-b-[4px] rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#CE82FF] hover:border-[#BAE3FB] transition-all opacity-0 group-hover/content:opacity-100 shadow-md active:translate-y-[2px] active:border-b-2"
                  >
                    <Edit2 size={20} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>

            {/* DANH SÁCH CÂU HỎI CON */}
            <div className="p-6 sm:p-8 space-y-6 bg-[#F8EEFF]">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-[13px] font-black text-[#CE82FF] uppercase tracking-widest flex items-center gap-2.5">
                  Câu hỏi trong nhóm 
                  <span className="bg-white px-3 py-0.5 rounded-full border-2 border-[#eec9ff] text-[#CE82FF] shadow-sm">{subQuestionsCount}</span>
                </h5>
              </div>

              <div className="space-y-6">
                {group.subQuestions?.map((sq, sIdx) => (
                  <Motion.div layout key={sq.id}>
                    <QuestionItem
                      question={sq}
                      index={sIdx}
                      totalQuestions={subQuestionsCount}
                      onRemove={() => handleRemoveSubQuestion(sq.id)}
                      onUpdate={(updates) => handleUpdateSubQuestion(sq.id, updates)}
                      onMoveUp={() => moveSubQuestion(sIdx, -1)}
                      onMoveDown={() => moveSubQuestion(sIdx, 1)}
                      hideMedia={true} // Ẩn uploader lẻ trong nhóm để tránh rối UI
                    />
                  </Motion.div>
                ))}
              </div>

              <AnimatePresence>
                {showAddSubQ && (
                  <Motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="mt-8">
                    <AddQuestionForm onAdd={handleAddSubQuestion} onCancel={() => setShowAddSubQ(false)} hideMedia={true} />
                  </Motion.div>
                )}
              </AnimatePresence>

              {!showAddSubQ && (
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => setShowAddSubQ(true)}
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-white/60 border-2 border-dashed border-[#eec9ff] text-[#CE82FF] rounded-2xl font-black text-[14px] uppercase tracking-widest hover:bg-white hover:border-[#CE82FF] hover:shadow-sm active:translate-y-[2px] transition-all outline-none"
                  >
                    <Plus size={20} strokeWidth={3} /> Thêm câu hỏi
                  </button>
                  <button
                    onClick={handleQuickAdd3}
                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#FFFBEA] border-2 border-dashed border-[#FFD8A8] text-[#FF9600] rounded-2xl font-black text-[14px] uppercase tracking-widest hover:brightness-105 active:translate-y-[2px] transition-all outline-none shadow-sm"
                  >
                    <Zap size={20} strokeWidth={3} /> Tạo nhanh 3 câu
                  </button>
                </div>
              )}

              {!showAddSubQ && subQuestionsCount > 0 && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#CE82FF] text-white border-b-[6px] border-[#B975E5] rounded-2xl font-black text-[15px] uppercase tracking-widest hover:brightness-105 active:border-b-0 active:translate-y-[6px] transition-all outline-none shadow-md mt-6"
                >
                  <Check size={22} strokeWidth={3} /> Hoàn tất & Thu gọn nhóm
                </button>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
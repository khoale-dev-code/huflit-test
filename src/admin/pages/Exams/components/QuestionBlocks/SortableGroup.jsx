import React, { useState, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Trash2, Layers, Check, Edit2, Music, Plus, Zap, 
  Volume2, BookOpen, ChevronUp, ChevronDown, GripVertical,
  Copy, MoreVertical, ChevronRight, ChevronDown as ChevronDownIcon
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { QuestionItem } from './QuestionItem';
import { AddQuestionForm } from './AddQuestionForm';
import { QuestionImageUploader, QuestionAudioUploader } from './Uploaders';

export const SortableGroup = ({ 
  group, 
  groupIndex, 
  totalGroups = 1,
  onRemoveGroup = () => {}, 
  onUpdateGroup = () => {}, 
  onUpdate = () => {}, 
  onRemove = () => {}, 
  onMoveUp = () => {}, 
  onMoveDown = () => {},
  onDuplicateQuestion = () => {}
}) => {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [showAddSubQ, setShowAddSubQ] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: group.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto'
  };

  const subQs = group?.subQuestions || [];
  const subQuestionsCount = subQs.length;

  const safeUpdateGroup = (updates) => {
    onUpdateGroup(updates);
    onUpdate(updates);
  };

  const moveSubQuestion = useCallback((index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= subQuestionsCount) return;

    const newSubQuestions = [...subQs];
    [newSubQuestions[index], newSubQuestions[newIndex]] = [newSubQuestions[newIndex], newSubQuestions[index]];
    
    safeUpdateGroup({ subQuestions: newSubQuestions });
  }, [subQs, subQuestionsCount, safeUpdateGroup]);

  const handleUpdateSubQuestion = (qId, updates) => {
    const updatedSubQuestions = subQs.map(q => q.id === qId ? { ...q, ...updates } : q);
    safeUpdateGroup({ subQuestions: updatedSubQuestions });
  };

  const handleRemoveSubQuestion = (qId) => {
    const updatedSubQuestions = subQs.filter(q => q.id !== qId);
    safeUpdateGroup({ subQuestions: updatedSubQuestions });
  };

  const handleAddSubQuestion = (newQ) => {
    const updatedSubQuestions = [...subQs, { ...newQ, id: `sq_${Date.now()}` }];
    safeUpdateGroup({ subQuestions: updatedSubQuestions });
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
    safeUpdateGroup({ subQuestions: [...subQs, ...newSubQs] });
  };

  const handleDeleteGroup = (e) => {
    e.stopPropagation();
    if (window.confirm('Xóa nhóm này sẽ mất tất cả câu hỏi nhỏ bên trong?')) {
      onRemoveGroup(group.id);
      onRemove(group.id);
    }
  };

  const handleDuplicateQuestion = (qId) => {
    onDuplicateQuestion(qId, group.id);
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`bg-[#F8EEFF] border-2 border-[#eec9ff] border-b-[6px] rounded-[32px] overflow-visible shadow-sm relative group font-nunito selection:bg-[#CE82FF] selection:text-white transition-all duration-200 ${isDragging ? 'ring-4 ring-[#CE82FF]/30 shadow-2xl scale-[1.02]' : ''}`}
    >
      {/* ── HEADER ── */}
      <div
        onClick={() => !isEditingContent && setIsExpanded(!isExpanded)}
        className={`p-4 sm:p-5 bg-white flex items-center justify-between cursor-pointer transition-all ${isExpanded ? 'border-b-2 border-[#eec9ff]' : 'hover:bg-slate-50'}`}
      >
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <div 
            className="w-11 h-11 min-w-[44px] rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-500 cursor-grab active:cursor-grabbing hover:bg-[#EAF6FE] hover:border-[#BAE3FB] hover:text-[#1CB0F6] shrink-0 transition-colors"
            title="Kéo để di chuyển"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={22} strokeWidth={3} />
          </div>
          
          <div className="w-12 h-12 rounded-2xl bg-[#CE82FF] border-b-[4px] border-[#B975E5] text-white flex items-center justify-center shadow-sm shrink-0">
            <Layers size={24} strokeWidth={3} />
          </div>
          <div>
            <h4 className="text-[15px] font-black text-slate-800 leading-none m-0 uppercase tracking-tight">
              Nhóm Câu Hỏi #{groupIndex + 1}
            </h4>
            <p className="text-[12px] font-bold text-[#B975E5] mt-1 flex items-center gap-2">
              <span className="bg-[#F8EEFF] px-2 py-0.5 rounded-lg border border-[#eec9ff]">{subQuestionsCount} câu</span>
              <span className="opacity-40">•</span>
              <span className="hidden sm:inline">{isExpanded ? 'Thu gọn' : 'Mở rộng'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Expand/Collapse Icon */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="w-11 h-11 min-w-[44px] rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#EAF6FE] hover:border-[#BAE3FB] hover:text-[#1CB0F6] transition-all cursor-pointer"
            title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            {isExpanded ? <ChevronDownIcon size={22} strokeWidth={3} /> : <ChevronRight size={22} strokeWidth={3} />}
          </button>

          {/* Nút Move Up */}
          <button
            onClick={(e) => { e.stopPropagation(); onMoveUp(groupIndex); }}
            disabled={groupIndex === 0}
            className="w-11 h-11 min-w-[44px] bg-white border-2 border-slate-200 border-b-[4px] rounded-xl flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-[#BAE3FB] hover:bg-[#EAF6FE] active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-30 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-[#1CB0F6] focus:ring-offset-2"
            title="Chuyển lên"
          >
            <ChevronUp size={22} strokeWidth={3} />
          </button>

          {/* Nút Move Down */}
          <button
            onClick={(e) => { e.stopPropagation(); onMoveDown(groupIndex); }}
            disabled={groupIndex === totalGroups - 1}
            className="w-11 h-11 min-w-[44px] bg-white border-2 border-slate-200 border-b-[4px] rounded-xl flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-[#BAE3FB] hover:bg-[#EAF6FE] active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-30 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-[#1CB0F6] focus:ring-offset-2"
            title="Chuyển xuống"
          >
            <ChevronDown size={22} strokeWidth={3} />
          </button>

          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
              className="w-11 h-11 min-w-[44px] bg-white border-2 border-slate-200 border-b-[4px] rounded-xl flex items-center justify-center text-slate-500 hover:text-[#CE82FF] hover:border-[#BAE3FB] hover:bg-[#F8EEFF] active:border-b-2 active:translate-y-[2px] transition-all outline-none focus:ring-2 focus:ring-[#CE82FF] focus:ring-offset-2"
              title="Tùy chọn"
            >
              <MoreVertical size={22} strokeWidth={3} />
            </button>
            
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border-2 border-slate-200 rounded-xl shadow-xl z-50 py-1 min-w-[160px]">
                  <button
                    onClick={() => { setShowMenu(false); setIsEditingContent(true); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-100 text-sm font-bold"
                  >
                    <Edit2 size={16} /> Chỉnh sửa nội dung
                  </button>
                  <button
                    onClick={() => { setShowMenu(false); setIsExpanded(!isExpanded); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-100 text-sm font-bold"
                  >
                    {isExpanded ? <ChevronRight size={16} /> : <ChevronDownIcon size={16} />} {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                  </button>
                  <hr className="my-1 border-slate-200" />
                  <button
                    onClick={handleDeleteGroup}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-500 hover:bg-red-50 text-sm font-bold"
                  >
                    <Trash2 size={16} /> Xóa nhóm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── NỘI DUNG ── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {/* PHẦN PASSAGE / TRANSCRIPT */}
            <div className="p-5 sm:p-6 bg-white rounded-b-[32px] border-b-2 border-[#eec9ff]">
              {isEditingContent ? (
                <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <QuestionImageUploader imageUrl={group.imageUrl} imageStoragePath={group.imageStoragePath} onUpdate={(updates) => safeUpdateGroup(updates)} />
                    <QuestionAudioUploader audioUrl={group.audioUrl} audioStoragePath={group.audioStoragePath} onUpdate={(updates) => safeUpdateGroup(updates)} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-black text-[#CE82FF] uppercase tracking-widest flex items-center gap-2 mb-2">
                        <BookOpen size={14} strokeWidth={3} /> Nội dung bài đọc
                      </label>
                      <textarea
                        value={group.content || ''} onChange={(e) => safeUpdateGroup({ content: e.target.value })} rows={3}
                        className="w-full border-2 border-[#eec9ff] rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 focus:outline-none focus:border-[#CE82FF] focus:ring-2 focus:ring-purple-500/10 bg-slate-50 transition-all"
                        placeholder="Nhập đoạn văn..."
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black text-[#1CB0F6] uppercase tracking-widest flex items-center gap-2 mb-2">
                        <Volume2 size={14} strokeWidth={3} /> Transcript
                      </label>
                      <textarea
                        value={group.script || ''} onChange={(e) => safeUpdateGroup({ script: e.target.value })} rows={2}
                        className="w-full border-2 border-[#BAE3FB] rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-2 focus:ring-blue-500/10 bg-[#EAF6FE]/30 transition-all"
                        placeholder="Nhập lời thoại..."
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditingContent(false)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#CE82FF] text-white border-b-[4px] border-[#B975E5] rounded-xl font-black text-[13px] uppercase tracking-wider hover:brightness-105 active:border-b-0 active:translate-y-[2px] transition-all outline-none"
                  >
                    <Check size={18} strokeWidth={3} /> Lưu
                  </button>
                </div>
              ) : (
                <div className="relative group/content">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      {group.imageUrl && <img src={group.imageUrl} alt="Group" className="max-h-40 rounded-xl border-2 border-slate-200 bg-white p-1.5 object-contain shadow-sm" />}
                      {group.audioUrl && (
                        <div className="flex items-center gap-2 p-2.5 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-xl shadow-sm self-start">
                          <Music className="w-4 h-4 text-[#1CB0F6]" strokeWidth={3} />
                          <audio src={group.audioUrl} controls className="h-7 w-40" />
                        </div>
                      )}
                    </div>

                    {group.content && (
                      <div className="p-4 bg-slate-50 border-2 border-[#eec9ff] rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-[#CE82FF] font-black text-[10px] uppercase tracking-widest">
                          <BookOpen size={14} strokeWidth={3} /> Nội dung
                        </div>
                        <p className="text-[14px] font-bold text-slate-700 leading-relaxed whitespace-pre-wrap m-0">{group.content}</p>
                      </div>
                    )}

                    {group.script && (
                      <div className="p-4 bg-[#EAF6FE]/40 border-2 border-[#BAE3FB] rounded-xl italic">
                        <div className="flex items-center gap-2 mb-1 text-[#1CB0F6] font-black text-[10px] uppercase tracking-widest not-italic">
                          <Volume2 size={14} strokeWidth={3} /> Transcript
                        </div>
                        <p className="text-[13px] font-bold text-slate-500 leading-relaxed m-0">"{group.script}"</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setIsEditingContent(true)}
                    className="absolute top-0 right-0 w-9 h-9 bg-white border-2 border-slate-200 border-b-[3px] rounded-lg flex items-center justify-center text-slate-400 hover:text-[#CE82FF] hover:border-[#BAE3FB] transition-all opacity-0 group-hover/content:opacity-100 shadow-md active:translate-y-[1px] active:border-b-2"
                  >
                    <Edit2 size={16} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>

            {/* DANH SÁCH CÂU HỎI CON */}
            <div className="p-5 sm:p-6 space-y-4 bg-[#F8EEFF]">
              <div className="flex items-center justify-between">
                <h5 className="text-[12px] font-black text-[#CE82FF] uppercase tracking-widest flex items-center gap-2">
                  Câu hỏi 
                  <span className="bg-white px-2 py-0.5 rounded-full border border-[#eec9ff] text-[#CE82FF] text-[11px]">{subQuestionsCount}</span>
                </h5>
              </div>

              <div className="space-y-3">
                {subQs.map((sq, sIdx) => (
                  <Motion.div layout key={sq.id || sIdx} transition={{ duration: 0.2 }}>
                    <QuestionItem
                      question={sq}
                      index={sIdx}
                      totalQuestions={subQuestionsCount}
                      onRemove={() => handleRemoveSubQuestion(sq.id)}
                      onUpdate={(updates) => handleUpdateSubQuestion(sq.id, updates)}
                      onMoveUp={() => moveSubQuestion(sIdx, -1)}
                      onMoveDown={() => moveSubQuestion(sIdx, 1)}
                      onDuplicate={() => handleDuplicateQuestion(sq.id)}
                      hideMedia={true}
                    />
                  </Motion.div>
                ))}
              </div>

              <AnimatePresence>
                {showAddSubQ && (
                  <Motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <AddQuestionForm onAdd={handleAddSubQuestion} onCancel={() => setShowAddSubQ(false)} hideMedia={true} />
                  </Motion.div>
                )}
              </AnimatePresence>

              {!showAddSubQ && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowAddSubQ(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/60 border-2 border-dashed border-[#eec9ff] text-[#CE82FF] rounded-xl font-black text-[12px] uppercase tracking-wider hover:bg-white hover:border-[#CE82FF] active:translate-y-[1px] transition-all outline-none"
                  >
                    <Plus size={16} strokeWidth={3} /> Thêm câu
                  </button>
                  <button
                    onClick={handleQuickAdd3}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FFFBEA] border-2 border-dashed border-[#FFD8A8] text-[#FF9600] rounded-xl font-black text-[12px] uppercase tracking-wider hover:brightness-105 active:translate-y-[1px] transition-all outline-none"
                  >
                    <Zap size={16} strokeWidth={3} /> Tạo nhanh 3 câu
                  </button>
                </div>
              )}

              {!showAddSubQ && subQuestionsCount > 0 && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#CE82FF] text-white border-b-[4px] border-[#B975E5] rounded-xl font-black text-[13px] uppercase tracking-wider hover:brightness-105 active:border-b-0 active:translate-y-[2px] transition-all outline-none shadow-sm mt-2"
                >
                  <Check size={18} strokeWidth={3} /> Hoàn tất
                </button>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortableGroup;

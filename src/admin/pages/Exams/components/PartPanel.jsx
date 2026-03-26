// src/admin/pages/Exams/components/PartPanel.jsx
import React, { useState } from 'react';
import {
  ChevronDown, ChevronRight, Headphones, BookOpen,
  Plus, PenTool, Mic, Layers, FileText, Search, Upload
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { 
  AddQuestionForm, 
  QuestionGroupItem, 
  AddQuestionGroupForm,
  SortableGroup 
} from './QuestionBlocks';
import QuestionStatistics from './QuestionStatistics';

// ─── Cấu hình linh hoạt cho từng loại Part (Gamified Theme) ────────
const TYPE_CONFIG = {
  listening: { 
    icon: Headphones, color: 'text-[#1CB0F6]', bg: 'bg-[#EAF6FE]', badge: 'bg-[#1CB0F6] text-white border-[#1899D6]', 
    label: 'LISTENING', textLabel: 'Có Script'
  },
  reading: { 
    icon: BookOpen, color: 'text-[#58CC02]', bg: 'bg-[#f1faeb]', badge: 'bg-[#58CC02] text-white border-[#46A302]', 
    label: 'READING', textLabel: 'Có Bài đọc' 
  },
  writing: { 
    icon: PenTool, color: 'text-[#FF9600]', bg: 'bg-[#FFFBEA]', badge: 'bg-[#FF9600] text-white border-[#E58700]', 
    label: 'WRITING', textLabel: 'Có Đề bài'
  },
  speaking: { 
    icon: Mic, color: 'text-[#CE82FF]', bg: 'bg-[#F8EEFF]', badge: 'bg-[#CE82FF] text-white border-[#B975E5]', 
    label: 'SPEAKING', textLabel: 'Có Chủ đề'
  },
};

// ─── PartPanel ──────────────────────────────────────────────────────────
const PartPanel = ({
  partId, 
  part, 
  isExpanded, 
  onToggle = () => {}, 
  onUpdatePart = () => {}, 
  onAddQuestion = () => {}, 
  onRemoveQuestion = () => {}, 
  onUpdateQuestion = () => {},
  onMoveUp = () => {},
  onMoveDown = () => {},
  onReorder = () => {}
}) => {
  const [showAddSingle, setShowAddSingle] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // DND Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Bảo vệ fallback nếu part.type bị undefined
  const config = TYPE_CONFIG[part?.type] || TYPE_CONFIG.reading;
  const hasTextContent = !!(part?.script || part?.content);
  
  // Lọc câu hỏi theo search
  const allQuestions = part?.questions || [];
  const groupQuestions = allQuestions.filter(q => q.type === 'group');
  const filteredGroups = searchQuery 
    ? groupQuestions.filter(g => 
        (g.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.script || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.subQuestions || []).some(sq => 
          (sq.question || '').toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : groupQuestions;

  // Tính tổng số câu hỏi thật (bỏ qua câu ví dụ)
  const qCount = part?.questions?.reduce((total, q) => {
    if (q.type === 'group') {
      const validSubQs = q.subQuestions?.filter(sq => !sq.isExample) || [];
      return total + validSubQs.length;
    }
    if (!q.isExample) return total + 1;
    return total;
  }, 0) ?? 0;

  const Icon = config.icon;

  // Handle drag start
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const oldIndex = groupQuestions.findIndex(q => q.id === active.id);
    const newIndex = groupQuestions.findIndex(q => q.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      onReorder(partId, oldIndex, newIndex);
    }
  };

  // Handle drag cancel
  const handleDragCancel = () => {
    setActiveId(null);
  };

  // Get active group for overlay
  const getActiveGroup = () => {
    if (!activeId) return null;
    return allQuestions.find(q => q.id === activeId);
  };

  return (
    <div className={`transition-all font-sans ${isExpanded ? '' : 'hover:opacity-90'}`} style={{ fontFamily: '"Nunito", "Quicksand", sans-serif', position: 'relative', zIndex: 1 }}>
      
      {/* ── HEADER BAR ── */}
      <div className={`relative rounded-[20px] overflow-visible ${isExpanded ? 'bg-slate-50/50' : 'bg-white'}`}>
        <div className="w-full flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 p-4 cursor-pointer" onClick={onToggle}>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 border-b-[3px] shadow-sm ${config.bg} ${config.badge.split(' ')[2]}`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} strokeWidth={2.5} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-[16px] sm:text-[18px] font-nunito font-black text-slate-800 truncate">
                {part?.title || 'Phần thi chưa có tên'}
              </p>
              <span className={`text-[10px] font-nunito font-black px-2.5 py-0.5 rounded-[8px] uppercase tracking-widest flex-shrink-0 border-b-[2px] ${config.badge}`}>
                {config.label}
              </span>
            </div>
            
            {/* Nhãn Tag linh hoạt */}
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <span className="text-[11px] sm:text-[12px] font-nunito font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-[6px]">
                {qCount} câu hỏi
              </span>
              {part?.audioUrl && (
                <span className="text-[11px] sm:text-[12px] font-nunito font-bold bg-[#EAF6FE] text-[#1CB0F6] px-2 py-0.5 rounded-[6px] flex items-center gap-1">
                  <Headphones size={12} /> Audio
                </span>
              )}
              {hasTextContent && (
                <span className="text-[11px] sm:text-[12px] font-nunito font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-[6px] flex items-center gap-1">
                  <FileText size={12} /> {config.textLabel}
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className="w-11 h-11 min-w-[44px] rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#EAF6FE] hover:text-[#1CB0F6] transition-all shrink-0 relative z-10"
            title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            {isExpanded ? <ChevronDown className="w-6 h-6" strokeWidth={3} /> : <ChevronRight className="w-6 h-6" strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* ── EXPANDABLE BODY ── */}
      {isExpanded && (
        <div className="p-4 sm:p-6 border-t-2 border-slate-100 space-y-6 sm:space-y-8 bg-white rounded-b-[20px]">
          
          {/* Quick Edit: Title & Instruction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="text-[12px] font-nunito font-black text-slate-400 uppercase tracking-widest block mb-2">Tiêu đề phần thi</label>
              <input 
                value={part?.title ?? ''} 
                onChange={e => onUpdatePart(partId, { title: e.target.value })} 
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-4 py-3.5 text-[14px] font-nunito font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all placeholder:text-slate-400" 
                placeholder="VD: PART 1: Photographs" 
              />
            </div>
            <div>
              <label className="text-[12px] font-nunito font-black text-slate-400 uppercase tracking-widest block mb-2">Hướng dẫn nhanh</label>
              <input 
                value={part?.instruction ?? part?.description ?? ''} 
                onChange={e => onUpdatePart(partId, { instruction: e.target.value })} 
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-4 py-3.5 text-[14px] font-nunito font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all placeholder:text-slate-400" 
                placeholder="VD: Chọn câu mô tả đúng nhất..." 
              />
            </div>
          </div>

          {/* Search and Import */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={2.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm câu hỏi..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-[14px] font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] bg-white"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] rounded-xl font-black text-[13px] uppercase tracking-wider hover:bg-[#1CB0F6] hover:text-white transition-all">
              <Upload size={16} strokeWidth={3} /> Import
            </button>
          </div>

          {/* Statistics */}
          <QuestionStatistics questions={allQuestions} />

          {/* Khối Quản lý Câu hỏi */}
          <div className="pt-6 border-t-2 border-slate-100">
            <h4 className="text-[15px] font-nunito font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
              Danh sách Câu hỏi <span className="bg-[#1CB0F6] text-white px-2 py-0.5 rounded-[8px] text-[12px] border-b-[2px] border-[#1899D6]">{qCount}</span>
            </h4>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext
                items={filteredGroups.map(g => g.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {filteredGroups.map((q) => {
                    const groupCount = filteredGroups.length;
                    const groupIdx = filteredGroups.findIndex(gq => gq.id === q.id);

                    return (
                      <SortableGroup
                        key={q.id} 
                        group={q} 
                        groupIndex={groupIdx}
                        totalGroups={groupCount}
                        partId={partId}
                        onMoveUp={() => onMoveUp(partId, groupIdx, groupIdx - 1)}
                        onMoveDown={() => onMoveDown(partId, groupIdx, groupIdx + 1)}
                        onRemove={() => onRemoveQuestion(partId, q.id)}
                        onUpdate={(updates) => onUpdateQuestion(partId, q.id, updates)}
                        onRemoveGroup={() => onRemoveQuestion(partId, q.id)}
                        onUpdateGroup={(updates) => onUpdateQuestion(partId, q.id, updates)}
                      />
                    );
                  })}
                </div>
              </SortableContext>

              <DragOverlay adjustScale={false} zIndex={100}>
                {activeId ? (
                  <div className="opacity-90">
                    <QuestionGroupItem
                      group={getActiveGroup()}
                      groupIndex={0}
                      totalGroups={1}
                      onMoveUp={() => {}}
                      onMoveDown={() => {}}
                      onReorder={() => {}}
                      onRemove={() => {}}
                      onUpdate={() => {}}
                      onRemoveGroup={() => {}}
                      onUpdateGroup={() => {}}
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>

            {/* Form Thêm Câu Hỏi Mới */}
            {showAddSingle && (
              <AddQuestionForm 
                onAdd={(q) => { 
                  onAddQuestion(partId, { ...q, type: 'single' }); 
                  setShowAddSingle(false); 
                }} 
                onCancel={() => setShowAddSingle(false)} 
              />
            )}
            {showAddGroup && (
              <AddQuestionGroupForm 
                onAdd={(g) => { 
                  onAddQuestion(partId, { ...g, type: 'group' }); 
                  setShowAddGroup(false); 
                }} 
                onCancel={() => setShowAddGroup(false)} 
              />
            )}

            {/* Nút Thêm */}
            {!showAddSingle && !showAddGroup && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <button 
                  onClick={() => setShowAddSingle(true)} 
                  className="flex flex-col items-center justify-center gap-3 p-6 min-h-[100px] bg-white border-2 border-dashed border-slate-300 rounded-[20px] hover:border-[#1CB0F6] hover:bg-[#EAF6FE] transition-all group shadow-sm outline-none focus:ring-2 focus:ring-[#1CB0F6] focus:ring-offset-2"
                >
                  <div className="w-14 h-14 rounded-[16px] bg-white border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-500 group-hover:text-[#1CB0F6] group-hover:border-[#1899D6] transition-colors"><Plus className="w-7 h-7" strokeWidth={3} /></div>
                  <div className="text-center">
                    <span className="block text-[14px] font-nunito font-black uppercase tracking-wider text-slate-600 group-hover:text-[#1CB0F6]">Thêm Câu Hỏi Đơn</span>
                    <span className="block text-[12px] font-nunito font-bold text-slate-400 mt-1">(Trắc nghiệm, Điền từ)</span>
                  </div>
                </button>
                <button 
                  onClick={() => setShowAddGroup(true)} 
                  className="flex flex-col items-center justify-center gap-3 p-6 min-h-[100px] bg-white border-2 border-dashed border-slate-300 rounded-[20px] hover:border-[#CE82FF] hover:bg-[#F8EEFF] transition-all group shadow-sm outline-none focus:ring-2 focus:ring-[#CE82FF] focus:ring-offset-2"
                >
                  <div className="w-14 h-14 rounded-[16px] bg-white border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-500 group-hover:text-[#CE82FF] group-hover:border-[#B975E5] transition-colors"><Layers className="w-7 h-7" strokeWidth={3} /></div>
                  <div className="text-center">
                    <span className="block text-[14px] font-nunito font-black uppercase tracking-wider text-slate-600 group-hover:text-[#CE82FF]">Thêm Nhóm Câu Hỏi</span>
                    <span className="block text-[12px] font-nunito font-bold text-slate-400 mt-1">(Đoạn văn / Hội thoại chung)</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartPanel;

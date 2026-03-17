// src/admin/pages/Exams/components/PartPanel.jsx
import React, { useState } from 'react';
import {
  ChevronDown, ChevronRight, Headphones, BookOpen,
  Plus, PenTool, Mic, Layers, FileText
} from 'lucide-react';

// Import ĐÚNG CHUẨN từ file QuestionItem.jsx (File này đã chứa sẵn logic 3 đáp án ABC)
import { 
  QuestionItem, 
  AddQuestionForm, 
  QuestionGroupItem, 
  AddQuestionGroupForm 
} from './QuestionBlocks';

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

// ─── PartPanel (GỌN GÀNG, TẬP TRUNG QUẢN LÝ CÂU HỎI) ────────────────
const PartPanel = ({
  partId, part, isExpanded, onToggle, onUpdatePart, onAddQuestion, onRemoveQuestion, onUpdateQuestion
}) => {
  const [showAddSingle, setShowAddSingle] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);

  const config = TYPE_CONFIG[part.type] || TYPE_CONFIG.reading;
  const hasTextContent = !!(part.script || part.content);
  
  // Tính tổng số câu hỏi thật (bỏ qua câu ví dụ)
  const qCount = part.questions?.reduce((total, q) => {
    if (q.type === 'group') {
      const validSubQs = q.subQuestions?.filter(sq => !sq.isExample) || [];
      return total + validSubQs.length;
    }
    if (!q.isExample) return total + 1;
    return total;
  }, 0) ?? 0;

  const Icon = config.icon;
  let currentValidIndex = 0; // Biến đếm để đánh số thứ tự trong lúc render

  return (
    <div className={`transition-all font-sans ${isExpanded ? '' : 'hover:opacity-90'}`} style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* ── HEADER BAR ── */}
      <div className="relative">
        <button onClick={onToggle} className={`w-full flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 p-4 text-left transition-colors outline-none rounded-[20px] ${isExpanded ? 'bg-slate-50/50 rounded-b-none' : 'bg-white'}`}>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 border-b-[3px] shadow-sm ${config.bg} ${config.badge.split(' ')[2]}`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} strokeWidth={2.5} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-[16px] sm:text-[18px] font-display font-black text-slate-800 truncate">
                {part.title || 'Phần thi chưa có tên'}
              </p>
              <span className={`text-[10px] font-display font-black px-2.5 py-0.5 rounded-[8px] uppercase tracking-widest flex-shrink-0 border-b-[2px] ${config.badge}`}>
                {config.label}
              </span>
            </div>
            
            {/* Nhãn Tag linh hoạt */}
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <span className="text-[11px] sm:text-[12px] font-body font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-[6px]">
                {qCount} câu hỏi
              </span>
              {part.audioUrl && (
                <span className="text-[11px] sm:text-[12px] font-body font-bold bg-[#EAF6FE] text-[#1CB0F6] px-2 py-0.5 rounded-[6px] flex items-center gap-1">
                  <Headphones size={12} /> Audio
                </span>
              )}
              {hasTextContent && (
                <span className="text-[11px] sm:text-[12px] font-body font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-[6px] flex items-center gap-1">
                  <FileText size={12} /> {config.textLabel}
                </span>
              )}
            </div>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
            {isExpanded ? <ChevronDown className="w-5 h-5" strokeWidth={3} /> : <ChevronRight className="w-5 h-5" strokeWidth={3} />}
          </div>
        </button>
      </div>

      {/* ── EXPANDABLE BODY ── */}
      {isExpanded && (
        <div className="p-4 sm:p-6 border-t-2 border-slate-100 space-y-6 sm:space-y-8 bg-white rounded-b-[20px]">
          
          {/* Quick Edit: Title & Instruction (Vẫn giữ lại để sửa nhanh cho tiện) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="text-[12px] font-display font-black text-slate-400 uppercase tracking-widest block mb-2">Tiêu đề phần thi</label>
              <input 
                value={part.title ?? ''} 
                onChange={e => onUpdatePart(partId, { title: e.target.value })} 
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-4 py-3.5 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all placeholder:text-slate-400" 
                placeholder="VD: PART 1: Photographs" 
              />
            </div>
            <div>
              <label className="text-[12px] font-display font-black text-slate-400 uppercase tracking-widest block mb-2">Hướng dẫn nhanh</label>
              <input 
                value={part.instruction ?? part.description ?? ''} 
                onChange={e => onUpdatePart(partId, { instruction: e.target.value })} 
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-4 py-3.5 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all placeholder:text-slate-400" 
                placeholder="VD: Chọn câu mô tả đúng nhất..." 
              />
            </div>
          </div>

          {/* Khối Quản lý Câu hỏi */}
          <div className="pt-6 border-t-2 border-slate-100">
            <h4 className="text-[15px] font-display font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
              Danh sách Câu hỏi <span className="bg-[#1CB0F6] text-white px-2 py-0.5 rounded-[8px] text-[12px] border-b-[2px] border-[#1899D6]">{qCount}</span>
            </h4>

            <div className="space-y-6">
              {(part.questions ?? []).map((q) => {
                if (q.type === 'group') {
                  const startIdx = currentValidIndex;
                  const validInGroup = q.subQuestions?.filter(sq => !sq.isExample).length || 0;
                  currentValidIndex += validInGroup;

                  return (
                    <QuestionGroupItem
                      key={q.id} group={q} 
                      groupIndex={startIdx}
                      partId={partId}
                      onRemoveGroup={(gid) => onRemoveQuestion(partId, gid)}
                      onUpdateGroup={(updates) => onUpdateQuestion && onUpdateQuestion(partId, q.id, updates)}
                    />
                  );
                }
                
                const showIdx = q.isExample ? -1 : currentValidIndex;
                if (!q.isExample) currentValidIndex++;

                return (
                  <QuestionItem
                    key={q.id} question={q} 
                    index={showIdx}
                    onRemove={qid => onRemoveQuestion(partId, qid)}
                    onUpdate={updates => onUpdateQuestion && onUpdateQuestion(partId, q.id, updates)} 
                  />
                );
              })}

              {/* Form Thêm Câu Hỏi Mới */}
              {showAddSingle && <AddQuestionForm onAdd={q => { onAddQuestion(partId, { ...q, type: 'single' }); setShowAddSingle(false); }} onCancel={() => setShowAddSingle(false)} />}
              {showAddGroup && <AddQuestionGroupForm onAdd={g => { onAddQuestion(partId, { ...g, type: 'group' }); setShowAddGroup(false); }} onCancel={() => setShowAddGroup(false)} />}

              {/* Nút Thêm */}
              {!showAddSingle && !showAddGroup && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <button onClick={() => setShowAddSingle(true)} className="flex flex-col items-center justify-center gap-3 p-6 bg-white border-2 border-dashed border-slate-300 rounded-[20px] hover:border-[#1CB0F6] hover:bg-[#EAF6FE] transition-all group shadow-sm outline-none">
                    <div className="w-12 h-12 rounded-[14px] bg-white border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-400 group-hover:text-[#1CB0F6] group-hover:border-[#1899D6] transition-colors"><Plus className="w-6 h-6" strokeWidth={3} /></div>
                    <div className="text-center">
                      <span className="block text-[14px] font-display font-black uppercase tracking-wider text-slate-600 group-hover:text-[#1CB0F6]">Thêm Câu Hỏi Đơn</span>
                      <span className="block text-[12px] font-body font-bold text-slate-400 mt-1">(Trắc nghiệm, Điền từ)</span>
                    </div>
                  </button>
                  <button onClick={() => setShowAddGroup(true)} className="flex flex-col items-center justify-center gap-3 p-6 bg-white border-2 border-dashed border-slate-300 rounded-[20px] hover:border-[#CE82FF] hover:bg-[#F8EEFF] transition-all group shadow-sm outline-none">
                    <div className="w-12 h-12 rounded-[14px] bg-white border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-400 group-hover:text-[#CE82FF] group-hover:border-[#B975E5] transition-colors"><Layers className="w-6 h-6" strokeWidth={3} /></div>
                    <div className="text-center">
                      <span className="block text-[14px] font-display font-black uppercase tracking-wider text-slate-600 group-hover:text-[#CE82FF]">Thêm Nhóm Câu Hỏi</span>
                      <span className="block text-[12px] font-body font-bold text-slate-400 mt-1">(Đoạn văn / Hội thoại chung)</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartPanel;
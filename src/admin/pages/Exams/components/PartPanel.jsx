// src/admin/pages/Exams/components/PartPanel.jsx
import React, { useState, useRef } from 'react';
import {
  ChevronDown, ChevronRight, Headphones, BookOpen,
  Music, Upload, Trash2, Plus, PenTool, Mic, Image as ImageIcon,
  Loader2, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage, deleteImage } from '../../../services/examService';

import { 
  QuestionItem, 
  AddQuestionForm, 
  QuestionGroupItem, 
  AddQuestionGroupForm 
} from './QuestionItem';

// ─── Cấu hình linh hoạt cho từng loại Part (Gamified Theme) ────────
const TYPE_CONFIG = {
  listening: { 
    icon: Headphones, color: 'text-[#1CB0F6]', bg: 'bg-[#EAF6FE]', badge: 'bg-[#1CB0F6] text-white border-[#1899D6]', 
    label: 'LISTENING', textLabel: 'Script / Transcript (Tùy chọn)', hasAudio: true, hasText: true 
  },
  reading: { 
    icon: BookOpen, color: 'text-[#58CC02]', bg: 'bg-[#f1faeb]', badge: 'bg-[#58CC02] text-white border-[#46A302]', 
    label: 'READING', textLabel: 'Nội dung bài đọc / Email / Đoạn văn', hasAudio: false, hasText: true 
  },
  writing: { 
    icon: PenTool, color: 'text-[#FF9600]', bg: 'bg-[#FFFBEA]', badge: 'bg-[#FF9600] text-white border-[#E58700]', 
    label: 'WRITING', textLabel: 'Đề bài (Writing Prompt)', hasAudio: false, hasText: true 
  },
  speaking: { 
    icon: Mic, color: 'text-[#CE82FF]', bg: 'bg-[#F8EEFF]', badge: 'bg-[#CE82FF] text-white border-[#B975E5]', 
    label: 'SPEAKING', textLabel: 'Đề bài / Script (Speaking Prompt)', hasAudio: true, hasText: true 
  },
};

// ─── AudioUploader & ImageUploader (Giữ nguyên như cũ) ──────────────
const AudioUploader = ({ part, partId, onUpload, onDelete, progress }) => {
  const fileRef = useRef();
  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUpload(partId, file);
    e.target.value = '';
  };
  if (part.audioUrl) {
    return (
      <div className="border-2 border-slate-200 border-b-[4px] rounded-[20px] p-4 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white border-2 border-[#BAE3FB] border-b-[3px] rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Music className="w-6 h-6 text-[#1CB0F6]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[14px] font-display font-black text-slate-800 truncate max-w-[200px] sm:max-w-[300px] leading-tight">{part.audioName || 'File_Am_Thanh.mp3'}</p>
            <p className="text-[12px] text-[#58CC02] font-body font-bold mt-1 tracking-wide">✓ Đã tải lên thành công</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => fileRef.current?.click()} className="flex-1 sm:flex-none text-[12px] font-display font-black uppercase tracking-wider text-slate-500 bg-white border-2 border-slate-200 border-b-[4px] px-4 py-2.5 rounded-[14px] hover:bg-slate-50 active:border-b-2 active:translate-y-[1px] transition-all outline-none">Đổi file</button>
          <button onClick={() => onDelete(partId, part.audioStoragePath)} className="w-11 h-11 flex justify-center items-center text-[#FF4B4B] bg-white border-2 border-[#ffc1c1] border-b-[3px] rounded-[14px] hover:bg-[#fff0f0] active:border-b-2 active:translate-y-[1px] transition-all outline-none"><Trash2 className="w-5 h-5" strokeWidth={2.5} /></button>
        </div>
        <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={handleChange} />
      </div>
    );
  }
  return (
    <>
      <div onClick={() => progress === undefined && fileRef.current?.click()} className={`border-2 border-dashed border-slate-300 rounded-[20px] p-6 flex flex-col items-center justify-center text-center hover:border-[#1CB0F6] hover:bg-[#EAF6FE] transition-all cursor-pointer min-h-[140px] group ${progress !== undefined ? 'pointer-events-none opacity-80' : ''}`}>
        {progress !== undefined ? (
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-[13px] text-slate-700 font-display font-black mb-2 uppercase tracking-wider"><span>Đang xử lý...</span><span className="text-[#1CB0F6]">{progress}%</span></div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-[2px] shadow-inner"><div className="h-full bg-[#1CB0F6] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-white border-2 border-slate-200 border-b-[4px] rounded-[14px] flex items-center justify-center mb-3 shadow-sm group-hover:border-[#1899D6] group-hover:text-[#1CB0F6] transition-colors"><Upload className="w-6 h-6 text-slate-400 group-hover:text-[#1CB0F6]" strokeWidth={2.5} /></div>
            <p className="text-[14px] font-display font-black text-slate-600">Nhấn để tải file <span className="text-[#1CB0F6]">Audio</span> lên</p>
            <p className="text-[11px] font-body font-bold text-slate-400 mt-1 uppercase tracking-widest">Hỗ trợ MP3, WAV (Max 50MB)</p>
          </>
        )}
      </div>
      <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={handleChange} />
    </>
  );
};

const ImageUploader = ({ imageUrl, imageStoragePath, onUpdate, prefixId }) => {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file, 'new', prefixId);
      onUpdate({ imageUrl: result.url, imageStoragePath: result.path });
    } catch (err) { alert("Upload ảnh thất bại!"); } finally { setUploading(false); e.target.value = ''; }
  };
  const handleDelete = async () => { if (imageStoragePath) await deleteImage(imageStoragePath); onUpdate({ imageUrl: '', imageStoragePath: '' }); };
  if (imageUrl) {
    return (
      <div className="relative w-full sm:w-1/2 group rounded-[20px] border-2 border-slate-200 border-b-[4px] overflow-hidden bg-slate-50 p-1 shadow-sm">
        <img src={imageUrl} alt="Part illustration" className="w-full h-auto object-contain max-h-48 rounded-[14px]" />
        <button onClick={handleDelete} className="absolute top-2 right-2 p-1.5 bg-[#FF4B4B] text-white border-2 border-[#E54343] border-b-[3px] rounded-[10px] opacity-0 group-hover:opacity-100 transition-all shadow-sm active:border-b-[1px] active:translate-y-[2px]"><Trash2 className="w-4 h-4" strokeWidth={3} /></button>
      </div>
    );
  }
  return (
    <>
      <div onClick={() => !uploading && fileRef.current?.click()} className={`border-2 border-dashed border-slate-300 rounded-[20px] p-4 flex flex-col items-center justify-center text-center hover:border-[#1CB0F6] hover:bg-[#EAF6FE] transition-all cursor-pointer w-full sm:w-1/2 min-h-[140px] group ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
        {uploading ? <Loader2 className="w-8 h-8 text-[#1CB0F6] animate-spin mb-3" strokeWidth={2.5} /> : <div className="w-12 h-12 bg-white border-2 border-slate-200 border-b-[4px] rounded-[14px] flex items-center justify-center mb-3 shadow-sm group-hover:border-[#1899D6] group-hover:text-[#1CB0F6] transition-colors"><ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-[#1CB0F6]" strokeWidth={2.5} /></div>}
        <span className="text-[13px] font-display font-black text-slate-600">{uploading ? 'Đang tải lên...' : 'Thêm ảnh minh họa'}</span>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </>
  );
};

// ─── PartPanel (NÂNG CẤP LOGIC ĐÁNH SỐ) ─────────────────────────────
const PartPanel = ({
  partId, part, isExpanded, onToggle, onUpdatePart, onAddQuestion, onRemoveQuestion, onUpdateQuestion, onAudioUpload, onAudioDelete, uploadProgress,
}) => {
  const [showAddSingle, setShowAddSingle] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);

  const config = TYPE_CONFIG[part.type] || TYPE_CONFIG.reading;
  
  // 1. TÍNH TỔNG SỐ CÂU HỎI THẬT (BỎ QUA VÍ DỤ)
  const qCount = part.questions?.reduce((total, q) => {
    if (q.type === 'group') {
      const validSubQs = q.subQuestions?.filter(sq => !sq.isExample) || [];
      return total + validSubQs.length;
    }
    if (!q.isExample) return total + 1;
    return total;
  }, 0) ?? 0;

  const Icon = config.icon;

  // 2. BIẾN ĐẾM ĐỂ ĐÁNH SỐ THỨ TỰ TRONG LÚC RENDER
  // Bắt đầu từ 0 vì component QuestionItem dùng {index + 1}
  let currentValidIndex = 0;

  return (
    <div className={`transition-all font-sans ${isExpanded ? '' : 'hover:opacity-90'}`} style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* Header Bar */}
      <button onClick={onToggle} className={`w-full flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 p-4 text-left transition-colors outline-none rounded-t-[20px] ${isExpanded ? 'bg-slate-50/50' : 'bg-white'}`}>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 border-b-[3px] shadow-sm ${config.bg} ${config.badge.split(' ')[2]}`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} strokeWidth={2.5} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[16px] sm:text-[18px] font-display font-black text-slate-800 truncate">{part.title || 'Phần thi chưa có tên'}</p>
            <span className={`text-[10px] font-display font-black px-2.5 py-0.5 rounded-[8px] uppercase tracking-widest flex-shrink-0 border-b-[2px] ${config.badge}`}>{config.label}</span>
          </div>
          <p className="text-[12px] sm:text-[13px] font-body font-bold text-slate-500 truncate flex items-center gap-1.5">
            <span className="bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-[6px]">{qCount} câu hỏi</span>
            {config.hasAudio && part.audioUrl && <span className="bg-[#EAF6FE] text-[#1CB0F6] px-1.5 py-0.5 rounded-[6px] flex items-center gap-1"><Headphones size={12} /> Audio</span>}
          </p>
        </div>
        
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">{isExpanded ? <ChevronDown className="w-5 h-5" strokeWidth={3} /> : <ChevronRight className="w-5 h-5" strokeWidth={3} />}</div>
      </button>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="p-4 sm:p-6 border-t-2 border-slate-100 space-y-6 sm:space-y-8 bg-white rounded-b-[20px]">
          
          {/* Cài đặt & Media (Giữ nguyên) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="text-[12px] font-display font-black text-slate-400 uppercase tracking-widest block mb-2">Tiêu đề phần thi</label>
              <input value={part.title ?? ''} onChange={e => onUpdatePart(partId, { title: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-4 py-3.5 text-[15px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400" placeholder="VD: PART 1: Photographs" />
            </div>
            <div>
              <label className="text-[12px] font-display font-black text-slate-400 uppercase tracking-widest block mb-2">Hướng dẫn / Yêu cầu</label>
              <input value={part.description ?? part.instruction ?? ''} onChange={e => onUpdatePart(partId, { description: e.target.value, instruction: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-4 py-3.5 text-[15px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400" placeholder="VD: Chọn câu mô tả đúng nhất..." />
            </div>
          </div>

          {/* 🚀 LOGIC RENDER CÂU HỎI VỚI ĐÁNH SỐ THỨ TỰ THÔNG MINH */}
          <div className="pt-6 border-t-2 border-slate-100">
            <h4 className="text-[15px] font-display font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
              Danh sách Câu hỏi <span className="bg-[#1CB0F6] text-white px-2 py-0.5 rounded-[8px] text-[12px] border-b-[2px] border-[#1899D6]">{qCount}</span>
            </h4>

            <div className="space-y-6">
              {(part.questions ?? []).map((q) => {
                // TRƯỜNG HỢP 1: NHÓM CÂU HỎI (GROUP)
                if (q.type === 'group') {
                  const startIdx = currentValidIndex;
                  const validInGroup = q.subQuestions?.filter(sq => !sq.isExample).length || 0;
                  
                  // Tăng biến đếm cho nhóm tiếp theo
                  currentValidIndex += validInGroup;

                  return (
                    <QuestionGroupItem
                      key={q.id} group={q} 
                      groupIndex={startIdx} // Truyền vị trí bắt đầu để đánh số sub-questions
                      partId={partId}
                      onRemoveGroup={(gid) => onRemoveQuestion(partId, gid)}
                      onUpdateGroup={(updates) => onUpdateQuestion && onUpdateQuestion(partId, q.id, updates)}
                    />
                  );
                }
                
                // TRƯỜNG HỢP 2: CÂU HỎI ĐƠN
                const showIdx = q.isExample ? -1 : currentValidIndex;
                
                // Chỉ tăng biến đếm nếu đây KHÔNG phải câu ví dụ
                if (!q.isExample) currentValidIndex++;

                return (
                  <QuestionItem
                    key={q.id} question={q} 
                    index={showIdx} // Nếu là -1, QuestionItem sẽ hiện "VD"
                    onRemove={qid => onRemoveQuestion(partId, qid)}
                    onUpdate={updates => onUpdateQuestion && onUpdateQuestion(partId, q.id, updates)} 
                  />
                );
              })}

              {/* Form thêm (Giữ nguyên) */}
              {showAddSingle && <AddQuestionForm onAdd={q => { onAddQuestion(partId, { ...q, type: 'single' }); setShowAddSingle(false); }} onCancel={() => setShowAddSingle(false)} />}
              {showAddGroup && <AddQuestionGroupForm onAdd={g => { onAddQuestion(partId, { ...g, type: 'group' }); setShowAddGroup(false); }} onCancel={() => setShowAddGroup(false)} />}

              {/* Nút thêm 3D (Giữ nguyên) */}
              {!showAddSingle && !showAddGroup && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <button onClick={() => setShowAddSingle(true)} className="flex flex-col items-center justify-center gap-3 p-6 bg-white border-2 border-dashed border-slate-300 rounded-[20px] hover:border-[#1CB0F6] hover:bg-[#EAF6FE] transition-all group shadow-sm outline-none">
                    <div className="w-12 h-12 rounded-[14px] bg-white border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-400 group-hover:text-[#1CB0F6] group-hover:border-[#1899D6] transition-colors"><Plus className="w-6 h-6" strokeWidth={3} /></div>
                    <div className="text-center"><span className="block text-[14px] font-display font-black uppercase tracking-wider text-slate-600 group-hover:text-[#1CB0F6]">Thêm Câu Hỏi Đơn</span><span className="block text-[12px] font-body font-bold text-slate-400 mt-1">(Cho Part 1, 2, 5)</span></div>
                  </button>
                  <button onClick={() => setShowAddGroup(true)} className="flex flex-col items-center justify-center gap-3 p-6 bg-white border-2 border-dashed border-slate-300 rounded-[20px] hover:border-[#CE82FF] hover:bg-[#F8EEFF] transition-all group shadow-sm outline-none">
                    <div className="w-12 h-12 rounded-[14px] bg-white border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-400 group-hover:text-[#CE82FF] group-hover:border-[#B975E5] transition-colors"><Layers className="w-6 h-6" strokeWidth={3} /></div>
                    <div className="text-center"><span className="block text-[14px] font-display font-black uppercase tracking-wider text-slate-600 group-hover:text-[#CE82FF]">Thêm Nhóm Câu Hỏi</span><span className="block text-[12px] font-body font-bold text-slate-400 mt-1">(Đoạn văn / Hội thoại)</span></div>
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
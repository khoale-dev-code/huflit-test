// src/admin/pages/Exams/EditExam/PartSettingsModal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, X, ImageIcon, Music, Trash2, 
  Loader2, UploadCloud, Save, FileText 
} from 'lucide-react';

// ─── CẤU HÌNH NHÃN ĐỘNG THEO LOẠI PART (FLEXIBLE CONFIG) ───
// Giúp Modal tự động thích nghi với mọi loại đề thi (TOEIC, IELTS, HUFLIT, THPT...)
const getDynamicLabels = (partType) => {
  switch (partType) {
    case 'listening':
      return {
        iconColor: 'text-[#1CB0F6]',
        bgLight: 'bg-[#EAF6FE]',
        scriptLabel: 'Transcript / Lời thoại',
        scriptPlaceholder: 'Nhập nội dung bài nghe (transcript) để học viên đối chiếu sau khi nộp bài...',
      };
    case 'reading':
      return {
        iconColor: 'text-[#58CC02]',
        bgLight: 'bg-[#f1faeb]',
        scriptLabel: 'Nội dung bài đọc / Đoạn văn',
        scriptPlaceholder: 'Nhập nội dung đoạn văn, bài báo, email... dùng chung cho cả phần thi này.',
      };
    case 'writing':
      return {
        iconColor: 'text-[#FF9600]',
        bgLight: 'bg-[#FFFBEA]',
        scriptLabel: 'Đề bài (Writing Prompt)',
        scriptPlaceholder: 'Nhập nội dung đề bài yêu cầu thí sinh viết...',
      };
    case 'speaking':
      return {
        iconColor: 'text-[#CE82FF]',
        bgLight: 'bg-[#F8EEFF]',
        scriptLabel: 'Chủ đề / Yêu cầu nói (Speaking Prompt)',
        scriptPlaceholder: 'Nhập câu hỏi, ngữ cảnh hoặc chủ đề nói...',
      };
    default:
      return {
        iconColor: 'text-slate-500',
        bgLight: 'bg-slate-100',
        scriptLabel: 'Nội dung bổ sung',
        scriptPlaceholder: 'Nhập nội dung văn bản dùng chung cho phần thi...',
      };
  }
};

const PartSettingsModal = ({ part, onClose, onUpdatePart, onAudioUpload, onAudioDelete, uploadProgress }) => {
  // Lấy cấu hình động dựa vào loại part hiện tại
  const theme = getDynamicLabels(part.type);

  // Khởi tạo State: Gom chung nội dung text vào trường `script` (hỗ trợ đọc cả `content` nếu là data cũ)
  const [localData, setLocalData] = useState({
    title: part.title || '',
    instruction: part.instruction || '',
    imageUrl: part.imageUrl || '',
    script: part.script || part.content || '', 
  });

  const handleSave = () => {
    onUpdatePart(part.id, localData);
    onClose();
  };

  const progress = uploadProgress[part.id];
  const isUploading = progress !== undefined;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Lớp nền mờ */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Khối Modal chính */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-[24px] w-full max-w-3xl border-2 border-slate-200 border-b-[8px] relative z-10 shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* HEADER MODAL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b-2 border-slate-100 shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[14px] ${theme.bgLight} ${theme.iconColor} border-2 border-current/20 border-b-[3px] flex items-center justify-center shadow-sm shrink-0`}>
              <Settings size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[18px] md:text-[20px] font-display font-black text-slate-800 leading-none">Cài đặt Phần thi</h2>
              <p className="text-[12px] md:text-[13px] font-body font-bold text-slate-400 mt-1">ID: <span className="text-slate-500">{part.id}</span> • Kỹ năng: <span className="uppercase text-slate-500">{part.type || 'Chưa phân loại'}</span></p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 sm:static w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* BODY MODAL (SCROLLABLE) */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            
            {/* Title */}
            <div className="md:col-span-2">
              <label className="text-[11px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2">Tên phần thi</label>
              <input 
                type="text" 
                value={localData.title} 
                onChange={e => setLocalData({ ...localData, title: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-[14px] px-4 py-3 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all placeholder:font-medium placeholder:text-slate-400" 
                placeholder="VD: PART 1: Photographs / Passage 1"
              />
            </div>
            
            {/* Instruction */}
            <div className="md:col-span-2">
              <label className="text-[11px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2">Hướng dẫn làm bài</label>
              <textarea 
                rows={2} 
                value={localData.instruction} 
                onChange={e => setLocalData({ ...localData, instruction: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-[14px] px-4 py-3 text-[14px] font-body font-medium text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white resize-y transition-all placeholder:text-slate-400" 
                placeholder="Ví dụ: Dựa vào đoạn văn sau, hãy chọn đáp án đúng nhất..."
              />
            </div>

            {/* 🚀 TRƯỜNG TEXT ĐỘNG (Script/Content) */}
            <div className="md:col-span-2">
              <label className={`text-[11px] font-display font-black uppercase tracking-widest flex items-center gap-1.5 mb-2 ${theme.iconColor}`}>
                <FileText size={14} strokeWidth={3} /> {theme.scriptLabel}
              </label>
              <textarea 
                rows={5} 
                value={localData.script} 
                onChange={e => setLocalData({ ...localData, script: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-[14px] px-4 py-3 text-[14px] font-body font-medium text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white resize-y transition-all placeholder:text-slate-400 leading-relaxed" 
                placeholder={theme.scriptPlaceholder}
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2 bg-slate-50/50 p-4 rounded-[16px] border border-slate-100">
              <label className="text-[11px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                <ImageIcon size={14} /> Link Hình Ảnh minh họa (Tùy chọn)
              </label>
              <input 
                type="text" 
                value={localData.imageUrl} 
                onChange={e => setLocalData({ ...localData, imageUrl: e.target.value })}
                className="w-full bg-white border-2 border-slate-200 rounded-[12px] px-4 py-2.5 text-[14px] font-body font-medium text-slate-800 focus:outline-none focus:border-[#58CC02] transition-all placeholder:text-slate-400" 
                placeholder="https://example.com/image.jpg"
              />
              {localData.imageUrl && (
                <div className="mt-3 p-2 bg-white rounded-xl border border-slate-200 w-max max-w-full shadow-sm">
                  <img src={localData.imageUrl} alt="Preview" className="max-h-32 object-contain rounded-lg" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>

            {/* Audio Upload */}
            <div className="md:col-span-2 bg-slate-50/50 p-4 rounded-[16px] border border-slate-100">
              <label className="text-[11px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                <Music size={14} /> File Audio dùng chung cho Part (Tùy chọn)
              </label>
              
              {part.audioUrl ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[14px] p-3">
                  <div className="hidden sm:flex w-10 h-10 bg-white rounded-[10px] items-center justify-center text-[#1CB0F6] shrink-0 shadow-sm">
                    <Music size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-display font-bold text-[#1899D6] truncate mb-1">
                      {part.audioName || 'File_Am_Thanh.mp3'}
                    </p>
                    <audio src={part.audioUrl} controls className="h-8 w-full outline-none" />
                  </div>
                  <button 
                    onClick={() => onAudioDelete(part.id, part.audioStoragePath)} 
                    className="w-full sm:w-10 h-10 flex items-center justify-center bg-white sm:bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] sm:border-none rounded-[10px] hover:bg-[#FF4B4B] hover:text-white transition-colors shrink-0"
                    title="Xóa Audio"
                  >
                    <Trash2 size={16} /> <span className="sm:hidden font-bold ml-2">Xóa Audio</span>
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <input 
                    type="file" 
                    accept="audio/*" 
                    id={`audio-upload-${part.id}`} 
                    className="hidden"
                    onChange={(e) => { if(e.target.files[0]) onAudioUpload(part.id, e.target.files[0]); }}
                    disabled={isUploading}
                  />
                  <label 
                    htmlFor={`audio-upload-${part.id}`} 
                    className={`flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed rounded-[14px] font-display font-bold text-[14px] transition-all cursor-pointer ${
                      isUploading ? 'bg-slate-100 border-slate-300 text-slate-400 pointer-events-none' : 'bg-white border-blue-300 text-[#1CB0F6] hover:bg-[#EAF6FE] hover:border-[#1CB0F6]'
                    }`}
                  >
                    {isUploading ? (
                      <><Loader2 size={18} className="animate-spin" /> Đang xử lý... {progress}%</>
                    ) : (
                      <><UploadCloud size={20} /> Bấm để tải lên File MP3</>
                    )}
                  </label>
                  {isUploading && (
                    <div className="h-1.5 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-[#1CB0F6] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* FOOTER MODAL */}
        <div className="p-5 sm:p-6 border-t-2 border-slate-100 flex justify-end gap-3 bg-white rounded-b-[20px] shrink-0">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 bg-slate-50 border-2 border-slate-200 border-b-[3px] rounded-[12px] text-[14px] font-display font-bold text-slate-600 hover:bg-slate-100 active:translate-y-[1px] active:border-b-2 transition-all outline-none"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleSave} 
            className="px-6 py-2.5 bg-[#58CC02] border-2 border-[#46A302] border-b-[3px] rounded-[12px] text-[14px] font-display font-bold text-white hover:bg-[#46A302] active:translate-y-[1px] active:border-b-2 transition-all outline-none flex items-center gap-2"
          >
            <Save size={16} strokeWidth={2.5} /> Lưu cài đặt
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PartSettingsModal;
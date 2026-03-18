// src/admin/pages/Exams/EditExam/PartSettingsModal.jsx
import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  Settings, X, ImageIcon, Music, Trash2, 
  Loader2, UploadCloud, Save, FileText, Info, Paperclip
} from 'lucide-react';

// ─── CẤU HÌNH NHÃN ĐỘNG THEO LOẠI PART (FLEXIBLE CONFIG) ───
const getDynamicLabels = (partType) => {
  switch (partType) {
    case 'listening':
      return {
        iconColor: 'text-[#1CB0F6]',
        bgLight: 'bg-[#EAF6FE]',
        borderColor: 'border-[#BAE3FB]',
        scriptLabel: 'Transcript / Lời thoại',
        scriptPlaceholder: 'VD: M: Hello, I have a reservation under the name Smith...\n(Nội dung này sẽ ẩn khi thi, chỉ hiện khi xem lại đáp án)',
      };
    case 'reading':
      return {
        iconColor: 'text-[#58CC02]',
        bgLight: 'bg-[#f1faeb]',
        borderColor: 'border-[#bcf096]',
        scriptLabel: 'Nội dung bài đọc / Đoạn văn',
        scriptPlaceholder: 'VD: Questions 147-149 refer to the following article...\n(Nhập nội dung bài báo, email, thư từ dùng chung cho cả phần này)',
      };
    case 'writing':
      return {
        iconColor: 'text-[#FF9600]',
        bgLight: 'bg-[#FFFBEA]',
        borderColor: 'border-[#FFD8A8]',
        scriptLabel: 'Đề bài (Writing Prompt)',
        scriptPlaceholder: 'VD: Write an essay responding to the following statement...\n(Nhập yêu cầu đề bài viết)',
      };
    case 'speaking':
      return {
        iconColor: 'text-[#CE82FF]',
        bgLight: 'bg-[#F8EEFF]',
        borderColor: 'border-[#eec9ff]',
        scriptLabel: 'Chủ đề / Yêu cầu nói (Speaking Prompt)',
        scriptPlaceholder: 'VD: Describe the picture on your screen...\n(Nhập câu hỏi, ngữ cảnh hoặc chủ đề yêu cầu thí sinh nói)',
      };
    default:
      return {
        iconColor: 'text-slate-500',
        bgLight: 'bg-slate-100',
        borderColor: 'border-slate-200',
        scriptLabel: 'Nội dung bổ sung',
        scriptPlaceholder: 'Nhập nội dung văn bản dùng chung cho phần thi...',
      };
  }
};

const PartSettingsModal = ({ part, onClose, onUpdatePart, onAudioUpload, onAudioDelete, uploadProgress }) => {
  const theme = getDynamicLabels(part.type);

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      {/* Lớp nền mờ */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Khối Modal chính */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-[#F4F7FA] rounded-[28px] w-full max-w-3xl border-2 border-slate-200 border-b-[8px] relative z-10 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* ── HEADER MODAL ── */}
        <div className="bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b-2 border-slate-200 shrink-0 relative z-20">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-[14px] ${theme.bgLight} ${theme.iconColor} border-2 ${theme.borderColor} border-b-[4px] flex items-center justify-center shadow-sm shrink-0`}>
              <Settings size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-display font-black text-slate-800 leading-none mb-1">Cài đặt Phần thi</h2>
              <div className="flex items-center gap-2 text-[12px] font-body font-bold">
                <span className="text-slate-400">ID: {part.id}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className={`uppercase tracking-widest ${theme.iconColor}`}>{part.type || 'Chưa phân loại'}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 sm:static w-10 h-10 flex items-center justify-center rounded-[12px] bg-slate-100 text-slate-500 hover:bg-[#fff0f0] hover:text-[#FF4B4B] transition-colors outline-none"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* ── BODY MODAL (SCROLLABLE) ── */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar space-y-6">
          
          {/* KHU 1: THÔNG TIN CƠ BẢN */}
          <div className="bg-white p-5 rounded-[20px] border-2 border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-slate-800 mb-2">
              <Info size={18} className="text-[#1CB0F6]" strokeWidth={2.5} />
              <h3 className="text-[16px] font-display font-black">Thông tin chung</h3>
            </div>
            
            <div>
              <label className="text-[12px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2">Tên phần thi</label>
              <input 
                type="text" 
                value={localData.title} 
                onChange={e => setLocalData({ ...localData, title: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-5 py-3.5 text-[15px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all placeholder:font-medium placeholder:text-slate-400" 
                placeholder="VD: PART 1: Photographs / Passage 1"
              />
            </div>
            
            <div>
              <label className="text-[12px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2">Hướng dẫn làm bài</label>
              <textarea 
                rows={2} 
                value={localData.instruction} 
                onChange={e => setLocalData({ ...localData, instruction: e.target.value })}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-5 py-3.5 text-[15px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white resize-y transition-all placeholder:font-medium placeholder:text-slate-400" 
                placeholder="Ví dụ: Dựa vào đoạn văn sau, hãy chọn đáp án đúng nhất..."
              />
            </div>
          </div>

          {/* KHU 2: NỘI DUNG CHÍNH (Được highlight màu theo loại bài) */}
          <div className={`${theme.bgLight} p-5 rounded-[20px] border-2 ${theme.borderColor} shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText size={18} className={theme.iconColor} strokeWidth={2.5} />
                <h3 className={`text-[16px] font-display font-black ${theme.iconColor}`}>{theme.scriptLabel}</h3>
              </div>
              <span className="text-[10px] font-display font-black text-white bg-slate-800/20 px-2 py-1 rounded-md uppercase tracking-widest">
                Dùng chung cho cả Part
              </span>
            </div>
            
            <textarea 
              rows={6} 
              value={localData.script} 
              onChange={e => setLocalData({ ...localData, script: e.target.value })}
              className={`w-full bg-white border-2 ${theme.borderColor} rounded-[16px] px-5 py-4 text-[15px] font-body font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-black/5 resize-y transition-all placeholder:font-medium placeholder:text-slate-400 leading-relaxed`}
              placeholder={theme.scriptPlaceholder}
            />
          </div>

          {/* KHU 3: MEDIA (ẢNH & AUDIO) */}
          <div className="bg-white p-5 rounded-[20px] border-2 border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-slate-800 mb-2">
              <Paperclip size={18} className="text-[#FF9600]" strokeWidth={2.5} />
              <h3 className="text-[16px] font-display font-black">Đính kèm Media</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Image Input */}
              <div>
                <label className="text-[12px] font-display font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                  <ImageIcon size={16} /> Link Hình Ảnh minh họa (Tùy chọn)
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={localData.imageUrl} 
                    onChange={e => setLocalData({ ...localData, imageUrl: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] pl-11 pr-5 py-3 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all placeholder:font-medium placeholder:text-slate-400" 
                    placeholder="https://example.com/image.jpg"
                  />
                  <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={2.5} />
                </div>
                
                {/* Image Preview */}
                {localData.imageUrl && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
                    <div className="p-2 bg-slate-50 rounded-[16px] border-2 border-dashed border-slate-200 w-max max-w-full inline-block">
                      <img src={localData.imageUrl} alt="Preview" className="max-h-40 object-contain rounded-[10px] bg-white border border-slate-100 shadow-sm" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Audio Upload */}
              <div className="pt-4 border-t-2 border-slate-100">
                <label className="text-[12px] font-display font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <Music size={16} /> File Audio dùng chung cho Part (Tùy chọn)
                </label>
                
                {part.audioUrl ? (
                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[16px] p-2 pr-3">
                    <div className="hidden sm:flex w-12 h-12 bg-white rounded-[12px] items-center justify-center text-[#1CB0F6] shrink-0 border border-[#BAE3FB] shadow-sm">
                      <Music size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 w-full min-w-0 flex items-center justify-center sm:justify-start">
                      <audio src={part.audioUrl} controls className="h-10 w-full outline-none" />
                    </div>
                    <button 
                      onClick={() => onAudioDelete(part.id, part.audioStoragePath)} 
                      className="w-full sm:w-10 h-10 flex items-center justify-center bg-white text-[#FF4B4B] border-2 border-[#ffc1c1] rounded-[12px] hover:bg-[#FF4B4B] hover:text-white transition-colors shrink-0 shadow-sm outline-none"
                      title="Xóa Audio"
                    >
                      <Trash2 size={18} strokeWidth={2.5} /> <span className="sm:hidden font-bold ml-2 font-body">Xóa Audio</span>
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
                      className={`flex flex-col items-center justify-center gap-2 w-full py-6 border-2 border-dashed rounded-[16px] transition-all cursor-pointer ${
                        isUploading 
                          ? 'bg-slate-50 border-slate-300 text-slate-400 pointer-events-none' 
                          : 'bg-[#F8FAFC] border-[#BAE3FB] text-[#1CB0F6] hover:bg-[#EAF6FE] hover:border-[#1CB0F6]'
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 size={24} className="animate-spin text-[#1CB0F6]" strokeWidth={2.5} /> 
                          <span className="font-display font-black text-[14px]">Đang xử lý... {progress}%</span>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-[#1CB0F6] mb-1">
                            <UploadCloud size={24} strokeWidth={2.5} />
                          </div>
                          <span className="font-display font-black text-[15px]">Bấm để tải lên File MP3</span>
                          <span className="font-body font-medium text-[12px] text-slate-400">Hỗ trợ định dạng .mp3, .wav, .m4a</span>
                        </>
                      )}
                    </label>
                    {isUploading && (
                      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-200 rounded-b-[16px] overflow-hidden">
                        <div className="h-full bg-[#1CB0F6] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER MODAL ── */}
        <div className="p-5 sm:p-6 border-t-2 border-slate-200 flex justify-end gap-3 bg-white shrink-0 relative z-20">
          <button 
            onClick={onClose} 
            className="px-6 py-3 bg-slate-100 border-2 border-slate-200 border-b-[4px] rounded-[16px] text-[15px] font-display font-black text-slate-500 hover:bg-slate-200 active:translate-y-[2px] active:border-b-[2px] transition-all outline-none tracking-wide"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleSave} 
            className="px-8 py-3 bg-[#58CC02] border-2 border-[#46A302] border-b-[4px] rounded-[16px] text-[15px] font-display font-black text-white hover:bg-[#46A302] active:translate-y-[2px] active:border-b-[2px] transition-all outline-none flex items-center gap-2 uppercase tracking-wide"
          >
            <Save size={18} strokeWidth={2.5} /> Lưu Cài Đặt
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PartSettingsModal;
// src/admin/pages/MiniChallengeEditor.jsx
import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, Target, 
  MessageCircle, CheckCircle2, Image as ImageIcon, 
  Music, FileText, UploadCloud, Loader2, X 
} from 'lucide-react';

// 🚀 Import service upload của bạn (Tái sử dụng từ LessonForm)
import { uploadImage, deleteImage } from '../../services/examService';

const MiniChallengeEditor = ({ challenges = [], onChange }) => {
  const [expandedId, setExpandedId] = useState(null);
  
  // State theo dõi trạng thái upload: null hoặc 'qId-image' hoặc 'qId-audio'
  const [uploadingMedia, setUploadingMedia] = useState(null);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: `q_${Date.now()}`,
      type: 'multiple_choice',
      question: '',
      image_url: '',    
      image_path: '',   // Lưu path để xóa trên Supabase sau này
      audio_url: '',    
      audio_path: '',   
      transcript: '',   
      options: ['', '', '', ''],
      correct_answer: '',
      explanation: ''
    };
    onChange([...challenges, newQuestion]);
    setExpandedId(newQuestion.id);
  };

  const handleRemoveQuestion = (idToRemove) => {
    // Tùy chọn: Nếu muốn tối ưu, bạn có thể gọi API xóa file trên Supabase ở đây trước khi filter
    onChange(challenges.filter(q => q.id !== idToRemove));
  };

  const updateQuestion = (id, field, value) => {
    onChange(challenges.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (qId, optionIndex, value) => {
    onChange(challenges.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  // 🚀 HÀM XỬ LÝ UPLOAD FILE
  const handleFileUpload = async (qId, type, file) => {
    if (!file) return;

    setUploadingMedia(`${qId}-${type}`);
    try {
      // Dùng chung hàm uploadImage của bạn (bạn có thể tùy chỉnh lại backend để nhận cả file mp3)
      const result = await uploadImage(file, type, 'lesson_challenges');
      
      // Cập nhật lại câu hỏi với URL và Path
      onChange(challenges.map(q => {
        if (q.id === qId) {
          if (type === 'image') {
            return { ...q, image_url: result.url, image_path: result.path };
          } else {
            return { ...q, audio_url: result.url, audio_path: result.path };
          }
        }
        return q;
      }));
    } catch (error) {
      console.error("Lỗi upload media:", error);
      alert("Có lỗi xảy ra khi tải file lên!");
    } finally {
      setUploadingMedia(null);
    }
  };

  // 🚀 HÀM XÓA FILE ĐÃ UPLOAD
  const handleRemoveFile = async (qId, type, path) => {
    try {
      if (path) await deleteImage(path); // Gọi API xóa file thật trên Supabase
      
      onChange(challenges.map(q => {
        if (q.id === qId) {
          if (type === 'image') return { ...q, image_url: '', image_path: '' };
          if (type === 'audio') return { ...q, audio_url: '', audio_path: '', transcript: '' }; // Xóa audio thì clear luôn transcript
        }
        return q;
      }));
    } catch (error) {
      console.error("Lỗi xóa media:", error);
    }
  };

  return (
    <div className="bg-white p-7 sm:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm hover:border-slate-300 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2.5 text-[12px] font-black text-slate-500 uppercase tracking-widest">
          <Target size={16} className="text-[#FF9600]" strokeWidth={3} /> 
          Mini Challenge (Bài tập nhanh)
        </label>
        <span className="text-[12px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          {challenges.length} câu hỏi
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <AnimatePresence>
          {challenges.map((q, index) => (
            <Motion.div 
              key={q.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
              className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shadow-sm"
            >
              {/* Header của Câu hỏi */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white border-2 border-slate-200 border-b-[4px] text-[#FF9600] rounded-xl flex items-center justify-center font-black text-[14px] shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[15px] text-slate-700 line-clamp-1 max-w-[200px] sm:max-w-[400px]">
                      {q.question || "Đang soạn câu hỏi..."}
                    </h4>
                    {/* Báo hiệu có đính kèm Media */}
                    <div className="flex items-center gap-2 mt-1">
                      {q.image_url && <span className="flex items-center gap-1 text-[10px] font-bold text-[#1CB0F6] bg-[#EAF6FE] px-1.5 py-0.5 rounded-md"><ImageIcon size={10}/> Ảnh</span>}
                      {q.audio_url && <span className="flex items-center gap-1 text-[10px] font-bold text-[#CE82FF] bg-[#faefff] px-1.5 py-0.5 rounded-md"><Music size={10}/> Audio</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRemoveQuestion(q.id); }}
                    className="p-2 text-slate-400 hover:text-[#FF4B4B] hover:bg-[#fff0f0] rounded-lg transition-colors"
                  >
                    <Trash2 size={18} strokeWidth={2.5} />
                  </button>
                  {expandedId === q.id ? <ChevronUp size={20} className="text-slate-400"/> : <ChevronDown size={20} className="text-slate-400"/>}
                </div>
              </div>

              {/* Nội dung chi tiết Câu hỏi */}
              <AnimatePresence>
                {expandedId === q.id && (
                  <Motion.div 
                    initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    className="overflow-hidden border-t-2 border-slate-200 bg-white"
                  >
                    <div className="p-5 sm:p-6 space-y-6">
                      
                      {/* Câu hỏi */}
                      <div>
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Nội dung câu hỏi *</label>
                        <input 
                          type="text" value={q.question || ''} onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-200 p-3.5 rounded-xl font-bold text-[14px] focus:border-[#1CB0F6] focus:bg-white outline-none transition-all shadow-inner"
                          placeholder="VD: What is the main idea of the audio?"
                        />
                      </div>

                      {/* 🚀 VÙNG ĐÍNH KÈM MEDIA (ẢNH & AUDIO) - TÍCH HỢP UPLOAD FILE */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                        
                        {/* 1. Khu vực Ảnh đính kèm */}
                        <div>
                          <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">
                            <ImageIcon size={14} className="text-[#1CB0F6]" /> Ảnh minh họa
                          </label>
                          
                          {uploadingMedia === `${q.id}-image` ? (
                            <div className="h-28 flex flex-col items-center justify-center bg-white border-2 border-slate-200 rounded-xl shadow-inner gap-2">
                              <Loader2 className="animate-spin text-[#1CB0F6]" size={24} />
                              <span className="text-[12px] font-bold text-slate-400">Đang tải ảnh...</span>
                            </div>
                          ) : q.image_url ? (
                            <div className="relative h-28 bg-white border-2 border-slate-200 rounded-xl overflow-hidden group shadow-inner">
                              <img src={q.image_url} alt="Preview" className="w-full h-full object-contain p-1" />
                              <button 
                                onClick={() => handleRemoveFile(q.id, 'image', q.image_path)}
                                className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white transition-colors"
                              >
                                <X size={14} strokeWidth={3} />
                              </button>
                            </div>
                          ) : (
                            <label className="cursor-pointer h-28 flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-300 rounded-xl hover:border-[#1CB0F6] hover:bg-[#EAF6FE] transition-colors group">
                              <UploadCloud size={24} className="text-slate-400 group-hover:text-[#1CB0F6] mb-1.5" />
                              <span className="text-[12px] font-bold text-slate-500 group-hover:text-[#1CB0F6]">Tải ảnh lên (Tùy chọn)</span>
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(q.id, 'image', e.target.files[0])} />
                            </label>
                          )}
                        </div>

                        {/* 2. Khu vực Audio đính kèm */}
                        <div>
                          <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">
                            <Music size={14} className="text-[#CE82FF]" /> File Âm thanh
                          </label>

                          {uploadingMedia === `${q.id}-audio` ? (
                            <div className="h-28 flex flex-col items-center justify-center bg-white border-2 border-slate-200 rounded-xl shadow-inner gap-2">
                              <Loader2 className="animate-spin text-[#CE82FF]" size={24} />
                              <span className="text-[12px] font-bold text-slate-400">Đang tải audio...</span>
                            </div>
                          ) : q.audio_url ? (
                            <div className="relative h-28 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center px-4 shadow-inner group">
                              <audio controls src={q.audio_url} className="w-full h-10" />
                              <button 
                                onClick={() => handleRemoveFile(q.id, 'audio', q.audio_path)}
                                className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white transition-colors"
                              >
                                <X size={14} strokeWidth={3} />
                              </button>
                            </div>
                          ) : (
                            <label className="cursor-pointer h-28 flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-300 rounded-xl hover:border-[#CE82FF] hover:bg-[#faefff] transition-colors group">
                              <UploadCloud size={24} className="text-slate-400 group-hover:text-[#CE82FF] mb-1.5" />
                              <span className="text-[12px] font-bold text-slate-500 group-hover:text-[#CE82FF]">Tải Audio (.mp3)</span>
                              <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(q.id, 'audio', e.target.files[0])} />
                            </label>
                          )}
                        </div>

                      </div>

                      {/* 🚀 SCRIPT CHO AUDIO (Chỉ hiện khi có Audio) */}
                      <AnimatePresence>
                        {q.audio_url && (
                          <Motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                            <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">
                              <FileText size={14} className="text-slate-400" /> Transcript (Lời thoại Audio)
                            </label>
                            <textarea 
                              value={q.transcript || ''} onChange={(e) => updateQuestion(q.id, 'transcript', e.target.value)}
                              className="w-full bg-slate-50 border-2 border-slate-200 p-3.5 rounded-xl font-medium text-[13px] focus:border-[#CE82FF] focus:bg-white outline-none transition-all min-h-[80px] shadow-inner"
                              placeholder="Nhập lời thoại của đoạn audio (để học sinh đối chiếu sau khi làm bài)..."
                            />
                          </Motion.div>
                        )}
                      </AnimatePresence>

                      {/* Các lựa chọn */}
                      <div>
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Các lựa chọn & Đánh dấu đáp án đúng</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {q.options.map((opt, oIndex) => (
                            <div key={oIndex} className="relative flex items-center">
                              <input 
                                type="text" value={opt || ''} onChange={(e) => updateOption(q.id, oIndex, e.target.value)}
                                className={`w-full bg-slate-50 border-2 p-3.5 pl-12 rounded-xl font-bold text-[14px] outline-none transition-all shadow-sm ${q.correct_answer && q.correct_answer === opt && opt !== '' ? 'border-[#58CC02] bg-[#f1faeb] text-green-800' : 'border-slate-200 focus:border-[#1CB0F6]'}`}
                                placeholder={`Lựa chọn ${oIndex + 1}`}
                              />
                              <button 
                                onClick={() => updateQuestion(q.id, 'correct_answer', opt)}
                                disabled={!opt.trim()} // Không cho click nếu chưa nhập chữ
                                className={`absolute left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed ${q.correct_answer && q.correct_answer === opt && opt !== '' ? 'border-[#58CC02] bg-[#58CC02] text-white shadow-sm' : 'border-slate-300 bg-white hover:border-[#1CB0F6]'}`}
                                title="Đánh dấu là đáp án đúng"
                              >
                                {q.correct_answer && q.correct_answer === opt && opt !== '' && <CheckCircle2 size={14} strokeWidth={4} />}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Giải thích */}
                      <div>
                        <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">
                          <MessageCircle size={14} className="text-[#FF9600]" /> Lời giải thích
                        </label>
                        <textarea 
                          value={q.explanation || ''} onChange={(e) => updateQuestion(q.id, 'explanation', e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-200 p-3.5 rounded-xl font-bold text-[13px] focus:border-[#FF9600] focus:bg-white outline-none transition-all min-h-[80px] shadow-inner"
                          placeholder="Giải thích vì sao đáp án đó đúng, các đáp án kia lại sai..."
                        />
                      </div>
                      
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button 
        onClick={handleAddQuestion}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 text-slate-500 font-black text-[14px] uppercase tracking-wider hover:border-[#FF9600] hover:bg-[#FFF4E5] hover:text-[#FF9600] transition-all outline-none"
      >
        <Plus size={20} strokeWidth={3} /> Thêm câu hỏi
      </button>
    </div>
  );
};

export default MiniChallengeEditor;
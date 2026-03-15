// src/admin/pages/Exams/components/QuestionItem.jsx
import React, { useState, useRef } from 'react';
import { X, Plus, Check, Edit2, ChevronUp, CheckCircle2, Image as ImageIcon, Loader2, Trash2, AlertCircle, Layers, FileText, Star, Zap, Music, Volume2, ChevronDown, AlignLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage, deleteImage, uploadAudio, deleteAudio } from '../../../services/examService';

// ─── QuestionImageUploader ──────────────────────────────────────────
const QuestionImageUploader = ({ imageUrl, imageStoragePath, onUpdate }) => {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file, 'new', 'question');
      onUpdate({ imageUrl: result.url, imageStoragePath: result.path });
    } catch (err) {
      alert("Lỗi tải ảnh!");
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemove = async () => {
    if (imageStoragePath) await deleteImage(imageStoragePath);
    onUpdate({ imageUrl: '', imageStoragePath: '' });
  };

  return (
    <div className="flex-1">
      <label className="text-[11px] font-display font-black text-slate-400 uppercase tracking-widest block mb-2">Hình ảnh minh họa</label>
      {imageUrl ? (
        <div className="relative inline-block border-2 border-slate-200 border-b-[4px] rounded-[16px] overflow-hidden group max-w-full bg-slate-50 shadow-sm p-1">
          <img src={imageUrl} alt="Question" className="w-full h-auto max-h-32 object-contain rounded-[10px]" />
          <button onClick={handleRemove} className="absolute top-2 right-2 p-1.5 bg-[#FF4B4B] text-white border-2 border-[#E54343] border-b-[3px] rounded-[10px] shadow-sm active:border-b-[1px] active:translate-y-[2px] transition-all outline-none">
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      ) : (
        <button onClick={() => !uploading && fileRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 rounded-[16px] text-[12px] font-display font-bold uppercase tracking-wider hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm">
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5 text-[#1CB0F6]" strokeWidth={2.5} />}
          {uploading ? 'Đang tải...' : 'Thêm ảnh'}
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
    </div>
  );
};

// ─── QuestionAudioUploader ─────────────────────────────────────
const QuestionAudioUploader = ({ audioUrl, audioStoragePath, onUpdate }) => {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadAudio(file, 'new', 'question_audio');
      onUpdate({ audioUrl: result.url, audioStoragePath: result.path, audioName: file.name });
    } catch (err) {
      alert("Lỗi tải audio!");
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemove = async () => {
    if (audioStoragePath) await deleteAudio(audioStoragePath);
    onUpdate({ audioUrl: '', audioStoragePath: '', audioName: '' });
  };

  return (
    <div className="flex-1">
      <label className="text-[11px] font-display font-black text-slate-400 uppercase tracking-widest block mb-2">Âm thanh (Audio)</label>
      {audioUrl ? (
        <div className="border-2 border-[#BAE3FB] border-b-[4px] rounded-[16px] p-3 bg-[#EAF6FE] flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 bg-white rounded-[8px] flex items-center justify-center shrink-0">
               <Music className="w-4 h-4 text-[#1CB0F6]" />
            </div>
            <audio src={audioUrl} controls className="h-8 w-32 sm:w-40" />
          </div>
          <button onClick={handleRemove} className="p-1.5 bg-[#FF4B4B] text-white border-2 border-[#E54343] border-b-[3px] rounded-[10px] shadow-sm active:border-b-[1px] active:translate-y-[2px] transition-all outline-none shrink-0">
            <Trash2 className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <button onClick={() => !uploading && fileRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 rounded-[16px] text-[12px] font-display font-bold uppercase tracking-wider hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm">
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5 text-[#CE82FF]" strokeWidth={2.5} />}
          {uploading ? 'Đang tải...' : 'Thêm Audio'}
        </button>
      )}
      <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={handleUpload} />
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════
// 1. SINGLE QUESTION COMPONENTS
// ══════════════════════════════════════════════════════════════════════

export const QuestionItem = ({ question, index, onRemove, onUpdate, hideOptions = false }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateOption = (oi, val) => {
    const newOptions = [...(question.options || ['', '', '', ''])];
    newOptions[oi] = val;
    if (onUpdate) onUpdate({ options: newOptions });
  };

  const handleQuickFillABCD = (e) => {
    e.preventDefault();
    if (onUpdate) onUpdate({ options: ['A', 'B', 'C', 'D'] });
  };

  if (isEditing) {
    return (
      <div className="bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[6px] rounded-[24px] p-5 sm:p-6 shadow-sm transition-all animate-in fade-in duration-200 font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-[12px] bg-[#1CB0F6] border-b-[3px] border-[#1899D6] text-white flex items-center justify-center text-[16px] font-display font-black flex-shrink-0 shadow-sm">
              {question.isExample ? <Star size={18} strokeWidth={3} /> : (index === -1 ? 'VD' : index + 1)}
            </span>
            <span className="text-[16px] font-display font-black text-[#1CB0F6]">Chỉnh sửa câu hỏi</span>
          </div>
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 rounded-[14px] text-[12px] font-display font-bold uppercase tracking-wider hover:bg-slate-50 hover:text-slate-700 active:border-b-2 active:translate-y-[2px] flex items-center gap-1.5 transition-all shadow-sm outline-none">
            <ChevronUp className="w-4 h-4" strokeWidth={3} /> Thu gọn
          </button>
        </div>
        
        <div className="space-y-5">
          {/* CÔNG TẮC CÂU VÍ DỤ */}
          <label className={`relative flex items-center justify-between cursor-pointer p-4 rounded-[20px] border-2 transition-all ${
            question.isExample ? 'bg-[#FFFBEA] border-[#FFD8A8]' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border-b-[3px] shadow-sm ${
                question.isExample ? 'bg-[#FF9600] text-white border-[#E58700]' : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}>
                <Star size={18} strokeWidth={3} />
              </div>
              <div>
                <p className={`font-display font-extrabold text-[15px] leading-tight ${question.isExample ? 'text-[#FF9600]' : 'text-slate-700'}`}>
                  Đây là câu Ví dụ (Example)
                </p>
                <p className="text-[12px] font-body font-bold text-slate-500 mt-0.5">Không tính điểm, hiện sẵn đáp án mẫu.</p>
              </div>
            </div>
            <div className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 border-2 ${
              question.isExample ? 'bg-[#FF9600] border-[#E58700]' : 'bg-slate-200 border-slate-300'
            }`}>
              <input type="checkbox" className="sr-only" checked={question.isExample || false} onChange={(e) => onUpdate({ isExample: e.target.checked })} />
              <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${question.isExample ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </label>

          {/* MEDIA SECTION: IMAGE & AUDIO */}
          {!hideOptions && (
            <div className="flex flex-col sm:flex-row gap-4">
               <QuestionImageUploader 
                 imageUrl={question.imageUrl} imageStoragePath={question.imageStoragePath} 
                 onUpdate={(updates) => onUpdate && onUpdate(updates)} 
               />
               <QuestionAudioUploader
                 audioUrl={question.audioUrl} audioStoragePath={question.audioStoragePath}
                 onUpdate={(updates) => onUpdate && onUpdate(updates)}
               />
            </div>
          )}

          <div>
            <label className="text-[12px] font-display font-black text-[#1CB0F6] uppercase tracking-widest block mb-2.5">Nội dung câu hỏi (Tùy chọn)</label>
            <textarea value={question.question || ''} onChange={(e) => onUpdate && onUpdate({ question: e.target.value })} rows={2} placeholder="Nhập nội dung câu hỏi..." className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-white shadow-sm resize-y transition-all placeholder:font-medium placeholder:text-slate-400" />
          </div>

          {!hideOptions && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-[12px] font-display font-black text-[#1CB0F6] uppercase tracking-widest block">Các lựa chọn</label>
                <button onClick={handleQuickFillABCD} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFBEA] text-[#FF9600] border-2 border-[#FFD8A8] border-b-[3px] rounded-[10px] text-[11px] font-display font-black uppercase tracking-wider hover:bg-[#FF9600] hover:text-white hover:border-[#E58700] active:border-b-2 active:translate-y-[1px] transition-all outline-none">
                  <Zap size={14} strokeWidth={3} /> Điền nhanh A,B,C,D
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {(question.options || ['', '', '', '']).map((opt, i) => {
                  const isCorrect = question.correct === i;
                  return (
                    <div key={i} className={`flex items-center gap-3 p-2 rounded-[20px] border-2 transition-all shadow-sm ${isCorrect ? 'bg-[#f1faeb] border-[#bcf096]' : 'bg-white border-slate-200'}`}>
                      <button onClick={() => onUpdate && onUpdate({ correct: i })} className={`w-11 h-11 rounded-[14px] flex-shrink-0 flex items-center justify-center text-[15px] font-display font-black transition-all outline-none border-b-[3px] ${isCorrect ? 'bg-[#58CC02] border-[#46A302] text-white shadow-sm -translate-y-px' : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'}`}>
                        {String.fromCharCode(65 + i)}
                      </button>
                      <input value={opt} onChange={(e) => handleUpdateOption(i, e.target.value)} placeholder={`Lựa chọn ${String.fromCharCode(65 + i)}`} className={`flex-1 min-w-0 border-0 px-2 py-2 text-[14px] font-body font-bold outline-none bg-transparent placeholder:font-medium placeholder:text-slate-400 ${isCorrect ? 'text-[#46A302]' : 'text-slate-700'}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label className="text-[12px] font-display font-black text-[#1CB0F6] uppercase tracking-widest block mb-2.5">Giải thích chi tiết (Tùy chọn)</label>
            <textarea value={question.explanation || ''} onChange={(e) => onUpdate && onUpdate({ explanation: e.target.value })} rows={2} placeholder="Giải thích vì sao đáp án này đúng..." className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-600 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-white shadow-sm resize-y transition-all placeholder:font-medium placeholder:text-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  // ─── VIEW MẶC ĐỊNH (READ-ONLY) ───
  return (
    <div className={`rounded-[24px] p-5 sm:p-6 border-2 border-b-[4px] hover:shadow-sm transition-all group relative font-sans ${
      question.isExample ? 'bg-[#FFFBEA] border-[#FFD8A8] hover:border-[#FFC200]' : 'bg-white border-slate-200 hover:border-slate-300'
    }`} style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 bg-white p-1.5 rounded-[16px] shadow-sm border-2 border-slate-100 z-10">
        <button onClick={() => setIsEditing(true)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-[#1CB0F6] hover:bg-blue-50 rounded-[10px] transition-colors outline-none"><Edit2 className="w-4 h-4" strokeWidth={2.5} /></button>
        <button onClick={() => onRemove(question.id)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-[#FF4B4B] hover:bg-[#fff0f0] rounded-[10px] transition-colors outline-none"><Trash2 className="w-4 h-4" strokeWidth={2.5} /></button>
      </div>

      <div className="flex items-start gap-4 mb-5 pr-24">
        <span className={`w-10 h-10 border-2 border-b-[3px] rounded-[12px] flex items-center justify-center text-[15px] font-display font-black flex-shrink-0 shadow-sm mt-0.5 ${
          question.isExample ? 'bg-[#FF9600] border-[#E58700] text-white' : 'bg-slate-100 border-slate-200 text-slate-500'
        }`}>{question.isExample ? 'VD' : (index === -1 ? 'VD' : index + 1)}</span>
        
        <div className="flex-1 pt-1">
          {question.isExample && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[8px] bg-[#FF9600]/20 text-[#FF9600] text-[10px] font-display font-black uppercase tracking-widest mb-2"><Star size={12} strokeWidth={3} /> Câu Ví Dụ (Không tính điểm)</span>
          )}
          
          {/* MEDIA IN VIEW: IMAGE & AUDIO */}
          <div className="flex flex-wrap gap-4 mb-4">
            {question.imageUrl && (
              <img src={question.imageUrl} alt={`Question ${index + 1}`} className="max-h-48 rounded-[16px] border-2 border-slate-200 bg-white p-1.5 object-contain" />
            )}
            {question.audioUrl && (
              <div className="flex items-center gap-3 p-3 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[16px] shadow-sm self-end">
                <Music className="w-5 h-5 text-[#1CB0F6]" />
                <audio src={question.audioUrl} controls className="h-8 w-40" />
              </div>
            )}
          </div>

          <p className={`text-[15px] font-body font-bold leading-snug whitespace-pre-wrap m-0 ${question.isExample ? 'text-[#D9A600]' : 'text-slate-800'}`}>
            {question.question || <span className="opacity-50 italic">(Không có nội dung câu hỏi)</span>}
          </p>
        </div>
      </div>

      {!hideOptions && question.options?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-14">
          {question.options.map((opt, oi) => {
            const isCorrect = oi === question.correct;
            return (
              <div key={oi} className={`flex items-center gap-3 px-4 py-3 rounded-[16px] border-2 transition-all ${isCorrect ? 'border-[#bcf096] bg-[#f1faeb] text-[#58CC02] border-b-[4px]' : 'border-slate-100 bg-white/50 text-slate-600'}`}>
                <span className={`w-7 h-7 rounded-[8px] flex items-center justify-center text-[12px] font-display font-black flex-shrink-0 ${isCorrect ? 'bg-[#58CC02] text-white shadow-sm' : 'bg-slate-200 text-slate-500'}`}>{String.fromCharCode(65 + oi)}</span>
                <span className="flex-1 break-words leading-snug font-body font-bold text-[14px]">{opt || <span className="text-slate-400 italic font-medium">🎧 Đáp án trong Audio</span>}</span>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-[#58CC02] flex-shrink-0" strokeWidth={2.5} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── AddQuestionForm (Kèm AUDIO & NÚT ĐIỀN NHANH) ───
export const AddQuestionForm = ({ onAdd, onCancel }) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [q, setQ] = useState({
    id: `q_${Date.now()}`,
    question: '',
    options: ['', '', '', ''],
    correct: 0,
    explanation: '',
    imageUrl: '',
    imageStoragePath: '',
    audioUrl: '',
    audioStoragePath: '',
    audioName: '',
    isExample: false
  });

  const updateOption = (i, val) => setQ(p => { const o = [...p.options]; o[i] = val; return { ...p, options: o }; });
  const handleQuickFillABCD = (e) => { e.preventDefault(); setQ(p => ({ ...p, options: ['A', 'B', 'C', 'D'] })); };

  const handleSubmit = () => {
    let finalOptions = q.options;
    const isAllEmpty = q.options.every(opt => opt.trim() === '');
    if (isAllEmpty) finalOptions = ['A', 'B', 'C', 'D'];
    else if (q.options.filter(opt => opt.trim() !== '').length < 2) {
        alert("Vui lòng nhập ít nhất 2 đáp án hoặc để trống toàn bộ để tự động tạo A, B, C, D!");
        return;
    }
    onAdd({ ...q, options: finalOptions });
  };

  return (
    <>
      <div className="bg-white border-2 border-slate-200 border-b-[6px] rounded-[24px] p-5 sm:p-7 shadow-sm font-sans">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
          <div className="w-10 h-10 rounded-[12px] bg-[#1CB0F6] border-b-[3px] border-[#1899D6] text-white flex items-center justify-center shadow-sm"><Plus className="w-6 h-6" strokeWidth={3} /></div>
          <h4 className="text-[18px] font-display font-black text-slate-800 m-0">Thêm câu hỏi mới</h4>
        </div>

        <div className="space-y-6">
          <label className={`relative flex items-center justify-between cursor-pointer p-4 rounded-[20px] border-2 transition-all ${q.isExample ? 'bg-[#FFFBEA] border-[#FFD8A8]' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border-b-[3px] shadow-sm ${q.isExample ? 'bg-[#FF9600] text-white border-[#E58700]' : 'bg-white text-slate-400 border-slate-200'}`}><Star size={18} strokeWidth={3} /></div>
              <div><p className={`font-display font-extrabold text-[15px] leading-tight ${q.isExample ? 'text-[#FF9600]' : 'text-slate-700'}`}>Đánh dấu là câu Ví dụ</p><p className="text-[12px] font-body font-bold text-slate-500 mt-0.5">Không tính điểm và không đánh số.</p></div>
            </div>
            <div className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 border-2 ${q.isExample ? 'bg-[#FF9600] border-[#E58700]' : 'bg-slate-200 border-slate-300'}`}>
              <input type="checkbox" className="sr-only" checked={q.isExample} onChange={(e) => setQ(p => ({ ...p, isExample: e.target.checked }))} /><div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${q.isExample ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </label>

          <div className="flex flex-col sm:flex-row gap-4">
             <QuestionImageUploader imageUrl={q.imageUrl} imageStoragePath={q.imageStoragePath} onUpdate={(updates) => setQ(p => ({ ...p, ...updates }))} />
             <QuestionAudioUploader audioUrl={q.audioUrl} audioStoragePath={q.audioStoragePath} onUpdate={(updates) => setQ(p => ({ ...p, ...updates }))} />
          </div>

          <div>
            <label className="text-[12px] font-display font-black text-slate-400 uppercase tracking-widest block mb-2.5">Nội dung câu hỏi (Tùy chọn)</label>
            <textarea value={q.question} onChange={e => setQ(p => ({ ...p, question: e.target.value }))} rows={2} className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-slate-50 focus:bg-white resize-y transition-all" placeholder="Ví dụ: What is the man doing?" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[12px] font-display font-black text-slate-400 uppercase tracking-widest block">Các đáp án</label>
              <button onClick={handleQuickFillABCD} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFBEA] text-[#FF9600] border-2 border-[#FFD8A8] border-b-[3px] rounded-[10px] text-[11px] font-display font-black uppercase tracking-wider transition-all shadow-sm active:translate-y-[1px]"><Zap size={14} strokeWidth={3} /> Điền nhanh A,B,C,D</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {q.options.map((opt, i) => {
                const isCorrect = q.correct === i;
                return (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-[20px] border-2 transition-all ${isCorrect ? 'bg-[#f1faeb] border-[#bcf096]' : 'bg-slate-50 border-slate-200'}`}>
                    <button onClick={() => setQ(p => ({ ...p, correct: i }))} className={`w-11 h-11 rounded-[14px] flex-shrink-0 flex items-center justify-center text-[15px] font-display font-black transition-all border-b-[3px] ${isCorrect ? 'bg-[#58CC02] border-[#46A302] text-white shadow-sm' : 'bg-white border-slate-200 text-slate-400'}`}>{String.fromCharCode(65 + i)}</button>
                    <input value={opt} onChange={e => updateOption(i, e.target.value)} placeholder={`Lựa chọn ${String.fromCharCode(65 + i)}...`} className={`flex-1 min-w-0 border-0 px-2 py-2 text-[14px] font-body font-bold outline-none bg-transparent ${isCorrect ? 'text-[#46A302]' : 'text-slate-700'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[12px] font-display font-black text-slate-400 uppercase tracking-widest block mb-2.5">
              Giải thích chi tiết (Tùy chọn)
            </label>
            <textarea 
              value={q.explanation} 
              onChange={e => setQ(p => ({ ...p, explanation: e.target.value }))} 
              rows={2} 
              className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-slate-50 focus:bg-white resize-y transition-all" 
              placeholder="Giải thích vì sao đáp án này đúng để học viên tham khảo..." 
            />
          </div>

          <div className="flex gap-4 pt-6 border-t-2 border-slate-100">
            <button onClick={() => setShowCancelConfirm(true)} className="flex-1 py-3.5 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 text-[14px] font-display font-black uppercase tracking-wider rounded-[16px] active:translate-y-[2px] transition-all">Hủy bỏ</button>
            <button onClick={handleSubmit} className="flex-1 py-3.5 bg-[#58CC02] border-2 border-[#46A302] border-b-[4px] text-white text-[14px] font-display font-black uppercase tracking-wider rounded-[16px] shadow-sm flex items-center justify-center gap-2"><Check className="w-5 h-5" strokeWidth={3} /> Thêm câu hỏi</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCancelConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCancelConfirm(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 15 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative w-full max-w-[360px] bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-2xl p-6 text-center">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#FF4B4B] rounded-[16px] border-b-[4px] border-[#E54343] flex items-center justify-center shadow-sm"><AlertCircle size={32} strokeWidth={2.5} className="text-white" /></div>
              <div className="mt-8 mb-6"><h2 className="text-[20px] font-display font-black text-slate-800 mb-2">Hủy bỏ thao tác?</h2><p className="text-[14px] font-body font-bold text-slate-500 leading-snug">Dữ liệu vừa nhập sẽ bị mất. Bạn có chắc không?</p></div>
              <div className="flex gap-3"><button onClick={() => { setShowCancelConfirm(false); onCancel(); }} className="flex-1 py-3 bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] border-b-[4px] rounded-[14px] text-[13px] font-display font-black uppercase tracking-wider transition-all">Vẫn hủy</button><button onClick={() => setShowCancelConfirm(false)} className="flex-1 py-3 bg-[#1CB0F6] text-white border-2 border-[#1899D6] border-b-[4px] rounded-[14px] text-[13px] font-display font-black uppercase tracking-wider transition-all">Tiếp tục</button></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};


// ══════════════════════════════════════════════════════════════════════
// 2. QUESTION GROUP COMPONENTS (Đoạn văn / Hội thoại)
// ══════════════════════════════════════════════════════════════════════

export const QuestionGroupItem = ({ group, groupIndex, partId, onRemoveGroup, onUpdateGroup }) => {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [showAddSubQ, setShowAddSubQ] = useState(false);

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
  };

  return (
    <div className="bg-[#F8EEFF] border-2 border-[#eec9ff] border-b-[6px] rounded-[28px] overflow-hidden shadow-sm relative group font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* ── Nút Xóa Group ── */}
      <button 
        onClick={() => { if(window.confirm('Xóa nhóm này sẽ mất tất cả câu hỏi nhỏ bên trong?')) onRemoveGroup(group.id) }} 
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] border-b-[4px] flex items-center justify-center rounded-[14px] shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:translate-y-[2px]"
        title="Xóa nhóm câu hỏi"
      >
        <Trash2 className="w-5 h-5" strokeWidth={2.5} />
      </button>

      {/* ── HEADER CỦA NHÓM (Nội dung đoạn văn/hội thoại) ── */}
      <div className="p-5 sm:p-7 border-b-2 border-[#eec9ff] bg-white rounded-b-[24px]">
        {isEditingContent ? (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-[12px] bg-[#CE82FF] border-b-[3px] border-[#B975E5] text-white flex items-center justify-center shadow-sm"><Layers size={20} strokeWidth={2.5} /></div>
                <h4 className="text-[18px] font-display font-black text-slate-800">Chỉnh sửa Đoạn văn/Nhóm</h4>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <QuestionImageUploader imageUrl={group.imageUrl} imageStoragePath={group.imageStoragePath} onUpdate={(updates) => onUpdateGroup(updates)} />
              <QuestionAudioUploader audioUrl={group.audioUrl} audioStoragePath={group.audioStoragePath} onUpdate={(updates) => onUpdateGroup(updates)} />
            </div>

            <div>
              <label className="text-[12px] font-display font-black text-[#CE82FF] uppercase tracking-widest block mb-2.5">Nội dung đoạn văn / Đoạn hội thoại</label>
              <textarea value={group.content || ''} onChange={(e) => onUpdateGroup({ content: e.target.value })} rows={5} placeholder="Nhập nội dung bài đọc, đoạn hội thoại..." className="w-full border-2 border-[#eec9ff] rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#CE82FF] focus:ring-4 focus:ring-purple-500/10 bg-slate-50 focus:bg-white resize-y transition-all" />
            </div>
            
            <button onClick={() => setIsEditingContent(false)} className="px-5 py-3 w-full sm:w-auto bg-[#CE82FF] text-white border-2 border-[#B975E5] border-b-[4px] rounded-[14px] text-[14px] font-display font-black uppercase tracking-wider hover:bg-[#B975E5] active:translate-y-[2px] transition-all outline-none flex items-center justify-center gap-2">
              <Check size={18} strokeWidth={3} /> Lưu nội dung nhóm
            </button>
          </div>
        ) : (
          <div className="relative pr-16 group/content">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="px-3 py-1 bg-[#F8EEFF] text-[#CE82FF] border border-[#eec9ff] rounded-[8px] text-[10px] font-display font-black uppercase tracking-widest flex items-center gap-1.5"><Layers size={14} strokeWidth={3} /> Nhóm Câu Hỏi</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              {group.imageUrl && <img src={group.imageUrl} alt="Group" className="max-h-48 rounded-[16px] border-2 border-slate-200 bg-white p-1.5 object-contain" />}
              {group.audioUrl && <div className="flex items-center gap-3 p-3 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[16px] shadow-sm"><Music className="w-5 h-5 text-[#1CB0F6]" /><audio src={group.audioUrl} controls className="h-8 w-40" /></div>}
            </div>

            <div className="text-[15px] font-body font-bold leading-relaxed text-slate-800 bg-slate-50 border-2 border-slate-100 p-5 rounded-[16px] whitespace-pre-wrap">
              {group.content || <span className="opacity-50 italic">Không có nội dung đoạn văn...</span>}
            </div>
            
            <button onClick={() => setIsEditingContent(true)} className="absolute right-0 top-0 w-10 h-10 bg-white border-2 border-slate-200 border-b-[4px] rounded-[14px] flex items-center justify-center text-slate-400 hover:text-[#CE82FF] hover:border-purple-200 active:translate-y-[2px] transition-all opacity-0 group-hover/content:opacity-100 shadow-sm" title="Chỉnh sửa nội dung nhóm">
              <Edit2 size={18} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      {/* ── DANH SÁCH CÂU HỎI TRONG NHÓM ── */}
      <div className="p-5 sm:p-7 space-y-5">
        <h5 className="text-[13px] font-display font-black text-[#CE82FF] uppercase tracking-widest flex items-center gap-2">
          Câu hỏi phụ <span className="bg-white border-2 border-[#eec9ff] text-[#CE82FF] px-2 py-0.5 rounded-[8px]">{subQuestionsCount}</span>
        </h5>
        
        {group.subQuestions?.map((sq, sIdx) => (
          <QuestionItem 
            key={sq.id} 
            question={sq} 
            index={groupIndex + sIdx} // Kế thừa index từ component cha (PartPanel)
            onRemove={handleRemoveSubQuestion} 
            onUpdate={(updates) => handleUpdateSubQuestion(sq.id, updates)} 
            hideOptions={false}
          />
        ))}

        {showAddSubQ && <AddQuestionForm onAdd={handleAddSubQuestion} onCancel={() => setShowAddSubQ(false)} />}
        
        {!showAddSubQ && (
          <button onClick={() => setShowAddSubQ(true)} className="w-full flex items-center justify-center gap-2 py-4 bg-white/50 border-2 border-dashed border-[#eec9ff] text-[#CE82FF] rounded-[20px] font-display font-black text-[14px] hover:bg-white hover:border-[#CE82FF] hover:shadow-sm transition-all active:translate-y-[1px] uppercase tracking-wider">
            <Plus size={20} strokeWidth={3} /> Thêm câu hỏi phụ vào nhóm
          </button>
        )}
      </div>
    </div>
  );
};

// ─── AddQuestionGroupForm ───
export const AddQuestionGroupForm = ({ onAdd, onCancel }) => {
  const [g, setQG] = useState({
    id: `g_${Date.now()}`,
    content: '',
    imageUrl: '',
    imageStoragePath: '',
    audioUrl: '',
    audioStoragePath: '',
    subQuestions: []
  });

  return (
    <div className="bg-white border-2 border-[#eec9ff] border-b-[6px] rounded-[28px] p-5 sm:p-7 shadow-sm font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
        <div className="w-10 h-10 rounded-[12px] bg-[#CE82FF] border-b-[3px] border-[#B975E5] text-white flex items-center justify-center shadow-sm"><Layers className="w-5 h-5" strokeWidth={3} /></div>
        <div>
          <h4 className="text-[18px] font-display font-black text-slate-800 m-0 leading-tight">Tạo Nhóm Câu Hỏi</h4>
          <p className="text-[12px] font-body font-bold text-slate-400 mt-1">Dùng cho đoạn văn, bài đọc hoặc đoạn hội thoại.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
           <QuestionImageUploader imageUrl={g.imageUrl} imageStoragePath={g.imageStoragePath} onUpdate={(updates) => setQG(p => ({ ...p, ...updates }))} />
           <QuestionAudioUploader audioUrl={g.audioUrl} audioStoragePath={g.audioStoragePath} onUpdate={(updates) => setQG(p => ({ ...p, ...updates }))} />
        </div>

        <div>
          <label className="text-[12px] font-display font-black text-[#CE82FF] uppercase tracking-widest block mb-2.5">Nội dung đoạn văn / Hội thoại</label>
          <textarea value={g.content} onChange={e => setQG(p => ({ ...p, content: e.target.value }))} rows={4} className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#CE82FF] focus:ring-4 focus:ring-purple-500/10 bg-slate-50 focus:bg-white resize-y transition-all placeholder:text-slate-400" placeholder="VD: Questions 71-73 refer to the following email..." />
        </div>

        <div className="flex gap-4 pt-6 border-t-2 border-slate-100">
          <button onClick={onCancel} className="flex-1 py-3.5 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 text-[14px] font-display font-black uppercase tracking-wider rounded-[16px] active:translate-y-[2px] transition-all">Hủy bỏ</button>
          <button onClick={() => onAdd(g)} className="flex-1 py-3.5 bg-[#CE82FF] border-2 border-[#B975E5] border-b-[4px] text-white text-[14px] font-display font-black uppercase tracking-wider rounded-[16px] shadow-sm flex items-center justify-center gap-2"><Check className="w-5 h-5" strokeWidth={3} /> Tạo Nhóm</button>
        </div>
      </div>
    </div>
  );
};
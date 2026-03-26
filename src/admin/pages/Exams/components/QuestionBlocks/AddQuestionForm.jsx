import React, { useState } from 'react';
import { Plus, Check, Star, Zap, AlertCircle, X, Volume2 } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { QuestionImageUploader, QuestionAudioUploader } from './Uploaders';

// ✅ Đã thêm prop hideMedia
export const AddQuestionForm = ({ onAdd, onCancel, hideMedia = false }) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [q, setQ] = useState({
    id: `q_${Date.now()}`,
    question: '',
    script: '', // ✅ Thêm trường script vào state khởi tạo
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
  const handleQuickFill3 = (e) => { e.preventDefault(); setQ(p => ({ ...p, options: ['A', 'B', 'C'], correct: p.correct >= 3 ? 0 : p.correct })); };
  const handleQuickFill4 = (e) => { e.preventDefault(); setQ(p => ({ ...p, options: ['A', 'B', 'C', 'D'] })); };
  const handleAddOption = (e) => { e.preventDefault(); setQ(p => ({ ...p, options: [...p.options, ''] })); };
  
  const handleRemoveOption = (e, idx) => {
    e.preventDefault();
    setQ(p => {
      if (p.options.length <= 2) return p;
      const newOpts = p.options.filter((_, i) => i !== idx);
      let newCorrect = p.correct;
      if (newCorrect === idx) newCorrect = 0;
      else if (newCorrect > idx) newCorrect--;
      return { ...p, options: newOpts, correct: newCorrect };
    });
  };

  const handleSubmit = () => {
    let finalOptions = q.options;
    const isAllEmpty = q.options.every(opt => opt.trim() === '');
    
    if (isAllEmpty) {
      finalOptions = q.options.map((_, i) => String.fromCharCode(65 + i));
    } else if (q.options.filter(opt => opt.trim() !== '').length < 2) {
        alert("Vui lòng nhập ít nhất 2 đáp án hoặc để trống toàn bộ để tự động tạo A, B, C...!");
        return;
    }
    onAdd({ ...q, options: finalOptions });
  };

  return (
    <>
      <div className="bg-white border-2 border-slate-200 border-b-[6px] rounded-[24px] p-5 sm:p-7 shadow-sm font-sans">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
          <div className="w-10 h-10 rounded-[12px] bg-[#1CB0F6] border-b-[3px] border-[#1899D6] text-white flex items-center justify-center shadow-sm"><Plus className="w-6 h-6" strokeWidth={3} /></div>
          <h4 className="text-[18px] font-nunito font-black text-slate-800 m-0">Thêm câu hỏi mới</h4>
        </div>

        <div className="space-y-6">
          <label className={`relative flex items-center justify-between cursor-pointer p-4 rounded-[20px] border-2 transition-all ${q.isExample ? 'bg-[#FFFBEA] border-[#FFD8A8]' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border-b-[3px] shadow-sm ${q.isExample ? 'bg-[#FF9600] text-white border-[#E58700]' : 'bg-white text-slate-400 border-slate-200'}`}><Star size={18} strokeWidth={3} /></div>
              <div><p className={`font-nunito font-extrabold text-[15px] leading-tight ${q.isExample ? 'text-[#FF9600]' : 'text-slate-700'}`}>Đánh dấu là câu Ví dụ</p><p className="text-[12px] font-nunito font-bold text-slate-500 mt-0.5">Không tính điểm và không đánh số.</p></div>
            </div>
            <div className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 border-2 ${q.isExample ? 'bg-[#FF9600] border-[#E58700]' : 'bg-slate-200 border-slate-300'}`}>
              <input type="checkbox" className="sr-only" checked={q.isExample} onChange={(e) => setQ(p => ({ ...p, isExample: e.target.checked }))} /><div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${q.isExample ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </label>

          {/* Ẩn Media ở câu hỏi phụ */}
          {!hideMedia && (
            <div className="flex flex-col sm:flex-row gap-4">
               <QuestionImageUploader imageUrl={q.imageUrl} imageStoragePath={q.imageStoragePath} onUpdate={(updates) => setQ(p => ({ ...p, ...updates }))} />
               <QuestionAudioUploader audioUrl={q.audioUrl} audioStoragePath={q.audioStoragePath} onUpdate={(updates) => setQ(p => ({ ...p, ...updates }))} />
            </div>
          )}

          <div>
            <label className="text-[12px] font-nunito font-black text-slate-400 uppercase tracking-widest block mb-2.5">Nội dung câu hỏi (Tùy chọn)</label>
            <textarea value={q.question} onChange={e => setQ(p => ({ ...p, question: e.target.value }))} rows={2} className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-nunito font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-slate-50 focus:bg-white resize-y transition-all placeholder:text-slate-400" placeholder="Ví dụ: What is the man doing?" />
          </div>

          {/* 🚀 THÊM Ô NHẬP TRANSCRIPT DÀNH CHO CÂU LẺ Ở ĐÂY */}
          {!hideMedia && (
            <div>
              <label className="text-[12px] font-nunito font-black text-[#1CB0F6] uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                <Volume2 size={14} strokeWidth={3} /> Transcript / Lời thoại Audio (Part 1, 2)
              </label>
              <textarea 
                value={q.script} 
                onChange={(e) => setQ(p => ({ ...p, script: e.target.value }))} 
                rows={2} 
                placeholder="Nhập Transcript... (Sẽ ẨN khi đang thi, chỉ HIỆN khi học viên xem lại đáp án)" 
                className="w-full border-2 border-[#BAE3FB] rounded-[16px] px-5 py-4 text-[14px] font-nunito font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-[#EAF6FE]/30 focus:bg-white resize-y transition-all placeholder:text-slate-400" 
              />
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center justify-between mb-2.5 gap-3">
              <label className="text-[12px] font-nunito font-black text-slate-400 uppercase tracking-widest block">Các đáp án</label>
              <div className="flex gap-2">
                <button onClick={handleQuickFill3} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFBEA] text-[#FF9600] border-2 border-[#FFD8A8] border-b-[3px] rounded-[10px] text-[11px] font-nunito font-black uppercase tracking-wider transition-all shadow-sm active:translate-y-[1px]"><Zap size={14} strokeWidth={3} /> 3 Lựa chọn</button>
                <button onClick={handleQuickFill4} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] border-b-[3px] rounded-[10px] text-[11px] font-nunito font-black uppercase tracking-wider transition-all shadow-sm active:translate-y-[1px]"><Zap size={14} strokeWidth={3} /> 4 Lựa chọn</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {q.options.map((opt, i) => {
                const isCorrect = q.correct === i;
                return (
                  <div key={i} className={`relative flex items-center gap-3 p-2 pr-12 rounded-[20px] border-2 transition-all shadow-sm ${isCorrect ? 'bg-[#f1faeb] border-[#bcf096]' : 'bg-slate-50 border-slate-200'}`}>
                    <button onClick={() => setQ(p => ({ ...p, correct: i }))} className={`w-11 h-11 rounded-[14px] flex-shrink-0 flex items-center justify-center text-[15px] font-nunito font-black transition-all border-b-[3px] ${isCorrect ? 'bg-[#58CC02] border-[#46A302] text-white shadow-sm' : 'bg-white border-slate-200 text-slate-400'}`}>{String.fromCharCode(65 + i)}</button>
                    <input value={opt} onChange={e => updateOption(i, e.target.value)} placeholder={`Lựa chọn ${String.fromCharCode(65 + i)}...`} className={`flex-1 min-w-0 border-0 px-2 py-2 text-[14px] font-nunito font-bold outline-none bg-transparent ${isCorrect ? 'text-[#46A302]' : 'text-slate-700'}`} />
                    
                    {q.options.length > 2 && (
                      <button 
                        onClick={(e) => handleRemoveOption(e, i)} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white border-2 border-slate-200 border-b-[4px] rounded-[12px] text-slate-400 hover:text-[#FF4B4B] hover:border-[#ffc1c1] hover:bg-[#fff0f0] active:border-b-[1px] active:translate-y-[2px] active:scale-95 transition-all outline-none shadow-md z-10" 
                        title="Xóa lựa chọn này"
                      >
                        <X size={18} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-3">
              <button onClick={handleAddOption} className="text-[13px] font-nunito font-bold text-[#1CB0F6] flex items-center gap-1 hover:underline outline-none">
                <Plus size={16} strokeWidth={3} /> Thêm 1 đáp án
              </button>
            </div>
          </div>

          <div>
            <label className="text-[12px] font-nunito font-black text-slate-400 uppercase tracking-widest block mb-2.5">Giải thích (tuỳ chọn)</label>
            <textarea value={q.explanation} onChange={e => setQ(p => ({ ...p, explanation: e.target.value }))} rows={2} className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-nunito font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 bg-slate-50 focus:bg-white resize-y transition-all placeholder:text-slate-400" placeholder="Giải thích cho học viên..." />
          </div>

          <div className="flex gap-4 pt-6 border-t-2 border-slate-100">
            <button onClick={() => setShowCancelConfirm(true)} className="flex-1 py-3.5 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 text-[14px] font-nunito font-black uppercase tracking-wider rounded-[16px] active:translate-y-[2px] transition-all">Hủy bỏ</button>
            <button onClick={handleSubmit} className="flex-1 py-3.5 bg-[#58CC02] border-2 border-[#46A302] border-b-[4px] text-white text-[14px] font-nunito font-black uppercase tracking-wider rounded-[16px] shadow-sm flex items-center justify-center gap-2"><Check className="w-5 h-5" strokeWidth={3} /> Thêm câu hỏi</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCancelConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
            <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCancelConfirm(false)} />
            <Motion.div initial={{ scale: 0.9, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 15 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative w-full max-w-[360px] bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-2xl p-6 text-center">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#FF4B4B] rounded-[16px] border-b-[4px] border-[#E54343] flex items-center justify-center shadow-sm"><AlertCircle size={32} strokeWidth={2.5} className="text-white" /></div>
              <div className="mt-8 mb-6"><h2 className="text-[20px] font-nunito font-black text-slate-800 mb-2">Hủy bỏ thao tác?</h2><p className="text-[14px] font-nunito font-bold text-slate-500 leading-snug">Dữ liệu vừa nhập sẽ bị mất. Bạn có chắc không?</p></div>
              <div className="flex gap-3"><button onClick={() => { setShowCancelConfirm(false); onCancel(); }} className="flex-1 py-3 bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] border-b-[4px] rounded-[14px] text-[13px] font-nunito font-black uppercase tracking-wider transition-all">Vẫn hủy</button><button onClick={() => setShowCancelConfirm(false)} className="flex-1 py-3 bg-[#1CB0F6] text-white border-2 border-[#1899D6] border-b-[4px] rounded-[14px] text-[13px] font-nunito font-black uppercase tracking-wider transition-all">Tiếp tục</button></div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
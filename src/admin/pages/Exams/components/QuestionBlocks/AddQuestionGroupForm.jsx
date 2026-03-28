import React, { useState } from 'react';
import { Layers, Check } from 'lucide-react';
import { QuestionImageUploader, QuestionAudioUploader } from './Uploaders';

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
          <h4 className="text-[18px] font-nunito font-black text-slate-800 m-0 leading-tight">Tạo Nhóm Câu Hỏi</h4>
          <p className="text-[12px] font-nunito font-bold text-slate-400 mt-1">Dùng cho đoạn văn, bài đọc hoặc đoạn hội thoại.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
           <QuestionImageUploader imageUrl={g.imageUrl} imageStoragePath={g.imageStoragePath} onUpdate={(updates) => setQG(p => ({ ...p, ...updates }))} />
           <QuestionAudioUploader audioUrl={g.audioUrl} audioStoragePath={g.audioStoragePath} onUpdate={(updates) => setQG(p => ({ ...p, ...updates }))} />
        </div>

        <div>
          <label className="text-[12px] font-nunito font-black text-[#CE82FF] uppercase tracking-widest block mb-2.5">Nội dung đoạn văn / Hội thoại</label>
          <textarea value={g.content} onChange={e => setQG(p => ({ ...p, content: e.target.value }))} rows={4} className="w-full border-2 border-slate-200 rounded-[16px] px-5 py-4 text-[14px] font-nunito font-bold text-slate-800 focus:outline-none focus:border-[#CE82FF] focus:ring-4 focus:ring-purple-500/10 bg-slate-50 focus:bg-white resize-y transition-all placeholder:text-slate-400" placeholder="VD: Questions 71-73 refer to the following email..." />
        </div>

        <div className="flex gap-4 pt-6 border-t-2 border-slate-100">
          <button onClick={onCancel} className="flex-1 py-3.5 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 text-[14px] font-nunito font-black uppercase tracking-wider rounded-[16px] active:translate-y-[2px] transition-all">Hủy bỏ</button>
          <button onClick={() => onAdd(g)} className="flex-1 py-3.5 bg-[#CE82FF] border-2 border-[#B975E5] border-b-[4px] text-white text-[14px] font-nunito font-black uppercase tracking-wider rounded-[16px] shadow-sm flex items-center justify-center gap-2"><Check className="w-5 h-5" strokeWidth={3} /> Tạo Nhóm</button>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useRef } from 'react';
import { X, Loader2, Image as ImageIcon, Music, Trash2, Volume2 } from 'lucide-react';
import { uploadImage, deleteImage, uploadAudio, deleteAudio } from '../../../../services/examService';

export const QuestionImageUploader = ({ imageUrl, imageStoragePath, onUpdate }) => {
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
      console.error("Image upload failed:", err);
      alert(`Lỗi tải ảnh: ${err.message || "Đã xảy ra lỗi"}`);
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
      <label className="text-[11px] font-nunito font-black text-slate-400 uppercase tracking-widest block mb-2">Hình ảnh minh họa</label>
      {imageUrl ? (
        <div className="relative inline-block border-2 border-slate-200 border-b-[4px] rounded-[16px] overflow-hidden group max-w-full bg-slate-50 shadow-sm p-1">
          <img src={imageUrl} alt="Question" className="w-full h-auto max-h-32 object-contain rounded-[10px]" />
          <button onClick={handleRemove} className="absolute top-2 right-2 p-1.5 bg-[#FF4B4B] text-white border-2 border-[#E54343] border-b-[3px] rounded-[10px] shadow-sm active:border-b-[1px] active:translate-y-[2px] transition-all outline-none">
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      ) : (
        <button onClick={() => !uploading && fileRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 rounded-[16px] text-[12px] font-nunito font-bold uppercase tracking-wider hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm">
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5 text-[#1CB0F6]" strokeWidth={2.5} />}
          {uploading ? 'Đang tải...' : 'Thêm ảnh'}
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
    </div>
  );
};

export const QuestionAudioUploader = ({ audioUrl, audioStoragePath, onUpdate }) => {
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
      console.error("Audio upload failed:", err);
      alert(`Lỗi tải audio: ${err.message || "Đã xảy ra lỗi"}`);
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
      <label className="text-[11px] font-nunito font-black text-slate-400 uppercase tracking-widest block mb-2">Âm thanh (Audio)</label>
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
        <button onClick={() => !uploading && fileRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-slate-200 border-b-[4px] text-slate-500 rounded-[16px] text-[12px] font-nunito font-bold uppercase tracking-wider hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm">
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5 text-[#CE82FF]" strokeWidth={2.5} />}
          {uploading ? 'Đang tải...' : 'Thêm Audio'}
        </button>
      )}
      <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={handleUpload} />
    </div>
  );
};
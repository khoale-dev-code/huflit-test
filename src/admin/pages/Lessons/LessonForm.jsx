import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ─── ICONS & ANIMATION ───
import {
  ArrowLeft, Save, BookOpen, Eye, EyeOff, LayoutTemplate, 
  Type, Link2, UploadCloud, Loader2, Trash2, AlertCircle, 
  Image as ImageIcon, ChevronDown, Youtube, PlayCircle
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// ─── SERVICES & COMPONENTS ───
import { createLesson, updateLesson, getLessonById } from '../../../data/lessonApi';
import { uploadImage, deleteImage } from '../../services/examService';

// ✅ Tích hợp component GamifiedEditor bạn đã tách ra
// (Điều chỉnh lại đường dẫn này cho khớp với cấu trúc thư mục của bạn nếu cần)
import GamifiedEditor from './GamifiedEditor'; 

/* ==============================================================================
   HELPERS
   ============================================================================== */

// Hàm trích xuất Video ID từ link YouTube
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

/* ==============================================================================
   MAIN COMPONENT: LessonForm
   ============================================================================== */

const LessonForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const fileInputRef = useRef(null);

  // States quản lý trạng thái UI
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formError, setFormError] = useState(''); 

  // State lưu trữ dữ liệu Form
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'grammar',
    content: '',
    thumbnail_url: '',
    imageStoragePath: '', 
    video_url: '',
    order_index: 1,
    is_published: true,
  });

  // Tự động tính toán YouTube ID mỗi khi video_url thay đổi
  const youtubeId = useMemo(() => getYouTubeId(formData.video_url), [formData.video_url]);

  // Regex tạo Slug sạch, chuẩn SEO
  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '') 
      .replace(/--+/g, '-')    
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      // Chỉ tự động generate slug khi tạo bài mới
      slug: !isEditMode ? generateSlug(newTitle) : prev.slug 
    }));
    if (formError) setFormError(''); 
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formError) setFormError('');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setFormError('');
    try {
      // Tải ảnh bìa lên (thư mục 'lesson')
      const result = await uploadImage(file, 'new', 'lesson');
      setFormData(prev => ({ 
        ...prev, 
        thumbnail_url: result.url,
        imageStoragePath: result.path 
      }));
    } catch {
      setFormError('Lỗi khi tải ảnh bìa lên!');
    } finally {
      setIsUploadingImage(false);
      e.target.value = ''; 
    }
  };

  const handleRemoveImage = async () => {
    if (formData.imageStoragePath) {
      try {
        await deleteImage(formData.imageStoragePath);
      } catch (error) {
        console.error("Lỗi xóa ảnh gốc:", error);
      }
    }
    setFormData(prev => ({ ...prev, thumbnail_url: '', imageStoragePath: '' }));
  };

  // Fetch dữ liệu nếu ở chế độ Edit
  useEffect(() => {
    if (isEditMode) {
      const fetchLesson = async () => {
        try {
          const data = await getLessonById(id);
          if (data) setFormData(data);
        } catch {
          setFormError('Không thể tải dữ liệu bài học!');
        } finally {
          setIsLoading(false);
        }
      };
      fetchLesson();
    }
  }, [id, isEditMode]);

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) {
      setFormError('Vui lòng nhập đầy đủ Tiêu đề và Đường dẫn (Slug)!');
      return;
    }

    setIsSaving(true);
    setFormError('');
    try {
      // Bóc tách dữ liệu rác trước khi gửi lên API để tránh lỗi Supabase
      const { 
        id: _ID, 
        created_at: _CREATED, 
        updated_at: _UPDATED, 
        imageStoragePath: _PATH, 
        ...cleanData 
      } = formData;
      
      if (isEditMode) {
        await updateLesson(id, cleanData);
      } else {
        await createLesson(cleanData);
      }
      navigate('/admin/lessons');
    } catch {
      setFormError('Đã xảy ra lỗi hệ thống khi lưu bài học!');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── RENDERING ───

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex flex-col items-center justify-center font-nunito selection:bg-[#1CB0F6] selection:text-white">
        <div className="w-16 h-16 border-[6px] border-[#EAF6FE] border-t-[#1CB0F6] rounded-full animate-spin mb-5" />
        <h3 className="text-[18px] font-black text-slate-600">Đang chuẩn bị không gian làm việc...</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-4 md:p-8 xl:p-10 font-nunito selection:bg-[#1CB0F6] selection:text-white">
      <div className="max-w-7xl mx-auto pb-16">
        
        {/* HEADER 3D */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-6 rounded-3xl border-2 border-slate-200 border-b-[6px] shadow-sm">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate('/admin/lessons')}
              title="Quay lại danh sách"
              className="w-14 h-14 bg-white rounded-2xl border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-[#BAE3FB] active:border-b-2 active:translate-y-[2px] shadow-sm shrink-0 transition-all outline-none"
            >
              <ArrowLeft size={28} strokeWidth={3} />
            </button>
            <div>
              <h1 className="text-[28px] md:text-[34px] font-black text-slate-800 leading-tight">
                {isEditMode ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}
              </h1>
              <p className="text-[15px] font-bold text-slate-400 mt-1">Nội dung bài soạn sẽ được lưu vào hệ thống</p>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col items-end gap-2.5">
            <button
              onClick={handleSave}
              disabled={isSaving || isUploadingImage}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#1CB0F6] text-white px-8 py-4 rounded-2xl font-black text-[16px] uppercase tracking-widest border-2 border-[#1899D6] border-b-[6px] hover:brightness-105 active:border-b-2 active:translate-y-[4px] shadow-sm disabled:opacity-60 transition-all outline-none"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} strokeWidth={3} /> : <Save size={20} strokeWidth={3} />}
              Lưu Bài Học
            </button>
            
            {/* Thông báo lỗi UI */}
            <AnimatePresence>
              {formError && (
                <Motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-[#FF4B4B] text-[14px] font-bold bg-[#FFF0F0] px-4 py-1.5 rounded-lg border border-[#ffd6d6] shadow-inner"
                >
                  <AlertCircle size={15} strokeWidth={3} /> {formError}
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CỘT TRÁI: Nhập liệu chính */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-7 sm:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm space-y-6 hover:border-slate-300 transition-colors">
              
              {/* 1. Tiêu đề */}
              <div>
                <label className="flex items-center gap-2.5 text-[12px] font-black text-slate-500 uppercase tracking-widest mb-3.5">
                  <Type size={16} className="text-[#1CB0F6]" strokeWidth={3} /> Tiêu đề bài học *
                </label>
                <input
                  type="text" name="title" value={formData.title} onChange={handleTitleChange} placeholder="Ví dụ: Thì Hiện Tại Đơn"
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl font-bold text-[18px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#1CB0F6] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                />
              </div>

              {/* 2. Đường dẫn tĩnh (Slug) */}
              <div>
                <label className="flex items-center gap-2.5 text-[12px] font-black text-slate-500 uppercase tracking-widest mb-3.5">
                  <Link2 size={16} className="text-[#1CB0F6]" strokeWidth={3} /> Đường dẫn tĩnh (Slug) *
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#1CB0F6] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-inner hover:border-slate-300">
                  <span className="px-5 py-4 bg-slate-100 border-r-2 border-slate-200 text-slate-500 font-bold text-[15px]">
                    huflit.edu.vn/learn/
                  </span>
                  <input
                    type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="thi-hien-tai-don"
                    className="flex-1 bg-transparent px-5 py-4 font-bold text-[16px] text-slate-700 placeholder:text-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* 3. Link Video YouTube (Tùy chọn) kèm Thumbnail Preview */}
              <div>
                <label className="flex items-center gap-2.5 text-[12px] font-black text-slate-500 uppercase tracking-widest mb-3.5">
                  <Youtube size={16} className="text-[#FF0000]" strokeWidth={3} /> 
                  Video Bài Giảng 
                  <span className="text-[11px] text-slate-400 normal-case tracking-normal">(Tùy chọn)</span>
                </label>
                <input
                  type="text" name="video_url" value={formData.video_url} onChange={handleChange} placeholder="Dán link YouTube vào đây..."
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl font-bold text-[16px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#FF0000] focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all shadow-inner"
                />
                
                {/* HIỆU ỨNG NẢY THUMBNAIL YOUTUBE */}
                <AnimatePresence>
                  {youtubeId && (
                    <Motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="relative aspect-video rounded-2xl border-2 border-slate-200 border-b-[4px] bg-slate-100 overflow-hidden shadow-sm group">
                        {/* Ảnh Thumbnail maxres từ server YouTube */}
                        <img 
                          src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`} 
                          onError={(e) => {
                            // Fallback nếu video không có maxresdefault
                            e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                          }}
                          alt="YouTube Thumbnail Preview" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay giả lập Play Button */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white/20">
                            <PlayCircle size={36} className="ml-1" strokeWidth={2.5} />
                          </div>
                        </div>
                        {/* Nút xóa link */}
                        <button 
                          onClick={() => setFormData(p => ({ ...p, video_url: '' }))}
                          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white transition-colors shadow-sm outline-none"
                          title="Gỡ bỏ video"
                        >
                          <Trash2 size={16} strokeWidth={3} />
                        </button>
                      </div>
                    </Motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* Khung Editor đã được tách riêng */}
            <div className="space-y-4">
              <label className="flex items-center gap-2.5 text-[12px] font-black text-slate-500 uppercase tracking-widest px-2">
                <LayoutTemplate size={16} className="text-[#1CB0F6]" strokeWidth={3} /> Nội dung bài giảng
              </label>
              
              <GamifiedEditor 
                value={formData.content} 
                onChange={(val) => setFormData(prev => ({ ...prev, content: val }))} 
              />
            </div>
          </div>

          {/* CỘT PHẢI: Cài đặt phụ */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Switch Xuất bản 3D */}
            <div className="bg-white p-7 sm:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-2.5 text-[12px] font-black text-slate-500 uppercase tracking-widest mb-4">
                Trạng thái hiển thị
              </div>
              <label className={`relative flex items-center justify-between cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                formData.is_published ? 'bg-[#f1faeb] border-[#58CC02] border-b-4' : 'bg-slate-50 border-slate-200 border-b-4'
              }`}>
                <div className="flex items-center gap-3.5">
                  <AnimatePresence mode="wait">
                    {formData.is_published 
                      ? <Motion.div key="eye" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-[#58CC02]"><Eye size={24} strokeWidth={3} /></Motion.div>
                      : <Motion.div key="eyeoff" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-slate-400"><EyeOff size={24} strokeWidth={3} /></Motion.div>}
                  </AnimatePresence>
                  <span className={`font-black text-[16px] ${formData.is_published ? 'text-green-900' : 'text-slate-600'}`}>
                    {formData.is_published ? 'Đang xuất bản' : 'Lưu nháp'}
                  </span>
                </div>
                <input type="checkbox" name="is_published" className="sr-only" checked={formData.is_published} onChange={handleChange} />
                <div className={`w-14 h-8 rounded-full p-1 transition-colors relative ${formData.is_published ? 'bg-[#58CC02]' : 'bg-slate-200'}`}>
                  <Motion.div className="bg-white w-6 h-6 rounded-full shadow-md" animate={{ x: formData.is_published ? 24 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                </div>
              </label>
            </div>

            {/* Chuyên mục Select 3D */}
            <div className="bg-white p-7 sm:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm hover:border-slate-300 transition-colors">
              <label className="flex items-center gap-2.5 text-[12px] font-black text-slate-500 mb-4 uppercase tracking-widest">
                <BookOpen size={16} className="text-[#1CB0F6]" strokeWidth={3} /> Chuyên mục
              </label>
              <div className="relative">
                <select
                  name="category" value={formData.category} onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 border-b-[4px] p-4 rounded-2xl font-bold focus:outline-none focus:border-[#CE82FF] focus:bg-white active:translate-y-[2px] active:border-b-2 transition-all appearance-none cursor-pointer shadow-inner text-slate-800"
                >
                  <option value="grammar">Ngữ pháp</option>
                  <option value="vocabulary">Từ vựng</option>
                  <option value="tips">Mẹo làm bài</option>
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" strokeWidth={3} />
              </div>
            </div>

            {/* Upload Ảnh bìa 3D */}
            <div className="bg-white p-7 sm:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm space-y-4 hover:border-slate-300 transition-colors">
               <label className="flex items-center gap-2.5 text-[12px] font-black text-slate-500 uppercase tracking-widest">
                <ImageIcon size={16} className="text-[#58CC02]" strokeWidth={3} /> Ảnh bìa bài học
              </label>
              
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
              
              {isUploadingImage ? (
                 <div className="w-full aspect-video border-2 border-slate-200 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-inner">
                    <Loader2 size={28} className="text-[#1CB0F6] animate-spin" strokeWidth={3} />
                    <span className="text-[13px] font-bold text-slate-400">Đang tải lên...</span>
                 </div>
              ) : formData.thumbnail_url ? (
                <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-video rounded-2xl overflow-hidden group border-2 border-slate-200 border-b-[4px] shadow-inner bg-slate-100">
                  <img src={formData.thumbnail_url} alt="Thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity backdrop-blur-[2px]">
                    <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-white rounded-xl text-[#1CB0F6] font-black tracking-wide text-[13px] uppercase shadow-sm active:scale-95 transition-transform outline-none">Đổi ảnh</button>
                    <button onClick={handleRemoveImage} className="p-2.5 bg-[#FF4B4B] rounded-xl text-white border-b-4 border-[#c93535] active:translate-y-[2px] active:border-b-2 shadow-sm outline-none"><Trash2 size={18} strokeWidth={3}/></button>
                  </div>
                </Motion.div>
              ) : (
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="w-full aspect-video border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#1CB0F6] hover:bg-[#EAF6FE] hover:shadow-inner transition-all group outline-none"
                >
                  <UploadCloud size={32} className="text-slate-400 group-hover:text-[#1CB0F6]" strokeWidth={2.5} />
                  <span className="text-[14px] font-bold text-slate-500 group-hover:text-[#1CB0F6]">Tải ảnh bìa (16:9)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tối ưu scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default LessonForm;
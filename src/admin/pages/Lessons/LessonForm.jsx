import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ✅ SỬ DỤNG BẢN REACT-QUILL-NEW DÀNH CHO REACT ĐỜI MỚI
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 

import { ArrowLeft, Save, Image, Link as LinkIcon, BookOpen, Hash, Eye, EyeOff, LayoutTemplate, Type, Link2 } from 'lucide-react';
import { createLesson, updateLesson, getLessonById } from '../../../data/lessonApi';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// CSS NÂNG CẤP CHO REACT-QUILL (CHUẨN GAMIFICATION)
// Đồng bộ 100% với trang hiển thị (LessonDetails)
// ==========================================
const STYLE_ID = '__quill_custom_styles__';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    .quill-custom .ql-toolbar {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background-color: #F8FAFC;
      border: 2px solid #E2E8F0;
      border-bottom: none;
      padding: 14px 20px;
      font-family: 'Be Vietnam Pro', sans-serif;
    }
    .quill-custom .ql-container {
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      border: 2px solid #E2E8F0;
      border-bottom-width: 6px;
      font-family: 'Be Vietnam Pro', sans-serif;
      font-size: 16px;
      font-weight: 500;
      background-color: #FFFFFF;
      min-height: 450px;
      transition: all 0.2s ease;
    }
    .quill-custom .ql-container.ql-focus {
      border-color: #1CB0F6;
      background-color: #FFFFFF;
    }
    .quill-custom .ql-editor {
      padding: 28px;
      line-height: 1.8;
      color: #334155;
    }
    
    /* 🔥 FIX LỖI LẸM CHỮ NGAY TRONG LÚC SOẠN THẢO */
    .quill-custom .ql-editor > *:first-child {
      margin-top: 0 !important;
    }

    /* Style chuẩn Game cho Admin dễ nhìn */
    .quill-custom .ql-editor h1, 
    .quill-custom .ql-editor h2, 
    .quill-custom .ql-editor h3 {
      font-family: 'Baloo 2', cursive, sans-serif;
      font-weight: 800;
      color: #0F172A;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      line-height: 1.3;
    }
    .quill-custom .ql-editor h1 { font-size: 32px; color: #1CB0F6; }
    .quill-custom .ql-editor h2 { font-size: 26px; border-bottom: 3px solid #E2E8F0; padding-bottom: 8px; }
    .quill-custom .ql-editor h3 { font-size: 20px; }
    
    .quill-custom .ql-editor a {
      color: #1CB0F6; font-weight: 700; text-decoration: none; border-bottom: 2px solid #BAE3FB;
    }
    
    .quill-custom .ql-editor blockquote {
      margin: 1.5em 0;
      padding: 16px 24px;
      background-color: #FFFBEA;
      border: 2px solid #FFE380;
      border-left-width: 6px;
      border-left-color: #FFC200;
      border-radius: 16px;
      font-style: italic;
      color: #B28600;
      font-weight: 700;
    }
  `;
  document.head.appendChild(s);
}

const LessonForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'grammar',
    content: '',
    thumbnail_url: '',
    video_url: '',
    order_index: 1,
    is_published: true,
  });

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: !isEditMode ? generateSlug(newTitle) : prev.slug 
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchLesson = async () => {
        try {
          const data = await getLessonById(id);
          if (data) setFormData(data);
        } catch (error) {
          console.error("Lỗi tải bài học:", error);
          alert("Không thể tải dữ liệu bài học!");
        } finally {
          setIsLoading(false);
        }
      };
      fetchLesson();
    }
  }, [id, isEditMode]);

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert('Vui lòng nhập đầy đủ Tiêu đề và Đường dẫn (Slug)!');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditMode) {
        await updateLesson(id, formData);
      } else {
        await createLesson(formData);
      }
      navigate('/admin/lessons');
    } catch (error) {
      console.error("Lỗi lưu bài học:", error);
      alert("Đã xảy ra lỗi khi lưu bài học. Hãy kiểm tra lại Slug xem có bị trùng không!");
    } finally {
      setIsSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex flex-col items-center justify-center selection:bg-blue-200">
        <div className="w-16 h-16 border-[6px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin mb-4" />
        <h3 className="text-[18px] font-display font-extrabold text-slate-600">Đang chuẩn bị không gian làm việc...</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-4 md:p-8 xl:p-10 selection:bg-blue-200 font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-10">
          <div className="flex items-center gap-4 md:gap-5">
            <button 
              onClick={() => navigate('/admin/lessons')}
              className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-[16px] border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm shrink-0"
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-[26px] md:text-[32px] font-display font-black text-slate-800 leading-tight">
                {isEditMode ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}
              </h1>
              <p className="text-[14px] md:text-[15px] font-body font-bold text-slate-500 mt-1">
                {isEditMode ? 'Cập nhật lại kiến thức cho học viên' : 'Thiết kế nội dung bài giảng thật sinh động nhé'}
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#1CB0F6] text-white px-8 py-4 rounded-[20px] font-display font-bold text-[16px] md:text-[18px] uppercase tracking-wider border-2 border-[#1899D6] border-b-[6px] hover:bg-[#1899D6] hover:translate-y-[2px] hover:border-b-[4px] active:border-b-0 active:translate-y-[6px] transition-all outline-none shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:border-b-[6px]"
          >
            {isSaving ? (
              <><div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" /> Đang lưu...</>
            ) : (
              <><Save size={22} strokeWidth={2.5} /> Lưu Bài Học</>
            )}
          </button>
        </div>

        {/* ── MAIN CONTENT (GRID 2 CỘT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* ── CỘT TRÁI: NỘI DUNG CHÍNH (Chiếm 8 cột) ── */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            
            {/* Box Tiêu đề & Slug */}
            <div className="bg-white p-6 md:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm space-y-6">
              
              <div>
                <label className="flex items-center gap-2 text-[13px] font-display font-black text-slate-500 uppercase tracking-widest mb-3">
                  <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg"><Type size={16} strokeWidth={3} /></div>
                  Tiêu đề bài học <span className="text-red-500 text-lg leading-none">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="VD: Tuyệt chiêu chinh phục Part 1 TOEIC..."
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-[20px] font-body font-bold text-[16px] md:text-[18px] text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[13px] font-display font-black text-slate-500 uppercase tracking-widest mb-3">
                  <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg"><Link2 size={16} strokeWidth={3} /></div>
                  Đường dẫn tĩnh (Slug) <span className="text-red-500 text-lg leading-none">*</span>
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center bg-slate-50 border-2 border-slate-200 rounded-[20px] overflow-hidden focus-within:border-[#1CB0F6] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                  <span className="px-4 py-3 sm:py-4 bg-slate-100 border-b-2 sm:border-b-0 sm:border-r-2 border-slate-200 text-slate-500 font-body font-bold text-[14px] md:text-[15px] shrink-0">
                    huflit.edu.vn/learn/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="tuyet-chieu-part-1"
                    className="flex-1 bg-transparent px-4 py-3 sm:py-4 font-body font-bold text-[15px] md:text-[16px] text-slate-700 focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Box Trình Soạn Thảo (React Quill) */}
            <div className="bg-white p-6 md:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm">
              <label className="flex items-center gap-2 text-[13px] font-display font-black text-slate-500 uppercase tracking-widest mb-4">
                <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg"><LayoutTemplate size={16} strokeWidth={3} /></div>
                Nội dung bài giảng
              </label>
              
              <div className="quill-custom">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                  modules={quillModules}
                  placeholder="Bắt đầu viết nội dung bài giảng tại đây..."
                />
              </div>
            </div>
          </div>

          {/* ── CỘT PHẢI: CÀI ĐẶT PHỤ (Chiếm 4 cột) ── */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            
            {/* Card Trạng thái Xuất bản */}
            <div className="bg-white p-6 md:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm">
              <h3 className="text-[18px] font-display font-black text-slate-800 mb-4">
                Trạng thái hiển thị
              </h3>
              
              <label className={`relative flex items-center justify-between cursor-pointer p-4 rounded-[20px] border-2 transition-all ${
                formData.is_published ? 'bg-[#f1faeb] border-[#58CC02]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border-b-[3px] shadow-sm ${
                    formData.is_published ? 'bg-[#58CC02] text-white border-[#46A302]' : 'bg-slate-200 text-slate-500 border-slate-300'
                  }`}>
                    {formData.is_published ? <Eye size={22} strokeWidth={2.5} /> : <EyeOff size={22} strokeWidth={2.5} />}
                  </div>
                  <div>
                    <p className={`font-display font-extrabold text-[16px] leading-tight ${formData.is_published ? 'text-green-800' : 'text-slate-700'}`}>
                      {formData.is_published ? 'Đang xuất bản' : 'Lưu nháp (Ẩn)'}
                    </p>
                    <p className="text-[12px] font-body font-bold text-slate-500 mt-0.5">
                      {formData.is_published ? 'Học viên có thể xem' : 'Chỉ Admin thấy'}
                    </p>
                  </div>
                </div>
                
                {/* Custom Toggle Switch (Gamified) */}
                <div className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 border-2 ${
                  formData.is_published ? 'bg-[#58CC02] border-[#46A302]' : 'bg-slate-200 border-slate-300'
                }`}>
                  <input 
                    type="checkbox" name="is_published" 
                    className="sr-only" 
                    checked={formData.is_published} onChange={handleChange} 
                  />
                  <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ${formData.is_published ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </div>

            {/* Card Phân loại & Thứ tự */}
            <div className="bg-white p-6 md:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm space-y-6">
              
              <div>
                <label className="flex items-center gap-2 text-[12px] font-display font-black text-slate-500 uppercase tracking-widest mb-3">
                  <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg"><BookOpen size={16} strokeWidth={3} /></div>
                  Chuyên mục
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-[20px] font-body font-bold text-[15px] text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10 appearance-none cursor-pointer transition-all"
                  >
                    <option value="grammar">Ngữ pháp (Grammar)</option>
                    <option value="vocabulary">Từ vựng (Vocabulary)</option>
                    <option value="tips">Mẹo làm bài (Tips)</option>
                    <option value="strategy">Chiến thuật (Strategy)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[12px] font-display font-black text-slate-500 uppercase tracking-widest mb-3">
                  <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg"><Hash size={16} strokeWidth={3} /></div>
                  Thứ tự hiển thị
                </label>
                <input
                  type="number"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-[20px] font-body font-bold text-[16px] text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all"
                />
                <p className="text-[12px] font-body font-bold text-slate-400 mt-2 pl-2">Số càng nhỏ, bài học xếp càng lên trên.</p>
              </div>

            </div>

            {/* Card Media (Ảnh & Video) */}
            <div className="bg-white p-6 md:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm space-y-6">
              
              <div>
                <label className="flex items-center gap-2 text-[12px] font-display font-black text-slate-500 uppercase tracking-widest mb-3">
                  <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg"><Image size={16} strokeWidth={3} /></div>
                  Ảnh Bìa (Link)
                </label>
                <input
                  type="text" name="thumbnail_url"
                  value={formData.thumbnail_url} onChange={handleChange}
                  placeholder="https://.../image.jpg"
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-[20px] font-body font-medium text-[14px] text-slate-700 focus:outline-none focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-500/10 transition-all placeholder:text-slate-400"
                />
                <AnimatePresence>
                  {formData.thumbnail_url && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, mt: 0 }} animate={{ opacity: 1, height: 'auto', mt: 12 }} exit={{ opacity: 0, height: 0, mt: 0 }}
                      className="w-full aspect-video rounded-[16px] overflow-hidden border-2 border-slate-200 border-b-[4px] shadow-sm bg-slate-100"
                    >
                      <img src={formData.thumbnail_url} alt="Thumbnail preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 border-t-2 border-slate-100">
                <label className="flex items-center gap-2 text-[12px] font-display font-black text-slate-500 uppercase tracking-widest mb-3">
                  <div className="p-1.5 bg-red-100 text-red-600 rounded-lg"><LinkIcon size={16} strokeWidth={3} /></div>
                  Link YouTube (Tùy chọn)
                </label>
                <input
                  type="text" name="video_url"
                  value={formData.video_url} onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-[20px] font-body font-medium text-[14px] text-slate-700 focus:outline-none focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all placeholder:text-slate-400"
                />
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LessonForm;
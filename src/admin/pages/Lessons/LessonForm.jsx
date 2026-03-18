import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ✅ SỬ DỤNG BẢN REACT-QUILL-NEW DÀNH CHO REACT ĐỜI MỚI
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 

import { ArrowLeft, Save, Image, Link as LinkIcon, BookOpen, Hash, Eye, EyeOff, LayoutTemplate, Type, Link2, UploadCloud, Loader2, Trash2 } from 'lucide-react';
import { createLesson, updateLesson, getLessonById } from '../../../data/lessonApi';

import { uploadImage, deleteImage } from '../../services/examService'; 

import { motion as Motion, AnimatePresence } from 'framer-motion'; // 🚀 FIX 1: Đổi thành Motion

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
    }
    .quill-custom .ql-container {
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      border: 2px solid #E2E8F0;
      border-bottom-width: 6px;
      background-color: #FFFFFF;
      min-height: 450px;
    }
    .quill-custom .ql-editor h1 { font-size: 32px; color: #1CB0F6; font-family: 'Baloo 2'; }
    .quill-custom .ql-editor h2 { font-size: 26px; border-bottom: 3px solid #E2E8F0; padding-bottom: 8px; font-family: 'Baloo 2'; }
  `;
  document.head.appendChild(s);
}

const LessonForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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

  // 🚀 FIX 2: Sửa lỗi Unnecessary escape character trong Regex
  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '') // Bỏ gạch chéo trước dấu gạch ngang
      .replace(/--+/g, '-')    // Bỏ gạch chéo trước dấu gạch ngang
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

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const result = await uploadImage(file, 'new', 'lesson');
      setFormData(prev => ({ 
        ...prev, 
        thumbnail_url: result.url,
        imageStoragePath: result.path 
      }));
    } catch (error) {
      console.error("Lỗi upload:", error);
      alert('Đã xảy ra lỗi khi tải ảnh lên!');
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
        console.error("Lỗi khi xóa ảnh:", error);
      }
    }
    setFormData(prev => ({ ...prev, thumbnail_url: '', imageStoragePath: '' }));
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchLesson = async () => {
        try {
          const data = await getLessonById(id);
          if (data) setFormData(data);
        } catch (error) {
          console.error("Lỗi tải bài học:", error);
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
      // 🚀 FIX 3: Đặt tên biến unused theo quy tắc /^[A-Z_]/u
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
    } catch (error) {
      console.error("Lỗi lưu bài học:", error);
      alert("Đã xảy ra lỗi khi lưu bài học!");
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
    <div className="min-h-screen bg-[#F4F7FA] p-4 md:p-8 xl:p-10 selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate('/admin/lessons')}
              className="w-12 h-12 bg-white rounded-[16px] border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-500 hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] shadow-sm shrink-0"
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-[26px] md:text-[32px] font-display font-black text-slate-800 leading-tight">
                {isEditMode ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}
              </h1>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving || isUploadingImage}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#1CB0F6] text-white px-8 py-4 rounded-[20px] font-display font-bold text-[18px] uppercase border-2 border-[#1899D6] border-b-[6px] hover:bg-[#1899D6] active:border-b-0 active:translate-y-[6px] shadow-sm disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : <Save size={22} strokeWidth={2.5} />}
            Lưu Bài Học
          </button>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[13px] font-display font-black text-slate-500 uppercase tracking-widest mb-3">
                  <Type size={16} strokeWidth={3} /> Tiêu đề bài học *
                </label>
                <input
                  type="text" name="title" value={formData.title} onChange={handleTitleChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-[20px] font-body font-bold text-[18px] text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[13px] font-display font-black text-slate-500 uppercase tracking-widest mb-3">
                  <Link2 size={16} strokeWidth={3} /> Đường dẫn tĩnh (Slug) *
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center bg-slate-50 border-2 border-slate-200 rounded-[20px] overflow-hidden focus-within:border-[#1CB0F6] focus-within:bg-white transition-all">
                  <span className="px-4 py-4 bg-slate-100 border-r-2 border-slate-200 text-slate-500 font-body font-bold text-[15px]">
                    huflit.edu.vn/learn/
                  </span>
                  <input
                    type="text" name="slug" value={formData.slug} onChange={handleChange}
                    className="flex-1 bg-transparent px-4 py-4 font-body font-bold text-[16px] text-slate-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm">
              <label className="flex items-center gap-2 text-[13px] font-display font-black text-slate-500 uppercase tracking-widest mb-4">
                <LayoutTemplate size={16} strokeWidth={3} /> Nội dung bài giảng
              </label>
              <div className="quill-custom">
                <ReactQuill
                  theme="snow" value={formData.content}
                  onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                  modules={quillModules}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm">
              <label className={`relative flex items-center justify-between cursor-pointer p-4 rounded-[20px] border-2 transition-all ${
                formData.is_published ? 'bg-[#f1faeb] border-[#58CC02]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  {formData.is_published ? <Eye size={22} /> : <EyeOff size={22} />}
                  <span className="font-display font-extrabold">{formData.is_published ? 'Đang xuất bản' : 'Lưu nháp'}</span>
                </div>
                <input 
                  type="checkbox" name="is_published" className="sr-only" 
                  checked={formData.is_published} onChange={handleChange} 
                />
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.is_published ? 'bg-[#58CC02]' : 'bg-slate-200'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${formData.is_published ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </label>
            </div>

            <div className="bg-white p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[12px] font-display font-black text-slate-500 mb-3 uppercase tracking-widest">
                  <BookOpen size={16} strokeWidth={3} /> Chuyên mục
                </label>
                <select
                  name="category" value={formData.category} onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-[20px] font-body font-bold focus:outline-none focus:border-purple-400 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="grammar">Ngữ pháp</option>
                  <option value="vocabulary">Từ vựng</option>
                  <option value="tips">Mẹo làm bài</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm">
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
              {formData.thumbnail_url ? (
                <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-video rounded-[20px] overflow-hidden group border-2">
                  <img src={formData.thumbnail_url} alt="Thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                    <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white rounded-lg text-blue-600">Đổi</button>
                    <button onClick={handleRemoveImage} className="p-2 bg-red-500 rounded-lg text-white"><Trash2 size={18} /></button>
                  </div>
                </Motion.div>
              ) : (
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="w-full aspect-video border-2 border-dashed rounded-[20px] flex flex-col items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  <UploadCloud size={32} className="text-slate-400" />
                  <span className="text-[14px] font-bold text-slate-500">Tải ảnh bìa</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonForm;
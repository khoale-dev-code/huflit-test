// src/admin/pages/Exams/EditExam.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save, Loader2, AlertTriangle, FileText, 
  Headphones, BookOpen, Clock, Eye, Plus, 
  Trash2, PenTool, Mic, ArrowLeft, GripVertical,
  ChevronUp, ChevronDown, LayoutTemplate, Settings, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById, updateExam, uploadAudio, deleteAudio } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import PartPanel from './components/PartPanel';
import { logAdminAction } from '../../utils/adminLogger';

// ── CẤU TRÚC DANH MỤC & FORM ──
export const EXAM_CATEGORIES = [
  { value: 'toeic',  label: 'Luyện thi TOEIC' },
  { value: 'ielts',  label: 'Luyện thi IELTS' },
  { value: 'huflit', label: 'Đề thi trường HUFLIT' },
  { value: 'thpt',   label: 'Đề thi THPT Quốc Gia' },
  { value: 'other',  label: 'Khác / Chưa phân loại' },
];

const PART_TYPES = [
  { type: 'listening', label: 'Listening', icon: Headphones, color: 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB] hover:bg-[#1CB0F6] hover:text-white hover:border-[#1899D6]' },
  { type: 'reading',   label: 'Reading',   icon: BookOpen,   color: 'bg-emerald-50 text-[#58CC02] border-emerald-200 hover:bg-[#58CC02] hover:text-white hover:border-[#46A302]' },
  { type: 'writing',   label: 'Writing',   icon: PenTool,    color: 'bg-[#FFC800]/10 text-[#FF9600] border-[#FFC800]/40 hover:bg-[#FFC800] hover:text-white hover:border-[#E5B400]' },
  { type: 'speaking',  label: 'Speaking',  icon: Mic,        color: 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-500 hover:text-white hover:border-purple-600' },
];

const EditExam = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [form,            setForm]           = useState(null);
  const [fetchLoading,    setFetchLoading]   = useState(true);
  const [saving,          setSaving]         = useState(false);
  const [error,           setError]          = useState(null);
  const [activeTab,       setActiveTab]      = useState('info');
  const [expandedPart,    setExpandedPart]   = useState(null);
  const [uploadProgress,  setUploadProgress] = useState({});
  const [sidebarOpen,     setSidebarOpen]    = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const load = async () => {
      setFetchLoading(true);
      try {
        const exam = await getExamById(id);
        let loadedParts = [];
        if (Array.isArray(exam.parts)) {
          loadedParts = exam.parts;
        } else if (exam.parts && typeof exam.parts === 'object') {
          loadedParts = Object.entries(exam.parts).map(([key, val]) => {
            let type = val.type;
            if (!type) {
              if (['part1', 'part2', 'part3', 'part4'].includes(key)) type = 'listening';
              else type = 'reading';
            }
            return { ...val, id: key, type };
          });
        }

        setForm({
          title:       exam.title       ?? '',
          description: exam.description ?? '',
          category:    exam.category    ?? 'other',
          duration:    exam.duration    ?? 90,
          showResults: exam.showResults ?? true,
          metadata:    exam.metadata    ?? {},
          parts:       loadedParts,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetchLoading(false);
      }
    };
    load();
  }, [id]);

  const updateForm = (field, value) => setForm(p => ({ ...p, [field]: value }));

  const addNewPart = (type) => {
    const newPart = {
      id: `part_${Date.now()}`,
      title: `Phần ${form.parts.length + 1}`,
      type: type,
      instruction: '',
      questions: []
    };
    setForm(p => ({ ...p, parts: [...p.parts, newPart] }));
    setExpandedPart(newPart.id);
  };

  const removePart = (partId) => {
    if(!window.confirm("Xóa phần thi này sẽ mất toàn bộ câu hỏi. Bạn chắc chắn chứ?")) return;
    setForm(p => ({ ...p, parts: p.parts.filter(pt => pt.id !== partId) }));
  };

  const movePart = (index, direction) => {
    const newParts = [...form.parts];
    if (direction === 'up' && index > 0) {
      [newParts[index - 1], newParts[index]] = [newParts[index], newParts[index - 1]];
    } else if (direction === 'down' && index < newParts.length - 1) {
      [newParts[index + 1], newParts[index]] = [newParts[index], newParts[index + 1]];
    }
    setForm(p => ({ ...p, parts: newParts }));
  };

  const updatePart = (partId, updates) => {
    setForm(p => ({
      ...p,
      parts: p.parts.map(pt => pt.id === partId ? { ...pt, ...updates } : pt)
    }));
  };

  const addQuestion = (partId, question) => {
    setForm(p => ({
      ...p,
      parts: p.parts.map(pt => pt.id === partId ? { ...pt, questions: [...(pt.questions || []), { id: `q_${Date.now()}`, ...question }] } : pt)
    }));
  };

  const removeQuestion = (partId, qId) => {
    setForm(p => ({
      ...p,
      parts: p.parts.map(pt => pt.id === partId ? { ...pt, questions: pt.questions.filter(q => q.id !== qId) } : pt)
    }));
  };

  const updateQuestion = (partId, qId, updates) => {
    setForm(p => ({
      ...p,
      parts: p.parts.map(pt => {
        if (pt.id === partId) {
          return { ...pt, questions: pt.questions.map(q => q.id === qId ? { ...q, ...updates } : q) };
        }
        return pt;
      })
    }));
  };

  const handleAudioUpload = async (partId, file) => {
    setUploadProgress(p => ({ ...p, [partId]: 0 }));
    try {
      const result = await uploadAudio(file, id, partId, pct => setUploadProgress(p => ({ ...p, [partId]: pct })));
      updatePart(partId, { audioUrl: result.url, audioStoragePath: result.path, audioName: result.name });
    } catch (err) {
      setError(`Upload thất bại: ${err.message}`);
    } finally {
      setUploadProgress(p => { const n = { ...p }; delete n[partId]; return n; });
    }
  };

  const handleAudioDelete = async (partId, storagePath) => {
    if (storagePath) await deleteAudio(storagePath);
    updatePart(partId, { audioUrl: '', audioStoragePath: '', audioName: '' });
  };

  const handleSave = async () => {
    if (!form.title.trim()) { 
      setError('Vui lòng nhập Tiêu đề bộ đề!'); 
      setActiveTab('info');
      return; 
    }
    if (form.parts.length === 0) { 
      setError('Bộ đề phải có ít nhất 1 phần thi!'); 
      setActiveTab('builder');
      return; 
    }
    
    setSaving(true); setError(null);
    try {
      await updateExam(id, form);
      if (admin) {
        await logAdminAction(admin.id, admin.email, 'UPDATE_EXAM', `Đề thi: ${form.title}`);
      }
      navigate(`/admin/exams/detail/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (fetchLoading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F4F7FA] selection:bg-blue-200 flex-col gap-3">
      <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <h3 className="text-[16px] font-display font-bold text-slate-600">Đang tải dữ liệu...</h3>
    </div>
  );

  if (!form) return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F4F7FA]">
      <div className="text-center bg-white p-6 rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-sm max-w-sm">
        <AlertTriangle className="w-12 h-12 text-[#FF4B4B] mx-auto mb-3" strokeWidth={2.5} />
        <h3 className="text-[18px] font-display font-black text-slate-800 mb-1">Lỗi tải dữ liệu!</h3>
        <p className="text-slate-500 font-body text-[14px] mb-5">{error ?? 'Không tìm thấy bộ đề'}</p>
        <button onClick={() => navigate('/admin/exams')} className="w-full py-2.5 bg-slate-100 text-slate-600 font-display font-bold rounded-[12px] hover:bg-slate-200 transition-colors">
          Quay lại danh sách
        </button>
      </div>
    </div>
  );

  const totalQ = form.parts.reduce((total, part) => {
    if (!part.questions) return total;
    
    const validQuestionsCount = part.questions.reduce((qCount, q) => {
      // Nếu là câu hỏi nhóm (Đoạn văn/Hội thoại)
      if (q.type === 'group') {
        const validSubQs = q.subQuestions?.filter(sq => !sq.isExample) || [];
        return qCount + validSubQs.length;
      }
      // Nếu là câu hỏi đơn
      return qCount + (q.isExample ? 0 : 1);
    }, 0);

    return total + validQuestionsCount;
  }, 0);

  return (
    <div className="flex h-screen bg-[#F4F7FA] font-sans overflow-hidden selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => {}} />

        {/* ── STICKY HEADER (Gọn gàng) ── */}
        <div className="bg-white/80 backdrop-blur-xl border-b-2 border-slate-200 px-4 sm:px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shrink-0 z-30">
          <div className="flex items-center gap-3 min-w-0 w-full md:w-auto">
            <button 
              onClick={() => navigate('/admin/exams')}
              className="w-10 h-10 bg-white rounded-[12px] border-2 border-slate-200 border-b-[3px] flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 active:border-b-2 active:translate-y-[1px] transition-all outline-none shrink-0 shadow-sm"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </button>
            <div className="min-w-0 flex-1">
              <h2 className="text-[18px] sm:text-[20px] font-display font-black text-slate-800 tracking-tight truncate">
                {form.title || 'Chỉnh sửa Đề thi'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white rounded-[12px] border-2 border-slate-200 shadow-sm">
              <span className="text-[11px] font-display font-black text-slate-400 uppercase">Tổng:</span>
              <span className="text-[13px] font-display font-black text-[#1CB0F6]">{form.parts.length} Parts</span>
              <span className="text-slate-300">|</span>
              <span className="text-[13px] font-display font-black text-[#58CC02]">{totalQ} Câu</span>
            </div>

            <button onClick={() => navigate(`/admin/exams/detail/${id}`)} className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-slate-200 border-b-[3px] rounded-[14px] text-[13px] font-display font-bold text-slate-600 hover:bg-slate-50 hover:text-[#1CB0F6] active:border-b-2 active:translate-y-[1px] transition-all outline-none">
              <Eye size={16} strokeWidth={2.5} />
              Xem chi tiết
            </button>

            <button 
              onClick={handleSave} disabled={saving} 
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2 bg-[#58CC02] hover:bg-[#46A302] text-white rounded-[14px] border-2 border-[#46A302] border-b-[4px] active:border-b-0 active:translate-y-[4px] text-[14px] font-display font-bold shadow-sm disabled:opacity-60 transition-all outline-none"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} strokeWidth={2.5} />}
              Lưu thay đổi
            </button>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
            
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-5 flex items-start gap-2.5 p-3.5 bg-[#fff0f0] border-2 border-[#ffc1c1] border-b-[3px] rounded-[16px] text-[#FF4B4B] shadow-sm">
                  <AlertTriangle size={18} strokeWidth={3} className="shrink-0 mt-0.5" />
                  <span className="font-body font-bold text-[14px] leading-snug">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Tabs (Gọn gàng) */}
            <div className="flex p-1 bg-slate-200/60 rounded-[14px] w-full max-w-[360px] mx-auto mb-6 border-2 border-slate-200/50">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] text-[13px] font-display font-bold transition-all outline-none border-2 ${
                  activeTab === 'info' ? 'bg-white text-[#1CB0F6] border-slate-200 border-b-[3px] shadow-sm translate-y-[-1px]' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-300/50'
                }`}
              >
                <Settings size={16} strokeWidth={2.5} /> Cài đặt chung
              </button>
              <button
                onClick={() => setActiveTab('builder')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] text-[13px] font-display font-bold transition-all outline-none border-2 ${
                  activeTab === 'builder' ? 'bg-white text-[#58CC02] border-slate-200 border-b-[3px] shadow-sm translate-y-[-1px]' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-300/50'
                }`}
              >
                <LayoutTemplate size={16} strokeWidth={2.5} /> Cấu trúc đề thi
              </button>
            </div>

            {/* ── TAB 1: THÔNG TIN CHUNG ── */}
            {activeTab === 'info' && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                
                <div className="bg-white p-5 sm:p-6 rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm">
                  <h3 className="text-[17px] sm:text-[18px] font-display font-black text-slate-800 mb-5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[10px] bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] border-b-[3px] flex items-center justify-center shadow-sm">
                      <Info size={16} strokeWidth={3} />
                    </div>
                    Thông tin cơ bản
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="text-[11px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2">Tiêu đề bộ đề <span className="text-[#FF4B4B]">*</span></label>
                      <input 
                        type="text" value={form.title} onChange={e => updateForm('title', e.target.value)} 
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-4 py-3 text-[14px] sm:text-[15px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all placeholder:font-medium placeholder:text-slate-400" 
                        placeholder="VD: Đề thi thử TOEIC Format 2024 - Test 1" 
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2">Danh mục <span className="text-[#FF4B4B]">*</span></label>
                      <div className="relative">
                        <select
                          value={form.category} onChange={e => updateForm('category', e.target.value)}
                          className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-4 py-3 text-[14px] sm:text-[15px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                          {EXAM_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown size={18} strokeWidth={3} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2">Thời gian làm bài (Phút)</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2.5} />
                        <input 
                          type="number" value={form.duration} onChange={e => updateForm('duration', parseInt(e.target.value))} 
                          className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] pl-10 pr-4 py-3 text-[14px] sm:text-[15px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white transition-all" 
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[11px] font-display font-black text-slate-500 uppercase tracking-widest block mb-2">Mô tả chi tiết</label>
                      <textarea 
                        rows={3} value={form.description} onChange={e => updateForm('description', e.target.value)} 
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-[16px] px-4 py-3 text-[14px] font-body font-medium text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white resize-y transition-all placeholder:text-slate-400" 
                        placeholder="Nhập mô tả, mục tiêu hoặc đối tượng của đề thi này..." 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm">
                  <h3 className="text-[17px] sm:text-[18px] font-display font-black text-slate-800 mb-5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[10px] bg-emerald-50 text-[#58CC02] border-2 border-emerald-200 border-b-[3px] flex items-center justify-center shadow-sm">
                      <Eye size={16} strokeWidth={3} />
                    </div>
                    Cài đặt hiển thị
                  </h3>
                  
                  <label className={`relative flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer p-4 rounded-[20px] border-2 transition-all ${
                    form.showResults ? 'bg-[#f1faeb] border-[#58CC02]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}>
                    <div className="mb-3 sm:mb-0 pr-4">
                      <p className={`font-display font-extrabold text-[15px] leading-tight ${form.showResults ? 'text-green-800' : 'text-slate-800'}`}>
                        Hiển thị kết quả ngay
                      </p>
                      <p className="text-[13px] font-body font-medium text-slate-500 mt-1">
                        Cho phép xem điểm số và đáp án đúng sau khi nộp bài. Khuyên dùng cho thi thử.
                      </p>
                    </div>
                    <div className={`shrink-0 w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 border-2 ${
                      form.showResults ? 'bg-[#58CC02] border-[#46A302]' : 'bg-slate-200 border-slate-300'
                    }`}>
                      <input 
                        type="checkbox" className="sr-only" 
                        checked={form.showResults} onChange={(e) => updateForm('showResults', e.target.checked)} 
                      />
                      <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${form.showResults ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                  </label>
                </div>
              </motion.div>
            )}

            {/* ── TAB 2: BUILDER (XÂY DỰNG CẤU TRÚC) ── */}
            {activeTab === 'builder' && (
              <div className="relative"> {/* CHÚ Ý CHỖ NÀY: Xóa motion.div để không dùng thẻ animation bọc ngoài nữa */}
                
                {/* ── TOOLBOX DÍNH CỐ ĐỊNH (Đã loại bỏ tác động của CSS Transform) ── */}
                <div className="sticky top-0 z-40 -mt-6 pt-6 pb-3 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-[#F4F7FA]/90 backdrop-blur-xl border-b-2 border-slate-200/50">
                  <div className="bg-white p-3 sm:p-4 rounded-[20px] border-2 border-slate-200 border-b-[4px] shadow-sm flex flex-col lg:flex-row gap-3 items-center justify-between">
                    
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                      <div className="w-10 h-10 rounded-[12px] bg-[#1CB0F6] flex items-center justify-center text-white border-b-[3px] border-[#1899D6] shrink-0 shadow-sm">
                        <Plus className="w-5 h-5" strokeWidth={3} />
                      </div>
                      <div>
                        <h3 className="text-[15px] sm:text-[16px] font-display font-black text-slate-800 uppercase tracking-wider leading-none mt-0.5">Thêm Phần Thi</h3>
                        <p className="text-[12px] font-body font-bold text-slate-500 mt-1">Chọn kỹ năng để tạo mới</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-start lg:justify-end w-full lg:w-auto">
                      {PART_TYPES.map(pt => (
                        <button 
                          key={pt.type} onClick={() => addNewPart(pt.type)} 
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-[12px] text-[12px] sm:text-[13px] font-display font-bold uppercase tracking-wider border-2 border-b-[3px] transition-all hover:-translate-y-0.5 active:border-b-2 active:translate-y-[1px] outline-none ${pt.color}`}
                        >
                          <pt.icon className="w-4 h-4" strokeWidth={2.5} /> 
                          {pt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── DANH SÁCH PART (Gắn motion riêng vào phần ruột này) ── */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                  {form.parts.length === 0 ? (
                    <div className="text-center py-16 bg-white border-2 border-dashed border-slate-300 rounded-[24px] shadow-sm">
                      <div className="w-16 h-16 bg-slate-100 rounded-[16px] border-b-[3px] border-slate-200 flex items-center justify-center mx-auto mb-4">
                        <LayoutTemplate className="w-8 h-8 text-slate-400" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-[18px] font-display font-black text-slate-700 mb-2">Đề thi chưa có nội dung</h3>
                      <p className="text-slate-500 font-body text-[14px] max-w-sm mx-auto">
                        Sử dụng thanh công cụ bên trên để bắt đầu thêm các phần thi (Listening, Reading,...) vào đề.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5 pt-2">
                      {form.parts.map((part, index) => (
                        <div key={part.id} className="relative group bg-white rounded-[24px] shadow-sm border-2 border-slate-200 border-b-[5px]">
                          
                          {/* Điều hướng Move Up/Down */}
                          <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20">
                            <button onClick={() => movePart(index, 'up')} disabled={index === 0} className="w-8 h-8 flex items-center justify-center bg-white border-2 border-slate-200 border-b-[3px] rounded-full text-slate-400 hover:text-[#1CB0F6] hover:border-blue-200 active:border-b-[2px] active:translate-y-[1px] disabled:opacity-30 transition-all outline-none shadow-sm">
                              <ChevronUp className="w-4 h-4" strokeWidth={3} />
                            </button>
                            <button onClick={() => movePart(index, 'down')} disabled={index === form.parts.length - 1} className="w-8 h-8 flex items-center justify-center bg-white border-2 border-slate-200 border-b-[3px] rounded-full text-slate-400 hover:text-[#1CB0F6] hover:border-blue-200 active:border-b-[2px] active:translate-y-[1px] disabled:opacity-30 transition-all outline-none shadow-sm">
                              <ChevronDown className="w-4 h-4" strokeWidth={3} />
                            </button>
                          </div>

                          {/* Nút xóa Part */}
                          <button 
                            onClick={() => removePart(part.id)}
                            className="absolute -right-2 -top-3 z-20 w-10 h-10 flex items-center justify-center bg-[#fff0f0] text-[#FF4B4B] border-2 border-[#ffc1c1] border-b-[3px] rounded-[12px] shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:border-b-2 active:translate-y-[1px] outline-none"
                            title="Xóa phần thi"
                          >
                            <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                          </button>
                          
                          {/* Nhãn Part Index */}
                          <div className="absolute left-5 -top-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white text-[11px] sm:text-[12px] font-display font-black uppercase tracking-widest rounded-[10px] border-b-[3px] border-slate-900 shadow-sm">
                            <GripVertical className="w-3 h-3 text-slate-400" strokeWidth={3} />
                            Phần {index + 1}
                          </div>

                          {/* Nội dung PartPanel - Padding vừa phải */}
                          <div className="p-4 sm:p-5 pt-6">
                            <PartPanel
                              partId={part.id}
                              part={part}
                              isExpanded={expandedPart === part.id}
                              onToggle={() => setExpandedPart(p => p === part.id ? null : part.id)}
                              onUpdatePart={updatePart}
                              onAddQuestion={addQuestion}
                              onRemoveQuestion={removeQuestion}
                              onUpdateQuestion={updateQuestion}
                              onAudioUpload={handleAudioUpload}
                              onAudioDelete={handleAudioDelete}
                              uploadProgress={uploadProgress}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExam;
// src/admin/pages/Exams/EditExam.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save, Loader2, AlertTriangle, FileText, 
  Headphones, BookOpen, Clock, Eye, Plus, 
  Trash2, PenTool, Mic, ArrowLeft, GripVertical,
  ChevronUp, ChevronDown, LayoutTemplate, ChevronRight
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById, updateExam, uploadAudio, deleteAudio } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import PartPanel from './components/PartPanel';
import ReusableSettingCard from './components/ReusableSettingCard';
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
  { type: 'listening', label: 'Listening', icon: Headphones, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200' },
  { type: 'reading',   label: 'Reading',   icon: BookOpen,   color: 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200' },
  { type: 'writing',   label: 'Writing',   icon: PenTool,    color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200' },
  { type: 'speaking',  label: 'Speaking',  icon: Mic,        color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200' },
];

const EditExam = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [form,           setForm]           = useState(null);
  const [fetchLoading,   setFetchLoading]   = useState(true);
  const [saving,         setSaving]         = useState(false);
  const [error,          setError]          = useState(null);
  const [activeTab,      setActiveTab]      = useState('info');
  const [expandedPart,   setExpandedPart]   = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [sidebarOpen,    setSidebarOpen]    = useState(true);

  // Responsive sidebar
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Load exam & Tương thích ngược ──────────────────────────────
  useEffect(() => {
    const load = async () => {
      setFetchLoading(true);
      try {
        const exam = await getExamById(id);
        
        // LOGIC CHUYỂN ĐỔI: Object cũ -> Array mới
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
            return { ...val, id: key, type }; // Gắn key cũ làm ID
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

  // ── Form helpers ───────────────────────────────────────────────
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
    if(!window.confirm("Xóa phần thi này sẽ mất toàn bộ câu hỏi bên trong. Bạn chắc chắn chứ?")) return;
    setForm(p => ({ ...p, parts: p.parts.filter(pt => pt.id !== partId) }));
  };

  // Tính năng mới: Di chuyển Part Lên/Xuống
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

  // ── Audio ──────────────────────────────────────────────────────
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

  // ── Save ───────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim()) { 
      setError('Vui lòng nhập Tiêu đề bộ đề!'); 
      setActiveTab('info');
      return; 
    }
    if (form.parts.length === 0) { 
      setError('Bộ đề phải có ít nhất 1 phần thi (Part)!'); 
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

  // ── Loading / Error states ─────────────────────────────────────
  if (fetchLoading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50 flex-col gap-3">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Đang tải dữ liệu bộ đề...</p>
    </div>
  );

  if (!form) return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <p className="text-slate-700 font-semibold text-sm">{error ?? 'Không tìm thấy bộ đề'}</p>
        <button onClick={() => navigate('/admin/exams')} className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700">
          ← Quay lại danh sách
        </button>
      </div>
    </div>
  );

  const totalQ = form.parts.reduce((n, p) => n + (p.questions?.length ?? 0), 0);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => {}} />

        {/* ── STICKY HEADER (Thanh công cụ luôn nổi) ── */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4 min-w-0">
            <button 
              onClick={() => navigate('/admin/exams')}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none truncate">{form.title || 'Chỉnh sửa Đề thi'}</h2>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-widest">
                Dynamic Editor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Tổng cộng:</span>
              <span className="text-sm font-black text-blue-600">{form.parts.length} Parts</span>
              <span className="text-slate-300">|</span>
              <span className="text-sm font-black text-blue-600">{totalQ} Câu</span>
            </div>

            <button onClick={() => navigate(`/admin/exams/detail/${id}`)} className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Eye className="w-4 h-4" />
              Xem chi tiết
            </button>

            <button 
              onClick={handleSave} disabled={saving} 
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 disabled:opacity-60 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">Lưu thay đổi</span>
              <span className="sm:hidden">Lưu</span>
            </button>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
            
            {/* Error Message */}
            {error && (
              <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-sm text-red-700 animate-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Custom Tabs */}
            <div className="flex p-1 bg-slate-200/50 rounded-2xl w-full max-w-md mx-auto mb-8">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'info' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <FileText className="w-4 h-4" /> Cài đặt chung
              </button>
              <button
                onClick={() => setActiveTab('builder')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'builder' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LayoutTemplate className="w-4 h-4" /> Xây dựng cấu trúc
              </button>
            </div>

            {/* ── TAB 1: THÔNG TIN CHUNG ── */}
            {activeTab === 'info' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">1</span>
                    Thông tin cơ bản
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Tiêu đề bộ đề <span className="text-red-500">*</span></label>
                      <input 
                        type="text" value={form.title} onChange={e => updateForm('title', e.target.value)} 
                        className="w-full border-2 border-slate-100 rounded-xl px-5 py-3.5 text-base font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-blue-50/20 transition-all placeholder:font-medium placeholder:text-slate-300" 
                        placeholder="VD: Đề thi thử TOEIC Format 2024 - Test 1" 
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Phân loại (Danh mục) <span className="text-red-500">*</span></label>
                      <select
                        value={form.category} onChange={e => updateForm('category', e.target.value)}
                        className="w-full border-2 border-slate-100 rounded-xl px-5 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-blue-50/20 transition-all appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:24px] bg-[position:right_12px_center] bg-no-repeat"
                      >
                        {EXAM_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Thời gian làm bài (Phút)</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                          type="number" value={form.duration} onChange={e => updateForm('duration', parseInt(e.target.value))} 
                          className="w-full border-2 border-slate-100 rounded-xl pl-12 pr-5 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-blue-50/20 transition-all" 
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Mô tả chi tiết</label>
                      <textarea 
                        rows={4} value={form.description} onChange={e => updateForm('description', e.target.value)} 
                        className="w-full border-2 border-slate-100 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-blue-50/20 resize-y transition-all placeholder:text-slate-300" 
                        placeholder="Nhập mô tả, mục tiêu hoặc đối tượng của đề thi này..." 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">2</span>
                    Cài đặt hiển thị
                  </h3>
                  <ReusableSettingCard 
                    title="Hiển thị kết quả ngay" 
                    description="Cho phép học viên xem ngay điểm số và đáp án đúng sau khi nộp bài." 
                    icon={Eye} 
                    value={form.showResults} 
                    onChange={value => updateForm('showResults', value)} 
                    variant="primary" 
                    badge="Khuyên dùng" 
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <button onClick={() => setActiveTab('builder')} className="px-6 py-3 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-colors flex items-center gap-2">
                    Tiếp tục: Xây dựng cấu trúc <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 2: BUILDER (XÂY DỰNG CẤU TRÚC) ── */}
            {activeTab === 'builder' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
                
                {/* Toolbox nổi để thêm Part */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 sticky top-[88px] z-30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-800">Thêm Phần Thi</h3>
                      <p className="text-[11px] font-medium text-slate-500">Chọn kỹ năng để thêm vào đề</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {PART_TYPES.map(pt => (
                      <button 
                        key={pt.type} onClick={() => addNewPart(pt.type)} 
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all hover:scale-105 active:scale-95 ${pt.color}`}
                      >
                        <pt.icon className="w-4 h-4" /> {pt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {form.parts.length === 0 ? (
                  <div className="text-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LayoutTemplate className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">Đề thi chưa có nội dung</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                      Hãy sử dụng thanh công cụ bên trên để bắt đầu thêm các phần thi (Listening, Reading,...) vào bộ đề của bạn.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {form.parts.map((part, index) => (
                      <div key={part.id} className="relative group bg-white rounded-2xl shadow-sm border border-slate-200">
                        
                        {/* Thanh điều hướng của từng Part */}
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => movePart(index, 'up')} disabled={index === 0} className="p-1.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 shadow-sm">
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button onClick={() => movePart(index, 'down')} disabled={index === form.parts.length - 1} className="p-1.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 shadow-sm">
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Nút xóa Part */}
                        <button 
                          onClick={() => removePart(part.id)}
                          className="absolute -right-3 -top-3 z-10 p-2.5 bg-red-100 text-red-600 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white"
                          title="Xóa phần thi này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        {/* Nhãn Part Index */}
                        <div className="absolute left-4 -top-3 z-10 flex items-center gap-1.5 px-3 py-1 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                          <GripVertical className="w-3 h-3 text-slate-400" />
                          Phần {index + 1}
                        </div>

                        <div className="pt-3">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExam;
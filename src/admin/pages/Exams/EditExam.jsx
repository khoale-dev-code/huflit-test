// src/admin/pages/Exams/EditExam.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save, Loader2, AlertTriangle,
  FileText, Headphones, BookOpen, Eye, Clock
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById, updateExam, uploadAudio, deleteAudio } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import PartPanel from './components/PartPanel';
import ReusableSettingCard from './components/ReusableSettingCard';
import { DEFAULT_PARTS, LISTENING_PARTS, READING_PARTS } from './components/examConstants';

const SECTION_TABS = [
  { id: 'info',      label: 'Thông tin',     icon: FileText   },
  { id: 'listening', label: 'Listening (4)', icon: Headphones },
  { id: 'reading',   label: 'Reading (4)',   icon: BookOpen   },
];

const EditExam = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [form,           setForm]           = useState(null);
  const [fetchLoading,   setFetchLoading]   = useState(true);
  const [saving,         setSaving]         = useState(false);
  const [error,          setError]          = useState(null);
  const [activeSection,  setActiveSection]  = useState('info');
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

  // ── Load exam ──────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setFetchLoading(true);
      try {
        const exam = await getExamById(id);
        setForm({
          title:       exam.title       ?? '',
          description: exam.description ?? '',
          duration:    90,
          showResults: exam.showResults ?? true,
          metadata:    exam.metadata    ?? {},
          parts:       { ...DEFAULT_PARTS, ...exam.parts },
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

  const updatePart = (partId, updates) =>
    setForm(p => ({ ...p, parts: { ...p.parts, [partId]: { ...p.parts[partId], ...updates } } }));

  const addQuestion = (partId, question) =>
    setForm(p => ({
      ...p,
      parts: {
        ...p.parts,
        [partId]: {
          ...p.parts[partId],
          questions: [...(p.parts[partId]?.questions ?? []), { id: `q_${Date.now()}`, ...question }],
        },
      },
    }));

  const removeQuestion = (partId, qId) =>
    setForm(p => ({
      ...p,
      parts: {
        ...p.parts,
        [partId]: {
          ...p.parts[partId],
          questions: p.parts[partId]?.questions?.filter(q => q.id !== qId) ?? [],
        },
      },
    }));

  const updateQuestion = (partId, qId, updates) =>
    setForm(p => ({
      ...p,
      parts: {
        ...p.parts,
        [partId]: {
          ...p.parts[partId],
          questions: p.parts[partId]?.questions?.map(q =>
            q.id === qId ? { ...q, ...updates } : q
          ) ?? [],
        },
      },
    }));

  // ── Audio ──────────────────────────────────────────────────────
  const handleAudioUpload = async (partId, file) => {
    setUploadProgress(p => ({ ...p, [partId]: 0 }));
    try {
      const result = await uploadAudio(file, id, partId, pct =>
        setUploadProgress(p => ({ ...p, [partId]: pct }))
      );
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
    if (!form.title.trim()) { setError('Vui lòng nhập tiêu đề bộ đề'); return; }
    setSaving(true);
    setError(null);
    try {
      await updateExam(id, form);
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
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Đang tải bộ đề...</p>
    </div>
  );

  if (!form) return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <p className="text-slate-700 font-semibold text-sm">{error ?? 'Không tìm thấy bộ đề'}</p>
        <button
          onClick={() => navigate('/admin/exams')}
          className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700"
        >
          ← Quay lại danh sách
        </button>
      </div>
    </div>
  );

  const totalQ = Object.values(form.parts).reduce((n, p) => n + (p.questions?.length ?? 0), 0);

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      {/* ── Shared Sidebar ── */}
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        admin={admin}
        onSignOut={async () => {
          const r = await signOut();
          if (r.success) navigate('/admin/login');
        }}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── Shared Navbar ── */}
        <AdminNavbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onQuickAction={() => navigate('/admin/exams/create')}
        />

        {/* ── Sub-header: breadcrumb + actions ── */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-shrink-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium min-w-0 overflow-hidden">
            <button
              onClick={() => navigate('/admin/exams')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Bộ đề thi
            </button>
            <span>/</span>
            <button
              onClick={() => navigate(`/admin/exams/detail/${id}`)}
              className="hover:text-blue-600 transition-colors truncate max-w-[140px] sm:max-w-[240px]"
            >
              {form.title}
            </button>
            <span>/</span>
            <span className="text-slate-700 font-semibold whitespace-nowrap">Chỉnh sửa</span>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate(`/admin/exams/detail/${id}`)}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem chi tiết</span>
            </button>
            <button
              onClick={() => navigate('/admin/exams')}
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors hidden sm:block"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-sm disabled:opacity-60 transition-all"
            >
              {saving
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <Save className="w-3.5 h-3.5" />}
              Lưu thay đổi
            </button>
          </div>
        </div>

        {/* ── Section Tabs ── */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center gap-1 flex-shrink-0">
          {SECTION_TABS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap
                ${activeSection === s.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-slate-400 border-transparent hover:text-slate-700 hover:border-slate-300'}`}
            >
              <s.icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.label.split(' ')[0]}</span>
            </button>
          ))}

          {/* Total counter — pushed to right */}
          <div className="ml-auto flex items-center pr-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-lg">
              {totalQ} câu
            </span>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto">

          {/* ── INFO ── */}
          {activeSection === 'info' && (
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wide block mb-1.5">
                  Tiêu đề bộ đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => updateForm('title', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all"
                  placeholder="Nhập tiêu đề bộ đề..."
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wide block mb-1.5">
                  Mô tả
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => updateForm('description', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white resize-none transition-all"
                  placeholder="Mô tả ngắn về bộ đề..."
                />
              </div>

              {/* Duration card */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800">Thời lượng làm bài</p>
                  <p className="text-xs text-slate-500 mt-0.5">Listening: 30 phút · Reading: 60 phút</p>
                </div>
                <span className="text-base font-black text-amber-700 bg-amber-100 px-3 py-1.5 rounded-lg flex-shrink-0">
                  90 phút
                </span>
              </div>

              {/* Show Results toggle */}
              <ReusableSettingCard
                title="Hiển thị kết quả ngay"
                description="Học sinh xem kết quả và đáp án đúng ngay sau khi nộp bài"
                icon={Eye}
                value={form.showResults}
                onChange={value => updateForm('showResults', value)}
                variant="primary"
                badge="Khuyến nghị"
              />

              {/* Stats summary */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                {[
                  { label: 'Parts nghe', value: LISTENING_PARTS.length, color: 'bg-blue-50 text-blue-700' },
                  { label: 'Parts đọc',  value: READING_PARTS.length,   color: 'bg-amber-50 text-amber-700' },
                  { label: 'Tổng câu',   value: totalQ,                 color: 'bg-emerald-50 text-emerald-700' },
                ].map((s, i) => (
                  <div key={i} className={`${s.color} rounded-xl p-4 text-center`}>
                    <p className="text-2xl font-black tabular-nums">{s.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wide mt-1 opacity-75">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── LISTENING ── */}
          {activeSection === 'listening' && (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
              <p className="text-xs text-slate-400 font-medium mb-5">
                4 phần nghe · Chỉnh sửa audio và câu hỏi từng phần.
              </p>
              <div className="space-y-3">
                {LISTENING_PARTS.map(pid => (
                  <PartPanel
                    key={pid}
                    partId={pid}
                    part={form.parts[pid]}
                    isExpanded={expandedPart === pid}
                    onToggle={() => setExpandedPart(p => p === pid ? null : pid)}
                    onUpdatePart={updatePart}
                    onAddQuestion={addQuestion}
                    onRemoveQuestion={removeQuestion}
                    onUpdateQuestion={updateQuestion}
                    onAudioUpload={handleAudioUpload}
                    onAudioDelete={handleAudioDelete}
                    uploadProgress={uploadProgress}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── READING ── */}
          {activeSection === 'reading' && (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
              <p className="text-xs text-slate-400 font-medium mb-5">
                4 phần đọc · Chỉnh sửa đoạn văn và câu hỏi từng phần.
              </p>
              <div className="space-y-3">
                {READING_PARTS.map(pid => (
                  <PartPanel
                    key={pid}
                    partId={pid}
                    part={form.parts[pid]}
                    isExpanded={expandedPart === pid}
                    onToggle={() => setExpandedPart(p => p === pid ? null : pid)}
                    onUpdatePart={updatePart}
                    onAddQuestion={addQuestion}
                    onRemoveQuestion={removeQuestion}
                    onUpdateQuestion={updateQuestion}
                    onAudioUpload={handleAudioUpload}
                    onAudioDelete={handleAudioDelete}
                    uploadProgress={uploadProgress}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EditExam;
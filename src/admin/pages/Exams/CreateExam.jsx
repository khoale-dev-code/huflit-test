// src/admin/pages/Exams/CreateExam.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Save, Loader2, AlertTriangle,
  FileText, Headphones, BookOpen, Clock, Eye
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { createExam, uploadAudio, deleteAudio } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import PartPanel from './components/PartPanel';
import ReusableSettingCard from './components/ReusableSettingCard';
import { DEFAULT_PARTS, LISTENING_PARTS, READING_PARTS } from './components/examConstants';

// ── IMPORT HÀM GHI LOG ──
import { logAdminAction } from '../../utils/adminLogger';

const INITIAL_FORM = {
  title:       '',
  description: '',
  duration:    90,
  showResults: true,
  metadata:    {},
  parts:       DEFAULT_PARTS,
};

const SECTION_TABS = [
  { id: 'info',      label: 'Thông tin',     icon: FileText   },
  { id: 'listening', label: 'Listening (4)', icon: Headphones },
  { id: 'reading',   label: 'Reading (4)',   icon: BookOpen   },
];

const CreateExam = () => {
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [form,           setForm]           = useState(INITIAL_FORM);
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
      const result = await uploadAudio(file, 'new', partId, pct =>
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

  // ── Save (Đã cập nhật tính năng Log) ───────────────────────────
  const handleSave = async () => {
    if (!form.title.trim()) { setError('Vui lòng nhập tiêu đề bộ đề'); return; }
    setSaving(true);
    setError(null);
    try {
      // 1. Lưu đề thi vào database
      const newExam = await createExam(form);

      // 2. Ghi Log thao tác của Admin
      if (admin) {
        await logAdminAction(
          admin.id,
          admin.email,
          'CREATE_EXAM',
          `Đề thi: ${form.title}` // Tên đề thi vừa tạo
        );
      }

      // 3. Chuyển hướng
      navigate(`/admin/exams/detail/${newExam.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

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
          onQuickAction={() => {}}
        />

        {/* ── Sub-header: label + actions ── */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-shrink-0">
          <div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tạo mới</p>
            <h2 className="text-sm font-black text-slate-900 mt-0.5">Tạo bộ đề thi mới</h2>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
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
              Tạo bộ đề
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

          {/* Total counter */}
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
                  placeholder="VD: HUFLIT Listening & Reading Practice - Exam 2"
                  value={form.title}
                  onChange={e => updateForm('title', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-wide block mb-1.5">
                  Mô tả
                </label>
                <textarea
                  rows={3}
                  placeholder="Mô tả ngắn về bộ đề..."
                  value={form.description}
                  onChange={e => updateForm('description', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white resize-none transition-all"
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
                  { label: 'Parts nghe', value: LISTENING_PARTS.length, color: 'bg-blue-50 text-blue-700'    },
                  { label: 'Parts đọc',  value: READING_PARTS.length,   color: 'bg-amber-50 text-amber-700'  },
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
                4 phần nghe · Upload audio riêng cho từng phần và thêm câu hỏi.
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
                4 phần đọc · Nhập đoạn văn và thêm câu hỏi cho từng phần.
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

export default CreateExam;
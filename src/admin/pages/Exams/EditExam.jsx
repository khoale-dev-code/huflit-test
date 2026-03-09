// src/admin/pages/Exams/EditExam.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Loader2, AlertTriangle, FileText, Headphones, BookOpen, Eye, Menu, X, Clock } from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById, updateExam, uploadAudio, deleteAudio } from '../../services/examService';
import ExamSidebar from './components/ExamSidebar';
import PartPanel from './components/PartPanel';
import ReusableSettingCard from './components/ReusableSettingCard';
import { DEFAULT_PARTS, LISTENING_PARTS, READING_PARTS } from './components/examConstants';

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
  const [isMobile,       setIsMobile]       = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
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
          parts: { ...DEFAULT_PARTS, ...exam.parts },
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

  const updateQuestion = (partId, qId, updates) => {
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
  };

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

  const handleSignOut = async () => {
    const r = await signOut();
    if (r.success) navigate('/admin/login');
  };

  // ── Loading state ──────────────────────────────────────────────
  if (fetchLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium text-sm md:text-base">Đang tải bộ đề...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center px-4">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-gray-700 font-semibold text-sm md:text-base">{error ?? 'Không tìm thấy bộ đề'}</p>
          <button onClick={() => navigate('/admin/exams')} className="mt-4 text-xs md:text-sm text-blue-600 font-bold hover:text-blue-700">
            ← Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const totalQ = Object.values(form.parts).reduce((n, p) => n + (p.questions?.length ?? 0), 0);

  const SECTION_TABS = [
    { id: 'info',      label: 'Thông tin',    short: 'Info',  icon: FileText   },
    { id: 'listening', label: 'Listening (4)', short: 'L',    icon: Headphones },
    { id: 'reading',   label: 'Reading (4)',   short: 'R',    icon: BookOpen   },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between flex-shrink-0 z-40 shadow-sm transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <ExamSidebar admin={admin} onSignOut={handleSignOut} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 flex-shrink-0 gap-3 md:gap-4 py-2 md:py-0">
          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0 w-full">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 flex-shrink-0"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-0.5 overflow-x-auto">
                <button onClick={() => navigate('/admin/exams')} className="hover:text-blue-600 transition-colors whitespace-nowrap">
                  Bộ đề
                </button>
                <span>›</span>
                <button onClick={() => navigate(`/admin/exams/detail/${id}`)} className="hover:text-blue-600 transition-colors truncate max-w-[150px] md:max-w-[200px]">
                  {form.title}
                </button>
                <span className="hidden md:inline">›</span>
                <span className="hidden md:inline text-gray-900 font-semibold">Chỉnh sửa</span>
              </div>
              <h2 className="text-base md:text-lg font-bold text-gray-900">Chỉnh sửa bộ đề</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate(`/admin/exams/detail/${id}`)}
              className="flex-1 md:flex-none flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-2.5 border border-gray-200 rounded-xl text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" /> 
              <span className="hidden sm:inline">Xem chi tiết</span>
            </button>
            <button
              onClick={() => navigate('/admin/exams')}
              className="flex-1 md:flex-none px-2 md:px-4 py-2 md:py-2.5 border border-gray-200 rounded-xl text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors hidden sm:block"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 md:flex-none px-3 md:px-5 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-1 md:gap-2 shadow-sm disabled:opacity-60 transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">Lưu</span>
            </button>
          </div>
        </header>

        {/* Section tabs */}
        <div className="flex border-b border-gray-100 bg-white flex-shrink-0 overflow-x-auto">
          {SECTION_TABS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center justify-center gap-1 md:gap-2 py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                activeSection === s.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <s.icon className="w-4 h-4" /> 
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.short}</span>
            </button>
          ))}
          <div className="flex-1 border-b border-gray-100" />
          <div className="flex items-center px-3 md:px-6 py-3 md:py-4 text-[10px] md:text-xs text-gray-400 font-medium border-b border-gray-100 flex-shrink-0">
            {totalQ} câu
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">

          {/* ── INFO ── */}
          {activeSection === 'info' && (
            <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-4 md:space-y-6">
              {error && (
                <div className="flex items-start gap-2 p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl text-xs md:text-sm text-red-700">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" /> 
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="text-xs md:text-sm font-bold text-gray-700 block mb-1.5">
                  Tiêu đề bộ đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => updateForm('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Nhập tiêu đề..."
                />
              </div>

              <div>
                <label className="text-xs md:text-sm font-bold text-gray-700 block mb-1.5">Mô tả</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={e => updateForm('description', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm focus:outline-none focus:border-blue-500 resize-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Nhập mô tả..."
                />
              </div>

              {/* Duration Info Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="h-1 bg-gradient-to-r from-amber-50 to-amber-100/50" />
                  <div className="flex items-center gap-4 p-4 md:p-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm md:text-base font-bold text-gray-900">Thời lượng làm bài</h3>
                      <p className="text-xs md:text-sm text-gray-600 mt-0.5">Listening: 30 phút, Reading: 60 phút</p>
                    </div>
                    <div className="text-sm md:text-lg font-bold text-amber-600 flex-shrink-0 bg-amber-50 px-3 md:px-4 py-2 rounded-lg">
                      90 phút
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-50 to-amber-100/50 w-full" />
                </div>
              </div>

              {/* Show Results Toggle Card */}
              <ReusableSettingCard
                title="Hiển thị kết quả ngay"
                description="Học sinh có thể xem kết quả và đáp án đúng ngay sau khi nộp bài"
                icon={Eye}
                value={form.showResults}
                onChange={(value) => updateForm('showResults', value)}
                variant="primary"
                badge="Khuyến nghị"
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 pt-2">
                {[
                  { label: 'Parts nghe', value: LISTENING_PARTS.length },
                  { label: 'Parts đọc',  value: READING_PARTS.length   },
                  { label: 'Tổng câu',   value: totalQ                 },
                ].map((s, i) => (
                  <div key={i} className="bg-blue-50 rounded-xl p-3 md:p-4 text-center">
                    <p className="text-xl md:text-2xl font-bold text-blue-700">{s.value}</p>
                    <p className="text-[10px] md:text-xs text-blue-600 font-medium mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── LISTENING ── */}
          {activeSection === 'listening' && (
            <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
              <p className="text-[11px] md:text-xs text-gray-500 mb-4 md:mb-5">4 phần nghe · Chỉnh sửa audio và câu hỏi từng phần.</p>
              <div className="space-y-2 md:space-y-3">
                {LISTENING_PARTS.map(pid => (
                  <PartPanel
                    key={pid} partId={pid} part={form.parts[pid]}
                    isExpanded={expandedPart === pid}
                    onToggle={() => setExpandedPart(p => p === pid ? null : pid)}
                    onUpdatePart={updatePart}
                    onAddQuestion={addQuestion}
                    onRemoveQuestion={removeQuestion}
                    onUpdateQuestion={updateQuestion}
                    onAudioUpload={handleAudioUpload}
                    onAudioDelete={handleAudioDelete}
                    uploadProgress={uploadProgress}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── READING ── */}
          {activeSection === 'reading' && (
            <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
              <p className="text-[11px] md:text-xs text-gray-500 mb-4 md:mb-5">4 phần đọc · Chỉnh sửa đoạn văn và câu hỏi từng phần.</p>
              <div className="space-y-2 md:space-y-3">
                {READING_PARTS.map(pid => (
                  <PartPanel
                    key={pid} partId={pid} part={form.parts[pid]}
                    isExpanded={expandedPart === pid}
                    onToggle={() => setExpandedPart(p => p === pid ? null : pid)}
                    onUpdatePart={updatePart}
                    onAddQuestion={addQuestion}
                    onRemoveQuestion={removeQuestion}
                    onUpdateQuestion={updateQuestion}
                    onAudioUpload={handleAudioUpload}
                    onAudioDelete={handleAudioDelete}
                    uploadProgress={uploadProgress}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditExam;
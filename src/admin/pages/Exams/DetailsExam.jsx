// src/admin/pages/Exams/DetailsExam.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Edit3, ArrowLeft, Loader2, AlertTriangle,
  Clock, HelpCircle, Headphones, BookOpen,
  Users, CheckCircle, Target, Check,
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { PART_ORDER } from './components/examConstants';

// ─── Stat Card ─────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, accent = 'blue' }) => {
  const themes = {
    blue:   'bg-blue-50 text-blue-600',
    green:  'bg-emerald-50 text-emerald-600',
    amber:  'bg-amber-50 text-amber-600',
    purple: 'bg-violet-50 text-violet-600',
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${themes[accent]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black text-slate-900 tabular-nums">{value}</p>
      </div>
    </div>
  );
};

// ─── Usage Stat ────────────────────────────────────────────────────
const UsageStat = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-slate-500" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-2xl font-black text-slate-900 tabular-nums">{value}</p>
    </div>
  </div>
);

// ─── MAIN ──────────────────────────────────────────────────────────
const DetailsExam = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [exam,        setExam]        = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      setLoading(true);
      try {
        const data = await getExamById(id);
        setExam(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // ── Loading / Error ────────────────────────────────────────────
  if (loading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50 flex-col gap-3">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Đang tải bộ đề...</p>
    </div>
  );

  if (error || !exam) return (
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

  const parts  = exam.parts ?? {};
  const totalQ = exam.questions
    ?? Object.values(parts).reduce((n, p) => n + (p.questions?.length ?? 0), 0);

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
            <span className="text-slate-700 font-semibold truncate max-w-[160px] sm:max-w-[280px]">
              {exam.title}
            </span>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate('/admin/exams')}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>
            <button
              onClick={() => navigate(`/admin/exams/edit/${id}`)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Chỉnh sửa
            </button>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

            {/* ── Hero ── */}
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">
                {exam.title}
              </h1>
              {exam.description && (
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed max-w-2xl">
                  {exam.description}
                </p>
              )}
            </div>

            {/* ── Meta stats ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={Clock}      label="Thời lượng" value="90 phút"        accent="amber" />
              <StatCard icon={HelpCircle} label="Tổng câu"   value={`${totalQ} câu`} accent="green" />
              <StatCard icon={Headphones} label="Listening"  value="4 parts"         accent="blue"  />
              <StatCard icon={BookOpen}   label="Reading"    value="4 parts"         accent="purple"/>
            </div>

            {/* ── Parts structure ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Section header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">Cấu trúc đề thi</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {Object.keys(parts).length} phần · {totalQ} câu hỏi tổng cộng
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/admin/exams/edit/${id}`)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Chỉnh sửa nội dung →
                </button>
              </div>

              <div className="divide-y divide-slate-50">
                {PART_ORDER.map(pid => {
                  const part        = parts[pid];
                  if (!part) return null;
                  const isListening = part.type === 'listening';
                  const qCount      = part.questions?.length ?? 0;

                  return (
                    <div key={pid} className="px-6 py-5 hover:bg-slate-50 transition-colors">
                      {/* Part header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                            ${isListening ? 'bg-blue-50' : 'bg-amber-50'}`}>
                            {isListening
                              ? <Headphones className="w-4 h-4 text-blue-600" />
                              : <BookOpen   className="w-4 h-4 text-amber-600" />}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-black text-slate-800">{part.title}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {qCount} câu hỏi
                              {part.description && ` · ${part.description}`}
                            </p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg flex-shrink-0
                          ${isListening
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'}`}>
                          {isListening ? 'LISTENING' : 'READING'}
                        </span>
                      </div>

                      {/* Audio info */}
                      {isListening && part.audioUrl && (
                        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold text-slate-700 truncate flex-1">
                            🎧 {part.audioName}
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg flex-shrink-0">
                            Đã tải lên
                          </span>
                          <a
                            href={part.audioUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex-shrink-0"
                          >
                            Nghe thử
                          </a>
                        </div>
                      )}

                      {/* Reading passage preview */}
                      {!isListening && part.text && (
                        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 mb-3">
                          <p className="text-xs text-slate-500 line-clamp-2 italic leading-relaxed">
                            "{part.text.slice(0, 200)}..."
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
                            {part.text.length} ký tự
                          </p>
                        </div>
                      )}

                      {/* Questions preview */}
                      {qCount > 0 && (
                        <div className="space-y-2 mt-1">
                          {(part.questions ?? []).slice(0, 3).map((q, i) => (
                            <div key={q.id} className="flex items-start gap-3">
                              <span className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-black text-slate-500 flex-shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <p className="text-xs text-slate-600 leading-relaxed truncate flex-1">
                                {q.question}
                              </p>
                              <span className="text-[10px] font-black text-emerald-600 flex items-center gap-0.5 flex-shrink-0">
                                <Check className="w-3 h-3" />
                                {String.fromCharCode(65 + (q.correct ?? 0))}
                              </span>
                            </div>
                          ))}
                          {qCount > 3 && (
                            <p className="text-[11px] text-slate-400 pl-8 font-medium">
                              + {qCount - 3} câu hỏi khác
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Usage stats ── */}
            <div>
              <h3 className="text-base font-black text-slate-900 mb-3">Thống kê sử dụng</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <UsageStat icon={Users}       label="Đã tham gia" value={exam.stats?.participants ?? 0} />
                <UsageStat icon={CheckCircle} label="Hoàn thành"  value={exam.stats?.completed    ?? 0} />
                <UsageStat icon={Target}      label="Điểm TB"     value={exam.stats?.avgScore     ?? 0} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailsExam;
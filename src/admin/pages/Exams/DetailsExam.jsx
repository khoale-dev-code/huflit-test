// src/admin/pages/Exams/DetailsExam.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Edit3, ArrowLeft, Loader2, AlertTriangle,
  Clock, HelpCircle, Headphones, BookOpen,
  Users, CheckCircle, Target, Check, PenTool, Mic, LayoutTemplate, FileText // <--- Đã thêm FileText ở đây
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { EXAM_CATEGORIES } from './CreateExam';

// ─── Cấu hình Icon & Màu sắc cho từng Part ────────────────────────
const TYPE_CONFIG = {
  listening: { icon: Headphones, color: 'text-blue-600', bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700', label: 'LISTENING' },
  reading:   { icon: BookOpen,   color: 'text-amber-600', bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700', label: 'READING' },
  writing:   { icon: PenTool,    color: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700', label: 'WRITING' },
  speaking:  { icon: Mic,        color: 'text-purple-600', bg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-700', label: 'SPEAKING' },
};

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
        
        // LOGIC CHUYỂN ĐỔI: Tương thích ngược Object cũ -> Array mới
        if (data.parts && !Array.isArray(data.parts) && typeof data.parts === 'object') {
          data.parts = Object.entries(data.parts).map(([key, val]) => {
            let type = val.type;
            if (!type) {
              type = ['part1', 'part2', 'part3', 'part4'].includes(key) ? 'listening' : 'reading';
            }
            return { ...val, id: key, type };
          });
        }
        
        setExam(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // ── Tính toán thống kê từ mảng parts ──
  const stats = useMemo(() => {
    if (!exam) return null;
    const partsArr = Array.isArray(exam.parts) ? exam.parts : [];
    
    let total = 0;
    let counts = { listening: 0, reading: 0, writing: 0, speaking: 0 };
    let partsCount = { listening: 0, reading: 0, writing: 0, speaking: 0 };

    partsArr.forEach(p => {
      const qCount = p.questions?.length || 0;
      total += qCount;
      if (counts[p.type] !== undefined) {
        counts[p.type] += qCount;
        partsCount[p.type] += 1;
      }
    });

    return { total, counts, partsCount, partsArr };
  }, [exam]);

  // ── Loading / Error ────────────────────────────────────────────
  if (loading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50 flex-col gap-3">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Đang tải chi tiết...</p>
    </div>
  );

  if (error || !exam) return (
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

  const catInfo = EXAM_CATEGORIES.find(c => c.value === exam.category) || EXAM_CATEGORIES[4];

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      {/* ── Shared Sidebar ── */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── Shared Navbar ── */}
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => navigate('/admin/exams/create')} />

        {/* ── Sub-header: breadcrumb + actions ── */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-shrink-0 shadow-sm">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium min-w-0 overflow-hidden">
            <button onClick={() => navigate('/admin/exams')} className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Bộ đề thi
            </button>
            <span>/</span>
            <span className="text-slate-700 font-bold truncate max-w-[160px] sm:max-w-[280px]">
              {exam.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => navigate('/admin/exams')} className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>
            <button onClick={() => navigate(`/admin/exams/edit/${id}`)} className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 transition-all">
              <Edit3 className="w-3.5 h-3.5" />
              Chỉnh sửa
            </button>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

            {/* ── Hero ── */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <FileText className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest rounded-lg mb-3">
                  {catInfo.label}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {exam.title}
                </h1>
                {exam.description && (
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-2xl">
                    {exam.description}
                  </p>
                )}
              </div>
            </div>

            {/* ── Meta stats ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={Clock}      label="Thời lượng" value={`${exam.duration || 90} phút`} accent="amber" />
              <StatCard icon={HelpCircle} label="Tổng câu"   value={`${stats.total} câu`} accent="green" />
              
              {/* Chỉ hiện stat của kỹ năng nào có câu hỏi/part */}
              {(stats.counts.listening > 0 || stats.partsCount.listening > 0) && (
                <StatCard icon={Headphones} label="Listening" value={`${stats.partsCount.listening} Parts`} accent="blue" />
              )}
              {(stats.counts.reading > 0 || stats.partsCount.reading > 0) && (
                <StatCard icon={BookOpen} label="Reading" value={`${stats.partsCount.reading} Parts`} accent="purple" />
              )}
              {(stats.counts.writing > 0 || stats.partsCount.writing > 0) && (
                <StatCard icon={PenTool} label="Writing" value={`${stats.partsCount.writing} Parts`} accent="green" />
              )}
              {(stats.counts.speaking > 0 || stats.partsCount.speaking > 0) && (
                <StatCard icon={Mic} label="Speaking" value={`${stats.partsCount.speaking} Parts`} accent="amber" />
              )}
            </div>

            {/* ── Parts structure ── */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                    <LayoutTemplate className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Cấu trúc chi tiết</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {stats.partsArr.length} phần thi · {stats.total} câu hỏi
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {stats.partsArr.length === 0 ? (
                  <div className="p-10 text-center text-slate-400 font-medium">Chưa có phần thi nào.</div>
                ) : (
                  stats.partsArr.map((part, index) => {
                    const config = TYPE_CONFIG[part.type] || TYPE_CONFIG.reading;
                    const Icon = config.icon;
                    const qCount = part.questions?.length || 0;

                    return (
                      <div key={part.id} className="p-6 hover:bg-slate-50/80 transition-colors">
                        {/* Part header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-4 min-w-0 flex-1">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${config.bg}`}>
                              <Icon className={`w-6 h-6 ${config.color}`} />
                            </div>
                            <div className="min-w-0 pt-0.5">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${config.badge}`}>
                                  Phần {index + 1}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                  {config.label}
                                </span>
                              </div>
                              <h4 className="text-[15px] font-bold text-slate-800 leading-snug">{part.title}</h4>
                              {(part.description || part.instruction) && (
                                <p className="text-xs text-slate-500 mt-1 italic">
                                  {part.description || part.instruction}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 sm:flex-col sm:items-end flex-shrink-0 pl-16 sm:pl-0">
                            <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                              {qCount} Câu
                            </span>
                          </div>
                        </div>

                        {/* Nôi dung Audio / Text preview */}
                        <div className="pl-16 space-y-3">
                          {config.label === 'LISTENING' && part.audioUrl && (
                            <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3">
                              <span className="text-xs font-semibold text-slate-700 truncate flex-1">🎧 {part.audioName}</span>
                              <a href={part.audioUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:text-blue-700">Nghe thử</a>
                            </div>
                          )}

                          {(config.label === 'READING' || config.label === 'WRITING') && part.text && (
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                              <p className="text-xs text-slate-600 line-clamp-3 italic leading-relaxed">
                                "{part.text}"
                              </p>
                            </div>
                          )}

                          {/* Questions preview */}
                          {qCount > 0 && (
                            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                              {(part.questions ?? []).slice(0, 3).map((q, i) => (
                                <div key={q.id} className="flex items-start gap-3">
                                  <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[11px] font-black text-slate-500 flex-shrink-0 mt-0.5">
                                    {i + 1}
                                  </span>
                                  <p className="text-sm text-slate-700 leading-relaxed truncate flex-1 font-medium">
                                    {q.question}
                                  </p>
                                  {q.correct !== undefined && (
                                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1 flex-shrink-0">
                                      <Check className="w-3 h-3" />
                                      {String.fromCharCode(65 + q.correct)}
                                    </span>
                                  )}
                                </div>
                              ))}
                              {qCount > 3 && (
                                <div className="text-center pt-2 mt-2 border-t border-slate-100">
                                  <p className="text-[11px] text-blue-500 font-bold">
                                    + Xem thêm {qCount - 3} câu hỏi ở chế độ chỉnh sửa
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ── Usage stats ── */}
            <div>
              <h3 className="text-base font-black text-slate-900 mb-4 pl-1">Thống kê dữ liệu thực tế</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <UsageStat icon={Users}       label="Lượt tham gia" value={exam.stats?.participants ?? 0} />
                <UsageStat icon={CheckCircle} label="Đã nộp bài"  value={exam.stats?.completed    ?? 0} />
                <UsageStat icon={Target}      label="Điểm TB"     value={`${exam.stats?.avgScore ?? 0}%`} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailsExam;
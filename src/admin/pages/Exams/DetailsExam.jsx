// src/admin/pages/Exams/DetailsExam.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Edit3, ArrowLeft, Loader2, AlertTriangle,
  Clock, HelpCircle, Headphones, BookOpen,
  Users, CheckCircle, Target, Check, PenTool, Mic, LayoutTemplate, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { EXAM_CATEGORIES } from './CreateExam';

// ─── Cấu hình Icon & Màu sắc Gamification ────────────────────────
const TYPE_CONFIG = {
  listening: { icon: Headphones, color: 'text-[#1CB0F6]', bg: 'bg-[#EAF6FE]', border: 'border-[#BAE3FB]', label: 'LISTENING' },
  reading:   { icon: BookOpen,   color: 'text-[#58CC02]', bg: 'bg-[#f1faeb]', border: 'border-[#bcf096]', label: 'READING' },
  writing:   { icon: PenTool,    color: 'text-[#FF9600]', bg: 'bg-[#FFF4E5]', border: 'border-[#FFD8A8]', label: 'WRITING' },
  speaking:  { icon: Mic,        color: 'text-[#CE82FF]', bg: 'bg-[#faefff]', border: 'border-[#eec9ff]', label: 'SPEAKING' },
};

// ─── Stat Card 3D ─────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, accent = 'blue' }) => {
  const themes = {
    blue:   'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]',
    green:  'bg-[#f1faeb] text-[#58CC02] border-[#bcf096]',
    amber:  'bg-[#FFC800]/10 text-[#FF9600] border-[#FFC800]/30',
    purple: 'bg-[#faefff] text-[#CE82FF] border-[#eec9ff]',
  };
  return (
    <div className="bg-white rounded-[20px] border-2 border-slate-200 border-b-[4px] p-4 shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform">
      <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border-b-[3px] shadow-sm ${themes[accent]}`}>
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[10px] sm:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-[18px] sm:text-[22px] font-display font-black text-slate-800 leading-none">{value}</p>
      </div>
    </div>
  );
};

// ─── Usage Stat (Thống kê thực tế) ──────────────────────────────────
const UsageStat = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-[20px] border-2 border-slate-200 border-b-[4px] p-4 shadow-sm flex items-center gap-4">
    <div className="w-12 h-12 rounded-[14px] bg-slate-100 border-b-[3px] border-slate-200 flex items-center justify-center shrink-0">
      <Icon size={22} strokeWidth={2.5} className="text-slate-500" />
    </div>
    <div className="min-w-0 pt-0.5">
      <p className="text-[10px] sm:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-[20px] sm:text-[24px] font-display font-black text-slate-800 leading-none">{value}</p>
    </div>
  </div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────
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
        
        // LOGIC CHUYỂN ĐỔI TƯƠNG THÍCH NGƯỢC
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

  // ── Loading / Error ──
  if (loading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F4F7FA] flex-col gap-3 selection:bg-blue-200">
      <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <p className="font-display font-bold text-slate-500 text-[15px]">Đang tải dữ liệu...</p>
    </div>
  );

  if (error || !exam) return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F4F7FA] selection:bg-blue-200">
      <div className="text-center bg-white p-6 rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-sm max-w-sm">
        <AlertTriangle className="w-12 h-12 text-[#FF4B4B] mx-auto mb-3" strokeWidth={2.5} />
        <h3 className="text-[18px] font-display font-black text-slate-800 mb-1">Lỗi tải dữ liệu!</h3>
        <p className="text-[14px] font-body text-slate-500 mb-5">{error ?? 'Không tìm thấy bộ đề'}</p>
        <button onClick={() => navigate('/admin/exams')} className="w-full py-2.5 bg-slate-100 text-slate-600 font-display font-bold rounded-[12px] hover:bg-slate-200 transition-colors">
          Quay lại danh sách
        </button>
      </div>
    </div>
  );

  const catInfo = EXAM_CATEGORIES.find(c => c.value === exam.category) || EXAM_CATEGORIES[4];

  return (
    <div className="flex h-screen bg-[#F4F7FA] font-sans overflow-hidden selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => navigate('/admin/exams/create')} />

        {/* ── STICKY HEADER (Glassmorphism) ── */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b-2 border-slate-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 shrink-0 shadow-sm">
          <nav className="flex items-center gap-2 min-w-0 overflow-hidden">
            <button 
              onClick={() => navigate('/admin/exams')} 
              className="w-10 h-10 bg-white rounded-[12px] border-2 border-slate-200 border-b-[3px] flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 active:border-b-2 active:translate-y-[1px] transition-all outline-none shrink-0"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </button>
            <div className="flex flex-col min-w-0 ml-1">
              <p className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest hidden sm:block">Chi tiết bộ đề</p>
              <p className="text-[14px] sm:text-[16px] font-display font-black text-slate-800 truncate max-w-[150px] sm:max-w-[300px]">
                {exam.title}
              </p>
            </div>
          </nav>

          <button 
            onClick={() => navigate(`/admin/exams/edit/${id}`)} 
            className="flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1CB0F6] text-white rounded-[14px] border-2 border-[#1899D6] border-b-[4px] hover:bg-[#18A0E0] active:border-b-2 active:translate-y-[2px] font-display font-bold text-[13px] sm:text-[14px] uppercase tracking-wider transition-all outline-none shadow-sm shrink-0"
          >
            <Edit3 size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline">Chỉnh sửa</span>
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-6 sm:space-y-8">

            {/* ── HERO BANNER ── */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-sm relative overflow-hidden">
              <div className="absolute -top-4 -right-4 p-6 opacity-[0.03] pointer-events-none">
                <FileText className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 text-slate-500 font-display font-black text-[10px] uppercase tracking-widest rounded-[8px] mb-3">
                  {catInfo.label}
                </span>
                <h1 className="text-[24px] sm:text-[32px] font-display font-black text-slate-800 tracking-tight leading-tight mb-2">
                  {exam.title}
                </h1>
                {exam.description && (
                  <p className="text-[14px] sm:text-[15px] font-body font-medium text-slate-500 leading-relaxed max-w-3xl">
                    {exam.description}
                  </p>
                )}
              </div>
            </div>

            {/* ── META STATS ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <StatCard icon={Clock}      label="Thời lượng" value={`${exam.duration || 90} phút`} accent="amber" />
              <StatCard icon={HelpCircle} label="Tổng câu"   value={`${stats.total} câu`} accent="green" />
              
              {stats.partsCount.listening > 0 && <StatCard icon={Headphones} label="Listening" value={`${stats.partsCount.listening} Parts`} accent="blue" />}
              {stats.partsCount.reading > 0 && <StatCard icon={BookOpen} label="Reading" value={`${stats.partsCount.reading} Parts`} accent="purple" />}
              {stats.partsCount.writing > 0 && <StatCard icon={PenTool} label="Writing" value={`${stats.partsCount.writing} Parts`} accent="amber" />}
              {stats.partsCount.speaking > 0 && <StatCard icon={Mic} label="Speaking" value={`${stats.partsCount.speaking} Parts`} accent="purple" />}
            </div>

            {/* ── PARTS STRUCTURE (CẤU TRÚC ĐỀ THI) ── */}
            <div className="bg-white rounded-[24px] border-2 border-slate-200 shadow-sm overflow-hidden">
              
              {/* Header Box */}
              <div className="px-5 py-4 border-b-2 border-slate-100 flex items-center gap-3 bg-slate-50/50">
                <div className="w-10 h-10 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] border-b-[3px] rounded-[12px] flex items-center justify-center shadow-sm shrink-0">
                  <LayoutTemplate size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[16px] font-display font-black text-slate-800">Cấu trúc chi tiết</h3>
                  <p className="text-[12px] font-body font-bold text-slate-500 mt-0.5">
                    {stats.partsArr.length} phần thi · {stats.total} câu hỏi
                  </p>
                </div>
              </div>

              {/* List Parts */}
              <div className="divide-y-2 divide-slate-100">
                {stats.partsArr.length === 0 ? (
                  <div className="p-10 text-center font-display font-bold text-[14px] text-slate-400">Đề thi chưa có cấu trúc.</div>
                ) : (
                  stats.partsArr.map((part, index) => {
                    const config = TYPE_CONFIG[part.type] || TYPE_CONFIG.reading;
                    const Icon = config.icon;
                    const qCount = part.questions?.length || 0;

                    return (
                      <div key={part.id} className="p-5 sm:p-6 hover:bg-slate-50/50 transition-colors">
                        
                        {/* Part header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-4 min-w-0 flex-1">
                            <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border-2 border-b-[4px] shadow-sm ${config.bg} ${config.border}`}>
                              <Icon size={22} strokeWidth={2.5} className={config.color} />
                            </div>
                            <div className="min-w-0 pt-0.5">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`text-[10px] font-display font-black px-2 py-0.5 rounded-[6px] uppercase tracking-widest ${config.bg} ${config.color}`}>
                                  Phần {index + 1}
                                </span>
                                <span className="text-[10px] font-display font-bold text-slate-400 uppercase tracking-widest">
                                  {config.label}
                                </span>
                              </div>
                              <h4 className="text-[15px] font-display font-bold text-slate-800 leading-snug">{part.title}</h4>
                              {(part.description || part.instruction) && (
                                <p className="text-[13px] font-body font-medium text-slate-500 mt-1 italic">
                                  {part.description || part.instruction}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0 self-start">
                            <span className="text-[13px] font-display font-black text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-[10px]">
                              {qCount} Câu
                            </span>
                          </div>
                        </div>

                        {/* Nôi dung Audio / Text preview */}
                        <div className="pl-0 sm:pl-16 space-y-3">
                          {config.label === 'LISTENING' && part.audioUrl && (
                            <div className="bg-slate-100 border border-slate-200 rounded-[14px] px-4 py-3 flex items-center gap-3">
                              <span className="text-[13px] font-body font-bold text-slate-700 truncate flex-1">🎧 {part.audioName}</span>
                              <a href={part.audioUrl} target="_blank" rel="noreferrer" className="text-[12px] font-display font-bold text-[#1CB0F6] hover:text-[#1899D6] uppercase tracking-wider">Nghe thử</a>
                            </div>
                          )}

                          {(config.label === 'READING' || config.label === 'WRITING') && part.text && (
                            <div className="bg-slate-50 border border-slate-100 rounded-[14px] p-4">
                              <p className="text-[13px] font-body font-medium text-slate-600 line-clamp-3 italic leading-relaxed">
                                "{part.text}"
                              </p>
                            </div>
                          )}

                          {/* Questions preview */}
                          {qCount > 0 && (
                            <div className="bg-white border-2 border-slate-100 rounded-[16px] p-4 space-y-3 shadow-sm">
                              {(part.questions ?? []).slice(0, 3).map((q, i) => (
                                <div key={q.id} className="flex items-start gap-3">
                                  <span className="w-6 h-6 bg-slate-100 border border-slate-200 rounded-[8px] flex items-center justify-center text-[11px] font-display font-black text-slate-500 shrink-0 mt-0.5">
                                    {i + 1}
                                  </span>
                                  <p className="text-[14px] font-body font-bold text-slate-700 leading-snug truncate flex-1 pt-0.5">
                                    {q.question}
                                  </p>
                                  {q.correct !== undefined && (
                                    <span className="text-[11px] font-display font-black text-[#58CC02] bg-[#f1faeb] border border-[#bcf096] px-2 py-1 rounded-[8px] flex items-center gap-1 shrink-0">
                                      <Check size={12} strokeWidth={3} />
                                      {String.fromCharCode(65 + q.correct)}
                                    </span>
                                  )}
                                </div>
                              ))}
                              {qCount > 3 && (
                                <div className="text-center pt-3 mt-3 border-t-2 border-dashed border-slate-100">
                                  <p className="text-[11px] font-display font-black uppercase tracking-widest text-slate-400">
                                    + {qCount - 3} câu hỏi ẩn
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

            {/* ── USAGE STATS ── */}
            <div>
              <h3 className="text-[16px] font-display font-black text-slate-800 mb-4 pl-1">Hiệu suất Đề thi</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <UsageStat icon={Users}       label="Lượt tham gia" value={exam.stats?.participants ?? 0} />
                <UsageStat icon={CheckCircle} label="Đã nộp bài"  value={exam.stats?.completed    ?? 0} />
                <UsageStat icon={Target}      label="Điểm TB"     value={`${exam.stats?.avgScore ?? 0}%`} />
              </div>
            </div>

          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DetailsExam;
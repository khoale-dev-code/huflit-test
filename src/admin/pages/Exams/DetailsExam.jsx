// src/admin/pages/Exams/DetailsExam.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Edit3, ArrowLeft, AlertTriangle, Clock, HelpCircle, Headphones, BookOpen,
  Users, CheckCircle, Target, Check, PenTool, Mic, 
  LayoutTemplate, FileText, ChevronDown, ChevronUp, Image as ImageIcon, Music, Star, Layers,
  Eye, EyeOff
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';

// ─── CONFIGURATION ──────────────────────────────────────────
const EXAM_CATEGORIES = [
  { value: 'toeic',  label: 'Luyện thi TOEIC' },
  { value: 'ielts',  label: 'Luyện thi IELTS' },
  { value: 'huflit', label: 'Đề thi trường HUFLIT' },
  { value: 'thpt',   label: 'Đề thi THPT Quốc Gia' },
  { value: 'other',  label: 'Khác / Chưa phân loại' },
];

const TYPE_CONFIG = {
  listening: { icon: Headphones, color: 'text-[#1CB0F6]', bg: 'bg-[#EAF6FE]', border: 'border-[#BAE3FB]', label: 'LISTENING' },
  reading:   { icon: BookOpen,   color: 'text-[#58CC02]', bg: 'bg-[#F0FAE8]', border: 'border-[#bcf096]', label: 'READING' },
  writing:   { icon: PenTool,    color: 'text-[#FF9600]', bg: 'bg-[#FFFBEA]', border: 'border-[#FFD8A8]', label: 'WRITING' },
  speaking:  { icon: Mic,        color: 'text-[#CE82FF]', bg: 'bg-[#F8EEFF]', border: 'border-[#eec9ff]', label: 'SPEAKING' },
};

/* ─── COMPONENT: 3D STAT CARD ───────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, accent = 'blue' }) => {
  const themes = {
    blue:   'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]',
    green:  'bg-[#F0FAE8] text-[#58CC02] border-[#bcf096]',
    amber:  'bg-[#FFFBEA] text-[#FF9600] border-[#FFD8A8]',
    purple: 'bg-[#F8EEFF] text-[#CE82FF] border-[#eec9ff]',
  };

  if (!Icon) return null; 

  return (
    <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-5 shadow-sm flex flex-col gap-4 hover:-translate-y-1 transition-transform">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-b-[4px] shadow-sm ${themes[accent] || themes.blue}`}>
        <Icon size={26} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[20px] sm:text-[24px] font-black text-slate-800 leading-none">{value}</p>
      </div>
    </div>
  );
};

/* ─── COMPONENT: USAGE STAT CARD ────────────────────────────────── */
const UsageStat = ({ icon: Icon, label, value }) => {
  if (!Icon) return null;

  return (
    <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-5 shadow-sm flex items-center gap-5">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center shrink-0 shadow-inner">
        <Icon size={26} strokeWidth={2.5} className="text-slate-400" />
      </div>
      <div className="min-w-0 pt-0.5">
        <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[22px] sm:text-[28px] font-black text-slate-800 leading-none">{value}</p>
      </div>
    </div>
  );
};

/* ─── COMPONENT: QUESTION PREVIEW CARD ──────────────────────────── */
const PreviewQuestionCard = ({ question }) => {
  const isExample = question.isExample;
  return (
    <div className={`p-5 rounded-2xl border-2 mb-5 transition-colors ${
      isExample ? 'bg-[#FFFBEA] border-[#FFD8A8] border-b-[4px]' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border-b-[3px] text-[14px] font-black text-white shadow-sm ${
          isExample ? 'bg-[#FF9600] border-[#E58700]' : 'bg-[#1CB0F6] border-[#1899D6]'
        }`}>
          {question.displayIndex}
        </div>
        
        <div className="flex-1 min-w-0 pt-1.5">
          <div className="flex flex-wrap gap-2.5 mb-3">
            {isExample && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF9600]/10 border border-[#FFD8A8] text-[#FF9600] text-[10px] font-black uppercase tracking-widest"><Star size={12} strokeWidth={3} /> Câu Ví Dụ</span>}
            {question.imageUrl && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest"><ImageIcon size={12} strokeWidth={3} /> Có Ảnh</span>}
            {question.audioUrl && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EAF6FE] border border-[#BAE3FB] text-[#1CB0F6] text-[10px] font-black uppercase tracking-widest"><Music size={12} strokeWidth={3} /> Audio riêng</span>}
          </div>
          
          <h4 className={`text-[15px] sm:text-[16px] font-bold leading-relaxed whitespace-pre-wrap ${isExample ? 'text-[#D9A600]' : 'text-slate-800'}`}>
            {question.question || <span className="italic text-slate-400 font-medium">(Không có nội dung câu hỏi)</span>}
          </h4>
        </div>
      </div>

      {question.options && question.options.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-14">
          {question.options.map((opt, i) => {
            const isCorrect = question.correct === i;
            return (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-colors ${
                isCorrect ? 'bg-[#F0FAE8] border-[#bcf096]' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black shrink-0 shadow-sm border-b-2 ${
                  isCorrect ? 'bg-[#58CC02] text-white border-[#46A302]' : 'bg-white border-slate-200 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className={`text-[14px] font-bold truncate flex-1 ${isCorrect ? 'text-[#46A302]' : 'text-slate-600'}`}>
                  {opt || <span className="italic text-slate-400 font-medium">Nghe trong Audio</span>}
                </span>
                {isCorrect && <Check size={18} className="text-[#58CC02] shrink-0" strokeWidth={3} />}
              </div>
            );
          })}
        </div>
      )}

      {question.explanation && (
        <div className="mt-5 pl-14">
          <div className="bg-[#FFFBEA] border-2 border-[#FFD8A8] rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#FF9600]" />
            <p className="text-[14px] font-bold text-slate-700 leading-relaxed m-0 whitespace-pre-wrap pl-2">
              <span className="font-black text-[#D9A600] uppercase tracking-widest mr-2 block mb-1">💡 Giải thích:</span>
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE: DETAILS EXAM
════════════════════════════════════════════════════════════════ */
const DetailsExam = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [exam,        setExam]        = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedParts, setExpandedParts] = useState({});

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    handleResize(); // Init on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getExamById(id);
        if (!isMounted) return;
        
        if (data.parts && !Array.isArray(data.parts) && typeof data.parts === 'object') {
          data.parts = Object.entries(data.parts).map(([key, val]) => ({ 
            ...val, 
            id: key, 
            type: val.type || (['part1', 'part2', 'part3', 'part4'].includes(key) ? 'listening' : 'reading') 
          }));
        }
        setExam(data);
        if (data.parts?.length > 0) {
          setExpandedParts({ [data.parts[0].id]: true });
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [id]);

  // ── Tính toán thống kê & INDEX CHUẨN ──
  const stats = useMemo(() => {
    if (!exam) return { total: 0, counts: {}, partsCount: {}, partsArr: [] };
    
    const partsArr = Array.isArray(exam.parts) ? exam.parts : [];
    let total = 0;
    let counts = { listening: 0, reading: 0, writing: 0, speaking: 0 };
    let partsCount = { listening: 0, reading: 0, writing: 0, speaking: 0 };
    let globalIndex = 1;

    const indexedParts = partsArr.map(part => {
      let partQCount = 0;
      const indexedQuestions = (part.questions || []).map(q => {
        if (q.type === 'group') {
          const indexedSubQs = (q.subQuestions || []).map(sq => {
            if (sq.isExample) return { ...sq, displayIndex: 'VD' };
            partQCount++;
            return { ...sq, displayIndex: globalIndex++ };
          });
          return { ...q, subQuestions: indexedSubQs };
        } else {
          if (q.isExample) return { ...q, displayIndex: 'VD' };
          partQCount++;
          return { ...q, displayIndex: globalIndex++ };
        }
      });
      
      total += partQCount;
      if (counts[part.type] !== undefined) {
        counts[part.type] += partQCount;
        partsCount[part.type] += 1;
      }
      return { ...part, questions: indexedQuestions, qCount: partQCount };
    });

    return { total, counts, partsCount, partsArr: indexedParts };
  }, [exam]);

  const togglePart = useCallback((partId) => {
    setExpandedParts(prev => ({ ...prev, [partId]: !prev[partId] }));
  }, []);

  // ── Renders (Loading/Error) ──
  if (loading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F4F7FA] flex-col gap-4 font-nunito selection:bg-blue-200">
      <div className="w-16 h-16 border-[6px] border-slate-200 border-t-[#1CB0F6] rounded-full animate-spin shadow-inner" />
      <p className="font-black text-slate-400 text-[18px] uppercase tracking-widest">Đang tải dữ liệu...</p>
    </div>
  );

  if (error || !exam) return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F4F7FA] font-nunito selection:bg-blue-200 p-4">
      <div className="text-center bg-white p-10 rounded-[32px] border-2 border-slate-200 border-b-[8px] shadow-sm max-w-md w-full">
        <div className="w-24 h-24 bg-[#FFF0F0] rounded-3xl border-2 border-[#ffc1c1] border-b-[6px] flex items-center justify-center mx-auto mb-6">
           <AlertTriangle className="w-12 h-12 text-[#FF4B4B]" strokeWidth={3} />
        </div>
        <h3 className="text-[24px] font-black text-slate-800 mb-2">Lỗi tải dữ liệu!</h3>
        <p className="text-[15px] font-bold text-slate-500 mb-8 leading-relaxed">{error ?? 'Không tìm thấy bộ đề này trong hệ thống.'}</p>
        <button onClick={() => navigate('/admin/exams')} className="w-full py-4 bg-[#1CB0F6] text-white border-2 border-[#1899D6] border-b-[6px] rounded-2xl font-black text-[15px] uppercase tracking-widest active:translate-y-[4px] active:border-b-2 transition-all outline-none shadow-sm">
          Quay lại danh sách
        </button>
      </div>
    </div>
  );

  const catInfo = EXAM_CATEGORIES.find(c => c.value === exam.category) || EXAM_CATEGORIES[4];

  return (
    <div className="flex h-screen bg-[#F4F7FA] font-nunito overflow-hidden selection:bg-[#1CB0F6] selection:text-white">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => navigate('/admin/exams/create')} />

        {/* ── STICKY HEADER (To & Rõ ràng hơn) ── */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b-2 border-slate-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 shrink-0 shadow-sm">
          <nav className="flex items-center gap-4 min-w-0 overflow-hidden">
            <button 
              onClick={() => navigate('/admin/exams')} 
              className="w-12 h-12 bg-white rounded-2xl border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-400 hover:text-[#1CB0F6] hover:border-[#BAE3FB] hover:bg-[#EAF6FE] active:border-b-2 active:translate-y-[2px] transition-all outline-none shrink-0"
              title="Quay lại"
            >
              <ArrowLeft size={24} strokeWidth={3} />
            </button>
            <div className="flex flex-col min-w-0">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hidden sm:block mb-0.5">Chi tiết bộ đề</p>
              <p className="text-[16px] sm:text-[20px] font-black text-slate-800 truncate leading-tight">
                {exam.title}
              </p>
            </div>
          </nav>

          <button 
            onClick={() => navigate(`/admin/exams/edit/${id}`)} 
            className="flex items-center gap-2 px-5 sm:px-8 py-3 bg-[#1CB0F6] text-white rounded-2xl border-2 border-[#1899D6] border-b-[4px] hover:bg-[#18A0E0] hover:border-[#1582BE] active:border-b-2 active:translate-y-[2px] font-black text-[13px] sm:text-[15px] uppercase tracking-widest transition-all outline-none shadow-sm shrink-0"
          >
            <Edit3 size={20} strokeWidth={3} />
            <span className="hidden sm:inline pt-0.5">Chỉnh sửa đề</span>
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-8">

            {/* ── HERO BANNER ── */}
            <div className="bg-white p-8 sm:p-10 rounded-[32px] border-2 border-slate-200 border-b-[8px] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="absolute -top-4 -right-4 p-6 opacity-[0.03] pointer-events-none">
                <FileText className="w-64 h-64" />
              </div>
              
              <div className="relative z-10 flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-block px-4 py-1.5 bg-slate-50 border-2 border-slate-200 text-slate-500 font-black text-[11px] uppercase tracking-widest rounded-xl shadow-sm">
                    {catInfo.label}
                  </span>
                  
                  {exam.is_public ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#F0FAE8] border-2 border-[#bcf096] text-[#58CC02] font-black text-[11px] uppercase tracking-widest rounded-xl shadow-sm">
                      <CheckCircle size={14} strokeWidth={3} /> Đã xuất bản
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FFFBEA] border-2 border-[#FFD8A8] text-[#FF9600] font-black text-[11px] uppercase tracking-widest rounded-xl shadow-sm">
                      <EyeOff size={14} strokeWidth={3} /> Bản nháp (Đang ẩn)
                    </span>
                  )}
                </div>

                <h1 className="text-[32px] sm:text-[42px] font-black text-slate-800 tracking-tight leading-[1.2] mb-4">
                  {exam.title}
                </h1>
                {exam.description && (
                  <p className="text-[16px] font-bold text-slate-500 leading-relaxed max-w-3xl">
                    {exam.description}
                  </p>
                )}
              </div>
            </div>

            {/* ── META STATS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatCard icon={Clock}      label="Thời gian" value={`${exam.duration || 90} phút`} accent="amber" />
              <StatCard icon={HelpCircle} label="Tổng câu"  value={`${stats.total} câu`} accent="green" />
              {stats.partsCount.listening > 0 && <StatCard icon={Headphones} label="Listening" value={`${stats.partsCount.listening} Parts`} accent="blue" />}
              {stats.partsCount.reading > 0 && <StatCard icon={BookOpen} label="Reading" value={`${stats.partsCount.reading} Parts`} accent="purple" />}
            </div>

            {/* ── HIỂN THỊ CẤU TRÚC ĐỀ (ACCORDION MƯỢT MÀ) ── */}
            <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] shadow-sm overflow-hidden flex flex-col">
              
              <div className="px-6 py-5 border-b-2 border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] border-b-[4px] rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <LayoutTemplate size={24} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black text-slate-800">Cấu trúc đề thi</h3>
                    <p className="text-[13px] font-bold text-slate-500 mt-0.5">
                      Gồm {stats.partsArr.length} phần thi khác nhau.
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y-2 divide-slate-100 bg-white">
                {stats.partsArr.length === 0 ? (
                  <div className="p-16 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl border-2 border-slate-200 flex items-center justify-center">
                      <LayoutTemplate className="text-slate-300" size={32} />
                    </div>
                    <p className="font-black text-[15px] text-slate-400 uppercase tracking-widest">Đề thi chưa có cấu trúc câu hỏi.</p>
                  </div>
                ) : (
                  stats.partsArr.map((part, index) => {
                    const config = TYPE_CONFIG[part.type] || TYPE_CONFIG.reading;
                    const Icon = config.icon;
                    const isExpanded = !!expandedParts[part.id];

                    return (
                      <div key={part.id} className="transition-colors group">
                        
                        {/* HEADER ACCORDION (To, Dễ bấm) */}
                        <button 
                          onClick={() => togglePart(part.id)}
                          className={`w-full p-6 sm:p-8 flex items-center justify-between gap-6 outline-none transition-all ${isExpanded ? 'bg-slate-50' : 'hover:bg-[#F8FAFC]'}`}
                        >
                          <div className="flex items-center gap-5 min-w-0">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 border-b-[4px] shadow-sm transition-transform group-hover:scale-105 ${config.bg} ${config.border}`}>
                              <Icon size={26} strokeWidth={2.5} className={config.color} />
                            </div>
                            <div className="text-left min-w-0 pt-0.5">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg uppercase tracking-[0.15em] shadow-sm ${config.bg} ${config.color}`}>
                                  Phần {index + 1}
                                </span>
                                {part.audioUrl && <span className="bg-[#EAF6FE] text-[#1CB0F6] px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1.5 uppercase tracking-widest shadow-sm"><Headphones size={12} strokeWidth={3} /> Audio Tổng</span>}
                              </div>
                              <h4 className="text-[18px] sm:text-[20px] font-black text-slate-800 leading-snug truncate">{part.title}</h4>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-5 shrink-0">
                            <span className="hidden sm:inline-flex items-center text-[13px] font-black text-slate-500 bg-white border-2 border-slate-200 px-4 py-1.5 rounded-xl shadow-sm">
                              {part.qCount} Câu
                            </span>
                            <div className={`w-10 h-10 rounded-[14px] border-2 flex items-center justify-center transition-all ${isExpanded ? 'bg-[#1CB0F6] border-[#1899D6] border-b-[3px] text-white shadow-sm' : 'bg-white border-slate-200 border-b-[3px] text-slate-400'}`}>
                              {isExpanded ? <ChevronUp size={20} strokeWidth={3} /> : <ChevronDown size={20} strokeWidth={3} />}
                            </div>
                          </div>
                        </button>

                        {/* NỘI DUNG CÂU HỎI */}
                        <AnimatePresence>
                          {isExpanded && (
                            <Motion.div 
                              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-slate-50 border-t-2 border-slate-100"
                            >
                              <div className="px-6 sm:px-16 pb-8 space-y-6 pt-6">
                                
                                {/* Hướng dẫn làm bài */}
                                {(part.description || part.instruction) && (
                                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm">
                                    <p className="text-[15px] font-bold text-slate-600 italic leading-relaxed">
                                      <span className="text-[#1CB0F6] uppercase font-black tracking-widest mr-2 not-italic">Hướng dẫn:</span>
                                      {part.description || part.instruction}
                                    </p>
                                  </div>
                                )}

                                {/* Lặp các câu hỏi */}
                                {(part.questions || []).map(q => {
                                  if (q.type === 'group') {
                                    return (
                                      <div key={q.id} className="bg-[#F8EEFF] border-2 border-[#eec9ff] border-b-[6px] rounded-[28px] p-6 sm:p-8 shadow-sm mb-8">
                                        <div className="flex items-center gap-2 mb-4">
                                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border-2 border-[#eec9ff] text-[#CE82FF]">
                                            <Layers size={18} strokeWidth={3} />
                                          </div>
                                          <span className="text-[12px] font-black text-[#CE82FF] uppercase tracking-widest">Nhóm câu hỏi (Đoạn văn/Hội thoại)</span>
                                        </div>
                                        
                                        <div className="bg-white border-2 border-[#eec9ff] rounded-[20px] p-5 mb-6 whitespace-pre-wrap text-[15px] font-bold text-slate-700 shadow-sm leading-relaxed">
                                          {q.imageUrl && <img src={q.imageUrl} alt="Group" className="max-h-56 rounded-xl mb-4 border-2 border-slate-100 object-contain shadow-sm" />}
                                          {q.audioUrl && <div className="flex items-center gap-2 text-[#1CB0F6] bg-[#EAF6FE] px-4 py-2 rounded-xl mb-4 w-fit font-black text-[13px] border border-[#BAE3FB]"><Music size={16} strokeWidth={3} /> Audio Kèm theo</div>}
                                          {q.content || <span className="italic text-slate-400 font-medium">Chưa có nội dung đoạn văn</span>}
                                        </div>

                                        <div className="sm:pl-6 sm:border-l-4 sm:border-[#eec9ff] space-y-4">
                                          {q.subQuestions?.map(sq => (
                                            <PreviewQuestionCard key={sq.id} question={sq} />
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  }
                                  return <PreviewQuestionCard key={q.id} question={q} />;
                                })}
                              </div>
                            </Motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ── USAGE STATS ── */}
            <div className="pt-4">
              <h3 className="text-[18px] font-black text-slate-800 mb-5 flex items-center gap-2">
                <Target size={24} className="text-[#FF9600]" strokeWidth={3} /> Thống kê hiệu suất
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <UsageStat icon={Users}       label="Lượt tham gia" value={exam.stats?.participants ?? 0} />
                <UsageStat icon={CheckCircle} label="Đã hoàn thành" value={exam.stats?.completed    ?? 0} />
                <UsageStat icon={Target}      label="Điểm Trung Bình" value={`${exam.stats?.avgScore ?? 0}%`} />
              </div>
            </div>

          </Motion.div>
        </main>
      </div>
    </div>
  );
};

export default DetailsExam;
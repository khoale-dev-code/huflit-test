// src/admin/pages/Exams/DetailsExam.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Edit3, ArrowLeft, Loader2, AlertTriangle,
  Clock, HelpCircle, Headphones, BookOpen,
  Users, CheckCircle, Target, Check, PenTool, Mic, 
  LayoutTemplate, FileText, ChevronDown, ChevronUp, Image as ImageIcon, Music, Star, Layers,
  Eye, EyeOff // 🔒 Thêm 2 Icon này để dùng cho Badge trạng thái
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
 
// ─── Cấu hình Danh mục ──────────────────────────────────────────
const EXAM_CATEGORIES = [
  { value: 'toeic',  label: 'Luyện thi TOEIC' },
  { value: 'ielts',  label: 'Luyện thi IELTS' },
  { value: 'huflit', label: 'Đề thi trường HUFLIT' },
  { value: 'thpt',   label: 'Đề thi THPT Quốc Gia' },
  { value: 'other',  label: 'Khác / Chưa phân loại' },
];
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

// ─── Question Preview Card (Câu hỏi đơn) ────────────────────────────
const PreviewQuestionCard = ({ question }) => {
  const isExample = question.isExample;
  return (
    <div className={`p-4 rounded-[16px] border-2 border-b-[4px] mb-4 ${isExample ? 'bg-[#FFFBEA] border-[#FFD8A8]' : 'bg-white border-slate-200'}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-8 h-8 rounded-[10px] shrink-0 flex items-center justify-center border-b-[3px] text-[12px] font-display font-black text-white ${isExample ? 'bg-[#FF9600] border-[#E58700]' : 'bg-[#1CB0F6] border-[#1899D6]'}`}>
          {question.displayIndex}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          {/* Các cờ Media & Trạng thái */}
          <div className="flex flex-wrap gap-2 mb-2">
            {isExample && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FF9600]/20 text-[#FF9600] text-[10px] font-display font-black uppercase"><Star size={10} strokeWidth={3} /> Câu Ví Dụ</span>}
            {question.imageUrl && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-display font-black uppercase"><ImageIcon size={10} strokeWidth={3} /> Có Ảnh</span>}
            {question.audioUrl && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EAF6FE] text-[#1CB0F6] text-[10px] font-display font-black uppercase"><Music size={10} strokeWidth={3} /> Có Audio riêng</span>}
          </div>
          
          <h4 className={`text-[14px] sm:text-[15px] font-body font-bold leading-snug whitespace-pre-wrap ${isExample ? 'text-[#D9A600]' : 'text-slate-800'}`}>
            {question.question || <span className="italic text-slate-400">(Không có nội dung câu hỏi)</span>}
          </h4>
        </div>
      </div>

      {/* Hiển thị các Option đáp án */}
      {question.options && question.options.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-11">
          {question.options.map((opt, i) => {
            const isCorrect = question.correct === i;
            return (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-[12px] border-2 ${isCorrect ? 'bg-[#f1faeb] border-[#bcf096]' : 'bg-slate-50 border-slate-100'}`}>
                <div className={`w-6 h-6 rounded-[6px] flex items-center justify-center text-[11px] font-display font-black shrink-0 ${isCorrect ? 'bg-[#58CC02] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className={`text-[13px] font-body font-bold truncate ${isCorrect ? 'text-[#46A302]' : 'text-slate-600'}`}>
                  {opt || <span className="italic text-slate-400">Đáp án trong Audio</span>}
                </span>
                {isCorrect && <Check size={14} className="text-[#58CC02] ml-auto shrink-0" strokeWidth={3} />}
              </div>
            );
          })}
        </div>
      )}

      {/* Hiển thị Giải thích */}
      {question.explanation && (
        <div className="mt-3 pl-11">
          <div className="bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[12px] p-3 text-[13px] font-body font-bold text-slate-600">
            <span className="text-[#1CB0F6] uppercase tracking-wider font-display font-black mr-2">💡 Giải thích:</span>
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────
const DetailsExam = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [exam,        setExam]        = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Quản lý việc đóng mở từng Part để dễ xem
  const [expandedParts, setExpandedParts] = useState({});

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
        if (data.parts && !Array.isArray(data.parts) && typeof data.parts === 'object') {
          data.parts = Object.entries(data.parts).map(([key, val]) => {
            let type = val.type || (['part1', 'part2', 'part3', 'part4'].includes(key) ? 'listening' : 'reading');
            return { ...val, id: key, type };
          });
        }
        setExam(data);
        // Mặc định mở Part đầu tiên
        if (data.parts && data.parts.length > 0) {
          setExpandedParts({ [data.parts[0].id]: true });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // ── Tính toán thống kê & INDEX CHUẨN cho mảng parts ──
  const stats = useMemo(() => {
    if (!exam) return null;
    const partsArr = Array.isArray(exam.parts) ? exam.parts : [];
    
    let total = 0;
    let counts = { listening: 0, reading: 0, writing: 0, speaking: 0 };
    let partsCount = { listening: 0, reading: 0, writing: 0, speaking: 0 };

    // Tính toán lại mảng để gán `displayIndex` (1 đến 200) cho từng câu
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

  const togglePart = (partId) => {
    setExpandedParts(prev => ({ ...prev, [partId]: !prev[partId] }));
  };

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
        <button onClick={() => navigate('/admin/exams')} className="w-full py-2.5 bg-[#1CB0F6] text-white border-2 border-[#1899D6] border-b-[4px] rounded-[14px] font-display font-black uppercase tracking-wider active:translate-y-[2px] transition-all">
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

        {/* ── STICKY HEADER ── */}
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
            className="flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1CB0F6] text-white rounded-[14px] border-2 border-[#1899D6] border-b-[4px] hover:bg-[#18A0E0] active:border-b-2 active:translate-y-[2px] font-display font-black text-[13px] sm:text-[14px] uppercase tracking-wider transition-all outline-none shadow-sm shrink-0"
          >
            <Edit3 size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline pt-0.5">Vào Chỉnh sửa</span>
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-6 sm:space-y-8">

            {/* ── HERO BANNER ── */}
            <div className="bg-white p-6 sm:p-8 rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="absolute -top-4 -right-4 p-6 opacity-[0.03] pointer-events-none">
                <FileText className="w-40 h-40" />
              </div>
              
              <div className="relative z-10 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 text-slate-500 font-display font-black text-[10px] uppercase tracking-widest rounded-[8px]">
                    {catInfo.label}
                  </span>
                  
                  {/* 🔒 FIX: Thêm Badge Trạng thái Public / Draft */}
                  {exam.is_public ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f1faeb] border border-[#bcf096] text-[#58CC02] font-display font-black text-[10px] uppercase tracking-widest rounded-[8px]">
                      <CheckCircle size={12} strokeWidth={3} /> Đã xuất bản
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fff8e6] border border-[#FFC800]/40 text-[#e5b400] font-display font-black text-[10px] uppercase tracking-widest rounded-[8px]">
                      <EyeOff size={12} strokeWidth={3} /> Bản nháp (Đang ẩn)
                    </span>
                  )}
                </div>

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
            </div>

            {/* ── HIỂN THỊ CHI TIẾT TỪNG PHẦN THI (FULL PREVIEW) ── */}
            <div className="bg-white rounded-[24px] border-2 border-slate-200 shadow-sm overflow-hidden">
              
              <div className="px-5 py-4 border-b-2 border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] border-b-[3px] rounded-[12px] flex items-center justify-center shadow-sm shrink-0">
                    <LayoutTemplate size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-display font-black text-slate-800">Cấu trúc đề thi</h3>
                    <p className="text-[12px] font-body font-bold text-slate-500 mt-0.5">
                      Bấm vào từng phần để xem chi tiết câu hỏi
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y-2 divide-slate-100">
                {stats.partsArr.length === 0 ? (
                  <div className="p-10 text-center font-display font-bold text-[14px] text-slate-400">Đề thi chưa có cấu trúc.</div>
                ) : (
                  stats.partsArr.map((part, index) => {
                    const config = TYPE_CONFIG[part.type] || TYPE_CONFIG.reading;
                    const Icon = config.icon;
                    const isExpanded = !!expandedParts[part.id];

                    return (
                      <div key={part.id} className="transition-colors">
                        
                        {/* ── HEADER CỦA TỪNG PART (Accordion) ── */}
                        <button 
                          onClick={() => togglePart(part.id)}
                          className={`w-full p-5 sm:p-6 flex items-center justify-between gap-4 outline-none transition-colors ${isExpanded ? 'bg-slate-50/80' : 'hover:bg-slate-50'}`}
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border-2 border-b-[4px] shadow-sm ${config.bg} ${config.border}`}>
                              <Icon size={22} strokeWidth={2.5} className={config.color} />
                            </div>
                            <div className="text-left min-w-0 pt-0.5">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`text-[10px] font-display font-black px-2 py-0.5 rounded-[6px] uppercase tracking-widest ${config.bg} ${config.color}`}>
                                  Phần {index + 1}
                                </span>
                                {part.audioUrl && <span className="bg-[#EAF6FE] text-[#1CB0F6] px-2 py-0.5 rounded-[6px] text-[10px] font-display font-black flex items-center gap-1 uppercase"><Headphones size={10} /> Có Audio tổng</span>}
                              </div>
                              <h4 className="text-[16px] font-display font-black text-slate-800 leading-snug">{part.title}</h4>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 shrink-0">
                            <span className="hidden sm:inline-block text-[13px] font-display font-black text-slate-500 bg-white border-2 border-slate-200 px-3 py-1 rounded-[10px]">
                              {part.qCount} Câu
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400">
                              {isExpanded ? <ChevronUp size={18} strokeWidth={3} /> : <ChevronDown size={18} strokeWidth={3} />}
                            </div>
                          </div>
                        </button>

                        {/* ── NỘI DUNG CHI TIẾT CỦA PART ── */}
                        <AnimatePresence>
                          {isExpanded && (
                            <Motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: 'auto', opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-slate-50/50"
                            >
                              <div className="px-5 sm:px-20 pb-6 space-y-4 pt-2">
                                
                                {/* Hướng dẫn làm bài */}
                                {(part.description || part.instruction) && (
                                  <div className="bg-white border-2 border-slate-200 rounded-[14px] p-4 shadow-sm mb-6">
                                    <p className="text-[13px] font-body font-bold text-slate-600 italic">
                                      <span className="text-slate-400 uppercase font-display font-black tracking-widest mr-2 not-italic">Hướng dẫn:</span>
                                      {part.description || part.instruction}
                                    </p>
                                  </div>
                                )}

                                {/* Lặp các câu hỏi */}
                                {(part.questions || []).map(q => {
                                  
                                  if (q.type === 'group') {
                                    return (
                                      <div key={q.id} className="bg-[#F8EEFF] border-2 border-[#eec9ff] rounded-[24px] p-5 shadow-sm mb-6">
                                        <div className="flex items-center gap-2 mb-3">
                                          <Layers size={16} strokeWidth={3} className="text-[#CE82FF]" />
                                          <span className="text-[11px] font-display font-black text-[#CE82FF] uppercase tracking-widest">Nhóm câu hỏi (Đoạn văn/Hội thoại)</span>
                                        </div>
                                        
                                        <div className="bg-white border-2 border-[#eec9ff] rounded-[16px] p-4 mb-5 whitespace-pre-wrap text-[14px] font-body font-bold text-slate-700">
                                          {q.imageUrl && <img src={q.imageUrl} alt="Group" className="max-h-40 rounded-xl mb-3 border border-slate-100 object-contain" />}
                                          {q.audioUrl && <div className="flex items-center gap-2 text-[#1CB0F6] bg-[#EAF6FE] p-2 rounded-xl mb-3 w-fit font-display font-black text-[12px]"><Music size={14} /> Có Audio kèm theo</div>}
                                          {q.content || <span className="italic text-slate-400">Chưa có nội dung đoạn văn</span>}
                                        </div>

                                        <div className="pl-4 border-l-4 border-[#eec9ff] space-y-3">
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
            <div>
              <h3 className="text-[16px] font-display font-black text-slate-800 mb-4 pl-1">Hiệu suất Đề thi</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <UsageStat icon={Users}       label="Lượt tham gia" value={exam.stats?.participants ?? 0} />
                <UsageStat icon={CheckCircle} label="Đã nộp bài"  value={exam.stats?.completed    ?? 0} />
                <UsageStat icon={Target}      label="Điểm TB"     value={`${exam.stats?.avgScore ?? 0}%`} />
              </div>
            </div>

          </Motion.div>
        </main>
      </div>
    </div>
  );
};

export default DetailsExam;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Clock, BookOpen, Sparkles, Lock, Play, Share2, PenTool, BookMarked, Zap, Target, Eye, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonById } from '../../../data/lessonApi';

/* ──────────────────────────────────────
   GLOBAL STYLES FOR RICH TEXT CONTENT (3D Enhanced & Bug Fixed)
   ────────────────────────────────────── */
const CONTENT_STYLES = '__lesson_gamified_3d_styles__';
if (typeof document !== 'undefined' && !document.getElementById(CONTENT_STYLES)) {
  const style = document.createElement('style');
  style.id = CONTENT_STYLES;
  style.textContent = `
    .gamified-content {
      font-family: 'Be Vietnam Pro', sans-serif !important;
      color: #334155 !important;
      line-height: 1.85 !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      overflow-wrap: break-word !important;
    }
    
    /* 🔥 FIX TRỰC TIẾP LỖI LẸM CHỮ: Triệt tiêu khoảng trống trên cùng */
    .gamified-content > *:first-child,
    .gamified-content > *:first-child > *:first-child { 
      margin-top: 0 !important; 
    }
    
    /* 3D Headings */
    .gamified-content h1, .gamified-content h2, .gamified-content h3 {
      font-family: 'Baloo 2', cursive, sans-serif !important;
      color: #0F172A !important;
      font-weight: 800 !important;
      margin: 1.8em 0 0.8em 0 !important;
      line-height: 1.3 !important;
    }
    
    .gamified-content h1 { 
      font-size: clamp(28px, 4vw, 34px) !important; 
      color: #1CB0F6 !important; 
      text-shadow: 0 3px 0 #BAE3FB !important; /* 3D Text Shadow */
    }
    .gamified-content h2 { 
      font-size: clamp(24px, 3vw, 28px) !important; 
      padding-bottom: 12px !important; 
      border-bottom: 4px solid #E2E8F0 !important; 
      border-radius: 4px !important;
    }
    
    /* Links */
    .gamified-content a {
      color: #1CB0F6 !important; font-weight: 800 !important; text-decoration: none !important;
      border-bottom: 3px solid #BAE3FB !important; transition: all 0.2s ease !important;
    }
    .gamified-content a:hover { color: #1899D6 !important; border-bottom-width: 5px !important; }
    
    /* 3D Bold Highlight */
    .gamified-content strong, .gamified-content b {
      color: #0F172A !important; font-weight: 800 !important; background-color: #EAF6FE !important;
      padding: 2px 8px !important; border-radius: 10px !important;
      border: 1px solid #BAE3FB !important; border-bottom: 3px solid #1CB0F6 !important; /* 3D Pill */
      display: inline-block; transform: translateY(-1px);
    }
    
    /* 3D Lists */
    .gamified-content ul { list-style: none !important; padding-left: 0 !important; margin: 1.5em 0 !important; }
    .gamified-content ul li { position: relative !important; padding-left: 36px !important; margin-bottom: 1em !important; }
    .gamified-content ul li::before {
      content: '' !important; position: absolute !important; left: 4px !important; top: 8px !important;
      width: 14px !important; height: 14px !important; 
      background: linear-gradient(135deg, #1CB0F6, #1899D6) !important; 
      border-radius: 6px !important; border-bottom: 3px solid #0284C7 !important; /* 3D Bullet */
    }
    
    /* 3D Blockquote */
    .gamified-content blockquote {
      margin: 2em 0 !important; padding: 24px !important;
      background: linear-gradient(180deg, #FFFBEA 0%, #FFF4E5 100%) !important;
      border: 2px solid #FFC200 !important; border-bottom: 8px solid #FF9600 !important; /* 3D Box */
      border-radius: 24px !important; font-style: italic !important; color: #B28600 !important; font-weight: 700 !important;
    }
    
    /* Images */
    .gamified-content img {
      max-width: 100% !important; height: auto !important;
      border-radius: 24px !important; margin: 2em auto !important; display: block !important;
      border: 4px solid #E2E8F0 !important; border-bottom-width: 12px !important; /* 3D Image Frame */
      box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
    }
  `;
  document.head.appendChild(style);
}

const CATEGORY_CONFIG = {
  grammar:    { label: 'Ngữ pháp', icon: PenTool,    bg: 'bg-blue-50',    color: 'text-blue-500',    border: 'border-blue-200' },
  vocabulary: { label: 'Từ vựng',  icon: BookMarked, bg: 'bg-emerald-50', color: 'text-emerald-500', border: 'border-emerald-200' },
  tips:       { label: 'Mẹo thi',  icon: Zap,        bg: 'bg-amber-50',   color: 'text-amber-500',   border: 'border-amber-200' },
  strategy:   { label: 'Chiến thuật', icon: Target,  bg: 'bg-purple-50',  color: 'text-purple-500',  border: 'border-purple-200' },
};

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getLessonById(id);
        setLesson(data);
      } catch (error) {
        navigate('/admin/lessons');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLesson();
  }, [id, navigate]);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex flex-col items-center justify-center">
        <motion.div animate={{ rotateY: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
          <div className="w-16 h-16 bg-[#1CB0F6] rounded-2xl border-b-[6px] border-[#1899D6] shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] flex items-center justify-center">
            <Sparkles className="text-white" size={32} />
          </div>
        </motion.div>
      </div>
    );
  }

  if (!lesson) return null;

  const config = CATEGORY_CONFIG[lesson.category] || CATEGORY_CONFIG.grammar;
  const CategoryIcon = config.icon;
  const embedUrl = getYouTubeEmbedUrl(lesson.video_url);

  return (
    <div className="min-h-screen bg-[#F4F7FA] pb-24 font-sans selection:bg-blue-200 relative overflow-hidden" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* ── FLOATING 3D BACKGROUND DECORATIONS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[10%] left-[5%] w-32 h-32 bg-[#1CB0F6]/10 rounded-3xl blur-2xl" />
        <motion.div animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[40%] right-[5%] w-48 h-48 bg-[#FFC800]/10 rounded-full blur-3xl" />
      </div>

      {/* ── STICKY NAV (Glassmorphism + 3D Buttons) ── */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b-2 border-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <button 
            onClick={() => navigate('/admin/lessons')}
            className="w-12 h-12 bg-white rounded-[18px] border-2 border-slate-200 border-b-[6px] flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 hover:-translate-y-1 active:border-b-2 active:translate-y-[4px] transition-all outline-none shrink-0"
          >
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShare(!showShare)}
              className="w-12 h-12 bg-[#faefff] text-[#B975E5] rounded-[18px] border-2 border-[#eec9ff] border-b-[6px] flex items-center justify-center hover:bg-[#CE82FF] hover:text-white hover:border-[#B975E5] hover:-translate-y-1 active:border-b-2 active:translate-y-[4px] transition-all outline-none shrink-0"
            >
              <Share2 size={20} strokeWidth={3} />
            </button>

            <button 
              onClick={() => navigate(`/admin/lessons/edit/${lesson.id}`)}
              className="hidden md:flex items-center gap-2 bg-[#1CB0F6] text-white px-6 py-3 rounded-[20px] font-display font-bold text-[16px] uppercase tracking-wider border-2 border-[#1899D6] border-b-[6px] hover:bg-[#18A0E0] hover:-translate-y-1 active:border-b-2 active:translate-y-[4px] transition-all outline-none shadow-[inset_0_3px_0_rgba(255,255,255,0.3)]"
            >
              <Edit2 size={18} strokeWidth={3} /> Chỉnh sửa
            </button>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4 md:px-6 mt-8 md:mt-12 relative z-10">
        
        {/* ── HEADER BÀI HỌC ── */}
        <div className="text-center mb-12">
          {/* Badge 3D */}
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[16px] border-2 border-b-[4px] font-display font-black text-[14px] uppercase tracking-widest mb-6 shadow-sm ${config.bg} ${config.color} ${config.border}`}>
            <CategoryIcon size={20} strokeWidth={3} /> {config.label}
          </div>
          
          <h1 className="text-[36px] md:text-[50px] font-display font-black text-slate-800 leading-[1.15] mb-8" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            {lesson.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <span className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-slate-200 border-b-[4px] rounded-[18px] text-slate-600 font-body font-bold text-[15px]">
              <Clock size={20} strokeWidth={3} className="text-[#1CB0F6]"/> 
              Cập nhật: {new Date(lesson.updated_at).toLocaleDateString('vi-VN')}
            </span>
            <span className={`flex items-center gap-2 px-5 py-3 bg-white border-2 border-b-[4px] rounded-[18px] font-body font-bold text-[15px] ${lesson.is_published ? 'border-green-200 text-green-700' : 'border-amber-200 text-amber-700'}`}>
              {lesson.is_published 
                ? <><Sparkles size={20} strokeWidth={3} className="text-[#58CC02]"/> Đã xuất bản</>
                : <><Lock size={20} strokeWidth={3} className="text-[#FF9600]"/> Đang lưu nháp</>
              }
            </span>
          </div>
        </div>

        {/* ── MEDIA 3D ARCADE FRAME ── */}
        {embedUrl ? (
          <div className="mb-14 relative group perspective-1000">
            <div className="absolute -bottom-3 left-6 right-6 h-10 bg-slate-300 rounded-[32px] blur-sm" />
            <div className="relative rounded-[32px] overflow-hidden border-4 border-slate-700 border-b-[16px] shadow-2xl bg-slate-900 aspect-video transform transition-transform duration-500 group-hover:rotate-x-2 group-hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10" />
              <iframe width="100%" height="100%" src={embedUrl} title="Video" frameBorder="0" allowFullScreen className="absolute inset-0" />
            </div>
          </div>
        ) : lesson.thumbnail_url ? (
          <div className="mb-14 relative group">
            <div className="absolute -bottom-3 left-4 right-4 h-10 bg-slate-300 rounded-[32px] blur-md" />
            <div className="relative rounded-[32px] overflow-hidden border-4 border-white border-b-[12px] shadow-xl aspect-[21/9] bg-slate-100 transform transition-transform duration-300 hover:-translate-y-2">
              <img src={lesson.thumbnail_url} alt="Bìa" className="w-full h-full object-cover" />
            </div>
          </div>
        ) : null}

        {/* ── STACKED 3D PAPER CONTENT ── */}
        <div className="relative mb-12">
          {/* Lớp giấy phía sau (Tạo độ dày 3D) */}
          <div className="absolute inset-0 bg-slate-200 rounded-[36px] translate-y-3 translate-x-1" />
          <div className="absolute inset-0 bg-slate-100 rounded-[36px] translate-y-1.5 translate-x-0.5" />
          
          {/* Lớp giấy chính */}
          <div className="relative bg-white rounded-[36px] border-2 border-slate-200 shadow-[inset_0_4px_10px_rgba(0,0,0,0.03)] overflow-hidden">
            
            {/* Dải băng dính 3D góc trên - Đã chuyển lên cao để không cấn chữ */}
            <div className="absolute top-4 left-[-10px] w-24 h-8 bg-[#FFC800]/60 rotate-[-35deg] rounded-full shadow-sm border border-[#FFC800]/30 backdrop-blur-md z-20 pointer-events-none" />

            {/* KHU VỰC NỘI DUNG: PADDING TOP RẤT LỚN ĐỂ KHÔNG BỊ LẸM CHỮ */}
            <div className="relative z-10 px-6 sm:px-10 md:px-16 pt-16 md:pt-20 pb-10 md:pb-16">
              {lesson.content ? (
                <div className="gamified-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />
              ) : (
                <div className="text-center py-10">
                  <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center border-b-[6px] border-slate-200">
                    <MonitorPlay size={40} className="text-slate-300" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[22px] font-display font-black text-slate-700">Chưa có nội dung</h3>
                  <p className="text-[16px] font-body font-bold text-slate-400 mt-2">Bấm chỉnh sửa để bắt đầu thiết kế bài học nhé!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── FOOTER HINT ── */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#EAF6FE] border-2 border-[#1CB0F6] border-b-[6px] rounded-[24px] text-[#1899D6] font-body font-bold text-[15px] shadow-[inset_0_3px_0_rgba(255,255,255,0.5)]">
            <Eye size={22} strokeWidth={3} /> Giao diện hiển thị thực tế dành cho Học viên
          </div>
        </div>

        {/* Nút Edit cho Mobile */}
        <button 
          onClick={() => navigate(`/admin/lessons/edit/${lesson.id}`)}
          className="md:hidden w-full mt-8 flex items-center justify-center gap-2 bg-[#1CB0F6] text-white px-6 py-5 rounded-[24px] font-display font-black text-[18px] uppercase tracking-wider border-2 border-[#1899D6] border-b-[8px] active:border-b-0 active:translate-y-[8px] transition-all outline-none shadow-[inset_0_3px_0_rgba(255,255,255,0.3)]"
        >
          <Edit2 size={20} strokeWidth={3} /> Chỉnh sửa bài này
        </button>

      </motion.div>

      {/* ── SHARE MODAL (Gamified Pop-up) ── */}
      <AnimatePresence>
        {showShare && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowShare(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-[36px] p-8 w-full max-w-sm border-4 border-slate-200 border-b-[12px] relative z-10 shadow-2xl"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#CE82FF] rounded-[20px] border-b-[6px] border-[#B975E5] flex items-center justify-center shadow-lg">
                <Share2 size={36} className="text-white" strokeWidth={2.5} />
              </div>
              
              <h3 className="text-[26px] font-display font-black text-slate-800 mb-6 mt-6 text-center">Lan tỏa tri thức!</h3>
              <div className="space-y-4">
                {['Facebook', 'Twitter', 'Sao chép Link'].map((item, idx) => (
                  <button key={idx} className="w-full py-4 bg-slate-50 border-2 border-slate-200 border-b-[6px] rounded-[20px] font-display font-bold text-[16px] text-slate-600 hover:bg-[#EAF6FE] hover:text-[#1CB0F6] hover:border-[#1CB0F6] active:border-b-2 active:translate-y-[4px] transition-all outline-none">
                    {item}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowShare(false)} className="w-full mt-6 py-3 text-slate-400 font-body font-black uppercase tracking-widest text-[13px] hover:text-slate-600 transition-colors outline-none">
                Đóng lại
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LessonDetails;
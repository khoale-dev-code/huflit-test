// src/pages/Lessons/LessonDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertTriangle, Calendar, PlayCircle } from 'lucide-react';
// Import API (Tạo hàm getLessonBySlug để lấy dữ liệu qua slug)
import { getLessonBySlug } from '../../data/lessonApi'; 

// Hàm hỗ trợ chuyển link YouTube thường thành link Embed
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?rel=0` : null;
};

// ==========================================
// CSS NÂNG CẤP CHO NỘI DUNG HIỂN THỊ (READING MODE)
// Giống hệt CSS trong Admin LessonForm
// ==========================================
// ==========================================
// CSS NÂNG CẤP CHO NỘI DUNG HIỂN THỊ (READING MODE)
// Đã fix lỗi tràn chữ (overflow)
// ==========================================
const READING_STYLE_ID = '__reading_custom_styles__';
if (typeof document !== 'undefined' && !document.getElementById(READING_STYLE_ID)) {
  const s = document.createElement('style');
  s.id = READING_STYLE_ID;
  s.textContent = `
    .lesson-content-view {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.8;
      color: #334155;
      
      /* 🔥 CÁC DÒNG NÀY FIX LỖI TRÀN CHỮ 🔥 */
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;
      max-width: 100%;
      overflow-x: hidden;
    }
    
    /* Ép tất cả phần tử con không được vượt quá 100% chiều rộng */
    .lesson-content-view * {
      max-width: 100%;
    }

    .lesson-content-view > *:first-child { margin-top: 0 !important; }
    
    .lesson-content-view h1, 
    .lesson-content-view h2, 
    .lesson-content-view h3 {
      font-family: 'Baloo 2', 'Quicksand', sans-serif;
      font-weight: 800;
      color: #0F172A;
      margin-top: 2rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    .lesson-content-view h1 { font-size: 32px; color: #1CB0F6; }
    .lesson-content-view h2 { font-size: 26px; border-bottom: 3px solid #E2E8F0; padding-bottom: 8px; }
    .lesson-content-view h3 { font-size: 20px; }
    
    .lesson-content-view p { margin-bottom: 1rem; }
    
    .lesson-content-view a {
      color: #1CB0F6; font-weight: 700; text-decoration: none; border-bottom: 2px solid #BAE3FB; transition: all 0.2s;
    }
    .lesson-content-view a:hover { background-color: #EAF6FE; }
    
    .lesson-content-view blockquote {
      margin: 1.5rem 0;
      padding: 16px 24px;
      background-color: #FFFBEA;
      border: 2px solid #FFE380;
      border-left-width: 6px;
      border-left-color: #FFC200;
      border-radius: 16px;
      font-style: italic;
      color: #B28600;
      font-weight: 700;
    }

    .lesson-content-view img {
      max-width: 100%;
      height: auto; /* Thêm height auto để ảnh không bị méo */
      border-radius: 16px;
      border: 2px solid #E2E8F0;
      margin: 1.5rem auto;
      display: block;
    }

    .lesson-content-view ul, .lesson-content-view ol {
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
    }
    .lesson-content-view li { margin-bottom: 0.5rem; }

    /* Xử lý riêng cho các thẻ code hoặc pre bị dài */
    .lesson-content-view pre, .lesson-content-view code {
      white-space: pre-wrap; 
      word-wrap: break-word;
    }
  `;
  document.head.appendChild(s);
}
const LessonDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getLessonBySlug(slug);
        setLesson(data);
      } catch (error) {
        console.error("Lỗi tải bài học:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-[#1CB0F6] mb-4" />
      <h3 className="text-[16px] font-display font-bold text-slate-600">Đang tải nội dung...</h3>
    </div>
  );

  if (!lesson) return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-4">
      <div className="text-center bg-white p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm max-w-sm w-full">
        <AlertTriangle className="w-16 h-16 text-[#FF4B4B] mx-auto mb-4" strokeWidth={2.5} />
        <h3 className="text-[20px] font-display font-black text-slate-800 mb-2">Không tìm thấy bài học</h3>
        <p className="text-slate-500 font-bold text-[14px] mb-6">Bài học này có thể đã bị xóa hoặc tạm ẩn.</p>
        <button onClick={() => navigate('/learn')} className="w-full py-3.5 bg-slate-100 text-slate-600 font-display font-bold rounded-[16px] hover:bg-slate-200 transition-colors border-2 border-transparent">
          Quay lại Thư viện
        </button>
      </div>
    </div>
  );

  const embedUrl = getYouTubeEmbedUrl(lesson.video_url);

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans selection:bg-blue-200" style={{ fontFamily: '"Nunito", sans-serif' }}>
      
      {/* ── STICKY HEADER ── */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b-2 border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate('/learn')}
            className="w-10 h-10 bg-white rounded-[12px] border-2 border-slate-200 border-b-[3px] flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 active:border-b-2 active:translate-y-[1px] transition-all outline-none shrink-0"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Bài học</p>
            <h2 className="text-[16px] md:text-[18px] font-display font-black text-slate-800 truncate leading-none">
              {lesson.title}
            </h2>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-6 pb-24 space-y-6 md:space-y-8">
        
        {/* Title Header Section */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 border-2 border-slate-200 border-b-[8px] shadow-sm">
          <span className="inline-block px-3 py-1.5 rounded-[10px] bg-blue-50 text-[#1CB0F6] border border-blue-200 text-[11px] font-black uppercase tracking-widest mb-4">
            {lesson.category}
          </span>
          <h1 className="text-[32px] md:text-[46px] font-display font-black text-slate-800 leading-tight mb-4">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-2 text-[13px] font-bold text-slate-400">
            <Calendar className="w-4 h-4" /> 
            Cập nhật: {new Date(lesson.updated_at || lesson.created_at).toLocaleDateString('vi-VN')}
          </div>
        </div>

        {/* Video Section (If exists) */}
        {embedUrl && (
          <div className="bg-white rounded-[32px] p-4 md:p-6 border-2 border-slate-200 border-b-[6px] shadow-sm">
            <div className="flex items-center gap-2 mb-4 px-2">
              <PlayCircle className="w-6 h-6 text-rose-500" strokeWidth={2.5} />
              <h3 className="text-[18px] font-display font-black text-slate-800">Video Bài Giảng</h3>
            </div>
            <div className="w-full aspect-video rounded-[20px] overflow-hidden border-2 border-slate-200 bg-slate-900">
              <iframe
                src={embedUrl}
                title="YouTube video player"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Text Content Section */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 border-2 border-slate-200 border-b-[8px] shadow-sm">
           {/* Render HTML content safely */}
           <div 
             className="lesson-content-view"
             dangerouslySetInnerHTML={{ __html: lesson.content }}
           />
        </div>

        {/* Nút Hoàn Thành (Gamified CTA) */}
        <div className="pt-6 flex justify-center">
          <button 
            onClick={() => navigate('/learn')}
            className="flex items-center justify-center gap-2 bg-[#58CC02] text-white px-10 py-4 rounded-[24px] font-display font-black text-[18px] uppercase tracking-wide border-2 border-[#46A302] border-b-[6px] hover:bg-[#46A302] hover:translate-y-[2px] hover:border-b-[4px] active:border-b-0 active:translate-y-[6px] transition-all outline-none shadow-sm"
          >
            Đã Học Xong!
          </button>
        </div>

      </main>
    </div>
  );
};

export default LessonDetail;
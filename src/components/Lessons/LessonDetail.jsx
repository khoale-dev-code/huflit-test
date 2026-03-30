// src/pages/Lessons/LessonDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Loader2, AlertTriangle, Calendar, PlayCircle, 
  BookOpen, CheckCircle, Target, Check, X, MessageCircle, 
  Image as ImageIcon, Music, FileText
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Import API
import { getLessonBySlug } from '../../data/lessonApi'; 

/* ==============================================================================
   HELPERS & CONFIGURATION
   ============================================================================== */

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?rel=0` : null;
};

// ✅ CSS Chuẩn hóa cho Content
const CONTENT_STYLES = `
  prose prose-slate max-w-none font-nunito font-bold text-slate-700 text-[17px] sm:text-[18px] leading-[1.9] 
  break-words
  [&>*:first-child]:mt-0
  [&_h1]:text-[30px] [&_h1]:sm:text-[34px] [&_h1]:font-black [&_h1]:text-[#1CB0F6] [&_h1]:leading-tight [&_h1]:mb-6 
  [&_h2]:text-[24px] [&_h2]:sm:text-[28px] [&_h2]:font-black [&_h2]:text-slate-800 [&_h2]:border-b-4 [&_h2]:border-slate-100 [&_h2]:pb-3 [&_h2]:mt-10 [&_h2]:mb-6 
  [&_ul]:list-disc [&_ol]:list-decimal [&_li]:marker:text-[#1CB0F6] [&_li]:mb-3 [&_li]:pl-2
  [&_a]:text-[#1CB0F6] [&_a]:font-black [&_a]:no-underline [&_a]:border-b-2 [&_a]:border-[#BAE3FB] hover:[&_a]:bg-[#EAF6FE] [&_a]:transition-colors
  [&_blockquote]:border-l-[6px] [&_blockquote]:border-[#FFC200] [&_blockquote]:bg-[#FFFBEA] [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:rounded-2xl [&_blockquote]:text-[#D9A600] [&_blockquote]:font-extrabold [&_blockquote]:not-italic [&_blockquote]:my-8
  [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-3xl [&_img]:border-2 [&_img]:border-slate-200 [&_img]:shadow-sm [&_img]:mx-auto [&_img]:my-8
  [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:rounded-2xl [&_table]:overflow-hidden [&_table]:border-2 [&_table]:border-[#BAE3FB] [&_table]:shadow-sm
  [&_th]:border-2 [&_th]:border-[#BAE3FB] [&_th]:bg-[#EAF6FE] [&_th]:text-[#1CB0F6] [&_th]:font-black [&_th]:p-4 [&_th]:text-left [&_th]:text-[16px]
  [&_td]:border-2 [&_td]:border-slate-200 [&_td]:p-4 [&_td]:text-[16px]
  [&_mark]:rounded-md [&_mark]:px-1 [&_mark]:py-0.5
`.replace(/\s+/g, ' ').trim();

/* ==============================================================================
   SUB-COMPONENT: Tương tác Mini Challenge cho Học viên
   ============================================================================== */
const StudentMiniChallenge = ({ challenges }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState({}); // Track transcript toggle per question

  if (!challenges || challenges.length === 0) return null;

  const handleSelectOption = (qId, option) => {
    if (isSubmitted) return; // Không cho chọn lại sau khi đã nộp bài
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const toggleTranscript = (qId) => {
    setShowTranscript(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const calculateScore = () => {
    let correct = 0;
    challenges.forEach(q => {
      if (answers[q.id] === q.correct_answer) correct++;
    });
    return correct;
  };

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-8 md:p-12 border-2 border-slate-200 border-b-[8px] shadow-sm mt-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b-2 border-slate-100 pb-6">
        <div className="w-12 h-12 rounded-[18px] bg-[#FFF4E5] text-[#FF9600] flex items-center justify-center border-2 border-[#FFE2B8] border-b-[4px]">
          <Target size={24} strokeWidth={3} />
        </div>
        <div>
          <h2 className="text-[24px] font-black text-slate-800 leading-tight">Mini Challenge</h2>
          <p className="text-[14px] font-bold text-slate-500">Kiểm tra nhanh kiến thức vừa học</p>
        </div>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="space-y-10">
        {challenges.map((q, index) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correct_answer;

          return (
            <div key={q.id} className="bg-slate-50 rounded-[24px] p-5 sm:p-7 border-2 border-slate-200">
              {/* Tiêu đề câu hỏi */}
              <div className="flex gap-3 mb-5">
                <span className="w-8 h-8 shrink-0 bg-white border-2 border-slate-200 border-b-[4px] rounded-xl flex items-center justify-center font-black text-[#1CB0F6] text-[14px]">
                  {index + 1}
                </span>
                <h3 className="text-[18px] sm:text-[20px] font-black text-slate-700 leading-relaxed mt-0.5">
                  {q.question}
                </h3>
              </div>

              {/* Khu vực Media (Ảnh & Audio) */}
              <div className="mb-6 space-y-4">
                {q.image_url && (
                  <div className="rounded-2xl overflow-hidden border-2 border-slate-200 bg-white max-w-md shadow-sm">
                    <img src={q.image_url} alt="Question media" className="w-full h-auto object-contain" />
                  </div>
                )}

                {q.audio_url && (
                  <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm max-w-md">
                    <audio controls src={q.audio_url} className="w-full h-10 outline-none" />
                    
                    {/* Transcript Toggle (Chỉ hiện khi đã nộp bài HOẶC cho phép xem tự do) */}
                    {q.transcript && (
                      <div className="mt-3">
                        <button 
                          onClick={() => toggleTranscript(q.id)}
                          className="flex items-center gap-1.5 text-[13px] font-bold text-[#CE82FF] hover:text-[#b462e8] transition-colors"
                        >
                          <FileText size={14} strokeWidth={3} />
                          {showTranscript[q.id] ? 'Ẩn lời thoại (Transcript)' : 'Xem lời thoại (Transcript)'}
                        </button>
                        
                        <AnimatePresence>
                          {showTranscript[q.id] && (
                            <Motion.div 
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 p-3 bg-[#faefff] border-2 border-[#eec9ff] rounded-xl text-[14px] font-medium text-slate-700 leading-relaxed">
                                {q.transcript}
                              </div>
                            </Motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Các Lựa chọn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, optIndex) => {
                  if (!opt) return null; // Bỏ qua option rỗng
                  
                  const isSelected = userAnswer === opt;
                  const isThisOptionCorrect = opt === q.correct_answer;
                  
                  // Stylings dựa trên trạng thái
                  let btnClass = "bg-white border-slate-200 border-b-[4px] text-slate-600 hover:bg-slate-100"; // Mặc định
                  
                  if (!isSubmitted && isSelected) {
                    btnClass = "bg-[#EAF6FE] border-[#1CB0F6] border-b-[4px] text-[#1CB0F6]"; // Đang chọn
                  } else if (isSubmitted) {
                    if (isThisOptionCorrect) {
                      btnClass = "bg-[#d7ffb8] border-[#58CC02] border-b-[4px] text-[#46A302]"; // Đáp án đúng
                    } else if (isSelected && !isThisOptionCorrect) {
                      btnClass = "bg-[#ffdfe0] border-[#FF4B4B] border-b-[4px] text-[#FF4B4B]"; // Chọn sai
                    } else {
                      btnClass = "bg-slate-50 border-slate-200 border-b-[4px] text-slate-400 opacity-60"; // Các ô còn lại bị mờ đi
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, opt)}
                      className={`p-4 rounded-2xl border-2 font-bold text-[16px] text-left transition-all active:translate-y-[2px] active:border-b-2 outline-none flex items-center justify-between gap-2 ${btnClass}`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      
                      {/* Icon báo Đúng/Sai sau khi nộp */}
                      {isSubmitted && isThisOptionCorrect && <Check size={20} strokeWidth={4} className="shrink-0" />}
                      {isSubmitted && isSelected && !isThisOptionCorrect && <X size={20} strokeWidth={4} className="shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Giải thích (Chỉ hiện sau khi nộp bài) */}
              <AnimatePresence>
                {isSubmitted && (
                  <Motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }} 
                    className="overflow-hidden"
                  >
                    <div className={`p-4 sm:p-5 rounded-2xl border-2 flex gap-3 ${isCorrect ? 'bg-[#f1faeb] border-[#d7ffb8]' : 'bg-[#fff0f0] border-[#ffd6d6]'}`}>
                      <div className={`mt-0.5 shrink-0 ${isCorrect ? 'text-[#58CC02]' : 'text-[#FF4B4B]'}`}>
                        <MessageCircle size={20} strokeWidth={3} />
                      </div>
                      <div>
                        <h4 className={`font-black text-[15px] mb-1 ${isCorrect ? 'text-[#58CC02]' : 'text-[#FF4B4B]'}`}>
                          {isCorrect ? 'Chính xác! Làm tốt lắm.' : 'Chưa đúng rồi!'}
                        </h4>
                        <p className="text-[15px] font-bold text-slate-700 leading-relaxed">
                          {q.explanation || "Không có giải thích cho câu hỏi này."}
                        </p>
                      </div>
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!isSubmitted ? (
        <button 
          onClick={() => setIsSubmitted(true)}
          disabled={Object.keys(answers).length < challenges.length}
          className="mt-8 w-full py-4 sm:py-5 bg-[#1CB0F6] text-white rounded-2xl font-black text-[16px] uppercase tracking-widest border-2 border-[#1899D6] border-b-[6px] hover:brightness-105 active:border-b-2 active:translate-y-[4px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none"
        >
          {Object.keys(answers).length < challenges.length ? 'Hãy chọn đủ các đáp án' : 'Kiểm tra đáp án'}
        </button>
      ) : (
        <div className="mt-8 p-5 bg-[#FFFBEA] border-2 border-[#FFD8A8] rounded-2xl text-center">
          <h3 className="text-[20px] font-black text-[#D9A600] mb-1">
            Hoàn thành! Bạn đúng {calculateScore()} / {challenges.length} câu
          </h3>
          <p className="text-[#B38A00] font-bold text-[14px]">Hãy đọc kỹ phần giải thích để nhớ bài lâu hơn nhé.</p>
        </div>
      )}
    </div>
  );
};


/* ==============================================================================
   MAIN COMPONENT: LessonDetail
   ============================================================================== */

const LessonDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchLesson = async () => {
      try {
        const data = await getLessonBySlug(slug);
        
        // Parse JSONB nếu dữ liệu db trả về dạng string (phòng hờ)
        if (data && typeof data.mini_challenge === 'string') {
          try { data.mini_challenge = JSON.parse(data.mini_challenge); } 
          catch (e) { data.mini_challenge = []; }
        }

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
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col items-center justify-center font-nunito">
      <div className="w-20 h-20 bg-white rounded-3xl border-2 border-slate-200 border-b-[6px] shadow-sm flex items-center justify-center mb-6">
        <Loader2 className="w-10 h-10 animate-spin text-[#1CB0F6]" strokeWidth={3} />
      </div>
      <h3 className="text-[20px] font-black text-slate-700 tracking-wide">Đang mở bài học...</h3>
    </div>
  );

  if (!lesson) return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-4 font-nunito">
      <div className="text-center bg-white p-10 rounded-3xl border-2 border-slate-200 border-b-[8px] shadow-sm max-w-md w-full">
        <div className="w-24 h-24 bg-[#FFF0F0] rounded-[24px] border-2 border-[#ffd6d6] border-b-[6px] flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-12 h-12 text-[#FF4B4B]" strokeWidth={3} />
        </div>
        <h3 className="text-[24px] font-black text-slate-800 mb-2 leading-tight">Oops! Không tìm thấy</h3>
        <p className="text-slate-500 font-bold text-[15px] mb-8 leading-relaxed">Bài học này có thể đã bị xóa, dời đi chỗ khác hoặc đang được tạm ẩn để bảo trì.</p>
        <button onClick={() => navigate('/learn')} className="w-full py-4 bg-[#1CB0F6] text-white font-black text-[16px] uppercase tracking-widest rounded-2xl border-2 border-[#1899D6] border-b-[6px] hover:brightness-105 active:border-b-2 active:translate-y-[4px] shadow-sm transition-all outline-none">
          Quay lại Thư viện
        </button>
      </div>
    </div>
  );

  const embedUrl = getYouTubeEmbedUrl(lesson.video_url);

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-nunito selection:bg-[#1CB0F6] selection:text-white pb-24 relative">
      
      {/* ── STICKY HEADER (Gamified App Bar) ── */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button 
              onClick={() => navigate('/learn')}
              className="w-12 h-12 bg-white rounded-2xl border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-400 hover:text-[#1CB0F6] hover:border-[#BAE3FB] active:border-b-2 active:translate-y-[2px] transition-all outline-none shrink-0 shadow-sm"
            >
              <ArrowLeft size={24} strokeWidth={3} />
            </button>
            
            {/* Header Title (ẩn trên mobile quá nhỏ để nhường chỗ) */}
            <div className="min-w-0 hidden sm:block">
              <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Bài học đang mở</p>
              <h2 className="text-[18px] font-black text-slate-800 truncate leading-tight">
                {lesson.title}
              </h2>
            </div>
          </div>
          
          <div className="px-4 py-2 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-xl flex items-center gap-2 text-[#1CB0F6] shrink-0">
            <BookOpen size={18} strokeWidth={3} />
            <span className="font-black text-[14px] uppercase tracking-widest hidden sm:inline">Lý thuyết</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <Motion.main 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-4 md:px-6 mt-6 md:mt-8 space-y-6 md:space-y-8"
      >
        
        {/* THÔNG TIN BÀI HỌC */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 border-2 border-slate-200 border-b-[8px] shadow-sm relative overflow-hidden">
          {/* Trang trí góc phải */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#EAF6FE] rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-[#FFFBEA] text-[#FF9600] border-2 border-[#FFD8A8] text-[12px] font-black uppercase tracking-widest mb-5 shadow-sm">
              {lesson.category === 'grammar' ? 'Ngữ pháp' : lesson.category === 'vocabulary' ? 'Từ vựng' : 'Kỹ năng'}
            </span>
            <h1 className="text-[32px] sm:text-[42px] md:text-[48px] font-black text-slate-800 leading-[1.1] mb-5">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-2.5 text-[14px] font-bold text-slate-400 bg-slate-50 inline-flex px-4 py-2 rounded-xl border-2 border-slate-100">
              <Calendar className="w-4 h-4 text-slate-400" strokeWidth={3} /> 
              Cập nhật: <span className="text-slate-500">{new Date(lesson.updated_at || lesson.created_at).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
        </div>

        {/* VIDEO BÀI GIẢNG (Nếu có) */}
        {embedUrl && (
          <div className="bg-white rounded-[32px] p-5 md:p-8 border-2 border-slate-200 border-b-[8px] shadow-sm">
            <div className="flex items-center gap-3 mb-5 px-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0F0] text-[#FF4B4B] flex items-center justify-center border-b-[3px] border-[#ffd6d6]">
                <PlayCircle className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <h3 className="text-[20px] font-black text-slate-800 tracking-wide">Video Bài Giảng</h3>
            </div>
            {/* Frame Video */}
            <div className="w-full aspect-video rounded-3xl overflow-hidden border-2 border-slate-200 shadow-inner bg-slate-900">
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

        {/* NỘI DUNG LÝ THUYẾT CHI TIẾT */}
        {lesson.content && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 md:p-12 border-2 border-slate-200 border-b-[8px] shadow-sm">
             <div 
               className={CONTENT_STYLES}
               dangerouslySetInnerHTML={{ __html: lesson.content }}
             />
          </div>
        )}

        {/* 🚀 GỌI COMPONENT MINI CHALLENGE TẠI ĐÂY */}
        <StudentMiniChallenge challenges={lesson.mini_challenge} />

        {/* NÚT HOÀN THÀNH BÀI HỌC */}
        <div className="pt-8 pb-10 flex justify-center">
          <button 
            onClick={() => navigate('/learn')}
            className="group flex items-center justify-center gap-3 bg-[#58CC02] text-white px-10 sm:px-16 py-4 sm:py-5 rounded-[24px] font-black text-[18px] sm:text-[20px] uppercase tracking-widest border-2 border-[#46A302] border-b-[8px] hover:brightness-105 active:border-b-[2px] active:translate-y-[6px] transition-all outline-none shadow-md"
          >
            <CheckCircle className="w-7 h-7 group-active:scale-90 transition-transform" strokeWidth={3} />
            Đã Hiểu Bài!
          </button>
        </div>

      </Motion.main>
    </div>
  );
};

export default LessonDetail;
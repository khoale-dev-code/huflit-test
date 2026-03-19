// src/pages/Lessons/LessonList.jsx
import React, { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, PlayCircle, BookA, Hash, Lightbulb, Compass, AlertTriangle } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Import API
import { getPublishedLessons } from '../../data/lessonApi'; 

const CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: BookOpen, color: 'text-blue-500 bg-blue-50 border-blue-200' },
  { id: 'grammar', label: 'Ngữ pháp', icon: BookA, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  { id: 'vocabulary', label: 'Từ vựng', icon: Hash, color: 'text-purple-500 bg-purple-50 border-purple-200' },
  { id: 'tips', label: 'Mẹo làm bài', icon: Lightbulb, color: 'text-amber-500 bg-amber-50 border-amber-200' },
  { id: 'strategy', label: 'Chiến thuật', icon: Compass, color: 'text-rose-500 bg-rose-50 border-rose-200' },
];

/* ==============================================================================
   SUB-COMPONENT: Skeleton Loading (Trải nghiệm chờ mượt mà)
   ============================================================================== */
const LessonSkeleton = () => (
  <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] overflow-hidden flex flex-col shadow-sm">
    <div className="w-full aspect-video bg-slate-200 animate-pulse" />
    <div className="p-5 flex flex-col flex-1">
      <div className="w-24 h-6 bg-slate-200 rounded-lg animate-pulse mb-4" />
      <div className="w-full h-5 bg-slate-200 rounded-lg animate-pulse mb-2" />
      <div className="w-2/3 h-5 bg-slate-200 rounded-lg animate-pulse mb-6" />
      <div className="mt-auto pt-4 border-t-2 border-slate-100 flex items-center justify-between">
        <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
        <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  </div>
);

/* ==============================================================================
   MAIN COMPONENT
   ============================================================================== */
const LessonList = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('all');
  
  const [search, setSearch] = useState('');
  // ✅ ĐỘT PHÁ HIỆU NĂNG: Trì hoãn việc filter dữ liệu nặng cho đến khi user ngừng gõ phím
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const data = await getPublishedLessons(); 
        setLessons(data || []);
      } catch {
        // Linter Fix: Optional catch binding (bỏ chữ error)
        console.error('Lỗi khi lấy danh sách bài học từ máy chủ.');
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchCat = activeCat === 'all' || lesson.category === activeCat;
      const matchSearch = lesson.title.toLowerCase().includes(deferredSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [lessons, activeCat, deferredSearch]);

  return (
    // ✅ CLEAN CODE: Chuyển inline font-family thành class font-nunito của Tailwind
    <div className="min-h-screen bg-[#F4F7FA] font-nunito pt-8 pb-24 selection:bg-[#1CB0F6] selection:text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* ── HEADER & SEARCH ── */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-[32px] md:text-[42px] font-black text-slate-800 leading-tight tracking-tight">
              Thư viện <span className="text-[#1CB0F6]">Kiến thức</span>
            </h1>
            <p className="text-[15px] font-bold text-slate-500 mt-2">Bí kíp chinh phục kỳ thi với các bài giảng độc quyền.</p>
          </div>
          
          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" strokeWidth={3} />
            <input 
              type="text" placeholder="Tìm kiếm bài học..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 border-b-[6px] rounded-2xl pl-12 pr-5 py-4 text-[15px] font-black text-slate-700 focus:outline-none focus:border-[#1CB0F6] transition-all placeholder:text-slate-400 placeholder:font-bold shadow-sm"
            />
          </div>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar mb-8 snap-x">
          {CATEGORIES.map(cat => {
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id} onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 font-black text-[14px] uppercase tracking-widest whitespace-nowrap transition-all outline-none snap-start shrink-0 shadow-sm
                  ${isActive 
                    ? 'bg-[#1CB0F6] border-[#1899D6] border-b-[4px] text-white active:border-b-2 active:translate-y-[2px]' 
                    : 'bg-white border-slate-200 border-b-[4px] text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:-translate-y-1 active:border-b-2 active:translate-y-[2px]'
                  }`}
              >
                <cat.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} strokeWidth={3} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── LESSON GRID ── */}
        {loading ? (
          // ✅ HIỆU ỨNG SKELETON
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <LessonSkeleton key={i} />)}
          </div>
        ) : filteredLessons.length === 0 ? (
          <Motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-white border-2 border-slate-200 border-b-[8px] rounded-[32px] max-w-xl mx-auto shadow-sm">
            <div className="w-24 h-24 bg-slate-100 rounded-[24px] border-2 border-slate-200 border-b-[6px] flex items-center justify-center mx-auto mb-6 shadow-inner">
              <AlertTriangle className="w-12 h-12 text-slate-400" strokeWidth={3} />
            </div>
            <h3 className="text-[22px] font-black text-slate-700 mb-2">Chưa có bài học nào!</h3>
            <p className="text-slate-500 font-bold text-[15px]">Thử thay đổi từ khóa tìm kiếm hoặc chuyên mục khác nhé.</p>
          </Motion.div>
        ) : (
          <Motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredLessons.map((lesson) => {
                const catConfig = CATEGORIES.find(c => c.id === lesson.category) || CATEGORIES[1];
                return (
                  <Motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={lesson.id}
                    onClick={() => navigate(`/learn/${lesson.slug}`)}
                    className="group bg-white rounded-[28px] border-2 border-slate-200 border-b-[6px] overflow-hidden cursor-pointer hover:border-[#1CB0F6] hover:-translate-y-1.5 transition-all flex flex-col shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div className="w-full aspect-video bg-slate-100 relative overflow-hidden border-b-2 border-slate-100">
                      {lesson.thumbnail_url ? (
                        <img 
                          src={lesson.thumbnail_url} 
                          alt={lesson.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy" 
                          decoding="async" // Tối ưu tải ảnh
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-[#BAE3FB]">
                          <BookOpen className="w-16 h-16" strokeWidth={3} />
                        </div>
                      )}
                      {/* Badge Video */}
                      {lesson.video_url && (
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-black tracking-widest uppercase shadow-sm border border-white/10">
                          <PlayCircle className="w-4 h-4 text-[#FF4B4B]" strokeWidth={3} /> Video
                        </div>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest border-2 border-b-[3px] flex items-center gap-1.5 shadow-sm ${catConfig.color}`}>
                          <catConfig.icon className="w-3.5 h-3.5" strokeWidth={3} /> {catConfig.label}
                        </span>
                      </div>
                      <h3 className="text-[20px] font-black text-slate-800 leading-[1.3] group-hover:text-[#1CB0F6] transition-colors line-clamp-2 mb-5">
                        {lesson.title}
                      </h3>
                      
                      <div className="mt-auto pt-5 border-t-2 border-slate-100 flex items-center justify-between">
                        <span className="text-[14px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#1CB0F6] transition-colors">Bắt đầu học</span>
                        <div className="w-10 h-10 rounded-2xl border-2 border-slate-200 border-b-[4px] bg-white text-slate-400 flex items-center justify-center group-hover:bg-[#1CB0F6] group-hover:text-white group-hover:border-[#1899D6] transition-all shadow-sm">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </Motion.div>
                );
              })}
            </AnimatePresence>
          </Motion.div>
        )}
      </div>
    </div>
  );
};

export default LessonList;
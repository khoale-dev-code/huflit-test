// src/pages/Lessons/LessonList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, PlayCircle, BookA, Hash, Lightbulb, Compass, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
// Import API của bạn (Bạn cần tạo hàm getPublishedLessons trong file lessonApi.js)
import { getPublishedLessons } from '../../data/lessonApi'; 

const CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: BookOpen, color: 'text-blue-500 bg-blue-50 border-blue-200' },
  { id: 'grammar', label: 'Ngữ pháp', icon: BookA, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  { id: 'vocabulary', label: 'Từ vựng', icon: Hash, color: 'text-purple-500 bg-purple-50 border-purple-200' },
  { id: 'tips', label: 'Mẹo làm bài', icon: Lightbulb, color: 'text-amber-500 bg-amber-50 border-amber-200' },
  { id: 'strategy', label: 'Chiến thuật', icon: Compass, color: 'text-rose-500 bg-rose-50 border-rose-200' },
];

const LessonList = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        // Hàm này lấy các bài học có is_published = true và sắp xếp theo order_index
        const data = await getPublishedLessons(); 
        setLessons(data || []);
      } catch (error) {
        console.error('Lỗi tải bài học:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchCat = activeCat === 'all' || lesson.category === activeCat;
      const matchSearch = lesson.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [lessons, activeCat, search]);

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans pt-8 pb-24 selection:bg-blue-200" style={{ fontFamily: '"Nunito", sans-serif' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* ── HEADER & SEARCH ── */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-[32px] md:text-[42px] font-black text-slate-800 leading-tight tracking-tight font-display">
              Thư viện <span className="text-[#1CB0F6]">Kiến thức</span>
            </h1>
            <p className="text-[15px] font-bold text-slate-500 mt-2">Bí kíp chinh phục kỳ thi với các bài giảng độc quyền.</p>
          </div>
          
          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" strokeWidth={2.5} />
            <input 
              type="text" placeholder="Tìm kiếm bài học..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 border-b-[4px] rounded-[20px] pl-12 pr-4 py-3.5 text-[15px] font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] transition-all placeholder:text-slate-400"
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
                className={`flex items-center gap-2 px-5 py-3 rounded-[16px] border-2 font-bold text-[14px] whitespace-nowrap transition-all outline-none snap-start shrink-0
                  ${isActive 
                    ? 'bg-[#1CB0F6] border-[#1899D6] border-b-[4px] text-white active:border-b-2 active:translate-y-[2px]' 
                    : 'bg-white border-slate-200 border-b-[4px] text-slate-600 hover:bg-slate-50 hover:-translate-y-1 active:border-b-2 active:translate-y-[2px]'
                  }`}
              >
                <cat.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} strokeWidth={2.5} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── LESSON GRID ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#1CB0F6] mb-4" />
            <p className="font-bold text-slate-500">Đang tải kiến thức...</p>
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="text-center py-24 bg-white border-2 border-dashed border-slate-300 rounded-[32px]">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" strokeWidth={2} />
            <h3 className="text-[20px] font-black text-slate-700 mb-2 font-display">Chưa có bài học nào!</h3>
            <p className="text-slate-500 font-bold text-[15px]">Thử thay đổi từ khóa tìm kiếm hoặc chuyên mục nhé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, idx) => {
              const catConfig = CATEGORIES.find(c => c.id === lesson.category) || CATEGORIES[1];
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                  key={lesson.id}
                  onClick={() => navigate(`/learn/${lesson.slug}`)} // Điều hướng bằng Slug
                  className="group bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] overflow-hidden cursor-pointer hover:border-[#1CB0F6] hover:-translate-y-1 transition-all flex flex-col shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-full aspect-video bg-slate-100 relative overflow-hidden border-b-2 border-slate-100">
                    {lesson.thumbnail_url ? (
                      <img src={lesson.thumbnail_url} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                        <BookOpen className="w-12 h-12" />
                      </div>
                    )}
                    {/* Badge Video */}
                    {lesson.video_url && (
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-black tracking-wider uppercase border border-white/20">
                        <PlayCircle className="w-4 h-4 text-rose-400" /> Video
                      </div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded-[8px] text-[10px] font-black uppercase tracking-widest border border-b-[2px] flex items-center gap-1 ${catConfig.color}`}>
                        <catConfig.icon className="w-3 h-3" strokeWidth={3} /> {catConfig.label}
                      </span>
                    </div>
                    <h3 className="text-[18px] font-black text-slate-800 leading-snug font-display group-hover:text-[#1CB0F6] transition-colors line-clamp-2 mb-4">
                      {lesson.title}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t-2 border-slate-100 flex items-center justify-between">
                      <span className="text-[13px] font-bold text-slate-400">Bắt đầu học ngay</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-[#1CB0F6] group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default LessonList;
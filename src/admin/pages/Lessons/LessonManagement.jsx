import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, BookOpen, Zap, Target, BookMarked, Sparkles, Loader2, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Gọi API thật từ Supabase
import { getAdminLessons, deleteLesson } from '../../../data/lessonApi'; 

// Gamified Category Config
const CATEGORY_CONFIG = {
  grammar:    { label: 'Ngữ pháp', icon: PenTool,    color: 'text-blue-500',    bg: 'bg-blue-50',    border: 'border-blue-200' },
  vocabulary: { label: 'Từ vựng',  icon: BookMarked, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  tips:       { label: 'Mẹo thi',  icon: Zap,        color: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-amber-200' },
  strategy:   { label: 'Chiến thuật', icon: Target,  color: 'text-purple-500',  bg: 'bg-purple-50',  border: 'border-purple-200' },
};

const LessonManagement = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const data = await getAdminLessons();
      setLessons(data || []);
    } catch (error) {
      console.error('Lỗi tải bài học:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const filteredLessons = lessons.filter(l => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || l.category === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: lessons.length,
    published: lessons.filter(l => l.is_published).length,
    draft: lessons.filter(l => !l.is_published).length
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bài học "${title}" vĩnh viễn không? Hành động này không thể hoàn tác.`)) {
      try {
        await deleteLesson(id);
        setLessons(lessons.filter(l => l.id !== id));
      } catch (error) {
        console.error("Lỗi xóa bài học:", error);
        alert('Có lỗi xảy ra khi xóa bài học!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-4 md:p-8 xl:p-10 selection:bg-blue-200">
      <div className="max-w-7xl mx-auto">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-10">
          <div>
            <h1 className="text-[32px] md:text-[40px] font-display font-extrabold text-slate-800 flex items-center gap-3 leading-tight tracking-tight">
              Quản lý Bài học
              <div className="p-2 bg-amber-100 rounded-xl border-b-[3px] border-amber-200 rotate-12 shrink-0">
                <Sparkles className="text-amber-500 w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
              </div>
            </h1>
            <p className="text-[15px] md:text-[16px] text-slate-500 font-body font-semibold mt-1">
              Sáng tạo và xây dựng kho tàng kiến thức cho học viên.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/admin/lessons/create')}
            className="group w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#58CC02] text-white px-8 py-4 rounded-[20px] font-display font-bold text-[18px] uppercase tracking-wider border-2 border-[#46A302] border-b-[6px] hover:bg-[#46A302] hover:translate-y-[2px] hover:border-b-[4px] active:border-b-0 active:translate-y-[6px] transition-all outline-none shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Plus strokeWidth={3} size={20} />
            </div>
            Tạo Bài Mới
          </button>
        </div>

        {/* ── STATS DASHBOARD MINI (Chunky Cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
          {/* Total */}
          <div className="bg-white rounded-[24px] p-5 md:p-6 border-2 border-slate-200 border-b-[6px] flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-[16px] bg-[#1CB0F6] text-white flex items-center justify-center border-b-[4px] border-[#1899D6] shrink-0 shadow-sm">
              <BookOpen size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] md:text-[12px] font-body font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">Tổng bài học</p>
              <p className="text-[28px] md:text-[32px] font-display font-extrabold text-slate-800 leading-none">{stats.total}</p>
            </div>
          </div>

          {/* Published */}
          <div className="bg-white rounded-[24px] p-5 md:p-6 border-2 border-slate-200 border-b-[6px] flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-[16px] bg-[#58CC02] text-white flex items-center justify-center border-b-[4px] border-[#46A302] shrink-0 shadow-sm">
              <Eye size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] md:text-[12px] font-body font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">Đã xuất bản</p>
              <p className="text-[28px] md:text-[32px] font-display font-extrabold text-slate-800 leading-none">{stats.published}</p>
            </div>
          </div>

          {/* Draft */}
          <div className="bg-white rounded-[24px] p-5 md:p-6 border-2 border-slate-200 border-b-[6px] flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-[16px] bg-[#FF9600] text-white flex items-center justify-center border-b-[4px] border-[#E58700] shrink-0 shadow-sm">
              <EyeOff size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] md:text-[12px] font-body font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">Bản nháp</p>
              <p className="text-[28px] md:text-[32px] font-display font-extrabold text-slate-800 leading-none">{stats.draft}</p>
            </div>
          </div>
        </div>

        {/* ── BỘ LỌC & TÌM KIẾM ── */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-5 mb-8 items-center justify-between bg-white p-4 md:p-5 rounded-[24px] md:rounded-[28px] border-2 border-slate-200 shadow-sm">
          
          {/* Pills Filter - Cuộn ngang mượt trên Mobile */}
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 custom-scrollbar snap-x">
            {['all', 'grammar', 'vocabulary', 'tips', 'strategy'].map(cat => {
              const active = filter === cat;
              return (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`snap-start shrink-0 px-5 py-3 rounded-[16px] font-display font-bold text-[15px] transition-all outline-none border-2
                    ${active 
                      ? 'bg-[#1CB0F6] text-white border-[#1899D6] border-b-[4px] translate-y-[-2px]' 
                      : 'bg-white text-slate-500 border-slate-200 border-b-[4px] hover:bg-slate-50 active:translate-y-[2px] active:border-b-2'
                    }`}
                >
                  {cat === 'all' ? 'TẤT CẢ' : CATEGORY_CONFIG[cat]?.label}
                </button>
              )
            })}
          </div>

          {/* Search Bar - Full width trên Mobile */}
          <div className="relative w-full lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={22} strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Tìm kiếm tên bài học..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 pl-12 pr-4 py-3.5 rounded-[16px] text-[16px] font-body font-semibold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 placeholder:font-medium"
            />
          </div>
        </div>

        {/* ── DANH SÁCH BÀI HỌC ── */}
        <div className="space-y-4 md:space-y-5">
          {loading ? (
            <div className="text-center py-24 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-[6px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin mb-6" />
              <h3 className="text-[18px] font-display font-extrabold text-slate-600">Đang tải dữ liệu...</h3>
            </div>
          ) : filteredLessons.length === 0 ? (
            <div className="text-center py-20 bg-white border-2 border-dashed border-slate-300 rounded-[32px]">
              <div className="w-20 h-20 bg-slate-100 rounded-[20px] flex items-center justify-center mx-auto mb-5 border-b-[4px] border-slate-200">
                <Search size={32} className="text-slate-400" strokeWidth={2.5} />
              </div>
              <h3 className="text-[20px] font-display font-extrabold text-slate-700">Trống trơn!</h3>
              <p className="text-[15px] font-body font-medium text-slate-500 mt-2">Không tìm thấy bài học nào phù hợp với từ khóa.</p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredLessons.map((lesson, index) => {
                const config = CATEGORY_CONFIG[lesson.category] || CATEGORY_CONFIG.grammar;
                const Icon = config.icon;
                const formattedDate = new Date(lesson.created_at).toLocaleDateString('vi-VN');

                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    key={lesson.id} 
                    className={`bg-white border-2 rounded-[24px] p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 md:gap-6 transition-transform hover:-translate-y-1
                      ${lesson.is_published ? 'border-slate-200 border-b-[6px]' : 'border-dashed border-slate-300 border-b-[4px] bg-slate-50/50'}
                    `}
                  >
                    {/* Thông tin Bài học (Bên trái) */}
                    <div className="flex items-start md:items-center gap-4 flex-1 min-w-0 w-full">
                      <div className={`w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-[16px] flex items-center justify-center border-2 border-b-[4px] shadow-sm ${config.bg} ${config.color} ${config.border}`}>
                        <Icon size={26} strokeWidth={2.5} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`text-[10px] md:text-[11px] font-display font-bold uppercase tracking-widest px-3 py-1 rounded-[8px] border ${config.bg} ${config.color} ${config.border}`}>
                            {config.label}
                          </span>
                          {!lesson.is_published && (
                            <span className="text-[10px] md:text-[11px] font-display font-bold uppercase tracking-widest px-3 py-1 rounded-[8px] bg-slate-200 text-slate-500 flex items-center gap-1.5 border border-slate-300">
                              <EyeOff size={14} strokeWidth={3} /> Bản nháp
                            </span>
                          )}
                        </div>
                        <h3 className={`text-[18px] md:text-[20px] font-display font-extrabold truncate leading-tight ${lesson.is_published ? 'text-slate-800' : 'text-slate-500'}`}>
                          {lesson.title}
                        </h3>
                        <p className="text-[13px] font-body font-medium text-slate-400 mt-1">Tạo ngày: {formattedDate}</p>
                      </div>
                    </div>

                    {/* Vùng Hành động (Bên phải / Dưới cùng trên Mobile) */}
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto border-t-2 border-slate-100 pt-4 sm:border-none sm:pt-0">
                      
                      <div className="text-[13px] font-body font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-xl border-2 border-slate-200 mr-2 sm:mr-4">
                        Thứ tự: <span className="text-slate-800 font-black">{lesson.order_index}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        {/* ✅ NÚT XEM TRƯỚC (LESSON DETAILS) */}
                        <button 
                          onClick={() => navigate(`/admin/lessons/detail/${lesson.id}`)}
                          title="Xem trước bài học"
                          className="w-12 h-12 rounded-[16px] bg-[#F0FAE8] text-[#58CC02] flex items-center justify-center border-2 border-[#D7F5B1] border-b-[4px] hover:bg-[#58CC02] hover:text-white hover:border-[#46A302] active:border-b-2 active:translate-y-[2px] transition-all outline-none"
                        >
                          <Eye size={20} strokeWidth={2.5} />
                        </button>

                        {/* Nút Sửa */}
                        <button 
                          onClick={() => navigate(`/admin/lessons/edit/${lesson.id}`)}
                          title="Chỉnh sửa"
                          className="w-12 h-12 rounded-[16px] bg-[#EAF6FE] text-[#1CB0F6] flex items-center justify-center border-2 border-[#BAE3FB] border-b-[4px] hover:bg-[#1CB0F6] hover:text-white hover:border-[#1899D6] active:border-b-2 active:translate-y-[2px] transition-all outline-none"
                        >
                          <Edit2 size={20} strokeWidth={2.5} />
                        </button>

                        {/* Nút Xóa */}
                        <button 
                          onClick={() => handleDelete(lesson.id, lesson.title)}
                          title="Xóa bài học"
                          className="w-12 h-12 rounded-[16px] bg-[#fff0f0] text-[#FF4B4B] flex items-center justify-center border-2 border-[#ffc1c1] border-b-[4px] hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:border-b-2 active:translate-y-[2px] transition-all outline-none"
                        >
                          <Trash2 size={20} strokeWidth={2.5} />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
};

export default LessonManagement;
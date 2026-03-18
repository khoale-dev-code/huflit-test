import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, BookOpen, Zap, Target, BookMarked, Sparkles, Loader2, PenTool } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Component Layout chung của Admin
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { useAdminAuth } from '../../hooks/useAdminAuth';

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
  
  // Lấy state auth cho Sidebar
  const { admin, loading: authLoading, signOut } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  // Nếu đang check Auth thì hiện loading
  if (authLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F4F7FA] gap-3">
        <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
        <p className="font-display font-bold text-slate-500 text-[15px]">Đang tải hệ thống...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F4F7FA] overflow-hidden font-sans selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* ── SIDEBAR TRÁI ── */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* ── NAVBAR TRÊN ── */}
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => navigate('/admin/lessons/create')} />
        
        {/* ── NỘI DUNG CHÍNH (CUỘN ĐƯỢC) ── */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            
            {/* HEADER PAGE */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[14px] bg-[#FFFBEA] flex items-center justify-center border-b-[4px] border-[#FFD8A8] shadow-sm shrink-0">
                  <Sparkles className="text-[#FF9600] w-6 h-6" strokeWidth={2.5} />
                </div>
                <div className="pt-0.5">
                  <h1 className="text-[24px] sm:text-[28px] font-display font-black text-slate-800 leading-none m-0">
                    Quản lý Bài học
                  </h1>
                  <p className="text-[13px] font-body font-bold text-slate-500 mt-1">
                    Sáng tạo và xây dựng kho tàng kiến thức.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/admin/lessons/create')}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-[#58CC02] text-white px-6 py-3.5 rounded-[18px] font-display font-black text-[15px] uppercase tracking-wider border-2 border-[#46A302] border-b-[5px] hover:bg-[#46A302] active:border-b-[2px] active:translate-y-[3px] transition-all outline-none shadow-sm"
              >
                <Plus strokeWidth={3} size={20} />
                Tạo Bài Mới
              </button>
            </div>

            {/* STATS DASHBOARD MINI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-8">
              {/* Total */}
              <div className="bg-white rounded-[24px] p-4 md:p-5 border-2 border-slate-200 border-b-[5px] flex items-center gap-4 hover:-translate-y-1 transition-transform shadow-sm">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] bg-[#EAF6FE] text-[#1CB0F6] flex items-center justify-center border-2 border-[#BAE3FB] border-b-[3px] shrink-0 shadow-sm">
                  <BookOpen size={24} strokeWidth={2.5} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[10px] md:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-0.5">Tổng bài học</p>
                  <p className="text-[24px] md:text-[28px] font-display font-black text-slate-800 leading-none">{stats.total}</p>
                </div>
              </div>

              {/* Published */}
              <div className="bg-white rounded-[24px] p-4 md:p-5 border-2 border-slate-200 border-b-[5px] flex items-center gap-4 hover:-translate-y-1 transition-transform shadow-sm">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] bg-[#f1faeb] text-[#58CC02] flex items-center justify-center border-2 border-[#bcf096] border-b-[3px] shrink-0 shadow-sm">
                  <Eye size={24} strokeWidth={2.5} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[10px] md:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-0.5">Đã xuất bản</p>
                  <p className="text-[24px] md:text-[28px] font-display font-black text-slate-800 leading-none">{stats.published}</p>
                </div>
              </div>

              {/* Draft */}
              <div className="bg-white rounded-[24px] p-4 md:p-5 border-2 border-slate-200 border-b-[5px] flex items-center gap-4 hover:-translate-y-1 transition-transform shadow-sm">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] bg-[#FFF4E5] text-[#FF9600] flex items-center justify-center border-2 border-[#FFD8A8] border-b-[3px] shrink-0 shadow-sm">
                  <EyeOff size={24} strokeWidth={2.5} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[10px] md:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-0.5">Bản nháp</p>
                  <p className="text-[24px] md:text-[28px] font-display font-black text-slate-800 leading-none">{stats.draft}</p>
                </div>
              </div>
            </div>

            {/* BỘ LỌC & TÌM KIẾM */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-5 mb-6 items-center justify-between bg-white p-4 rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm">
              
              {/* Pills Filter */}
              <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 custom-scrollbar snap-x px-1">
                {['all', 'grammar', 'vocabulary', 'tips', 'strategy'].map(cat => {
                  const active = filter === cat;
                  return (
                    <button 
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`snap-start shrink-0 px-4 py-2.5 rounded-[16px] font-display font-bold text-[13px] uppercase tracking-wider transition-all outline-none border-2
                        ${active 
                          ? 'bg-[#1CB0F6] text-white border-[#1899D6] border-b-[4px] -translate-y-[1px] shadow-sm' 
                          : 'bg-white text-slate-500 border-slate-200 border-b-[4px] hover:bg-slate-50 active:translate-y-[2px] active:border-b-[2px]'
                        }`}
                    >
                      {cat === 'all' ? 'TẤT CẢ' : CATEGORY_CONFIG[cat]?.label}
                    </button>
                  )
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-[350px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} strokeWidth={2.5} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm bài học..." 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 pl-12 pr-4 py-3 rounded-[16px] text-[14px] font-body font-bold text-slate-800 focus:outline-none focus:border-[#1CB0F6] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* DANH SÁCH BÀI HỌC */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-20 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin mb-4" />
                  <h3 className="text-[15px] font-display font-bold text-slate-500">Đang tải dữ liệu...</h3>
                </div>
              ) : filteredLessons.length === 0 ? (
                <div className="text-center py-16 bg-white border-2 border-dashed border-slate-300 rounded-[24px]">
                  <div className="w-16 h-16 bg-slate-100 border-2 border-slate-200 border-b-[4px] rounded-[16px] flex items-center justify-center mx-auto mb-4">
                    <Search size={28} className="text-slate-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[18px] font-display font-black text-slate-700">Trống trơn!</h3>
                  <p className="text-[14px] font-body font-bold text-slate-500 mt-1">Không tìm thấy bài học nào phù hợp.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredLessons.map((lesson, index) => {
                    const config = CATEGORY_CONFIG[lesson.category] || CATEGORY_CONFIG.grammar;
                    const Icon = config.icon;
                    const formattedDate = new Date(lesson.created_at).toLocaleDateString('vi-VN');

                    return (
                      <Motion.div 
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        key={lesson.id} 
                        className={`bg-white border-2 rounded-[24px] p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-transform hover:-translate-y-1
                          ${lesson.is_published ? 'border-slate-200 border-b-[5px] shadow-sm' : 'border-dashed border-slate-300 border-b-[4px] bg-slate-50/80'}
                        `}
                      >
                        {/* Thông tin Bài học */}
                        <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                          <div className={`w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-[16px] flex items-center justify-center border-2 border-b-[4px] shadow-sm ${config.bg} ${config.color} ${config.border}`}>
                            <Icon size={24} strokeWidth={2.5} />
                          </div>

                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className={`text-[9px] md:text-[10px] font-display font-black uppercase tracking-widest px-2.5 py-0.5 rounded-[8px] border ${config.bg} ${config.color} ${config.border}`}>
                                {config.label}
                              </span>
                              {!lesson.is_published && (
                                <span className="text-[9px] md:text-[10px] font-display font-black uppercase tracking-widest px-2.5 py-0.5 rounded-[8px] bg-slate-100 text-slate-500 flex items-center gap-1 border border-slate-200">
                                  <EyeOff size={12} strokeWidth={3} /> Bản nháp
                                </span>
                              )}
                            </div>
                            <h3 className={`text-[16px] md:text-[18px] font-display font-black truncate leading-tight m-0 ${lesson.is_published ? 'text-slate-800' : 'text-slate-500'}`}>
                              {lesson.title}
                            </h3>
                            <p className="text-[12px] font-body font-bold text-slate-400 mt-1">Tạo ngày: {formattedDate}</p>
                          </div>
                        </div>

                        {/* Vùng Hành động */}
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto border-t-2 border-slate-100 pt-4 sm:border-none sm:pt-0">
                          <div className="text-[11px] font-display font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-[10px] border-2 border-slate-200 mr-2 sm:mr-4">
                            Thứ tự: <span className="text-slate-700 text-[13px]">{lesson.order_index}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => navigate(`/admin/lessons/detail/${lesson.id}`)}
                              title="Xem trước bài học"
                              className="w-10 h-10 md:w-11 md:h-11 rounded-[14px] bg-[#f1faeb] text-[#58CC02] flex items-center justify-center border-2 border-[#bcf096] border-b-[4px] hover:bg-[#58CC02] hover:text-white hover:border-[#46A302] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm"
                            >
                              <Eye size={18} strokeWidth={2.5} />
                            </button>
                            <button 
                              onClick={() => navigate(`/admin/lessons/edit/${lesson.id}`)}
                              title="Chỉnh sửa"
                              className="w-10 h-10 md:w-11 md:h-11 rounded-[14px] bg-[#EAF6FE] text-[#1CB0F6] flex items-center justify-center border-2 border-[#BAE3FB] border-b-[4px] hover:bg-[#1CB0F6] hover:text-white hover:border-[#1899D6] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm"
                            >
                              <Edit2 size={18} strokeWidth={2.5} />
                            </button>
                            <button 
                              onClick={() => handleDelete(lesson.id, lesson.title)}
                              title="Xóa bài học"
                              className="w-10 h-10 md:w-11 md:h-11 rounded-[14px] bg-[#fff0f0] text-[#FF4B4B] flex items-center justify-center border-2 border-[#ffc1c1] border-b-[4px] hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm"
                            >
                              <Trash2 size={18} strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                      </Motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonManagement;
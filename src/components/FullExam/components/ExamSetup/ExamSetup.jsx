import React, { useState, memo, useMemo, useCallback, useRef, useEffect, useId } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Search, ChevronRight, FileText, Clock, 
  Target, Headphones, BookOpen, Sparkles,
  Zap, Timer, Loader2, Star, Trophy, ArrowLeft
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Giả định import API & Hook của bạn
import { getAllExamMetadataAsync } from '../../../../data/examData'; 
import { useFirebaseAuth } from '../../../../hooks/useFirebaseAuth';

/* ══════════════════════════════════════════════════════
   1. CẤU HÌNH GIAO DIỆN (FLAT & SOLID COLORS)
══════════════════════════════════════════════════════ */
const DIFFICULTY_CONFIG = {
  beginner:     { label: 'Cơ bản',    icon: Star, color: 'text-green-500', bg: 'bg-green-50' },
  intermediate: { label: 'Trung cấp', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  advanced:     { label: 'Nâng cao',  icon: Star, color: 'text-red-500',   bg: 'bg-red-50' },
};

const CATEGORY_ICONS = {
  default: Sparkles,
  toeic: Headphones,
  ielts: BookOpen,
  huflit: Target,
};

/* ══════════════════════════════════════════════════════
   2. CSS NỀN KẺ Ô LY & THANH CUỘN NEO-BRUTALISM
══════════════════════════════════════════════════════ */
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    .bg-notebook-grid {
      background-color: #F8FAFC;
      background-image: 
        linear-gradient(#E2E8F0 1.5px, transparent 1.5px), 
        linear-gradient(90deg, #E2E8F0 1.5px, transparent 1.5px);
      background-size: 28px 28px;
      background-position: -1px -1px;
    }
    
    /* Bóng cứng đặc trưng */
    .solid-shadow {
      box-shadow: 4px 4px 0px 0px #1E293B;
    }
    .solid-shadow:active {
      box-shadow: 0px 0px 0px 0px #1E293B;
      transform: translate(4px, 4px);
    }
    .solid-shadow-sm {
      box-shadow: 2px 2px 0px 0px #1E293B;
    }
    .solid-shadow-sm:active {
      box-shadow: 0px 0px 0px 0px #1E293B;
      transform: translate(2px, 2px);
    }

    /* 🚀 THANH CUỘN CHUẨN NEO-BRUTALISM */
    .neo-scrollbar::-webkit-scrollbar {
      width: 12px;
    }
    .neo-scrollbar::-webkit-scrollbar-track {
      background: #F1F5F9;
      border-radius: 12px;
      border: 2px solid #1E293B;
    }
    .neo-scrollbar::-webkit-scrollbar-thumb {
      background: #1CB0F6;
      border: 2px solid #1E293B;
      border-radius: 12px;
    }
    .neo-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #FFC800;
    }
  `}} />
);

/* ══════════════════════════════════════════════════════
   3. SUB-COMPONENTS
══════════════════════════════════════════════════════ */

const EmptyState = memo(({ onClear }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border-2 border-slate-800 rounded-2xl border-dashed">
    <div className="w-16 h-16 rounded-xl border-2 border-slate-800 bg-slate-100 flex items-center justify-center mb-6 solid-shadow-sm">
      <Search className="w-8 h-8 text-slate-500" strokeWidth={3} />
    </div>
    <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-wide">Không tìm thấy</h3>
    <p className="text-[15px] font-bold text-slate-500 mb-6 max-w-sm">
      Thử một từ khóa khác xem sao nhé.
    </p>
    <button 
      onClick={onClear} 
      className="px-6 py-3 bg-[#FFC800] text-slate-900 rounded-xl text-[15px] font-black border-2 border-slate-800 solid-shadow transition-all outline-none uppercase tracking-widest"
    >
      Xóa bộ lọc
    </button>
  </div>
));
EmptyState.displayName = 'EmptyState';

const ExamListItem = memo(({ exam, isSelected, onSelect }) => {
  const diff = DIFFICULTY_CONFIG[exam.difficulty] || DIFFICULTY_CONFIG.beginner;
  const CategoryIcon = CATEGORY_ICONS[exam.category] || CATEGORY_ICONS.default;

  return (
    <div
      onClick={onSelect}
      className={`p-4 w-full cursor-pointer outline-none transition-all duration-200 rounded-2xl border-2 flex items-center gap-4 group ${
        isSelected 
          ? 'bg-[#1CB0F6] border-slate-800 shadow-[4px_4px_0px_0px_#1E293B] -translate-y-1 -translate-x-1' 
          : 'bg-white border-slate-800 hover:bg-slate-50 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_#1E293B]'
      }`}
    >
      <div className={`w-14 h-14 rounded-xl border-2 border-slate-800 flex items-center justify-center shrink-0 bg-white`}>
        <CategoryIcon size={28} className={isSelected ? 'text-[#1CB0F6]' : 'text-slate-800'} strokeWidth={2.5}/>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={`text-[16px] font-black truncate mb-1 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
          {exam.title || `Đề thi ${exam.id}`}
        </h3>
        <div className={`flex flex-wrap items-center gap-x-3 text-[13px] font-bold ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
          <span className="flex items-center gap-1.5"><FileText size={14} strokeWidth={3} /> {exam.questions || 60} câu</span>
          <span className="flex items-center gap-1.5"><Clock size={14} strokeWidth={3} /> {exam.duration || 90} phút</span>
        </div>
      </div>
    </div>
  );
});
ExamListItem.displayName = 'ExamListItem';

const CategoryTabs = memo(({ categories, activeCategory, onChange }) => (
  <div className="flex flex-wrap gap-3">
    {categories.map(cat => {
      const active = activeCategory === cat.id;
      return (
        <button 
          key={cat.id} onClick={() => onChange(cat.id)}
          className={`
            px-4 py-2.5 rounded-xl text-[14px] font-black outline-none flex items-center gap-2 border-2 border-slate-800 transition-all uppercase tracking-widest
            ${active 
              ? 'bg-[#FFC800] text-slate-900 solid-shadow-sm' 
              : 'bg-white text-slate-600 hover:bg-slate-100 solid-shadow-sm'}
          `}
        >
          {cat.label}
          {cat.count > 0 && (
            <span className={`ml-1 px-1.5 py-0.5 rounded-md text-[12px] font-black border-2 border-slate-800 ${active ? 'bg-white text-slate-900' : 'bg-slate-200 text-slate-600'}`}>
              {cat.count}
            </span>
          )}
        </button>
      );
    })}
  </div>
));
CategoryTabs.displayName = 'CategoryTabs';

const ModeSelectionModal = memo(({ exam, onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
    
    <Motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="relative w-full max-w-md bg-white border-4 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1E293B] z-10"
    >
      <div className="w-16 h-16 bg-[#1CB0F6] border-4 border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_#1E293B]">
        <Trophy size={32} className="text-white" strokeWidth={3} />
      </div>
      <h2 className="text-[24px] font-black text-center text-slate-800 mb-2 uppercase tracking-wide">Bạn đã sẵn sàng?</h2>
      <p className="text-[15px] font-bold text-slate-500 text-center mb-8">Hãy chọn cách làm bài cho <br/><span className="text-[#1CB0F6] font-black">"{exam.title}"</span></p>
      
      <div className="flex flex-col gap-4">
        <button onClick={() => onConfirm('full')} className="group p-4 bg-white border-2 border-slate-800 rounded-2xl hover:bg-[#FFC800] solid-shadow transition-all text-left w-full outline-none flex items-center gap-4">
          <div className="w-12 h-12 bg-white border-2 border-slate-800 rounded-xl flex items-center justify-center shrink-0">
            <Timer size={24} className="text-slate-800" strokeWidth={3} />
          </div>
          <div>
            <h4 className="text-[16px] font-black text-slate-800 uppercase tracking-wide">Thi Full (Tính giờ)</h4>
            <p className="text-[13px] font-bold text-slate-600">Làm bài với áp lực {exam.duration} phút.</p>
          </div>
        </button>

        <button onClick={() => onConfirm('practice')} className="group p-4 bg-white border-2 border-slate-800 rounded-2xl hover:bg-[#1CB0F6] solid-shadow transition-all text-left w-full outline-none flex items-center gap-4">
          <div className="w-12 h-12 bg-white border-2 border-slate-800 rounded-xl flex items-center justify-center shrink-0">
            <Zap size={24} className="text-slate-800" strokeWidth={3} />
          </div>
          <div>
            <h4 className="text-[16px] font-black text-slate-800 group-hover:text-white uppercase tracking-wide">Luyện tập tự do</h4>
            <p className="text-[13px] font-bold text-slate-600 group-hover:text-white/90">Không đếm ngược, thoải mái tra cứu.</p>
          </div>
        </button>
      </div>

      <button onClick={onClose} className="mt-6 w-full py-4 text-slate-500 font-black text-[15px] uppercase tracking-widest hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors outline-none border-2 border-transparent hover:border-slate-800">
        Để sau nhé
      </button>
    </Motion.div>
  </div>
));
ModeSelectionModal.displayName = 'ModeSelectionModal';

/* ══════════════════════════════════════════════════════
   4. MAIN COMPONENT: ExamSetup
══════════════════════════════════════════════════════ */
export const ExamSetup = memo(({ onStartExam }) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { isSignedIn } = useFirebaseAuth(); 

  const [examList, setExamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [isStarting, setIsStarting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [showModeModal, setShowModeModal] = useState(false);

  useEffect(() => {
    getAllExamMetadataAsync().then(data => setExamList(data || [])).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => { setActiveCategory(category || 'all'); }, [category]);

  const handleCategoryChange = useCallback((catId) => {
    navigate(catId === 'all' ? '/exams' : `/exams/${catId}`, { replace: true });
  }, [navigate]);

  const { categories } = useMemo(() => {
    const countMap = examList.reduce((acc, e) => {
      const cat = (e.category || 'other').toLowerCase();
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    const dynamic = Object.keys(countMap).map(id => ({ id, label: id, count: countMap[id] })).sort((a, b) => b.count - a.count);
    return { categories: [{ id: 'all', label: 'TẤT CẢ', count: examList.length }, ...dynamic] };
  }, [examList]);

  const filteredExams = useMemo(() => {
    let baseList = [...examList];
    if (activeCategory !== 'all') baseList = baseList.filter(e => (e.category || 'other').toLowerCase() === activeCategory);
    if (searchQuery.trim()) baseList = baseList.filter(e => e.title?.toLowerCase().includes(searchQuery.toLowerCase()));
    return baseList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [examList, activeCategory, searchQuery]);

  useEffect(() => {
    if (filteredExams.length > 0 && !filteredExams.find(e => e.id === selectedExamId)) {
      setSelectedExamId(filteredExams[0].id);
    } else if (filteredExams.length === 0) {
      setSelectedExamId(null);
    }
  }, [filteredExams, selectedExamId]);

  const selectedExamData = useMemo(() => examList.find(e => e.id === selectedExamId), [examList, selectedExamId]);

  const confirmStart = useCallback(async (mode) => {
    if (!selectedExamId) return;
    setShowModeModal(false);
    setIsStarting(true);
    try { await onStartExam?.(selectedExamId, mode); } 
    finally { setIsStarting(false); }
  }, [selectedExamId, onStartExam]);

  return (
    <div className="min-h-screen bg-notebook-grid font-nunito text-slate-800 pb-24 relative selection:bg-[#1CB0F6] selection:text-white">
      <CustomStyles />

      {/* HEADER ĐƠN GIẢN */}
      <header className="bg-white border-b-4 border-slate-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white border-2 border-slate-800 rounded-xl flex items-center justify-center solid-shadow-sm outline-none">
              <ArrowLeft className="text-slate-800" size={24} strokeWidth={3} />
            </button>
            <div>
              <h1 className="text-[22px] font-black text-slate-800 uppercase tracking-widest leading-none">Thư viện Đề thi</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* CỘT TRÁI: SHOWCASE ĐỀ THI (Sticky) */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-[120px] z-10 shrink-0 order-1 lg:order-1">
            <AnimatePresence mode="wait">
              {selectedExamData ? (
                <Motion.div 
                  key={selectedExamData.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-white border-4 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1E293B] relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#FFC800] border-2 border-slate-800 rotate-2 opacity-80" />

                  <div className="pt-4">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-[#1CB0F6] text-white border-2 border-slate-800 px-4 py-1.5 rounded-lg text-[12px] font-black uppercase tracking-widest solid-shadow-sm">
                        {selectedExamData.category}
                      </span>
                    </div>
                    
                    <h2 className="text-[32px] sm:text-[40px] font-black text-slate-800 leading-[1.1] mb-8">
                      {selectedExamData.title}
                    </h2>

                    <div className="space-y-4 mb-8">
                      <div className="bg-slate-50 border-2 border-slate-800 p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="text-[#1CB0F6]" size={24} strokeWidth={3} />
                          <span className="font-bold text-slate-600 uppercase tracking-widest text-[13px]">Thời gian</span>
                        </div>
                        <span className="font-black text-[20px] text-slate-800">{selectedExamData.duration || 120} Phút</span>
                      </div>

                      <div className="bg-slate-50 border-2 border-slate-800 p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="text-[#FFC800]" size={24} strokeWidth={3} />
                          <span className="font-bold text-slate-600 uppercase tracking-widest text-[13px]">Số lượng</span>
                        </div>
                        <span className="font-black text-[20px] text-slate-800">{selectedExamData.questions || 60} Câu</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowModeModal(true)} disabled={isStarting}
                      className="w-full py-5 bg-[#FFC800] text-slate-900 border-4 border-slate-800 rounded-2xl font-black text-[18px] uppercase tracking-widest solid-shadow flex items-center justify-center gap-3 outline-none"
                    >
                      {isStarting ? <Loader2 className="animate-spin text-slate-900" size={24} strokeWidth={3} /> : <Zap size={24} strokeWidth={3} />}
                      Bắt Đầu Chinh Phục
                    </button>
                  </div>
                </Motion.div>
              ) : (
                <div className="h-[400px] border-4 border-dashed border-slate-400 rounded-3xl flex flex-col items-center justify-center text-slate-400 bg-white/50 backdrop-blur-sm">
                   <Target size={48} strokeWidth={2} className="mb-4" />
                   <p className="font-black text-[16px] uppercase tracking-widest">Hãy chọn 1 đề thi</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* CỘT PHẢI: TÌM KIẾM, FILTER & DANH SÁCH CÓ THANH CUỘN */}
          <div className="flex-1 flex flex-col gap-6 order-2 lg:order-2">
            
            {/* Thanh Tìm Kiếm */}
            <div className="relative w-full z-10">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} strokeWidth={3} />
              <input 
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm đề thi theo tên..." 
                className="w-full bg-white border-4 border-slate-800 rounded-2xl py-4 pl-14 pr-5 font-black text-[16px] text-slate-800 placeholder:text-slate-400 solid-shadow focus:outline-none transition-all" 
              />
            </div>

            {/* Các nút Filter */}
            <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={handleCategoryChange} />

            {/* 🚀 KHU VỰC DANH SÁCH CÓ THANH CUỘN NEO-BRUTALISM */}
            <div className="mt-4 neo-scrollbar overflow-y-auto max-h-[600px] lg:max-h-[calc(100vh-280px)] pr-4 pb-4">
              <AnimatePresence mode="wait">
                {isLoading ? (
                   <Motion.div key="loader" exit={{ opacity: 0 }} className="space-y-4">
                      {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-white border-2 border-slate-300 rounded-2xl animate-pulse" />)}
                   </Motion.div>
                ) : filteredExams.length > 0 ? (
                  <Motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {filteredExams.map(exam => (
                      <ExamListItem
                        key={exam.id} exam={exam}
                        isSelected={selectedExamId === exam.id}
                        onSelect={() => {
                          setSelectedExamId(exam.id);
                          if (window.innerWidth < 1024) window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    ))}
                  </Motion.div>
                ) : (
                  <Motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <EmptyState onClear={() => { handleCategoryChange('all'); setSearchQuery(''); }} />
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {showModeModal && selectedExamData && (
          <ModeSelectionModal exam={selectedExamData} onConfirm={confirmStart} onClose={() => setShowModeModal(false)} />
        )}
      </AnimatePresence>

    </div>
  );
});

ExamSetup.displayName = 'ExamSetup';
export default ExamSetup;
import React, { useState, memo, useMemo, useCallback, useRef, useEffect, useId } from 'react';
import { getAllExamMetadataAsync } from '../../../../data/examData';
import { 
  Search, ChevronRight, Check, FileText, Clock, 
  LayoutGrid, Target, Headphones, BookOpen, Sparkles 
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion'; // 🚀 FIX: Alias Motion

/* ─── Analytics (Fix Vite Env) ──────────────────────────── */
const analytics = {
  track: (event, props) => {
    if (import.meta.env.DEV) console.debug('[analytics]', event, props);
  },
};

/* ─── Difficulty config ────────────────── */
const DIFFICULTY_CONFIG = {
  beginner:     { label: 'Cơ bản',   bg: 'bg-[#f1faeb]', text: 'text-[#58CC02]', border: 'border-[#bcf096]' },
  intermediate: { label: 'Trung cấp', bg: 'bg-[#FFF4E5]', text: 'text-[#FF9600]', border: 'border-[#FFD8A8]' },
  advanced:     { label: 'Nâng cao',  bg: 'bg-[#fff0f0]', text: 'text-[#FF4B4B]', border: 'border-[#ffc1c1]' },
};

/* ─── Skeleton (Gamified) ────────────────────────────────── */
const SkeletonList = memo(() => (
  <div role="status" aria-busy="true" className="flex flex-col px-2 pt-2">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="mb-3 h-[92px] bg-slate-100 border-2 border-slate-200 border-b-[4px] rounded-[20px] p-4 flex items-center gap-4">
        <div className="w-6 h-6 rounded-[8px] bg-slate-200 animate-pulse shrink-0" />
        <div className="flex-1 flex flex-col gap-2.5">
          <div className="h-4 w-2/3 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-3 w-1/2 bg-slate-200 rounded-full animate-pulse" />
        </div>
      </div>
    ))}
  </div>
));
SkeletonList.displayName = 'SkeletonList';

/* ─── Empty State ────────────────────────────────────────── */
const EmptyState = memo((props) => {
  const { searchQuery, onClear } = props;
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-[16px] bg-slate-100 border-2 border-slate-200 border-b-[4px] flex items-center justify-center mb-4 shadow-sm">
        <Search className="w-8 h-8 text-slate-400" strokeWidth={2.5} />
      </div>
      <p className="text-[18px] font-display font-black text-slate-700 mb-1">Không tìm thấy đề thi</p>
      <p className="text-[14px] font-body font-bold text-slate-500 mb-5 max-w-xs">
        {searchQuery ? <>Không có kết quả cho "<strong>{searchQuery}</strong>"</> : 'Chưa có đề thi nào.'}
      </p>
      {searchQuery && (
        <button 
          onClick={onClear} 
          className="px-5 py-2.5 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] border-b-[4px] rounded-[14px] text-[13px] font-display font-black uppercase tracking-wider hover:bg-[#1CB0F6] hover:text-white hover:border-[#1899D6] active:border-b-2 active:translate-y-[2px] transition-all outline-none"
        >
          Xóa tìm kiếm
        </button>
      )}
    </div>
  );
});
EmptyState.displayName = 'EmptyState';

/* ─── Exam List Item ──────────────────── */
const ExamListItem = memo((props) => {
  const { exam, isSelected, onSelect, id, itemHeight } = props;
  const itemRef = useRef(null);
  
  useEffect(() => { 
    if (isSelected) itemRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); 
  }, [isSelected]);

  const diff = DIFFICULTY_CONFIG[exam.difficulty] || DIFFICULTY_CONFIG.beginner;

  return (
    <div style={{ height: itemHeight, padding: '0 4px 12px 4px' }}>
      <div
        id={id} ref={itemRef}
        role="option" aria-selected={isSelected} tabIndex={isSelected ? 0 : -1}
        onClick={onSelect}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
        className={`h-full w-full relative flex items-center gap-3 sm:gap-4 px-4 py-3 cursor-pointer outline-none transition-all rounded-[20px] border-2 border-b-[4px] ${
          isSelected 
            ? 'bg-[#EAF6FE] border-[#1CB0F6] shadow-sm -translate-y-[1px]' 
            : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
        }`}
      >
        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-[8px] sm:rounded-[10px] shrink-0 flex items-center justify-center border-2 transition-all ${
          isSelected ? 'bg-[#1CB0F6] border-[#1899D6] border-b-[3px]' : 'bg-slate-100 border-slate-300 border-b-[3px]'
        }`}>
          {isSelected && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={4} />}
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className={`text-[15px] sm:text-[16px] font-display font-black truncate ${isSelected ? 'text-[#1CB0F6]' : 'text-slate-800'}`}>
              {exam.title || `Exam ${exam.id}`}
            </h3>
            {exam.isNew && (
              <span className="px-2 py-0.5 bg-[#fff0f0] text-[#FF4B4B] border border-[#ffc1c1] rounded-[8px] text-[10px] font-display font-black uppercase tracking-widest shrink-0">
                Mới
              </span>
            )}
          </div>

          <p className="text-[12px] sm:text-[13px] font-body font-bold text-slate-500 truncate mb-1.5 sm:mb-2">
            {exam.description || 'Bài kiểm tra năng lực tiếng Anh'}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-slate-100 border border-slate-200 text-slate-500 rounded-[8px] text-[10px] sm:text-[11px] font-display font-black uppercase tracking-widest">
              <FileText size={12} strokeWidth={2.5} /> {exam.questions || 60} câu
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-slate-100 border border-slate-200 text-slate-500 rounded-[8px] text-[10px] sm:text-[11px] font-display font-black uppercase tracking-widest">
              <Clock size={12} strokeWidth={2.5} /> {exam.duration || 90}p
            </span>
            <span className={`px-2 py-0.5 sm:py-1 rounded-[8px] text-[10px] sm:text-[11px] font-display font-black uppercase tracking-widest border ${diff.bg} ${diff.text} ${diff.border}`}>
              {diff.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
ExamListItem.displayName = 'ExamListItem';

/* ─── Virtual List Box ───────────────────────────────────── */
const ITEM_H  = 104; 
const VISIBLE = 4;
const BUFFER  = 2;

const ExamListBox = memo((props) => {
  const { exams, selectedExam, onSelectExam, listboxId } = props;
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const activeIdx = useMemo(() => exams.findIndex(e => e.id === selectedExam), [exams, selectedExam]);

  const handleKeyDown = useCallback((e) => {
    const len = exams.length;
    if (!len) return;
    let next = activeIdx;
    if      (e.key === 'ArrowDown') { e.preventDefault(); next = Math.min(activeIdx + 1, len - 1); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); next = Math.max(activeIdx - 1, 0); }
    else if (e.key === 'Home')      { e.preventDefault(); next = 0; }
    else if (e.key === 'End')       { e.preventDefault(); next = len - 1; }
    else return;

    onSelectExam(exams[next].id);
    const top = next * ITEM_H;
    const el  = containerRef.current;
    if (!el) return;
    if (top < el.scrollTop) el.scrollTop = top;
    else if (top + ITEM_H > el.scrollTop + el.clientHeight) el.scrollTop = top + ITEM_H - el.clientHeight;
  }, [exams, activeIdx, onSelectExam]);

  const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_H) - BUFFER);
  const endIdx   = Math.min(exams.length, Math.ceil((scrollTop + VISIBLE * ITEM_H) / ITEM_H) + BUFFER);

  return (
    <div
      id={listboxId} ref={containerRef}
      role="listbox" aria-label="Danh sách đề thi"
      aria-activedescendant={selectedExam ? `exam-opt-${selectedExam}` : undefined}
      tabIndex={0}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
      onKeyDown={handleKeyDown}
      className="outline-none custom-scrollbar p-2"
      style={{ maxHeight: VISIBLE * ITEM_H, overflowY: 'auto' }}
    >
      <div style={{ height: exams.length * ITEM_H, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, transform: `translateY(${startIdx * ITEM_H}px)` }}>
          {exams.slice(startIdx, endIdx).map(exam => (
            <ExamListItem
              key={exam.id} id={`exam-opt-${exam.id}`}
              exam={exam} itemHeight={ITEM_H}
              isSelected={selectedExam === exam.id}
              onSelect={() => onSelectExam(exam.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
ExamListBox.displayName = 'ExamListBox';

/* ─── Category Tab Bar ──────────────────── */
const CategoryTabs = memo((props) => {
  const { categories, activeCategory, onChange } = props;
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 pt-1 custom-scrollbar snap-x px-1">
      {categories.map(cat => {
        const active = activeCategory === cat.id;
        // 🚀 FIX: Dùng icon cho từng category để tránh lỗi unused-vars
        const Icon = cat.id === 'toeic' ? Headphones : cat.id === 'ielts' ? BookOpen : Sparkles;
        
        return (
          <button 
            key={cat.id} 
            onClick={() => onChange(cat.id)}
            className={`
              snap-start shrink-0 px-4 py-2 rounded-[14px] text-[12px] font-display font-black uppercase tracking-wider transition-all outline-none border-2 flex items-center gap-2
              ${active 
                ? 'bg-[#1CB0F6] text-white border-[#1899D6] border-b-[4px] -translate-y-[1px] shadow-sm' 
                : 'bg-white text-slate-500 border-slate-200 border-b-[4px] hover:bg-slate-50 active:border-b-2 active:translate-y-[2px]'}
            `}
          >
            <Icon size={14} strokeWidth={3} />
            {cat.label} {cat.count > 0 && <span className={`ml-1 px-1.5 py-0.5 rounded-[6px] text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>{cat.count}</span>}
          </button>
        );
      })}
    </div>
  );
});
CategoryTabs.displayName = 'CategoryTabs';

/* ══════════════════════════════════════════════════════
   MAIN — ExamSetup
══════════════════════════════════════════════════════ */
export const ExamSetup = memo(({ onStartExam }) => {
  const listboxId = useId();

  const [examList,        setExamList]        = useState([]);
  const [isLoading,       setIsLoading]       = useState(true);
  const [selectedExam,    setSelectedExam]    = useState('');
  const [isStarting,      setIsStarting]      = useState(false);
  const [searchQuery,     setSearchQuery]     = useState('');
  const [activeCategory,  setActiveCategory]  = useState('all');

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getAllExamMetadataAsync()
      .then(data => {
        if (!mounted) return;
        setExamList(data || []);
        if (data?.length > 0) setSelectedExam(data[0].id);
      })
      .catch(err => console.error('[ExamSetup] load failed:', err))
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  const categories = useMemo(() => {
    const countMap = {};
    examList.forEach(e => {
      const cat = (e.category || 'other').toLowerCase();
      countMap[cat] = (countMap[cat] || 0) + 1;
    });

    const dynamic = Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({
        id,
        label: id === 'toeic' ? 'TOEIC' : id === 'ielts' ? 'IELTS' : id === 'huflit' ? 'HUFLIT' : id.toUpperCase(),
        count,
      }));

    return [{ id: 'all', label: 'TẤT CẢ', count: examList.length }, ...dynamic];
  }, [examList]);

  const filteredExams = useMemo(() => {
    let r = examList;
    if (activeCategory !== 'all') {
      r = r.filter(e => (e.category || 'other').toLowerCase() === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(e =>
        e.title?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.id?.toLowerCase().includes(q)
      );
    }
    return [...r].sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
  }, [examList, activeCategory, searchQuery]);

  useEffect(() => {
    if (filteredExams.length > 0 && !filteredExams.find(e => e.id === selectedExam)) {
      setSelectedExam(filteredExams[0].id);
    }
  }, [filteredExams, selectedExam]);

  const selectedExamData = useMemo(() => examList.find(e => e.id === selectedExam), [examList, selectedExam]);

  const handleStart = useCallback(async () => {
    if (!selectedExam) return;
    setIsStarting(true);
    analytics.track('exam_started', { examId: selectedExam });
    try { await onStartExam?.(selectedExam); } finally { setIsStarting(false); }
  }, [selectedExam, onStartExam]);

  const handleSearch = useCallback(e => setSearchQuery(e.target.value), []);
  const handleSelectExam = useCallback(id => setSelectedExam(id), []);
  const clearSearch = useCallback(() => setSearchQuery(''), []);

  const REQUIREMENTS = [
    'Môi trường yên tĩnh, tập trung',
    'Kết nối mạng ổn định',
    'Tiến độ được lưu tự động',
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F7FA] font-sans">
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-6 pb-32 lg:pb-12">
        
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] md:text-[34px] font-display font-black text-slate-800 tracking-tight leading-tight flex items-center gap-2.5">
              HubStudy <span className="text-[#1CB0F6]">Assessment</span>
              <Target size={28} className="text-[#FF9600] shrink-0" strokeWidth={2.5} />
            </h1>
            <p className="text-slate-500 text-[14px] font-body font-bold mt-1">Đánh giá năng lực chuẩn quốc tế.</p>
          </div>
          <div className="inline-flex items-center gap-2 w-fit px-3 py-2 bg-white text-[#1CB0F6] border-2 border-slate-200 border-b-[3px] rounded-[12px] text-[11px] font-display font-black uppercase tracking-widest shrink-0 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1CB0F6] animate-pulse" />
            Bài thi chính thức
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-white p-5 rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm">
              <label htmlFor="exam-search" className="block text-[12px] font-display font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Chọn đề thi</label>
              <div className="relative mb-5">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Search size={20} strokeWidth={2.5} /></div>
                <input
                  id="exam-search" type="search" autoComplete="off" placeholder="Nhập mã đề, tên..."
                  value={searchQuery} onChange={handleSearch} aria-controls={listboxId}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-[16px] text-[15px] font-body font-bold text-slate-800 outline-none focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
              <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={cat => { setActiveCategory(cat); setSearchQuery(''); }} />
            </div>

            <div className="bg-white rounded-[24px] border-2 border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b-2 border-slate-100">
                <p className="text-[12px] font-display font-black text-slate-500 uppercase tracking-widest">
                  <span className="text-[#1CB0F6] text-[14px]">{filteredExams.length}</span> đề thi
                </p>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-display font-bold text-slate-400 uppercase tracking-widest">
                  <LayoutGrid size={14} strokeWidth={2.5} /> Dùng phím mũi tên
                </div>
              </div>
              <div className="flex-1 min-h-[300px]">
                {isLoading ? <SkeletonList /> : filteredExams.length > 0 ? (
                  <ExamListBox exams={filteredExams} selectedExam={selectedExam} onSelectExam={handleSelectExam} listboxId={listboxId} />
                ) : <EmptyState searchQuery={searchQuery} onClear={clearSearch} />}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white border-2 border-slate-200 rounded-[24px] border-b-[6px] p-5 md:p-6 shadow-sm flex flex-col gap-5">
              <AnimatePresence mode="wait">
                {selectedExamData && (
                  <Motion.div 
                    key={selectedExamData.id}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[20px]"
                  >
                    <p className="text-[10px] font-display font-black text-[#1CB0F6] uppercase tracking-widest mb-1.5">Mục tiêu hiện tại</p>
                    <p className="text-[18px] md:text-[20px] font-display font-black text-slate-800 leading-tight mb-3">{selectedExamData.title}</p>
                    <span className="inline-block px-3 py-1 bg-white text-[#1CB0F6] rounded-[8px] text-[10px] font-display font-black uppercase tracking-widest border-2 border-[#BAE3FB]">
                      {selectedExamData.category?.toUpperCase() || 'GENERAL'}
                    </span>
                  </Motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-[16px]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-[14px] flex items-center justify-center border-2 border-b-[3px] bg-[#FFF4E5] text-[#FF9600] border-[#FFD8A8]"><Clock size={22} strokeWidth={2.5} /></div>
                    <div>
                      <p className="text-[15px] font-display font-black text-slate-800 m-0">Tổng thời gian</p>
                      <p className="text-[12px] font-body font-bold text-slate-500">Làm bài liên tục</p>
                    </div>
                  </div>
                  <span className="px-3.5 py-2 bg-white border-2 border-slate-200 rounded-[12px] text-[13px] font-display font-black text-slate-600 uppercase tracking-wider">{selectedExamData?.duration || 90} phút</span>
                </div>

                <div className="pt-4 border-t-2 border-slate-100">
                  <h2 className="text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-3">Lưu ý trước khi thi</h2>
                  <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                    {REQUIREMENTS.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-[6px] bg-[#f1faeb] border-2 border-[#bcf096] flex items-center justify-center shrink-0 mt-0.5"><Check size={12} className="text-[#58CC02]" strokeWidth={4} /></div>
                        <span className="text-[14px] font-body font-bold text-slate-600 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden lg:block pt-4">
                  <Motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleStart} disabled={isStarting || !selectedExam || isLoading}
                    className="w-full py-4 bg-[#58CC02] border-[#46A302] border-b-[6px] rounded-[20px] font-display font-black text-[16px] uppercase tracking-wider text-white shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400"
                  >
                    {isStarting ? 'Đang chuẩn bị...' : <>Bắt đầu thi <ChevronRight size={20} strokeWidth={3} /></>}
                  </Motion.button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t-2 border-slate-200 p-4 z-50">
        <button
          onClick={handleStart} disabled={isStarting || !selectedExam || isLoading}
          className="w-full py-3.5 bg-[#58CC02] border-[#46A302] border-b-[5px] rounded-[18px] font-display font-black text-[15px] uppercase tracking-wider text-white flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400"
        >
          {isStarting ? 'Đang chuẩn bị...' : 'Bắt đầu thi ngay'}
        </button>
      </div>
    </div>
  );
});

ExamSetup.displayName = 'ExamSetup';
export default ExamSetup;
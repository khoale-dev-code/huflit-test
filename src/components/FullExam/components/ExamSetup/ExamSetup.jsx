import React, { useState, memo, useMemo, useCallback, useRef, useEffect, useId } from 'react';
import StepIndicator from '../../StepIndicator';
import { getAllExamMetadataAsync } from '../../../../data/examData';
import { Search, ChevronRight, Check, FileText, Clock, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Analytics ──────────────────────────────────────────── */
const analytics = {
  track: (event, props) => {
    if (process.env.NODE_ENV === 'development') console.debug('[analytics]', event, props);
  },
};

/* ─── Difficulty config ──────────────────────────────────── */
const DIFFICULTY_CONFIG = {
  beginner:     { label: 'Cơ bản',    bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  intermediate: { label: 'Trung cấp', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  advanced:     { label: 'Nâng cao',  bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

/* ─── Global Styles & Fonts ──────────────────────────────── */
const GlobalStyles = memo(() => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700&family=Quicksand:wght@600;700&display=swap');
    
    .font-quick { font-family: 'Quicksand', sans-serif; }
    .font-nunito { font-family: 'Nunito', sans-serif; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `}</style>
));
GlobalStyles.displayName = 'GlobalStyles';

/* ─── Skeleton ───────────────────────────────────────────── */
const SkeletonList = memo(() => (
  <div role="status" aria-busy="true" className="divide-y divide-gray-100">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="flex items-center gap-3 px-4 py-3 h-20 bg-white">
        <div className="w-5 h-5 rounded-full bg-gray-200 shrink-0 animate-pulse" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3.5 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-4/5 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    ))}
  </div>
));
SkeletonList.displayName = 'SkeletonList';

/* ─── Empty State ────────────────────────────────────────── */
const EmptyState = memo(({ searchQuery, onClear }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white">
    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
      <Search className="w-6 h-6 text-gray-300" strokeWidth={2} />
    </div>
    <p className="text-base font-semibold text-gray-800 mb-1">Không tìm thấy đề thi</p>
    <p className="text-sm font-medium text-gray-500 mb-4 max-w-xs">
      {searchQuery ? <>Không có kết quả cho "<strong>{searchQuery}</strong>"</> : 'Chưa có đề thi nào.'}
    </p>
    {searchQuery && (
      <button 
        onClick={onClear} 
        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
      >
        Xóa tìm kiếm
      </button>
    )}
  </div>
));
EmptyState.displayName = 'EmptyState';

/* ─── Exam List Item ─────────────────────────────────────── */
const ExamListItem = memo(({ exam, isSelected, onSelect, id }) => {
  const itemRef = useRef(null);
  useEffect(() => { if (isSelected) itemRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [isSelected]);

  const diff = DIFFICULTY_CONFIG[exam.difficulty];

  return (
    <div
      id={id} ref={itemRef}
      role="option" aria-selected={isSelected} tabIndex={isSelected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
      className={`
        relative flex items-center gap-3 px-4 py-3 min-h-20 cursor-pointer outline-none transition-colors border-b border-gray-100 last:border-b-0
        ${isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}
      `}
    >
      {/* Selected Indicator */}
      {isSelected && <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r" />}

      {/* Radio Checkbox */}
      <div className={`
        w-5 h-5 rounded-md shrink-0 flex items-center justify-center border-2 transition-all
        ${isSelected ? 'bg-blue-500 border-blue-600' : 'bg-white border-gray-300'}
      `}>
        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
            {exam.title || `Exam ${exam.id}`}
          </h3>
          {exam.isNew && (
            <span className="px-2 py-0.5 bg-rose-100 text-rose-600 rounded-md text-xs font-bold uppercase shrink-0">
              Mới
            </span>
          )}
        </div>

        <p className="text-xs font-medium text-gray-500 truncate mb-2">
          {exam.description || 'Bài kiểm tra năng lực tiếng Anh'}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
            <FileText size={12} /> {exam.questions || 60} câu
          </span>
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
            <Clock size={12} /> {exam.duration || 90} phút
          </span>
          {diff && (
            <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${diff.bg} ${diff.text} ${diff.border}`}>
              {diff.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
ExamListItem.displayName = 'ExamListItem';

/* ─── Virtual List Box ───────────────────────────────────── */
const ITEM_H  = 88;
const VISIBLE = 5;
const BUFFER  = 2;

const ExamListBox = memo(({ exams, selectedExam, onSelectExam, listboxId }) => {
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
      className="outline-none custom-scrollbar bg-white"
      style={{ maxHeight: VISIBLE * ITEM_H, overflowY: 'auto' }}
    >
      <div style={{ height: exams.length * ITEM_H, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, transform: `translateY(${startIdx * ITEM_H}px)` }}>
          {exams.slice(startIdx, endIdx).map(exam => (
            <ExamListItem
              key={exam.id} id={`exam-opt-${exam.id}`}
              exam={exam}
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

/* ─── Category Tab Bar ───────────────────────────────────── */
const CategoryTabs = memo(({ categories, activeCategory, onChange }) => (
  <div className="flex gap-2 overflow-x-auto pb-2 pt-0 custom-scrollbar snap-x">
    {categories.map(cat => {
      const active = activeCategory === cat.id;
      return (
        <button 
          key={cat.id} 
          onClick={() => onChange(cat.id)}
          className={`
            snap-start shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all outline-none
            ${active 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
          `}
        >
          {cat.label} {cat.count > 0 && <span className={`ml-1 text-xs font-bold`}>{cat.count}</span>}
        </button>
      );
    })}
  </div>
));
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
        label: id.toUpperCase(),
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

  const TEST_SECTIONS = [
    { label: 'Listening', desc: 'Nghe hiểu tình huống', time: '30 phút', icon: '🎧', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'Reading',   desc: 'Đọc hiểu văn bản', time: '60 phút', icon: '📖', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ];

  const REQUIREMENTS = [
    'Môi trường yên tĩnh, tập trung',
    'Kết nối mạng ổn định',
    'Tiến độ được lưu tự động',
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-12 selection:bg-blue-200">
      <GlobalStyles />
      
      {/* ── Header ── */}
      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 py-5 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          
          {/* ── Page Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight italic leading-tight">
                HubStudy <span className="text-blue-600">Placement Test</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Đánh giá năng lực ngoại ngữ chuẩn đầu ra.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-xs font-bold uppercase tracking-widest shrink-0">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Official Assessment
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t border-slate-100">
            <StepIndicator currentMode="setup" />
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-4 md:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">

          {/* ── Left: Exam Selection ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* Search & Categories Box */}
            <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-xs">
              <label htmlFor="exam-search" className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">
                Chọn đề thi
              </label>
              
              <div className="relative mb-4">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={18} strokeWidth={2} />
                </div>
                <input
                  id="exam-search" type="search" autoComplete="off"
                  placeholder="Nhập mã đề, tên..."
                  value={searchQuery} onChange={handleSearch}
                  aria-controls={listboxId}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-gray-400"
                />
              </div>

              <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={cat => { setActiveCategory(cat); setSearchQuery(''); }} />
            </div>

            {/* Exam List Box */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100 shrink-0">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <span className="text-blue-600 font-bold">{filteredExams.length}</span> đề thi
                </p>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <LayoutGrid size={14} /> Phím mũi tên
                </div>
              </div>

              <div className="flex-1 min-h-80">
                {isLoading ? (
                  <SkeletonList />
                ) : filteredExams.length > 0 ? (
                  <ExamListBox exams={filteredExams} selectedExam={selectedExam} onSelectExam={handleSelectExam} listboxId={listboxId} />
                ) : (
                  <EmptyState searchQuery={searchQuery} onClear={clearSearch} />
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Info & CTA ── */}
          <aside className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-xs flex flex-col gap-4">

              {/* Selected Preview */}
              <AnimatePresence mode="wait">
                {selectedExamData && (
                  <motion.div 
                    key={selectedExamData.id}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 md:p-5 bg-blue-50 border border-blue-200 rounded-xl"
                  >
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Mục tiêu hiện tại</p>
                    <p className="text-lg font-semibold text-blue-900 leading-snug mb-2">{selectedExamData.title}</p>
                    {selectedExamData.category && (
                      <span className="inline-block px-2.5 py-1 bg-white text-blue-600 rounded-lg text-xs font-semibold uppercase border border-blue-100">
                        {selectedExamData.category}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Test Structure */}
              <div>
                <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">Cấu trúc bài thi</h2>
                <div className="flex flex-col gap-2">
                  {TEST_SECTIONS.map(s => (
                    <div key={s.label} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg border ${s.bg} ${s.border}`}>{s.icon}</div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 m-0 leading-none">{s.label}</p>
                          <p className="text-xs font-medium text-gray-600 mt-1">{s.desc}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600">
                        {s.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="pt-4 border-t border-gray-100">
                <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">Lưu ý trước khi thi</h2>
                <ul className="flex flex-col gap-2.5">
                  {REQUIREMENTS.map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0 flex-none mt-0.5">
                        <Check size={12} className="text-green-600" strokeWidth={4} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button (Desktop) */}
              <div className="hidden lg:block pt-2">
                <button
                  onClick={handleStart}
                  disabled={isStarting || !selectedExam || isLoading}
                  className={`
                    w-full py-3 rounded-lg font-semibold text-base uppercase tracking-wide flex items-center justify-center gap-2 transition-all outline-none
                    ${(isStarting || !selectedExam || isLoading)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600 active:scale-95'}
                  `}
                >
                  {isStarting ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Chuẩn bị...</>
                  ) : (
                    <>Bắt đầu thi <ChevronRight size={18} strokeWidth={2} /></>
                  )}
                </button>
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* ── CTA Button (Mobile) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          onClick={handleStart}
          disabled={isStarting || !selectedExam || isLoading}
          className={`
            w-full py-3 rounded-lg font-semibold text-base uppercase tracking-wide flex items-center justify-center gap-2 transition-all outline-none
            ${(isStarting || !selectedExam || isLoading)
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-green-500 text-white active:scale-95'}
          `}
        >
          {isStarting ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Chuẩn bị...</>
          ) : (
            <>Bắt đầu thi ngay <ChevronRight size={18} strokeWidth={2} /></>
          )}
        </button>
      </div>

    </div>
  );
});

ExamSetup.displayName = 'ExamSetup';
export default ExamSetup;
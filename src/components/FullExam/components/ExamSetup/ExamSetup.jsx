import React, {
  useState,
  memo,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useId,
} from 'react';
import StepIndicator from '../../StepIndicator';
import { getAllExamMetadataAsync } from '../../../../data/examData';

/* ─────────────────────────────────────────────────────────────
   Analytics
   ───────────────────────────────────────────────────────────── */
const analytics = {
  track: (event, props) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[analytics]', event, props);
    }
  },
};

/* ─────────────────────────────────────────────────────────────
   Class maps
   ───────────────────────────────────────────────────────────── */
const DIFFICULTY_CLASSES = {
  beginner:     'text-teal-700 bg-teal-50',
  intermediate: 'text-amber-700 bg-amber-50',
  advanced:     'text-rose-700 bg-rose-50',
};
const DIFFICULTY_LABELS = {
  beginner:     'Cơ bản',
  intermediate: 'Trung cấp',
  advanced:     'Nâng cao',
};

/* ─────────────────────────────────────────────────────────────
   SkeletonList
   ───────────────────────────────────────────────────────────── */
const SkeletonList = memo(() => (
  <div role="status" aria-label="Loading exams..." aria-busy="true" className="py-2">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="flex gap-4 items-center px-5 h-[112px] border-b border-slate-100 last:border-none">
        <div className="animate-pulse bg-slate-200 rounded-full w-5 h-5 shrink-0" />
        <div className="flex-1 flex flex-col gap-2.5">
          <div className="animate-pulse bg-slate-200 rounded-md h-4 w-[60%]" />
          <div className="animate-pulse bg-slate-100 rounded-md h-3 w-[85%]" />
          <div className="flex gap-2">
            <div className="animate-pulse bg-slate-100 rounded-md h-6 w-16" />
            <div className="animate-pulse bg-slate-100 rounded-md h-6 w-16" />
          </div>
        </div>
      </div>
    ))}
  </div>
));
SkeletonList.displayName = 'SkeletonList';

/* ─────────────────────────────────────────────────────────────
   EmptyState
   ───────────────────────────────────────────────────────────── */
const EmptyState = memo(({ searchQuery, onClearFilters }) => (
  <div role="status" className="py-16 px-6 text-center flex flex-col items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-2">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="11" stroke="#94A3B8" strokeWidth="2" />
        <path d="M27 27l7 7" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <div className="space-y-1">
      <p className="text-base font-semibold text-slate-900 m-0">
        Không tìm thấy đề thi
      </p>
      <p className="text-sm text-slate-500 m-0 max-w-sm">
        {searchQuery ? (
          <>Không có kết quả cho "<strong>{searchQuery}</strong>". Thử từ khóa khác.</>
        ) : (
          'Hiện chưa có đề thi nào trong hệ thống.'
        )}
      </p>
    </div>
    {searchQuery && (
      <button
        onClick={onClearFilters}
        className="mt-4 px-5 py-2.5 rounded-xl border border-blue-600 bg-blue-50 text-blue-700 font-medium text-sm transition-colors hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-none"
      >
        Xóa tìm kiếm
      </button>
    )}
  </div>
));
EmptyState.displayName = 'EmptyState';

/* ─────────────────────────────────────────────────────────────
   ExamListItem
   ───────────────────────────────────────────────────────────── */
const ExamListItem = memo(({ exam, isSelected, onSelect, id }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (isSelected) itemRef.current?.focus();
  }, [isSelected]);

  return (
    <div
      id={id}
      ref={itemRef}
      role="option"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={[
        'group relative flex items-center gap-4 cursor-pointer outline-none box-border',
        'h-[112px] px-5 border-b border-slate-100 last:border-none',
        'transition-colors duration-200',
        'focus-visible:bg-blue-50/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600',
        isSelected ? 'bg-blue-50/40' : 'bg-white hover:bg-slate-50',
      ].join(' ')}
    >
      {/* Indicator Line */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-md" />
      )}

      {/* Radio indicator */}
      <div
        aria-hidden="true"
        className={[
          'shrink-0 w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors',
          isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white group-hover:border-slate-400',
        ].join(' ')}
      >
        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
      </div>

      <div className="flex-1 min-w-0 py-2">
        <div className="flex justify-between items-center gap-3 mb-1.5">
          <h3 className="text-[15px] font-semibold text-slate-900 m-0 truncate group-hover:text-blue-700 transition-colors">
            {exam.title || `Exam ${exam.id}`}
          </h3>
          {exam.isNew && (
            <span className="text-[10px] font-bold tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded shrink-0">
              NEW
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500 mb-3 m-0 truncate">
          {exam.description || 'Bài kiểm tra năng lực tiếng Anh toàn diện'}
        </p>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium flex items-center gap-1">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {exam.questions || 60} câu
          </span>
          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium flex items-center gap-1">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {exam.duration || 90} phút
          </span>
          {exam.difficulty && (
            <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${DIFFICULTY_CLASSES[exam.difficulty] || 'bg-slate-100 text-slate-600'}`}>
              {DIFFICULTY_LABELS[exam.difficulty] || exam.difficulty}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
ExamListItem.displayName = 'ExamListItem';

/* ─────────────────────────────────────────────────────────────
   ExamListBox
   ───────────────────────────────────────────────────────────── */
const ITEM_H  = 112; 
const VISIBLE = 4;
const BUFFER  = 2;

const ExamListBox = memo(({ exams, selectedExam, onSelectExam, listboxId }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const activeIdx = useMemo(
    () => exams.findIndex(e => e.id === selectedExam),
    [exams, selectedExam],
  );

  const handleKeyDown = useCallback((e) => {
    const len = exams.length;
    if (len === 0) return;
    let next = activeIdx;
    if      (e.key === 'ArrowDown') { e.preventDefault(); next = Math.min(activeIdx + 1, len - 1); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); next = Math.max(activeIdx - 1, 0); }
    else if (e.key === 'Home')      { e.preventDefault(); next = 0; }
    else if (e.key === 'End')       { e.preventDefault(); next = len - 1; }
    else return;

    onSelectExam(exams[next].id);
    const itemTop = next * ITEM_H;
    const container = containerRef.current;
    if (!container) return;
    if (itemTop < container.scrollTop)
      container.scrollTop = itemTop;
    else if (itemTop + ITEM_H > container.scrollTop + container.clientHeight)
      container.scrollTop = itemTop + ITEM_H - container.clientHeight;
  }, [exams, activeIdx, onSelectExam]);

  const handleScroll = useCallback((e) => setScrollTop(e.currentTarget.scrollTop), []);

  const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_H) - BUFFER);
  const endIdx   = Math.min(exams.length, Math.ceil((scrollTop + VISIBLE * ITEM_H) / ITEM_H) + BUFFER);

  return (
    <div
      id={listboxId}
      ref={containerRef}
      role="listbox"
      aria-label="Danh sách đề thi"
      aria-activedescendant={selectedExam ? `exam-opt-${selectedExam}` : undefined}
      tabIndex={0}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      className="outline-none overflow-y-auto w-full
                 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300"
      style={{ maxHeight: VISIBLE * ITEM_H }}
    >
      <div style={{ height: exams.length * ITEM_H, position: 'relative' }}>
        <div style={{ transform: `translateY(${startIdx * ITEM_H}px)`, position: 'absolute', top: 0, left: 0, right: 0 }}>
          {exams.slice(startIdx, endIdx).map(exam => (
            <ExamListItem
              key={exam.id}
              id={`exam-opt-${exam.id}`}
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

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export const ExamSetup = memo(({ onStartExam, onExamHover }) => {
  const listboxId = useId();

  const [examList, setExamList] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [selectedExam, setSelectedExam] = useState('');
  
  const [isStarting,  setIsStarting]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchExams = async () => {
      setIsLoadingList(true);
      try {
        const data = await getAllExamMetadataAsync(true);
        if (mounted) {
          setExamList(data);
          if (data.length > 0) {
            setSelectedExam(data[0].id);
          }
        }
      } catch (error) {
        console.error("Lỗi tải đề thi:", error);
      } finally {
        if (mounted) setIsLoadingList(false);
      }
    };
    fetchExams();
    return () => { mounted = false; };
  }, []);

  const filteredExams = useMemo(() => {
    if (!examList?.length) return [];
    let r = examList;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(e =>
        e.title?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.id?.toLowerCase().includes(q),
      );
    }
    // Mặc định sắp xếp bài mới nhất lên trên
    return [...r].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [examList, searchQuery]);

  const count = filteredExams.length;

  const handleStart = useCallback(async () => {
    setIsStarting(true);
    analytics.track('exam_started', { examId: selectedExam });
    try { onStartExam?.(selectedExam); } finally { setIsStarting(false); }
  }, [selectedExam, onStartExam]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    analytics.track('search_used', { query: e.target.value });
  }, []);

  const handleSelectExam = useCallback((id) => {
    setSelectedExam(id);
    onExamHover?.(id);
  }, [onExamHover]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
  }, []);

  /* Style chuẩn Material Design cho Input */
  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm transition-all duration-200 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none placeholder:text-slate-400";

  const TEST_SECTIONS = [
    { label: 'Listening', desc: '20 câu · 4 phần', time: '30 phút' },
    { label: 'Reading',   desc: '40 câu · 4 phần', time: '60 phút' },
  ];

  const REQUIREMENTS = [
    'Môi trường yên tĩnh, tập trung',
    'Kết nối internet ổn định',
    'Tiến độ lưu tự động liên tục',
    'Không thể quay lại phần nghe đã làm',
  ];

  return (
    <div className="examsetup-root min-h-screen bg-slate-50 font-[family-name:var(--font-dm-sans,'DM_Sans',system-ui,sans-serif)] pb-20">

      {/* ── Header ── */}
      <header
        role="banner"
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm pt-[max(12px,env(safe-area-inset-top))]"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
                <svg width="12" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                  <path d="M5 0L10 2v5c0 2.5-2 4-5 5C2 11 0 9.5 0 7V2L5 0z" fill="currentColor" />
                </svg>
                Official Assessment
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight m-0">
                HUFLIT English Placement Test
              </h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Đánh giá năng lực ngoại ngữ theo chuẩn khung tham chiếu
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <nav aria-label="Exam steps">
              <StepIndicator currentMode="setup" />
            </nav>
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main role="main" className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          
          {/* ── Exam selection (Cột trái/Trên mobile) ── */}
          <section aria-label="Chọn đề thi" className="flex flex-col gap-6 w-full animate-[esFadeUp_.35s_.10s_cubic-bezier(.4,0,.2,1)_both]">
            
            {/* Box Tìm Kiếm */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <label htmlFor="exam-search" className="block text-sm font-semibold text-slate-800 mb-3">
                Tìm kiếm bài thi
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input
                  id="exam-search"
                  type="search"
                  autoComplete="off"
                  placeholder="Nhập tên bài kiểm tra, mã đề hoặc mô tả..."
                  value={searchQuery}
                  onChange={handleSearch}
                  aria-controls={listboxId}
                  className={`${inputClass} pl-12`}
                />
              </div>
            </div>

            {/* Danh sách đề thi */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <p className="text-sm font-semibold text-slate-900 m-0">
                  Kết quả: <span className="text-blue-600">{count}</span> đề thi
                </p>
                <p className="text-xs font-medium text-slate-500 m-0 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm hidden sm:block">
                  Sử dụng phím ↑ ↓ để chọn
                </p>
              </div>

              <div className="divide-y divide-slate-100 flex-1">
                {isLoadingList ? (
                  <SkeletonList />
                ) : filteredExams.length > 0 ? (
                  <ExamListBox
                    exams={filteredExams}
                    selectedExam={selectedExam}
                    onSelectExam={handleSelectExam}
                    listboxId={listboxId}
                  />
                ) : (
                  <EmptyState searchQuery={searchQuery} onClearFilters={clearFilters} />
                )}
              </div>
            </div>
          </section>

          {/* ── Aside: Chi tiết / Xác nhận (Cột phải/Dưới mobile) ── */}
          <aside
            role="complementary"
            aria-label="Thông tin bài kiểm tra"
            className="w-full lg:sticky lg:top-32 animate-[esFadeUp_.35s_.05s_cubic-bezier(.4,0,.2,1)_both]"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              
              {/* Cấu trúc bài thi */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                  Cấu trúc dự kiến
                </h2>
                <div className="space-y-4">
                  {TEST_SECTIONS.map((s, i) => (
                    <div key={s.label} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div>
                        <p className="text-sm font-semibold text-slate-800 m-0">{s.label}</p>
                        <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-700 bg-white px-2 py-1 rounded shadow-sm border border-slate-200">
                        {s.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lưu ý */}
              <div className="pt-6 border-t border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 mb-3">Lưu ý quan trọng</h2>
                <ul className="m-0 p-0 list-none space-y-3">
                  {REQUIREMENTS.map(item => (
                    <li key={item} className="flex gap-3 items-start">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                <button
                  onClick={handleStart}
                  disabled={isStarting || !selectedExam}
                  aria-busy={isStarting}
                  className={`
                    w-full py-3.5 px-6 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-200
                    focus:outline-none focus:ring-4 focus:ring-blue-600/30
                    ${isStarting || !selectedExam 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 active:translate-y-0'}
                  `}
                >
                  {isStarting ? (
                    <>
                      <span className="animate-spin w-5 h-5 border-2 border-white/40 border-t-white rounded-full" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Bắt đầu làm bài
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </>
                  )}
                </button>
                <p className="text-xs font-medium text-slate-400 text-center m-0">
                  Hệ thống tự động lưu trữ tiến độ
                </p>
              </div>
            </div>
          </aside>
          
        </div>
      </main>
    </div>
  );
});

ExamSetup.displayName = 'ExamSetup';
export default ExamSetup;
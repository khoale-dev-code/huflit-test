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
// Thay đổi import để dùng hàm async từ Firebase
import { getAllExamMetadataAsync } from '../../../../data/examData';

/* ─────────────────────────────────────────────────────────────
   Analytics (unchanged)
   ───────────────────────────────────────────────────────────── */
const analytics = {
  track: (event, props) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[analytics]', event, props);
    }
  },
};

/* ─────────────────────────────────────────────────────────────
   Class maps (replace useMemo diffStyle objects)
   ───────────────────────────────────────────────────────────── */
const DIFFICULTY_CLASSES = {
  beginner:     'text-green-700 bg-green-50 border border-green-200',
  intermediate: 'text-yellow-700 bg-yellow-50 border border-yellow-200',
  advanced:     'text-red-700   bg-red-50   border border-red-200',
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
  <div role="status" aria-label="Loading exams..." aria-busy="true" className="py-3">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="flex gap-3.5 items-start px-6 py-4 border-b border-slate-100">
        <div className="animate-pulse bg-slate-200 rounded-full w-4 h-4 shrink-0 mt-0.5" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="animate-pulse bg-slate-200 rounded h-3.5 w-[55%]" />
          <div className="animate-pulse bg-slate-200 rounded h-3 w-[80%]" />
          <div className="flex gap-1.5">
            <div className="animate-pulse bg-slate-200 rounded h-5 w-16" />
            <div className="animate-pulse bg-slate-200 rounded h-5 w-14" />
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
  <div role="status" className="py-12 px-6 text-center flex flex-col items-center gap-3">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="11" stroke="#CBD5E1" strokeWidth="2.5" />
      <path d="M27 27l7 7" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
    <p className="text-[15px] font-semibold text-slate-800 m-0">
      Không tìm thấy đề thi
    </p>
    <p className="text-[13px] text-slate-500 m-0 leading-relaxed">
      {searchQuery ? (
        <>Không có kết quả cho "<strong>{searchQuery}</strong>". Thử từ khóa khác.</>
      ) : (
        'Không có đề thi phù hợp với bộ lọc hiện tại.'
      )}
    </p>
    <button
      onClick={onClearFilters}
      className="mt-1 px-[18px] py-2 rounded-lg border-[1.5px] border-blue-600
                 bg-transparent text-blue-600 font-semibold text-[13px] cursor-pointer
                 hover:bg-blue-50 transition-colors
                 focus-visible:outline focus-visible:outline-[2.5px] focus-visible:outline-blue-600 focus-visible:outline-offset-2
                 focus:not-focus-visible:outline-none"
    >
      Xóa bộ lọc
    </button>
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
        'relative flex items-start gap-3.5 cursor-pointer',
        'px-[clamp(14px,3vw,24px)] py-[clamp(12px,2vw,18px)]',
        '[border-left-width:3px] [border-left-style:solid]',
        'transition-all duration-150 will-change-transform',
        'hover:translate-x-0.5',
        'outline-none',
        'focus-visible:outline focus-visible:outline-[2.5px] focus-visible:outline-blue-600 focus-visible:outline-offset-[-2px]',
        isSelected
          ? 'bg-blue-50 [border-left-color:#2563EB]'
          : 'bg-white [border-left-color:transparent] hover:bg-slate-50',
      ].join(' ')}
    >
      {/* Radio indicator */}
      <span
        aria-hidden="true"
        className={[
          'shrink-0 mt-0.5 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-150',
          isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white',
        ].join(' ')}
      >
        {isSelected && <span className="w-[7px] h-[7px] rounded-full bg-white" />}
      </span>

      <div className="flex-1 min-w-0">
        {/* Title row */}
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="text-[clamp(13px,2vw,15px)] font-semibold text-slate-900 m-0 truncate">
            {exam.title || `Exam ${exam.id}`}
          </h3>
          {exam.isNew && (
            <span className="text-[10px] font-bold tracking-[.05em] text-blue-700 bg-blue-100 px-[7px] py-[2px] rounded shrink-0">
              NEW
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 mb-2 m-0 truncate">
          {exam.description || 'Complete English proficiency assessment'}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[11px] px-[9px] py-[3px] rounded-[5px] bg-slate-50 border border-slate-200 text-slate-500">
            {exam.questions || 60} câu
          </span>
          <span className="text-[11px] px-[9px] py-[3px] rounded-[5px] bg-slate-50 border border-slate-200 text-slate-500">
            {exam.duration || 90} phút
          </span>
          {exam.difficulty && (
            <span className={`text-[11px] px-[9px] py-[3px] rounded-[5px] font-semibold ${DIFFICULTY_CLASSES[exam.difficulty] || 'bg-slate-50 border border-slate-200 text-slate-600'}`}>
              {DIFFICULTY_LABELS[exam.difficulty] || exam.difficulty}
            </span>
          )}
          {exam.attempts > 0 && (
            <span className="text-[11px] text-slate-400">
              {(exam.attempts || 0).toLocaleString()} lượt thi
            </span>
          )}
        </div>
      </div>

      {/* Selected checkmark */}
      {isSelected && (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="#2563EB" aria-hidden="true" className="shrink-0 mt-0.5">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
        </svg>
      )}
    </div>
  );
});
ExamListItem.displayName = 'ExamListItem';

/* ─────────────────────────────────────────────────────────────
   ExamListBox — virtualized listbox with keyboard nav
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
      className="outline-none overflow-y-auto
                 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400
                 focus-visible:outline focus-visible:outline-[2.5px] focus-visible:outline-blue-600 focus-visible:outline-offset-2"
      style={{ maxHeight: VISIBLE * ITEM_H }}
    >
      {/* Virtual scroll container — height must remain dynamic */}
      <div style={{ height: exams.length * ITEM_H, position: 'relative' }}>
        <div style={{ transform: `translateY(${startIdx * ITEM_H}px)` }}>
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

  // THÊM: Quản lý danh sách đề thi từ Firebase
  const [examList, setExamList] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);

  // Chọn mặc định đề thi đầu tiên nếu chưa có
  const [selectedExam, setSelectedExam] = useState('');
  
  const [isStarting,         setIsStarting]         = useState(false);
  const [searchQuery,        setSearchQuery]        = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy,             setSortBy]             = useState('newest');

  // Load danh sách đề thi khi render
  useEffect(() => {
    let mounted = true;
    const fetchExams = async () => {
      setIsLoadingList(true);
      try {
        const data = await getAllExamMetadataAsync(true);
        if (mounted) {
          setExamList(data);
          if (data.length > 0) {
            setSelectedExam(data[0].id); // Chọn tự động dòng đầu
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

  /* Filtered + sorted */
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
    if (selectedDifficulty !== 'all') r = r.filter(e => e.difficulty === selectedDifficulty);
    return [...r].sort((a, b) => {
      if (sortBy === 'popular')    return (b.attempts || 0) - (a.attempts || 0);
      if (sortBy === 'difficulty') return (a.difficultyScore || 0) - (b.difficultyScore || 0);
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }, [examList, searchQuery, selectedDifficulty, sortBy]);

  const total = examList?.length || 0;
  const count = filteredExams.length;

  /* Handlers */
  const handleStart = useCallback(async () => {
    setIsStarting(true);
    analytics.track('exam_started', { examId: selectedExam });
    try { onStartExam?.(selectedExam); } finally { setIsStarting(false); }
  }, [selectedExam, onStartExam]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    analytics.track('search_used', { query: e.target.value });
  }, []);

  const handleDifficulty = useCallback((e) => {
    setSelectedDifficulty(e.target.value);
    analytics.track('filter_used', { filter: 'difficulty', value: e.target.value });
  }, []);

  const handleSort = useCallback((e) => {
    setSortBy(e.target.value);
    analytics.track('filter_used', { filter: 'sort', value: e.target.value });
  }, []);

  const handleSelectExam = useCallback((id) => {
    setSelectedExam(id);
    onExamHover?.(id);
  }, [onExamHover]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedDifficulty('all');
    setSortBy('newest');
  }, []);

  /* ── Select styling shared ── */
  const selectClass = [
    'w-full px-3 py-2.5 rounded-lg',
    'border border-slate-200',
    'bg-slate-50 text-slate-900',
    'font-medium text-[13px]',
    'cursor-pointer appearance-none',
    'transition-colors duration-150',
    'focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none',
    "bg-[url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")] bg-no-repeat bg-[right_10px_center] bg-[length:16px]",
    'pr-8',
  ].join(' ');

  /* Test-structure rows */
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
    <div className="examsetup-root min-h-screen bg-white font-[family-name:var(--font-dm-sans,'DM_Sans',system-ui,sans-serif)]">

      {/* ── Header ── */}
      <header
        role="banner"
        className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm
                   pt-[max(12px,env(safe-area-inset-top))]"
      >
        <div className="max-w-[1200px] mx-auto px-[clamp(14px,4vw,32px)] py-[clamp(10px,2vw,20px)]">
          {/* Title row */}
          <div className="flex items-start gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[.06em] uppercase
                               text-indigo-600 bg-indigo-50 border border-indigo-200
                               px-[10px] py-[3px] rounded-md mb-2 animate-[esBadgePop_.4s_.25s_cubic-bezier(.4,0,.2,1)_both]">
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                  <path d="M5 0L10 2v5c0 2.5-2 4-5 5C2 11 0 9.5 0 7V2L5 0z" fill="#4338CA" />
                </svg>
                Official Assessment
              </span>

              <h1 className="text-[clamp(20px,4vw,32px)] font-semibold text-slate-900
                             tracking-tight leading-tight m-0">
                HUFLIT English Placement Test
              </h1>
              <p className="text-[clamp(12px,1.5vw,14px)] text-slate-700 mt-1 leading-relaxed">
                Find your level and unlock your English potential
              </p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="mt-[clamp(10px,2vw,20px)] pt-[clamp(10px,2vw,20px)] border-t border-slate-100">
            <nav aria-label="Exam steps">
              <StepIndicator currentMode="setup" />
            </nav>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main
        role="main"
        className="max-w-[1200px] mx-auto px-[clamp(14px,4vw,32px)] py-[clamp(20px,4vw,48px)]"
      >
        <div className="grid gap-[clamp(16px,3vw,32px)] lg:grid-cols-[320px_1fr] items-start">

          {/* ── Aside ── */}
          <aside
            role="complementary"
            aria-label="Test information"
            className="flex flex-col gap-6 animate-[esFadeUp_.35s_.05s_cubic-bezier(.4,0,.2,1)_both]"
          >
            <div className="sticky top-24 bg-white border border-slate-200 rounded-[14px]
                            p-[clamp(18px,3vw,28px)] shadow-sm">

              {/* Test structure */}
              <p className="text-[10px] font-bold tracking-[.1em] uppercase text-slate-400 mb-3.5">
                Cấu trúc đề thi
              </p>

              {TEST_SECTIONS.map((s, i) => (
                <div key={s.label}>
                  {i > 0 && <div className="h-px bg-slate-100 my-3.5" />}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 m-0">{s.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                    </div>
                    <span className="text-[13px] text-slate-400 font-medium">{s.time}</span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="mt-5 pt-5 border-t border-slate-100">
                <p className="text-[10px] font-bold tracking-[.1em] uppercase text-slate-400 mb-1.5">
                  Tổng thời gian
                </p>
                <p className="m-0">
                  <span className="text-[36px] font-light text-slate-900 tracking-tight">90</span>
                  <span className="text-[13px] text-slate-400 ml-1.5">phút</span>
                </p>
              </div>

              {/* Requirements */}
              <div className="mt-5 pt-5 border-t border-slate-100">
                <p className="text-[10px] font-bold tracking-[.1em] uppercase text-slate-400 mb-2.5">
                  Lưu ý
                </p>
                <ul className="m-0 p-0 list-none flex flex-col gap-2">
                  {REQUIREMENTS.map(item => (
                    <li key={item} className="flex gap-2 items-start">
                      <span className="text-blue-600 mt-0.5 shrink-0" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="6" fill="#DBEAFE" />
                          <path d="M3.5 6.5l2 2 3-4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[13px] text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social proof */}
              <div className="mt-5 pt-5 border-t border-slate-100 text-center">
                <p className="text-[28px] font-light text-slate-900 m-0">4.9</p>
                <p className="text-xs text-slate-500 mt-0.5">500K+ học viên</p>
              </div>
            </div>
          </aside>

          {/* ── Exam selection ── */}
          <section
            aria-label="Chọn đề thi"
            className="flex flex-col gap-5 animate-[esFadeUp_.35s_.10s_cubic-bezier(.4,0,.2,1)_both]"
          >
            {/* Search & filters */}
            <div className="flex flex-col gap-3 animate-[esFadeUp_.35s_.15s_cubic-bezier(.4,0,.2,1)_both]">
              {/* Search input */}
              <div>
                <label
                  htmlFor="exam-search"
                  className="block text-[10px] font-bold tracking-[.1em] uppercase text-slate-500 mb-1.5"
                >
                  Tìm kiếm
                </label>
                <input
                  id="exam-search"
                  type="search"
                  autoComplete="off"
                  placeholder="Tìm theo tên hoặc mã đề…"
                  value={searchQuery}
                  onChange={handleSearch}
                  aria-controls={listboxId}
                  aria-label="Tìm kiếm đề thi"
                  className="w-full px-3.5 py-2.5 rounded-lg
                             border border-slate-200
                             bg-slate-50 text-slate-900
                             text-sm placeholder:text-slate-400
                             transition-colors duration-150
                             focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none
                             focus-visible:border-blue-600"
                />
              </div>

              {/* Filters row */}
              <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
                {/* Difficulty */}
                <div>
                  <label htmlFor="difficulty" className="block text-[10px] font-bold tracking-[.1em] uppercase text-slate-500 mb-1.5">
                    Độ khó
                  </label>
                  <select id="difficulty" value={selectedDifficulty} onChange={handleDifficulty} className={selectClass}>
                    <option value="all">Tất cả</option>
                    <option value="beginner">Cơ bản</option>
                    <option value="intermediate">Trung cấp</option>
                    <option value="advanced">Nâng cao</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label htmlFor="sort" className="block text-[10px] font-bold tracking-[.1em] uppercase text-slate-500 mb-1.5">
                    Sắp xếp
                  </label>
                  <select id="sort" value={sortBy} onChange={handleSort} className={selectClass}>
                    <option value="newest">Mới nhất</option>
                    <option value="popular">Phổ biến nhất</option>
                    <option value="difficulty">Theo độ khó</option>
                  </select>
                </div>

                {/* Result count */}
                <div>
                  <p className="text-[10px] font-bold tracking-[.1em] uppercase text-slate-500 mb-1.5">
                    Kết quả
                  </p>
                  <div className="px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900">
                    {count !== total ? (
                      <><span className="text-blue-600">{count}</span> / {total}</>
                    ) : total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Exam listbox card */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm
                            animate-[esFadeUp_.35s_.20s_cubic-bezier(.4,0,.2,1)_both]">
              {/* List header */}
              <div className="flex justify-between items-center
                              px-[clamp(14px,3vw,24px)] py-[clamp(10px,2vw,16px)]
                              border-b border-slate-100 bg-slate-50">
                <p className="text-[13px] font-semibold text-slate-900 m-0">Chọn đề thi</p>
                <p className="text-xs text-slate-400 m-0">↑ ↓ để điều hướng</p>
              </div>

              {/* Content */}
              <div className="divide-y divide-slate-100">
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

            {/* Start CTA */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleStart}
                disabled={isStarting || !selectedExam}
                aria-busy={isStarting}
                aria-label={isStarting ? 'Đang bắt đầu...' : `Bắt đầu: ${selectedExam}`}
                className={[
                  'w-full py-[clamp(13px,2vw,16px)] px-6 rounded-[10px] border-none',
                  'font-semibold text-[clamp(14px,2vw,16px)]',
                  'flex items-center justify-center gap-2.5',
                  'transition-all duration-150',
                  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-blue-600 focus-visible:outline-offset-[3px]',
                  isStarting || !selectedExam
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-br from-blue-700 to-blue-600 text-white cursor-pointer hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(37,99,235,.35)] active:translate-y-0',
                ].join(' ')}
              >
                {isStarting ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block" />
                    Đang bắt đầu…
                  </>
                ) : (
                  <>
                    Bắt đầu thi
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-xs text-slate-400 text-center m-0">
                Tiến độ lưu tự động · Không cần lo mất dữ liệu
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
});

ExamSetup.displayName = 'ExamSetup';
export default ExamSetup;
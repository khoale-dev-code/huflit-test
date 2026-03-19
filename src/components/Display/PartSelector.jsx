import React, { useMemo, useState, memo, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown, BookOpen, Headphones, Lock, PenTool, Mic, LayoutGrid, Search, FileText, Lightbulb
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { loadExamData, getAllExamMetadataAsync } from '../../data/examData';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';

// --- Config ---
const SKILL_TABS = [
  { id: 'listening', icon: Headphones, label: 'Nghe' },
  { id: 'reading', icon: BookOpen, label: 'Đọc' },
  { id: 'writing', icon: PenTool, label: 'Viết' },
  { id: 'speaking', icon: Mic, label: 'Nói' },
];

const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'toeic', label: 'TOEIC' },
  { id: 'ielts', label: 'IELTS' },
  { id: 'huflit', label: 'HUFLIT' },
];

const partLabel = (part) => {
  if (part.title) return part.title;
  return part.id?.toString().replace(/part(\d+)/i, 'Phần $1') || 'Phần thi';
};

/* ── Hook: kéo-chuột để scroll ngang (desktop) ── */
function useDragScroll() {
  const ref = useRef(null);
  const state = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const onMouseDown = useCallback(e => {
    const el = ref.current;
    if (!el) return;
    state.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, moved: false };
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
  }, []);

  const onMouseMove = useCallback(e => {
    const s = state.current;
    if (!s.isDown) return;
    const el = ref.current;
    const dx = e.pageX - el.offsetLeft - s.startX;
    if (Math.abs(dx) > 3) s.moved = true;
    el.scrollLeft = s.scrollLeft - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    state.current.isDown = false;
    el.style.cursor = 'grab';
    el.style.userSelect = '';
  }, []);

  const onClick = useCallback(e => {
    if (state.current.moved) { e.stopPropagation(); state.current.moved = false; }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return { ref, onMouseDown, onClick };
}

/* ── ExamDropdown (Gamified) ── */
const ExamDropdown = memo(({ isOpen, onClose, examList, selectedExam, onSelect, isUserLoggedIn }) => {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExams = useMemo(() => examList.filter(e => {
    const matchCat = selectedCat === 'all' || (e.category || 'other') === selectedCat;
    const matchSearch = (e.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  }), [examList, selectedCat, searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <Motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-[calc(100%+12px)] left-0 w-full md:w-[420px] z-50 bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Search & Tabs Header */}
            <div className="p-4 border-b-2 border-slate-100 space-y-4 bg-slate-50">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} strokeWidth={3} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Tìm đề thi..."
                  // Duolingo style input: thick border, distinct focus state
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 border-b-4 rounded-2xl text-[15px] font-nunito font-extrabold text-slate-700 focus:border-[#1CB0F6] focus:border-b-4 focus:ring-0 outline-none placeholder:text-slate-400 transition-colors"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                {CATEGORIES.map(c => {
                  const active = selectedCat === c.id;
                  return (
                    <button 
                      key={c.id} 
                      onClick={() => setSelectedCat(c.id)}
                      className={`shrink-0 px-5 py-2.5 rounded-2xl text-[14px] font-nunito font-extrabold transition-all outline-none border-2 active:border-b-2 active:translate-y-[2px] ${
                        active
                          ? 'bg-[#1CB0F6] text-white border-[#1899D6] border-b-4'
                          : 'bg-white text-slate-500 border-slate-200 border-b-4 hover:bg-slate-100'
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exam List */}
            <div className="max-h-[350px] overflow-y-auto p-4 space-y-3 custom-scrollbar bg-white">
              {filteredExams.length === 0 ? (
                <div className="py-10 flex flex-col items-center justify-center text-slate-400">
                  <Search size={40} strokeWidth={2} className="mb-3 opacity-30 text-slate-400" />
                  <p className="text-[16px] font-nunito font-extrabold">Không tìm thấy đề thi</p>
                </div>
              ) : filteredExams.map((exam, idx) => {
                const isLocked = !isUserLoggedIn && idx !== 0;
                const isSelected = exam.id === selectedExam;
                return (
                  <button 
                    key={exam.id} 
                    disabled={isLocked}
                    onClick={() => { onSelect(exam.id); onClose(); }}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-left outline-none border-2 active:translate-y-[2px] active:border-b-2 ${
                      isSelected 
                        ? 'bg-[#DDF4FF] border-[#1CB0F6] border-b-4' 
                        : 'bg-white border-slate-200 border-b-4 hover:bg-slate-50'
                    } ${isLocked ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-b-4 transition-colors ${
                      isSelected ? 'bg-[#1CB0F6] border-[#1899D6] text-white' : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}>
                      {isLocked ? <Lock size={22} strokeWidth={3} /> : <FileText size={22} strokeWidth={3} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[11px] font-nunito font-black uppercase tracking-widest mb-1 ${isSelected ? 'text-[#1899D6]' : 'text-slate-400'}`}>
                        {exam.category || 'Bài tập'}
                      </p>
                      <p className={`text-[16px] font-nunito font-extrabold truncate ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                        {exam.title}
                      </p>
                    </div>
                    {isLocked && <span className="px-3 py-1.5 bg-[#FFC800] text-white text-[11px] font-nunito font-black uppercase rounded-xl shrink-0 border-b-2 border-[#E5B400]">VIP</span>}
                  </button>
                );
              })}
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
ExamDropdown.displayName = 'ExamDropdown';

/* ── Main PartSelector ── */
const PartSelector = memo(({ selectedExam, onExamChange, testType, onTestTypeChange, selectedPart, onPartChange }) => {
  const { user } = useUnifiedAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [examData, setExamData] = useState(null);
  const [examList, setExamList] = useState([]);
  const syncRef = useRef({ lastType: null, lastPart: null });

  useEffect(() => { getAllExamMetadataAsync().then(setExamList); }, []);
  useEffect(() => { if (selectedExam) loadExamData(selectedExam).then(setExamData); }, [selectedExam]);

  const allParts = useMemo(() => {
    if (!examData?.parts) return [];
    let arr = Array.isArray(examData.parts)
      ? examData.parts
      : Object.entries(examData.parts).map(([key, val]) => ({
          ...val, id: key,
          type: val.type || (parseInt(key.replace(/\D/g, '')) <= 4 ? 'listening' : 'reading')
        }));
    return arr.map(p => ({ ...p, id: String(p.id) }));
  }, [examData]);

  const availableSkills = useMemo(() => {
    const s = new Set(allParts.map(p => p.type).filter(Boolean));
    return SKILL_TABS.filter(t => s.has(t.id));
  }, [allParts]);

  const filteredParts = useMemo(() => allParts.filter(p => p.type === testType), [allParts, testType]);

  useEffect(() => {
    if (availableSkills.length > 0 && !availableSkills.some(s => s.id === testType)) {
      const first = availableSkills[0].id;
      if (syncRef.current.lastType !== first) { syncRef.current.lastType = first; onTestTypeChange(first); }
    }
  }, [availableSkills, testType, onTestTypeChange]);

  useEffect(() => {
    if (filteredParts.length > 0 && selectedPart !== undefined) {
      const safe = String(selectedPart);
      const valid = filteredParts.some(p => p.id === safe);
      if (!valid) {
        const first = filteredParts[0].id;
        if (syncRef.current.lastPart !== first) { syncRef.current.lastPart = first; onPartChange({ target: { value: first } }); }
      } else { syncRef.current.lastPart = safe; }
    }
  }, [filteredParts, selectedPart, onPartChange]);

  const currentExam = examList.find(e => e.id === selectedExam);
  const currentPartData = filteredParts.find(p => p.id === String(selectedPart));

  const dragScroll = useDragScroll();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = dragScroll.ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, [dragScroll.ref]);

  useEffect(() => {
    const el = dragScroll.ref.current;
    if (!el) return;
    const t = setTimeout(checkScroll, 50);
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => { clearTimeout(t); el.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll); };
  }, [checkScroll, filteredParts]);

  const nudge = (dir) => dragScroll.ref.current?.scrollBy({ left: dir * 180, behavior: 'smooth' });

  return (
    // Base container with very light gray background often used in Duolingo
    <div className="w-full max-w-5xl mx-auto space-y-6 px-4 py-4 selection:bg-[#1CB0F6] selection:text-white">

      {/* Row 1: Exam picker + Skill tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch relative z-30">
        
        {/* Nút Chọn Đề (Gamified Big Button) */}
        <div className="relative flex-1">
          <button
            onClick={() => setDropdownOpen(v => !v)}
            className={`w-full bg-white transition-all outline-none rounded-2xl px-5 py-4 flex items-center gap-4 border-2
              ${dropdownOpen 
                ? 'border-[#1CB0F6] border-b-2 translate-y-[2px] shadow-sm' 
                : 'border-slate-200 border-b-[6px] hover:bg-slate-50 active:border-b-2 active:translate-y-[4px]'}
            `}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-b-4 transition-colors
              ${dropdownOpen ? 'bg-[#1CB0F6] border-[#1899D6] text-white' : 'bg-white border-slate-200 text-[#1CB0F6]'}
            `}>
              <LayoutGrid size={24} strokeWidth={3} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[12px] font-nunito font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Đề thi hiện tại</p>
              <p className="text-[18px] font-nunito font-extrabold text-slate-700 truncate leading-tight">{currentExam?.title || 'Đang tải...'}</p>
            </div>
            <ChevronDown size={24} strokeWidth={3} className={`text-slate-400 transition-transform duration-300 shrink-0 ${dropdownOpen ? 'rotate-180 text-[#1CB0F6]' : ''}`} />
          </button>
          
          <ExamDropdown
            isOpen={dropdownOpen}
            onClose={() => setDropdownOpen(false)}
            examList={examList}
            selectedExam={selectedExam}
            onSelect={id => onExamChange({ target: { value: id } })}
            isUserLoggedIn={!!user}
          />
        </div>

        {/* Thanh Kỹ Năng (Pill Switcher - Gamified) */}
        <div className="bg-white p-2 rounded-2xl flex gap-2 border-2 border-slate-200 border-b-[6px] shrink-0 overflow-x-auto custom-scrollbar">
          {availableSkills.map(skill => {
            const active = testType === skill.id;
            return (
              <button 
                key={skill.id} 
                onClick={() => onTestTypeChange(skill.id)}
                className={`relative shrink-0 px-6 py-3 flex items-center justify-center rounded-xl transition-all gap-2 outline-none border-2
                  ${active
                    ? 'bg-[#DDF4FF] text-[#1CB0F6] border-[#1CB0F6] border-b-4'
                    : 'bg-white border-transparent text-slate-500 hover:bg-slate-100 border-b-4 active:border-b-2 active:translate-y-[2px]'}
                `}
              >
                <skill.icon size={20} strokeWidth={active ? 3 : 2.5} />
                <span className="text-[15px] font-nunito font-extrabold">{skill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Part chips (Gamified 3D Blocks) */}
      <div className="flex items-center gap-2 relative z-20">
        
        {/* Mũi tên trái */}
        <AnimatePresence>
          {canScrollLeft && (
            <Motion.button
              initial={{ opacity: 0, scale: 0.5, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, x: 10 }}
              onClick={() => nudge(-1)}
              className="shrink-0 w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-200 border-b-4 rounded-full text-slate-400 hover:text-[#1CB0F6] active:border-b-2 active:translate-y-[2px] transition-all outline-none"
            >
              <ChevronDown size={24} strokeWidth={3} className="-rotate-90" />
            </Motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable chips */}
        <div
          ref={dragScroll.ref}
          onMouseDown={dragScroll.onMouseDown}
          onClick={dragScroll.onClick}
          className="flex items-center gap-3 overflow-x-auto py-2 px-1 custom-scrollbar flex-1 select-none scroll-smooth"
          style={{ cursor: 'grab' }}
        >
          {filteredParts.map(part => {
            const active = String(selectedPart) === part.id;
            // Duolingo uses green for success/active states often, but primary blue is also great. Let's stick to your Blue.
            return (
              <button 
                key={part.id} 
                onClick={() => onPartChange({ target: { value: part.id } })}
                className={`shrink-0 flex items-center gap-3 px-6 h-14 rounded-2xl text-[16px] font-nunito font-extrabold transition-all border-2 outline-none
                  ${active
                    ? 'bg-[#1CB0F6] border-[#1899D6] border-b-4 text-white translate-y-[2px] active:border-b-0 active:translate-y-[6px]'
                    : 'bg-white border-slate-200 border-b-[6px] text-slate-500 hover:bg-slate-50 active:border-b-2 active:translate-y-[4px]'}
                `}
              >
                <span className="whitespace-nowrap">{partLabel(part)}</span>
                <span className={`text-[13px] font-black px-2.5 py-1 rounded-xl border-b-2 ${active ? 'bg-white/20 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                  {part.questions?.length || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mũi tên phải */}
        <AnimatePresence>
          {canScrollRight && (
            <Motion.button
              initial={{ opacity: 0, scale: 0.5, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, x: -10 }}
              onClick={() => nudge(1)}
              className="shrink-0 w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-200 border-b-4 rounded-full text-slate-400 hover:text-[#1CB0F6] active:border-b-2 active:translate-y-[2px] transition-all outline-none"
            >
              <ChevronDown size={24} strokeWidth={3} className="rotate-90" />
            </Motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Hướng dẫn (Mascot / Info banner - Gamified Card) */}
      <AnimatePresence mode="wait">
        {currentPartData && (
          <Motion.div
            key={currentPartData.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            // Duolingo Warning/Tip color palette
            className="flex items-start gap-4 p-5 md:p-6 bg-white border-2 border-slate-200 border-b-[6px] rounded-3xl relative z-10"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FFC800] border-b-4 border-[#E5B400] flex items-center justify-center shrink-0 text-white shadow-sm mt-1">
              <Lightbulb size={28} strokeWidth={3} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] md:text-[14px] font-nunito font-black uppercase tracking-widest text-[#FFC800] mb-1">
                Mẹo làm bài • {partLabel(currentPartData)}
              </p>
              <p className="text-[16px] md:text-[17px] font-nunito font-bold text-slate-600 leading-relaxed">
                {currentPartData.description || currentPartData.instruction || 'Hãy đọc kỹ câu hỏi và suy nghĩ thật kỹ trước khi chốt đáp án nhé!'}
              </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
});

export default PartSelector;
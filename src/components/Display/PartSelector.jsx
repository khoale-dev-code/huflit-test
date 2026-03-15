import React, { useMemo, useState, memo, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown, BookOpen, Headphones, Lock, PenTool, Mic, LayoutGrid, Search, FileText, Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-[calc(100%+8px)] left-0 w-full md:w-[420px] z-50 bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.12)] border-2 border-slate-200 border-b-[6px] overflow-hidden flex flex-col"
          >
            {/* Search & Tabs Header */}
            <div className="p-4 border-b-2 border-slate-100 space-y-3 bg-slate-50/50">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={2.5} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Tìm đề thi..."
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-[16px] text-[14px] font-nunito font-bold text-slate-800 focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none placeholder:text-slate-400 transition-all"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                {CATEGORIES.map(c => {
                  const active = selectedCat === c.id;
                  return (
                    <button 
                      key={c.id} 
                      onClick={() => setSelectedCat(c.id)}
                      className={`shrink-0 px-4 py-2 rounded-[14px] text-[13px] font-quick font-bold transition-all border-2 outline-none ${
                        active
                          ? 'bg-[#1CB0F6] text-white border-[#1899D6] border-b-[4px] translate-y-[-2px]'
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 active:translate-y-0 active:border-b-2'
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exam List */}
            <div className="max-h-[320px] overflow-y-auto p-3 space-y-2 custom-scrollbar bg-white">
              {filteredExams.length === 0 ? (
                <div className="py-8 flex flex-col items-center justify-center text-slate-400">
                  <Search size={32} strokeWidth={1.5} className="mb-2 opacity-50" />
                  <p className="text-[14px] font-quick font-bold">Không tìm thấy đề thi</p>
                </div>
              ) : filteredExams.map((exam, idx) => {
                const isLocked = !isUserLoggedIn && idx !== 0;
                const isSelected = exam.id === selectedExam;
                return (
                  <button 
                    key={exam.id} 
                    disabled={isLocked}
                    onClick={() => { onSelect(exam.id); onClose(); }}
                    className={`w-full flex items-center gap-3 md:gap-4 px-4 py-3.5 rounded-[20px] transition-all text-left outline-none border-2 ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-300 border-b-[4px]' 
                        : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0'
                    } ${isLocked ? 'opacity-60 cursor-not-allowed grayscale' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 border-b-[3px] shadow-sm ${
                      isSelected ? 'bg-[#1CB0F6] border-[#1899D6] text-white' : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}>
                      {isLocked ? <Lock size={18} strokeWidth={2.5} /> : <FileText size={18} strokeWidth={2.5} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] font-quick font-black uppercase tracking-widest mb-0.5 ${isSelected ? 'text-blue-500' : 'text-slate-400'}`}>
                        {exam.category || 'Bài tập'}
                      </p>
                      <p className={`text-[14px] font-nunito font-bold truncate ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                        {exam.title}
                      </p>
                    </div>
                    {isLocked && <span className="px-2.5 py-1 bg-[#FFC800] text-white text-[10px] font-quick font-black rounded-lg shrink-0 shadow-sm border-b-2 border-[#E5B400]">VIP</span>}
                  </button>
                );
              })}
            </div>
          </motion.div>
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

  const nudge = (dir) => dragScroll.ref.current?.scrollBy({ left: dir * 160, behavior: 'smooth' });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 px-4 font-sans selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>

      {/* Row 1: Exam picker + Skill tabs */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch relative z-30">
        
        {/* Nút Chọn Đề (Gamified Big Button) */}
        <div className="relative flex-1">
          <button
            onClick={() => setDropdownOpen(v => !v)}
            className={`w-full bg-white border-2 transition-all outline-none rounded-[20px] px-4 py-3 flex items-center gap-3 md:gap-4
              ${dropdownOpen 
                ? 'border-blue-400 border-b-2 translate-y-[2px] bg-blue-50/50 shadow-inner' 
                : 'border-slate-200 border-b-[6px] hover:border-slate-300 hover:-translate-y-0.5 active:border-b-2 active:translate-y-[4px] shadow-sm'}
            `}
          >
            <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border-b-[3px] transition-colors
              ${dropdownOpen ? 'bg-blue-500 border-blue-600 text-white' : 'bg-[#1CB0F6] border-[#1899D6] text-white'}
            `}>
              <LayoutGrid size={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[11px] font-quick font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Đề thi hiện tại</p>
              <p className="text-[15px] font-nunito font-bold text-slate-800 truncate leading-tight">{currentExam?.title || 'Đang tải...'}</p>
            </div>
            <ChevronDown size={20} strokeWidth={3} className={`text-slate-400 transition-transform duration-300 shrink-0 ${dropdownOpen ? 'rotate-180 text-[#1CB0F6]' : ''}`} />
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

        {/* Thanh Kỹ Năng (Pill Switcher) */}
        <div className="bg-slate-100 p-1.5 rounded-[20px] flex gap-1 sm:w-auto border-2 border-slate-200/50">
          {availableSkills.map(skill => {
            const active = testType === skill.id;
            return (
              <button 
                key={skill.id} 
                onClick={() => onTestTypeChange(skill.id)}
                className={`relative flex-1 sm:px-5 flex items-center justify-center rounded-[14px] transition-all gap-2 outline-none border-2
                  ${active
                    ? 'bg-white text-[#1CB0F6] border-slate-200 border-b-[4px] shadow-sm translate-y-[-1px]'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 active:scale-95'}
                `}
              >
                <skill.icon size={18} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[13px] font-quick font-bold">{skill.label}</span>
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
            <motion.button
              initial={{ opacity: 0, scale: 0.5, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, x: 10 }}
              onClick={() => nudge(-1)}
              className="shrink-0 w-10 h-10 flex items-center justify-center bg-white border-2 border-slate-200 border-b-[4px] rounded-full shadow-sm text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 active:border-b-2 active:translate-y-[2px] transition-all outline-none"
            >
              <ChevronDown size={18} strokeWidth={3} className="-rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable chips */}
        <div
          ref={dragScroll.ref}
          onMouseDown={dragScroll.onMouseDown}
          onClick={dragScroll.onClick}
          className="flex items-center gap-3 overflow-x-auto py-2 custom-scrollbar flex-1 select-none scroll-smooth"
          style={{ cursor: 'grab' }}
        >
          {filteredParts.map(part => {
            const active = String(selectedPart) === part.id;
            return (
              <button 
                key={part.id} 
                onClick={() => onPartChange({ target: { value: part.id } })}
                className={`shrink-0 flex items-center gap-2.5 px-5 h-11 md:h-12 rounded-[16px] text-[14px] font-quick font-bold transition-all border-2 outline-none
                  ${active
                    ? 'bg-[#1CB0F6] border-[#1899D6] border-b-[4px] text-white shadow-[0_4px_10px_rgba(28,176,246,0.3)] translate-y-[-2px]'
                    : 'bg-white border-slate-200 border-b-[4px] text-slate-500 hover:border-slate-300 hover:bg-slate-50 active:border-b-2 active:translate-y-[2px]'}
                `}
              >
                <span className="whitespace-nowrap">{partLabel(part)}</span>
                <span className={`text-[12px] font-black px-2 py-0.5 rounded-[8px] border-b-2 ${active ? 'bg-white/20 border-black/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                  {part.questions?.length || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mũi tên phải */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, x: -10 }}
              onClick={() => nudge(1)}
              className="shrink-0 w-10 h-10 flex items-center justify-center bg-white border-2 border-slate-200 border-b-[4px] rounded-full shadow-sm text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 active:border-b-2 active:translate-y-[2px] transition-all outline-none"
            >
              <ChevronDown size={18} strokeWidth={3} className="rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Hướng dẫn (Info banner - Gamified Card) */}
      <AnimatePresence mode="wait">
        {currentPartData && (
          <motion.div
            key={currentPartData.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-[#FFC800]/10 border-2 border-[#FFC800]/40 border-b-[4px] rounded-[24px] relative z-10"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] bg-[#FFC800] border-b-[3px] border-[#E5B400] flex items-center justify-center shrink-0 text-white shadow-sm mt-0.5">
              <Lightbulb size={22} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] md:text-[12px] font-quick font-black uppercase tracking-widest text-[#E58700] mb-0.5">
                {partLabel(currentPartData)}
              </p>
              <p className="text-[14px] md:text-[15px] font-nunito font-bold text-amber-900/80 leading-relaxed">
                {currentPartData.description || currentPartData.instruction || 'Hãy đọc kỹ câu hỏi và suy nghĩ thật kỹ trước khi chốt đáp án nhé!'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
});

export default PartSelector;
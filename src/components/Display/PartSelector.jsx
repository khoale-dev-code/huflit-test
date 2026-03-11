import React, { useMemo, useState, memo, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown, BookOpen, Headphones, Info, Lock, PenTool, Mic, LayoutGrid, Search, FileText
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

  // Chặn click nếu vừa kéo để không trigger button con
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

/* ── ExamDropdown ── */
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
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[calc(100%+6px)] left-0 w-full md:w-[420px] z-50 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-slate-200 overflow-hidden flex flex-col"
          >
            <div className="p-3 border-b border-slate-100 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Tìm đề thi..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none placeholder:text-slate-400 transition-all"
                />
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => setSelectedCat(c.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                      selectedCat === c.id
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}>{c.label}</button>
                ))}
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 space-y-0.5">
              {filteredExams.length === 0 ? (
                <p className="p-6 text-center text-[13px] text-slate-400 font-semibold">Không tìm thấy đề thi</p>
              ) : filteredExams.map((exam, idx) => {
                const isLocked = !isUserLoggedIn && idx !== 0;
                const isSelected = exam.id === selectedExam;
                return (
                  <button key={exam.id} disabled={isLocked}
                    onClick={() => { onSelect(exam.id); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                      isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                    } ${isLocked ? 'opacity-50' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isLocked ? <Lock size={14} /> : <FileText size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                        {exam.category || 'Bài tập'}
                      </p>
                      <p className="text-[13px] font-bold truncate">{exam.title}</p>
                    </div>
                    {isLocked && <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] font-bold rounded-md shrink-0">VIP</span>}
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

/* ── Main ── */
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

  // Drag-scroll + arrow visibility
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
    <div className="w-full max-w-5xl mx-auto space-y-3 px-3 sm:px-4" style={{ fontFamily: '"DM Sans", "Nunito", "Segoe UI", sans-serif' }}>

      {/* Row 1: Exam picker + Skill tabs */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
        <div className="relative flex-1">
          <button
            onClick={() => setDropdownOpen(v => !v)}
            className="w-full h-12 bg-white border border-slate-200 rounded-xl px-3 flex items-center gap-3 hover:border-blue-400 hover:bg-blue-50/40 transition-all active:scale-[0.98] shadow-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <LayoutGrid size={16} strokeWidth={2.5} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">Đề thi</p>
              <p className="text-[13px] font-bold text-slate-800 truncate leading-tight">{currentExam?.title || '...'}</p>
            </div>
            <ChevronDown size={16} strokeWidth={2.5} className={`text-slate-400 transition-transform duration-200 shrink-0 ${dropdownOpen ? 'rotate-180 text-blue-500' : ''}`} />
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

        <div className="bg-slate-100 p-1 rounded-xl flex gap-1 sm:w-auto">
          {availableSkills.map(skill => {
            const active = testType === skill.id;
            return (
              <button key={skill.id} onClick={() => onTestTypeChange(skill.id)}
                className={`relative flex-1 flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition-all gap-0.5 ${
                  active
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
                }`}
              >
                <skill.icon size={16} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[11px] font-bold leading-none">{skill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Part chips — drag + arrow scroll */}
      <div className="flex items-center gap-1.5">

        {/* Mũi tên trái */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
              onClick={() => nudge(-1)}
              className="shrink-0 w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm text-slate-500 hover:text-blue-500 hover:border-blue-300 transition-all"
            >
              <ChevronDown size={13} strokeWidth={2.5} className="-rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable chips */}
        <div
          ref={dragScroll.ref}
          onMouseDown={dragScroll.onMouseDown}
          onClick={dragScroll.onClick}
          className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-1 select-none"
          style={{ cursor: 'grab' }}
        >
          {filteredParts.map(part => {
            const active = String(selectedPart) === part.id;
            return (
              <button key={part.id} onClick={() => onPartChange({ target: { value: part.id } })}
                className={`shrink-0 flex items-center gap-2 px-4 h-9 rounded-lg text-[13px] font-bold transition-all border outline-none active:scale-95 ${
                  active
                    ? 'bg-blue-500 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <span className="whitespace-nowrap">{partLabel(part)}</span>
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
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
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
              onClick={() => nudge(1)}
              className="shrink-0 w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm text-slate-500 hover:text-blue-500 hover:border-blue-300 transition-all"
            >
              <ChevronDown size={13} strokeWidth={2.5} className="rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Info banner */}
      <AnimatePresence mode="wait">
        {currentPartData && (
          <motion.div
            key={currentPartData.id}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="flex items-start gap-3 p-3.5 bg-blue-50 border border-blue-100 rounded-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0 text-white mt-0.5">
              <Info size={15} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-500 mb-0.5">{partLabel(currentPartData)}</p>
              <p className="text-[13px] font-semibold text-slate-600 leading-relaxed">
                {currentPartData.description || currentPartData.instruction || 'Hãy đọc kỹ câu hỏi và chọn đáp án chính xác nhất!'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default PartSelector;
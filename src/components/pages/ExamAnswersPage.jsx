/**
 * ExamAnswersPage — FINAL
 * Fix: q1→1 (parseQuestionNum), layout rộng hơn cho desktop, card to hơn
 * Thay file cũ bằng file này: copy vào src/components/Display/ExamAnswersPage.jsx
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { loadExamData, getAllExamMetadataAsync } from '../../data/examData';
import {
  BookOpen, Search, ChevronDown, CheckCircle2,
  Sparkles, Filter, LayoutGrid, Target, Zap,
  Info, XCircle, Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Design tokens ───────────────────────────────────────────── */
const C = {
  blue:   '#1CB0F6', blueDark:   '#0d8ecf', blueBg:   '#EAF6FE', blueBorder:   '#BAE3FB',
  green:  '#58CC02', greenDark:  '#46A302', greenBg:  '#F0FAE8', greenBorder:  '#b4e893',
  orange: '#FF9600', orangeDark: '#cc7a00', orangeBg: '#FFF8EA', orangeBorder: '#FFD8A8',
  purple: '#CE82FF', purpleDark: '#B975E5', purpleBg: '#F8EEFF', purpleBorder: '#ddb8ff',
  red:    '#FF4B4B', redBg:      '#FFF0F0', redBorder:'#ffc1c1',
  slate:  '#F4F7FA', n200: '#e2e8f0', n400: '#94a3b8', n600: '#475569', n800: '#1e293b',
};

/* ─── FIX: strip "q"/"Q"/chữ prefix khỏi id ──────────────────── */
// q1 → "1", Q12 → "12", part3 → "3", 5 → "5"
const parseQuestionNum = (id) => {
  if (id == null) return '?';
  const stripped = String(id).replace(/^[a-zA-Z]+/, '');
  return stripped || String(id);
};

/* ─── Part color palettes (vòng theo số part) ─────────────────── */
const PALETTES = [
  { bg: '#EAF6FE', border: '#BAE3FB', color: '#1CB0F6', dark: '#0d8ecf' },
  { bg: '#F0FAE8', border: '#b4e893', color: '#58CC02', dark: '#46A302' },
  { bg: '#FFF8EA', border: '#FFD8A8', color: '#FF9600', dark: '#cc7a00' },
  { bg: '#F8EEFF', border: '#ddb8ff', color: '#CE82FF', dark: '#B975E5' },
  { bg: '#FFF0F0', border: '#ffc1c1', color: '#FF4B4B', dark: '#c93535' },
];
const getPalette = (partKey) => {
  const n = parseInt(String(partKey ?? '').replace(/\D/g, '')) || 0;
  return PALETTES[n % PALETTES.length];
};

/* ─── SelectDropdown ───────────────────────────────────────────── */
function SelectDropdown({ value, options, onChange, label, icon: Icon, disabled,
  accentColor = C.blue, accentBorder = C.blueBorder, accentBg = C.blueBg }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} className="relative flex-1 min-w-[180px]">
      <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] mb-2 ml-1"
             style={{ color: C.n400 }}>
        {Icon && <Icon className="w-3.5 h-3.5" style={{ color: accentColor }} />}
        {label}
      </label>

      <button
        onClick={() => !disabled && setOpen(o => !o)}
        disabled={disabled}
        className="w-full flex items-center justify-between px-4 py-3.5 rounded-[16px] text-[14px] font-black outline-none transition-all"
        style={{
          background: 'white',
          border: `2px solid ${open ? accentColor : C.n200}`,
          borderBottom: `4px solid ${open ? accentColor : '#cbd5e1'}`,
          color: selected ? C.n800 : C.n400,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: open ? `0 0 0 4px ${accentBg}` : '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        <span className="truncate">{selected?.label || 'Chọn...'}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[200] w-full mt-2 rounded-[18px] py-2 overflow-hidden"
            style={{ background: 'white', border: `2px solid ${C.n200}`, borderBottom: `4px solid #cbd5e1`,
                     boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map(opt => {
                const isActive = opt.value === value;
                return (
                  <button key={opt.value}
                    onClick={() => { onChange(opt.value); setOpen(false); }}
                    className="w-full px-4 py-3 text-left text-[13px] font-bold flex items-center gap-2 outline-none transition-colors"
                    style={{ background: isActive ? accentBg : 'transparent', color: isActive ? accentColor : C.n600 }}
                  >
                    {isActive && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── QuestionCard ─────────────────────────────────────────────── */
function QuestionCard({ question, partKey, index }) {
  const [expanded, setExpanded] = useState(false);
  const pal = getPalette(partKey);

  // FIX: parseQuestionNum loại bỏ prefix "q", "Q", v.v.
  const displayNum = parseQuestionNum(question.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 260, delay: index * 0.035 }}
      className="bg-white rounded-[24px] overflow-hidden"
      style={{ border: `2px solid ${C.n200}`, borderBottom: `5px solid #cbd5e1`,
               boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
    >
      {/* Body */}
      <div className="p-6 lg:p-8">
        <div className="flex gap-5">
          {/* Number badge — hiển thị số sạch, không có "q" */}
          <div
            className="w-14 h-14 shrink-0 rounded-[16px] flex items-center justify-center font-black text-[20px] leading-none"
            style={{
              background: pal.bg, color: pal.color,
              border: `2px solid ${pal.border}`,
              borderBottom: `5px solid ${pal.color}`,
              boxShadow: `0 3px 0 ${pal.color}22`,
              minWidth: 56,
            }}
          >
            {displayNum}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] lg:text-[18px] font-black text-slate-800 leading-snug mb-5"
                style={{ fontFamily: '"Nunito", sans-serif' }}>
              {question.question}
            </h3>

            <div className="space-y-3">
              {question.options?.map((opt, idx) => {
                const correct = idx === question.correct;
                return (
                  <div key={idx}
                    className="flex items-center gap-3.5 px-5 py-4 rounded-[14px]"
                    style={correct
                      ? { background: C.greenBg, border: `2px solid ${C.greenBorder}`, borderBottom: `3px solid ${C.green}` }
                      : { background: '#fafafa', border: `2px solid ${C.n200}` }}
                  >
                    {/* Letter */}
                    <div className="w-10 h-10 shrink-0 rounded-[12px] flex items-center justify-center text-[13px] font-black"
                      style={correct
                        ? { background: C.green, color: 'white', border: `2px solid ${C.greenDark}`, borderBottom: '3px solid #2f7a01' }
                        : { background: 'white', color: C.n400, border: `2px solid ${C.n200}` }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>

                    <span className="text-[14px] lg:text-[15px] font-bold flex-1"
                          style={{ color: correct ? C.greenDark : C.n600 }}>
                      {opt}
                    </span>

                    {correct && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] text-[11px] font-black uppercase tracking-widest shrink-0"
                           style={{ background: C.green, color: 'white', border: `1px solid ${C.greenDark}` }}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đúng
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      {question.explanation && (
        <>
          <button
            onClick={() => setExpanded(o => !o)}
            className="w-full flex items-center justify-between px-6 lg:px-8 py-4 outline-none transition-colors"
            style={{ background: expanded ? C.orangeBg : '#fafafa', borderTop: `2px dashed ${C.n200}` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[11px] flex items-center justify-center shrink-0"
                   style={{ background: C.orangeBg, border: `2px solid ${C.orangeBorder}`, borderBottom: `3px solid ${C.orange}` }}>
                <Sparkles className="w-4 h-4" style={{ color: C.orange }} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.orange }}>Giải thích</p>
                <p className="text-[13px] font-bold text-slate-600">Tại sao đáp án này đúng?</p>
              </div>
            </div>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.22 }}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: expanded ? C.orange : 'white',
                       border: `2px solid ${expanded ? C.orange : C.n200}`,
                       borderBottom: `3px solid ${expanded ? C.orangeDark : '#cbd5e1'}` }}>
              <ChevronDown className="w-4 h-4" style={{ color: expanded ? 'white' : C.n400 }} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="p-6 lg:p-8 pt-4 space-y-4">
                  <div className="p-5 rounded-[16px]"
                       style={{ background: C.orangeBg, border: `2px solid ${C.orangeBorder}` }}>
                    <p className="text-[14px] lg:text-[15px] font-bold italic leading-relaxed text-slate-700 m-0">
                      &ldquo;{question.explanation}&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Smart Tips */}
                    <div className="p-5 rounded-[16px]"
                         style={{ background: C.blueBg, border: `2px solid ${C.blueBorder}`, borderBottom: `4px solid ${C.blue}` }}>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-7 h-7 rounded-[9px] flex items-center justify-center shrink-0"
                             style={{ background: C.blue, border: `2px solid ${C.blueDark}` }}>
                          <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.blue }}>Smart Tips</span>
                      </div>
                      <ul className="space-y-2">
                        {['Chú ý từ khóa quan trọng trong câu hỏi.', 'Dùng phương pháp loại trừ cho đáp án tương tự.'].map((tip, i) => (
                          <li key={i} className="flex gap-2 text-[13px] font-bold text-slate-600 leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: C.blue }} />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Difficulty */}
                    <div className="p-5 rounded-[16px] flex flex-col gap-3"
                         style={{ background: 'white', border: `2px solid ${C.n200}`, borderBottom: `4px solid #cbd5e1` }}>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Độ khó câu hỏi</span>
                      <div className="flex gap-2 items-center">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-2.5 flex-1 rounded-full"
                               style={{ background: i <= 2 ? C.orange : C.n200 }} />
                        ))}
                        <span className="text-[12px] font-black ml-1" style={{ color: C.orange }}>Trung bình</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

/* ─── Empty State ──────────────────────────────────────────────── */
function EmptyState({ selectedPart }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      className="text-center py-24 rounded-[28px]"
      style={{ background: 'white', border: `2px dashed ${C.n200}`, borderBottom: `4px dashed #cbd5e1` }}>
      <div className="w-16 h-16 rounded-[20px] flex items-center justify-center mx-auto mb-5"
           style={{ background: C.blueBg, border: `2px solid ${C.blueBorder}`, borderBottom: `4px solid ${C.blue}` }}>
        <Target className="w-8 h-8" style={{ color: C.blue }} strokeWidth={2} />
      </div>
      <h3 className="text-[20px] font-black text-slate-700 mb-2">
        {selectedPart ? 'Không tìm thấy câu hỏi' : 'Sẵn sàng để bắt đầu?'}
      </h3>
      <p className="text-[14px] font-bold text-slate-400 max-w-sm mx-auto leading-relaxed">
        {selectedPart ? 'Thử thay đổi từ khóa tìm kiếm.' : 'Chọn kỳ thi và phần thi phía trên để tải dữ liệu đáp án.'}
      </p>
    </motion.div>
  );
}

/* ─── Loading Skeleton ─────────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map(i => (
        <div key={i} className="h-32 rounded-[24px] animate-pulse"
             style={{ background: '#e2e8f0', border: `2px solid ${C.n200}`, borderBottom: '5px solid #cbd5e1',
                      animationDelay: `${i * 0.1}s` }} />
      ))}
      <div className="flex justify-center pt-4 gap-3 items-center">
        <div className="w-5 h-5 border-[3px] border-slate-200 border-t-[#1CB0F6] rounded-full animate-spin" />
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Đang tải dữ liệu...</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════════════ */
export default function ExamAnswersPage() {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [currentExam,  setCurrentExam]  = useState(null);
  const [parts,        setParts]        = useState([]);
  const [questions,    setQuestions]    = useState([]);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [isLoading,    setIsLoading]    = useState(false);
  const [examList,     setExamList]     = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllExamMetadataAsync();
      setExamList(data || []);
      if (data?.length > 0) setSelectedExam(data[0].id);
    })();
  }, []);

  useEffect(() => {
    if (!selectedExam) return;
    (async () => {
      setIsLoading(true);
      try {
        const data = await loadExamData(selectedExam);
        if (data) {
          setCurrentExam(data);
          setParts(data.parts ? Object.keys(data.parts) : []);
          setSelectedPart('');
          setQuestions([]);
        }
      } catch (e) { console.error(e); }
      finally { setIsLoading(false); }
    })();
  }, [selectedExam]);

  useEffect(() => {
    if (currentExam && selectedPart && currentExam.parts[selectedPart]) {
      setQuestions(currentExam.parts[selectedPart].questions || []);
    } else {
      setQuestions([]);
    }
  }, [selectedPart, currentExam]);

  const filteredQuestions = useMemo(
    () => questions.filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase())),
    [questions, searchQuery]
  );

  const pal = getPalette(selectedPart);

  return (
    <div className="min-h-screen" style={{ background: C.slate, fontFamily: '"Nunito", "Baloo 2", sans-serif' }}>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40"
           style={{ background: 'rgba(244,247,250,0.93)', backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)', borderBottom: `2px solid ${C.n200}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[13px] flex items-center justify-center shrink-0"
                 style={{ background: C.blueBg, border: `2px solid ${C.blueBorder}`,
                          borderBottom: `4px solid ${C.blue}`, boxShadow: `0 2px 0 ${C.blue}33` }}>
              <BookOpen className="w-5 h-5" style={{ color: C.blue }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[16px] font-black text-slate-800 leading-none tracking-tight">
                Exam<span style={{ color: C.orange }}>Keys</span>
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Answer Hub</p>
            </div>
          </div>

          {filteredQuestions.length > 0 && (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-[12px] text-[13px] font-black"
                 style={{ background: pal.bg, border: `2px solid ${pal.border}`,
                          borderBottom: `3px solid ${pal.color}`, color: pal.color }}>
              <Layers className="w-3.5 h-3.5" strokeWidth={2.5} />
              {filteredQuestions.length} câu hỏi
            </div>
          )}
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8 space-y-7 pb-24">

        {/* Header */}
        <div>
          <h1 className="text-[28px] lg:text-[36px] font-black text-slate-800 tracking-tight leading-tight">
            Thư viện đáp án <span style={{ color: C.blue }}>chi tiết</span>
          </h1>
          <p className="text-[14px] font-bold text-slate-400 mt-1">
            Tra cứu và phân tích đáp án cho các kỳ thi trọng điểm.
          </p>
        </div>

        {/* Filter Panel */}
        <div className="p-5 lg:p-6 rounded-[24px]"
             style={{ background: 'white', border: `2px solid ${C.n200}`, borderBottom: `5px solid #cbd5e1`,
                      boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <SelectDropdown label="Kỳ thi" icon={LayoutGrid}
              value={selectedExam}
              options={examList.map(e => ({ value: e.id, label: e.title }))}
              onChange={setSelectedExam}
              accentColor={C.blue} accentBorder={C.blueBorder} accentBg={C.blueBg}
            />
            <SelectDropdown label="Phần thi" icon={Filter}
              value={selectedPart}
              options={parts.map(p => ({ value: p, label: currentExam?.parts[p]?.title || p }))}
              onChange={setSelectedPart}
              disabled={!currentExam}
              accentColor={C.orange} accentBorder={C.orangeBorder} accentBg={C.orangeBg}
            />

            {/* Search */}
            <div className="flex-[1.5] w-full">
              <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] mb-2 ml-1 text-slate-400">
                <Search className="w-3.5 h-3.5" style={{ color: C.blue }} />
                Tìm nội dung
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: C.n400 }} />
                <input type="text" placeholder="Nhập từ khóa câu hỏi..."
                  className="w-full pl-11 pr-10 py-3.5 rounded-[16px] text-[14px] font-bold outline-none transition-all"
                  style={{
                    background: '#f8fafc',
                    border: `2px solid ${searchQuery ? C.blue : C.n200}`,
                    borderBottom: `4px solid ${searchQuery ? C.blue : '#cbd5e1'}`,
                    color: C.n800,
                    boxShadow: searchQuery ? `0 0 0 3px ${C.blueBg}` : 'none',
                  }}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: '#FFF0F0', border: `1.5px solid #ffc1c1` }}>
                    <XCircle className="w-4 h-4" style={{ color: C.red }} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Result count row */}
        {selectedPart && !isLoading && filteredQuestions.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[9px] flex items-center justify-center shrink-0"
                   style={{ background: pal.bg, border: `2px solid ${pal.border}`, borderBottom: `3px solid ${pal.color}` }}>
                <Info className="w-3.5 h-3.5" style={{ color: pal.color }} />
              </div>
              <p className="text-[14px] font-bold text-slate-500">
                Đang hiển thị <span className="font-black text-slate-700">{filteredQuestions.length}</span> / {questions.length} câu hỏi
              </p>
            </div>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                className="text-[12px] font-black uppercase tracking-wider"
                style={{ color: C.blue }}>
                Xóa bộ lọc ×
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : selectedPart && filteredQuestions.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <div className="space-y-5">
              {filteredQuestions.map((q, i) => (
                <QuestionCard key={q.id} question={q} partKey={selectedPart} index={i} />
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <EmptyState selectedPart={selectedPart} />
        )}
      </main>
    </div>
  );
}
// src/components/Display/PartSelector.jsx
// ✅ FIXED: Always show part selector for both Listening & Reading

import React, { useCallback, useMemo, useState, memo, useEffect, useRef } from 'react';
import {
  ChevronDown, BookOpen, Headphones, Loader2,
  CheckCircle2, ChevronRight, Info, Layers, Lock, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadExamData, getAllExamMetadataAsync } from '../../data/examData';

import { useUnifiedAuth } from '../../hooks/useUnifiedAuth'; 

/* ─── Helpers ────────────────────────────────────────────── */
const partLabel = (key) => key.replace(/part(\d+)/i, 'Part $1');

/* ─── ExamPopover ────────────────────────────────────────── */
const ExamPopover = memo(({
  isOpen, onClose, examList, selectedExam, onSelect, isLoading, isUserLoggedIn
}) => {
  const [active, setActive] = useState(-1);
  const itemsRef = useRef([]);

  const accessibleIndexes = useMemo(
    () => examList.map((e, i) => (isUserLoggedIn || i === 0) ? i : -1).filter(i => i !== -1),
    [examList, isUserLoggedIn]
  );

  useEffect(() => {
    if (isOpen) setActive(examList.findIndex(e => e.id === selectedExam));
  }, [isOpen, examList, selectedExam]);

  useEffect(() => {
    if (active >= 0) itemsRef.current[active]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [active]);

  useEffect(() => {
    if (!isOpen) return;
    const kd = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(p => {
          const next = accessibleIndexes.find(i => i > p);
          return next !== undefined ? next : p;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(p => {
          const prev = [...accessibleIndexes].reverse().find(i => i < p);
          return prev !== undefined ? prev : p;
        });
      } else if (e.key === 'Enter' && active >= 0) {
        const isLocked = !isUserLoggedIn && active !== 0; 
        if (isLocked) return;
        onSelect(examList[active].id); 
        onClose();
      } else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [isOpen, active, examList, onSelect, onClose, isUserLoggedIn, accessibleIndexes]);

  // ✅ Lock body scroll when popover open
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      return;
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-slate-900/20 backdrop-blur-sm sm:hidden" 
            onClick={onClose} 
          />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 md:right-auto md:w-[380px] mt-2 bg-white border border-slate-200/80 rounded-[24px] shadow-2xl shadow-blue-900/5 z-[9999] overflow-hidden flex flex-col"
          >
            <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Chọn bộ đề thi</span>
              <div className="hidden md:flex gap-1.5">
                <kbd className="px-2 py-0.5 text-[10px] font-sans font-semibold bg-white border border-slate-200 rounded-md text-slate-400 shadow-sm">↑↓</kbd>
                <kbd className="px-2 py-0.5 text-[10px] font-sans font-semibold bg-white border border-slate-200 rounded-md text-slate-400 shadow-sm">↵</kbd>
              </div>
            </div>

            <ul className="max-h-[320px] overflow-y-auto p-2.5 custom-scrollbar relative" 
                style={{ overscrollBehavior: 'contain' }}>
              {examList.length === 0 ? (
                <li className="px-4 py-10 flex flex-col items-center justify-center text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin mb-2 text-blue-500" />
                  <span className="text-sm font-medium">Đang tải danh sách...</span>
                </li>
              ) : (
                examList.map((exam, i) => {
                  const isSelected    = exam.id === selectedExam;
                  const isHighlighted = i === active;
                  const locked = !isUserLoggedIn && i !== 0;

                  return (
                    <li key={exam.id} ref={el => itemsRef.current[i] = el} className="mb-1 last:mb-0">
                      <button
                        type="button" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (locked) return;
                          onSelect(exam.id);
                          onClose();
                        }}
                        disabled={locked}
                        className={`
                          w-full text-left px-4 py-3.5 rounded-2xl flex items-center justify-between transition-all duration-200
                          ${locked
                            ? 'opacity-60 cursor-not-allowed bg-slate-50/50 hover:bg-slate-50'
                            : isHighlighted
                              ? 'bg-blue-50 ring-1 ring-inset ring-blue-200 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50'}
                        `}
                      >
                        <div className="min-w-0 pr-4 flex-1">
                          <div className={`text-sm tracking-tight truncate ${
                            locked        ? 'text-slate-500 font-semibold' :
                            isSelected    ? 'font-bold text-blue-700'    :
                                            'font-semibold text-slate-700'
                          }`}>
                            {exam.title}
                          </div>
                          {locked && (
                            <div className="text-[11px] font-medium text-amber-600 mt-1 flex items-center gap-1.5">
                              <Lock className="w-3 h-3" />
                              Đăng nhập để mở khóa
                            </div>
                          )}
                        </div>

                        <div className="shrink-0 flex items-center justify-center w-6 h-6">
                          {locked
                            ? <Lock className="w-4 h-4 text-slate-300" />
                            : isSelected
                              ? <CheckCircle2 className="w-5 h-5 text-blue-600" />
                              : null
                          }
                        </div>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
ExamPopover.displayName = 'ExamPopover';

/* ─── PartChips ───────────────────────────────────────────── */
const PartChips = memo(({ parts, selected, onSelect, isLoading, testType }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-part="${selected}"]`);
    el?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
  }, [selected]);

  return (
    <div className="relative flex items-center group w-full">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth w-full"
      >
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-24 rounded-2xl bg-slate-100 animate-pulse shrink-0" />
          ))
        ) : parts.length === 0 ? (
          // ✅ FIXED: Show message when no parts for this type
          <div className="text-sm font-medium text-slate-400 py-2 px-4">
            Không có phần thi cho {testType === 'listening' ? 'Nghe' : 'Đọc'}
          </div>
        ) : (
          parts.map(({ key, count }) => {
            const isActive = selected === key;
            return (
              <button
                key={key}
                data-part={key}
                onClick={() => onSelect(key)}
                className={`
                  relative shrink-0 flex items-center gap-2 px-4 h-10 rounded-2xl text-sm font-bold transition-all active:scale-[0.96]
                  ${isActive
                    ? 'bg-slate-800 text-white shadow-md shadow-slate-800/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                `}
              >
                {isActive && <motion.div layoutId="active-dot" className="w-1.5 h-1.5 bg-blue-400 rounded-full" />}
                <span>{partLabel(key)}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
});
PartChips.displayName = 'PartChips';

/* ─── Main Component ─────────────────────────────────────── */
const PartSelector = memo(({
  selectedExam, 
  onExamChange = () => {},
  testType = 'listening',
  onTestTypeChange = () => {},
  selectedPart = 'part1',
  onPartChange = () => {},
}) => {
  const { user } = useUnifiedAuth();
  const isUserLoggedIn = !!user;

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [examData, setExamData]       = useState(null);
  const [examList, setExamList]       = useState([]);
  const [isLoadingExams, setIsLoadingExams] = useState(true);
  const [isLoading, setIsLoading]     = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const fetchExams = async () => {
      setIsLoadingExams(true);
      try {
        let data = await getAllExamMetadataAsync(); 
        data = data.sort((a, b) => {
          const nameA = a.title || a.id || '';
          const nameB = b.title || b.id || '';
          return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
        });

        if (mounted) {
          setExamList(data);
          if (data.length > 0 && !selectedExam) {
            onExamChange({ target: { value: data[0].id } });
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách đề thi:", error);
      } finally {
        if (mounted) setIsLoadingExams(false);
      }
    };
    fetchExams();
    return () => { mounted = false; };
  }, [selectedExam, onExamChange]);

  useEffect(() => {
    if (!popoverOpen) return;
    const handler = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) setPopoverOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [popoverOpen]);

  useEffect(() => {
    if (!selectedExam) return;
    let cancelled = false;
    setIsLoading(true);
    loadExamData(selectedExam)
      .then(data => { if (!cancelled) setExamData(data); })
      .catch(console.error)
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [selectedExam]);

  // ✅ FIXED: Get parts for current testType
  const parts = useMemo(() => {
    if (!examData?.parts) return [];
    return Object.entries(examData.parts)
      .filter(([, d]) => d.type === testType)
      .map(([key, d]) => ({ key, count: d.questions?.length || 0 }))
      .sort((a, b) => {
        const numA = parseInt(a.key.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.key.replace(/\D/g, '')) || 0;
        return numA - numB;
      });
  }, [examData, testType]);

  // ✅ FIXED: Auto-switch part if current part doesn't exist in new testType
  useEffect(() => {
    if (parts.length > 0) {
      const isCurrentPartValid = parts.find(p => p.key === selectedPart);
      if (!isCurrentPartValid) {
        onPartChange({ target: { value: parts[0].key } });
      }
    }
  }, [parts, testType, selectedPart, onPartChange]);

  const currentExam     = examList.find(e => e.id === selectedExam);
  const currentPartData = examData?.parts?.[selectedPart];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 px-3 sm:px-0 font-sans relative" 
         style={{ zIndex: 100, overflow: 'visible' }}>
      
      <div className="bg-white border border-slate-200/80 rounded-[28px] shadow-sm p-2 sm:p-2.5 flex flex-col gap-1 relative" 
           style={{ zIndex: 101, overflow: 'visible' }}>

        <div className="flex flex-col md:flex-row gap-2 w-full relative" 
             style={{ zIndex: 102, overflow: 'visible' }}>
          
          <div className="relative flex-1 min-w-0" ref={popoverRef} 
               style={{ zIndex: 102, overflow: 'visible' }}>
            <button
              onClick={() => setPopoverOpen(!popoverOpen)}
              disabled={isLoading || isLoadingExams}
              className={`
                w-full h-14 flex items-center justify-between gap-3 px-4 bg-slate-50/50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 rounded-[20px] transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 active:scale-[0.99]
                ${popoverOpen ? 'ring-4 ring-blue-500/10 border-blue-400 bg-blue-50/50' : ''}
              `}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${popoverOpen ? 'bg-blue-100 text-blue-600' : 'bg-white text-slate-500 shadow-sm border border-slate-100'}`}>
                  {isLoading || isLoadingExams ? <Loader2 className="w-5 h-5 animate-spin" /> : <Layers className="w-5 h-5" />}
                </div>
                <div className="flex flex-col items-start min-w-0 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Bộ đề thi</span>
                    {examList.length > 0 && !isUserLoggedIn && <Lock className="w-2.5 h-2.5 text-amber-500 sm:hidden" />}
                  </div>
                  <span className="text-[15px] font-bold text-slate-800 truncate w-full text-left mt-0.5">
                    {isLoadingExams ? 'Đang tải dữ liệu...' : (currentExam?.title || 'Chọn bộ đề')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {examList.length > 0 && (
                  <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide border ${
                    isUserLoggedIn ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {isUserLoggedIn ? <ShieldCheck className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    {isUserLoggedIn ? 'Đã mở khóa' : 'Cần đăng nhập'}
                  </div>
                )}
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${popoverOpen ? 'rotate-180 text-blue-500' : ''}`} />
              </div>
            </button>

            <div style={{ position: 'relative', zIndex: 9999, overflow: 'visible' }}>
              <ExamPopover
                isOpen={popoverOpen}
                onClose={() => setPopoverOpen(false)}
                examList={examList}
                selectedExam={selectedExam}
                onSelect={(id) => onExamChange({ target: { value: id } })}
                isLoading={isLoadingExams}
                isUserLoggedIn={isUserLoggedIn}
              />
            </div>
          </div>

          <div className="bg-slate-100/80 p-1.5 rounded-[20px] flex gap-1 h-14 w-full md:w-auto shrink-0 relative" 
               style={{ zIndex: 10, overflow: 'visible' }}>
            {[
              { id: 'listening', icon: Headphones, label: 'Listening' },
              { id: 'reading',   icon: BookOpen,   label: 'Reading'   },
            ].map((type) => {
              const active = testType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    if (!active) {
                      onTestTypeChange({ target: { value: type.id } });
                    }
                  }}
                  className={`
                    flex-1 md:flex-none flex items-center justify-center gap-2 px-6 rounded-2xl text-[13px] font-bold transition-all active:scale-[0.96]
                    ${active
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 border border-transparent'}
                  `}
                >
                  <type.icon size={16} className={active ? 'text-blue-500' : 'text-slate-400'} />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ✅ FIXED: Always show part chips, even for Reading */}
        <div className="px-1 relative" style={{ zIndex: 10, overflow: 'visible' }}>
          <PartChips
            parts={parts}
            selected={selectedPart}
            onSelect={(key) => onPartChange({ target: { value: key } })}
            isLoading={isLoading || isLoadingExams}
            testType={testType}
          />
        </div>

        {/* ✅ FIXED: Show part info when part data exists */}
        <AnimatePresence mode="wait">
          {currentPartData && !isLoading && (
            <motion.div
              key={selectedPart}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden relative" 
              style={{ zIndex: 10, overflow: 'visible' }}
            >
              <div className="mx-1 mb-1 p-3.5 bg-blue-50/50 border border-blue-100/60 rounded-[20px] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-blue-500 shrink-0 shadow-sm border border-blue-100">
                  <Info size={18} strokeWidth={2.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[14px] font-bold text-slate-800 truncate leading-tight">{currentPartData.title}</h4>
                  <p className="text-[12px] font-medium text-slate-500 truncate mt-0.5">
                    {currentPartData.description || 'Chọn đáp án chính xác nhất cho từng câu hỏi.'}
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end shrink-0 pl-3 border-l border-blue-200/50">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Số câu hỏi</span>
                  <span className="text-[16px] font-black text-blue-700 leading-none mt-1">
                    {currentPartData.questions?.length || 0}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        
        .custom-scrollbar {
          scroll-behavior: smooth;
          overscroll-behavior: contain;
        }
      `}</style>
    </div>
  );
});
PartSelector.displayName = 'PartSelector';

export default PartSelector;
// src/components/Display/PartSelector.jsx
import React, { useCallback, useMemo, useState, memo, useEffect, useRef } from 'react';
import {
  ChevronDown, BookOpen, Headphones, Loader2,
  CheckCircle2, ChevronRight, Info, Layers, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadExamData, getAllExamMetadataAsync } from '../../data/examData';

/* ─── Helpers ────────────────────────────────────────────── */
const partLabel = (key) => key.replace(/part(\d+)/i, 'Part $1');

/* ─── ExamPopover ────────────────────────────────────────── */
const ExamPopover = memo(({
  isOpen, onClose, examList, selectedExam, onSelect, isLoading,
  canAccessExam, getExamLockInfo,
}) => {
  const [active, setActive] = useState(-1);
  const itemsRef = useRef([]);

  // Chỉ cho phép navigate keyboard tới các exam không bị khóa
  const accessibleIndexes = useMemo(
    () => examList.map((e, i) => (!canAccessExam || canAccessExam(e.id)) ? i : -1).filter(i => i !== -1),
    [examList, canAccessExam]
  );

  useEffect(() => {
    if (isOpen) setActive(examList.findIndex(e => e.id === selectedExam));
  }, [isOpen, examList, selectedExam]);

  useEffect(() => {
    if (active >= 0) itemsRef.current[active]?.scrollIntoView({ block: 'nearest' });
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
        if (canAccessExam && !canAccessExam(examList[active].id)) return;
        onSelect(examList[active].id); onClose();
      } else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [isOpen, active, examList, onSelect, onClose, canAccessExam, accessibleIndexes]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] md:hidden" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 md:right-auto md:w-80 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Danh sách bộ đề</span>
              <div className="hidden md:flex gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] font-sans bg-white border border-slate-200 rounded text-slate-400">↑↓</kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] font-sans bg-white border border-slate-200 rounded text-slate-400">↵</kbd>
              </div>
            </div>

            <ul className="max-h-[320px] overflow-y-auto p-2 custom-scrollbar">
              {examList.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-slate-500">Đang tải danh sách...</li>
              ) : (
                examList.map((exam, i) => {
                  const isSelected    = exam.id === selectedExam;
                  const isHighlighted = i === active;
                  const lockInfo      = getExamLockInfo ? getExamLockInfo(exam.id) : { locked: false };
                  const locked        = lockInfo.locked;

                  return (
                    <li key={exam.id} ref={el => itemsRef.current[i] = el}>
                      <button
                        onClick={() => {
                          if (locked) return;
                          onSelect(exam.id);
                          onClose();
                        }}
                        disabled={locked}
                        className={`
                          w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all
                          ${locked
                            ? 'opacity-50 cursor-not-allowed bg-slate-50'
                            : isHighlighted
                              ? 'bg-blue-50 ring-1 ring-inset ring-blue-100'
                              : 'hover:bg-slate-50'}
                        `}
                      >
                        <div className="min-w-0 pr-3 flex-1">
                          <div className={`text-sm ${
                            locked        ? 'text-slate-400 font-medium' :
                            isSelected    ? 'font-bold text-blue-600'    :
                                            'font-medium text-slate-700'
                          }`}>
                            {exam.title}
                          </div>
                          {locked && (
                            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" />
                              Cần Level {lockInfo.requiredLevel} để mở khóa
                            </div>
                          )}
                        </div>

                        {/* Right icon */}
                        {locked
                          ? <Lock className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          : isSelected
                            ? <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                            : null
                        }
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
const PartChips = memo(({ parts, selected, onSelect, isLoading }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-part="${selected}"]`);
    el?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
  }, [selected]);

  return (
    <div className="relative flex items-center group">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 scroll-smooth w-full"
      >
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-20 rounded-xl bg-slate-100 animate-pulse" />
          ))
        ) : parts.length === 0 ? (
          <div className="text-sm text-slate-500 py-2 px-4 italic">Không có phần thi nào.</div>
        ) : (
          parts.map(({ key, count }) => {
            const isActive = selected === key;
            return (
              <button
                key={key}
                data-part={key}
                onClick={() => onSelect(key)}
                className={`
                  relative shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all
                  ${isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200 scale-105 z-10'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                `}
              >
                {isActive && <motion.div layoutId="active-dot" className="w-1 h-1 bg-blue-400 rounded-full" />}
                <span>{partLabel(key)}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })
        )}
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
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
  canAccessExam,
  getExamLockInfo,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [examData, setExamData]       = useState(null);
  
  // Trạng thái cho danh sách đề thi
  const [examList, setExamList]       = useState([]);
  const [isLoadingExams, setIsLoadingExams] = useState(true);

  // Trạng thái cho chi tiết 1 đề thi
  const [isLoading, setIsLoading]     = useState(false);
  const popoverRef = useRef(null);

  // 1. Fetch toàn bộ danh sách Đề thi từ Firebase và Random nếu chưa có selectedExam
  useEffect(() => {
    let mounted = true;
    const fetchExams = async () => {
      setIsLoadingExams(true);
      try {
        let data = await getAllExamMetadataAsync(true); 
        
        // 🔥 SẮP XẾP DANH SÁCH BỘ ĐỀ THEO TÊN HOẶC ID (Ví dụ: Đề thi 1, Đề thi 2, Đề thi 10...)
        data = data.sort((a, b) => {
          const nameA = a.title || a.id || '';
          const nameB = b.title || b.id || '';
          return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
        });

        if (mounted) {
          setExamList(data);
          
          // 🔥 NẾU CHƯA CÓ ĐỀ ĐƯỢC CHỌN -> CHỌN NGẪU NHIÊN 1 ĐỀ
          if (data.length > 0 && !selectedExam) {
            const availableExams = canAccessExam 
              ? data.filter(ex => canAccessExam(ex.id)) 
              : data;
              
            const poolToPick = availableExams.length > 0 ? availableExams : data;
            const randomIndex = Math.floor(Math.random() * poolToPick.length);
            const randomExamId = poolToPick[randomIndex].id;
            
            onExamChange({ target: { value: randomExamId } });
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
  }, [selectedExam, onExamChange, canAccessExam]);

  // 2. Lắng nghe click outside để đóng Dropdown
  useEffect(() => {
    if (!popoverOpen) return;
    const handler = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) setPopoverOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [popoverOpen]);

  // 3. Fetch dữ liệu chi tiết khi Exam ID thay đổi
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

  // Lọc và SẮP XẾP các Part tương ứng với type (listening/reading)
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

  const currentExam     = examList.find(e => e.id === selectedExam);
  const currentPartData = examData?.parts?.[selectedPart];

  // 🔒 Trạng thái khóa của exam đang được chọn
  const selectedLockInfo = getExamLockInfo && selectedExam ? getExamLockInfo(selectedExam) : { locked: false };

  // 🔒 Số exam đã được mở khóa (để hiện badge)
  const unlockedCount = useMemo(() => {
    if (!canAccessExam) return examList.length;
    return examList.filter(e => canAccessExam(e.id)).length;
  }, [examList, canAccessExam]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 px-2 sm:px-0">
      <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-visible p-1.5">

        {/* Row 1: Selectors */}
        <div className="flex flex-col md:flex-row gap-2 md:items-center">

          {/* Exam Dropdown */}
          <div className="relative flex-1" ref={popoverRef}>
            <button
              onClick={() => setPopoverOpen(!popoverOpen)}
              disabled={isLoading || isLoadingExams}
              className={`
                w-full h-12 flex items-center gap-3 px-4 rounded-2xl border transition-all text-sm font-bold
                ${popoverOpen
                  ? 'bg-blue-50 border-blue-200 ring-4 ring-blue-50 text-blue-700'
                  : 'bg-slate-50 border-transparent text-slate-700 hover:bg-white hover:border-slate-200'}
              `}
            >
              {isLoading || isLoadingExams
                ? <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                : <Layers className="w-4 h-4 text-slate-400" />
              }
              <span className="flex-1 text-left truncate">
                {isLoadingExams ? 'Đang tải...' : (currentExam?.title || 'Chọn bộ đề')}
              </span>

              {/* Badge: x/total đã mở */}
              {canAccessExam && examList.length > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-500">
                  {unlockedCount}/{examList.length}
                </span>
              )}

              <ChevronDown size={16} className={`text-slate-400 transition-transform ${popoverOpen ? 'rotate-180' : ''}`} />
            </button>

            <ExamPopover
              isOpen={popoverOpen}
              onClose={() => setPopoverOpen(false)}
              examList={examList}
              selectedExam={selectedExam}
              onSelect={(id) => {
                if (canAccessExam && !canAccessExam(id)) return;
                onExamChange({ target: { value: id } });
              }}
              isLoading={isLoadingExams}
              canAccessExam={canAccessExam}
              getExamLockInfo={getExamLockInfo}
            />
          </div>

          {/* Type Switcher */}
          <div className="bg-slate-100 p-1 rounded-2xl flex gap-1 h-12">
            {[
              { id: 'listening', icon: Headphones, label: 'Listening' },
              { id: 'reading',   icon: BookOpen,   label: 'Reading'   },
            ].map((type) => {
              const active = testType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => onTestTypeChange({ target: { value: type.id } })}
                  className={`
                    flex-1 md:flex-none flex items-center justify-center gap-2 px-5 rounded-[14px] text-xs font-bold transition-all
                    ${active
                      ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-500 hover:text-slate-700'}
                  `}
                >
                  <type.icon size={14} />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Parts */}
        <div className="mt-2 px-2 pb-1 border-b border-slate-50">
          <PartChips
            parts={parts}
            selected={selectedPart}
            onSelect={(key) => onPartChange({ target: { value: key } })}
            isLoading={isLoading || isLoadingExams}
          />
        </div>

        {/* Row 3: Detail Info */}
        <AnimatePresence mode="wait">
          {currentPartData && !isLoading && (
            <motion.div
              key={selectedPart}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-slate-50 to-white rounded-b-[18px]"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Info size={16} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">{currentPartData.title}</h4>
                <p className="text-xs text-slate-500 truncate">
                  {currentPartData.description || 'Bắt đầu làm bài thi của bạn ngay bây giờ.'}
                </p>
              </div>
              <div className="ml-auto hidden sm:flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Ques:</span>
                <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg leading-none">
                  {currentPartData.questions?.length || 0}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
});
PartSelector.displayName = 'PartSelector';

export default PartSelector;
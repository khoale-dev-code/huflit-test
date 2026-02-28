import React, { useCallback, useMemo, useState, memo, useEffect, useRef } from 'react';
import { ChevronDown, BookOpen, Headphones, Zap, Target, Loader2, CheckCircle2, Search } from 'lucide-react';
import { loadExamData, getAllExamMetadata, preloadExamData } from '../../data/examData';

// ===== HEADER =====
const HeaderSection = memo(() => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2.5 bg-indigo-600 rounded-xl shadow-md flex-shrink-0">
        <BookOpen className="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-black text-slate-900">Luyện Tập</h1>
        <p className="text-slate-500 text-sm mt-0.5">Chọn bài tập phù hợp với mục tiêu của bạn</p>
      </div>
    </div>
    <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-transparent rounded-full" />
  </div>
));

// ===== EXAM DROPDOWN =====
const ExamDropdown = ({ isOpen, onClose, examList, selectedExam, onSelect, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const scrollContainerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      const currentIdx = examList.findIndex(e => e.id === selectedExam);
      setActiveIndex(currentIdx);
    }
  }, [isOpen, examList, selectedExam]);

  useEffect(() => {
    if (activeIndex >= 0 && itemsRef.current[activeIndex]) {
      itemsRef.current[activeIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(prev => Math.min(prev + 1, examList.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(prev => Math.max(prev - 1, 0)); }
      else if (e.key === 'Enter' && activeIndex >= 0) onSelect(examList[activeIndex].id);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, examList, onSelect, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="px-3 py-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Danh sách bộ đề</span>
        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">↑↓ Enter</span>
      </div>
      <ul ref={scrollContainerRef} className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
        {examList.map((exam, index) => (
          <li key={exam.id} ref={el => itemsRef.current[index] = el}>
            <button
              onClick={() => onSelect(exam.id)}
              disabled={isLoading}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all ${
                activeIndex === index ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'
              } ${selectedExam === exam.id ? 'font-bold' : 'font-medium'}`}
            >
              <div className="flex flex-col min-w-0">
                <span className="truncate text-sm">{exam.title}</span>
                <span className="text-[10px] opacity-60 mt-0.5">Mã đề: {exam.id}</span>
              </div>
              {selectedExam === exam.id && <CheckCircle2 className="w-4 h-4 text-indigo-600 ml-2 flex-shrink-0" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ===== CONTROL BAR =====
const ControlBar = memo(({
  selectedExam, isDropdownOpen, isLoading,
  onToggleDropdown, onCloseDropdown, onSelectExam,
  examList, testType, onTestTypeChange
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) onCloseDropdown();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onCloseDropdown]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">

        {/* Exam Selection */}
        <div className="p-5 relative" ref={dropdownRef}>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            Bộ Đề
          </label>
          <button
            onClick={onToggleDropdown}
            disabled={isLoading}
            className={`w-full flex items-center justify-between bg-slate-50 border-2 transition-all rounded-xl px-4 py-3 text-sm focus:outline-none ${
              isDropdownOpen ? 'border-indigo-500 ring-4 ring-indigo-50 bg-white' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="truncate text-slate-900 font-semibold flex items-center gap-2">
              {isLoading
                ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                : <Search className="w-4 h-4 text-slate-400" />}
              {selectedExam ? examList.find(e => e.id === selectedExam)?.title : '-- Chọn bộ đề --'}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <ExamDropdown
            isOpen={isDropdownOpen}
            onClose={onCloseDropdown}
            examList={examList}
            selectedExam={selectedExam}
            onSelect={onSelectExam}
            isLoading={isLoading}
          />
        </div>

        {/* Test Type */}
        <div className="p-5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            Loại Bài
          </label>
          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl">
            {['listening', 'reading'].map(type => (
              <button
                key={type}
                onClick={() => onTestTypeChange(type)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  testType === type
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {type === 'listening' ? <Headphones className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                <span>{type === 'listening' ? 'Nghe' : 'Đọc'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

// ===== PART BUTTON — Card list style =====
const PartButton = memo(({ partKey, info, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border-2 text-left ${
      isActive
        ? 'bg-white border-indigo-600 shadow-md ring-4 ring-indigo-50'
        : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
    }`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 ${
      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
    }`}>
      {partKey.replace(/part(\d+)/i, 'P$1')}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-bold truncate ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
        {info.title}
      </p>
      <p className="text-xs text-slate-400 mt-0.5">{info.questions} câu hỏi</p>
    </div>
    {isActive && <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />}
  </button>
));

// ===== MAIN COMPONENT =====
const PartSelector = React.memo(({
  selectedExam = 'exam1',
  onExamChange = () => {},
  testType = 'listening',
  onTestTypeChange = () => {},
  selectedPart = 'part1',
  onPartChange = () => {}
}) => {
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
  const [examData, setExamData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const examList = useMemo(() => getAllExamMetadata(), []);

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      if (!selectedExam) return;
      setIsLoading(true);
      try {
        const data = await loadExamData(selectedExam);
        if (!cancelled) setExamData(data);
      } catch (err) { console.error(err); }
      finally { if (!cancelled) setIsLoading(false); }
    };
    loadData();
    return () => { cancelled = true; };
  }, [selectedExam]);

  const partInfoMap = useMemo(() => {
    if (!examData?.parts) return {};
    return Object.entries(examData.parts)
      .filter(([_, data]) => data.type === testType)
      .reduce((acc, [key, data]) => ({
        ...acc, [key]: { title: data.title || key, questions: data.questions?.length || 0 }
      }), {});
  }, [examData, testType]);

  const availableParts = useMemo(() => Object.keys(partInfoMap), [partInfoMap]);

  return (
    // ✅ No self-contained max-width, no min-h-screen — MainLayout controls all of that
    <div className="relative space-y-2">
      <HeaderSection />

      <ControlBar
        selectedExam={selectedExam}
        isDropdownOpen={isExamDropdownOpen}
        isLoading={isLoading}
        onToggleDropdown={() => setIsExamDropdownOpen(v => !v)}
        onCloseDropdown={() => setIsExamDropdownOpen(false)}
        onSelectExam={(id) => {
          onExamChange({ target: { value: id } });
          setIsExamDropdownOpen(false);
        }}
        examList={examList}
        testType={testType}
        onTestTypeChange={(type) => onTestTypeChange({ target: { value: type } })}
      />

      {/* ✅ Single-column part list instead of multi-column grid */}
      {availableParts.length > 0 && (
        <div className="space-y-2">
          {availableParts.map(partKey => (
            <PartButton
              key={partKey}
              partKey={partKey}
              info={partInfoMap[partKey]}
              isActive={selectedPart === partKey}
              onClick={() => onPartChange({ target: { value: partKey } })}
            />
          ))}
        </div>
      )}

      {/* Part detail panel */}
      {examData?.parts?.[selectedPart] && (
        <div className="mt-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            {examData.parts[selectedPart].title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {examData.parts[selectedPart].description}
          </p>
        </div>
      )}
    </div>
  );
});

export default PartSelector;
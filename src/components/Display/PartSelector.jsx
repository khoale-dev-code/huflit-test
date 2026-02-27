import React, { useCallback, useMemo, useState, memo, useEffect, useRef } from 'react';
import { ChevronDown, BookOpen, Headphones, Zap, Target, Award, ListChecks, Loader2, CheckCircle2, TrendingUp, Clock, Lightbulb, Search } from 'lucide-react';
import { loadExamData, getAllExamMetadata, preloadExamData } from '../../data/examData';

// --- Sub-Components ---

const OptimizedBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-50 via-white to-slate-50" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

const HeaderSectionPartPart = memo(() => (
  <div className="mb-10">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
      <div className="flex items-center gap-3.5">
        <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg flex-shrink-0">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 truncate">Luyện Tập</h1>
          <p className="text-slate-500 text-sm font-medium leading-tight mt-1">
            Chọn bài tập phù hợp với mục tiêu của bạn
          </p>
        </div>
      </div>
    </div>
    <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-transparent rounded-full" />
  </div>
));

// ===== INLINE DROPDOWN COMPONENT (Replaces Modal) =====
const ExamDropdown = ({ 
  isOpen, 
  onClose, 
  examList, 
  selectedExam, 
  onSelect, 
  isLoading 
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const scrollContainerRef = useRef(null);
  const itemsRef = useRef([]);

  // Reset highlight when open/close
  useEffect(() => {
    if (isOpen) {
      const currentIdx = examList.findIndex(e => e.id === selectedExam);
      setActiveIndex(currentIdx);
    }
  }, [isOpen, examList, selectedExam]);

  // Scroll to active item
  useEffect(() => {
    if (activeIndex >= 0 && itemsRef.current[activeIndex]) {
      itemsRef.current[activeIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev < examList.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        onSelect(examList[activeIndex].id);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, examList, onSelect, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Danh sách bộ đề</span>
        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">↑↓ Enter</span>
      </div>
      <ul 
        ref={scrollContainerRef}
        className="max-h-64 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar"
      >
        {examList.map((exam, index) => (
          <li 
            key={exam.id}
            ref={el => itemsRef.current[index] = el}
          >
            <button
              onClick={() => onSelect(exam.id)}
              disabled={isLoading}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all ${
                activeIndex === index 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'hover:bg-slate-50 text-slate-700'
              } ${selectedExam === exam.id ? 'font-bold' : 'font-medium'}`}
            >
              <div className="flex flex-col min-w-0">
                <span className="truncate text-sm">{exam.title}</span>
                <span className="text-[10px] opacity-60">Mã đề: {exam.id}</span>
              </div>
              {selectedExam === exam.id && <CheckCircle2 className="w-4 h-4 text-indigo-600 ml-2" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ===== CONTROL BAR =====
const ControlBar = memo(({
  selectedExam,
  isDropdownOpen,
  isLoading,
  onToggleDropdown,
  onCloseDropdown,
  onSelectExam,
  examList,
  testType,
  onTestTypeChange
}) => {
  const dropdownRef = useRef(null);

  // Click Outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onCloseDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onCloseDropdown]);

  return (
    <div className="relative z-30 mb-10">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Exam Selection - Inline Container */}
          <div className="p-6 relative" ref={dropdownRef}>
            <label className="text-xs font-bold text-slate-600 tracking-wider uppercase block mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              Bộ Đề
            </label>
            
            <button
              onClick={onToggleDropdown}
              disabled={isLoading}
              className={`w-full flex items-center justify-between bg-slate-50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-sm focus:outline-none ${
                isDropdownOpen ? 'border-indigo-500 ring-4 ring-indigo-50 bg-white' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="truncate text-slate-900 font-bold flex items-center gap-2">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Search className="w-4 h-4 text-slate-400" />}
                {selectedExam ? examList.find(e => e.id === selectedExam)?.title : '-- Chọn bộ đề --'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
          <div className="p-6">
            <label className="text-xs font-bold text-slate-600 tracking-wider uppercase block mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              Loại Bài
            </label>
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl">
              {['listening', 'reading'].map(type => (
                <button
                  key={type}
                  onClick={() => onTestTypeChange(type)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 ${
                    testType === type ? 'bg-white text-indigo-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800'
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
    </div>
  );
});

// ===== PART BUTTON & GRID (Kế thừa từ code cũ, tối ưu memo) =====
const PartButton = memo(({ partKey, info, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`p-5 rounded-2xl transition-all duration-300 border-2 text-left relative overflow-hidden group ${
      isActive ? 'bg-white border-indigo-600 shadow-md ring-4 ring-indigo-50' : 'bg-white/60 border-slate-200 hover:border-indigo-300 shadow-sm'
    }`}
  >
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-2xl font-black ${isActive ? 'text-indigo-700' : 'text-slate-400'}`}>
          {partKey.replace(/part(\d+)/i, 'P$1')}
        </span>
        {isActive && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
      </div>
      <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1">{info.title}</h4>
      <p className="text-[10px] font-bold text-slate-500 uppercase">{info.questions} câu hỏi</p>
    </div>
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
    <div className="w-full bg-white relative min-h-screen">
      <OptimizedBackground />
      <div className="relative max-w-7xl mx-auto z-10 p-6 sm:p-10">
        <HeaderSectionPartPart />
        
        <ControlBar
          selectedExam={selectedExam}
          isDropdownOpen={isExamDropdownOpen}
          isLoading={isLoading}
          onToggleDropdown={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
          onCloseDropdown={() => setIsExamDropdownOpen(false)}
          onSelectExam={(id) => {
            onExamChange({ target: { value: id } });
            setIsExamDropdownOpen(false);
          }}
          examList={examList}
          testType={testType}
          onTestTypeChange={(type) => onTestTypeChange({ target: { value: type } })}
        />

        {/* Parts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
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

        {/* Details Panel - (Bạn có thể giữ nguyên PartDetailsCard cũ của mình ở đây) */}
        {examData?.parts?.[selectedPart] && (
          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
             <h3 className="text-xl font-bold text-slate-900 mb-2">{examData.parts[selectedPart].title}</h3>
             <p className="text-slate-600">{examData.parts[selectedPart].description}</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default PartSelector;  
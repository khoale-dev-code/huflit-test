import React, { useCallback, useMemo, useState, memo, useEffect } from 'react';
import { ChevronDown, BookOpen, Headphones, Zap, Target, Award, ListChecks, Loader2, CheckCircle2, TrendingUp, Clock, Lightbulb } from 'lucide-react';
import { loadExamData, getAllExamMetadata, preloadExamData } from '../../data/examData';

// --- Memoized Sub-Components ---

const DropdownItem = memo(({ children, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm text-left flex items-center justify-between ${
        isActive 
          ? 'bg-indigo-100 text-indigo-900 font-semibold shadow-sm' 
          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium'
      }`}
    >
      <span>{children}</span>
      {isActive && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
    </button>
  </li>
), (prev, next) => prev.isActive === next.isActive && prev.children === next.children);

DropdownItem.displayName = 'DropdownItem';

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
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 truncate">
            Luyện Tập
          </h1>
          <p className="text-slate-500 text-sm font-medium leading-tight mt-1">
            Chọn bài tập phù hợp với mục tiêu của bạn
          </p>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-50 border border-indigo-200">
        <TrendingUp className="w-4 h-4 text-indigo-600" />
        <span className="text-xs font-semibold text-indigo-700">Tiến độ học tập</span>
      </div>
    </div>
    <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-transparent rounded-full" />
  </div>
));

HeaderSectionPartPart.displayName = 'HeaderSectionPartPart';

// ===== EXAM SELECTION MODAL =====
const ExamSelectionModal = memo(({
  isOpen,
  examList,
  selectedExam,
  isLoading,
  onSelectExam,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center md:items-end pointer-events-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[70vh] md:max-h-96 w-full md:w-96 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 md:zoom-in-95 duration-300 pointer-events-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-slate-50 flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Chọn Bộ Đề</h3>
            <p className="text-xs text-slate-500 mt-0.5">{examList.length} bộ đề khả dụng</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Exam List */}
        <div className="overflow-y-auto flex-1">
          <ul className="divide-y divide-slate-100 p-2">
            {examList.map(exam => (
              <li key={exam.id}>
                <button
                  onClick={() => onSelectExam(exam.id)}
                  disabled={isLoading}
                  className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center justify-between hover:bg-indigo-50 ${
                    selectedExam === exam.id 
                      ? 'bg-indigo-50 border-l-4 border-indigo-600' 
                      : 'border-l-4 border-transparent'
                  } disabled:opacity-50`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{exam.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">ID: {exam.id}</p>
                  </div>
                  {selectedExam === exam.id && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 ml-2" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Xác Nhận
          </button>
        </div>
      </div>
    </div>
  );
});

ExamSelectionModal.displayName = 'ExamSelectionModal';

// ===== HORIZONTAL CONTROL BAR =====
const ControlBar = memo(({
  selectedExam,
  isDropdownOpen,
  isLoading,
  onToggleDropdown,
  onSelectExam,
  examList,
  testType,
  onTestTypeChange
}) => {
  return (
    <div className="relative z-10 mb-10">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Exam Selection */}
          <div className="p-6">
            <label className="text-xs font-bold text-slate-600 tracking-wider uppercase block mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              Bộ Đề
            </label>
            
            <button
              onClick={onToggleDropdown}
              disabled={isLoading}
              className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold rounded-xl px-4 py-3 focus:outline-none transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="truncate text-slate-900 flex items-center gap-2 flex-1 min-w-0">
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-indigo-600 flex-shrink-0" />}
                <span className="truncate">{selectedExam ? examList.find(e => e.id === selectedExam)?.title : '-- Chọn bộ đề --'}</span>
              </span>
              <ChevronDown className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-300 text-slate-600 ${
                isDropdownOpen ? 'rotate-180 text-indigo-600' : ''
              }`} />
            </button>
          </div>

          {/* Test Type - Segmented Control */}
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
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    testType === type
                      ? 'bg-white text-indigo-700 shadow-md border-2 border-indigo-300'
                      : 'bg-transparent text-slate-700 border-2 border-transparent hover:text-indigo-700'
                  }`}
                >
                  {type === 'listening' ? (
                    <Headphones className="w-4 h-4" />
                  ) : (
                    <BookOpen className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{type === 'listening' ? 'Nghe' : 'Đọc'}</span>
                  <span className="inline sm:hidden">{type === 'listening' ? 'N' : 'Đ'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ControlBar.displayName = 'ControlBar';

// ===== BENTO GRID PART BUTTON =====
const PartButton = memo(({
  partKey,
  info,
  isActive,
  onClick,
  hoveredPart,
  onHover,
  onHoverLeave
}) => {
  const isOtherHovered = hoveredPart && hoveredPart !== partKey;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover(partKey)}
      onMouseLeave={onHoverLeave}
      className={`
        relative p-5 rounded-2xl transition-all duration-300 border-2 text-left
        overflow-hidden group
        ${isActive
          ? 'bg-white border-indigo-600 shadow-lg scale-100 z-20'
          : 'bg-white/60 border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-md'
        }
        ${isOtherHovered ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}
      `}
    >
      {/* Background accent */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
        isActive ? 'bg-gradient-to-br from-indigo-50 to-slate-50' : ''
      }`} />
      
      <div className="relative z-10 space-y-3.5">
        {/* Part Number & Progress */}
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-3xl font-black transition-colors block ${
              isActive ? 'text-indigo-700' : 'text-slate-600'
            }`}>
              {partKey.replace(/part(\d+)/i, 'P$1')}
            </span>
            <p className={`text-xs font-semibold mt-1 transition-colors ${
              isActive ? 'text-indigo-600' : 'text-slate-500'
            }`}>
              Part {partKey.replace(/part(\d+)/i, '$1')}
            </p>
          </div>
          
          {/* Progress Circle */}
          <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="none" stroke={isActive ? '#e0e7ff' : '#f1f5f9'} strokeWidth="2" />
              <circle 
                cx="16" cy="16" r="14" 
                fill="none" 
                stroke={isActive ? '#4f46e5' : '#cbd5e1'} 
                strokeWidth="2" 
                strokeDasharray="87.96" 
                strokeDashoffset={isActive ? '0' : '43.98'}
                className="transition-all duration-500"
              />
            </svg>
            <span className={`text-xs font-bold ${isActive ? 'text-indigo-700' : 'text-slate-600'}`}>
              {Math.floor((info.questions / 30) * 100)}%
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h4 className={`text-sm font-bold line-clamp-2 transition-colors ${
            isActive ? 'text-slate-900' : 'text-slate-700'
          }`}>
            {info.title}
          </h4>
        </div>

        {/* Questions count */}
        <div className={`pt-3 border-t transition-colors ${
          isActive ? 'border-indigo-200' : 'border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-semibold ${
                isActive ? 'text-indigo-700' : 'text-slate-600'
              }`}>
                {info.questions} câu
              </p>
            </div>
            {isActive && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
          </div>
        </div>
      </div>
    </button>
  );
}, (prev, next) => {
  return prev.isActive === next.isActive && 
    prev.hoveredPart === next.hoveredPart &&
    prev.info.questions === next.info.questions;
});

PartButton.displayName = 'PartButton';

// ===== PARTS GRID LOADING =====
const PartsGridLoading = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="p-5 rounded-2xl bg-slate-100 animate-pulse border-2 border-slate-200 space-y-4">
        <div className="h-10 bg-slate-300 rounded-lg w-2/3" />
        <div className="h-4 bg-slate-200 rounded" />
        <div className="h-3 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
      </div>
    ))}
  </div>
);

const PartsGrid = memo(({
  availableParts,
  partInfoMap,
  selectedPart,
  onPartChange,
  isLoading
}) => {
  const [hoveredPart, setHoveredPart] = useState(null);

  if (isLoading) {
    return <PartsGridLoading />;
  }

  if (availableParts.length === 0) {
    return (
      <div className="text-center py-12 bg-white border-2 border-dashed border-slate-300 rounded-2xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-6 h-6 text-slate-400" />
        </div>
        <p className="text-slate-600 font-semibold">Vui lòng chọn bộ đề</p>
        <p className="text-xs text-slate-500 mt-1">để xem danh sách các phần thi</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {availableParts.map(partKey => (
        <PartButton
          key={partKey}
          partKey={partKey}
          info={partInfoMap[partKey]}
          isActive={selectedPart === partKey}
          onClick={() => onPartChange(partKey)}
          hoveredPart={hoveredPart}
          onHover={setHoveredPart}
          onHoverLeave={() => setHoveredPart(null)}
        />
      ))}
    </div>
  );
}, (prev, next) => {
  return prev.selectedPart === next.selectedPart &&
    prev.availableParts.length === next.availableParts.length &&
    prev.isLoading === next.isLoading;
});

PartsGrid.displayName = 'PartsGrid';

// ===== PART DETAILS CARD (Summary Panel) =====
const PartDetailsCard = memo(({ partData, testType, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 p-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!partData) return null;

  const stats = [
    {
      label: 'Câu hỏi',
      value: partData.questions?.length || 0,
      icon: ListChecks,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      label: 'Loại bài',
      value: testType === 'listening' ? 'Nghe' : 'Đọc',
      icon: testType === 'listening' ? Headphones : BookOpen,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Điểm/Câu',
      value: testType === 'listening' ? '~5' : '~2.5',
      icon: Award,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const tips = testType === 'listening' 
    ? [
        'Đọc câu hỏi trước khi nghe để biết cần tìm gì',
        'Chú ý các từ khóa và cấu trúc câu',
        'Nghe toàn bộ phần rồi mới trả lời, đừng đoán',
        'Ghi chú nhanh gọn trong quá trình nghe'
      ]
    : [
      'Scan bài đọc để hiểu cấu trúc chung trước',
      'Định vị từ khóa từ câu hỏi trong bài',
      'Đọc các dòng xung quanh để hiểu ngữ cảnh',
      'Loại bỏ đáp án sai rõ ràng trước tiên'
    ];

  return (
    <div className="space-y-8">
      {/* Main Details Card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl flex-shrink-0 ${
              testType === 'listening' ? 'bg-purple-100' : 'bg-teal-100'
            }`}>
              {testType === 'listening' ? (
                <Headphones className="w-6 h-6 text-purple-700" strokeWidth={2} />
              ) : (
                <BookOpen className="w-6 h-6 text-teal-700" strokeWidth={2} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-600 uppercase mb-1.5 tracking-wider">
                Chi tiết phần thi
              </p>
              <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
                {partData.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2 mt-2">
                {partData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className={`${stat.bgColor} border border-slate-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:scale-105`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} strokeWidth={2} />
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            Thời gian: ~{testType === 'listening' ? '30' : '50'} phút
          </div>
          <div className="text-xs font-semibold text-indigo-700 px-3 py-1.5 bg-indigo-50 rounded-full border border-indigo-200">
            {testType === 'listening' ? 'Kỹ năng Nghe' : 'Kỹ năng Đọc'}
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-4 border-b border-amber-200 bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-200/50 flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-amber-700" strokeWidth={2} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">💡 Mẹo {testType === 'listening' ? 'Nghe' : 'Đọc'} Hiệu Quả</h4>
            <p className="text-xs text-amber-700 mt-0.5">Áp dụng những mẹo này để đạt điểm cao hơn</p>
          </div>
        </div>

        {/* Tips Content */}
        <div className="p-6 sm:p-8">
          <div className="space-y-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-3.5 items-start group">
                {/* Number Badge */}
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-200 border-2 border-amber-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-900">{idx + 1}</span>
                </div>
                
                {/* Tip Text */}
                <div className="flex-1 pt-0.5">
                  <p className="text-sm text-amber-900 font-medium leading-relaxed">
                    {tip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Motivational Message */}
          <div className="mt-6 pt-6 border-t border-amber-200">
            <p className="text-xs text-amber-800 font-medium text-center italic">
              "Luyện tập thường xuyên với các mẹo trên sẽ giúp bạn cải thiện kỹ năng đáng kể! 🌟"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  return prev.partData?.title === next.partData?.title && 
    prev.testType === next.testType && 
    prev.isLoading === next.isLoading;
});

PartDetailsCard.displayName = 'PartDetailsCard';

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
  const [examList] = useState(() => getAllExamMetadata());

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      if (!selectedExam) {
        setExamData(null);
        return;
      }

      setIsLoading(true);
      
      try {
        const data = await loadExamData(selectedExam);
        
        if (!cancelled) {
          setExamData(data);
          
          const currentIndex = examList.findIndex(e => e.id === selectedExam);
          if (currentIndex < examList.length - 1) {
            preloadExamData(examList[currentIndex + 1].id);
          }
        }
      } catch (error) {
        console.error('Error loading exam:', error);
        if (!cancelled) {
          setExamData(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [selectedExam, examList]);

  const partInfoMap = useMemo(() => {
    if (!examData?.parts) return {};
    
    const map = {};
    const parts = Object.entries(examData.parts);
    
    for (let i = 0; i < parts.length; i++) {
      const [part, data] = parts[i];
      if (data.type === testType) {
        map[part] = {
          title: data.title || part,
          questions: data.questions?.length || 0,
          description: data.description || ''
        };
      }
    }
    return map;
  }, [examData, testType]);

  const availableParts = useMemo(
    () => Object.keys(partInfoMap),
    [partInfoMap]
  );

  const partData = useMemo(
    () => examData?.parts?.[selectedPart] || null,
    [examData, selectedPart]
  );

  const handleExamChange = useCallback((examKey) => {
    onExamChange({ target: { value: examKey } });
    setIsExamDropdownOpen(false);
  }, [onExamChange]);

  const handleTestTypeChange = useCallback((type) => {
    onTestTypeChange({ target: { value: type } });
  }, [onTestTypeChange]);

  const handlePartChange = useCallback((partKey) => {
    onPartChange({ target: { value: partKey } });
  }, [onPartChange]);

  const handleToggleDropdown = useCallback(() => {
    setIsExamDropdownOpen(prev => !prev);
  }, []);

  return (
    <div className="w-full bg-white relative overflow-visible">
      <OptimizedBackground />

      <div className="relative max-w-7xl mx-auto z-10 p-6 sm:p-8 lg:p-10">         
        <HeaderSectionPartPart /> 
        
        {/* Exam Selection Modal */}
        <ExamSelectionModal
          isOpen={isExamDropdownOpen}
          examList={examList}
          selectedExam={selectedExam}
          isLoading={isLoading}
          onSelectExam={handleExamChange}
          onClose={() => setIsExamDropdownOpen(false)}
        />
        
        {/* Control Bar - Exam & Test Type */}
        <ControlBar
          selectedExam={selectedExam}
          isDropdownOpen={isExamDropdownOpen}
          isLoading={isLoading}
          onToggleDropdown={handleToggleDropdown}
          onSelectExam={handleExamChange}
          examList={examList}
          testType={testType}
          onTestTypeChange={handleTestTypeChange}
        />

        {/* Parts Section */}
        {selectedExam && (
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-100 rounded-xl flex-shrink-0">
                  <ListChecks className="w-5 h-5 text-indigo-700" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-slate-900">Chọn phần thi</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Có {availableParts.length} phần {testType === 'listening' ? 'Nghe' : 'Đọc'}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-700 px-4 py-2 bg-indigo-100 rounded-full border border-indigo-300 whitespace-nowrap">
                {availableParts.length} phần thi
              </span>
            </div>

            <PartsGrid
              availableParts={availableParts}
              partInfoMap={partInfoMap}
              selectedPart={selectedPart}
              onPartChange={handlePartChange}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Part Details */}
        <PartDetailsCard
          partData={partData}
          testType={testType}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
});

PartSelector.displayName = 'PartSelector';

export default PartSelector;
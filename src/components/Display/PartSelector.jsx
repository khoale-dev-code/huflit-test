import React, { useCallback, useMemo, useState, memo, useEffect } from 'react';
import { ChevronDown, BookOpen, Headphones, Zap, Target, Award, ListChecks, Loader2 } from 'lucide-react';
import { loadExamData, getAllExamMetadata, preloadExamData } from '../../data/examData';

// --- Memoized Sub-Components (giữ nguyên) ---

const DropdownItem = memo(({ children, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`inline-flex items-center w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 text-xs sm:text-sm md:text-base text-left ${
        isActive 
          ? 'bg-orange-500 text-white font-semibold shadow-md' 
          : 'text-gray-700 hover:bg-orange-100 hover:text-orange-800 font-medium'
      }`}
    >
      {children}
    </button>
  </li>
), (prev, next) => prev.isActive === next.isActive && prev.children === next.children);

DropdownItem.displayName = 'DropdownItem';

const OptimizedBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl" />
    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />
  </div>
);

const HeaderSection = memo(() => (
  <div className="mb-3 sm:mb-6 md:mb-8">
    <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-2">
      <div className="p-1 sm:p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
        <BookOpen className="w-4 h-4 sm:w-5 md:w-6 text-white" />
      </div>
      <div className="min-w-0">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-amber-600 truncate">
          Trắc Nghiệm
        </h1>
        <p className="text-amber-700/80 text-xs sm:text-sm font-medium leading-tight">
          Luyện tập
        </p>
      </div>
    </div>
  </div>
));

HeaderSection.displayName = 'HeaderSection';

// ✅ Exam Selection với Loading State
const ExamSelectionCard = memo(({
  selectedExam,
  isDropdownOpen,
  isLoading,
  onToggleDropdown,
  onSelectExam,
  examList
}) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-shadow duration-200 border border-orange-200/50 ${isDropdownOpen ? 'z-50' : 'z-10'}`}>
    <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
      <div className="p-0.75 sm:p-1 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg shadow-sm flex-shrink-0">
        <Target className="w-3 h-3 sm:w-3.5 text-white" />
      </div>
      <label className="text-xs font-bold text-amber-800 tracking-wide uppercase">
        Bộ Đề
      </label>
    </div>
    
    <div className="relative w-full">
      <button
        onClick={onToggleDropdown}
        disabled={isLoading}
        className="w-full flex items-center justify-between bg-white/50 backdrop-blur border-2 border-orange-300 hover:border-orange-400 focus:ring-4 focus:ring-orange-100 font-semibold rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 focus:outline-none transition-all duration-200 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="truncate text-xs sm:text-sm flex items-center gap-1.5">
          {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
          {selectedExam ? examList.find(e => e.id === selectedExam)?.title : '-- Chọn --'}
        </span>
        <ChevronDown className={`w-3 h-3 sm:w-3.5 ml-1.5 flex-shrink-0 transition-transform duration-200 ${
          isDropdownOpen ? 'rotate-180 text-orange-600' : 'text-amber-600'
        }`} />
      </button>
      
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1.5 bg-white/95 backdrop-blur border border-orange-200 rounded-lg shadow-lg w-full max-h-40 overflow-y-auto z-50">
          <ul className="p-0.5 sm:p-1">
            {examList.map(exam => (
              <DropdownItem 
                key={exam.id}
                isActive={selectedExam === exam.id}
                onClick={() => onSelectExam(exam.id)}
              >
                {exam.title}
              </DropdownItem>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
));

ExamSelectionCard.displayName = 'ExamSelectionCard';

const TestTypeCard = memo(({ testType, onTestTypeChange }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-shadow duration-200 border border-amber-200/50 z-20">
    <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
      <div className="p-0.75 sm:p-1 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg shadow-sm flex-shrink-0">
        <Zap className="w-3 h-3 sm:w-3.5 text-white" />
      </div>
      <label className="text-xs font-bold text-amber-800 tracking-wide uppercase">
        Loại Bài
      </label>
    </div>
    <div className="flex gap-1.5 sm:gap-2">
      {['listening', 'reading'].map(type => (
        <button
          key={type}
          onClick={() => onTestTypeChange(type)}
          className={`flex-1 flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-lg font-semibold text-xs transition-all duration-200 ${
            testType === type
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md border-2 border-orange-500'
              : 'bg-white/60 text-amber-700 border-2 border-amber-200 hover:border-orange-300 hover:bg-orange-50/40'
          }`}
        >
          {type === 'listening' ? (
            <Headphones className="w-3 h-3 sm:w-3.5" />
          ) : (
            <BookOpen className="w-3 h-3 sm:w-3.5" />
          )}
          <span className="hidden sm:inline">{type === 'listening' ? 'Nghe' : 'Đọc'}</span>
          <span className="inline sm:hidden">{type === 'listening' ? 'N' : 'Đ'}</span>
        </button>
      ))}
    </div>
  </div>
));

TestTypeCard.displayName = 'TestTypeCard';

const PartButton = memo(({
  partKey,
  info,
  isActive,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl transition-all duration-200 border-2 overflow-hidden text-left shadow-sm hover:shadow-md ${
      isActive
        ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white border-orange-600 shadow-md'
        : 'bg-white/80 text-amber-900 border-amber-200/50 hover:border-orange-400'
    }`}
  >
    <div className="flex items-start justify-between mb-0.5">
      <span className={`text-base sm:text-xl md:text-2xl font-extrabold ${
        isActive ? 'text-white' : 'text-orange-600'
      }`}>
        {partKey.replace(/part(\d+)/i, 'P$1')}
      </span>
      <Award className={`w-2.5 h-2.5 sm:w-3 md:w-3.5 mt-0.5 flex-shrink-0 ${
        isActive ? 'text-yellow-200' : 'text-amber-500'
      }`} />
    </div>
    <h4 className={`text-xs font-bold mb-1 line-clamp-1 ${
      isActive ? 'text-orange-100' : 'text-amber-800'
    }`}>
      {info.title}
    </h4>
    <div className={`pt-0.5 border-t text-xs font-semibold ${
      isActive ? 'border-orange-400/30 text-orange-100' : 'border-amber-200 text-amber-700'
    }`}>
      {info.questions}c
    </div>
  </button>
), (prev, next) => prev.isActive === next.isActive && prev.info.questions === next.info.questions);

PartButton.displayName = 'PartButton';

// ✅ Loading Placeholder cho Parts Grid
const PartsGridLoading = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl bg-gray-100 animate-pulse border-2 border-gray-200">
        <div className="h-4 bg-gray-300 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded mb-1" />
        <div className="h-2 bg-gray-200 rounded w-1/2" />
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
  if (isLoading) {
    return <PartsGridLoading />;
  }

  if (availableParts.length === 0) {
    return (
      <div className="text-center py-3 sm:py-4 md:py-6 bg-white/80 backdrop-blur rounded-lg border-2 border-dashed border-amber-300 shadow-inner">
        <BookOpen className="w-5 h-5 sm:w-6 text-amber-300 mx-auto mb-1" />
        <p className="text-xs text-amber-700 font-medium">
          Chọn Exam
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2">
      {availableParts.map(partKey => (
        <PartButton
          key={partKey}
          partKey={partKey}
          info={partInfoMap[partKey]}
          isActive={selectedPart === partKey}
          onClick={() => onPartChange(partKey)}
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

const PartDetailsCard = memo(({ partData, testType, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl overflow-hidden shadow-lg border border-amber-200/50 p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!partData) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl overflow-hidden shadow-lg border border-amber-200/50">
      <div className={`px-2.5 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 ${
        testType === 'listening'
          ? 'bg-gradient-to-r from-orange-500 to-amber-600'
          : 'bg-gradient-to-r from-amber-500 to-yellow-600'
      }`}>
        <div className="flex items-start gap-2 sm:gap-2.5">
          <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur rounded-lg border border-white/30 flex-shrink-0">
            {testType === 'listening' ? (
              <Headphones className="w-3.5 h-3.5 sm:w-4 md:w-5 text-white" />
            ) : (
              <BookOpen className="w-3.5 h-3.5 sm:w-4 md:w-5 text-white" />
            )}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-white/80 uppercase block mb-0.25">
              Chi tiết
            </span>
            <h3 className="text-sm sm:text-lg md:text-xl font-black text-white line-clamp-1">
              {partData.title}
            </h3>
            <p className="text-white/90 text-xs leading-tight line-clamp-1">
              {partData.description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-2.5 sm:p-4 md:p-6">
        <h4 className="text-xs font-bold text-amber-800 mb-2 border-b border-amber-200 pb-1.5">
          Thống kê
        </h4>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-lg p-2 sm:p-2.5 md:p-3 hover:shadow-md transition-shadow duration-200">
            <p className="text-xs font-bold text-orange-600 mb-0.5 uppercase">Câu</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-800">
              {partData.questions?.length || 0}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-lg p-2 sm:p-2.5 md:p-3 hover:shadow-md transition-shadow duration-200">
            <p className="text-xs font-bold text-amber-600 mb-0.5 uppercase">Loại</p>
            <div className="flex items-center gap-0.5 text-xs sm:text-sm font-bold text-amber-800">
              {testType === 'listening' ? (
                <Headphones className="w-3 h-3 sm:w-3.5" />
              ) : (
                <BookOpen className="w-3 h-3 sm:w-3.5" />
              )}
              <span className="hidden sm:inline">{testType === 'listening' ? 'Nghe' : 'Đọc'}</span>
              <span className="inline sm:hidden">{testType === 'listening' ? 'N' : 'Đ'}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-yellow-500 rounded-lg p-2 sm:p-2.5 md:p-3 hover:shadow-md transition-shadow duration-200">
            <p className="text-xs font-bold text-yellow-600 mb-0.5 uppercase">Điểm/C</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-800">
              {testType === 'listening' ? '~5' : '~2.5'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}, (prev, next) => prev.partData?.title === next.partData?.title && prev.testType === next.testType && prev.isLoading === next.isLoading);

PartDetailsCard.displayName = 'PartDetailsCard';

// --- Main Component ---

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

  // Load exam data khi selectedExam thay đổi
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
          
          // Preload exam kế tiếp để tăng tốc
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
    <div className="w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      <OptimizedBackground />

      <div className="relative max-w-7xl mx-auto z-10 pb-2 sm:pb-3">
        <HeaderSection />
        
        <hr className="border-orange-200/50 mb-2.5 sm:mb-4 md:mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          <ExamSelectionCard
            selectedExam={selectedExam}
            isDropdownOpen={isExamDropdownOpen}
            isLoading={isLoading}
            onToggleDropdown={handleToggleDropdown}
            onSelectExam={handleExamChange}
            examList={examList}
          />
          <TestTypeCard
            testType={testType}
            onTestTypeChange={handleTestTypeChange}
          />
        </div>

        {selectedExam && (
          <div className="mb-3 sm:mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="p-0.75 sm:p-1 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg shadow-sm flex-shrink-0">
                  <ListChecks className="w-3 h-3 sm:w-3.5 md:w-4 text-white" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-amber-900">Chọn Part</h2>
              </div>
              <span className="text-xs font-bold text-orange-700 px-2 py-0.5 bg-orange-100/80 rounded-full border border-orange-300 w-fit whitespace-nowrap">
                {availableParts.length} Part
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
import React, { useCallback, useMemo, useState, memo } from 'react';
import { ChevronDown, BookOpen, Headphones, Zap, Target, Award, ListChecks } from 'lucide-react';
import { EXAM_DATA } from '../data/examData';

// --- Memoized Sub-Components ---

const DropdownItem = memo(({ children, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`inline-flex items-center w-full px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm md:text-base text-left ${
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

// ✅ Static background - Loại bỏ animation
const OptimizedBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl" />
    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />
  </div>
);

// ✅ Header component - Tách riêng để tránh re-render
const HeaderSection = memo(() => (
  <div className="mb-8 sm:mb-10 md:mb-12">
    <div className="flex items-center gap-3 sm:gap-4 mb-3">
      <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg flex-shrink-0">
        <BookOpen className="w-6 h-6 sm:w-7 md:w-8 text-white" />
      </div>
      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-amber-600 truncate">
          Trắc Nghiệm Tiếng Anh
        </h1>
        <p className="text-amber-700/80 text-xs sm:text-sm mt-1 font-medium">
          Luyện tập thông minh, chọn lọc chuyên sâu
        </p>
      </div>
    </div>
  </div>
));

HeaderSection.displayName = 'HeaderSection';

// ✅ Exam selection card - ĐÃ THÊM Z-INDEX CONDITIONAL
const ExamSelectionCard = memo(({
  selectedExam,
  isDropdownOpen,
  onToggleDropdown,
  onSelectExam
}) => (
  // 💡 CẬP NHẬT: Thêm z-50 khi dropdown mở để nó đè lên TestTypeCard bên cạnh
  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-orange-200/50 ${isDropdownOpen ? 'z-50' : 'z-10'}`}>
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg shadow-sm flex-shrink-0">
        <Target className="w-4 h-4 sm:w-5 text-white" />
      </div>
      <label className="text-xs sm:text-sm font-bold text-amber-800 tracking-wide uppercase">
        Bộ Đề Thi
      </label>
    </div>
    
    <div className="relative w-full">
      <button
        onClick={onToggleDropdown}
        className="w-full flex items-center justify-between bg-white/50 backdrop-blur border-2 border-orange-300 hover:border-orange-400 focus:ring-4 focus:ring-orange-100 font-semibold rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 focus:outline-none transition-all duration-200 text-sm sm:text-base"
      >
        <span className="truncate">
          {selectedExam ? EXAM_DATA[selectedExam]?.title : '-- Chọn Exam --'}
        </span>
        <ChevronDown className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-200 ${
          isDropdownOpen ? 'rotate-180 text-orange-600' : 'text-amber-600'
        }`} />
      </button>
      
      {isDropdownOpen && (
        // Dropdown content cũng cần z-index cao
        <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur border border-orange-200 rounded-xl shadow-lg w-full max-h-56 overflow-y-auto z-50">
          <ul className="p-1 sm:p-2">
            {Object.entries(EXAM_DATA).map(([key, value]) => (
              <DropdownItem 
                key={key}
                isActive={selectedExam === key}
                onClick={() => onSelectExam(key)}
              >
                {value.title}
              </DropdownItem>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
));

ExamSelectionCard.displayName = 'ExamSelectionCard';

// ✅ Test type selection card - Giữ nguyên nhưng đảm bảo z-index thấp hơn
const TestTypeCard = memo(({ testType, onTestTypeChange }) => (
  // 💡 CẬP NHẬT: Thêm z-20 để nó nằm dưới z-50 của dropdown khi cần thiết
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-amber-200/50 z-20">
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg shadow-sm flex-shrink-0">
        <Zap className="w-4 h-4 sm:w-5 text-white" />
      </div>
      <label className="text-xs sm:text-sm font-bold text-amber-800 tracking-wide uppercase">
        Loại Bài Thi
      </label>
    </div>
    <div className="flex gap-2 sm:gap-3">
      {['listening', 'reading'].map(type => (
        <button
          key={type}
          onClick={() => onTestTypeChange(type)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
            testType === type
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md border-2 border-orange-500'
              : 'bg-white/60 text-amber-700 border-2 border-amber-200 hover:border-orange-300 hover:bg-orange-50/40'
          }`}
        >
          {type === 'listening' ? (
            <Headphones className="w-4 h-4 sm:w-5" />
          ) : (
            <BookOpen className="w-4 h-4 sm:w-5" />
          )}
          <span>{type === 'listening' ? 'Nghe' : 'Đọc'}</span>
        </button>
      ))}
    </div>
  </div>
));

TestTypeCard.displayName = 'TestTypeCard';

// ✅ Part button component - Memoized
const PartButton = memo(({
  partKey,
  info,
  isActive,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 border-2 overflow-hidden text-left shadow-sm hover:shadow-md ${
      isActive
        ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white border-orange-600 shadow-md'
        : 'bg-white/80 text-amber-900 border-amber-200/50 hover:border-orange-400'
    }`}
  >
    <div className="flex items-start justify-between mb-1 sm:mb-2">
      <span className={`text-xl sm:text-2xl md:text-3xl font-extrabold ${
        isActive ? 'text-white' : 'text-orange-600'
      }`}>
        {partKey.replace(/part(\d+)/i, 'P$1')}
      </span>
      <Award className={`w-3.5 h-3.5 sm:w-4 mt-0.5 flex-shrink-0 ${
        isActive ? 'text-yellow-200' : 'text-amber-500'
      }`} />
    </div>
    <h4 className={`text-xs font-bold mb-2 line-clamp-2 ${
      isActive ? 'text-orange-100' : 'text-amber-800'
    }`}>
      {info.title}
    </h4>
    <div className={`pt-2 border-t text-xs font-semibold ${
      isActive ? 'border-orange-400/30 text-orange-100' : 'border-amber-200 text-amber-700'
    }`}>
      {info.questions} câu
    </div>
  </button>
), (prev, next) => prev.isActive === next.isActive && prev.info.questions === next.info.questions);

PartButton.displayName = 'PartButton';

// ✅ Part grid component
const PartsGrid = memo(({
  availableParts,
  partInfoMap,
  selectedPart,
  onPartChange
}) => {
  if (availableParts.length === 0) {
    return (
      <div className="text-center py-8 sm:py-10 bg-white/80 backdrop-blur rounded-2xl border-2 border-dashed border-amber-300 shadow-inner">
        <BookOpen className="w-8 h-8 sm:w-10 text-amber-300 mx-auto mb-2" />
        <p className="text-sm sm:text-base text-amber-700 font-medium">
          Vui lòng chọn Exam để xem các Part
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
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
    prev.availableParts.length === next.availableParts.length;
});

PartsGrid.displayName = 'PartsGrid';

// ✅ Part details card
const PartDetailsCard = memo(({ partData, testType }) => {
  if (!partData) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-amber-200/50">
      <div className={`px-4 sm:px-6 md:px-8 py-5 sm:py-7 ${
        testType === 'listening'
          ? 'bg-gradient-to-r from-orange-500 to-amber-600'
          : 'bg-gradient-to-r from-amber-500 to-yellow-600'
      }`}>
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2.5 bg-white/20 backdrop-blur rounded-lg border border-white/30 flex-shrink-0">
            {testType === 'listening' ? (
              <Headphones className="w-5 h-5 sm:w-6 text-white" />
            ) : (
              <BookOpen className="w-5 h-5 sm:w-6 text-white" />
            )}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-white/80 uppercase block mb-0.5">
              Chi tiết Part
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
              {partData.title}
            </h3>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-2">
              {partData.description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <h4 className="text-sm sm:text-base font-bold text-amber-800 mb-3 sm:mb-4 border-b border-amber-200 pb-2">
          Thống kê cơ bản
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
            <p className="text-xs font-bold text-orange-600 mb-1 uppercase">Tổng Câu</p>
            <p className="text-2xl sm:text-3xl font-bold text-orange-800">
              {partData.questions?.length || 0}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
            <p className="text-xs font-bold text-amber-600 mb-1 uppercase">Loại Bài</p>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-800">
              {testType === 'listening' ? (
                <Headphones className="w-4 h-4" />
              ) : (
                <BookOpen className="w-4 h-4" />
              )}
              {testType === 'listening' ? 'Nghe' : 'Đọc'}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-yellow-500 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
            <p className="text-xs font-bold text-yellow-600 mb-1 uppercase">Điểm/Câu</p>
            <p className="text-lg sm:text-xl font-bold text-yellow-800">
              {testType === 'listening' ? '~5' : '~2.5'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}, (prev, next) => prev.partData?.title === next.partData?.title && prev.testType === next.testType);

PartDetailsCard.displayName = 'PartDetailsCard';

// --- Main Component ---

const PartSelector = React.memo(({
  selectedExam = 'toeic',
  onExamChange = () => {},
  testType = 'listening',
  onTestTypeChange = () => {},
  selectedPart = 'part1',
  onPartChange = () => {}
}) => {
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);

  // ✅ Get exam data safely
  const examData = useMemo(() => EXAM_DATA[selectedExam], [selectedExam]);

  // ✅ Optimized partInfoMap - efficient filtering with for loop
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

  // ✅ Available parts - cached
  const availableParts = useMemo(
    () => Object.keys(partInfoMap),
    [partInfoMap]
  );

  // ✅ Current part data
  const partData = useMemo(
    () => examData?.parts?.[selectedPart] || null,
    [examData, selectedPart]
  );

  // ✅ Memoized callbacks
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
      <OptimizedBackground />

      <div className="relative max-w-7xl mx-auto z-10">
        <HeaderSection />
        
        <hr className="border-orange-200/50 mb-6 sm:mb-8" />

        {/* Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <ExamSelectionCard
            selectedExam={selectedExam}
            isDropdownOpen={isExamDropdownOpen}
            onToggleDropdown={handleToggleDropdown}
            onSelectExam={handleExamChange}
          />
          <TestTypeCard
            testType={testType}
            onTestTypeChange={handleTestTypeChange}
          />
        </div>

        {/* Part Selection */}
        {selectedExam && (
          <div className="mb-8 sm:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg shadow-sm flex-shrink-0">
                  <ListChecks className="w-4 h-4 sm:w-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-amber-900">Chọn Part Luyện Tập</h2>
              </div>
              <span className="text-xs sm:text-sm font-bold text-orange-700 px-3 py-1.5 bg-orange-100/80 rounded-full border border-orange-300 w-fit">
                {availableParts.length} Part Có Sẵn
              </span>
            </div>

            <PartsGrid
              availableParts={availableParts}
              partInfoMap={partInfoMap}
              selectedPart={selectedPart}
              onPartChange={handlePartChange}
            />
          </div>
        )}

        {/* Part Details */}
        <PartDetailsCard
          partData={partData}
          testType={testType}
        />
      </div>
    </div>
  );
});

PartSelector.displayName = 'PartSelector';

export default PartSelector;
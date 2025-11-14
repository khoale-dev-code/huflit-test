import React, { useCallback, useMemo, useState } from 'react';
import { ChevronDown, BookOpen, Headphones, Zap, Target, Award, ListChecks, Sparkles } from 'lucide-react';
import { EXAM_DATA } from '../data/examData';

// Helper component cho Dropdown Item
const DropdownItem = ({ children, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`inline-flex items-center w-full p-3 rounded-lg transition-colors text-sm md:text-base text-left ${
        isActive 
          ? 'bg-orange-500 text-white font-semibold shadow-md' 
          : 'text-gray-700 hover:bg-orange-100 hover:text-orange-800 font-medium'
      }`}
    >
      {children}
    </button>
  </li>
);

// Component hiệu ứng đóm tròn nền
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Các đóm tròn lớn - background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-300/15 rounded-full blur-3xl animate-float-medium" />
      <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl animate-float-fast" />
      
      {/* Các đóm tròn nhỏ di chuyển */}
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-amber-400/40 rounded-full animate-bounce-slow" />
      <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-orange-500/30 rounded-full animate-bounce-medium" />
      <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-yellow-500/50 rounded-full animate-bounce-fast" />
      
      {/* Hiệu ứng sparkle */}
      <div className="absolute top-1/4 right-1/2 animate-pulse">
        <Sparkles className="w-4 h-4 text-amber-400/60" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-pulse delay-1000">
        <Sparkles className="w-3 h-3 text-orange-400/50" />
      </div>
    </div>
  );
};

const PartSelector = React.memo(({
  selectedExam = 'toeic',
  onExamChange = () => {},
  testType = 'listening',
  onTestTypeChange = () => {},
  selectedPart = 'part1',
  onPartChange = () => {}
}) => {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
  const examData = EXAM_DATA[selectedExam];

  const availableParts = useMemo(() => {
    if (!examData?.parts) return [];
    return Object.keys(examData.parts).filter(
      part => examData.parts[part].type === testType
    );
  }, [examData, testType]);

  const partInfoMap = useMemo(() => {
    const map = {};
    availableParts.forEach(part => {
      const data = examData?.parts?.[part];
      if (data) {
        map[part] = {
          title: data.title || part,
          questions: data.questions?.length || 0,
          description: data.description || ''
        };
      }
    });
    return map;
  }, [availableParts, examData]);

  const partData = examData?.parts?.[selectedPart];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
      
      {/* Hiệu ứng đóm tròn nền */}
      <FloatingParticles />

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(10px) translateY(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes bounce-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bounce-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-medium { animation: bounce-medium 2s ease-in-out infinite; }
        .animate-bounce-fast { animation: bounce-fast 1.5s ease-in-out infinite; }
      `}</style>

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-14">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl shadow-orange-300/50">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-amber-600">
                Trắc Nghiệm Tiếng Anh
              </h1>
              <p className="text-amber-700/80 text-xs sm:text-sm md:text-base mt-1 font-medium">
                Luyện tập thông minh, chọn lọc chuyên sâu
              </p>
            </div>
          </div>
        </div>
        
        <hr className="border-orange-200/50 mb-6 sm:mb-8 md:mb-10" />

        {/* Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          
          {/* Exam Selection Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg sm:shadow-xl border border-orange-200/50 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:border-orange-300">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg sm:rounded-xl shadow-md">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <label className="text-xs sm:text-sm font-bold text-amber-800 tracking-wider uppercase">Bộ Đề Thi</label>
            </div>
            
            <div className="relative w-full">
              <button
                onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                className="inline-flex items-center justify-between w-full text-amber-900 bg-white/50 backdrop-blur-sm border-2 border-orange-300 hover:border-orange-400 focus:ring-4 focus:ring-orange-100 font-semibold rounded-lg sm:rounded-xl text-base sm:text-lg px-4 py-2.5 sm:px-5 sm:py-3 focus:outline-none transition-all duration-300 hover:bg-white/80"
              >
                <span className="truncate text-sm sm:text-base">
                    {selectedExam ? EXAM_DATA[selectedExam]?.title : '-- Chọn Exam --'}
                </span>
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 ${
                  isExamDropdownOpen ? 'transform rotate-180 text-orange-600' : 'text-amber-600'
                }`} />
              </button>
              
              {/* Dropdown Menu */}
              {isExamDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-md border border-orange-200 rounded-xl shadow-2xl w-full max-h-60 overflow-y-auto z-20 animate-in fade-in slide-in-from-top-1 duration-200">
                  <ul className="p-2">
                    {Object.keys(EXAM_DATA).map(key => (
                      <DropdownItem 
                          key={key} 
                          isActive={selectedExam === key}
                          onClick={() => handleExamChange(key)}
                      >
                          {EXAM_DATA[key].title}
                      </DropdownItem>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Test Type Selection Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg sm:shadow-xl border border-amber-200/50 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:border-amber-300">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg sm:rounded-xl shadow-md">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <label className="text-xs sm:text-sm font-bold text-amber-800 tracking-wider uppercase">Loại Bài Thi</label>
            </div>
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              {['listening', 'reading'].map(type => (
                <button
                  key={type}
                  onClick={() => handleTestTypeChange(type)}
                  className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 ${
                    testType === type
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-300/50 border-2 border-orange-500'
                      : 'bg-white/60 text-amber-700 border-2 border-amber-200 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  {type === 'listening' ? (
                    <Headphones className='w-4 h-4 sm:w-5 sm:h-5' />
                  ) : (
                    <BookOpen className='w-4 h-4 sm:w-5 sm:h-5' />
                  )}
                  <span className="text-xs sm:text-sm md:text-base">
                    {type === 'listening' ? 'Nghe' : 'Đọc'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Part Selection */}
        {selectedExam && (
          <div className="mb-8 sm:mb-10 md:mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-md sm:rounded-lg shadow-md">
                  <ListChecks className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-amber-900">Chọn Part Luyện Tập</h2>
              </div>
              <span className="text-xs sm:text-sm font-bold text-orange-700 px-3 py-1 sm:px-4 sm:py-1.5 bg-orange-100/80 backdrop-blur-sm rounded-full border border-orange-300 self-start sm:self-auto">
                {availableParts.length} Part Có Sẵn
              </span>
            </div>

            {availableParts.length > 0 ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {availableParts.map(partKey => {
                  const info = partInfoMap[partKey];
                  const isActive = selectedPart === partKey;
                  const isHovered = hoveredPart === partKey;
                  
                  return (
                    <button
                      key={partKey}
                      onClick={() => handlePartChange(partKey)}
                      onMouseEnter={() => setHoveredPart(partKey)}
                      onMouseLeave={() => setHoveredPart(null)}
                      className={`relative p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 border-2 group overflow-hidden text-left hover:scale-105 backdrop-blur-sm ${
                        isActive
                          ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white border-orange-600 shadow-xl shadow-orange-300/50'
                          : 'bg-white/80 text-amber-900 border-amber-200/50 hover:border-orange-400 shadow-md hover:shadow-xl'
                      }`}
                    >
                      {/* Background shine effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isActive ? 'opacity-30' : ''
                      }`} />
                      
                      <div className="relative">
                        <div className="flex items-start justify-between mb-1 sm:mb-2">
                          <span className={`text-2xl sm:text-3xl font-extrabold ${
                            isActive ? 'text-white' : 'text-orange-600'
                          }`}>
                            {partKey.toUpperCase().replace('PART', 'Part ')}
                          </span>
                          <Award className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 ${
                            isActive ? 'text-yellow-200' : 'text-amber-500'
                          }`} />
                        </div>
                        <h4 className={`text-xs sm:text-sm font-bold mb-2 sm:mb-3 line-clamp-2 ${
                          isActive ? 'text-orange-100' : 'text-amber-800'
                        }`}>
                            {info.title}
                        </h4>

                        <div className={`mt-2 sm:mt-3 pt-2 sm:pt-3 border-t ${
                          isActive ? 'border-orange-400/30' : 'border-amber-200'
                        }`}>
                          <p className={`text-xs font-semibold ${
                            isActive ? 'text-orange-100' : 'text-amber-700'
                          }`}>
                            {info?.questions} câu hỏi
                          </p>
                          {(isActive || isHovered) && (
                            <div className={`mt-1 sm:mt-2 text-xs text-left line-clamp-2 ${
                              isActive ? 'text-orange-200' : 'text-amber-600'
                            } animate-in fade-in duration-300`}>
                              {info?.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-dashed border-amber-300 shadow-inner">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-300 mx-auto mb-2 sm:mb-3" />
                <p className="text-sm sm:text-base text-amber-700 font-medium px-4">
                  Vui lòng chọn Exam để xem các Part tương ứng
                </p>
              </div>
            )}
          </div>
        )}

        {/* Part Details Card */}
        {partData && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-amber-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Header with Gradient */}
            <div className={`relative px-4 sm:px-6 md:px-8 py-6 sm:py-8 ${
              testType === 'listening'
                ? 'bg-gradient-to-r from-orange-500 to-amber-600'
                : 'bg-gradient-to-r from-amber-500 to-yellow-600'
            } overflow-hidden`}>
              
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 md:p-4 bg-white/30 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/40 shadow-lg">
                  {testType === 'listening' ? (
                    <Headphones className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  ) : (
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-xs sm:text-sm font-bold text-white/80 uppercase block mb-1">
                    Chi tiết Part
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 sm:mb-2">
                    {partData.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    {partData.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Content & Stats */}
            <div className="p-4 sm:p-6 md:p-8">
              <h4 className="text-base sm:text-lg font-bold text-amber-800 mb-4 sm:mb-5 border-b border-amber-200 pb-2 sm:pb-3">
                Thống kê cơ bản
              </h4>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {/* Stat 1: Tổng Câu */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <p className="text-xs font-bold text-orange-600 mb-1 sm:mb-2 tracking-wide uppercase">
                    Tổng Câu
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-800">
                    {partData.questions?.length || 0}
                  </p>
                </div>
                
                {/* Stat 2: Loại Bài */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <p className="text-xs font-bold text-amber-600 mb-1 sm:mb-2 tracking-wide uppercase">
                    Loại Bài
                  </p>
                  <div className="flex items-center text-base sm:text-lg font-bold text-amber-800">
                    {testType === 'listening' ? (
                      <Headphones className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2' />
                    ) : (
                      <BookOpen className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2' />
                    )}
                    {testType === 'listening' ? 'Nghe' : 'Đọc'}
                  </div>
                </div>
                
                {/* Stat 3: Điểm/Câu */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-yellow-500 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <p className="text-xs font-bold text-yellow-600 mb-1 sm:mb-2 tracking-wide uppercase">
                    Điểm Ước Tính/Câu
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-800">
                    {testType === 'listening' ? '≈ 5 điểm' : '≈ 2.5 điểm'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

PartSelector.displayName = 'PartSelector';

export default PartSelector;
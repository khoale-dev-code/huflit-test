import React, { useState, useEffect, useRef } from 'react';
import { 
  loadExamData, 
  getAllExamMetadata,
  getExamQuestions 
} from '../../data/examData';
import { 
  BookOpen, FileText, CheckCircle, Sparkles, ChevronDown, Award, 
  Target, ChevronUp, Loader2, Search, Filter, Clock, Zap, 
  Brain, X, ChevronRight, BarChart3, Lightbulb, ArrowLeft,
  Home, Bookmark, Download, Eye, Layers, Shield, Trophy, Star
} from 'lucide-react';

// Animated Background Component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 500;

    const particles = [];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.2 + 0.1,
        color: Math.random() > 0.7 ? '#B45309' : '#78350F',
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color === '#B45309' 
          ? `rgba(180, 83, 9, ${particle.opacity})`
          : `rgba(120, 53, 15, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ height: '100%' }}
    />
  );
};

// Animated Dropdown Menu Component
const AnimatedDropdown = ({ value, options, onChange, label, icon: Icon, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative">
      <label className="flex items-center gap-2 text-sm font-bold text-amber-900 mb-2">
        {Icon && <Icon className="w-4 h-4 text-amber-700" />}
        {label}
      </label>
      
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3.5 bg-white text-amber-900 font-semibold rounded-xl border transition-all duration-300 text-sm shadow-sm ${
          disabled 
            ? 'opacity-50 cursor-not-allowed border-amber-200' 
            : 'hover:border-amber-500 hover:shadow-md border-amber-300'
        }`}
      >
        <span className="truncate">{selectedOption?.label || 'Chọn...'}</span>
        <ChevronDown 
          className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <div
        className={`absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-amber-200 overflow-hidden transition-all duration-300 origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="max-h-64 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center gap-3 group ${
                option.value === value
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-amber-900 hover:bg-amber-50'
              }`}
              style={{
                animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
              }}
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                option.value === value 
                  ? 'bg-amber-500 scale-100' 
                  : 'bg-amber-300 scale-0 group-hover:scale-100'
              }`} />
              <span className="flex-1 truncate">{option.label}</span>
              {option.value === value && (
                <CheckCircle className="w-4 h-4 text-amber-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Explanation Section with Animation
const ExplanationSection = ({ explanation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!explanation) return null;

  const isLongText = explanation.length > 200;
  const previewLength = 200;
  
  const displayText = isExpanded || !isLongText 
    ? explanation 
    : explanation.substring(0, previewLength) + '...';

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/80 border-t border-amber-200">
      <div className="relative p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-base font-bold text-amber-900">
                Giải Thích Chi Tiết
              </h4>
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </div>
            
            <div 
              className={`prose prose-sm max-w-none transition-all duration-500 ${
                isExpanded ? 'max-h-[2000px]' : 'max-h-[200px]'
              }`}
            >
              <p className="text-sm text-amber-900/90 leading-relaxed whitespace-pre-wrap">
                {displayText}
              </p>
            </div>
            
            {isLongText && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-50 border border-amber-300 hover:border-amber-400 rounded-lg text-sm font-semibold text-amber-700 hover:text-amber-800 transition-all duration-200"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Thu gọn
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Xem đầy đủ
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating Stats Card
const FloatingStatsCard = ({ icon: Icon, label, value, color, delay }) => {
  return (
    <div 
      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-amber-200 hover:border-amber-300 transition-all duration-500 hover:scale-105 cursor-pointer shadow-sm hover:shadow"
      style={{
        animation: `float 3s ease-in-out ${delay}s infinite`
      }}
    >
      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-2xl font-bold text-amber-900 mb-1">{value}</p>
      <p className="text-xs text-amber-700 font-medium">{label}</p>
    </div>
  );
};

const ExamAnswersPage = () => {
  const [selectedExam, setSelectedExam] = useState('exam1');
  const [selectedPart, setSelectedPart] = useState('');
  const [currentExam, setCurrentExam] = useState(null);
  const [parts, setParts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingExam, setIsLoadingExam] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const examList = getAllExamMetadata();

  // Function to handle back navigation
  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const loadExam = async () => {
      if (!selectedExam) {
        setCurrentExam(null);
        setParts([]);
        return;
      }

      setIsLoadingExam(true);
      try {
        const examData = await loadExamData(selectedExam);
        setCurrentExam(examData);
        
        if (examData?.parts) {
          setParts(Object.keys(examData.parts));
        } else {
          setParts([]);
        }
        
        setSelectedPart('');
      } catch (error) {
        console.error('Error loading exam:', error);
        setCurrentExam(null);
        setParts([]);
      } finally {
        setIsLoadingExam(false);
      }
    };

    loadExam();
  }, [selectedExam]);

  useEffect(() => {
    const loadQuestions = async () => {
      if (!selectedExam || !selectedPart) {
        setQuestions([]);
        return;
      }

      setIsLoadingQuestions(true);
      try {
        const questionsData = await getExamQuestions(selectedExam, selectedPart);
        setQuestions(questionsData || []);
      } catch (error) {
        console.error('Error loading questions:', error);
        setQuestions([]);
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    loadQuestions();
  }, [selectedExam, selectedPart]);

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.options?.some(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const examOptions = examList.map(exam => ({
    value: exam.id,
    label: exam.title
  }));

  const partOptions = [
    { value: '', label: '-- Chọn phần thi --' },
    ...parts.map(partId => ({
      value: partId,
      label: currentExam?.parts[partId]?.title || partId
    }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50/30">
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        `}
      </style>

       

        {/* Modern Header with Animated Background */}
        <div className="relative bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 overflow-hidden border-b border-amber-300">
          <AnimatedBackground />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Header Content with proper spacing for back button */}
            <div className="pt-8">
              {/* Header Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-amber-900">HỆ THỐNG TRA CỨU ĐÁP ÁN</span>
                </div>
              </div>

              {/* Main Title */}
              <div className="text-center space-y-4 mb-10">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <BookOpen className="w-10 h-10 text-amber-900" />
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 tracking-tight">
                  TRA CỨU <span className="text-white">ĐÁP ÁN</span>
                </h1>
                <p className="text-lg text-amber-800/90 max-w-3xl mx-auto leading-relaxed">
                  Hệ thống cung cấp giải thích chi tiết và phân tích chuyên sâu
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <FloatingStatsCard 
                  icon={BookOpen} 
                  label="Đề thi" 
                  value={examList.length} 
                  color="from-amber-500 to-amber-600"
                  delay={0}
                />
                <FloatingStatsCard 
                  icon={FileText} 
                  label="Câu hỏi" 
                  value="2000+" 
                  color="from-amber-600 to-amber-700"
                  delay={0.2}
                />
                <FloatingStatsCard 
                  icon={BarChart3} 
                  label="Tỷ lệ đúng" 
                  value="98%" 
                  color="from-amber-700 to-amber-800"
                  delay={0.4}
                />
                <FloatingStatsCard 
                  icon={Award} 
                  label="Chất lượng" 
                  value="A+" 
                  color="from-amber-800 to-amber-900"
                  delay={0.6}
                />
              </div>
            </div>
          </div>
        </div>
    

      {/* Main Content with additional top margin for back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Panel */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-200">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-amber-900">Tìm Kiếm & Lọc</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Custom Animated Dropdowns */}
            <AnimatedDropdown
              value={selectedExam}
              options={examOptions}
              onChange={setSelectedExam}
              label="Chọn Đề Thi"
              icon={BookOpen}
              disabled={isLoadingExam}
            />

            {currentExam && parts.length > 0 && (
              <AnimatedDropdown
                value={selectedPart}
                options={partOptions}
                onChange={setSelectedPart}
                label="Chọn Phần Thi"
                icon={FileText}
                disabled={isLoadingQuestions}
              />
            )}
          </div>

          {/* Search Bar */}
          {selectedPart && questions.length > 0 && (
            <div className="mt-6 relative">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-amber-900">Tìm kiếm câu hỏi</span>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type="text"
                  placeholder="Nhập từ khóa tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-amber-50 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all duration-300 text-amber-900 placeholder:text-amber-500/60 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-amber-700" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        {isLoadingQuestions ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-amber-600 animate-spin" />
              <div className="absolute inset-0 blur-2xl bg-amber-400/20"></div>
            </div>
            <p className="mt-6 text-amber-900 font-semibold text-lg">Đang tải dữ liệu...</p>
          </div>
        ) : selectedPart && filteredQuestions.length > 0 ? (
          <div className="space-y-6 pb-12">
            {/* Part Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 border border-amber-400">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {currentExam.parts[selectedPart].title}
                    </h2>
                    <div className="flex items-center gap-2 text-amber-100">
                      <BookOpen className="w-4 h-4" />
                      <span>{currentExam.title}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/30">
                    <p className="text-xs text-amber-100">Tổng số câu</p>
                    <p className="text-2xl font-bold text-white">{filteredQuestions.length}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/30">
                    <p className="text-xs text-amber-100">Đã hoàn thành</p>
                    <p className="text-2xl font-bold text-emerald-300">0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((q, index) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl overflow-hidden border border-amber-200 hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow"
                  style={{
                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Question Header */}
                  <div className="p-6 border-b border-amber-100">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center border border-amber-200">
                          <span className="text-amber-900 font-bold text-lg">{q.id}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold text-amber-900 leading-relaxed">
                          {q.question}
                        </p>
                      </div>
                      <button className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors">
                        <Bookmark className="w-5 h-5 text-amber-600" />
                      </button>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="p-6 space-y-3">
                    {q.options && q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`relative p-4 rounded-xl border transition-all duration-300 ${
                          i === q.correct
                            ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-emerald-300'
                            : 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                            i === q.correct
                              ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className={`flex-1 font-medium text-sm ${
                            i === q.correct ? 'text-emerald-900' : 'text-amber-900'
                          }`}>
                            {opt}
                          </span>
                          {i === q.correct && (
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                        {i === q.correct && (
                          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                              ĐÁP ÁN ĐÚNG
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Explanation Section */}
                  <ExplanationSection explanation={q.explanation} />
                </div>
              ))}
            </div>
          </div>
        ) : selectedPart && searchQuery ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-6 border border-amber-300">
              <Search className="w-12 h-12 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">Không tìm thấy kết quả</h3>
            <p className="text-amber-700 text-center max-w-md">
              Không có câu hỏi nào phù hợp với "<span className="font-bold text-amber-600">{searchQuery}</span>"
            </p>
          </div>
        ) : selectedPart ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-6 border border-amber-300">
              <FileText className="w-12 h-12 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">Chưa có dữ liệu</h3>
            <p className="text-amber-700 text-center max-w-md">
              Phần <span className="font-bold text-amber-600">{currentExam?.parts[selectedPart]?.title}</span> đang được cập nhật
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative mb-10">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-lg border border-amber-300">
                <BookOpen className="w-16 h-16 text-amber-600" />
              </div>
              <div className="absolute -inset-4 bg-amber-300/10 rounded-full blur-3xl"></div>
            </div>
            <h3 className="text-3xl font-bold text-amber-900 mb-4 text-center">Chào mừng bạn!</h3>
            <p className="text-amber-700 text-center text-xl max-w-2xl leading-relaxed">
              Vui lòng chọn <span className="font-bold text-amber-600">đề thi</span> và <span className="font-bold text-amber-600">phần thi</span> để bắt đầu tra cứu đáp án
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl border border-amber-200">
                <Star className="w-5 h-5 text-amber-600" />
                <span className="text-amber-800">100% miễn phí</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl border border-amber-200">
                <Layers className="w-5 h-5 text-amber-600" />
                <span className="text-amber-800">Nhiều đề thi</span>
              </div>
            </div>
          </div>
        )}
      </div>

    
    </div>
  );
};

export default ExamAnswersPage;
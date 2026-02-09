import React, { useState, useRef } from 'react';
import { 
  Lightbulb, ChevronDown, ChevronUp, Brain, 
  Copy, Check, Sparkles, Target, BookOpen, Zap
} from 'lucide-react';

const ExplanationSection = ({ 
  explanation, 
  question, 
  userAnswer, 
  correctAnswer, 
  isCorrect,
  questionId,
  options = []
}) => {
  // ===== STATE MANAGEMENT =====
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isExplanationExpanded, setIsExplanationExpanded] = useState(false);
  const [isMainCardHovered, setIsMainCardHovered] = useState(false);
  const contentRef = useRef(null);

  // ===== DERIVED DATA =====
  const selectedAnswerText = options[userAnswer] || 'Chưa chọn';
  const correctAnswerText = options[correctAnswer] || 'N/A';
  const isLongExplanation = explanation && explanation.length > 300;
  
  const displayedExplanation = isExplanationExpanded || !isLongExplanation 
    ? explanation 
    : explanation?.substring(0, 300);

  // ===== HANDLERS WITH ACCESSIBILITY =====
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(explanation);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleExplanationToggle = () => {
    setIsExplanationExpanded(!isExplanationExpanded);
  };

  // ===== ENHANCED TEXT RENDERING WITH SEMANTIC FORMATTING =====
  const renderFormattedText = (text) => {
    if (!text) return null;
    
    // Split by **bold text** pattern and preserve structure
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return (
          <span 
            key={idx}
            className="font-semibold text-blue-600 bg-gradient-to-r from-blue-50 to-cyan-50 px-2 py-1 rounded-md text-sm inline-block transition-all duration-200 hover:shadow-sm hover:from-blue-100 hover:to-cyan-100"
          >
            {boldText}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  if (!explanation) return null;

  return (
    <div className="w-full my-6 space-y-3 sm:space-y-4">
      {/* ===== HEADER TOGGLE BUTTON - ENHANCED UX =====*/}
      <button
        onClick={handleExpandClick}
        onKeyDown={(e) => e.key === 'Enter' && handleExpandClick()}
        aria-expanded={isExpanded}
        aria-controls={`explanation-content-${questionId}`}
        aria-label={isExpanded ? 'Thu gọn giải thích' : 'Xem giải thích chi tiết'}
        className={`
          w-full text-left transition-all duration-300 ease-out 
          px-4 sm:px-6 py-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
          ${isExpanded 
            ? 'bg-gradient-to-r from-slate-50 via-slate-50 to-blue-50/30 border border-slate-200 shadow-md' 
            : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md active:shadow-lg'
          }
        `}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* LEFT SECTION: Icon + Title */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className={`
              flex-shrink-0 p-2 rounded-lg transition-all duration-300
              ${isCorrect 
                ? 'bg-emerald-100/50' 
                : 'bg-rose-100/50'
              }
            `}>
              <Lightbulb className={`w-5 h-5 transition-colors duration-300 ${
                isCorrect ? 'text-emerald-600' : 'text-rose-500'
              }`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 tracking-tight">
                {isCorrect ? '✨ Giải thích' : '🎯 Phân tích lỗi'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {isExpanded ? 'Nhấn để thu gọn' : 'Nhấn để xem chi tiết'}
              </p>
            </div>
          </div>
          
          {/* MIDDLE SECTION: Status Badge with Animation */}
          <div className={`
            px-3 sm:px-4 py-2 rounded-full text-xs font-semibold flex-shrink-0
            transition-all duration-300 backdrop-blur-sm
            ${isCorrect 
              ? 'bg-emerald-100/60 text-emerald-700 border border-emerald-200/50 shadow-sm shadow-emerald-200/20' 
              : 'bg-rose-100/60 text-rose-700 border border-rose-200/50 shadow-sm shadow-rose-200/20'
            }
          `}>
            <span className={isCorrect ? '✓' : '✕'} /> 
            <span className="ml-1">{isCorrect ? 'Chính xác' : 'Cần cải thiện'}</span>
          </div>
          
          {/* RIGHT SECTION: Chevron Icon */}
          <ChevronDown className={`
            w-5 h-5 text-slate-600 transition-all duration-300 flex-shrink-0
            ${isExpanded ? 'rotate-180 text-blue-600' : ''}
          `} />
        </div>
      </button>

      {/* ===== EXPANDED CONTENT - SMOOTH ANIMATION ===== */}
      <div
        id={`explanation-content-${questionId}`}
        className={`
          overflow-hidden transition-all duration-500 ease-in-out origin-top
          ${isExpanded ? 'opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
        `}
      >
        <div ref={contentRef} className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2">
          
          {/* ===== ANSWER COMPARISON CARD - PREMIUM LAYOUT ===== */}
          <div className="bg-white border border-slate-150 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
            {/* Card Header */}
            <div className="px-4 sm:px-6 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-slate-50 to-slate-100/50 group-hover:from-slate-100 group-hover:to-slate-100/50 transition-colors duration-300">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-600" />
                <h3 className="text-sm font-bold text-slate-900">So sánh kết quả</h3>
              </div>
            </div>
            
            {/* Answer Grid - Responsive 2-Column Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {/* User's Answer */}
              <div className="p-4 sm:p-6 hover:bg-slate-50/50 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`
                    flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold flex-shrink-0
                    transition-all duration-200
                    ${isCorrect 
                      ? 'bg-gradient-to-br from-emerald-200 to-emerald-100 text-emerald-800 shadow-sm' 
                      : 'bg-gradient-to-br from-rose-200 to-rose-100 text-rose-800 shadow-sm'
                    }
                  `}>
                    {userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : '?'}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Câu trả lời của bạn</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-medium break-words">
                  {selectedAnswerText}
                </p>
              </div>

              {/* Correct Answer - Only Show if Wrong */}
              {!isCorrect && (
                <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-emerald-50/30 hover:from-emerald-100/50 hover:to-emerald-100/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-200 text-emerald-900 text-xs font-bold flex-shrink-0 shadow-sm">
                      {String.fromCharCode(65 + correctAnswer)}
                    </div>
                    <span className="text-sm font-semibold text-emerald-700">Đáp án đúng</span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium break-words">
                    {correctAnswerText}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ===== MAIN EXPLANATION CARD - PREMIUM BOOK-LIKE DESIGN ===== */}
          <div 
            onMouseEnter={() => setIsMainCardHovered(true)}
            onMouseLeave={() => setIsMainCardHovered(false)}
            className="bg-white border border-slate-150 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            {/* Premium Header */}
            <div className={`
              px-4 sm:px-6 py-4 border-b border-slate-100 
              transition-all duration-300
              ${isMainCardHovered 
                ? 'bg-gradient-to-r from-blue-50 via-blue-50/50 to-cyan-50/30 border-blue-100/50' 
                : 'bg-gradient-to-r from-slate-50 via-slate-50 to-slate-100/50'
              }
            `}>
              <div className="flex items-center gap-3">
                <div className={`
                  p-2 rounded-lg transition-all duration-300
                  ${isMainCardHovered ? 'bg-blue-100/60 scale-110' : 'bg-blue-50/60'}
                `}>
                  <Brain className={`w-4 h-4 transition-colors duration-300 ${
                    isMainCardHovered ? 'text-blue-700' : 'text-slate-600'
                  }`} />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Giải thích chi tiết</h3>
              </div>
            </div>
            
            {/* Content Area with Premium Typography */}
            <div className="p-5 sm:p-8">
              {/* Explanation Text Container */}
              <div className="relative mb-6">
                <div className={`
                  text-sm leading-relaxed text-slate-800 font-medium
                  transition-all duration-300
                  ${isLongExplanation && !isExplanationExpanded 
                    ? 'line-clamp-5 relative' 
                    : ''
                  }
                `}>
                  {renderFormattedText(displayedExplanation)}
                </div>
                
                {/* Sophisticated Gradient Fade Effect */}
                {isLongExplanation && !isExplanationExpanded && (
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                )}
              </div>

              {/* Expand/Collapse Toggle - Elegant Button */}
              {isLongExplanation && (
                <button
                  onClick={handleExplanationToggle}
                  onKeyDown={(e) => e.key === 'Enter' && handleExplanationToggle()}
                  aria-expanded={isExplanationExpanded}
                  aria-label={isExplanationExpanded ? 'Thu gọn giải thích chi tiết' : 'Xem toàn bộ giải thích'}
                  className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-all duration-200 group/btn hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  {isExplanationExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5" />
                      <span>Thu gọn</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-y-0.5" />
                      <span>Xem toàn bộ ({explanation.length} ký tự)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* ===== LEARNING INSIGHT BOX - MOTIVATIONAL DESIGN ===== */}
          <div className={`
            rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300
            border backdrop-blur-sm
            ${isCorrect 
              ? 'bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-teal-50/30 border-emerald-200/50' 
              : 'bg-gradient-to-br from-violet-50 via-violet-50/50 to-purple-50/30 border-violet-200/50'
            }
          `}>
            <div className="p-5 sm:p-6 relative overflow-hidden">
              {/* Decorative Background Element */}
              <div className={`
                absolute top-0 right-0 opacity-5 transform translate-x-8 -translate-y-4
                transition-transform duration-300 group-hover:translate-x-6 group-hover:-translate-y-2
              `}>
                <Sparkles className={`w-20 h-20 ${isCorrect ? 'text-emerald-600' : 'text-violet-600'}`} />
              </div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className={`
                  p-2 rounded-lg flex-shrink-0 mt-0.5
                  ${isCorrect 
                    ? 'bg-emerald-200/50 text-emerald-700' 
                    : 'bg-violet-200/50 text-violet-700'
                  }
                `}>
                  {isCorrect ? (
                    <Zap className="w-5 h-5" />
                  ) : (
                    <Target className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-bold mb-2 ${
                    isCorrect 
                      ? 'text-emerald-900' 
                      : 'text-violet-900'
                  }`}>
                    {isCorrect ? '🎯 Tiếp tục duy trì!' : '💡 Học từ sai lầm'}
                  </h4>
                  <p className={`text-sm leading-relaxed font-medium ${
                    isCorrect 
                      ? 'text-emerald-800' 
                      : 'text-violet-800'
                  }`}>
                    {isCorrect 
                      ? 'Xuất sắc! Bạn đã nắm vững kiến thức này. Hãy tiếp tục luyện tập để ghi nhớ lâu dài hơn và áp dụng vào các tình huống thực tế.'
                      : 'Mỗi sai lầm là một cơ hội học tập quý giá. Hãy xem lại phần lý thuyết liên quan và luyện tập thêm 3-5 bài tương tự để nắm vững kiến thức.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== COPY BUTTON - PREMIUM INTERACTION ===== */}
          <button
            onClick={copyToClipboard}
            onKeyDown={(e) => e.key === 'Enter' && copyToClipboard()}
            aria-label={isCopied ? 'Giải thích đã được sao chép' : 'Sao chép giải thích'}
            className={`
              w-full flex items-center justify-center gap-3
              py-3 sm:py-4 px-5 rounded-xl font-semibold text-sm sm:text-base
              transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${isCopied
                ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border border-emerald-300/50 shadow-sm focus-visible:ring-emerald-500' 
                : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:shadow-md active:shadow-lg focus-visible:ring-blue-500'
              }
            `}
          >
            {isCopied ? (
              <>
                <Check className="w-5 h-5 animate-bounce" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Sao chép giải thích</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
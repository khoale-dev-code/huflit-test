import React, { useState } from 'react';
import { 
  Lightbulb, ChevronDown, ChevronUp, BookOpen, Brain, 
  CheckCircle2, AlertCircle, Copy, Check, Sparkles, Zap, Target
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const selectedAnswerText = options[userAnswer] || 'Chưa chọn';
  const correctAnswerText = options[correctAnswer] || 'N/A';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(explanation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Format text với **bold** thành HTML
  const renderFormattedText = (text) => {
    if (!text) return null;
    
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return (
          <span 
            key={idx} 
            className="font-bold bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 px-1.5 sm:px-2 py-0.5 rounded-lg inline-block mx-0.5 shadow-sm border border-blue-200/60 text-blue-900 text-xs sm:text-sm"
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
    <div className="w-full my-3 sm:my-4 md:my-6">
      {/* Header Button (Mobile Optimized) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full text-left transition-all duration-500 ease-out 
          rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-5 backdrop-blur-md
          ${isExpanded 
            ? isCorrect 
              ? 'bg-gradient-to-br from-emerald-50/95 via-teal-50/95 to-cyan-50/95 shadow-lg sm:shadow-xl shadow-emerald-200/60 scale-[1.01] sm:scale-[1.02] border-2 border-emerald-200/50' 
              : 'bg-gradient-to-br from-orange-50/95 via-amber-50/95 to-yellow-50/95 shadow-lg sm:shadow-xl shadow-amber-200/60 scale-[1.01] sm:scale-[1.02] border-2 border-amber-200/50'
            : 'bg-white/80 hover:bg-gradient-to-br hover:from-gray-50 hover:to-slate-50 shadow-md hover:shadow-lg border-2 border-gray-100 hover:border-gray-200'
          }
        `}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
            {/* Icon Container (Compact) */}
            <div className={`
              relative p-2 sm:p-2.5 md:p-3.5 rounded-lg sm:rounded-xl flex-shrink-0 transition-all duration-500
              ${isCorrect 
                ? 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500' 
                : 'bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500'
              }
              ${isExpanded ? 'scale-105 sm:scale-110 rotate-12 shadow-lg' : 'scale-100 rotate-0 shadow-md'}
            `}>
              {isCorrect ? (
                <Sparkles className={`w-4 h-4 sm:w-5 md:w-6 text-white transition-all duration-500 ${isExpanded ? 'animate-pulse' : ''}`} />
              ) : (
                <Zap className={`w-4 h-4 sm:w-5 md:w-6 text-white ${isExpanded ? 'animate-bounce' : ''}`} />
              )}
              <div 
                className={`absolute inset-0 rounded-lg sm:rounded-xl blur-lg opacity-40 -z-10 ${
                  isCorrect ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
            </div>
            
            {/* Text Content (Compact) */}
            <div className="flex-1 min-w-0">
              <p className={`
                font-bold text-xs sm:text-sm md:text-lg transition-colors mb-0.5 sm:mb-1.5 line-clamp-1
                ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}
              `}>
                {isCorrect ? '✨ Giải thích' : '⚡ Phân tích lỗi'}
              </p>
              <p className="text-xs text-gray-500 truncate font-medium hidden sm:block">
                {isExpanded ? '👆 Thu gọn' : '👇 Xem chi tiết'}
              </p>
            </div>
          </div>
          
          {/* Chevron Icon */}
          <div className={`
            p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300
            ${isExpanded 
              ? 'bg-white/60 rotate-180 shadow-inner' 
              : 'bg-gray-100/80 shadow-sm hover:bg-gray-200/80'
            }
          `}>
            <ChevronDown className="w-4 h-4 sm:w-5 text-gray-700" />
          </div>
        </div>
      </button>

      {/* Expanded Content (Mobile Optimized) */}
      <div className={`
        overflow-hidden transition-all duration-700 ease-in-out
        ${isExpanded ? 'max-h-[8000px] opacity-100 mt-2 sm:mt-3 md:mt-5' : 'max-h-0 opacity-0 mt-0'}
      `}>
        <div className="space-y-2.5 sm:space-y-3 md:space-y-5">
          
          {/* ========== ANSWER COMPARISON CARD ========== */}
          <div className={`
            rounded-lg sm:rounded-2xl border-2 overflow-hidden backdrop-blur-sm 
            transition-all duration-500 shadow-lg sm:shadow-xl
            ${isCorrect
              ? 'bg-gradient-to-br from-white/90 to-emerald-50/30 border-emerald-300 shadow-emerald-200/50'
              : 'bg-gradient-to-br from-white/90 to-red-50/30 border-red-300 shadow-red-200/50'
            }
          `}>
            {/* Header */}
            <div className={`
              px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4
              ${isCorrect
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
                : 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500'
              }
            `}>
              <h4 className="font-bold text-xs sm:text-sm md:text-base text-white flex items-center gap-1.5 sm:gap-2">
                <AlertCircle className="w-4 h-4 sm:w-5" />
                <span className="line-clamp-1">{isCorrect ? '🎯 Chính xác' : '📊 So sánh'}</span>
              </h4>
            </div>
            
            <div className="p-3 sm:p-4 md:p-6 space-y-2.5 sm:space-y-3 md:space-y-4">
              {/* Your Answer */}
              <div className={`
                rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border-l-4 transition-all duration-300 
                hover:scale-[1.01] hover:shadow-lg
                ${isCorrect
                  ? 'bg-emerald-50/70 border-emerald-500'
                  : 'bg-red-50/70 border-red-500'
                }
              `}>
                <div className="flex items-center gap-1.5 sm:gap-2.5 mb-2 sm:mb-3">
                  <div className={`
                    flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full 
                    font-bold text-xs sm:text-sm shadow-md flex-shrink-0
                    ${isCorrect
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    }
                  `}>
                    <CheckCircle2 className="w-3 h-3 sm:w-4" />
                    {userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : 'N/A'}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-bold">
                    Câu trả lời của bạn
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed pl-2 line-clamp-3">
                  {selectedAnswerText}
                </p>
              </div>

              {/* Correct Answer (if incorrect) */}
              {!isCorrect && (
                <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border-l-4 bg-green-50/70 border-green-500 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                  <div className="flex items-center gap-1.5 sm:gap-2.5 mb-2 sm:mb-3">
                    <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md flex-shrink-0">
                      <Sparkles className="w-3 h-3 sm:w-4" />
                      {String.fromCharCode(65 + correctAnswer)}
                    </div>
                    <span className="text-xs sm:text-sm text-green-700 font-bold">
                      ✅ Đáp án chính xác
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed pl-2 line-clamp-3">
                    {correctAnswerText}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ========== MAIN EXPLANATION CARD ========== */}
          <div className={`
            rounded-lg sm:rounded-2xl border-2 overflow-hidden backdrop-blur-sm 
            shadow-lg sm:shadow-xl transition-all duration-500
            ${isCorrect
              ? 'bg-gradient-to-br from-white/90 to-emerald-50/30 border-emerald-300 shadow-emerald-200/50'
              : 'bg-gradient-to-br from-white/90 to-amber-50/30 border-amber-300 shadow-amber-200/50'
            }
          `}>
            <div className={`
              px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4
              ${isCorrect
                ? 'bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100'
                : 'bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100'
              }
            `}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Brain className={`w-4 h-4 sm:w-5 flex-shrink-0 ${
                  isCorrect ? 'text-emerald-600' : 'text-amber-600'
                }`} />
                <h4 className={`font-bold text-xs sm:text-sm md:text-base ${
                  isCorrect ? 'text-emerald-900' : 'text-amber-900'
                } line-clamp-1`}>
                  💡 Giải thích chi tiết
                </h4>
              </div>
            </div>
            <div className="p-3 sm:p-4 md:p-6">
              <div className="text-gray-800 text-xs sm:text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap break-words space-y-2 sm:space-y-3">
                {renderFormattedText(explanation)}
              </div>
            </div>
          </div>

          {/* ========== TIPS CARD ========== */}
          <div className="rounded-lg sm:rounded-2xl border-2 bg-gradient-to-br from-white/90 to-purple-50/30 border-purple-300 overflow-hidden backdrop-blur-sm shadow-lg sm:shadow-xl shadow-purple-200/50 transition-all duration-500 hover:scale-[1.01]">
            <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-purple-100 via-pink-100 to-fuchsia-100">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Target className="w-4 h-4 sm:w-5 flex-shrink-0 text-purple-600" />
                <h4 className="font-bold text-xs sm:text-sm md:text-base text-purple-900 line-clamp-1">
                  💪 Lời khuyên học tập
                </h4>
              </div>
            </div>
            <div className="p-3 sm:p-4 md:p-6">
              <p className="text-xs sm:text-sm md:text-[15px] text-gray-800 leading-relaxed font-medium">
                {isCorrect 
                  ? '🎉 Bạn đã nắm vững kiến thức này. Hãy tiếp tục luyện tập các câu tương tự để củng cố và ghi nhớ lâu dài hơn.'
                  : '🎯 Mỗi sai lầm là một bài học quý giá. Hãy xem lại phần lý thuyết liên quan, ghi chú những điểm quan trọng, và thử làm thêm 3-5 bài tập tương tự.'}
              </p>
            </div>
          </div>

          {/* ========== COPY BUTTON ========== */}
          <button
            onClick={copyToClipboard}
            className={`
              w-full flex items-center justify-center gap-2 sm:gap-3
              py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 rounded-lg sm:rounded-2xl font-bold text-xs sm:text-sm md:text-base
              transition-all duration-300 transform 
              hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-95 
              shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl
              ${isCopied
                ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-green-300'
                : 'bg-gradient-to-r from-white to-gray-50 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:shadow-gray-300'
              }
            `}
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 sm:w-4 md:w-5 animate-bounce" />
                <span>✅ Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 sm:w-4 md:w-5" />
                <span>📋 Sao chép</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
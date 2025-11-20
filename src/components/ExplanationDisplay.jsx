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

  // Hàm xử lý formatting text với **bold** thành HTML elements
  const renderFormattedText = (text) => {
    if (!text) return null;
    
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return (
          <span 
            key={idx} 
            className="font-bold bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 px-2 py-0.5 rounded-lg inline-block mx-0.5 shadow-sm border border-blue-200/60 text-blue-900"
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
    <div className="w-full my-6">
      {/* Header Button - Glass Morphism Design */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full text-left transition-all duration-500 ease-out 
          rounded-2xl p-5 backdrop-blur-md
          ${isExpanded 
            ? isCorrect 
              ? 'bg-gradient-to-br from-emerald-50/95 via-teal-50/95 to-cyan-50/95 shadow-xl shadow-emerald-200/60 scale-[1.02] border-2 border-emerald-200/50' 
              : 'bg-gradient-to-br from-orange-50/95 via-amber-50/95 to-yellow-50/95 shadow-xl shadow-amber-200/60 scale-[1.02] border-2 border-amber-200/50'
            : 'bg-white/80 hover:bg-gradient-to-br hover:from-gray-50 hover:to-slate-50 shadow-md hover:shadow-lg border-2 border-gray-100 hover:border-gray-200'
          }
        `}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Icon Container với Animation */}
            <div className={`
              relative p-3.5 rounded-xl flex-shrink-0 transition-all duration-500
              ${isCorrect 
                ? 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500' 
                : 'bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500'
              }
              ${isExpanded ? 'scale-110 rotate-12 shadow-lg' : 'scale-100 rotate-0 shadow-md'}
            `}>
              {isCorrect ? (
                <Sparkles className={`w-6 h-6 text-white transition-all duration-500 ${isExpanded ? 'animate-pulse' : ''}`} />
              ) : (
                <Zap className={`w-6 h-6 text-white ${isExpanded ? 'animate-bounce' : ''}`} />
              )}
              {/* Glow Effect */}
              <div 
                className={`absolute inset-0 rounded-xl blur-lg opacity-40 -z-10 ${
                  isCorrect ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
            </div>
            
            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <p className={`
                font-bold text-lg transition-colors mb-1.5
                ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}
              `}>
                {isCorrect ? '✨ Giải thích chi tiết' : '⚡ Phân tích lỗi & Hướng dẫn'}
              </p>
              <p className="text-xs text-gray-500 truncate font-medium">
                {isExpanded ? '👆 Nhấn để thu gọn nội dung' : '👇 Nhấn để xem giải thích đầy đủ'}
              </p>
            </div>
          </div>
          
          {/* Chevron Icon */}
          <div className={`
            p-2.5 rounded-xl transition-all duration-300
            ${isExpanded 
              ? 'bg-white/60 rotate-180 shadow-inner' 
              : 'bg-gray-100/80 shadow-sm hover:bg-gray-200/80'
            }
          `}>
            <ChevronDown className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      </button>

      {/* Expanded Content với Smooth Animation */}
      <div className={`
        overflow-hidden transition-all duration-700 ease-in-out
        ${isExpanded ? 'max-h-[5000px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'}
      `}>
        <div className="space-y-5">
          
          {/* ========== ANSWER COMPARISON CARD ========== */}
          <div className={`
            rounded-2xl border-2 overflow-hidden backdrop-blur-sm 
            transition-all duration-500 shadow-xl
            ${isCorrect
              ? 'bg-gradient-to-br from-white/90 to-emerald-50/30 border-emerald-300 shadow-emerald-200/50'
              : 'bg-gradient-to-br from-white/90 to-red-50/30 border-red-300 shadow-red-200/50'
            }
          `}>
            {/* Header */}
            <div className={`
              px-6 py-4
              ${isCorrect
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
                : 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500'
              }
            `}>
              <h4 className="font-bold text-base text-white flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5" />
                {isCorrect ? '🎯 Câu trả lời chính xác' : '📊 So sánh đáp án'}
              </h4>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Your Answer */}
              <div className={`
                rounded-xl p-5 border-l-4 transition-all duration-300 
                hover:scale-[1.01] hover:shadow-lg
                ${isCorrect
                  ? 'bg-emerald-50/70 border-emerald-500'
                  : 'bg-red-50/70 border-red-500'
                }
              `}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`
                    flex items-center gap-2 px-3.5 py-1.5 rounded-full 
                    font-bold text-sm shadow-md
                    ${isCorrect
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    }
                  `}>
                    <CheckCircle2 className="w-4 h-4" />
                    {userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : 'N/A'}
                  </div>
                  <span className="text-sm text-gray-700 font-bold">
                    Câu trả lời của bạn
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 leading-relaxed pl-2">
                  {selectedAnswerText}
                </p>
              </div>

              {/* Correct Answer (only show if incorrect) */}
              {!isCorrect && (
                <div className="rounded-xl p-5 border-l-4 bg-green-50/70 border-green-500 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md">
                      <Sparkles className="w-4 h-4" />
                      {String.fromCharCode(65 + correctAnswer)}
                    </div>
                    <span className="text-sm text-green-700 font-bold">
                      ✅ Đáp án chính xác
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed pl-2">
                    {correctAnswerText}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ========== MAIN EXPLANATION CARD ========== */}
          <div className={`
            rounded-2xl border-2 overflow-hidden backdrop-blur-sm 
            shadow-xl transition-all duration-500
            ${isCorrect
              ? 'bg-gradient-to-br from-white/90 to-emerald-50/30 border-emerald-300 shadow-emerald-200/50'
              : 'bg-gradient-to-br from-white/90 to-amber-50/30 border-amber-300 shadow-amber-200/50'
            }
          `}>
            <div className={`
              px-6 py-4
              ${isCorrect
                ? 'bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100'
                : 'bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100'
              }
            `}>
              <div className="flex items-center gap-2.5">
                <Brain className={`w-5 h-5 ${
                  isCorrect ? 'text-emerald-600' : 'text-amber-600'
                }`} />
                <h4 className={`font-bold text-base ${
                  isCorrect ? 'text-emerald-900' : 'text-amber-900'
                }`}>
                  💡 Giải thích chi tiết từ giảng viên
                </h4>
              </div>
            </div>
            <div className="p-6">
              <div className="text-gray-800 text-[15px] leading-relaxed whitespace-pre-wrap break-words space-y-3">
                {renderFormattedText(explanation)}
              </div>
            </div>
          </div>

          {/* ========== TIPS CARD ========== */}
          <div className="rounded-2xl border-2 bg-gradient-to-br from-white/90 to-purple-50/30 border-purple-300 overflow-hidden backdrop-blur-sm shadow-xl shadow-purple-200/50 transition-all duration-500 hover:scale-[1.01]">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-100 via-pink-100 to-fuchsia-100">
              <div className="flex items-center gap-2.5">
                <Target className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-base text-purple-900">
                  💪 Lời khuyên học tập
                </h4>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[15px] text-gray-800 leading-relaxed font-medium">
                {isCorrect 
                  ? '🎉    Bạn đã nắm vững kiến thức này. Hãy tiếp tục luyện tập các câu tương tự để củng cố và ghi nhớ lâu dài hơn. Đừng quên ôn tập định kỳ để kiến thức luôn được duy trì!'
                  : '🎯    Mỗi sai lầm là một bài học quý giá. Hãy xem lại phần lý thuyết liên quan, ghi chú những điểm quan trọng, và thử làm thêm 3-5 bài tập tương tự để nắm vững kiến thức này. Bạn sẽ tiến bộ nhanh chóng!'}
              </p>
            </div>
          </div>

          {/* ========== COPY BUTTON ========== */}
          <button
            onClick={copyToClipboard}
            className={`
              w-full flex items-center justify-center gap-3 
              py-4 px-6 rounded-2xl font-bold text-base
              transition-all duration-300 transform 
              hover:scale-[1.02] active:scale-95 
              shadow-lg hover:shadow-xl
              ${isCopied
                ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-green-300'
                : 'bg-gradient-to-r from-white to-gray-50 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:shadow-gray-300'
              }
            `}
          >
            {isCopied ? (
              <>
                <Check className="w-5 h-5 animate-bounce" />
                <span>✅ Đã sao chép thành công!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>📋 Sao chép toàn bộ giải thích</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
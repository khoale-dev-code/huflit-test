import React, { useState } from 'react';
import { 
  Lightbulb, ChevronDown, ChevronUp, Brain, 
  CheckCircle2, XCircle, Copy, Check, Sparkles, Target
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
  const [isExplanationExpanded, setIsExplanationExpanded] = useState(false);

  const selectedAnswerText = options[userAnswer] || 'Chưa chọn';
  const correctAnswerText = options[correctAnswer] || 'N/A';

  const isLongExplanation = explanation && explanation.length > 300;
  const previewLength = 300;
  const displayedExplanation = isExplanationExpanded || !isLongExplanation 
    ? explanation 
    : explanation?.substring(0, previewLength);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(explanation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const renderFormattedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return (
          <span 
            key={idx} 
            className="font-semibold text-blue-700 bg-blue-50/50 px-1.5 py-0.5 rounded text-sm"
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
    <div className="w-full my-6 space-y-4">
      {/* ===== INSIGHT BAR (Header Toggle) ===== */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full text-left transition-all duration-300 ease-out 
          px-5 py-4 rounded-xl
          ${isExpanded 
            ? 'bg-slate-50 border border-slate-200 shadow-soft' 
            : 'bg-white border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-sm'
          }
        `}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Lightbulb className={`w-5 h-5 flex-shrink-0 transition-colors ${
              isCorrect ? 'text-amber-500' : 'text-slate-400'
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                {isCorrect ? 'Giải thích' : 'Phân tích'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
              </p>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className={`
            px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0
            transition-colors
            ${isCorrect 
              ? 'bg-emerald-50 text-emerald-700' 
              : 'bg-rose-50 text-rose-700'
            }
          `}>
            {isCorrect ? '✓ Chính xác' : '✕ Sai'}
          </div>
          
          <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`} />
        </div>
      </button>

      {/* ===== EXPANDED CONTENT ===== */}
      <div className={`
        overflow-hidden transition-all duration-500 ease-in-out
        ${isExpanded ? 'opacity-100' : 'max-h-0 opacity-0 hidden'}
      `}>
        <div className="space-y-4 animate-in fade-in">
          
          {/* ===== COMPARISON BOX ===== */}
          <div className="bg-white border border-slate-100 rounded-xl shadow-soft overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-semibold text-slate-900">So sánh câu trả lời</h3>
            </div>
            
            {/* Content - 2 column layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {/* Your Answer */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`
                    flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0
                    ${isCorrect 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-rose-100 text-rose-700'
                    }
                  `}>
                    {userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : '?'}
                  </div>
                  <span className="text-sm font-medium text-slate-700">Câu trả lời của bạn</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {selectedAnswerText}
                </p>
              </div>

              {/* Correct Answer (if incorrect) */}
              {!isCorrect && (
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex-shrink-0">
                      {String.fromCharCode(65 + correctAnswer)}
                    </div>
                    <span className="text-sm font-medium text-emerald-700">Đáp án đúng</span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {correctAnswerText}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ===== MAIN EXPLANATION CARD ===== */}
          <div className="bg-white border border-slate-100 rounded-xl shadow-soft overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-slate-600" />
                <h3 className="text-sm font-semibold text-slate-900">Giải thích chi tiết</h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="relative">
                <div className={`
                  text-sm leading-relaxed text-slate-800 whitespace-pre-wrap break-words
                  ${isLongExplanation && !isExplanationExpanded 
                    ? 'line-clamp-4 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent bg-clip-text' 
                    : ''
                  }
                `}>
                  {renderFormattedText(displayedExplanation)}
                </div>
                
                {/* Fade out effect for long explanations */}
                {isLongExplanation && !isExplanationExpanded && (
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </div>

              {/* Expand/Collapse button */}
              {isLongExplanation && (
                <button
                  onClick={() => setIsExplanationExpanded(!isExplanationExpanded)}
                  className="mt-5 flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors group"
                >
                  {isExplanationExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>Thu gọn</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>Xem toàn bộ ({explanation.length} ký tự)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* ===== PRO TIP / STICKY NOTE ===== */}
          <div className="bg-violet-50 border border-violet-100 rounded-xl overflow-hidden shadow-soft">
            <div className="p-6 relative">
              {/* Decorative icon in corner */}
              <div className="absolute top-4 right-4 opacity-10">
                <Sparkles className="w-8 h-8 text-violet-600" />
              </div>
              
              <div className="flex items-start gap-3 relative z-10">
                <Target className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-violet-900 mb-2">Lời khuyên</h4>
                  <p className="text-sm text-violet-800 leading-relaxed">
                    {isCorrect 
                      ? 'Bạn đã nắm vững kiến thức này. Tiếp tục luyện tập để ghi nhớ lâu dài hơn.'
                      : 'Mỗi sai lầm là bài học quý giá. Hãy xem lại phần lý thuyết liên quan và luyện tập thêm 3-5 bài tương tự.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== COPY BUTTON (Ghost Style) ===== */}
          <button
            onClick={copyToClipboard}
            className={`
              w-full flex items-center justify-center gap-2
              py-3 px-5 rounded-xl font-medium text-sm
              transition-all duration-200
              ${isCopied
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }
            `}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
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
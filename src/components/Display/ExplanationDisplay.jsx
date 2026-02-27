import React, { useState, useRef, useCallback, useMemo, useEffect, memo } from 'react';
import { 
  Lightbulb, ChevronDown, ChevronUp, Brain, 
  Copy, Check, Sparkles, Target, BookOpen, Zap
} from 'lucide-react';

// Hằng số cấu hình dễ bảo trì
const MAX_PREVIEW_LENGTH = 300;

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
  
  // ===== AUTO-EXPAND LOGIC =====
  // UX: Nếu làm sai, tự động mở giải thích để user học ngay lập tức
  useEffect(() => {
    if (!isCorrect && explanation) {
      setIsExpanded(true);
    }
  }, [isCorrect, explanation]);

  // ===== DERIVED DATA (Memoized) =====
  const selectedAnswerText = useMemo(() => {
    return (userAnswer !== undefined && options[userAnswer]) 
      ? options[userAnswer] 
      : 'Chưa chọn';
  }, [userAnswer, options]);

  const correctAnswerText = useMemo(() => options[correctAnswer] || 'N/A', [correctAnswer, options]);

  const isLongExplanation = useMemo(() => 
    explanation?.length > MAX_PREVIEW_LENGTH, 
  [explanation]);
  
  const displayedExplanation = useMemo(() => {
    if (isExplanationExpanded || !isLongExplanation) return explanation;
    return explanation?.substring(0, MAX_PREVIEW_LENGTH);
  }, [explanation, isExplanationExpanded, isLongExplanation]);

  // ===== HANDLERS WITH FALLBACK COPY =====
  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(explanation);
      } else {
        // Fallback cho môi trường không có HTTPS hoặc browser cũ
        const textArea = document.createElement("textarea");
        textArea.value = explanation;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, [explanation]);

  // ===== FORMATTED TEXT RENDERER (Optimized) =====
  const renderFormattedText = useCallback((text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return (
          <strong 
            key={idx}
            className="font-bold text-blue-600 bg-blue-50/50 px-1.5 py-0.5 rounded transition-colors"
          >
            {boldText}
          </strong>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  }, []);

  if (!explanation) return null;

  return (
    <div className="w-full my-6 space-y-4 animate-in fade-in duration-500">
      {/* HEADER TOGGLE - Loại bỏ State Hover, dùng CSS Group */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full text-left transition-all duration-300 group
          px-4 sm:px-6 py-4 rounded-xl border-2
          ${isExpanded 
            ? 'bg-slate-50 border-blue-200 shadow-sm' 
            : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
          }
        `}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${isCorrect ? 'bg-emerald-100' : 'bg-rose-100'}`}>
              <Lightbulb className={`w-5 h-5 ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {isCorrect ? '✨ Giải thích chi tiết' : '🎯 Phân tích đáp án'}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {isExpanded ? 'Nhấn để thu gọn' : 'Nhấn để mở rộng kiến thức'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className={`hidden sm:flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                isCorrect ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                {isCorrect ? 'Mastered' : 'Review Needed'}
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-500' : ''}`} />
          </div>
        </div>
      </button>

      {/* CONTENT AREA - Sử dụng Max-height animation mượt mà */}
      <div className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isExpanded ? 'max-h-[2000px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
      `}>
        <div className="space-y-4 pb-4">
          
          {/* COMPARISON CARD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-white p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                  {userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : '?'}
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Lựa chọn của bạn</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">{selectedAnswerText}</p>
            </div>

            {!isCorrect && (
              <div className="bg-emerald-50/50 p-5 hover:bg-emerald-50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(65 + correctAnswer)}
                  </div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Đáp án đúng</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">{correctAnswerText}</p>
              </div>
            )}
          </div>

          {/* MAIN EXPLANATION TEXT */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 sm:p-8 shadow-sm group">
            <div className="flex items-center gap-2 mb-6 text-blue-600">
              <Brain className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-tighter">Phân tích chuyên sâu</span>
            </div>
            
            <div className="relative">
              <div className={`text-sm leading-relaxed text-slate-700 transition-all duration-300 ${isLongExplanation && !isExplanationExpanded ? 'line-clamp-[8]' : ''}`}>
                {renderFormattedText(displayedExplanation)}
              </div>
              
              {isLongExplanation && !isExplanationExpanded && (
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>

            {isLongExplanation && (
              <button
                onClick={() => setIsExplanationExpanded(!isExplanationExpanded)}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-bold group/btn"
              >
                {isExplanationExpanded ? (
                  <><ChevronUp className="w-4 h-4" /> Thu gọn</>
                ) : (
                  <><ChevronDown className="w-4 h-4 animate-bounce" /> Xem toàn bộ nội dung</>
                )}
              </button>
            )}
          </div>

          {/* INSIGHT BOX */}
          <div className={`p-5 rounded-xl border-l-4 shadow-sm ${isCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-indigo-50 border-indigo-400'}`}>
            <div className="flex gap-4">
              <div className={`p-2 rounded-lg h-fit ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {isCorrect ? <Zap className="w-5 h-5" /> : <Target className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 mb-1">
                  {isCorrect ? 'TIẾP TỤC PHÁT HUY!' : 'CHIẾN THUẬT CẢI THIỆN'}
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 font-medium">
                  {isCorrect 
                    ? 'Bạn đã làm rất tốt. Hãy chú ý các từ khóa (keywords) trong phần giải thích để áp dụng cho các dạng bài nâng cao hơn.'
                    : 'Đừng quá lo lắng. Hãy note lại cấu trúc ngữ pháp này vào sổ tay. Việc sai ở đây sẽ giúp bạn không bao giờ sai ở kỳ thi thật.'}
                </p>
              </div>
            </div>
          </div>

          {/* COPY ACTION */}
          <button
            onClick={copyToClipboard}
            className={`
              w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm transition-all
              ${isCopied 
                ? 'bg-emerald-600 text-white shadow-lg scale-[1.02]' 
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md active:scale-95'
              }
            `}
          >
            {isCopied ? <><Check className="w-5 h-5" /> Đã lưu vào bộ nhớ</> : <><Copy className="w-5 h-5" /> Sao chép để ghi chú</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ExplanationSection);
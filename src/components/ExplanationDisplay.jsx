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

  if (!explanation) return null;

  const keyPoints = explanation.split('\n').filter(line => line.trim().length > 0);

  return (
    <div className="w-full my-4">
      {/* Modern Collapsible Header với Glass Effect */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-left transition-all duration-500 ease-out rounded-2xl p-4 backdrop-blur-sm ${
          isExpanded 
            ? isCorrect 
              ? 'bg-gradient-to-r from-emerald-50/90 to-teal-50/90 shadow-lg shadow-emerald-100/50 scale-[1.01]' 
              : 'bg-gradient-to-r from-amber-50/90 to-orange-50/90 shadow-lg shadow-amber-100/50 scale-[1.01]'
            : 'bg-white/60 hover:bg-gray-50/80 shadow-sm hover:shadow-md border border-gray-100'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Animated Icon với Gradient Background */}
            <div className={`relative p-3 rounded-xl flex-shrink-0 transition-all duration-500 ${
              isCorrect 
                ? 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500' 
                : 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-400'
            } ${isExpanded ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
              {isCorrect ? (
                <Sparkles className={`w-6 h-6 text-white transition-all duration-500 ${isExpanded ? 'animate-pulse' : ''}`} />
              ) : (
                <Zap className="w-6 h-6 text-white" />
              )}
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-xl blur-md opacity-50 ${
                isCorrect ? 'bg-emerald-400' : 'bg-amber-400'
              }`} style={{ zIndex: -1 }}></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-base transition-colors mb-1 ${
                isCorrect 
                  ? 'text-emerald-700' 
                  : 'text-amber-700'
              }`}>
                {isCorrect ? '✨ Giải thích chi tiết' : '⚡ Phân tích lỗi'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {isExpanded ? 'Thu gọn nội dung' : 'Xem giải thích và phân tích'}
              </p>
            </div>
          </div>
          
          <div className={`p-2 rounded-full transition-all duration-300 ${
            isExpanded ? 'bg-white/50 rotate-180' : 'bg-gray-100'
          }`}>
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </button>

      {/* Expanded Content với Animation mượt mà */}
      <div className={`overflow-hidden transition-all duration-500 ease-out ${
        isExpanded ? 'max-h-[3000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
      }`}>
        <div className="space-y-4">
          
          {/* Answer Comparison Card - Redesigned */}
          <div className={`rounded-2xl border-2 overflow-hidden backdrop-blur-sm transition-all duration-500 ${
            isCorrect
              ? 'bg-white/80 border-emerald-200 shadow-lg shadow-emerald-100/50'
              : 'bg-white/80 border-red-200 shadow-lg shadow-red-100/50'
          }`}>
            {/* Header với Gradient */}
            <div className={`px-5 py-3 ${
              isCorrect
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : 'bg-gradient-to-r from-red-500 to-orange-500'
            }`}>
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {isCorrect ? 'Câu trả lời chính xác' : 'So sánh đáp án'}
              </h4>
            </div>
            
            <div className="p-5 space-y-3">
              {/* Your Answer */}
              <div className={`rounded-xl p-4 border-l-4 transition-all duration-300 hover:scale-[1.02] ${
                isCorrect
                  ? 'bg-emerald-50/50 border-emerald-500 hover:shadow-md'
                  : 'bg-red-50/50 border-red-500 hover:shadow-md'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-sm ${
                    isCorrect
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : 'N/A'}
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">Câu trả lời của bạn</span>
                </div>
                <p className="text-sm font-medium text-gray-800 leading-relaxed pl-1">
                  {selectedAnswerText}
                </p>
              </div>

              {/* Correct Answer */}
              {!isCorrect && (
                <div className="rounded-xl p-4 border-l-4 bg-green-50/50 border-green-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      {String.fromCharCode(65 + correctAnswer)}
                    </div>
                    <span className="text-xs text-green-700 font-semibold">Đáp án chính xác</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed pl-1">
                    {correctAnswerText}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Main Explanation Card */}
          <div className={`rounded-2xl border-2 overflow-hidden backdrop-blur-sm shadow-lg transition-all duration-500 ${
            isCorrect
              ? 'bg-white/80 border-emerald-200 shadow-emerald-100/50'
              : 'bg-white/80 border-amber-200 shadow-amber-100/50'
          }`}>
            <div className={`px-5 py-3 ${
              isCorrect
                ? 'bg-gradient-to-r from-emerald-100 to-teal-100'
                : 'bg-gradient-to-r from-amber-100 to-orange-100'
            }`}>
              <div className="flex items-center gap-2">
                <Brain className={`w-5 h-5 ${
                  isCorrect ? 'text-emerald-600' : 'text-amber-600'
                }`} />
                <h4 className={`font-bold text-sm ${
                  isCorrect ? 'text-emerald-900' : 'text-amber-900'
                }`}>
                  💡 Giải thích chi tiết
                </h4>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
                {explanation}
              </p>
            </div>
          </div>

          {/* Key Points Card */}
          {keyPoints.length > 1 && (
            <div className="rounded-2xl border-2 bg-white/80 border-blue-200 overflow-hidden backdrop-blur-sm shadow-lg shadow-blue-100/50 transition-all duration-500">
              <div className="px-5 py-3 bg-gradient-to-r from-blue-100 to-cyan-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-sm text-blue-900">
                    📌 Điểm quan trọng cần nhớ
                  </h4>
                </div>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  {keyPoints.slice(0, 5).map((point, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex gap-3 items-start group hover:translate-x-1 transition-transform duration-200">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-xs flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed flex-1">{point.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tips Card */}
          <div className="rounded-2xl border-2 bg-white/80 border-purple-200 overflow-hidden backdrop-blur-sm shadow-lg shadow-purple-100/50 transition-all duration-500">
            <div className="px-5 py-3 bg-gradient-to-r from-purple-100 to-pink-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-sm text-purple-900">
                  💪 Lời khuyên từ hệ thống
                </h4>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-700 leading-relaxed">
                {isCorrect 
                  ? '✅ Xuất sắc! Hãy tiếp tục luyện tập các câu tương tự để củng cố kiến thức và ghi nhớ lâu dài hơn.'
                  : '🎯 Đừng lo lắng! Hãy xem lại phần lý thuyết và thử làm thêm các bài tập tương tự để nắm vững kiến thức này.'}
              </p>
            </div>
          </div>

          {/* Copy Button - Modern Design */}
          <button
            onClick={copyToClipboard}
            className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md ${
              isCopied
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-200'
                : 'bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-lg'
            }`}
          >
            {isCopied ? (
              <>
                <Check className="w-5 h-5 animate-bounce" />
                <span>Đã sao chép thành công!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Sao chép toàn bộ giải thích</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
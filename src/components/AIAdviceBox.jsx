import { Sparkles, AlertCircle, Loader, CheckCircle2, Lightbulb } from 'lucide-react';
import { memo } from 'react';

// ─────────────────────────────────────────────
// AIAdviceBox Premium - Beautiful & Responsive
// ─────────────────────────────────────────────

const AIAdviceBox = memo(({ advice, loading, error }) => {
  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border border-blue-200 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Loader className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 animate-spin" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-blue-900">Đang phân tích...</p>
            <p className="text-xs text-blue-700 mt-0.5">AI đang tìm hiểu tại sao bạn nhầm lẫn</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl shadow-lg">
        <div className="flex items-start gap-3 sm:gap-4">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-sm sm:text-base font-bold text-orange-900">Lỗi kết nối</p>
            <p className="text-xs sm:text-sm text-orange-700 mt-1">Vui lòng sử dụng giải thích dưới đây hoặc thử lại sau.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!advice?.message) return null;

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-xl border border-blue-100 bg-white">
      {/* Header with Gradient */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-4 sm:px-6 py-4 sm:py-5">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Header Content */}
        <div className="relative flex items-center gap-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg ring-1 ring-white/30">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">💡 Lời Khuyên Từ AI</h3>
            <p className="text-xs text-white/80">Phân tích chi tiết từ giáo viên thông minh</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-6">
        {/* Message Content */}
        <div className="space-y-3">
          <div className="text-sm sm:text-base leading-relaxed text-slate-700">
            {parseMessage(advice.message)}
          </div>
        </div>

        {/* Tips Section */}
        {advice.tips && advice.tips.length > 0 && (
          <div className="border-t border-blue-100 pt-5 sm:pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Gợi Ý Hữu Ích
                </h4>
              </div>
            </div>

            <div className="space-y-3">
              {advice.tips.map((tip, idx) => (
                <TipItem key={idx} tip={tip} index={idx + 1} total={advice.tips.length} />
              ))}
            </div>
          </div>
        )}

        {/* Encouragement Footer */}
        <div className="pt-4 border-t border-blue-50">
          <p className="text-xs sm:text-sm text-slate-600 italic text-center">
            ✨ Mỗi lỗi sai là một cơ hội để học và tiến bộ. Bạn đang làm rất tốt!
          </p>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// TipItem Component
// ─────────────────────────────────────────────

const TipItem = memo(({ tip, index, total }) => {
  // Tính màu sắc dựa trên index
  const colors = [
    'from-blue-50 to-cyan-50 border-blue-200 hover:from-blue-100 hover:to-cyan-100',
    'from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100',
    'from-emerald-50 to-teal-50 border-emerald-200 hover:from-emerald-100 hover:to-teal-100',
    'from-amber-50 to-orange-50 border-amber-200 hover:from-amber-100 hover:to-orange-100'
  ];
  const colorClass = colors[index % colors.length];

  const icons = ['💡', '🎯', '📌', '⚡'];
  const icon = icons[index % icons.length];

  return (
    <div className={`flex gap-3 p-3 sm:p-4 bg-gradient-to-r ${colorClass} border rounded-lg transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {/* Icon or Number */}
        <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-white shrink-0 text-sm bg-gradient-to-br from-blue-500 to-cyan-500">
          {index}
        </div>
        
        {/* Content */}
        <div className="pt-0.5 min-w-0">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed break-words font-medium">
            {cleanText(tip)}
          </p>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────

function parseMessage(message) {
  if (!message) return null;

  // Split by double newlines to get paragraphs
  const paragraphs = message
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return paragraphs.map((para, idx) => (
    <MessageParagraph key={idx} text={para} />
  ));
}

const MessageParagraph = memo(({ text }) => {
  const cleanedText = cleanText(text);
  
  // List item
  if (/^[-•*\d.]/.test(text.trim())) {
    const cleanItem = cleanedText.replace(/^[-•*\d.)\s]+/, '').trim();
    return (
      <div className="flex gap-3 items-start">
        <span className="text-blue-600 font-bold shrink-0 text-lg pt-0">→</span>
        <span className="break-words text-slate-700">{cleanItem}</span>
      </div>
    );
  }

  // Heading
  if (text.trim().startsWith('#')) {
    const level = text.match(/^#+/)[0].length;
    const content = text.replace(/^#+\s*/, '').trim();
    const cleanedContent = cleanText(content);
    
    if (level === 1) {
      return <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-3 first:mt-0">{cleanedContent}</h4>;
    } else if (level === 2) {
      return <h5 className="text-sm sm:text-base font-semibold text-slate-800 mt-2 first:mt-0">{cleanedContent}</h5>;
    }
  }

  // Regular paragraph
  return (
    <p className="text-slate-700 break-words leading-relaxed">
      {cleanedText}
    </p>
  );
});

function cleanText(text) {
  if (!text) return '';

  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '$1')
    // Italic
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    // Code
    .replace(/`(.+?)`/g, '$1')
    // List markers
    .replace(/^[-•*\d.)\s]+/, '')
    .trim();
}

AIAdviceBox.displayName = 'AIAdviceBox';
TipItem.displayName = 'TipItem';
MessageParagraph.displayName = 'MessageParagraph';

export default AIAdviceBox;
import { Sparkles, AlertCircle, Loader, Lightbulb, Brain } from 'lucide-react';
import { memo } from 'react';
import { motion } from 'framer-motion';

/* ── Render inline markdown: **bold**, *italic*, `code` ── */
function renderInline(text) {
  if (!text) return null;
  const parts = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;
  let last = 0, m;
  
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    
    // Bold -> Highlight Pill
    if (m[1] !== undefined)
      parts.push(
        <strong key={m.index} className="font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border-b border-blue-200 mx-0.5">
          {m[1]}
        </strong>
      );
    // Italic
    else if (m[2] !== undefined)
      parts.push(
        <em key={m.index} className="font-medium italic text-gray-500">
          {m[2]}
        </em>
      );
    // Code
    else if (m[3] !== undefined)
      parts.push(
        <code key={m.index} className="font-mono font-bold text-xs bg-gray-100 border border-gray-200 rounded-md px-1.5 py-0.5 text-rose-600 mx-0.5">
          {m[3]}
        </code>
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/* ── Strip markdown to plain text ── */
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1').replace(/`(.+?)`/g, '$1')
    .replace(/^[-•*\d.)\s]+/, '').trim();
}

/* ── Paragraph renderer ── */
const MessageParagraph = memo(({ text }) => {
  const trimmed = text.trim();

  // List item
  if (/^[-•*]|\d+[.)]\s/.test(trimmed)) {
    const content = trimmed.replace(/^[-•*\d.)\s]+/, '').trim();
    return (
      <div className="flex items-start gap-2 mb-2">
        <div className="w-1 h-1 rounded-full bg-purple-500 mt-2.5 shrink-0" />
        <span className="font-sans font-medium text-sm md:text-base text-gray-700 leading-relaxed break-words">
          {renderInline(content)}
        </span>
      </div>
    );
  }

  // Heading
  if (trimmed.startsWith('#')) {
    const level = trimmed.match(/^#+/)[0].length;
    const content = trimmed.replace(/^#+\s*/, '');
    return (
      <p className={`font-sans font-bold text-gray-900 mt-3 mb-2 ${level === 1 ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
        {renderInline(content)}
      </p>
    );
  }

  // Regular paragraph
  return (
    <p className="font-sans font-medium text-sm md:text-base text-gray-700 leading-relaxed mb-2 break-words">
      {renderInline(trimmed)}
    </p>
  );
});

function parseMessage(message) {
  if (!message) return null;
  return message
    .split(/\n\n+/).map(p => p.trim()).filter(Boolean)
    .map((para, idx) => <MessageParagraph key={idx} text={para} />);
}

/* ── Tip item ── */
const TIP_THEMES = [
  { bg: 'bg-blue-50', border: 'border-blue-200', numBg: 'bg-blue-500' },
  { bg: 'bg-purple-50', border: 'border-purple-200', numBg: 'bg-purple-500' },
  { bg: 'bg-green-50', border: 'border-green-200', numBg: 'bg-green-500' },
  { bg: 'bg-amber-50', border: 'border-amber-200', numBg: 'bg-amber-500' },
];

const TipItem = memo(({ tip, index }) => {
  const theme = TIP_THEMES[(index - 1) % TIP_THEMES.length];
  return (
    <div className={`flex items-start gap-2.5 p-3 rounded-lg border mb-2 transition-transform hover:shadow-sm ${theme.bg} ${theme.border}`}>
      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-white font-bold text-xs ${theme.numBg}`}>
        {index}
      </div>
      <p className="font-sans font-medium text-xs md:text-sm text-gray-700 leading-relaxed pt-0.5">
        {cleanText(tip)}
      </p>
    </div>
  );
});

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const AIAdviceBox = memo(({ advice, loading, error }) => {

  /* ── Loading State ── */
  if (loading) return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-3 md:p-4 bg-purple-50 border border-purple-200 rounded-lg mb-5"
    >
      <div className="w-8 h-8 rounded-lg bg-white border border-purple-200 flex items-center justify-center shrink-0">
        <Loader size={18} className="text-purple-500 animate-spin" strokeWidth={2.5} />
      </div>
      <div>
        <p className="font-sans font-bold text-sm text-purple-700">Đang phân tích...</p>
        <p className="font-sans font-medium text-xs text-purple-600">AI Mentor đang tìm hiểu lỗi sai của bạn</p>
      </div>
    </motion.div>
  );

  /* ── Error State ── */
  if (error) return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2.5 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg mb-5"
    >
      <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center shrink-0 text-white flex-shrink-0 mt-0.5">
        <AlertCircle size={16} strokeWidth={2} />
      </div>
      <div>
        <p className="font-sans font-bold text-sm text-red-700">Mất kết nối với Mentor</p>
        <p className="font-sans font-medium text-xs text-red-600 mt-0.5">
          Vui lòng đọc giải thích bên dưới hoặc thử lại sau!
        </p>
      </div>
    </motion.div>
  );

  if (!advice?.message) return null;

  /* ── Success State ── */
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs mb-5 font-sans"
      style={{ fontFamily: '-apple-system, "Segoe UI", "Roboto", sans-serif' }}
    >
      {/* ── Header ── */}
      <div className="relative bg-amber-500 px-4 md:px-5 py-3 md:py-4 overflow-hidden">
        {/* Sparkle Decorations */}
        <Sparkles className="absolute top-1 right-3 text-white/20 w-8 h-8" />
        <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white/10 rounded-full blur-lg" />
        
        <div className="relative flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <Brain size={18} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm md:text-base text-white leading-tight mb-0.5">
              Lời Khuyên Từ AI Mentor
            </h3>
            <p className="font-sans font-medium text-xs text-white/85">
              Phân tích cá nhân hóa
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-4 md:p-5 flex flex-col gap-3">

        {/* Message Content */}
        <div className="flex flex-col">
          {parseMessage(advice.message)}
        </div>

        {/* Tips Section */}
        {advice.tips?.length > 0 && (
          <div className="pt-3 mt-2 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 bg-amber-400 rounded-md">
                <Lightbulb size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-sans font-bold text-xs md:text-sm text-gray-800 uppercase tracking-wide">
                Gợi ý hữu ích
              </span>
            </div>
            
            <div className="flex flex-col">
              {advice.tips.map((tip, idx) => (
                <TipItem key={idx} tip={tip} index={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Encouragement Footer */}
        {advice.tips?.length > 0 && (
          <div className="mt-1 pt-3 border-t border-gray-200 flex justify-center">
            <p className="font-sans font-medium text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
              ✨ Mỗi lỗi là cơ hội để cải thiện!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

AIAdviceBox.displayName = 'AIAdviceBox';
TipItem.displayName = 'TipItem';
MessageParagraph.displayName = 'MessageParagraph';

export default AIAdviceBox;
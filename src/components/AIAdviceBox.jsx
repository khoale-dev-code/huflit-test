// src/components/Display/Result/AIAdviceBox.jsx
import { Sparkles, AlertCircle, Loader2, Lightbulb, Brain } from 'lucide-react';
import { memo } from 'react';
import { motion as Motion } from 'framer-motion';

/* ── Render inline markdown: **bold**, *italic*, `code` (Gamified Style) ── */
function renderInline(text) {
  if (!text) return null;
  const parts = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;
  let last = 0, m;
  
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    
    // Bold -> Highlight Pill (Gamified)
    if (m[1] !== undefined)
      parts.push(
        <strong key={m.index} className="font-display font-black text-hub-blue-dark bg-hub-blue-bg border-2 border-hub-blue-border px-2 py-0.5 rounded-[8px] mx-1 shadow-sm whitespace-nowrap">
          {m[1]}
        </strong>
      );
    // Italic
    else if (m[2] !== undefined)
      parts.push(
        <em key={m.index} className="font-body font-bold italic text-slate-500 mx-0.5">
          {m[2]}
        </em>
      );
    // Code
    else if (m[3] !== undefined)
      parts.push(
        <code key={m.index} className="font-mono font-bold text-[13px] bg-hub-red-bg border-2 border-hub-red-border text-hub-red-dark rounded-[6px] px-1.5 py-0.5 mx-0.5">
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
      <div className="flex items-start gap-2.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-hub-purple mt-2 shrink-0 shadow-sm" />
        <span className="font-body font-bold text-[14px] sm:text-[15px] text-slate-700 leading-relaxed break-words">
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
      <p className={`font-display font-black text-slate-800 mt-4 mb-2 ${level === 1 ? 'text-[18px] sm:text-[20px]' : 'text-[16px] sm:text-[18px]'}`}>
        {renderInline(content)}
      </p>
    );
  }

  // Regular paragraph
  return (
    <p className="font-body font-bold text-[14px] sm:text-[15px] text-slate-700 leading-relaxed mb-3 break-words">
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

/* ── Tip item (Multi-color 3D Cards) ── */
const TIP_THEMES = [
  { bg: 'bg-hub-blue-bg', border: 'border-hub-blue-border', numBg: 'bg-hub-blue', text: 'text-hub-blue-dark' },
  { bg: 'bg-hub-purple-bg', border: 'border-hub-purple-border', numBg: 'bg-hub-purple', text: 'text-hub-purple-dark' },
  { bg: 'bg-hub-green-bg', border: 'border-hub-green-border', numBg: 'bg-hub-green', text: 'text-hub-green-dark' },
  { bg: 'bg-hub-yellow-bg', border: 'border-hub-yellow-border', numBg: 'bg-hub-yellow', text: 'text-hub-yellow-dark' },
];

const TipItem = memo(({ tip, index }) => {
  const theme = TIP_THEMES[(index - 1) % TIP_THEMES.length];
  return (
    <div className={`flex items-start gap-3 p-3 sm:p-4 rounded-[16px] border-2 border-b-[4px] mb-3 transition-transform hover:-translate-y-1 ${theme.bg} ${theme.border}`}>
      <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 text-white font-display font-black text-[15px] border-b-[3px] border-black/10 shadow-sm ${theme.numBg}`}>
        {index}
      </div>
      <p className="font-body font-bold text-[14px] sm:text-[15px] text-slate-700 leading-relaxed pt-1">
        {cleanText(tip)}
      </p>
    </div>
  );
});

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const AIAdviceBox = memo(({ advice, loading, error }) => {

  /* ── Loading State (Gamified) ── */
  if (loading) return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 sm:p-5 bg-hub-purple-bg border-2 border-hub-purple-border border-b-[6px] rounded-[24px] mb-6 shadow-sm"
    >
      <div className="w-12 h-12 rounded-[14px] bg-white border-2 border-hub-purple-border border-b-[4px] flex items-center justify-center shrink-0 shadow-sm">
        <Loader2 size={24} className="text-hub-purple animate-spin" strokeWidth={3} />
      </div>
      <div>
        <p className="font-display font-black text-[16px] text-hub-purple-dark leading-none mb-1">Đang phân tích...</p>
        <p className="font-body font-bold text-[13px] text-hub-purple-dark/80">AI Mentor đang tìm hiểu lỗi sai của bạn</p>
      </div>
    </motion.div>
  );

  /* ── Error State (Gamified) ── */
  if (error) return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 p-4 sm:p-5 bg-hub-red-bg border-2 border-hub-red-border border-b-[6px] rounded-[24px] mb-6 shadow-sm"
    >
      <div className="w-12 h-12 rounded-[14px] bg-hub-red border-2 border-hub-red-dark border-b-[4px] flex items-center justify-center shrink-0 text-white mt-0.5 shadow-sm">
        <AlertCircle size={24} strokeWidth={2.5} />
      </div>
      <div>
        <p className="font-display font-black text-[16px] text-hub-red-dark leading-none mb-1">Mất kết nối với Mentor</p>
        <p className="font-body font-bold text-[13px] text-hub-red-dark/80 leading-snug">
          Vui lòng đọc giải thích mặc định bên dưới hoặc thử lại sau nhé!
        </p>
      </div>
    </motion.div>
  );

  if (!advice?.message) return null;

  /* ── Success State (Main AI Box) ── */
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.98 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="bg-white border-2 border-slate-200 border-b-[8px] rounded-[28px] overflow-hidden shadow-sm mb-6 font-sans w-full"
    >
      {/* ── Header ── */}
      <div className="relative bg-hub-yellow border-b-2 border-hub-yellow-dark px-5 py-4 overflow-hidden">
        {/* Sparkle Decorations */}
        <Sparkles className="absolute top-2 right-4 text-white/30 w-10 h-10 animate-pulse-custom" strokeWidth={2} />
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl" />
        
        <div className="relative flex items-center gap-3.5 z-10">
          <div className="w-12 h-12 rounded-[14px] bg-white/20 border-2 border-white/40 flex items-center justify-center shrink-0 backdrop-blur-sm shadow-inner">
            <Brain size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display font-black text-[18px] sm:text-[20px] text-white leading-none mb-1 tracking-wide" style={{ textShadow: '0 2px 4px rgba(217, 166, 0, 0.5)' }}>
              Lời Khuyên Từ AI Mentor
            </h3>
            <p className="font-body font-bold text-[13px] text-hub-yellow-dark bg-white/90 px-2 py-0.5 rounded-md inline-block shadow-sm">
              ✨ Phân tích cá nhân hóa
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-5 sm:p-7 flex flex-col gap-4">

        {/* Message Content */}
        <div className="flex flex-col">
          {parseMessage(advice.message)}
        </div>

        {/* Tips Section */}
        {advice.tips?.length > 0 && (
          <div className="pt-5 mt-2 border-t-2 border-slate-100">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 bg-hub-yellow rounded-[10px] border-b-[3px] border-hub-yellow-dark shadow-sm">
                <Lightbulb size={16} className="text-white" strokeWidth={3} />
              </div>
              <span className="font-display font-black text-[15px] sm:text-[17px] text-slate-800 uppercase tracking-widest pt-0.5">
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
          <div className="mt-2 pt-4 border-t-2 border-slate-100 flex justify-center">
            <p className="font-display font-black text-[13px] sm:text-[14px] text-slate-400 bg-slate-100 px-4 py-2 rounded-[12px] uppercase tracking-wider">
              ✨ Mỗi lỗi sai là một bài học mới!
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
// src/components/Display/Result/AIAdviceBox.jsx
import { Sparkles, AlertCircle, Brain, Lightbulb, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { memo, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

/* ── Render inline markdown: **bold**, *italic*, `code` ── */
function renderInline(text) {
  if (!text) return null;
  const parts = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;
  let last = 0, m;
  
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    
    // Bold -> Bút dạ quang (Chữ đen, nền vàng nhạt, viền dưới cam) -> Độ tương phản TUYỆT ĐỐI
    if (m[1] !== undefined)
      parts.push(
        <strong key={m.index} className="font-display font-black text-slate-800 bg-[#FFFBEA] border-b-[3px] border-[#FFD8A8] px-2 py-0.5 rounded-lg mx-1 whitespace-nowrap">
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
        <code key={m.index} className="font-mono font-bold text-[14px] bg-[#F1F5F9] border-2 border-slate-200 text-[#FF4B4B] rounded-[8px] px-2 py-0.5 mx-0.5 shadow-sm">
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
      <div className="flex items-start gap-3 mb-4 pl-1">
        <div className="w-2 h-2 rounded-full bg-[#A855F7] mt-2.5 shrink-0" />
        <span className="font-body font-bold text-[15px] sm:text-[16px] text-slate-700 leading-relaxed break-words">
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
      <h4 className={`font-display font-black text-slate-800 mt-6 mb-3 leading-snug ${level === 1 ? 'text-[20px] sm:text-[22px]' : 'text-[18px] sm:text-[20px]'}`}>
        {renderInline(content)}
      </h4>
    );
  }

  // Regular paragraph
  return (
    <p className="font-body font-bold text-[15px] sm:text-[16px] text-slate-700 leading-relaxed mb-4 break-words">
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

/* ── Tip item (Mảng Icon nhiều màu, nền luôn Trắng) ── */
const TIP_COLORS = [
  { bg: 'bg-[#1CB0F6]', border: 'border-[#1899D6]' }, // Xanh dương
  { bg: 'bg-[#CE82FF]', border: 'border-[#B975E5]' }, // Tím
  { bg: 'bg-[#58CC02]', border: 'border-[#46A302]' }, // Xanh lá
  { bg: 'bg-[#FF9600]', border: 'border-[#E58700]' }, // Cam
];

const TipItem = memo(({ tip, index }) => {
  const color = TIP_COLORS[(index - 1) % TIP_COLORS.length];
  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] mb-4 transition-transform hover:-translate-y-1 shadow-sm">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white font-display font-black text-[18px] border-b-[4px] shadow-sm ${color.bg} ${color.border}`}>
        {index}
      </div>
      <p className="font-body font-bold text-[14px] sm:text-[16px] text-slate-700 leading-relaxed pt-1.5 flex-1">
        {cleanText(tip)}
      </p>
    </div>
  );
});

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const AIAdviceBox = memo(({ advice, loading, error }) => {
  const [feedback, setFeedback] = useState(null);

  /* ── Loading State ── */
  if (loading) return (
    <Motion.div 
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-slate-200 border-b-[8px] rounded-[32px] overflow-hidden shadow-sm mb-8 w-full"
    >
      <div className="bg-slate-50 border-b-2 border-slate-100 px-6 py-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-200 animate-pulse shrink-0" />
        <div className="space-y-3 flex-1">
          <div className="h-5 w-48 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-3 w-32 bg-slate-200 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="p-8 space-y-4">
        <div className="h-4 w-full bg-slate-100 rounded-full animate-pulse" />
        <div className="h-4 w-5/6 bg-slate-100 rounded-full animate-pulse" />
        <div className="h-4 w-4/6 bg-slate-100 rounded-full animate-pulse" />
        <div className="mt-8 h-[100px] w-full bg-slate-50 border-2 border-slate-100 rounded-[24px] animate-pulse" />
      </div>
    </Motion.div>
  );

  /* ── Error State ── */
  if (error) return (
    <Motion.div 
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-5 p-6 bg-white border-2 border-slate-200 border-b-[6px] rounded-[28px] mb-8 shadow-sm"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#FFF0F0] border-2 border-[#ffc1c1] border-b-[4px] flex items-center justify-center shrink-0 text-[#FF4B4B] shadow-sm">
        <AlertCircle size={28} strokeWidth={3} />
      </div>
      <div>
        <p className="font-display font-black text-[18px] text-slate-800 leading-none mb-2">Trợ lý AI đang ngủ gật!</p>
        <p className="font-body font-bold text-[14px] text-slate-500 leading-snug">
          Không thể kết nối để lấy lời khuyên. Vui lòng đọc giải thích mặc định hoặc thử lại sau nhé.
        </p>
      </div>
    </Motion.div>
  );

  if (!advice?.message) return null;

  /* ── Success State (Main AI Box) ── */
  return (
    <Motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.98 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="bg-white border-2 border-slate-200 border-b-[8px] rounded-[32px] overflow-hidden shadow-sm mb-8 font-sans w-full"
    >
      {/* ── Header AI (Gradient Tím Phép Thuật, Chữ Trắng) ── */}
      <div className="relative bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] border-b-2 border-[#7C3AED] px-6 py-6 overflow-hidden">
        <Sparkles className="absolute top-4 right-6 text-white/30 w-14 h-14 animate-pulse" strokeWidth={2} />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
        
        <div className="relative flex items-center gap-5 z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center shrink-0 backdrop-blur-md shadow-inner">
            <Brain size={32} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display font-black text-[22px] sm:text-[24px] text-white leading-tight mb-2">
              Phân Tích Của AI
            </h3>
            <span className="font-display font-black text-[11px] uppercase tracking-widest text-[#A855F7] bg-white px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles size={14} /> Dành riêng cho bạn
            </span>
          </div>
        </div>
      </div>

      {/* ── Body (Nền Trắng - Chữ Đậm) ── */}
      <div className="p-6 sm:p-8 flex flex-col gap-2">
        
        {/* Nội dung giải thích */}
        <div className="flex flex-col">
          {parseMessage(advice.message)}
        </div>

        {/* Gợi ý (Tips) */}
        {advice.tips?.length > 0 && (
          <div className="pt-8 mt-4 border-t-2 border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FFFBEA] flex items-center justify-center rounded-xl border-2 border-[#FFD8A8] border-b-[4px] shadow-sm">
                <Lightbulb size={22} className="text-[#FF9600]" strokeWidth={3} />
              </div>
              <span className="font-display font-black text-[18px] text-slate-800 uppercase tracking-widest pt-1">
                Bỏ túi mẹo sau
              </span>
            </div>
            
            <div className="flex flex-col bg-slate-50/50 p-4 sm:p-6 rounded-[28px] border-2 border-slate-100">
              {advice.tips.map((tip, idx) => (
                <TipItem key={idx} tip={tip} index={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* ── Action: Interactive Feedback ── */}
        <div className="mt-8 pt-8 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="font-display font-black text-[14px] text-slate-500 uppercase tracking-widest">
            {feedback ? 'Cảm ơn phản hồi của bạn!' : 'Lời khuyên này có ích không?'}
          </p>
          
          <AnimatePresence mode="wait">
            {!feedback ? (
              <Motion.div 
                key="buttons"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 w-full sm:w-auto"
              >
                <button 
                  onClick={() => setFeedback('helpful')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-500 border-2 border-slate-200 border-b-[4px] rounded-2xl font-black text-[14px] uppercase tracking-wider hover:bg-[#F0FAE8] hover:text-[#58CC02] hover:border-[#bcf096] active:border-b-2 active:translate-y-[2px] transition-all outline-none"
                >
                  <ThumbsUp size={18} strokeWidth={3} /> Có
                </button>
                <button 
                  onClick={() => setFeedback('unhelpful')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-500 border-2 border-slate-200 border-b-[4px] rounded-2xl font-black text-[14px] uppercase tracking-wider hover:bg-[#FFF0F0] hover:text-[#FF4B4B] hover:border-[#ffc1c1] active:border-b-2 active:translate-y-[2px] transition-all outline-none"
                >
                  <ThumbsDown size={18} strokeWidth={3} /> Không
                </button>
              </Motion.div>
            ) : (
              <Motion.div 
                key="thanks"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-[#EAF6FE] text-[#1CB0F6] border-2 border-[#BAE3FB] rounded-2xl font-black text-[14px] uppercase tracking-wider shadow-sm w-full sm:w-auto justify-center"
              >
                <CheckCircle2 size={20} strokeWidth={3} /> Đã ghi nhận
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </Motion.div>
  );
});

AIAdviceBox.displayName = 'AIAdviceBox';
TipItem.displayName = 'TipItem';
MessageParagraph.displayName = 'MessageParagraph';

export default AIAdviceBox;
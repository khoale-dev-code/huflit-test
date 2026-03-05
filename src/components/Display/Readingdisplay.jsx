/*
 * ReadingDisplay.jsx  —  M3 × Academic Editorial × Tailwind
 *
 * Tinh chỉnh UI/UX bởi Chuyên gia:
 * - Refined Color Palette: Kem ấm hơn, Navy/Amber sang trọng.
 * - Material 3 Transition: Hiệu ứng entrance scale nhẹ, mượt mà.
 * - Full Prose Mode: Loại bỏ Show all/less ở Part Plain.
 * - Mobile First Typography: Đã được tối ưu từ phiên bản trước.
 */

import React, { useState, useMemo, memo } from 'react';
import {
  ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap,
  Mail, Globe, Clock, MessageCircle, FileText,
} from 'lucide-react';

/* ── Google Fonts (inject once) ─────────────────────────── */
let fontsInjected = false;
function injectFonts() {
  if (fontsInjected || typeof document === 'undefined') return;
  const link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400&family=DM+Sans:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
  fontsInjected = true;
}

/* ── Shared Tailwind class strings (Academic Style) ─────── */
// Tinh chỉnh nền kem ấm hơn và viền mờ hơn
const CARD   = 'bg-[#FDFCFB] rounded-xl md:rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm';
const PROSE  = 'font-serif text-[15px] md:text-[17px] leading-[1.8] md:leading-[1.9] text-slate-800 tracking-[0.01em]';
const LABEL  = 'font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em]';
const META   = 'font-sans text-[11px] md:text-[12px] text-slate-500';

/* ── Smoother Material entrance animation ────────────────── */
const entryEffect = (delay = 0) => ({
  animation: `mdEntry 0.4s cubic-bezier(0.05, 0.7, 0.1, 1.0) both`,
  animationDelay: `${delay}ms`,
});

/* Inject keyframe once */
let kfInjected = false;
function injectKeyframes() {
  if (kfInjected || typeof document === 'undefined') return;
  const s = document.createElement('style');
  s.textContent = `
    @keyframes mdEntry {
      from { opacity:0; transform: scale(0.97); }
      to   { opacity:1; transform: scale(1); }
    }
    .rd-scrollbar::-webkit-scrollbar { width: 3px; }
    .rd-scrollbar::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:3px; }
    .rd-scrollbar::-webkit-scrollbar-track { background:transparent; }
    /* Giảm mệt mỏi mắt bằng cách làm mịn chữ trên một số trình duyệt */
    body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  `;
  document.head.appendChild(s);
  kfInjected = true;
}

/* ── Chip / Badge ─────────────────────────────────────── */
const Chip = ({ icon: Icon, label, colorClass = 'bg-blue-50 text-blue-800' }) => (
  <span className={`inline-flex items-center gap-1 md:gap-1.5 px-2.5 py-1 rounded-full font-sans text-[10px] md:text-[11px] font-semibold border border-blue-100 ${colorClass}`}>
    {Icon && <Icon size={12} className="md:w-3 md:h-3 w-2.5 h-2.5" />}
    {label}
  </span>
);

/* ─────────────────────────────────────────────────────────
   PART 6 — Text Completion
   ───────────────────────────────────────────────────────── */
const Part6Content = memo(({ data }) => {
  const [open, setOpen] = useState(true);

  const segments = useMemo(() => {
    if (!data?.text) return [];
    let display = data.text;
    (data.questions || [])
      .filter(q => q.type === 'fill')
      .forEach(q => { display = display.replace(`(${q.id})`, `%%${q.id}%%`); });
    return display.split(/%%(\d+)%%/);
  }, [data]);

  if (!data?.text) return null;

  return (
    <div className={CARD}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 md:px-6 py-3.5 md:py-4 bg-slate-50/50 hover:bg-slate-100/70 transition-colors border-b border-slate-200/50 active:bg-slate-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-[#1E3A5F] flex items-center justify-center flex-shrink-0 shadow">
            <span className="font-sans font-black text-white text-[14px] md:text-[15px]">6</span>
          </div>
          <div className="text-left">
            <p className="font-sans font-bold text-[14px] md:text-[15px] text-slate-950 leading-tight">
              {data.title || 'Text Completion'}
            </p>
            {data.description && (
              <p className="font-sans text-[11px] md:text-[12px] text-slate-500 mt-1 leading-none line-clamp-1">{data.description}</p>
            )}
          </div>
        </div>
        {open
          ? <ChevronUp size={18} className="text-slate-400 flex-shrink-0" />
          : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />}
      </button>

      {open && (
        <div className="p-5 md:p-6 space-y-4 md:space-y-5" style={entryEffect(0)}>
          <div
            className="rounded-xl border border-[#FDE68A]/60 bg-[#FFFDF7]/60 px-5 md:px-7 py-5 md:py-6"
            style={{ background: 'linear-gradient(135deg, #FFFCF5 0%, #FFF8E6 100%)' }}
          >
            {/* Tinh chỉnh màu amber sang trọng hơn */}
            <div className="h-0.5 w-10 md:w-12 bg-[#B45309] rounded-full mb-4 md:mb-5 opacity-80" />

            <p className={`${PROSE} leading-[2.1] md:leading-[2.2]`}>
              {segments.map((seg, i) =>
                i % 2 === 0
                  ? <span key={i}>{seg}</span>
                  : (
                    <span
                      key={i}
                      className="inline-flex items-center justify-center mx-1 px-3 py-0.5 rounded-md font-sans font-bold text-[12px] md:text-[13px] text-[#92400E] bg-[#FEF3C7] border border-[#FDE68A] cursor-default select-none shadow-sm"
                      style={{ minWidth: 40 }}
                    >
                      ({seg})
                    </span>
                  )
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="flex items-start gap-3.5 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <Zap size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`${LABEL} text-slate-900 mb-1`}>Instructions</p>
                <p className="font-sans text-[12px] text-slate-700 leading-snug">Choose A–D for each numbered blank.</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 px-4 py-3.5 rounded-xl bg-[#FFFDF7] border border-[#FDE68A]/70">
              <Lightbulb size={16} className="text-[#B45309] flex-shrink-0 mt-0.5" />
              <div>
                <p className={`${LABEL} text-[#92400E] mb-1`}>Pro Tip</p>
                <p className="font-sans text-[12px] text-[#92400E]/90 leading-snug">Read the full passage before choosing.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
Part6Content.displayName = 'Part6Content';

/* ─────────────────────────────────────────────────────────
   PART 7 — Website + Email
   ───────────────────────────────────────────────────────── */
const Part7Content = memo(({ data }) => {
  const parsed = useMemo(() => {
    const text     = data?.text || '';
    const sections = text.split('---');
    const webLines = sections[0]?.trim().split('\n').filter(Boolean) || [];

    let email = null;
    if (sections[1]) {
      const lines   = sections[1].trim().split('\n');
      const headers = {};
      const body    = [];
      let inBody    = false;

      lines.forEach(raw => {
        const line = raw.trim();
        if (!line) { if (inBody) body.push(''); return; }
        if (line.startsWith('To:'))      { headers.to      = line.slice(3).trim();  return; }
        if (line.startsWith('From:'))    { headers.from    = line.slice(5).trim();  return; }
        if (line.startsWith('Date:'))    { headers.date    = line.slice(5).trim();  return; }
        if (line.startsWith('Subject:')) { headers.subject = line.slice(8).trim();  inBody = true; return; }
        if (inBody) body.push(line);
      });

      email = {
        headers,
        body: body.filter((l, i, a) => !(l === '' && a[i - 1] === '')),
      };
    }

    const url   = webLines.find(l => l.startsWith('http')) || 'https://example.com';
    const title = webLines.find(l => l.includes('**'))?.replace(/\*\*/g, '');
    const body  = webLines.filter(l => l && !l.startsWith('http') && !l.includes('**'));

    return { url, title, body, email };
  }, [data]);

  const { url, title, body, email } = parsed;

  return (
    <div className="space-y-5">
      {(title || body.length > 0) && (
        <div className={CARD} style={entryEffect(0)}>
          {/* Browser chrome */}
          <div className="flex items-center gap-2 md:gap-3 px-4 py-2.5 bg-slate-100/70 border-b border-slate-200/50">
            <div className="flex gap-1.5 hidden md:flex">
              {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
                <div key={i} style={{ background: c }} className="w-2.5 h-2.5 rounded-full shadow-sm opacity-90" />
              ))}
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white/80 rounded-lg px-3 py-1.5 border border-slate-200/50 max-w-full md:max-w-sm">
              <Globe size={12} className="text-slate-400 flex-shrink-0" />
              <span className="font-sans text-[11px] text-slate-500 truncate">{url}</span>
            </div>
          </div>

          {/* Website body */}
          <div className="px-5 md:px-8 py-6 md:py-8">
            <div className="h-0.5 w-12 md:w-16 bg-[#1E3A5F] rounded-full mb-5 opacity-90" />
            {title && (
              <h2
                className="text-xl md:text-[24px] font-bold text-slate-950 mb-5 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {title}
              </h2>
            )}
            <div className="space-y-4">
              {body.map((line, i) => (
                <p key={i} className={PROSE} style={entryEffect(i * 30)}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {email && (
        <div className={CARD} style={entryEffect(60)}>
          {/* Email header strip */}
          <div
            className="px-5 md:px-6 py-4 md:py-5 border-b border-[#1E3A5F]/20"
            style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #294D7A 100%)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Mail size={14} className="text-blue-200" />
              <span className={`${LABEL} text-blue-200`}>Internal Email</span>
            </div>
            {email.headers.subject && (
              <h3 className="font-sans font-bold text-base md:text-[18px] text-white leading-snug">
                {email.headers.subject}
              </h3>
            )}
          </div>

          {/* Meta row */}
          <div className="px-5 md:px-6 py-3.5 bg-slate-50 border-b border-slate-200/50 flex flex-col md:flex-row md:flex-wrap gap-y-1.5 md:gap-x-6">
            {email.headers.from && (
              <span className={META}>
                <span className="font-semibold text-slate-800">From: </span>{email.headers.from}
              </span>
            )}
            {email.headers.to && (
              <span className={META}>
                <span className="font-semibold text-slate-800">To: </span>{email.headers.to}
              </span>
            )}
            {email.headers.date && (
              <span className={`${META} flex items-center gap-1.5`}>
                <Clock size={12} className="text-slate-400" />{email.headers.date}
              </span>
            )}
          </div>

          {/* Body */}
          <div className="px-5 md:px-8 py-6 space-y-4">
            {email.body.map((line, i) =>
              line === ''
                ? <div key={i} className="h-1.5 md:h-2" />
                : <p key={i} className={PROSE} style={entryEffect(i * 25)}>{line}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
Part7Content.displayName = 'Part7Content';

/* ─────────────────────────────────────────────────────────
   PART 8 — Chat Thread
   ───────────────────────────────────────────────────────── */
const SENDER_PALETTES = [
  { dot:'#1D4ED8', bg:'#EFF6FF', text:'#1E3A8A', border:'#BFDBFE', name:'#1D4ED8' },
  { dot:'#6D28D9', bg:'#F5F3FF', text:'#3B0764', border:'#DDD6FE', name:'#6D28D9' },
  { dot:'#BE185D', bg:'#FDF2F8', text:'#831843', border:'#FBCFE8', name:'#BE185D' },
  { dot:'#047857', bg:'#ECFDF5', text:'#064E3B', border:'#A7F3D0', name:'#047857' },
  { dot:'#B45309', bg:'#FFFBEB', text:'#78350F', border:'#FDE68A', name:'#B45309' },
];

const Part8Content = memo(({ data }) => {
  const { messages, senderMap } = useMemo(() => {
    const lines = (data?.text || '').split('\n').filter(l => l.trim());
    const msgs  = lines.flatMap(line => {
      const m = line.match(/^(.+?)\s*\((\d{1,2}:\d{2})\):\s*(.+)$/);
      return m ? [{ sender: m[1].trim(), time: m[2], text: m[3] }] : [];
    });
    const map = {};
    let idx = 0;
    msgs.forEach(({ sender }) => { if (!(sender in map)) map[sender] = idx++; });
    return { messages: msgs, senderMap: map };
  }, [data]);

  const groups = useMemo(() => {
    const g = [];
    messages.forEach(msg => {
      const last = g[g.length - 1];
      if (last?.sender === msg.sender) last.msgs.push(msg);
      else g.push({ sender: msg.sender, msgs: [msg] });
    });
    return g;
  }, [messages]);

  if (!messages.length) return (
    <div className={`${CARD} flex flex-col items-center justify-center py-12 md:py-16 gap-3`}>
      <MessageCircle size={36} className="text-slate-300" />
      <p className="font-sans text-sm text-slate-400">No messages found</p>
    </div>
  );

  return (
    <div className={CARD}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 bg-slate-50 border-b border-slate-200/50">
        <div className="flex items-center gap-2.5">
          <MessageCircle size={16} className="text-blue-700 md:w-[15px] md:h-[15px]" />
          <span className="font-sans font-bold text-[13px] md:text-[14px] text-slate-900">Message Thread</span>
          <div className="flex -space-x-1.5 ml-1 hidden md:flex">
            {Object.keys(senderMap).slice(0, 4).map((s, i) => {
              const pal = SENDER_PALETTES[senderMap[s] % SENDER_PALETTES.length];
              return (
                <div
                  key={s}
                  title={s}
                  className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-sm"
                  style={{ background: pal.dot, zIndex: 10 - i }}
                >
                  <span className="text-white font-bold" style={{ fontSize: 8 }}>
                    {s.charAt(0).toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <span className="font-sans text-[10px] md:text-[11px] text-slate-400">{messages.length} msgs</span>
      </div>

      {/* Messages */}
      <div
        className="rd-scrollbar px-4 md:px-5 py-5 space-y-5 overflow-y-auto max-h-[65vh] md:max-h-[460px]"
      >
        {groups.map((group, gi) => {
          const pal     = SENDER_PALETTES[senderMap[group.sender] % SENDER_PALETTES.length];
          const initial = group.sender.charAt(0).toUpperCase();

          return (
            <div key={gi} className="flex items-start gap-2.5 md:gap-3" style={entryEffect(gi * 30)}>
              {/* Avatar */}
              <div
                className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow"
                style={{ background: pal.dot }}
              >
                <span className="text-white font-sans font-black text-[11px] md:text-[12px]">{initial}</span>
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="font-sans font-semibold text-[11px] md:text-[12px] mb-1 md:mb-1.5"
                  style={{ color: pal.name }}
                >
                  {group.sender}
                </p>

                <div className="flex flex-col gap-1.5">
                  {group.msgs.map((msg, mi) => (
                    <div key={mi} className="flex items-end gap-1.5 md:gap-2">
                      <div
                        className="rounded-[4px_14px_14px_14px] px-3.5 py-2 md:py-2.5 max-w-[90%] md:max-w-[85%]"
                        style={{
                          background:   pal.bg,
                          border:       `1px solid ${pal.border}`,
                          boxShadow:    '0 1px 2px rgba(0,0,0,0.03)',
                        }}
                      >
                        <p
                          className="text-[13px] md:text-[14px] leading-[1.5] md:leading-[1.6] m-0 font-sans"
                          style={{ color: pal.text }}
                        >
                          {msg.text}
                        </p>
                      </div>
                      <span className="font-sans text-[9px] md:text-[10px] text-slate-400 flex-shrink-0 pb-0.5 tabular-nums">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-slate-50 border-t border-slate-200/50">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-90" />
        <span className="font-sans text-[10px] md:text-[11px] text-slate-400">End of message log</span>
      </div>
    </div>
  );
});
Part8Content.displayName = 'Part8Content';

/* ─────────────────────────────────────────────────────────
   PLAIN TEXT — Long-form Article
   ───────────────────────────────────────────────────────── */
// Đã loại bỏ useState cho expand/collapse, hiển thị toàn bộ
const PlainTextContent = memo(({ data }) => {

  const { paragraphs, wordCount, readMins } = useMemo(() => {
    const text   = data?.text || '';
    const paras  = text.trim().split(/\n\n+/).filter(Boolean);
    const wc     = text.trim().split(/\s+/).filter(Boolean).length;
    return {
      paragraphs: paras,
      wordCount:  wc,
      readMins:   Math.max(1, Math.ceil(wc / 200)),
    };
  }, [data]);

  return (
    <div className={CARD} style={entryEffect(0)}>
      <div className="px-5 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6 border-b border-slate-100">
        <div className="flex items-center gap-2 md:gap-3 mb-4">
          <div className="h-px flex-1 bg-slate-200/60" />
          <Chip icon={BookOpen} label="Academic Prose" colorClass="bg-blue-50 text-blue-900" />
          <div className="h-px flex-1 bg-slate-200/60" />
        </div>

        {data?.title && (
          <h1
            className="text-2xl md:text-[28px] font-bold text-slate-950 leading-[1.25] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {data.title}
          </h1>
        )}

        {data?.description && (
          <p className="font-sans text-[13px] md:text-[14px] text-slate-600 leading-relaxed border-l-[3px] border-[#1E3A5F]/40 pl-3 md:pl-4 italic my-4">
            {data.description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Chip icon={FileText} label={`${wordCount} words`} colorClass="bg-slate-100 text-slate-700" />
          <Chip icon={Clock}    label={`~${readMins} min read`} colorClass="bg-emerald-50 text-emerald-800" />
        </div>
      </div>

      <div className="px-5 md:px-8 pt-6 pb-8 md:pb-10">
        <div className="max-w-prose mx-auto space-y-5 md:space-y-6">
          {paragraphs.map((para, i) => {
            // Drop cap on first paragraph - tinh chỉnh font-size responsive
            if (i === 0) {
              return (
                <p
                  key={i}
                  className={`${PROSE}`}
                  style={entryEffect(i * 15)}
                >
                  <span
                    className="float-left font-bold text-[#1E3A5F] leading-[0.8] mr-2 md:mr-3 mt-1 opacity-90"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '3.3em',
                      lineHeight: 0.85,
                    }}
                  >
                    {para.charAt(0)}
                  </span>
                  {para.slice(1)}
                </p>
              );
            }

            // Pull-quote accent logic (every 4th para)
            if (i > 0 && i % 4 === 0) {
              return (
                <div
                  key={i}
                  className="border-l-2 md:border-l-[3px] border-[#B45309]/50 pl-4 md:pl-5 py-1 my-6 md:my-8 bg-[#FFFDF7]/60 rounded-r-lg"
                  style={entryEffect(i * 15)}
                >
                  <p className={`${PROSE} italic text-slate-700`}>{para}</p>
                </div>
              );
            }

            return (
              <p key={i} className={PROSE} style={entryEffect(i * 15)}>
                {para}
              </p>
            );
          })}
        </div>
        {/* Đã loại bỏ phần button Show More */}
      </div>
    </div>
  );
});
PlainTextContent.displayName = 'PlainTextContent';

/* ─────────────────────────────────────────────────────────
   ROOT: ReadingDisplay
   ───────────────────────────────────────────────────────── */
const ReadingDisplay = memo(({ data }) => {
  injectFonts();
  injectKeyframes();

  const type = useMemo(() => {
    if (!data) return 'empty';
    const text = data.text || '';
    if (data.questions?.some(q => q.type === 'fill') && text.includes('(')) return 'part6';
    if (text.includes('---') || text.includes('To:') || text.includes('From:'))  return 'part7';
    if (text.match(/\(\d{1,2}:\d{2}\)/)) return 'part8';
    return 'plain';
  }, [data]);

  if (!data) return (
    <div
      className={`${CARD} flex flex-col items-center justify-center py-12 md:py-16 gap-3.5 shadow-sm`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-100 flex items-center justify-center shadow-inner border border-slate-200/50">
        <BookOpen size={26} className="text-slate-400" />
      </div>
      <div className="text-center px-5">
        <p className="font-sans font-semibold text-[14px] md:text-[15px] text-slate-500">Chọn bài để bắt đầu đọc</p>
        <p className="font-sans text-[11px] md:text-[12px] text-slate-400 mt-1.5 leading-snug">Select a reading passage from the left panel</p>
      </div>
    </div>
  );

  return (
    <div className="w-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {type === 'part6' && <Part6Content data={data} />}
      {type === 'part7' && <Part7Content data={data} />}
      {type === 'part8' && <Part8Content data={data} />}
      {type === 'plain' && <PlainTextContent data={data} />}
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';
export default ReadingDisplay;
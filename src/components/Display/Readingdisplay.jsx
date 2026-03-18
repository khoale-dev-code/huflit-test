/*
 * ReadingDisplay.jsx — Gamified 3D UI
 */

import React, { useState, useMemo, memo } from 'react';
import {
  ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap,
  Mail, Globe, Clock, MessageCircle, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Gamified Design Tokens ─────────────────────────── */
const C = {
  card: "bg-white border-2 border-slate-200 border-b-[6px] rounded-[28px] overflow-hidden shadow-sm",
  prose: "font-sans text-[15px] leading-relaxed text-slate-700 font-bold whitespace-pre-wrap",
  label: "font-display text-[11px] font-black uppercase tracking-widest",
};

/* ── Chip / Badge ─────────────────────────────────────── */
const Chip = ({ icon: Icon, label, colorClass = 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] font-display text-[12px] font-black uppercase tracking-wider border-2 border-b-[3px] ${colorClass}`}>
    {Icon && <Icon size={14} strokeWidth={3} />}
    {label}
  </span>
);

/* ─────────────────────────────────────────────────────────
   PART 6 — Text Completion (Điền vào chỗ trống)
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b-2 border-slate-200 outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#1CB0F6] border-b-[3px] border-[#1899D6] flex items-center justify-center flex-shrink-0 shadow-sm">
            <FileText size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <p className="font-display font-black text-[16px] text-slate-800 leading-tight">
              {data.title || 'Điền từ vào chỗ trống'}
            </p>
            {data.description && (
              <p className="font-body font-bold text-[13px] text-slate-500 mt-0.5 line-clamp-1">{data.description}</p>
            )}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0 shadow-sm">
          {open ? <ChevronUp size={20} strokeWidth={3} /> : <ChevronDown size={20} strokeWidth={3} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="p-5 sm:p-6 space-y-6"
          >
            <div className="rounded-[20px] border-2 border-slate-200 bg-white p-5 sm:p-7 shadow-inner leading-loose">
              <p className={C.prose}>
                {segments.map((seg, i) =>
                  i % 2 === 0
                    ? <span key={i}>{seg}</span>
                    : (
                      <span
                        key={i}
                        className="inline-flex items-center justify-center mx-1.5 px-3 py-1 rounded-[10px] font-display font-black text-[14px] text-[#1CB0F6] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[3px] cursor-default select-none align-baseline shadow-sm"
                        style={{ minWidth: 44, transform: 'translateY(-2px)' }}
                      >
                        {seg}
                      </span>
                    )
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-[16px] bg-[#F8EEFF] border-2 border-[#eec9ff] border-b-[4px]">
                <Zap size={20} className="text-[#CE82FF] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <p className={`${C.label} text-[#B975E5] mb-1`}>Hướng dẫn</p>
                  <p className="font-body font-bold text-[13px] text-slate-600 leading-snug">Đọc kỹ ngữ cảnh xung quanh mỗi ô trống để chọn từ vựng/ngữ pháp phù hợp nhất.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-[16px] bg-[#FFFBEA] border-2 border-[#FFD8A8] border-b-[4px]">
                <Lightbulb size={20} className="text-[#FF9600] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <p className={`${C.label} text-[#D9A600] mb-1`}>Mẹo nhỏ</p>
                  <p className="font-body font-bold text-[13px] text-slate-600 leading-snug">Hãy đọc lướt toàn bộ đoạn văn một lần trước khi bắt đầu điền từ.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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

      email = { headers, body: body.filter((l, i, a) => !(l === '' && a[i - 1] === '')) };
    }

    const url   = webLines.find(l => l.startsWith('http')) || 'https://www.hubstudy.com/reading';
    const title = webLines.find(l => l.includes('**'))?.replace(/\*\*/g, '');
    const bodyText  = webLines.filter(l => l && !l.startsWith('http') && !l.includes('**'));

    return { url, title, body: bodyText, email };
  }, [data]);

  const { url, title, body, email } = parsed;

  return (
    <div className="space-y-6">
      {(title || body.length > 0) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
          {/* Mock Browser Header */}
          <div className="flex items-center gap-3 px-5 py-3 bg-slate-100 border-b-2 border-slate-200">
            <div className="hidden sm:flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF4B4B]" />
              <div className="w-3 h-3 rounded-full bg-[#FFC800]" />
              <div className="w-3 h-3 rounded-full bg-[#58CC02]" />
            </div>
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-2 bg-white rounded-[10px] px-4 py-1.5 border-2 border-slate-200 max-w-full sm:max-w-md shadow-sm">
              <Globe size={14} className="text-slate-400 shrink-0" strokeWidth={2.5} />
              <span className="font-body font-bold text-[13px] text-slate-500 truncate">{url}</span>
            </div>
          </div>

          {/* Website Body */}
          <div className="px-5 sm:px-8 py-6 sm:py-8 bg-white">
            {title && (
              <h2 className="text-[20px] sm:text-[24px] font-display font-black text-slate-800 mb-5 leading-tight">
                {title}
              </h2>
            )}
            <div className="space-y-4">
              {body.map((line, i) => (
                <p key={i} className={C.prose}>{line}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {email && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
          {/* Email Header */}
          <div className="px-5 sm:px-8 py-5 bg-[#EAF6FE] border-b-2 border-[#BAE3FB]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-[10px] bg-[#1CB0F6] flex items-center justify-center text-white border-b-[3px] border-[#1899D6] shadow-sm">
                <Mail size={16} strokeWidth={2.5} />
              </div>
              <span className={`${C.label} text-[#1CB0F6]`}>Email Mới</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex flex-col gap-1.5">
                {email.headers.from && (
                  <p className="font-body text-[14px] text-slate-600 font-bold m-0">
                    <span className="text-slate-400 mr-2 uppercase text-[11px] tracking-wider">Từ:</span> 
                    {email.headers.from}
                  </p>
                )}
                {email.headers.to && (
                  <p className="font-body text-[14px] text-slate-600 font-bold m-0">
                    <span className="text-slate-400 mr-2 uppercase text-[11px] tracking-wider">Tới:</span> 
                    {email.headers.to}
                  </p>
                )}
              </div>
              {email.headers.date && (
                <div className="flex items-start md:justify-end">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-[#BAE3FB] rounded-[8px] font-body text-[12px] font-bold text-[#1CB0F6] shadow-sm">
                    <Clock size={14} strokeWidth={3} /> {email.headers.date}
                  </span>
                </div>
              )}
            </div>

            {email.headers.subject && (
              <div className="bg-white p-3 rounded-[12px] border-2 border-[#BAE3FB]">
                <p className="font-display font-black text-[16px] text-slate-800 m-0">
                  <span className="text-[#1CB0F6] mr-2">Chủ đề:</span>
                  {email.headers.subject}
                </p>
              </div>
            )}
          </div>

          {/* Email Body */}
          <div className="px-5 sm:px-8 py-6 space-y-4 bg-white">
            {email.body.map((line, i) =>
              line === '' ? <div key={i} className="h-2" /> : <p key={i} className={C.prose}>{line}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
});
Part7Content.displayName = 'Part7Content';

/* ─────────────────────────────────────────────────────────
   PART 8 — Chat Thread (Tin nhắn) ĐÃ NÂNG CẤP REGEX
   ───────────────────────────────────────────────────────── */
const SENDER_PALETTES = [
  { bg: 'bg-[#EAF6FE]', text: 'text-[#1899D6]', border: 'border-[#BAE3FB]', initial: 'bg-[#1CB0F6] border-[#1899D6]' },
  { bg: 'bg-[#F0FAE8]', text: 'text-[#46A302]', border: 'border-[#bcf096]', initial: 'bg-[#58CC02] border-[#46A302]' },
  { bg: 'bg-[#FFFBEA]', text: 'text-[#D9A600]', border: 'border-[#FFD8A8]', initial: 'bg-[#FFC200] border-[#D9A600]' },
  { bg: 'bg-[#F8EEFF]', text: 'text-[#B975E5]', border: 'border-[#eec9ff]', initial: 'bg-[#CE82FF] border-[#B975E5]' },
  { bg: 'bg-[#fff0f0]', text: 'text-[#E54343]', border: 'border-[#ffc1c1]', initial: 'bg-[#FF4B4B] border-[#E54343]' },
];

const Part8Content = memo(({ data }) => {
  const { messages, senderMap } = useMemo(() => {
    const lines = (data?.text || '').split('\n').filter(l => l.trim());
    
    const msgs  = lines.flatMap(line => {
      // 🚀 ĐÃ SỬA LỖI REGEX NO-USELESS-ESCAPE
      const m = line.match(/^(.+?)\s*[[(](\d{1,2}:\d{2}(?:\s*[AaPp][Mm])?)[\])]:\s*(.+)$/);
      return m ? [{ sender: m[1].trim(), time: m[2].trim(), text: m[3].trim() }] : [];
    });

    const map = {};
    let idx = 0;
    msgs.forEach(({ sender }) => { 
      if (!(sender in map)) map[sender] = idx++; 
    });
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
    <div className={`${C.card} flex flex-col items-center justify-center py-12 gap-3 bg-slate-50`}>
      <MessageCircle size={40} className="text-slate-300" strokeWidth={1.5} />
      <p className="font-display font-bold text-[15px] text-slate-400">Không có dữ liệu tin nhắn hợp lệ</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-slate-200 flex items-center justify-center text-slate-500 border-b-[3px] border-slate-300 shadow-sm">
            <MessageCircle size={20} strokeWidth={2.5} />
          </div>
          <span className="font-display font-black text-[16px] text-slate-800">Nhóm Chat Thảo luận</span>
        </div>
        <span className="px-3 py-1 bg-white border-2 border-slate-200 rounded-[10px] font-display font-black text-[12px] text-slate-500 shadow-sm uppercase tracking-wider">
          {messages.length} tin
        </span>
      </div>

      {/* Messages Area */}
      <div className="px-4 sm:px-6 py-6 space-y-6 overflow-y-auto max-h-[500px] custom-scrollbar bg-slate-50/50">
        {groups.map((group, gi) => {
          const pal = SENDER_PALETTES[senderMap[group.sender] % SENDER_PALETTES.length];
          const initial = group.sender.charAt(0).toUpperCase();

          return (
            <div key={gi} className="flex items-end gap-3">
              {/* Avatar 3D */}
              <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 border-2 border-b-[4px] shadow-sm mb-1 ${pal.initial}`}>
                <span className="text-white font-display font-black text-[16px] leading-none pt-0.5">{initial}</span>
              </div>

              <div className="flex-1 min-w-0 max-w-[85%] sm:max-w-[75%]">
                <div className="flex items-center gap-2 mb-1.5 ml-1">
                  <p className={`font-display font-black text-[13px] ${pal.text} truncate`}>
                    {group.sender}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                  <span className="font-display font-bold text-[11px] text-slate-400 mt-0.5 shrink-0">
                    {group.msgs[0].time}
                  </span>
                </div>

                <div className="flex flex-col gap-2 items-start">
                  {group.msgs.map((msg, mi) => (
                    <div 
                      key={mi} 
                      className={`px-4 py-3 rounded-[20px] border-2 shadow-sm ${mi === group.msgs.length - 1 ? 'rounded-bl-[6px]' : ''} ${pal.bg} ${pal.border}`}
                    >
                      <p className="text-[14px] font-body font-bold text-slate-700 leading-snug m-0 whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});
Part8Content.displayName = 'Part8Content';

/* ─────────────────────────────────────────────────────────
   PLAIN TEXT — Long-form Article
   ───────────────────────────────────────────────────────── */
const PlainTextContent = memo(({ data }) => {
  const { paragraphs, wordCount, readMins } = useMemo(() => {
    const text  = data?.text || '';
    const paras = text.trim().split(/\n\n+/).filter(Boolean);
    const wc    = text.trim().split(/\s+/).filter(Boolean).length;
    return { paragraphs: paras, wordCount: wc, readMins: Math.max(1, Math.ceil(wc / 200)) };
  }, [data]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
      <div className="px-5 sm:px-8 py-6 bg-slate-50 border-b-2 border-slate-200">
        <div className="flex items-center gap-2.5 mb-4 flex-wrap">
          <Chip icon={BookOpen} label="Bài đọc" />
          <Chip icon={FileText} label={`${wordCount} từ`} colorClass="bg-slate-100 text-slate-600 border-slate-200" />
          <Chip icon={Clock}    label={`~${readMins} phút`} colorClass="bg-[#FFFBEA] text-[#FF9600] border-[#FFD8A8]" />
        </div>

        {data?.title && (
          <h1 className="text-[20px] sm:text-[24px] font-display font-black text-slate-800 leading-tight mb-2">
            {data.title}
          </h1>
        )}

        {data?.description && (
          <p className="font-body font-bold text-[14px] text-slate-500 mt-2">
            {data.description}
          </p>
        )}
      </div>

      <div className="px-5 sm:px-8 py-6 sm:py-8 bg-white">
        <div className="space-y-5">
          {paragraphs.map((para, i) => {
            if (i === 0) {
              return (
                <p key={i} className={C.prose}>
                  <span className="float-left font-display font-black text-[40px] leading-[0.8] text-[#1CB0F6] mr-2 mt-1">
                    {para.charAt(0)}
                  </span>
                  {para.slice(1)}
                </p>
              );
            }

            if (i > 0 && i % 4 === 0) {
              return (
                <div key={i} className="border-l-[4px] border-[#FFC200] pl-4 py-3 my-6 bg-[#FFFBEA] rounded-r-[16px]">
                  <p className={`${C.prose} text-[#D9A600]`}>{para}</p>
                </div>
              );
            }

            return <p key={i} className={C.prose}>{para}</p>;
          })}
        </div>
      </div>
    </motion.div>
  );
});
PlainTextContent.displayName = 'PlainTextContent';

/* ─────────────────────────────────────────────────────────
   ROOT: ReadingDisplay
   ───────────────────────────────────────────────────────── */
const ReadingDisplay = memo(({ data }) => {

  const type = useMemo(() => {
    if (!data) return 'empty';
    const text = data.text || '';
    if (data.questions?.some(q => q.type === 'fill') && text.includes('(')) return 'part6';
    if (text.includes('---') || text.includes('To:') || text.includes('From:'))  return 'part7';
    
    // 🚀 ĐÃ SỬA LỖI REGEX NO-USELESS-ESCAPE
    if (text.match(/[[(]\d{1,2}:\d{2}(?:\s*[AaPp][Mm])?[\])]/)) return 'part8';
    
    return 'plain';
  }, [data]);

  if (!data) return (
    <div className={`${C.card} flex flex-col items-center justify-center py-16 gap-4 bg-slate-50`}>
      <div className="w-16 h-16 rounded-[16px] bg-slate-200 flex items-center justify-center border-b-[4px] border-slate-300 shadow-sm">
        <BookOpen size={32} className="text-slate-400" strokeWidth={2.5} />
      </div>
      <div className="text-center px-4">
        <p className="font-display font-black text-[18px] text-slate-600">Chọn bài để bắt đầu đọc</p>
        <p className="font-body font-bold text-[14px] text-slate-400 mt-1">Nội dung bài đọc sẽ hiển thị tại đây</p>
      </div>
    </div>
  );

  return (
    <div className="w-full selection:bg-blue-200">
      {type === 'part6' && <Part6Content data={data} />}
      {type === 'part7' && <Part7Content data={data} />}
      {type === 'part8' && <Part8Content data={data} />}
      {type === 'plain' && <PlainTextContent data={data} />}

      {/* Global Scrollbar Style */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';
export default ReadingDisplay;
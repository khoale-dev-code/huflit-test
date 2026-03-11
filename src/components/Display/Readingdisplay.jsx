/*
 * ReadingDisplay.jsx — Gamified UI · Tailwind CSS · Framer Motion
 */

import React, { useState, useMemo, memo } from 'react';
import {
  ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap,
  Mail, Globe, Clock, MessageCircle, FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Gamified Tokens ─────────────────────────── */
const CARD = 'bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col';
const PROSE = 'font-sans text-sm md:text-base leading-relaxed md:leading-snug text-gray-700 font-medium';
const LABEL = 'font-sans text-xs font-bold uppercase tracking-widest';

/* ── Chip / Badge ─────────────────────────────────────── */
const Chip = ({ icon: Icon, label, colorClass = 'bg-blue-50 text-blue-600 border-blue-200' }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-sans text-xs font-bold border ${colorClass}`}>
    {Icon && <Icon size={14} strokeWidth={2} />}
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={CARD}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200 active:bg-gray-200 outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
            <FileText size={18} className="text-white" strokeWidth={2} />
          </div>
          <div className="text-left">
            <p className="font-sans font-semibold text-sm md:text-base text-gray-900 leading-tight">
              {data.title || 'Điền từ vào chỗ trống'}
            </p>
            {data.description && (
              <p className="font-sans font-medium text-xs md:text-sm text-gray-500 mt-0.5 line-clamp-1">{data.description}</p>
            )}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
          {open ? <ChevronUp size={18} strokeWidth={2.5} /> : <ChevronDown size={18} strokeWidth={2.5} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="p-4 md:p-6 space-y-5"
          >
            <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-xs">
              <p className={PROSE}>
                {segments.map((seg, i) =>
                  i % 2 === 0
                    ? <span key={i}>{seg}</span>
                    : (
                      <span
                        key={i}
                        className="inline-flex items-center justify-center mx-1 px-2.5 py-0.5 rounded-lg font-sans font-semibold text-xs md:text-sm text-blue-600 bg-blue-50 border border-blue-200 cursor-default select-none align-middle"
                        style={{ minWidth: 40 }}
                      >
                        {seg}
                      </span>
                    )
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-indigo-50 border border-indigo-200">
                <Zap size={18} className="text-indigo-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className={`${LABEL} text-indigo-700 mb-0.5`}>Hướng dẫn</p>
                  <p className="font-sans font-medium text-xs md:text-sm text-indigo-900/80 leading-snug">Đọc kỹ ngữ cảnh xung quanh mỗi ô trống để chọn từ vựng/ngữ pháp phù hợp nhất.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200">
                <Lightbulb size={18} className="text-amber-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className={`${LABEL} text-amber-700 mb-0.5`}>Mẹo nhỏ</p>
                  <p className="font-sans font-medium text-xs md:text-sm text-amber-900/80 leading-snug">Hãy đọc lướt toàn bộ đoạn văn một lần trước khi bắt đầu điền từ.</p>
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

    const url   = webLines.find(l => l.startsWith('http')) || 'https://www.reading-test.com';
    const title = webLines.find(l => l.includes('**'))?.replace(/\*\*/g, '');
    const body  = webLines.filter(l => l && !l.startsWith('http') && !l.includes('**'));

    return { url, title, body, email };
  }, [data]);

  const { url, title, body, email } = parsed;

  return (
    <div className="space-y-5 md:space-y-6">
      {(title || body.length > 0) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={CARD}>
          {/* Browser Chrome */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
            <div className="hidden md:flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-gray-200 max-w-full md:max-w-xs">
              <Globe size={12} className="text-gray-400 shrink-0" strokeWidth={2} />
              <span className="font-sans font-medium text-xs text-gray-500 truncate">{url}</span>
            </div>
          </div>

          {/* Website Body */}
          <div className="px-4 md:px-6 py-5 md:py-8 bg-white">
            {title && (
              <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-4 md:mb-5 leading-tight">
                {title}
              </h2>
            )}
            <div className="space-y-3 md:space-y-4">
              {body.map((line, i) => (
                <p key={i} className={PROSE}>{line}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {email && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={CARD}>
          {/* Email Header */}
          <div className="px-4 md:px-6 py-4 md:py-5 bg-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-white" strokeWidth={2} />
              <span className={`${LABEL} text-white`}>Email</span>
            </div>
            {email.headers.subject && (
              <h3 className="font-sans font-semibold text-base md:text-lg text-white leading-snug">
                {email.headers.subject}
              </h3>
            )}
          </div>

          {/* Meta Row */}
          <div className="px-4 md:px-6 py-3 md:py-4 bg-blue-50 border-b border-blue-100 flex flex-col md:flex-row gap-2 md:gap-6 text-xs md:text-sm">
            <div className="flex flex-col gap-1">
              {email.headers.from && (
                <span className="font-sans text-gray-600">
                  <strong className="text-blue-900">Từ:</strong> {email.headers.from}
                </span>
              )}
              {email.headers.to && (
                <span className="font-sans text-gray-600">
                  <strong className="text-blue-900">Tới:</strong> {email.headers.to}
                </span>
              )}
            </div>
            {email.headers.date && (
              <span className="font-sans text-gray-500 font-medium flex items-center gap-1 md:ml-auto">
                <Clock size={12} strokeWidth={2} /> {email.headers.date}
              </span>
            )}
          </div>

          {/* Body */}
          <div className="px-4 md:px-6 py-5 md:py-6 space-y-3 bg-white">
            {email.body.map((line, i) =>
              line === '' ? <div key={i} className="h-1" /> : <p key={i} className={PROSE}>{line}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
});
Part7Content.displayName = 'Part7Content';

/* ─────────────────────────────────────────────────────────
   PART 8 — Chat Thread (Tin nhắn)
   ───────────────────────────────────────────────────────── */
const SENDER_PALETTES = [
  { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', initial: 'bg-blue-500' },
  { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', initial: 'bg-green-500' },
  { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', initial: 'bg-amber-500' },
  { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', initial: 'bg-purple-500' },
  { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', initial: 'bg-red-500' },
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
    <div className={`${CARD} flex flex-col items-center justify-center py-12 gap-3`}>
      <MessageCircle size={36} className="text-gray-300" strokeWidth={1.5} />
      <p className="font-sans font-semibold text-sm text-gray-400">Không có dữ liệu tin nhắn</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={CARD}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
            <MessageCircle size={16} strokeWidth={2} />
          </div>
          <span className="font-sans font-semibold text-sm text-gray-800">Đoạn Chat</span>
        </div>
        <span className="px-2.5 py-1 bg-gray-200 rounded-md font-sans font-medium text-xs text-gray-600">
          {messages.length} tin
        </span>
      </div>

      {/* Messages */}
      <div className="px-3 md:px-5 py-5 space-y-5 overflow-y-auto max-h-96 md:max-h-[500px] custom-scrollbar bg-white">
        {groups.map((group, gi) => {
          const pal = SENDER_PALETTES[senderMap[group.sender] % SENDER_PALETTES.length];
          const initial = group.sender.charAt(0).toUpperCase();

          return (
            <div key={gi} className="flex items-end gap-2.5">
              {/* Avatar */}
              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0 ${pal.initial}`}>
                <span className="text-white font-sans font-bold text-xs">{initial}</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-sans font-semibold text-xs mb-1.5 ml-0.5 ${pal.text}`}>
                  {group.sender}
                </p>

                <div className="flex flex-col gap-1.5 items-start">
                  {group.msgs.map((msg, mi) => (
                    <div key={mi} className="flex items-end gap-1.5 max-w-xs md:max-w-md">
                      <div className={`px-3 py-2 rounded-lg rounded-bl-none border ${pal.bg} ${pal.border}`}>
                        <p className="text-xs md:text-sm font-sans font-medium text-gray-800 leading-snug m-0">
                          {msg.text}
                        </p>
                      </div>
                      <span className="font-sans font-medium text-xs text-gray-400 shrink-0 pb-0.5">
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={CARD}>
      <div className="px-4 md:px-6 py-5 md:py-7 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Chip icon={BookOpen} label="Bài đọc" colorClass="bg-blue-100 text-blue-700 border-blue-200" />
          <Chip icon={FileText} label={`${wordCount} từ`} colorClass="bg-gray-100 text-gray-700 border-gray-300" />
          <Chip icon={Clock}    label={`~${readMins} phút`} colorClass="bg-amber-100 text-amber-700 border-amber-200" />
        </div>

        {data?.title && (
          <h1 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight mb-1.5">
            {data.title}
          </h1>
        )}

        {data?.description && (
          <p className="font-sans font-medium text-xs md:text-sm text-gray-500 mt-2">
            {data.description}
          </p>
        )}
      </div>

      <div className="px-4 md:px-6 py-5 md:py-7 bg-white">
        <div className="space-y-4 md:space-y-5">
          {paragraphs.map((para, i) => {
            // Drop cap ở đoạn đầu tiên
            if (i === 0) {
              return (
                <p key={i} className={PROSE}>
                  <span className="float-left font-sans font-bold text-3xl md:text-4xl leading-none text-blue-500 mr-1.5 mt-0.5">
                    {para.charAt(0)}
                  </span>
                  {para.slice(1)}
                </p>
              );
            }

            // Accent block xen kẽ
            if (i > 0 && i % 4 === 0) {
              return (
                <div key={i} className="border-l-4 border-amber-400 pl-3 md:pl-4 py-2 my-4 md:my-5 bg-amber-50 rounded-r-lg">
                  <p className={`${PROSE} text-amber-900/80`}>{para}</p>
                </div>
              );
            }

            return <p key={i} className={PROSE}>{para}</p>;
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
    if (text.match(/\(\d{1,2}:\d{2}\)/)) return 'part8';
    return 'plain';
  }, [data]);

  if (!data) return (
    <div className={`${CARD} flex flex-col items-center justify-center py-12 gap-3 bg-gray-50`}>
      <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center">
        <BookOpen size={28} className="text-gray-400" strokeWidth={1.5} />
      </div>
      <div className="text-center px-4">
        <p className="font-sans font-semibold text-sm text-gray-600">Chọn bài để bắt đầu đọc</p>
        <p className="font-sans font-medium text-xs text-gray-400 mt-0.5">Nội dung sẽ hiển thị tại đây</p>
      </div>
    </div>
  );

  return (
    <div className="w-full font-sans selection:bg-blue-200" style={{ fontFamily: '-apple-system, "Segoe UI", "Roboto", sans-serif' }}>
      {type === 'part6' && <Part6Content data={data} />}
      {type === 'part7' && <Part7Content data={data} />}
      {type === 'part8' && <Part8Content data={data} />}
      {type === 'plain' && <PlainTextContent data={data} />}

      {/* Global Scrollbar Style */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';
export default ReadingDisplay;
/*
 * ReadingDisplay.jsx — Breakthrough Gamified 3D UI
 */

import React, { useState, useMemo, memo } from 'react';
import {
  ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap,
  Mail, Globe, Clock, MessageCircle, FileText, CornerDownRight
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

/* ── Gamified Design Tokens ── */
const C = {
  card: "bg-white border-2 border-slate-200 border-b-[6px] rounded-3xl shadow-sm relative overflow-hidden",
  // Tối ưu Typography: Chữ to hơn, thoáng hơn, chống mỏi mắt
  prose: "font-nunito text-[17px] leading-[1.9] text-slate-700 font-extrabold whitespace-pre-wrap", 
  label: "font-nunito text-[12px] font-black uppercase tracking-widest",
};

/* ── Chip / Badge ── */
const Chip = ({ icon: Icon, label, colorClass = 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-nunito text-[12px] font-black uppercase tracking-wider border-2 border-b-[3px] shadow-sm ${colorClass}`}>
    {Icon && <Icon size={16} strokeWidth={3} />}
    {label}
  </span>
);

/* ─────────────────────────────────────────────────────────
   PART 6 — Text Completion (Giao diện Mảnh Ghép)
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
    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-b from-white to-slate-50 hover:to-slate-100 transition-colors border-b-2 border-slate-200 outline-none z-10 relative"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1CB0F6] border-b-[4px] border-[#1899D6] flex items-center justify-center shrink-0 shadow-md">
            <FileText size={24} className="text-white" strokeWidth={3} />
          </div>
          <div className="text-left">
            <p className="font-nunito font-black text-[18px] text-slate-800 leading-tight">
              {data.title || 'Điền từ vào chỗ trống'}
            </p>
            {data.description && (
              <p className="font-nunito font-bold text-[14px] text-slate-500 mt-1 line-clamp-1">{data.description}</p>
            )}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 border-b-4 flex items-center justify-center text-slate-400 shrink-0 shadow-sm active:border-b-2 active:translate-y-[2px] transition-all">
          {open ? <ChevronUp size={24} strokeWidth={3} /> : <ChevronDown size={24} strokeWidth={3} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <Motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="p-5 sm:p-6 space-y-6 bg-slate-50/50"
          >
            {/* Box nội dung đục lỗ */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <p className={C.prose}>
                {segments.map((seg, i) =>
                  i % 2 === 0
                    ? <span key={i}>{seg}</span>
                    : (
                      // Đột phá: Tạo ô trống dạng "khe cắm" chờ điền đáp án
                      <span
                        key={i}
                        className="inline-flex items-center justify-center mx-2 px-4 py-1 rounded-xl font-nunito font-black text-[15px] text-slate-400 bg-slate-100 border-2 border-dashed border-slate-300 shadow-inner align-middle"
                        style={{ minWidth: 60, transform: 'translateY(-2px)' }}
                      >
                        Câu {seg}
                      </span>
                    )
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-[#eec9ff] border-b-[4px] shadow-sm relative overflow-hidden group hover:border-[#CE82FF] transition-colors">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#CE82FF]" />
                <div className="w-10 h-10 rounded-xl bg-[#F8EEFF] border-2 border-[#eec9ff] flex items-center justify-center shrink-0 text-[#CE82FF]">
                  <Zap size={20} strokeWidth={3} />
                </div>
                <div>
                  <p className={`${C.label} text-[#B975E5] mb-1`}>Hướng dẫn</p>
                  <p className="font-nunito font-bold text-[14px] text-slate-600 leading-relaxed">Đọc kỹ ngữ cảnh xung quanh mỗi ô trống để chọn từ phù hợp.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-[#FFD8A8] border-b-[4px] shadow-sm relative overflow-hidden group hover:border-[#FF9600] transition-colors">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF9600]" />
                <div className="w-10 h-10 rounded-xl bg-[#FFFBEA] border-2 border-[#FFD8A8] flex items-center justify-center shrink-0 text-[#FF9600]">
                  <Lightbulb size={20} strokeWidth={3} />
                </div>
                <div>
                  <p className={`${C.label} text-[#D9A600] mb-1`}>Mẹo nhỏ</p>
                  <p className="font-nunito font-bold text-[14px] text-slate-600 leading-relaxed">Đọc lướt toàn bộ đoạn văn một lần trước khi điền từ.</p>
                </div>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
});
Part6Content.displayName = 'Part6Content';

/* ─────────────────────────────────────────────────────────
   PART 7 — Website + Email (Giao diện Mini OS)
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
    <div className="space-y-8">
      {(title || body.length > 0) && (
        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
          {/* Đột phá: Mock Browser Header kiểu macOS */}
          <div className="flex items-center gap-4 px-5 py-3.5 bg-gradient-to-b from-slate-100 to-slate-200 border-b-2 border-slate-300">
            <div className="hidden sm:flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF4B4B] shadow-inner border border-black/10" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFC800] shadow-inner border border-black/10" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#58CC02] shadow-inner border border-black/10" />
            </div>
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-2 bg-white/80 rounded-xl px-4 py-2 border border-slate-300/50 max-w-full sm:max-w-md shadow-sm backdrop-blur-sm">
              <Globe size={16} className="text-slate-400 shrink-0" strokeWidth={3} />
              <span className="font-nunito font-black text-[13px] text-slate-500 tracking-wide truncate">{url}</span>
            </div>
          </div>

          <div className="px-5 sm:px-10 py-8 sm:py-10 bg-white">
            {title && (
              <h2 className="text-[24px] sm:text-[30px] font-nunito font-black text-slate-800 mb-8 leading-tight border-b-4 border-[#1CB0F6] inline-block pb-2">
                {title}
              </h2>
            )}
            <div className="space-y-5">
              {body.map((line, i) => <p key={i} className={C.prose}>{line}</p>)}
            </div>
          </div>
        </Motion.div>
      )}

      {email && (
        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
          {/* Đột phá: Header Email kiểu Inbox App */}
          <div className="px-5 sm:px-8 py-6 bg-gradient-to-br from-[#EAF6FE] to-white border-b-2 border-[#BAE3FB] relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1CB0F6]" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#1CB0F6] flex items-center justify-center text-white border-b-4 border-[#1899D6] shadow-sm">
                <Mail size={20} strokeWidth={3} />
              </div>
              <span className={`${C.label} text-[#1CB0F6]`}>Hộp thư đến</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
              <div className="flex flex-col gap-2">
                {email.headers.from && (
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-400 uppercase text-[11px] tracking-widest font-black text-right shrink-0">Từ</span> 
                    <span className="px-3 py-1 bg-white border-2 border-slate-200 rounded-lg font-nunito text-[14px] text-slate-700 font-black shadow-sm">{email.headers.from}</span>
                  </div>
                )}
                {email.headers.to && (
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-400 uppercase text-[11px] tracking-widest font-black text-right shrink-0">Tới</span> 
                    <span className="px-3 py-1 bg-white border-2 border-slate-200 rounded-lg font-nunito text-[14px] text-slate-700 font-black shadow-sm">{email.headers.to}</span>
                  </div>
                )}
              </div>
              {email.headers.date && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#BAE3FB] rounded-xl font-nunito text-[13px] font-black text-[#1CB0F6] shadow-sm">
                  <Clock size={16} strokeWidth={3} /> {email.headers.date}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white">
            {email.headers.subject && (
              <div className="px-5 sm:px-8 pt-6 pb-2">
                <p className="font-nunito font-black text-[20px] text-slate-800 m-0">
                  {email.headers.subject}
                </p>
              </div>
            )}
            <div className="px-5 sm:px-8 pb-8 pt-4 space-y-5">
              {email.body.map((line, i) =>
                line === '' ? <div key={i} className="h-4" /> : <p key={i} className={C.prose}>{line}</p>
              )}
            </div>
          </div>
        </Motion.div>
      )}
    </div>
  );
});
Part7Content.displayName = 'Part7Content';

/* ─────────────────────────────────────────────────────────
   PART 8 — Chat Thread (Giao diện Bong Bóng Chat Trái/Phải)
   ───────────────────────────────────────────────────────── */
const SENDER_PALETTES = [
  // Người số 0 (Mình - Bên phải) sẽ dùng màu Xanh dương
  { bg: 'bg-[#1CB0F6]', text: 'text-white', border: 'border-[#1899D6]', nameColor: 'text-[#1899D6]', timeColor: 'text-blue-100', isRight: true },
  // Những người còn lại (Bên trái)
  { bg: 'bg-white', text: 'text-slate-700', border: 'border-slate-200', nameColor: 'text-emerald-500', timeColor: 'text-slate-400', isRight: false },
  { bg: 'bg-white', text: 'text-slate-700', border: 'border-slate-200', nameColor: 'text-amber-500', timeColor: 'text-slate-400', isRight: false },
  { bg: 'bg-white', text: 'text-slate-700', border: 'border-slate-200', nameColor: 'text-purple-500', timeColor: 'text-slate-400', isRight: false },
];

const Part8Content = memo(({ data }) => {
  const { messages, senderMap } = useMemo(() => {
    const lines = (data?.text || '').split('\n').filter(l => l.trim());
    const msgs  = lines.flatMap(line => {
      const m = line.match(/^(.+?)\s*[[(](\d{1,2}:\d{2}(?:\s*[AaPp][Mm])?)[\])]:\s*(.+)$/);
      return m ? [{ sender: m[1].trim(), time: m[2].trim(), text: m[3].trim() }] : [];
    });
    const map = {}; let idx = 0;
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

  if (!messages.length) return null;

  return (
    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
      <div className="flex items-center justify-between px-5 py-4 bg-white border-b-2 border-slate-200 z-10 relative shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border-b-[4px] border-slate-200">
            <MessageCircle size={24} strokeWidth={3} />
          </div>
          <div>
            <span className="font-nunito font-black text-[18px] text-slate-800 block leading-tight">Thảo luận nhóm</span>
            <span className="font-nunito font-bold text-[13px] text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Đang hoạt động
            </span>
          </div>
        </div>
        <span className="px-4 py-1.5 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-xl font-nunito font-black text-[13px] text-[#1CB0F6] uppercase tracking-widest">
          {messages.length} tin
        </span>
      </div>

      {/* Đột phá: Chat Area dạng iMessage/Zalo */}
      <div className="px-4 sm:px-6 py-8 space-y-6 bg-slate-50/80 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        {groups.map((group, gi) => {
          const userIdx = senderMap[group.sender];
          const pal = SENDER_PALETTES[userIdx === 0 ? 0 : (userIdx % 3) + 1]; 
          const initial = group.sender.charAt(0).toUpperCase();

          return (
            <div key={gi} className={`flex items-end gap-3 sm:gap-4 ${pal.isRight ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border-b-[4px] shadow-sm mb-1 ${pal.isRight ? 'bg-[#1899D6] border-[#0d8ecf]' : 'bg-white border-slate-200'}`}>
                <span className={`font-nunito font-black text-[18px] leading-none pt-1 ${pal.isRight ? 'text-white' : pal.nameColor}`}>{initial}</span>
              </div>

              <div className={`flex-1 min-w-0 max-w-[85%] sm:max-w-[75%] flex flex-col ${pal.isRight ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 mb-1.5 mx-1 ${pal.isRight ? 'flex-row-reverse' : 'flex-row'}`}>
                  <p className={`font-nunito font-black text-[13px] uppercase tracking-wider ${pal.nameColor} truncate`}>
                    {pal.isRight ? 'Bạn' : group.sender}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                  <span className="font-nunito font-extrabold text-[11px] text-slate-400 mt-0.5 shrink-0">
                    {group.msgs[0].time}
                  </span>
                </div>

                <div className={`flex flex-col gap-1.5 ${pal.isRight ? 'items-end' : 'items-start'}`}>
                  {group.msgs.map((msg, mi) => {
                    const isLast = mi === group.msgs.length - 1;
                    const isFirst = mi === 0;
                    
                    // Logic bo góc bong bóng chat
                    let roundedClass = 'rounded-2xl';
                    if (pal.isRight) {
                      if (isFirst) roundedClass += ' rounded-tr-md';
                      if (isLast)  roundedClass += ' rounded-br-[4px]';
                      if (!isFirst && !isLast) roundedClass += ' rounded-r-md';
                    } else {
                      if (isFirst) roundedClass += ' rounded-tl-md';
                      if (isLast)  roundedClass += ' rounded-bl-[4px]';
                      if (!isFirst && !isLast) roundedClass += ' rounded-l-md';
                    }

                    return (
                      <div 
                        key={mi} 
                        className={`px-5 py-3 border-2 shadow-sm ${roundedClass} ${pal.bg} ${pal.border}`}
                      >
                        <p className={`text-[16px] font-nunito font-extrabold leading-relaxed m-0 whitespace-pre-wrap ${pal.text}`}>
                          {msg.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Motion.div>
  );
});
Part8Content.displayName = 'Part8Content';

/* ─────────────────────────────────────────────────────────
   PLAIN TEXT — Trải nghiệm Đọc Sâu (Deep Focus)
   ───────────────────────────────────────────────────────── */
const PlainTextContent = memo(({ data }) => {
  const { paragraphs, wordCount, readMins } = useMemo(() => {
    const text  = data?.text || '';
    const paras = text.trim().split(/\n\n+/).filter(Boolean);
    const wc    = text.trim().split(/\s+/).filter(Boolean).length;
    return { paragraphs: paras, wordCount: wc, readMins: Math.max(1, Math.ceil(wc / 200)) };
  }, [data]);

  return (
    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={C.card}>
      <div className="px-5 sm:px-10 py-8 bg-gradient-to-b from-slate-50 to-white border-b-2 border-slate-100">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <Chip icon={BookOpen} label="Bài đọc" />
          <Chip icon={FileText} label={`${wordCount} từ`} colorClass="bg-white text-slate-600 border-slate-200" />
          <Chip icon={Clock}    label={`~${readMins} phút`} colorClass="bg-[#FFFBEA] text-[#FF9600] border-[#FFD8A8]" />
        </div>

        {data?.title && (
          <h1 className="text-[28px] sm:text-[34px] font-nunito font-black text-slate-800 leading-tight mb-3">
            {data.title}
          </h1>
        )}

        {data?.description && (
          <div className="flex items-start gap-3 mt-4 bg-[#EAF6FE] p-4 rounded-2xl border-2 border-[#BAE3FB]">
            <CornerDownRight className="text-[#1CB0F6] shrink-0 mt-0.5" size={20} strokeWidth={3} />
            <p className="font-nunito font-extrabold text-[16px] text-[#1899D6]">
              {data.description}
            </p>
          </div>
        )}
      </div>

      <div className="px-5 sm:px-10 py-8 sm:py-12 bg-white max-w-4xl mx-auto">
        <div className="space-y-6">
          {paragraphs.map((para, i) => {
            if (i === 0) {
              return (
                <p key={i} className={`${C.prose} text-[18px]`}>
                  <span className="float-left font-nunito font-black text-[56px] leading-[0.7] text-[#1CB0F6] mr-3 mt-2 drop-shadow-sm">
                    {para.charAt(0)}
                  </span>
                  {para.slice(1)}
                </p>
              );
            }

            if (i > 0 && i % 4 === 0) {
              return (
                <div key={i} className="border-l-[6px] border-[#FFC800] pl-6 py-4 my-8 bg-[#FFFBEA] rounded-r-2xl shadow-sm">
                  <p className={`${C.prose} text-[#D9A600] text-[18px]`}>{para}</p>
                </div>
              );
            }

            return <p key={i} className={`${C.prose} text-[18px]`}>{para}</p>;
          })}
        </div>
      </div>
    </Motion.div>
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
    if (text.match(/[[(]\d{1,2}:\d{2}(?:\s*[AaPp][Mm])?[\])]/)) return 'part8';
    
    return 'plain';
  }, [data]);

  if (!data || type === 'empty') return (
    <div className={`${C.card} flex flex-col items-center justify-center py-20 gap-5 bg-slate-50`}>
      <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center border-2 border-slate-200 border-b-[8px] shadow-sm">
        <BookOpen size={48} className="text-slate-300" strokeWidth={3} />
      </div>
      <div className="text-center px-4">
        <p className="font-nunito font-black text-[22px] text-slate-700">Chọn bài để bắt đầu đọc</p>
        <p className="font-nunito font-bold text-[16px] text-slate-400 mt-2">Nội dung bài đọc sẽ hiển thị vô cùng đẹp mắt tại đây</p>
      </div>
    </div>
  );

  return (
    <div className="w-full selection:bg-[#1CB0F6] selection:text-white pb-10">
      {type === 'part6' && <Part6Content data={data} />}
      {type === 'part7' && <Part7Content data={data} />}
      {type === 'part8' && <Part8Content data={data} />}
      {type === 'plain' && <PlainTextContent data={data} />}
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';
export default ReadingDisplay;  
/*
 * ReadingDisplay.jsx — Soft Zen / Modern Editorial Style
 */

import React, { useState, useMemo, memo } from 'react';
import {
  ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap,
  Mail, Globe, Clock, MessageCircle, FileText, CornerDownRight, AlignLeft
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

/* ── Soft Zen Design Tokens ── */
const C = {
  // Thẻ card nổi bồng bềnh, bóng đổ cực êm
  card: "bg-white/80 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative overflow-hidden",
  // Typography thanh lịch cho việc đọc sâu
  prose: "font-nunito text-[17px] sm:text-[18px] leading-[1.85] text-slate-700 font-medium whitespace-pre-wrap tracking-[-0.01em]", 
  label: "font-nunito text-[12px] font-black uppercase tracking-widest",
};

/* ── Chip / Badge ── */
const Chip = ({ icon: Icon, label, colorClass = 'bg-[#F0F9FF] text-[#1CB0F6] border-transparent' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-nunito text-[12px] font-bold tracking-wide border ${colorClass}`}>
    {Icon && <Icon size={14} strokeWidth={2.5} />}
    {label}
  </span>
);

/* ─────────────────────────────────────────────────────────
   PART 6 — Text Completion (Giao diện Mảnh Ghép Mềm Mại)
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
        className="w-full flex items-center justify-between px-6 py-5 bg-white/50 hover:bg-slate-50/50 transition-colors outline-none z-10 relative"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 text-[#1CB0F6]">
            <FileText size={24} strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <p className="font-nunito font-black text-[18px] text-slate-800 leading-tight">
              {data.title || 'Điền từ vào chỗ trống'}
            </p>
            {data.description && (
              <p className="font-nunito font-bold text-[14px] text-slate-400 mt-1 line-clamp-1">{data.description}</p>
            )}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 transition-transform">
          {open ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} strokeWidth={2.5} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <Motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="p-6 sm:p-8 space-y-6 border-t border-slate-100"
          >
            <div className="bg-slate-50/50 rounded-[24px] p-6 sm:p-8">
              <p className={C.prose}>
                {segments.map((seg, i) =>
                  i % 2 === 0
                    ? <span key={i}>{seg}</span>
                    : (
                      <span
                        key={i}
                        className="inline-flex items-center justify-center mx-1.5 px-4 py-1 rounded-xl font-nunito font-black text-[14px] text-[#1CB0F6] bg-white border border-[#BAE3FB] shadow-sm align-middle transition-all hover:scale-105 cursor-default"
                        style={{ transform: 'translateY(-2px)' }}
                      >
                        Câu {seg}
                      </span>
                    )
                )}
              </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
});
Part6Content.displayName = 'Part6Content';

/* ─────────────────────────────────────────────────────────
   PART 7 — Website + Email (Giao diện Kính Mờ Tinh Tế)
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
          <div className="flex items-center gap-4 px-6 py-4 bg-slate-50/80 border-b border-slate-100">
            <div className="hidden sm:flex gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
            </div>
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-2 bg-white rounded-lg px-4 py-1.5 max-w-full sm:max-w-md shadow-sm">
              <Globe size={14} className="text-slate-400 shrink-0" />
              <span className="font-nunito font-bold text-[13px] text-slate-500 tracking-wide truncate">{url}</span>
            </div>
          </div>

          <div className="px-6 sm:px-12 py-8 sm:py-10 bg-white">
            {title && (
              <h2 className="text-[26px] sm:text-[32px] font-nunito font-black text-slate-800 mb-8 leading-tight">
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
          <div className="px-6 sm:px-10 py-6 bg-slate-50/50 border-b border-slate-100 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Mail size={20} strokeWidth={2.5} />
              </div>
              <span className={`${C.label} text-indigo-500`}>Hộp thư đến</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
              <div className="flex flex-col gap-3">
                {email.headers.from && (
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-slate-400 text-[12px] font-bold text-right shrink-0">Từ:</span> 
                    <span className="font-nunito text-[15px] text-slate-800 font-bold">{email.headers.from}</span>
                  </div>
                )}
                {email.headers.to && (
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-slate-400 text-[12px] font-bold text-right shrink-0">Tới:</span> 
                    <span className="font-nunito text-[15px] text-slate-800 font-bold">{email.headers.to}</span>
                  </div>
                )}
              </div>
              {email.headers.date && (
                <div className="inline-flex items-center gap-2 font-nunito text-[13px] font-bold text-slate-500">
                  <Clock size={14} /> {email.headers.date}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white">
            {email.headers.subject && (
              <div className="px-6 sm:px-10 pt-8 pb-4">
                <p className="font-nunito font-black text-[22px] text-slate-800 m-0">
                  {email.headers.subject}
                </p>
              </div>
            )}
            <div className="px-6 sm:px-10 pb-10 pt-2 space-y-5">
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
   PART 8 — Chat Thread (Đã sửa lỗi hiển thị "Bạn", chia màu thông minh)
   ───────────────────────────────────────────────────────── */
const SENDER_PALETTES = [
  // Người đầu tiên (Bên trái) - Xanh Khói
  { bg: 'bg-[#F0F9FF]', text: 'text-slate-700', nameColor: 'text-[#1CB0F6]', timeColor: 'text-slate-400', isRight: false },
  // Người thứ hai (Bên phải) - Tím Pastel
  { bg: 'bg-[#F8EEFF]', text: 'text-slate-700', nameColor: 'text-[#B975E5]', timeColor: 'text-slate-400', isRight: true },
  // Dự phòng người thứ ba - Vàng Pastel
  { bg: 'bg-[#FFFBEA]', text: 'text-slate-700', nameColor: 'text-[#D9A600]', timeColor: 'text-slate-400', isRight: false },
];

const Part8Content = memo(({ data }) => {
  const { messages, senderMap } = useMemo(() => {
    const lines = (data?.text || '').split('\n').filter(l => l.trim());
    const msgs  = lines.flatMap(line => {
      // Bắt theo chuẩn Regex (Tên) (Giờ): (Nội dung)
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
      <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-slate-100 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
            <MessageCircle size={20} strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-nunito font-black text-[18px] text-slate-800 block leading-tight">Đoạn hội thoại</span>
            <span className="font-nunito font-bold text-[12px] text-slate-400">Dữ liệu tham khảo</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-slate-50 rounded-full font-nunito font-bold text-[12px] text-slate-500">
          {messages.length} tin nhắn
        </span>
      </div>

      <div className="px-5 sm:px-8 py-8 space-y-6 bg-[#FAFCFF]">
        {groups.map((group, gi) => {
          const userIdx = senderMap[group.sender];
          const pal = SENDER_PALETTES[userIdx % SENDER_PALETTES.length]; 
          const initial = group.sender.charAt(0).toUpperCase();

          return (
            <div key={gi} className={`flex items-end gap-3 sm:gap-4 ${pal.isRight ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar Minimalist */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white shadow-sm border border-slate-100 mb-1">
                <span className={`font-nunito font-black text-[16px] ${pal.nameColor}`}>{initial}</span>
              </div>

              <div className={`flex-1 min-w-0 max-w-[85%] sm:max-w-[70%] flex flex-col ${pal.isRight ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 mb-1.5 mx-1 ${pal.isRight ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* 🚀 ĐÃ SỬA LỖI: Luôn hiện tên gốc của đoạn chat, không tự phong là "Bạn" nữa */}
                  <p className={`font-nunito font-black text-[12px] tracking-wide ${pal.nameColor} truncate`}>
                    {group.sender}
                  </p>
                  <span className="font-nunito font-bold text-[11px] text-slate-400 shrink-0">
                    {group.msgs[0].time}
                  </span>
                </div>

                <div className={`flex flex-col gap-1.5 ${pal.isRight ? 'items-end' : 'items-start'}`}>
                  {group.msgs.map((msg, mi) => {
                    const isLast = mi === group.msgs.length - 1;
                    const isFirst = mi === 0;
                    
                    let roundedClass = 'rounded-[20px]';
                    if (pal.isRight) {
                      if (isFirst) roundedClass += ' rounded-tr-sm';
                      if (isLast)  roundedClass += ' rounded-br-sm';
                      if (!isFirst && !isLast) roundedClass += ' rounded-r-sm';
                    } else {
                      if (isFirst) roundedClass += ' rounded-tl-sm';
                      if (isLast)  roundedClass += ' rounded-bl-sm';
                      if (!isFirst && !isLast) roundedClass += ' rounded-l-sm';
                    }

                    return (
                      <div 
                        key={mi} 
                        className={`px-5 py-3.5 shadow-sm ${roundedClass} ${pal.bg}`}
                      >
                        <p className={`text-[15px] sm:text-[16px] font-nunito font-semibold leading-[1.6] m-0 whitespace-pre-wrap ${pal.text}`}>
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
      <div className="px-6 sm:px-12 py-10 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <Chip icon={AlignLeft} label="Bài đọc" />
          <Chip icon={FileText} label={`${wordCount} từ`} colorClass="bg-slate-50 text-slate-500 border-transparent" />
          <Chip icon={Clock}    label={`~${readMins} phút`} colorClass="bg-amber-50 text-amber-600 border-transparent" />
        </div>

        {data?.title && (
          <h1 className="text-[28px] sm:text-[36px] font-nunito font-black text-slate-800 leading-tight mb-4 tracking-[-0.02em]">
            {data.title}
          </h1>
        )}

        {data?.description && (
          <p className="font-nunito font-medium text-[16px] text-slate-500 italic border-l-4 border-slate-200 pl-4 mt-4">
            {data.description}
          </p>
        )}
      </div>

      <div className="px-6 sm:px-12 py-10 sm:py-14 bg-[#FAFCFF] max-w-4xl mx-auto">
        <div className="space-y-6">
          {paragraphs.map((para, i) => {
            // Drop cap cho đoạn đầu tiên
            if (i === 0) {
              return (
                <p key={i} className={`${C.prose} text-[18px]`}>
                  <span className="float-left font-nunito font-black text-[64px] leading-[0.7] text-[#1CB0F6] mr-4 mt-2 opacity-90">
                    {para.charAt(0)}
                  </span>
                  {para.slice(1)}
                </p>
              );
            }

            // Highlight vàng nhạt cho mỗi đoạn thứ 4 để mắt đỡ chán
            if (i > 0 && i % 4 === 0) {
              return (
                <div key={i} className="pl-6 py-2 my-8 border-l-4 border-amber-300">
                  <p className={`${C.prose} text-slate-700 text-[18px]`}>{para}</p>
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
    <div className={`${C.card} flex flex-col items-center justify-center py-24 gap-5 bg-[#FAFCFF]`}>
      <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100">
        <BookOpen size={36} className="text-slate-300" strokeWidth={2.5} />
      </div>
      <div className="text-center px-4">
        <p className="font-nunito font-black text-[20px] text-slate-700">Chọn bài để bắt đầu đọc</p>
        <p className="font-nunito font-bold text-[15px] text-slate-400 mt-2">Nội dung sẽ hiển thị vô cùng thanh lịch tại đây</p>
      </div>
    </div>
  );

  return (
    <div className="w-full selection:bg-[#1CB0F6]/30 selection:text-slate-900 pb-10">
      {type === 'part6' && <Part6Content data={data} />}
      {type === 'part7' && <Part7Content data={data} />}
      {type === 'part8' && <Part8Content data={data} />}
      {type === 'plain' && <PlainTextContent data={data} />}
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';
export default ReadingDisplay;
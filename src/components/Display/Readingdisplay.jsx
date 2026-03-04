import React, { useState, useMemo, memo, useCallback } from 'react';
import {
  ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap,
  Mail, Globe, Clock, MessageCircle, FileText,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

  .rd-root {
    --blue:       #2563EB;
    --blue-light: #EFF6FF;
    --blue-mid:   #DBEAFE;
    --amber:      #D97706;
    --amber-light:#FFFBEB;
    --amber-mid:  #FDE68A;
    --green:      #059669;
    --surface:    #FFFFFF;
    --bg:         #F8FAFC;
    --border:     #E2E8F0;
    --text:       #0F172A;
    --muted:      #64748B;
    --radius:     14px;
    font-family: 'DM Sans', sans-serif;
  }

  .rd-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .rd-prose {
    font-family: 'Lora', Georgia, serif;
    font-size: 17px;
    line-height: 1.85;
    color: var(--text);
    letter-spacing: 0.01em;
  }

  .rd-prose p { margin: 0; }

  .rd-blank {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    margin: 0 4px;
    padding: 2px 12px;
    background: var(--amber-light);
    border: 1.5px solid var(--amber-mid);
    border-radius: 6px;
    color: var(--amber);
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 14px;
    cursor: default;
    transition: background 0.15s;
  }

  .rd-blank:hover { background: var(--amber-mid); }

  .rd-scroll::-webkit-scrollbar { width: 5px; }
  .rd-scroll::-webkit-scrollbar-track { background: transparent; }
  .rd-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

  .rd-fade { animation: rdFade 0.25s ease forwards; }
  @keyframes rdFade {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rd-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
`;

// ─────────────────────────────────────────────────────────────
// SHARED: Section Header
// ─────────────────────────────────────────────────────────────
const SectionLabel = ({ icon: Icon, label, color = '#2563EB', bg = '#EFF6FF' }) => (
  <div className="rd-tag" style={{ background: bg, color }}>
    <Icon size={11} />
    {label}
  </div>
);

// ─────────────────────────────────────────────────────────────
// PART 6: Text Completion
// ─────────────────────────────────────────────────────────────
const Part6Content = memo(({ data }) => {
  const [open, setOpen] = useState(true);

  if (!data?.text || !data?.questions) return null;

  const fillQs = data.questions.filter((q) => q.type === 'fill');
  let display = data.text;
  fillQs.forEach((q) => { display = display.replace(`(${q.id})`, `%%${q.id}%%`); });
  const parts = display.split(/%%(\d+)%%/);

  return (
    <div className="rd-card rd-root">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg)', borderBottom: open ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 15, fontFamily: 'DM Sans' }}>6</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', fontFamily: 'DM Sans' }}>{data.title || 'Text Completion'}</div>
            {data.description && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{data.description}</div>}
          </div>
        </div>
        {open ? <ChevronUp size={18} color="var(--muted)" /> : <ChevronDown size={18} color="var(--muted)" />}
      </button>

      {open && (
        <div className="rd-fade" style={{ padding: '20px' }}>
          {/* Reading text */}
          <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '20px 24px', border: '1px solid var(--border)', marginBottom: 16 }}>
            <div className="rd-prose" style={{ lineHeight: 2.1 }}>
              {parts.map((part, i) =>
                i % 2 === 0
                  ? <span key={i}>{part}</span>
                  : <span key={i} className="rd-blank">({part})</span>
              )}
            </div>
          </div>

          {/* Tips row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ background: 'var(--blue-light)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--blue-mid)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Zap size={15} color="var(--blue)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--blue)', marginBottom: 2 }}>Instructions</div>
                <div style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.5 }}>Choose A–D for each blank in the text.</div>
              </div>
            </div>
            <div style={{ background: 'var(--amber-light)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--amber-mid)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Lightbulb size={15} color="var(--amber)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--amber)', marginBottom: 2 }}>Pro Tip</div>
                <div style={{ fontSize: 12, color: '#92400E', lineHeight: 1.5 }}>Read full context before answering.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// PART 7: Website + Email
// ─────────────────────────────────────────────────────────────
const Part7Content = memo(({ data }) => {
  const parsed = useMemo(() => {
    const text = data?.text || '';
    const sections = text.split('---');
    const websiteLines = sections[0]?.trim().split('\n').filter(Boolean) || [];

    let email = null;
    if (sections[1]) {
      const lines = sections[1].trim().split('\n');
      const headers = {};
      const body = [];
      let inBody = false;

      lines.forEach((line) => {
        line = line.trim();
        if (!line) { if (inBody) body.push(''); return; }
        if (line.startsWith('To:'))      { headers.to      = line.slice(3).trim(); return; }
        if (line.startsWith('From:'))    { headers.from    = line.slice(5).trim(); return; }
        if (line.startsWith('Date:'))    { headers.date    = line.slice(5).trim(); return; }
        if (line.startsWith('Subject:')) { headers.subject = line.slice(8).trim(); inBody = true; return; }
        if (inBody) body.push(line);
      });

      email = { headers, body: body.filter((l, i, a) => !(l === '' && a[i - 1] === '')) };
    }

    return { websiteLines, email };
  }, [data]);

  const { websiteLines, email } = parsed;

  const url   = websiteLines.find((l) => l.startsWith('http')) || 'https://example.com';
  const title = websiteLines.find((l) => l.includes('**'))?.replace(/\*\*/g, '');
  const body  = websiteLines.filter((l) => l && !l.startsWith('http') && !l.includes('**'));

  return (
    <div className="rd-root" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Website card */}
      {websiteLines.length > 0 && (
        <div className="rd-card">
          {/* Browser chrome */}
          <div style={{ background: '#F1F5F9', borderBottom: '1px solid var(--border)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#FC5755', '#FDBC40', '#34C84A'].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Globe size={11} color="var(--muted)" />
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'DM Sans', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
            </div>
          </div>

          {/* Website body */}
          <div style={{ padding: '24px 28px' }}>
            {title && <h2 style={{ fontFamily: 'Lora', fontSize: 22, fontWeight: 600, color: 'var(--text)', marginBottom: 16, marginTop: 0 }}>{title}</h2>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {body.map((line, i) => (
                <p key={i} className="rd-prose" style={{ margin: 0 }}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Email card */}
      {email && (
        <div className="rd-card">
          {/* Email header strip */}
          <div style={{ background: 'var(--blue)', padding: '14px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Mail size={14} color="rgba(255,255,255,0.8)" />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: 'DM Sans', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</span>
            </div>
            {email.headers.subject && (
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', fontFamily: 'DM Sans', lineHeight: 1.35 }}>{email.headers.subject}</div>
            )}
          </div>

          {/* Meta row */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg)', display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
            {email.headers.from && (
              <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'DM Sans' }}>
                <strong style={{ color: 'var(--text)' }}>From:</strong> {email.headers.from}
              </span>
            )}
            {email.headers.to && (
              <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'DM Sans' }}>
                <strong style={{ color: 'var(--text)' }}>To:</strong> {email.headers.to}
              </span>
            )}
            {email.headers.date && (
              <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'DM Sans' }}>
                <Clock size={10} style={{ display: 'inline', marginRight: 3 }} />{email.headers.date}
              </span>
            )}
          </div>

          {/* Body */}
          <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {email.body.map((line, i) =>
              line === ''
                ? <div key={i} style={{ height: 8 }} />
                : <p key={i} className="rd-prose" style={{ margin: 0 }}>{line}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// PART 8: Chat
// ─────────────────────────────────────────────────────────────
const BUBBLE_COLORS = [
  { dot: '#2563EB', bg: '#EFF6FF', text: '#1E3A8A', border: '#BFDBFE' },
  { dot: '#7C3AED', bg: '#F5F3FF', text: '#3B0764', border: '#DDD6FE' },
  { dot: '#DB2777', bg: '#FDF2F8', text: '#831843', border: '#FBCFE8' },
  { dot: '#059669', bg: '#ECFDF5', text: '#064E3B', border: '#A7F3D0' },
];

const Part8Content = memo(({ data }) => {
  const messages = useMemo(() => {
    const lines = (data?.text || '').split('\n').filter((l) => l.trim());
    return lines.flatMap((line) => {
      const m = line.match(/^(.+?)\s*\((\d{1,2}:\d{2})\):\s*(.+)$/);
      return m ? [{ sender: m[1].trim(), time: m[2], text: m[3] }] : [];
    });
  }, [data]);

  const senderIndex = useMemo(() => {
    const map = {};
    let idx = 0;
    messages.forEach(({ sender }) => {
      if (!(sender in map)) map[sender] = idx++;
    });
    return map;
  }, [messages]);

  if (!messages.length) return (
    <div className="rd-card rd-root" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <MessageCircle size={32} color="var(--muted)" style={{ margin: '0 auto 12px' }} />
      <p style={{ color: 'var(--muted)', fontFamily: 'DM Sans', fontSize: 14 }}>No messages</p>
    </div>
  );

  // Group consecutive same-sender messages
  const groups = [];
  messages.forEach((msg) => {
    const last = groups[groups.length - 1];
    if (last?.sender === msg.sender) last.msgs.push(msg);
    else groups.push({ sender: msg.sender, msgs: [msg] });
  });

  return (
    <div className="rd-card rd-root" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 18px', background: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <MessageCircle size={15} color="var(--blue)" />
        <span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>
          Message Thread
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)', fontFamily: 'DM Sans' }}>
          {messages.length} messages
        </span>
      </div>

      {/* Messages */}
      <div className="rd-scroll" style={{ padding: '16px 18px', maxHeight: 480, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {groups.map((group, gi) => {
          const colors = BUBBLE_COLORS[senderIndex[group.sender] % BUBBLE_COLORS.length];
          const initial = group.sender.charAt(0).toUpperCase();

          return (
            <div key={gi} className="rd-fade" style={{ animationDelay: `${gi * 0.04}s`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              {/* Avatar */}
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: colors.dot, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 800, fontFamily: 'DM Sans' }}>{initial}</span>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: colors.dot, fontFamily: 'DM Sans', marginBottom: 6 }}>
                  {group.sender}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {group.msgs.map((msg, mi) => (
                    <div key={mi} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                      <div style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '4px 12px 12px 12px',
                        padding: '9px 14px',
                        maxWidth: '85%',
                      }}>
                        <p style={{ margin: 0, fontSize: 14, color: colors.text, lineHeight: 1.55, fontFamily: 'DM Sans' }}>{msg.text}</p>
                      </div>
                      <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'DM Sans', whiteSpace: 'nowrap', paddingBottom: 2 }}>{msg.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 18px', background: 'var(--bg)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
        <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'DM Sans' }}>End of conversation</span>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// PLAIN TEXT
// ─────────────────────────────────────────────────────────────
const PlainTextContent = memo(({ data }) => {
  const text       = data?.text || '';
  const paragraphs = text.trim().split(/\n\n+/).filter(Boolean);
  const wordCount  = text.trim().split(/\s+/).filter(Boolean).length;
  const readMins   = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="rd-card rd-root">
      {/* Header */}
      <div style={{ padding: '14px 20px', background: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <BookOpen size={16} color="var(--blue)" />
          <span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>
            {data?.title || 'Reading Passage'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="rd-tag" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>
            <FileText size={10} /> {wordCount} words
          </span>
          <span className="rd-tag" style={{ background: '#F0FDF4', color: '#15803D' }}>
            <Clock size={10} /> ~{readMins} min
          </span>
        </div>
      </div>

      {data?.description && (
        <div style={{ padding: '10px 20px', background: '#FFFBEB', borderBottom: '1px solid #FDE68A', fontSize: 12, color: '#92400E', fontFamily: 'DM Sans', lineHeight: 1.5 }}>
          {data.description}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {paragraphs.map((para, i) => (
          <p key={i} className="rd-prose rd-fade" style={{ margin: 0, animationDelay: `${i * 0.04}s` }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────
const ReadingDisplay = memo(({ data }) => {
  const type = useMemo(() => {
    if (!data) return 'empty';
    if (data.questions?.some((q) => q.type === 'fill') && data.text?.includes('(')) return 'part6';
    if (data.text?.includes('---') || data.text?.includes('To:') || data.text?.includes('From:')) return 'part7';
    if (data.text?.match(/\(\d{1,2}:\d{2}\)/)) return 'part8';
    return 'plain';
  }, [data]);

  if (!data) return (
    <div className="rd-root rd-card" style={{ padding: '48px 20px', textAlign: 'center' }}>
      <BookOpen size={36} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
      <p style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 15, color: '#94A3B8', margin: 0 }}>
        Chọn bài để bắt đầu đọc
      </p>
    </div>
  );

  return (
    <div className="rd-root" style={{ width: '100%' }}>
      <style>{styles}</style>
      {type === 'part6' && <Part6Content data={data} />}
      {type === 'part7' && <Part7Content data={data} />}
      {type === 'part8' && <Part8Content data={data} />}
      {type === 'plain' && <PlainTextContent data={data} />}
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';
export default ReadingDisplay;
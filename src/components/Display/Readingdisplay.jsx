import React, { useState, useMemo, memo, useCallback } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap, Mail, Globe, Clock, User, MessageCircle, FileText, Calendar, Users, CheckCircle2, AlertCircle, Info } from 'lucide-react';

// ==========================================
// OPTIMIZATIONS
// ==========================================
const ScrollOptimizations = `
  .reading-scroll-container {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }
  
  .reading-scroll-container::-webkit-scrollbar {
    width: 6px;
  }
  
  .reading-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .reading-scroll-container::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  
  .reading-scroll-container::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  .no-scroll {
    overflow: visible !important;
  }

  .question-item {
    content-visibility: auto;
    contain-intrinsic-size: 150px;
  }
`;

// ==========================================
// PART 6: TEXT COMPLETION (Lean)
// ==========================================
const Part6Content = memo(({ data }) => {
  const [expanded, setExpanded] = useState(true);

  if (!data?.text || !data?.questions) {
    return <p className="text-red-600 text-sm font-medium">Invalid data</p>;
  }

  const { text, questions } = data;
  const fillQuestions = questions.filter(q => q.type === "fill");
  
  let displayText = text;
  fillQuestions.forEach(q => {
    displayText = displayText.replace(`(${q.id})`, `**${q.id}**`);
  });

  const parts = displayText.split(/\*\*(\d+)\*\*/);

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-200"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold">6</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{data.title}</h2>
            <p className="text-sm text-slate-600 mt-1">{data.description}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {expanded && (
        <div className="px-6 py-6 space-y-6">
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <BookOpen className="w-4 h-4 text-slate-900" />
              <p className="font-semibold text-slate-900 text-sm">Reading Text</p>
            </div>
            <div className="text-slate-700 leading-relaxed text-base">
              {parts.map((part, i) => 
                i % 2 === 0 ? (
                  <span key={i}>{part}</span>
                ) : (
                  <span
                    key={i}
                    className="inline-flex mx-1 px-3 py-1.5 bg-amber-100 border border-amber-300 rounded text-amber-900 font-semibold text-sm hover:bg-amber-200 transition-colors"
                  >
                    [{part}]
                  </span>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Zap className="w-3 h-3" /> Instructions
              </p>
              <p className="text-xs text-blue-800">Select correct answer (A-D).</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <p className="text-xs font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                <Lightbulb className="w-3 h-3" /> Tip
              </p>
              <p className="text-xs text-emerald-800">Read full context first.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Part6Content.displayName = 'Part6Content';

// ==========================================
// PART 7: WEBSITE + EMAIL (Lean)
// ==========================================
const Part7Content = memo(({ data }) => {
  const parseText = useCallback((text) => {
    if (!text?.trim()) return { website: null, email: null };

    const parts = text.split('---');
    const website = parts[0]?.trim().split('\n') || null;
    
    let email = null;
    if (parts[1]) {
      const emailLines = parts[1].trim().split('\n');
      const headers = {};
      const body = [];
      let inBody = false;

      emailLines.forEach(line => {
        line = line.trim();
        if (line.startsWith('To:')) headers.to = line.replace('To:', '').trim();
        else if (line.startsWith('From:')) headers.from = line.replace('From:', '').trim();
        else if (line.startsWith('Subject:')) {
          headers.subject = line.replace('Subject:', '').trim();
          inBody = true;
        }
        else if (line.startsWith('Date:')) headers.date = line.replace('Date:', '').trim();
        else if (inBody && line) body.push(line);
      });
      
      email = { headers, body };
    }

    return { website, email };
  }, []);

  const { website, email } = parseText(data?.text);

  if (!website && !email) {
    return <div className="text-slate-600 text-center py-8">No content</div>;
  }

  return (
    <div className="space-y-6">
      {website && <WebsiteDisplay content={website} />}
      {email && <EmailDisplay emailData={email} />}
    </div>
  );
});

Part7Content.displayName = 'Part7Content';

// Website Display (Simplified)
function WebsiteDisplay({ content }) {
  if (!content?.length) return null;

  const url = content.find(l => l.startsWith('http')) || 'https://example.com';
  const title = content.find(l => l.includes('**'))?.replace(/\*\*/g, '');

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-md">
      <div className="bg-slate-100 border-b border-slate-300 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {['bg-red-500', 'bg-yellow-400', 'bg-green-500'].map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`}></div>
            ))}
          </div>
          <div className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 flex items-center gap-2">
            <Globe className="w-3 h-3 text-slate-600" />
            <span className="text-xs text-slate-700 truncate">{url}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        {title && <h1 className="text-2xl font-bold text-slate-900 mb-6">{title}</h1>}
        <div className="space-y-4 text-slate-700">
          {content.filter(l => l && !l.startsWith('http') && !l.includes('**')).map((line, i) => (
            <p key={i} className="text-base leading-relaxed">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

// Email Display (Simplified)
function EmailDisplay({ emailData }) {
  if (!emailData?.headers) return null;

  const getInitial = (email) => {
    const name = email?.match(/^([^@]+)/)?.[1] || '?';
    return name.charAt(0).toUpperCase();
  };

  const initial = getInitial(emailData.headers.from);

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-md">
      <div className="bg-slate-900 text-white px-6 py-5">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5" />
          <h2 className="text-base font-semibold">Email</h2>
        </div>
        {emailData.headers.subject && (
          <h3 className="text-lg font-semibold">{emailData.headers.subject}</h3>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
          <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">
            {initial}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{emailData.headers.from}</p>
            {emailData.headers.to && <p className="text-sm text-slate-600">To: {emailData.headers.to}</p>}
          </div>
        </div>

        <div className="space-y-3">
          {emailData.body.map((line, i) => (
            <p key={i} className="text-slate-700 leading-relaxed">{line || '\u00A0'}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PART 8: CHAT (Enhanced UI)
// ==========================================
const Part8Content = memo(({ data }) => {
  const parseText = useCallback((text) => {
    if (!text?.trim()) return [];

    const lines = text.split('\n').filter(l => l.trim());
    const messages = [];

    lines.forEach(line => {
      const match = line.match(/^(.+?)\s*\((\d{1,2}:\d{2})\):\s*(.+)$/);
      if (match) {
        messages.push({ sender: match[1].trim(), time: match[2], text: match[3] });
      }
    });

    return messages;
  }, []);

  const messages = parseText(data?.text);

  if (!messages.length) {
    return (
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-8 text-center">
        <MessageCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-slate-600 font-semibold">No messages</p>
      </div>
    );
  }

  const grouped = [];
  let current = null;
  const senders = new Set();

  messages.forEach(msg => {
    senders.add(msg.sender);
    if (!current || current.sender !== msg.sender) {
      current = { sender: msg.sender, msgs: [msg] };
      grouped.push(current);
    } else {
      current.msgs.push(msg);
    }
  });

  const senderColors = {
    0: { bg: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
    1: { bg: 'bg-purple-600', light: 'bg-purple-50', border: 'border-purple-200' },
    2: { bg: 'bg-slate-700', light: 'bg-slate-100', border: 'border-slate-300' },
  };

  const getSenderColor = (sender) => {
    const senderArray = Array.from(senders);
    const index = senderArray.indexOf(sender);
    return senderColors[index % 3];
  };

  const getInitial = (sender) => sender.charAt(0).toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-900/10">
            <MessageCircle className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Message Thread</h2>
            <p className="text-xs text-slate-600 mt-0.5">{messages.length} messages</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="p-6 space-y-5 max-h-[500px] overflow-y-auto">
        {grouped.map((group, gi) => {
          const colors = getSenderColor(group.sender);
          const isFirstGroup = gi === 0;

          return (
            <div key={gi} className="flex flex-col gap-3">
              {/* Sender Label with Avatar */}
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                  {getInitial(group.sender)}
                </div>
                <span className="text-sm font-semibold text-slate-900">{group.sender}</span>
              </div>

              {/* Messages */}
              <div className="ml-11 space-y-2 flex flex-col">
                {group.msgs.map((msg, mi) => (
                  <div key={mi} className="flex flex-col gap-1.5">
                    <div className={`${colors.light} border ${colors.border} rounded-lg px-4 py-3 max-w-md`}>
                      <p className="text-slate-900 text-sm leading-relaxed break-words">{msg.text}</p>
                    </div>
                    <span className="text-xs text-slate-500 pl-1">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span>End of conversation</span>
        </div>
        <span className="text-xs text-slate-500">{messages.length} messages</span>
      </div>
    </div>
  );
});

Part8Content.displayName = 'Part8Content';

// ==========================================
// PLAIN TEXT (Lean)
// ==========================================
const PlainTextContent = memo(({ data }) => {
  const text = data?.text || '';
  const wordCount = text.trim().split(/\s+/).length;
  const paragraphs = text.trim().split('\n\n').filter(p => p.trim());

  return (
    <div className="space-y-6 w-full">
      <div className="bg-white rounded-lg border border-slate-200 shadow-md overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex items-center gap-4">
          <BookOpen className="w-5 h-5 text-slate-900" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">{data?.title || 'Reading'}</h2>
            <p className="text-xs text-slate-600 mt-1">{data?.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 border-b border-slate-200">
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-600">Words</p>
            <p className="text-lg font-bold text-slate-900">{wordCount}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-600">Time</p>
            <p className="text-lg font-bold text-slate-900">~{Math.ceil(wordCount / 200)}m</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-600">Paras</p>
            <p className="text-lg font-bold text-slate-900">{paragraphs.length}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-base text-slate-800 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
            Ready
          </span>
          <span>{wordCount} words • {paragraphs.length} paragraphs</span>
        </div>
      </div>
    </div>
  );
});

PlainTextContent.displayName = 'PlainTextContent';

// ==========================================
// MAIN COMPONENT (Optimized)
// ==========================================
const ReadingDisplay = memo(({ data }) => {
  const contentType = useMemo(() => {
    if (!data) return 'empty';
    if (data.text?.includes('(') && data.questions?.some(q => q.type === 'fill')) return 'part6';
    if (data.text?.includes('---') || data.text?.includes('To:')) return 'part7';
    if (data.text?.match(/\(\d{1,2}:\d{2}\)/)) return 'part8';
    return 'plain';
  }, [data]);

  if (!data) {
    return (
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-10 text-center">
        <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-900 font-semibold">No Content</p>
        <p className="text-slate-600 text-sm mt-2">Select a section</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <style>{ScrollOptimizations}</style>
      {contentType === 'part6' && <Part6Content data={data} />}
      {contentType === 'part7' && <Part7Content data={data} />}
      {contentType === 'part8' && <Part8Content data={data} />}
      {contentType === 'plain' && <PlainTextContent data={data} />}
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';

export default ReadingDisplay;
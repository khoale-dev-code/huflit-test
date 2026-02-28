import React, { useState, useMemo, memo, useCallback } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap, Mail, Globe, Clock, User, MessageCircle, FileText, Calendar, Users, CheckCircle2, AlertCircle, Info } from 'lucide-react';

// ==========================================
// GOOGLE MATERIAL DESIGN SYSTEM
// ==========================================
const MaterialStyles = `
  * {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }
  
  body {
    background: linear-gradient(135deg, #f5f7fa 0%, #f0f3f7 100%);
  }

  .material-surface {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .material-surface:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .reading-typography {
    font-family: 'Segoe UI', 'Roboto', sans-serif;
    font-size: 18px;
    line-height: 1.7;
    letter-spacing: 0.3px;
    color: #202124;
  }

  .reading-scroll {
    scrollbar-width: thin;
    scrollbar-color: #dadce0 transparent;
  }

  .reading-scroll::-webkit-scrollbar {
    width: 8px;
  }

  .reading-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .reading-scroll::-webkit-scrollbar-thumb {
    background: #dadce0;
    border-radius: 4px;
  }

  .reading-scroll::-webkit-scrollbar-thumb:hover {
    background: #5f6368;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-up {
    animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .stagger-1 { animation-delay: 0.05s; }
  .stagger-2 { animation-delay: 0.1s; }
  .stagger-3 { animation-delay: 0.15s; }
`;

// ==========================================
// PART 6: TEXT COMPLETION (Redesigned)
// ==========================================
const Part6Content = memo(({ data }) => {
  const [expanded, setExpanded] = useState(true);

  if (!data?.text || !data?.questions) {
    return <p className="text-red-500 text-sm font-medium">Invalid data</p>;
  }

  const { text, questions } = data;
  const fillQuestions = questions.filter(q => q.type === "fill");
  
  let displayText = text;
  fillQuestions.forEach(q => {
    displayText = displayText.replace(`(${q.id})`, `**${q.id}**`);
  });

  const parts = displayText.split(/\*\*(\d+)\*\*/);

  return (
    <div className="material-surface overflow-hidden transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 sm:px-8 lg:px-10 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-md shrink-0">
            <span className="text-white font-bold text-lg">6</span>
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-gray-900">{data.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{data.description}</p>
          </div>
        </div>
        <div className="text-gray-600 transition-transform duration-300">
          {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </button>

      {expanded && (
        <div className="px-6 sm:px-8 lg:px-10 py-6 space-y-6 fade-in-up">
          {/* Reading Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Reading Text</h3>
            </div>
            
            {/* Main Text with Highlighted Blanks */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="reading-typography leading-8 w-full">
                {parts.map((part, i) => 
                  i % 2 === 0 ? (
                    <span key={i}>{part}</span>
                  ) : (
                    <span
                      key={i}
                      className="inline-block mx-1 px-4 py-2 bg-amber-100 border-2 border-amber-400 rounded-lg text-amber-900 font-semibold text-base hover:bg-amber-200 cursor-pointer transition-all duration-200"
                    >
                      ({part})
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Instructions</p>
                  <p className="text-sm text-blue-800 mt-1">Select the correct answer (A-D) for each blank.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-900 text-sm">Pro Tip</p>
                  <p className="text-sm text-amber-800 mt-1">Read the full context before choosing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Part6Content.displayName = 'Part6Content';

// ==========================================
// PART 7: WEBSITE + EMAIL (Redesigned)
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
    return <div className="text-gray-600 text-center py-8">No content available</div>;
  }

  return (
    <div className="space-y-6">
      {website && <WebsiteDisplay content={website} />}
      {email && <EmailDisplay emailData={email} />}
    </div>
  );
});

Part7Content.displayName = 'Part7Content';

// Website Display Component
function WebsiteDisplay({ content }) {
  if (!content?.length) return null;

  const url = content.find(l => l.startsWith('http')) || 'https://example.com';
  const title = content.find(l => l.includes('**'))?.replace(/\*\*/g, '');
  const bodyContent = content.filter(l => l && !l.startsWith('http') && !l.includes('**'));

  return (
    <div className="material-surface overflow-hidden fade-in-up">
      {/* Browser Header */}
      <div className="bg-gray-100 border-b border-gray-300 px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {[
              'bg-red-500',
              'bg-yellow-500',
              'bg-green-500'
            ].map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${color}`}></div>
            ))}
          </div>
          <div className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 flex items-center gap-2 min-w-0">
            <Globe className="w-4 h-4 text-gray-600 shrink-0" />
            <span className="text-xs text-gray-700 truncate">{url}</span>
          </div>
        </div>
      </div>

      {/* Website Content */}
      <div className="p-8 sm:p-10 lg:p-12">
        {title && (
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
        )}
        <div className="space-y-5 w-full">
          {bodyContent.map((line, i) => (
            <p key={i} className="reading-typography">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// Email Display Component
function EmailDisplay({ emailData }) {
  if (!emailData?.headers) return null;

  const getInitial = (email) => {
    const name = email?.match(/^([^@]+)/)?.[1] || '?';
    return name.charAt(0).toUpperCase();
  };

  const initial = getInitial(emailData.headers.from);
  const nameFromEmail = emailData.headers.from?.match(/^([^@]+)/)?.[1] || 'User';

  return (
    <div className="material-surface overflow-hidden fade-in-up">
      {/* Email Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 lg:px-10 py-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Email</h2>
        </div>
        {emailData.headers.subject && (
          <h3 className="text-xl font-semibold leading-relaxed">{emailData.headers.subject}</h3>
        )}
      </div>

      {/* Email Content */}
      <div className="p-6 sm:p-8 lg:p-10 space-y-6">
        {/* Sender Info */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
            {initial}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{nameFromEmail}</p>
            <p className="text-sm text-gray-600 mt-1">{emailData.headers.from}</p>
            {emailData.headers.to && (
              <p className="text-sm text-gray-600 mt-1">to {emailData.headers.to}</p>
            )}
            {emailData.headers.date && (
              <p className="text-xs text-gray-500 mt-2">{emailData.headers.date}</p>
            )}
          </div>
        </div>

        {/* Email Body */}
        <div className="space-y-5 w-full">
          {emailData.body.map((line, i) => (
            <p key={i} className="reading-typography">
              {line || '​'}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PART 8: CHAT (Redesigned)
// ==========================================
const Part8Content = memo(({ data }) => {
  const parseText = useCallback((text) => {
    if (!text?.trim()) return [];

    const lines = text.split('\n').filter(l => l.trim());
    const messages = [];

    lines.forEach(line => {
      const match = line.match(/^(.+?)\s*\((\d{1,2}:\d{2})\):\s*(.+)$/);
      if (match) {
        messages.push({
          sender: match[1].trim(),
          time: match[2],
          text: match[3]
        });
      }
    });

    return messages;
  }, []);

  const messages = parseText(data?.text);

  if (!messages.length) {
    return (
      <div className="material-surface py-16 text-center">
        <MessageCircle className="w-10 h-10 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-semibold">No messages to display</p>
      </div>
    );
  }

  // Group messages by sender
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

  const senderColors = [
    { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-100' },
    { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-100' },
    { bg: 'bg-pink-600', light: 'bg-pink-50', text: 'text-pink-900', border: 'border-pink-100' },
  ];

  const getSenderColor = (sender) => {
    const senderArray = Array.from(senders);
    const index = senderArray.indexOf(sender);
    return senderColors[index % senderColors.length];
  };

  const getInitial = (sender) => sender.charAt(0).toUpperCase();

  return (
    <div className="material-surface overflow-hidden flex flex-col">
      {/* Chat Header */}
      <div className="px-6 sm:px-8 lg:px-10 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-100">
            <MessageCircle className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Message Thread</h2>
            <p className="text-xs text-gray-600 mt-1">{messages.length} messages</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-6 sm:p-8 lg:p-10 space-y-5 overflow-y-auto reading-scroll max-h-[600px]">
        {grouped.map((group, gi) => {
          const colors = getSenderColor(group.sender);

          return (
            <div key={gi} className="fade-in-up" style={{ animationDelay: `${gi * 0.05}s` }}>
              {/* Sender Label with Avatar */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                  {getInitial(group.sender)}
                </div>
                <span className="font-semibold text-gray-900">{group.sender}</span>
              </div>

              {/* Messages */}
              <div className="ml-13 space-y-2 flex flex-col">
                {group.msgs.map((msg, mi) => (
                  <div key={mi} className="flex flex-col gap-1">
                    <div className={`${colors.light} border ${colors.border} rounded-lg px-5 py-3 w-fit max-w-[85%]`}>
                      <p className={`${colors.text} text-base leading-relaxed break-words`}>
                        {msg.text}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 pl-2 mt-0.5">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Footer */}
      <div className="px-6 sm:px-8 lg:px-10 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          End of conversation
        </span>
        <span>{messages.length} messages</span>
      </div>
    </div>
  );
});

Part8Content.displayName = 'Part8Content';

// ==========================================
// PLAIN TEXT (Redesigned)
// ==========================================
const PlainTextContent = memo(({ data }) => {
  const text = data?.text || '';
  const wordCount = text.trim().split(/\s+/).length;
  const paragraphs = text.trim().split('\n\n').filter(p => p.trim());
  const estimatedTime = Math.ceil(wordCount / 200);

  return (
    <div className="material-surface overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-8 lg:px-10 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-blue-100 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-700" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{data?.title || 'Reading'}</h2>
            <p className="text-sm text-gray-600 mt-1">{data?.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-1 px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="px-4 py-3 rounded-lg hover:bg-white transition-colors text-center">
          <p className="text-xs font-semibold text-gray-600">Words</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{wordCount}</p>
        </div>
        <div className="px-4 py-3 rounded-lg hover:bg-white transition-colors text-center">
          <p className="text-xs font-semibold text-gray-600">Est. Time</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">~{estimatedTime}m</p>
        </div>
        <div className="px-4 py-3 rounded-lg hover:bg-white transition-colors text-center">
          <p className="text-xs font-semibold text-gray-600">Paragraphs</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{paragraphs.length}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 sm:p-10 lg:p-12 space-y-6 w-full">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="reading-typography fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-8 lg:px-10 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Ready to read
        </span>
        <span>{wordCount} words • {paragraphs.length} paragraphs</span>
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
      <div className="material-surface py-16 text-center max-w-2xl mx-auto">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-900 font-semibold text-lg">No Content Available</p>
        <p className="text-gray-600 text-sm mt-2">Select a section to begin reading</p>
      </div>
    );
  }

  return (
    <div className="w-full px-max sm:px-6 lg:px-8 py-6">
      <style>{MaterialStyles}</style>
      
      {/* Dynamic Content Rendering */}
      {contentType === 'part6' && <Part6Content data={data} />}
      {contentType === 'part7' && <Part7Content data={data} />}
      {contentType === 'part8' && <Part8Content data={data} />}
      {contentType === 'plain' && <PlainTextContent data={data} />}
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';

export default ReadingDisplay;
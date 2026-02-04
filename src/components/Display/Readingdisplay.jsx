import React, { useState, useMemo, memo } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap, Mail, Globe, Clock, User, ArrowRight, MessageCircle, FileText, Calendar, Users, CheckCircle2, AlertCircle, Info } from 'lucide-react';

/**
 * ==========================================
 * READING DISPLAY - ENTERPRISE PROFESSIONAL
 * ==========================================
 * Corporate Design System
 * - Premium color palette
 * - Sophisticated typography
 * - Professional spacing & layout
 * - Enterprise micro-interactions
 */

// ==========================================
// PART 6: TEXT COMPLETION DISPLAY
// ==========================================
const Part6Content = memo(({ data }) => {
  const [expandedPart, setExpandedPart] = useState(true);

  if (!data || !data.text || !data.questions) {
    return <p className="text-red-600 text-sm font-medium">Invalid data format</p>;
  }

  const { text, questions } = data;
  const fillQuestions = questions.filter(q => q.type === "fill");
  
  let displayText = text;
  fillQuestions.forEach(question => {
    const blank = `(${question.id})`;
    const marker = `**${question.id}**`;
    displayText = displayText.replace(blank, marker);
  });

  const splitParts = displayText.split(/\*\*(\d+)\*\*/);

  const renderContent = () => (
    <div className="text-slate-700 leading-[1.8] text-[15.5px] font-[450]">
      {splitParts.map((part, index) => {
        if (index % 2 === 0) {
          return <span key={index} className="text-slate-800">{part}</span>;
        } else {
          const questionId = part;
          return (
            <span
              key={index}
              className="inline-flex mx-0.5 px-3.5 py-2
                bg-gradient-to-b from-amber-50 to-amber-50/80 
                border border-amber-300/60 rounded-lg 
                text-amber-900 font-semibold text-xs
                shadow-sm hover:shadow-md hover:border-amber-400/80
                transition-all duration-200 cursor-pointer
                ring-1 ring-amber-200/40"
            >
              [{questionId}]
            </span>
          );
        }
      })}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <button
        onClick={() => setExpandedPart(!expandedPart)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors border-b border-slate-200 group"
      >
        <div className="flex items-center gap-4 text-left flex-1">
          <div className="flex-shrink-0 w-10 h-10 
            bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg 
            flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-base">6</span>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{data.title}</h2>
            <p className="text-sm text-slate-600 mt-1 font-[450]">{data.description}</p>
          </div>
        </div>
        
        <div className="flex-shrink-0 text-slate-400 group-hover:text-slate-900 transition-colors">
          {expandedPart ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {expandedPart && (
        <div className="px-6 py-6 space-y-6 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-slate-50 to-slate-50/70 rounded-lg p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3.5 pb-3 border-b border-slate-200">
              <div className="p-2 bg-slate-900/10 rounded-lg">
                <BookOpen className="w-4 h-4 text-slate-900" strokeWidth={2.2} />
              </div>
              <p className="font-semibold text-slate-900 text-sm">Reading Text</p>
            </div>
            {renderContent()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-50/60 rounded-lg p-4 border border-blue-200/50 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> Instructions
              </p>
              <p className="text-xs text-blue-800 leading-relaxed font-[450]">Select the correct answer (A, B, C, or D) to fill in each blank space.</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/60 rounded-lg p-4 border border-emerald-200/50 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-xs font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5" /> Tip
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed font-[450]">Read the entire text to understand the context before answering.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Part6Content.displayName = 'Part6Content';

// ==========================================
// PART 7: WEBSITE + EMAIL DISPLAY
// ==========================================
const Part7Content = memo(({ data }) => {
  const parseText = (inputText) => {
    try {
      if (!inputText || typeof inputText !== 'string') {
        return { website: null, email: null };
      }

      const trimmed = inputText.trim();
      if (trimmed.length === 0) {
        return { website: null, email: null };
      }

      let websiteContent = [];
      let emailData = { headers: {}, body: [] };
      const hasSeparator = trimmed.includes('---');
      
      if (hasSeparator) {
        const parts = trimmed.split('---');
        
        if (parts[0]) {
          websiteContent = parts[0].trim().split('\n');
        }
        
        if (parts[1]) {
          const emailLines = parts[1].trim().split('\n');
          let isHeaderSection = true;
          
          for (let line of emailLines) {
            line = line.trim();
            
            if (line === '**Email Message**' || line === 'Email Message') {
              continue;
            }
            
            if (line.startsWith('**To:**') || line.startsWith('To:')) {
              emailData.headers.to = line.replace(/\*\*?To:\*\*?\s*/, '').trim();
            }
            else if (line.startsWith('**From:**') || line.startsWith('From:')) {
              emailData.headers.from = line.replace(/\*\*?From:\*\*?\s*/, '').trim();
            }
            else if (line.startsWith('**Date:**') || line.startsWith('Date:')) {
              emailData.headers.date = line.replace(/\*\*?Date:\*\*?\s*/, '').trim();
            }
            else if (line.startsWith('**Subject:**') || line.startsWith('Subject:')) {
              emailData.headers.subject = line.replace(/\*\*?Subject:\*\*?\s*/, '').trim();
              isHeaderSection = false;
            }
            else if (!isHeaderSection && line.length > 0) {
              emailData.body.push(line);
            }
            else if (!isHeaderSection) {
              emailData.body.push('');
            }
          }
        }
      } else {
        const lines = trimmed.split('\n');
        let isEmailSection = false;
        
        for (let line of lines) {
          line = line.trim();
          
          if (line.startsWith('To:') || line.startsWith('**To:**')) {
            isEmailSection = true;
            emailData.headers.to = line.replace(/\*\*?To:\*\*?\s*/, '').trim();
          }
          else if (line.startsWith('From:') || line.startsWith('**From:**')) {
            emailData.headers.from = line.replace(/\*\*?From:\*\*?\s*/, '').trim();
          }
          else if (line.startsWith('Date:') || line.startsWith('**Date:**')) {
            emailData.headers.date = line.replace(/\*\*?Date:\*\*?\s*/, '').trim();
          }
          else if (line.startsWith('Subject:') || line.startsWith('**Subject:**')) {
            emailData.headers.subject = line.replace(/\*\*?Subject:\*\*?\s*/, '').trim();
          }
          else if (line.length > 0) {
            if (isEmailSection) {
              emailData.body.push(line);
            } else {
              websiteContent.push(line);
            }
          } else if (isEmailSection) {
            emailData.body.push('');
          }
        }
      }
      
      return {
        website: websiteContent.length > 0 ? websiteContent : null,
        email: Object.keys(emailData.headers).length > 0 ? emailData : null
      };
    } catch (error) {
      console.error('Error parsing text:', error);
      return { website: null, email: null };
    }
  };

  const { website, email } = parseText(data?.text || '');

  if (!website && !email) {
    return (
      <div className="bg-slate-50 border border-slate-300 rounded-lg p-8 text-center">
        <p className="text-slate-600 text-sm font-medium">No content to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {website && <WebsiteDisplay content={website} />}
      {email && <EmailDisplay emailData={email} />}
    </div>
  );
});

Part7Content.displayName = 'Part7Content';

// ==========================================
// WEBSITE DISPLAY COMPONENT
// ==========================================
function WebsiteDisplay({ content }) {
  if (!content || content.length === 0) return null;

  let url = '';
  let title = '';
  let subtitle = '';
  let sections = [];
  let currentSection = { title: '', items: [], text: [] };

  content.forEach((line, idx) => {
    if (line.startsWith('http') && !url) {
      url = line;
    }
    else if (!title && line.includes('**') && idx < 3) {
      title = line.replace(/\*\*/g, '');
    }
    else if (!subtitle && title && line.length > 0 && idx < 5) {
      subtitle = line.replace(/\*\*/g, '');
    }
    else if (line.startsWith('**') && line.endsWith('**')) {
      if (currentSection.title || currentSection.items.length > 0 || currentSection.text.length > 0) {
        sections.push({ ...currentSection });
      }
      currentSection = { title: line.replace(/\*\*/g, ''), items: [], text: [] };
    }
    else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.+)$/);
      if (match) {
        currentSection.items.push(match[2].replace(/\*\*/g, ''));
      }
    }
    else if (line.length > 0) {
      currentSection.text.push(line.replace(/\*\*/g, ''));
    }
  });

  if (currentSection.title || currentSection.items.length > 0 || currentSection.text.length > 0) {
    sections.push(currentSection);
  }

  return (
    <div className="bg-white border border-slate-200 shadow-md rounded-xl overflow-hidden">
      {/* Browser Bar */}
      <div className="bg-gradient-to-b from-slate-100 to-slate-100/80 border-b border-slate-300 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-sm"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm"></div>
          </div>
          <div className="flex-1 bg-white border border-slate-300 rounded-md px-3 py-2 flex items-center gap-2 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-xs text-slate-700 truncate font-medium">{url || 'https://www.example.com'}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/95 p-8">
        {title && (
          <div className="text-center mb-8 pb-6 border-b border-slate-200">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base text-slate-600 italic font-[450] mt-2">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-l-4 border-slate-900 pl-4">
                  {section.title}
                </h2>
              )}
              
              {section.text.length > 0 && (
                <div className="space-y-4 mb-5">
                  {section.text.map((para, pIdx) => (
                    <p key={pIdx} className="text-base text-slate-700 leading-[1.75] font-[450]">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {section.items.length > 0 && (
                <div className="space-y-3">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex gap-4 items-start bg-slate-50/60 p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {iIdx + 1}
                      </div>
                      <p className="flex-1 text-base text-slate-800 leading-relaxed pt-0.5 font-[450]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// EMAIL DISPLAY COMPONENT
// ==========================================
function EmailDisplay({ emailData }) {
  if (!emailData || !emailData.headers) return null;

  const getInitial = (text) => {
    return text ? text.charAt(0).toUpperCase() : '?';
  };

  const getName = (email) => {
    if (!email) return '';
    const match = email.match(/^([^@]+)@/);
    if (match) {
      return match[1].split(/[._-]/).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return email;
  };

  const getAvatarColor = (email) => {
    const colors = [
      'from-slate-900 to-slate-800',
      'from-blue-700 to-blue-600',
      'from-purple-700 to-purple-600',
      'from-indigo-700 to-indigo-600',
      'from-slate-700 to-slate-600',
      'from-slate-800 to-slate-700',
    ];
    const index = (email?.charCodeAt(0) || 0) % colors.length;
    return colors[index];
  };

  const senderName = getName(emailData.headers.from);
  const senderInitial = getInitial(senderName);
  const avatarColor = getAvatarColor(emailData.headers.from);

  return (
    <div className="bg-white border border-slate-200 shadow-md rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Email</h2>
            <p className="text-xs text-slate-600 hidden md:block font-[450]">Message</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
          
          {/* Subject Bar */}
          {emailData.headers.subject && (
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Subject
                  </div>
                  <h3 className="text-lg font-semibold text-white leading-tight break-words">
                    {emailData.headers.subject}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Sender Info */}
          <div className="bg-slate-50/50 border-b border-slate-200 px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 bg-gradient-to-br ${avatarColor} rounded-lg flex items-center justify-center shadow-sm`}>
                  <span className="text-white font-bold text-base">
                    {senderInitial}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-slate-900 mb-1 truncate">
                  {senderName}
                </h4>
                <p className="text-sm text-slate-600 font-[450] truncate mb-3">
                  {emailData.headers.from}
                </p>

                <div className="space-y-2.5">
                  {emailData.headers.to && (
                    <div className="flex items-center gap-2.5 text-xs bg-white px-3 py-2 rounded-md border border-slate-200 w-fit">
                      <User className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                      <span className="text-slate-700 font-semibold">To:</span>
                      <span className="text-slate-800 font-[450] truncate">{emailData.headers.to}</span>
                    </div>
                  )}
                  {emailData.headers.date && (
                    <div className="flex items-center gap-2.5 text-xs bg-white px-3 py-2 rounded-md border border-slate-200 w-fit">
                      <Clock className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                      <span className="text-slate-700 font-[450]">{emailData.headers.date}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white px-8 py-8 min-h-[220px]">
            <div className="max-w-3xl">
              <div className="space-y-4 text-slate-700">
                {emailData.body.map((line, idx) => (
                  line === '' ? (
                    <div key={idx} className="h-2"></div>
                  ) : (
                    <p key={idx} className="text-base leading-relaxed text-slate-700 font-[450]">
                      {line}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Reply</span>
              </button>
              <button className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-medium text-sm shadow-xs hover:shadow-sm transition-all">
                Forward
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span>End of message</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PART 8: CHAT/MESSAGE THREADS
// ==========================================
const Part8Content = memo(({ data }) => {
  const parseText = (inputText) => {
    try {
      if (!inputText || typeof inputText !== 'string') {
        return [];
      }

      const trimmed = inputText.trim();
      if (trimmed.length === 0) {
        return [];
      }

      const sections = [];
      const lines = trimmed.split('\n');
      
      let currentSection = { type: 'text', content: [] };
      let chatMeta = { platform: '', date: '', participants: '' };
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (!line) continue;
        
        line = line.trim();
        if (!line) continue;

        if (line.match(/^\*\*.*Thread\*\*$/i) || 
            line.match(/^\*\*.*Conversation\*\*$/i) ||
            line.match(/^\*\*.*Chat\*\*$/i) ||
            line.match(/^\*\*.*Messages?\*\*$/i)) {
          
          if (currentSection.content && currentSection.content.length > 0) {
            sections.push(currentSection);
            currentSection = { type: 'text', content: [] };
          }

          const headerTitle = line.replace(/\*\*/g, '').trim();
          sections.push({ 
            type: 'chat-header', 
            title: headerTitle,
          });
          continue;
        }

        if (line.startsWith('**Date:**')) {
          const dateMatch = line.match(/\*\*Date:\*\*\s*(.+)/);
          if (dateMatch) {
            chatMeta.date = dateMatch[1].trim();
            
            if (currentSection.type === 'textmessage' && currentSection.messages?.length > 0) {
              sections.push(currentSection);
              sections.push({ type: 'date-separator', date: chatMeta.date });
              currentSection = { type: 'textmessage', messages: [], meta: { ...chatMeta } };
            } else {
              sections.push({ type: 'date-separator', date: chatMeta.date });
            }
          }
          continue;
        }

        if (line.startsWith('**Participants:**')) {
          const participantsMatch = line.match(/\*\*Participants:\*\*\s*(.+)/);
          if (participantsMatch) {
            chatMeta.participants = participantsMatch[1].trim();
          }
          continue;
        }

        const textMsgMatch = line.match(/^([A-Za-z0-9\s.]+?)\s*\((\d{1,2}:\d{2})\):\s*(.+)$/);
        
        if (textMsgMatch && textMsgMatch[1] && textMsgMatch[2] && textMsgMatch[3]) {
          if (currentSection.type !== 'textmessage') {
            if (currentSection.content && currentSection.content.length > 0) {
              sections.push(currentSection);
            }
            currentSection = { 
              type: 'textmessage', 
              messages: [], 
              meta: { ...chatMeta } 
            };
          }
          
          currentSection.messages.push({
            sender: textMsgMatch[1].trim(),
            time: textMsgMatch[2],
            message: textMsgMatch[3]
          });
        } else {
          if (currentSection.type === 'textmessage' && currentSection.messages && currentSection.messages.length > 0) {
            sections.push(currentSection);
            currentSection = { type: 'text', content: [] };
          }
          
          currentSection.content.push(line);
        }
      }
      
      if (currentSection.type === 'textmessage' && currentSection.messages && currentSection.messages.length > 0) {
        sections.push(currentSection);
      } else if (currentSection.content && currentSection.content.length > 0) {
        sections.push(currentSection);
      }
      
      return sections.filter(s => s.type !== 'text' || s.content.some(c => c.length > 0));
    } catch (error) {
      console.error('Error parsing text:', error);
      return [];
    }
  };

  const renderTextMessages = (section) => {
    if (!section?.messages || !Array.isArray(section.messages) || section.messages.length === 0) {
      return null;
    }

    const uniqueSenders = Array.from(new Set(section.messages.map(msg => msg.sender)));
    const groupedMessages = [];
    let currentGroup = null;

    section.messages.forEach((msg) => {
      if (!currentGroup || currentGroup.sender !== msg.sender) {
        currentGroup = { sender: msg.sender, messages: [msg] };
        groupedMessages.push(currentGroup);
      } else {
        currentGroup.messages.push(msg);
      }
    });

    const senderColors = {};
    const colors = [
      { name: 'text-slate-900', bubble: 'bg-slate-900 text-white', received: 'bg-slate-100 text-slate-900' },
      { name: 'text-blue-700', bubble: 'bg-blue-700 text-white', received: 'bg-slate-100 text-slate-900' },
      { name: 'text-purple-700', bubble: 'bg-purple-700 text-white', received: 'bg-slate-100 text-slate-900' },
    ];
    
    uniqueSenders.forEach((sender, index) => {
      senderColors[sender] = colors[index % colors.length];
    });
    
    const firstSender = section.messages[0]?.sender;
    
    return (
      <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
        
        <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-slate-600" />
            <p className="text-slate-800 font-semibold text-sm truncate">
              {section.meta?.participants || 'Conversation'}
            </p>
          </div>
          {section.meta?.date && (
            <div className="flex items-center gap-2 text-slate-600 text-xs font-[450]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{section.meta.date}</span>
            </div>
          )}
        </div>

        <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto">
          {groupedMessages.map((group, groupIdx) => {
            const colorScheme = senderColors[group.sender] || colors[0];
            const isFirstSender = group.sender === firstSender;
            
            return (
              <div key={groupIdx} className="flex flex-col">
                <div className={`mb-2 flex items-center gap-2 ${isFirstSender ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs font-semibold ${colorScheme.name}`}>
                    {group.sender}
                  </span>
                </div>

                <div className={`flex ${isFirstSender ? 'justify-end' : 'justify-start'}`}>
                  <div className="space-y-2 max-w-[80%]">
                    {group.messages.map((msg, msgIdx) => (
                      <div key={msgIdx} className={`flex ${isFirstSender ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`px-4 py-3 rounded-lg shadow-xs text-sm leading-relaxed break-words transition-all font-[450] ${
                            isFirstSender ? colorScheme.bubble : colorScheme.received
                          }`}
                          style={{
                            borderTopRightRadius: isFirstSender && msgIdx === 0 ? '4px' : '10px',
                            borderTopLeftRadius: !isFirstSender && msgIdx === 0 ? '4px' : '10px',
                            borderBottomRightRadius: isFirstSender && msgIdx === group.messages.length - 1 ? '4px' : '10px',
                            borderBottomLeftRadius: !isFirstSender && msgIdx === group.messages.length - 1 ? '4px' : '10px',
                          }}
                        >
                          {msg.message}
                        </div>
                      </div>
                    ))}
                    
                    <div className={`mt-2 ${isFirstSender ? 'text-right' : 'text-left'}`}>
                      <span className="text-xs text-slate-600 font-[450]">
                        {group.messages[group.messages.length - 1]?.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChatHeader = (section) => {
    let gradientFrom = 'from-slate-900';
    let gradientTo = 'to-slate-800';
    
    const titleLower = section.title.toLowerCase();
    
    if (titleLower.includes('linkedin')) {
      gradientFrom = 'from-blue-700';
      gradientTo = 'to-blue-600';
    } else if (titleLower.includes('whatsapp')) {
      gradientFrom = 'from-green-700';
      gradientTo = 'to-green-600';
    }

    return (
      <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden mb-6">
        <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} px-6 py-5`}>
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-white/20 flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-semibold text-lg truncate">
                {section.title}
              </h2>
              <p className="text-white/70 text-xs font-[450] mt-1 hidden md:block">
                Professional chat conversation
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDateSeparator = (section) => (
    <div className="flex items-center gap-3.5 my-4">
      <div className="flex-1 h-px bg-slate-300"></div>
      <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full shadow-xs border border-slate-200">
        <Calendar className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-xs font-semibold text-slate-700">{section.date}</span>
      </div>
      <div className="flex-1 h-px bg-slate-300"></div>
    </div>
  );

  const renderText = (section) => (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
      <div className="space-y-4">
        {Array.isArray(section.content) && section.content.map((line, idx) => (
          <p key={idx} className="text-slate-800 leading-relaxed text-base font-[450]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );

  const sections = parseText(data?.text || '');

  if (!sections || sections.length === 0) {
    return (
      <div className="bg-slate-50 rounded-lg shadow-md border border-slate-200 p-8 text-center">
        <FileText className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-slate-700 font-semibold text-sm">No content to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {sections.map((section, idx) => {
        if (!section) return null;
        
        if (section.type === 'chat-header') {
          return <div key={idx}>{renderChatHeader(section)}</div>;
        } else if (section.type === 'textmessage') {
          return <div key={idx}>{renderTextMessages(section)}</div>;
        } else if (section.type === 'date-separator') {
          return <div key={idx}>{renderDateSeparator(section)}</div>;
        } else {
          return <div key={idx}>{renderText(section)}</div>;
        }
      })}
    </div>
  );
});

Part8Content.displayName = 'Part8Content';

// ==========================================
// PLAIN TEXT DISPLAY - PROFESSIONAL
// ==========================================
const PlainTextContent = memo(({ data }) => {
  const text = data?.text || '';
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  const paragraphs = text.trim().split('\n\n').filter(p => p.trim());

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-slate-900/10 shadow-sm border border-slate-200/50">
            <BookOpen className="w-5 h-5 text-slate-900" strokeWidth={2.2} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-slate-900">{data?.title || 'Reading'}</h2>
            <p className="text-sm text-slate-600 mt-1.5 font-[450]">{data?.description || ''}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3.5">
          <div className="bg-gradient-to-br from-blue-50 to-blue-50/70 rounded-lg p-4 border border-blue-200/50 shadow-xs hover:shadow-sm transition-shadow">
            <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider">Words</p>
            <p className="text-2xl font-bold text-blue-900 mt-2">{wordCount.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-50/70 rounded-lg p-4 border border-amber-200/50 shadow-xs hover:shadow-sm transition-shadow">
            <p className="text-xs font-semibold text-amber-900 uppercase tracking-wider">Time</p>
            <p className="text-2xl font-bold text-amber-900 mt-2">~{readingTime}m</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-50/70 rounded-lg p-4 border border-purple-200/50 shadow-xs hover:shadow-sm transition-shadow">
            <p className="text-xs font-semibold text-purple-900 uppercase tracking-wider">Paragraphs</p>
            <p className="text-2xl font-bold text-purple-900 mt-2">{paragraphs.length}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-slate-900">
              Reading Content
            </p>
            <p className="text-xs text-slate-600 mt-1 font-[450]">Professional reading material</p>
          </div>
          <div className="hidden md:flex w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" strokeWidth={2.2} />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 max-h-[60rem] overflow-y-auto">
          <div className="space-y-6">
            {paragraphs.map((paragraph, idx) => (
              <div key={idx} className="flex gap-5 group">
                {/* Line Number */}
                <div className="hidden md:flex items-start pt-1">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 group-hover:bg-slate-200 rounded px-3 py-1.5 h-fit flex-shrink-0 transition-colors duration-200 w-8 text-center">
                    {idx + 1}
                  </span>
                </div>
                
                {/* Paragraph */}
                <p className="text-base leading-[1.8] text-slate-800 break-words group-hover:text-slate-900 transition-colors duration-200 font-[450]">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-t border-slate-200 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></div>
            <span className="text-xs text-slate-700 font-semibold">Ready to read</span>
          </div>
          <div className="text-xs text-slate-600 font-[450]">
            {wordCount} words • {paragraphs.length} paragraphs
          </div>
        </div>
      </div>

      {/* Reading Tips */}
      <div className="bg-gradient-to-br from-blue-50/80 to-blue-50 rounded-lg border border-blue-200/50 p-5 shadow-xs hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-blue-900 rounded-lg flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 text-sm mb-2.5">Professional Reading Tips</h3>
            <ul className="text-xs text-blue-800 space-y-2 font-[450]">
              <li className="flex gap-2.5"><span className="text-blue-700 font-bold">•</span> <span>Read methodically and focus on each paragraph's key concepts</span></li>
              <li className="flex gap-2.5"><span className="text-blue-700 font-bold">•</span> <span>Annotate important terms and critical information</span></li>
              <li className="flex gap-2.5"><span className="text-blue-700 font-bold">•</span> <span>Maintain comprehension even with unfamiliar terminology</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

PlainTextContent.displayName = 'PlainTextContent';

// ==========================================
// MAIN COMPONENT
// ==========================================
const ReadingDisplay = memo(({ data }) => {
  const contentType = useMemo(() => {
    if (!data) return 'empty';

    if (data.text && data.questions && 
        data.questions.some(q => q.type === 'fill')) {
      return 'part6';
    }

    if (data.text && (data.text.includes('---') || data.text.includes('To:') || data.text.includes('From:'))) {
      return 'part7';
    }

    if (data.text && (data.text.match(/\(\d{1,2}:\d{2}\)/) || data.text.includes('**Chat') || data.text.includes('**Message'))) {
      return 'part8';
    }

    return 'plain';
  }, [data]);

  if (!data) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200 shadow-md p-10 text-center">
        <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-4" strokeWidth={1.8} />
        <p className="text-slate-900 font-semibold text-base">No Content</p>
        <p className="text-slate-600 text-sm mt-2 font-[450]">Select a section to view content</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 w-full">
      {contentType === 'part6' && <Part6Content data={data} />}
      {contentType === 'part7' && <Part7Content data={data} />}
      {contentType === 'part8' && <Part8Content data={data} />}
      {contentType === 'plain' && <PlainTextContent data={data} />}
    </div>
  );
});

ReadingDisplay.displayName = 'ReadingDisplay';

export default ReadingDisplay;
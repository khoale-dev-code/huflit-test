// ReadingPart8Display.jsx
import React from 'react';
import { MessageCircle, FileText, Calendar, Users, Zap } from 'lucide-react';

/**
 * Component hiển thị text đề bài Reading Part 8 (Multiple Texts/Chat Threads)
 * Đã tối ưu hóa cho Mobile-First, giao diện hiện đại (Chat UI), kích thước chữ phù hợp.
 */
export default function ReadingPart8Display({ text = '', type = 'general' }) {
  
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
      let hasHeader = false;
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (!line) continue;
        
        line = line.trim();
        if (!line) continue;

        // ===== Detect chat header title =====
        if (line.match(/^\*\*.*Thread\*\*$/i) || 
            line.match(/^\*\*.*Conversation\*\*$/i) ||
            line.match(/^\*\*.*Chat\*\*$/i) ||
            line.match(/^\*\*.*Messages?\*\*$/i)) {
          
          // Flush previous section if it's not empty
          if (currentSection.content && currentSection.content.length > 0) {
            sections.push(currentSection);
            currentSection = { type: 'text', content: [] };
          }

          const headerTitle = line.replace(/\*\*/g, '').trim();
          sections.push({ 
            type: 'chat-header', 
            title: headerTitle,
          });
          hasHeader = true;
          continue;
        }

        // Detect date header
        if (line.startsWith('**Date:**')) {
          const dateMatch = line.match(/\*\*Date:\*\*\s*(.+)/);
          if (dateMatch) {
            chatMeta.date = dateMatch[1].trim();
            
            // Nếu đang trong tin nhắn và có tin nhắn, kết thúc khối tin nhắn và chèn Date Separator
            if (currentSection.type === 'textmessage' && currentSection.messages?.length > 0) {
              sections.push(currentSection);
              sections.push({ type: 'date-separator', date: chatMeta.date });
              // Bắt đầu khối tin nhắn mới với meta mới
              currentSection = { type: 'textmessage', messages: [], meta: { ...chatMeta } };
            } else {
              sections.push({ type: 'date-separator', date: chatMeta.date });
            }
          }
          continue;
        }

        // Detect participants
        if (line.startsWith('**Participants:**')) {
          const participantsMatch = line.match(/\*\*Participants:\*\*\s*(.+)/);
          if (participantsMatch) {
            chatMeta.participants = participantsMatch[1].trim();
          }
          continue;
        }

        // Detect text message format: "Name (Time): Message" 
        const textMsgMatch = line.match(/^([A-Za-z0-9\s.]+?)\s*\((\d{1,2}:\d{2})\):\s*(.+)$/);
        
        if (textMsgMatch && textMsgMatch[1] && textMsgMatch[2] && textMsgMatch[3]) {
          if (currentSection.type !== 'textmessage') {
            // Flush previous text section
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
          // Regular text line
          // Nếu đang trong khối tin nhắn, kết thúc nó
          if (currentSection.type === 'textmessage' && currentSection.messages && currentSection.messages.length > 0) {
            sections.push(currentSection);
            currentSection = { type: 'text', content: [] };
          }
          
          // Thêm dòng text vào khối text hiện tại
          currentSection.content.push(line);
        }
      }
      
      // Flush the last section
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

    // Lấy ra tất cả tên người gửi duy nhất
    const uniqueSenders = Array.from(new Set(section.messages.map(msg => msg.sender)));
    
    // Nhóm tin nhắn liên tiếp từ cùng một người
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

    // Xác định màu cho từng người (có thể dùng hash map thay cho mảng để màu sắc luôn ổn định)
    const senderColors = {};
    const colors = [
      { bg: 'bg-blue-500', text: 'text-white', name: 'text-blue-600', badge: 'bg-blue-100' },
      { bg: 'bg-purple-500', text: 'text-white', name: 'text-purple-600', badge: 'bg-purple-100' },
      { bg: 'bg-emerald-500', text: 'text-white', name: 'text-emerald-600', badge: 'bg-emerald-100' },
    ];
    
    uniqueSenders.forEach((sender, index) => {
      senderColors[sender] = colors[index % colors.length];
    });
    
    // Giả định người gửi đầu tiên là người "My Message" (bên phải)
    const firstSender = section.messages[0]?.sender;
    
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden text-sm">
        
        {/* Metadata Header (Gọn hơn trên di động) */}
        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <p className="text-gray-700 font-semibold text-xs md:text-sm truncate">
              {section.meta?.participants || 'Group Conversation'}
            </p>
          </div>
          {section.meta?.date && (
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Calendar className="w-3 h-3" />
              <span className="font-medium">{section.meta.date}</span>
            </div>
          )}
        </div>

        {/* Messages Container */}
        <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto md:p-6 md:space-y-6">
          {groupedMessages.map((group, groupIdx) => {
            const colorScheme = senderColors[group.sender] || colors[0];
            // Xác định người gửi này có phải là người gửi đầu tiên (giả định là người dùng hiện tại/bên phải)
            const isFirstSender = group.sender === firstSender; 
            const bubbleAlign = isFirstSender ? 'justify-end' : 'justify-start';
            
            return (
              <div key={groupIdx} className="flex flex-col">
                
                {/* Tên người gửi */}
                <div className={`mb-1 flex items-center gap-2 ${isFirstSender ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs font-bold ${colorScheme.name} md:text-sm`}>
                    {group.sender}
                  </span>
                </div>

                {/* Các tin nhắn trong nhóm */}
                <div className={`flex ${bubbleAlign}`}>
                  <div className="space-y-1 max-w-[85%] md:max-w-[75%]">
                    {group.messages.map((msg, msgIdx) => (
                      <div key={msgIdx} className={`flex ${isFirstSender ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`px-4 py-2 rounded-xl shadow-md ${isFirstSender ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} break-words transition-all duration-150`}
                          style={{
                            // Tạo hiệu ứng "đuôi" tin nhắn
                            borderTopRightRadius: isFirstSender && msgIdx === 0 ? '4px' : '12px',
                            borderTopLeftRadius: !isFirstSender && msgIdx === 0 ? '4px' : '12px',
                            borderBottomLeftRadius: isFirstSender && msgIdx === group.messages.length - 1 ? '12px' : '4px',
                            borderBottomRightRadius: !isFirstSender && msgIdx === group.messages.length - 1 ? '12px' : '4px',
                          }}
                        >
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Thời gian chỉ hiển thị sau tin nhắn cuối cùng trong nhóm */}
                    <div className={`mt-0.5 ${isFirstSender ? 'text-right' : 'text-left'}`}>
                      <span className="text-xs text-gray-500 font-medium">
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
    // Tự động detect icon và màu sắc dựa trên title
    let Icon = MessageCircle;
    let gradientFrom = 'from-green-600';
    let gradientTo = 'to-emerald-500';
    let iconBg = 'bg-green-500';
    
    const titleLower = section.title.toLowerCase();
    
    // Logic detection cho các nền tảng chat nổi tiếng
    if (titleLower.includes('linkedin')) {
      Icon = () => (
        <svg className="w-5 h-5 text-white md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
      gradientFrom = 'from-[#0077B5]';
      gradientTo = 'to-[#005885]';
      iconBg = 'bg-[#0077B5]';
    } else if (titleLower.includes('whatsapp')) {
      Icon = () => (
        <svg className="w-5 h-5 text-white md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      );
      gradientFrom = 'from-[#25D366]';
      gradientTo = 'to-[#128C7E]';
      iconBg = 'bg-[#25D366]';
    } else if (titleLower.includes('slack')) {
      Icon = () => (
        <svg className="w-5 h-5 text-white md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
        </svg>
      );
      gradientFrom = 'from-[#4A154B]';
      gradientTo = 'to-[#36C5F0]';
      iconBg = 'bg-[#4A154B]';
    } else if (titleLower.includes('messenger') || titleLower.includes('facebook')) {
      Icon = MessageCircle;
      gradientFrom = 'from-[#0084FF]';
      gradientTo = 'to-[#00C6FF]';
      iconBg = 'bg-[#0084FF]';
    } else if (titleLower.includes('telegram')) {
      Icon = () => (
        <svg className="w-5 h-5 text-white md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      );
      gradientFrom = 'from-[#0088cc]';
      gradientTo = 'to-[#229ED9]';
      iconBg = 'bg-[#0088cc]';
    }

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-4 md:mb-6">
        <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} px-4 py-3 md:px-6 md:py-4`}>
          <div className="flex items-center gap-3 md:gap-4">
            {/* Icon với hiệu ứng đẹp */}
            <div className={`${iconBg} p-2 rounded-lg shadow-md flex-shrink-0`}>
              <Icon />
            </div>
            
            {/* Title */}
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-lg tracking-tight truncate md:text-xl drop-shadow">
                {section.title}
              </h2>
              <p className="text-white/80 text-xs font-medium mt-0.5 hidden md:block">
                Professional Communication Thread
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDateSeparator = (section) => (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
      <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
        <Calendar className="w-3 h-3 text-gray-500" />
        <span className="text-xs font-semibold text-gray-600">{section.date}</span>
      </div>
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
    </div>
  );

  const renderText = (section) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-6">
      <div className="space-y-3">
        {Array.isArray(section.content) && section.content.map((line, idx) => (
          <p key={idx} className="text-gray-800 leading-relaxed text-sm md:text-base">
            {line}
          </p>
        ))}
      </div>
    </div>
  );

  const sections = parseText(text);

  if (!sections || sections.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 text-center">
        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500 font-semibold text-sm">Không có nội dung để hiển thị.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 reading-part8-container">
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
}
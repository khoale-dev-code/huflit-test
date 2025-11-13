// ReadingPart8Display.jsx
import React from 'react';
import { MessageCircle, FileText } from 'lucide-react';

/**
 * Component hiển thị text đề bài Reading Part 8 (Text Message Chain)
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
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (!line) continue;
        
        line = line.trim();
        if (!line) continue;

        // Detect text message format: "Name (Time): Message" (supports "Mr. Name", "Ms. Name", etc.)
        const textMsgMatch = line.match(/^([A-Za-z\s.]+?)\s*\((\d{1,2}:\d{2})\):\s*(.+)$/);
        
        if (textMsgMatch && textMsgMatch[1] && textMsgMatch[2] && textMsgMatch[3]) {
          // Nếu section hiện tại không phải text message, lưu lại
          if (currentSection.type !== 'textmessage') {
            if (currentSection.content && currentSection.content.length > 0) {
              sections.push(currentSection);
            }
            currentSection = { type: 'textmessage', messages: [] };
          }
          
          currentSection.messages.push({
            sender: textMsgMatch[1].trim(),
            time: textMsgMatch[2],
            message: textMsgMatch[3]
          });
        } else {
          // Xử lý các dòng khác
          if (currentSection.type === 'textmessage' && currentSection.messages && currentSection.messages.length > 0) {
            sections.push(currentSection);
            currentSection = { type: 'text', content: [] };
          }
          
          currentSection.content.push(line);
        }
      }
      
      // Thêm section cuối cùng
      if (currentSection.type === 'textmessage' && currentSection.messages && currentSection.messages.length > 0) {
        sections.push(currentSection);
      } else if (currentSection.content && currentSection.content.length > 0) {
        sections.push(currentSection);
      }
      
      return sections;
    } catch (error) {
      console.error('Error parsing text:', error);
      return [];
    }
  };

  const renderTextMessages = (section) => {
    if (!section?.messages || !Array.isArray(section.messages) || section.messages.length === 0) {
      return null;
    }

    const firstSender = section.messages[0]?.sender;
    
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

    return (
      <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-white" />
          <h3 className="text-white font-bold text-lg">Text Message Chain</h3>
        </div>

        <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
          {groupedMessages.map((group, groupIdx) => {
            const isFirstSender = group.sender === firstSender;
            const bubbleColor = isFirstSender 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-300 text-gray-900';
            const bubbleAlign = isFirstSender ? 'justify-end' : 'justify-start';

            return (
              <div key={groupIdx}>
                <div className={`flex ${bubbleAlign} px-2 mb-1`}>
                  <span className={`text-xs font-semibold ${isFirstSender ? 'text-gray-500' : 'text-gray-600'}`}>
                    {group.sender}
                  </span>
                </div>

                <div className={`flex ${bubbleAlign} gap-2`}>
                  <div className="space-y-1 max-w-xs">
                    {group.messages.map((msg, msgIdx) => (
                      <div key={msgIdx} className={`px-4 py-2 rounded-2xl shadow-sm ${bubbleColor} break-words`}>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`flex ${bubbleAlign} px-2 mt-1`}>
                  <span className="text-xs text-gray-500">
                    {group.messages[group.messages.length - 1]?.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderText = (section) => (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 space-y-3">
      {Array.isArray(section.content) && section.content.map((line, idx) => (
        <p key={idx} className="text-gray-800 leading-relaxed text-base">{line}</p>
      ))}
    </div>
  );

  const sections = parseText(text);

  if (!sections || sections.length === 0) {
    return (
      <div className="bg-gray-50 rounded-2xl shadow-lg border-2 border-gray-200 p-6 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500 font-semibold">No content to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => {
        if (!section) return null;
        
        if (section.type === 'textmessage') {
          return <div key={idx}>{renderTextMessages(section)}</div>;
        } else {
          return <div key={idx}>{renderText(section)}</div>;
        }
      })}
    </div>
  );
}
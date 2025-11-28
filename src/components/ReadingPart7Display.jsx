// ReadingPart7Display.jsx
import React from 'react';
import { Mail, Building2, Calendar, FileText, Zap } from 'lucide-react';

/**
 * Component hiển thị text đề bài Reading Part 7 một cách đẹp mắt
 * Hỗ trợ: Email, Advertisement, Article, Notice, Letter, etc.
 * Đã tối ưu hóa cho Mobile-First với Tailwind CSS.
 */
export default function ReadingPart7Display({ text = '', type = 'general' }) {
  
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
      
      for (let line of lines) {
        line = line.trim();
        
        // Detect email header (Bắt đầu khối email mới)
        if (line.startsWith('**To:**') || line.startsWith('To:')) {
          if (currentSection.content.length > 0 && currentSection.type !== 'email') {
            sections.push(currentSection);
          }
          if (currentSection.type !== 'email') {
            currentSection = { type: 'email', headers: {}, content: [] };
          }
          currentSection.headers.to = line.replace(/\*\*?To:\*\*?\s*/, '').trim();
        }
        else if (line.startsWith('**From:**') || line.startsWith('From:')) {
          if (currentSection.type === 'email') {
            currentSection.headers.from = line.replace(/\*\*?From:\*\*?\s*/, '').trim();
          }
        }
        else if (line.startsWith('**Date:**') || line.startsWith('Date:')) {
          if (currentSection.type === 'email') {
            currentSection.headers.date = line.replace(/\*\*?Date:\*\*?\s*/, '').trim();
          }
        }
        else if (line.startsWith('**Subject:**') || line.startsWith('Subject:')) {
          if (currentSection.type === 'email') {
            currentSection.headers.subject = line.replace(/\*\*?Subject:\*\*?\s*/, '').trim();
          }
        }
        // Detect general headers/titles (Bắt đầu khối Section mới)
        else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
          if (currentSection.content.length > 0 || currentSection.type === 'email') {
            sections.push(currentSection);
          }
          currentSection = { 
            type: 'section', 
            title: line.replace(/\*\*/g, ''),
            content: [] 
          };
        }
        // Detect numbered lists
        else if (/^\d+\.\s\*\*([^*]+)\*\*\s*[–-]?\s*(.+)?$/.test(line)) {
          const match = line.match(/^(\d+)\.\s\*\*([^*]+)\*\*\s*[–-]?\s*(.+)?$/);
          if (match) {
            // Đảm bảo chuyển sang kiểu 'text' nếu đang ở 'email' và thêm vào content
            if (currentSection.type === 'email') {
              currentSection.type = 'text'; // Chuyển sang text body sau header
            }
            currentSection.content.push({
              type: 'numbered-item',
              number: match[1],
              title: match[2].trim(),
              description: match[3] ? match[3].trim() : ''
            });
          }
        }
        // Detect separator
        else if (line === '---') {
          if (currentSection.content.length > 0 || currentSection.type === 'email') {
            sections.push(currentSection);
          }
          currentSection = { type: 'separator' };
          sections.push(currentSection);
          currentSection = { type: 'text', content: [] };
        }
        // Regular text
        else if (line.length > 0) {
          // Nếu đang trong khối email và không phải header, thì là body
          if (currentSection.type === 'email' && !currentSection.headers.subject) {
            currentSection.type = 'text'; // Tự động chuyển type sang text body
          }
          currentSection.content.push(line);
        }
      }
      
      if (currentSection.content.length > 0 || currentSection.type === 'email' || currentSection.type === 'section') {
        sections.push(currentSection);
      }
      
      // Lọc bỏ các khối text rỗng
      return sections.filter(s => 
        s.type === 'separator' || s.type === 'email' || (s.content && s.content.length > 0)
      );
    } catch (error) {
      console.error('Error parsing text:', error);
      return [];
    }
  };

  const renderEmail = (section) => (
    <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden text-sm md:text-base">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 flex items-center gap-2">
        <Mail className="w-4 h-4 text-white md:w-5 md:h-5" />
        <h3 className="text-white font-bold text-base md:text-lg">Email Message</h3>
      </div>

      <div className="p-4 space-y-3 md:p-6">
        {/* Email Headers */}
        <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-x-3 gap-y-1 pb-3 border-b border-gray-200">
          {section.headers?.to && (
            <>
              <span className="text-xs font-semibold text-gray-600">To:</span>
              <span className="text-xs text-gray-800 font-medium bg-gray-50 px-2 py-1 rounded truncate md:text-sm">
                {section.headers.to}
              </span>
            </>
          )}
          {section.headers?.from && (
            <>
              <span className="text-xs font-semibold text-gray-600">From:</span>
              <span className="text-xs text-gray-800 font-medium bg-gray-50 px-2 py-1 rounded truncate md:text-sm">
                {section.headers.from}
              </span>
            </>
          )}
          {section.headers?.date && (
            <>
              <span className="text-xs font-semibold text-gray-600">Date:</span>
              <span className="text-xs text-gray-800 bg-gray-50 px-2 py-1 rounded flex items-center gap-1 md:text-sm">
                <Calendar className="w-3 h-3 text-gray-500" />
                {section.headers.date}
              </span>
            </>
          )}
          {section.headers?.subject && (
            <>
              <span className="text-xs font-semibold text-gray-600">Subject:</span>
              <span className="text-sm text-blue-800 font-bold bg-blue-50 px-2 py-1 rounded">{section.headers.subject}</span>
            </>
          )}
        </div>
        
        {/* Email Body */}
        <div className="space-y-3 pt-2">
          {Array.isArray(section.content) && section.content.map((line, idx) => (
            <p key={idx} className="text-gray-800 leading-relaxed text-sm">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSection = (section) => (
    <div className="bg-white rounded-xl shadow-md border border-orange-100 overflow-hidden text-sm md:text-base">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-2 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-white md:w-5 md:h-5" />
        <h3 className="text-white font-bold text-base md:text-lg">{section.title}</h3>
      </div>
      
      <div className="p-4 space-y-4 md:p-6">
        {Array.isArray(section.content) && section.content.map((item, idx) => {
          if (typeof item === 'string') {
            return <p key={idx} className="text-gray-800 leading-relaxed text-sm">{item}</p>;
          } else if (item?.type === 'numbered-item') {
            return (
              <div key={idx} className="flex gap-3 items-start p-2 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-xs md:w-8 md:h-8 md:text-sm">
                  {item.number}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-0 text-sm">{item.title}</h4>
                  {item.description && (
                    <p className="text-gray-700 leading-relaxed text-xs mt-0.5 md:text-sm">{item.description}</p>
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );

  const renderText = (section) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-3 md:p-6">
      {Array.isArray(section.content) && section.content.map((line, idx) => (
        // Sử dụng thẻ div thay vì p nếu line là rỗng (để tạo khoảng cách giữa đoạn)
        <div key={idx} className="text-gray-800 leading-relaxed text-sm">
          {line || <span className="block h-2"></span>}
        </div>
      ))}
    </div>
  );

  const renderSeparator = () => (
    <div className="flex items-center gap-3 my-4 md:my-6">
      <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="flex gap-1">
        <Zap className="w-4 h-4 text-yellow-500" />
      </div>
      <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </div>
  );

  const sections = parseText(text);

  if (!sections || sections.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl shadow-inner border-2 border-gray-200 p-6 text-center">
        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-3 md:w-12 md:h-12" />
        <p className="text-gray-500 font-semibold text-sm">Không có nội dung để hiển thị.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {sections.map((section, idx) => {
        if (!section) return null;
        
        if (section.type === 'email') {
          return <div key={idx}>{renderEmail(section)}</div>;
        } else if (section.type === 'section') {
          return <div key={idx}>{renderSection(section)}</div>;
        } else if (section.type === 'separator') {
          return <div key={idx}>{renderSeparator()}</div>;
        } else {
          return <div key={idx}>{renderText(section)}</div>;
        }
      })}
    </div>
  );
}
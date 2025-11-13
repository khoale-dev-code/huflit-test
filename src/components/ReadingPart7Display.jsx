 // ReadingPart7Display.jsx
import React from 'react';
import { Mail, Building2, Calendar, FileText } from 'lucide-react';

/**
 * Component hiển thị text đề bài Reading Part 7 một cách đẹp mắt
 * Hỗ trợ: Email, Advertisement, Article, Notice, Letter, etc.
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
        
        // Detect email header
        if (line.startsWith('**To:**') || line.startsWith('To:')) {
          if (currentSection.content.length > 0) {
            sections.push(currentSection);
          }
          currentSection = { type: 'email', headers: {}, content: [] };
          currentSection.headers.to = line.replace(/\*\*/g, '').replace('To:', '').trim();
        }
        else if (line.startsWith('**From:**') || line.startsWith('From:')) {
          if (currentSection.type === 'email') {
            currentSection.headers.from = line.replace(/\*\*/g, '').replace('From:', '').trim();
          }
        }
        else if (line.startsWith('**Date:**') || line.startsWith('Date:')) {
          if (currentSection.type === 'email') {
            currentSection.headers.date = line.replace(/\*\*/g, '').replace('Date:', '').trim();
          }
        }
        else if (line.startsWith('**Subject:**') || line.startsWith('Subject:')) {
          if (currentSection.type === 'email') {
            currentSection.headers.subject = line.replace(/\*\*/g, '').replace('Subject:', '').trim();
          }
        }
        // Detect headers/titles
        else if (line.startsWith('**') && line.endsWith('**')) {
          if (currentSection.content.length > 0) {
            sections.push(currentSection);
          }
          currentSection = { 
            type: 'section', 
            title: line.replace(/\*\*/g, ''),
            content: [] 
          };
        }
        // Detect numbered lists
        else if (/^\d+\.\s\*\*/.test(line)) {
          const match = line.match(/^(\d+)\.\s\*\*([^*]+)\*\*\s*[–-]?\s*(.+)?$/);
          if (match) {
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
          if (currentSection.content.length > 0) {
            sections.push(currentSection);
          }
          currentSection = { type: 'separator' };
          sections.push(currentSection);
          currentSection = { type: 'text', content: [] };
        }
        // Regular text
        else if (line.length > 0) {
          currentSection.content.push(line);
        }
      }
      
      if (currentSection.content.length > 0 || currentSection.type === 'separator') {
        sections.push(currentSection);
      }
      
      return sections;
    } catch (error) {
      console.error('Error parsing text:', error);
      return [];
    }
  };

  const renderEmail = (section) => (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 flex items-center gap-2">
        <Mail className="w-5 h-5 text-white" />
        <h3 className="text-white font-bold text-lg">Email Message</h3>
      </div>
      <div className="p-6 space-y-3">
        {/* Email Headers */}
        <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-2 pb-4 border-b-2 border-gray-200">
          {section.headers?.to && (
            <>
              <span className="text-sm font-black text-gray-700">To:</span>
              <span className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-1 rounded">{section.headers.to}</span>
            </>
          )}
          {section.headers?.from && (
            <>
              <span className="text-sm font-black text-gray-700">From:</span>
              <span className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-1 rounded">{section.headers.from}</span>
            </>
          )}
          {section.headers?.date && (
            <>
              <span className="text-sm font-black text-gray-700">Date:</span>
              <span className="text-sm text-gray-900 bg-gray-50 px-3 py-1 rounded flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                {section.headers.date}
              </span>
            </>
          )}
          {section.headers?.subject && (
            <>
              <span className="text-sm font-black text-gray-700">Subject:</span>
              <span className="text-sm text-gray-900 font-semibold bg-blue-50 px-3 py-1 rounded">{section.headers.subject}</span>
            </>
          )}
        </div>
        
        {/* Email Body */}
        <div className="space-y-3 pt-2">
          {Array.isArray(section.content) && section.content.map((line, idx) => (
            <p key={idx} className="text-gray-800 leading-relaxed">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSection = (section) => (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg border-2 border-orange-200 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-white" />
        <h3 className="text-white font-bold text-lg">{section.title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {Array.isArray(section.content) && section.content.map((item, idx) => {
          if (typeof item === 'string') {
            return <p key={idx} className="text-gray-800 leading-relaxed">{item}</p>;
          } else if (item?.type === 'numbered-item') {
            return (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-sm">
                  {item.number}
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-gray-900 mb-1">{item.title}</h4>
                  {item.description && (
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
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
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 space-y-3">
      {Array.isArray(section.content) && section.content.map((line, idx) => (
        <p key={idx} className="text-gray-800 leading-relaxed">{line}</p>
      ))}
    </div>
  );

  const renderSeparator = () => (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
      </div>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
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
// ReadingPart7Display.jsx
import React from 'react';
import { Mail, Globe, Clock, User, ArrowRight } from 'lucide-react';

/**
 * Component hiển thị text đề bài Reading Part 7
 * Hỗ trợ: Website/Advertisement phía trên, Email phía dưới
 */
export default function ReadingPart7Display({ text = '' }) {
  
  const parseText = (inputText) => {
    try {
      if (!inputText || typeof inputText !== 'string') {
        return { website: null, email: null };
      }

      const trimmed = inputText.trim();
      if (trimmed.length === 0) {
        return { website: null, email: null };
      }

      // Split by separator "---" or detect email section by "To:"
      let websiteContent = [];
      let emailData = { headers: {}, body: [] };
      
      // Check if there's a separator
      const hasSeparator = trimmed.includes('---');
      
      if (hasSeparator) {
        // Split by separator
        const parts = trimmed.split('---');
        
        // First part is website
        if (parts[0]) {
          websiteContent = parts[0].trim().split('\n');
        }
        
        // Second part is email
        if (parts[1]) {
          const emailLines = parts[1].trim().split('\n');
          let isHeaderSection = true;
          
          for (let line of emailLines) {
            line = line.trim();
            
            // Skip "Email Message" header
            if (line === '**Email Message**' || line === 'Email Message') {
              continue;
            }
            
            // Parse email headers
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
              isHeaderSection = false; // After subject, body starts
            }
            // Email body content
            else if (!isHeaderSection && line.length > 0) {
              emailData.body.push(line);
            }
            else if (!isHeaderSection) {
              emailData.body.push(''); // Preserve empty lines
            }
          }
        }
      } else {
        // Fallback: detect by "To:" keyword
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

  const { website, email } = parseText(text);

  // Debug log
  console.log('Parsed data:', { 
    hasWebsite: !!website, 
    hasEmail: !!email,
    emailHeaders: email?.headers 
  });

  if (!website && !email) {
    return (
      <div className="bg-gray-50 border-2 border-gray-300 rounded p-8 text-center">
        <p className="text-gray-500 text-sm">Không có nội dung để hiển thị.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {website && <WebsiteDisplay content={website} />}
      {email && <EmailDisplay emailData={email} />}
    </div>
  );
}

/**
 * Component hiển thị Website/Advertisement
 */
function WebsiteDisplay({ content }) {
  if (!content || content.length === 0) return null;

  // Parse website content
  let url = '';
  let title = '';
  let subtitle = '';
  let sections = [];
  let currentSection = { title: '', items: [], text: [] };

  content.forEach((line, idx) => {
    // URL detection
    if (line.startsWith('http') && !url) {
      url = line;
    }
    // Main title
    else if (!title && line.includes('**') && idx < 3) {
      title = line.replace(/\*\*/g, '');
    }
    // Subtitle
    else if (!subtitle && title && line.length > 0 && idx < 5) {
      subtitle = line.replace(/\*\*/g, '');
    }
    // Section headers
    else if (line.startsWith('**') && line.endsWith('**')) {
      if (currentSection.title || currentSection.items.length > 0 || currentSection.text.length > 0) {
        sections.push({ ...currentSection });
      }
      currentSection = { title: line.replace(/\*\*/g, ''), items: [], text: [] };
    }
    // Numbered lists
    else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.+)$/);
      if (match) {
        currentSection.items.push(match[2].replace(/\*\*/g, ''));
      }
    }
    // Regular text
    else if (line.length > 0) {
      currentSection.text.push(line.replace(/\*\*/g, ''));
    }
  });

  if (currentSection.title || currentSection.items.length > 0 || currentSection.text.length > 0) {
    sections.push(currentSection);
  }

  return (
    <div className="bg-white border-2 border-gray-300 shadow-md">
      {/* Browser Bar */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-400 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600 shadow-sm"></div>
          </div>
          <div className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs text-gray-700 truncate font-medium">{url || 'http://www.globalexectravel.com'}</span>
          </div>
          <button className="w-7 h-7 bg-gray-300 hover:bg-gray-400 rounded flex items-center justify-center border border-gray-400 shadow-sm transition-colors">
            <span className="text-gray-700 font-bold text-xs">▶</span>
          </button>
        </div>
      </div>

      {/* Website Content */}
      <div className="bg-white p-6 md:p-10">
        {/* Header */}
        {title && (
          <div className="text-center mb-6 pb-5 border-b-2 border-gray-300">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-base text-gray-700 italic mt-2">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
                  {section.title}
                </h2>
              )}
              
              {/* Text paragraphs */}
              {section.text.length > 0 && (
                <div className="space-y-3 mb-4">
                  {section.text.map((para, pIdx) => (
                    <p key={pIdx} className="text-sm md:text-base text-gray-800 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {/* Numbered items */}
              {section.items.length > 0 && (
                <div className="space-y-3">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex gap-3 items-start bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                        {iIdx + 1}
                      </span>
                      <p className="flex-1 text-sm md:text-base text-gray-800 leading-relaxed pt-1">
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

/**
 * Component hiển thị Email - Giao diện đẹp và hiện đại
 */
/**
 * Component hiển thị Email - Giao diện đẹp và hiện đại (Optimized for mobile)
 */
function EmailDisplay({ emailData }) {
  if (!emailData || !emailData.headers) return null;

  // Extract first letter for avatar
  const getInitial = (text) => {
    return text ? text.charAt(0).toUpperCase() : '?';
  };

  // Extract name from email
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

  // Generate random color for avatar
  const getAvatarColor = (email) => {
    const colors = [
      'from-blue-500 to-blue-700',
      'from-purple-500 to-purple-700',
      'from-pink-500 to-pink-700',
      'from-indigo-500 to-indigo-700',
      'from-teal-500 to-teal-700',
      'from-green-500 to-green-700',
    ];
    const index = (email?.charCodeAt(0) || 0) % colors.length;
    return colors[index];
  };

  const senderName = getName(emailData.headers.from);
  const senderInitial = getInitial(senderName);
  const avatarColor = getAvatarColor(emailData.headers.from);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl overflow-hidden border border-gray-200">
      {/* Email Client Header - Compact Design */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm md:text-lg font-bold text-gray-900">Email</h2>
              <p className="text-xs text-gray-500 hidden md:block">Inbox Message</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Message Container */}
      <div className="p-3 md:p-6">
        <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
          
          {/* Email Subject Banner - Compact */}
          {emailData.headers.subject && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 md:px-6 py-3 md:py-5">
              <div className="flex items-start gap-2 md:gap-3">
                <Mail className="w-4 h-4 md:w-6 md:h-6 text-white mt-0.5 md:mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-0.5 md:mb-1">
                    Subject
                  </div>
                  <h3 className="text-base md:text-xl lg:text-2xl font-bold text-white leading-tight break-words">
                    {emailData.headers.subject}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Email Header Information - Compact */}
          <div className="bg-gradient-to-b from-gray-50 to-white border-b-2 border-gray-200 px-4 md:px-6 py-3 md:py-5">
            <div className="flex items-start gap-3 md:gap-4">
              {/* Avatar - Smaller on mobile */}
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br ${avatarColor} rounded-full flex items-center justify-center shadow-lg ring-2 md:ring-4 ring-white`}>
                  <span className="text-white font-bold text-base md:text-xl">
                    {senderInitial}
                  </span>
                </div>
              </div>

              {/* Sender Details - Responsive */}
              <div className="flex-1 min-w-0">
                <div className="mb-2 md:mb-3">
                  <h4 className="text-sm md:text-lg font-bold text-gray-900 mb-0.5 md:mb-1 truncate">
                    {senderName}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 font-medium truncate">
                    {emailData.headers.from}
                  </p>
                </div>

                {/* To and Date Info - Stack on mobile */}
                <div className="space-y-1.5 md:space-y-2">
                  {emailData.headers.to && (
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm overflow-hidden">
                      <div className="flex items-center gap-1.5 md:gap-2 bg-blue-50 px-2 md:px-3 py-1 md:py-1.5 rounded-md border border-blue-200 min-w-0">
                        <User className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-600 font-medium flex-shrink-0">To:</span>
                        <span className="text-gray-900 font-semibold truncate">{emailData.headers.to}</span>
                      </div>
                    </div>
                  )}
                  {emailData.headers.date && (
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                      <div className="flex items-center gap-1.5 md:gap-2 bg-gray-100 px-2 md:px-3 py-1 md:py-1.5 rounded-md border border-gray-200">
                        <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{emailData.headers.date}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Email Body - Optimized font sizes */}
          <div className="bg-white px-4 md:px-8 lg:px-10 py-5 md:py-8 lg:py-10 min-h-[200px]">
            <div className="max-w-3xl">
              <div className="space-y-3 md:space-y-4 text-gray-800">
                {emailData.body.map((line, idx) => (
                  line === '' ? (
                    <div key={idx} className="h-2 md:h-4"></div>
                  ) : (
                    <p key={idx} className="text-sm md:text-base leading-relaxed text-gray-700">
                      {line}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Email Footer Actions - Compact on mobile */}
          <div className="bg-gradient-to-b from-gray-50 to-gray-100 border-t-2 border-gray-200 px-4 md:px-6 py-3 md:py-5">
            <div className="flex items-center justify-between flex-wrap gap-2 md:gap-4">
              <div className="flex items-center gap-2 md:gap-3">
                <button className="group px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-xs md:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 md:gap-2">
                  <Mail className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Reply</span>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform hidden md:inline" />
                </button>
                <button className="px-4 md:px-6 py-2 md:py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg font-semibold text-xs md:text-sm shadow-sm hover:shadow-md transition-all">
                  Forward
                </button>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-xs text-gray-500">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="hidden md:inline">End of message</span>
                <span className="md:hidden">End</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}   
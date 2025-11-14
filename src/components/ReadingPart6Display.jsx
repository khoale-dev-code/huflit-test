import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

const Part6Display = ({ part6 = null }) => {
  const [expandedPart, setExpandedPart] = useState(true);

  if (!part6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-semibold">Không tìm thấy dữ liệu Part 6</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = (part6Data) => {
    if (!part6Data || !part6Data.text || !part6Data.questions) {
      console.error('❌ Invalid part6Data:', part6Data);
      return <p className="text-red-600">Dữ liệu không hợp lệ</p>;
    }

    const { text, questions } = part6Data;
    console.log('📝 Text:', text.substring(0, 100));
    console.log('❓ Questions:', questions);

    const fillQuestions = questions.filter(q => q.type === "fill");
    console.log('✅ Fill questions:', fillQuestions);
    
    let displayText = text;
    fillQuestions.forEach(question => {
      const blank = `(${question.id})`;
      const marker = `**${question.id}**`;
      console.log(`Replacing ${blank} with ${marker}`);
      displayText = displayText.replace(blank, marker);
    });

    console.log('📋 Display text after replace:', displayText.substring(0, 200));
    const splitParts = displayText.split(/\*\*(\d+)\*\*/);

    return (
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
        {splitParts.map((part, index) => {
          if (index % 2 === 0) {
            return <span key={index} className="text-gray-800">{part}</span>;
          } else {
            const questionId = parseInt(part);
            return (
              <span
                key={index}
                className="inline-block mx-1 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 border-2 border-amber-300 rounded-md text-amber-900 font-bold text-xs md:text-sm shadow-sm hover:shadow-md transition-shadow"
              >
                ({questionId})
              </span>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      {/* Part Header */}
      <button
        onClick={() => setExpandedPart(!expandedPart)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center gap-4 text-left flex-1">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P6</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{part6.title}</h2>
            <p className="text-sm text-gray-600">{part6.description}</p>
          </div>
        </div>
        <div className="flex-shrink-0">
          {expandedPart ? (
            <ChevronUp className="w-6 h-6 text-gray-400" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </button>

      {/* Part Content */}
      {expandedPart && (
        <div className="px-6 py-6 space-y-6">
          {/* Email Content */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-6 border border-slate-200">
            {renderContent(part6)}
          </div>

          {/* Tips Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-sm font-semibold text-blue-900 mb-1">📝 Hướng dẫn</p>
              <p className="text-sm text-blue-800">Điền từ/cụm thích hợp vào các chỗ trống được đánh dấu</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-sm font-semibold text-green-900 mb-1">✨ Mẹo</p>
              <p className="text-sm text-green-800">Đọc toàn bộ văn bản trước khi trả lời từng câu</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Part6Display;
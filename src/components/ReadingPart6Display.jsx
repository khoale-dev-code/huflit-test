import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap } from 'lucide-react';

/**
 * Component hiển thị đề bài Reading Part 6 (Text Completion)
 * Đã tối ưu hóa cho Mobile-First, giao diện hiện đại, kích thước chữ phù hợp.
 */
const Part6Display = ({ part6 = null }) => {
  const [expandedPart, setExpandedPart] = useState(true);

  // --- 1. Xử lý trường hợp không có dữ liệu ---
  if (!part6) {
    return (
      <div className="bg-red-50 rounded-xl shadow-md border border-red-200 p-4 text-center">
        <p className="text-red-700 font-semibold text-sm flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" /> Không tìm thấy dữ liệu Part 6
        </p>
      </div>
    );
  }

  // --- 2. Hàm render nội dung văn bản ---
  const renderContent = (part6Data) => {
    if (!part6Data || !part6Data.text || !part6Data.questions) {
      return <p className="text-red-600 text-sm">Dữ liệu văn bản không hợp lệ</p>;
    }

    const { text, questions } = part6Data;
    
    const fillQuestions = questions.filter(q => q.type === "fill");
    
    let displayText = text;
    // Thay thế các blank placeholder (ví dụ: (131)) bằng marker (**131**)
    fillQuestions.forEach(question => {
      const blank = `(${question.id})`;
      const marker = `**${question.id}**`;
      displayText = displayText.replace(blank, marker);
    });

    // Tách văn bản tại các marker (**ID**)
    const splitParts = displayText.split(/\*\*(\d+)\*\*/);

    return (
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
        {splitParts.map((part, index) => {
          // Phần text thông thường
          if (index % 2 === 0) {
            return <span key={index} className="text-gray-800">{part}</span>;
          } 
          // Phần chỗ trống (Question ID)
          else {
            const questionId = part; // Đây là ID dạng chuỗi (ví dụ: "131")
            return (
              <span
                key={index}
                className="inline-block mx-1.5 px-3 py-0.5 
                  bg-amber-50 border-2 border-amber-400 rounded-lg 
                  text-amber-900 font-extrabold text-xs shadow-inner 
                  md:text-sm"
              >
                ({questionId})
              </span>
            );
          }
        })}
      </div>
    );
  };

  // --- 3. Component chính ---
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      
      {/* Part Header (Collapse/Expand Button) */}
      <button
        onClick={() => setExpandedPart(!expandedPart)}
        className="w-full p-4 md:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-gray-100"
      >
        <div className="flex items-center gap-3 md:gap-4 text-left flex-1">
          {/* Icon/Badge */}
          <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 
            bg-gradient-to-br from-blue-600 to-blue-500 rounded-full 
            flex items-center justify-center shadow-md">
            <span className="text-white font-black text-sm md:text-base">P6</span>
          </div>
          
          {/* Title and Description */}
          <div>
            <h2 className="text-base font-bold text-gray-900 md:text-lg">{part6.title}</h2>
            <p className="text-xs text-gray-500 md:text-sm">{part6.description}</p>
          </div>
        </div>
        
        {/* Expand/Collapse Icon */}
        <div className="flex-shrink-0">
          {expandedPart ? (
            <ChevronUp className="w-5 h-5 text-blue-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Part Content */}
      {expandedPart && (
        <div className="px-4 py-4 space-y-4 md:px-6 md:py-6 md:space-y-6">
          
          {/* Văn bản gốc của Part 6 */}
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-inner">
            <div className="flex items-center gap-2 mb-3 border-b pb-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <p className="font-bold text-blue-800 text-sm">Văn bản (Text Completion)</p>
            </div>
            {renderContent(part6)}
          </div>

          {/* Tips Section */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {/* Hướng dẫn */}
            <div className 
              ="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500 shadow-sm">
              <p className="text-sm font-bold text-blue-900 mb-0.5 flex items-center gap-1">
                <Zap className="w-4 h-4" /> Hướng dẫn
              </p>
              <p className="text-xs text-blue-800 md:text-sm">Chọn từ/cụm thích hợp (từ A, B, C, hoặc D) để điền vào các chỗ trống.</p>
            </div>
            
            {/* Mẹo */}
            <div className 
              ="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500 shadow-sm">
              <p className="text-sm font-bold text-amber-900 mb-0.5 flex items-center gap-1">
                <Lightbulb className="w-4 h-4" /> Mẹo làm bài
              </p>
              <p className="text-xs text-amber-800 md:text-sm">Đọc nhanh toàn bộ văn bản để hiểu ngữ cảnh trước khi tập trung vào từng câu hỏi.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Part6Display;
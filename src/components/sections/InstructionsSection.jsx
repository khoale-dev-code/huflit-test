import React, { memo } from 'react';
import { BookOpen, Info, Zap } from 'lucide-react';
// Giả định các component này đã được tối ưu hóa
import { CollapsibleSection } from '../common/CollapsibleSection'; 
import { InfoCard } from '../common/InfoCard'; 

// Sử dụng memo để tránh re-render không cần thiết nếu props không đổi
export const InstructionsSection = memo(({ 
  isOpen, 
  onToggle, 
  isSignedIn, 
  authProvider 
}) => {
  
  // 1. Tối ưu hóa dữ liệu: Trực quan hóa thông tin đăng nhập
  const authStatus = isSignedIn 
    ? {
      text: `✓ Đã đăng nhập. Tiến độ được lưu tự động! (Provider: ${authProvider === 'clerk' ? 'Clerk' : 'Firebase'})`,
      className: "text-green-700 font-bold",
    }
    : {
      text: "Đăng nhập để lưu tiến độ học tập và theo dõi thành tích.",
      className: "text-red-600 font-bold",
    };

  const instructionItems = [
    { key: "1", label: "Navbar:", detail: "Chuyển đổi giữa Listening, Reading, Ngữ Pháp, Từ Vựng" },
    { key: "2", label: "Listening:", detail: "Chọn giọng nam/nữ, điều chỉnh tốc độ, nhấn Play để nghe" },
    { key: "3", label: "Reading:", detail: "Đọc đoạn văn và chọn đáp án phù hợp" },
    { key: "4", label: "Full Exam:", detail: "Thi thử toàn bộ bài thi với timer tự động" },
    { key: "5", label: "", detail: authStatus.text, className: authStatus.className },
  ];

  const importantNotes = [
    { key: "1", label: "Listening:", detail: "Dùng Chrome/Edge cho trải nghiệm tốt nhất" },
    { key: "2", label: "Chấm điểm:", detail: "Listening 5đ/câu, Reading 2.5đ/câu" },
    { key: "3", label: "Tự động lưu:", detail: "Tiến độ được lưu sau mỗi lần hoàn thành bài tập khi đã đăng nhập" },
    { key: "4", label: "Full Exam:", detail: "Tổng 90 phút. Tự động chuyển section sau 30/60 phút" }
  ];

  // Hàm chuyển đổi data thành JSX (sử dụng list/table đơn giản thay vì chỉ là span)
  const renderItems = (items) => {
    return items.map(item => (
      <li key={item.key} className={`text-gray-700 text-sm py-1 border-b border-gray-100 last:border-b-0 ${item.className || ''}`}>
        {item.label && <strong className="text-gray-800 mr-1">{item.label}</strong>}
        {item.detail}
      </li>
    ));
  };

  // --- Thay thế InfoCard bằng cấu trúc đã tối ưu (nếu không thể chỉnh sửa InfoCard) ---
  // Nếu InfoCard đã tối ưu, ta vẫn gọi nó. Tôi sẽ giả định InfoCard được tối ưu.
  
  return (
    // Thêm một container nhẹ nhàng, mượt mà cho toàn bộ section
    <div className="space-y-4 md:space-y-6"> 
      {/* 1. Hướng dẫn sử dụng (Collapsible) */}
      <CollapsibleSection
        title="Hướng dẫn sử dụng"
        icon={BookOpen}
        iconColor="text-blue-500" // Thêm màu cho icon để trực quan hơn
        bgColor="bg-blue-50" // Thêm màu nền nhẹ nhàng
        isOpen={isOpen}
        onToggle={onToggle}
      >
        <div className="p-4 bg-white border border-blue-200 rounded-lg shadow-inner">
          <ul className="list-none p-0 m-0">
            {renderItems(instructionItems)}
          </ul>
        </div>
      </CollapsibleSection>

      {/* 2. Lưu ý quan trọng (Luôn mở) */}
      {/* Sử dụng lại InfoCard nhưng với style trực quan hơn */}
      <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4 md:p-6 shadow-lg transition duration-300 hover:shadow-xl">
        <div className="flex items-start gap-4 mb-4 border-b pb-3 border-orange-200">
          <Zap className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
          <h3 className="text-xl font-bold text-orange-800">Lưu ý quan trọng</h3>
        </div>
        
        <ul className="list-disc list-inside space-y-2 pl-2">
          {importantNotes.map(item => (
            <li key={item.key} className="text-sm text-gray-700">
              <strong className="text-orange-700 mr-1">{item.label}</strong>
              {item.detail}
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
});

export default InstructionsSection;
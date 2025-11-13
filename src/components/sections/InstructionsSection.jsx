import React from 'react';
import { BookOpen, Info, Zap } from 'lucide-react';
import { CollapsibleSection } from '../common/CollapsibleSection';
import { InfoCard } from '../common/InfoCard';

export const InstructionsSection = ({ 
  isOpen, 
  onToggle, 
  isSignedIn, 
  authProvider 
}) => {
  const instructionItems = [
    <span key="1"><strong>Navbar:</strong> Chuyển đổi giữa Listening, Reading, Ngữ Pháp, Từ Vựng</span>,
    <span key="2"><strong>Listening:</strong> Chọn giọng nam/nữ, điều chỉnh tốc độ, nhấn Play để nghe</span>,
    <span key="3"><strong>Reading:</strong> Đọc đoạn văn và chọn đáp án phù hợp</span>,
    <span key="4"><strong>Full Exam:</strong> Thi thử toàn bộ bài thi với timer tự động</span>,
    isSignedIn ? (
      <span key="5">
        <strong className="text-green-700">✓ Đã đăng nhập:</strong> Tiến độ được lưu tự động! 
        <span className="font-black"> (Provider: {authProvider === 'clerk' ? 'Clerk' : 'Firebase'})</span>
      </span>
    ) : (
      <span key="6"><strong>Đăng nhập</strong> để lưu tiến độ học tập</span>
    )
  ];

  const importantNotes = [
    <span key="1"><strong>Listening:</strong> Dùng Chrome/Edge cho trải nghiệm tốt nhất</span>,
    <span key="2"><strong>Chấm điểm:</strong> Listening 5đ/câu, Reading 2.5đ/câu</span>,
    <span key="3"><strong>Tự động lưu:</strong> Tiến độ được lưu khi đã đăng nhập</span>,
    <span key="4"><strong>Full Exam:</strong> 90 phút, tự động chuyển section sau 30/60 phút</span>
  ];

  return (
    <>
      <CollapsibleSection
        title="Hướng dẫn sử dụng"
        icon={BookOpen}
        isOpen={isOpen}
        onToggle={onToggle}
      >
        <InfoCard
          icon={Info}
          title="Các bước sử dụng"
          items={instructionItems}
          variant="info"
        />
      </CollapsibleSection>

      <InfoCard
        icon={Zap}
        title="Lưu ý quan trọng"
        items={importantNotes}
        variant="warning"
      />
    </>
  );
};

export default InstructionsSection;

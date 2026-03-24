// src/components/Display/Result/ResultsAnalytics.jsx
import React, { memo, useMemo } from 'react';
import { BrainCircuit, SearchX } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

// ─── SkillBar (Gamified 3D Progress Bar) ──────────────────────────────────────

const SkillBar = memo(({ label, correct, total, index }) => {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  // 🚀 Tự định nghĩa ngưỡng Pass an toàn (Mặc định 60%)
  const PASSING_SCORE = 60;
  const isPassing = percent >= PASSING_SCORE;
  
  // 🚀 Phân cấp màu sắc chuẩn Duolingo bằng mã HEX trực tiếp
  let theme = { bg: 'bg-[#FF4B4B]', text: 'text-[#E54343]', border: 'border-[#ffc1c1]' }; // Đỏ (Yếu)
  if (isPassing) {
    theme = { bg: 'bg-[#58CC02]', text: 'text-[#46A302]', border: 'border-[#bcf096]' }; // Xanh lá (Tốt)
  } else if (percent >= 40) {
    theme = { bg: 'bg-[#FF9600]', text: 'text-[#E58700]', border: 'border-[#FFD8A8]' }; // Vàng (Cần cố gắng)
  }

  return (
    <Motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 24 }}
      className="space-y-3 font-nunito"
    >
      <div className="flex justify-between items-end">
        <span className="text-[14px] md:text-[16px] font-display font-black text-slate-700 uppercase tracking-widest leading-none pb-1">
          {label}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[13px] md:text-[14px] font-body font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-[10px] border-2 border-slate-200/60 shadow-sm leading-none">
            {correct} / {total}
          </span>
          <span className={`text-[20px] md:text-[24px] font-display font-black leading-none ${theme.text}`}>
            {percent}%
          </span>
        </div>
      </div>
      
      {/* Khung thanh tiến độ 3D */}
      <div className="h-5 md:h-6 bg-slate-100 border-2 border-slate-200/80 rounded-full overflow-hidden shadow-inner p-[3px] flex items-center">
        <Motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
          // min-w-[5%] để thanh luôn hiện ra chút viền tròn ở mức 0%
          className={`h-full rounded-full ${theme.bg} relative flex items-center justify-end min-w-[5%]`}
        >
          {/* Hiệu ứng bóng lóa (Glossy) tạo cảm giác ống thủy tinh 3D */}
          <div className="absolute top-[2px] left-1.5 right-1.5 h-[35%] bg-white/40 rounded-full pointer-events-none" />
        </Motion.div>
      </div>
    </Motion.div>
  );
});

SkillBar.displayName = 'SkillBar';

// ─── EmptyAnalytics (Trạng thái rỗng Gamified) ───────────────────────────────

const EmptyAnalytics = memo(() => (
  <div className="text-center py-12 md:py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center">
    <div className="w-16 h-16 bg-white rounded-2xl border-2 border-slate-200 border-b-[4px] flex items-center justify-center mb-5 shadow-sm">
      <SearchX className="w-8 h-8 text-slate-400" strokeWidth={2.5} />
    </div>
    <p className="text-[16px] md:text-[18px] font-display font-black text-slate-600 uppercase tracking-widest">Chưa có dữ liệu</p>
    <p className="text-[14px] md:text-[15px] font-body font-bold text-slate-400 mt-1">Hệ thống cần bạn làm bài để có thể phân tích.</p>
  </div>
));
EmptyAnalytics.displayName = 'EmptyAnalytics';

// ─── ResultsAnalytics (Container Chính) ───────────────────────────────────────

/**
 * Phần phân tích kỹ năng theo category
 */
const ResultsAnalytics = memo(({ skillAnalytics }) => {

  // 🚀 CƠ CHẾ CHUẨN HÓA DỮ LIỆU (Bao trọn mọi loại Data)
  const normalizedData = useMemo(() => {
    if (!skillAnalytics) return [];

    let entries = [];

    // Trường hợp 1: Dữ liệu truyền vào là một Mảng (Array)
    if (Array.isArray(skillAnalytics)) {
      entries = skillAnalytics.map(item => ({
        label: item.name || item.label || item.skillName || item.part || 'Kỹ năng',
        correct: item.correct ?? item.score ?? 0, // Nhận cả biến score nếu có
        total: item.total ?? item.max ?? 0        // Nhận cả biến max nếu có
      }));
    } 
    // Trường hợp 2: Dữ liệu truyền vào là Object
    else if (typeof skillAnalytics === 'object') {
      entries = Object.entries(skillAnalytics).map(([key, val]) => ({
        label: key,
        correct: val.correct ?? val.score ?? 0,
        total: val.total ?? val.max ?? 0
      }));
    }

    // Chỉ giữ lại những kỹ năng có số lượng câu hỏi > 0 để tránh lỗi NaN
    return entries.filter(item => item.total > 0);
  }, [skillAnalytics]);

  return (
    <div 
      className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 sm:p-8 shadow-sm overflow-hidden w-full font-nunito"
    >
      {/* Header Box */}
      <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-100 pb-5">
        <div className="w-14 h-14 rounded-[16px] bg-[#F8EEFF] text-[#CE82FF] border-2 border-[#eec9ff] border-b-[4px] flex items-center justify-center shadow-sm shrink-0">
          <BrainCircuit className="w-7 h-7" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-[20px] md:text-[22px] font-display font-black text-slate-800 leading-tight mb-0.5">Phân tích kỹ năng</h2>
          <p className="text-[14px] font-body font-bold text-slate-500">Đánh giá các điểm mạnh và điểm cần cải thiện</p>
        </div>
      </div>

      {/* Body: Danh sách Skill Bars */}
      {normalizedData.length === 0 ? (
        <EmptyAnalytics />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {normalizedData.map((data, index) => (
            <SkillBar
              key={data.label + index}
              label={data.label}
              correct={data.correct}
              total={data.total}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
});

ResultsAnalytics.displayName = 'ResultsAnalytics';
export default ResultsAnalytics;
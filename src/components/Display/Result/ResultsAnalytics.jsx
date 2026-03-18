// src/components/Display/Result/ResultsAnalytics.jsx
import { memo } from 'react';
import { BrainCircuit, SearchX } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { SCORE_THRESHOLDS } from '../../../utils/gradeUtils';

// ─── SkillBar (Gamified 3D Progress Bar) ──────────────────────────────────────

const SkillBar = memo(({ label, correct, total, index }) => {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPassing = percent >= (SCORE_THRESHOLDS?.PASS || 60);
  
  // Phân cấp màu sắc chuẩn Duolingo (Xanh lá: Tốt | Vàng: Cần cố gắng | Đỏ: Yếu)
  let theme = { bg: 'bg-hub-red', text: 'text-hub-red-dark', border: 'border-hub-red-dark' };
  if (isPassing) {
    theme = { bg: 'bg-hub-green', text: 'text-hub-green-dark', border: 'border-hub-green-dark' };
  } else if (percent >= 40) {
    theme = { bg: 'bg-hub-yellow', text: 'text-hub-yellow-dark', border: 'border-hub-yellow-dark' };
  }

  return (
    <Motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 24 }}
      className="space-y-2.5 md:space-y-3"
    >
      <div className="flex justify-between items-end">
        <span className="text-[14px] md:text-[16px] font-display font-black text-slate-700 uppercase tracking-wider">
          {label}
        </span>
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-[12px] md:text-[14px] font-body font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-[8px] border-2 border-slate-200/60 shadow-sm">
            {correct} / {total}
          </span>
          <span className={`text-[18px] md:text-[22px] font-display font-black leading-none ${theme.text}`}>
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
          // min-w-[5%] để đảm bảo thanh bar luôn hiện ra một chút viền tròn kể cả khi 0%
          className={`h-full rounded-full ${theme.bg} relative flex items-center justify-end min-w-[5%]`}
        >
          {/* Hiệu ứng bóng lóa (Glossy) ở viền trên tạo cảm giác nhựa 3D */}
          <div className="absolute top-0.5 left-1.5 right-1.5 h-[35%] bg-white/40 rounded-full" />
        </Motion.div>
      </div>
    </Motion.div>
  );
});

SkillBar.displayName = 'SkillBar';

// ─── EmptyAnalytics (Trạng thái rỗng Gamified) ───────────────────────────────

const EmptyAnalytics = () => (
  <div className="text-center py-10 md:py-14 bg-slate-50 border-2 border-dashed border-slate-300 rounded-[20px] md:rounded-[24px]">
    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-[16px] border-2 border-slate-200 border-b-[4px] flex items-center justify-center mx-auto mb-4 shadow-sm">
      <SearchX className="w-7 h-7 md:w-8 md:h-8 text-slate-400" strokeWidth={2.5} />
    </div>
    <p className="text-[15px] md:text-[17px] font-display font-black text-slate-600 uppercase tracking-wider">Chưa có dữ liệu</p>
    <p className="text-[13px] md:text-[15px] font-body font-bold text-slate-400 mt-1">Hệ thống cần thêm dữ liệu để phân tích.</p>
  </div>
);

// ─── ResultsAnalytics (Container Chính) ───────────────────────────────────────

/**
 * Phần phân tích kỹ năng theo category
 * @param {{ [category: string]: { correct: number, total: number } }} skillAnalytics
 */
const ResultsAnalytics = memo(({ skillAnalytics }) => {
  // Lọc an toàn các giá trị hợp lệ
  const entries = Object.entries(skillAnalytics || {}).filter(([_, data]) => data.total > 0);

  return (
    <div 
      className="bg-white rounded-[28px] md:rounded-[32px] border-2 border-slate-200 border-b-[6px] md:border-b-[8px] p-5 sm:p-6 md:p-8 shadow-sm overflow-hidden font-sans w-full"
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      {/* Header Box */}
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b-2 border-slate-100 pb-4 md:pb-5">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] md:rounded-[16px] bg-hub-purple-bg text-hub-purple border-2 border-hub-purple-border border-b-[4px] flex items-center justify-center shadow-sm shrink-0">
          <BrainCircuit className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-[18px] md:text-[22px] font-display font-black text-slate-800 leading-none tracking-wide mb-1 md:mb-1.5">Phân tích kỹ năng</h2>
          <p className="text-[13px] md:text-[15px] font-body font-bold text-slate-500">Đánh giá điểm mạnh và điểm yếu</p>
        </div>
      </div>

      {/* Body: Danh sách Skill Bars */}
      {entries.length === 0 ? (
        <EmptyAnalytics />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-7 md:gap-y-8">
          {entries.map(([label, data], index) => (
            <SkillBar
              key={label}
              label={label}
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
import { memo } from 'react';
import { BrainCircuit, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import { SCORE_THRESHOLDS } from '../../../utils/gradeUtils';

// ─── SkillBar (Gamified 3D Progress Bar) ──────────────────────────────────────

const SkillBar = memo(({ label, correct, total, index }) => {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPassing = percent >= SCORE_THRESHOLDS.PASS;
  
  // Màu sắc Duolingo Style: Xanh lá (Đạt) - Cam (Cần cố gắng)
  const barColor = isPassing ? 'bg-[#58CC02]' : 'bg-[#FF9600]';
  const textColor = isPassing ? 'text-[#58CC02]' : 'text-[#FF9600]';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-end">
        <span className="text-[13px] sm:text-[14px] font-display font-bold text-slate-700 uppercase tracking-wide">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-body font-bold text-slate-400">
            {correct}/{total}
          </span>
          <span className={`text-[15px] font-display font-black ${textColor}`}>
            {percent}%
          </span>
        </div>
      </div>
      
      {/* Khung thanh tiến độ 3D */}
      <div className="h-4 sm:h-[18px] bg-slate-100 border-2 border-slate-200 rounded-full overflow-hidden shadow-inner p-[2px]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
          className={`h-full rounded-full ${barColor} relative flex items-center justify-end pr-1`}
        >
          {/* Hiệu ứng bóng lóa (Glossy) ở viền trên */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/30 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
});

SkillBar.displayName = 'SkillBar';

// ─── EmptyAnalytics (Trạng thái rỗng Gamified) ───────────────────────────────

const EmptyAnalytics = () => (
  <div className="text-center py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[16px]">
    <div className="w-12 h-12 bg-white rounded-[12px] border-b-[3px] border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-sm">
      <SearchX className="w-6 h-6 text-slate-400" strokeWidth={2.5} />
    </div>
    <p className="text-[14px] font-body font-bold text-slate-500">Chưa có đủ dữ liệu để phân tích.</p>
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
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.2 }}
      className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[4px] p-5 sm:p-6 shadow-sm overflow-hidden font-sans"
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      {/* Header Box */}
      <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-[12px] bg-[#faefff] text-[#CE82FF] border-2 border-[#eec9ff] border-b-[3px] flex items-center justify-center shadow-sm shrink-0">
          <BrainCircuit size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-[16px] sm:text-[18px] font-display font-black text-slate-800 leading-none">Phân tích kỹ năng</h2>
          <p className="text-[12px] font-body font-bold text-slate-400 mt-1">Đánh giá điểm mạnh và điểm yếu</p>
        </div>
      </div>

      {/* Body: Danh sách Skill Bars */}
      {entries.length === 0 ? (
        <EmptyAnalytics />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6">
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
    </motion.div>
  );
});

ResultsAnalytics.displayName = 'ResultsAnalytics';
export default ResultsAnalytics;
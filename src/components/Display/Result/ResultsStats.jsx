import { memo, useMemo } from 'react';
import { CheckCircle, TrendingUp, Flame, Award, Headphones, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { getGrade, getLevelLabel, getToeicGradeLabel } from '../../../utils/gradeUtils';
// ─── StatCard (Gamified 3D Compact Card) ──────────────────────────────────────

const StatCard = memo(({ icon: Icon, label, value, suffix, colorTheme, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, type: "spring", stiffness: 250, damping: 20 }}
    className="bg-white rounded-[20px] sm:rounded-[24px] border-2 border-slate-200 border-b-[4px] p-4 sm:p-5 flex flex-col items-center text-center shadow-sm hover:-translate-y-1 transition-transform relative overflow-hidden font-sans"
    style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
  >
    {/* Ánh sáng trang trí lấp ló góc phải */}
    <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10 blur-xl ${colorTheme.split(' ')[0]}`} />

    {/* Icon 3D Box */}
    <div
      className={`w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4 rounded-[14px] flex items-center justify-center border-b-[3px] text-white shadow-sm shrink-0 ${colorTheme}`}
    >
      <Icon size={24} strokeWidth={2.5} className="sm:w-7 sm:h-7" />
    </div>
    
    <p className="text-[10px] sm:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-1.5 leading-none">
      {label}
    </p>
    
    <p className="text-[22px] sm:text-[26px] font-display font-black text-slate-800 leading-none">
      {value}
      {suffix && (
        <span className="text-[14px] sm:text-[16px] font-display font-bold text-slate-400 ml-1 inline-block -translate-y-0.5">
          {suffix}
        </span>
      )}
    </p>
  </motion.div>
));

StatCard.displayName = 'StatCard';

// ─── ResultsStats (Orchestrator) ─────────────────────────────────────────────

/**
 * Grid hiển thị 4 stat cards chính tự động thay đổi theo loại đề thi
 * @param {{ correct: number, total: number, percentage: number }} score
 * @param {{ listening: number, reading: number, total: number } | null} convertedScore
 * @param {string} examCategory
 */
const ResultsStats = memo(({ score, convertedScore, examCategory }) => {
  // Chuẩn bị danh sách Card dựa theo loại đề thi
  const statCards = useMemo(() => {
    // 1. NẾU LÀ ĐỀ TOEIC
    if (examCategory === 'toeic') {
      return [
        {
          icon: Award,
          label: "Xếp loại",
          value: getToeicGradeLabel(convertedScore?.total || 0),
          suffix: "",
          colorTheme: "bg-[#CE82FF] border-[#B975E5]" // Tím
        },
        {
          icon: Headphones,
          label: "Điểm Nghe",
          value: convertedScore?.listening || 0,
          suffix: "/495",
          colorTheme: "bg-[#1CB0F6] border-[#1899D6]" // Xanh dương
        },
        {
          icon: BookOpen,
          label: "Điểm Đọc",
          value: convertedScore?.reading || 0,
          suffix: "/495",
          colorTheme: "bg-[#58CC02] border-[#46A302]" // Xanh lá
        },
        {
          icon: CheckCircle,
          label: "Câu đúng",
          value: score.correct,
          suffix: `/${score.total}`,
          colorTheme: "bg-[#CE82FF] border-[#B975E5]" // Tím
        }
      ];
    }

    // 2. NẾU LÀ ĐỀ BÌNH THƯỜNG (HUFLIT, THPT, v.v...)
    const roundedPercentage = Math.round(score.percentage);
    const grade = getGrade(score.percentage);
    const levelLabel = getLevelLabel(score.percentage);

    return [
      {
        icon: CheckCircle,
        label: "Chính xác",
        value: score.correct,
        suffix: `/${score.total}`,
        colorTheme: "bg-[#1CB0F6] border-[#1899D6]" // Xanh dương
      },
      {
        icon: TrendingUp,
        label: "Tỷ lệ",
        value: roundedPercentage,
        suffix: "%",
        colorTheme: "bg-[#58CC02] border-[#46A302]" // Xanh lá
      },
      {
        icon: Flame,
        label: "Cấp độ",
        value: levelLabel,
        suffix: "",
        colorTheme: "bg-[#FF9600] border-[#E58700]" // Cam
      },
      {
        icon: Award,
        label: "Xếp loại",
        value: grade.badge,
        suffix: "",
        colorTheme: "bg-[#CE82FF] border-[#B975E5]" // Tím
      }
    ];
  }, [examCategory, convertedScore, score]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-20">
      {statCards.map((card, index) => (
        <StatCard
          key={index}
          index={index}
          icon={card.icon}
          label={card.label}
          value={card.value}
          suffix={card.suffix}
          colorTheme={card.colorTheme}
        />
      ))}
    </div>
  );
});

ResultsStats.displayName = 'ResultsStats';
export default ResultsStats;
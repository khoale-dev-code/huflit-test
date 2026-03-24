// src/components/StatsGrid/StatsGrid.jsx
import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import { Trophy, FileText, Zap, BarChart3 } from 'lucide-react';
import InfoBadge from './InfoBadge';

/**
 * StatsGrid - Display exam performance statistics
 * @param {Object} props
 * @param {Object} props.scoreResult - Score result object with total, correct, percentage
 * @param {boolean} props.isSignedIn - User authentication state
 */
const StatsGrid = memo(({ scoreResult, isSignedIn }) => {
  if (!isSignedIn || !scoreResult || scoreResult.total === 0) return null;

  return (
    <Motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-6 sm:p-8 shadow-sm mt-8 font-nunito"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[3px] shadow-sm">
          <BarChart3 className="w-6 h-6 text-[#1CB0F6]" strokeWidth={2.5} />
        </div>
        <h3 className="text-[18px] font-black text-slate-800 uppercase tracking-widest">Hiệu suất làm bài</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <InfoBadge icon={FileText} label="Tổng câu" value={scoreResult.total} color="indigo" />
        <InfoBadge icon={Trophy}   label="Câu đúng" value={scoreResult.correct} color="emerald" />
        <InfoBadge icon={FileText} label="Câu sai"  value={scoreResult.total - scoreResult.correct} color="amber" />
        <InfoBadge icon={Zap}      label="Tỉ lệ"    value={`${scoreResult.percentage.toFixed(0)}%`} color="purple" />
      </div>
    </Motion.div>
  );
});

StatsGrid.displayName = "StatsGrid";

export default StatsGrid;

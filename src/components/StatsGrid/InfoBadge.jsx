// src/components/StatsGrid/InfoBadge.jsx
import { memo } from 'react';

/**
 * InfoBadge - Display individual statistic badge
 * @param {Object} props
 * @param {React.ComponentType} props.icon - Lucide icon component
 * @param {string} props.label - Badge label text
 * @param {string|number} props.value - Badge value
 * @param {'indigo'|'emerald'|'amber'|'purple'} [props.color='indigo'] - Badge color variant
 */
const InfoBadge = memo(({ icon: Icon, label, value, color = 'indigo' }) => {
  const colorMap = {
    indigo:  'bg-[#EAF6FE] border-[#BAE3FB] text-[#1CB0F6]',
    emerald: 'bg-[#F0FAE8] border-[#bcf096] text-[#58CC02]',
    amber:   'bg-[#FFFBEA] border-[#FFD8A8] text-[#FF9600]',
    purple:  'bg-[#F8EEFF] border-[#eec9ff] text-[#CE82FF]',
  };

  if (!Icon) return null;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-[16px] border-2 border-b-[4px] shadow-sm ${colorMap[color] || colorMap.indigo}`}>
      <Icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-0.5">{label}</p>
        <p className="text-[16px] font-black truncate leading-tight">{value}</p>
      </div>
    </div>
  );
});

InfoBadge.displayName = "InfoBadge";

export default InfoBadge;

import React, { memo } from 'react';
import { Headphones, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// partResults shape (từ ResultsScreen mới):
// {
//   listeningByPart: { 1: { score, max }, 2: { score, max }, ... },
//   readingByPart:   { 1: { score, max }, 2: { score, max }, ... },
//   totalListening, totalReading
// }

export const PartResults = memo(({ partResults }) => {
  if (!partResults) return null;

  const listeningKeys = Object.keys(partResults.listeningByPart || {}).map(Number).sort((a,b) => a-b);
  const readingKeys   = Object.keys(partResults.readingByPart   || {}).map(Number).sort((a,b) => a-b);

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <h3 className="font-display font-black text-[18px] md:text-[20px] text-slate-800">
          Phân tích chi tiết từng phần
        </h3>
      </div>

      {listeningKeys.length > 0 && (
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-2 mb-4 pl-1">
            <Headphones size={20} className="text-[#1CB0F6]" strokeWidth={2.5} />
            <h4 className="font-display font-black text-slate-700 text-[15px] md:text-[16px] uppercase tracking-wider">
              Phần Nghe (Listening)
            </h4>
          </div>
          <div className={`grid gap-3 md:gap-4 ${listeningKeys.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
            {listeningKeys.map((p, index) => {
              const { score, max } = partResults.listeningByPart[p];
              return (
                <motion.div key={`listening-${p}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <PartResultCard label={`Part ${p}`} score={score} maxScore={max} />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {readingKeys.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4 pl-1">
            <BookOpen size={20} className="text-[#58CC02]" strokeWidth={2.5} />
            <h4 className="font-display font-black text-slate-700 text-[15px] md:text-[16px] uppercase tracking-wider">
              Phần Đọc (Reading)
            </h4>
          </div>
          <div className={`grid gap-3 md:gap-4 ${readingKeys.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
            {readingKeys.map((p, index) => {
              const { score, max } = partResults.readingByPart[p];
              return (
                <motion.div key={`reading-${p}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }}>
                  <PartResultCard label={`Part ${p}`} score={score} maxScore={max} />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
PartResults.displayName = 'PartResults';

const PartResultCard = memo(({ label, score, maxScore }) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  let theme = { color: 'text-[#FF4B4B]', bg: 'bg-[#fff0f0]', border: 'border-[#FF4B4B]', bar: 'bg-[#FF4B4B]', badgeBg: 'bg-[#FF4B4B]', text: 'Cần ôn lại' };
  if (percentage >= 80)      theme = { color: 'text-[#58CC02]', bg: 'bg-[#f1faeb]', border: 'border-[#58CC02]', bar: 'bg-[#58CC02]', badgeBg: 'bg-[#58CC02]', text: 'Xuất sắc' };
  else if (percentage >= 60) theme = { color: 'text-[#1CB0F6]', bg: 'bg-[#EAF6FE]', border: 'border-[#1CB0F6]', bar: 'bg-[#1CB0F6]', badgeBg: 'bg-[#1CB0F6]', text: 'Khá tốt' };
  else if (percentage >= 40) theme = { color: 'text-[#FF9600]', bg: 'bg-[#fff4e5]', border: 'border-[#FF9600]', bar: 'bg-[#FF9600]', badgeBg: 'bg-[#FF9600]', text: 'Tạm ổn' };

  return (
    <div className="bg-white p-4 rounded-[20px] border-2 border-slate-200 border-b-[4px] hover:-translate-y-1 hover:border-slate-300 transition-transform flex flex-col items-center justify-center text-center">
      <p className="text-[14px] font-display font-black text-slate-500 mb-1 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-1 mb-2">
        <span className={`text-[26px] font-black leading-none ${theme.color}`}>{score}</span>
        <span className="text-[14px] font-bold text-slate-400">/{maxScore}</span>
      </div>
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-200 relative">
        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, ease: "easeOut" }} className={`h-full rounded-full relative ${theme.bar}`}>
          <div className="absolute top-0.5 left-1 right-1 h-1 bg-white/30 rounded-full" />
        </motion.div>
      </div>
      <div className={`px-3 py-1 rounded-[10px] text-[11px] font-extrabold text-white uppercase tracking-widest ${theme.badgeBg}`}>{theme.text}</div>
    </div>
  );
});
PartResultCard.displayName = 'PartResultCard';

export default PartResults;
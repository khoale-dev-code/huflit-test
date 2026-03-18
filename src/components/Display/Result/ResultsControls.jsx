import { memo } from 'react';
import { RotateCcw, Target } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

/**
 * Nút "Làm lại" và "Xem lại câu hỏi" (Gamified 3D Buttons)
 * @param {{ onReset: () => void }} props
 */
const ResultsControls = memo(({ onReset }) => {
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 font-sans"
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      {/* Nút Làm Lại (Primary 3D Action) */}
      <button
        onClick={onReset}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-[#1CB0F6] text-white rounded-[16px] sm:rounded-[20px] font-display font-black text-[15px] sm:text-[16px] uppercase tracking-wider border-2 border-[#1899D6] border-b-[5px] hover:bg-[#18A0E0] hover:-translate-y-0.5 active:border-b-[2px] active:translate-y-[3px] transition-all outline-none shadow-sm"
      >
        <RotateCcw size={20} strokeWidth={3} />
        Làm lại bài này
      </button>

      {/* Nút Xem Lại (Secondary 3D Action) */}
      <button
        onClick={handleScrollTop}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-white text-slate-500 rounded-[16px] sm:rounded-[20px] font-display font-black text-[15px] sm:text-[16px] uppercase tracking-wider border-2 border-slate-200 border-b-[5px] hover:bg-blue-50 hover:text-[#1CB0F6] hover:border-blue-200 hover:-translate-y-0.5 active:border-b-[2px] active:translate-y-[3px] transition-all outline-none shadow-sm"
      >
        <Target size={20} strokeWidth={3} />
        Xem lại đáp án
      </button>
    </Motion.div>
  );
});

ResultsControls.displayName = 'ResultsControls';
export default ResultsControls;
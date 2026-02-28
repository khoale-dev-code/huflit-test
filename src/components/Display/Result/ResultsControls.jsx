import { memo } from 'react';
import { RotateCcw, Target } from 'lucide-react';

/**
 * Nút "Làm lại" và "Xem lại câu hỏi"
 * @param {{ onReset: () => void }} props
 */
const ResultsControls = memo(({ onReset }) => {
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={onReset}
        className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
      >
        <RotateCcw className="w-5 h-5" />
        Làm lại bài này
      </button>

      <button
        onClick={handleScrollTop}
        className="flex-1 bg-white text-slate-700 border-2 border-slate-200 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
      >
        <Target className="w-5 h-5" />
        Xem lại câu hỏi
      </button>
    </div>
  );
});

ResultsControls.displayName = 'ResultsControls';
export default ResultsControls;
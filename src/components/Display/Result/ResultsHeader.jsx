import { memo } from 'react';
import { Trophy } from 'lucide-react';

/**
 * Hero header section của trang kết quả
 */
const ResultsHeader = memo(({ title = 'Kết quả bài thi', subtitle = 'Bạn đã hoàn thành phần luyện tập của mình.' }) => (
  <div className="bg-white border-b border-slate-200 pt-10 pb-12 px-4 text-center">
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full" />
      <Trophy
        className="w-16 h-16 text-blue-600 mx-auto mb-4 relative drop-shadow-sm"
        strokeWidth={1.5}
      />
    </div>
    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
    <p className="text-slate-500 mt-2 font-medium">{subtitle}</p>
  </div>
));

ResultsHeader.displayName = 'ResultsHeader';
export default ResultsHeader;
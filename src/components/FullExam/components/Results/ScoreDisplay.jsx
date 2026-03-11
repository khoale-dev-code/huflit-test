/* src/components/FullExam/components/Results/ScoreDisplay.jsx */

import React, { memo } from 'react';
import { Award } from 'lucide-react';

// Helper function to calculate CEFR Level if data is missing
const getCEFRData = (score) => {
  if (score >= 90) return { level: 'C1', label: 'Advanced', range: '90-100%', color: '#10B981', description: 'Hiểu rộng các độc lập phức tạp, dài và nhận biết ý nghĩa ngầm.' };
  if (score >= 75) return { level: 'B2', label: 'Upper Intermediate', range: '75-89%', color: '#3B82F6', description: 'Hiểu ý chính của văn bản phức tạp cả cụ thể lẫn trừu tượng.' };
  if (score >= 50) return { level: 'B1', label: 'Intermediate', range: '50-74%', color: '#F59E0B', description: 'Hiểu những điểm chính của thông tin tiêu chuẩn về chủ đề quen thuộc.' };
  if (score >= 30) return { level: 'A2', label: 'Elementary', range: '30-49%', color: '#EF4444', description: 'Hiểu các cụm từ thường dùng liên quan đến những lĩnh vực có liên quan trực tiếp.' };
  return { level: 'A1', label: 'Beginner', range: '0-29%', color: '#6B7280', description: 'Hiểu và sử dụng các cụm từ hàng ngày và những biểu thức cơ bản.' };
};

export const ScoreDisplay = memo(({ results }) => {
  if (!results) return null;

  const score =
    typeof results.averageScore === 'number'
      ? results.averageScore
      : parseFloat(results.averageScore) || 0;

  const cefr = results.cefr || getCEFRData(score);

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 text-center shadow-xs"
      style={{ borderTopWidth: '3px', borderTopColor: cefr.color }}
    >
      <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
        Tổng điểm
      </p>

      <div className="text-3xl md:text-4xl font-black text-gray-900 mb-3 md:mb-4">
        {score.toFixed(1)}<span className="text-lg md:text-2xl">%</span>
      </div>

      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-black text-white text-lg md:text-2xl shadow-md mx-auto mb-3 transition-transform hover:scale-105"
        style={{ backgroundColor: cefr.color }}
      >
        {cefr.level}
      </div>

      <p className="text-base md:text-lg font-bold text-gray-900 mb-1">
        {cefr.label}
      </p>

      <p className="text-xs md:text-sm font-medium text-gray-600 mb-3">
        {cefr.range}
      </p>

      <p className="text-xs md:text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mb-3 border border-gray-200 leading-relaxed">
        "{cefr.description}"
      </p>

      <div className="mb-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Mức độ</p>
        <div className="w-full h-2 md:h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-1000 ease-out"
            style={{
              width: `${Math.min(score, 100)}%`,
              backgroundColor: cefr.color,
            }}
          />
        </div>
      </div>

      <Award className="w-6 h-6 md:w-7 md:h-7 mx-auto opacity-70" style={{ color: cefr.color }} />
    </div>
  );
});

ScoreDisplay.displayName = 'ScoreDisplay';
export default ScoreDisplay;
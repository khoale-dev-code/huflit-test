import React from 'react';
import { 
  FileText, CheckCircle, Layers
} from 'lucide-react';

export const QuestionStatistics = ({ questions = [] }) => {
  const calculateStatistics = () => {
    let totalQuestions = 0;
    let totalPoints = 0;
    let groupCount = 0;
    const typeCount = {
      multiple_choice: 0,
      fill_in: 0,
      matching: 0,
      true_false: 0
    };

    questions.forEach(q => {
      if (q.type === 'group') {
        groupCount++;
        (q.subQuestions || []).forEach(sq => {
          if (!sq.isExample) {
            totalQuestions++;
            totalPoints += sq.points || 1;
            const qType = sq.questionType || sq.type || 'multiple_choice';
            typeCount[qType] = (typeCount[qType] || 0) + 1;
          }
        });
      } else if (!q.isExample) {
        totalQuestions++;
        totalPoints += q.points || 1;
        const qType = q.questionType || q.type || 'multiple_choice';
        typeCount[qType] = (typeCount[qType] || 0) + 1;
      }
    });

    return { totalQuestions, totalPoints, groupCount, typeCount };
  };

  const stats = calculateStatistics();

  const typeLabels = {
    multiple_choice: 'Trắc nghiệm',
    fill_in: 'Điền từ',
    matching: 'Nối chọn',
    true_false: 'Đúng/Sai'
  };

  const typeColors = {
    multiple_choice: 'bg-blue-100 text-blue-700 border-blue-200',
    fill_in: 'bg-green-100 text-green-700 border-green-200',
    matching: 'bg-purple-100 text-purple-700 border-purple-200',
    true_false: 'bg-orange-100 text-orange-700 border-orange-200'
  };

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
      <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <Layers size={16} strokeWidth={3} className="text-[#CE82FF]" />
        Thống kê
      </h4>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Total Questions */}
        <div className="p-3 bg-[#EAF6FE] rounded-lg border border-[#BAE3FB]">
          <div className="flex items-center gap-2 mb-1">
            <FileText size={14} strokeWidth={3} className="text-[#1CB0F6]" />
            <span className="text-[10px] font-black text-[#1CB0F6] uppercase">Tổng câu</span>
          </div>
          <span className="text-[24px] font-black text-[#1899D6]">{stats.totalQuestions}</span>
        </div>

        {/* Total Points */}
        <div className="p-3 bg-[#f1faeb] rounded-lg border border-[#bcf096]">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle size={14} strokeWidth={3} className="text-[#58CC02]" />
            <span className="text-[10px] font-black text-[#58CC02] uppercase">Tổng điểm</span>
          </div>
          <span className="text-[24px] font-black text-[#46A302]">{stats.totalPoints}</span>
        </div>

        {/* Groups */}
        <div className="p-3 bg-[#F8EEFF] rounded-lg border border-[#eec9ff] col-span-2">
          <div className="flex items-center gap-2 mb-1">
            <Layers size={14} strokeWidth={3} className="text-[#CE82FF]" />
            <span className="text-[10px] font-black text-[#CE82FF] uppercase">Số nhóm</span>
          </div>
          <span className="text-[24px] font-black text-[#B975E5]">{stats.groupCount}</span>
        </div>
      </div>

      {/* Type Breakdown */}
      <div className="space-y-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Phân loại câu hỏi</span>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(stats.typeCount).map(([type, count]) => (
            count > 0 && (
              <span 
                key={type} 
                className={`px-2 py-1 rounded-md text-[11px] font-bold border ${typeColors[type]}`}
              >
                {typeLabels[type]}: {count}
              </span>
            )
          ))}
          {Object.values(stats.typeCount).every(v => v === 0) && (
            <span className="text-[11px] text-slate-400 italic">Chưa có câu hỏi</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionStatistics;

import React, { memo } from 'react';
import { Headphones, BookOpen, Target, CheckCircle2, Award } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

export const BreakdownChart = memo(({ results, partResults }) => {
  if (!results || !partResults) return null;

  const totalCorrect = results.totalCorrect || 0;
  const totalQuestions = results.totalQuestions || 1;
  const accuracy = results.averageScore || 0;
  
  const listeningTotal = partResults.totalListening || 1;
  const readingTotal = partResults.totalReading || 1;
  
  const listeningCorrect = Object.values(partResults.listeningByPart || {}).reduce((a,b) => a+b, 0);
  const readingCorrect = Object.values(partResults.readingByPart || {}).reduce((a,b) => a+b, 0);

  const listeningPercentage = (listeningCorrect / listeningTotal) * 100;
  const readingPercentage = (readingCorrect / readingTotal) * 100;

  return (
    <div className="bg-white rounded-[28px] md:rounded-[32px] p-5 md:p-8 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center border-b-2 border-indigo-200">
          <Target className="w-6 h-6 text-indigo-600" strokeWidth={2.5} />
        </div>
        <h3 className="font-quick font-bold text-[18px] md:text-[22px] text-slate-800">
          Phân tích kỹ năng
        </h3>
      </div>

      <div className="space-y-6 md:space-y-8 flex-1">
        {/* ── LISTENING ── */}
        <div className="bg-blue-50/50 p-4 md:p-5 rounded-[20px] border-2 border-blue-100">
          <div className="flex justify-between items-end mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#1CB0F6] text-white flex items-center justify-center shadow-sm border-b-[3px] border-[#1899D6]">
                <Headphones size={20} strokeWidth={2.5} />
              </div>
              <div>
                <span className="block text-[14px] md:text-[16px] font-quick font-bold text-blue-900 leading-none">
                  Kỹ năng Nghe
                </span>
                <span className="text-[12px] md:text-[13px] font-nunito font-bold text-blue-500 mt-1">
                  Đúng {listeningCorrect}/{listeningTotal} câu
                </span>
              </div>
            </div>
            <span className="text-[18px] md:text-[22px] font-black text-[#1CB0F6] leading-none">
              {listeningPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-4 bg-blue-200/50 rounded-full overflow-hidden border border-blue-200 relative">
            <Motion.div
              initial={{ width: 0 }}
              animate={{ width: `${listeningPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-[#1CB0F6] rounded-full relative"
            >
              <div className="absolute top-1 left-2 right-2 h-1.5 bg-white/30 rounded-full" />
            </Motion.div>
          </div>
        </div>

        {/* ── READING ── */}
        <div className="bg-emerald-50/50 p-4 md:p-5 rounded-[20px] border-2 border-emerald-100">
          <div className="flex justify-between items-end mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#58CC02] text-white flex items-center justify-center shadow-sm border-b-[3px] border-[#46A302]">
                <BookOpen size={20} strokeWidth={2.5} />
              </div>
              <div>
                <span className="block text-[14px] md:text-[16px] font-quick font-bold text-emerald-900 leading-none">
                  Kỹ năng Đọc
                </span>
                <span className="text-[12px] md:text-[13px] font-nunito font-bold text-emerald-500 mt-1">
                  Đúng {readingCorrect}/{readingTotal} câu
                </span>
              </div>
            </div>
            <span className="text-[18px] md:text-[22px] font-black text-[#58CC02] leading-none">
              {readingPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-4 bg-emerald-200/50 rounded-full overflow-hidden border border-emerald-200 relative">
            <Motion.div
              initial={{ width: 0 }}
              animate={{ width: `${readingPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="h-full bg-[#58CC02] rounded-full relative"
            >
              <div className="absolute top-1 left-2 right-2 h-1.5 bg-white/30 rounded-full" />
            </Motion.div>
          </div>
        </div>
      </div>

      {/* ── BẢNG TỔNG KẾT (Gamified Grid) ── */}
      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t-2 border-slate-100 grid grid-cols-3 gap-3 md:gap-4">
        {/* Card 1: Số câu đúng */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-[16px] p-3 md:p-4 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-slate-400 mb-1" />
          <p className="text-[10px] md:text-[11px] text-slate-500 font-extrabold uppercase tracking-widest mb-0.5">Số câu đúng</p>
          <p className="text-[16px] md:text-[20px] font-black text-slate-800">
            {totalCorrect}<span className="text-slate-400 text-[14px]">/{totalQuestions}</span>
          </p>
        </div>

        {/* Card 2: Độ chính xác */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-[16px] p-3 md:p-4 flex flex-col items-center justify-center text-center">
          <Target className="w-5 h-5 md:w-6 md:h-6 text-indigo-400 mb-1" />
          <p className="text-[10px] md:text-[11px] text-slate-500 font-extrabold uppercase tracking-widest mb-0.5">Độ chính xác</p>
          <p className="text-[16px] md:text-[20px] font-black text-indigo-600">
            {accuracy}%
          </p>
        </div>

        {/* Card 3: Trình độ (CEFR) */}
        <div className="bg-[#FFC800]/10 border-2 border-[#FFC800]/40 rounded-[16px] p-3 md:p-4 flex flex-col items-center justify-center text-center">
          <Award className="w-5 h-5 md:w-6 md:h-6 text-[#FF9600] mb-1" />
          <p className="text-[10px] md:text-[11px] text-[#FF9600] font-extrabold uppercase tracking-widest mb-0.5">Trình độ</p>
          <p className="text-[16px] md:text-[20px] font-black text-[#E58700]">
            {results.cefrLevel || 'B1'}
          </p>
        </div>
      </div>
    </div>
  );
});

BreakdownChart.displayName = 'BreakdownChart';
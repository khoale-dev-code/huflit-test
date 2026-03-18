import React, { memo, useMemo } from 'react';
import { Trophy, TrendingUp, Target, RotateCcw, ChevronLeft, Zap, Star } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { ScoreDisplay } from './ScoreDisplay';
import { PartResults } from './PartResults';
import { calculateToeicScore } from '../../../../utils/gradeUtils';
import { makeStandaloneKey, makeGroupKey } from '../../utils/answerKey';

export const ResultsScreen = memo(({ examData, answers, onRetry, onExit }) => {
  // 🚀 ĐƯA HOOK LÊN TRÊN CÙNG (TRƯỚC KHI CHECK IF)
  const isToeicExam = useMemo(() => 
    (examData?.category ?? '').toLowerCase().includes('toeic'), 
    [examData?.category]
  );

  const stats = useMemo(() => {
    // Nếu chưa có data, trả về giá trị mặc định để Hook không bị gãy
    if (!examData?.parts) return null;

    let listeningCorrect = 0, listeningTotal = 0;
    let readingCorrect = 0, readingTotal = 0;
    const listeningByPart = {};
    const readingByPart = {};
    const partsStats = [];

    const partsArr = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);
    const listeningParts = partsArr.filter(p => p.type === 'listening');
    const readingParts = partsArr.filter(p => p.type === 'reading');

    const scorePart = (part, sectionType) => {
      let pTotal = 0, pCorrect = 0;
      (part.questions || []).forEach((q, qIdx) => {
        if (q.type === 'group') {
          (q.subQuestions || []).forEach((sq, subIdx) => {
            if (sq.isExample) return;
            pTotal++;
            const key = makeGroupKey(sectionType, part.id, q.id, subIdx);
            if (answers[key] !== undefined && String(answers[key]) === String(sq.correct)) {
              pCorrect++;
            }
          });
        } else {
          if (q.isExample) return;
          pTotal++;
          const key = makeStandaloneKey(sectionType, part.id, qIdx);
          if (answers[key] !== undefined && String(answers[key]) === String(q.correct)) {
            pCorrect++;
          }
        }
      });
      return { pTotal, pCorrect };
    };

    listeningParts.forEach((part, index) => {
      const { pTotal, pCorrect } = scorePart(part, 'listening');
      listeningTotal += pTotal;
      listeningCorrect += pCorrect;
      listeningByPart[index + 1] = { score: pCorrect, max: pTotal };
      partsStats.push({ name: `Nghe Part ${index + 1}`, score: pCorrect, max: pTotal, section: 'listening' });
    });

    readingParts.forEach((part, index) => {
      const { pTotal, pCorrect } = scorePart(part, 'reading');
      readingTotal += pTotal;
      readingCorrect += pCorrect;
      readingByPart[index + 1] = { score: pCorrect, max: pTotal };
      partsStats.push({ name: `Đọc Part ${index + 1}`, score: pCorrect, max: pTotal, section: 'reading' });
    });

    const totalCorrect = listeningCorrect + readingCorrect;
    const totalQuestions = listeningTotal + readingTotal;
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const listeningPercent = listeningTotal > 0 ? Math.round((listeningCorrect / listeningTotal) * 100) : 0;
    const readingPercent = readingTotal > 0 ? Math.round((readingCorrect / readingTotal) * 100) : 0;

    let cefrLevel = 'A1';
    if (averageScore >= 90) cefrLevel = 'C1';
    else if (averageScore >= 75) cefrLevel = 'B2';
    else if (averageScore >= 50) cefrLevel = 'B1';
    else if (averageScore >= 30) cefrLevel = 'A2';

    const toeicScores = isToeicExam ? calculateToeicScore(listeningCorrect, readingCorrect) : null;

    return {
      results: { totalCorrect, totalQuestions, averageScore, listeningPercent, readingPercent, cefrLevel },
      convertedScore: toeicScores,
      partResults: { listeningByPart, readingByPart, totalListening: listeningTotal, totalReading: readingTotal },
      allParts: partsStats.filter(p => p.max > 0),
    };
  }, [examData, answers, isToeicExam]);

  const analysis = useMemo(() => {
    if (!stats?.allParts || stats.allParts.length === 0) return { strongest: null, weakest: null };
    let best = stats.allParts[0], worst = stats.allParts[0];
    stats.allParts.forEach(p => {
      if (p.score / p.max > best.score / best.max) best = p;
      if (p.score / p.max < worst.score / worst.max) worst = p;
    });
    return { strongest: best, weakest: worst };
  }, [stats]);

  // 🚀 SAU KHI GỌI HẾT HOOK MỚI ĐƯỢC CHECK RETURN LỖI
  if (!examData?.parts || !stats) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-6 font-sans">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
          <p className="text-slate-500 font-display font-bold text-[15px]">Đang tính toán kết quả...</p>
        </div>
      </div>
    );
  }

  const { results, convertedScore, partResults } = stats;
  const { strongest, weakest } = analysis;

  return (
    <div className="min-h-screen bg-[#F4F7FA] pb-16 font-sans selection:bg-blue-200">
      {/* ... Giữ nguyên phần JSX bên dưới ... */}
      <div className="bg-white border-b-2 border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-[24px] md:text-[28px] font-display font-black text-slate-800 tracking-tight leading-none flex items-center gap-2">
                HubStudy <span className="text-[#1CB0F6]">Results</span>
              </h1>
              <p className="text-slate-500 text-[13px] font-body font-bold mt-1">Báo cáo năng lực chi tiết.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f1faeb] border-2 border-[#bcf096] border-b-[3px] rounded-[12px] shadow-sm shrink-0">
              <Trophy className="w-5 h-5 text-[#58CC02]" strokeWidth={2.5} />
              <span className="text-[12px] font-display font-black text-[#58CC02] uppercase tracking-widest hidden sm:block pt-0.5">Hoàn thành</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-6 md:pt-8 space-y-6 md:space-y-8">
        <Motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="bg-gradient-to-br from-[#FFFBEA] to-[#FFf0B3] rounded-[32px] border-2 border-[#FFD8A8] border-b-[6px] p-6 md:p-8 text-center shadow-sm relative overflow-hidden"
        >
          <Star className="absolute top-6 left-6 text-[#FFC200] opacity-50 w-8 h-8" fill="#FFC200" />
          <Star className="absolute bottom-6 right-6 text-[#FFC200] opacity-50 w-10 h-10" fill="#FFC200" />
          <div className="w-20 h-20 md:w-24 md:h-24 bg-[#FFC200] rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-white mb-1" strokeWidth={2.5} />
          </div>
          <h2 className="text-[28px] md:text-[34px] font-display font-black text-[#D9A600] mb-1 leading-tight">Xuất sắc!</h2>
          <p className="text-[14px] md:text-[16px] font-body font-bold text-[#B38800]">Bạn đã nỗ lực hết mình. Cùng xem thành quả nhé!</p>
        </Motion.div>

        <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-5 md:p-8 shadow-sm relative z-10 -mt-10 sm:-mt-12 mx-2 sm:mx-8">
          <div className="max-w-sm mx-auto">
            <ScoreDisplay results={results} convertedScore={convertedScore} examCategory={examData.category} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {isToeicExam ? (
            <div className="bg-white rounded-[20px] border-2 border-[#FFD8A8] border-b-[4px] p-4 text-center shadow-sm hover:-translate-y-1 transition-transform">
              <p className="text-[10px] md:text-[11px] font-display font-black text-[#FF9600] uppercase tracking-widest mb-1.5">Điểm TOEIC</p>
              <p className="text-[28px] md:text-[32px] font-display font-black text-[#FF9600] leading-none">
                {convertedScore.total}<span className="text-[16px] text-amber-300">/990</span>
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-[20px] border-2 border-slate-200 border-b-[4px] p-4 text-center shadow-sm hover:-translate-y-1 transition-transform">
              <p className="text-[10px] md:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-1.5">Tổng điểm</p>
              <p className="text-[28px] md:text-[32px] font-display font-black text-slate-800 leading-none">
                {results.totalCorrect}<span className="text-[16px] text-slate-400">/{results.totalQuestions}</span>
              </p>
            </div>
          )}
          {/* ... Tiếp tục render các block khác ... */}
          <div className="bg-white rounded-[20px] border-2 border-[#BAE3FB] border-b-[4px] p-4 text-center shadow-sm">
            <p className="text-[10px] font-display font-black text-[#1CB0F6] uppercase tracking-widest mb-1.5">Nghe</p>
            <p className="text-[28px] font-display font-black text-[#1CB0F6] leading-none">
               {isToeicExam ? convertedScore.listening : `${results.listeningPercent}%`}
            </p>
          </div>
          <div className="bg-white rounded-[20px] border-2 border-[#bcf096] border-b-[4px] p-4 text-center shadow-sm">
            <p className="text-[10px] font-display font-black text-[#58CC02] uppercase tracking-widest mb-1.5">Đọc</p>
            <p className="text-[28px] font-display font-black text-[#58CC02] leading-none">
               {isToeicExam ? convertedScore.reading : `${results.readingPercent}%`}
            </p>
          </div>
          <div className="bg-white rounded-[20px] border-2 border-[#eec9ff] border-b-[4px] p-4 text-center shadow-sm">
            <p className="text-[10px] font-display font-black text-[#CE82FF] uppercase tracking-widest mb-1.5">Trình độ</p>
            <p className="text-[28px] font-display font-black text-[#CE82FF] leading-none">{results.cefrLevel}</p>
          </div>
        </div>

        {strongest && weakest && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strength Card */}
            <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[5px] p-5">
              <h3 className="font-display font-black text-[18px] text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#f1faeb] flex items-center justify-center border-2 border-[#bcf096]"><TrendingUp className="text-[#58CC02]" /></div>
                Điểm mạnh
              </h3>
              <p className="text-[14px] font-display font-black text-slate-700">🎯 {strongest.name}</p>
            </div>
            {/* Weakness Card */}
            <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[5px] p-5">
              <h3 className="font-display font-black text-[18px] text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#FFFBEA] flex items-center justify-center border-2 border-[#FFD8A8]"><Target className="text-[#FF9600]" /></div>
                Cải thiện
              </h3>
              <p className="text-[14px] font-display font-black text-slate-700">📚 {weakest.name}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[5px] p-5">
          <PartResults partResults={partResults} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button onClick={onRetry} className="flex-1 py-4 rounded-[20px] font-display font-black text-white bg-[#1CB0F6] border-2 border-[#1899D6] border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all">
            LÀM LẠI BÀI
          </button>
          <button onClick={onExit} className="flex-1 py-4 rounded-[20px] font-display font-black text-slate-500 bg-white border-2 border-slate-200 border-b-[5px] active:translate-y-[3px] active:border-b-[2px] transition-all">
            TRỞ VỀ
          </button>
        </div>
      </div>
    </div>
  );
});

ResultsScreen.displayName = 'ResultsScreen';
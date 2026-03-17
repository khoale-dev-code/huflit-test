import React, { memo, useMemo } from 'react';
import { Trophy, TrendingUp, Target, RotateCcw, ChevronLeft, AlertCircle, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScoreDisplay } from './ScoreDisplay';
import { PartResults } from './PartResults';
import { calculateToeicScore } from '../../../../utils/gradeUtils';
import { makeStandaloneKey, makeGroupKey } from '../../utils/answerKey';

export const ResultsScreen = memo(({ examData, answers, onRetry, onExit }) => {
  if (!examData?.parts) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-6 font-sans">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
          <p className="text-slate-500 font-display font-bold text-[15px]">Đang tính toán kết quả...</p>
        </div>
      </div>
    );
  }

  const isToeicExam = (examData.category ?? '').toLowerCase().includes('toeic');

  const { results, convertedScore, partResults, allParts } = useMemo(() => {
    let listeningCorrect = 0, listeningTotal = 0;
    let readingCorrect = 0,   readingTotal   = 0;

    const listeningByPart = {};
    const readingByPart   = {};
    const partsStats      = [];

    const partsArr = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);
    const listeningParts = partsArr.filter(p => p.type === 'listening');
    const readingParts   = partsArr.filter(p => p.type === 'reading');

    // ── Hàm chấm điểm 1 part — xử lý cả câu đơn lẫn group ──
    const scorePart = (part, sectionType) => {
      let pTotal = 0, pCorrect = 0;

      (part.questions || []).forEach((q, qIdx) => {
        if (q.type === 'group') {
          (q.subQuestions || []).forEach((sq, subIdx) => {
            if (sq.isExample) return;
            pTotal++;
            // Dùng makeGroupKey — khớp chính xác với ExamScreen
            const key = makeGroupKey(sectionType, part.id, q.id, subIdx);
            if (answers[key] !== undefined && String(answers[key]) === String(sq.correct)) {
              pCorrect++;
            }
          });
        } else {
          if (q.isExample) return;
          pTotal++;
          // Dùng makeStandaloneKey — khớp chính xác với ExamScreen
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
      listeningTotal   += pTotal;
      listeningCorrect += pCorrect;
      listeningByPart[index + 1] = { score: pCorrect, max: pTotal };
      partsStats.push({ name: `Nghe Part ${index + 1}`, score: pCorrect, max: pTotal, section: 'listening' });
    });

    readingParts.forEach((part, index) => {
      const { pTotal, pCorrect } = scorePart(part, 'reading');
      readingTotal   += pTotal;
      readingCorrect += pCorrect;
      readingByPart[index + 1] = { score: pCorrect, max: pTotal };
      partsStats.push({ name: `Đọc Part ${index + 1}`, score: pCorrect, max: pTotal, section: 'reading' });
    });

    const totalCorrect    = listeningCorrect + readingCorrect;
    const totalQuestions  = listeningTotal   + readingTotal;
    const averageScore    = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const listeningPercent = listeningTotal > 0 ? Math.round((listeningCorrect / listeningTotal) * 100) : 0;
    const readingPercent   = readingTotal   > 0 ? Math.round((readingCorrect   / readingTotal)   * 100) : 0;

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

  const { strongest, weakest } = useMemo(() => {
    if (allParts.length === 0) return { strongest: null, weakest: null };
    let best = allParts[0], worst = allParts[0];
    allParts.forEach(p => {
      if (p.score / p.max > best.score / best.max)  best  = p;
      if (p.score / p.max < worst.score / worst.max) worst = p;
    });
    return { strongest: best, weakest: worst };
  }, [allParts]);

  return (
    <div className="min-h-screen bg-[#F4F7FA] pb-16 font-sans selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
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

        <motion.div
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
        </motion.div>

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
              <p className="text-[12px] font-body font-bold text-amber-500 mt-1.5">tổng điểm</p>
            </div>
          ) : (
            <div className="bg-white rounded-[20px] border-2 border-slate-200 border-b-[4px] p-4 text-center shadow-sm hover:-translate-y-1 transition-transform">
              <p className="text-[10px] md:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-1.5">Tổng điểm</p>
              <p className="text-[28px] md:text-[32px] font-display font-black text-slate-800 leading-none">
                {results.totalCorrect}<span className="text-[16px] text-slate-400">/{results.totalQuestions}</span>
              </p>
              <p className="text-[12px] font-body font-bold text-slate-500 mt-1.5">câu đúng</p>
            </div>
          )}

          <div className="bg-white rounded-[20px] border-2 border-[#BAE3FB] border-b-[4px] p-4 text-center shadow-sm hover:-translate-y-1 transition-transform">
            <p className="text-[10px] md:text-[11px] font-display font-black text-[#1CB0F6] uppercase tracking-widest mb-1.5">Nghe (Listening)</p>
            <p className="text-[28px] md:text-[32px] font-display font-black text-[#1CB0F6] leading-none">
              {isToeicExam ? convertedScore.listening : `${results.listeningPercent}%`}
            </p>
            <p className="text-[12px] font-body font-bold text-blue-400 mt-1.5">{isToeicExam ? 'điểm' : 'chính xác'}</p>
          </div>

          <div className="bg-white rounded-[20px] border-2 border-[#bcf096] border-b-[4px] p-4 text-center shadow-sm hover:-translate-y-1 transition-transform">
            <p className="text-[10px] md:text-[11px] font-display font-black text-[#58CC02] uppercase tracking-widest mb-1.5">Đọc (Reading)</p>
            <p className="text-[28px] md:text-[32px] font-display font-black text-[#58CC02] leading-none">
              {isToeicExam ? convertedScore.reading : `${results.readingPercent}%`}
            </p>
            <p className="text-[12px] font-body font-bold text-green-500 mt-1.5">{isToeicExam ? 'điểm' : 'chính xác'}</p>
          </div>

          <div className="bg-white rounded-[20px] border-2 border-[#eec9ff] border-b-[4px] p-4 text-center shadow-sm hover:-translate-y-1 transition-transform">
            <p className="text-[10px] md:text-[11px] font-display font-black text-[#CE82FF] uppercase tracking-widest mb-1.5">Trình độ</p>
            <p className="text-[28px] md:text-[32px] font-display font-black text-[#CE82FF] leading-none">{results.cefrLevel}</p>
            <p className="text-[12px] font-body font-bold text-purple-400 mt-1.5">chuẩn CEFR</p>
          </div>
        </div>

        {strongest && weakest && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[5px] p-5 shadow-sm flex flex-col h-full">
              <h3 className="font-display font-black text-[18px] text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#f1faeb] flex items-center justify-center border-2 border-[#bcf096] shadow-sm shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#58CC02]" strokeWidth={3} />
                </div>
                Điểm mạnh
              </h3>
              <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-[16px] flex-1">
                <p className="text-[14px] font-display font-black text-slate-700 mb-2 truncate">🎯 {strongest.name}</p>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] font-body font-bold text-slate-500">Đúng {strongest.score}/{strongest.max} câu</p>
                  <p className="text-[14px] font-display font-black text-[#58CC02]">{Math.round((strongest.score / strongest.max) * 100)}%</p>
                </div>
                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden shadow-inner p-[2px]">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(strongest.score / strongest.max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, type: "spring", bounce: 0.2 }} className="h-full bg-[#58CC02] rounded-full relative">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/30 rounded-full" />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[5px] p-5 shadow-sm flex flex-col h-full">
              <h3 className="font-display font-black text-[18px] text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#FFFBEA] flex items-center justify-center border-2 border-[#FFD8A8] shadow-sm shrink-0">
                  <Target className="w-5 h-5 text-[#FF9600]" strokeWidth={3} />
                </div>
                Cần cải thiện
              </h3>
              <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-[16px] flex-1">
                <p className="text-[14px] font-display font-black text-slate-700 mb-2 truncate">📚 {weakest.name}</p>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] font-body font-bold text-slate-500">Đúng {weakest.score}/{weakest.max} câu</p>
                  <p className="text-[14px] font-display font-black text-[#FF9600]">{Math.round((weakest.score / weakest.max) * 100)}%</p>
                </div>
                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden shadow-inner p-[2px]">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(weakest.score / weakest.max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, type: "spring", bounce: 0.2 }} className="h-full bg-[#FF9600] rounded-full relative">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/30 rounded-full" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[5px] p-5 md:p-6 shadow-sm">
          <PartResults partResults={partResults} />
        </div>

        <div className="bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[5px] rounded-[24px] p-5 md:p-6 shadow-sm">
          <h3 className="font-display font-black text-[18px] text-[#1899D6] mb-4 flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-[#1CB0F6] fill-[#1CB0F6]" strokeWidth={2} />
            Gợi ý học tập
          </h3>
          <ul className="space-y-3 text-[14px] font-body font-bold text-slate-700 m-0 p-0 list-none">
            {results.averageScore >= 75 ? (
              <><li className="flex gap-3 items-start"><span className="shrink-0 text-[18px]">🌟</span> Trình độ rất tốt! Sẵn sàng cho môi trường sử dụng tiếng Anh nâng cao.</li><li className="flex gap-3 items-start"><span className="shrink-0 text-[18px]">🔥</span> Hãy duy trì thói quen luyện tập để giữ vững chuỗi (streak) này nhé.</li></>
            ) : results.averageScore >= 50 ? (
              <><li className="flex gap-3 items-start"><span className="shrink-0 text-[18px]">👍</span> Khá tốt! Bạn có nền tảng tiếng Anh tương đối ổn định.</li>{weakest && <li className="flex gap-3 items-start"><span className="shrink-0 text-[18px]">💪</span> Cày thêm phần <strong>{weakest.name}</strong> để "gánh" điểm tổng lên nha!</li>}</>
            ) : (
              <><li className="flex gap-3 items-start"><span className="shrink-0 text-[18px]">🌱</span> Đừng nản chí! Hãy ôn lại từ những từ vựng cơ bản nhất.</li>{weakest && <li className="flex gap-3 items-start"><span className="shrink-0 text-[18px]">🎯</span> Mục tiêu tuần này: Tăng điểm cho phần <strong>{weakest.name}</strong>.</li>}</>
            )}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button onClick={onRetry} className="flex-1 py-4 rounded-[20px] font-display font-black text-white text-[15px] uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 bg-[#1CB0F6] border-2 border-[#1899D6] border-b-[5px] hover:bg-[#18A0E0] active:border-b-[2px] active:translate-y-[3px] shadow-sm outline-none">
            <RotateCcw className="w-5 h-5" strokeWidth={3} /> Làm lại bài
          </button>
          <button onClick={onExit} className="flex-1 py-4 rounded-[20px] font-display font-black text-slate-500 text-[15px] uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 bg-white border-2 border-slate-200 border-b-[5px] hover:bg-slate-50 hover:text-slate-700 active:border-b-[2px] active:translate-y-[3px] shadow-sm outline-none">
            <ChevronLeft className="w-5 h-5" strokeWidth={3} /> Trở về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
});

ResultsScreen.displayName = 'ResultsScreen';
export default ResultsScreen;
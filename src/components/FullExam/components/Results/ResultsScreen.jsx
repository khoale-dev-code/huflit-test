import React, { memo, useState, useMemo, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

import ResultsHeader from '../../../Display/Result/ResultsHeader';
import ResultsStats from '../../../Display/Result/ResultsStats';
import ResultsControls from '../../../Display/Result/ResultsControls';
import ResultsDetailList from '../../../Display/Result/ResultsDetailList';

import { calculateToeicScore } from '../../../../utils/gradeUtils';
import { makeStandaloneKey, makeGroupKey } from '../../utils/answerKey';

const FILTER_TYPES = { ALL: 'all', CORRECT: 'correct', INCORRECT: 'wrong', UNANSWERED: 'unanswered' };
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 30, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } } };

export const ResultsScreen = memo(({ examData, answers, onRetry, onExit }) => {
  const [activeFilter, setActiveFilter] = useState(FILTER_TYPES.ALL);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  // 1. TẠO CẤU TRÚC DỮ LIỆU GỌN NHẸ (Đã bỏ flatQuestions thừa)
  const { structuredQuestions, scoreResult, convertedScore } = useMemo(() => {
    if (!examData?.parts) return { structuredQuestions: [], scoreResult: null, convertedScore: null };

    const structure = [];
    let correct = 0, listeningCorrect = 0, readingCorrect = 0, total = 0;
    
    const partsArr = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);

    partsArr.forEach(part => {
      // Tự động nhận diện kỹ năng nếu DB thiếu
      const pType = part.type || (['part1', 'part2', 'part3', 'part4'].includes(String(part.id).toLowerCase()) ? 'listening' : 'reading');

      (part.questions || []).forEach((q, qIdx) => {
        if (q.type === 'group') {
          const newGroup = { ...q, partType: pType, partId: part.id };
          let groupHasCorrect = false;
          let groupHasWrong = false;
          let groupHasUnanswered = false;

          newGroup.subQuestions = (q.subQuestions || []).map((sq, subIdx) => {
            if (sq.isExample) return sq;
            
            total++;
            const key = makeGroupKey(pType, part.id, q.id, subIdx);
            const userAns = answers[key];
            const isUnanswered = userAns === undefined || userAns === null || userAns === '';
            const isCorrect = !isUnanswered && String(userAns) === String(sq.correct);
            
            if (isUnanswered) groupHasUnanswered = true;
            else if (isCorrect) { correct++; pType === 'listening' ? listeningCorrect++ : readingCorrect++; groupHasCorrect = true; }
            else groupHasWrong = true;
            
            return { ...sq, questionKey: key, userAns, isCorrect, isUnanswered, partType: pType };
          });

          newGroup.hasCorrect = groupHasCorrect;
          newGroup.hasWrong = groupHasWrong;
          newGroup.hasUnanswered = groupHasUnanswered;
          structure.push(newGroup);

        } else {
          if (q.isExample) return;
          total++;
          const key = makeStandaloneKey(pType, part.id, qIdx);
          const userAns = answers[key];
          const isUnanswered = userAns === undefined || userAns === null || userAns === '';
          const isCorrect = !isUnanswered && String(userAns) === String(q.correct);
          
          if (isCorrect) { correct++; pType === 'listening' ? listeningCorrect++ : readingCorrect++; }
          
          structure.push({ ...q, questionKey: key, userAns, isCorrect, isUnanswered, partType: pType });
        }
      });
    });

    const percentage = total > 0 ? (correct / total) * 100 : 0;
    
    let cefrLevel = 'A1';
    if (percentage >= 90) cefrLevel = 'C1';
    else if (percentage >= 75) cefrLevel = 'B2';
    else if (percentage >= 50) cefrLevel = 'B1';
    else if (percentage >= 30) cefrLevel = 'A2';

    const isToeic = (examData.category || '').toLowerCase().includes('toeic');
    const toeicScores = isToeic ? calculateToeicScore(listeningCorrect, readingCorrect) : null;

    return {
      structuredQuestions: structure,
      scoreResult: { total, correct, percentage, totalQuestions: total, totalCorrect: correct, cefrLevel },
      convertedScore: toeicScores
    };
  }, [examData, answers]);

  // 2. XỬ LÝ LỌC
  const filteredQuestions = useMemo(() => {
    return structuredQuestions.map(item => {
      if (item.type === 'group') {
        let filteredSubs = item.subQuestions;
        if (activeFilter === FILTER_TYPES.CORRECT) filteredSubs = filteredSubs.filter(sq => sq.isCorrect || sq.isExample);
        else if (activeFilter === FILTER_TYPES.INCORRECT) filteredSubs = filteredSubs.filter(sq => (!sq.isCorrect && !sq.isUnanswered) || sq.isExample);
        else if (activeFilter === FILTER_TYPES.UNANSWERED) filteredSubs = filteredSubs.filter(sq => sq.isUnanswered || sq.isExample);
        
        if (!filteredSubs || filteredSubs.length === 0 || (filteredSubs.length === 1 && filteredSubs[0].isExample)) return null;
        return { ...item, subQuestions: filteredSubs };
      }
      
      if (activeFilter === FILTER_TYPES.CORRECT && !item.isCorrect) return null;
      if (activeFilter === FILTER_TYPES.INCORRECT && (item.isCorrect || item.isUnanswered)) return null;
      if (activeFilter === FILTER_TYPES.UNANSWERED && !item.isUnanswered) return null;
      
      return item;
    }).filter(Boolean); 
  }, [structuredQuestions, activeFilter]);


  // ─── RENDER ───
  if (!examData?.parts || !scoreResult) return null;

  return (
    // 🚀 FIX: Xóa style rườm rà, dùng chuẩn Tailwind 'font-nunito' xuyên suốt
    <Motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      className="relative min-h-[calc(100vh-80px)] bg-[#F8FAFC] w-full flex flex-col font-nunito selection:bg-blue-200 overflow-x-hidden"
    >
      <Motion.div variants={itemVariants} className="w-full z-0">
        <ResultsHeader examCategory={examData.category} />
      </Motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 md:-mt-16 pb-24 flex flex-col gap-6 md:gap-8">
        
        <Motion.div variants={itemVariants}>
          <ResultsStats score={scoreResult} convertedScore={convertedScore} examCategory={examData.category} />
        </Motion.div>

        <Motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
           <div className="flex-1 w-full">
             <ResultsControls onReset={onRetry} />
           </div>
           <button 
             onClick={onExit}
             className="w-full sm:max-w-[200px] flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-200 border-b-[5px] text-slate-500 rounded-[20px] font-black text-[15px] uppercase tracking-widest hover:text-[#FF4B4B] hover:border-[#ffc1c1] hover:bg-[#FFF0F0] active:translate-y-[3px] active:border-b-[2px] transition-all outline-none shadow-sm"
           >
             Trang Chủ <LogOut size={20} strokeWidth={3} />
           </button>
        </Motion.div>

        {/* Dấu chấm trang trí */}
        <Motion.div variants={itemVariants} className="w-full flex items-center justify-center py-2 md:py-4 opacity-60">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1CB0F6] mx-2 animate-pulse" />
          <div className="w-4 h-4 rounded-full bg-[#58CC02] mx-2 animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF9600] mx-2 animate-pulse" />
        </Motion.div>

        <Motion.div variants={itemVariants}>
          <ResultsDetailList
            filteredQuestions={filteredQuestions}
            answers={answers}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </Motion.div>
      </div>
    </Motion.div>
  );
});

ResultsScreen.displayName = 'ResultsScreen';
export default ResultsScreen;
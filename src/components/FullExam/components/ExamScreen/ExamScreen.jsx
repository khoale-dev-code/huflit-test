import React, { memo, useMemo, useCallback, Suspense, lazy } from 'react';
import { 
  ChevronLeft, ChevronRight, AlertCircle, 
  Image as ImageIcon, FileText, CheckCircle2 
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { QuestionCard } from './QuestionCard';
import { makeStandaloneKey, makeGroupKey } from '../../utils/answerKey';
import { MiniAudioPlayer } from '../../../Display/MiniAudioPlayer';

const ContentDisplay = lazy(() => import('../../../Display/ContentDisplay'));

/* ==============================================================================
   SUB-COMPONENT: QUESTION GROUP CARD (Cụm câu hỏi bài đọc/nghe)
   ============================================================================== */
const QuestionGroupCard = memo(({ group, startQNum, answers, onSelectAnswer, section, part }) => {
  const validSubQs = useMemo(() => group.subQuestions?.filter(q => !q.isExample) || [], [group.subQuestions]);
  const validCount = validSubQs.length;
  const endQNum = startQNum + validCount - 1;
  const hasAudio = !!group.audioUrl;
  const passage = group.content || group.passageText || '';

  return (
    <Motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-5 sm:p-8 shadow-sm mb-8 overflow-hidden"
    >
      {/* ── Group Context Header ── */}
      <div className="bg-[#F8EEFF] border-2 border-[#eec9ff] rounded-[24px] p-6 mb-8 relative shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-5">
          <div className="w-14 h-14 bg-white rounded-2xl border-2 border-[#eec9ff] border-b-[4px] flex items-center justify-center text-[#CE82FF] shrink-0 shadow-sm">
            <FileText size={28} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-[12px] font-black text-[#B975E5] uppercase tracking-[0.15em] block mb-1">Dữ liệu tham khảo</span>
            <h4 className="text-[18px] sm:text-[20px] font-black text-slate-800 m-0 leading-tight">
              Dùng cho câu {startQNum}{validCount > 1 ? ` đến ${endQNum}` : ''}
            </h4>
          </div>
        </div>

        {group.imageUrl && (
          <div className="relative mb-6 flex justify-center bg-white p-2 rounded-2xl border-2 border-[#eec9ff] shadow-inner">
            <img
              src={group.imageUrl}
              alt="Group context"
              className="max-w-full max-h-[350px] object-contain rounded-xl"
              loading="lazy"
            />
          </div>
        )}

        {hasAudio && (
          <div className="mb-6 bg-white/70 p-3 rounded-2xl border border-white/50 shadow-inner">
            <MiniAudioPlayer audioUrl={group.audioUrl} />
          </div>
        )}

        {passage && (
          <div className="bg-white/80 p-5 rounded-2xl border-2 border-[#eec9ff]/40 shadow-inner">
            <p className="text-[16px] font-bold text-slate-700 leading-relaxed whitespace-pre-wrap m-0">
              {passage}
            </p>
          </div>
        )}
      </div>

      {/* ── Sub Questions List ── */}
      <div className="space-y-6 sm:pl-2">
        {group.subQuestions?.map((sq, subIdx) => {
          const qKey = makeGroupKey(section, part, group.id, subIdx);
          const validPreceding = group.subQuestions.slice(0, subIdx).filter(q => !q.isExample).length;
          const currentNum = startQNum + validPreceding;

          return (
            <div key={qKey} className="relative">
              <QuestionCard
                question={sq}
                questionNum={sq.isExample ? 'VD' : currentNum}
                selectedAnswer={answers[qKey]}
                onAnswerSelect={(val) => !sq.isExample && onSelectAnswer(qKey, val)}
                questionKey={qKey}
              />
            </div>
          );
        })}
      </div>
    </Motion.div>
  );
});
QuestionGroupCard.displayName = 'QuestionGroupCard';


/* ==============================================================================
   MAIN COMPONENT: EXAM SCREEN
   ============================================================================== */
export const ExamScreen = memo(({ 
  examData, section, part, answers, onSelectAnswer, 
  onNavigatePart, onNextSection, onSubmit, onAudioEnd, playedParts 
}) => {

  const partData = useMemo(() => {
    const parts = Array.isArray(examData?.parts) ? examData.parts : Object.values(examData?.parts || {});
    return parts.find(p => p.id === part) || null;
  }, [examData, part]);

  const siblingParts = useMemo(() => {
    const parts = Array.isArray(examData?.parts) ? examData.parts : Object.values(examData?.parts || {});
    return parts.filter(p => p.type === section);
  }, [examData, section]);

  const currentIdx = siblingParts.findIndex(p => p.id === part);

  const getValidQuestionCount = useCallback((questions) => {
    if (!questions) return 0;
    return questions.reduce((acc, q) => {
      if (q.type === 'group') return acc + (q.subQuestions?.filter(sq => !sq.isExample).length || 0);
      return acc + (q.isExample ? 0 : 1);
    }, 0);
  }, []);

  const startQNum = useMemo(() => {
    let count = 1;
    for (const p of siblingParts) {
      if (p.id === part) break;
      count += getValidQuestionCount(p.questions);
    }
    return count;
  }, [siblingParts, part, getValidQuestionCount]);

  const unansweredCount = useMemo(() => {
    if (!partData?.questions) return 0;
    let count = 0;
    partData.questions.forEach((q, qIdx) => {
      if (q.type === 'group') {
        q.subQuestions?.forEach((sq, sIdx) => {
          if (!sq.isExample) {
            const key = makeGroupKey(section, part, q.id, sIdx);
            if (answers[key] === undefined || answers[key] === null) count++;
          }
        });
      } else if (!q.isExample) {
        const key = makeStandaloneKey(section, part, qIdx);
        if (answers[key] === undefined || answers[key] === null) count++;
      }
    });
    return count;
  }, [partData, answers, section, part]);

  const handlePrev = () => currentIdx > 0 && onNavigatePart(siblingParts[currentIdx - 1].id);
  const handleNext = () => {
    if (currentIdx < siblingParts.length - 1) {
      onNavigatePart(siblingParts[currentIdx + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      section === 'listening' ? onNextSection() : onSubmit();
    }
  };

  if (!partData) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 font-nunito">
      <div className="w-14 h-14 border-[4px] border-slate-200 border-t-[#1CB0F6] rounded-full animate-spin shadow-inner" />
      <div className="text-slate-500 font-black text-[16px] tracking-widest uppercase">Đang nạp câu hỏi...</div>
    </div>
  );

  let renderGlobalIndex = startQNum;

  return (
    // 🚀 Bỏ min-h-screen & bg color thừa. Dùng relative và pb-32 để không đè footer
    <div className="font-nunito relative w-full pb-[120px]">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── Alert: Câu chưa trả lời ── */}
        <AnimatePresence>
          {unansweredCount > 0 && (
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="bg-[#FFFBEA] border-2 border-[#FFD8A8] border-b-[6px] p-5 rounded-[28px] flex items-center gap-5 shadow-sm"
            >
              <div className="w-14 h-14 bg-[#FF9600] rounded-2xl border-b-[4px] border-[#E58700] flex items-center justify-center shrink-0 shadow-sm">
                <AlertCircle className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h5 className="text-[#D9A600] font-black text-[16px] m-0 uppercase tracking-widest mb-1">Kiểm tra lại đáp án!</h5>
                <p className="text-slate-600 font-bold text-[14px]">
                  Bạn còn <span className="text-[#FF9600] font-black text-[18px] px-1">{unansweredCount}</span> câu chưa trả lời ở phần này.
                </p>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* ── Part Context & Media ── */}
        <div className="space-y-6">
          {partData.imageUrl && (
            <div className="bg-white border-2 border-slate-200 border-b-[6px] rounded-[28px] p-6 flex flex-col items-center gap-4 shadow-sm group">
              <div className="flex items-center gap-3 w-full bg-slate-50 border-2 border-slate-100 p-3 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#1CB0F6] text-white flex items-center justify-center border-b-[3px] border-[#1899D6] shadow-sm shrink-0">
                  <ImageIcon size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[13px] font-black text-slate-500 uppercase tracking-widest">Hình ảnh đề bài</span>
              </div>
              <img src={partData.imageUrl} alt="Context" className="max-w-full rounded-xl border-2 border-slate-100 shadow-inner group-hover:scale-[1.01] transition-transform duration-300" />
            </div>
          )}

          <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] overflow-hidden shadow-sm">
            <Suspense fallback={<div className="h-40 flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-[4px] border-slate-200 border-t-[#1CB0F6] rounded-full animate-spin" /></div>}>
              <ContentDisplay 
                partData={partData} 
                selectedPart={part} 
                testType={section} 
                onAudioEnd={onAudioEnd} 
                isPartPlayed={playedParts?.includes(part)} 
              />
            </Suspense>
          </div>
        </div>

        {/* ── Questions Rendering ── */}
        <div className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white border-2 border-slate-200 border-b-[4px] rounded-2xl shadow-sm">
            <span className="w-3 h-3 rounded-full bg-[#58CC02] animate-pulse shadow-[0_0_8px_#58CC02]" />
            <h3 className="text-[14px] font-black text-slate-600 uppercase tracking-widest pt-0.5">
              Câu {startQNum} – {startQNum + Math.max(0, getValidQuestionCount(partData.questions) - 1)}
            </h3>
          </div>

          <div className="space-y-8">
            {partData.questions?.map((q, qIdx) => {
              if (q.type === 'group') {
                const groupStart = renderGlobalIndex;
                const validSubCount = q.subQuestions?.filter(sq => !sq.isExample).length || 0;
                renderGlobalIndex += validSubCount;
                
                return (
                  <QuestionGroupCard
                    key={q.id}
                    group={q}
                    startQNum={groupStart}
                    answers={answers}
                    onSelectAnswer={onSelectAnswer}
                    section={section}
                    part={part}
                  />
                );
              }

              const qKey = makeStandaloneKey(section, part, qIdx);
              const currentNum = renderGlobalIndex;
              if (!q.isExample) renderGlobalIndex++;

              return (
                <QuestionCard
                  key={qKey}
                  question={q}
                  questionNum={q.isExample ? 'VD' : currentNum}
                  selectedAnswer={answers[qKey]}
                  onAnswerSelect={(val) => !q.isExample && onSelectAnswer(qKey, val)}
                  questionKey={qKey}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── NAVIGATION FOOTER (Kính mờ, không đè nội dung) ── */}
      {/* 🚀 Đã sửa fixed bottom-0 nhưng Container bên trên đã có pb-[120px] bảo kê */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border-2 border-slate-200 border-b-[6px] p-4 sm:p-5 rounded-[28px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] pointer-events-auto flex items-center justify-between gap-4">
          
          <button
            disabled={currentIdx <= 0}
            onClick={handlePrev}
            className={`group flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl font-black text-[14px] sm:text-[15px] uppercase tracking-widest transition-all outline-none border-2 active:border-b-0 active:translate-y-[4px] shrink-0 ${
              currentIdx <= 0
                ? 'bg-slate-50 border-slate-200 text-slate-300 opacity-60'
                : 'bg-white border-slate-200 border-b-[4px] text-slate-500 hover:text-[#1CB0F6] hover:border-[#BAE3FB] hover:bg-[#EAF6FE]'
            }`}
          >
            <ChevronLeft size={22} strokeWidth={3} className="transition-transform group-hover:-translate-x-1" />
            <span className="hidden md:inline">Trước đó</span>
          </button>

         {/* ── Progress Bar (Neo-Brutalism Style) ── */}
          <div className="hidden sm:flex flex-1 flex-col items-center px-4 max-w-[300px] mx-auto">
            <div className="w-full flex justify-between items-end mb-2 px-1">
              <span className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Tiến độ</span>
              <span className="text-[13px] font-black text-slate-900 bg-[#FFC800] px-2 py-0.5 rounded-md border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1E293B]">
                {Math.round(((currentIdx + 1) / siblingParts.length) * 100)}%
              </span>
            </div>
            {/* Vỏ thanh cuộn: Viền đen dày, đổ bóng cứng */}
            <div className="w-full h-5 bg-white rounded-full border-4 border-slate-800 p-0 overflow-hidden shadow-[4px_4px_0px_0px_#1E293B]">
              <Motion.div 
                className="h-full bg-[#1CB0F6] border-r-4 border-slate-800"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / siblingParts.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className={`group flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-2xl font-black text-[14px] sm:text-[15px] uppercase tracking-widest text-white transition-all outline-none border-2 active:border-b-0 active:translate-y-[4px] shadow-sm shrink-0 ${
              currentIdx === siblingParts.length - 1
                ? 'bg-[#58CC02] border-[#46A302] border-b-[4px] hover:brightness-105'
                : 'bg-[#1CB0F6] border-[#1899D6] border-b-[4px] hover:brightness-105'
            }`}
          >
            <span className="pt-0.5">
              {currentIdx === siblingParts.length - 1 
                ? (section === 'listening' ? 'Phần tiếp' : 'Nộp bài') 
                : 'Tiếp theo'}
            </span>
            {currentIdx === siblingParts.length - 1 && section !== 'listening' 
              ? <CheckCircle2 size={22} strokeWidth={3} className="transition-transform group-hover:scale-110" /> 
              : <ChevronRight size={22} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
            }
          </button>
        </div>
      </div>

    </div>
  );
});

ExamScreen.displayName = 'ExamScreen';
export default ExamScreen;
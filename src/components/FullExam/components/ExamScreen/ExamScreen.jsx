import React, { memo, useMemo, useCallback, Suspense, lazy } from 'react';
import { 
  ChevronLeft, ChevronRight, Flag, AlertCircle, 
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
      className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-5 sm:p-8 shadow-sm mb-10 overflow-hidden"
    >
      {/* ── Group Context Header ── */}
      <div className="bg-[#F8EEFF] border-2 border-[#eec9ff] rounded-[24px] p-6 mb-8 relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-white rounded-2xl border-2 border-[#eec9ff] border-b-[4px] flex items-center justify-center text-[#CE82FF] shrink-0 shadow-sm">
            <FileText size={24} strokeWidth={3} />
          </div>
          <div>
            <span className="text-[12px] font-black text-[#B975E5] uppercase tracking-[0.15em] block mb-0.5">Thông tin nhóm</span>
            <h4 className="text-[18px] font-black text-slate-800 m-0 leading-none">
              Câu {startQNum}{validCount > 1 ? ` – ${endQNum}` : ''}
            </h4>
          </div>
        </div>

        {group.imageUrl && (
          <div className="group/img relative mb-6">
            <img
              src={group.imageUrl}
              alt="Group context"
              className="max-w-full max-h-[400px] object-contain rounded-2xl border-2 border-white bg-white p-1 shadow-md transition-transform group-hover/img:scale-[1.01]"
            />
          </div>
        )}

        {hasAudio && (
          <div className="mb-6 bg-white/60 p-2 rounded-2xl border border-white/50 shadow-inner">
            <MiniAudioPlayer audioUrl={group.audioUrl} />
          </div>
        )}

        {passage && (
          <div className="prose prose-slate max-w-none">
            <p className="text-[16px] font-bold text-slate-700 leading-relaxed whitespace-pre-wrap m-0 bg-white/80 p-5 rounded-2xl border-2 border-[#eec9ff]/30 shadow-inner">
              {passage}
            </p>
          </div>
        )}
      </div>

      {/* ── Sub Questions List ── */}
      <div className="space-y-8 sm:pl-4">
        {group.subQuestions?.map((sq, subIdx) => {
          const qKey = makeGroupKey(section, part, group.id, subIdx);
          // Tính số thứ tự: Chỉ tăng index cho những câu không phải là Ví dụ
          const validPreceding = group.subQuestions.slice(0, subIdx).filter(q => !q.isExample).length;
          const currentNum = startQNum + validPreceding;

          return (
            <div key={qKey} className="relative">
              <div className="absolute left-[-20px] top-0 bottom-0 w-1 bg-slate-100 rounded-full hidden sm:block" />
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

/* ==============================================================================
   MAIN COMPONENT: EXAM SCREEN
   ============================================================================== */
export const ExamScreen = memo(({ 
  examData, section, part, answers, onSelectAnswer, 
  onNavigatePart, onNextSection, onSubmit, onAudioEnd, playedParts 
}) => {

  // ─── Data Selectors ───
  const partData = useMemo(() => {
    const parts = Array.isArray(examData?.parts) ? examData.parts : Object.values(examData?.parts || {});
    return parts.find(p => p.id === part) || null;
  }, [examData, part]);

  const siblingParts = useMemo(() => {
    const parts = Array.isArray(examData?.parts) ? examData.parts : Object.values(examData?.parts || {});
    return parts.filter(p => p.type === section);
  }, [examData, section]);

  const currentIdx = siblingParts.findIndex(p => p.id === part);

  // ─── Helpers ───
  const getValidQuestionCount = useCallback((questions) => {
    if (!questions) return 0;
    return questions.reduce((acc, q) => {
      if (q.type === 'group') return acc + (q.subQuestions?.filter(sq => !sq.isExample).length || 0);
      return acc + (q.isExample ? 0 : 1);
    }, 0);
  }, []);

  // Tính số thứ tự câu bắt đầu của Part này trong Section
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
            if (!answers[key]) count++;
          }
        });
      } else if (!q.isExample) {
        const key = makeStandaloneKey(section, part, qIdx);
        if (!answers[key]) count++;
      }
    });
    return count;
  }, [partData, answers, section, part]);

  // ─── Handlers ───
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
    <div className="flex flex-col items-center justify-center py-32 gap-6 font-nunito">
      <div className="w-16 h-16 border-[6px] border-slate-100 border-t-[#1CB0F6] rounded-full animate-spin shadow-inner" />
      <p className="text-slate-500 font-black text-[18px] uppercase tracking-widest">Đang tải đề thi...</p>
    </div>
  );

  let renderGlobalIndex = startQNum;

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-nunito pb-40 selection:bg-[#1CB0F6] selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">

        {/* ── Alert: Câu chưa trả lời ── */}
        <AnimatePresence>
          {unansweredCount > 0 && (
            <Motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#FFFBEA] border-2 border-[#FFD8A8] border-b-[6px] p-5 rounded-[28px] flex items-center gap-5 shadow-sm"
            >
              <div className="w-14 h-14 bg-[#FF9600] rounded-2xl border-b-[4px] border-[#E58700] flex items-center justify-center shrink-0 shadow-md">
                <AlertCircle className="text-white" size={32} strokeWidth={3} />
              </div>
              <div>
                <h5 className="text-[#D9A600] font-black text-[16px] m-0 uppercase tracking-tight">Kiểm tra lại đáp án!</h5>
                <p className="text-slate-600 font-bold text-[15px] mt-0.5">
                  Phần này còn <span className="text-[#FF9600] font-black text-[18px]">{unansweredCount}</span> câu chưa được tích chọn.
                </p>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* ── Part Info & Media ── */}
        <div className="space-y-8">
          {partData.imageUrl && (
            <div className="bg-white border-2 border-slate-200 border-b-[8px] rounded-[32px] p-6 flex flex-col items-center gap-5 shadow-sm group">
              <div className="flex items-center gap-3 w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl transition-colors group-hover:border-blue-100">
                <div className="w-10 h-10 rounded-xl bg-[#1CB0F6] text-white flex items-center justify-center border-b-[3px] border-[#1899D6] shadow-sm">
                  <ImageIcon size={20} strokeWidth={3} />
                </div>
                <span className="text-[13px] font-black text-slate-500 uppercase tracking-widest">Hình ảnh đề bài</span>
              </div>
              <img src={partData.imageUrl} alt="Part Context" className="max-w-full rounded-2xl border-2 border-slate-100 shadow-inner hover:scale-[1.01] transition-transform duration-500" />
            </div>
          )}

          {/* ── Content Display (Video/Audio/Reading Text) ── */}
          <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
            <Suspense fallback={<div className="h-60 flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" /></div>}>
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
        <div className="space-y-8 pt-6">
          <div className="flex items-center gap-4">
             <div className="h-10 px-6 bg-white border-2 border-slate-200 border-b-[4px] rounded-full flex items-center gap-3 shadow-sm">
                <span className="w-3 h-3 rounded-full bg-[#58CC02] animate-pulse shadow-[0_0_8px_#58CC02]" />
                <span className="text-[14px] font-black text-slate-600 uppercase tracking-[0.1em]">
                   Câu {startQNum} – {startQNum + Math.max(0, getValidQuestionCount(partData.questions) - 1)}
                </span>
             </div>
          </div>

          <div className="space-y-10">
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

      {/* ── FLOATING 3D FOOTER (Navigation) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-5 sm:p-8 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border-2 border-slate-200 border-b-[8px] p-4 sm:p-5 rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] pointer-events-auto flex items-center justify-between gap-4">
          
          <button
            disabled={currentIdx <= 0}
            onClick={handlePrev}
            className={`group flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-[15px] uppercase tracking-widest transition-all outline-none border-2 active:border-b-0 active:translate-y-[4px] ${
              currentIdx <= 0
                ? 'bg-slate-50 border-slate-200 text-slate-300 opacity-50'
                : 'bg-white border-slate-200 border-b-[4px] text-slate-500 hover:text-[#1CB0F6] hover:border-[#BAE3FB] hover:bg-[#EAF6FE]'
            }`}
          >
            <ChevronLeft size={24} strokeWidth={3} className="transition-transform group-hover:-translate-x-1" />
            <span className="hidden md:inline">Trước đó</span>
          </button>

          {/* Duolingo-style Progress Bar */}
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="w-full max-w-[200px]">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiến độ</span>
                <span className="text-[11px] font-black text-[#1CB0F6]">{Math.round(((currentIdx + 1) / siblingParts.length) * 100)}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full border border-slate-200 p-0.5 overflow-hidden shadow-inner">
                <Motion.div 
                  className="h-full bg-gradient-to-r from-[#1CB0F6] to-[#58CC02] rounded-full shadow-[0_0_10px_rgba(28,176,246,0.3)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIdx + 1) / siblingParts.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className={`group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-[15px] uppercase tracking-widest text-white transition-all outline-none border-2 active:border-b-0 active:translate-y-[4px] shadow-lg ${
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
              ? <CheckCircle2 size={24} strokeWidth={3} className="transition-transform group-hover:scale-110" /> 
              : <ChevronRight size={24} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
            }
          </button>
        </div>
      </div>
    </div>
  );
});

ExamScreen.displayName = 'ExamScreen';
export default ExamScreen;
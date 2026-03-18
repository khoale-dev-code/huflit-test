import React, { memo, useMemo, useCallback, useState, useEffect, Suspense, lazy } from 'react';
import { ChevronLeft, ChevronRight, Flag, AlertCircle, Image as ImageIcon, FileText } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion'; // 🚀 FIX: Đổi thành Motion
import { QuestionCard } from './QuestionCard';
import { makeStandaloneKey, makeGroupKey } from '../../utils/answerKey';
import { MiniAudioPlayer } from '../../../Display/MiniAudioPlayer';

const ContentDisplay = lazy(() => import('../../../Display/ContentDisplay'));

/* ─── SUB-COMPONENT: QUESTION GROUP CARD ────────────────── */
const QuestionGroupCard = memo((props) => {
  const { group, startQNum, answers, onSelectAnswer, section, part } = props;
  const validSubQs = useMemo(() => group.subQuestions?.filter(q => !q.isExample) || [], [group.subQuestions]);
  const validCount = validSubQs.length || 1;
  const endQNum = startQNum + validCount - 1;
  const hasAudio = !!group.audioUrl;
  const passage = group.content || group.passageText || '';

  return (
    <div className="bg-white rounded-[28px] border-2 border-slate-200 border-b-[6px] p-5 sm:p-7 shadow-sm mb-8">
      {/* Header Context (Màu tím nhẹ đặc trưng cho Group) */}
      <div className="bg-[#F8EEFF] border-2 border-[#eec9ff] rounded-[22px] p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-[12px] border-2 border-[#eec9ff] border-b-[3px] flex items-center justify-center text-[#CE82FF] shrink-0">
            <FileText size={20} strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-display font-black text-[#CE82FF] uppercase tracking-widest pt-1">
            Câu {startQNum}{validCount > 1 ? ` – ${endQNum}` : ''}
          </span>
        </div>

        {group.imageUrl && (
          <img
            src={group.imageUrl}
            alt="Context"
            className="max-w-full max-h-[320px] object-contain rounded-[16px] border-2 border-[#eec9ff] bg-white p-1.5 mb-5 shadow-sm"
          />
        )}

        {hasAudio && (
          <div className="mb-4">
            <MiniAudioPlayer audioUrl={group.audioUrl} />
          </div>
        )}

        {passage && (
          <p className="text-[15px] font-body font-bold text-slate-700 leading-relaxed whitespace-pre-wrap m-0 bg-white/50 p-4 rounded-xl border border-[#eec9ff]/50">
            {passage}
          </p>
        )}

        {!hasAudio && !passage && !group.imageUrl && (
          <p className="text-[13px] text-slate-400 italic font-medium">
            Sử dụng thông tin trên để trả lời các câu hỏi sau.
          </p>
        )}
      </div>

      {/* Câu hỏi con */}
      <div className="pl-1 sm:pl-6 border-l-4 border-slate-100 space-y-6">
        {group.subQuestions?.map((sq, subIdx) => {
          const qKey = makeGroupKey(section, part, group.id, subIdx);
          const validPreceding = group.subQuestions.slice(0, subIdx).filter(q => !q.isExample).length;
          const currentNum = startQNum + validPreceding;

          return (
            <QuestionCard
              key={qKey}
              question={sq}
              questionNum={sq.isExample ? 'VD' : currentNum}
              selectedAnswer={answers[qKey]}
              onAnswerSelect={(val) => !sq.isExample && onSelectAnswer(qKey, val)}
              questionKey={qKey}
            />
          );
        })}
      </div>
    </div>
  );
});
QuestionGroupCard.displayName = 'QuestionGroupCard';

/* ─── MAIN COMPONENT: EXAM SCREEN ────────────────────────── */
export const ExamScreen = memo((props) => {
  const { 
    examData, section, part, answers, onSelectAnswer, 
    onNavigatePart, onNextSection, onSubmit, onAudioEnd, playedParts 
  } = props;

  const partData = useMemo(() => {
    if (!examData?.parts) return null;
    const arr = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);
    return arr.find(p => p.id === part) || null;
  }, [examData, part]);

  const siblingParts = useMemo(() => {
    if (!examData?.parts) return [];
    const arr = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);
    return arr.filter(p => p.type === section);
  }, [examData, section]);

  const currentIdx = siblingParts.findIndex(p => p.id === part);

  const getValidQuestionCount = useCallback((questionsArray) => {
    if (!questionsArray) return 0;
    return questionsArray.reduce((total, q) => {
      if (q.type === 'group') {
        return total + (q.subQuestions?.filter(sq => !sq.isExample).length || 0);
      }
      return total + (q.isExample ? 0 : 1);
    }, 0);
  }, []);

  const startQNum = useMemo(() => {
    let count = 1;
    if (!examData?.parts) return 1;
    const arr = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);
    for (const p of arr) {
      if (p.id === part) break;
      if (p.type === section) count += getValidQuestionCount(p.questions);
    }
    return count;
  }, [examData, part, section, getValidQuestionCount]);

  const unansweredCount = useMemo(() => {
    if (!partData?.questions) return 0;
    let missing = 0;
    partData.questions.forEach((q, qIdx) => {
      if (q.type === 'group') {
        (q.subQuestions || []).forEach((sq, subIdx) => {
          if (!sq.isExample) {
            const key = makeGroupKey(section, part, q.id, subIdx);
            if (answers[key] === undefined || answers[key] === null) missing++;
          }
        });
      } else if (!q.isExample) {
        const key = makeStandaloneKey(section, part, qIdx);
        if (answers[key] === undefined || answers[key] === null) missing++;
      }
    });
    return missing;
  }, [partData, answers, section, part]);

  const handlePrev = useCallback(() => {
    if (currentIdx > 0) onNavigatePart(siblingParts[currentIdx - 1].id);
  }, [currentIdx, onNavigatePart, siblingParts]);

  const handleNext = useCallback(() => {
    if (currentIdx < siblingParts.length - 1) {
      onNavigatePart(siblingParts[currentIdx + 1].id);
    } else {
      section === 'listening' ? onNextSection() : onSubmit();
    }
  }, [currentIdx, onNavigatePart, siblingParts, section, onNextSection, onSubmit]);

  if (!partData) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
      <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <div className="text-[#1CB0F6] font-display font-black text-[16px] tracking-wide">Đang chuẩn bị phòng thi...</div>
    </div>
  );

  let renderGlobalIndex = startQNum;

  return (
    <div className="relative min-h-screen bg-[#F4F7FA] font-sans pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* Thông báo số câu còn thiếu */}
        <AnimatePresence>
          {unansweredCount > 0 && (
            <Motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFBEA] border-2 border-[#FFD8A8] border-b-[5px] p-4 rounded-[22px] flex items-center gap-4 shadow-sm"
            >
              <div className="w-11 h-11 bg-[#FF9600] rounded-[14px] border-b-[3px] border-[#E58700] flex items-center justify-center shrink-0">
                <AlertCircle className="text-white" size={24} strokeWidth={2.5} />
              </div>
              <p className="text-[15px] font-body font-bold text-slate-600">
                Bạn còn <span className="font-display font-black text-[#FF9600] text-[18px]">{unansweredCount}</span> câu chưa trả lời ở phần này.
              </p>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* Content & Context */}
        <div className="space-y-6">
          {partData.imageUrl && (
            <div className="bg-white border-2 border-slate-200 border-b-[6px] rounded-[28px] p-5 flex flex-col items-center gap-4 shadow-sm">
              <div className="flex items-center gap-2.5 w-full bg-slate-50 border-2 border-slate-100 p-3 rounded-[16px]">
                <div className="w-8 h-8 rounded-[10px] bg-[#1CB0F6] text-white flex items-center justify-center border-b-[2px] border-[#1899D6] shadow-sm">
                  <ImageIcon size={16} strokeWidth={2.5} />
                </div>
                <span className="text-[12px] font-display font-black text-slate-500 uppercase tracking-widest">Hình ảnh minh họa</span>
              </div>
              <img src={partData.imageUrl} alt="Exam" className="max-w-full rounded-[20px] border-2 border-slate-100 shadow-inner" />
            </div>
          )}

          <div className="bg-white rounded-[28px] border-2 border-slate-200 border-b-[6px] overflow-hidden shadow-sm">
            <Suspense fallback={<div className="h-40 flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-[3px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" /></div>}>
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

        {/* Danh sách câu hỏi */}
        <div className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border-2 border-slate-200 border-b-[4px] rounded-[18px] shadow-sm">
            <span className="w-3 h-3 rounded-full bg-[#58CC02] animate-pulse" />
            <h3 className="text-[13px] font-display font-black text-slate-600 uppercase tracking-widest pt-1">
              Câu {startQNum} – {startQNum + Math.max(0, getValidQuestionCount(partData.questions) - 1)}
            </h3>
          </div>

          <div className="space-y-6">
            {partData.questions?.map((q, qIdx) => {
              if (q.type === 'group') {
                const startIndex = renderGlobalIndex;
                const validSubCount = q.subQuestions?.filter(sq => !sq.isExample).length || 0;
                renderGlobalIndex += validSubCount;
                return (
                  <QuestionGroupCard
                    key={q.id}
                    group={q}
                    startQNum={startIndex}
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

      {/* Navigation Footer (Floating 3D) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border-2 border-slate-200 border-b-[8px] p-4 rounded-[30px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] pointer-events-auto flex items-center justify-between gap-4">
          <button
            disabled={currentIdx <= 0}
            onClick={handlePrev}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] font-display font-black text-[15px] uppercase tracking-wider transition-all outline-none border-2 ${
              currentIdx <= 0
                ? 'bg-slate-50 border-slate-200 text-slate-300'
                : 'bg-white border-slate-200 border-b-[4px] text-slate-600 hover:bg-slate-50 active:border-b-0 active:translate-y-[4px]'
            }`}
          >
            <ChevronLeft size={22} strokeWidth={3} />
            <span className="hidden sm:inline">Quay lại</span>
          </button>

          <div className="hidden md:flex flex-col items-center">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Tiến độ phần thi</div>
             <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <Motion.div 
                  className="h-full bg-hub-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIdx + 1) / siblingParts.length) * 100}%` }}
                />
             </div>
          </div>

          <button
            onClick={handleNext}
            className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-[18px] font-display font-black text-[15px] uppercase tracking-wider text-white transition-all outline-none border-2 active:border-b-0 active:translate-y-[4px] shadow-lg ${
              currentIdx === siblingParts.length - 1
                ? 'bg-[#58CC02] border-[#46A302] border-b-[4px] hover:bg-[#46A302]'
                : 'bg-[#1CB0F6] border-[#1899D6] border-b-[4px] hover:bg-[#18A0E0]'
            }`}
          >
            <span>
              {currentIdx === siblingParts.length - 1 
                ? (section === 'listening' ? 'Sang phần Reading' : 'Hoàn thành bài thi') 
                : 'Tiếp tục'}
            </span>
            {currentIdx === siblingParts.length - 1 && section !== 'listening' ? <Flag size={20} strokeWidth={3} /> : <ChevronRight size={22} strokeWidth={3} />}
          </button>
        </div>
      </div>
    </div>
  );
});

ExamScreen.displayName = 'ExamScreen';
export default ExamScreen;
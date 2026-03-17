import React, { memo, useMemo, useCallback, useState, useEffect, Suspense, lazy } from 'react';
import { ChevronLeft, ChevronRight, Flag, AlertCircle, Image as ImageIcon, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionCard } from './QuestionCard';
import { makeStandaloneKey, makeGroupKey } from '../../utils/answerKey';
import { MiniAudioPlayer } from '../../../Display/MiniAudioPlayer';

const ContentDisplay = lazy(() => import('../../../Display/ContentDisplay'));

// ─── Question Group Card ───────────────────────────────────────────────────
const QuestionGroupCard = memo(({ group, startQNum, answers, onSelectAnswer, section, part }) => {
  const validCount = group.subQuestions?.filter(q => !q.isExample).length || 1;
  const endQNum    = startQNum + validCount - 1;
  const hasAudio   = !!group.audioUrl;
  // Có đoạn văn bài đọc (Part 6/7 trong FullExam)
  const passage    = group.content || group.passageText || '';

  return (
    <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-4 sm:p-6 shadow-sm mb-6 font-sans">

      {/* ── Header context — tím giống admin ── */}
      <div className="bg-[#F8EEFF] border-2 border-[#eec9ff] rounded-[20px] p-4 sm:p-5 mb-5">

        {/* Nhãn group */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 bg-white rounded-[10px] border-2 border-[#eec9ff] flex items-center justify-center text-[#CE82FF] shrink-0">
            <FileText size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-display font-black text-[#CE82FF] uppercase tracking-widest pt-0.5">
            Dùng chung cho câu {startQNum}{validCount > 1 ? ` đến ${endQNum}` : ''}
          </span>
        </div>

        {/* Hình ảnh group (nếu có) */}
        {group.imageUrl && (
          <img
            src={group.imageUrl}
            alt="Passage"
            className="max-w-full max-h-[300px] object-contain rounded-[12px] border-2 border-[#eec9ff] bg-white p-1 mb-4"
          />
        )}

        {/* Audio của group (Part 3/4 TOEIC) — nằm trong card, không tách ra ngoài */}
        {hasAudio && (
          <div className="mb-3">
            <MiniAudioPlayer audioUrl={group.audioUrl} />
          </div>
        )}

        {/* Đoạn văn bài đọc (Part 6/7) */}
        {passage && (
          <p className="text-[14px] sm:text-[15px] font-body font-bold text-slate-700 leading-relaxed whitespace-pre-wrap m-0">
            {passage}
          </p>
        )}

        {/* Không có gì — placeholder */}
        {!hasAudio && !passage && !group.imageUrl && (
          <p className="text-[13px] text-slate-400 italic font-medium">
            Chọn đáp án đúng cho các câu hỏi bên dưới.
          </p>
        )}
      </div>

      {/* ── Câu hỏi con ── */}
      <div className="pl-2 sm:pl-6 border-l-4 border-slate-100 space-y-4">
        {group.subQuestions?.map((sq, subIdx) => {
          const qKey = makeGroupKey(section, part, group.id, subIdx);
          const validPrecedingQs = group.subQuestions.slice(0, subIdx).filter(q => !q.isExample).length;
          const currentGlobalIndex = startQNum + validPrecedingQs;

          return (
            <QuestionCard
              key={qKey}
              question={sq}
              questionNum={sq.isExample ? 'VD' : currentGlobalIndex}
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

// ─── MAIN EXAM SCREEN ──────────────────────────────────────────────────────
export const ExamScreen = memo(({
  examData, section, part, answers, onSelectAnswer,
  onNavigatePart, onNextSection, onSubmit, onAudioEnd, playedParts
}) => {

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

  const currentPartValidCount = useMemo(
    () => getValidQuestionCount(partData?.questions),
    [partData, getValidQuestionCount]
  );

  // unansweredCount dùng đúng key format
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
      } else {
        if (!q.isExample) {
          const key = makeStandaloneKey(section, part, qIdx);
          if (answers[key] === undefined || answers[key] === null) missing++;
        }
      }
    });
    return missing;
  }, [partData, answers, section, part]);

  if (!partData) return (
    <div className="flex flex-col items-center justify-center p-16 gap-3">
      <div className="w-10 h-10 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <div className="text-[#1CB0F6] font-display font-bold text-[15px]">Đang chuẩn bị phần thi...</div>
    </div>
  );

  const handlePrev = () => {
    if (currentIdx > 0) onNavigatePart(siblingParts[currentIdx - 1].id);
  };
  const handleNext = () => {
    if (currentIdx < siblingParts.length - 1) onNavigatePart(siblingParts[currentIdx + 1].id);
    else section === 'listening' ? onNextSection() : onSubmit();
  };
  const isLastPart = currentIdx >= siblingParts.length - 1;

  let renderGlobalIndex = startQNum;

  return (
    <div className="relative min-h-screen bg-[#F4F7FA] font-sans selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 md:pt-6 space-y-5 md:space-y-6">

        <AnimatePresence>
          {unansweredCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFBEA] border-2 border-[#FFD8A8] border-b-[4px] p-3 sm:p-4 rounded-[20px] flex items-center gap-3 shadow-sm"
            >
              <div className="w-10 h-10 bg-[#FF9600] rounded-[12px] border-b-[3px] border-[#E58700] flex items-center justify-center shrink-0">
                <AlertCircle className="text-white" size={22} strokeWidth={2.5} />
              </div>
              <p className="text-[14px] font-body font-bold text-slate-600 leading-snug">
                Còn <span className="font-display font-black text-[#FF9600] text-[16px]">{unansweredCount}</span> câu chưa chọn đáp án.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {partData.imageUrl && (
          <div className="bg-white border-2 border-slate-200 border-b-[4px] rounded-[24px] p-4 md:p-6 flex flex-col items-center gap-4 shadow-sm">
            <div className="flex items-center gap-2.5 w-full bg-slate-50 border-2 border-slate-100 p-2.5 rounded-[14px]">
              <div className="w-8 h-8 rounded-[8px] bg-[#1CB0F6] text-white flex items-center justify-center border-b-[2px] border-[#1899D6] shadow-sm shrink-0">
                <ImageIcon size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-display font-black text-slate-500 uppercase tracking-widest pt-0.5">Hình ảnh tham khảo</span>
            </div>
            <img src={partData.imageUrl} alt="Part context" loading="lazy" className="max-w-full max-h-[350px] md:max-h-[450px] object-contain rounded-[16px] border-2 border-slate-200 bg-slate-50 p-2" />
          </div>
        )}

        <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[4px] overflow-hidden shadow-sm">
          <Suspense fallback={<div className="h-40 flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-[3px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" /></div>}>
            <ContentDisplay partData={partData} selectedPart={part} testType={section} onAudioEnd={onAudioEnd} isPartPlayed={playedParts?.includes(part)} />
          </Suspense>
        </div>

        <div className="flex flex-col gap-4 md:gap-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 border-b-[3px] rounded-[14px] w-fit shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#58CC02]" />
            <h3 className="text-[12px] font-display font-black text-slate-600 uppercase tracking-widest pt-0.5">
              Câu {startQNum} – {startQNum + Math.max(0, currentPartValidCount - 1)}
            </h3>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {partData.questions?.map((q, qIdx) => {
              if (q.type === 'group') {
                const startIndexForGroup = renderGlobalIndex;
                const validSubQsCount = q.subQuestions?.filter(sq => !sq.isExample).length || 0;
                renderGlobalIndex += validSubQsCount;
                return (
                  <QuestionGroupCard
                    key={q.id}
                    group={q}
                    startQNum={startIndexForGroup}
                    answers={answers}
                    onSelectAnswer={onSelectAnswer}
                    section={section}
                    part={part}
                  />
                );
              }

              // Câu đơn — key dùng makeStandaloneKey
              const qKey = makeStandaloneKey(section, part, qIdx);
              const currentIndex = renderGlobalIndex;
              if (!q.isExample) renderGlobalIndex++;

              return (
                <QuestionCard
                  key={qKey}
                  question={q}
                  questionNum={q.isExample ? 'VD' : currentIndex}
                  selectedAnswer={answers[qKey]}
                  onAnswerSelect={(val) => !q.isExample && onSelectAnswer(qKey, val)}
                  questionKey={qKey}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-32 md:h-40 w-full pointer-events-none" />

      <div className="fixed bottom-0 sm:bottom-4 left-0 right-0 z-40 px-4 pb-4 sm:pb-0 pointer-events-none">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border-2 border-slate-200 border-b-[6px] p-3 sm:p-4 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] pointer-events-auto flex items-center justify-between gap-3">
          <button
            disabled={currentIdx <= 0} onClick={handlePrev}
            className={`flex items-center justify-center gap-1.5 px-4 md:px-5 py-3 rounded-[16px] font-display font-black text-[14px] md:text-[15px] uppercase tracking-wider transition-all outline-none border-2 ${
              currentIdx <= 0
                ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                : 'bg-white border-slate-200 border-b-[4px] text-slate-600 hover:bg-slate-50 hover:text-slate-800 active:border-b-2 active:translate-y-[2px] shadow-sm'
            }`}
          >
            <ChevronLeft size={20} strokeWidth={3} />
            <span className="hidden sm:inline">Quay lại</span>
          </button>

          <div className="flex-1" />

          <button
            onClick={handleNext}
            className={`flex items-center justify-center gap-2 px-5 md:px-8 py-3 rounded-[16px] font-display font-black text-[14px] md:text-[15px] uppercase tracking-wider text-white transition-all outline-none border-2 active:border-b-[2px] active:translate-y-[2px] shadow-sm ${
              isLastPart
                ? 'bg-[#58CC02] border-[#46A302] border-b-[4px] hover:bg-[#46A302]'
                : 'bg-[#1CB0F6] border-[#1899D6] border-b-[4px] hover:bg-[#18A0E0]'
            }`}
          >
            {isLastPart ? (
              <>{section === 'listening' ? 'Sang Reading' : 'Nộp bài'} {section === 'listening' ? <ChevronRight size={20} strokeWidth={3} /> : <Flag size={18} strokeWidth={3} />}</>
            ) : (
              <>Tiếp tục <ChevronRight size={20} strokeWidth={3} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

ExamScreen.displayName = 'ExamScreen';
export default ExamScreen;
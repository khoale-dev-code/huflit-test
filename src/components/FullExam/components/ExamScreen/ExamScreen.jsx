import React, { memo, useMemo, Suspense, lazy } from 'react';
import { ChevronLeft, ChevronRight, Flag, AlertCircle } from 'lucide-react';
import { QuestionCard } from './QuestionCard';

const ContentDisplay = lazy(() => import('../../../Display/ContentDisplay'));

export const ExamScreen = memo(({
  examData, 
  section, 
  part, 
  answers, 
  onSelectAnswer, 
  onNavigatePart, 
  onNextSection, 
  onSubmit, 
  onAudioEnd, 
  playedParts
}) => {

  // 1. FILTER DATA SAFELY
  const partData = useMemo(() => {
    if (!examData?.parts) return null;
    const partsArray = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);
    return partsArray.find(p => p.id === part) || null;
  }, [examData, part]);

  const siblingParts = useMemo(() => {
    if (!examData?.parts) return [];
    const partsArray = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);
    return partsArray.filter(p => p.type === section);
  }, [examData, section]);

  const currentIdx = siblingParts.findIndex(p => p.id === part);

  // 2. CALCULATE GLOBAL QUESTION NUMBER
  const startQNum = useMemo(() => {
    let count = 1;
    if (!examData?.parts) return 1;
    const partsArray = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);
    
    for (let p of partsArray) {
      if (p.id === part) break;
      if (p.type === section) count += (p.questions?.length || 0);
    }
    return count;
  }, [examData, part, section]);

  // 3. CHECK UNANSWERED QUESTIONS
  const unansweredCount = useMemo(() => {
    if (!partData?.questions) return 0;
    return partData.questions.filter((_, i) => {
      const qKey = `${section}-${part}-q${i + 1}`;
      return answers[qKey] === undefined || answers[qKey] === null;
    }).length;
  }, [partData, answers, section, part]);

  if (!partData) return <div className="p-16 text-center text-gray-500 font-semibold">Đang chuẩn bị phần thi...</div>;

  // 4. NAVIGATION HANDLERS
  const handlePrev = () => {
    if (currentIdx > 0 && siblingParts[currentIdx - 1]) {
      onNavigatePart(siblingParts[currentIdx - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIdx >= 0 && currentIdx < siblingParts.length - 1) {
      const nextPart = siblingParts[currentIdx + 1];
      if (nextPart) {
        onNavigatePart(nextPart.id);
      }
    } else {
      if (section === 'listening') {
        onNextSection();
      } else {
        onSubmit();
      }
    }
  };

  const isLastPart = currentIdx >= siblingParts.length - 1;

  return (
    <div className="min-h-screen bg-white font-sans pb-28 md:pb-20" style={{ fontFamily: '-apple-system, "Segoe UI", "Roboto", sans-serif' }}>
      
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        
        {/* ── WARNING: UNANSWERED QUESTIONS ── */}
        {unansweredCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2.5">
            <AlertCircle className="text-amber-600 shrink-0" size={20} strokeWidth={2} />
            <p className="text-sm font-semibold text-amber-900">
              Còn <span className="font-bold text-amber-700">{unansweredCount}</span> câu chưa chọn đáp án
            </p>
          </div>
        )}

        {/* ── MEDIA CONTENT (TEXT / AUDIO) ── */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          <Suspense fallback={<div className="h-40 bg-gray-200 animate-pulse" />}>
            <ContentDisplay 
              partData={partData} 
              selectedPart={part} 
              testType={section} 
              onAudioEnd={onAudioEnd} 
              isPartPlayed={playedParts?.includes(part)}
            />
          </Suspense>
        </div>

        {/* ── QUESTIONS LIST ── */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 space-y-3">
          <div className="inline-block px-3 py-1.5 bg-gray-100 rounded-lg">
            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Câu {startQNum} – {startQNum + (partData.questions?.length || 1) - 1}
            </h3>
          </div>
          
          <div className="space-y-3">
            {partData.questions?.map((q, idx) => {
              const qKey = `${section}-${part}-q${idx + 1}`;
              return (
                <QuestionCard
                  key={qKey}
                  question={q}
                  questionNum={startQNum + idx}
                  selectedAnswer={answers[qKey]}
                  onAnswerSelect={(val) => onSelectAnswer(qKey, val)} 
                  questionKey={qKey}
                />
              );
            })}
          </div>
        </div>

      </div>

      {/* ── FIXED NAVIGATION BAR (BOTTOM) ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          
          {/* Back Button */}
          <button 
            disabled={currentIdx <= 0}
            onClick={handlePrev}
            className={`
              flex items-center justify-center gap-1.5 px-3 md:px-4 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all outline-none
              ${currentIdx <= 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95'
              }
            `}
            title={currentIdx <= 0 ? 'Đã ở phần đầu tiên' : 'Quay lại phần trước'}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline">Quay lại</span>
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Next / Submit Button */}
          <button 
            onClick={handleNext}
            className={`
              flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 rounded-lg font-bold text-sm md:text-base uppercase tracking-wide text-white transition-all outline-none active:scale-95
              ${isLastPart
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
              }
            `}
          >
            {isLastPart ? (
              <>
                {section === 'listening' ? 'Sang Reading' : 'Nộp bài'}
                {section === 'listening' ? <ChevronRight size={18} strokeWidth={2.5} /> : <Flag size={16} strokeWidth={2} />}
              </>
            ) : (
              <>
                Tiếp tục
                <ChevronRight size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
});

ExamScreen.displayName = 'ExamScreen';
export default ExamScreen;
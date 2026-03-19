// FullExamMode.jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArrowLeft, Loader2, AlertTriangle, BookOpen, Headphones, CheckCircle } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Hooks & Context
import { useUserProgress } from '../../hooks/useUserProgress';
import { useExamState } from './hooks/useExamState';
import { useExamTimer } from './hooks/useExamTimer';      
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { AnswersContext } from './context/AnswersContext';

// Utils & Constants
import { generateAnswerKey } from './utils/answerKey';
import { loadExamData } from '../../data/examData';
import { EXAM_MODES, EXAM_SECTIONS } from './constants/examConfig';
import { EXAM_TIMINGS } from './constants/timings';

// Components
import { ExamSetup } from './components/ExamSetup/ExamSetup';
import { ExamScreen } from './components/ExamScreen/ExamScreen';
import { ResultsScreen } from './components/Results/ResultsScreen';
import { Timer } from './components/Header/Timer';
import { TimeWarning } from './components/Warnings/TimeWarning'; 
import { OfflineWarning } from './components/Warnings/OfflineWarning';
import { SubmitModal } from './components/Modals/SubmitModal';

const EXAM_DRAFT_KEY = 'exam-progress-draft';

const FullExamMode = ({ onComplete }) => {
  const { saveProgress, currentUser } = useUserProgress();
  const { isOnline } = useNetworkStatus();

  const {
    state, setMode, setSection, setPart, setAnswers, addAnswer,
    setTimeLeft, tickTimer, pauseTimer, resumeTimer, setExamData,
    setExamId, markPartPlayed, reset: resetExam,
  } = useExamState();

  const [showWarning, setShowWarning] = useState(false);  
  const [showSubmitModal, setShowSubmitModal] = useState(false);  
  const [saveError, setSaveError] = useState(null);   
  const [submitRetrying, setSubmitRetrying] = useState(false);  
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // ─── Refs ───
  const playedPartsRef = useRef(new Set());
  const sectionRef = useRef(state.section);

  useEffect(() => { playedPartsRef.current = state.playedListeningParts || new Set(); }, [state.playedListeningParts]);
  useEffect(() => { sectionRef.current = state.section; }, [state.section]);

  // 1. NGĂN REFRESH (CLEANER)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (state.mode === EXAM_MODES.EXAM && Object.keys(state.answers).length > 0) {
        e.preventDefault();
        e.returnValue = ''; 
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.mode, state.answers]);

  // 2. LOAD & AUTO-SAVE DRAFT (GOM NHÓM LOGIC)
  useEffect(() => {
    if (!state.examId) return;
    const raw = localStorage.getItem(EXAM_DRAFT_KEY);
    if (raw) {
      try {
        const draft = JSON.parse(raw);
        if (draft.examId === state.examId && draft.answers) setAnswers(draft.answers);
      } catch { /* Silent fail */ }
    }
  }, [state.examId, setAnswers]);

  useEffect(() => {
    if (state.examId && state.mode === EXAM_MODES.EXAM) {
      localStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify({ 
        examId: state.examId, answers: state.answers, timestamp: Date.now() 
      }));
    }
  }, [state.answers, state.examId, state.mode]);

  // 3. KHỞI TẠO DỮ LIỆU ĐỀ THI
  useEffect(() => {
    if (state.mode === EXAM_MODES.SETUP || !state.examId || state.examData) return;
    
    loadExamData(state.examId)
      .then((data) => {
        if (!data?.parts) throw new Error('Dữ liệu đề thi không hợp lệ.');
        const partsArr = Array.isArray(data.parts) ? data.parts : Object.entries(data.parts).map(([k, v]) => ({ ...v, id: k }));
        setExamData({ ...data, parts: partsArr });
        
        const startPart = partsArr.find(p => p.type === EXAM_SECTIONS.LISTENING) || partsArr[0];
        if (startPart) {
          setSection(startPart.type);
          setPart(startPart.id);
          setTimeLeft(startPart.type === EXAM_SECTIONS.LISTENING ? EXAM_TIMINGS.LISTENING : EXAM_TIMINGS.READING);
        }
      })
      .catch((err) => setSaveError(err.message));
  }, [state.examId, state.mode, state.examData, setExamData, setSection, setPart, setTimeLeft]); 

  const currentSectionParts = useMemo(() => 
    state.examData?.parts?.filter(p => p.type === state.section) || [], 
  [state.examData, state.section]);

  // ─── Handlers ───
  const handleStartExam = useCallback((examId) => {
    setExamId(examId); 
    setMode(EXAM_MODES.EXAM); 
    setTimeLeft(EXAM_TIMINGS.LISTENING); 
    setShowWarning(false);
  }, [setExamId, setMode, setTimeLeft]);

  const handleNavigatePart = useCallback((newPartId) => {
    if (sectionRef.current === EXAM_SECTIONS.LISTENING && playedPartsRef.current.has(newPartId)) {
      return; // Không alert ở đây để tránh gián đoạn flow nghe
    }
    setPart(newPartId);
  }, [setPart]);

  const handleNextSection = useCallback(() => {
    const readingParts = state.examData?.parts?.filter(p => p.type === EXAM_SECTIONS.READING) || [];
    if (readingParts.length > 0) {
      setTimeLeft(EXAM_TIMINGS.READING); 
      setSection(EXAM_SECTIONS.READING); 
      setPart(readingParts[0].id); 
      setShowWarning(false);                
    } else {
      setMode(EXAM_MODES.RESULTS); 
    }
  }, [state.examData, setTimeLeft, setSection, setPart, setMode]);

  const handleAudioEnd = useCallback(() => {
    if (state.section !== EXAM_SECTIONS.LISTENING) return;
    setIsAudioPlaying(false); 
    markPartPlayed(state.part); 
    
    const idx = currentSectionParts.findIndex(p => p.id === state.part);
    if (idx !== -1 && idx < currentSectionParts.length - 1) {
      setPart(currentSectionParts[idx + 1].id); 
    } else {
      handleNextSection();      
    }
  }, [state.section, state.part, currentSectionParts, markPartPlayed, setPart, handleNextSection]);

  const handleFinalSubmit = useCallback(async () => {
    if (submitRetrying || !state.examData) return;
    setSubmitRetrying(true);
    try {
      let totalCorrect = 0, totalQuestions = 0;
      state.examData.parts.forEach(p => {
        p.questions?.forEach((q, idx) => {
          totalQuestions++;
          const qKey = generateAnswerKey({ section: p.type, part: p.id, question: idx + 1 });
          if (String(state.answers[qKey]) === String(q.correct)) totalCorrect++;
        });
      });
      
      const score = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
      if (isOnline && currentUser) {
        await saveProgress({
          exam: state.examId, part: 'full-exam', score: parseFloat(score.toFixed(2)),
          answers: state.answers, totalQuestions, correctAnswers: totalCorrect,
          testType: 'full-exam', timestamp: Date.now(),
        });
      }
      localStorage.removeItem(EXAM_DRAFT_KEY); 
      setMode(EXAM_MODES.RESULTS); 
      setShowSubmitModal(false);
    } catch (err) { 
      setSaveError(err.message); 
    } finally { 
      setSubmitRetrying(false); 
    }
  }, [state.examData, state.answers, state.examId, isOnline, currentUser, setMode, saveProgress, submitRetrying]);

  // 4. TIMERS & SHORTCUTS
  useExamTimer({
    isActive: state.mode === EXAM_MODES.EXAM && !state.isPaused && !!state.examData,
    section: state.section, timeLeft: state.timeLeft, onTick: tickTimer,        
    onComplete: () => { sectionRef.current === EXAM_SECTIONS.LISTENING ? handleNextSection() : handleFinalSubmit(); },
    onWarning: () => setShowWarning(true),
  });

  useKeyboardShortcuts({
    isActive: state.mode === EXAM_MODES.EXAM, isAudioPlaying,
    onNavigatePrev: () => {
      const idx = currentSectionParts.findIndex(p => p.id === state.part);
      if (idx > 0) setPart(currentSectionParts[idx - 1].id);
    },
    onNavigateNext: () => {
      const idx = currentSectionParts.findIndex(p => p.id === state.part);
      if (idx < currentSectionParts.length - 1) setPart(currentSectionParts[idx + 1].id);
    },
    onTogglePause: () => state.isPaused ? resumeTimer() : pauseTimer(),
    onSubmit: () => {
      if (state.section === EXAM_SECTIONS.READING) setShowSubmitModal(true);
    },
  });

  const unansweredCount = useMemo(() => {
    let count = 0;
    state.examData?.parts?.forEach(p => {
      p.questions?.forEach((_, idx) => {
        const key = generateAnswerKey({ section: p.type, part: p.id, question: idx + 1 });
        if (state.answers[key] === undefined) count++;
      });
    });
    return count;
  }, [state.examData, state.answers]);

  // ─── Render Helpers ───
  const isLastListeningPart = state.section === EXAM_SECTIONS.LISTENING && state.part === currentSectionParts[currentSectionParts.length - 1]?.id;
  const isLastReadingPart = state.section === EXAM_SECTIONS.READING && state.part === currentSectionParts[currentSectionParts.length - 1]?.id;
  const answersContextValue = useMemo(() => ({ answers: state.answers, addAnswer }), [state.answers, addAnswer]);

  if (state.mode === EXAM_MODES.SETUP) return <ExamSetup onStartExam={handleStartExam} />;
  
  if (state.mode === EXAM_MODES.RESULTS) return (
    <ResultsScreen 
      examData={state.examData} 
      answers={state.answers} 
      onRetry={() => { resetExam(); setShowWarning(false); }} 
      onExit={() => { resetExam(); localStorage.removeItem(EXAM_DRAFT_KEY); onComplete?.(); }} 
    />
  );

  const currentPartData = state.examData?.parts?.find(p => p.id === state.part);
  const isListening = state.section === 'listening';

  return (
    <AnswersContext.Provider value={answersContextValue}>
      <div className="min-h-screen bg-[#F4F7FA] font-nunito selection:bg-[#1CB0F6] selection:text-white">
        
        {/* Banner Warnings */}
        <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none px-4 pt-4">
          <TimeWarning visible={showWarning} section={state.section} isLastListeningPart={isLastListeningPart} timeLeft={state.timeLeft} />
          <OfflineWarning isOnline={isOnline} />
        </div>

        {/* GAMIFIED HEADER */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b-2 border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            
            <div className="flex items-center gap-4 min-w-0">
              {/* Section Icon 3D */}
              <div className={`hidden sm:flex w-12 h-12 rounded-2xl items-center justify-center border-2 border-b-[5px] shadow-sm shrink-0 transition-all ${
                isListening ? 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]' : 'bg-[#F0FAE8] text-[#58CC02] border-[#bcf096]'
              }`}>
                {isListening ? <Headphones size={24} strokeWidth={2.5} /> : <BookOpen size={24} strokeWidth={2.5} />}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border ${
                    isListening ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-green-50 text-green-600 border-green-100'
                  }`}>
                    {state.section}
                  </span>
                  {unansweredCount > 0 && (
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 border border-slate-200">
                      Còn {unansweredCount} câu
                    </span>
                  )}
                </div>
                <h2 className="text-[16px] sm:text-[18px] font-black text-slate-800 truncate leading-tight">
                  {currentPartData?.title || 'Đang chuẩn bị...'}
                </h2>
              </div>
            </div>

            {/* Timer & Controls */}
            <div className="flex items-center gap-3">
              <Timer timeLeft={state.timeLeft} isWarning={showWarning} />
              <button 
                onClick={() => setShowSubmitModal(true)}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#58CC02] text-white rounded-2xl font-black uppercase text-[13px] tracking-wider border-b-4 border-[#46A302] active:border-b-0 active:translate-y-1 transition-all"
              >
                <CheckCircle size={18} strokeWidth={3} />
                Nộp bài
              </button>
            </div>
          </div>
        </header>

        {/* MAIN EXAM AREA */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {state.examData && state.part && (
            <Motion.div
              key={`${state.section}-${state.part}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExamScreen
                examData={state.examData}
                section={state.section}
                part={state.part}
                answers={state.answers}
                onSelectAnswer={handleSelectAnswer}
                onNavigatePart={handleNavigatePart}
                onNextSection={handleNextSection}
                onSubmit={() => setShowSubmitModal(true)}
                onAudioStart={() => setIsAudioPlaying(true)}
                onAudioEnd={handleAudioEnd}
                isLastListeningPart={isLastListeningPart}
                isLastReadingPart={isLastReadingPart}
                playedParts={Array.from(state.playedListeningParts)}
                isAudioPlaying={isAudioPlaying}
              />
            </Motion.div>
          )}
        </main>

        <SubmitModal
          visible={showSubmitModal}
          unansweredCount={unansweredCount}
          saveError={saveError}
          isOnline={isOnline}
          isSubmitting={submitRetrying}
          examData={state.examData}
          answers={state.answers}
          section={state.section}
          onConfirm={handleFinalSubmit}
          onCancel={() => setShowSubmitModal(false)}
        />
      </div>
    </AnswersContext.Provider>
  );
};

FullExamMode.displayName = 'FullExamMode';
export default FullExamMode;
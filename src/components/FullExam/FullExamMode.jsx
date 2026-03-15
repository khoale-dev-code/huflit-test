import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// Hooks & Utils
import { useUserProgress }      from '../../hooks/useUserProgress';
import { useExamState }         from './hooks/useExamState';
import { useExamTimer }         from './hooks/useExamTimer';      
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useNetworkStatus }     from './hooks/useNetworkStatus';
import { generateAnswerKey }    from './utils/answerKey';
import { loadExamData }         from '../../data/examData';

// Constants
import { EXAM_MODES, EXAM_SECTIONS } from './constants/examConfig';
import { EXAM_TIMINGS }         from './constants/timings';
import { AnswersContext }       from './context/AnswersContext';

// Components
import { ExamSetup }            from './components/ExamSetup/ExamSetup';
import { ExamScreen }           from './components/ExamScreen/ExamScreen';
import { ResultsScreen }        from './components/Results/ResultsScreen';
import { Timer }                from './components/Header/Timer';
import { AutosaveIndicator }    from './components/Header/AutosaveIndicator';
import { TimeWarning }          from './components/Warnings/TimeWarning'; 
import { OfflineWarning }       from './components/Warnings/OfflineWarning';
import { SubmitModal }          from './components/Modals/SubmitModal';

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
  const [isSaving, setIsSaving] = useState(false);  
  const [lastSaved, setLastSaved] = useState(null);   
  const [saveError, setSaveError] = useState(null);   
  const [submitRetrying, setSubmitRetrying] = useState(false);  

  const isAudioPlayingRef = useRef(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const mainContentRef = useRef(null);

  const setAudioPlaying = useCallback((val) => {
    isAudioPlayingRef.current = val;
    setIsAudioPlaying(val);
  }, []);

  const playedPartsRef = useRef(new Set());
  useEffect(() => { 
    playedPartsRef.current = state.playedListeningParts || new Set(); 
  }, [state.playedListeningParts]);

  const sectionRef = useRef(state.section);
  useEffect(() => { sectionRef.current = state.section; }, [state.section]);

  // 1. LƯU NHÁP
  useEffect(() => {
    const handler = (e) => {
      if (state.mode === EXAM_MODES.EXAM && Object.keys(state.answers).length > 0) {
        e.preventDefault(); e.returnValue = ''; 
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [state.mode, state.answers]);

  useEffect(() => {
    if (!state.examId) return;
    try {
      const raw = localStorage.getItem(EXAM_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft.examId === state.examId && draft.answers) setAnswers(draft.answers);
      }
    } catch (_) { }
  }, [state.examId, setAnswers]);

  useEffect(() => {
    if (!state.examId || state.mode !== EXAM_MODES.EXAM) return;
    try {
      localStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify({ 
        examId: state.examId, answers: state.answers, timestamp: Date.now() 
      }));
    } catch (_) {}
  }, [state.answers, state.examId, state.mode]);

  // 2. KHỞI TẠO BÀI THI
  useEffect(() => {
    if (state.mode === EXAM_MODES.SETUP || !state.examId || state.examData) return;
    loadExamData(state.examId)
      .then((data) => {
        if (!data?.parts) throw new Error('Dữ liệu đề thi bị lỗi hoặc trống.');
        const partsArr = Array.isArray(data.parts) ? data.parts : Object.entries(data.parts).map(([k, v]) => ({ ...v, id: k }));
        setExamData({ ...data, parts: partsArr });
        const startPart = partsArr.find(p => p.type === EXAM_SECTIONS.LISTENING) || partsArr.find(p => p.type === EXAM_SECTIONS.READING) || partsArr[0];
        
        if (startPart) {
          setSection(startPart.type);
          setPart(startPart.id);
          setTimeLeft(startPart.type === EXAM_SECTIONS.LISTENING ? EXAM_TIMINGS.LISTENING : EXAM_TIMINGS.READING);
        }
      })
      .catch((err) => setSaveError('Không thể tải đề thi: ' + err.message));
  }, [state.examId, state.mode, setExamData, setSection, setPart, setTimeLeft]); 

  useEffect(() => {
    if (state.mode === EXAM_MODES.EXAM) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      mainContentRef.current?.focus({ preventScroll: true });
    }
  }, [state.part, state.section, state.mode]);

  // 3. ĐIỀU HƯỚNG
  const currentSectionParts = useMemo(() => state.examData?.parts?.filter(p => p.type === state.section) || [], [state.examData, state.section]);

  const handleStartExam = useCallback((examId) => {
    setExamId(examId); setMode(EXAM_MODES.EXAM); setTimeLeft(EXAM_TIMINGS.LISTENING); setShowWarning(false);
  }, [setExamId, setMode, setTimeLeft]);

  const handleSelectAnswer = useCallback((qKey, optionIndex) => addAnswer(qKey, optionIndex), [addAnswer]);

  const handleNavigatePart = useCallback((newPartId) => {
    if (sectionRef.current === EXAM_SECTIONS.LISTENING && playedPartsRef.current.has(newPartId)) {
      alert('❌ Không thể quay lại phần nghe đã hoàn thành.'); return;
    }
    setPart(newPartId);
  }, [setPart]);

  const handleNextSection = useCallback(() => {
    const readingParts = state.examData?.parts?.filter(p => p.type === EXAM_SECTIONS.READING) || [];
    if (readingParts.length > 0) {
      setTimeLeft(EXAM_TIMINGS.READING); setSection(EXAM_SECTIONS.READING); setPart(readingParts[0].id); setShowWarning(false);                
    } else setMode(EXAM_MODES.RESULTS); 
  }, [state.examData, setTimeLeft, setSection, setPart, setMode]);

  const handleAudioEnd = useCallback(() => {
    if (state.section !== EXAM_SECTIONS.LISTENING) return;
    setAudioPlaying(false); markPartPlayed(state.part); 
    setTimeout(() => {
      const idx = currentSectionParts.findIndex(p => p.id === state.part);
      if (idx !== -1 && idx < currentSectionParts.length - 1) setPart(currentSectionParts[idx + 1].id); 
      else handleNextSection();      
    }, 0);
  }, [state.section, state.part, currentSectionParts, setAudioPlaying, markPartPlayed, setPart, handleNextSection]);

  // 4. CHẤM ĐIỂM
  const handleFinalSubmit = useCallback(async () => {
    if (submitRetrying || !state.examData) return;
    setSubmitRetrying(true); setSaveError(null);
    try {
      let totalCorrect = 0, totalQuestions = 0;
      const partsArr = Array.isArray(state.examData.parts) ? state.examData.parts : Object.values(state.examData.parts);
      partsArr.forEach(p => {
        if (!p.questions) return;
        p.questions.forEach((q, idx) => {
          totalQuestions++;
          const qKey = generateAnswerKey({ section: p.type, part: p.id, question: idx + 1 });
          if (state.answers[qKey] !== undefined && String(state.answers[qKey]) === String(q.correct)) totalCorrect++;
        });
      });
      const averageScore = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
      if (isOnline && currentUser) {
        await saveProgress({
          exam: state.examId, part: 'full-exam', score: parseFloat(averageScore.toFixed(2)),
          answers: state.answers, totalQuestions, correctAnswers: totalCorrect,
          isDraft: false, testType: 'full-exam', timestamp: Date.now(),
        });
      }
      localStorage.removeItem(EXAM_DRAFT_KEY); setMode(EXAM_MODES.RESULTS); setShowSubmitModal(false);
    } catch (err) { setSaveError('Không thể nộp bài: ' + err.message); } 
    finally { setSubmitRetrying(false); }
  }, [state.examData, state.answers, state.examId, isOnline, currentUser, setMode, saveProgress, submitRetrying]);

  // 5. TIMERS
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
      const isLastReading = state.section === EXAM_SECTIONS.READING && state.part === currentSectionParts[currentSectionParts.length - 1]?.id;
      if (isLastReading) setShowSubmitModal(true);
    },
  });

  const unansweredCount = useMemo(() => {
    let count = 0;
    currentSectionParts.forEach(p => {
      p.questions?.forEach((_, idx) => {
        const key = generateAnswerKey({ section: p.type, part: p.id, question: idx + 1 });
        if (state.answers[key] === undefined || state.answers[key] === null) count++;
      });
    });
    return count;
  }, [currentSectionParts, state.answers]);

  const isLastListeningPart = state.section === EXAM_SECTIONS.LISTENING && state.part === currentSectionParts[currentSectionParts.length - 1]?.id;
  const isLastReadingPart = state.section === EXAM_SECTIONS.READING && state.part === currentSectionParts[currentSectionParts.length - 1]?.id;

  const answersContextValue = useMemo(() => ({ answers: state.answers, addAnswer }), [state.answers, addAnswer]);

  if (state.mode === EXAM_MODES.SETUP) return <ExamSetup onStartExam={handleStartExam} />;
  if (state.mode === EXAM_MODES.RESULTS) return <ResultsScreen examData={state.examData} answers={state.answers} onRetry={() => { resetExam(); setShowWarning(false); }} onExit={() => { resetExam(); localStorage.removeItem(EXAM_DRAFT_KEY); onComplete?.(); }} />;

  const currentPartData = state.examData?.parts?.find(p => p.id === state.part);

  // Setup Theme Styles based on Section
  const isListening = state.section === 'listening';
  const badgeTheme = isListening 
    ? 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]' 
    : 'bg-[#f1faeb] text-[#58CC02] border-[#bcf096]';

  return (
    <AnswersContext.Provider value={answersContextValue}>
      <div className="min-h-screen bg-[#F4F7FA] font-sans selection:bg-blue-200 relative pb-10" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
        
        {/* ── CÁC THÔNG BÁO GLOBAL (Nổi lên trên cùng) ── */}
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <TimeWarning visible={showWarning} section={state.section} isLastListeningPart={isLastListeningPart} timeLeft={state.timeLeft} />
          <OfflineWarning isOnline={isOnline} />
        </div>

        {/* ── HEADER BÀI THI (Gamified & Glassmorphism) ── */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b-2 border-slate-200 shadow-sm transition-all">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
            
            {/* Tên phần thi */}
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <div className={`hidden md:flex w-12 h-12 rounded-[14px] items-center justify-center font-black text-[22px] border-2 border-b-[4px] shadow-sm shrink-0 ${badgeTheme}`}>
                {isListening ? '🎧' : '📖'}
              </div>
              <div className="min-w-0 pt-0.5">
                <span className="text-[10px] md:text-[11px] font-display font-black uppercase tracking-widest text-slate-400 block mb-0.5">
                  {isListening ? 'Listening' : 'Reading'} Section
                </span>
                <h2 className="text-[16px] md:text-[20px] font-display font-black text-slate-800 leading-tight m-0 truncate">
                  {currentPartData?.title || 'Đang tải dữ liệu...'}
                </h2>
              </div>
            </div>

            {/* Đồng hồ và Trạng thái lưu */}
            <div className="flex items-center gap-3 md:gap-5 shrink-0">
              <div className="hidden sm:block">
                <AutosaveIndicator isSaving={isSaving} lastSaved={lastSaved} isOnline={isOnline} saveError={saveError} />
              </div>
              <Timer timeLeft={state.timeLeft} isWarning={showWarning} />
            </div>
            
          </div>
        </header>

        {/* Spacer nhẹ nhàng để bù lại chiều cao của Header nếu cần */}
        <div className="h-4 md:h-6 pointer-events-none" />

        {/* ── NỘI DUNG CHÍNH (Đã xóa StepIndicator) ── */}
        <main id="main-content" ref={mainContentRef} tabIndex={-1} className="outline-none max-w-5xl mx-auto" aria-label={`${state.section} – Part`}>
          {state.examData && state.part && (
            <ExamScreen
              examData={state.examData}
              section={state.section}
              part={state.part}
              answers={state.answers}
              onSelectAnswer={handleSelectAnswer}
              onNavigatePart={handleNavigatePart}
              onNextSection={handleNextSection}
              onSubmit={() => setShowSubmitModal(true)}
              onAudioStart={() => setAudioPlaying(true)}
              onAudioEnd={handleAudioEnd}
              isLastListeningPart={isLastListeningPart}
              isLastReadingPart={isLastReadingPart}
              playedParts={Array.from(state.playedListeningParts)}
              isAudioPlaying={isAudioPlaying}
            />
          )}
        </main>

        {/* ── MODAL NỘP BÀI ── */}
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
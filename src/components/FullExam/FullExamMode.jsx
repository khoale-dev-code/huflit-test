import React, {
  useState, useEffect, useCallback, useMemo, useRef,
} from 'react';
import { useUserProgress }   from '../../hooks/useUserProgress';
import { EXAM_STRUCTURE, EXAM_MODES, EXAM_SECTIONS } from './constants/examConfig';
import { EXAM_TIMINGS }      from './constants/timings';
import { calculateFullResults, countUnansweredQuestions } from './utils/examHelpers';
import { generateAnswerKey } from './utils/answerKey';
import { useExamState }      from './hooks/useExamState';
import { useExamTimer }      from './hooks/useExamTimer';       // đã fix stale closure
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useNetworkStatus }  from './hooks/useNetworkStatus';

import { AnswersContext }    from './context/AnswersContext';

import StepIndicator         from './StepIndicator';
import { ExamSetup }         from './components/ExamSetup/ExamSetup';
import { ExamScreen }        from './components/ExamScreen/ExamScreen';
import { ResultsScreen }     from './components/Results/ResultsScreen';
import { Timer }             from './components/Header/Timer';
import { AutosaveIndicator } from './components/Header/AutosaveIndicator';
import { TimeWarning }       from './components/Warnings/TimeWarning'; // đã redesign M3
import { OfflineWarning }    from './components/Warnings/OfflineWarning';
import { SubmitModal }       from './components/Modals/SubmitModal';

// ✅ ĐÃ SỬA: Đổi getExamById thành loadExamData cho đúng với file examData.js
import { loadExamData }      from '../../data/examData';

// ─── LocalStorage key cho draft ──────────────────────────────────────────────
const EXAM_DRAFT_KEY = 'exam-progress-draft';

// ─────────────────────────────────────────────────────────────────────────────
const FullExamMode = ({ onComplete }) => {

  // ── External hooks ──────────────────────────────────────────────────────────
  const { saveProgress, currentUser, loading: progressLoading } = useUserProgress();
  const { isOnline } = useNetworkStatus();

  // ── Exam state (reducer-based) ───────────────────────────────────────────────
  const {
    state,
    setMode,
    setSection,
    setPart,
    setAnswers,
    addAnswer,
    setTimeLeft,
    tickTimer,         // gọi mỗi giây để trừ 1 giây
    pauseTimer,
    resumeTimer,
    setExamData,
    setExamId,
    markPartPlayed,    // đánh dấu part listening đã phát xong (không cho quay lại)
    reset: resetExam,
  } = useExamState();

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [showWarning,     setShowWarning]     = useState(false);  // cảnh báo 5 phút
  const [showSubmitModal, setShowSubmitModal] = useState(false);  // modal nộp bài
  const [isSaving,         setIsSaving]        = useState(false);  // autosave spinner
  const [lastSaved,       setLastSaved]       = useState(null);   // timestamp lần save gần nhất
  const [saveError,       setSaveError]       = useState(null);   // lỗi khi save
  const [submitRetrying,  setSubmitRetrying]  = useState(false);  // đang nộp bài

  // ── Audio state ───────────────────────────────────────────────────────────────
  const isAudioPlayingRef = useRef(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const setAudioPlaying = useCallback((val) => {
    isAudioPlayingRef.current = val;
    setIsAudioPlaying(val);
  }, []);

  // ── playedParts ref ───────────────────────────────────────────────────────────
  const playedPartsRef = useRef(new Set());
  useEffect(() => {
    playedPartsRef.current = state.playedListeningParts || new Set();
  }, [state.playedListeningParts]);

  // ── Main content ref (focus management) ──────────────────────────────────────
  const mainContentRef = useRef(null);


  // ════════════════════════════════════════════════════════════════════════════
  // SIDE EFFECTS
  // ════════════════════════════════════════════════════════════════════════════

  // ── [Effect 1] beforeunload: cảnh báo rời trang khi đang thi ────────────────
  useEffect(() => {
    const handler = (e) => {
      if (state.mode === EXAM_MODES.EXAM && Object.keys(state.answers).length > 0) {
        e.preventDefault();
        e.returnValue = ''; 
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [state.mode, state.answers]);

  // ── [Effect 2] visibilitychange: lưu draft khi tab bị ẩn (mobile) ───────────
  useEffect(() => {
    const save = () => {
      if (document.visibilityState === 'hidden' && state.examId) {
        try {
          localStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify({
            examId:    state.examId,
            answers:   state.answers,
            timestamp: Date.now(),
          }));
        } catch (_) { }
      }
    };
    document.addEventListener('visibilitychange', save);
    return () => document.removeEventListener('visibilitychange', save);
  }, [state.examId, state.answers]);

  // ── [Effect 3] Khôi phục draft khi examId thay đổi ──────────────────────────
  useEffect(() => {
    if (!state.examId) return;
    try {
      const raw   = localStorage.getItem(EXAM_DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft.examId === state.examId && draft.answers) {
        setAnswers(draft.answers);
      }
    } catch (_) { }
  }, [state.examId, setAnswers]);

  // ── [Effect 4] Persist answers vào localStorage mỗi khi answers thay đổi ────
  useEffect(() => {
    if (!state.examId) return;
    try {
      localStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify({
        examId:    state.examId,
        answers:   state.answers,
        timestamp: Date.now(),
      }));
    } catch (_) {}
  }, [state.answers, state.examId]);

  // ── [Effect 5] Load exam data khi examId có và đang trong mode EXAM ──────────
  useEffect(() => {
    if (state.mode === EXAM_MODES.SETUP || !state.examId) return;

    // ✅ ĐÃ SỬA: Đổi getExamById thành loadExamData
    loadExamData(state.examId)
      .then((data) => {
        if (!data?.parts) throw new Error('Invalid exam data: missing parts');
        setExamData(data);
      })
      .catch((err) => {
        console.error('[FullExamMode] Load exam failed:', err);
        setSaveError(err.message);
      });
  }, [state.examId, state.mode, setExamData]);

  // ── [Effect 6] Focus main content khi chuyển part ────────────────────────────
  useEffect(() => {
    if (state.mode === EXAM_MODES.EXAM) {
      mainContentRef.current?.focus({ preventScroll: true });
    }
  }, [state.part, state.mode]);

  // ── [Effect 7] Scroll to top ────────────────────────────────────────────────
  useEffect(() => {
    if (state.mode !== EXAM_MODES.EXAM) return;
    const id = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
    return () => clearTimeout(id);
  }, [state.part, state.section, state.mode]);

  // ── [Effect 8] Autosave lên Firebase mỗi 30 giây ─────────────────────────────
  useEffect(() => {
    if (
      state.mode !== EXAM_MODES.EXAM ||
      !currentUser                   ||
      progressLoading                ||
      !state.examData
    ) return;

    const timer = setInterval(async () => {
      if (!isOnline) return; 

      try {
        setIsSaving(true);
        setSaveError(null);

        const results = calculateFullResults(state.examData, state.answers);

        await saveProgress({
          exam:      state.examId,
          part:      state.section === EXAM_SECTIONS.LISTENING ? 'listening' : 'reading',
          score:     parseFloat(results.averageScore),
          answers:   state.answers,
          timestamp: Date.now(),
        });

        setLastSaved(Date.now());
      } catch (err) {
        setSaveError(err.message);
      } finally {
        setIsSaving(false);
      }
    }, EXAM_TIMINGS.AUTOSAVE);

    return () => clearInterval(timer);
  }, [
    state.mode, state.section, state.answers,
    state.examId, state.examData,
    currentUser, isOnline, progressLoading, saveProgress,
  ]);


  // ════════════════════════════════════════════════════════════════════════════
  // TIMER CALLBACKS
  // ════════════════════════════════════════════════════════════════════════════

  const sectionRef = useRef(state.section);
  useEffect(() => { sectionRef.current = state.section; }, [state.section]);

  const handleTimerComplete = useCallback(() => {
    if (sectionRef.current === EXAM_SECTIONS.LISTENING) {
      setTimeLeft(EXAM_TIMINGS.READING);   
      setSection(EXAM_SECTIONS.READING);   
      setPart(5);
      setShowWarning(false);               
    } else {
      setMode(EXAM_MODES.RESULTS);         
    }
  }, [setSection, setPart, setTimeLeft, setMode]);

  const handleTimerWarning = useCallback(() => {
    setShowWarning(true);
  }, []);

  useExamTimer({
    isActive:   state.mode === EXAM_MODES.EXAM && !state.isPaused && !!state.examData,
    section:    state.section,
    timeLeft:   state.timeLeft,
    onTick:     tickTimer,         
    onComplete: handleTimerComplete,
    onWarning:  handleTimerWarning,
  });


  // ════════════════════════════════════════════════════════════════════════════
  // KEYBOARD SHORTCUTS
  // ════════════════════════════════════════════════════════════════════════════

  useKeyboardShortcuts({
    isActive:       state.mode === EXAM_MODES.EXAM,
    isAudioPlaying,

    onNavigatePrev: () => {
      const min = state.section === EXAM_SECTIONS.LISTENING ? 1 : 5;
      if (state.part > min) setPart(state.part - 1);
    },

    onNavigateNext: () => {
      const max = state.section === EXAM_SECTIONS.LISTENING ? 4 : 8;
      if (state.part < max) setPart(state.part + 1);
    },

    onTogglePause: () => {
      state.isPaused ? resumeTimer() : pauseTimer();
    },

    onSelectAnswer: (idx) => {
      const key = generateAnswerKey({
        section:  state.section,
        part:     state.part,
        question: 1,
      });
      addAnswer(key, idx);
    },

    onSubmit: () => {
      if (state.section === EXAM_SECTIONS.READING && state.part === 8) {
        setShowSubmitModal(true);
      }
    },

    onExit: () => {
      if (window.confirm('Bạn chắc chắn muốn thoát? Tiến độ đã được lưu.')) {
        resetExam();
        onComplete?.();
      }
    },
  });


  // ════════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ════════════════════════════════════════════════════════════════════════════

  const handleStartExam = useCallback((examId) => {
    setExamId(examId);
    setMode(EXAM_MODES.EXAM);
    setTimeLeft(EXAM_TIMINGS.LISTENING);  
    setShowWarning(false);
  }, [setExamId, setMode, setTimeLeft]);

  const handleSelectAnswer = useCallback((questionNum, optionIndex) => {
    const key = generateAnswerKey({
      section:  state.section,
      part:     state.part,
      question: questionNum,
    });
    addAnswer(key, optionIndex);
  }, [state.section, state.part, addAnswer]);

  const handleNavigatePart = useCallback((newPart) => {
    const isListening = sectionRef.current === EXAM_SECTIONS.LISTENING;
    if (
      isListening &&
      newPart < state.part &&
      playedPartsRef.current.has(newPart)
    ) {
      alert('❌ Không thể quay lại phần nghe đã hoàn thành.');
      return;
    }
    setPart(newPart);
  }, [state.part, setPart]);

  const handleNextSection = useCallback(() => {
    setTimeLeft(EXAM_TIMINGS.READING);    
    setSection(EXAM_SECTIONS.READING);    
    setPart(5);
    setShowWarning(false);                
  }, [setSection, setPart, setTimeLeft]);

  const handleAudioEnd = useCallback(() => {
    if (state.section !== EXAM_SECTIONS.LISTENING) return;

    const currentPart = state.part;

    setAudioPlaying(false);
    markPartPlayed(currentPart); 

    setTimeout(() => {
      if (currentPart < 4) {
        setPart(currentPart + 1); 
      } else {
        handleNextSection();      
      }
    }, 0);
  }, [state.section, state.part, setAudioPlaying, markPartPlayed, setPart, handleNextSection]);

  const handleFinalSubmit = useCallback(async () => {
    setSubmitRetrying(true);
    setSaveError(null);

    try {
      if (!state.examData) throw new Error('No exam data loaded');

      const results = calculateFullResults(state.examData, state.answers);

      if (isOnline && currentUser) {
        await saveProgress({
          exam:            state.examId,
          part:            'full-exam',
          score:           parseFloat(results.averageScore),
          answers:         state.answers,
          totalQuestions:  state.examData?.totalQuestions || 0,
          correctAnswers:  results.totalCorrect || 0,
          isDraft:         false,
          testType:        'full-exam',

          listeningAnswers: Object.fromEntries(
            Object.entries(state.answers)
              .filter(([k]) => k.startsWith(EXAM_SECTIONS.LISTENING))
          ),
          readingAnswers: Object.fromEntries(
            Object.entries(state.answers)
              .filter(([k]) => k.startsWith(EXAM_SECTIONS.READING))
          ),

          timestamp: Date.now(),
        });
      }

      localStorage.removeItem(EXAM_DRAFT_KEY);

      setMode(EXAM_MODES.RESULTS);
      setShowSubmitModal(false);

    } catch (err) {
      console.error('[FullExamMode] Submit failed:', err);
      setSaveError(err.message || 'Không thể nộp bài. Vui lòng thử lại.');
    } finally {
      setSubmitRetrying(false);
    }
  }, [
    state.examData, state.answers, state.examId,
    isOnline, currentUser, setMode, saveProgress,
  ]);


  // ════════════════════════════════════════════════════════════════════════════
  // COMPUTED VALUES (useMemo)
  // ════════════════════════════════════════════════════════════════════════════

  const unansweredCount = useMemo(() => {
    if (!state.examData) return 0;
    return countUnansweredQuestions(state.examData, state.answers, state.section);
  }, [state.examData, state.answers, state.section]);

  const isLastListeningPart = useMemo(
    () => state.section === EXAM_SECTIONS.LISTENING && state.part === 4,
    [state.section, state.part]
  );

  const isLastReadingPart = useMemo(
    () => state.section === EXAM_SECTIONS.READING && state.part === 8,
    [state.section, state.part]
  );

  const answersContextValue = useMemo(
    () => ({ answers: state.answers, addAnswer }),
    [state.answers, addAnswer]
  );


  // ════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════════

  if (state.mode === EXAM_MODES.SETUP) {
    return <ExamSetup onStartExam={handleStartExam} />;
  }

  if (state.mode === EXAM_MODES.RESULTS) {
    return (
      <ResultsScreen
        examData={state.examData}
        answers={state.answers}
        onRetry={() => {
          resetExam();
          setShowWarning(false);
        }}
        onExit={() => {
          resetExam();
          localStorage.removeItem(EXAM_DRAFT_KEY);
          onComplete?.();
        }}
      />
    );
  }

  return (
    <AnswersContext.Provider value={answersContextValue}>
      <div className="min-h-screen bg-white">

        <header
          className="sticky top-0 z-30 bg-white"
          style={{
            borderBottom: '1px solid #cbd5e1',
            boxShadow:    '0 1px 2px 0 rgba(0,0,0,0.05)',
          }}
        >
          <div style={{
            maxWidth:        '1200px',
            margin:          '0 auto',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'space-between',
            padding:         'clamp(8px,2vw,16px) clamp(12px,4vw,32px)',
            gap:             '12px',
            flexWrap:        'wrap',
          }}>
            <div>
              <h2 style={{
                fontSize:   'clamp(14px,2.5vw,17px)',
                fontWeight: 700,
                color:      '#1A2330',
                margin:     0,
              }}>
                {state.section.toUpperCase()} – Part {state.part}
              </h2>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Đề: {state.examId}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,3vw,32px)' }}>
              <Timer
                timeLeft={state.timeLeft}
                isWarning={showWarning}
              />
              <AutosaveIndicator
                isSaving={isSaving}
                lastSaved={lastSaved}
                isOnline={isOnline}
                saveError={saveError}
              />
            </div>
          </div>
        </header>

        <div
          className="bg-slate-50"
          style={{
            borderBottom: '1px solid #e2e8f0',
            padding:      'clamp(10px,2vw,24px) clamp(12px,4vw,32px)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <StepIndicator
              currentMode={EXAM_MODES.EXAM}
              listeningComplete={state.section === EXAM_SECTIONS.READING}
            />
          </div>
        </div>

        <TimeWarning
          visible={showWarning}
          section={state.section}
          isLastListeningPart={isLastListeningPart}
          timeLeft={state.timeLeft}
        />

        <OfflineWarning isOnline={isOnline} />

        <main
          id="main-content"
          ref={mainContentRef}
          tabIndex={-1}
          aria-label={`${state.section} – Part ${state.part}`}
          style={{ outline: 'none' }}
        >
          {state.examData && (
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
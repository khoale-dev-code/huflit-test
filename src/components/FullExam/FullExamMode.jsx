/* src/components/FullExam/FullExamMode.js */

import React, {
  useState, useEffect, useCallback, useMemo, useRef,
} from 'react';
import { useUserProgress } from '../../hooks/useUserProgress';
import { EXAM_STRUCTURE, EXAM_MODES, EXAM_SECTIONS } from './constants/examConfig';
import { EXAM_TIMINGS } from './constants/timings';
import { calculateFullResults, countUnansweredQuestions } from './utils/examHelpers';
import { generateAnswerKey } from './utils/answerKey';
import { useExamState } from './hooks/useExamState';
import { useExamTimer } from './hooks/useExamTimer';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useNetworkStatus } from './hooks/useNetworkStatus';

import { AnswersContext } from './context/AnswersContext';

import StepIndicator from './StepIndicator';
import { ExamSetup } from './components/ExamSetup/ExamSetup';
import { ExamScreen } from './components/ExamScreen/ExamScreen';
import { ResultsScreen } from './components/Results/ResultsScreen';
import { Timer } from './components/Header/Timer';
import { AutosaveIndicator } from './components/Header/AutosaveIndicator';
import { TimeWarning } from './components/Warnings/TimeWarning';
import { OfflineWarning } from './components/Warnings/OfflineWarning';
import { SubmitModal } from './components/Modals/SubmitModal';
import { getExamById } from '../../data/examData';

const EXAM_DRAFT_KEY = 'exam-progress-draft';

const FullExamMode = ({ onComplete }) => {
  const { saveProgress, currentUser, loading: progressLoading } = useUserProgress();
  const { isOnline } = useNetworkStatus();

  const {
    state, setMode, setSection, setPart, setAnswers, addAnswer,
    setTimeLeft, tickTimer, pauseTimer, resumeTimer,
    setExamData, setExamId, markPartPlayed, reset: resetExam,
  } = useExamState();

  const [showWarning,     setShowWarning]     = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSaving,        setIsSaving]        = useState(false);
  const [lastSaved,       setLastSaved]       = useState(null);
  const [saveError,       setSaveError]       = useState(null);
  const [submitRetrying,  setSubmitRetrying]  = useState(false);

  const isAudioPlayingRef = useRef(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const setAudioPlaying = useCallback((val) => {
    isAudioPlayingRef.current = val;
    setIsAudioPlaying(val);
  }, []);

  const playedPartsRef = useRef(new Set());
  useEffect(() => {
    playedPartsRef.current = state.playedListeningParts || new Set();
  }, [state.playedListeningParts]);

  const mainContentRef = useRef(null);

  // ─── beforeunload ────────────────────────────────────────────────────────────
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

  // ─── visibilitychange (mobile save) ──────────────────────────────────────────
  useEffect(() => {
    const save = () => {
      if (document.visibilityState === 'hidden' && state.examId) {
        try {
          localStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify({
            examId: state.examId, answers: state.answers, timestamp: Date.now(),
          }));
        } catch (_) {}
      }
    };
    document.addEventListener('visibilitychange', save);
    return () => document.removeEventListener('visibilitychange', save);
  }, [state.examId, state.answers]);

  // ─── Draft restore ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!state.examId) return;
    try {
      const raw = localStorage.getItem(EXAM_DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft.examId === state.examId && draft.answers) setAnswers(draft.answers);
    } catch (_) {}
  }, [state.examId, setAnswers]);

  // ─── Persist answers ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!state.examId) return;
    try {
      localStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify({
        examId: state.examId, answers: state.answers, timestamp: Date.now(),
      }));
    } catch (_) {}
  }, [state.answers, state.examId]);

  // ─── Load exam data ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (state.mode === EXAM_MODES.SETUP || !state.examId) return;
    getExamById(state.examId)
      .then(data => {
        if (!data?.parts) throw new Error('Invalid exam data');
        setExamData(data);
      })
      .catch(err => { console.error(err); setSaveError(err.message); });
  }, [state.examId, state.mode, setExamData]);

  // ─── Section timer reset ──────────────────────────────────────────────────────
  useEffect(() => {
    if (state.mode === EXAM_MODES.EXAM) {
      setTimeLeft(state.section === EXAM_SECTIONS.LISTENING
        ? EXAM_TIMINGS.LISTENING : EXAM_TIMINGS.READING);
    }
  }, [state.section, state.mode, setTimeLeft]);

  // ─── Focus main content on part change ───────────────────────────────────────
  useEffect(() => {
    if (state.mode === EXAM_MODES.EXAM) {
      mainContentRef.current?.focus({ preventScroll: true });
    }
  }, [state.part, state.mode]);

  // ─── ✅ SCROLL TẬP TRUNG: chạy sau khi React render xong ─────────────────────
  // Thay thế toàn bộ scrollToTop() rải rác trong handlers.
  // setTimeout(0) đảm bảo DOM đã update trước khi scroll.
  useEffect(() => {
    if (state.mode !== EXAM_MODES.EXAM) return;
    const id = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
    return () => clearTimeout(id);
  }, [state.part, state.section, state.mode]);

  // ─── Timer callbacks ──────────────────────────────────────────────────────────
  const handleTimerComplete = useCallback(() => {
    if (state.section === EXAM_SECTIONS.LISTENING) {
      setSection(EXAM_SECTIONS.READING);
      setPart(5);
      setTimeLeft(EXAM_TIMINGS.READING);
    } else {
      setMode(EXAM_MODES.RESULTS);
    }
  }, [state.section, setSection, setPart, setTimeLeft, setMode]);

  const handleTimerWarning = useCallback(() => setShowWarning(true), []);

  // ─── Timer ───────────────────────────────────────────────────────────────────
  useExamTimer({
    isActive: state.mode === EXAM_MODES.EXAM && !state.isPaused && !!state.examData,
    section:  state.section,
    timeLeft: state.timeLeft,
    onTick:   tickTimer,
    onComplete: handleTimerComplete,
    onWarning:  handleTimerWarning,
  });

  // ─── Autosave ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (state.mode !== EXAM_MODES.EXAM || !currentUser || progressLoading || !state.examData) return;
    const timer = setInterval(async () => {
      if (!isOnline) return;
      try {
        setIsSaving(true);
        setSaveError(null);
        const results = calculateFullResults(state.examData, state.answers);
        await saveProgress({
          exam: state.examId,
          part: state.section === EXAM_SECTIONS.LISTENING ? 'listening' : 'reading',
          score: parseFloat(results.averageScore),
          answers: state.answers,
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
  }, [state.mode, state.section, state.answers, state.examId, state.examData,
    currentUser, isOnline, progressLoading, saveProgress]);

  // ─── Keyboard shortcuts ───────────────────────────────────────────────────────
  useKeyboardShortcuts({
    isActive: state.mode === EXAM_MODES.EXAM,
    isAudioPlaying,
    onNavigatePrev: () => {
      const min = state.section === EXAM_SECTIONS.LISTENING ? 1 : 5;
      if (state.part > min) setPart(state.part - 1);
      // scroll handled by useEffect above
    },
    onNavigateNext: () => {
      const max = state.section === EXAM_SECTIONS.LISTENING ? 4 : 8;
      if (state.part < max) setPart(state.part + 1);
      // scroll handled by useEffect above
    },
    onTogglePause: () => state.isPaused ? resumeTimer() : pauseTimer(),
    onSelectAnswer: (idx) => {
      const key = generateAnswerKey({ section: state.section, part: state.part, question: 1 });
      addAnswer(key, idx);
    },
    onSubmit: () => {
      if (state.section === EXAM_SECTIONS.READING && state.part === 8) setShowSubmitModal(true);
    },
    onExit: () => {
      if (window.confirm('Bạn chắc chắn muốn thoát? Tiến độ đã được lưu.')) {
        resetExam();
        onComplete?.();
      }
    },
  });

  // ─── HANDLERS ─────────────────────────────────────────────────────────────────

  const handleStartExam = useCallback((examId) => {
    setExamId(examId);
    setMode(EXAM_MODES.EXAM);
    setTimeLeft(EXAM_TIMINGS.LISTENING);
    setShowWarning(false);
    // scroll handled by useEffect [state.mode]
  }, [setExamId, setMode, setTimeLeft]);

  const handleSelectAnswer = useCallback((questionNum, optionIndex) => {
    const key = generateAnswerKey({ section: state.section, part: state.part, question: questionNum });
    addAnswer(key, optionIndex);
  }, [state.section, state.part, addAnswer]);

  const handleNavigatePart = useCallback((newPart) => {
    if (
      state.section === EXAM_SECTIONS.LISTENING &&
      newPart < state.part &&
      playedPartsRef.current.has(newPart)
    ) {
      alert('❌ Không thể quay lại phần nghe đã hoàn thành.');
      return;
    }
    setPart(newPart);
    // scroll handled by useEffect [state.part]
  }, [state.section, state.part, setPart]);

  const handleNextSection = useCallback(() => {
    setSection(EXAM_SECTIONS.READING);
    setPart(5);
    setTimeLeft(EXAM_TIMINGS.READING);
    // scroll handled by useEffect [state.section]
  }, [setSection, setPart, setTimeLeft]);

  const handleAudioEnd = useCallback(() => {
    if (state.section !== EXAM_SECTIONS.LISTENING) return;
    const currentPart = state.part;

    setAudioPlaying(false);
    markPartPlayed(currentPart);

    setTimeout(() => {
      if (currentPart < 4) {
        setPart(currentPart + 1);
        // scroll handled by useEffect [state.part]
      } else {
        handleNextSection();
      }
    }, 0);
  }, [state.section, state.part, setAudioPlaying, markPartPlayed, setPart, handleNextSection]);

  const handleFinalSubmit = useCallback(async () => {
    setSubmitRetrying(true);
    setSaveError(null);
    try {
      if (!state.examData) throw new Error('No exam data');
      const results = calculateFullResults(state.examData, state.answers);

      if (isOnline && currentUser) {
        await saveProgress({
          exam: state.examId,
          part: 'full-exam',
          score: parseFloat(results.averageScore),
          answers: state.answers,
          totalQuestions: state.examData?.totalQuestions || 0,
          correctAnswers: results.totalCorrect || 0,
          isDraft: false,
          testType: 'full-exam',
          listeningAnswers: Object.fromEntries(
            Object.entries(state.answers).filter(([k]) => k.startsWith(EXAM_SECTIONS.LISTENING))
          ),
          readingAnswers: Object.fromEntries(
            Object.entries(state.answers).filter(([k]) => k.startsWith(EXAM_SECTIONS.READING))
          ),
          timestamp: Date.now(),
        });
      }
      localStorage.removeItem(EXAM_DRAFT_KEY);
      setMode(EXAM_MODES.RESULTS);
      setShowSubmitModal(false);
    } catch (err) {
      console.error('Submit failed:', err);
      setSaveError(err.message || 'Failed to submit test');
    } finally {
      setSubmitRetrying(false);
    }
  }, [state.examData, state.answers, state.examId,
    isOnline, currentUser, setMode, saveProgress]);

  // ─── COMPUTED ─────────────────────────────────────────────────────────────────

  const unansweredCount = useMemo(() => {
    if (!state.examData) return 0;
    return countUnansweredQuestions(state.examData, state.answers, state.section);
  }, [state.examData, state.answers, state.section]);

  const isLastListeningPart = useMemo(
    () => state.section === EXAM_SECTIONS.LISTENING && state.part === 4,
    [state.section, state.part]);

  const isLastReadingPart = useMemo(
    () => state.section === EXAM_SECTIONS.READING && state.part === 8,
    [state.section, state.part]);

  const answersContextValue = useMemo(
    () => ({ answers: state.answers, addAnswer }),
    [state.answers, addAnswer]);

  // ─── RENDER ───────────────────────────────────────────────────────────────────

  if (state.mode === EXAM_MODES.SETUP)
    return <ExamSetup onStartExam={handleStartExam} />;

  if (state.mode === EXAM_MODES.RESULTS)
    return (
      <ResultsScreen
        examData={state.examData}
        answers={state.answers}
        onRetry={() => { resetExam(); setShowWarning(false); }}
        onExit={() => { resetExam(); localStorage.removeItem(EXAM_DRAFT_KEY); onComplete?.(); }}
      />
    );

  return (
    <AnswersContext.Provider value={answersContextValue}>
      <div className="min-h-screen bg-white">

        {/* ── Header ── */}
        <header
          className="sticky top-0 z-30 bg-white"
          style={{
            borderBottom: '1px solid #cbd5e1',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(8px,2vw,16px) clamp(12px,4vw,32px)',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            <div>
              <h2 style={{ fontSize: 'clamp(14px,2.5vw,17px)', fontWeight: 700, color: '#1A2330', margin: 0 }}>
                {state.section.toUpperCase()} – Part {state.part}
              </h2>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Đề: {state.examId}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,3vw,32px)' }}>
              <Timer timeLeft={state.timeLeft} isWarning={showWarning} />
              <AutosaveIndicator
                isSaving={isSaving}
                lastSaved={lastSaved}
                isOnline={isOnline}
                saveError={saveError}
              />
            </div>
          </div>
        </header>

        {/* ── Step Indicator ── */}
        <div
          className="bg-slate-50"
          style={{
            borderBottom: '1px solid #e2e8f0',
            padding: 'clamp(10px,2vw,24px) clamp(12px,4vw,32px)',
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
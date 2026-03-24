// FullExamMode.jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArrowLeft, Loader2, BookOpen, Headphones, CheckCircle } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // 🚀 Thêm useNavigate

// Hooks & Context
import { useUserProgress } from '../../hooks/useUserProgress';
import { useExamState } from './hooks/useExamState';
import { useExamTimer, getMaxTimeForSection } from './hooks/useExamTimer';      
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { AnswersContext } from './context/AnswersContext';

// Utils & Constants
import { generateAnswerKey } from './utils/answerKey';
import { loadExamData } from '../../data/examData';
import { EXAM_MODES, EXAM_SECTIONS } from './constants/examConfig';

// Components
// 🚀 ĐÃ XÓA IMPORT ExamSetup DƯ THỪA Ở ĐÂY
import { ExamScreen } from './components/ExamScreen/ExamScreen';
import { ResultsScreen } from './components/Results/ResultsScreen';
import { Timer } from './components/Header/Timer';
import { TimeWarning } from './components/Warnings/TimeWarning'; 
import { OfflineWarning } from './components/Warnings/OfflineWarning';
import { SubmitModal } from './components/Modals/SubmitModal';

const EXAM_DRAFT_KEY = 'exam-progress-draft';

const FullExamMode = ({ initialExamId, onComplete }) => {
  const navigate = useNavigate();
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

  // 2. LOAD & AUTO-SAVE DRAFT
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

  // 🚀 3. TỰ ĐỘNG VÀO THI KHÔNG CẦN BẤM 2 LẦN
  const handleStartExam = useCallback((examId) => {
    setExamId(examId); 
    setMode(EXAM_MODES.EXAM); 
    setShowWarning(false);
  }, [setExamId, setMode]);

  useEffect(() => {
    if (!initialExamId) {
      // Nếu user tự gõ /full-exam lên thanh URL mà chưa chọn đề -> Đá về trang chọn đề
      navigate('/exams', { replace: true });
    } else if (state.mode === EXAM_MODES.SETUP) {
      // Nếu đã có đề -> Vào thẳng phòng thi ngay lập tức
      handleStartExam(initialExamId);
    }
  }, [initialExamId, state.mode, handleStartExam, navigate]);

  // 4. KHỞI TẠO DỮ LIỆU ĐỀ THI
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
          
          const startTime = getMaxTimeForSection(data.category, startPart.type);
          setTimeLeft(startTime);
        }
      })
      .catch((err) => setSaveError(err.message));
  }, [state.examId, state.mode, state.examData, setExamData, setSection, setPart, setTimeLeft]); 

  const currentSectionParts = useMemo(() => 
    state.examData?.parts?.filter(p => p.type === state.section) || [], 
  [state.examData, state.section]);

  // ─── Handlers ───
  const handleNavigatePart = useCallback((newPartId) => {
    if (sectionRef.current === EXAM_SECTIONS.LISTENING && playedPartsRef.current.has(newPartId)) return; 
    setPart(newPartId);
  }, [setPart]);

  const handleNextSection = useCallback(() => {
    const readingParts = state.examData?.parts?.filter(p => p.type === EXAM_SECTIONS.READING) || [];
    if (readingParts.length > 0) {
      const readingTime = getMaxTimeForSection(state.examData.category, EXAM_SECTIONS.READING);
      setTimeLeft(readingTime); 
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
      
      // 🚀 QUÉT ĐIỂM CHUẨN XÁC ĐỂ LƯU VÀO DB
      state.examData.parts.forEach(part => {
        // Tương tự, gán pType chống lỗi undefined
        const pType = part.type || (['part1', 'part2', 'part3', 'part4'].includes(String(part.id).toLowerCase()) ? 'listening' : 'reading');
        
        part.questions?.forEach((q, qIdx) => {
          if (q.type === 'group') {
            q.subQuestions?.forEach((sq, sIdx) => {
              if (sq.isExample) return;
              totalQuestions++;
              const qKey = generateAnswerKey({ section: pType, part: part.id, question: sIdx }); // subIdx thay vì idx + 1
              if (String(state.answers[qKey]) === String(sq.correct)) totalCorrect++;
            });
          } else {
            if (q.isExample) return;
            totalQuestions++;
            const qKey = generateAnswerKey({ section: pType, part: part.id, question: qIdx });
            if (String(state.answers[qKey]) === String(q.correct)) totalCorrect++;
          }
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

  const handleSelectAnswer = useCallback((questionKey, answerValue) => {
    addAnswer(questionKey, answerValue);
  }, [addAnswer]);

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

  // 🚀 MÀN HÌNH CHỜ (THAY THẾ CHO EXAM SETUP CŨ)
  if (state.mode === EXAM_MODES.SETUP || !state.examData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC] font-nunito flex-col gap-4">
        <Loader2 className="animate-spin text-[#1CB0F6]" size={48} strokeWidth={3} />
        <span className="font-black text-slate-500 uppercase tracking-widest text-[14px]">Đang nạp dữ liệu thi...</span>
      </div>
    );
  }
  
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
      <div className="min-h-screen bg-[#F8FAFC] font-nunito selection:bg-[#1CB0F6] selection:text-white">
        
        {/* Banner Warnings */}
        <div className="fixed top-0 left-0 right-0 z-[70] pointer-events-none px-4 pt-4">
          <TimeWarning visible={showWarning} section={state.section} isLastListeningPart={isLastListeningPart} timeLeft={state.timeLeft} />
          <OfflineWarning isOnline={isOnline} />
        </div>

        {/* 🚀 GAMIFIED HEADER CHUẨN UX (SẠCH, CHỈ CÓ TIMER) */}
        <header className="fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-b-2 border-slate-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            
            <div className="flex items-center gap-4 min-w-0">
              <button 
                onClick={() => setShowSubmitModal(true)}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-[14px] bg-slate-50 border-2 border-slate-200 border-b-[3px] text-slate-400 hover:text-[#FF4B4B] hover:border-[#ffc1c1] hover:bg-[#FFF0F0] active:translate-y-[2px] active:border-b-[1px] transition-all outline-none shrink-0"
                title="Tạm dừng / Kết thúc sớm"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </button>

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] flex items-center justify-center border-2 border-b-[3px] shadow-sm shrink-0 transition-all bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]">
                {isListening ? <Headphones size={22} strokeWidth={2.5} /> : <BookOpen size={22} strokeWidth={2.5} />}
              </div>

              <div className="min-w-0 hidden sm:block">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border bg-slate-50 text-slate-500 border-slate-200">
                    {state.section}
                  </span>
                  {unansweredCount > 0 && (
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#FFFBEA] text-[#FF9600] border border-[#FFD8A8]">
                      Còn {unansweredCount} câu
                    </span>
                  )}
                </div>
                <h2 className="text-[15px] font-black text-slate-800 truncate leading-tight">
                  {currentPartData?.title || 'Đang nạp dữ liệu...'}
                </h2>
              </div>
            </div>

            {/* Timer đứng 1 mình uy nghiêm ở góc phải */}
            <div className="flex items-center">
              <Timer timeLeft={state.timeLeft} isWarning={showWarning} />
            </div>
          </div>
        </header>

        {/* 🚀 MAIN EXAM AREA */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-8">
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
                onSubmit={() => setShowSubmitModal(true)} // Nút nộp bài của Bottom Menu gọi hàm này
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
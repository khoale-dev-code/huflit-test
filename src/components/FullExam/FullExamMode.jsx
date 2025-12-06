import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Clock, Play, Pause, AlertCircle, BookOpen, ChevronRight, ChevronLeft, Trophy, Zap, CheckCircle, XCircle, Eye, EyeOff, Target, TrendingUp, Award, FileText, ChevronDown } from 'lucide-react';
import ContentDisplay from '../Display/ContentDisplay';
import { EXAM_LIST, getExamById } from '../../data/examData'; // Đã sửa ở đây
import { useUserProgress } from '../../hooks/useUserProgress';
import { motion } from 'framer-motion';
import { useAutoSaveProgress } from '../../hooks/useAutoSaveProgress';
import '../styles/FullExamMode.css';

// Constants
const READING_TIME = 3600;
const LISTENING_TIME = 1800;
const WARNING_TIME = 300;

const EXAM_STRUCTURE = {
  listening: {
    title: 'PHẦN NGHE (LISTENING)',
    totalTime: LISTENING_TIME,
    parts: 4,
    questionsPerPart: 5,
    totalQuestions: 20,
    pointPerQuestion: 5,
    totalPoints: 100,
  },
  reading: {
    title: 'PHẦN ĐỌC (READING)',
    totalTime: READING_TIME,
    parts: 4,
    questionsPerPart: 10,
    totalQuestions: 40,
    pointPerQuestion: 2.5,
    totalPoints: 100,
  }
};


// Question Card Component (giữ nguyên)
const QuestionCard = React.memo(({ 
  question, 
  questionNum, 
  selectedAnswer, 
  onAnswerSelect, 
  questionKey 
}) => {
  const questionText = typeof question === 'string' ? question : question?.question || question?.text || 'Không có nội dung câu hỏi';
  const options = question?.options || [];

  return (
    <div className="question-card">
      <div className="question-header">
        <h4 className="question-title">
          <span className="question-number">Câu {questionNum}:</span> {questionText}
        </h4>
        {selectedAnswer !== undefined && (
          <span className="answered-badge">
            ✓ Đã chọn
          </span>
        )}
      </div>
      
      <div className="options-container">
        {options.length > 0 ? (
          options.map((option, optIndex) => {
            const isSelected = selectedAnswer === optIndex;
            const letter = String.fromCharCode(65 + optIndex);
            
            return (
              <label
                key={optIndex}
                className={`option-card ${isSelected ? 'selected' : ''}`}
              >
                <div className={`option-indicator ${isSelected ? 'selected' : ''}`}>
                  {isSelected ? '✓' : letter}
                </div>
                <span className={`option-text ${isSelected ? 'selected' : ''}`}>
                  {option}
                </span>
                <input
                  type="radio"
                  name={questionKey}
                  value={optIndex}
                  checked={isSelected}
                  onChange={() => onAnswerSelect(questionNum, optIndex)}
                  className="option-input"
                />
              </label>
            );
          })
        ) : (
          <div className="no-options">Không có lựa chọn</div>
        )}
      </div>
    </div>
  );
});

QuestionCard.displayName = 'QuestionCard';

// Part Navigation Component (giữ nguyên)
const PartNavigation = React.memo(({ 
  currentPart, 
  parts, 
  answers, 
  currentSection, 
  questionsPerPart, 
  onPartChange 
}) => {
  return (
    <div className="part-navigation">
      <div className="part-nav-header">
        <h3 className="part-nav-title">📍 Chọn Part</h3>
        <span className="part-nav-counter">
          Part {currentPart} / {parts}
        </span>
      </div>
      <div className="part-grid">
        {Array.from({ length: parts }, (_, i) => {
          const partNum = currentSection === 'listening' ? i + 1 : i + 5;
          const partAnswers = Object.keys(answers).filter(key =>
            key.startsWith(`${currentSection}-part${partNum}-`)
          ).length;
          const isCurrent = currentPart === partNum;
          const isCompleted = partAnswers === questionsPerPart;
          
          return (
            <button
              key={partNum}
              onClick={() => onPartChange(partNum)}
              className={`part-nav-btn ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="part-number">{partNum}</div>
              <div className="part-progress">
                {partAnswers}/{questionsPerPart}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

PartNavigation.displayName = 'PartNavigation';

// Detailed Answer Review Component (giữ nguyên)
const DetailedAnswerReview = ({ examData, answers, sectionType, startPart, endPart }) => {
  const [showExplanations, setShowExplanations] = useState(true);

  const reviewData = [];
  
  for (let part = startPart; part <= endPart; part++) {
    const partData = examData?.parts?.[`part${part}`];
    if (!partData?.questions) continue;

    partData.questions.forEach((q, qIndex) => {
      const key = `${sectionType}-part${part}-q${qIndex + 1}`;
      const userAnswer = answers[key];
      const isCorrect = userAnswer === q.correct;
      
      reviewData.push({
        partNum: part,
        questionNum: qIndex + 1,
        question: q,
        userAnswer,
        isCorrect,
        key
      });
    });
  }

  return (
    <div className="answer-review-container">
      <div className="explanation-toggle">
        <button
          onClick={() => setShowExplanations(!showExplanations)}
          className="toggle-btn"
        >
          {showExplanations ? (
            <>
              <EyeOff className="toggle-icon" />
              Ẩn giải thích
            </>
          ) : (
            <>
              <Eye className="toggle-icon" />
              Xem giải thích chi tiết
            </>
          )}
        </button>
      </div>

      <div className="answers-list">
        {reviewData.map((item) => {
          const { partNum, questionNum, question, userAnswer, isCorrect } = item;

          return (
            <div
              key={item.key}
              className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="answer-header">
                <div className={`status-icon ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? (
                    <CheckCircle className="icon" />
                  ) : (
                    <XCircle className="icon" />
                  )}
                </div>
                <div className="answer-info">
                  <p className="question-meta">
                    Part {partNum} - Câu {questionNum}
                  </p>
                  <p className="question-text">
                    {question.question}
                  </p>
                </div>
              </div>

              <div className="answer-details">
                <div className="answer-comparison">
                  <span className="answer-label">
                    Câu trả lời của bạn:
                  </span>
                  <span className={`user-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {userAnswer !== undefined 
                      ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}`
                      : 'Chưa chọn'}
                  </span>
                </div>

                {!isCorrect && (
                  <div className="answer-comparison">
                    <span className="answer-label">
                      Đáp án đúng:
                    </span>
                    <span className="correct-answer">
                      {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]}
                    </span>
                  </div>
                )}

                {showExplanations && question.explanation && (
                  <div className="explanation">
                    <p className="explanation-title">
                      💡 Giải thích:
                    </p>
                    <p className="explanation-text">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FullExamMode = ({ onComplete }) => {
  const { saveProgress, currentUser, loading: progressLoading, error: progressError } = useUserProgress();
  const [isOpen, setIsOpen] = useState(false); // ← THÊM DÒNG NÀY
  const [mode, setMode] = useState('setup');
  const [currentSection, setCurrentSection] = useState('listening');
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState('exam1');
  const [resultsSaved, setResultsSaved] = useState(false);
  const [autoSaveActive, setAutoSaveActive] = useState(false);
  const [examData, setExamData] = useState(null);
  const [loadingExam, setLoadingExam] = useState(false);

  // Load exam data khi selectedExamId thay đổi
  useEffect(() => {
    const loadExam = async () => {
      if (mode !== 'setup' && selectedExamId) {
        setLoadingExam(true);
        try {
          const data = await getExamById(selectedExamId);
          setExamData(data);
        } catch (error) {
          console.error('Lỗi load exam:', error);
        } finally {
          setLoadingExam(false);
        }
      }
    };

    loadExam();
  }, [selectedExamId, mode]);

  const currentConfig = EXAM_STRUCTURE[currentSection];

  const partData = useMemo(() => {
    return examData?.parts?.[`part${currentPart}`] || null;
  }, [examData, currentPart]);

  const answeredCount = useMemo(() => {
    const prefix = `${currentSection}-`;
    return Object.keys(answers).filter(key => key.startsWith(prefix)).length;
  }, [answers, currentSection]);

  const progress = useMemo(() => {
    return (answeredCount / currentConfig.totalQuestions) * 100;
  }, [answeredCount, currentConfig.totalQuestions]);

  const timePercentage = useMemo(() => {
    return (timeLeft / currentConfig.totalTime) * 100;
  }, [timeLeft, currentConfig.totalTime]);

  const currentPartAnswers = useMemo(() => {
    const prefix = `${currentSection}-part${currentPart}-`;
    return Object.fromEntries(
      Object.entries(answers).filter(([key]) => key.startsWith(prefix))
    );
  }, [answers, currentSection, currentPart]);

  useAutoSaveProgress(
    currentPartAnswers,
    selectedExamId,
    `part${currentPart}`,
    partData
  );

  useEffect(() => {
    if (mode === 'exam') {
      const time = currentSection === 'listening' ? LISTENING_TIME : READING_TIME;
      setTimeLeft(time);
      const startPart = currentSection === 'listening' ? 1 : 5;
      setCurrentPart(startPart);
      setIsPaused(false);
      setResultsSaved(false);
      setAutoSaveActive(!!currentUser);
    }
  }, [mode, currentSection, currentUser]);

  useEffect(() => {
    if (mode !== 'exam' || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime === WARNING_TIME) {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 5000);
        }
        if (newTime <= 0) {
          handleSectionComplete();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, isPaused, timeLeft]);

  useEffect(() => {
    if (mode === 'results' && currentUser && !resultsSaved && !progressLoading) {
      const saveFinalResults = async () => {
        try {
          const results = calculateResults();
          const totalCorrect = results.listening.correct + results.reading.correct;

          const finalData = {
            exam: selectedExamId,
            part: 'full',
            score: results.average,
            answers: answers,
            totalQuestions: 60,
            correctAnswers: totalCorrect,
            listeningScore: results.listening.points,
            readingScore: results.reading.points,
            listeningCorrect: results.listening.correct,
            readingCorrect: results.reading.correct,
            testType: 'full-exam',
            isDraft: false,
          };

          await saveProgress(finalData);
          setResultsSaved(true);
        } catch (error) {
          console.error('Error saving final results:', error);
        }
      };

      saveFinalResults();
    }
  }, [mode, currentUser, resultsSaved, progressLoading, selectedExamId, answers]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleAnswerSelect = useCallback((questionNum, optionIndex) => {
    const key = `${currentSection}-part${currentPart}-q${questionNum}`;
    setAnswers(prev => ({ ...prev, [key]: optionIndex }));
  }, [currentSection, currentPart]);

  const handleSectionComplete = useCallback(() => {
    if (currentSection === 'listening') {
      setCurrentSection('reading');
    } else {
      setMode('results');
    }
  }, [currentSection]);

  const calculateResults = useCallback(() => {
    const results = {
      listeningByPart: {},
      readingByPart: {},
      listening: { correct: 0, total: 20, points: 0 },
      reading: { correct: 0, total: 40, points: 0 },
      totalPoints: 0,
      average: 0
    };

    if (!examData) return results;

    for (let part = 1; part <= 4; part++) {
      let partCorrect = 0;
      const partQuestions = examData.parts?.[`part${part}`]?.questions || [];
      
      for (let q = 0; q < partQuestions.length; q++) {
        const key = `listening-part${part}-q${q + 1}`;
        if (answers[key] === partQuestions[q].correct) {
          results.listening.correct++;
          partCorrect++;
        }
      }
      results.listeningByPart[part] = partCorrect;
    }

    for (let part = 5; part <= 8; part++) {
      let partCorrect = 0;
      const partQuestions = examData.parts?.[`part${part}`]?.questions || [];
      
      for (let q = 0; q < partQuestions.length; q++) {
        const key = `reading-part${part}-q${q + 1}`;
        if (answers[key] === partQuestions[q].correct) {
          results.reading.correct++;
          partCorrect++;
        }
      }
      results.readingByPart[part - 4] = partCorrect;
    }

    results.listening.points = results.listening.correct * 5;
    results.reading.points = results.reading.correct * 2.5;
    results.totalPoints = results.listening.points + results.reading.points;
    results.average = results.totalPoints / 2;

    return results;
  }, [examData, answers]);

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { 
      label: 'Xuất sắc', 
      level: 'excellent',
      emoji: '🌟' 
    };
    if (percentage >= 80) return { 
      label: 'Rất tốt', 
      level: 'good',
      emoji: '🎯' 
    };
    if (percentage >= 70) return { 
      label: 'Tốt', 
      level: 'average',
      emoji: '👍' 
    };
    if (percentage >= 60) return { 
      label: 'Khá', 
      level: 'fair',
      emoji: '📈' 
    };
    if (percentage >= 50) return { 
      label: 'Trung bình', 
      level: 'poor',
      emoji: '⚠️' 
    };
    return { 
      label: 'Cần cố gắng', 
      level: 'fail',
      emoji: '💪' 
    };
  };

  const handleStartExam = async () => {
    setMode('exam');
  };

  if (progressError) {
    console.error('Progress error:', progressError);
  }

  // SETUP SCREEN
  if (mode === 'setup') {
    return (
      <div className="exam-container bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
    {/* Background gradient/decoration */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-10"></div>
    
    <div className="exam-header relative z-10">
        <div className="flex items-center gap-3 mb-2">
            <h1 className="exam-title text-3xl sm:text-4xl font-extrabold text-gray-900 text-white tracking-tight text">
                BÀI THI TOÀN PHẦN
            </h1>
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200 shadow-sm">
                FULL TEST
            </span>
        </div>
        
        {/* Statistics Bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 pb-3 border-b border-gray-200">
            {/* Parts */}
            <p className="exam-subtitle flex items-center gap-1 text-base font-semibold text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                <span className="font-extrabold " >8</span> Parts
            </p>
            {/* Questions */}
            <p className="exam-subtitle flex items-center gap-1 text-base font-semibold text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                <span className="font-extrabold">60</span> Câu
            </p>
            {/* Time */}
            <p className="exam-subtitle flex items-center gap-1 text-base font-semibold text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><path d="M12 14v-4"/><path d="M4 13a8 8 0 0 1 16 0"/></svg>
                <span className="font-extrabold">90</span> Phút
            </p>
        </div>
        
        {/* User Greeting and Auto-save status */}
        {currentUser && (
            <div className="flex items-center justify-between mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <p className="user-greeting text-sm font-medium text-blue-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-wave"><path d="M11 12h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2H9v7h3"/><path d="m14 11-1.5 5.5"/><path d="M6 14v1a3 3 0 0 0 3 3h1"/><path d="M11 17h6"/><path d="M18 19c-.27-.22-.64-.46-1-1v0-1"/><path d="m10 16-1.5 5.5"/></svg>
                    Chào <span className="font-bold">{currentUser.name}</span>
                </p>
                <p className="auto-save-status text-xs font-semibold text-gray-600 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save text-green-500"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"/><path d="M7 3v6h6"/></svg>
                    Auto-save được kích hoạt
                </p>
            </div>
        )}
    </div>

  <div className="selection-header">
          <div className="selection-icon">
            <FileText className="icon" />
          </div>
          <h2 className="selection-title">
            Chọn Bài Thi
          </h2>
        </div>

        <motion.div 
          animate={isOpen ? "open" : "closed"} 
          className="selection-container **mb-8**" // Đã thêm mb-8 để tạo khoảng cách 2 dòng
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="exam-select-button"
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span className={selectedExamId ? 'selected-text' : 'placeholder-text'}>
              {selectedExamId 
                ? EXAM_LIST.find(e => e.id === selectedExamId)?.title 
                : 'Chọn bài thi...'}
            </span>
            <motion.span 
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.2 }}
              className="select-arrow"
            >
              <ChevronDown className="arrow-icon" />
            </motion.span>
          </button>
          
          {isOpen && (
            <motion.ul
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
                when: "beforeChildren",
                staggerChildren: 0.03,
              }}
              style={{ originY: "top" }}
              className="exam-dropdown-list"
              role="listbox"
            >
              {EXAM_LIST.map((exam, index) => (
                <motion.li
                  key={exam.id}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.03 }}
                  onClick={() => {
                    setSelectedExamId(exam.id);
                    setIsOpen(false);
                  }}
                  className={`exam-option ${selectedExamId === exam.id ? 'active' : ''}`}
                  role="option"
                  aria-selected={selectedExamId === exam.id}
                >
                  <FileText className="option-icon" />
                  <span className="option-text">{exam.title}</span>
                  {selectedExamId === exam.id && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="check-icon"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      <br className=''></br>
        <div className="exam-sections">
          <div className="section-card exam-card-listening">
            <div className="section-header">
              <Play className="section-icon" />
              <h3 className="section-title">NGHE (Listening)</h3>
            </div>
            <div className="section-stats">
              <div className="stat-item">
                <p className="stat-value">30'</p>
                <p className="stat-label">Thời gian</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">20</p>
                <p className="stat-label">Câu</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">4</p>
                <p className="stat-label">Parts</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">100</p>
                <p className="stat-label">Điểm</p>
              </div>
            </div>
          </div>

          <div className="section-card exam-card-reading">
            <div className="section-header">
              <BookOpen className="section-icon" />
              <h3 className="section-title">ĐỌC (Reading)</h3>
            </div>
            <div className="section-stats">
              <div className="stat-item">
                <p className="stat-value">60'</p>
                <p className="stat-label">Thời gian</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">40</p>
                <p className="stat-label">Câu</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">4</p>
                <p className="stat-label">Parts</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">100</p>
                <p className="stat-label">Điểm</p>
              </div>
            </div>
          </div>

          <div className="exam-notes">
            <h3 className="notes-title">📌 Lưu ý:</h3>
            <ul className="notes-list">
              <li>✅ 8 parts theo thứ tự (1-4 Listening → 5-8 Reading)</li>
              <li>⏰ Tự động chuyển sau 30/60 phút</li>
              <li>💾 {currentUser ? 'Auto-save mỗi 30s & Kết quả cuối lưu vĩnh viễn' : 'Đáp án chỉ lưu local'}</li>
              <li>⚠️ Cảnh báo khi còn 5 phút</li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            disabled={!selectedExamId || loadingExam}
            className="exam-btn-primary start-exam-btn"
          >
            <Play className="btn-icon" /> BẮT ĐẦU BÀI THI
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loadingExam) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Đang tải đề thi...</p>
      </div>
    );
  }

  // EXAM SCREEN
  if (mode === 'exam') {
    return (
      <div className="exam-mode-container">
        <div className="exam-header-sticky">
          <div className="header-content">
            <div className="header-info">
              <h2 className="section-header">
                {currentSection === 'listening' ? '🎧' : '📖'} {currentConfig.title}
              </h2>
              <p className="part-info">
                Part {currentPart} / {currentConfig.parts} 
                {autoSaveActive && <span className="auto-save-indicator">💾 Auto-save ON</span>}
              </p>
            </div>
            <div className="timer-container">
              <div className={`timer-display ${timeLeft < 300 ? 'timer-warning' : 'timer-normal'}`}>
                {formatTime(timeLeft)}
              </div>
              <p className="timer-label">Còn lại</p>
            </div>
          </div>

          <div className="progress-section">
            <div>
              <div className="progress-labels">
                <span>Thời gian</span>
                <span>{answeredCount}/{currentConfig.totalQuestions}</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className={`exam-progress-bar ${timeLeft < 300 ? 'warning' : ''}`}
                  style={{ width: `${timePercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="exam-controls">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="control-btn"
            >
              {isPaused ? <Play className="control-icon" /> : <Pause className="control-icon" />}
              {isPaused ? 'Tiếp tục' : 'Tạm dừng'}
            </button>
          </div>
        </div>

        {showWarning && (
          <div className="warning-alert">
            <AlertCircle className="warning-icon" />
            <p className="warning-text">⚠️ Còn 5 phút!</p>
          </div>
        )}

        {progressError && (
          <div className="error-alert">
            <AlertCircle className="error-icon" />
            <p className="error-text">{progressError}</p>
          </div>
        )}

        {/* ContentDisplay */}
        <ContentDisplay
          partData={partData}
          selectedPart={`part${currentPart}`}
          currentQuestionIndex={0}
          testType={currentSection}
        />

        <PartNavigation
          currentPart={currentPart}
          parts={currentConfig.parts}
          answers={answers}
          currentSection={currentSection}
          questionsPerPart={currentConfig.questionsPerPart}
          onPartChange={setCurrentPart}
        />

        <div className="questions-container">
          <h3 className="questions-title">
            Part {currentPart}: Câu {(currentPart - (currentSection === 'listening' ? 1 : 5)) * currentConfig.questionsPerPart + 1} - {(currentPart - (currentSection === 'listening' ? 0 : 4)) * currentConfig.questionsPerPart}
          </h3>
          
          {partData?.description && (
            <p className="part-description">
              📖 {partData.description}
            </p>
          )}
          
          {partData?.questions && partData.questions.length > 0 ? (
            <div className="questions-list">
              {partData.questions.map((question, qIndex) => {
                const questionNum = qIndex + 1;
                const key = `${currentSection}-part${currentPart}-q${questionNum}`;
                
                return (
                  <QuestionCard
                    key={key}
                    question={question}
                    questionNum={questionNum}
                    selectedAnswer={answers[key]}
                    onAnswerSelect={handleAnswerSelect}
                    questionKey={key}
                  />
                );
              })}
            </div>
          ) : (
            <div className="no-questions">
              <AlertCircle className="no-questions-icon" />
              <p className="no-questions-text">Không có dữ liệu câu hỏi</p>
            </div>
          )}
        </div>

        <div className="navigation-buttons">
          <button
            onClick={() => setCurrentPart(prev => Math.max(currentSection === 'listening' ? 1 : 5, prev - 1))}
            disabled={currentPart === (currentSection === 'listening' ? 1 : 5)}
            className="nav-btn prev-btn"
          >
            <ChevronLeft className="nav-icon" /> Part trước
          </button>
          
          {currentPart === (currentSection === 'listening' ? 4 : 8) ? (
            <button
              onClick={handleSectionComplete}
              className="nav-btn complete-btn"
            >
              {currentSection === 'listening' ? '→ Reading' : '✓ Nộp bài'} <ChevronRight className="nav-icon" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentPart(prev => prev + 1)}
              className="nav-btn next-btn"
            >
              Part sau <ChevronRight className="nav-icon" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (mode === 'results') {
    const results = calculateResults();
    const level = getPerformanceLevel(results.average);
    const totalCorrect = results.listening.correct + results.reading.correct;

    return (
      <div className="results-container">
        {/* Header */}
        <div className={`results-header performance-${level.level}`}>
          <Trophy className="trophy-icon" />
          <h1 className="results-title">🎉 KẾT QUẢ BÀI THI</h1>
          <p className="results-subtitle">Bạn đã hoàn thành tất cả 8 parts!</p>
          <div className="performance-badge">
            <p className="performance-text">
              {level.emoji} Xếp loại: <span className="performance-level">{level.label}</span>
            </p>
          </div>
          {resultsSaved && currentUser && (
            <p className="save-status">
              ✅ Kết quả đã được lưu vào hồ sơ
            </p>
          )}
          {progressLoading && (
            <p className="save-status">⏳ Đang lưu kết quả...</p>
          )}
        </div>

        {/* Score Summary Cards */}
        <div className="score-cards">
          <div className="score-card listening-card">
            <Target className="score-icon" />
            <p className="score-label">LISTENING</p>
            <p className="score-value">{results.listening.points}</p>
            <p className="score-detail">{results.listening.correct}/20 câu đúng</p>
          </div>

          <div className="score-card reading-card">
            <BookOpen className="score-icon" />
            <p className="score-label">READING</p>
            <p className="score-value">{results.reading.points}</p>
            <p className="score-detail">{results.reading.correct}/40 câu đúng</p>
          </div>

          <div className="score-card average-card">
            <TrendingUp className="score-icon" />
            <p className="score-label">TRUNG BÌNH</p>
            <p className="average-value">
              {results.average.toFixed(1)}
            </p>
            <p className="score-detail">Tổng: {totalCorrect}/60 câu</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="results-progress">
          <div className="progress-header">
            <h3 className="progress-title">📊 Tiến độ hoàn thành</h3>
            <span className="progress-count">
              {totalCorrect} / 60 câu đúng
            </span>
          </div>
          <div className="progress-bar-background">
            <div
              className="results-progress-bar"
              style={{
                width: `${(totalCorrect/60)*100}%`,
                backgroundColor: 
                  results.average >= 70 ? '#10b981' : 
                  results.average >= 50 ? '#f59e0b' : '#ef4444'
              }}
            >
              <span className="progress-percent">
                {((totalCorrect/60)*100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="detailed-results">
          <div className="section-results listening-results">
            <h3 className="section-results-title">
              <Play className="section-icon" /> LISTENING
            </h3>
            <div className="results-stats">
              <div className="result-stat">
                <span>Câu đúng:</span>
                <span className="stat-value">{results.listening.correct}/20</span>
              </div>
              <div className="result-stat">
                <span>Điểm:</span>
                <span className="stat-value">{results.listening.points}/100</span>
              </div>
            </div>
            <div className="part-breakdown">
              <p className="breakdown-title">📊 Chi tiết từng part:</p>
              <div className="parts-grid">
                {[1, 2, 3, 4].map(part => (
                  <div key={part} className="part-result">
                    <p className="part-name">Part {part}</p>
                    <p className="part-score">{results.listeningByPart[part] || 0}</p>
                    <p className="part-total">/5</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="section-results reading-results">
            <h3 className="section-results-title">
              <BookOpen className="section-icon" /> READING
            </h3>
            <div className="results-stats">
              <div className="result-stat">
                <span>Câu đúng:</span>
                <span className="stat-value">{results.reading.correct}/40</span>
              </div>
              <div className="result-stat">
                <span>Điểm:</span>
                <span className="stat-value">{results.reading.points}/100</span>
              </div>
            </div>
            <div className="part-breakdown">
              <p className="breakdown-title">📊 Chi tiết từng part:</p>
              <div className="parts-grid">
                {[1, 2, 3, 4].map(part => (
                  <div key={part} className="part-result">
                    <p className="part-name">P{part + 4}</p>
                    <p className="part-score">{results.readingByPart[part] || 0}</p>
                    <p className="part-total">/10</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="feedback">
          <h4 className="feedback-title">
            <Zap className="feedback-icon" /> 💡 Nhận xét
          </h4>
          <div className="feedback-content">
            {results.average >= 80 && (
              <p>✅ <strong>Tuyệt vời!</strong> Kết quả xuất sắc. Tiếp tục duy trì và cải thiện thêm.</p>
            )}
            {results.average >= 60 && results.average < 80 && (
              <>
                <p>✅ <strong>Khá tốt!</strong> Tiến bộ tốt. Tập trung vào các phần còn yếu.</p>
                {results.listening.correct < 12 && <p>📌 Listening: Cần luyện tập thêm.</p>}
                {results.reading.correct < 24 && <p>📌 Reading: Tăng cường luyện comprehension.</p>}
              </>
            )}
            {results.average >= 40 && results.average < 60 && (
              <p>⚡ <strong>Cần cải thiện!</strong> Luyện tập đều đặn, tập trung vào phần yếu.</p>
            )}
            {results.average < 40 && (
              <p>⚠️ <strong>Hãy cố gắng thêm!</strong> Luyện từ vựng, ngữ pháp, kỹ năng cơ bản.</p>
            )}
          </div>
        </div>

        {/* Detailed Answer Reviews */}
        <div className="answer-review-section listening-review">
          <h3 className="review-title">
            <Play className="review-icon" />
            Chi tiết đáp án LISTENING (Part 1-4)
          </h3>
          <DetailedAnswerReview
            examData={examData}
            answers={answers}
            sectionType="listening"
            startPart={1}
            endPart={4}
          />
        </div>

        <div className="answer-review-section reading-review">
          <h3 className="review-title">
            <BookOpen className="review-icon" />
            Chi tiết đáp án READING (Part 5-8)
          </h3>
          <DetailedAnswerReview
            examData={examData}
            answers={answers}
            sectionType="reading"
            startPart={5}
            endPart={8}
          />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            onClick={() => {
              setMode('setup');
              setAnswers({});
              setCurrentSection('listening');
              setResultsSaved(false);
              setAutoSaveActive(!!currentUser);
            }}
            className="action-btn retry-btn"
          >
            <Play className="btn-icon" /> Làm lại
          </button>
          <button
            onClick={() => {
              setMode('setup');
              setAnswers({});
              setCurrentSection('listening');
              setResultsSaved(false);
              setAutoSaveActive(!!currentUser);
              onComplete?.();
            }}
            className="action-btn back-btn"
          >
            <ChevronLeft className="btn-icon" /> Quay lại
          </button>
        </div>

        {/* Motivational Message */}
        <div className={`motivational-message ${results.average >= 70 ? 'success' : 'encourage'}`}>
          <p className="message-text">
            {results.average >= 90 && '🎉 Tuyệt vời! Bạn đã làm xuất sắc!'}
            {results.average >= 70 && results.average < 90 && '👏 Rất tốt! Tiếp tục cố gắng nhé!'}
            {results.average >= 50 && results.average < 70 && '💪 Khá tốt! Hãy luyện tập thêm để tiến bộ hơn!'}
            {results.average < 50 && '📚 Đừng nản chí! Hãy xem lại bài và thử lại nhé!'}
          </p>
          <p className="message-subtext">
            Luyện tập thường xuyên sẽ giúp bạn cải thiện kỹ năng! 🚀
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default FullExamMode;
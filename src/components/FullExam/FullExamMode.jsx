import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Clock, Play, Pause, AlertCircle, BookOpen, ChevronRight, ChevronLeft, Trophy, Zap, CheckCircle, XCircle, Target, TrendingUp, Award, FileText, ChevronDown, Headphones, Send, ArrowRight, Flag, RotateCcw } from 'lucide-react';
import ContentDisplay from '../Display/ContentDisplay';
import { EXAM_LIST, getExamById } from '../../data/examData';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAutoSaveProgress } from '../../hooks/useAutoSaveProgress';

// ===== THEME (Prep.vn Inspired - Enhanced) =====
const COLORS = {
  blue: '#0066CC',
  darkBlue: '#004399',
  lightBlue: '#E6F2FF',
  orange: '#FF8C42',
  lightOrange: '#FFF3E6',
  slate: '#6B7280',
  success: '#059669',
  danger: '#DC2626',
  white: '#FFFFFF',
};

// ===== EXAM CONFIGURATION =====
const EXAM_STRUCTURE = {
  listening: {
    title: 'LISTENING',
    totalTime: 1800,
    parts: 4,
    questionsPerPart: 5,
    totalQuestions: 20,
    totalPoints: 100,
    pointsPerQuestion: 5,
    listenings: 2,
  },
  reading: {
    title: 'READING',
    totalTime: 3600,
    parts: 4,
    questionsPerPart: 10,
    totalQuestions: 40,
    totalPoints: 100,
    pointsPerQuestion: 2.5,
  }
};

const getCEFRLevel = (score) => {
  if (score >= 75) return { level: 'C1', label: 'Advanced', color: '#059669', range: '75-100' };
  if (score >= 50) return { level: 'B2', label: 'Upper Intermediate', color: '#0066CC', range: '50-74' };
  if (score >= 25) return { level: 'B1', label: 'Intermediate', color: '#FF8C42', range: '25-49' };
  if (score >= 15) return { level: 'A2', label: 'Elementary', color: '#F59E0B', range: '15-24' };
  return { level: 'A1', label: 'Beginner', color: '#DC2626', range: '0-14' };
};

const READING_TIME = 3600;
const LISTENING_TIME = 1800;
const WARNING_TIME = 300;

// ===== MODERN DROPDOWN COMPONENT =====
const ModernDropdown = memo(({ examId, setExamId, isOpen, setIsOpen }) => {
  const selectedExam = useMemo(() => EXAM_LIST.find(e => e.id === examId), [examId]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-left font-semibold flex items-center justify-between hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-out"
        style={{ 
          borderColor: isOpen ? COLORS.blue : '#e5e7eb',
          boxShadow: isOpen ? `0 0 0 3px ${COLORS.blue}20` : 'none'
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-slate-900 font-medium">{selectedExam?.title || 'Chọn bài thi'}</span>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-3 bg-white border-2 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm"
          style={{ 
            borderColor: COLORS.blue,
            animation: 'slideDown 0.2s ease-out'
          }}
          role="listbox"
        >
          <div className="max-h-64 overflow-y-auto scrollbar-hide">
            {EXAM_LIST.map((exam, idx) => (
              <button
                key={exam.id}
                onClick={() => {
                  setExamId(exam.id);
                  setIsOpen(false);
                }}
                className="w-full px-5 py-3.5 text-left hover:bg-slate-50 flex items-center justify-between transition-colors duration-150 ease-out border-b border-slate-100 last:border-b-0 group"
                role="option"
                aria-selected={examId === exam.id}
              >
                <div className="flex-1">
                  <span className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{exam.title}</span>
                  <p className="text-xs text-slate-500 mt-0.5">Cập nhật gần đây</p>
                </div>
                {examId === exam.id && (
                  <div className="ml-3 flex-shrink-0 animate-in fade-in duration-200">
                    <CheckCircle className="w-5 h-5" style={{ color: COLORS.blue }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
});

ModernDropdown.displayName = 'ModernDropdown';

// ===== QUESTION CARD =====
const QuestionCard = memo(({ 
  question, 
  questionNum, 
  selectedAnswer, 
  onAnswerSelect, 
  questionKey 
}) => {
  const qText = question?.question || question?.text || '';
  const opts = question?.options || [];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300 ease-out">
      <div className="flex items-start justify-between mb-5">
        <h4 className="text-base font-semibold text-slate-900 flex-1">
          <span className="font-bold" style={{ color: COLORS.blue }}>Q{questionNum}:</span> {qText}
        </h4>
        {selectedAnswer !== undefined && (
          <span 
            className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ml-4 flex-shrink-0 animate-in fade-in duration-300" 
            style={{ backgroundColor: `${COLORS.blue}15`, color: COLORS.blue }}
          >
            <CheckCircle className="w-3.5 h-3.5" /> Done
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {opts.map((opt, i) => {
          const selected = selectedAnswer === i;
          const letter = String.fromCharCode(65 + i);
          
          return (
            <label 
              key={i} 
              className={`flex items-start cursor-pointer p-4 rounded-lg transition-all duration-200 ease-out group ${
                selected 
                  ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
                  : 'bg-slate-50 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              <input
                type="radio"
                name={questionKey}
                checked={selected}
                onChange={() => onAnswerSelect(questionNum, i)}
                className="sr-only"
              />
              <div 
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-200 ${
                  selected 
                    ? 'text-white shadow-md' 
                    : 'text-slate-700 border-2 border-slate-300 group-hover:border-slate-400'
                }`}
                style={{
                  backgroundColor: selected ? COLORS.blue : 'transparent',
                  borderColor: selected ? COLORS.blue : '#d1d5db'
                }}
              >
                {selected ? '✓' : letter}
              </div>
              <span className={`ml-4 text-sm font-medium leading-relaxed transition-colors duration-200 ${
                selected ? 'text-slate-900 font-semibold' : 'text-slate-700 group-hover:text-slate-900'
              }`}>
                {opt}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}, (p, n) => p.selectedAnswer === n.selectedAnswer && p.questionNum === n.questionNum);

QuestionCard.displayName = 'QuestionCard';

// ===== PART NAVIGATION =====
const PartNavigation = memo(({ 
  currentPart, parts, answers, currentSection, questionsPerPart, onPartChange 
}) => {
  const partStats = useMemo(() => {
    const stats = {};
    for (let i = 1; i <= parts; i++) {
      const partNum = currentSection === 'listening' ? i : i + 4;
      const count = Object.keys(answers).filter(key => key.startsWith(`${currentSection}-part${partNum}-`)).length;
      stats[partNum] = count;
    }
    return stats;
  }, [answers, currentSection, parts]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-5">Part Navigation</p>
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: parts }, (_, i) => {
          const partNum = currentSection === 'listening' ? i + 1 : i + 5;
          const answered = partStats[partNum] || 0;
          const isCurrent = currentPart === partNum;
          const isComplete = answered === questionsPerPart;
          
          return (
            <button
              key={partNum}
              onClick={() => onPartChange(partNum)}
              className={`py-4 px-3 rounded-lg font-bold text-sm transition-all duration-200 ease-out border-2 text-center hover:shadow-md active:scale-95 ${
                isCurrent 
                  ? 'text-white border-blue-600 shadow-lg scale-100' 
                  : isComplete 
                  ? 'text-white border-blue-600 opacity-80' 
                  : 'text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
              style={{
                backgroundColor: isCurrent || isComplete ? COLORS.blue : COLORS.white,
              }}
            >
              <div className="font-bold">P{partNum}</div>
              <div className="text-xs opacity-75 mt-1">{answered}/{questionsPerPart}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}, (p, n) => p.currentPart === n.currentPart && Object.keys(p.answers).length === Object.keys(n.answers).length);

PartNavigation.displayName = 'PartNavigation';

// ===== ANSWER REVIEW =====
const SimpleAnswerReview = memo(({ examData, answers, sectionType, startPart, endPart }) => {
  const [expandedParts, setExpandedParts] = useState(new Set([startPart]));

  const reviewData = useMemo(() => {
    const data = [];
    for (let part = startPart; part <= endPart; part++) {
      const partData = examData?.parts?.[`part${part}`];
      if (!partData?.questions) continue;
      partData.questions.forEach((q, i) => {
        const key = `${sectionType}-part${part}-q${i + 1}`;
        data.push({
          partNum: part,
          qNum: i + 1,
          q,
          userAns: answers[key],
          correct: answers[key] === q.correct,
          key
        });
      });
    }
    return data;
  }, [examData, answers, sectionType, startPart, endPart]);

  const togglePart = useCallback((partNum) => {
    setExpandedParts(p => {
      const n = new Set(p);
      n.has(partNum) ? n.delete(partNum) : n.add(partNum);
      return n;
    });
  }, []);

  const parts = useMemo(() => [...new Set(reviewData.map(d => d.partNum))], [reviewData]);

  return (
    <div className="space-y-3">
      {parts.map(part => {
        const partItems = reviewData.filter(d => d.partNum === part);
        const correct = partItems.filter(d => d.correct).length;
        const isOpen = expandedParts.has(part);

        return (
          <div key={part} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <button
              onClick={() => togglePart(part)}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 ease-out"
            >
              <span className="font-semibold text-slate-900">
                Part {part} <span className="text-sm font-normal text-slate-600">({correct}/{partItems.length} correct)</span>
              </span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
              <div className="p-5 space-y-3 bg-slate-50 border-t border-slate-200 animate-in fade-in duration-200">
                {partItems.map((item) => (
                  <div key={item.key} className={`p-4 rounded-lg border-l-4 transition-colors duration-200 ${
                    item.correct 
                      ? 'bg-emerald-50 border-l-emerald-500' 
                      : 'bg-rose-50 border-l-rose-500'
                  }`}>
                    <p className="font-medium text-sm text-slate-900 mb-2">Q{item.qNum}: {item.q.question}</p>
                    <div className="space-y-1 text-xs">
                      <p className={item.correct ? 'text-emerald-700' : 'text-rose-700'}>
                        <span className="font-semibold">Your answer:</span> {item.userAns !== undefined ? String.fromCharCode(65 + item.userAns) + '. ' + item.q.options[item.userAns] : '(Not answered)'}
                      </p>
                      {!item.correct && (
                        <p className="text-emerald-700 font-semibold">
                          <span className="font-semibold">Correct:</span> {String.fromCharCode(65 + item.q.correct)}. {item.q.options[item.q.correct]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

SimpleAnswerReview.displayName = 'SimpleAnswerReview';

// ===== MAIN COMPONENT =====
const FullExamMode = ({ onComplete }) => {
  const { saveProgress, currentUser, loading: progressLoading } = useUserProgress();
  const [mode, setMode] = useState('setup');
  const [section, setSection] = useState('listening');
  const [part, setPart] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [examId, setExamId] = useState('exam1');
  const [saved, setSaved] = useState(false);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const cfg = EXAM_STRUCTURE[section];

  const fmt = useCallback((sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleAns = useCallback((qNum, opt) => {
    const key = `${section}-part${part}-q${qNum}`;
    setAnswers(p => ({ ...p, [key]: opt }));
  }, [section, part]);

  const nextSec = useCallback(() => {
    if (section === 'listening') {
      setSection('reading');
      setPart(5);
      setTimeLeft(READING_TIME);
    } else {
      setMode('results');
    }
  }, [section]);

  const calcResults = useCallback(() => {
    const res = {
      listeningByPart: {},
      readingByPart: {},
      listening: { correct: 0, total: 20, points: 0 },
      reading: { correct: 0, total: 40, points: 0 },
      totalScore: 0,
      averageScore: 0,
      cefr: null,
    };

    if (!examData) return res;

    [1,2,3,4].forEach(p => {
      const qs = examData.parts?.[`part${p}`]?.questions || [];
      let cnt = 0;
      qs.forEach((q, i) => {
        if (answers[`listening-part${p}-q${i + 1}`] === q.correct) {
          res.listening.correct++;
          cnt++;
        }
      });
      res.listeningByPart[p] = cnt;
    });

    [5,6,7,8].forEach(p => {
      const qs = examData.parts?.[`part${p}`]?.questions || [];
      let cnt = 0;
      qs.forEach((q, i) => {
        if (answers[`reading-part${p}-q${i + 1}`] === q.correct) {
          res.reading.correct++;
          cnt++;
        }
      });
      res.readingByPart[p - 4] = cnt;
    });

    res.listening.points = res.listening.correct * 5;
    res.reading.points = res.reading.correct * 2.5;
    res.totalScore = res.listening.points + res.reading.points;
    res.averageScore = res.totalScore / 2;
    res.cefr = getCEFRLevel(res.averageScore);

    return res;
  }, [examData, answers]);

  const partData = useMemo(() => examData?.parts?.[`part${part}`] || null, [examData, part]);
  const answeredCount = useMemo(() => Object.keys(answers).filter(k => k.startsWith(`${section}-`)).length, [answers, section]);
  const progress = (answeredCount / cfg.totalQuestions) * 100;

  useEffect(() => {
    if (mode === 'setup') return;
    setLoading(true);
    getExamById(examId).then(data => {
      setExamData(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [examId, mode]);

  useEffect(() => {
    if (mode !== 'exam' || isPaused) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime === WARNING_TIME) setShowWarning(true);
        if (newTime <= 0) {
          if (section === 'listening') {
            setSection('reading');
            setPart(5);
            setTimeLeft(READING_TIME);
          } else {
            setMode('results');
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, isPaused, section]);

  useEffect(() => {
    if (mode === 'exam') {
      setTimeLeft(section === 'listening' ? LISTENING_TIME : READING_TIME);
      setPart(section === 'listening' ? 1 : 5);
      setIsPaused(false);
    }
  }, [mode, section]);

  useEffect(() => {
    if (mode !== 'results' || !currentUser || saved || progressLoading) return;
    
    const results = calcResults();
    
    saveProgress({
      exam: examId,
      part: 'full',
      score: results.averageScore,
      answers,
      correctAnswers: results.listening.correct + results.reading.correct,
      listeningScore: results.listening.points,
      readingScore: results.reading.points,
      testType: 'full-exam',
      listeningCorrect: results.listening.correct,
      readingCorrect: results.reading.correct,
      totalQuestions: 60,
      totalScore: results.totalScore,
      cefrLevel: results.cefr.level,
      isDraft: false,
    }).then(() => setSaved(true)).catch(err => console.error('Save failed:', err));
  }, [mode, currentUser, saved, progressLoading, examId]);

  // === SETUP SCREEN ===
  if (mode === 'setup') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f0f9ff' }}>
        {/* Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-10"
            style={{ backgroundColor: COLORS.blue, filter: 'blur(40px)' }}
          />
          <div 
            className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full opacity-10"
            style={{ backgroundColor: COLORS.orange, filter: 'blur(40px)' }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto p-6">
          <div className="text-center mb-12 pt-8">
            <h1 className="text-5xl font-black mb-3" style={{ color: COLORS.darkBlue }}>
              Chuẩn Đầu Ra HUFLIT
            </h1>
            <p className="text-lg font-semibold text-slate-600 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>90 phút</span>
              <span>•</span>
              <span>60 câu hỏi</span>
              <span>•</span>
              <span>Kiểm tra đầy đủ</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-slate-100">
            <div className="h-1.5" style={{ backgroundColor: `linear-gradient(90deg, ${COLORS.blue} 0%, ${COLORS.orange} 100%)` }} />
            
            <div className="p-8">
              {/* Test Info Grid */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { num: '8', label: 'Parts' },
                  { num: '60', label: 'Questions' },
                  { num: '90', label: 'Minutes' },
                  { num: '200', label: 'Max Points' }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-xl border border-slate-200 text-center hover:shadow-lg hover:border-slate-300 transition-all duration-300 ease-out hover:-translate-y-1"
                  >
                    <div className="text-3xl font-black" style={{ color: COLORS.blue }}>{item.num}</div>
                    <p className="text-xs font-semibold text-slate-600 mt-3 uppercase tracking-wide">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Exam Selection */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Chọn Bài Thi</label>
                <ModernDropdown 
                  examId={examId} 
                  setExamId={setExamId} 
                  isOpen={isOpen} 
                  setIsOpen={setIsOpen}
                />
              </div>

              {/* Test Sections */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5">
                  <div className="flex items-center gap-3 mb-4">
                    <Headphones className="w-6 h-6" style={{ color: COLORS.blue }} />
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide">Listening</h3>
                  </div>
                  <div className="space-y-2.5 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      30 phút
                    </p>
                    <p className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      20 câu (5 câu/part)
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Nghe 2 lần
                    </p>
                    <p className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      100 điểm (5 điểm/câu)
                    </p>
                  </div>
                </div>
                <div className="p-6 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-6 h-6" style={{ color: COLORS.blue }} />
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide">Reading</h3>
                  </div>
                  <div className="space-y-2.5 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      60 phút
                    </p>
                    <p className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      40 câu (10 câu/part)
                    </p>
                    <p className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Đọc hiểu
                    </p>
                    <p className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      100 điểm (2.5 điểm/câu)
                    </p>
                  </div>
                </div>
              </div>

              {/* CEFR Levels */}
              <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Award className="w-5 h-5" style={{ color: COLORS.blue }} />
                  Chuẩn CEFR
                </h3>
                <div className="grid grid-cols-5 gap-3 text-sm">
                  {[
                    { level: 'A1', range: '0-14', color: '#DC2626' },
                    { level: 'A2', range: '15-24', color: '#F59E0B' },
                    { level: 'B1', range: '25-49', color: COLORS.orange },
                    { level: 'B2', range: '50-74', color: COLORS.blue },
                    { level: 'C1', range: '75-100', color: '#059669' }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="text-center p-3 rounded-lg border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out"
                      style={{ backgroundColor: item.color + '10' }}
                    >
                      <p className="font-bold" style={{ color: item.color }}>{item.level}</p>
                      <p className="text-xs mt-1" style={{ color: item.color + 'cc' }}>{item.range}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={() => setMode('exam')}
                disabled={!examId || loading}
                className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ease-out hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide flex items-center justify-center gap-3"
                style={{
                  backgroundColor: loading ? '#9ca3af' : '#FF7D00',
                  background: loading 
                    ? '#9ca3af' 
                    : `linear-gradient(135deg, #FF7D00 0%, #E67E00 100%)`,
                }}
              >
                {loading ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    <span>Đang tải...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Bắt đầu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          body {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // === EXAM SCREEN ===
  if (mode === 'exam') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  {section === 'listening' ? (
                    <>
                      <Headphones className="w-5 h-5" style={{ color: COLORS.blue }} />
                      <span>LISTENING</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-5 h-5" style={{ color: COLORS.blue }} />
                      <span>READING</span>
                    </>
                  )}
                </h2>
                <p className="text-xs text-slate-600">Part {part} / {cfg.parts}</p>
              </div>
              <div className="text-right">
                <div 
                  className="text-3xl font-black transition-colors duration-500"
                  style={{ color: timeLeft < 300 ? COLORS.orange : COLORS.blue }}
                >
                  {fmt(timeLeft)}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Tiến độ</span>
                <span>{answeredCount}/{cfg.totalQuestions}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%`, backgroundColor: COLORS.blue }} 
                />
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-5 py-2.5 rounded-lg font-semibold text-white flex items-center gap-2 text-sm transition-all duration-200 ease-out hover:shadow-lg active:scale-95"
                style={{ backgroundColor: COLORS.blue }}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? 'Tiếp tục' : 'Tạm dừng'}
              </button>
            </div>
          </div>
        </div>

        {showWarning && (
          <div className="max-w-6xl mx-auto p-4 mt-4 animate-in fade-in duration-300">
            <div 
              className="p-4 bg-orange-50 border-l-4 rounded-lg shadow-md flex items-center gap-3"
              style={{ borderLeftColor: COLORS.orange }}
            >
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <p className="font-bold text-orange-700">Chỉ còn 5 phút!</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-4 space-y-6 pb-32">
          {/* Content Display */}
          {partData && (
            <ContentDisplay
              partData={partData}
              selectedPart={`part${part}`}
              currentQuestionIndex={0}
              testType={section}
            />
          )}

          {/* Questions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-6 text-slate-900">
              Part {part}: Câu {(part - (section === 'listening' ? 1 : 5)) * cfg.questionsPerPart + 1} - {(part - (section === 'listening' ? 0 : 4)) * cfg.questionsPerPart}
            </h3>
            <div className="space-y-4">
              {partData?.questions?.map((q, i) => (
                <QuestionCard
                  key={`${section}-part${part}-q${i + 1}`}
                  question={q}
                  questionNum={i + 1}
                  selectedAnswer={answers[`${section}-part${part}-q${i + 1}`]}
                  onAnswerSelect={handleAns}
                  questionKey={`${section}-part${part}-q${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Part Navigation */}
          <PartNavigation
            currentPart={part}
            parts={cfg.parts}
            answers={answers}
            currentSection={section}
            questionsPerPart={cfg.questionsPerPart}
            onPartChange={setPart}
          />

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setPart(p => Math.max(section === 'listening' ? 1 : 5, p - 1))}
              disabled={part === (section === 'listening' ? 1 : 5)}
              className="flex-1 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 text-white transition-all duration-200 ease-out hover:shadow-lg active:scale-95"
              style={{ backgroundColor: COLORS.blue }}
            >
              <ChevronLeft className="w-5 h-5" /> 
              <span>Phần trước</span>
            </button>
            <button
              onClick={part === (section === 'listening' ? 4 : 8) ? nextSec : () => setPart(p => p + 1)}
              className="flex-1 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all duration-200 ease-out hover:shadow-lg active:scale-95"
              style={{ backgroundColor: part === (section === 'listening' ? 4 : 8) && section === 'reading' ? '#10B981' : (part === (section === 'listening' ? 4 : 8) ? '#FF7D00' : COLORS.blue) }}
            >
              {part === (section === 'listening' ? 4 : 8) 
                ? (section === 'listening' 
                  ? <>
                      <ArrowRight className="w-5 h-5" /> 
                      <span>Sang Reading</span>
                    </>
                  : <>
                      <Flag className="w-5 h-5" /> 
                      <span>Nộp bài</span>
                    </>
                )
                : <>
                    <span>Tiếp theo</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
              }
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === RESULTS SCREEN ===
  if (mode === 'results') {
    const res = calcResults();
    const percentage = ((res.listening.correct + res.reading.correct) / 60) * 100;

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f0f9ff' }}>
        {/* Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-10"
            style={{ backgroundColor: COLORS.blue, filter: 'blur(40px)' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto p-6">
          {/* Results Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-slate-100">
            <div className="h-1.5" style={{ backgroundColor: `linear-gradient(90deg, ${COLORS.blue} 0%, ${COLORS.orange} 100%)` }} />
            <div className="text-center py-12 px-6 animate-in fade-in duration-500">
              <div className="inline-flex items-center justify-center mb-4">
                <Trophy className="w-16 h-16" style={{ color: COLORS.orange }} />
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-2">Hoàn thành bài thi!</h1>
              <p className="text-slate-600">Chuẩn đầu ra HUFLIT</p>
              {saved && (
                <p className="text-sm text-emerald-600 font-semibold mt-3 animate-in fade-in duration-500 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Kết quả đã được lưu</span>
                </p>
              )}
            </div>
          </div>

          {/* Main Score Card */}
          <div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border-t-4"
            style={{ borderTopColor: res.cefr.color }}
          >
            <div className="p-8 text-center">
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">Điểm trung bình</p>
              <div 
                className="text-6xl font-black text-slate-900 mb-6 animate-in fade-in duration-700"
              >
                {res.averageScore.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center font-black text-white text-2xl mb-3 shadow-lg"
                    style={{ backgroundColor: res.cefr.color }}
                  >
                    {res.cefr.level}
                  </div>
                  <p className="text-lg font-bold text-slate-900">{res.cefr.label}</p>
                  <p className="text-sm text-slate-600">({res.cefr.range})</p>
                </div>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Listening', points: res.listening.points.toFixed(0), correct: res.listening.correct, total: 20, pointPerQ: '5 điểm/câu' },
              { label: 'Reading', points: res.reading.points.toFixed(0), correct: res.reading.correct, total: 40, pointPerQ: '2.5 điểm/câu' },
              { label: 'Tổng điểm', points: res.totalScore.toFixed(0), correct: null, total: 200, pointPerQ: `(Trung bình: ${res.averageScore.toFixed(1)})`, isTotal: true }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 border-t-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
                style={{ borderTopColor: item.isTotal ? COLORS.orange : COLORS.blue }}
              >
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">{item.label}</p>
                <div 
                  className="text-3xl font-black text-slate-900 mb-2"
                  style={{ color: item.isTotal ? COLORS.blue : 'inherit' }}
                >
                  {item.points}
                </div>
                <p className="text-sm text-slate-600">
                  {item.correct !== null ? `${item.correct}/${item.total} câu` : `/${item.total} điểm`}
                </p>
                <p className="text-xs text-slate-500 mt-2">({item.pointPerQ})</p>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
            <p className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Tỷ lệ câu đúng</p>
            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full transition-all duration-1000 ease-out" 
                style={{ width: `${percentage}%`, backgroundColor: COLORS.blue }} 
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600">{percentage.toFixed(0)}%</span>
              <span className="text-sm font-semibold text-slate-600">{res.listening.correct + res.reading.correct}/60 câu</span>
            </div>
          </div>

          {/* Detailed Reviews */}
          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-transparent flex items-center gap-3">
                <TrendingUp className="w-5 h-5" style={{ color: COLORS.blue }} />
                <h3 className="font-bold text-lg text-slate-900">Chi tiết Listening</h3>
              </div>
              <div className="p-6">
                <SimpleAnswerReview examData={examData} answers={answers} sectionType="listening" startPart={1} endPart={4} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-transparent flex items-center gap-3">
                <TrendingUp className="w-5 h-5" style={{ color: COLORS.blue }} />
                <h3 className="font-bold text-lg text-slate-900">Chi tiết Reading</h3>
              </div>
              <div className="p-6">
                <SimpleAnswerReview examData={examData} answers={answers} sectionType="reading" startPart={5} endPart={8} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setMode('setup');
                setAnswers({});
                setSection('listening');
                setPart(1);
                setSaved(false);
              }}
              className="flex-1 py-4 rounded-xl font-bold text-white transition-all duration-200 ease-out hover:shadow-lg active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2"
              style={{ backgroundColor: COLORS.blue, background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.darkBlue} 100%)` }}
            >
              <RotateCcw className="w-5 h-5" />
              <span>Làm lại</span>
            </button>
            <button
              onClick={() => {
                setMode('setup');
                setAnswers({});
                setSection('listening');
                setPart(1);
                setSaved(false);
                onComplete?.();
              }}
              className="flex-1 py-4 rounded-xl font-bold text-slate-900 bg-white border-2 border-slate-300 transition-all duration-200 ease-out hover:bg-slate-50 hover:shadow-lg active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </button>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-in {
            animation: fadeIn 0.4s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export default FullExamMode;
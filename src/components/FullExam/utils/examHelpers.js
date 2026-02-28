/* src/components/FullExam/utils/examHelpers.js */

import { EXAM_STRUCTURE } from '../constants/examConfig';
import { generateAnswerKey } from './answerKey'; // ✅ FIX: import key helper

/**
 * Format seconds to MM:SS display
 */
export const formatTime = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get configuration for a section
 */
export const getExamConfig = (section) => {
  return EXAM_STRUCTURE[section] || null;
};

/**
 * Calculate results for a section
 *
 * FIX: Trước đây dùng `${section}-part${p}-q${idx+1}` → không match với
 * generateAnswerKey() tạo ra "listening-p1-q1".
 * Giờ dùng generateAnswerKey() làm single source of truth.
 */
export const calculateSectionResults = (examData, answers, section) => {
  if (!examData?.parts) {
    return { correct: 0, points: 0, percentage: 0, totalQuestions: 0 };
  }

  const cfg = EXAM_STRUCTURE[section];
  if (!cfg) return { correct: 0, points: 0, percentage: 0, totalQuestions: 0 };

  // Reading: absolute part numbers là 5-8, listening: 1-4
  const startPart = section === 'reading' ? 5 : 1;

  let correct = 0;
  let totalAnswered = 0;

  for (let i = 0; i < cfg.parts; i++) {
    const absolutePart = startPart + i;       // 1-4 (listening) hoặc 5-8 (reading)
    const partKey = `part${absolutePart}`;    // key trong examData.parts
    const part = examData.parts[partKey];

    if (!part?.questions) continue;

    part.questions.forEach((q, idx) => {
      // ✅ FIX: dùng generateAnswerKey với absolute part number
      const answerKey = generateAnswerKey({
        section,
        part: absolutePart,
        question: idx + 1,
      });

      const userAnswer = answers[answerKey];

      if (userAnswer !== undefined) {
        totalAnswered++;
        if (userAnswer === q.correct) {
          correct++;
        }
      }
    });
  }

  const points = correct * cfg.pointsPerQuestion;
  const percentage = (correct / cfg.totalQuestions) * 100;

  return {
    correct,
    points,
    percentage,
    totalAnswered,
    totalQuestions: cfg.totalQuestions,
  };
};

/**
 * Calculate full exam results (listening + reading)
 */
export const calculateFullResults = (examData, answers) => {
  const listening = calculateSectionResults(examData, answers, 'listening');
  const reading = calculateSectionResults(examData, answers, 'reading');

  const totalCorrect = listening.correct + reading.correct;
  const totalQuestions = listening.totalQuestions + reading.totalQuestions;
  const averageScore = totalQuestions > 0
    ? ((totalCorrect / totalQuestions) * 100).toFixed(1)
    : '0.0';

  return {
    listening,
    reading,
    totalCorrect,
    totalQuestions,
    averageScore,
    cefr: getCEFRLevel(averageScore),
  };
};

/**
 * Get CEFR level from score
 */
export const getCEFRLevel = (score) => {
  const numScore = typeof score === 'string' ? parseFloat(score) : score;

  if (numScore >= 75) return { level: 'C1', label: 'Advanced',            color: '#059669', range: '75-100', description: 'Excellent proficiency' };
  if (numScore >= 50) return { level: 'B2', label: 'Upper Intermediate',  color: '#0066CC', range: '50-74',  description: 'Good proficiency' };
  if (numScore >= 25) return { level: 'B1', label: 'Intermediate',        color: '#FF8C42', range: '25-49',  description: 'Basic proficiency' };
  if (numScore >= 15) return { level: 'A2', label: 'Elementary',          color: '#F59E0B', range: '15-24',  description: 'Limited proficiency' };
  return               { level: 'A1', label: 'Beginner',             color: '#DC2626', range: '0-14',   description: 'Very limited proficiency' };
};

/**
 * Count unanswered questions in a section
 *
 * FIX: Dùng generateAnswerKey thay vì hardcode format
 */
export const countUnansweredQuestions = (examData, answers, section) => {
  if (!examData?.parts) return 0;

  const cfg = EXAM_STRUCTURE[section];
  if (!cfg) return 0;

  const startPart = section === 'reading' ? 5 : 1;
  let unanswered = 0;

  for (let i = 0; i < cfg.parts; i++) {
    const absolutePart = startPart + i;
    const partKey = `part${absolutePart}`;
    const part = examData.parts[partKey];

    if (!part?.questions) continue;

    part.questions.forEach((_, idx) => {
      // ✅ FIX: dùng generateAnswerKey
      const answerKey = generateAnswerKey({
        section,
        part: absolutePart,
        question: idx + 1,
      });
      if (answers[answerKey] === undefined) unanswered++;
    });
  }

  return unanswered;
};

/**
 * Count total unanswered across all sections
 */
export const countTotalUnansweredQuestions = (examData, answers) => {
  return (
    countUnansweredQuestions(examData, answers, 'listening') +
    countUnansweredQuestions(examData, answers, 'reading')
  );
};

/**
 * Get results breakdown by part
 *
 * FIX: Dùng generateAnswerKey thay vì hardcode format
 */
export const getResultsByPart = (examData, answers) => {
  const results = {
    listeningByPart: {},
    readingByPart: {},
  };

  // Listening: absolute parts 1-4
  for (let p = 1; p <= 4; p++) {
    const part = examData.parts[`part${p}`];
    let correct = 0;
    if (part?.questions) {
      part.questions.forEach((q, idx) => {
        // ✅ FIX
        const key = generateAnswerKey({ section: 'listening', part: p, question: idx + 1 });
        if (answers[key] === q.correct) correct++;
      });
    }
    results.listeningByPart[p] = correct;
  }

  // Reading: absolute parts 5-8 → relative 1-4
  for (let p = 5; p <= 8; p++) {
    const part = examData.parts[`part${p}`];
    let correct = 0;
    if (part?.questions) {
      part.questions.forEach((q, idx) => {
        // ✅ FIX: absolute part number (5-8)
        const key = generateAnswerKey({ section: 'reading', part: p, question: idx + 1 });
        if (answers[key] === q.correct) correct++;
      });
    }
    results.readingByPart[p - 4] = correct; // store as relative 1-4
  }

  return results;
};

/**
 * Check if an answer is correct
 */
export const isAnswerCorrect = (question, selectedAnswerIndex) => {
  if (!question || selectedAnswerIndex === undefined) return false;
  return selectedAnswerIndex === question.correct;
};

/**
 * Calculate percentage safely
 */
export const calculatePercentage = (correct, total) => {
  if (!total || total === 0) return 0;
  return (correct / total) * 100;
};
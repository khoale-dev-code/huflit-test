/* src/components/FullExam/utils/examHelpers.js */

import { EXAM_STRUCTURE } from '../constants/examConfig';

/**
 * Format seconds to MM:SS display
 * @param {number} seconds - Total seconds
 * @returns {string} "MM:SS" format
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
 * @param {Object} examData - Exam data with parts and questions
 * @param {Object} answers - User answers { "listening-part1-q1": 0, ... }
 * @param {string} section - "listening" or "reading"
 * @returns {Object} { correct, points, percentage }
 */
export const calculateSectionResults = (examData, answers, section) => {
  if (!examData?.parts) {
    return { correct: 0, points: 0, percentage: 0, totalQuestions: 0 };
  }

  const cfg = EXAM_STRUCTURE[section];
  if (!cfg) return { correct: 0, points: 0, percentage: 0, totalQuestions: 0 };

  let correct = 0;
  let totalAnswered = 0;

  for (let p = 1; p <= cfg.parts; p++) {
    const partKey = `part${p}`;
    const part = examData.parts[partKey];

    if (!part?.questions) continue;

    part.questions.forEach((q, idx) => {
      const answerKey = `${section}-part${p}-q${idx + 1}`;
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

  return { correct, points, percentage, totalAnswered, totalQuestions: cfg.totalQuestions };
};

/**
 * Calculate full exam results
 */
export const calculateFullResults = (examData, answers) => {
  const listening = calculateSectionResults(examData, answers, 'listening');
  const reading = calculateSectionResults(examData, answers, 'reading');

  const totalCorrect = listening.correct + reading.correct;
  const totalQuestions = listening.totalQuestions + reading.totalQuestions;
  const averageScore = ((totalCorrect / totalQuestions) * 100).toFixed(1);

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
 * CEFR: Common European Framework of Reference
 */
export const getCEFRLevel = (score) => {
  const numScore = typeof score === 'string' ? parseFloat(score) : score;

  if (numScore >= 75) {
    return {
      level: 'C1',
      label: 'Advanced',
      color: '#059669',
      range: '75-100',
      description: 'Excellent proficiency',
    };
  }
  if (numScore >= 50) {
    return {
      level: 'B2',
      label: 'Upper Intermediate',
      color: '#0066CC',
      range: '50-74',
      description: 'Good proficiency',
    };
  }
  if (numScore >= 25) {
    return {
      level: 'B1',
      label: 'Intermediate',
      color: '#FF8C42',
      range: '25-49',
      description: 'Basic proficiency',
    };
  }
  if (numScore >= 15) {
    return {
      level: 'A2',
      label: 'Elementary',
      color: '#F59E0B',
      range: '15-24',
      description: 'Limited proficiency',
    };
  }
  
  return {
    level: 'A1',
    label: 'Beginner',
    color: '#DC2626',
    range: '0-14',
    description: 'Very limited proficiency',
  };
};

/**
 * Count unanswered questions in a section
 */
export const countUnansweredQuestions = (examData, answers, section) => {
  if (!examData?.parts) return 0;

  const cfg = EXAM_STRUCTURE[section];
  if (!cfg) return 0;

  let unanswered = 0;

  for (let p = 1; p <= cfg.parts; p++) {
    const partKey = `part${p}`;
    const part = examData.parts[partKey];

    if (!part?.questions) continue;

    part.questions.forEach((_, idx) => {
      const answerKey = `${section}-part${p}-q${idx + 1}`;
      if (answers[answerKey] === undefined) {
        unanswered++;
      }
    });
  }

  return unanswered;
};

/**
 * Count total unanswered questions across all sections
 */
export const countTotalUnansweredQuestions = (examData, answers) => {
  const listeningUnanswered = countUnansweredQuestions(examData, answers, 'listening');
  const readingUnanswered = countUnansweredQuestions(examData, answers, 'reading');
  return listeningUnanswered + readingUnanswered;
};

/**
 * Get results breakdown by part
 */
export const getResultsByPart = (examData, answers) => {
  const results = {
    listeningByPart: {},
    readingByPart: {},
  };

  // Listening parts (1-4)
  for (let p = 1; p <= 4; p++) {
    const partKey = `part${p}`;
    const part = examData.parts[partKey];
    let correct = 0;

    if (part?.questions) {
      part.questions.forEach((q, idx) => {
        const answerKey = `listening-part${p}-q${idx + 1}`;
        if (answers[answerKey] === q.correct) {
          correct++;
        }
      });
    }

    results.listeningByPart[p] = correct;
  }

  // Reading parts (5-8)
  for (let p = 5; p <= 8; p++) {
    const partKey = `part${p}`;
    const part = examData.parts[partKey];
    let correct = 0;

    if (part?.questions) {
      part.questions.forEach((q, idx) => {
        const readingPart = p - 4;
        const answerKey = `reading-part${readingPart}-q${idx + 1}`;
        if (answers[answerKey] === q.correct) {
          correct++;
        }
      });
    }

    results.readingByPart[p - 4] = correct;
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
 * Calculate percentage
 */
export const calculatePercentage = (correct, total) => {
  if (total === 0) return 0;
  return (correct / total) * 100;
};
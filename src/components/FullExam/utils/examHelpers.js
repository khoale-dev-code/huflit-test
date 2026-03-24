import { generateAnswerKey } from './answerKey';

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
 * Tính kết quả Động (Dynamic) không phụ thuộc vào thứ tự Part cứng
 */
export const calculateSectionResults = (examData, answers, sectionType) => {
  if (!examData?.parts) return { correct: 0, points: 0, percentage: 0, totalQuestions: 0 };

  const partsArr = Array.isArray(examData.parts) 
    ? examData.parts 
    : Object.entries(examData.parts).map(([k, v]) => ({ ...v, id: k }));

  const sectionParts = partsArr.filter(p => p.type === sectionType);
  
  let correct = 0;
  let totalAnswered = 0;
  let totalQuestions = 0;

  sectionParts.forEach((part) => {
    if (!part?.questions) return;

    part.questions.forEach((q, idx) => {
      totalQuestions++;
      // ✅ Sinh key dựa vào đúng ID của Part đó thay vì số thứ tự ảo
      const answerKey = generateAnswerKey({
        section: sectionType,
        part: part.id,
        question: idx + 1,
      });

      const userAnswer = answers[answerKey];

      if (userAnswer !== undefined) {
        totalAnswered++;
        // Ép kiểu String để so sánh an toàn
        if (String(userAnswer) === String(q.correct)) {
          correct++;
        }
      }
    });
  });

  const percentage = totalQuestions > 0 ? (correct / totalQuestions) * 100 : 0;

  return {
    correct,
    percentage,
    totalAnswered,
    totalQuestions,
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

  if (numScore >= 75) return { level: 'C1', label: 'Advanced',           color: '#059669', range: '75-100', description: 'Excellent proficiency' };
  if (numScore >= 50) return { level: 'B2', label: 'Upper Intermediate',  color: '#0066CC', range: '50-74',  description: 'Good proficiency' };
  if (numScore >= 25) return { level: 'B1', label: 'Intermediate',        color: '#FF8C42', range: '25-49',  description: 'Basic proficiency' };
  if (numScore >= 15) return { level: 'A2', label: 'Elementary',          color: '#F59E0B', range: '15-24',  description: 'Limited proficiency' };
  return               { level: 'A1', label: 'Beginner',             color: '#DC2626', range: '0-14',   description: 'Very limited proficiency' };
};

/**
 * Đếm số câu chưa làm Động
 */
export const countUnansweredQuestions = (examData, answers, sectionType) => {
  if (!examData?.parts) return 0;
  
  const partsArr = Array.isArray(examData.parts) 
    ? examData.parts 
    : Object.entries(examData.parts).map(([k, v]) => ({ ...v, id: k }));

  const sectionParts = partsArr.filter(p => p.type === sectionType);
  let unanswered = 0;

  sectionParts.forEach((part) => {
    if (!part?.questions) return;

    part.questions.forEach((_, idx) => {
      const answerKey = generateAnswerKey({
        section: sectionType,
        part: part.id,
        question: idx + 1,
      });
      if (answers[answerKey] === undefined) unanswered++;
    });
  });

  return unanswered;
};
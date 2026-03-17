import { useMemo } from 'react';

export function useSkillAnalytics(allValidQuestions, answers) {
  return useMemo(() => {
    if (!allValidQuestions?.length) return {};

    return allValidQuestions.reduce((acc, q) => {
      // Nhóm kỹ năng, nếu DB thiếu thì gán default
      const cat = q.category || 'General Skills';
      
      if (!acc[cat]) acc[cat] = { correct: 0, total: 0 };
      
      acc[cat].total += 1;
      
      // FIX: Ép kiểu String để so sánh an toàn
      const userAnswer = answers[q.id];
      if (userAnswer !== undefined && String(userAnswer) === String(q.correct)) {
        acc[cat].correct += 1;
      }
      
      return acc;
    }, {});
  }, [allValidQuestions, answers]);
}

export default useSkillAnalytics;
import { useMemo } from 'react';

/**
 * Hook tính toán phân tích kỹ năng theo category
 *
 * @param {object} partData - Dữ liệu đề thi (có `questions` array)
 * @param {object} answers  - Map { questionId: selectedOptionIndex }
 * @returns {object} Map { categoryName: { correct, total } }
 *
 * @example
 * const analytics = useSkillAnalytics(partData, answers);
 * // { "Grammar": { correct: 3, total: 5 }, "Vocabulary": { correct: 2, total: 3 } }
 */
export function useSkillAnalytics(partData, answers) {
  return useMemo(() => {
    if (!partData?.questions?.length) return {};

    return partData.questions.reduce((acc, q) => {
      const cat = q.category || 'General Skills';
      if (!acc[cat]) acc[cat] = { correct: 0, total: 0 };
      acc[cat].total += 1;
      if (answers[q.id] === q.correct) acc[cat].correct += 1;
      return acc;
    }, {});
  }, [partData, answers]);
}

export default useSkillAnalytics;
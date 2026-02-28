import { useMemo } from 'react';

/**
 * Các filter type hợp lệ
 */
export const FILTER_TYPES = {
  ALL: 'all',
  WRONG: 'wrong',
};

/**
 * Hook filter danh sách câu hỏi theo kết quả
 *
 * @param {object} partData   - Dữ liệu đề (có `questions`)
 * @param {object} answers    - Map { questionId: selectedOptionIndex }
 * @param {string} filterType - 'all' | 'wrong'
 * @returns {Array} Danh sách câu hỏi đã filter
 */
export function useFilteredQuestions(partData, answers, filterType) {
  return useMemo(() => {
    const questions = partData?.questions ?? [];
    if (filterType === FILTER_TYPES.WRONG) {
      return questions.filter((q) => answers[q.id] !== q.correct);
    }
    return questions;
  }, [partData, answers, filterType]);
}

export default useFilteredQuestions;
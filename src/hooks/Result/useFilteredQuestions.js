import { useMemo } from 'react';

export const FILTER_TYPES = {
  ALL: 'all',
  WRONG: 'wrong',
};

/**
 * Kiểm tra một câu hỏi có "sai" không (bao gồm chưa làm/bỏ qua)
 */
function isWrong(q, answers) {
  if (q.isExample) return false;
  
  const ua = answers[q.id];
  
  // FIX: Nếu chưa làm (null/undefined) => Tính là sai
  if (ua === undefined || ua === null) return true;
  
  // FIX: Ép kiểu String để so sánh an toàn
  return String(ua) !== String(q.correct);
}

export function useFilteredQuestions(partData, answers, filterType) {
  return useMemo(() => {
    const questions = partData?.questions ?? [];

    if (filterType === FILTER_TYPES.ALL) return questions;

    const result = [];

    questions.forEach((q) => {
      if (q.type === 'group') {
        const wrongSubs = (q.subQuestions ?? []).filter(
          (sq) => !sq.isExample && isWrong(sq, answers)
        );
        // Chỉ push group nếu có ít nhất 1 câu con sai
        if (wrongSubs.length > 0) {
          result.push({ ...q, subQuestions: wrongSubs });
        }
      } else {
        if (!q.isExample && isWrong(q, answers)) {
          result.push(q);
        }
      }
    });

    return result;
  }, [partData, answers, filterType]);
}

export default useFilteredQuestions;
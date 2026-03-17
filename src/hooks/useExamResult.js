import { useMemo } from 'react';
import { calculateToeicScore } from '../utils/gradeUtils';

// ─────────────────────────────────────────────────────────────
// CẢI THIỆN 1: Dùng flatMap kết hợp filter giúp code ngắn gọn, 
// mang đậm phong cách Functional Programming.
// ─────────────────────────────────────────────────────────────
export function flattenValidQuestions(partData) {
  return (partData?.questions ?? []).flatMap((q) => {
    if (q.type === 'group') {
      return (q.subQuestions ?? []).filter((sq) => !sq.isExample);
    }
    return !q.isExample ? [q] : [];
  });
}

// ─────────────────────────────────────────────────────────────
// CẢI THIỆN 2: Xử lý triệt để hơn cho bài Full Test.
// ─────────────────────────────────────────────────────────────
function buildConvertedScore(partData, allValidQuestions, answers, examCategory) {
  const cat = (examCategory ?? '').toLowerCase();
  if (!cat.includes('toeic')) return null;

  const section = (partData?.toeicSection ?? partData?.type ?? '').toLowerCase();

  let listeningCorrect = 0;
  let readingCorrect = 0;

  if (section === 'listening') {
    listeningCorrect = allValidQuestions.filter(q => String(answers[q.id]) === String(q.correct)).length;
  } else if (section === 'reading') {
    readingCorrect = allValidQuestions.filter(q => String(answers[q.id]) === String(q.correct)).length;
  } else {
    // Nếu là Full Test, ta đếm riêng số câu đúng của Nghe và Đọc 
    // dựa vào thuộc tính 'type' hoặc 'section' của từng câu hỏi (nếu DB của bạn có lưu).
    // Giả sử DB của bạn có lưu q.skill = 'listening' hoặc 'reading'
    allValidQuestions.forEach(q => {
      const isCorrect = String(answers[q.id]) === String(q.correct);
      if (isCorrect) {
        // Phân loại câu hỏi. Nếu DB chưa có trường này, bạn cần thiết kế thêm 
        // để phân biệt câu nào của kĩ năng nào trong 1 bài Full Test.
        const isListeningQuestion = q.skill === 'listening' || ['part1', 'part2', 'part3', 'part4'].includes(q.partId);
        if (isListeningQuestion) listeningCorrect++;
        else readingCorrect++;
      }
    });

    if (listeningCorrect === 0 && readingCorrect === 0) {
      console.warn('[useExamResult] Fallback TOEIC: Không phân biệt được skill của câu hỏi. Cần bổ sung phân loại trong DB.');
    }
  }

  return calculateToeicScore(listeningCorrect, readingCorrect);
}

// ─────────────────────────────────────────────────────────────
// useExamResult — hook chính
// ─────────────────────────────────────────────────────────────
export function useExamResult(partData, answers, examCategory) {
  
  const allValidQuestions = useMemo(
    () => flattenValidQuestions(partData),
    [partData]
  );

  const scoreResult = useMemo(() => {
    const total = allValidQuestions.length;
    if (total === 0) return { correct: 0, total: 0, percentage: 0 };

    const correct = allValidQuestions.filter(
      // CẢI THIỆN 3: Ép kiểu an toàn (String) để tránh lỗi so sánh 1 !== '1'
      (q) => String(answers[q.id]) === String(q.correct)
    ).length;
    
    // CẢI THIỆN 4: Làm tròn percentage ngay từ trong logic
    const percentage = Math.round((correct / total) * 100);
    
    return { correct, total, percentage };
  }, [allValidQuestions, answers]);

  const convertedScore = useMemo(
    // Truyền toàn bộ list câu hỏi và câu trả lời vào để phân tích sâu hơn
    () => buildConvertedScore(partData, allValidQuestions, answers, examCategory),
    [partData, allValidQuestions, answers, examCategory]
  );

  return { scoreResult, convertedScore, allValidQuestions };
}

export default useExamResult;
// src/components/FullExam/utils/answerKey.js
//
// NGUỒN SỰ THẬT DUY NHẤT cho answer key format.
// Tất cả file đều import từ đây — không tự tạo key ở bất kỳ chỗ nào khác.
//
// Format:
//   Câu đơn lẻ : "{section}-{partId}-q{questionArrayIndex+1}"
//   Câu trong group: "{section}-{partId}-{groupId}-sub{subQuestionArrayIndex+1}"

/**
 * Tạo key cho câu đơn lẻ
 * @param {string} section  - 'listening' | 'reading'
 * @param {string} partId   - part.id
 * @param {number} qIdx     - index trong mảng questions (0-based)
 */
export function makeStandaloneKey(section, partId, qIdx) {
  return `${section}-${partId}-q${qIdx + 1}`;
}

/**
 * Tạo key cho câu trong group (subQuestion)
 * @param {string} section  - 'listening' | 'reading'
 * @param {string} partId   - part.id
 * @param {string} groupId  - group.id
 * @param {number} subIdx   - index trong mảng subQuestions (0-based)
 */
export function makeGroupKey(section, partId, groupId, subIdx) {
  return `${section}-${partId}-${groupId}-sub${subIdx + 1}`;
}

/**
 * Legacy wrapper — giữ tương thích với code cũ gọi generateAnswerKey({...})
 * @deprecated Dùng makeStandaloneKey / makeGroupKey trực tiếp
 */
export function generateAnswerKey({ section, part, question, groupId, subIdx }) {
  if (groupId !== undefined && subIdx !== undefined) {
    return makeGroupKey(section, part, groupId, subIdx);
  }
  // question ở đây là qIdx (0-based) hoặc string "q3"
  if (typeof question === 'string' && question.startsWith('q')) {
    return `${section}-${part}-${question}`;
  }
  return makeStandaloneKey(section, part, question);
}
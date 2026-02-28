// ============================================================
// src/components/FullExam/utils/answerKey.js
//
// FIX: Chuẩn hóa key format một chỗ duy nhất.
// Format: "listening-p1-q1" / "reading-p5-q1"
//
// LƯU Ý QUAN TRỌNG cho reading:
// - part truyền vào là ABSOLUTE part number (5,6,7,8)
// - KHÔNG phải relative index (1,2,3,4)
// ============================================================

/**
 * Tạo answer key chuẩn hóa.
 * @param {object} params
 * @param {string} params.section  - 'listening' | 'reading'
 * @param {number} params.part     - absolute part number (1-4 for listening, 5-8 for reading)
 * @param {number} params.question - question number within part (1-based)
 * @returns {string} e.g. "listening-p1-q1", "reading-p5-q3"
 */
export const generateAnswerKey = ({ section, part, question }) => {
  return `${section}-p${part}-q${question}`;
};

/**
 * Parse an answer key back to its components.
 * @param {string} key
 * @returns {{ section: string, part: number, question: number } | null}
 */
export const parseAnswerKey = (key) => {
  const match = key?.match(/^(listening|reading)-p(\d+)-q(\d+)$/);
  if (!match) return null;
  return {
    section:  match[1],
    part:     parseInt(match[2], 10),
    question: parseInt(match[3], 10),
  };
};

/**
 * Lấy tất cả answers của một section cụ thể.
 * @param {object} answers - toàn bộ answers object
 * @param {string} section - 'listening' | 'reading'
 * @returns {object} filtered answers
 */
export const getAnswersBySection = (answers, section) => {
  return Object.fromEntries(
    Object.entries(answers).filter(([key]) => key.startsWith(`${section}-`))
  );
};
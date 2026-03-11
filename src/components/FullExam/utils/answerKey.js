// ============================================================
// src/components/FullExam/utils/answerKey.js
//
// FIX TỐI THƯỢNG: Hỗ trợ ID động (UUID/String) của Supabase
// Format chuẩn mới: "listening-part_123abc-q1" 
// ============================================================

/**
 * Tạo answer key chuẩn hóa hỗ trợ ID chuỗi.
 * @param {object} params
 * @param {string} params.section  - 'listening' | 'reading'
 * @param {string|number} params.part - ID của part (từ Supabase) hoặc số
 * @param {number} params.question - question number
 * @returns {string} e.g. "listening-part_1739...-q1"
 */
export const generateAnswerKey = ({ section, part, question }) => {
  // Đã bỏ chữ "p" cứng, dùng thẳng part ID
  return `${section}-${part}-q${question}`;
};

/**
 * Parse an answer key back to its components.
 * @param {string} key
 * @returns {{ section: string, part: string, question: number } | null}
 */
export const parseAnswerKey = (key) => {
  // Đã thay (\d+) thành (.+) để có thể đọc được chuỗi UUID/chữ cái
  const match = key?.match(/^(listening|reading)-(.+)-q(\d+)$/);
  
  if (!match) return null;
  
  return {
    section:  match[1],
    part:     match[2], // Không dùng parseInt nữa vì đây là chuỗi ID
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
  if (!answers) return {};
  return Object.fromEntries(
    Object.entries(answers).filter(([key]) => key.startsWith(`${section}-`))
  );
};
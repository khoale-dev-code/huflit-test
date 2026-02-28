// ============================================
// 📊 GRADE UTILITIES
// Constants & helper functions for scoring logic
// ============================================

export const SCORE_THRESHOLDS = {
  PASS: 70,
  GOOD: 80,
  EXCELLENT: 90,
};

export const GRADE_CONFIG = {
  EXCELLENT: {
    label: 'Xuất sắc',
    badge: 'A+',
    color: 'from-emerald-500 to-teal-400',
    textColor: 'text-emerald-600',
  },
  GOOD: {
    label: 'Giỏi',
    badge: 'A',
    color: 'from-blue-600 to-indigo-500',
    textColor: 'text-blue-600',
  },
  PASS: {
    label: 'Khá',
    badge: 'B',
    color: 'from-orange-500 to-amber-400',
    textColor: 'text-orange-500',
  },
  FAIL: {
    label: 'Cần cố gắng',
    badge: 'C',
    color: 'from-rose-500 to-pink-400',
    textColor: 'text-rose-500',
  },
};

/**
 * Lấy thông tin xếp loại dựa trên phần trăm điểm
 * @param {number} percentage - Điểm phần trăm (0-100)
 * @returns {object} Grade config object
 */
export function getGrade(percentage) {
  if (percentage >= SCORE_THRESHOLDS.EXCELLENT) return GRADE_CONFIG.EXCELLENT;
  if (percentage >= SCORE_THRESHOLDS.GOOD) return GRADE_CONFIG.GOOD;
  if (percentage >= SCORE_THRESHOLDS.PASS) return GRADE_CONFIG.PASS;
  return GRADE_CONFIG.FAIL;
}

/**
 * Lấy level label dựa trên phần trăm
 * @param {number} percentage
 * @returns {string}
 */
export function getLevelLabel(percentage) {
  return getGrade(percentage).label;
}

/**
 * Kiểm tra có pass hay không
 * @param {number} percentage
 * @returns {boolean}
 */
export function isPassing(percentage) {
  return percentage >= SCORE_THRESHOLDS.PASS;
}
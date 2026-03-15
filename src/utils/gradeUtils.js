// ============================================
// 📊 GRADE UTILITIES
// Constants & helper functions for scoring logic
// ============================================

// ─── 1. LOGIC CHẤM ĐIỂM CHUNG (HUFLIT / THPT) ─────────────────────────

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

export function getLevelLabel(percentage) {
  return getGrade(percentage).label;
}

export function isPassing(percentage) {
  return percentage >= SCORE_THRESHOLDS.PASS;
}

// ─── 2. LOGIC CHẤM ĐIỂM TOEIC (MỚI THÊM) ─────────────────────────────

// Bảng quy đổi điểm Listening (0 - 100 câu)
const TOEIC_LISTENING_CONVERSION = [
  5, 5, 5, 5, 5, 5, 5, 10, 15, 20, // 0-9
  25, 30, 35, 40, 45, 50, 55, 60, 65, 70, // 10-19
  75, 80, 85, 90, 95, 100, 110, 115, 120, 125, // 20-29
  130, 135, 140, 145, 150, 160, 165, 170, 175, 180, // 30-39
  185, 190, 195, 200, 210, 215, 220, 225, 230, 240, // 40-49
  245, 250, 255, 260, 270, 275, 280, 290, 295, 300, // 50-59
  310, 315, 320, 325, 330, 340, 345, 350, 360, 365, // 60-69
  370, 380, 385, 390, 395, 400, 405, 410, 420, 425, // 70-79
  430, 440, 445, 450, 460, 465, 470, 475, 480, 485, // 80-89
  490, 495, 495, 495, 495, 495, 495, 495, 495, 495, // 90-99
  495 // 100
];

// Bảng quy đổi điểm Reading (0 - 100 câu)
const TOEIC_READING_CONVERSION = [
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5, // 0-9
  10, 15, 20, 25, 30, 35, 40, 45, 50, 55, // 10-19
  60, 65, 70, 75, 80, 85, 90, 95, 100, 105, // 20-29
  110, 115, 120, 125, 130, 135, 140, 145, 150, 155, // 30-39
  160, 165, 170, 175, 180, 185, 190, 195, 200, 205, // 40-49
  210, 215, 220, 225, 230, 235, 240, 245, 250, 255, // 50-59
  260, 265, 270, 275, 280, 285, 290, 295, 300, 305, // 60-69
  310, 315, 320, 325, 330, 335, 340, 345, 350, 355, // 70-79
  360, 365, 370, 375, 380, 385, 390, 395, 400, 405, // 80-89
  410, 415, 420, 425, 430, 435, 440, 445, 450, 455, // 90-99
  495 // 100
];

/**
 * Tính điểm TOEIC từ số câu trả lời đúng
 * @param {number} listeningCorrect - Số câu Nghe đúng (0-100)
 * @param {number} readingCorrect - Số câu Đọc đúng (0-100)
 * @returns {{ listening: number, reading: number, total: number }}
 */
export function calculateToeicScore(listeningCorrect = 0, readingCorrect = 0) {
  // Đảm bảo số câu không vượt quá 100 hoặc nhỏ hơn 0
  const safeL = Math.max(0, Math.min(100, listeningCorrect));
  const safeR = Math.max(0, Math.min(100, readingCorrect));

  const listeningScore = TOEIC_LISTENING_CONVERSION[safeL];
  const readingScore = TOEIC_READING_CONVERSION[safeR];

  return {
    listening: listeningScore,
    reading: readingScore,
    total: listeningScore + readingScore
  };
}

/**
 * Lấy xếp hạng Gamification cho TOEIC
 * @param {number} totalScore - Tổng điểm TOEIC (10 - 990)
 * @returns {string} Danh hiệu
 */
export function getToeicGradeLabel(totalScore) {
  if (totalScore >= 900) return "Huyền thoại 👑";
  if (totalScore >= 750) return "Cao thủ 💎";
  if (totalScore >= 600) return "Tinh anh ⚡";
  if (totalScore >= 450) return "Tiên phong 🚀";
  return "Tập sự 🌱";
}
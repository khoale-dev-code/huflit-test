// ============================================
// 📊 GRADE UTILITIES
// Constants & helper functions for scoring logic
// ============================================

// ─── 1. LOGIC CHẤM ĐIỂM CHUNG (HUFLIT / THPT) ─────────────────────────

export const SCORE_THRESHOLDS = Object.freeze({
  PASS: 70,
  GOOD: 80,
  EXCELLENT: 90,
});

export const GRADE_CONFIG = Object.freeze({
  EXCELLENT: Object.freeze({
    label: 'Xuất sắc',
    badge: 'A+',
    color: 'from-emerald-500 to-teal-400',
    textColor: 'text-emerald-600',
  }),
  GOOD: Object.freeze({
    label: 'Giỏi',
    badge: 'A',
    color: 'from-blue-600 to-indigo-500',
    textColor: 'text-blue-600',
  }),
  PASS: Object.freeze({
    label: 'Khá',
    badge: 'B',
    color: 'from-orange-500 to-amber-400',
    textColor: 'text-orange-500',
  }),
  FAIL: Object.freeze({
    label: 'Cần cố gắng',
    badge: 'C',
    color: 'from-rose-500 to-pink-400',
    textColor: 'text-rose-500',
  }),
});

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

// ─── 2. LOGIC CHẤM ĐIỂM TOEIC ──────────────────────────────────────

// Đã cập nhật lại độ mượt của mốc điểm Reading ở Top đầu
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
  410, 415, 420, 425, 430, 435, 445, 455, 465, 475, // 90-99 (FIXED)
  495 // 100
];

export function calculateToeicScore(listeningCorrect = 0, readingCorrect = 0) {
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

export function getToeicGradeLabel(totalScore) {
  if (totalScore >= 900) return "Huyền thoại 👑";
  if (totalScore >= 750) return "Cao thủ 💎";
  if (totalScore >= 600) return "Tinh anh ⚡";
  if (totalScore >= 450) return "Tiên phong 🚀";
  return "Tập sự 🌱";
}

// ─── 3. LOGIC CHẤM ĐIỂM IELTS (TƯƠNG LAI) ─────────────────────────────

// Bảng quy đổi điểm IELTS Listening (0 - 40 câu)
const IELTS_LISTENING_CONVERSION = [
  0.0, 1.0, 2.0, 2.0, 2.5, 2.5, 3.0, 3.0, 3.5, 3.5, // 0-9
  4.0, 4.0, 4.0, 4.5, 4.5, 4.5, 5.0, 5.0, 5.5, 5.5, // 10-19
  5.5, 5.5, 5.5, 6.0, 6.0, 6.0, 6.5, 6.5, 6.5, 6.5, // 20-29
  7.0, 7.0, 7.5, 7.5, 7.5, 8.0, 8.0, 8.5, 8.5, 9.0, // 30-39
  9.0 // 40
];

// Bảng quy đổi điểm IELTS Reading - Academic (0 - 40 câu)
const IELTS_READING_ACADEMIC_CONVERSION = [
  0.0, 1.0, 2.0, 2.0, 2.5, 2.5, 3.0, 3.0, 3.5, 3.5, // 0-9
  4.0, 4.0, 4.0, 4.5, 4.5, 5.0, 5.0, 5.0, 5.0, 5.5, // 10-19
  5.5, 5.5, 5.5, 6.0, 6.0, 6.0, 6.0, 6.5, 6.5, 6.5, // 20-29
  7.0, 7.0, 7.0, 7.5, 7.5, 8.0, 8.0, 8.5, 8.5, 9.0, // 30-39
  9.0 // 40
];

/**
 * Lấy Band Score của kỹ năng Nghe/Đọc (IELTS)
 * @param {number} correctCount - Số câu đúng (0-40)
 * @param {string} skill - 'listening' | 'reading'
 * @returns {number} Band Score (0.0 - 9.0)
 */
export function getIeltsBandScore(correctCount, skill = 'listening') {
  const safeCount = Math.max(0, Math.min(40, correctCount));
  
  if (skill === 'listening') return IELTS_LISTENING_CONVERSION[safeCount];
  if (skill === 'reading') return IELTS_READING_ACADEMIC_CONVERSION[safeCount];
  
  return 0.0;
}

/**
 * Tính Overall Band Score của bài thi IELTS (Làm tròn chuẩn quy tắc hội đồng Anh)
 * Quy tắc: Đuôi .25 làm tròn lên .5 | Đuôi .75 làm tròn lên điểm chẵn tiếp theo
 * @param {number} listening 
 * @param {number} reading 
 * @param {number} writing 
 * @param {number} speaking 
 * @returns {number} Overall Band Score
 */
export function calculateIeltsOverall(listening = 0, reading = 0, writing = 0, speaking = 0) {
  const average = (listening + reading + writing + speaking) / 4;
  
  // Tuyệt chiêu làm tròn IELTS: Nhân 2, làm tròn số nguyên gần nhất, rồi chia 2
  // Ví dụ: 6.25 * 2 = 12.5 -> round(13) -> 13 / 2 = 6.5
  // Ví dụ: 6.125 * 2 = 12.25 -> round(12) -> 12 / 2 = 6.0
  return Math.round(average * 2) / 2;
}

/**
 * Lấy xếp hạng Gamification cho IELTS
 * @param {number} overallBand - Điểm Overall IELTS (0.0 - 9.0)
 * @returns {string} Danh hiệu
 */
export function getIeltsGradeLabel(overallBand) {
  if (overallBand >= 8.0) return "Master (C2) 👑";
  if (overallBand >= 7.0) return "Advanced (C1) 💎";
  if (overallBand >= 5.5) return "Upper Intermediate (B2) ⚡";
  if (overallBand >= 4.0) return "Intermediate (B1) 🚀";
  return "Beginner 🌱";
}
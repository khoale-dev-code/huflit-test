// ============================================
// 🔢 SCORE UTILITIES
// ============================================

/**
 * Format điểm thành string hiển thị
 * @param {number} correct
 * @param {number} total
 * @returns {string} e.g. "8/10"
 */
export function formatScore(correct, total) {
  return `${correct}/${total}`;
}

/**
 * Tính phần trăm an toàn (tránh chia 0)
 * @param {number} correct
 * @param {number} total
 * @returns {number} 0–100
 */
export function calcPercentage(correct, total) {
  if (!total || total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Làm tròn phần trăm để hiển thị
 * @param {number} percentage
 * @returns {string}
 */
export function formatPercentage(percentage) {
  return `${Math.round(percentage)}%`;
}

/**
 * Normalize score từ nhiều dạng dữ liệu về số nguyên 0–100
 *
 * Các dạng được hỗ trợ:
 *   { score: 40 }                              → 40
 *   { score: "2/5" }                           → 40
 *   { score: { percentage: 40 } }              → 40   ← FIX: score object
 *   { score: { correct: 2, total: 5 } }        → 40   ← FIX: score object
 *   { correct: 2, total: 5 }                   → 40   ← FIX: flat correct/total
 */
export function normalizeScore(item) {
  const s = item.score;

  // 1. Đã là number (0-100)
  if (typeof s === 'number') {
    return Math.max(0, Math.min(100, Math.round(s)));
  }

  // 2. String dạng "correct/total" (data cũ)
  if (typeof s === 'string' && s.includes('/')) {
    const [correct, total] = s.split('/').map(Number);
    if (total > 0) return Math.max(0, Math.min(100, Math.round((correct / total) * 100)));
    return 0;
  }

  // 3. Object { percentage, correct, total } — từ ResultsDisplay score prop
  if (s && typeof s === 'object') {
    if (typeof s.percentage === 'number') {
      return Math.max(0, Math.min(100, Math.round(s.percentage)));
    }
    if (typeof s.correct === 'number' && typeof s.total === 'number' && s.total > 0) {
      return Math.max(0, Math.min(100, Math.round((s.correct / s.total) * 100)));
    }
  }

  // 4. Flat object: { correct, total } — testData không có .score riêng
  if (typeof item.correct === 'number' && typeof item.total === 'number' && item.total > 0) {
    return Math.max(0, Math.min(100, Math.round((item.correct / item.total) * 100)));
  }

  // 5. Fallback
  return 0;
}
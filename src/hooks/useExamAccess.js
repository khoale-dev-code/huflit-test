/**
 * useExamAccess.js
 * ─────────────────────────────────────────────
 * Hook trung tâm kiểm soát quyền truy cập exam theo level.
 *
 * Quy tắc mở khóa:
 *   Level 1-2  → Exam 1, 2
 *   Level 3-5  → Exam 1-4
 *   Level 6-8  → Exam 1-6
 *   Level 9-11 → Exam 1-8
 *   Level 12+  → Tất cả
 *
 * Cách dùng:
 *   const { canAccessExam, getExamLockInfo, filterAccessibleExams } = useExamAccess();
 */

import { useMemo } from 'react';
import { useUserProgress } from './useUserProgress';

// Trích số từ examId: "exam3" → 3
const parseExamNumber = (examId) => {
  if (!examId) return null;
  const match = String(examId).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

export function useExamAccess() {
  const { analytics, isLoaded } = useUserProgress();

  const unlockedCount = analytics?.unlockedExams ?? 2;
  const level         = analytics?.level ?? 1;

  /**
   * Kiểm tra 1 examId có được truy cập không.
   * @param {string} examId  — vd: "exam1", "exam3"
   * @returns {boolean}
   */
  const canAccessExam = useMemo(() => (examId) => {
    if (!isLoaded) return false;                         // chưa load xong → chặn tạm
    if (unlockedCount === Infinity) return true;         // level 12+: mở hết
    const n = parseExamNumber(examId);
    if (n === null) return false;
    return n <= unlockedCount;
  }, [isLoaded, unlockedCount]);

  /**
   * Trả về thông tin khóa của 1 exam.
   * @param {string} examId
   * @returns {{ locked: boolean, requiredLevel: number|null, examNumber: number|null }}
   */
  const getExamLockInfo = useMemo(() => (examId) => {
    const n = parseExamNumber(examId);
    if (n === null) return { locked: true, requiredLevel: null, examNumber: null };

    const locked = unlockedCount !== Infinity && n > unlockedCount;
    if (!locked) return { locked: false, requiredLevel: null, examNumber: n };

    // Tính level cần để mở exam này
    let requiredLevel = 1;
    if (n > 8)  requiredLevel = 12;
    else if (n > 6) requiredLevel = 9;
    else if (n > 4) requiredLevel = 6;
    else if (n > 2) requiredLevel = 3;

    return { locked: true, requiredLevel, examNumber: n };
  }, [unlockedCount]);

  /**
   * Lọc danh sách exam metadata, thêm field `locked` và `requiredLevel`.
   * @param {Array<{id: string, title: string}>} examList
   * @returns {Array<{id, title, locked, requiredLevel}>}
   */
  const filterAccessibleExams = useMemo(() => (examList) => {
    if (!examList) return [];
    return examList.map((exam) => {
      const info = getExamLockInfo(exam.id);
      return {
        ...exam,
        locked:        info.locked,
        requiredLevel: info.requiredLevel,
      };
    });
  }, [getExamLockInfo]);

  return {
    canAccessExam,
    getExamLockInfo,
    filterAccessibleExams,
    unlockedCount,
    level,
    isLoaded,
  };
}

export default useExamAccess;
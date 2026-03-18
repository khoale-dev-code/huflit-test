/* src/components/FullExam/hooks/useExamTimer.js
 *
 * FIX CHÍNH SO VỚI BẢN CŨ:
 * ─────────────────────────────────────────────────────────────
 * [BUG CŨ] useEffect([isActive]) → khi chuyển Listening → Reading:
 *   - isActive vẫn = true → effect KHÔNG re-run → interval cũ tiếp tục
 *   - warningFiredRef KHÔNG reset → warning không fire cho Reading
 *   - timeLeftRef đã được set về 3600 nhưng interval logic vẫn
 *     chạy đúng vì đọc từ ref → timer chạy đúng NHƯNG onComplete
 *     bị gọi với logic section cũ (listening) → chuyển sai màn hình
 *
 * [FIX] Thêm `section` vào dependency của interval effect:
 *   useEffect([isActive, section])
 *   → mỗi khi section thay đổi: clear interval cũ, tạo interval mới
 *   → warningFiredRef reset đồng thời trong cùng effect
 *   → timeLeftRef lúc này đã được sync sang giá trị mới (3600)
 *     vì setTimeLeft() được gọi TRƯỚC setSection() trong handler
 */

import { useEffect, useRef } from 'react';
import { EXAM_TIMINGS } from '../constants/timings';

export const useExamTimer = ({
  isActive = false,
  section  = 'listening',
  timeLeft = 0,
  onTick,
  onWarning,
  onComplete,
}) => {
  // ── Refs: luôn giữ giá trị mới nhất, không gây re-render ────
  const timeLeftRef   = useRef(timeLeft);
  const onTickRef     = useRef(onTick);
  const onWarningRef  = useRef(onWarning);
  const onCompleteRef = useRef(onComplete);
  const warningFired  = useRef(false);

  // Sync refs mỗi render (không cần cleanup)
  timeLeftRef.current   = timeLeft;
  onTickRef.current     = onTick;
  onWarningRef.current  = onWarning;
  onCompleteRef.current = onComplete;

  // ── Interval chính ───────────────────────────────────────────
  // Dependency: [isActive, section]
  //   - isActive thay đổi  → start/stop timer
  //   - section thay đổi   → restart timer + reset warningFired
  //     (setTimeLeft đã được gọi TRƯỚC setSection trong handler,
  //      nên timeLeftRef.current đã = 3600 khi effect này chạy)
  useEffect(() => {
    // Reset warning flag cho section mới
    warningFired.current = false;

    if (!isActive) return;

    const id = setInterval(() => {
      const t = timeLeftRef.current;

      // 1. Warning khi còn <= 5 phút (1 lần / section)
      if (t <= EXAM_TIMINGS.WARNING && !warningFired.current) {
        warningFired.current = true;
        onWarningRef.current?.();
      }

      // 2. Hết giờ → complete
      if (t <= 1) {
        clearInterval(id);
        onCompleteRef.current?.();
        return;
      }

      // 3. Tick bình thường
      onTickRef.current?.();
    }, 1000);

    return () => clearInterval(id);
   
  }, [isActive, section]);
  // ↑ section là dependency quan trọng:
  //   khi Listening → Reading, section thay đổi → interval restart
  //   → đọc timeLeftRef.current = 3600 → đếm đúng 60 phút
};

/* ── Helpers ─────────────────────────────────────────────── */
export const formatTimerDisplay = (seconds) => {
  if (!seconds || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const getMaxTimeForSection = (section) =>
  section === 'listening' ? EXAM_TIMINGS.LISTENING : EXAM_TIMINGS.READING;
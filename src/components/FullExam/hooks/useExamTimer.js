import { useEffect, useRef } from 'react';

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
  useEffect(() => {
    // Reset warning flag khi đổi section
    warningFired.current = false;

    if (!isActive) return;

    const id = setInterval(() => {
      const t = timeLeftRef.current;

      // 1. Warning khi còn <= 5 phút (300s)
      if (t <= 300 && !warningFired.current) {
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
};

/* ── Helpers ─────────────────────────────────────────────── */
export const formatTimerDisplay = (seconds) => {
  if (!seconds || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/**
 * 🚀 MỚI: Hàm lấy thời gian linh hoạt dựa trên thể loại đề (category)
 */
export const getMaxTimeForSection = (category, section) => {
  const cat = (category || 'other').toLowerCase();
  
  if (cat === 'huflit') {
    return section === 'listening' ? 30 * 60 : 60 * 60; // 30p Nghe, 60p Đọc
  }
  if (cat === 'toeic') {
    return section === 'listening' ? 45 * 60 : 75 * 60; // 45p Nghe, 75p Đọc
  }
  if (cat === 'ielts') {
    // IELTS thường tính tổng 60p Đọc. Nghe 30p.
    return section === 'listening' ? 30 * 60 : 60 * 60; 
  }
  if (cat === 'thpt') {
    // THPTQG chỉ có 1 bài thi 50 phút
    return 50 * 60;
  }
  
  // Default (Dự phòng)
  return section === 'listening' ? 30 * 60 : 60 * 60;
};
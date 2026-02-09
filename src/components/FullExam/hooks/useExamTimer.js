/* src/components/FullExam/hooks/useExamTimer.js */

import { useEffect, useRef } from 'react';
import { EXAM_TIMINGS } from '../constants/timings';

/**
 * Timer hook for exam countdown
 * 
 * ✅ Benefits:
 * - Isolated timer logic (easy to test)
 * - Reusable in other components
 * - Callback pattern for side effects
 * - Proper cleanup (no memory leaks)
 * 
 * @param {Object} config
 * @param {boolean} config.isActive - Timer should run
 * @param {string} config.section - 'listening' or 'reading'
 * @param {number} config.timeLeft - Current time in seconds
 * @param {Function} config.onTick - Called every second
 * @param {Function} config.onWarning - Called when time <= 5 minutes
 * @param {Function} config.onComplete - Called when time reaches 0
 * @param {Function} config.onSectionChange - Called when switching sections
 */
export const useExamTimer = ({
  isActive = false,
  section = 'listening',
  timeLeft = 0,
  onTick,
  onWarning,
  onComplete,
  onSectionChange,
}) => {
  const warningTriggeredRef = useRef(false);
  const prevSectionRef = useRef(section);

  // Reset warning flag when section changes
  useEffect(() => {
    if (section !== prevSectionRef.current) {
      warningTriggeredRef.current = false;
      prevSectionRef.current = section;
    }
  }, [section]);

  // Main timer effect
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    // Only set timer if isActive
    const interval = setInterval(() => {
      // Call onTick to decrement time
      onTick?.();

      // Trigger warning at 5 minutes (once)
      if (timeLeft === EXAM_TIMINGS.WARNING + 1 && !warningTriggeredRef.current) {
        warningTriggeredRef.current = true;
        onWarning?.();
      }

      // Complete when reaching 0
      if (timeLeft === 1) {
        onComplete?.();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, timeLeft, onTick, onWarning, onComplete]);

  // Return hook utilities
  return {
    formattedTime: formatTimerDisplay(timeLeft),
    isWarningTime: timeLeft <= EXAM_TIMINGS.WARNING,
    isTimeAlmostUp: timeLeft <= 60, // Less than 1 minute
    isExpired: timeLeft === 0,
    percentageRemaining: (timeLeft / getMaxTimeForSection(section)) * 100,
  };
};

/**
 * Format timer display for show
 * @param {number} seconds
 * @returns {string} "MM:SS"
 */
function formatTimerDisplay(seconds) {
  if (seconds < 0) seconds = 0;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get max time for section
 */
function getMaxTimeForSection(section) {
  return section === 'listening' ? EXAM_TIMINGS.LISTENING : EXAM_TIMINGS.READING;
}

/**
 * Hook for updating time when section changes
 * Call this when transitioning between sections
 * 
 * Usage:
 * const { updateTimeForSection } = useTimerTransition();
 * 
 * useEffect(() => {
 *   updateTimeForSection(newSection);
 * }, [section]);
 */
export const useTimerTransition = () => {
  const transitionToSection = (section, onTimeUpdate) => {
    const newTime = section === 'listening' ? EXAM_TIMINGS.LISTENING : EXAM_TIMINGS.READING;
    onTimeUpdate?.(newTime);
  };

  return { transitionToSection };
};

/**
 * Advanced timer hook with progress tracking
 * For showing progress bar or percentage
 */
export const useTimerProgress = ({ 
  timeLeft, 
  maxTime,
  onMilestone, // Called at 25%, 50%, 75% progress
}) => {
  const prevPercentageRef = useRef(100);

  useEffect(() => {
    const percentage = (timeLeft / maxTime) * 100;
    const prevPercentage = prevPercentageRef.current;

    // Check if we've crossed a milestone
    if (onMilestone) {
      [75, 50, 25].forEach(milestone => {
        if (prevPercentage > milestone && percentage <= milestone) {
          onMilestone?.(milestone);
        }
      });
    }

    prevPercentageRef.current = percentage;
  }, [timeLeft, maxTime, onMilestone]);

  return {
    percentage: (timeLeft / maxTime) * 100,
    isInFinalQuarter: (timeLeft / maxTime) <= 0.25,
    isInFinalHalf: (timeLeft / maxTime) <= 0.5,
  };
};
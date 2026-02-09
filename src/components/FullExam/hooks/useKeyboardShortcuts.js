/* src/components/FullExam/hooks/useKeyboardShortcuts.js */

import { useEffect } from 'react';

/**
 * Keyboard shortcuts for exam
 */
export const KEYBOARD_SHORTCUTS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  SPACE: ' ',
  NUMBER_1: '1',
  NUMBER_2: '2',
  NUMBER_3: '3',
  NUMBER_4: '4',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
};

/**
 * Exam keyboard shortcuts hook
 * 
 * ✅ Benefits:
 * - Isolated keyboard logic
 * - Easy to enable/disable
 * - Testable
 * - Good UX (power users love shortcuts)
 * 
 * @param {Object} config
 * @param {boolean} config.isActive - Enable keyboard shortcuts
 * @param {boolean} config.isAudioPlaying - Disable navigation when audio
 * @param {Function} config.onNavigatePrev - Arrow Left handler
 * @param {Function} config.onNavigateNext - Arrow Right handler
 * @param {Function} config.onTogglePause - Space handler
 * @param {Function} config.onSelectAnswer - Number keys (1-4)
 * @param {Function} config.onSubmit - Enter handler
 * @param {Function} config.onExit - Escape handler
 */
export const useKeyboardShortcuts = ({
  isActive = false,
  isAudioPlaying = false,
  onNavigatePrev,
  onNavigateNext,
  onTogglePause,
  onSelectAnswer,
  onSubmit,
  onExit,
}) => {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e) => {
      // ===== NAVIGATION =====
      // Arrow Left: Previous Part
      if (e.key === KEYBOARD_SHORTCUTS.ARROW_LEFT) {
        // Prevent default scroll behavior
        e.preventDefault();
        
        // Don't navigate while audio is playing
        if (!isAudioPlaying) {
          onNavigatePrev?.();
        }
      }

      // Arrow Right: Next Part
      if (e.key === KEYBOARD_SHORTCUTS.ARROW_RIGHT) {
        e.preventDefault();
        
        if (!isAudioPlaying) {
          onNavigateNext?.();
        }
      }

      // ===== CONTROL =====
      // Space: Pause/Resume
      if (e.key === KEYBOARD_SHORTCUTS.SPACE) {
        e.preventDefault();
        onTogglePause?.();
      }

      // Enter: Submit
      if (e.key === KEYBOARD_SHORTCUTS.ENTER && e.ctrlKey) {
        e.preventDefault();
        onSubmit?.();
      }

      // Escape: Exit (with confirmation)
      if (e.key === KEYBOARD_SHORTCUTS.ESCAPE) {
        e.preventDefault();
        onExit?.();
      }

      // ===== ANSWER SELECTION =====
      // Number keys 1-4: Select answer
      const numKey = parseInt(e.key);
      if (numKey >= 1 && numKey <= 4) {
        e.preventDefault();
        const answerIndex = numKey - 1; // Convert to 0-based index
        onSelectAnswer?.(answerIndex);
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown, { capture: false });

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isActive,
    isAudioPlaying,
    onNavigatePrev,
    onNavigateNext,
    onTogglePause,
    onSelectAnswer,
    onSubmit,
    onExit,
  ]);
};

/**
 * Keyboard help overlay hook
 * Shows shortcut hints
 */
export const useKeyboardHelp = () => {
  const shortcuts = [
    {
      keys: ['←', '→'],
      description: 'Navigate between parts',
      available: true,
    },
    {
      keys: ['1', '2', '3', '4'],
      description: 'Select answer',
      available: true,
    },
    {
      keys: ['Space'],
      description: 'Pause/Resume',
      available: true,
    },
    {
      keys: ['Ctrl', 'Enter'],
      description: 'Submit test',
      available: true,
    },
    {
      keys: ['Esc'],
      description: 'Exit (confirm)',
      available: true,
    },
  ];

  return { shortcuts };
};

/**
 * Hook to detect if user is using keyboard
 */
export const useKeyboardDetection = () => {
  const [isUsingKeyboard, setIsUsingKeyboard] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = () => {
      setIsUsingKeyboard(true);
    };

    const handleMouseMove = () => {
      setIsUsingKeyboard(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return isUsingKeyboard;
};

/**
 * Prevent unintended key presses (like typing in input fields)
 */
export const shouldIgnoreKeyboardShortcut = (target) => {
  // Don't trigger shortcuts when typing in input/textarea
  const tagName = target?.tagName?.toLowerCase();
  const isEditable = target?.contentEditable === 'true';

  return tagName === 'input' || tagName === 'textarea' || isEditable;
};

/**
 * Usage example in component:
 * 
 * useKeyboardShortcuts({
 *   isActive: true,
 *   onNavigatePrev: () => setPart(p => Math.max(1, p - 1)),
 *   onNavigateNext: () => setPart(p => Math.min(4, p + 1)),
 *   onTogglePause: () => setIsPaused(!isPaused),
 *   onSelectAnswer: (index) => handleAnswerSelect(index),
 * });
 */
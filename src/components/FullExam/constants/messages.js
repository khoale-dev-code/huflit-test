/* src/components/FullExam/constants/messages.js */

export const EXAM_MESSAGES = {
  SETUP: {
    TITLE: 'HUFLIT Proficiency Assessment',
    DESCRIPTION: 'Select an exam to begin your test',
    SELECT_EXAM: 'Choose Exam',
  },
  EXAM: {
    LISTENING: 'LISTENING',
    READING: 'READING',
    PART: 'Part',
  },
  WARNINGS: {
    TIME_LOW: 'You have 5 minutes remaining!',
    UNANSWERED_PREFIX: 'You have',
    UNANSWERED_SUFFIX: 'unanswered question(s)',
    UNANSWERED_NOTE: 'Unanswered questions will count as incorrect.',
    OFFLINE: 'You are offline - changes are saved locally',
    SAVE_ERROR: 'Failed to save your progress',
    LAST_LISTENING_PART: 'This is your last listening part. After finishing, you will move to Reading.',
    LAST_SECTION: 'This is your final section. After submitting, you cannot make changes.',
  },
  SUBMIT_MODAL: {
    TITLE: 'Submit Test?',
    DESCRIPTION: 'You are about to submit your answers. You cannot make changes after submission.',
    INCOMPLETE_ANSWERS: 'Incomplete Answers',
    SAVE_ERROR_TITLE: 'Save Error',
  },
  ACTIONS: {
    CONTINUE: 'Continue',
    SUBMIT: 'Submit Test',
    CONFIRM: 'Yes, Submit',
    CANCEL: 'Cancel',
    RETRY: 'Try Again',
    NEXT_PART: 'Next Part',
    PREVIOUS_PART: 'Previous Part',
    GO_TO_READING: 'Go to Reading',
    TAKE_AGAIN: 'Take Test Again',
    EXIT: 'Exit',
  },
  RESULTS: {
    TITLE: 'Test Complete!',
    SUBTITLE: 'HUFLIT Proficiency Assessment',
    OVERALL_SCORE: 'Overall Score',
    SCORE_BREAKDOWN: 'Score Breakdown',
    LISTENING: 'Listening',
    READING: 'Reading',
    YOUR_STRENGTHS: 'Your Strengths',
    IMPROVEMENTS: 'Areas for Improvement',
    PART_BY_PART: 'Part-by-Part Results',
    SAVED_MESSAGE: 'Your results have been saved',
  },
  ERRORS: {
    LOAD_EXAM: 'Failed to load exam. Please try again.',
    SUBMIT_FAILED: 'Failed to submit your test. Please check your connection.',
    INVALID_DATA: 'Invalid exam data. Please reload.',
  },
};

export const KEYBOARD_HINTS = {
  ARROW_LEFT: 'Arrow Left: Previous Part',
  ARROW_RIGHT: 'Arrow Right: Next Part',
  SPACE: 'Space: Pause/Resume',
  NUMBER: 'Number Keys (1-4): Select Answer',
};
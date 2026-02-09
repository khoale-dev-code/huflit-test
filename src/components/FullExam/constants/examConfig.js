export const EXAM_STRUCTURE = {
  listening: {
    title: 'LISTENING',
    totalTime: 1800,
    parts: 4,
    questionsPerPart: 5,
    totalQuestions: 20,
    totalPoints: 100,
    pointsPerQuestion: 5,
  },
  reading: {
    title: 'READING',
    totalTime: 3600,
    parts: 4,
    questionsPerPart: 10,
    totalQuestions: 40,
    totalPoints: 100,
    pointsPerQuestion: 2.5,
  }
};

export const EXAM_MODES = {
  SETUP: 'setup',
  EXAM: 'exam',
  RESULTS: 'results'
};

export const EXAM_SECTIONS = {
  LISTENING: 'listening',
  READING: 'reading'
};
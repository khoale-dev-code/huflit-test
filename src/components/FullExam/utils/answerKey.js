/* src/components/FullExam/utils/answerKey.js */

/**
 * Generate consistent answer key format
 * Format: "{section}-part{part}-q{question}"
 * Example: "listening-part1-q1", "reading-part5-q3"
 * 
 * ✅ Benefits:
 * - Avoid typos
 * - Easy to refactor (single source of truth)
 * - Searchable across codebase
 * - Type-safe
 */
export const generateAnswerKey = ({ section, part, question }) => {
  if (!section || part === undefined || question === undefined) {
    throw new Error(`Invalid answer key params: section=${section}, part=${part}, question=${question}`);
  }
  return `${section}-part${part}-q${question}`;
};

/**
 * Parse answer key back to components
 * Example: "listening-part1-q1" → { section: 'listening', part: 1, question: 1 }
 */
export const parseAnswerKey = (key) => {
  if (!key || typeof key !== 'string') {
    return null;
  }
  
  const match = key.match(/^(\w+)-part(\d+)-q(\d+)$/);
  if (!match) {
    console.warn(`Invalid answer key format: "${key}"`);
    return null;
  }
  
  return {
    section: match[1],
    part: parseInt(match[2], 10),
    question: parseInt(match[3], 10),
  };
};

/**
 * Check if a question is answered
 */
export const isQuestionAnswered = (answers, section, part, question) => {
  const key = generateAnswerKey({ section, part, question });
  return answers[key] !== undefined;
};

/**
 * Get answer for a question
 */
export const getQuestionAnswer = (answers, section, part, question) => {
  const key = generateAnswerKey({ section, part, question });
  return answers[key];
};

/**
 * Set answer for a question
 */
export const setQuestionAnswer = (answers, section, part, question, value) => {
  const key = generateAnswerKey({ section, part, question });
  return {
    ...answers,
    [key]: value,
  };
};

/**
 * Count answered questions in a section
 */
export const countAnsweredQuestions = (answers, section) => {
  return Object.keys(answers)
    .filter(key => key.startsWith(section))
    .length;
};

/**
 * Get all answers for a part
 */
export const getPartAnswers = (answers, section, part) => {
  const prefix = `${section}-part${part}-`;
  return Object.entries(answers)
    .filter(([key]) => key.startsWith(prefix))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
};

/**
 * Clear answers for a section
 */
export const clearSectionAnswers = (answers, section) => {
  const result = { ...answers };
  Object.keys(result).forEach(key => {
    if (key.startsWith(section)) {
      delete result[key];
    }
  });
  return result;
};
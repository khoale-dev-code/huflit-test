// vocabularyHelpers.js - Helper Functions for Vocabulary Data

import VOCABULARY_DATA from './vocabularyData';

// Get vocabulary by level
export const getVocabularyByLevel = (level) => {
  const levelLower = level.toLowerCase();
  return VOCABULARY_DATA[levelLower] || VOCABULARY_DATA.beginner;
};

// Search vocabulary across all levels
export const searchVocabulary = (query) => {
  const results = [];
  Object.values(VOCABULARY_DATA).forEach(levelData => {
    Object.values(levelData.categories).forEach(category => {
      const filtered = category.words.filter(word => 
        word.word.toLowerCase().includes(query.toLowerCase()) ||
        word.definition.toLowerCase().includes(query.toLowerCase()) ||
        word.vietnamese.toLowerCase().includes(query.toLowerCase()) ||
        word.alternatives.some(alt => alt.toLowerCase().includes(query.toLowerCase()))
      );
      results.push(...filtered);
    });
  });
  return results;
};

// Get random word from specific level
export const getRandomWord = (level = 'beginner') => {
  const levelData = getVocabularyByLevel(level);
  const allWords = [];
  Object.values(levelData.categories).forEach(category => {
    allWords.push(...category.words);
  });
  return allWords[Math.floor(Math.random() * allWords.length)];
};

// Get all words across all levels
export const getAllWords = () => {
  const allWords = [];
  Object.values(VOCABULARY_DATA).forEach(levelData => {
    Object.values(levelData.categories).forEach(category => {
      allWords.push(...category.words);
    });
  });
  return allWords;
};

// Get exam vocabulary statistics
export const getExamVocabulary = () => {
  let totalWords = 0;
  Object.values(VOCABULARY_DATA).forEach(levelData => {
    Object.values(levelData.categories).forEach(category => {
      totalWords += category.words.length;
    });
  });

  return {
    totalWords: totalWords,
    examTopics: ['Travel', 'Business', 'Communication', 'Analysis', 'Marketing', 'Professional', 'Technical'],
  };
};

// Create flashcards from vocabulary
export const createFlashcards = (level) => {
  const levelData = getVocabularyByLevel(level);
  const flashcards = [];
  
  Object.values(levelData.categories).forEach(category => {
    category.words.forEach(word => {
      flashcards.push({
        id: word.id,
        front: word.word,
        back: word.definition,
        pronunciation: word.pronunciation,
        example: word.example,
        vietnamese: word.vietnamese,
        category: category.title,
        level: level,
      });
    });
  });

  return flashcards;
};

// Get vocabulary by specific category
export const getVocabularyByCategory = (category, level = 'beginner') => {
  const levelData = getVocabularyByLevel(level);
  return levelData.categories[category]?.words || [];
};

// Create quiz with random questions
export const createQuiz = (level, count = 10) => {
  const allWords = [];
  const levelData = getVocabularyByLevel(level);
  
  Object.values(levelData.categories).forEach(category => {
    allWords.push(...category.words);
  });

  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, allWords.length));

  return selected.map(word => ({
    id: word.id,
    word: word.word,
    options: [
      word.definition,
      word.alternatives[0],
      word.alternatives[1],
      word.alternatives[2],
    ].sort(() => Math.random() - 0.5),
    correct: word.definition,
    pronunciation: word.pronunciation,
    vietnamese: word.vietnamese,
    example: word.example,
  }));
};

// Get category statistics
export const getCategoryStats = (level = 'beginner') => {
  const levelData = getVocabularyByLevel(level);
  const stats = {};
  
  Object.entries(levelData.categories).forEach(([key, category]) => {
    stats[key] = {
      name: category.title,
      count: category.words.length,
      description: category.description,
    };
  });

  return stats;
};

// Get words by difficulty/level
export const getWordsByDifficulty = (level) => {
  const words = [];
  const levelData = getVocabularyByLevel(level);
  
  Object.values(levelData.categories).forEach(category => {
    words.push(...category.words);
  });

  return {
    level: level,
    totalWords: words.length,
    words: words,
  };
};

// Calculate learning progress
export const calculateProgress = (completedWords, vocabularyData) => {
  if (!vocabularyData || !vocabularyData.categories) return 0;
  
  let totalWords = 0;
  Object.values(vocabularyData.categories).forEach(category => {
    totalWords += category.words.length;
  });
  
  return totalWords > 0 ? Math.round((completedWords.length / totalWords) * 100) : 0;
};

// Handle flashcard navigation
export const handleFlashcardNav = (direction, currentIndex, flashcards) => {
  if (direction === 'prev') {
    return Math.max(0, currentIndex - 1);
  }
  return Math.min(flashcards.length - 1, currentIndex + 1);
};

// Get words by category with stats
export const getWordsWithStats = (level) => {
  const levelData = getVocabularyByLevel(level);
  const categoriesWithStats = {};
  
  Object.entries(levelData.categories).forEach(([key, category]) => {
    categoriesWithStats[key] = {
      id: category.id,
      title: category.title,
      description: category.description,
      words: category.words,
      wordCount: category.words.length,
    };
  });
  
  return categoriesWithStats;
};

// Filter words by difficulty range
export const filterWordsByRange = (words, minLength, maxLength) => {
  return words.filter(word => 
    word.word.length >= minLength && word.word.length <= maxLength
  );
};

// Get most common words
export const getMostCommonWords = (level, count = 20) => {
  const allWords = [];
  const levelData = getVocabularyByLevel(level);
  
  Object.values(levelData.categories).forEach(category => {
    allWords.push(...category.words);
  });

  return allWords.slice(0, count);
};

// Export all helpers as object for convenience
export const vocabHelpers = {
  getVocabularyByLevel,
  searchVocabulary,
  getRandomWord,
  getAllWords,
  getExamVocabulary,
  createFlashcards,
  getVocabularyByCategory,
  createQuiz,
  getCategoryStats,
  getWordsByDifficulty,
  calculateProgress,
  handleFlashcardNav,
  getWordsWithStats,
  filterWordsByRange,
  getMostCommonWords,
};
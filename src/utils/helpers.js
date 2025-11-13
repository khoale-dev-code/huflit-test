export const calculateProgress = (completedWords, vocabularyData) => {
    if (!vocabularyData) return 0;
    const allWords = Object.values(vocabularyData.categories)
        .flat()
        .map(cat => cat.words)
        .flat();
    return allWords.length > 0 ? Math.round((completedWords.length / allWords.length) * 100) : 0;
};

export const toggleWord = (wordId, completedWords, setCompletedWords) => {
    setCompletedWords(prev => 
        prev.includes(wordId) ? prev.filter(id => id !== wordId) : [...prev, wordId]
    );
};

export const handleFlashcardNav = (direction, flashcardIndex, flashcards) => {
    if (direction === 'next') {
        return (flashcardIndex + 1) % flashcards.length;
    } else {
        return flashcardIndex === 0 ? flashcards.length - 1 : flashcardIndex - 1;
    }
};
import React, { useState, useEffect } from 'react';
import { 
    getVocabularyByLevel, 
    createFlashcards, 
    createQuiz, 
    getWordsByDifficulty 
} from '../data/vocabularyData';
import { useSpeech } from '../components/hooks/useSpeech';
import { Header } from '../components/features/Header';
import { TabNavigation } from '../components/features/TabNavigation';
import { CategoriesView } from '../components/features/CategoriesView';
import { FlashcardsView } from '../components/features/FlashcardsView';
import { QuizView } from '../components/features/QuizView';
import { StatsView } from '../components/features/StatsView';
import { calculateProgress, handleFlashcardNav } from '../utils/helpers';


export default function VocabularyPractice() {
    // ===== STATE MANAGEMENT =====
    const [selectedLevel, setSelectedLevel] = useState('beginner');
    const [activeTab, setActiveTab] = useState('categories');
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [completedWords, setCompletedWords] = useState([]);
    
    // Flashcards State
    const [currentFlashcard, setCurrentFlashcard] = useState(null);
    const [flashcardIndex, setFlashcardIndex] = useState(0);
    const [showCardBack, setShowCardBack] = useState(false);
    
    // Quiz State
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [quizList, setQuizList] = useState([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizAnswer, setQuizAnswer] = useState(null);
    const [showQuizFeedback, setShowQuizFeedback] = useState(false);
    const [quizScore, setQuizScore] = useState(0);

    // ===== HOOKS & DATA =====
    const { speak, playingId } = useSpeech();
    const vocabularyData = getVocabularyByLevel(selectedLevel);

    // ===== EFFECTS =====
    useEffect(() => {
        const flashcards = createFlashcards(selectedLevel);
        setCurrentFlashcard(flashcards[0] || null);
        setFlashcardIndex(0);
        setShowCardBack(false);
    }, [selectedLevel]);

    // ===== HELPER FUNCTIONS =====
    const getProgress = () => calculateProgress(completedWords, vocabularyData);

    const toggleWord = (wordId) => {
        setCompletedWords(prev => 
            prev.includes(wordId) 
                ? prev.filter(id => id !== wordId) 
                : [...prev, wordId]
        );
    };

    const navigateFlashcard = (direction) => {
        const flashcards = createFlashcards(selectedLevel);
        const nextIndex = handleFlashcardNav(direction, flashcardIndex, flashcards);
        
        setFlashcardIndex(nextIndex);
        setCurrentFlashcard(flashcards[nextIndex]);
        setShowCardBack(false);
    };

    const initializeQuiz = () => {
        const quiz = createQuiz(selectedLevel, 10);
        setQuizList(quiz);
        setCurrentQuiz(quiz[0] || null);
        setQuizIndex(0);
        setQuizAnswer(null);
        setShowQuizFeedback(false);
        setQuizScore(0);
    };

    const submitAnswer = () => {
        if (quizAnswer === null) return;
        setShowQuizFeedback(true);
        const isCorrect = quizAnswer === currentQuiz.options.findIndex(
            opt => opt === currentQuiz.correct
        );
        if (isCorrect) setQuizScore(prev => prev + 1);
    };

    const goToNextQuestion = () => {
        const nextIdx = quizIndex + 1;
        if (nextIdx < quizList.length) {
            setQuizIndex(nextIdx);
            setCurrentQuiz(quizList[nextIdx]);
            setQuizAnswer(null);
            setShowQuizFeedback(false);
        } else {
            setCurrentQuiz(null);
        }
    };

    // ===== GET DATA FOR VIEWS =====
    const flashcards = createFlashcards(selectedLevel);
    const stats = getWordsByDifficulty(selectedLevel);

    // ===== RENDER =====
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <Header
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedLevel={selectedLevel}
                    setSelectedLevel={setSelectedLevel}
                    calculateProgress={getProgress}
                    setExpandedCategory={setExpandedCategory}
                />

                {/* Tab Navigation */}
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Main Content */}
                <div className="mt-8">
                    {activeTab === 'categories' && (
                        <CategoriesView
                            vocabularyData={vocabularyData}
                            searchQuery={searchQuery}
                            expandedCategory={expandedCategory}
                            setExpandedCategory={setExpandedCategory}
                            completedWords={completedWords}
                            playingId={playingId}
                            toggleWord={toggleWord}
                            speak={speak}
                        />
                    )}

                    {activeTab === 'flashcards' && (
                        <FlashcardsView
                            currentFlashcard={currentFlashcard}
                            flashcardIndex={flashcardIndex}
                            totalFlashcards={flashcards.length}
                            showCardBack={showCardBack}
                            setShowCardBack={setShowCardBack}
                            handleFlashcardNav={navigateFlashcard}
                            speak={speak}
                        />
                    )}

                    {activeTab === 'quiz' && (
                        <QuizView
                            currentQuiz={currentQuiz}
                            quizIndex={quizIndex}
                            quizList={quizList}
                            quizScore={quizScore}
                            quizAnswer={quizAnswer}
                            setQuizAnswer={setQuizAnswer}
                            showQuizFeedback={showQuizFeedback}
                            submitQuizAnswer={submitAnswer}
                            nextQuestion={goToNextQuestion}
                            startQuiz={initializeQuiz}
                            speak={speak}
                        />
                    )}

                    {activeTab === 'stats' && (
                        <StatsView
                            stats={stats}
                            completedWords={completedWords}
                            calculateProgress={getProgress}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
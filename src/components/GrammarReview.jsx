import React, { useState, useCallback, useMemo } from 'react';
import { 
  ChevronDown, ChevronUp, BookOpen, AlertCircle, Lightbulb, 
  PlayCircle, CheckCircle, XCircle, Award, Search 
} from 'lucide-react';
import { 
  GRAMMAR_DATA, getGrammarByLevel, searchLessons, 
  GRAMMAR_QUIZZES, COMMON_MISTAKES, STUDY_TIPS, REAL_WORLD_EXAMPLES 
} from '../data/grammarData';

const GrammarReview = () => {
  // State Management
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [activeTab, setActiveTab] = useState('topics');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [exerciseAnswer, setExerciseAnswer] = useState(null);
  const [showExerciseFeedback, setShowExerciseFeedback] = useState(false);

  // Memoized data
  const grammarData = useMemo(() => getGrammarByLevel(selectedLevel), [selectedLevel]);
  const searchResults = useMemo(() => searchQuery ? searchLessons(searchQuery) : [], [searchQuery]);

  // Callbacks
  const toggleTopic = useCallback((topicId) => {
    setExpandedTopic(prev => prev === topicId ? null : topicId);
  }, []);

  const toggleLesson = useCallback((lessonId) => {
    setExpandedLesson(prev => prev === lessonId ? null : lessonId);
  }, []);

  const markLessonComplete = useCallback((lessonId) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  }, []);

  const handleStartExercise = useCallback((exercise) => {
    setCurrentExercise(exercise);
    setExerciseAnswer(null);
    setShowExerciseFeedback(false);
  }, []);

  const handleSubmitAnswer = useCallback(() => {
    setShowExerciseFeedback(true);
  }, []);

  const calculateProgress = useCallback(() => {
    if (!grammarData) return 0;
    const totalLessons = Object.values(grammarData.topics).reduce((acc, topic) => 
      acc + (topic.lessons?.length || 0), 0
    );
    return totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
  }, [grammarData, completedLessons]);

  const handleLevelChange = useCallback((level) => {
    setSelectedLevel(level);
    setExpandedTopic(null);
    setSearchQuery('');
    setFilterDifficulty('All');
  }, []);

  // Render Functions
  const renderHeader = () => (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6 md:p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            📚 Grammar Review
          </h1>
          <p className="text-orange-700 text-base md:text-lg font-semibold">Master English grammar with interactive lessons</p>
        </div>
        <div className="text-right bg-white/60 backdrop-blur px-4 md:px-6 py-3 md:py-4 rounded-xl border border-orange-200 flex-shrink-0">
          <div className="text-3xl md:text-4xl font-bold text-orange-600">{calculateProgress()}%</div>
          <p className="text-orange-700 font-semibold text-sm md:text-base">Progress</p>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3 flex-wrap">
        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
          <button
            key={level}
            onClick={() => handleLevelChange(level)}
            className={`px-4 md:px-5 py-2 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base ${
              selectedLevel === level
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                : 'bg-white text-orange-700 border-2 border-orange-200 hover:border-orange-400'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSearchFilter = () => (
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 w-5 h-5 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search topics, lessons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-200 rounded-xl text-gray-800 placeholder-orange-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
          aria-label="Search grammar topics"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff)}
            className={`px-3 md:px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md text-sm md:text-base whitespace-nowrap ${
              filterDifficulty === diff
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                : 'bg-white text-orange-700 border-2 border-orange-200 hover:border-orange-400'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>
    </div>
  );

  const renderTabNavigation = () => {
    const tabs = [
      { id: 'topics', label: '📖 Topics' },
      { id: 'mistakes', label: '⚠️ Mistakes' },
      { id: 'tips', label: '💡 Tips' },
      { id: 'examples', label: '🌍 Examples' },
      { id: 'quiz', label: '🎯 Quizzes' },
    ];

    return (
      <div className="flex gap-1 md:gap-2 mb-8 pb-4 border-b-2 border-orange-200 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 md:px-4 py-3 rounded-t-xl font-semibold whitespace-nowrap text-sm md:text-base transition-all duration-300 relative ${
              activeTab === tab.id
                ? 'text-orange-600 border-b-4 border-orange-500 bg-orange-50'
                : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  const renderTopicsView = () => (
    <div className="space-y-4">
      {grammarData && Object.entries(grammarData.topics).map(([, topic]) => (
        <div key={topic.id} className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:border-orange-400 transition-all duration-300">
          <button
            onClick={() => toggleTopic(topic.id)}
            className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-orange-50 transition-all text-left"
            aria-expanded={expandedTopic === topic.id}
          >
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <span className="text-3xl md:text-4xl flex-shrink-0">{topic.icon}</span>
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">{topic.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{topic.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-2">
              <span className="px-2 md:px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs md:text-sm font-semibold border border-orange-300">
                {topic.difficulty}
              </span>
              {expandedTopic === topic.id ? (
                <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-orange-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
              )}
            </div>
          </button>

          {expandedTopic === topic.id && (
            <div className="border-t-2 border-orange-200 p-4 md:p-6 space-y-4 bg-orange-50 animate-slideDown">
              {topic.lessons && topic.lessons.map(lesson => (
                <div key={lesson.lessonId} className="bg-white rounded-xl overflow-hidden border border-orange-200">
                  <button
                    onClick={() => toggleLesson(lesson.lessonId)}
                    className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-orange-50 transition-all text-left"
                    aria-expanded={expandedLesson === lesson.lessonId}
                  >
                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                      {completedLessons.includes(lesson.lessonId) ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <PlayCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm md:text-base truncate">{lesson.title}</p>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                      </div>
                    </div>
                    {expandedLesson === lesson.lessonId ? (
                      <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                    )}
                  </button>

                  {expandedLesson === lesson.lessonId && (
                    <div className="border-t border-orange-200 p-4 space-y-4 bg-white animate-slideDown">
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{lesson.content}</p>
                      </div>

                      {lesson.examples && lesson.examples.length > 0 && (
                        <div>
                          <p className="font-semibold text-gray-900 mb-3 text-sm md:text-base">📝 Examples:</p>
                          <div className="space-y-2">
                            {lesson.examples.map((ex, idx) => (
                              <div key={idx} className="bg-green-50 border-l-4 border-l-green-600 border border-green-200 rounded-lg p-3">
                                <p className="text-green-700 font-mono text-xs md:text-sm mb-1">"{ex.example}"</p>
                                <p className="text-gray-700 text-xs">{ex.explanation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {topic.exercises && (
                        <div>
                          <p className="font-semibold text-gray-900 mb-3 text-sm md:text-base">🎯 Exercises:</p>
                          <div className="space-y-2">
                            {topic.exercises.map(exercise => (
                              <button
                                key={exercise.exerciseId}
                                onClick={() => handleStartExercise(exercise)}
                                className="w-full text-left p-3 bg-blue-50 border-l-4 border-l-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-blue-700 font-medium text-sm flex-1 truncate">{exercise.question}</span>
                                  <span className="text-xs font-semibold bg-blue-200 text-blue-700 px-2 py-1 rounded flex-shrink-0">
                                    {exercise.difficulty}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => markLessonComplete(lesson.lessonId)}
                        className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                          completedLessons.includes(lesson.lessonId)
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                            : 'bg-orange-100 text-orange-700 border-2 border-orange-300 hover:bg-orange-200'
                        }`}
                      >
                        {completedLessons.includes(lesson.lessonId) ? '✓ Completed' : 'Mark as Complete'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderMistakesView = () => (
    <div className="space-y-4">
      {COMMON_MISTAKES.map(mistake => (
        <div key={mistake.id} className="bg-white border-l-4 border-l-red-600 border-2 border-red-200 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-3 md:gap-4">
            <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Common Mistake:</h3>
              <p className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 font-mono text-xs md:text-sm mb-3 overflow-x-auto">❌ {mistake.mistake}</p>

              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Correct Form:</h4>
              <p className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 font-mono text-xs md:text-sm mb-3 overflow-x-auto">✓ {mistake.correct}</p>

              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Explanation:</h4>
              <p className="text-gray-700 text-sm mb-3">{mistake.explanation}</p>

              <span className="inline-block text-xs font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-lg border border-red-300">
                Topic: {mistake.topic}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTipsView = () => (
    <div className="space-y-4">
      {STUDY_TIPS.map(tip => (
        <div key={tip.id} className="bg-white border-l-4 border-l-yellow-500 border-2 border-yellow-200 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-3 md:gap-4">
            <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">{tip.title}</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">{tip.description}</p>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-600">Related Topics:</span>
                {tip.relatedTopics.map(topicId => (
                  <span key={topicId} className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-1 rounded border border-yellow-300">
                    {topicId.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExamplesView = () => (
    <div className="space-y-4">
      {REAL_WORLD_EXAMPLES.map(example => (
        <div key={example.id} className="bg-white border-2 border-blue-200 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all">
          <div className="mb-4">
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs md:text-sm font-semibold mb-3 border border-blue-300">
              {example.context}
            </div>
            <p className="text-gray-600 text-xs md:text-sm">Example:</p>
          </div>

          <p className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 text-blue-700 font-mono text-xs md:text-sm mb-4 overflow-x-auto">
            "{example.original}"
          </p>

          <div>
            <p className="text-gray-600 text-xs md:text-sm mb-2">Why:</p>
            <p className="text-gray-800 text-sm">{example.explanation}</p>
          </div>

          <span className="inline-block mt-3 text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded border border-blue-300">
            Topic: {example.topic}
          </span>
        </div>
      ))}
    </div>
  );

  const renderQuizView = () => (
    <div className="space-y-4">
      {GRAMMAR_QUIZZES.map(quiz => (
        <div key={quiz.quizId} className="bg-white border-2 border-orange-200 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 truncate">{quiz.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm">{quiz.questions.length} questions • {quiz.duration} mins</p>
            </div>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs md:text-sm font-semibold border border-orange-300 flex-shrink-0">
              {quiz.difficulty}
            </span>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 mb-4 border-2 border-orange-200">
            <p className="text-gray-700 text-xs md:text-sm mb-3 font-semibold">Topics covered:</p>
            <div className="flex flex-wrap gap-2">
              {quiz.topics.map(topic => (
                <span key={topic} className="text-xs font-semibold bg-orange-200 text-orange-700 px-2 py-1 rounded border border-orange-300">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4 p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <p className="text-yellow-800 text-xs md:text-sm">
              <span className="font-semibold">Passing Score:</span> {quiz.passingScore}%
            </p>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base">
            <PlayCircle className="w-4 h-4 md:w-5 md:h-5" />
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );

  const renderExerciseModal = () => {
    if (!currentExercise) return null;

    const isCorrect = exerciseAnswer === currentExercise.options.findIndex(opt => opt.isCorrect);

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white border-2 border-orange-300 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-modalSlideIn shadow-2xl">
          <div className="p-4 md:p-6 space-y-4">
            <div>
              <p className="text-xs md:text-sm text-gray-600 mb-2 font-semibold">Question</p>
              <p className="text-base md:text-lg font-semibold text-gray-900">{currentExercise.question}</p>
            </div>

            <div className="space-y-2">
              {currentExercise.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => !showExerciseFeedback && setExerciseAnswer(idx)}
                  disabled={showExerciseFeedback}
                  className={`w-full p-3 rounded-lg text-left transition-all border-2 flex items-center gap-3 text-sm md:text-base ${
                    exerciseAnswer === idx
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 bg-white hover:border-orange-300'
                  } ${
                    showExerciseFeedback && option.isCorrect ? 'border-green-500 bg-green-50' : ''
                  } ${
                    showExerciseFeedback && exerciseAnswer === idx && !option.isCorrect ? 'border-red-500 bg-red-50' : ''
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                    exerciseAnswer === idx ? 'bg-orange-500 border-orange-500' : 'border-gray-400'
                  }`} />
                  <span className="text-gray-900">{option.text}</span>
                </button>
              ))}
            </div>

            {showExerciseFeedback && (
              <div className={`p-4 rounded-lg animate-slideDown ${
                isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
              }`}>
                <p className={`font-semibold mb-2 text-sm md:text-base ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-gray-800 text-xs md:text-sm">{currentExercise.options[0].explanation}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4 flex-col sm:flex-row">
              {!showExerciseFeedback ? (
                <>
                  <button
                    onClick={() => setCurrentExercise(null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-all border-2 border-gray-300 font-semibold text-sm md:text-base"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={exerciseAnswer === null}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm md:text-base"
                  >
                    Submit Answer
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCurrentExercise(null)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm md:text-base"
                >
                  Next Exercise
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {renderHeader()}
        {renderSearchFilter()}
        {renderTabNavigation()}

        {/* Main Content */}
        <div className="transition-all duration-300">
          {activeTab === 'topics' && renderTopicsView()}
          {activeTab === 'mistakes' && renderMistakesView()}
          {activeTab === 'tips' && renderTipsView()}
          {activeTab === 'examples' && renderExamplesView()}
          {activeTab === 'quiz' && renderQuizView()}
        </div>

        {/* Exercise Modal */}
        {renderExerciseModal()}

        {/* No Results */}
        {searchQuery && searchResults.length === 0 && (
          <div className="text-center py-12 animate-fadeIn">
            <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-semibold text-sm md:text-base">No results found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarReview;
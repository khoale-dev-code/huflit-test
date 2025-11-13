import React, { useState, useCallback, useMemo } from 'react';
import { 
  ChevronDown, ChevronUp, BookOpen, AlertCircle, Lightbulb, 
  PlayCircle, CheckCircle, XCircle, Award, Search 
} from 'lucide-react';
import { 
  GRAMMAR_DATA, getGrammarByLevel, searchLessons, 
  GRAMMAR_QUIZZES, COMMON_MISTAKES, STUDY_TIPS, REAL_WORLD_EXAMPLES 
} from '../data/grammarData';
import GrammarTopicPage from './GrammarTopicPage'; // Import the new GrammarTopicPage component
import './styles/GrammarReview.css';

const GrammarReview = () => {
  // State Management
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [selectedTopic, setSelectedTopic] = useState(null); // New state for selected topic
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [activeTab, setActiveTab] = useState('topics');
  const [completedLessons, setCompletedLessons] = useState([]); // Shared with GrammarTopicPage if needed

  // Memoized data
  const grammarData = useMemo(() => getGrammarByLevel(selectedLevel), [selectedLevel]);
  const searchResults = useMemo(() => searchQuery ? searchLessons(searchQuery) : [], [searchQuery]);

  // Callbacks
  const handleTopicSelect = useCallback((topic) => {
    setSelectedTopic(prev => prev?.id === topic.id ? null : topic);
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
    setSelectedTopic(null);
    setSearchQuery('');
    setFilterDifficulty('All');
  }, []);

  // Render Functions với CSS classes mới
  const renderHeader = () => (
    <div className="grammar-header">
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
            className={`grammar-button-primary ${
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
          className="grammar-input"
          aria-label="Search grammar topics"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff)}
            className={`grammar-button-secondary ${
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
      <div className="flex gap-1 md:gap-2 mb-8 pb-4 border-b-2 border-orange-200 overflow-x-auto grammar-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`grammar-tab ${
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

  const renderTopicsView = () => {
    if (selectedTopic) {
      // Render the full GrammarTopicPage when a topic is selected
      return (
        <div className="animate-slideIn">
          <button
            onClick={() => setSelectedTopic(null)}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-700 border-2 border-orange-300 rounded-lg hover:bg-orange-50 transition-all font-semibold text-sm"
          >
            ← Back to Topics
          </button>
          <GrammarTopicPage 
            topic={selectedTopic} 
            completedLessons={completedLessons}
            onLessonComplete={(lessonId) => {
              setCompletedLessons(prev =>
                prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
              );
            }}
          />
        </div>
      );
    }

    // Otherwise, render the topic list (accordion style)
    return (
      <div className="space-y-4">
        {grammarData && Object.entries(grammarData.topics).map(([, topic]) => (
          <div key={topic.id} className="grammar-card">
            <button
              onClick={() => handleTopicSelect(topic)}
              className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-orange-50 transition-all text-left grammar-focus"
              aria-expanded={false} // Simplified since we're navigating instead of expanding inline
            >
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <span className="text-3xl md:text-4xl flex-shrink-0">{topic.icon}</span>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">{topic.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{topic.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-2">
                <span className="grammar-badge bg-orange-100 text-orange-700 border-orange-300">
                  {topic.difficulty}
                </span>
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0" />
              </div>
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderMistakesView = () => (
    <div className="space-y-4">
      {COMMON_MISTAKES.map(mistake => (
        <div key={mistake.id} className="grammar-mistake-card">
          <div className="flex items-start gap-3 md:gap-4">
            <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Common Mistake:</h3>
              <p className="grammar-example-incorrect">❌ {mistake.mistake}</p>

              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Correct Form:</h4>
              <p className="grammar-example-correct !text-green-700">✓ {mistake.correct}</p>

              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Explanation:</h4>
              <p className="text-gray-700 text-sm mb-3">{mistake.explanation}</p>

              <span className="grammar-badge bg-red-100 text-red-700 border-red-300">
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
        <div key={tip.id} className="grammar-tip-card">
          <div className="flex items-start gap-3 md:gap-4">
            <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">{tip.title}</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">{tip.description}</p>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-600">Related Topics:</span>
                {tip.relatedTopics.map(topicId => (
                  <span key={topicId} className="grammar-badge bg-yellow-100 text-yellow-700 border-yellow-300">
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
        <div key={example.id} className="grammar-example-card">
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

          <span className="inline-block mt-3 grammar-badge bg-blue-100 text-blue-700 border-blue-300">
            Topic: {example.topic}
          </span>
        </div>
      ))}
    </div>
  );

  const renderQuizView = () => (
    <div className="space-y-4">
      {GRAMMAR_QUIZZES.map(quiz => (
        <div key={quiz.quizId} className="grammar-quiz-card">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 truncate">{quiz.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm">{quiz.questions.length} questions • {quiz.duration} mins</p>
            </div>
            <span className="grammar-badge bg-orange-100 text-orange-700 border-orange-300 flex-shrink-0">
              {quiz.difficulty}
            </span>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 mb-4 border-2 border-orange-200">
            <p className="text-gray-700 text-xs md:text-sm mb-3 font-semibold">Topics covered:</p>
            <div className="flex flex-wrap gap-2">
              {quiz.topics.map(topic => (
                <span key={topic} className="grammar-badge bg-orange-200 text-orange-700 border-orange-300">
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

          <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base grammar-focus grammar-hover-transform">
            <PlayCircle className="w-4 h-4 md:w-5 md:h-5" />
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );

  // Main render
  return (
    <div className="grammar-container p-4 sm:p-6 lg:p-8">
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

        {/* No Results */}
        {searchQuery && searchResults.length === 0 && activeTab === 'topics' && !selectedTopic && (
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
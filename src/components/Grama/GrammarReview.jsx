import React, { useState, useCallback, useMemo } from 'react';
import { 
  ChevronDown, ChevronUp, BookOpen, AlertCircle, Lightbulb, 
  PlayCircle, CheckCircle, XCircle, Award, Search 
} from 'lucide-react';
import { 
  GRAMMAR_DATA, getGrammarByLevel, searchLessons, 
  GRAMMAR_QUIZZES, COMMON_MISTAKES, STUDY_TIPS, REAL_WORLD_EXAMPLES 
} from '../../data/grammarData';
import GrammarTopicPage from './GrammarTopicPage';
import '../styles/GrammarReview.css';

const GrammarReview = () => {
  // State Management
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [activeTab, setActiveTab] = useState('topics');
  const [completedLessons, setCompletedLessons] = useState([]);

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

  // Render Functions - Optimized for mobile
  const renderHeader = () => (
    <div className="grammar-header">
      <div className="grammar-header-content">
        <div className="grammar-header-title">
          <h1 className="grammar-title">
            📚 Grammar Review
          </h1>
          <p className="grammar-subtitle">Master English grammar with interactive lessons</p>
        </div>
        <div className="grammar-progress-card">
          <div className="grammar-progress-value">{calculateProgress()}%</div>
          <p className="grammar-progress-label">Progress</p>
        </div>
      </div>

      <div className="grammar-level-buttons">
        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
          <button
            key={level}
            onClick={() => handleLevelChange(level)}
            className={`grammar-level-btn ${
              selectedLevel === level ? 'active' : ''
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSearchFilter = () => (
    <div className="grammar-search-section">
      <div className="grammar-search-wrapper">
        <Search className="grammar-search-icon" />
        <input
          type="text"
          placeholder="Search topics, lessons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="grammar-search-input"
          aria-label="Search grammar topics"
        />
      </div>
      <div className="grammar-filter-buttons">
        {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff)}
            className={`grammar-filter-btn ${
              filterDifficulty === diff ? 'active' : ''
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
      { id: 'topics', label: 'Topics', icon: '📖' },
      { id: 'mistakes', label: 'Mistakes', icon: '⚠️' },
      { id: 'tips', label: 'Tips', icon: '💡' },
      { id: 'examples', label: 'Examples', icon: '🌍' },
      { id: 'quiz', label: 'Quizzes', icon: '🎯' },
    ];

    return (
      <div className="grammar-tabs-container">
        <div className="grammar-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`grammar-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="grammar-tab-icon">{tab.icon}</span>
              <span className="grammar-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTopicsView = () => {
    if (selectedTopic) {
      return (
        <div className="grammar-topic-page">
          <button
            onClick={() => setSelectedTopic(null)}
            className="grammar-back-btn"
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

    return (
      <div className="grammar-topics-list">
        {grammarData && Object.entries(grammarData.topics).map(([, topic]) => (
          <div key={topic.id} className="grammar-topic-card">
            <button
              onClick={() => handleTopicSelect(topic)}
              className="grammar-topic-btn"
            >
              <div className="grammar-topic-content">
                <span className="grammar-topic-icon">{topic.icon}</span>
                <div className="grammar-topic-info">
                  <h3 className="grammar-topic-title">{topic.title}</h3>
                  <p className="grammar-topic-desc">{topic.description}</p>
                </div>
              </div>
              <div className="grammar-topic-meta">
                <span className="grammar-difficulty-badge">
                  {topic.difficulty}
                </span>
                <ChevronDown className="grammar-chevron" />
              </div>
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderMistakesView = () => (
    <div className="grammar-content-list">
      {COMMON_MISTAKES.map(mistake => (
        <div key={mistake.id} className="grammar-mistake-card">
          <div className="grammar-mistake-content">
            <XCircle className="grammar-mistake-icon" />
            <div className="grammar-mistake-body">
              <div className="grammar-mistake-section">
                <h3 className="grammar-mistake-heading">Common Mistake:</h3>
                <p className="grammar-example-wrong">❌ {mistake.mistake}</p>
              </div>

              <div className="grammar-mistake-section">
                <h4 className="grammar-mistake-heading">Correct Form:</h4>
                <p className="grammar-example-right">✓ {mistake.correct}</p>
              </div>

              <div className="grammar-mistake-section">
                <h4 className="grammar-mistake-heading">Explanation:</h4>
                <p className="grammar-explanation">{mistake.explanation}</p>
              </div>

              <span className="grammar-topic-badge">
                Topic: {mistake.topic}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTipsView = () => (
    <div className="grammar-content-list">
      {STUDY_TIPS.map(tip => (
        <div key={tip.id} className="grammar-tip-card">
          <div className="grammar-tip-content">
            <Lightbulb className="grammar-tip-icon" />
            <div className="grammar-tip-body">
              <h3 className="grammar-tip-title">{tip.title}</h3>
              <p className="grammar-tip-desc">{tip.description}</p>

              <div className="grammar-tip-topics">
                <span className="grammar-tip-topics-label">Related Topics:</span>
                <div className="grammar-tip-topics-list">
                  {tip.relatedTopics.map(topicId => (
                    <span key={topicId} className="grammar-related-badge">
                      {topicId.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExamplesView = () => (
    <div className="grammar-content-list">
      {REAL_WORLD_EXAMPLES.map(example => (
        <div key={example.id} className="grammar-example-card">
          <div className="grammar-example-context">
            {example.context}
          </div>
          
          <div className="grammar-example-section">
            <p className="grammar-example-label">Example:</p>
            <div className="grammar-example-text">
              "{example.original}"
            </div>
          </div>

          <div className="grammar-example-section">
            <p className="grammar-example-label">Why:</p>
            <p className="grammar-example-explanation">{example.explanation}</p>
          </div>

          <span className="grammar-example-badge">
            Topic: {example.topic}
          </span>
        </div>
      ))}
    </div>
  );

  const renderQuizView = () => (
    <div className="grammar-content-list">
      {GRAMMAR_QUIZZES.map(quiz => (
        <div key={quiz.quizId} className="grammar-quiz-card">
          <div className="grammar-quiz-header">
            <div className="grammar-quiz-info">
              <h3 className="grammar-quiz-title">{quiz.title}</h3>
              <p className="grammar-quiz-meta">
                {quiz.questions.length} questions • {quiz.duration} mins
              </p>
            </div>
            <span className="grammar-quiz-difficulty">
              {quiz.difficulty}
            </span>
          </div>

          <div className="grammar-quiz-topics">
            <p className="grammar-quiz-topics-label">Topics covered:</p>
            <div className="grammar-quiz-topics-list">
              {quiz.topics.map(topic => (
                <span key={topic} className="grammar-quiz-topic-badge">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="grammar-quiz-score">
            <span className="grammar-quiz-score-label">Passing Score:</span> {quiz.passingScore}%
          </div>

          <button className="grammar-quiz-btn">
            <PlayCircle className="grammar-quiz-btn-icon" />
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );

  // Main render
  return (
    <div className="grammar-container">
      <div className="grammar-wrapper">
        {renderHeader()}
        {renderSearchFilter()}
        {renderTabNavigation()}

        <div className="grammar-main-content">
          {activeTab === 'topics' && renderTopicsView()}
          {activeTab === 'mistakes' && renderMistakesView()}
          {activeTab === 'tips' && renderTipsView()}
          {activeTab === 'examples' && renderExamplesView()}
          {activeTab === 'quiz' && renderQuizView()}
        </div>

        {searchQuery && searchResults.length === 0 && activeTab === 'topics' && !selectedTopic && (
          <div className="grammar-no-results">
            <BookOpen className="grammar-no-results-icon" />
            <p className="grammar-no-results-text">No results found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarReview;
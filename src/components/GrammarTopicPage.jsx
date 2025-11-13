import React, { useState, useEffect, useCallback, useMemo, memo, lazy, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Lightbulb, 
  Award, 
  CheckCircle, 
  XCircle, 
  Languages, 
  Volume2,
  Star,
  Sparkles,
  Trophy,
  Target,
  Zap,
  Brain,
  Play,
  Check,
  Loader2
} from 'lucide-react';
import './styles/GrammarTopicPage.css';

// Lazy load components for better performance
const ConfettiEffect = lazy(() => import('./ConfettiEffect'));

// Memoized sub-components
const ProgressBar = memo(({ percentage }) => (
  <div className="mt-6">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-700">Your Progress</span>
      <span className="text-sm font-bold text-purple-600">{percentage}%</span>
    </div>
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative"
        style={{ width: `${percentage}%` }}
      >
        <div className="progress-bar-shimmer animate-shimmer"></div>
      </div>
    </div>
  </div>
));

ProgressBar.displayName = 'ProgressBar';

// Memoized Badge Component
const Badge = memo(({ type, icon: Icon, children }) => {
  const classMap = {
    difficulty: 'badge-difficulty',
    streak: 'badge-streak',
    completion: 'badge-completion',
    completed: 'badge-completed'
  };

  return (
    <span className={`grammar-badge ${classMap[type]}`}>
      <Icon className="w-4 h-4" />
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

// Memoized Example Card
const ExampleCard = memo(({ example, index }) => (
  <div className="example-card group">
    <div className="flex items-start gap-4 mb-4">
      <span className="text-4xl group-hover:animate-bounce">💡</span>
      <div className="flex-1">
        <p className="font-semibold text-blue-900 text-lg mb-2">{example.example}</p>
        <p className="text-gray-600 text-sm italic">{example.explanation}</p>
      </div>
    </div>
    <div className="example-vietnamese">
      <p className="font-semibold text-green-800 mb-1">{example.vietnamese.example}</p>
      <p className="text-gray-600 text-sm">{example.vietnamese.explanation}</p>
    </div>
  </div>
));

ExampleCard.displayName = 'ExampleCard';

// Memoized Exercise Component
const Exercise = memo(({ exercise, index, result, onSubmit }) => {
  const [localAnswer, setLocalAnswer] = useState('');

  const handleInputBlur = useCallback((e) => {
    const userAnswer = e.target.value.trim().toLowerCase();
    const correct = userAnswer === exercise.correctAnswer.toLowerCase();
    onSubmit(exercise.exerciseId, correct);
  }, [exercise.exerciseId, exercise.correctAnswer, onSubmit]);

  const handleInputChange = useCallback((e) => {
    setLocalAnswer(e.target.value);
  }, []);

  return (
    <div className="exercise-card">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="exercise-number">{index + 1}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {exercise.type.replace('_', ' ').toUpperCase()}
            </h3>
            <span className="text-sm text-gray-500">{exercise.difficulty}</span>
          </div>
        </div>
        
        {result !== undefined && (
          <div 
            className={`grammar-badge ${result ? 'badge-completed' : ''}`}
            style={!result ? {backgroundColor: '#fee2e2', color: '#991b1b'} : {}}
          >
            {result ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Correct! 🎉</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                <span>Try Again</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="exercise-question">
        <p className="text-lg font-medium text-gray-800">{exercise.question}</p>
      </div>

      {exercise.type === 'multiple_choice' ? (
        <div className="space-y-4">
          {exercise.options.map((option, idx) => (
            <label key={idx} className="exercise-option group">
              <input
                type="radio"
                name={exercise.exerciseId}
                className="mr-4 w-5 h-5 text-blue-600"
                onChange={() => onSubmit(exercise.exerciseId, option.isCorrect)}
              />
              <span className="text-gray-800 font-medium group-hover:text-blue-700">
                {option.text}
              </span>
            </label>
          ))}
          {result !== undefined && (
            <div className={`exercise-feedback ${result ? 'correct' : 'incorrect'}`}>
              <p className="font-bold mb-2 text-lg">
                {result ? '✅ Excellent!' : '💡 Learn from this:'}
              </p>
              <p>
                <strong>Explanation:</strong> {exercise.options.find((opt) => opt.isCorrect).explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={localAnswer}
            onChange={handleInputChange}
            placeholder="Type your answer here..."
            className="exercise-input"
            onBlur={handleInputBlur}
          />
          {exercise.hints && (
            <div className="hints-box">
              <p className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Hints:
              </p>
              <div className="space-y-2">
                {exercise.hints.map((hint, idx) => (
                  <p key={idx} className="text-gray-700 flex items-start gap-2">
                    <span className="text-blue-500">▸</span>
                    {hint}
                  </p>
                ))}
              </div>
            </div>
          )}
          {result !== undefined && (
            <div className={`exercise-feedback ${result ? 'correct' : 'incorrect'}`}>
              <p className="font-bold text-lg mb-2">
                {result
                  ? '🎉 Perfect! Well done!'
                  : `❌ Incorrect. The correct answer is: ${exercise.correctAnswer}`}
              </p>
              <p>
                <strong>Explanation:</strong> {exercise.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

Exercise.displayName = 'Exercise';

// Main Component
const GrammarTopicPage = ({ topic, completedLessons = {}, onLessonComplete }) => {
  const [completedLessonsState, setCompletedLessons] = useState(completedLessons);
  const [exerciseResults, setExerciseResults] = useState({});
  const [activeLanguage, setActiveLanguage] = useState('English');
  const [expandedSections, setExpandedSections] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(() => {
    // Load streak from localStorage
    const saved = localStorage.getItem('learningStreak');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [animatingLesson, setAnimatingLesson] = useState(null);

  // Save streak to localStorage
  useEffect(() => {
    localStorage.setItem('learningStreak', currentStreak.toString());
  }, [currentStreak]);

  // Confetti cleanup
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Save completed lessons to localStorage
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessonsState));
  }, [completedLessonsState]);

  // Optimized handlers with useCallback
  const handleLessonComplete = useCallback((lessonId) => {
    setCompletedLessons(prev => {
      const isCompleted = prev[lessonId];
      const newState = { ...prev, [lessonId]: !isCompleted };
      
      if (!isCompleted) {
        setAnimatingLesson(lessonId);
        setCurrentStreak(prevStreak => prevStreak + 1);
        setShowConfetti(true);
        setTimeout(() => setAnimatingLesson(null), 1000);
      }
      
      return newState;
    });
    
    if (onLessonComplete) onLessonComplete(lessonId);
  }, [onLessonComplete]);

  const handleExerciseSubmit = useCallback((exerciseId, isCorrect) => {
    setExerciseResults(prev => ({ ...prev, [exerciseId]: isCorrect }));
    if (isCorrect) {
      setShowConfetti(true);
      // Play success sound (optional)
      playSuccessSound();
    }
  }, []);

  const toggleSection = useCallback((sectionId) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }, []);

  const toggleLanguage = useCallback((lang) => {
    setActiveLanguage(lang);
  }, []);

  // Success sound (optional)
  const playSuccessSound = useCallback(() => {
    const audio = new Audio('/sounds/success.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore errors
  }, []);

  // Memoized completion percentage
  const completionPercentage = useMemo(() => {
    return Math.round(
      (Object.values(completedLessonsState).filter(Boolean).length / topic.lessons.length) * 100
    );
  }, [completedLessonsState, topic.lessons.length]);

  // Memoized markdown components
  const components = useMemo(() => ({
    h2: ({ children }) => (
      <h2 className="prose h2">
        <span className="text-3xl">📌</span>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="prose h3">
        <Sparkles className="w-5 h-5 text-yellow-500" />
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="prose p">{children}</p>,
    ul: ({ children }) => <ul className="prose ul">{children}</ul>,
    li: ({ children }) => (
      <li className="prose li group">
        <span className="text-blue-500 mt-1 group-hover:scale-125 transition-transform">▸</span>
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }) => <strong className="prose strong">{children}</strong>,
    code: ({ children }) => <code className="prose code">{children}</code>,
    blockquote: ({ children }) => (
      <blockquote className="prose blockquote">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
          <div>{children}</div>
        </div>
      </blockquote>
    ),
  }), []);

  // Optimized content filter
  const getFilteredContent = useCallback((content, lang) => {
    if (lang === 'English') {
      return content.replace(/\*\*Vietnamese Translation \(.*?\):\*\*(.*?)(\n\*\*|$)/gs, '').trim();
    } else {
      return content.replace(/\*\*English:\*\*(.*?)(\n\*\*Vietnamese Translation \(.*?\):\*\*|$)/gs, '').trim();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="background-blobs">
        <div className="background-blob background-blob-1 animate-blob"></div>
        <div className="background-blob background-blob-2 animate-blob animation-delay-2000"></div>
        <div className="background-blob background-blob-3 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti Effect with Lazy Loading */}
      {showConfetti && (
        <Suspense fallback={null}>
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 0.5}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        </Suspense>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Header with Progress */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-4 border-purple-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full -mr-20 -mt-20 opacity-50"></div>
          
          <div className="flex items-start gap-6 relative z-10">
            <div className="text-7xl animate-bounce-icon">{topic.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-3">
                {topic.title}
              </h1>
              <p className="text-gray-600 text-lg mb-4 italic">{topic.description}</p>
              
              <div className="flex items-center gap-4 flex-wrap">
                <Badge type="difficulty" icon={Target}>
                  {topic.difficulty}
                </Badge>
                
                <Badge type="streak" icon={Zap}>
                  {currentStreak} Streak
                </Badge>

                <Badge type="completion" icon={Trophy}>
                  {completionPercentage}% Complete
                </Badge>
              </div>

              <ProgressBar percentage={completionPercentage} />
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="mb-8">
          <h2 className="section-header lessons">
            <BookOpen className="w-8 h-8" />
            <span>Lessons • Bài Học</span>
            <Sparkles className="w-8 h-8" />
          </h2>

          <div className="space-y-6">
            {topic.lessons.map((lesson, index) => (
              <div 
                key={lesson.lessonId} 
                className={`lesson-card ${animatingLesson === lesson.lessonId ? 'animate-pulse-scale' : ''}`}
              >
                {/* Lesson Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="lesson-number">{index + 1}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">{lesson.title}</h3>
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                  
                  {completedLessonsState[lesson.lessonId] ? (
                    <Badge type="completed" icon={CheckCircle}>
                      Completed!
                    </Badge>
                  ) : (
                    <button
                      onClick={() => handleLessonComplete(lesson.lessonId)}
                      className="btn-complete"
                      aria-label="Mark lesson as complete"
                    >
                      <Check className="w-5 h-5" />
                      Mark Complete
                    </button>
                  )}
                </div>

                {/* Language Toggle */}
                <div className="language-toggle-container" role="tablist">
                  {['English', 'Vietnamese'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`language-toggle-button ${activeLanguage === lang ? 'active' : ''}`}
                      role="tab"
                      aria-selected={activeLanguage === lang}
                      aria-label={`Switch to ${lang}`}
                    >
                      <Languages className="w-5 h-5" />
                      {lang === 'English' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
                    </button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="content-area prose prose-lg max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={components}
                  >
                    {getFilteredContent(lesson.content, activeLanguage)}
                  </ReactMarkdown>
                </div>

                {/* Examples */}
                {lesson.examples && lesson.examples.length > 0 && (
                  <div className="mt-8">
                    <h4 className="font-bold mb-5 text-2xl flex items-center gap-3 text-gray-800">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </div>
                      Examples • Ví Dụ
                    </h4>
                    <div className="grid gap-6 md:grid-cols-2">
                      {lesson.examples.map((ex, idx) => (
                        <ExampleCard key={idx} example={ex} index={idx} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-Sections Accordion */}
                {lesson.subSections && lesson.subSections.map((section, idx) => (
                  <div key={idx} className="mt-6 border-t-2 border-gray-200 pt-6">
                    <button
                      onClick={() => toggleSection(`${lesson.lessonId}-section-${idx}`)}
                      className="accordion-button"
                      aria-expanded={expandedSections[`${lesson.lessonId}-section-${idx}`]}
                      aria-label={`Toggle ${section.title}`}
                    >
                      <span className="font-bold text-gray-800 text-lg flex items-center gap-3">
                        <Brain className="w-6 h-6 text-purple-500" />
                        {section.title}
                      </span>
                      {expandedSections[`${lesson.lessonId}-section-${idx}`] ? (
                        <ChevronUp className="w-6 h-6 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    {expandedSections[`${lesson.lessonId}-section-${idx}`] && (
                      <div className="accordion-content animate-fade-in">
                        <ReactMarkdown components={components}>{section.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Exercises Section */}
        <div className="mb-8">
          <h2 className="section-header exercises">
            <Award className="w-8 h-8" />
            <span>Exercises • Bài Tập</span>
            <Trophy className="w-8 h-8" />
          </h2>

          <div className="space-y-6">
            {topic.exercises.map((exercise, index) => (
              <Exercise
                key={exercise.exerciseId}
                exercise={exercise}
                index={index}
                result={exerciseResults[exercise.exerciseId]}
                onSubmit={handleExerciseSubmit}
              />
            ))}
          </div>
        </div>

        {/* Vocabulary Section */}
        <div className="mb-8">
          <h2 className="section-header vocabulary">
            <Volume2 className="w-8 h-8" />
            <span>Vocabulary • Từ Vựng</span>
            <Star className="w-8 h-8" />
          </h2>
          
          <div className="vocabulary-table">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Meaning</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                {topic.vocabulary.map((vocab, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="vocabulary-word">{vocab.word}</span>
                    </td>
                    <td className="text-gray-700 font-medium">{vocab.meaning}</td>
                    <td>
                      <code className="vocabulary-example">{vocab.example}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="motivational-footer">
          <h3 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10" />
            Keep Learning! Tiếp Tục Học!
            <Sparkles className="w-10 h-10" />
          </h3>
          <p className="text-xl mb-4">
            You're doing amazing! Every lesson brings you closer to fluency! 🚀
          </p>
          <div className="footer-stats">
            <span className="footer-stat-item">
              <Star className="w-5 h-5" />
              {Object.values(completedLessonsState).filter(Boolean).length} Lessons Completed
            </span>
            <span className="footer-stat-item">
              <Zap className="w-5 h-5" />
              {currentStreak} Day Streak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(GrammarTopicPage);
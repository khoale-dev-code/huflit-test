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
} from 'lucide-react';
import '../styles/GrammarTopicPage.css';

const ConfettiEffect = lazy(() => import('../ConfettiEffect'));

const ProgressBar = memo(({ percentage }) => (
  <div className="mt-6">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-slate-600">Your Progress</span>
      <span className="text-sm font-bold text-grammar-accent">{percentage}%</span>
    </div>
    <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
      <div
        className="h-full bg-gradient-to-r from-grammar-primary via-grammar-blue to-grammar-accent rounded-full transition-all duration-1000 ease-out relative"
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      </div>
    </div>
  </div>
));
ProgressBar.displayName = 'ProgressBar';

const Badge = memo(({ type, icon: Icon, children }) => {
  const styles = {
    difficulty: 'bg-grammar-primary text-white',
    streak: 'bg-grammar-accent text-white',
    completion: 'bg-grammar-blue text-white',
    completed: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform hover:scale-105 ${styles[type]}`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';

const ExampleCard = memo(({ example }) => (
  <div className="bg-white p-5 rounded-xl border-2 border-grammar-blue-light transition-all hover:border-grammar-blue hover:shadow-md hover:-translate-y-0.5">
    <div className="flex items-start gap-4 mb-4">
      <span className="text-4xl">💡</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-grammar-primary text-lg mb-2">{example.example}</p>
        <p className="text-slate-600 text-sm italic">{example.explanation}</p>
      </div>
    </div>
    <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200 mt-3.5 text-sm">
      <p className="font-semibold text-emerald-800 mb-1">{example.vietnamese.example}</p>
      <p className="text-slate-600">{example.vietnamese.explanation}</p>
    </div>
  </div>
));
ExampleCard.displayName = 'ExampleCard';

const Exercise = memo(({ exercise, index, result, onSubmit }) => {
  const [localAnswer, setLocalAnswer] = useState('');

  const handleInputBlur = useCallback(
    (e) => {
      const userAnswer = e.target.value.trim().toLowerCase();
      const correct = userAnswer === exercise.correctAnswer.toLowerCase();
      onSubmit(exercise.exerciseId, correct);
    },
    [exercise.exerciseId, exercise.correctAnswer, onSubmit]
  );

  const handleInputChange = useCallback((e) => setLocalAnswer(e.target.value), []);

  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 border-2 border-grammar-blue-light transition-all hover:border-grammar-accent hover:shadow-md animate-[slideDown_0.3s_ease-out]">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-grammar-accent text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
            {index + 1}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              {exercise.type.replace('_', ' ').toUpperCase()}
            </h3>
            <span className="text-sm text-slate-500">{exercise.difficulty}</span>
          </div>
        </div>

        {result !== undefined && (
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold ${
              result ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
            }`}
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

      <div className="p-4 rounded-lg bg-amber-50 border-2 border-amber-200 mb-4">
        <p className="text-lg font-medium text-slate-800">{exercise.question}</p>
      </div>

      {exercise.type === 'multiple_choice' ? (
        <div className="space-y-3">
          {exercise.options.map((option, idx) => (
            <label
              key={idx}
              className="flex items-center p-4 rounded-lg border-2 border-slate-200 bg-white cursor-pointer transition-colors hover:bg-grammar-blue-soft hover:border-grammar-blue"
            >
              <input
                type="radio"
                name={exercise.exerciseId}
                className="mr-4 w-5 h-5 accent-[#00358E]"
                onChange={() => onSubmit(exercise.exerciseId, option.isCorrect)}
              />
              <span className="text-slate-800 font-medium">{option.text}</span>
            </label>
          ))}
          {result !== undefined && (
            <div
              className={`mt-4 p-4 rounded-lg border-2 text-sm ${
                result
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <p className="font-bold text-lg mb-2">
                {result ? '✅ Excellent!' : '💡 Learn from this:'}
              </p>
              <p>
                <strong>Explanation:</strong>{' '}
                {exercise.options.find((opt) => opt.isCorrect).explanation}
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
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg text-base bg-white transition-colors focus:outline-none focus:border-grammar-primary focus:ring-2 focus:ring-grammar-accent-soft placeholder:text-slate-400"
            onBlur={handleInputBlur}
          />
          {exercise.hints && (
            <div className="mt-4 p-4 bg-grammar-blue-soft border-2 border-grammar-blue-light rounded-lg text-sm">
              <p className="font-bold text-grammar-primary mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-grammar-accent" />
                Hints:
              </p>
              <div className="space-y-2">
                {exercise.hints.map((hint, idx) => (
                  <p key={idx} className="text-slate-700 flex items-start gap-2">
                    <span className="text-grammar-accent">▸</span>
                    {hint}
                  </p>
                ))}
              </div>
            </div>
          )}
          {result !== undefined && (
            <div
              className={`mt-4 p-4 rounded-lg border-2 text-sm ${
                result
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
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

const GrammarTopicPage = ({ topic, completedLessons = {}, onLessonComplete }) => {
  const [completedLessonsState, setCompletedLessons] = useState(completedLessons);
  const [exerciseResults, setExerciseResults] = useState({});
  const [activeLanguage, setActiveLanguage] = useState('English');
  const [expandedSections, setExpandedSections] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(() => {
    const saved = localStorage.getItem('learningStreak');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [animatingLesson, setAnimatingLesson] = useState(null);

  useEffect(() => {
    localStorage.setItem('learningStreak', currentStreak.toString());
  }, [currentStreak]);

  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessonsState));
  }, [completedLessonsState]);

  const handleLessonComplete = useCallback(
    (lessonId) => {
      setCompletedLessons((prev) => {
        const isCompleted = prev[lessonId];
        const newState = { ...prev, [lessonId]: !isCompleted };
        if (!isCompleted) {
          setAnimatingLesson(lessonId);
          setCurrentStreak((s) => s + 1);
          setShowConfetti(true);
          setTimeout(() => setAnimatingLesson(null), 1000);
        }
        return newState;
      });
      if (onLessonComplete) onLessonComplete(lessonId);
    },
    [onLessonComplete]
  );

  const handleExerciseSubmit = useCallback((exerciseId, isCorrect) => {
    setExerciseResults((prev) => ({ ...prev, [exerciseId]: isCorrect }));
    if (isCorrect) setShowConfetti(true);
  }, []);

  const toggleSection = useCallback((id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleLanguage = useCallback((lang) => setActiveLanguage(lang), []);

  const completionPercentage = useMemo(
    () =>
      Math.round(
        (Object.values(completedLessonsState).filter(Boolean).length / topic.lessons.length) * 100
      ),
    [completedLessonsState, topic.lessons.length]
  );

  const components = useMemo(
    () => ({
      h2: ({ children }) => (
        <h2 className="text-xl font-bold text-grammar-primary mb-3 mt-6 flex items-center gap-2">
          <span className="text-3xl">📌</span>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-5 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-grammar-accent shrink-0" />
          {children}
        </h3>
      ),
      p: ({ children }) => <p className="text-slate-600 leading-relaxed mb-3 text-[15px]">{children}</p>,
      ul: ({ children }) => <ul className="mb-3 pl-0 list-none">{children}</ul>,
      li: ({ children }) => (
        <li className="flex items-start gap-2 mb-2 text-sm text-slate-600">
          <span className="text-grammar-accent mt-0.5">▸</span>
          <span>{children}</span>
        </li>
      ),
      strong: ({ children }) => (
        <strong className="font-semibold text-grammar-primary bg-grammar-blue-soft px-1 rounded">
          {children}
        </strong>
      ),
      code: ({ children }) => (
        <code className="bg-grammar-blue-soft text-grammar-primary px-2 py-0.5 rounded text-sm font-mono border border-grammar-blue-light">
          {children}
        </code>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-grammar-accent bg-grammar-accent-soft pl-4 py-2 my-3 italic text-slate-700 rounded-r text-sm">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-grammar-accent shrink-0 mt-0.5" />
            <div>{children}</div>
          </div>
        </blockquote>
      ),
    }),
    []
  );

  const getFilteredContent = useCallback((content, lang) => {
    if (lang === 'English') {
      return content.replace(/\*\*Vietnamese Translation \(.*?\):\*\*(.*?)(\n\*\*|$)/gs, '').trim();
    }
    return content
      .replace(/\*\*English:\*\*(.*?)(\n\*\*Vietnamese Translation \(.*?\):\*\*|$)/gs, '')
      .trim();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-grammar-blue-soft/50 p-4 sm:p-6 relative overflow-hidden">
      {/* Background blobs - lightweight */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-0 -left-20 w-72 h-72 bg-grammar-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-grammar-accent/5 rounded-full blur-3xl" />
      </div>

      {showConfetti && (
        <Suspense fallback={null}>
          <div className="grammar-confetti-container">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="grammar-confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 40}%`,
                  backgroundColor: ['#00358E', '#FF7D00', '#2563eb', '#10b981', '#f59e0b'][
                    Math.floor(Math.random() * 5)
                  ],
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        </Suspense>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Hero header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-grammar-blue-light relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-grammar-accent/10 rounded-full -mr-16 -mt-16" />
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 relative z-10">
            <div className="text-6xl sm:text-7xl">{topic.icon}</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-grammar-primary mb-2">
                {topic.title}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg mb-4 italic">{topic.description}</p>
              <div className="flex flex-wrap items-center gap-3">
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

        {/* Lessons */}
        <section className="mb-8">
          <h2 className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-bold text-white py-4 px-5 rounded-xl bg-gradient-to-r from-grammar-primary to-grammar-blue mb-6 shadow-md">
            <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
            <span>Lessons • Bài Học</span>
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
          </h2>

          <div className="space-y-6">
            {topic.lessons.map((lesson, index) => (
              <article
                key={lesson.lessonId}
                className={`bg-white rounded-xl p-5 sm:p-6 border-2 border-grammar-blue-light transition-all hover:border-grammar-blue hover:shadow-md ${
                  animatingLesson === lesson.lessonId ? 'animate-pulse' : ''
                }`}
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-grammar-primary text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
                        {lesson.title}
                      </h3>
                      <span className="text-sm text-slate-500 flex items-center gap-2">
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
                      type="button"
                      onClick={() => handleLessonComplete(lesson.lessonId)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-grammar-accent focus:ring-offset-2"
                      aria-label="Mark lesson as complete"
                    >
                      <Check className="w-5 h-5" />
                      Mark Complete
                    </button>
                  )}
                </div>

                <div
                  className="flex bg-slate-100 rounded-xl p-1 mb-5 gap-1"
                  role="tablist"
                  aria-label="Content language"
                >
                  {['English', 'Vietnamese'].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      role="tab"
                      aria-selected={activeLanguage === lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold min-h-[40px] transition-colors focus:outline-none focus:ring-2 focus:ring-grammar-primary ${
                        activeLanguage === lang
                          ? 'bg-grammar-primary text-white shadow'
                          : 'text-slate-600 hover:bg-white'
                      }`}
                      aria-label={`Switch to ${lang}`}
                    >
                      <Languages className="w-5 h-5 shrink-0" />
                      {lang === 'English' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
                    </button>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-white to-grammar-blue-soft/30 p-5 rounded-xl border-2 border-grammar-blue-light mb-6 prose-grammar">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={components}
                  >
                    {getFilteredContent(lesson.content, activeLanguage)}
                  </ReactMarkdown>
                </div>

                {lesson.examples?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-bold text-xl sm:text-2xl text-slate-800 mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-grammar-accent flex items-center justify-center shrink-0">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </span>
                      Examples • Ví Dụ
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {lesson.examples.map((ex, idx) => (
                        <ExampleCard key={idx} example={ex} />
                      ))}
                    </div>
                  </div>
                )}

                {lesson.subSections?.map((section, idx) => {
                  const sectionId = `${lesson.lessonId}-section-${idx}`;
                  const isOpen = expandedSections[sectionId];
                  return (
                    <div key={idx} className="mt-6 pt-6 border-t-2 border-slate-200">
                      <button
                        type="button"
                        onClick={() => toggleSection(sectionId)}
                        className="w-full flex justify-between items-center p-4 rounded-lg border-2 border-slate-200 bg-white hover:bg-grammar-blue-soft hover:border-grammar-blue transition-colors text-left min-h-[48px] focus:outline-none focus:ring-2 focus:ring-grammar-primary"
                        aria-expanded={isOpen}
                        aria-label={`Toggle ${section.title}`}
                      >
                        <span className="font-bold text-slate-800 flex items-center gap-3">
                          <Brain className="w-6 h-6 text-grammar-primary shrink-0" />
                          {section.title}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-grammar-primary shrink-0" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="mt-3 p-4 rounded-lg border-2 border-grammar-blue-light bg-white">
                          <ReactMarkdown components={components}>{section.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  );
                })}
              </article>
            ))}
          </div>
        </section>

        {/* Exercises */}
        <section className="mb-8">
          <h2 className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-bold text-white py-4 px-5 rounded-xl bg-gradient-to-r from-grammar-accent to-grammar-primary mb-6 shadow-md">
            <Award className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
            <span>Exercises • Bài Tập</span>
            <Trophy className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
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
        </section>

        {/* Vocabulary */}
        <section className="mb-8">
          <h2 className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-bold text-white py-4 px-5 rounded-xl bg-gradient-to-r from-grammar-blue to-grammar-primary mb-6 shadow-md">
            <Volume2 className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
            <span>Vocabulary • Từ Vựng</span>
            <Star className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
          </h2>
          <div className="bg-white rounded-xl border-2 border-grammar-blue-light overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px]">
                <thead>
                  <tr className="bg-grammar-primary text-white">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                      Word
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                      Meaning
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topic.vocabulary.map((vocab, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-200 transition-colors hover:bg-grammar-blue-soft/50"
                    >
                      <td className="px-4 py-3">
                        <span className="inline-block px-2.5 py-1.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold text-[15px]">
                          {vocab.word}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-medium text-sm sm:text-base">
                        {vocab.meaning}
                      </td>
                      <td className="px-4 py-3">
                        <code className="block mt-1 px-2.5 py-1.5 rounded bg-slate-100 text-slate-700 text-sm font-mono border border-slate-200 break-words">
                          {vocab.example}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(GrammarTopicPage);

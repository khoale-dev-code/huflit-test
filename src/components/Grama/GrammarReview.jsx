import React, { useState, useCallback, useMemo, useEffect, useRef, lazy, Suspense } from 'react';
import {
  ChevronDown,
  BookOpen,
  Lightbulb,
  PlayCircle,
  XCircle,
  Search,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  getGrammarByLevel,
  searchLessons,
  getLessonIdsByLevel,
  getLessonIdsForTopicIds,
  GRAMMAR_QUIZZES,
  COMMON_MISTAKES,
  STUDY_TIPS,
  REAL_WORLD_EXAMPLES,
} from '../../data/grammarData';

// ✅ LAZY LOAD: GrammarTopicPage
const GrammarTopicPage = lazy(() => import('./GrammarTopicPage'));

import '../styles/GrammarReview.css';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const TABS = [
  { id: 'topics', label: 'Topics', icon: '📖' },
  { id: 'practice', label: 'Practice', icon: '💡' },
  { id: 'quiz', label: 'Quizzes', icon: '🎯' },
];
const PRACTICE_SECTIONS = [
  { id: 'mistakes', label: 'Mistakes', icon: '⚠️' },
  { id: 'tips', label: 'Tips', icon: '💡' },
  { id: 'examples', label: 'Examples', icon: '🌍' },
];

const BOOKMARK_TIPS_KEY = 'grammar-bookmarked-tips';
const BOOKMARK_EXAMPLES_KEY = 'grammar-bookmarked-examples';

/* ──────────────────────────────────────
   STYLES & HELPERS
   ────────────────────────────────────── */

const getDifficultyStyles = (diff) => {
  const d = (diff || '').toLowerCase();
  if (d === 'beginner' || d === 'easy')
    return {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      buttonActive: 'bg-emerald-600 text-white border-emerald-600 shadow-sm',
      progress: 'from-emerald-500 to-emerald-600',
    };
  if (d === 'intermediate' || d === 'medium')
    return {
      badge: 'bg-sky-100 text-sky-800 border-sky-200',
      buttonActive: 'bg-sky-600 text-white border-sky-600 shadow-sm',
      progress: 'from-sky-500 to-sky-600',
    };
  if (d === 'advanced' || d === 'hard')
    return {
      badge: 'bg-violet-100 text-violet-800 border-violet-200',
      buttonActive: 'bg-violet-600 text-white border-violet-600 shadow-sm',
      progress: 'from-violet-500 to-violet-600',
    };
  return {
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    buttonActive: 'bg-grammar-primary text-white border-grammar-primary shadow-sm',
    progress: 'from-grammar-primary to-grammar-accent',
  };
};

const cardClass =
  'bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-200';
const cardClassInteractive = cardClass + ' hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] cursor-pointer transition-transform';

const loadBookmarks = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
};

const saveBookmarks = (key, set) => {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {}
};

const searchAll = (query, filterDifficulty) => {
  const q = query.trim().toLowerCase();
  const topicsRaw = q ? searchLessons(query) : [];
  const topicsDeduped = [...new Map((topicsRaw || []).map((r) => [r.id, { ...r, lesson: undefined }])).values()];
  let topics = topicsDeduped;
  if (filterDifficulty !== 'All') {
    topics = topics.filter((t) => t.difficulty === filterDifficulty);
  }

  const mistakes = q
    ? COMMON_MISTAKES.filter(
        (m) =>
          m.mistake.toLowerCase().includes(q) ||
          m.correct.toLowerCase().includes(q) ||
          m.explanation.toLowerCase().includes(q) ||
          m.topic.toLowerCase().includes(q)
      )
    : [];
  const tips = q
    ? STUDY_TIPS.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.relatedTopics.some((r) => r.toLowerCase().includes(q))
      )
    : [];
  const examples = q
    ? REAL_WORLD_EXAMPLES.filter(
        (e) =>
          e.context.toLowerCase().includes(q) ||
          e.original.toLowerCase().includes(q) ||
          e.explanation.toLowerCase().includes(q) ||
          e.topic.toLowerCase().includes(q)
      )
    : [];
  const quizzes = q
    ? GRAMMAR_QUIZZES.filter(
        (z) =>
          z.title.toLowerCase().includes(q) ||
          z.topics.some((t) => t.toLowerCase().includes(q)) ||
          z.difficulty.toLowerCase().includes(q)
      )
    : [];

  return { topics, mistakes, tips, examples, quizzes };
};

const fireConfetti = (full = true) => {
  confetti({
    particleCount: full ? 80 : 40,
    spread: full ? 60 : 45,
    origin: { y: 0.6 },
    colors: ['#00358E', '#FF7D00', '#2563eb'],
  });
};

const MILESTONES = [25, 50, 75, 100];

/* ──────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────── */

const GrammarReview = () => {
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [activeTab, setActiveTab] = useState('topics');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [flippedMistakes, setFlippedMistakes] = useState(() => new Set());
  const [bookmarkedTips, setBookmarkedTips] = useState(() => loadBookmarks(BOOKMARK_TIPS_KEY));
  const [bookmarkedExamples, setBookmarkedExamples] = useState(() =>
    loadBookmarks(BOOKMARK_EXAMPLES_KEY)
  );
  const [activePracticeSection, setActivePracticeSection] = useState('mistakes');
  const [showFilters, setShowFilters] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLevelLoading, setIsLevelLoading] = useState(false);
  const [completedTopics, setCompletedTopics] = useState([]);
  const mainRef = useRef(null);
  const scrollThrottleRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const prevPctRef = useRef({ Beginner: 0, Intermediate: 0, Advanced: 0 });

  const grammarData = useMemo(() => getGrammarByLevel(selectedLevel), [selectedLevel]);

  useEffect(() => {
    const THRESHOLD = 24;
    const onScroll = () => {
      if (scrollThrottleRef.current) return;
      scrollThrottleRef.current = requestAnimationFrame(() => {
        const above = window.scrollY > THRESHOLD;
        if (above !== lastScrollYRef.current) {
          lastScrollYRef.current = above;
          setIsScrolled(above);
        }
        scrollThrottleRef.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollThrottleRef.current) cancelAnimationFrame(scrollThrottleRef.current);
    };
  }, []);

  useEffect(() => {
    setIsLevelLoading(true);
    const t = setTimeout(() => setIsLevelLoading(false), 400);
    return () => clearTimeout(t);
  }, [selectedLevel]);

  const progressPerLevel = useMemo(() => {
    return LEVELS.map((level) => {
      const lessonIds = getLessonIdsByLevel(level);
      const completed = completedLessons.filter((id) => lessonIds.includes(id)).length;
      const total = lessonIds.length;
      return {
        level,
        completed,
        total,
        pct: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    });
  }, [completedLessons]);

  const recommendedTopicId = useMemo(() => {
    if (!grammarData?.topics) return null;
    for (const [, topic] of Object.entries(grammarData.topics)) {
      const lessonIds = (topic.lessons || []).map((l) => l.lessonId);
      const done = lessonIds.filter((id) => completedLessons.includes(id)).length;
      if (done < lessonIds.length) return topic.id;
    }
    return null;
  }, [grammarData, completedLessons]);

  const hybridResults = useMemo(
    () => searchAll(searchQuery, filterDifficulty),
    [searchQuery, filterDifficulty]
  );

  const handleTopicSelect = useCallback((topic) => {
    setSelectedTopic((prev) => (prev?.id === topic.id ? null : topic));
  }, []);

  const handleLevelChange = useCallback((level) => {
    setSelectedLevel(level);
    setSelectedTopic(null);
    setSearchQuery('');
    setFilterDifficulty('All');
  }, []);

  const toggleMistakeFlip = useCallback((id) => {
    setFlippedMistakes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleBookmarkTip = useCallback((id) => {
    setBookmarkedTips((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveBookmarks(BOOKMARK_TIPS_KEY, next);
      return next;
    });
  }, []);

  const toggleBookmarkExample = useCallback((id) => {
    setBookmarkedExamples((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveBookmarks(BOOKMARK_EXAMPLES_KEY, next);
      return next;
    });
  }, []);

  // ✅ MILESTONE + TOPIC COMPLETION TRACKING
  useEffect(() => {
    progressPerLevel.forEach(({ level, pct }) => {
      const prev = prevPctRef.current[level] ?? 0;
      const hit = MILESTONES.find((m) => pct >= m && prev < m);
      if (hit) {
        fireConfetti(hit === 100);
      }
      prevPctRef.current[level] = pct;
    });
  }, [progressPerLevel]);

  // ✅ TRACK COMPLETED TOPICS
  useEffect(() => {
    if (!grammarData?.topics) return;
    const newCompletedTopics = [];
    for (const [, topic] of Object.entries(grammarData.topics)) {
      const lessonIds = (topic.lessons || []).map((l) => l.lessonId);
      const done = lessonIds.filter((id) => completedLessons.includes(id)).length;
      if (done === lessonIds.length && lessonIds.length > 0) {
        newCompletedTopics.push(topic.id);
      }
    }
    setCompletedTopics(newCompletedTopics);
  }, [grammarData, completedLessons]);

  const isEmptySearch =
    searchQuery.trim() &&
    hybridResults.topics.length === 0 &&
    hybridResults.mistakes.length === 0 &&
    hybridResults.tips.length === 0 &&
    hybridResults.examples.length === 0 &&
    hybridResults.quizzes.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-grammar-blue-soft/50 p-3 sm:p-5 lg:p-6" ref={mainRef}>
      <div className="max-w-3xl mx-auto sm:max-w-4xl lg:max-w-[960px]">
        {/* Header */}
        <header className="mb-4" role="banner">
          <h1 className="text-xl sm:text-2xl font-bold text-grammar-primary tracking-tight leading-tight">
            📚 Grammar Review
          </h1>
          <p className="text-slate-700 text-sm sm:text-base mt-1 leading-relaxed">
            Master English grammar with interactive lessons
          </p>

          {/* Progress Card */}
          <div className={`${cardClass} p-4 mt-4 mb-4`}>
            <p className="text-xs font-semibold text-grammar-primary uppercase tracking-wide mb-3 leading-normal">
              Progress by level
            </p>
            <div className="flex gap-2 sm:gap-4">
              {progressPerLevel.map(({ level, completed, total, pct }) => {
                const style = getDifficultyStyles(level);
                return (
                  <div key={level} className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className={`text-xs font-semibold truncate leading-tight ${
                          selectedLevel === level ? 'text-grammar-primary' : 'text-slate-600'
                        }`}
                      >
                        {level === 'Beginner' ? 'Beg.' : level === 'Intermediate' ? 'Int.' : 'Adv.'}
                      </span>
                      <span className="text-xs font-bold text-grammar-accent tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${style.progress} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-normal">{completed}/{total}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level Buttons */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Level">
            {LEVELS.map((level) => {
              const style = getDifficultyStyles(level);
              const isActive = selectedLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleLevelChange(level)}
                  aria-pressed={isActive}
                  style={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: isActive ? style.buttonActive.split(' ').find(c => c.includes('border')) : '#e2e8f0',
                  }}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm min-h-[44px] min-w-[44px] transition-all ${
                    isActive ? style.buttonActive : 'bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" aria-hidden />
              <input
                type="text"
                placeholder="Search topics, mistakes, tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search grammar"
                className="w-full pl-10 pr-4 py-3 min-h-[44px] rounded-xl bg-white text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-grammar-accent/50 shadow-[0_4px_14px_rgb(0,0,0,0.04)] transition-shadow text-sm leading-relaxed"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#e5e7eb',
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFilters((f) => !f)}
                className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#e2e8f0',
                }}
                aria-expanded={showFilters}
                aria-label="Toggle filters"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                Filters
              </button>
              {showFilters && (
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map((diff) => {
                    const style = getDifficultyStyles(diff);
                    const isActive = filterDifficulty === diff;
                    return (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setFilterDifficulty(diff)}
                        style={{
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: isActive ? style.buttonActive.split(' ').find(c => c.includes('border')) : '#e2e8f0',
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] min-w-[44px] transition-all ${
                          isActive ? style.buttonActive : 'bg-white text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {diff}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Sticky tabs */}
        <nav
          className={`sticky top-0 z-20 -mx-3 px-3 sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6 py-0 mb-4 transition-shadow ${
            isScrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.06)]' : 'bg-transparent'
          }`}
          aria-label="Sections"
          style={{
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: '#e5e7eb',
          }}
        >
          <div className="flex gap-0" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`grammar-panel-${tab.id}`}
                id={`grammar-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold text-sm min-h-[44px] transition-colors ${
                  activeTab === tab.id
                    ? 'text-grammar-accent'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
                style={{
                  borderBottomWidth: '3px',
                  borderBottomStyle: 'solid',
                  borderBottomColor: activeTab === tab.id ? '#FF7D00' : 'transparent',
                  marginBottom: '-3px',
                }}
              >
                <span aria-hidden>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <main role="main">
          <div
            id={`grammar-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`grammar-tab-${activeTab}`}
          >
            {/* Topics Tab */}
            {activeTab === 'topics' && selectedTopic && (
              <div className="animate-[slideDown_0.3s_ease-out]">
                <button
                  type="button"
                  onClick={() => setSelectedTopic(null)}
                  className="mb-4 inline-flex items-center gap-2 px-4 py-3 min-h-[44px] bg-white text-slate-800 font-semibold rounded-xl shadow-[0_4px_14px_rgb(0,0,0,0.06)] hover:shadow-lg hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-grammar-accent focus:ring-offset-2"
                  style={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#e5e7eb',
                  }}
                >
                  ← Back to Topics
                </button>

                <Suspense fallback={<div className="text-center py-8">Loading topic...</div>}>
                  <GrammarTopicPage
                    topic={selectedTopic}
                    completedLessons={completedLessons}
                    onLessonComplete={(lessonId) => {
                      setCompletedLessons((prev) => {
                        const isNew = !prev.includes(lessonId);
                        const next = isNew
                          ? [...prev, lessonId]
                          : prev.filter((id) => id !== lessonId);

                        // ✅ Fire confetti on lesson complete
                        if (isNew) {
                          fireConfetti(false);
                        }

                        return next;
                      });
                    }}
                  />
                </Suspense>
              </div>
            )}

            {activeTab === 'topics' && !selectedTopic && (
              <div className="flex flex-col gap-4">
                {isLevelLoading ? (
                  [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`${cardClass} p-4 sm:p-5 animate-pulse min-h-[100px]`}
                      role="status"
                      aria-label="Loading"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-200 shrink-0" />
                          <div className="flex-1 space-y-2 min-w-0">
                            <div className="h-5 bg-slate-200 rounded w-3/4" />
                            <div className="h-4 bg-slate-100 rounded w-full" />
                            <div className="h-4 bg-slate-100 rounded w-2/3" />
                            <div className="h-6 w-20 bg-slate-100 rounded-lg mt-2" />
                          </div>
                        </div>
                        <div className="w-16 h-8 bg-slate-100 rounded-lg shrink-0" />
                      </div>
                    </div>
                  ))
                ) : (
                  grammarData &&
                  Object.entries(grammarData.topics).map(([, topic]) => {
                    const lessonIds = (topic.lessons || []).map((l) => l.lessonId);
                    const completedCount = lessonIds.filter((id) => completedLessons.includes(id)).length;
                    const isRecommended = recommendedTopicId === topic.id;
                    const isCompleted = completedCount === lessonIds.length && lessonIds.length > 0;
                    const diffStyle = getDifficultyStyles(topic.difficulty);
                    return (
                      <div
                        key={topic.id}
                        className={`${cardClassInteractive} overflow-hidden relative transition-all duration-300 ${
                          isCompleted ? 'ring-2 ring-emerald-400/50 bg-emerald-50/40' : ''
                        } ${isRecommended ? 'ring-2 ring-[#58CC02]/50 shadow-[0_0_0_4px_rgba(88,204,2,0.15)]' : ''}`}
                      >
                        {isRecommended && (
                          <div className="absolute top-0 right-0 bg-[#58CC02] text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl z-10 flex items-center gap-1 shadow-md">
                            <RotateCcw className="w-3 h-3" />
                            Quest!
                          </div>
                        )}
                        {isCompleted && (
                          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl z-10 flex items-center gap-1 shadow-md animate-bounce">
                            ✨ Completed!
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleTopicSelect(topic)}
                          className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left hover:bg-slate-50/80 transition-colors rounded-xl"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            <span className="text-2xl sm:text-3xl shrink-0">{topic.icon}</span>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-slate-900 text-base sm:text-lg truncate">
                                {topic.title}
                              </h3>
                              <p className="text-slate-700 text-sm mt-0.5 line-clamp-2 leading-relaxed">
                                {topic.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold ${
                                    isCompleted && lessonIds.length > 0
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : diffStyle.badge
                                  }`}
                                  style={{
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderColor: isCompleted && lessonIds.length > 0 ? '#10b981' : 'currentColor',
                                  }}
                                >
                                  {isCompleted && lessonIds.length > 0 ? '✓ ' : ''}
                                  {completedCount}/{lessonIds.length} lessons
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${diffStyle.badge}`}
                              style={{
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'currentColor',
                              }}
                            >
                              {topic.difficulty}
                            </span>
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                          </div>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Practice Tab */}
            {activeTab === 'practice' && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl" role="tablist" aria-label="Practice type">
                  {PRACTICE_SECTIONS.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActivePracticeSection(sec.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm min-h-[44px] transition-colors ${
                        activePracticeSection === sec.id
                          ? 'bg-white text-grammar-primary shadow-sm'
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <span aria-hidden>{sec.icon}</span>
                      {sec.label}
                    </button>
                  ))}
                </div>

                {/* Mistakes Section */}
                {activePracticeSection === 'mistakes' && (
                  <div className="flex flex-col gap-4">
                    {COMMON_MISTAKES.map((mistake) => {
                      const isFlipped = flippedMistakes.has(mistake.id);
                      return (
                        <div
                          key={mistake.id}
                          onClick={() => toggleMistakeFlip(mistake.id)}
                          className={`${cardClass} p-4 sm:p-5 cursor-pointer select-none`}
                          role="button"
                          tabIndex={0}
                          style={{
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: '#e5e7eb',
                          }}
                        >
                          <div className="flex gap-4">
                            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              {!isFlipped ? (
                                <>
                                  <h3 className="font-semibold text-slate-800 text-sm mb-2">
                                    Common mistake:
                                  </h3>
                                  <p
                                    className="bg-red-50 rounded-lg p-3 text-red-800 text-sm font-medium"
                                    style={{
                                      borderWidth: '1px',
                                      borderStyle: 'solid',
                                      borderColor: '#fca5a5',
                                    }}
                                  >
                                    ❌ {mistake.mistake}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Correct:</h4>
                                  <p
                                    className="bg-emerald-50 rounded-lg p-3 text-emerald-900 text-sm font-medium mb-3"
                                    style={{
                                      borderWidth: '1px',
                                      borderStyle: 'solid',
                                      borderColor: '#86efac',
                                    }}
                                  >
                                    ✓ {mistake.correct}
                                  </p>
                                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Explanation:</h4>
                                  <p className="text-slate-700 text-sm">{mistake.explanation}</p>
                                  <span
                                    className="inline-block mt-3 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                                    style={{
                                      borderWidth: '1px',
                                      borderStyle: 'solid',
                                      borderColor: '#e5e7eb',
                                    }}
                                  >
                                    Topic: {mistake.topic}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tips Section */}
                {activePracticeSection === 'tips' && (
                  <div className="flex flex-col gap-4">
                    {STUDY_TIPS.map((tip) => {
                      const isBookmarked = bookmarkedTips.has(tip.id);
                      return (
                        <article
                          key={tip.id}
                          className={`${cardClass} p-4 sm:p-5 relative`}
                          style={{
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: '#e5e7eb',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => toggleBookmarkTip(tip.id)}
                            className="absolute top-4 right-4 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 hover:text-grammar-accent transition-colors"
                            aria-label={isBookmarked ? 'Remove from saved' : 'Save for later'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-5 h-5 text-grammar-accent" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </button>
                          <div className="flex gap-4 pr-12">
                            <Lightbulb className="w-5 h-5 text-grammar-accent shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-slate-900 text-base mb-2">{tip.title}</h3>
                              <p className="text-slate-600 text-sm leading-relaxed mb-3">{tip.description}</p>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}

                {/* Examples Section */}
                {activePracticeSection === 'examples' && (
                  <div className="flex flex-col gap-4">
                    {REAL_WORLD_EXAMPLES.map((example) => {
                      const isBookmarked = bookmarkedExamples.has(example.id);
                      return (
                        <article
                          key={example.id}
                          className={`${cardClass} p-4 sm:p-5 relative`}
                          style={{
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: '#e5e7eb',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => toggleBookmarkExample(example.id)}
                            className="absolute top-4 right-4 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 hover:text-grammar-accent transition-colors"
                            aria-label={isBookmarked ? 'Remove from saved' : 'Save for later'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-5 h-5 text-grammar-accent" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </button>
                          <div className="pr-12">
                            <span
                              className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold mb-3"
                              style={{
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: '#e5e7eb',
                              }}
                            >
                              {example.context}
                            </span>
                            <p className="text-xs font-semibold text-slate-600 mb-1">Example:</p>
                            <div
                              className="rounded-lg p-3 shadow-[0_2px_8px_rgb(0,0,0,0.03)] font-mono text-sm text-slate-800 mb-3"
                              style={{
                                background: '#f8fafc',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: '#e2e8f0',
                              }}
                            >
                              &quot;{example.original}&quot;
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed mb-3">{example.explanation}</p>
                            <span
                              className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                              style={{
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: '#e5e7eb',
                              }}
                            >
                              Topic: {example.topic}
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <div className="flex flex-col gap-4">
                {GRAMMAR_QUIZZES.map((quiz) => {
                  const quizLessonIds = getLessonIdsForTopicIds(quiz.topics);
                  const completedInQuiz = quizLessonIds.filter((id) => completedLessons.includes(id)).length;
                  const readiness = quizLessonIds.length > 0 ? completedInQuiz / quizLessonIds.length : 1;
                  const showWarning = readiness < 0.5 && quizLessonIds.length > 0;
                  return (
                    <article
                      key={quiz.quizId}
                      className={`${cardClassInteractive} p-4 sm:p-5`}
                      style={{
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: '#e5e7eb',
                      }}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-900 text-base truncate">
                            {quiz.title}
                          </h3>
                          <p className="text-slate-700 text-sm leading-relaxed">
                            {quiz.questions.length} questions • {quiz.duration} mins
                          </p>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                            getDifficultyStyles(quiz.difficulty).badge
                          }`}
                          style={{
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'currentColor',
                          }}
                        >
                          {quiz.difficulty}
                        </span>
                      </div>
                      {showWarning && (
                        <div
                          className="mb-4 p-3 rounded-lg text-amber-800 text-sm flex items-start gap-2"
                          style={{
                            background: '#fffbeb',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: '#fde047',
                          }}
                        >
                          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <strong>Tip:</strong> You've completed {completedInQuiz} of {quizLessonIds.length} lessons in topics covered by this quiz. Consider reviewing the related lessons first to improve your score.
                          </div>
                        </div>
                      )}
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-grammar-accent hover:bg-grammar-accent-hover text-white font-bold rounded-xl shadow-[0_4px_14px_rgb(255,125,0,0.3)] hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-grammar-accent focus:ring-offset-2 min-h-[44px] active:scale-[0.98]"
                        style={{
                          borderWidth: '0px',
                          borderStyle: 'solid',
                          borderColor: 'transparent',
                        }}
                      >
                        <PlayCircle className="w-5 h-5" />
                        Start Quiz
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GrammarReview;
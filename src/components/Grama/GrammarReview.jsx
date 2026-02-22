import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
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
import GrammarTopicPage from './GrammarTopicPage';
import '../styles/GrammarReview.css';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
/* 3 tabs to reduce cognitive load (was 5) */
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

// Difficulty → "năng lượng kiến thức" (Easy=Emerald, Medium=Blue, Hard=Violet)
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

// Soft shadow card (nổi khối)
const cardClass =
  'bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-200';
const cardClassInteractive = cardClass + ' hover:-translate-y-0.5 cursor-pointer';

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

// Hybrid search: filter by query + difficulty
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
  const mainRef = useRef(null);
  const scrollThrottleRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const prevPctRef = useRef({ Beginner: 0, Intermediate: 0, Advanced: 0 });

  const grammarData = useMemo(() => getGrammarByLevel(selectedLevel), [selectedLevel]);

  /* Throttled scroll: rAF + update only when crossing threshold to avoid jank */
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

  /* Micro-celebrations when crossing 25/50/75/100% (feedback loop) */
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
        {/* Non-sticky: title, progress, level, search (reduces viewport steal) */}
        <header className="mb-4" role="banner">
          <h1 className="text-xl sm:text-2xl font-bold text-grammar-primary tracking-tight leading-tight">
            📚 Grammar Review
          </h1>
          <p className="text-slate-700 text-sm sm:text-base mt-1 leading-relaxed">
            Master English grammar with interactive lessons
          </p>

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
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm min-h-[44px] min-w-[44px] border-2 transition-all ${
                    isActive ? style.buttonActive : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>

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
              />
            </div>
            {/* Progressive disclosure: Filters (difficulty) hidden by default */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFilters((f) => !f)}
                className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
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
                        className={`px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] min-w-[44px] border transition-all ${
                          isActive ? style.buttonActive : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
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

        {/* Sticky: only tab bar (~52px) to maximize content space */}
        <nav
          className={`sticky top-0 z-20 -mx-3 px-3 sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6 py-0 mb-4 transition-shadow ${
            isScrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.06)]' : 'bg-transparent'
          }`}
          aria-label="Sections"
        >
          <div className="flex gap-0 border-b border-slate-200" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`grammar-panel-${tab.id}`}
                id={`grammar-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold text-sm border-b-[3px] -mb-px min-h-[44px] transition-colors ${
                  activeTab === tab.id
                    ? 'text-grammar-accent border-grammar-accent bg-transparent'
                    : 'text-slate-600 border-transparent hover:text-slate-800'
                }`}
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
            {/* Hybrid search results */}
            {searchQuery.trim() && (
              <div className="mb-6 space-y-6">
                <h2 className="text-lg font-bold text-grammar-primary flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search results
                </h2>
                {hybridResults.topics.length > 0 && (
                  <section>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2 leading-tight">Topics</h3>
                    <div className="flex flex-col gap-2">
                      {hybridResults.topics.slice(0, 5).map((topic) => (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => {
                            setSelectedTopic(topic);
                            setActiveTab('topics');
                          }}
                          className={`${cardClassInteractive} p-3 text-left`}
                        >
                          <span className="font-semibold text-slate-900">{topic.title}</span>
                          <span className={`text-xs ml-2 px-2 py-0.5 rounded ${getDifficultyStyles(topic.difficulty).badge}`}>
                            {topic.difficulty}
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}
                {hybridResults.mistakes.length > 0 && (
                  <section>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2 leading-tight">Common mistakes</h3>
                    <div className="flex flex-col gap-2">
                      {hybridResults.mistakes.slice(0, 3).map((m) => (
                        <div key={m.id} className="bg-red-50 rounded-xl p-3 shadow-[0_4px_14px_rgb(0,0,0,0.04)] text-sm text-red-900">
                          ❌ {m.mistake} → ✓ {m.correct}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {hybridResults.tips.length > 0 && (
                  <section>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2 leading-tight">Tips</h3>
                    <div className="flex flex-col gap-2">
                      {hybridResults.tips.slice(0, 3).map((t) => (
                        <div key={t.id} className={`${cardClass} p-3`}>
                          <span className="font-semibold text-slate-900">{t.title}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {hybridResults.examples.length > 0 && (
                  <section>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2 leading-tight">Examples</h3>
                    <div className="flex flex-col gap-2">
                      {hybridResults.examples.slice(0, 3).map((e) => (
                        <div key={e.id} className="bg-slate-50 rounded-xl p-3 shadow-[0_4px_14px_rgb(0,0,0,0.04)] text-sm font-mono text-slate-800">
                          &quot;{e.original}&quot;
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {hybridResults.quizzes.length > 0 && (
                  <section>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2 leading-tight">Quizzes</h3>
                    <div className="flex flex-col gap-2">
                      {hybridResults.quizzes.slice(0, 3).map((z) => (
                        <div key={z.quizId} className="bg-grammar-accent/10 rounded-xl p-3 shadow-[0_4px_14px_rgb(0,0,0,0.04)] font-semibold text-grammar-primary">
                          {z.title}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {isEmptySearch && (
                  <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-grammar-blue-soft flex items-center justify-center text-4xl mb-5" aria-hidden>
                      📚
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">Nothing here yet</h3>
                    <p className="text-slate-700 text-sm leading-relaxed mb-5 max-w-xs">
                      No matches for your search. Try another word or clear filters to browse everything.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setFilterDifficulty('All');
                        setShowFilters(false);
                      }}
                      className="px-5 py-3 min-h-[44px] rounded-xl font-semibold text-white bg-grammar-primary hover:bg-grammar-primary-hover shadow-[0_4px_14px_rgb(0,53,142,0.25)] transition-all"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'topics' && selectedTopic && (
              <div className="animate-[slideDown_0.3s_ease-out]">
                <button
                  type="button"
                  onClick={() => setSelectedTopic(null)}
                  className="mb-4 inline-flex items-center gap-2 px-4 py-3 min-h-[44px] bg-white text-slate-800 font-semibold rounded-xl shadow-[0_4px_14px_rgb(0,0,0,0.06)] hover:shadow-lg hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-grammar-accent focus:ring-offset-2"
                >
                  ← Back to Topics
                </button>
                <GrammarTopicPage
                  topic={selectedTopic}
                  completedLessons={completedLessons}
                  onLessonComplete={(lessonId) => {
                    setCompletedLessons((prev) =>
                      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
                    );
                  }}
                />
              </div>
            )}

            {activeTab === 'topics' && !selectedTopic && (
              <div className="flex flex-col gap-4">
                {isLevelLoading ? (
                  [...Array(4)].map((_, i) => (
                    <div key={i} className={`${cardClass} p-4 sm:p-5 animate-pulse min-h-[100px]`} role="status" aria-label="Loading">
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
                    const diffStyle = getDifficultyStyles(topic.difficulty);
                    return (
                      <div
                        key={topic.id}
                        className={`${cardClassInteractive} overflow-hidden relative ${
                          isRecommended ? 'ring-2 ring-grammar-accent/40' : ''
                        }`}
                      >
                        {isRecommended && (
                          <div className="absolute top-0 right-0 bg-grammar-accent text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl z-10 flex items-center gap-1 shadow-md">
                            <RotateCcw className="w-3 h-3" />
                            Recommended next
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
                                    completedCount === lessonIds.length && lessonIds.length > 0
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : diffStyle.badge
                                  }`}
                                >
                                  {completedCount === lessonIds.length && lessonIds.length > 0 ? '✓ ' : ''}
                                  {completedCount}/{lessonIds.length} lessons
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${diffStyle.badge}`}>
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

                {activePracticeSection === 'mistakes' && (
              <>
                <p className="text-sm text-slate-700 leading-relaxed mb-2">
                  Think of the correct form first, then tap to reveal the answer (active recall).
                </p>
                <div className="flex flex-col gap-4">
                {COMMON_MISTAKES.map((mistake) => {
                  const isFlipped = flippedMistakes.has(mistake.id);
                  return (
                    <div
                      key={mistake.id}
                      className={`grammar-flashcard ${cardClass} overflow-hidden cursor-pointer select-none perspective-1000`}
                      style={{ perspective: '1000px' }}
                      onClick={() => toggleMistakeFlip(mistake.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleMistakeFlip(mistake.id);
                        }
                      }}
                      aria-label={isFlipped ? 'Hide answer' : 'Reveal correct form and explanation'}
                    >
                      <div
                        className={`grammar-flashcard-inner relative min-h-[140px] ${isFlipped ? 'is-flipped' : ''}`}
                      >
                        <div className="grammar-flashcard-front absolute inset-0 p-4 sm:p-5 flex flex-col justify-center">
                          <div className="flex gap-4">
                            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-slate-800 text-sm mb-2">
                                Common mistake (tap to reveal answer):
                              </h3>
                              <p className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm font-medium">
                                ❌ {mistake.mistake}
                              </p>
                              <p className="text-xs text-slate-600 mt-2 leading-normal">Tap card to see correct form</p>
                            </div>
                          </div>
                        </div>
                        <div className="grammar-flashcard-back absolute inset-0 p-4 sm:p-5">
                          <div className="flex gap-4">
                            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-slate-800 text-sm mb-1">Correct:</h4>
                              <p className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-900 text-sm font-medium mb-3">
                                ✓ {mistake.correct}
                              </p>
                              <h4 className="font-semibold text-slate-800 text-sm mb-1">Explanation:</h4>
                              <p className="text-slate-700 text-sm leading-relaxed">{mistake.explanation}</p>
                              <span className="inline-block mt-3 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
                                Topic: {mistake.topic}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>
                </>
                )}

                {activePracticeSection === 'tips' && (
              <div className="flex flex-col gap-4">
                {STUDY_TIPS.map((tip) => {
                  const isBookmarked = bookmarkedTips.has(tip.id);
                  return (
                    <article
                      key={tip.id}
                      className={`${cardClass} p-4 sm:p-5 relative`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmarkTip(tip.id);
                        }}
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
                          <p className="text-xs font-semibold text-slate-600 mb-2 leading-normal">Related Topics:</p>
                          <div className="flex flex-wrap gap-2">
                            {tip.relatedTopics.map((topicId) => (
                              <span
                                key={topicId}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium capitalize"
                              >
                                {topicId.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
                )}

                {activePracticeSection === 'examples' && (
              <div className="flex flex-col gap-4">
                {REAL_WORLD_EXAMPLES.map((example) => {
                  const isBookmarked = bookmarkedExamples.has(example.id);
                  return (
                    <article
                      key={example.id}
                      className={`${cardClass} p-4 sm:p-5 relative`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmarkExample(example.id);
                        }}
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
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold mb-3">
                          {example.context}
                        </span>
                        <p className="text-xs font-semibold text-slate-600 mb-1">Example:</p>
                        <div className="bg-slate-50 rounded-lg p-3 shadow-[0_2px_8px_rgb(0,0,0,0.03)] font-mono text-sm text-slate-800 mb-3">
                          &quot;{example.original}&quot;
                        </div>
                        <p className="text-xs font-semibold text-slate-600 mb-1">Why:</p>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">{example.explanation}</p>
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
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
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 border ${getDifficultyStyles(quiz.difficulty).badge}`}>
                          {quiz.difficulty}
                        </span>
                      </div>
                      {showWarning && (
                        <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-2">
                          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <strong>Tip:</strong> You&apos;ve completed {completedInQuiz} of {quizLessonIds.length} lessons in topics covered by this quiz. Consider reviewing the related lessons first to improve your score.
                          </div>
                        </div>
                      )}
                      <div className="bg-slate-50 rounded-xl p-3 shadow-[0_2px_8px_rgb(0,0,0,0.03)] mb-4">
                        <p className="text-slate-700 text-sm font-semibold mb-2">Topics covered:</p>
                        <div className="flex flex-wrap gap-2">
                          {quiz.topics.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 text-xs font-medium shadow-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-4 font-semibold">
                        <span className="font-bold">Passing Score:</span> {quiz.passingScore}%
                      </p>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-grammar-accent hover:bg-grammar-accent-hover text-white font-bold rounded-xl shadow-[0_4px_14px_rgb(255,125,0,0.3)] hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-grammar-accent focus:ring-offset-2 min-h-[44px] active:scale-[0.98]"
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

import React, { 
  useState, useCallback, useMemo, useEffect, useRef, lazy, Suspense, memo 
} from 'react';
import {
  ChevronDown, BookOpen, Lightbulb, PlayCircle, XCircle, Search,
  Bookmark, BookmarkCheck, RotateCcw, Zap, ArrowRight, CheckCircle2,
  Flame, Clock, AlertTriangle, Globe, Menu, X, ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

import {
  getGrammarByLevel, getLessonIdsByLevel, COMMON_MISTAKES, STUDY_TIPS, REAL_WORLD_EXAMPLES,
} from '../../data/grammarData.js';

const GrammarTopicPage = lazy(() => import('./GrammarTopicPage'));

/* ──────────────────────────────────────
   🛠️ UTILS & HOOKS
   ────────────────────────────────────── */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const useResponsive = () => {
  const [viewport, setViewport] = useState({
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 640 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 640 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewport({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
};

/* ──────────────────────────────────────
   📌 CONSTANTS & STYLES
   ────────────────────────────────────── */
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const TABS = [
  { id: 'topics', label: 'Topics', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'practice', label: 'Practice', icon: <Zap className="w-5 h-5" /> },
];

const DIFF_CONFIG = {
  Easy: { 
    color: 'bg-green-500', 
    text: 'text-green-700', 
    bg: 'bg-green-50',
    darkBg: 'dark:bg-green-950'
  },
  Medium: { 
    color: 'bg-blue-500', 
    text: 'text-blue-700', 
    bg: 'bg-blue-50',
    darkBg: 'dark:bg-blue-950'
  },
  Hard: { 
    color: 'bg-purple-500', 
    text: 'text-purple-700', 
    bg: 'bg-purple-50',
    darkBg: 'dark:bg-purple-950'
  },
};

/* ──────────────────────────────────────
   📦 SUB-COMPONENTS
   ────────────────────────────────────── */

const M3Progress = ({ pct, height = "h-1.5", color = "bg-[#0B57D0]" }) => (
  <div className={`${height} w-full bg-slate-200/60 dark:bg-slate-700 rounded-full overflow-hidden`}>
    <div 
      className={`h-full ${color} transition-all duration-700 ease-out`}
      style={{ width: `${Math.min(pct, 100)}%` }}
    />
  </div>
);

const ContinueCard = memo(({ topic, onSelect }) => (
  <button
    onClick={() => onSelect(topic)}
    className="w-full mb-6 sm:mb-8 p-3 sm:p-4 lg:p-5 rounded-2xl bg-gradient-to-br from-[#D3E3FD] to-[#C5D9F1] border border-blue-200 dark:border-blue-700 dark:bg-blue-900/30 cursor-pointer active:scale-[0.98] transition-all shadow-sm hover:shadow-md group focus:outline-none focus:ring-2 focus:ring-blue-500/50"
  >
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
      <span className="text-[10px] sm:text-[11px] font-bold text-[#041E49] dark:text-blue-200 uppercase tracking-wider bg-white/60 dark:bg-blue-950/50 px-2 py-0.5 rounded-md whitespace-nowrap">
        Continue
      </span>
      <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 animate-pulse flex-shrink-0" />
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 lg:gap-4">
      <div className="text-2xl sm:text-3xl flex-shrink-0">{topic.icon}</div>
      <div className="flex-1 min-w-0 w-full">
        <h3 className="font-bold text-sm sm:text-base lg:text-lg text-[#1F1F1F] dark:text-white group-hover:text-blue-700 transition-colors break-words line-clamp-2">
          {topic.title}
        </h3>
        <p className="text-[11px] sm:text-xs lg:text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-1">
          Next: {topic.description.slice(0, 35)}...
        </p>
        <M3Progress pct={45} height="h-1" /> 
      </div>
      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 hidden sm:block" />
    </div>
  </button>
));

const TopicItem = memo(({ topic, completedSet, onSelect }) => {
  const lessonIds = (topic.lessons || []).map(l => l.lessonId);
  const doneCount = lessonIds.filter(id => completedSet.has(id)).length;
  const pct = lessonIds.length > 0 ? (doneCount / lessonIds.length) * 100 : 0;
  const config = DIFF_CONFIG[topic.difficulty] || DIFF_CONFIG.Medium;

  return (
    <button
      onClick={() => onSelect(topic)}
      className="w-full p-3 sm:p-3.5 lg:p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-600 transition-all active:scale-[0.99] cursor-pointer group shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-left"
    >
      <div className="flex items-start gap-2.5 sm:gap-3 lg:gap-4 mb-2.5 sm:mb-3 lg:mb-3.5">
        <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-base sm:text-lg lg:text-xl group-hover:scale-110 transition-transform flex-shrink-0">
          {topic.icon}
        </div>
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 flex-wrap">
            <h3 className="font-bold text-xs sm:text-sm lg:text-base text-slate-900 dark:text-white break-words line-clamp-2 leading-tight">
              {topic.title}
            </h3>
            {pct === 100 && (
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
            )}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-[10px] sm:text-[11px] lg:text-xs text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
            <div className="flex items-center gap-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${config.color}`} />
              <span className="hidden xs:inline">{topic.difficulty}</span>
              <span className="xs:hidden">{topic.difficulty.slice(0, 1)}</span>
            </div>
            <div className="hidden sm:flex items-center gap-0.5">
              <Clock className="w-3 h-3" />
              <span className="text-[10px] sm:text-[11px]">{topic.estimatedTime || '5m'}</span>
            </div>
            <span className="font-semibold text-blue-600 dark:text-blue-400 text-[10px] sm:text-[11px]">
              {doneCount}/{lessonIds.length}
            </span>
          </div>
        </div>
      </div>
      <M3Progress 
        pct={pct} 
        height="h-0.5 sm:h-1" 
        color={pct === 100 ? "bg-green-500" : "bg-blue-600"} 
      />
    </button>
  );
});

const SkeletonLoader = () => (
  <div className="space-y-3 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div 
        key={i} 
        className="h-16 sm:h-18 lg:h-20 bg-slate-200 dark:bg-slate-700 rounded-2xl" 
      />
    ))}
  </div>
);

/* ──────────────────────────────────────
   🚀 MAIN COMPONENT
   ────────────────────────────────────── */
const GrammarReview = () => {
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('topics');
  const [completedLessons, setCompletedLessons] = useState(() => new Set());
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const viewport = useResponsive();
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setIsScrolled(window.scrollY > 24));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const grammarData = useMemo(() => getGrammarByLevel(selectedLevel), [selectedLevel]);

  const progressPerLevel = useMemo(() => {
    return LEVELS.map(level => {
      const lessonIds = getLessonIdsByLevel(level);
      const done = lessonIds.filter(id => completedLessons.has(id)).length;
      return { 
        level, 
        pct: lessonIds.length > 0 ? Math.round((done / lessonIds.length) * 100) : 0 
      };
    });
  }, [completedLessons]);

  const visibleTopics = useMemo(() => {
    const all = Object.values(grammarData?.topics || {});
    const filtered = debouncedSearch 
      ? all.filter(t => t.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      : all;
    return showAll ? filtered : filtered.slice(0, viewport.isMobile ? 4 : 6);
  }, [grammarData, debouncedSearch, showAll, viewport.isMobile]);

  const lastIncompleteTopic = useMemo(() => {
    return Object.values(grammarData?.topics || {}).find(t => {
      const ids = t.lessons.map(l => l.lessonId);
      const done = ids.filter(id => completedLessons.has(id)).length;
      return done > 0 && done < ids.length;
    });
  }, [grammarData, completedLessons]);

  const handleLessonComplete = useCallback((id) => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    confetti({ 
      particleCount: 40, 
      spread: 60, 
      origin: { y: 0.8 }, 
      colors: ['#0B57D0', '#34A853'] 
    });
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-slate-900 pb-24 sm:pb-20 lg:pb-16 font-['Inter',_sans-serif] leading-relaxed overflow-x-hidden">
      {/* Search Header */}
      <div className={`sticky top-0 z-30 transition-all duration-200 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 ${
        isScrolled 
          ? 'bg-white dark:bg-slate-800 shadow-sm' 
          : 'bg-[#F8F9FA] dark:bg-slate-900'
      }`}>
        <div className={`${viewport.isDesktop ? 'max-w-7xl' : 'max-w-2xl'} mx-auto relative group`}>
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search rules, tips..."
            className="w-full pl-9 sm:pl-12 pr-4 sm:pr-6 py-2.5 sm:py-3 sm:py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white border-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white dark:focus:bg-slate-600 transition-all text-xs sm:text-sm outline-none shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search grammar topics"
          />
        </div>
      </div>

      <div className={`${viewport.isDesktop ? 'max-w-7xl' : 'max-w-2xl'} mx-auto px-3 sm:px-4 lg:px-6 mt-3 sm:mt-4 lg:mt-6`}>
        {/* Header Section */}
        <header className="flex justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4 lg:mb-6 flex-col sm:flex-row">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-slate-900 dark:text-white tracking-tight break-words">
              Grammar Hub
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs lg:text-sm mt-0.5 sm:mt-1">
              Master structure, master fluency.
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 bg-orange-50 dark:bg-orange-950/30 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full border border-orange-100 dark:border-orange-800 shadow-sm whitespace-nowrap flex-shrink-0">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-orange-600 dark:text-orange-400 fill-current" />
            <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-orange-700 dark:text-orange-300">
              3 Day
            </span>
          </div>
        </header>

        {/* Progress Level Chips */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-3 sm:pb-4 no-scrollbar -mx-3 sm:mx-0 px-3 sm:px-0 mb-3 sm:mb-4 lg:mb-6">
          {progressPerLevel.map(({ level, pct }) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`flex-shrink-0 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-2xl text-[11px] sm:text-xs lg:text-sm font-bold transition-all border whitespace-nowrap text-center ${
                selectedLevel === level 
                  ? 'bg-[#0B57D0] text-white border-transparent shadow-md' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700'
              }`}
              aria-pressed={selectedLevel === level}
            >
              <span className="hidden xs:inline">{level}</span>
              <span className="xs:hidden">{level.slice(0, 3)}</span>
              {' '}• {pct}%
            </button>
          ))}
        </div>

        {/* Continue Card */}
        {lastIncompleteTopic && activeTab === 'topics' && !selectedTopic && (
          <ContinueCard topic={lastIncompleteTopic} onSelect={setSelectedTopic} />
        )}

        {/* Tab Navigation */}
        <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-5 lg:mb-6">
          <div className="bg-slate-200/50 dark:bg-slate-700 p-0.5 sm:p-1 rounded-2xl flex flex-1 sm:flex-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 sm:flex-auto flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 lg:py-2.5 px-2 sm:px-3 lg:px-4 rounded-xl text-[11px] sm:text-xs lg:text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                aria-selected={activeTab === tab.id}
              >
                {tab.icon}
                <span className="hidden xs:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <main>
          <Suspense fallback={<SkeletonLoader />}>
            
            {activeTab === 'topics' && !selectedTopic && (
              <div className="grid gap-2.5 sm:gap-3 lg:gap-4 animate-in fade-in duration-500">
                {visibleTopics.map(topic => (
                  <TopicItem 
                    key={topic.id} 
                    topic={topic} 
                    completedSet={completedLessons}
                    onSelect={setSelectedTopic}
                  />
                ))}
                {!showAll && !debouncedSearch && visibleTopics.length > 0 && (
                  <button 
                    onClick={() => setShowAll(true)}
                    className="w-full py-2.5 sm:py-3 text-[11px] sm:text-xs lg:text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-colors"
                  >
                    View all topics
                  </button>
                )}
                {visibleTopics.length === 0 && (
                  <div className="py-8 sm:py-10 lg:py-12 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                      No topics found. Try a different search.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'practice' && (
              <PracticeSection />
            )}

            {selectedTopic && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <button 
                  onClick={() => setSelectedTopic(null)}
                  className="mb-4 sm:mb-5 lg:mb-6 flex items-center gap-1.5 sm:gap-2 text-slate-500 dark:text-slate-400 font-bold text-[11px] sm:text-xs lg:text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Back to path
                </button>
                <GrammarTopicPage 
                  topic={selectedTopic} 
                  completedLessons={[...completedLessons]} 
                  onLessonComplete={handleLessonComplete}
                />
              </div>
            )}
          </Suspense>
        </main>
      </div>

      {/* FAB */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-20">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-[#0B57D0] dark:bg-blue-700 text-white rounded-2xl shadow-lg flex items-center justify-center hover:shadow-2xl active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          aria-label="Scroll to top"
        >
          <Zap className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" />
        </button>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────
   📖 PRACTICE SECTION
   ────────────────────────────────────── */
const PracticeSection = () => {
  const [activeSub, setActiveSub] = useState('mistakes');
  const viewport = useResponsive();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-5 lg:mb-6 overflow-x-auto no-scrollbar -mx-3 sm:mx-0 px-3 sm:px-0">
        {['mistakes', 'tips', 'real-world'].map(sub => (
          <button
            key={sub}
            onClick={() => setActiveSub(sub)}
            className={`px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap border transition-all flex-shrink-0 ${
              activeSub === sub 
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
            aria-selected={activeSub === sub}
          >
            {sub === 'real-world' ? 'Examples' : sub.charAt(0).toUpperCase() + sub.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4">
        {activeSub === 'mistakes' && COMMON_MISTAKES.map(m => (
          <div 
            key={m.id} 
            className="p-2.5 sm:p-3 lg:p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-2 sm:gap-2.5 mb-2 sm:mb-2.5">
              <AlertTriangle className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] font-bold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/30 px-1.5 sm:px-2 py-0.5 rounded inline-block mb-1">
                  Error
                </p>
                <p className="text-[11px] sm:text-xs lg:text-sm text-slate-800 dark:text-slate-200 font-medium line-through decoration-red-300 break-words">
                  "{m.mistake}"
                </p>
                <p className="text-green-700 dark:text-green-400 font-bold mt-1 text-[11px] sm:text-xs lg:text-sm break-words">
                  ✓ "{m.correct}"
                </p>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 dark:text-slate-400 italic">
              {m.explanation}
            </p>
          </div>
        ))}

        {activeSub === 'tips' && STUDY_TIPS.map(t => (
          <div 
            key={t.id} 
            className="p-2.5 sm:p-3 lg:p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-100/50 dark:border-blue-800/50 flex gap-2 sm:gap-2.5 lg:gap-3"
          >
            <Lightbulb className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 dark:text-white mb-0.5 sm:mb-1 text-[11px] sm:text-xs lg:text-sm break-words">
                {t.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] lg:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.description}
              </p>
            </div>
          </div>
        ))}

        {activeSub === 'real-world' && REAL_WORLD_EXAMPLES && (
          REAL_WORLD_EXAMPLES.map(example => (
            <div 
              key={example.id} 
              className="p-2.5 sm:p-3 lg:p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-100/50 dark:border-purple-800/50 flex gap-2 sm:gap-2.5 lg:gap-3"
            >
              <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white mb-0.5 sm:mb-1 text-[11px] sm:text-xs lg:text-sm break-words">
                  {example.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] lg:text-xs text-slate-600 dark:text-slate-300 italic break-words">
                  "{example.example}"
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GrammarReview;
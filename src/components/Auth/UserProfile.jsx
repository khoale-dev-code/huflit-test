import React, { useState, useMemo, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Trophy, Star, Zap, Target, TrendingUp,
  Award, Calendar, Clock, CheckCircle2, AlertCircle,
  ArrowRight, Sparkles, BookOpen
} from 'lucide-react';
import { collection, query, where, onSnapshot, limit, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUserProgress } from '../../hooks/useUserProgress';

// ============================================
// GOOGLE COLOR PALETTE (English Learning)
// ============================================
const PALETTE = {
  // Primary: Google Blue (professional, trustworthy)
  primary: {
    50: '#E8F0FE',
    100: '#D2E3FC',
    200: '#AECBFA',
    300: '#8AB4F8',
    400: '#669DF5',
    500: '#4285F4',     // ← Main Google Blue
    600: '#1F71CB',
    700: '#185ABC',
    800: '#123D8F',
    900: '#0D1F4D',
  },

  // Secondary: Google Green (for success, correct answers)
  success: {
    50: '#E6F4EA',
    100: '#CEEAD6',
    200: '#A8DAB5',
    300: '#81C995',
    400: '#5ACB7E',
    500: '#34A853',    // ← Google Green
    600: '#2D8E47',
    700: '#1E8449',
    800: '#137333',
  },

  // Accent: Google Yellow/Orange (for achievements)
  accent: {
    50: '#FEF7E0',
    100: '#FEF1C3',
    200: '#FDE293',
    300: '#FCC934',
    400: '#FBBC04',    // ← Google Yellow
    500: '#F9AB00',
    600: '#EA8B00',
    700: '#D97706',
  },

  // Warning: Google Red (for low scores)
  warning: {
    50: '#FCE8E6',
    100: '#F8D7DA',
    200: '#F5C6CB',
    300: '#F1B0B7',
    400: '#EA8A9A',
    500: '#EA4335',    // ← Google Red
    600: '#D33425',
    700: '#BA2E1F',
  },

  // Neutral: Gray (for text, backgrounds)
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F3F3F3',
    200: '#ECECEC',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  }
};

// ============================================
// TYPOGRAPHY SYSTEM (For English Learning)
// ============================================
const fonts = {
  // Display: Bold headlines (Google Sans Display style)
  display: 'font-bold tracking-tight',
  // Headline: Section titles
  headline: 'font-semibold tracking-tight',
  // Title: Component titles
  title: 'font-semibold tracking-wide',
  // Body: Regular text
  body: 'font-normal tracking-normal',
  // Label: Small labels
  label: 'font-medium tracking-wide text-xs uppercase',
  // Mono: Code/stats
  mono: 'font-mono font-bold'
};

// ============================================
// ANIMATIONS (Refined)
// ============================================
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  scale: {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2 }
  }
};

// ============================================
// SKELETON LOADER
// ============================================
const Skeleton = memo(({ className = 'w-full h-4' }) => (
  <div className={`${className} bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse`} />
));

// ============================================
// STREAK CARD (Learning Motivation)
// ============================================
const StreakCard = memo(({ streak, lastActivityDate }) => {
  const isOnFire = streak > 7;
  const isActive = streak > 0;

  return (
    <motion.div
      variants={animations.fadeInUp}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-6 border-2 border-blue-200 dark:border-blue-700/50 shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-transparent" />

      <div className="relative z-10">
        <p className={`${fonts.label} text-blue-700 dark:text-blue-300 mb-2`}>
          Learning Streak
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.span
              animate={isOnFire ? { scale: [1, 1.1, 1] } : undefined}
              transition={{ duration: 1, repeat: isOnFire ? Infinity : 0 }}
              className={`${fonts.mono} text-5xl leading-none ${
                isActive ? 'text-orange-500' : 'text-gray-400'
              }`}
            >
              {streak}
            </motion.span>
            <span className="text-4xl">{isOnFire ? '🔥' : '📚'}</span>
          </div>
        </div>

        {/* Motivation message */}
        <p className={`${fonts.body} text-sm text-blue-700 dark:text-blue-200 mt-3 font-medium`}>
          {streak === 0 && 'Start learning today to build your streak'}
          {streak === 1 && 'Great start! Keep going 💪'}
          {streak > 1 && streak <= 7 && `${streak} days strong! Continue learning 🎯`}
          {streak > 7 && '🌟 You\'re on fire! Amazing consistency!'}
        </p>

        {lastActivityDate && (
          <p className="text-xs text-blue-600 dark:text-blue-300 mt-2 opacity-75">
            Last activity: {new Date(lastActivityDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        )}
      </div>
    </motion.div>
  );
});

StreakCard.displayName = 'StreakCard';

// ============================================
// STAT BADGE (Clean & Scannable)
// ============================================
const StatBadge = memo(({ icon: Icon, label, value, color = 'primary' }) => {
  const colorConfig = {
    primary: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-300',
      icon: 'text-blue-500 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-700/50'
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-300',
      icon: 'text-green-500 dark:text-green-400',
      border: 'border-green-200 dark:border-green-700/50'
    },
    accent: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'text-amber-700 dark:text-amber-300',
      icon: 'text-amber-500 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-700/50'
    },
    warning: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      text: 'text-orange-700 dark:text-orange-300',
      icon: 'text-orange-500 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-700/50'
    }
  };

  const cfg = colorConfig[color] || colorConfig.primary;

  return (
    <motion.div
      variants={animations.fadeInUp}
      whileHover={animations.scale.whileHover}
      className={`group relative ${cfg.bg} rounded-xl p-4 border-2 ${cfg.border} shadow-sm hover:shadow-md transition-all`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg bg-white/50 dark:bg-white/10 ${cfg.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`${fonts.label} ${cfg.text} opacity-80`}>{label}</p>
          <p className={`${fonts.mono} text-2xl ${cfg.text} mt-1`}>{value}</p>
        </div>
      </div>
    </motion.div>
  );
});

StatBadge.displayName = 'StatBadge';

// ============================================
// SCORE CARD (Latest Test Result)
// ============================================
const ScoreCard = memo(({ score, correct, total, exam, part }) => {
  const percentage = parseFloat(score) || 0;
  const isExcellent = percentage >= 85;
  const isGood = percentage >= 75;

  const getScoreColor = () => {
    if (isExcellent) return {
      bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      border: 'border-green-200 dark:border-green-700/50',
      text: 'text-green-700 dark:text-green-300',
      bar: 'from-green-400 to-emerald-500',
      icon: '⭐'
    };
    if (isGood) return {
      bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      border: 'border-blue-200 dark:border-blue-700/50',
      text: 'text-blue-700 dark:text-blue-300',
      bar: 'from-blue-400 to-cyan-500',
      icon: '✨'
    };
    return {
      bg: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
      border: 'border-amber-200 dark:border-amber-700/50',
      text: 'text-amber-700 dark:text-amber-300',
      bar: 'from-amber-400 to-orange-500',
      icon: '💪'
    };
  };

  const colors = getScoreColor();

  return (
    <motion.div
      variants={animations.fadeInUp}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} p-6 border-2 ${colors.border} shadow-md`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bar}`} />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className={`${fonts.label} text-blue-700 dark:text-blue-300 mb-1`}>
              {exam} · {part}
            </p>
            <p className={`${fonts.headline} text-2xl ${colors.text}`}>
              {colors.icon} {isExcellent ? 'Excellent!' : isGood ? 'Good!' : 'Keep improving'}
            </p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`${fonts.mono} text-5xl leading-none ${colors.text}`}
          >
            {percentage.toFixed(0)}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className={`${fonts.body} text-xs ${colors.text} opacity-80`}>
              <CheckCircle2 className="w-4 h-4 inline mr-1" />
              {correct} / {total} correct
            </p>
            <p className={`${fonts.mono} text-sm ${colors.text}`}>{percentage.toFixed(1)}%</p>
          </div>
          <div className="w-full h-3 bg-white/40 dark:bg-white/10 rounded-full overflow-hidden border border-current/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${colors.bar} shadow-lg`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ScoreCard.displayName = 'ScoreCard';

// ============================================
// TEST HISTORY ITEM
// ============================================
const TestHistoryItem = memo(({ test, index }) => {
  const score = parseFloat(test.score) || 0;
  const isGood = score >= 75;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="group"
    >
      <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all">
        {/* Left: Test Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`${fonts.label} px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300`}>
              {test.exam}
            </span>
            <span className={`${fonts.body} text-xs text-gray-600 dark:text-gray-400 font-medium`}>
              {test.part}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{new Date(test.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            {test.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{test.duration}m</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Score */}
        <div className="flex-shrink-0 text-right">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${fonts.mono} text-lg font-black ${
              isGood
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            } border-2 ${
              isGood ? 'border-green-200 dark:border-green-700/50' : 'border-blue-200 dark:border-blue-700/50'
            }`}
          >
            {score.toFixed(0)}
          </motion.div>
          <p className={`${fonts.body} text-xs text-gray-500 dark:text-gray-400 mt-1.5 opacity-80`}>
            {Math.round(test.totalQuestions * (score / 100))}/{test.totalQuestions}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

TestHistoryItem.displayName = 'TestHistoryItem';

// ============================================
// PROFILE HEADER (Professional & Friendly)
// ============================================
const ProfileHeader = memo(({ user, stats }) => {
  return (
    <motion.div
      variants={animations.fadeInUp}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.1)_75%)] bg-[length:40px_40px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-end gap-4 md:gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 30 }}
            className="flex-shrink-0"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 overflow-hidden shadow-xl">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center text-3xl font-bold text-white">
                  {user?.name?.charAt(0) || 'L'}
                </div>
              )}
            </div>
          </motion.div>

          {/* User Info */}
          <motion.div variants={animations.fadeInUp} className="flex-1 pb-1">
            <p className={`${fonts.body} text-white/90 text-sm md:text-base mb-1`}>
              Welcome back
            </p>
            <h1 className={`${fonts.display} text-3xl md:text-4xl text-white leading-tight`}>
              {user?.name?.split(' ')[0] || 'Learner'}
            </h1>
            <p className={`${fonts.body} text-white/80 text-sm md:text-base mt-2`}>
              {stats.totalAttempts === 0
                ? 'Begin your English learning journey'
                : `${stats.totalAttempts} test${stats.totalAttempts !== 1 ? 's' : ''} completed`}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

ProfileHeader.displayName = 'ProfileHeader';

// ============================================
// LOADING STATE
// ============================================
const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    <Skeleton className="w-full h-32 rounded-2xl" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-full h-20" />)}
    </div>
    <Skeleton className="w-full h-36 rounded-2xl" />
  </motion.div>
);

// ============================================
// EMPTY STATE
// ============================================
const EmptyState = () => (
  <motion.div
    variants={animations.fadeInUp}
    className="text-center py-16 px-4"
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-6xl mb-4"
    >
      📚
    </motion.div>
    <h2 className={`${fonts.headline} text-2xl text-gray-900 dark:text-white mb-2`}>
      No tests yet
    </h2>
    <p className={`${fonts.body} text-gray-600 dark:text-gray-400 max-w-sm mx-auto`}>
      Complete your first English test to track progress and see your statistics here.
    </p>
  </motion.div>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function UserProfile({ currentUser: currentUserProp }) {
  const { currentUser: currentUserFromHook } = useUserProgress();
  const currentUser = useMemo(
    () => currentUserProp || currentUserFromHook,
    [currentUserProp, currentUserFromHook]
  );

  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(5);

  // ===== FIRESTORE LISTENER =====
  useEffect(() => {
    if (!currentUser?.firebaseUid) {
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, 'userProgress'),
        where('firebaseUid', '==', currentUser.firebaseUid),
        orderBy('completedAt', 'desc'),
        limit(50)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            completedAt: d.completedAt?.toDate?.() || new Date(d.completedAt),
          };
        });

        setProgress(data);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error('Error loading progress:', err);
      setLoading(false);
    }
  }, [currentUser?.firebaseUid]);

  // ===== STATS CALCULATION =====
  const stats = useMemo(() => {
    if (!progress.length) {
      return {
        totalAttempts: 0,
        bestScore: 0,
        averageScore: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        streak: 0,
      };
    }

    const scores = progress.map(p => parseFloat(p.score)).filter(s => !isNaN(s));
    const totalQs = progress.reduce((sum, p) => sum + (p.totalQuestions || 0), 0);
    const correctQs = progress.reduce((sum, p) => sum + Math.round((p.totalQuestions || 0) * (parseFloat(p.score) || 0) / 100), 0);

    // Calculate streak
    let streak = 0;
    const dates = progress.map(p => new Date(p.completedAt)).sort((a, b) => b - a);

    if (dates.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < dates.length; i++) {
        const d = new Date(dates[i]);
        d.setHours(0, 0, 0, 0);
        const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));
        if (diff === streak) streak++;
        else break;
      }
    }

    return {
      totalAttempts: progress.length,
      bestScore: scores.length ? Math.max(...scores) : 0,
      averageScore: scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
      totalQuestions: totalQs,
      correctAnswers: correctQs,
      streak,
    };
  }, [progress]);

  const accuracy = stats.totalQuestions ? (stats.correctAnswers / stats.totalQuestions * 100) : 0;

  // ===== RENDER =====
  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-gray-950 rounded-2xl p-6 md:p-8">
        <LoadingState />
      </div>
    );
  }

  const hasTests = progress.length > 0;

  return (
    <div className="w-full bg-white dark:bg-gray-950 rounded-2xl p-6 md:p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
        }}
        className="space-y-6 md:space-y-8"
      >
        {/* Header */}
        <ProfileHeader user={currentUser} stats={stats} />

        {!hasTests ? (
          <EmptyState />
        ) : (
          <>
            {/* Streak Card */}
            <StreakCard streak={stats.streak} lastActivityDate={progress[0]?.completedAt} />

            {/* Main Stats Grid */}
            <motion.div
              variants={animations.fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <StatBadge
                icon={Trophy}
                label="Best Score"
                value={`${stats.bestScore.toFixed(0)}%`}
                color="accent"
              />
              <StatBadge
                icon={Target}
                label="Average"
                value={`${stats.averageScore.toFixed(0)}%`}
                color="primary"
              />
              <StatBadge
                icon={Award}
                label="Accuracy"
                value={`${accuracy.toFixed(0)}%`}
                color="success"
              />
              <StatBadge
                icon={BookOpen}
                label="Tests"
                value={stats.totalAttempts}
                color="warning"
              />
            </motion.div>

            {/* Latest Test Result */}
            {progress[0] && (
              <motion.div variants={animations.fadeInUp}>
                <p className={`${fonts.label} text-blue-700 dark:text-blue-300 mb-3`}>
                  Latest Test Result
                </p>
                <ScoreCard
                  score={progress[0].score}
                  correct={Math.round(progress[0].totalQuestions * (parseFloat(progress[0].score) / 100))}
                  total={progress[0].totalQuestions}
                  exam={progress[0].exam}
                  part={progress[0].part}
                />
              </motion.div>
            )}

            {/* Test History */}
            <motion.div variants={animations.fadeInUp}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`${fonts.headline} text-lg text-gray-900 dark:text-white flex items-center gap-2`}>
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Test History
                </h2>
                <span className={`${fonts.label} text-gray-600 dark:text-gray-400 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 rounded-lg`}>
                  {progress.length} tests
                </span>
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {progress.slice(0, displayCount).map((test, idx) => (
                    <TestHistoryItem key={test.id || idx} test={test} index={idx} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Load More Button */}
              {displayCount < progress.length && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDisplayCount(prev => Math.min(prev + 5, progress.length))}
                  className={`w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white ${fonts.title} shadow-lg hover:shadow-xl transition-all`}
                >
                  <span>View More</span>
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </motion.button>
              )}

              {displayCount >= progress.length && progress.length > 5 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${fonts.body} text-center text-sm text-gray-500 dark:text-gray-400 mt-4`}
                >
                  ✓ All tests displayed
                </motion.p>
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
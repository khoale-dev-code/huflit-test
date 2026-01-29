import React, { useState, useMemo, memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Trophy, TrendingUp, BookOpen, Clock, Target, Award,
  Calendar, Flame, Star, Activity, BarChart3, Zap, Brain,
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUserProgress } from '../../hooks/useUserProgress';

// ✅ Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const listItemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

// ✅ Score Badge
const ScoreBadge = memo(({ score, size = 'md' }) => {
  const getScoreColor = (s) => {
    if (s >= 85) return { bg: 'from-green-400 to-emerald-500', text: 'text-green-600', light: 'bg-green-100' };
    if (s >= 70) return { bg: 'from-blue-400 to-cyan-500', text: 'text-blue-600', light: 'bg-blue-100' };
    if (s >= 50) return { bg: 'from-amber-400 to-orange-500', text: 'text-amber-600', light: 'bg-amber-100' };
    return { bg: 'from-red-400 to-pink-500', text: 'text-red-600', light: 'bg-red-100' };
  };

  const colors = getScoreColor(score);
  const sizeClass = size === 'lg' ? 'w-20 h-20 text-4xl' : size === 'sm' ? 'w-14 h-14 text-lg' : 'w-16 h-16 text-2xl';

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${sizeClass} rounded-xl ${colors.light} border-2 ${colors.text} flex items-center justify-center font-black`}
    >
      {score.toFixed(0)}
    </motion.div>
  );
});

ScoreBadge.displayName = 'ScoreBadge';

// ✅ Premium Stat Card
const StatCard = memo(({ icon: Icon, label, value, sublabel, color }) => {
  const colorConfig = {
    blue: { bg: 'from-blue-50 to-cyan-50', icon: 'text-blue-500', border: 'border-blue-200', accent: 'bg-blue-100' },
    orange: { bg: 'from-orange-50 to-amber-50', icon: 'text-orange-500', border: 'border-orange-200', accent: 'bg-orange-100' },
    green: { bg: 'from-green-50 to-emerald-50', icon: 'text-green-500', border: 'border-green-200', accent: 'bg-green-100' },
    purple: { bg: 'from-purple-50 to-pink-50', icon: 'text-purple-500', border: 'border-purple-200', accent: 'bg-purple-100' },
  };

  const cfg = colorConfig[color] || colorConfig.blue;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className={`group relative bg-gradient-to-br ${cfg.bg} rounded-2xl p-6 border-2 ${cfg.border} overflow-hidden cursor-pointer`}
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      <div className="relative z-10 space-y-3">
        <div className={`inline-flex p-3 rounded-xl ${cfg.accent}`}>
          <Icon className={`w-6 h-6 ${cfg.icon}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-black text-gray-900">{value}</span>
            {sublabel && <span className="text-sm font-medium text-gray-500">{sublabel}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

// ✅ Timeline Activity Item
const TimelineItem = memo(({ item, index, isLast }) => {
  const score = parseFloat(item.score);
  const correctAnswers = Math.round(item.totalQuestions * (score / 100));

  const getScoreStatus = (s) => {
    if (s >= 85) return { icon: Star, color: 'text-green-600', label: 'Xuất sắc' };
    if (s >= 70) return { icon: CheckCircle2, color: 'text-blue-600', label: 'Tốt' };
    return { icon: AlertCircle, color: 'text-amber-600', label: 'Cần cải thiện' };
  };

  const status = getScoreStatus(score);
  const StatusIcon = status.icon;

  return (
    <motion.div
      variants={fadeInUp}
      className="relative flex gap-4 md:gap-6 w-full"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 ring-4 ring-white relative z-20 flex-shrink-0 shadow-lg"
        />
        {!isLast && <div className="w-1 h-24 bg-gradient-to-b from-blue-300 to-blue-100 my-2 flex-shrink-0 rounded-full" />}
      </div>

      {/* Content */}
      <motion.div
        whileHover={{ x: 4 }}
        className="flex-1 pb-8 min-w-0 relative z-10"
      >
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 md:p-5 border-2 border-blue-300 shadow-md hover:shadow-lg transition-all duration-200 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-lg bg-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                  {item.exam}
                </span>
                <span className="px-3 py-1 rounded-lg bg-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                  {item.part}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 flex-shrink-0 text-gray-500" />
                  <span className="truncate">{item.completedAt.toLocaleDateString('vi-VN', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0 text-gray-500" />
                  <span>{item.duration || 0} phút</span>
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="text-right flex flex-col items-end gap-3 flex-shrink-0">
              <ScoreBadge score={score} size="md" />
              <div className="text-center">
                <p className={`text-sm font-bold flex items-center gap-1 whitespace-nowrap ${status.color}`}>
                  <StatusIcon className="w-4 h-4 flex-shrink-0" />
                  {status.label}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2 pt-2 border-t border-blue-200">
            <div className="flex justify-between text-xs font-medium text-gray-600">
              <span>✅ {correctAnswers}/{item.totalQuestions} câu</span>
              <span className="text-blue-600 font-bold">{score.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full ${
                  score >= 85 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  score >= 70 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                  'bg-gradient-to-r from-amber-400 to-orange-500'
                } rounded-full shadow-md`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

TimelineItem.displayName = 'TimelineItem';

// ✅ Header Section
const ProfileHeader = memo(({ currentUser, stats }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative rounded-3xl overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-transparent opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex-shrink-0"
          >
            <div className="w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-sm border-3 border-white/30 p-1 shadow-2xl overflow-hidden">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-500 flex items-center justify-center">
                  <User className="w-16 h-16 text-white/80" />
                </div>
              )}
            </div>

            {/* Streak Badge */}
            {stats.recentStreak > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute -bottom-3 -right-3 flex items-center gap-2 px-4 py-2 bg-orange-400 text-white font-bold rounded-full shadow-lg border-3 border-white backdrop-blur-sm"
              >
                <Flame className="w-5 h-5" />
                <span>{stats.recentStreak}</span>
              </motion.div>
            )}
          </motion.div>

          {/* User Info */}
          <motion.div variants={fadeInUp} className="flex-1">
            <h1 className="text-5xl font-black text-white mb-3 leading-tight">
              {currentUser?.name || 'Người dùng'}
            </h1>
            {currentUser?.email && (
              <p className="text-white/90 text-lg font-medium mb-4">{currentUser.email}</p>
            )}

            {/* Quick Stats - Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-1">Bài Tập</p>
                <p className="text-3xl font-black text-white">{stats.totalAttempts}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-1">Cao Nhất</p>
                <p className="text-3xl font-black text-orange-300">{stats.bestScore.toFixed(0)}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-1">Trung Bình</p>
                <p className="text-3xl font-black text-cyan-300">{stats.averageScore.toFixed(0)}%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

ProfileHeader.displayName = 'ProfileHeader';

// ✅ Main Component
export default function UserProfile({ currentUser: currentUserProp }) {
  const { currentUser: currentUserFromHook } = useUserProgress();
  const currentUser = useMemo(
    () => currentUserProp || currentUserFromHook,
    [currentUserProp, currentUserFromHook]
  );

  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(5);

  // ✅ Firestore Listener
  useEffect(() => {
    if (!currentUser?.provider) {
      setLoading(false);
      return;
    }

    try {
      let q;
      if (currentUser.provider === 'firebase' && currentUser.firebaseUid) {
        q = query(collection(db, 'userProgress'), where('firebaseUid', '==', currentUser.firebaseUid));
      } else if (currentUser.provider === 'clerk' && currentUser.clerkId) {
        q = query(collection(db, 'userProgress'), where('clerkId', '==', currentUser.clerkId));
      } else {
        setLoading(false);
        return;
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            completedAt: d.completedAt?.toDate?.() || new Date(d.completedAt),
          };
        }).sort((a, b) => {
          const dateA = a.completedAt instanceof Date ? a.completedAt : new Date(0);
          const dateB = b.completedAt instanceof Date ? b.completedAt : new Date(0);
          return dateB - dateA;
        });

        setProgress(data);
        setLoading(false);
      }, () => setLoading(false));

      return unsubscribe;
    } catch {
      setLoading(false);
    }
  }, [currentUser]);

  // ✅ Calculate Stats
  const stats = useMemo(() => {
    if (!progress?.length) {
      return {
        totalAttempts: 0,
        bestScore: 0,
        averageScore: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        recentStreak: 0,
        lastActivity: null
      };
    }

    const validScores = progress.map(p => parseFloat(p.score)).filter(s => !isNaN(s) && s >= 0);
    const totalQs = progress.reduce((sum, p) => sum + (p.totalQuestions || 0), 0);
    const correctQs = progress.reduce((sum, p) => sum + Math.round((p.totalQuestions || 0) * (parseFloat(p.score) || 0) / 100), 0);

    let streak = 0;
    const dates = progress
      .map(p => new Date(p.completedAt))
      .sort((a, b) => b - a);

    if (dates.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < dates.length; i++) {
        const d = new Date(dates[i]);
        d.setHours(0, 0, 0, 0);
        const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));
        if (diff === streak) streak++;
        else if (diff > streak) break;
      }
    }

    return {
      totalAttempts: progress.length,
      bestScore: validScores.length ? Math.max(...validScores) : 0,
      averageScore: validScores.length ? (validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0,
      totalQuestions: totalQs,
      correctAnswers: correctQs,
      recentStreak: streak,
      lastActivity: dates[0] || null
    };
  }, [progress]);

  const accuracy = stats.totalQuestions ? (stats.correctAnswers / stats.totalQuestions * 100) : 0;

  const trend = useMemo(() => {
    if (progress.length < 2) return 'stable';
    const recent = progress.slice(0, 5).map(p => parseFloat(p.score) || 0);
    const older = progress.slice(5, 10).map(p => parseFloat(p.score) || 0);
    if (!recent.length || !older.length) return 'stable';
    const rAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const oAvg = older.reduce((a, b) => a + b, 0) / older.length;
    return rAvg > oAvg + 5 ? 'improving' : rAvg < oAvg - 5 ? 'declining' : 'stable';
  }, [progress]);

  if (loading) {
    return (
      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-8"
        >
          <ProfileHeader currentUser={currentUser} stats={stats} />
          <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-600 font-semibold text-sm sm:text-base">Đang tải dữ liệu...</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!progress || progress.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-8"
        >
          <ProfileHeader currentUser={currentUser} stats={stats} />
          <motion.div variants={fadeInUp} className="text-center py-12 sm:py-16 md:py-20 px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 mb-4 sm:mb-6"
            >
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 sm:mb-3">Chưa có bài tập nào</h3>
            <p className="text-gray-600 text-sm sm:text-lg max-w-md mx-auto">Bắt đầu làm bài để theo dõi tiến độ và thống kê chi tiết!</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 sm:space-y-8 md:space-y-10 w-full"
      >
        {/* Header */}
        <ProfileHeader currentUser={currentUser} stats={stats} />

        {/* Stats Grid */}
        <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <StatCard icon={Activity} label="Tổng Bài Tập" value={stats.totalAttempts} color="blue" />
          <StatCard icon={Trophy} label="Cao Nhất" value={`${stats.bestScore.toFixed(0)}%`} color="orange" />
          <StatCard icon={BarChart3} label="Trung Bình" value={`${stats.averageScore.toFixed(0)}%`} color="purple" />
          <StatCard icon={Target} label="Chính Xác" value={`${accuracy.toFixed(0)}%`} color="green" />
        </motion.div>

        {/* Detail Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Streak Card */}
          <motion.div
            variants={fadeInUp}
            className="group relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 border-2 border-orange-300 overflow-hidden shadow-md"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative z-10 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  Chuỗi Ngày
                </h3>
                <span className="text-2xl sm:text-3xl font-black text-orange-500">{stats.recentStreak}</span>
              </div>
              <div className="w-full h-2 bg-orange-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min((stats.recentStreak / 30) * 100, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-500"
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium">Tiếp tục duy trì phần thưởng!</p>
            </div>
          </motion.div>

          {/* Questions Card */}
          <motion.div
            variants={fadeInUp}
            className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 border-2 border-blue-300 overflow-hidden shadow-md"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative z-10 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Tổng Câu
                </h3>
                <span className="text-2xl sm:text-3xl font-black text-blue-500">{stats.totalQuestions}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2 text-gray-700">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" /> {stats.correctAnswers}</span>
                <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> {stats.totalQuestions - stats.correctAnswers}</span>
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${accuracy}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Trend Card */}
          <motion.div
            variants={fadeInUp}
            className={`group relative rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 border-2 overflow-hidden shadow-md ${
              trend === 'improving' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' :
              trend === 'declining' ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300' :
              'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300'
            }`}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative z-10 space-y-3 sm:space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                Xu Hướng
              </h3>
              <div className={`text-2xl sm:text-3xl font-black ${
                trend === 'improving' ? 'text-green-600' :
                trend === 'declining' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {trend === 'improving' ? '📈 Tiến Bộ' : trend === 'declining' ? '📉 Giảm' : '➡️ Ổn Định'}
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-700">
                {trend === 'improving' ? 'Điểm tăng lên!' :
                 trend === 'declining' ? 'Hãy cố gắng thêm!' :
                 'Ổn định'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Activity */}
        {progress && progress.length > 0 && (
          <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2 sm:gap-3">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
                <span className="truncate">Hoạt Động</span>
              </h2>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-100 text-orange-700 text-xs sm:text-sm font-bold whitespace-nowrap">
                {progress.length}
              </span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-2 sm:space-y-3">
              {progress.slice(0, itemsToShow).map((item, index) => (
                <TimelineItem
                  key={item.id || index}
                  item={item}
                  index={index}
                  isLast={index === Math.min(itemsToShow - 1, progress.length - 1)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {itemsToShow < progress.length && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setItemsToShow(prev => Math.min(prev + 5, progress.length))}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold uppercase tracking-wide text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span>Xem Thêm</span>
                <span className="text-xs ml-2">({itemsToShow} / {progress.length})</span>
              </motion.button>
            )}

            {/* Show All Loaded Message */}
            {itemsToShow >= progress.length && progress.length > 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-3 sm:py-4"
              >
                <p className="text-gray-500 font-medium text-sm sm:text-base">✓ Đã hiển thị tất cả {progress.length} bài</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { User, Trophy, TrendingUp, BookOpen, Clock, Target, Award, Calendar, Flame, Star, Activity, BarChart3, Zap } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUserProgress } from '../../hooks/useUserProgress'; // ✅ ADDED
import styles from '../styles/UserProfile.module.css';

export default function UserProfile({ currentUser: currentUserProp }) {
  // ✅ FIX 1: Get currentUser from hook if prop not provided
  const { currentUser: currentUserFromHook } = useUserProgress();
  const currentUser = currentUserProp || currentUserFromHook;

  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAttempts: 0,
    bestScore: 0,
    averageScore: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    recentStreak: 0,
    lastActivity: null
  });

  // ✅ FIX 2: Add debug log to see currentUser value
  useEffect(() => {
    console.log('🔍 [UserProfile] Mounting with currentUser:', {
      received: currentUserProp,
      fromHook: currentUserFromHook,
      final: currentUser,
    });
  }, [currentUserProp, currentUserFromHook, currentUser]);

  // ✅ Original query logic
  useEffect(() => {
    console.log('🔍 [UserProfile] Querying with:', currentUser);

    if (!currentUser || !currentUser.provider) {
      console.log('⏸️ UserProfile: currentUser not ready', currentUser);
      setProgress([]);
      setLoading(false);
      return;
    }

    try {
      let q;

      if (currentUser.provider === 'firebase' && currentUser.firebaseUid) {
        console.log('🔥 Querying Firebase user:', currentUser.firebaseUid);
        q = query(
          collection(db, 'userProgress'),
          where('firebaseUid', '==', currentUser.firebaseUid)
        );
      } else if (currentUser.provider === 'clerk' && currentUser.clerkId) {
        console.log('🔐 Querying Clerk user:', currentUser.clerkId);
        q = query(
          collection(db, 'userProgress'),
          where('clerkId', '==', currentUser.clerkId)
        );
      } else {
        console.warn('❌ Invalid currentUser provider:', currentUser.provider);
        setLoading(false);
        return;
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log(`📥 Progress snapshot received: ${snapshot.size} documents`);
          
          const data = snapshot.docs.map(doc => {
            const docData = doc.data();
            return {
              id: doc.id,
              ...docData,
              completedAt: docData.completedAt?.toDate?.() || new Date(docData.completedAt),
            };
          });

          const sortedData = data.sort((a, b) => {
            const dateA = a.completedAt instanceof Date ? a.completedAt : new Date(0);
            const dateB = b.completedAt instanceof Date ? b.completedAt : new Date(0);
            return dateB - dateA;
          });

          console.log(`📊 Progress data loaded: ${sortedData.length} documents`, sortedData);
          setProgress(sortedData);
          setLoading(false);
        },
        (err) => {
          console.error('❌ Error fetching progress:', err.code, err.message);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error('❌ Error setting up listener:', err);
      setLoading(false);
    }
  }, [currentUser]); // ✅ Depend on final currentUser value

  // Calculate comprehensive stats
  useEffect(() => {
    if (!progress || progress.length === 0) {
      console.log('📊 No progress data, resetting stats');
      setStats({
        totalAttempts: 0,
        bestScore: 0,
        averageScore: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        recentStreak: 0,
        lastActivity: null
      });
      return;
    }

    console.log('📊 Calculating stats from progress:', progress.length, 'items');

    const validScores = progress
      .map(p => parseFloat(p.score))
      .filter(score => !isNaN(score) && score >= 0);

    const totalQuestions = progress.reduce((sum, p) => sum + (p.totalQuestions || 0), 0);
    const correctAnswers = progress.reduce((sum, p) => {
      const questions = p.totalQuestions || 0;
      const score = parseFloat(p.score) || 0;
      return sum + Math.round(questions * (score / 100));
    }, 0);

    // Calculate streak
    const dates = progress
      .map(p => p.completedAt)
      .filter(d => d instanceof Date)
      .sort((a, b) => b - a);

    let streak = 0;
    if (dates.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < dates.length; i++) {
        const date = new Date(dates[i]);
        date.setHours(0, 0, 0, 0);

        const daysDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));

        if (daysDiff === streak) {
          streak++;
        } else if (daysDiff > streak) {
          break;
        }
      }
    }

    const newStats = {
      totalAttempts: progress.length,
      bestScore: validScores.length > 0 ? Math.max(...validScores) : 0,
      averageScore: validScores.length > 0
        ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length
        : 0,
      totalQuestions,
      correctAnswers,
      recentStreak: streak,
      lastActivity: dates.length > 0 ? dates[0] : null
    };

    console.log('✅ Stats calculated:', newStats);
    setStats(newStats);
  }, [progress]);

  // Calculate performance trend
  const getPerformanceTrend = () => {
    if (progress.length < 2) return 'stable';

    const recent5 = progress.slice(0, 5).map(p => parseFloat(p.score) || 0);
    const older5 = progress.slice(5, 10).map(p => parseFloat(p.score) || 0);

    if (recent5.length === 0 || older5.length === 0) return 'stable';

    const recentAvg = recent5.reduce((a, b) => a + b, 0) / recent5.length;
    const olderAvg = older5.reduce((a, b) => a + b, 0) / older5.length;

    if (recentAvg > olderAvg + 5) return 'improving';
    if (recentAvg < olderAvg - 5) return 'declining';
    return 'stable';
  };

  const trend = getPerformanceTrend();
  const accuracy = stats.totalQuestions > 0
    ? (stats.correctAnswers / stats.totalQuestions * 100).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}>
          <div className={styles.loadingSpinnerIcon}></div>
          <p className={styles.loadingText}>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  const userPhotoUrl = currentUser?.photoURL;
  const userDisplayName = currentUser?.name || 'User';
  const userEmail = currentUser?.email;
  const providerBadge = currentUser?.provider === 'clerk' ? '🔐 Clerk' : '🔥 Firebase';

  return (
    <div className={styles.container}>
      {/* Header with Avatar */}
      <div className={styles.header}>
        <div className={styles.headerOverlay}></div>
        <div className={styles.headerContent}>
          <div className="flex items-center gap-4">
            <div className={styles.avatar}>
              {userPhotoUrl ? (
                <img
                  src={userPhotoUrl}
                  alt={userDisplayName}
                  className={styles.avatarImg}
                />
              ) : (
                <div className={styles.avatarDefault}>
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
              {stats.recentStreak > 0 && (
                <div className={styles.streakBadge}>
                  <Flame className="w-3 h-3" />
                  {stats.recentStreak}
                </div>
              )}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userNameContainer}>
                <h2 className={styles.userName}>{userDisplayName}</h2>
                <span className={`${styles.authBadge} ${
                  currentUser?.provider === 'clerk'
                    ? styles.authBadgeClerk
                    : styles.authBadgeFirebase
                }`}>
                  {providerBadge}
                </span>
              </div>
              <p className={styles.userEmail}>{userEmail}</p>
              {stats.lastActivity && (
                <p className={styles.lastActivity}>
                  <Clock className="w-3 h-3" />
                  Hoạt động gần nhất: {stats.lastActivity.toLocaleDateString('vi-VN')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {stats.totalAttempts === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <div className={styles.emptyStateIconBg}></div>
              <BookOpen className="relative w-20 h-20 text-orange-400 mx-auto z-10" />
            </div>
            <h3 className={styles.emptyStateTitle}>Chưa có bài tập nào</h3>
            <p className={styles.emptyStateText}>
              Hãy bắt đầu làm bài để xem tiến độ và thống kê chi tiết của bạn!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Key Stats Grid */}
            <div className={styles.statsGrid}>
              {/* Total Attempts */}
              <div className={`${styles.statCard} bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200`}>
                <div className={styles.statCardIcon}>
                  <div className={`${styles.statCardIconBg} bg-blue-500`}>
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <p className={`${styles.statCardLabel} text-blue-700`}>Tổng bài</p>
                </div>
                <p className={`${styles.statCardValue} text-blue-600`}>{stats.totalAttempts}</p>
              </div>

              {/* Best Score */}
              <div className={`${styles.statCard} bg-gradient-to-br from-green-50 to-green-100 border-green-200`}>
                <div className={styles.statCardIcon}>
                  <div className={`${styles.statCardIconBg} bg-green-500`}>
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <p className={`${styles.statCardLabel} text-green-700`}>Cao nhất</p>
                </div>
                <p className={`${styles.statCardValue} text-green-600`}>{stats.bestScore.toFixed(1)}%</p>
              </div>

              {/* Average Score */}
              <div className={`${styles.statCard} bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200`}>
                <div className={styles.statCardIcon}>
                  <div className={`${styles.statCardIconBg} bg-amber-500`}>
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <p className={`${styles.statCardLabel} text-amber-700`}>Trung bình</p>
                </div>
                <p className={`${styles.statCardValue} text-amber-600`}>{stats.averageScore.toFixed(1)}%</p>
              </div>

              {/* Accuracy */}
              <div className={`${styles.statCard} bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200`}>
                <div className={styles.statCardIcon}>
                  <div className={`${styles.statCardIconBg} bg-purple-500`}>
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <p className={`${styles.statCardLabel} text-purple-700`}>Độ chính xác</p>
                </div>
                <p className={`${styles.statCardValue} text-purple-600`}>{accuracy}%</p>
              </div>
            </div>

            {/* Additional Stats */}
            <div className={styles.additionalStats}>
              {/* Streak */}
              <div className={styles.additionalStatCard}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-md">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">Chuỗi ngày</p>
                    <p className="text-2xl font-black text-gray-900">{stats.recentStreak} ngày</p>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressBarFill}
                    style={{
                      background: 'linear-gradient(to right, #fb923c, #ef4444)',
                      width: `${Math.min(stats.recentStreak * 10, 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Total Questions */}
              <div className={styles.additionalStatCard}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-md">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">Tổng câu hỏi</p>
                    <p className="text-2xl font-black text-gray-900">{stats.totalQuestions}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-semibold">
                  ✅ {stats.correctAnswers} đúng • ❌ {stats.totalQuestions - stats.correctAnswers} sai
                </p>
              </div>

              {/* Trend */}
              <div className={styles.additionalStatCard}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl shadow-md ${
                    trend === 'improving' ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                    trend === 'declining' ? 'bg-gradient-to-br from-red-400 to-pink-500' :
                    'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">Xu hướng</p>
                    <p className={`text-lg font-black ${
                      trend === 'improving' ? 'text-green-600' :
                      trend === 'declining' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {trend === 'improving' ? '📈 Tiến bộ' :
                       trend === 'declining' ? '📉 Giảm' :
                       '➡️ Ổn định'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            {progress && progress.length > 0 && (
              <div className={styles.recentActivity}>
                <div className={styles.recentActivityHeader}>
                  <h3 className={styles.recentActivityTitle}>
                    <Clock className="w-6 h-6 text-orange-600" />
                    Lịch sử gần đây
                  </h3>
                  <span className={styles.recentActivityCount}>
                    {progress.length} bài
                  </span>
                </div>
                <div className={styles.activityList}>
                  {progress.slice(0, 15).map((item, index) => {
                    const score = parseFloat(item.score || 0);
                    const isRecent = index < 3;

                    return (
                      <div
                        key={item.id}
                        className={`${styles.activityItem} ${
                          isRecent ? styles.activityItemRecent : styles.activityItemOld
                        }`}
                      >
                        {isRecent && (
                          <div className={styles.activityItemNew}>
                            <Zap className="w-3 h-3" />
                            MỚI
                          </div>
                        )}
                        <div className={styles.activityItemContent}>
                          <div className={styles.activityItemInfo}>
                            <div className={styles.activityItemTitle}>
                              <span className={styles.activityItemTitleText}>
                                {item.exam?.toUpperCase()} - {item.part?.toUpperCase()}
                              </span>
                              {item.isDraft && (
                                <span className={styles.activityItemDraftBadge}>
                                  Nháp
                                </span>
                              )}
                            </div>
                            <div className={styles.activityItemMeta}>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {item.completedAt instanceof Date
                                  ? item.completedAt.toLocaleString('vi-VN', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })
                                  : 'N/A'}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {item.totalQuestions || 0} câu
                              </span>
                            </div>
                          </div>
                          <div className={styles.activityItemScore}>
                            <div className={`${styles.activityItemScoreValue} ${
                              score >= 80 ? styles.activityItemScoreGreen :
                              score >= 60 ? styles.activityItemScoreBlue :
                              score >= 40 ? styles.activityItemScoreAmber :
                              styles.activityItemScoreRed
                            }`}>
                              {score.toFixed(1)}%
                            </div>
                            <div className="flex items-center justify-end gap-1">
                              <Star className={`w-4 h-4 ${score >= 80 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                              <span className="text-xs font-bold text-gray-600">
                                {Math.round((item.totalQuestions || 0) * (score / 100))}/{item.totalQuestions || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
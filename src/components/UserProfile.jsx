import React, { useEffect, useState } from 'react';
import { User, Trophy, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function UserProfile() {
  const { user: clerkUser } = useUser();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAttempts: 0,
    bestScore: 0,
    averageScore: 0,
  });

  // Subscribe to user's progress directly
  useEffect(() => {
    if (!clerkUser) {
      setProgress([]);
      setLoading(false);
      return;
    }

    console.log('📊 Setting up progress listener for:', clerkUser.id);

    try {
      const q = query(
        collection(db, 'userProgress'),
        where('clerkId', '==', clerkUser.id)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log('📥 Progress snapshot received:', snapshot.size, 'documents');
          const data = snapshot.docs.map(doc => {
            const docData = doc.data();
            return {
              id: doc.id,
              ...docData,
              completedAt: docData.completedAt?.toDate?.() || new Date(docData.completedAt),
            };
          });
          
          // Sort by completedAt in memory (no need for Firestore index)
          const sortedData = data.sort((a, b) => {
            const dateA = a.completedAt instanceof Date ? a.completedAt : new Date(0);
            const dateB = b.completedAt instanceof Date ? b.completedAt : new Date(0);
            return dateB - dateA; // Descending order (newest first)
          });
          
          setProgress(sortedData);
          setLoading(false);
        },
        (err) => {
          console.error('❌ Snapshot listener error:', err.code, err.message);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error('❌ Error setting up listener:', err);
      setLoading(false);
    }
  }, [clerkUser]);

  // Calculate stats when progress changes
  useEffect(() => {
    if (!progress || progress.length === 0) {
      setStats({
        totalAttempts: 0,
        bestScore: 0,
        averageScore: 0,
      });
      return;
    }

    const totalAttempts = progress.length;
    const scores = progress.map(p => p.score || 0);
    const bestScore = Math.max(...scores);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    setStats({
      totalAttempts,
      bestScore,
      averageScore,
    });

    console.log('📈 Stats updated:', { totalAttempts, bestScore, averageScore });
  }, [progress]);

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-orange-200 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-orange-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {clerkUser?.imageUrl && (
              <img
                src={clerkUser.imageUrl}
                alt={clerkUser.fullName || clerkUser.firstName}
                className="w-14 h-14 rounded-full border-3 border-white shadow-lg"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {clerkUser?.fullName || clerkUser?.firstName || 'User'}
              </h2>
              <p className="text-white/90 text-sm font-medium">
                {clerkUser?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
          <User className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        {stats.totalAttempts === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <p className="text-gray-700 font-bold text-lg mb-2">Chưa có bài tập nào</p>
            <p className="text-gray-500 text-sm">Hãy bắt đầu làm bài để xem tiến độ của bạn!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 text-center border-2 border-blue-300 shadow-md hover:shadow-xl transition-shadow">
                <TrendingUp className="w-7 h-7 text-blue-600 mx-auto mb-3" />
                <p className="text-4xl font-black text-blue-700 mb-1">{stats.totalAttempts}</p>
                <p className="text-sm text-blue-800 font-bold">Lần làm bài</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 text-center border-2 border-green-300 shadow-md hover:shadow-xl transition-shadow">
                <Trophy className="w-7 h-7 text-green-600 mx-auto mb-3" />
                <p className="text-4xl font-black text-green-700 mb-1">
                  {stats.bestScore.toFixed(0)}%
                </p>
                <p className="text-sm text-green-800 font-bold">Điểm cao nhất</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 text-center border-2 border-orange-300 shadow-md hover:shadow-xl transition-shadow">
                <TrendingUp className="w-7 h-7 text-orange-600 mx-auto mb-3" />
                <p className="text-4xl font-black text-orange-700 mb-1">
                  {stats.averageScore.toFixed(0)}%
                </p>
                <p className="text-sm text-orange-800 font-bold">Điểm trung bình</p>
              </div>
            </div>

            {/* Recent Attempts */}
            {progress && progress.length > 0 && (
              <div className="border-t-2 border-orange-200 pt-6">
                <h3 className="font-black text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Lịch sử gần đây
                </h3>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {progress.slice(0, 5).map((item) => (
                    <div 
                      key={item.id} 
                      className="p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all hover:shadow-md"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900 text-base">
                            {item.exam?.toUpperCase()} - {item.part?.toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-600 font-semibold mt-1">
                            {item.completedAt instanceof Date 
                              ? item.completedAt.toLocaleString('vi-VN', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'N/A'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.totalQuestions} câu hỏi
                            {item.isDraft && <span className="text-orange-600 ml-2">• Nháp</span>}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-black text-orange-600">
                            {item.score?.toFixed(0)}%
                          </p>
                          <p className="text-xs text-gray-600 font-semibold mt-1">
                            {Math.round(item.totalQuestions * (item.score / 100))}/{item.totalQuestions}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
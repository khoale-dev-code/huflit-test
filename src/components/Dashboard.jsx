import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Trophy,
  Star,
  Target,
  Activity,
  Award,
  Flame,
  ChevronRight,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useUserProgress } from '../hooks/useUserProgress.js';

const THEME = {
  primary: '#1A73E8',
  success: '#34A853',
  warning: '#FBBC05',
  danger: '#EA4335',
};

// ============================================
// 🧩 SUB-COMPONENTS
// ============================================

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[28px] border border-[#F1F3F4] shadow-sm flex flex-col gap-4"
  >
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center"
      style={{ backgroundColor: `${color}10` }}
    >
      <Icon className="w-6 h-6" style={{ color: color }} />
    </div>
    <div>
      <div className="flex items-center gap-1 mb-1">
        <p className="text-[10px] font-black text-[#70757a] uppercase tracking-wider">
          {label}
        </p>
        {trend !== undefined && (
          <span
            className={`flex items-center text-[10px] font-bold ${
              trend >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend >= 0 ? (
              <TrendingUp size={10} />
            ) : (
              <TrendingDown size={10} />
            )}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-[#202124]">{value}</h3>
    </div>
  </motion.div>
);

const HistoryItem = ({ item, onClick }) => (
  <div
    onClick={() => onClick(item)}
    className="group flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl cursor-pointer transition-all border-b border-slate-50 last:border-0 active:scale-[0.98]"
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-bold shadow-sm ${
          item.score >= 80
            ? 'bg-green-50 text-green-600'
            : item.score >= 50
            ? 'bg-blue-50 text-blue-600'
            : 'bg-red-50 text-red-600'
        }`}
      >
        <span className="text-sm">{item.score}</span>
        <span className="text-[8px] uppercase text-slate-400">Pts</span>
      </div>
      <div>
        <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors uppercase">
          {item.exam} • P{item.part}
        </h4>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
          <Clock size={12} />
          {item.completedAt instanceof Date
            ? item.completedAt.toLocaleDateString('vi-VN')
            : 'N/A'}
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span className="capitalize">{item.testType}</span>
        </div>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
  </div>
);

// ============================================
// 📊 CUSTOM TOOLTIP
// ============================================

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-lg">
        <p className="text-sm font-bold text-slate-800">Ngày {label}</p>
        <p className="text-sm font-semibold text-indigo-600">
          {payload[0].value} điểm
        </p>
      </div>
    );
  }
  return null;
};

// ============================================
// 🚀 MAIN COMPONENT
// ============================================

export default function DetailedDashboard() {
  const navigate = useNavigate();

  // 1. Lấy dữ liệu từ Hook
  const {
    currentUser,
    progress,
    analytics: rawAnalytics,
    loading,
    isLoaded,
  } = useUserProgress();

  // 2. Mặc định analytics để tránh undefined
  const analytics = useMemo(
    () => ({
      streak: 0,
      todayXP: 0,
      dailyGoal: 150,
      level: 1,
      xp: 0,
      accuracy: 0,
      bestScore: 0,
      averageScore: 0,
      trend: 0,
      weaknesses: [],
      ...rawAnalytics,
    }),
    [rawAnalytics]
  );

  // 3. Greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  }, []);

  // ✅ FIX 1: AGGREGATE THEO NGÀY + SORT ĐÚNG
  const chartData = useMemo(() => {
    if (!progress?.length) return [];

    // Bước 1: Group by ngày
    const groupedByDate = progress.reduce((acc, item) => {
      const dateKey = item.completedAt.toISOString().split('T')[0]; // YYYY-MM-DD

      if (!acc[dateKey]) {
        acc[dateKey] = { total: 0, count: 0 };
      }

      acc[dateKey].total += Number(item.score) || 0;
      acc[dateKey].count += 1;

      return acc;
    }, {});

    // Bước 2: Format + sort theo thời gian
    const formatted = Object.entries(groupedByDate)
      .map(([date, data]) => ({
        name: new Date(date).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
        }),
        score: Math.round(data.total / data.count),
        rawDate: new Date(date),
      }))
      .sort((a, b) => a.rawDate - b.rawDate) // CŨ → MỚI
      .slice(-7); // Lấy 7 ngày gần nhất

    return formatted;
  }, [progress]);

  // ✅ FIX 2: TREND TỪ CHART DATA (AGGREGATE)
  const enhancedAnalytics = useMemo(() => {
    if (chartData.length < 2) {
      return { ...analytics, trend: 0 };
    }

    // Lấy 7 ngày gần nhất vs 7 ngày trước
    const last7 = chartData.slice(-7);
    const prev7 = chartData.slice(Math.max(0, chartData.length - 14), chartData.length - 7);

    const avgLast7 =
      last7.reduce((sum, d) => sum + d.score, 0) / last7.length;
    const avgPrev7 =
      prev7.length > 0
        ? prev7.reduce((sum, d) => sum + d.score, 0) / prev7.length
        : avgLast7;

    const trend = avgLast7 - avgPrev7;

    return { ...analytics, trend };
  }, [analytics, chartData]);

  // 4. Loading State
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="w-10 h-10 border-[3px] border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] pb-24">
      

      <main className="max-w-6xl mx-auto px-6 pt-10">
        {/* HERO */}
        <section className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-[32px] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-300">
                  {currentUser?.name?.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1 text-slate-900">
                {greeting}, {currentUser?.name?.split(' ').pop()}!
              </h1>
              <p className="text-[#5F6368] text-sm font-medium">
                Bạn đã đạt{' '}
                <span className="text-green-600 font-bold">
                  {enhancedAnalytics.todayXP} XP
                </span>{' '}
                hôm nay.
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center min-w-[100px]">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                Cấp độ
              </p>
              <p className="text-2xl font-black text-green-600">
                {enhancedAnalytics.level}
              </p>
            </div>
            <div className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center min-w-[100px]">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                XP
              </p>
              <p className="text-2xl font-black text-blue-600">
                {enhancedAnalytics.xp.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        {/* PROGRESS BAR */}
        <div className="bg-white p-6 rounded-[28px] border border-[#F1F3F4] shadow-sm mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-bold text-slate-700">Mục tiêu ngày</p>
            <p className="text-xs text-slate-500 font-medium">
              {enhancedAnalytics.todayXP}/{enhancedAnalytics.dailyGoal} XP
            </p>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(
                  100,
                  (enhancedAnalytics.todayXP / enhancedAnalytics.dailyGoal) * 100
                )}%`,
              }}
              className={`h-full ${
                enhancedAnalytics.todayXP >= enhancedAnalytics.dailyGoal
                  ? 'bg-green-500'
                  : 'bg-indigo-500'
              }`}
            />
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Activity}
            label="Chính xác"
            value={`${Math.round(enhancedAnalytics.accuracy)}%`}
            color={THEME.success}
            trend={enhancedAnalytics.trend}
          />
          <StatCard
            icon={Trophy}
            label="Điểm cao"
            value={enhancedAnalytics.bestScore}
            color={THEME.warning}
          />
          <StatCard
            icon={Target}
            label="Trung bình"
            value={Math.round(enhancedAnalytics.averageScore)}
            color={THEME.primary}
          />
          <StatCard
            icon={Award}
            label="Thứ hạng"
            value={`#${Math.max(1, 100 - enhancedAnalytics.level * 2)}`}
            color={'#EA4335'}
          />
        </div>

        {/* CHART & HISTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 📊 CHART SECTION */}
          <section className="lg:col-span-2 bg-white rounded-[32px] border border-[#F1F3F4] p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
              <TrendingUp className="text-indigo-600" size={20} />
              Xu hướng điểm số
            </h3>

            {/* ✅ EMPTY STATE */}
            {chartData.length === 0 ? (
              <div className="h-[250px] w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <AlertCircle size={32} />
                  <p className="text-sm font-medium">Chưa đủ dữ liệu để phân tích</p>
                  <p className="text-xs text-slate-300">Hoàn thành vài bài tập để xem xu hướng</p>
                </div>
              </div>
            ) : (
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient
                        id="colorScore"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4F46E5"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4F46E5"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F1F3F4"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94A3B8', fontSize: 12 }}
                    />
                    {/* ✅ FIX 3: YAxis domain cố định */}
                    <YAxis
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94A3B8', fontSize: 12 }}
                    />
                    {/* ✅ FIX 4: Custom Tooltip */}
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#4F46E5"
                      strokeWidth={3}
                      fill="url(#colorScore)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>

          {/* 📜 HISTORY SECTION */}
          <section className="bg-white rounded-[32px] border border-[#F1F3F4] p-6 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Clock size={18} className="text-indigo-500" />
              Lịch sử
            </h3>
            <div className="flex-1 overflow-y-auto max-h-[350px] space-y-1 pr-1 custom-scrollbar">
              {progress.length > 0 ? (
                progress.map((item) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    onClick={(i) => navigate(`/review/${i.id}`)}
                  />
                ))
              ) : (
                <p className="text-center py-10 text-slate-400 text-sm">
                  Chưa có bài làm nào
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
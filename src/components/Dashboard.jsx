import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Trophy, Star, Target, Activity, Award, Flame, 
  ChevronRight, Clock, AlertCircle, TrendingUp, TrendingDown 
} from 'lucide-react';

import { useUserProgress } from '../hooks/useUserProgress.js'; 

const THEME = {
  primary: '#1A73E8',
  success: '#34A853',
  warning: '#FBBC05',
  danger: '#EA4335',
};

// ============================================
// 🧩 SUB-COMPONENTS (Giữ nguyên logic hiển thị)
// ============================================
const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[28px] border border-[#F1F3F4] shadow-sm flex flex-col gap-4">
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
      <Icon className="w-6 h-6" style={{ color: color }} />
    </div>
    <div>
      <div className="flex items-center gap-1 mb-1">
        <p className="text-[10px] font-black text-[#70757a] uppercase tracking-wider">{label}</p>
        {trend !== undefined && (
          <span className={`flex items-center text-[10px] font-bold ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-[#202124]">{value}</h3>
    </div>
  </motion.div>
);

const HistoryItem = ({ item, onClick }) => (
  <div onClick={() => onClick(item)} className="group flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl cursor-pointer transition-all border-b border-slate-50 last:border-0 active:scale-[0.98]">
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-bold shadow-sm ${item.score >= 80 ? 'bg-green-50 text-green-600' : item.score >= 50 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
        <span className="text-sm">{item.score}</span>
        <span className="text-[8px] uppercase text-slate-400">Pts</span>
      </div>
      <div>
        <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors uppercase">{item.exam} • P{item.part}</h4>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
          <Clock size={12} /> {item.completedAt instanceof Date ? item.completedAt.toLocaleDateString('vi-VN') : 'N/A'}
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span className="capitalize">{item.testType}</span>
        </div>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
  </div>
);

// ============================================
// 🚀 MAIN COMPONENT
// ============================================
export default function DetailedDashboard() {
  const navigate = useNavigate();
  
  // 1. Lấy dữ liệu từ Hook
  const { currentUser, progress, analytics: rawAnalytics, loading, isLoaded } = useUserProgress();

  // 2. [HỢP LÝ HƠN] Tạo giá trị mặc định cho analytics để tránh lỗi undefined
  const analytics = useMemo(() => ({
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
    ...rawAnalytics // Ghi đè bằng dữ liệu thật khi đã load xong
  }), [rawAnalytics]);

  // 3. Xử lý Chào hỏi & Chart
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  }, []);

  const chartData = useMemo(() => {
    if (!progress || !progress.length) return [];
    return [...progress].slice(0, 7).reverse().map(p => ({
      name: p.completedAt instanceof Date ? p.completedAt.toLocaleDateString('vi-VN', { day: '2-digit' }) : '',
      score: Number(p.score) || 0,
    }));
  }, [progress]);

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
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-[#F1F3F4] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-[#1A73E8] rounded-xl flex items-center justify-center shadow-lg"><Star className="text-white w-5 h-5 fill-current" /></div>
            <span className="font-bold text-xl tracking-tight">HubStudy</span>
          </div>
          <div className="flex items-center gap-3 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">
             <Flame className="w-4 h-4 text-[#FF9600] fill-current" />
             <span className="text-xs font-black text-orange-700">{analytics.streak} Ngày liên tiếp</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-10">
        {/* HERO */}
        <section className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-[32px] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-300">{currentUser?.name?.charAt(0)}</div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1 text-slate-900">{greeting}, {currentUser?.name?.split(' ').pop()}!</h1>
              <p className="text-[#5F6368] text-sm font-medium">Bạn đã đạt <span className="text-green-600 font-bold">{analytics.todayXP} XP</span> hôm nay.</p>
            </div>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center min-w-[100px]">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Cấp độ</p>
              <p className="text-2xl font-black text-green-600">{analytics.level}</p>
            </div>
            <div className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center min-w-[100px]">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">XP</p>
              <p className="text-2xl font-black text-blue-600">{analytics.xp.toLocaleString()}</p>
            </div>
          </div>
        </section>

        {/* PROGRESS BAR */}
        <div className="bg-white p-6 rounded-[28px] border border-[#F1F3F4] shadow-sm mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-bold text-slate-700">Mục tiêu ngày</p>
            <p className="text-xs text-slate-500 font-medium">{analytics.todayXP}/{analytics.dailyGoal} XP</p>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${Math.min(100, (analytics.todayXP / analytics.dailyGoal) * 100)}%` }} 
              className={`h-full ${analytics.todayXP >= analytics.dailyGoal ? 'bg-green-500' : 'bg-indigo-500'}`} 
            />
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Activity} label="Chính xác" value={`${Math.round(analytics.accuracy)}%`} color={THEME.success} trend={analytics.trend} />
          <StatCard icon={Trophy} label="Điểm cao" value={analytics.bestScore} color={THEME.warning} />
          <StatCard icon={Target} label="Trung bình" value={Math.round(analytics.averageScore)} color={THEME.primary} />
          <StatCard icon={Award} label="Thứ hạng" value={`#${Math.max(1, 100 - analytics.level * 2)}`} color={'#EA4335'} />
        </div>

        {/* CHART & HISTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white rounded-[32px] border border-[#F1F3F4] p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-3"><TrendingUp className="text-indigo-600" size={20}/> Xu hướng điểm số</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={3} fill="#4F46E5" fillOpacity={0.05} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="bg-white rounded-[32px] border border-[#F1F3F4] p-6 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6"><Clock size={18} className="text-indigo-500"/> Lịch sử</h3>
            <div className="flex-1 overflow-y-auto max-h-[350px] space-y-1 pr-1 custom-scrollbar">
              {progress.length > 0 ? progress.map(item => (
                <HistoryItem key={item.id} item={item} onClick={(i) => navigate(`/review/${i.id}`)} />
              )) : <p className="text-center py-10 text-slate-400 text-sm">Chưa có bài làm nào</p>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
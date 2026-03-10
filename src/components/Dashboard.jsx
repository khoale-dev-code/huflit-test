import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Trophy, Activity, Flame, ChevronRight, Clock,
  TrendingUp, TrendingDown, BookOpen, Zap, BarChart2, Star, User
} from 'lucide-react';
import { useUserProgress } from '../hooks/useUserProgress.js';
import { getAllExamMetadataAsync } from '../data/examData.js';

// --- 1. Custom Hooks ---
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// --- 2. Design System Tokens ---
const C = {
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  accent: '#2563EB', // ✅ Đổi màu chủ đạo sang Xanh dương (Blue)
  green: '#10B981',
  yellow: '#F59E0B',
  red: '#EF4444',
  blue: '#3B82F6',
};

// --- 3. Sub-Components ---
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-100 ring-1 ring-black/5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{label}</p>
      <p className="text-lg font-black text-blue-600">{payload[0].value} <span className="text-xs text-slate-400 font-normal">điểm</span></p>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, color, bg }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-2xl transition-colors" style={{ backgroundColor: bg }}>
        <Icon size={20} style={{ color }} />
      </div>
      {sub}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <h4 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h4>
    </div>
  </motion.div>
);

const HistoryItem = ({ item, index, onClick, examMap }) => {
  const scoreColor = item.score >= 80 ? C.green : item.score >= 50 ? C.yellow : C.red;
  
  // Hỗ trợ cả Supabase (mới) và Firebase (cũ)
  const targetExamId = item.exam_id || item.exam;
  const examTitle = examMap[targetExamId] || targetExamId || 'Bài thi';
  const targetDate = item.created_at || item.completedAt || item.timestamp;
  const targetPart = item.part || 'full-exam';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onClick(item)}
      className="group flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-slate-100"
    >
      <div className="flex items-center gap-4 min-w-0"> {/* Thêm min-w-0 để chống tràn ngang */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0" 
              style={{ backgroundColor: `${scoreColor}15`, color: scoreColor }}>
          {item.score}
        </div>
        <div className="min-w-0 flex-1 pr-2">
          <h5 className="font-bold text-slate-800 truncate text-sm">
            {examTitle}
          </h5>
          <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 truncate">
            <Clock size={10} className="flex-shrink-0" /> 
            {targetDate ? new Date(targetDate).toLocaleDateString('vi-VN') : 'Gần đây'} 
            <span className="mx-1 text-slate-300">•</span>
            {targetPart === 'full-exam' ? 'Full Test' : `Part ${targetPart.replace('part', '')}`}
          </p>
        </div>
      </div>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1 flex-shrink-0" />
    </motion.div>
  );
};

// --- 4. Main Component ---
export default function DetailedDashboard() {
  const navigate = useNavigate();
  const { currentUser, progress, analytics, chartData, loading, isLoaded } = useUserProgress();
  
  const [examMap, setExamMap] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [showLevelUp, setShowLevelUp] = useState(false);
  
  const prevLevel = usePrevious(analytics.level);

  // Mở Toast Level Up
  useEffect(() => {
    if (prevLevel !== undefined && analytics.level > prevLevel) {
      setShowLevelUp(true);
    }
  }, [analytics.level, prevLevel]);

  // ✅ Auto-hide Toast Level Up sau 3 giây
  useEffect(() => {
    if (showLevelUp) {
      const timer = setTimeout(() => setShowLevelUp(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showLevelUp]);

  useEffect(() => {
    getAllExamMetadataAsync().then(data => {
      const map = {};
      data.forEach(ex => { map[ex.id] = ex.title; });
      setExamMap(map);
    });
  }, []);

  const filteredHistory = useMemo(() => {
    if (activeTab === 'good') return progress.filter(p => p.score >= 80);
    if (activeTab === 'bad') return progress.filter(p => p.score < 50);
    return progress;
  }, [progress, activeTab]);

  const handleHistoryClick = useCallback((item) => {
    navigate(`/history/${item.id}`, { 
        state: { progressItem: item },
        replace: false 
    });
  }, [navigate]);

  if (!isLoaded || loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
                  className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen pb-12 font-sans selection:bg-blue-100" style={{ backgroundColor: C.bg }}>
      
      {/* LEVEL UP TOAST (Đã đổi màu xanh & Tự ẩn) */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.5, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-[2rem] shadow-2xl border border-white/20 backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)', // Gradient Xanh dương -> Cyan
              boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.4)'
            }}
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🎉</div>
            <div>
              <h4 className="text-white font-black text-lg leading-none">Cấp độ mới!</h4>
              <p className="text-white/90 text-xs font-bold mt-1">Bạn đã đạt Level {analytics.level}</p>
            </div>
            <button onClick={() => setShowLevelUp(false)} className="ml-2 bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-black">TUYỆT VỜI</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white border-b border-slate-200 pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* ✅ Avatar trong suốt và viền mềm mại */}
              <div className="w-20 h-20 rounded-full border-2 border-slate-100 bg-slate-50/50 flex items-center justify-center overflow-hidden flex-shrink-0">
                {currentUser?.photoURL 
                  ? <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover bg-transparent" /> 
                  : <User className="text-slate-400" size={32} />
                }
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Chào {currentUser?.name?.split(' ').pop() || 'Khoa'}! 👋</h1>
                <p className="text-slate-500 font-medium text-sm mt-1">Cùng xem lại hành trình học tập của bạn.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100 flex items-center gap-2">
                <Flame size={18} className="text-orange-500" />
                <span className="font-bold text-orange-700">{analytics.streak} ngày</span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 flex items-center gap-2">
                <Zap size={18} className="text-blue-600" />
                <span className="font-bold text-blue-700">{analytics.xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="space-y-6">
          
          {/* LEVEL PROGRESS (Đổi sang tông Xanh dương) */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg"><Star size={20} fill="currentColor" /></div>
                <div><span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cấp độ</span><h3 className="text-lg font-black text-slate-800 leading-none">Level {analytics.level}</h3></div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400">Lv.{analytics.level + 1}</span>
                <p className="text-sm font-black text-blue-600">{analytics.xpIntoLevel}/{analytics.xpRequiredForLevel} XP</p>
              </div>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${analytics.levelProgressPercent}%` }} className="h-full bg-gradient-to-r from-blue-600 to-cyan-400" />
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Activity} label="Độ chính xác" value={`${analytics.accuracy}%`} sub={analytics.trend > 0 ? <TrendingUp size={16} className="text-emerald-500" /> : <TrendingDown size={16} className="text-rose-500" />} color={C.green} bg="#ECFDF5" />
            <StatCard icon={Trophy} label="Best Score" value={analytics.bestScore} color={C.yellow} bg="#FFFBEB" />
            <StatCard icon={BarChart2} label="Trung bình" value={analytics.averageScore} color={C.accent} bg="#EFF6FF" />
            <StatCard icon={BookOpen} label="Bài đã làm" value={analytics.totalAttempts} color={C.blue} bg="#EFF6FF" />
          </div>

          {/* ✅ Tỷ lệ chia Lưới mới (7:5) giúp cột Lịch sử rộng rãi hơn */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* CHART */}
            <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <div><h3 className="text-xl font-black text-slate-900">Tiến độ</h3><p className="text-sm text-slate-500 font-medium">Xu hướng điểm số</p></div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl text-[11px] font-bold text-slate-500 border border-slate-100"><div className="w-2 h-2 rounded-full bg-blue-600" />Điểm TB ngày</div>
              </div>
              <div className="h-[300px] w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.accent} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dy={10} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="avg" stroke={C.accent} strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" dot={{ r: 4, fill: '#FFF', stroke: C.accent, strokeWidth: 2 }} activeDot={{ r: 7, fill: C.accent, stroke: '#FFF', strokeWidth: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* HISTORY */}
            <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-slate-800">Lịch sử</h3>
                <span className="text-[10px] font-black px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">{progress.length}</span>
              </div>
              
              {/* TABS Đã đổi màu xanh */}
              <div className="flex gap-2 mb-4 bg-slate-50 p-1 rounded-2xl">
                {['all', 'good', 'bad'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 text-[11px] font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>
                    {tab === 'all' ? 'Tất cả' : tab === 'good' ? '≥ 80' : '< 50'}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto max-h-[360px] pr-2 space-y-1 custom-scrollbar">
                {filteredHistory.length > 0 ? filteredHistory.map((item, i) => (
                  <HistoryItem 
                    key={item.id} 
                    item={item} 
                    index={i} 
                    examMap={examMap} 
                    onClick={handleHistoryClick} 
                  />
                )) : <div className="text-center py-12 text-slate-400 text-sm">Chưa có bài làm</div>}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Scrollbar Style cho mượt */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}
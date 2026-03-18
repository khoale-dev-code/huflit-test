import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Trophy, Activity, Flame, ChevronRight, Clock,
  TrendingUp, TrendingDown, BookOpen, Zap, BarChart2, Star, User, Target, FileText
} from 'lucide-react';
import { useUserProgress } from '../hooks/useUserProgress.js';
import { getAllExamMetadataAsync } from '../data/examData.js';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}

/* ── Custom chart tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white p-3 rounded-[16px] shadow-lg border-2 border-slate-200">
      <p className="text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-[20px] font-black text-[#1CB0F6]">{payload[0].value}</span>
        <span className="text-[12px] font-body font-bold text-slate-500">điểm</span>
      </div>
    </div>
  );
};

/* ── Stat Card — ĐÃ FIX LỖI UI (Chuyển sang xếp dọc) ── */
const StatCard = ({ icon: Icon, label, value, sub, colorClass, bgLightClass, borderClass }) => (
  <div className="relative bg-white rounded-[20px] md:rounded-[24px] p-5 md:p-6 border-2 border-slate-200 border-b-[4px] shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
    {/* Biểu tượng phụ (Trend/Star) ghim ở góc phải trên cùng */}
    <div className="absolute top-4 right-4">{sub}</div>

    <div className={`w-12 h-12 md:w-14 md:h-14 mb-3 md:mb-4 rounded-[14px] md:rounded-[16px] border-b-[3px] flex shrink-0 items-center justify-center shadow-sm ${bgLightClass} ${colorClass} ${borderClass}`}>
      <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
    </div>
    
    <p className="font-display text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 leading-none">{label}</p>
    <p className="font-display text-[24px] md:text-[30px] font-black text-slate-800 m-0 leading-none">{value}</p>
  </div>
);

/* ── History row ── */
const HistoryItem = ({ item, onClick, examMap }) => {
  const score = item.score;
  const isGood = score >= 80, isMid = score >= 50;
  
  // Theme logic
  const color = isGood ? 'text-[#58CC02]' : isMid ? 'text-[#FF9600]' : 'text-[#FF4B4B]';
  const bgCol = isGood ? 'bg-[#F0FAE8]' : isMid ? 'bg-[#FFFBEA]' : 'bg-[#FFF0F0]';
  const borderCol = isGood ? 'border-[#bcf096]' : isMid ? 'border-[#FFD8A8]' : 'border-[#ffc1c1]';

  const examTitle = examMap[item.exam_id || item.exam] || 'Bài tập rèn luyện';
  const targetDate = item.created_at || item.completedAt || item.timestamp;
  const partLabel = (!item.part || item.part === 'full-exam') ? 'Full' : `P${String(item.part).replace('part', '')}`;

  return (
    <button
      onClick={() => onClick(item)}
      className="w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 mb-3 bg-white border-2 border-slate-200 border-b-[4px] rounded-[16px] md:rounded-[20px] cursor-pointer text-left transition-all hover:-translate-y-0.5 hover:border-[#1CB0F6] active:translate-y-[2px] active:border-b-2 outline-none group"
    >
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[12px] md:rounded-[14px] border-b-[3px] shrink-0 flex items-center justify-center font-display font-black text-[14px] md:text-[16px] shadow-sm ${bgCol} ${color} ${borderCol}`}>
        {score}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        {/* ĐÃ FIX: Cho phép chữ rớt xuống 2 dòng thay vì bị cắt ngang */}
        <p className="font-display text-[14px] md:text-[16px] font-bold text-slate-800 m-0 line-clamp-2 leading-snug group-hover:text-[#1CB0F6] transition-colors">
          {examTitle}
        </p>
        <div className="flex items-center gap-2 mt-1.5 md:mt-2">
          <span className="flex items-center gap-1 text-[10px] md:text-[11px] font-body font-bold text-slate-400">
            <Clock size={12} strokeWidth={2.5} />
            {targetDate ? new Date(targetDate).toLocaleDateString('vi-VN') : 'Gần đây'}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
          <span className="text-[10px] md:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest">{partLabel}</span>
        </div>
      </div>

      <div className="w-8 h-8 rounded-[10px] bg-slate-50 border-2 border-slate-100 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-[#1CB0F6] group-hover:bg-[#EAF6FE] group-hover:border-[#BAE3FB] transition-colors">
        <ChevronRight size={16} strokeWidth={3} />
      </div>
    </button>
  );
};

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
export default function DetailedDashboard() {
  const navigate = useNavigate();
  const { currentUser, progress, analytics, chartData, loading, isLoaded } = useUserProgress();

  const [examMap, setExamMap] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const prevLevel = usePrevious(analytics.level);

  useEffect(() => {
    if (prevLevel !== undefined && analytics.level > prevLevel) setShowLevelUp(true);
  }, [analytics.level, prevLevel]);

  useEffect(() => {
    if (showLevelUp) {
      const t = setTimeout(() => setShowLevelUp(false), 4000);
      return () => clearTimeout(t);
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
    if (activeTab === 'bad')  return progress.filter(p => p.score < 50);
    return progress;
  }, [progress, activeTab]);

  const handleHistoryClick = useCallback((item) => {
    navigate(`/history/${item.id}`, { state: { progressItem: item }, replace: false });
  }, [navigate]);

  /* ── Loading ── */
  if (!isLoaded || loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA] flex-col gap-3">
      <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <p className="font-display font-bold text-slate-500 text-[14px]">Đang tải dữ liệu...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans pb-16 selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>

      {/* ── LEVEL UP TOAST ── */}
      <AnimatePresence>
        {showLevelUp && (
          <Motion.div
            initial={{ opacity: 0, y: -32, scale: 0.92, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.92, y: -20, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="fixed top-20 left-1/2 z-50 flex items-center gap-3 p-3 md:p-4 bg-white rounded-[20px] border-2 border-[#FFC200] border-b-[6px] shadow-xl max-w-[90vw] w-max"
          >
            <div className="w-12 h-12 bg-[#FFFBEA] rounded-[14px] flex items-center justify-center text-[26px] border-b-[3px] border-[#FFD8A8]">🎉</div>
            <div className="pr-2">
              <p className="font-display text-[16px] md:text-[18px] font-black text-slate-800 m-0 leading-none">Tuyệt vời! Thăng Cấp!</p>
              <p className="font-body text-[13px] md:text-[14px] font-bold text-slate-500 mt-1">
                Bạn vừa đạt <strong className="text-[#FF9600]">Level {analytics.level}</strong>
              </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <div className="bg-white sticky top-0 z-30 border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 md:py-5 flex items-center justify-between flex-wrap gap-4">
          
          {/* User Info */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] md:rounded-[18px] bg-slate-100 border-2 border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
              {currentUser?.photoURL
                ? <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                : <User size={24} strokeWidth={2.5} className="text-slate-400" />}
            </div>
            <div className="pt-0.5">
              <h1 className="font-display text-[20px] md:text-[24px] font-black text-slate-800 m-0 leading-tight">
                Chào {currentUser?.name?.split(' ').pop() || 'bạn'}! 👋
              </h1>
              <p className="font-body text-[12px] md:text-[14px] font-bold text-slate-500 mt-0.5">Sẵn sàng phá kỷ lục hôm nay chưa?</p>
            </div>
          </div>

          {/* Streak + XP pills */}
          <div className="flex gap-2.5 md:gap-3">
            <div className="flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-[12px] md:rounded-[14px] bg-[#FFF4E6] border-2 border-[#FEDDAD] border-b-[3px] shadow-sm">
              <Flame size={18} className="text-[#FF9600]" strokeWidth={2.5} fill="#FF9600" />
              <span className="font-display text-[14px] md:text-[15px] font-black text-[#FF9600] mt-0.5">{analytics.streak} chuỗi</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-[12px] md:rounded-[14px] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[3px] shadow-sm">
              <Zap size={18} className="text-[#1CB0F6]" strokeWidth={2.5} fill="#1CB0F6" />
              <span className="font-display text-[14px] md:text-[15px] font-black text-[#1CB0F6] mt-0.5">{analytics.xp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-6 md:pt-8 space-y-5 md:space-y-8">

        {/* LEVEL BAR (BIG BANNER) */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 border-2 border-slate-200 border-b-[6px] shadow-sm flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[16px] md:rounded-[20px] bg-[#FFFBEA] border-2 border-[#FFD8A8] border-b-[4px] flex items-center justify-center shadow-sm">
              <Star className="w-8 h-8 md:w-10 md:h-10 text-[#FFC200]" fill="#FFC200" strokeWidth={1.5} />
            </div>
            <div className="pt-1">
              <p className="font-display text-[11px] md:text-[13px] font-black text-slate-400 uppercase tracking-widest m-0 leading-none">Cấp độ hiện tại</p>
              <p className="font-display text-[32px] md:text-[40px] font-black text-slate-800 m-0 leading-none mt-2">Level {analytics.level}</p>
            </div>
          </div>

          <div className="flex-1 w-full mt-2 md:mt-0">
            <div className="flex justify-between items-end mb-3">
              <span className="font-display text-[12px] md:text-[14px] font-bold text-slate-500 uppercase tracking-widest">Tới Level {analytics.level + 1}</span>
              <span className="font-display text-[16px] md:text-[20px] font-black text-[#FF9600]">
                {analytics.xpIntoLevel} <span className="text-slate-400 font-bold text-[13px] md:text-[15px]">/ {analytics.xpRequiredForLevel} XP</span>
              </span>
            </div>
            <div className="h-6 md:h-7 bg-slate-100 border-2 border-slate-200 rounded-full overflow-hidden shadow-inner p-[3px]">
              <Motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analytics.levelProgressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut', type: "spring", bounce: 0.2 }}
                className="h-full bg-gradient-to-r from-[#FFC200] to-[#FF9600] rounded-full relative"
              >
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/30 rounded-full" />
              </Motion.div>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard icon={Target}    label="Chính xác"  value={`${analytics.accuracy}%`}   colorClass="text-[#58CC02]" bgLightClass="bg-[#F0FAE8]" borderClass="border-[#bcf096]"
            sub={analytics.trend > 0 ? <TrendingUp size={20} strokeWidth={3} className="text-[#58CC02]" /> : <TrendingDown size={20} strokeWidth={3} className="text-[#FF4B4B]" />} />
          <StatCard icon={Trophy}    label="Cao nhất"   value={analytics.bestScore}        colorClass="text-[#FF9600]" bgLightClass="bg-[#FFFBEA]" borderClass="border-[#FFD8A8]"
            sub={<Star size={20} className="text-[#FFC200]" fill="#FFC200" />} />
          <StatCard icon={BarChart2} label="Trung bình" value={analytics.averageScore}     colorClass="text-[#1CB0F6]" bgLightClass="bg-[#EAF6FE]" borderClass="border-[#BAE3FB]"
            sub={<Activity size={20} strokeWidth={3} className="text-[#1CB0F6]" />} />
          <StatCard icon={BookOpen}  label="Hoàn thành" value={analytics.totalAttempts}    colorClass="text-[#CE82FF]" bgLightClass="bg-[#F8EEFF]" borderClass="border-[#eec9ff]"
            sub={<FileText size={20} strokeWidth={3} className="text-[#CE82FF]" />} />
        </div>

        {/* CHART + HISTORY (ĐÃ ĐỔI THÀNH 50/50 GRID-COLS-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 items-start">

          {/* Chart Section */}
          <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-sm p-5 md:p-7">
            <div className="mb-5 md:mb-8">
              <h3 className="font-display text-[20px] md:text-[24px] font-black text-slate-800 m-0 leading-none">Biểu đồ học tập</h3>
              <p className="font-body text-[13px] md:text-[15px] font-bold text-slate-500 mt-2">Xu hướng điểm số qua các bài test</p>
            </div>
            <div className="h-[240px] md:h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1CB0F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1CB0F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700, fontFamily: '"Nunito", sans-serif' }} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700, fontFamily: '"Nunito", sans-serif' }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="avg" stroke="#1CB0F6" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)"
                    dot={{ r: 5, fill: '#fff', stroke: '#1CB0F6', strokeWidth: 3 }}
                    activeDot={{ r: 8, fill: '#1CB0F6', stroke: '#fff', strokeWidth: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* History Section */}
          <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-sm p-5 md:p-6 flex flex-col h-[450px] md:h-[480px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-[20px] md:text-[24px] font-black text-slate-800 m-0 leading-none">Lịch sử bài làm</h3>
              <span className="font-display text-[11px] md:text-[12px] font-black text-slate-500 bg-slate-100 border-2 border-slate-200 px-3 py-1.5 rounded-[8px] uppercase tracking-widest shrink-0">
                {progress.length} BÀI
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1.5 bg-slate-100 border-2 border-slate-200 rounded-[14px] mb-5 shrink-0">
              {[
                { id: 'all',  label: 'Tất cả' },
                { id: 'good', label: 'Tốt ≥80' },
                { id: 'bad',  label: 'Cần cố' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 rounded-[10px] font-display font-bold text-[13px] md:text-[14px] transition-all outline-none border-2 ${
                    activeTab === tab.id 
                      ? 'bg-white text-[#1CB0F6] border-slate-200 border-b-[3px] shadow-sm -translate-y-px' 
                      : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-200/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence mode="wait">
                <Motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filteredHistory.length > 0
                    ? filteredHistory.map(item => (
                      <HistoryItem key={item.id} item={item} examMap={examMap} onClick={handleHistoryClick} />
                    ))
                    : (
                      <div className="pt-12 flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-slate-50 border-2 border-slate-200 border-b-[4px] rounded-[16px] flex items-center justify-center shadow-sm">
                          <BookOpen size={28} strokeWidth={2.5} className="text-slate-400" />
                        </div>
                        <p className="font-body text-[15px] font-bold text-slate-400 m-0 mt-1">Chưa có bài tập nào</p>
                      </div>
                    )}
                </Motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
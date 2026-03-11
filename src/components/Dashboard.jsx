import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

/* ── Google Fonts: add to index.html ──
   <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800;900&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet">
── */

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}

/* ── Design tokens — compact & refined ── */
const G = {
  bg: '#F5F7FA',
  blue: '#1CB0F6', blueDark: '#18A0E0', blueBg: '#EAF6FE',
  green: '#58CC02', greenDark: '#46A302', greenBg: '#F0FAE8',
  yellow: '#FFC200', yellowDark: '#D9A600', yellowBg: '#FFFBEA',
  purple: '#CE82FF', purpleBg: '#F8EEFF',
  red: '#FF4B4B', orange: '#FF9600',
  n50: '#F8FAFC', n100: '#F1F5F9', n200: '#E2E8F0',
  n400: '#94A3B8', n500: '#64748B', n600: '#475569', n800: '#1E293B',
};
const F = { display: '"Baloo 2", "Nunito", sans-serif', body: '"Nunito", "Baloo 2", sans-serif' };

/* ── Custom chart tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      fontFamily: F.body, background: '#fff', padding: '8px 12px',
      borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.09)',
      border: `1px solid ${G.n200}`,
    }}>
      <p style={{ fontSize: 10, fontWeight: 800, color: G.n400, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span style={{ fontFamily: F.display, fontSize: 17, fontWeight: 900, color: G.blue }}>{payload[0].value}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: G.n500 }}>điểm</span>
      </div>
    </div>
  );
};

/* ── Stat Card — compact 2-col layout ── */
const StatCard = ({ icon: Icon, label, value, sub, mainColor, bgLight }) => (
  <div style={{
    background: '#fff', borderRadius: 16, padding: '12px 14px',
    border: `1.5px solid ${G.n200}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    display: 'flex', alignItems: 'center', gap: 12,
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      backgroundColor: bgLight, color: mainColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={16} strokeWidth={2.5} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ fontFamily: F.display, fontSize: 18, fontWeight: 900, color: G.n800, margin: 0, lineHeight: 1 }}>{value}</p>
      <p style={{ fontFamily: F.body, fontSize: 10, fontWeight: 800, color: G.n400, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '3px 0 0' }}>{label}</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{sub}</div>
  </div>
);

/* ── History row ── */
const HistoryItem = ({ item, onClick, examMap }) => {
  const score = item.score;
  const isGood = score >= 80, isMid = score >= 50;
  const color  = isGood ? G.green  : isMid ? G.yellow  : G.red;
  const bgCol  = isGood ? G.greenBg : isMid ? G.yellowBg : '#FFF0F0';

  const examTitle = examMap[item.exam_id || item.exam] || 'Bài tập rèn luyện';
  const targetDate = item.created_at || item.completedAt || item.timestamp;
  const partLabel = (!item.part || item.part === 'full-exam') ? 'Full' : `P${String(item.part).replace('part', '')}`;

  return (
    <button
      onClick={() => onClick(item)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 10px', marginBottom: 4,
        background: '#fff', border: `1.5px solid ${G.n200}`,
        borderRadius: 12, cursor: 'pointer', textAlign: 'left',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        fontFamily: F.body, outline: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = G.blue; e.currentTarget.style.boxShadow = `0 2px 10px rgba(28,176,246,0.1)`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = G.n200; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Score badge */}
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: F.display, fontWeight: 900, fontSize: 13, color,
        background: bgCol,
      }}>
        {score}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: F.body, fontSize: 12, fontWeight: 800, color: G.n800,
          margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.3,
        }}>
          {examTitle}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 10, fontWeight: 700, color: G.n400 }}>
            <Clock size={10} strokeWidth={2.5} />
            {targetDate ? new Date(targetDate).toLocaleDateString('vi-VN') : 'Gần đây'}
          </span>
          <span style={{ width: 2, height: 2, borderRadius: '50%', background: G.n300, flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 800, color: G.n500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{partLabel}</span>
        </div>
      </div>

      {/* Arrow */}
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: G.n100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: G.n400 }}>
        <ChevronRight size={12} strokeWidth={2.5} />
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: G.bg }}>
      <div style={{ width: 32, height: 32, border: `4px solid ${G.n200}`, borderTop: `4px solid ${G.blue}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: G.bg, fontFamily: F.body, paddingBottom: 64 }}>

      {/* ── LEVEL UP TOAST ── */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, y: -32, scale: 0.92, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.92, y: -20, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{
              position: 'fixed', top: 72, left: '50%', zIndex: 100,
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 18px', borderRadius: 16,
              background: '#fff', border: `1.5px solid #FDE68A`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              maxWidth: '88vw',
            }}
          >
            <div style={{ width: 40, height: 40, background: G.yellowBg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎉</div>
            <div>
              <p style={{ fontFamily: F.display, fontSize: 14, fontWeight: 900, color: G.n800, margin: 0 }}>Tuyệt vời! Thăng Cấp!</p>
              <p style={{ fontFamily: F.body, fontSize: 12, fontWeight: 700, color: G.n500, margin: '1px 0 0' }}>
                Bạn vừa đạt <strong style={{ color: G.yellow }}>Level {analytics.level}</strong>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <div style={{ background: '#fff', borderBottom: `1.5px solid ${G.n200}`, padding: '14px 0' }}>
        <div style={{
          maxWidth: 960, margin: '0 auto', padding: '0 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 10,
        }}>
          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: G.n100, border: `1.5px solid ${G.n200}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', flexShrink: 0,
            }}>
              {currentUser?.photoURL
                ? <img src={currentUser.photoURL} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <User size={18} strokeWidth={2} color={G.n400} />}
            </div>
            <div>
              <h1 style={{ fontFamily: F.display, fontSize: 16, fontWeight: 900, color: G.n800, margin: 0, lineHeight: 1.2 }}>
                Chào {currentUser?.name?.split(' ').pop() || 'bạn'}! 👋
              </h1>
              <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, color: G.n500, margin: '2px 0 0' }}>Sẵn sàng phá kỷ lục hôm nay chưa?</p>
            </div>
          </div>

          {/* Streak + XP pills */}
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { icon: <Flame size={14} color={G.orange} strokeWidth={2} />, label: `${analytics.streak} chuỗi`, bg: '#FFF4E6', border: '#FEDDAD', color: G.orange },
              { icon: <Zap  size={14} color={G.blue}   strokeWidth={2} />, label: `${analytics.xp.toLocaleString()} XP`, bg: G.blueBg, border: '#BAE3FB', color: G.blue },
            ].map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 10px', borderRadius: 10,
                background: p.bg, border: `1.5px solid ${p.border}`,
              }}>
                {p.icon}
                <span style={{ fontFamily: F.display, fontSize: 12, fontWeight: 800, color: p.color }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* LEVEL BAR */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: '12px 16px',
            border: `1.5px solid ${G.n200}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: G.yellowBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={18} color={G.yellow} fill={G.yellow} strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ fontFamily: F.body, fontSize: 10, fontWeight: 800, color: G.n400, textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Level</p>
                <p style={{ fontFamily: F.display, fontSize: 20, fontWeight: 900, color: G.n800, margin: 0, lineHeight: 1 }}>{analytics.level}</p>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, color: G.n500 }}>Tới Level {analytics.level + 1}</span>
                <span style={{ fontFamily: F.display, fontSize: 12, fontWeight: 900, color: G.yellow }}>
                  {analytics.xpIntoLevel} <span style={{ color: G.n400, fontWeight: 700 }}>/ {analytics.xpRequiredForLevel} XP</span>
                </span>
              </div>
              <div style={{ height: 8, background: G.n100, borderRadius: 99, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analytics.levelProgressPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', background: `linear-gradient(90deg, ${G.yellow}, ${G.orange})`, borderRadius: 99 }}
                />
              </div>
            </div>
          </div>

          {/* STATS GRID — 2 rows × 2 cols on mobile, 4 cols on wide */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            <StatCard icon={Target}    label="Chính xác"  value={`${analytics.accuracy}%`}   mainColor={G.green}  bgLight={G.greenBg}
              sub={analytics.trend > 0 ? <TrendingUp size={13} strokeWidth={2.5} color={G.green} /> : <TrendingDown size={13} strokeWidth={2.5} color={G.red} />} />
            <StatCard icon={Trophy}    label="Cao nhất"   value={analytics.bestScore}         mainColor={G.yellow} bgLight={G.yellowBg}
              sub={<Star size={13} color={G.yellow} fill={G.yellow} />} />
            <StatCard icon={BarChart2} label="Trung bình" value={analytics.averageScore}      mainColor={G.blue}   bgLight={G.blueBg}
              sub={<Activity size={13} strokeWidth={2.5} color={G.blue} />} />
            <StatCard icon={BookOpen}  label="Hoàn thành" value={analytics.totalAttempts}     mainColor={G.purple} bgLight={G.purpleBg}
              sub={<FileText size={13} strokeWidth={2.5} color={G.purple} />} />
          </div>

          {/* CHART + HISTORY */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, alignItems: 'start' }}>

            {/* Chart */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: '14px 14px',
              border: `1.5px solid ${G.n200}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{ marginBottom: 12 }}>
                <h3 style={{ fontFamily: F.display, fontSize: 14, fontWeight: 900, color: G.n800, margin: 0 }}>Biểu đồ học tập</h3>
                <p style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, color: G.n400, margin: '3px 0 0' }}>Xu hướng điểm số qua các bài test</p>
              </div>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 6, right: 6, left: -28, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={G.blue} stopOpacity={0.22} />
                        <stop offset="95%" stopColor={G.blue} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={G.n100} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false}
                      tick={{ fill: G.n400, fontSize: 10, fontWeight: 700, fontFamily: F.body }} dy={6} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false}
                      tick={{ fill: G.n400, fontSize: 10, fontWeight: 700, fontFamily: F.body }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: G.n200, strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Area type="monotone" dataKey="avg" stroke={G.blue} strokeWidth={2.5}
                      fillOpacity={1} fill="url(#colorScore)"
                      dot={{ r: 3.5, fill: '#fff', stroke: G.blue, strokeWidth: 2 }}
                      activeDot={{ r: 5, fill: G.blue, stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* History */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: '14px 14px',
              border: `1.5px solid ${G.n200}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column', height: 360,
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <h3 style={{ fontFamily: F.display, fontSize: 14, fontWeight: 900, color: G.n800, margin: 0 }}>Lịch sử bài làm</h3>
                <span style={{
                  fontFamily: F.body, fontSize: 10, fontWeight: 800, color: G.n500,
                  background: G.n100, border: `1px solid ${G.n200}`,
                  padding: '2px 7px', borderRadius: 7,
                }}>
                  {progress.length} BÀI
                </span>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 3, padding: 3, background: G.n100, borderRadius: 11, marginBottom: 10 }}>
                {[
                  { id: 'all',  label: 'Tất cả' },
                  { id: 'good', label: 'Tốt ≥80' },
                  { id: 'bad',  label: 'Cần cố' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1, padding: '6px 4px', border: 'none', borderRadius: 8, cursor: 'pointer',
                      fontFamily: F.body, fontSize: 11, fontWeight: 800,
                      background: activeTab === tab.id ? '#fff' : 'transparent',
                      color: activeTab === tab.id ? G.blue : G.n500,
                      boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.07)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* List */}
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: 2 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {filteredHistory.length > 0
                      ? filteredHistory.map(item => (
                        <HistoryItem key={item.id} item={item} examMap={examMap} onClick={handleHistoryClick} />
                      ))
                      : (
                        <div style={{ paddingTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 40, height: 40, background: G.n50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BookOpen size={20} strokeWidth={2} color={G.n200} />
                          </div>
                          <p style={{ fontFamily: F.body, fontSize: 12, fontWeight: 700, color: G.n400, margin: 0 }}>Chưa có bài tập nào</p>
                        </div>
                      )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${G.n200}; border-radius: 8px; }
        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
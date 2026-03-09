import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine,
} from 'recharts';
import {
  Trophy, Target, Activity, Flame, ChevronRight, Clock,
  AlertCircle, TrendingUp, TrendingDown, Minus,
  BookOpen, Zap, BarChart2, Star, Lock, Unlock,
  ArrowUp,
} from 'lucide-react';
import { useUserProgress } from '../hooks/useUserProgress.js';

// Thêm Import hàm fetch exam từ data layer
import { getAllExamMetadataAsync } from '../data/examData.js';

// ─── useContainerSize ─────────────────────────────────────────────────────────
function useContainerSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.offsetWidth > 0) {
      setSize({ width: el.offsetWidth, height: el.offsetHeight });
    }
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0) setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
}

// ─── usePrevious ──────────────────────────────────────────────────────────────
function usePrevious(value) {
  const ref = useRef(undefined);
  useEffect(() => { ref.current = value; });
  return ref.current;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg:          '#F0F2F8',
  surface:     '#FFFFFF',
  border:      '#E8ECF4',
  text:        '#1C2033',
  muted:       '#7B82A0',
  accent:      '#4361EE',
  accentLight: '#EEF1FD',
  green:       '#10B981',
  greenLight:  '#D1FAE5',
  yellow:      '#F59E0B',
  yellowLight: '#FEF3C7',
  red:         '#EF4444',
  redLight:    '#FEE2E2',
  purple:      '#8B5CF6',
  purpleLight: '#EDE9FE',
};

// ─── Shared animation variants ────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] },
});

// ─── StatCard ─────────────────────────────────────────────────────────────────
const StatCard = React.memo(({ icon: Icon, label, value, sub, color, bg, delay = 0 }) => (
  <motion.div
    {...fadeUp(delay)}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className="bg-white rounded-2xl p-5 border flex flex-col gap-3"
    style={{ borderColor: C.border }}
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
      <Icon size={18} style={{ color }} />
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: C.muted }}>
        {label}
      </p>
      <p className="text-2xl font-black" style={{ color: C.text }}>{value}</p>
      {sub && <div className="mt-1">{sub}</div>}
    </div>
  </motion.div>
));
StatCard.displayName = 'StatCard';

// ─── TrendBadge ───────────────────────────────────────────────────────────────
const TrendBadge = React.memo(({ value }) => {
  if (!value || value === 0) return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ background: '#F1F3F4', color: C.muted }}
    >
      <Minus size={10} /> Ổn định
    </span>
  );
  const up = value > 0;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ background: up ? C.greenLight : C.redLight, color: up ? C.green : C.red }}
    >
      {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {up ? '+' : ''}{value.toFixed(1)}
    </span>
  );
});
TrendBadge.displayName = 'TrendBadge';

// ─── CustomTooltip ────────────────────────────────────────────────────────────
const CustomTooltip = React.memo(({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const score = payload[0].value;
  const color = score >= 80 ? C.green : score >= 50 ? C.accent : C.red;
  return (
    <div
      className="px-3 py-2 rounded-xl border shadow-lg text-sm"
      style={{ background: C.surface, borderColor: C.border }}
    >
      <p className="font-semibold mb-0.5" style={{ color: C.muted }}>{label}</p>
      <p className="font-black text-base" style={{ color }}>{score} điểm</p>
    </div>
  );
});
CustomTooltip.displayName = 'CustomTooltip';

// ─── HistoryItem ──────────────────────────────────────────────────────────────
const HistoryItem = React.memo(({ item, index, onClick, examMap }) => {
  const { score } = item;
  const isGood     = score >= 80;
  const isMid      = score >= 50;
  const scoreColor = isGood ? C.green  : isMid ? C.yellow  : C.red;
  const scoreBg    = isGood ? C.greenLight : isMid ? C.yellowLight : C.redLight;

  const handleClick = useCallback(() => onClick(item), [item, onClick]);

  const dateStr = useMemo(() => {
    // Check Date object first
    if (item.completedAt instanceof Date && !isNaN(item.completedAt)) {
      return item.completedAt.toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: '2-digit',
      });
    }
    // Check timestamp number
    if (item.timestamp) {
      return new Date(item.timestamp).toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: '2-digit',
      });
    }
    return 'N/A';
  }, [item.completedAt, item.timestamp]);

  // Lấy Tên Đề Thi từ examMap, nếu không có thì fallback dùng lại ID (item.exam)
  const examTitle = examMap[item.exam] || item.exam;
  
  // Format phần thi cho đẹp
  const partDisplay = item.part === 'full-exam' ? 'Full Test' : `Part ${item.part?.replace('part', '') || ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      onClick={handleClick}
      className="group flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-slate-50 active:scale-[0.98] transition-all"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
          style={{ background: scoreBg, color: scoreColor }}
        >
          {score}
        </div>
        <div className="min-w-0 pr-2">
          <p className="font-bold text-sm truncate" style={{ color: C.text }}>
            {examTitle}
            {item.isPending && (
              <span
                className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: C.yellowLight, color: C.yellow }}
              >
                Đang lưu…
              </span>
            )}
          </p>
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: C.muted }}>
            <Clock size={10} />
            {dateStr}
            <span>·</span>
            <span className="capitalize">{partDisplay}</span>
          </div>
        </div>
      </div>
      <ChevronRight
        size={14}
        className="shrink-0 transition-transform group-hover:translate-x-1"
        style={{ color: C.muted }}
      />
    </motion.div>
  );
});
HistoryItem.displayName = 'HistoryItem';

// ─── Spinner ──────────────────────────────────────────────────────────────────
const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
      className="w-9 h-9 rounded-full border-[3px] border-t-transparent"
      style={{ borderColor: `${C.accent}40`, borderTopColor: C.accent }}
    />
  </div>
);

// ─── LevelUpToast ─────────────────────────────────────────────────────────────
const LevelUpToast = React.memo(({ level, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.9 }}
      transition={{ type: 'spring', damping: 18, stiffness: 220 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border"
      style={{
        background: 'linear-gradient(135deg, #4361EE 0%, #7B3FF5 100%)',
        borderColor: 'rgba(255,255,255,0.15)',
      }}
    >
      <motion.div
        animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.3, 1.1, 1.2, 1] }}
        transition={{ duration: 0.7 }}
        className="text-2xl"
      >
        🎉
      </motion.div>
      <div>
        <p className="font-black text-white text-sm leading-tight">Lên cấp!</p>
        <p className="text-white/80 text-xs font-semibold">Bạn đã đạt Level {level}</p>
      </div>
      <div
        className="flex items-center gap-1 font-black text-white text-sm px-2.5 py-1 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.18)' }}
      >
        <Star size={12} /> Lv.{level}
      </div>
    </motion.div>
  );
});
LevelUpToast.displayName = 'LevelUpToast';

// ─── LevelProgressBar ─────────────────────────────────────────────────────────
const LevelProgressBar = React.memo(({
  level, xpIntoLevel, xpRequiredForLevel, levelProgressPercent, nextUnlockLevel,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.1 }}
    className="bg-white rounded-2xl p-5 border"
    style={{ borderColor: C.border }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-sm font-black"
          style={{ background: C.purpleLight, color: C.purple }}
        >
          <Star size={13} /> Lv.{level}
        </div>
        <span className="text-sm font-bold" style={{ color: C.text }}>Tiến độ cấp độ</span>
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color: C.muted }}>
        {xpIntoLevel} / {xpRequiredForLevel} XP
      </span>
    </div>

    <div className="h-3 rounded-full overflow-hidden relative" style={{ background: C.bg }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${levelProgressPercent}%` }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${C.purple}, #A78BFA)` }}
      />
      {levelProgressPercent > 10 && (
        <motion.div
          animate={{ x: ['0%', '200%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 1 }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: '20%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
        />
      )}
    </div>

    <div className="flex justify-between mt-1.5">
      <p className="text-xs" style={{ color: C.muted }}>
        {levelProgressPercent}% đến Level {level + 1}
      </p>
      {nextUnlockLevel && (
        <p className="text-xs font-semibold flex items-center gap-1" style={{ color: C.accent }}>
          <ArrowUp size={10} />
          Lv.{nextUnlockLevel} mở thêm exam
        </p>
      )}
    </div>
  </motion.div>
));
LevelProgressBar.displayName = 'LevelProgressBar';

// ─── ExamUnlockPanel ──────────────────────────────────────────────────────────
const EXAM_TIERS = [
  { exams: [1, 2], unlockLevel: 1,  label: 'Cơ bản' },
  { exams: [3, 4], unlockLevel: 3,  label: 'Trung cấp' },
  { exams: [5, 6], unlockLevel: 6,  label: 'Nâng cao' },
  { exams: [7, 8], unlockLevel: 9,  label: 'Chuyên gia' },
  { exams: [9, 10], unlockLevel: 12, label: 'Bậc thầy' },
];

const ExamUnlockPanel = React.memo(({ unlockedExams, level }) => (
  <motion.section
    {...fadeUp(0.5)}
    className="bg-white rounded-2xl border p-5"
    style={{ borderColor: C.border }}
  >
    <h3 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.text }}>
      <Unlock size={14} style={{ color: C.accent }} /> Kho đề thi
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
      {EXAM_TIERS.map((tier) => {
        const isUnlocked = unlockedExams === Infinity || tier.exams[0] <= unlockedExams;
        const levelsNeeded = tier.unlockLevel - level;
        return (
          <div
            key={tier.label}
            className="rounded-xl p-3 border flex flex-col gap-2 transition-all"
            style={{
              borderColor: isUnlocked ? C.green : C.border,
              background: isUnlocked ? C.greenLight : C.bg,
              opacity: isUnlocked ? 1 : 0.7,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold" style={{ color: isUnlocked ? C.green : C.muted }}>
                {tier.label}
              </span>
              {isUnlocked
                ? <Unlock size={12} style={{ color: C.green }} />
                : <Lock size={12} style={{ color: C.muted }} />}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {tier.exams.map((e) => (
                <span
                  key={e}
                  className="text-xs font-black px-2 py-0.5 rounded-lg"
                  style={{
                    background: isUnlocked ? C.green : C.border,
                    color: isUnlocked ? '#fff' : C.muted,
                  }}
                >
                  Exam {e}
                </span>
              ))}
            </div>
            {!isUnlocked && (
              <p className="text-[10px] font-semibold flex items-center gap-1" style={{ color: C.muted }}>
                <Star size={9} />
                Cần Lv.{tier.unlockLevel}
                {levelsNeeded > 0 && ` (+${levelsNeeded})`}
              </p>
            )}
            {isUnlocked && (
              <p className="text-[10px] font-semibold" style={{ color: C.green }}>
                ✓ Đã mở khóa
              </p>
            )}
          </div>
        );
      })}
    </div>
  </motion.section>
));
ExamUnlockPanel.displayName = 'ExamUnlockPanel';

// ─── ScoreChart ───────────────────────────────────────────────────────────────
const CHART_HEIGHT = 208;

const ScoreChart = React.memo(({ chartData, averageScore, trend }) => {
  const [containerRef, { width }] = useContainerSize();

  return (
    <motion.section
      {...fadeUp(0.35)}
      className="lg:col-span-3 bg-white rounded-2xl border p-6"
      style={{ borderColor: C.border }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-black text-base" style={{ color: C.text }}>Xu hướng điểm số</h3>
          <p className="text-xs mt-0.5 font-medium" style={{ color: C.muted }}>
            {chartData.length > 0 ? `${chartData.length} ngày gần nhất` : 'Chưa có dữ liệu'}
          </p>
        </div>
        <TrendBadge value={trend} />
      </div>

      <div ref={containerRef} className="w-full" style={{ height: CHART_HEIGHT, minWidth: 0 }}>
        {chartData.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-2" style={{ color: C.muted }}>
            <AlertCircle size={28} />
            <p className="text-sm font-semibold">Chưa có dữ liệu</p>
            <p className="text-xs">Hoàn thành vài bài để xem xu hướng</p>
          </div>
        ) : width > 0 ? (
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <AreaChart
              width={width}
              height={CHART_HEIGHT}
              data={chartData}
              margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
            >
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={C.accent} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={C.accent} stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: C.muted, fontSize: 11, fontWeight: 600 }}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: C.muted, fontSize: 11 }}
                ticks={[0, 25, 50, 75, 100]}
              />
              {averageScore > 0 && (
                <ReferenceLine
                  y={averageScore}
                  stroke={C.accent}
                  strokeDasharray="4 4"
                  strokeOpacity={0.4}
                  label={{
                    value: `TB: ${averageScore}`,
                    fill: C.accent,
                    fontSize: 10,
                    fontWeight: 700,
                    position: 'insideTopRight',
                  }}
                />
              )}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: C.accent,
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                  strokeOpacity: 0.4,
                }}
              />
              <Area
                type="monotone"
                dataKey="avg"
                name="Điểm TB"
                stroke={C.accent}
                strokeWidth={2.5}
                fill="url(#scoreGrad)"
                dot={{ fill: C.surface, stroke: C.accent, strokeWidth: 2, r: 3 }}
                activeDot={{ fill: C.accent, stroke: C.surface, strokeWidth: 2, r: 5 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </motion.div>
        ) : null}
      </div>
    </motion.section>
  );
});
ScoreChart.displayName = 'ScoreChart';

// ─── HistoryPanel ─────────────────────────────────────────────────────────────
// THÊM LẠI MẢNG TABS BỊ THIẾU Ở ĐÂY
const TABS = [
  { key: 'all',  label: 'Tất cả' },
  { key: 'good', label: '≥ 80'   },
  { key: 'bad',  label: '< 50'   },
];

const HistoryPanel = React.memo(({ progress, onNavigate }) => {
  const [historyFilter, setHistoryFilter] = useState('all');
  const [examMap, setExamMap] = useState({});

  useEffect(() => {
    const fetchExams = async () => {
      const data = await getAllExamMetadataAsync();
      const map = {};
      data.forEach(ex => { map[ex.id] = ex.title; });
      setExamMap(map);
    };
    fetchExams();
  }, []);

  const filteredProgress = useMemo(() => {
    if (historyFilter === 'good') return progress.filter((p) => p.score >= 80);
    if (historyFilter === 'bad')  return progress.filter((p) => p.score <  50);
    return progress;
  }, [progress, historyFilter]);

  // Chuyển hướng sang trang lịch sử bài làm chi tiết
  const handleItemClick = useCallback((item) => {
    onNavigate(`/history/${item.id}`, { state: { progressItem: item } });
  }, [onNavigate]);

  return (
    <motion.section
      {...fadeUp(0.4)}
      className="lg:col-span-2 bg-white rounded-2xl border p-5 flex flex-col"
      style={{ borderColor: C.border }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-black text-base flex items-center gap-2" style={{ color: C.text }}>
          <Clock size={14} style={{ color: C.accent }} /> Lịch sử
        </h3>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-lg"
          style={{ background: C.accentLight, color: C.accent }}
        >
          {progress.length} bài
        </span>
      </div>

      <div className="flex gap-1.5 mb-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setHistoryFilter(tab.key)}
            className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
            style={{
              background: historyFilter === tab.key ? C.accent : C.bg,
              color:      historyFilter === tab.key ? '#fff'   : C.muted,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto max-h-[320px] space-y-0.5">
        {filteredProgress.length > 0
          ? filteredProgress.map((item, i) => (
              <HistoryItem
                key={item.id}
                item={item}
                index={i}
                examMap={examMap}
                onClick={handleItemClick}
              />
            ))
          : (
            <div
              className="flex flex-col items-center justify-center h-32 gap-2"
              style={{ color: C.muted }}
            >
              <BookOpen size={24} />
              <p className="text-sm font-semibold">Chưa có bài làm</p>
            </div>
          )}
      </div>
    </motion.section>
  );
});
HistoryPanel.displayName = 'HistoryPanel';

// ─── WeaknessPanel ────────────────────────────────────────────────────────────
const WeaknessPanel = React.memo(({ weaknesses }) => {
  if (!weaknesses?.length) return null;
  return (
    <motion.section
      {...fadeUp(0.45)}
      className="bg-white rounded-2xl border p-5"
      style={{ borderColor: C.border }}
    >
      <h3 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.text }}>
        <AlertCircle size={14} style={{ color: C.red }} /> Cần cải thiện
      </h3>
      <div className="space-y-3">
        {weaknesses.map((w, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs font-bold mb-1.5" style={{ color: C.muted }}>
              <span>{w.name}</span>
              <span style={{ color: C.red }}>{Math.round(w.accuracy)}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.bg }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${w.accuracy}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${C.red}, ${C.yellow})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
});
WeaknessPanel.displayName = 'WeaknessPanel';

// ─── Main component ───────────────────────────────────────────────────────────
export default function DetailedDashboard() {
  const navigate  = useNavigate();
  const { currentUser, progress, analytics, chartData, loading, isLoaded } = useUserProgress();
  const [showLevelUp, setShowLevelUp] = useState(false);

  const prevLevel = usePrevious(analytics.level);

  // Fire toast when level increases
  useEffect(() => {
    if (
      prevLevel !== undefined &&
      analytics.level > prevLevel
    ) {
      setShowLevelUp(true);
    }
  }, [analytics.level, prevLevel]);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Chào buổi sáng';
    if (h < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  }, []);

  const handleNavigate = useCallback((path, state = {}) => navigate(path, state), [navigate]);

  if (!isLoaded || loading) return <Spinner />;

  return (
    <div className="min-h-screen pb-28" style={{ background: C.bg, color: C.text }}>

      {/* ── Level-Up Toast ── */}
      <AnimatePresence>
        {showLevelUp && (
          <LevelUpToast
            level={analytics.level}
            onDone={() => setShowLevelUp(false)}
          />
        )}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-8 space-y-5">

        {/* ── HERO ── */}
        <motion.section
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2"
              style={{ borderColor: C.border, background: C.accentLight }}
            >
              {currentUser?.photoURL
                ? (
                  <img
                    src={currentUser.photoURL}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-xl font-black"
                    style={{ color: C.accent }}
                  >
                    {currentUser?.name?.charAt(0) ?? '?'}
                  </div>
                )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.muted }}>
                {greeting}
              </p>
              <h1 className="text-xl font-black leading-tight" style={{ color: C.text }}>
                {currentUser?.name?.split(' ').pop() ?? 'Học viên'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {[
              { icon: Star,  val: `Lv.${analytics.level}`,              bg: C.purpleLight, color: C.purple  },
              { icon: Flame, val: `${analytics.streak} ngày`,           bg: C.yellowLight, color: C.yellow  },
              { icon: Zap,   val: `${analytics.xp.toLocaleString()} XP`, bg: C.greenLight, color: C.green   },
            ].map(({ icon: Icon, val, bg, color }) => (
              <div
                key={val}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold"
                style={{ background: bg, color }}
              >
                <Icon size={13} /> {val}
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── LEVEL + DAILY GOAL ── */}
        <LevelProgressBar
          level={analytics.level}
          xpIntoLevel={analytics.xpIntoLevel}
          xpRequiredForLevel={analytics.xpRequiredForLevel}
          levelProgressPercent={analytics.levelProgressPercent}
          nextUnlockLevel={analytics.nextUnlockLevel}
        />

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon={Activity} label="Độ chính xác"    value={`${analytics.accuracy}%`}
            sub={<TrendBadge value={analytics.trend} />}
            color={C.green}  bg={C.greenLight}  delay={0.15}
          />
          <StatCard
            icon={Trophy}   label="Điểm cao nhất"  value={analytics.bestScore}
            sub={<span className="text-xs" style={{ color: C.muted }}>điểm</span>}
            color={C.yellow} bg={C.yellowLight} delay={0.20}
          />
          <StatCard
            icon={BarChart2} label="Điểm trung bình" value={analytics.averageScore}
            sub={<span className="text-xs" style={{ color: C.muted }}>điểm</span>}
            color={C.accent} bg={C.accentLight} delay={0.25}
          />
          <StatCard
            icon={BookOpen}  label="Tổng bài làm"   value={analytics.totalAttempts}
            sub={<span className="text-xs" style={{ color: C.muted }}>bài tập</span>}
            color={C.purple} bg={C.purpleLight}  delay={0.30}
          />
        </div>

        {/* ── CHART + HISTORY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <ScoreChart
            chartData={chartData}
            averageScore={analytics.averageScore}
            trend={analytics.trend}
          />
          <HistoryPanel progress={progress} onNavigate={handleNavigate} />
        </div>

        {/* ── EXAM UNLOCK PANEL ── */}
        <ExamUnlockPanel
          unlockedExams={analytics.unlockedExams}
          level={analytics.level}
        />

        {/* ── WEAKNESSES ── */}
        <WeaknessPanel weaknesses={analytics.weaknesses} />

      </main>
    </div>
  );
}
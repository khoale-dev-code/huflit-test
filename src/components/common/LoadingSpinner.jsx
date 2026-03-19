/**
 * LoadingSpinner — Màn hình chờ Gamification 3D
 * Phong cách: Duolingo-inspired, tactile depth, animated vocab flashcard
 * React 21 — useEffect cho intervals là đúng use-case, giữ nguyên
 */

import { memo, useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Zap, Target, BookOpen, Rocket, Star } from 'lucide-react';

/* ─── Dữ liệu ───────────────────────────────────────────────────── */
const VOCAB_PAIRS = [
  { word: 'eloquent',   hint: 'hùng hồn · lưu loát', Icon: Sparkles, bg: '#FFF8EA', border: '#FFD8A8', color: '#FF9600' },
  { word: 'persevere',  hint: 'kiên trì · bền bỉ',   Icon: Target,   bg: '#EAF6FE', border: '#BAE3FB', color: '#1CB0F6' },
  { word: 'ephemeral',  hint: 'thoáng qua · ngắn ngủi', Icon: Zap,   bg: '#FFF0F0', border: '#ffc1c1', color: '#FF4B4B' },
  { word: 'meticulous', hint: 'tỉ mỉ · cẩn thận',    Icon: Brain,    bg: '#F0FAE8', border: '#b4e893', color: '#58CC02' },
  { word: 'resilient',  hint: 'kiên cường · bất khuất', Icon: Rocket, bg: '#F8EEFF', border: '#ddb8ff', color: '#CE82FF' },
];

const MESSAGES = [
  'Đang nạp kho báu từ vựng...',
  'Khởi động bộ não chinh phục...',
  'Sắp xếp từng viên gạch tri thức...',
  'Tập hợp đội quân tinh nhuệ...',
];

/* ─── Confetti dot bay lên (background decoration) ─────────────── */
const DOTS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 10 + i * 11,
  delay: i * 0.3,
  color: ['#1CB0F6', '#58CC02', '#FF9600', '#CE82FF', '#FF4B4B', '#FFC800', '#1CB0F6', '#58CC02'][i],
  size: 8 + (i % 3) * 4,
}));

/* ─── Step dots (progress indicator) ───────────────────────────── */
const STEPS = 5;

/* ════════════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════════════ */
const LoadingSpinner = memo(({ message }) => {
  const [vIdx, setVIdx] = useState(0);
  const [mIdx, setMIdx] = useState(0);
  const [step, setStep] = useState(0);

  // Vocab rotate every 3s
  useEffect(() => {
    const t = setInterval(() => setVIdx(p => (p + 1) % VOCAB_PAIRS.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Message rotate every 4s
  useEffect(() => {
    const t = setInterval(() => setMIdx(p => (p + 1) % MESSAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Step dot advance every 2s
  useEffect(() => {
    const t = setInterval(() => setStep(p => Math.min(p + 1, STEPS - 1)), 2000);
    return () => clearInterval(t);
  }, []);

  const vocab = VOCAB_PAIRS[vIdx];
  const { Icon: VocabIcon } = vocab;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#F4F7FA', fontFamily: '"Nunito", "Baloo 2", sans-serif' }}
    >
      {/* ── Grid pattern bg ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right,#e2e8f0 1px,transparent 1px),linear-gradient(to bottom,#e2e8f0 1px,transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      {/* ── Ambient orbs ── */}
      <Motion.div
        animate={{ y: [-24, 24, -24], x: [-16, 16, -16] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(28,176,246,0.15)', filter: 'blur(64px)' }}
      />
      <Motion.div
        animate={{ y: [24, -24, 24], x: [16, -16, 16] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'rgba(88,204,2,0.15)', filter: 'blur(72px)' }}
      />
      <Motion.div
        animate={{ y: [-12, 12, -12] }}
        transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 right-1/3 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'rgba(206,130,255,0.12)', filter: 'blur(56px)' }}
      />

      {/* ── Floating confetti dots ── */}
      {DOTS.map(dot => (
        <Motion.div
          key={dot.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${dot.x}%`, bottom: '-20px', width: dot.size, height: dot.size, background: dot.color, opacity: 0.7 }}
          animate={{ y: [0, -window.innerHeight * 0.8], opacity: [0.7, 0] }}
          transition={{ repeat: Infinity, duration: 6 + dot.id * 0.7, delay: dot.delay, ease: 'easeOut' }}
        />
      ))}

      {/* ══ Main Card ══ */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.75, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className="relative z-10 flex flex-col items-center text-center w-[90vw] max-w-[420px]"
      >
        {/* ── Outer card ── */}
        <div
          className="w-full rounded-[32px] p-8"
          style={{
            background: 'white',
            border: '2.5px solid #e2e8f0',
            borderBottom: '7px solid #cbd5e1',
            boxShadow: '0 8px 48px rgba(0,0,0,0.08)',
          }}
        >

          {/* ── Mascot icon ── */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer ring — spinning dashed */}
              <Motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                className="absolute -inset-3 rounded-[32px]"
                style={{ border: '3px dashed #BAE3FB', borderRadius: 36 }}
              />
              {/* Inner ring — counter-spin */}
              <Motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="absolute -inset-1.5 rounded-[28px]"
                style={{ border: '2px dashed rgba(28,176,246,0.25)', borderRadius: 30 }}
              />

              {/* Icon box — bob up/down */}
              <Motion.div
                animate={{ y: [-8, 6, -8] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                className="relative w-24 h-24 rounded-[24px] flex items-center justify-center"
                style={{
                  background: '#1CB0F6',
                  border: '2.5px solid #0d8ecf',
                  borderBottom: '7px solid #0d8ecf',
                  boxShadow: '0 6px 0 #0d8ecf44, 0 12px 32px rgba(28,176,246,0.30)',
                }}
              >
                {/* Shimmer sweep */}
                <Motion.div
                  animate={{ x: ['-120%', '220%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 0.5 }}
                  className="absolute inset-0 rounded-[22px] overflow-hidden pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }}
                />
                <BookOpen size={44} className="text-white relative z-10" strokeWidth={2.5} />

                {/* Star badge top-right */}
                <Motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 1 }}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: '#FFC800',
                    border: '2.5px solid white',
                    boxShadow: '0 2px 8px rgba(255,200,0,0.4)',
                  }}
                >
                  <Star size={14} fill="white" className="text-white" strokeWidth={0} />
                </Motion.div>
              </Motion.div>
            </div>
          </div>

          {/* ── Rotating message ── */}
          <div className="h-8 relative w-full mb-2 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <Motion.p
                key={mIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="absolute text-[16px] font-black text-slate-800 tracking-tight leading-tight"
              >
                {message || MESSAGES[mIdx]}
              </Motion.p>
            </AnimatePresence>
          </div>

          <p className="text-[12px] font-bold text-slate-400 mb-6">Chỉ một chút xíu nữa thôi...</p>

          {/* ── Progress bar ── */}
          <div className="w-full mb-5">
            <div
              className="w-full h-5 rounded-full overflow-hidden relative"
              style={{ background: '#f1f5f9', border: '2px solid #e2e8f0' }}
            >
              <Motion.div
                initial={{ width: '4%' }}
                animate={{ width: '92%' }}
                transition={{ duration: 14, ease: 'easeOut' }}
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ background: '#58CC02' }}
              >
                {/* Animated stripe */}
                <Motion.div
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                    width: '40%',
                    transform: 'skewX(-12deg)',
                  }}
                />
              </Motion.div>
            </div>
          </div>

          {/* ── Step dots ── */}
          <div className="flex items-center justify-center gap-2 mb-7">
            {Array.from({ length: STEPS }).map((_, i) => (
              <Motion.div
                key={i}
                animate={i <= step
                  ? { background: '#58CC02', scale: i === step ? 1.3 : 1 }
                  : { background: '#e2e8f0', scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="rounded-full"
                style={{
                  width: i === step ? 22 : 10,
                  height: 10,
                  border: i <= step ? '2px solid #46A302' : '2px solid #cbd5e1',
                }}
              />
            ))}
          </div>

          {/* ── Vocab flashcard ── */}
          <div
            className="w-full rounded-[20px] overflow-hidden relative"
            style={{ border: '2px solid #e2e8f0', borderBottom: '4px solid #cbd5e1' }}
          >
            {/* Header strip */}
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}
            >
              <div
                className="w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0"
                style={{ background: '#FFF8EA', border: '1.5px solid #FFD8A8' }}
              >
                <Sparkles size={11} style={{ color: '#FF9600' }} strokeWidth={2.5} />
              </div>
              <span
                className="text-[10px] font-black uppercase tracking-[0.15em]"
                style={{ color: '#94a3b8' }}
              >
                Học một từ mới
              </span>
            </div>

            {/* Vocab content */}
            <div className="px-4 py-3.5 bg-white" style={{ minHeight: 64 }}>
              <AnimatePresence mode="wait">
                <Motion.div
                  key={vIdx}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.28 }}
                  className="flex items-center gap-3"
                >
                  {/* Icon badge */}
                  <div
                    className="w-11 h-11 rounded-[13px] flex items-center justify-center shrink-0"
                    style={{
                      background: vocab.bg,
                      border: `2px solid ${vocab.border}`,
                      borderBottom: `4px solid ${vocab.color}`,
                      boxShadow: `0 2px 0 ${vocab.color}33`,
                    }}
                  >
                    <VocabIcon size={20} style={{ color: vocab.color }} strokeWidth={2.5} />
                  </div>

                  <div className="text-left min-w-0">
                    <p
                      className="text-[18px] font-black leading-tight"
                      style={{ color: '#1e293b', letterSpacing: '-0.01em' }}
                    >
                      {vocab.word}
                    </p>
                    <p className="text-[13px] font-bold" style={{ color: '#64748b' }}>
                      {vocab.hint}
                    </p>
                  </div>

                  {/* Vocab index pill */}
                  <div
                    className="ml-auto shrink-0 px-2 py-1 rounded-[8px] text-[10px] font-black"
                    style={{ background: vocab.bg, border: `1.5px solid ${vocab.border}`, color: vocab.color }}
                  >
                    {vIdx + 1}/{VOCAB_PAIRS.length}
                  </div>
                </Motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* ── Bottom tagline ── */}
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 text-[12px] font-bold text-slate-400 flex items-center gap-2"
        >
          <Motion.span
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            🚀
          </Motion.span>
          Biến quá trình chờ thành niềm vui học tập
        </Motion.p>
      </Motion.div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
export { LoadingSpinner };
export default LoadingSpinner;
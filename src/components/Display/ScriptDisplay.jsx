import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react';
import {
  Play, Pause, Eye, EyeOff, Volume2, SkipBack, SkipForward,
  AlertCircle, CheckCircle2, Headphones, Activity, MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

const SKIP_TIME = 10;
const VIZ_BARS  = 28;

/* ─── Design tokens ──────────────────────────────────────── */
const C = {
  blue: '#1CB0F6', blueDark: '#1899D6', blueBg: '#EAF6FE', blueBorder: '#BAE3FB',
  green: '#58CC02', greenDark: '#46A302', greenBg: '#F0FAE8',
  n50: '#F8FAFC', n100: '#F1F5F9', n200: '#E2E8F0',
  n400: '#94A3B8', n500: '#64748B', n600: '#475569', n800: '#1E293B',
  white: '#FFFFFF', red: '#FF4B4B', redBg: '#FFF0F0',
};
const F = { body: '"Nunito", "Baloo 2", sans-serif', display: '"Baloo 2", "Nunito", sans-serif' };

const speakerPalette = [
  { bg: '#EFF6FF', text: '#2563EB', dot: '#3B82F6', border: '#BFDBFE' },
  { bg: '#ECFDF5', text: '#059669', dot: '#10B981', border: '#A7F3D0' },
  { bg: '#F5F3FF', text: '#7C3AED', dot: '#8B5CF6', border: '#DDD6FE' },
];

/* ─── Visualizer ─────────────────────────────────────────── */
const Visualizer = memo(({ isPlaying, audioEl }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef();
  const ctxRef    = useRef(null);

  useEffect(() => {
    const drawIdle = () => {
      const canvas = canvasRef.current; if (!canvas) return;
      const c = canvas.getContext('2d');
      c.clearRect(0, 0, canvas.width, canvas.height);
      const bw = (canvas.width / VIZ_BARS) - 3;
      for (let i = 0; i < VIZ_BARS; i++) {
        const h = 4 + Math.random() * 7;
        c.fillStyle = 'rgba(255,255,255,0.25)';
        c.beginPath(); c.roundRect(i * (bw + 3), canvas.height - h, bw, h, [3, 3, 0, 0]); c.fill();
      }
    };
    if (!audioEl || !isPlaying) { cancelAnimationFrame(rafRef.current); drawIdle(); return; }
    try {
      if (!ctxRef.current) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser(); analyser.fftSize = 128;
        const source = audioCtx.createMediaElementSource(audioEl);
        source.connect(analyser); analyser.connect(audioCtx.destination);
        ctxRef.current = { analyser, data: new Uint8Array(analyser.frequencyBinCount) };
      }
      const { analyser, data } = ctxRef.current;
      const draw = () => {
        const canvas = canvasRef.current; if (!canvas) return;
        const c = canvas.getContext('2d');
        const { width, height } = canvas;
        analyser.getByteFrequencyData(data);
        c.clearRect(0, 0, width, height);
        const bw = (width / VIZ_BARS) - 3;
        data.slice(0, VIZ_BARS).forEach((val, i) => {
          const norm = val / 255; const h = Math.max(4, norm * height);
          c.fillStyle = `rgba(255,255,255,${0.5 + norm * 0.5})`;
          c.beginPath(); c.roundRect(i * (bw + 3), height - h, bw, h, [3, 3, 0, 0]); c.fill();
        });
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    } catch (_) { drawIdle(); }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, audioEl]);

  return (
    <div style={{ height: 52, background: 'rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} width={260} height={52} />
      {isPlaying && (
        <div style={{ position: 'absolute', top: 6, right: 8, display: 'flex', alignItems: 'center', gap: 4, background: C.white, padding: '2px 8px', borderRadius: 99, boxShadow: '0 1px 6px rgba(0,0,0,0.1)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.blue, animation: 'pulse 1.2s ease-in-out infinite' }} />
          <span style={{ fontFamily: F.display, fontSize: 9, fontWeight: 900, color: C.blue, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live</span>
        </div>
      )}
    </div>
  );
});

/* ─── Metric Card ────────────────────────────────────────── */
const MetricCard = memo(({ label, value }) => (
  <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '8px 12px', flex: 1, borderBottom: '3px solid rgba(0,0,0,0.08)' }}>
    <p style={{ fontFamily: F.body, fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 3px' }}>{label}</p>
    <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 900, color: C.white, margin: 0, lineHeight: 1 }}>{value}</p>
  </div>
));

/* ─── Progress Slider ────────────────────────────────────── */
const ProgressSlider = memo(({ currentTime, duration, seek, formatTime }) => {
  const ref = useRef(null);
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const calc = useCallback((e) => {
    if (!ref.current || !duration) return;
    const r = ref.current.getBoundingClientRect();
    seek(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * duration);
  }, [duration, seek]);

  const onDown = useCallback((e) => {
    e.preventDefault(); calc(e);
    const move = (ev) => calc(ev);
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  }, [calc]);

  return (
    <div style={{ marginTop: 4 }}>
      <div ref={ref} onPointerDown={onDown} role="slider" tabIndex={0}
        style={{ height: 20, display: 'flex', alignItems: 'center', cursor: 'pointer', touchAction: 'none', outline: 'none' }}>
        <div style={{ position: 'relative', height: 8, width: '100%', background: 'rgba(0,0,0,0.15)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: C.white, borderRadius: 99, width: `${pct}%`, transition: 'none' }} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.body, fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.65)', marginTop: 2, padding: '0 2px' }}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
});

/* ─── Icon Button ────────────────────────────────────────── */
const IconBtn = memo(({ onClick, children, disabled = false }) => (
  <button onClick={onClick} disabled={disabled}
    style={{
      width: 40, height: 40, borderRadius: 14,
      background: 'rgba(255,255,255,0.12)', color: C.white,
      border: 'none', borderBottom: '3px solid rgba(0,0,0,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer', flexShrink: 0,
      opacity: disabled ? 0.35 : 1, transition: 'all 0.12s', outline: 'none',
    }}
    onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
    onMouseDown={e => { e.currentTarget.style.transform = 'translateY(3px)'; e.currentTarget.style.borderBottomWidth = '0px'; }}
    onMouseUp={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderBottomWidth = '3px'; }}
  >
    {children}
  </button>
));

/* ─── Transcript Line ────────────────────────────────────── */
const TranscriptLine = memo(({ line, index }) => {
  const hasSpeaker = line.includes(':');
  const [speaker, ...rest] = hasSpeaker ? line.split(':') : [null, line];
  const content = rest.join(':').trim() || line;
  const col = speakerPalette[index % speakerPalette.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
      style={{
        background: C.white, border: `2px solid ${C.n200}`,
        borderBottom: `3px solid ${C.n200}`, borderRadius: 18,
        padding: '12px 14px', marginBottom: 10,
        transition: 'border-color 0.15s, transform 0.15s',
      }}
      whileHover={{ y: -1, borderColor: C.blueBorder }}
    >
      {speaker && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: col.bg, border: `1.5px solid ${col.border}`, borderRadius: 9, padding: '3px 10px', marginBottom: 7 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: col.dot, flexShrink: 0 }} />
          <span style={{ fontFamily: F.display, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: col.text }}>{speaker.trim()}</span>
        </div>
      )}
      <p style={{ fontFamily: F.body, fontSize: 14, fontWeight: 700, color: C.n600, lineHeight: 1.6, margin: 0 }}>{content}</p>
    </motion.div>
  );
});

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
const ScriptDisplay = ({ script, audioUrl, partTitle, isPartPlayed, onAudioStart, onAudioEnd }) => {
  const { isPlaying, pause, play, duration, currentTime, seek, isLoading, error, audioEl, formatTime } = useAudioPlayer(audioUrl);
  const [showTranscript, setShowTranscript] = useState(false);
  const lines = useMemo(() => script.split('\n').filter(l => l.trim()), [script]);
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const rootRef   = useRef(null);
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setIsNarrow(e.contentRect.width < 600);
    });
    ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800;900&family=Nunito:wght@600;700;800;900&display=swap');
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .script-scroll::-webkit-scrollbar { width: 5px; }
        .script-scroll::-webkit-scrollbar-track { background: transparent; }
        .script-scroll::-webkit-scrollbar-thumb { background: ${C.n200}; border-radius: 8px; }
      `}</style>

      <div ref={rootRef} style={{ width: '100%', fontFamily: F.body }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 13, background: C.blueBg, border: `2px solid ${C.blueBorder}`, boxShadow: `0 3px 0 ${C.blueBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Headphones size={18} color={C.blue} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 900, color: C.n800, margin: 0, lineHeight: 1.2 }}>{partTitle}</p>
              <p style={{ fontFamily: F.body, fontSize: 12, fontWeight: 700, color: C.n400, margin: '2px 0 0' }}>Bài luyện nghe</p>
            </div>
          </div>
          {isPartPlayed && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: C.greenBg, border: `2px solid ${C.green}40`, borderRadius: 11, fontFamily: F.display, fontSize: 12, fontWeight: 900, color: C.greenDark }}>
              <CheckCircle2 size={14} strokeWidth={3} /> Hoàn thành
            </div>
          )}
        </div>

        {/* ── Error ── */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ marginBottom: 12, padding: '10px 14px', background: C.redBg, border: `2px solid ${C.red}30`, borderBottom: `3px solid ${C.red}30`, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 8, fontFamily: F.body, fontSize: 13, fontWeight: 800, color: C.red }}>
              <AlertCircle size={17} strokeWidth={2.5} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main Card ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isNarrow ? '1fr' : '260px 1fr',
          borderRadius: 24, overflow: 'hidden',
          background: C.white, border: `2px solid ${C.n200}`,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>

          {/* LEFT: Player */}
          <div style={{
            background: C.blue, padding: '18px 16px',
            display: 'flex', flexDirection: 'column', gap: 14,
            borderRight: isNarrow ? 'none' : `3px solid ${C.blueDark}`,
            borderBottom: isNarrow ? `3px solid ${C.blueDark}` : 'none',
          }}>
            {/* Status + Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 10px', borderRadius: 10,
                background: isPlaying ? C.white : 'rgba(255,255,255,0.12)',
                border: `1.5px solid ${isPlaying ? C.blueBorder : 'rgba(255,255,255,0.1)'}`,
                borderBottom: `3px solid ${isPlaying ? C.blueBorder : 'rgba(0,0,0,0.1)'}`,
                fontFamily: F.display, fontSize: 11, fontWeight: 900,
                color: isPlaying ? C.blue : 'rgba(255,255,255,0.85)',
                textTransform: 'uppercase', letterSpacing: '0.07em',
                width: 'fit-content',
              }}>
                <Activity size={13} strokeWidth={3} style={{ animation: isPlaying ? 'pulse 1.2s ease-in-out infinite' : 'none' }} />
                {isPlaying ? 'Đang phát' : 'Sẵn sàng'}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <MetricCard label="Thời gian" value={formatTime(duration)} />
                <MetricCard label="Đoạn thoại" value={lines.length} />
              </div>
            </div>

            <Visualizer isPlaying={isPlaying} audioEl={audioEl} />
            <ProgressSlider currentTime={currentTime} duration={duration} seek={seek} formatTime={formatTime} />

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 2 }}>
              <IconBtn onClick={() => seek(currentTime - SKIP_TIME)}><SkipBack size={18} strokeWidth={3} /></IconBtn>

              <button
                onClick={() => isPlaying ? pause() : play()} disabled={isLoading}
                style={{
                  width: 56, height: 56, borderRadius: 18,
                  background: C.white, color: C.blue,
                  border: 'none', borderBottom: `4px solid ${C.blueDark}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1, outline: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.12s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.borderBottomWidth = '0px'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderBottomWidth = '4px'; }}
              >
                {isLoading
                  ? <div style={{ width: 22, height: 22, border: `3px solid ${C.blueBg}`, borderTop: `3px solid ${C.blue}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  : isPlaying
                    ? <Pause fill={C.blue} size={22} />
                    : <Play fill={C.blue} size={22} style={{ marginLeft: 2 }} />}
              </button>

              <IconBtn onClick={() => seek(currentTime + SKIP_TIME)}><SkipForward size={18} strokeWidth={3} /></IconBtn>
            </div>
          </div>

          {/* RIGHT: Transcript */}
          <div style={{ display: 'flex', flexDirection: 'column', background: C.n50 }}>
            {/* Panel header */}
            <div style={{ padding: '12px 16px', borderBottom: `2px solid ${C.n200}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.white, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MessageCircle size={17} color={C.n400} strokeWidth={2.5} />
                <span style={{ fontFamily: F.display, fontSize: 14, fontWeight: 900, color: C.n800 }}>Nội dung bài nghe</span>
              </div>
              <button
                onClick={() => setShowTranscript(s => !s)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', borderRadius: 11, cursor: 'pointer', outline: 'none',
                  fontFamily: F.body, fontSize: 12, fontWeight: 800,
                  background: showTranscript ? C.blueBg : C.white,
                  border: `2px solid ${showTranscript ? C.blueBorder : C.n200}`,
                  borderBottom: `3px solid ${showTranscript ? C.blueBorder : C.n200}`,
                  color: showTranscript ? C.blue : C.n500,
                  transition: 'all 0.15s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(3px)'; e.currentTarget.style.borderBottomWidth = '0px'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderBottomWidth = '3px'; }}
              >
                {showTranscript ? <><EyeOff size={13} strokeWidth={3} /> Đóng</> : <><Eye size={13} strokeWidth={3} /> Xem bài</>}
              </button>
            </div>

            {/* Scroll area */}
            <div className="script-scroll" style={{ overflowY: 'auto', padding: '14px', minHeight: 220, maxHeight: 380 }}>
              <AnimatePresence mode="wait">
                {showTranscript ? (
                  <motion.div key="transcript" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    {lines.map((l, i) => <TranscriptLine key={i} line={l} index={i} />)}
                  </motion.div>
                ) : (
                  <motion.div key="focus" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px 20px', height: '100%', minHeight: 180 }}>
                    <div style={{ width: 60, height: 60, borderRadius: 20, background: C.blueBg, border: `2px solid ${C.blueBorder}`, boxShadow: `0 4px 0 ${C.blueBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                      <Headphones size={28} color={C.blue} strokeWidth={2.5} />
                    </div>
                    <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 900, color: C.n800, margin: '0 0 8px' }}>Chế độ tập trung</p>
                    <p style={{ fontFamily: F.body, fontSize: 13, fontWeight: 700, color: C.n500, maxWidth: 240, lineHeight: 1.6, margin: 0 }}>
                      Hãy nghe thật kỹ. Nhấn <strong style={{ color: C.blue }}>Xem bài</strong> nếu cần hỗ trợ.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer progress bar */}
            <div style={{ height: 4, background: C.n200, flexShrink: 0, marginTop: 'auto', position: 'relative' }}>
              <motion.div
                style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: C.blue, borderRadius: '0 3px 3px 0' }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default memo(ScriptDisplay);
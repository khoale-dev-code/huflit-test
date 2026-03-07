/*
 * ScriptDisplay.jsx – Material 3 x Spotify Vibe (Blue Theme)
 * * ROOT CAUSE FIX ĐÃ ÁP DỤNG:
 * - Root element: w-full, KHÔNG min-h-screen
 * - Card height: auto (co giãn), transcript dùng max-height scroll
 * - Breakpoint: Dùng ResizeObserver theo container 
 * - Tối ưu: Thay thế 95% inline-styles bằng Tailwind CSS để tăng perf & clean code.
 */
import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react';
import {
  Play, Pause, Eye, EyeOff, Volume2, SkipBack, SkipForward,
  VolumeX, Volume1, AlertCircle, CheckCircle2, Headphones, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioPlayer } from '../../hooks/useAudioPlayer'; // Giữ nguyên hook của bạn

const SKIP_TIME = 10;
const VIZ_BARS = 40;

// Bảng màu M3 xanh dương cho các diễn giả
const speakerPalette = [
  { bg: 'bg-blue-100', text: 'text-blue-900', dot: 'bg-blue-600' },
  { bg: 'bg-indigo-100', text: 'text-indigo-900', dot: 'bg-indigo-600' },
  { bg: 'bg-sky-100', text: 'text-sky-900', dot: 'bg-sky-600' },
];

/* ── Visualizer (Tối ưu Canvas & Blue Theme) ── */
const Visualizer = memo(({ isPlaying, audioEl }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef();
  const ctxRef = useRef(null);

  useEffect(() => {
    const drawIdle = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const c = canvas.getContext('2d');
      c.clearRect(0, 0, canvas.width, canvas.height);
      const bw = (canvas.width / VIZ_BARS) - 2;
      for (let i = 0; i < VIZ_BARS; i++) {
        const h = 4 + Math.random() * 6;
        c.fillStyle = 'rgba(59, 130, 246, 0.15)'; // Blue mờ khi tắt
        c.beginPath();
        c.roundRect(i * (bw + 2), canvas.height - h, bw, h, [3, 3, 0, 0]);
        c.fill();
      }
    };

    if (!audioEl || !isPlaying) { cancelAnimationFrame(rafRef.current); drawIdle(); return; }

    try {
      if (!ctxRef.current) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = VIZ_BARS * 2;
        const source = audioCtx.createMediaElementSource(audioEl);
        source.connect(analyser); analyser.connect(audioCtx.destination);
        ctxRef.current = { audioCtx, analyser, data: new Uint8Array(analyser.frequencyBinCount) };
      }
      const { analyser, data } = ctxRef.current;
      
      const draw = () => {
        const canvas = canvasRef.current; if (!canvas) return;
        const c = canvas.getContext('2d');
        const { width, height } = canvas;
        analyser.getByteFrequencyData(data);
        c.clearRect(0, 0, width, height);
        
        const bw = (width / VIZ_BARS) - 2;
        data.forEach((val, i) => {
          const norm = val / 255; const h = Math.max(4, norm * height);
          const grad = c.createLinearGradient(0, height - h, 0, height);
          grad.addColorStop(0, `rgba(59, 130, 246, ${0.4 + norm * 0.6})`); // Blue-500
          grad.addColorStop(1, `rgba(30, 58, 138, ${0.2 + norm * 0.4})`); // Blue-900
          c.fillStyle = grad; c.beginPath();
          c.roundRect(i * (bw + 2), height - h, bw, h, [3, 3, 0, 0]); c.fill();
        });
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    } catch (_) { drawIdle(); }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, audioEl]);

  return (
    <div className="h-[60px] bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative shrink-0">
      <canvas ref={canvasRef} className="w-full h-full block" width={280} height={60} />
      {isPlaying && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" />
          <span className="text-[9px] font-bold tracking-wider text-blue-100 uppercase">Live</span>
        </div>
      )}
    </div>
  );
});

/* ── MetricCard ── */
const MetricCard = memo(({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl py-2 px-3 flex-1 flex flex-col justify-center">
    <p className="text-[10px] font-medium tracking-wider text-blue-200/60 uppercase mb-0.5">{label}</p>
    <p className="text-[16px] font-semibold font-mono text-white m-0 leading-tight">{value}</p>
  </div>
));

/* ── ProgressSlider (Spotify Vibe - PointerEvents mượt mà) ── */
const ProgressSlider = memo(({ currentTime, duration, seek, formatTime }) => {
  const ref = useRef(null);
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  const calc = useCallback((e) => {
    if (!ref.current || !duration) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left; // PointerEvent tự handle cả chuột & touch
    seek(Math.max(0, Math.min(1, x / r.width)) * duration);
  }, [duration, seek]);

  const onDown = useCallback((e) => {
    e.preventDefault(); // Ngăn scroll khi vuốt trên mobile
    calc(e);
    const move = (ev) => calc(ev);
    const up = () => { 
      window.removeEventListener('pointermove', move); 
      window.removeEventListener('pointerup', up); 
    };
    window.addEventListener('pointermove', move); 
    window.addEventListener('pointerup', up);
  }, [calc]);

  return (
    <div className="mt-2">
      <div 
        ref={ref} onPointerDown={onDown} role="slider" tabIndex={0}
        className="h-[20px] flex items-center cursor-pointer touch-none outline-none group"
        onKeyDown={e => { 
          if (e.key === 'ArrowRight') seek(Math.min(duration, currentTime + 5)); 
          if (e.key === 'ArrowLeft') seek(Math.max(0, currentTime - 5)); 
        }}
      >
        {/* Track */}
        <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-visible group-hover:bg-white/20 transition-colors">
          {/* Fill */}
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-none group-hover:bg-blue-400" 
            style={{ width: `${pct}%` }} 
          />
          {/* Thumb (Spotify style - Hiện khi hover) */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200"
            style={{ left: `calc(${pct}% - 6px)` }}
          />
        </div>
      </div>
      <div className="flex justify-between text-[11px] font-mono font-medium text-blue-100/50 mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
});

/* ── IconBtn ── */
const IconBtn = memo(({ onClick, children, disabled = false, size = "normal" }) => (
  <button 
    onClick={onClick} disabled={disabled}
    className={`rounded-full bg-transparent border-none text-blue-100 cursor-pointer flex items-center justify-center shrink-0 transition-all hover:bg-white/10 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed
      ${size === 'large' ? 'w-10 h-10' : 'w-8 h-8'}`}
  >
    {children}
  </button>
));

/* ── VolumeControl ── */
const VolumeControl = memo(({ volume, setVolume }) => {
  const [open, setOpen] = useState(false);
  const Icon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  
  return (
    <div className="relative">
      <IconBtn onClick={() => setOpen(o => !o)}><Icon size={18} /></IconBtn>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-slate-800 border border-white/10 rounded-2xl py-4 px-3 flex flex-col items-center gap-3 z-50 shadow-2xl"
          >
            <input type="range" min="0" max="1" step="0.02" value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="cursor-pointer h-24 accent-blue-500"
              style={{ writingMode: 'vertical-lr', direction: 'rtl', width: 4, appearance: 'slider-vertical' }} 
            />
            <span className="text-[10px] font-mono text-white/50">{Math.round(volume * 100)}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

/* ── TranscriptLine (M3 Style) ── */
const TranscriptLine = memo(({ line, index }) => {
  const hasSpeaker = line.includes(':');
  const [speaker, ...rest] = hasSpeaker ? line.split(':') : [null, line];
  const content = rest.join(':').trim() || line;
  const col = speakerPalette[index % speakerPalette.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.4) }}
      className="bg-white border border-slate-200 rounded-2xl py-3 px-4 mb-2.5 cursor-default transition-all duration-300 hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)] hover:border-blue-300 group"
    >
      {speaker && (
        <div className={`inline-flex items-center gap-1.5 ${col.bg} rounded-full py-1 pr-2.5 pl-1.5 mb-2 transition-colors group-hover:bg-blue-100`}>
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${col.dot}`} />
          <span className={`text-[10px] font-bold tracking-wider uppercase ${col.text}`}>{speaker.trim()}</span>
        </div>
      )}
      <p className="text-[14px] leading-relaxed font-medium text-slate-700 m-0">{content}</p>
    </motion.div>
  );
});

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */
const ScriptDisplay = ({ script, audioUrl, partTitle, isPartPlayed, onAudioStart, onAudioEnd }) => {
  const { isPlaying, pause, play, duration, currentTime, seek, volume, setVolume, isLoading, error, audioEl, formatTime } = useAudioPlayer(audioUrl);
  const [showTranscript, setShowTranscript] = useState(false);
  const lines = useMemo(() => script.split('\n').filter(l => l.trim()), [script]);
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Giữ nguyên ResizeObserver (Root Cause Fix của bạn)
  const rootRef = useRef(null);
  const [isNarrow, setIsNarrow] = useState(false);
  
  useEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) setIsNarrow(entry.contentRect.width < 640);
    });
    ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .blue-scroll::-webkit-scrollbar { width: 6px; }
        .blue-scroll::-webkit-scrollbar-track { background: transparent; }
        .blue-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .blue-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* ROOT: w-full bảo toàn layout */}
      <div ref={rootRef} className="w-full font-sans" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>

        {/* ── Header: Title + Badge ── */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 shadow-sm border border-blue-200/50">
              <Headphones size={18} className="text-blue-700" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-slate-800 m-0 leading-tight">{partTitle}</p>
              <p className="text-[11px] font-medium text-slate-500 m-0 mt-0.5">Listening Mastery</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isPartPlayed && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] font-semibold text-emerald-700 shadow-sm">
                <CheckCircle2 size={13} /> Completed
              </div>
            )}
            <div className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-[11px] font-bold font-mono text-slate-600 shadow-sm">
              {Math.round(progressPct)}%
            </div>
          </div>
        </div>

        {/* ── Error Banner ── */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-3 py-2.5 px-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-[13px] text-red-700 font-medium">
              <AlertCircle size={16} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MAIN CARD: Grid Layout (Spotify Left + M3 Right) ── */}
        <div className={`grid rounded-[24px] overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200/60 transition-all
          ${isNarrow ? 'grid-cols-1' : 'grid-cols-[280px_1fr]'}`}>

          {/* LEFT: Player (Deep Blue Spotify Vibe) */}
          <div className={`bg-gradient-to-br from-slate-900 to-blue-950 p-5 flex flex-col gap-5 text-white relative
            ${isNarrow ? 'border-b border-white/10' : 'border-r border-white/10'}`}>
            
            {/* Status & Metrics */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors
                  ${isPlaying ? 'border-blue-400/30 bg-blue-500/10' : 'border-white/10 bg-white/5'}`}>
                  <Activity size={12} className={isPlaying ? 'text-blue-400 animate-pulse' : 'text-white/40'} />
                  <span className={`text-[10px] font-bold tracking-wider uppercase ${isPlaying ? 'text-blue-300' : 'text-white/40'}`}>
                    {isPlaying ? 'Now Playing' : 'Ready'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <MetricCard label="Duration" value={formatTime(duration)} />
                <MetricCard label="Lines" value={lines.length} />
              </div>
            </div>

            <Visualizer isPlaying={isPlaying} audioEl={audioEl} />
            
            <ProgressSlider currentTime={currentTime} duration={duration} seek={seek} formatTime={formatTime} />

            {/* Playback Controls (Spotify Style) */}
            <div className="flex items-center justify-between mt-1 px-2">
              <IconBtn size="large" onClick={() => seek(currentTime - SKIP_TIME)}><SkipBack size={20} /></IconBtn>
              
              <button
                onClick={() => isPlaying ? pause() : play()} disabled={isLoading}
                className="w-14 h-14 rounded-full border-none flex items-center justify-center bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.4)] cursor-pointer hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-200 disabled:bg-white/10 disabled:scale-100"
              >
                {isLoading 
                  ? <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                  : isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />
                }
              </button>

              <IconBtn size="large" onClick={() => seek(currentTime + SKIP_TIME)}><SkipForward size={20} /></IconBtn>
            </div>
            
            {/* Volume */}
            <div className="absolute top-5 right-5">
               <VolumeControl volume={volume} setVolume={setVolume} />
            </div>
          </div>

          {/* RIGHT: Transcript (Light M3 Theme) */}
          <div className="flex flex-col bg-slate-50/50">

            {/* Panel header */}
            <div className="py-3 px-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 z-10 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${isPlaying ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse' : 'bg-slate-300'}`} />
                <span className="text-[13px] font-bold text-slate-800">Transcript</span>
                <span className="text-[10px] font-bold py-0.5 px-2 bg-slate-100 rounded-full text-slate-500">{lines.length} lines</span>
              </div>
              <button
                onClick={() => setShowTranscript(s => !s)}
                className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border-none text-[12px] font-bold cursor-pointer transition-all duration-200
                  ${showTranscript ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {showTranscript ? <><EyeOff size={14} /> Hide</> : <><Eye size={14} /> Show</>}
              </button>
            </div>

            {/* Transcript scroll area (Giữ nguyên max-height theo logic cũ của bạn) */}
            <div className="blue-scroll overflow-y-auto p-4 min-h-[150px] max-h-[380px] scroll-smooth relative">
              <AnimatePresence mode="wait">
                {showTranscript ? (
                  <motion.div key="transcript" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {lines.map((l, i) => <TranscriptLine key={i} line={l} index={i} />)}
                  </motion.div>
                ) : (
                  <motion.div key="focus" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
                    className="h-full min-h-[160px] flex flex-col items-center justify-center text-center py-6 px-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4 shadow-inner border border-blue-100">
                      {isPlaying ? <Activity size={24} className="text-blue-500 animate-pulse" /> : <Headphones size={24} className="text-blue-400" />}
                    </div>
                    <p className="text-[15px] font-bold text-slate-800 m-0 mb-1.5">Focus Mode</p>
                    <p className="text-[13px] text-slate-500 max-w-[240px] m-0 leading-relaxed">
                      Listen carefully to the audio. Tap <strong className="text-blue-600">Show</strong> to reveal the transcript.
                    </p>
                    
                    {/* Equalizer vui mắt khi đang phát */}
                    {isPlaying && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex items-end gap-1.5 h-6">
                        {[16, 24, 12, 28, 18, 10].map((h, i) => (
                          <div key={i} className="w-1 bg-blue-500 rounded-full opacity-80" style={{ height: h, animation: `pulse ${0.5 + i * 0.1}s infinite alternate ease-in-out` }} />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer progress bar - Thanh chạy ngang ở dưới cùng */}
            <div className="h-1 bg-slate-100 shrink-0 relative mt-auto">
              <motion.div
                className="absolute top-0 left-0 h-full bg-blue-500"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ScriptDisplay);
/*
 * ScriptDisplay.jsx – Material 3 Design System · Tailwind Edition
 * Tối ưu hóa UI/UX Layout bởi Chuyên gia ReactJS & TailwindCSS
 */
import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react';
import {
  Play, Pause, Eye, EyeOff, Volume2, SkipBack, SkipForward,
  VolumeX, Volume1, AlertCircle, CheckCircle2, Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

// ─────────────────────────────────────────
// M3 Token Variables
// ─────────────────────────────────────────
const SKIP_TIME = 10;
const VIZ_BARS = 40;

const speakerPalette = [
  { bg: 'bg-[#D8E2FF]', text: 'text-[#001257]', dot: 'bg-[#1A56DB]' },
  { bg: 'bg-[#DBE2F9]', text: 'text-[#141B2C]', dot: 'bg-[#575E71]' },
  { bg: 'bg-[#FDD7FA]', text: 'text-[#2A122B]', dot: 'bg-[#725572]' },
];

// ─────────────────────────────────────────
// Visualizer Component
// ─────────────────────────────────────────
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
        c.fillStyle = 'rgba(173,198,255,0.2)';
        c.beginPath();
        c.roundRect(i * (bw + 2), canvas.height - h, bw, h, [3, 3, 0, 0]);
        c.fill();
      }
    };

    if (!audioEl || !isPlaying) {
      cancelAnimationFrame(rafRef.current);
      drawIdle();
      return;
    }

    try {
      if (!ctxRef.current) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = VIZ_BARS * 2;
        const source = audioCtx.createMediaElementSource(audioEl);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        ctxRef.current = { audioCtx, analyser, data: new Uint8Array(analyser.frequencyBinCount) };
      }
      const { analyser, data } = ctxRef.current;
      const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const c = canvas.getContext('2d');
        const { width, height } = canvas;
        analyser.getByteFrequencyData(data);
        c.clearRect(0, 0, width, height);
        const bw = (width / VIZ_BARS) - 2;
        data.forEach((val, i) => {
          const norm = val / 255;
          const h = Math.max(4, norm * height);
          const grad = c.createLinearGradient(0, height - h, 0, height);
          grad.addColorStop(0, `rgba(26,86,219,${0.3 + norm * 0.7})`);
          grad.addColorStop(1, `rgba(114,85,114,${0.15 + norm * 0.4})`);
          c.fillStyle = grad;
          c.beginPath();
          c.roundRect(i * (bw + 2), height - h, bw, h, [3, 3, 0, 0]);
          c.fill();
        });
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    } catch (_) { drawIdle(); }

    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, audioEl]);

  return (
    <div className="relative h-[72px] bg-white/5 rounded-xl border border-[#ADC6FF]/10 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" width={320} height={72} />
      {isPlaying && (
        <div className="absolute top-2 right-2.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] shadow-[0_0_6px_#4CAF50] animate-pulse" />
          <span className="text-[11px] font-medium tracking-wide text-white/40 uppercase">Live</span>
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────
// UI Sub-components
// ─────────────────────────────────────────
const MetricCard = ({ label, value }) => (
  <div className="bg-white/5 border border-white/5 rounded-2xl py-3 px-3.5">
    <p className="text-[11px] font-medium tracking-wide text-white/40 uppercase mb-1">{label}</p>
    <p className="text-[20px] leading-7 font-semibold font-mono text-white">{value}</p>
  </div>
);

const StatusChip = ({ active }) => (
  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 ${
    active ? 'border-[#4CAF50]/35 bg-[#4CAF50]/10' : 'border-white/10 bg-white/5'
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? 'bg-[#4CAF50] shadow-[0_0_5px_#4CAF50] animate-pulse' : 'bg-white/25'}`} />
    <span className={`text-[11px] font-medium tracking-wide uppercase ${active ? 'text-[#81C784]' : 'text-white/45'}`}>
      {active ? 'Playing' : 'Ready'}
    </span>
  </div>
);

const IconBtn = ({ onClick, children, disabled = false }) => (
  <button
    onClick={onClick} disabled={disabled}
    className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 shrink-0
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'text-white/80 hover:bg-white/10 hover:text-white active:scale-90 cursor-pointer'}`}
  >
    {children}
  </button>
);

// ─────────────────────────────────────────
// ProgressSlider
// ─────────────────────────────────────────
const ProgressSlider = ({ currentTime, duration, seek, formatTime }) => {
  const ref = useRef(null);
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const calc = useCallback((e) => {
    if (!ref.current || !duration) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX ?? e.touches?.[0]?.clientX ?? 0) - r.left;
    seek(Math.max(0, Math.min(1, x / r.width)) * duration);
  }, [duration, seek]);

  const onDown = (e) => {
    calc(e);
    const move = (ev) => calc(ev);
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div>
      <div
        ref={ref} onPointerDown={onDown} role="slider" tabIndex={0}
        className="h-5 flex items-center cursor-pointer touch-none group"
        onKeyDown={e => {
          if (e.key === 'ArrowRight') seek(Math.min(duration, currentTime + 5));
          if (e.key === 'ArrowLeft') seek(Math.max(0, currentTime - 5));
        }}
      >
        <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden transition-all group-hover:h-2">
          <div className="absolute top-0 left-0 h-full bg-[#ADC6FF] rounded-full transition-all duration-150 ease-linear" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="flex justify-between text-[11px] font-mono font-medium tracking-wide text-white/40 mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// Volume Popover
// ─────────────────────────────────────────
const VolumeControl = ({ volume, setVolume }) => {
  const [open, setOpen] = useState(false);
  const Icon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  
  return (
    <div className="relative">
      <IconBtn onClick={() => setOpen(!open)}><Icon size={20}/></IconBtn>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-[#1E2535] border border-white/10 rounded-2xl py-4 px-3.5 flex flex-col items-center gap-2.5 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
          >
            <input
              type="range" min="0" max="1" step="0.02" value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-1 h-[88px] cursor-pointer accent-[#ADC6FF]"
              style={{ writingMode: 'vertical-lr', direction: 'rtl', appearance: 'slider-vertical' }}
            />
            <span className="text-[11px] font-mono font-medium text-white/50">{Math.round(volume * 100)}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────
// TranscriptLine
// ─────────────────────────────────────────
const TranscriptLine = memo(({ line, index }) => {
  const hasSpeaker = line.includes(':');
  const [speaker, ...rest] = hasSpeaker ? line.split(':') : [null, line];
  const content = rest.join(':').trim() || line;
  const col = speakerPalette[index % speakerPalette.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: Math.min(index * 0.025, 0.35) }}
      className="bg-white border border-[#C4C6D0] rounded-2xl p-3.5 md:p-4 mb-2.5 transition-all duration-200 hover:shadow-[0_2px_12px_rgba(26,86,219,0.08)] hover:border-[#1A56DB]/30"
    >
      {speaker && (
        <div className={`inline-flex items-center gap-1.5 rounded-full py-0.5 pr-2.5 pl-1.5 mb-2 ${col.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${col.dot}`} />
          <span className={`text-[12px] font-medium tracking-wide uppercase ${col.text}`}>{speaker.trim()}</span>
        </div>
      )}
      <p className="text-[14px] leading-5 font-normal tracking-wide text-[#1A1B1F] m-0">{content}</p>
    </motion.div>
  );
});

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
const ScriptDisplay = ({ script, audioUrl, partTitle, isPartPlayed, onAudioStart, onAudioEnd }) => {
  const {
    isPlaying, pause, play, duration, currentTime,
    seek, volume, setVolume, isLoading, error, audioEl, formatTime
  } = useAudioPlayer(audioUrl);

  const [showTranscript, setShowTranscript] = useState(false);
  const lines = useMemo(() => script.split('\n').filter(l => l.trim()), [script]);
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #C4C6D0; border-radius: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #74777F; }
      `}</style>

      <div className="min-h-screen bg-[#F7F8FF] p-4 md:p-8 font-sans text-[#1A1B1F] antialiased flex flex-col items-center">
        <div className="w-full max-w-[1080px]">

          {/* Header */}
          <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#D8E2FF] flex items-center justify-center shrink-0">
                <Headphones size={20} className="text-[#001257]"/>
              </div>
              <div>
                <h1 className="text-[22px] leading-7 font-normal text-[#1A1B1F] m-0">{partTitle}</h1>
                <p className="text-[14px] font-normal tracking-wide text-[#44464F] m-0">Listening Mastery Series</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isPartPlayed && (
                <div className="inline-flex items-center gap-1.5 py-1.5 px-3.5 bg-[#E8F5E9] rounded-full text-[12px] font-medium tracking-wide text-[#1B5E20]">
                  <CheckCircle2 size={14}/> Completed
                </div>
              )}
              <div className="py-1.5 px-3.5 bg-[#D8E2FF] rounded-full text-[12px] font-medium font-mono tracking-wide text-[#001257]">
                {Math.round(progressPct)}%
              </div>
            </div>
          </header>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-4 p-3.5 px-4 bg-[#FFDAD6] border border-[#BA1A1A]/20 rounded-2xl flex items-center gap-2.5 text-[14px] text-[#410002]"
              >
                <AlertCircle size={18} className="text-[#BA1A1A]"/> {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Card */}
          <main className="grid grid-cols-1 md:grid-cols-[360px_1fr] rounded-3xl md:rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.04)] border border-[#C4C6D0] bg-white">
            
            {/* LEFT: Player Panel */}
            <section className="bg-[#12192B] p-6 md:p-8 flex flex-col text-white border-b md:border-b-0 md:border-r border-white/5">
              
              <div className="flex flex-col gap-3 mb-6">
                <StatusChip active={isPlaying}/>
                <div className="grid grid-cols-2 gap-2.5">
                  <MetricCard label="Duration" value={formatTime(duration)}/>
                  <MetricCard label="Lines" value={lines.length}/>
                </div>
              </div>

              <Visualizer isPlaying={isPlaying} audioEl={audioEl}/>

              {/* Player Controls Group */}
              <div className="mt-8 flex flex-col gap-5">
                <ProgressSlider currentTime={currentTime} duration={duration} seek={seek} formatTime={formatTime}/>

                {/* Primary Button Row */}
                <div className="flex items-center justify-between w-full mt-2">
                  
                  {/* Left: Volume */}
                  <div className="flex-1 flex justify-start">
                    <VolumeControl volume={volume} setVolume={setVolume}/>
                  </div>

                  {/* Center: Playback */}
                  <div className="flex items-center justify-center gap-3 md:gap-4 shrink-0">
                    <IconBtn onClick={() => seek(currentTime - SKIP_TIME)}><SkipBack size={22}/></IconBtn>
                    
                    {/* Play FAB (Floating Action Button) */}
                    <button
                      onClick={() => isPlaying ? pause() : play()}
                      disabled={isLoading}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center transition-all duration-200 
                        ${isLoading 
                          ? 'bg-white/10 cursor-not-allowed shadow-none' 
                          : 'bg-[#1A56DB] text-white hover:bg-[#1446B5] hover:shadow-lg hover:shadow-[#1A56DB]/30 active:scale-95'}`}
                    >
                      {isLoading 
                        ? <div className="w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin"/>
                        : isPlaying ? <Pause fill="currentColor" size={26}/> : <Play fill="currentColor" size={26} className="ml-1"/>
                      }
                    </button>

                    <IconBtn onClick={() => seek(currentTime + SKIP_TIME)}><SkipForward size={22}/></IconBtn>
                  </div>

                  {/* Right: Spacer for Symmetry */}
                  <div className="flex-1 flex justify-end"></div>
                  
                </div>
              </div>

              <div className="mt-auto pt-6">
                <div className="h-px bg-white/5 w-full mb-3"/>
                <p className="text-[11px] tracking-wide text-white/20 text-center m-0">← → seek · Space to toggle</p>
              </div>
            </section>

            {/* RIGHT: Transcript Panel */}
            <section className="flex flex-col h-auto md:h-[680px] bg-[#FAFAFA]">
              
              {/* Panel Header */}
              <div className="p-3.5 px-5 border-b border-[#C4C6D0] flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isPlaying ? 'bg-[#4CAF50] shadow-[0_0_6px_#4CAF50] animate-pulse' : 'bg-[#C4C6D0]'}`}/>
                  <span className="text-[14px] font-medium tracking-wide text-[#1A1B1F]">Interactive Transcript</span>
                  <span className="text-[11px] font-medium tracking-wide py-0.5 px-2 bg-[#E1E2EC] rounded-full text-[#44464F]">{lines.length} lines</span>
                </div>

                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`flex items-center gap-1.5 py-2 px-4 rounded-full border-none text-[14px] font-medium tracking-wide transition-all duration-200 hover:opacity-80 active:scale-95
                    ${showTranscript ? 'bg-[#D8E2FF] text-[#001257]' : 'bg-[#E1E2EC] text-[#44464F]'}`}
                >
                  {showTranscript ? <><EyeOff size={14}/> Hide</> : <><Eye size={14}/> Show</>}
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="custom-scroll flex-1 overflow-y-auto p-5 scroll-smooth min-h-[300px] md:min-h-0">
                <AnimatePresence mode="wait">
                  {showTranscript ? (
                    <motion.div key="transcript" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      {lines.map((l, i) => <TranscriptLine key={i} line={l} index={i}/>)}
                    </motion.div>
                  ) : (
                    <motion.div key="focus" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}
                      className="h-full min-h-[260px] flex flex-col items-center justify-center text-center p-8 px-6"
                    >
                      <div className="w-20 h-20 rounded-[28px] bg-[#DBE2F9] flex items-center justify-center mb-5">
                        {isPlaying ? <Pause size={32} className="text-[#141B2C]"/> : <Play size={32} className="text-[#141B2C] ml-1"/>}
                      </div>
                      <h3 className="text-[24px] leading-8 font-normal text-[#1A1B1F] mb-2">Focus Mode Active</h3>
                      <p className="text-[14px] font-normal tracking-wide text-[#44464F] max-w-[280px]">Listen without reading. Tap <strong>Show</strong> to verify your understanding.</p>
                      
                      {isPlaying && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-end gap-1 h-9">
                          {[18, 28, 22, 32, 20, 26, 16].map((h, i) => (
                            <div key={i} className="w-1 bg-[#1A56DB] rounded-sm opacity-55"
                              style={{ height: h, animation: `pulse ${0.7 + i * 0.12}s ease-in-out infinite alternate`, animationDelay: `${i * 0.08}s` }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Progress Bar */}
              <div className="h-[3px] bg-[#C4C6D0] shrink-0 relative">
                <motion.div className="absolute top-0 left-0 h-full bg-[#1A56DB] rounded-r-sm" animate={{ width: `${progressPct}%` }} transition={{ duration: 0.15, ease: 'linear' }} />
              </div>

            </section>
          </main>

          <footer className="mt-6 text-center text-[12px] font-medium tracking-wide text-[#44464F] opacity-50">
            Material Design 3 · Listening Mastery Series
          </footer>
        </div>
      </div>
    </>
  );
};

export default memo(ScriptDisplay);
import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react';
import {
  Play, Pause, Eye, EyeOff, SkipBack, SkipForward,
  AlertCircle, CheckCircle2, Headphones, Activity, MessageCircle
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

const SKIP_TIME = 10;
const VIZ_BARS  = 28;

/* ─── Design Tokens (Tailwind Arbitrary Values) ─── */
// Đã chuyển phần lớn màu sắc thẳng vào class Tailwind để tối ưu render
const speakerPalette = [
  { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500', border: 'border-blue-200' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-500', border: 'border-purple-200' },
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
    } catch { 
      drawIdle(); 
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, audioEl]);

  return (
    <div className="h-[52px] bg-white/10 rounded-2xl overflow-hidden relative shrink-0">
      <canvas ref={canvasRef} className="w-full h-full block" width={260} height={52} />
      {isPlaying && (
        <div className="absolute top-1.5 right-2 flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1CB0F6] animate-pulse" />
          <span className="font-nunito text-[9px] font-black text-[#1CB0F6] uppercase tracking-widest">Live</span>
        </div>
      )}
    </div>
  );
});
Visualizer.displayName = 'Visualizer';

/* ─── Metric Card ────────────────────────────────────────── */
const MetricCard = memo(({ label, value }) => (
  <div className="bg-white/10 rounded-xl p-2.5 flex-1 border-b-[3px] border-black/10">
    <p className="font-nunito text-[10px] font-extrabold text-white/65 uppercase tracking-widest mb-1">{label}</p>
    <p className="font-nunito text-[15px] font-black text-white leading-none m-0">{value}</p>
  </div>
));
MetricCard.displayName = 'MetricCard';

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
    <div className="mt-1">
      <div ref={ref} onPointerDown={onDown} role="slider" tabIndex={0}
        className="h-5 flex items-center cursor-pointer touch-none outline-none group"
      >
        <div className="relative h-2 w-full bg-black/15 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-white rounded-full transition-none group-hover:bg-blue-100" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="flex justify-between font-nunito text-[11px] font-extrabold text-white/65 mt-0.5 px-0.5">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
});
ProgressSlider.displayName = 'ProgressSlider';

/* ─── Icon Button ────────────────────────────────────────── */
const IconBtn = memo(({ onClick, children, disabled = false }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className={`w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border-b-[3px] border-black/10 outline-none transition-all duration-100
      ${disabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer hover:bg-white/20 active:translate-y-[3px] active:border-b-0'}`}
  >
    {children}
  </button>
));
IconBtn.displayName = 'IconBtn';

/* ─── Transcript Line ────────────────────────────────────── */
const TranscriptLine = memo(({ line, index }) => {
  const hasSpeaker = line.includes(':');
  const [speaker, ...rest] = hasSpeaker ? line.split(':') : [null, line];
  const content = rest.join(':').trim() || line;
  const col = speakerPalette[index % speakerPalette.length];

  return (
    <Motion.div
      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
      className="bg-white border-2 border-slate-200 border-b-[3px] rounded-[18px] p-3 mb-3 hover:-translate-y-[1px] hover:border-[#BAE3FB] transition-all"
    >
      {speaker && (
        <div className={`inline-flex items-center gap-1.5 ${col.bg} border-2 ${col.border} rounded-xl px-2.5 py-1 mb-2`}>
          <span className={`w-1.5 h-1.5 rounded-full ${col.dot} shrink-0`} />
          <span className={`font-nunito text-[11px] font-black uppercase tracking-widest ${col.text}`}>{speaker.trim()}</span>
        </div>
      )}
      <p className="font-nunito text-[14px] font-bold text-slate-600 leading-relaxed m-0">{content}</p>
    </Motion.div>
  );
});
TranscriptLine.displayName = 'TranscriptLine';

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
const ScriptDisplay = ({ script, audioUrl, partTitle, isPartPlayed, onAudioStart, onAudioEnd }) => {
  const { isPlaying, pause, play, duration, currentTime, seek, isLoading, error, audioEl, formatTime } = useAudioPlayer(audioUrl);
  const [showTranscript, setShowTranscript] = useState(false);
  const lines = useMemo(() => script.split('\n').filter(l => l.trim()), [script]);
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    if (isPlaying) {
      onAudioStart?.();
    }
  }, [isPlaying, onAudioStart]);

  useEffect(() => {
    if (!audioEl) return;
    const handleEnded = () => onAudioEnd?.();
    audioEl.addEventListener('ended', handleEnded);
    return () => audioEl.removeEventListener('ended', handleEnded);
  }, [audioEl, onAudioEnd]);

  return (
    <div className="w-full font-nunito">
      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[3px] flex items-center justify-center shrink-0">
            <Headphones size={18} className="text-[#1CB0F6]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-nunito text-[15px] font-black text-slate-800 m-0 leading-tight">{partTitle}</p>
            <p className="font-nunito text-[12px] font-bold text-slate-400 m-0 mt-0.5">Bài luyện nghe</p>
          </div>
        </div>
        {isPartPlayed && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FAE8] border-2 border-[#58CC02]/40 rounded-xl font-nunito text-[12px] font-black text-[#46A302]">
            <CheckCircle2 size={14} strokeWidth={3} /> Hoàn thành
          </div>
        )}
      </div>

      {/* ── Error ── */}
      <AnimatePresence>
        {error && (
          <Motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-3 px-4 py-2.5 bg-[#FFF0F0] border-2 border-[#FF4B4B]/30 border-b-[3px] rounded-2xl flex items-center gap-2 font-nunito text-[13px] font-extrabold text-[#FF4B4B]"
          >
            <AlertCircle size={17} strokeWidth={2.5} /> {error}
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Card ── */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] rounded-3xl overflow-hidden bg-white border-2 border-slate-200 border-b-[4px] shadow-sm">

        {/* LEFT: Player */}
        <div className="bg-[#1CB0F6] p-4 flex flex-col gap-4 border-b-4 md:border-b-0 md:border-r-4 border-[#1899D6]">
          {/* Status + Metrics */}
          <div className="flex flex-col gap-3">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-[1.5px] border-b-[3px] font-nunito text-[11px] font-black uppercase tracking-widest w-fit
              ${isPlaying ? 'bg-white border-[#BAE3FB] text-[#1CB0F6]' : 'bg-white/10 border-white/10 border-b-black/10 text-white/85'}`}
            >
              <Activity size={13} strokeWidth={3} className={isPlaying ? 'animate-pulse' : ''} />
              {isPlaying ? 'Đang phát' : 'Sẵn sàng'}
            </div>
            <div className="flex gap-2">
              <MetricCard label="Thời gian" value={formatTime(duration)} />
              <MetricCard label="Đoạn thoại" value={lines.length} />
            </div>
          </div>

          <Visualizer isPlaying={isPlaying} audioEl={audioEl} />
          <ProgressSlider currentTime={currentTime} duration={duration} seek={seek} formatTime={formatTime} />

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-1">
            <IconBtn onClick={() => seek(currentTime - SKIP_TIME)}><SkipBack size={18} strokeWidth={3} /></IconBtn>

            <button
              onClick={() => isPlaying ? pause() : play()} disabled={isLoading}
              className={`w-14 h-14 rounded-[18px] bg-white text-[#1CB0F6] flex items-center justify-center outline-none transition-all duration-100 border-b-4 border-[#1899D6] shadow-sm
                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50 active:translate-y-[4px] active:border-b-0'}`}
            >
              {isLoading
                ? <div className="w-6 h-6 border-[3px] border-[#EAF6FE] border-t-[#1CB0F6] rounded-full animate-spin" />
                : isPlaying
                  ? <Pause fill="currentColor" size={24} />
                  : <Play fill="currentColor" size={24} className="ml-1" />}
            </button>

            <IconBtn onClick={() => seek(currentTime + SKIP_TIME)}><SkipForward size={18} strokeWidth={3} /></IconBtn>
          </div>
        </div>

        {/* RIGHT: Transcript */}
        <div className="flex flex-col bg-slate-50 h-full">
          {/* Panel header */}
          <div className="px-4 py-3 border-b-2 border-slate-200 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-slate-400" strokeWidth={2.5} />
              <span className="font-nunito text-[14px] font-black text-slate-800">Nội dung bài nghe</span>
            </div>
            <button
              onClick={() => setShowTranscript(s => !s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl outline-none font-nunito text-[12px] font-extrabold transition-all border-2 active:border-b-0 active:translate-y-[3px]
                ${showTranscript 
                  ? 'bg-[#EAF6FE] border-[#BAE3FB] border-b-[3px] text-[#1CB0F6]' 
                  : 'bg-white border-slate-200 border-b-[3px] text-slate-500 hover:bg-slate-50'}`}
            >
              {showTranscript ? <><EyeOff size={14} strokeWidth={3} /> Đóng</> : <><Eye size={14} strokeWidth={3} /> Xem bài</>}
            </button>
          </div>

          {/* Scroll area */}
          <div className="overflow-y-auto p-4 min-h-[220px] max-h-[380px] custom-scrollbar">
            <AnimatePresence mode="wait">
              {showTranscript ? (
                <Motion.div key="transcript" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {lines.map((l, i) => <TranscriptLine key={i} line={l} index={i} />)}
                </Motion.div>
              ) : (
                <Motion.div key="focus" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                  className="flex flex-col items-center justify-center text-center py-8 h-full min-h-[180px]"
                >
                  <div className="w-16 h-16 rounded-[20px] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[4px] flex items-center justify-center mb-4">
                    <Headphones size={28} className="text-[#1CB0F6]" strokeWidth={2.5} />
                  </div>
                  <p className="font-nunito text-[16px] font-black text-slate-800 m-0 mb-2">Chế độ tập trung</p>
                  <p className="font-nunito text-[14px] font-bold text-slate-500 max-w-[240px] leading-relaxed m-0">
                    Hãy nghe thật kỹ. Nhấn <strong className="text-[#1CB0F6]">Xem bài</strong> nếu cần hỗ trợ.
                  </p>
                </Motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer progress bar */}
          <div className="h-1.5 bg-slate-200 shrink-0 mt-auto relative">
            <Motion.div
              className="absolute top-0 left-0 h-full bg-[#1CB0F6] rounded-r-md"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ScriptDisplay);
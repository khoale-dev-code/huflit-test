import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react';
import {
  Play, Pause, Eye, EyeOff, SkipBack, SkipForward,
  AlertCircle, CheckCircle2, Headphones, Activity, MessageCircle
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

const SKIP_TIME = 10;
const VIZ_BARS  = 28;

/* ─── Design Tokens (Monochromatic Blue Palette) ─── */
const speakerPalette = [
  { bg: 'bg-[#EAF6FE]', text: 'text-[#1CB0F6]', dot: 'bg-[#1CB0F6]', border: 'border-[#BAE3FB]' },
  { bg: 'bg-[#F0F9FF]', text: 'text-[#0A81D1]', dot: 'bg-[#0A81D1]', border: 'border-[#7DD3FC]' },
  { bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]', dot: 'bg-[#0369A1]', border: 'border-[#38BDF8]' },
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
        c.fillStyle = 'rgba(255,255,255,0.3)';
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
          c.fillStyle = `rgba(255,255,255,${0.6 + norm * 0.4})`;
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
    <div className="h-[52px] bg-white/20 rounded-2xl overflow-hidden relative shrink-0">
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
  <div className="bg-white/20 rounded-xl p-2.5 flex-1 border-b-[3px] border-black/10">
    <p className="font-nunito text-[10px] font-extrabold text-blue-100 uppercase tracking-widest mb-1">{label}</p>
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
          <div className="absolute top-0 left-0 h-full bg-white rounded-full transition-none group-hover:bg-blue-50 shadow-[0_0_8px_rgba(255,255,255,0.6)]" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="flex justify-between font-nunito text-[11px] font-extrabold text-blue-100 mt-0.5 px-0.5">
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
    className={`w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border-b-[3px] border-black/10 outline-none transition-all duration-100
      ${disabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer hover:bg-white/30 active:translate-y-[3px] active:border-b-0'}`}
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
      className="bg-white border-2 border-[#BAE3FB] border-b-[4px] rounded-[20px] p-4 mb-4 hover:-translate-y-1 hover:border-[#1CB0F6] hover:shadow-md hover:shadow-blue-500/10 transition-all duration-200"
    >
      {speaker && (
        <div className={`inline-flex items-center gap-1.5 ${col.bg} border-2 ${col.border} rounded-xl px-3 py-1 mb-2`}>
          <span className={`w-2 h-2 rounded-full ${col.dot} shrink-0 shadow-inner`} />
          <span className={`font-nunito text-[12px] font-black uppercase tracking-widest ${col.text}`}>{speaker.trim()}</span>
        </div>
      )}
      <p className="font-nunito text-[15px] font-bold text-[#0A81D1] leading-relaxed m-0">{content}</p>
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
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[18px] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[4px] flex items-center justify-center shrink-0 shadow-sm">
            <Headphones size={22} className="text-[#1CB0F6]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-nunito text-[16px] sm:text-[18px] font-black text-[#0A81D1] m-0 leading-tight">{partTitle}</p>
            <p className="font-nunito text-[13px] font-bold text-[#1CB0F6]/70 m-0 mt-0.5">Bài luyện nghe</p>
          </div>
        </div>
        {isPartPlayed && (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EAF6FE] border-2 border-[#BAE3FB]/80 rounded-[14px] font-nunito text-[13px] font-black text-[#1CB0F6] shadow-sm">
            <CheckCircle2 size={16} strokeWidth={3} /> Hoàn thành
          </div>
        )}
      </div>

      {/* ── Error ── */}
      <AnimatePresence>
        {error && (
          <Motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4 px-4 py-3 bg-[#FFF0F0] border-2 border-[#FF4B4B]/40 border-b-[4px] rounded-2xl flex items-center gap-2 font-nunito text-[14px] font-black text-[#FF4B4B]"
          >
            <AlertCircle size={18} strokeWidth={2.5} /> {error}
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Card (Tô Xanh Toàn Diện) ── */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] rounded-[28px] overflow-hidden bg-[#F4FBFF] border-2 border-[#BAE3FB] border-b-[6px] shadow-sm">

        {/* LEFT: Player Panel (Xanh Đậm) */}
        <div className="bg-[#1CB0F6] p-5 flex flex-col gap-5 border-b-[4px] md:border-b-0 md:border-r-[4px] border-[#1899D6] relative overflow-hidden">
          
          {/* Nền Texture lấp lánh (Tùy chọn) */}
          <div className="absolute inset-0 bg-white opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />

          {/* Status + Metrics */}
          <div className="flex flex-col gap-3 relative z-10">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-b-[4px] font-nunito text-[11px] font-black uppercase tracking-widest w-fit
              ${isPlaying ? 'bg-white border-[#BAE3FB] text-[#1CB0F6]' : 'bg-white/20 border-white/20 border-b-black/10 text-white'}`}
            >
              <Activity size={14} strokeWidth={3} className={isPlaying ? 'animate-pulse' : ''} />
              {isPlaying ? 'Đang phát' : 'Sẵn sàng'}
            </div>
            <div className="flex gap-2">
              <MetricCard label="Thời gian" value={formatTime(duration)} />
              <MetricCard label="Đoạn thoại" value={lines.length} />
            </div>
          </div>

          <div className="relative z-10">
            <Visualizer isPlaying={isPlaying} audioEl={audioEl} />
            <ProgressSlider currentTime={currentTime} duration={duration} seek={seek} formatTime={formatTime} />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-2 relative z-10">
            <IconBtn onClick={() => seek(currentTime - SKIP_TIME)}><SkipBack size={20} strokeWidth={3} /></IconBtn>

            <button
              onClick={() => isPlaying ? pause() : play()} disabled={isLoading}
              className={`w-16 h-16 rounded-[22px] bg-white text-[#1CB0F6] flex items-center justify-center outline-none transition-all duration-100 border-b-[5px] border-[#BAE3FB] shadow-md
                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-[#F4FBFF] hover:border-[#1CB0F6] active:translate-y-[5px] active:border-b-0'}`}
            >
              {isLoading
                ? <div className="w-7 h-7 border-[4px] border-[#EAF6FE] border-t-[#1CB0F6] rounded-full animate-spin" />
                : isPlaying
                  ? <Pause fill="currentColor" size={28} />
                  : <Play fill="currentColor" size={28} className="ml-1" />}
            </button>

            <IconBtn onClick={() => seek(currentTime + SKIP_TIME)}><SkipForward size={20} strokeWidth={3} /></IconBtn>
          </div>
        </div>

        {/* RIGHT: Transcript Panel (Xanh Nhạt) */}
        <div className="flex flex-col h-full bg-[#F4FBFF]">
          
          {/* Panel header */}
          <div className="px-5 py-4 border-b-2 border-[#BAE3FB] flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2.5">
              <MessageCircle size={20} className="text-[#1CB0F6]" strokeWidth={2.5} />
              <span className="font-nunito text-[15px] font-black text-[#0A81D1]">Nội dung bài nghe</span>
            </div>
            
            <button
              onClick={() => setShowTranscript(s => !s)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl outline-none font-nunito text-[13px] font-black transition-all border-2 active:border-b-0 active:translate-y-[3px]
                ${showTranscript 
                  ? 'bg-[#EAF6FE] border-[#BAE3FB] border-b-[3px] text-[#1CB0F6]' 
                  : 'bg-white border-[#BAE3FB] border-b-[3px] text-[#0A81D1] hover:bg-[#F4FBFF]'}`}
            >
              {showTranscript ? <><EyeOff size={16} strokeWidth={3} /> Đóng</> : <><Eye size={16} strokeWidth={3} /> Xem bài</>}
            </button>
          </div>

          {/* Scroll area (Thêm CSS Custom Scrollbar màu xanh) */}
          <div className="overflow-y-auto p-5 min-h-[260px] max-h-[420px] custom-blue-scrollbar relative">
            <AnimatePresence mode="wait">
              {showTranscript ? (
                <Motion.div key="transcript" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                  {lines.map((l, i) => <TranscriptLine key={i} line={l} index={i} />)}
                </Motion.div>
              ) : (
                <Motion.div key="focus" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                  className="flex flex-col items-center justify-center text-center py-10 h-full min-h-[220px]"
                >
                  <div className="w-20 h-20 rounded-[24px] bg-white border-2 border-[#BAE3FB] border-b-[6px] flex items-center justify-center mb-5 shadow-sm">
                    <Headphones size={36} className="text-[#1CB0F6]" strokeWidth={2.5} />
                  </div>
                  <p className="font-nunito text-[18px] font-black text-[#0A81D1] m-0 mb-2">Chế độ tập trung</p>
                  <p className="font-nunito text-[14px] font-bold text-[#1CB0F6]/80 max-w-[260px] leading-relaxed m-0">
                    Hãy lắng nghe thật kỹ. Nhấn <strong className="text-[#1CB0F6] bg-white px-2 py-0.5 rounded-md border border-[#BAE3FB]">Xem bài</strong> nếu cần hỗ trợ.
                  </p>
                </Motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer progress bar */}
          <div className="h-2 bg-[#EAF6FE] shrink-0 mt-auto relative border-t-2 border-[#BAE3FB]">
            <Motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1CB0F6] to-[#58CC02]"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </div>
        </div>
      </div>

      {/* ── Thêm Custom Scrollbar CSS (Xanh) ── */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-blue-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-blue-scrollbar::-webkit-scrollbar-track { background: #F4FBFF; border-radius: 10px; }
        .custom-blue-scrollbar::-webkit-scrollbar-thumb { background: #BAE3FB; border-radius: 10px; border: 2px solid #F4FBFF; }
        .custom-blue-scrollbar::-webkit-scrollbar-thumb:hover { background: #1CB0F6; }
      `}} />

    </div>
  );
};

export default memo(ScriptDisplay);
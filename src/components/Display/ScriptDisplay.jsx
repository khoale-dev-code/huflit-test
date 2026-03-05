import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  useRef,
  useEffect,
} from 'react';
import {
  Play,
  Pause,
  Eye,
  EyeOff,
  Volume2,
  SkipBack,
  SkipForward,
  VolumeX,
  Volume1,
  AlertCircle,
} from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

/* ===================== CONSTANTS ===================== */
const SKIP_SECONDS = 10;
const OVERSCAN = 5;

/* ===================== VISUALIZER ===================== */
const Visualizer = memo(({ isPlaying }) => (
  <div className="flex items-end justify-center gap-1 h-20 bg-black/20 rounded-lg p-2 mb-6">
    {[...Array(16)].map((_, i) => (
      <div
        key={i}
        className="flex-1 bg-blue-500 rounded-full"
        style={{
          height: isPlaying ? `${25 + (i % 4) * 20}%` : '15%',
          opacity: isPlaying ? 0.6 : 0.3,
          transition: isPlaying
            ? `height ${0.4 + (i % 3) * 0.15}s ease-in-out alternate infinite`
            : 'height 0.3s ease, opacity 0.3s ease',
        }}
      />
    ))}
  </div>
));
Visualizer.displayName = 'Visualizer';

/* ===================== TRANSCRIPT LINE ===================== */
const Line = memo(({ line }) => {
  const parsed = useMemo(() => {
    const i = line.indexOf(':');
    return i > 0
      ? { name: line.slice(0, i).trim(), text: line.slice(i + 1).trim() }
      : { text: line };
  }, [line]);

  return (
    <div className="mb-3 p-4 bg-white/70 rounded-lg border border-slate-100 shadow-sm">
      {parsed.name && (
        <div className="text-[10px] font-bold uppercase text-blue-600 mb-1 tracking-wide">
          {parsed.name}
        </div>
      )}
      <p className="text-base leading-relaxed text-slate-700">{parsed.text}</p>
    </div>
  );
});
Line.displayName = 'Line';

/* ===================== SMOOTH TRANSCRIPT LIST ===================== */
/**
 * Không dùng virtual list với fixed height vì gây nhảy scroll.
 * Thay bằng progressive rendering: render tất cả items nhưng dùng
 * CSS content-visibility để browser skip paint/layout cho items ngoài viewport.
 * Kết hợp với IntersectionObserver để lazy-mount thêm items khi gần cuối.
 */
const TranscriptList = memo(({ lines }) => {
  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(30);
  const isLoadingMore = useRef(false);

  // Progressive load: khi user scroll gần cuối → render thêm
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore.current) {
          isLoadingMore.current = true;
          setVisibleCount((prev) => {
            const next = Math.min(prev + 20, lines.length);
            return next;
          });
          // Reset flag sau 100ms để tránh trigger liên tục
          setTimeout(() => {
            isLoadingMore.current = false;
          }, 100);
        }
      },
      {
        root: scrollRef.current,
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [lines.length, visibleCount]);

  // Reset khi lines thay đổi (đổi part)
  useEffect(() => {
    setVisibleCount(30);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [lines]);

  const shown = useMemo(
    () => lines.slice(0, Math.min(visibleCount + OVERSCAN, lines.length)),
    [lines, visibleCount]
  );

  const remaining = lines.length - shown.length;

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar"
      style={{
        // Tắt scroll chaining để tránh bounce/jump trên iOS/Chrome
        overscrollBehavior: 'contain',
        // Bật hardware acceleration cho scroll
        WebkitOverflowScrolling: 'touch',
        willChange: 'scroll-position',
      }}
    >
      <div
        style={{
          // contain: layout + style giúp browser không recalculate toàn trang
          contain: 'layout style',
        }}
      >
        {shown.map((line, idx) => (
          <div
            key={idx}
            style={{
              // content-visibility: auto → browser skip rendering nếu ngoài viewport
              contentVisibility: 'auto',
              // containIntrinsicSize giúp browser estimate height khi skip
              containIntrinsicSize: '0 90px',
            }}
          >
            <Line line={line} />
          </div>
        ))}

        {/* Sentinel để trigger load thêm */}
        {remaining > 0 && (
          <div
            ref={sentinelRef}
            className="py-3 text-center text-xs text-slate-400"
          >
            <div className="inline-flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse" />
              <span>Loading {remaining} more lines...</span>
              <div
                className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        )}

        {/* Bottom padding */}
        <div className="h-8" />
      </div>
    </div>
  );
});
TranscriptList.displayName = 'TranscriptList';

/* ===================== MAIN COMPONENT ===================== */
const ScriptDisplay = ({
  script,
  audioUrl,
  partTitle,
  isPartPlayed,
  onAudioStart,
  onAudioEnd,
}) => {
  const audio = useAudioPlayer(audioUrl);
  const [show, setShow] = useState(false);
  const [volShow, setVolShow] = useState(false);

  /* ========= AUDIO STATE SYNC ========= */
  const prevPlayingRef = useRef(false);
  const endedRef = useRef(false);

  useEffect(() => {
    if (audio.isPlaying && !prevPlayingRef.current) {
      onAudioStart?.();
      endedRef.current = false;
    }
    prevPlayingRef.current = audio.isPlaying;
  }, [audio.isPlaying, onAudioStart]);

  useEffect(() => {
    const isFinished =
      audio.duration > 0 && audio.duration - audio.currentTime < 0.3;
    if (isFinished && !endedRef.current) {
      endedRef.current = true;
      onAudioEnd?.();
    }
  }, [audio.currentTime, audio.duration, onAudioEnd]);

  /* ========= MEMO ========= */
  const lines = useMemo(() => script.split('\n').filter(Boolean), [script]);

  const prog = useMemo(
    () =>
      audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0,
    [audio.currentTime, audio.duration]
  );

  const VolIcon = useMemo(
    () =>
      audio.volume === 0
        ? VolumeX
        : audio.volume < 0.5
        ? Volume1
        : Volume2,
    [audio.volume]
  );

  /* ========= CONTROLS ========= */
  const toggle = useCallback(() => {
    audio.isPlaying ? audio.pause() : audio.play();
  }, [audio]);

  const fwd = useCallback(() => {
    if (!audio.duration) return;
    audio.seek(Math.min(audio.currentTime + SKIP_SECONDS, audio.duration));
  }, [audio]);

  const bwd = useCallback(() => {
    audio.seek(Math.max(audio.currentTime - SKIP_SECONDS, 0));
  }, [audio]);

  const toggleVolSlider = useCallback(() => {
    setVolShow((prev) => !prev);
  }, []);

  const progClick = useCallback(
    (e) => {
      if (!audio.duration) return;
      const r = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - r.left) / r.width;
      audio.seek(Math.max(0, Math.min(1, pct)) * audio.duration);
    },
    [audio]
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{partTitle}</span>
            {isPartPlayed && (
              <span className="ml-2 text-xs font-bold text-emerald-600">
                ✓ Completed
              </span>
            )}
          </div>
          <div className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-slate-700 border border-slate-200">
            {Math.round(prog)}%
          </div>
        </div>

        {audio.error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {audio.error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <div className="grid lg:grid-cols-[320px_1fr]">
            {/* LEFT PANEL */}
            <div className="bg-slate-900 p-6 flex flex-col">
              <div className="mb-auto">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {partTitle}
                </h1>
                <p className="text-slate-400 text-sm mb-6">
                  Listening Practice
                </p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-[9px] font-semibold uppercase text-slate-400 mb-1">
                      Duration
                    </div>
                    <p className="text-base font-bold text-white">
                      {audio.formatTime(audio.duration)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-[9px] font-semibold uppercase text-slate-400 mb-1">
                      Lines
                    </div>
                    <p className="text-base font-bold text-white">
                      {lines.length}
                    </p>
                  </div>
                </div>
              </div>

              <Visualizer isPlaying={audio.isPlaying} />

              {/* Progress Bar */}
              <div className="mb-3">
                <div
                  className="h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={progClick}
                >
                  <div
                    className="h-full bg-blue-500 transition-all duration-150"
                    style={{ width: `${prog}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-1">
                  <span>{audio.formatTime(audio.currentTime)}</span>
                  <span>{audio.formatTime(audio.duration)}</span>
                </div>
              </div>

              <button
                onClick={toggle}
                disabled={audio.isLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 rounded-lg flex items-center justify-center gap-2 mb-3 transition-colors"
              >
                {audio.isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : audio.isPlaying ? (
                  <Pause size={18} fill="white" className="text-white" />
                ) : (
                  <Play size={18} fill="white" className="text-white" />
                )}
                <span className="font-bold text-white text-sm">
                  {audio.isLoading
                    ? 'Loading...'
                    : audio.isPlaying
                    ? 'Pause'
                    : 'Play'}
                </span>
              </button>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={bwd}
                  disabled={!audio.duration}
                  className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors disabled:opacity-40"
                >
                  <SkipBack size={16} className="text-white" />
                </button>

                <div className="relative">
                  <button
                    onClick={toggleVolSlider}
                    className="w-full aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center"
                  >
                    <VolIcon size={16} className="text-white" />
                  </button>

                  {volShow && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-slate-800 rounded-lg border border-white/20 z-50">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={audio.volume}
                        onChange={(e) =>
                          audio.setVolume(parseFloat(e.target.value))
                        }
                        className="w-16 h-1 accent-blue-500"
                        style={{
                          height: '50px',
                          WebkitAppearance: 'slider-vertical',
                        }}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={fwd}
                  disabled={!audio.duration}
                  className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center disabled:opacity-40"
                >
                  <SkipForward size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col max-h-[800px] bg-slate-50">
              <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      audio.isPlaying ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  />
                  <h3 className="font-bold text-slate-800 text-sm">
                    Transcript
                  </h3>
                  <span className="text-xs text-slate-400">
                    ({lines.length} lines)
                  </span>
                </div>
                <button
                  onClick={() => setShow(!show)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                  {show ? 'Hide' : 'Show'}
                </button>
              </div>

              {show ? (
                <TranscriptList lines={lines} />
              ) : (
                <div className="flex-1 flex items-center justify-center p-10">
                  <div className="text-center">
                    <div className="p-6 bg-slate-200 rounded-xl mb-3 inline-block">
                      <Play
                        size={40}
                        fill="currentColor"
                        className={
                          audio.isPlaying ? 'text-blue-500' : 'text-slate-400'
                        }
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-1">
                      Focus Mode
                    </h3>
                    <p className="text-slate-500 text-sm">
                      {audio.isPlaying
                        ? 'Listen carefully - transcript hidden'
                        : 'Press play to start practice'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar {
          scroll-behavior: smooth;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
      `}</style>
    </div>
  );
};

ScriptDisplay.displayName = 'ScriptDisplay';

export default memo(ScriptDisplay);
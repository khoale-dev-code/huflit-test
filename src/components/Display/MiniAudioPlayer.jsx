// src/components/FullExam/components/ExamScreen/MiniAudioPlayer.jsx
import React, { useState, useMemo, useCallback, memo } from 'react';
import { Play, Pause, Volume2, Loader2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

export const MiniAudioPlayer = memo(({ audioUrl }) => {
  const { isPlaying, play, pause, isLoading, currentTime, duration, formatTime } = useAudioPlayer(audioUrl);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!audioUrl) return null;

  return (
    <div className="flex items-center gap-4 bg-white border-2 border-slate-200 border-b-[5px] rounded-[22px] p-2.5 pr-5 w-full sm:w-fit min-w-[280px] shadow-sm my-4 transition-all hover:border-blue-300">
      
      {/* ── NÚT PHÁT (Bên trái) ── */}
      <button
        onClick={() => isPlaying ? pause() : play()}
        disabled={isLoading}
        className={`
          w-12 h-12 rounded-[16px] flex items-center justify-center transition-all outline-none border-b-[4px] shrink-0
          ${isPlaying 
            ? 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB] active:border-b-0 active:translate-y-[2px]' 
            : 'bg-[#1CB0F6] text-white border-[#1899D6] hover:bg-[#18A0E0] active:border-b-0 active:translate-y-[2px]'
          }
        `}
      >
        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 
         isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
      </button>

      {/* ── TIẾN ĐỘ & THÔNG TIN (Bên phải) ── */}
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex justify-between items-end px-0.5">
          <div className="flex items-center gap-1.5">
            <Volume2 size={12} className={isPlaying ? 'text-blue-500' : 'text-slate-400'} />
            <span className={`text-[11px] font-black uppercase tracking-wider ${isPlaying ? 'text-blue-500' : 'text-slate-400'}`}>
              {isPlaying ? 'Đang phát' : 'Audio'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-500 font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        
        {/* Thanh Progress dày 3D */}
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-[1px] shadow-inner border border-slate-200/50">
          <motion.div 
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            className="h-full bg-[#1CB0F6] rounded-full relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[35%] bg-white/30 rounded-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
});
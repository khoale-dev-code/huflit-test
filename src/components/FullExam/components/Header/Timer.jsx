import React, { memo } from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/examHelpers';

export const Timer = memo(({ timeLeft, isWarning = false }) => {
  return (
    <div 
      className={`
        flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
        rounded-[12px] sm:rounded-[16px] border-2 border-b-[4px] transition-colors shadow-sm shrink-0
        ${isWarning 
          ? 'bg-[#fff0f0] border-[#ffc1c1] text-[#FF4B4B]' 
          : 'bg-white border-slate-200 text-slate-700'
        }
      `}
    >
      <Clock 
        size={18} 
        strokeWidth={3} 
        className={`shrink-0 sm:w-5 sm:h-5 ${isWarning ? 'animate-pulse' : ''}`} 
      />
      <span className="font-display font-black text-[15px] sm:text-[18px] tabular-nums tracking-wider leading-none pt-0.5">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
});

Timer.displayName = 'Timer';
export default Timer;
import React, { memo } from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/examHelpers';

export const Timer = memo(({ timeLeft, isWarning = false }) => {
  return (
    <div className={`flex items-center gap-2 font-bold ${isWarning ? 'text-red-600' : 'text-slate-900'}`}>
      <Clock className={`w-5 h-5 ${isWarning ? 'animate-pulse' : ''}`} />
      <span className="text-lg tabular-nums">{formatTime(timeLeft)}</span>
    </div>
  );
});

Timer.displayName = 'Timer';
export default Timer;
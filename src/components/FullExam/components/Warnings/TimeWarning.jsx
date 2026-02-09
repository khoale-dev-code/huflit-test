import React, { memo } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { COLORS } from '../../constants/colors';

export const TimeWarning = memo(({ 
  visible, 
  section,
  isLastListeningPart,
  timeLeft 
}) => {
  if (!visible) return null;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg shadow-lg max-w-sm w-full mx-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-bold text-yellow-900 text-sm">
            ⏱️ You have 5 minutes left!
          </p>
          <p className="text-xs mt-1.5 text-yellow-800">
            {isLastListeningPart 
              ? 'This is your last listening part. After finishing, you will move to Reading.' 
              : 'This is your final section. After submitting, you cannot make changes.'}
          </p>
        </div>
      </div>
    </div>
  );
});

TimeWarning.displayName = 'TimeWarning';
export default TimeWarning;
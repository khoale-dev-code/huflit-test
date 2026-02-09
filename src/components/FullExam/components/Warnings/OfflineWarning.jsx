import React, { memo } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineWarning = memo(({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <WifiOff className="h-5 w-5 text-amber-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-amber-800">
            You are currently offline. Your answers are being saved to your device.
          </p>
        </div>
      </div>
    </div>
  );
});

OfflineWarning.displayName = 'OfflineWarning';
export default OfflineWarning;
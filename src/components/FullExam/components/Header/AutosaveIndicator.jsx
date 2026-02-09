import React, { useState, useEffect, memo } from 'react';
import { CheckCircle, AlertCircle, WifiOff, RefreshCw } from 'lucide-react';

export const AutosaveIndicator = memo(({ 
  isSaving, 
  lastSaved, 
  isOnline, 
  saveError 
}) => {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving && lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, lastSaved]);

  if (saveError) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
        <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
        <span>Save failed</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600">
        <WifiOff className="w-3.5 h-3.5" />
        <span>Offline (draft saved)</span>
      </div>
    );
  }

  if (isSaving) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        <span>Saving…</span>
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 animate-pulse">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>Saved</span>
      </div>
    );
  }

  return null;
});

AutosaveIndicator.displayName = 'AutosaveIndicator';
export default AutosaveIndicator;
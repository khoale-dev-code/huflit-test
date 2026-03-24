// src/hooks/useWritingTimer.js
import { useState, useEffect } from 'react';

export const useWritingTimer = (initialTime = 3600, stopCondition = false) => {
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let interval;
    if (showTimer && timeLeft > 0 && !stopCondition) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showTimer, timeLeft, stopCondition]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => setTimeLeft(initialTime);

  return { showTimer, setShowTimer, timeLeft, formatTime, resetTimer };
};
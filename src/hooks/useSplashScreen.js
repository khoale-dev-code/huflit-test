// src/hooks/useSplashScreen.js
import { useEffect, useState } from 'react';

export const useSplashScreen = (duration = 3000) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return showSplash;
};

export default useSplashScreen;
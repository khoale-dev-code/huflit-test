import { useState, useCallback, useRef, useEffect } from 'react';

export const useAudioPlayer = (audioUrl) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef(null);

  // 🎧 LOAD AUDIO KHI URL THAY ĐỔI
  useEffect(() => {
    if (!audioUrl) return;

    let finalUrl = audioUrl;

    // Chuẩn hóa URL cho Vite public folder
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = finalUrl.replace(/^\/?public\//, '');
      finalUrl = finalUrl.startsWith('/') ? finalUrl : '/' + finalUrl;
    }

    console.log('🎧 AUDIO LOAD:', finalUrl);

    const audio = new Audio(finalUrl);
    audioRef.current = audio;
    audio.volume = volume;

    let isMounted = true;

    const handleLoadedMetadata = () => {
      if (!isMounted) return;
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      if (!isMounted) return;
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (!isMounted) return;
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
    };

    const handleError = (e) => {
      if (!isMounted) return;
      setError('Failed to load audio');
      setIsPlaying(false);
      console.error('Audio error:', finalUrl, e);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      isMounted = false;
      audio.pause();
      audio.src = ''; // 🔥 hủy request cũ tránh AbortError
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl]);

  // ▶ PLAY
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setError(null);
      setIsLoading(true);
      await audio.play();
      setIsPlaying(true);
      setIsPaused(false);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Failed to play audio');
        console.error('Play error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ⏸ PAUSE
  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    setIsPaused(true);
  }, []);

  // ⏹ STOP
  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  // ⏩ SEEK
  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(audio.currentTime);
  }, [duration]);

  // 🔊 VOLUME
  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // ⏱ FORMAT TIME
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    isPlaying,
    isPaused,
    isLoading,
    currentTime,
    duration,
    volume,
    error,
    play,
    pause,
    stop,
    seek,
    setVolume: handleVolumeChange,
    formatTime,
  };
};

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook quản lý audio player
 * Hỗ trợ play, pause, stop, seek, volume control
 */
export const useAudioPlayer = (audioUrl) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef(null);

  // Khởi tạo audio element
 useEffect(() => {
  if (!audioUrl) return;

  // ✅ CHUẨN HÓA URL
  let finalUrl = audioUrl;

  // Nếu là link tuyệt đối (http/https) → giữ nguyên
  if (!/^https?:\/\//i.test(audioUrl)) {
    // Đảm bảo luôn bắt đầu bằng /
    finalUrl = audioUrl.startsWith('/') ? audioUrl : '/' + audioUrl;
  }

  console.log("🎧 AUDIO LOAD:", finalUrl); // debug

  const audio = new Audio(finalUrl);
  audioRef.current = audio;

  const handleLoadedMetadata = () => {
    setDuration(audio.duration);
    setIsLoading(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
  };

  const handleError = (e) => {
    setError('Failed to load audio');
    setIsPlaying(false);
    console.error('Audio error:', finalUrl, e);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsPaused(true);
  };

  audio.addEventListener('loadedmetadata', handleLoadedMetadata);
  audio.addEventListener('timeupdate', handleTimeUpdate);
  audio.addEventListener('ended', handleEnded);
  audio.addEventListener('error', handleError);
  audio.addEventListener('play', handlePlay);
  audio.addEventListener('pause', handlePause);

  audio.volume = volume;

  return () => {
    audio.pause();
    audio.currentTime = 0;
    audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    audio.removeEventListener('timeupdate', handleTimeUpdate);
    audio.removeEventListener('ended', handleEnded);
    audio.removeEventListener('error', handleError);
    audio.removeEventListener('play', handlePlay);
    audio.removeEventListener('pause', handlePause);
  };
}, [audioUrl, volume]);


  const play = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      setIsLoading(true);
      setError(null);
      try {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLoading(false);
            })
            .catch((err) => {
              setError('Failed to play audio');
              setIsLoading(false);
              console.error('Play error:', err);
            });
        }
      } catch (err) {
        setError('Failed to play audio');
        setIsLoading(false);
      }
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, []);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(time, duration));
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [duration]);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

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
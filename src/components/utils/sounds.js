export const playSound = (soundName, volume = 0.3) => {
  try {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch (error) {
    console.error('Sound playback error:', error);
  }
};

export const sounds = {
  success: () => playSound('success'),
  complete: () => playSound('complete'),
  wrong: () => playSound('wrong'),
};
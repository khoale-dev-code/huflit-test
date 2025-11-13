import { SPEAKER_STYLES, SPEAKER_ICONS, VOICE_CONFIG } from '../../config/voiceConfig';

export const getSpeakerColor = (speaker) => 
  SPEAKER_STYLES[speaker] || 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-400 text-slate-900';

export const getSpeakerIcon = (speaker) => 
  SPEAKER_ICONS[speaker] || '👤';

export const getSpeakerTTSOptions = (speaker, playbackRate, playbackVolume) => {
  const config = VOICE_CONFIG.SPEAKER_CONFIG[speaker] || VOICE_CONFIG.SPEAKER_CONFIG.default;
  return { 
    pitch: config.pitch, 
    rate: playbackRate, 
    volume: playbackVolume 
  };
};

export const copyScriptToClipboard = (filteredConversations) => {
  const text = filteredConversations.map(c => `${c.speaker}: ${c.text}`).join('\n\n');
  navigator.clipboard.writeText(text);
};

export const scrollToElement = (elementId, shouldScroll) => {
  if (shouldScroll) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
};
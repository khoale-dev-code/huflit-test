// ==================== IMPROVED TTS CONFIGURATION ====================

/**
 * 🎯 Enhanced Gender Categories
 */
export const GENDER_CATEGORIES = {
  FEMALE: [
    'Woman', 'Sarah', 'Anna', 'Linda', 'Client 2', 'Sales Associate', 
    'Older Woman', 'Student B', 'Student 2', 'Counselor', 'Emma', 
    'Trang', 'Jennifer', 'Lisa', 'Doctor Chen'
  ],
  MALE: [
    'Man', 'Kevin', 'Mark', 'Dr.Chen', 'Ben', 'Client 1', 'Professor', 
    'John', 'Mike', 'Waiter', 'Customer', 'Manager', 'HR Rep', 
    'Interviewer 1', 'Interviewer 2', 'Candidate', 'Professor A', 
    'Student 1', 'Student', 'Parent', 'Travel Agent', 'Narrator', 
    'Dr. Harrison', 'Smith', 'Tom', 'Peter', 'Alex', 'Training', 
    'HR', 'Professor Mitchell'
  ],
  NEUTRAL: ['Narrator', 'System', 'AI Assistant']
};

/**
 * 🎤 Enhanced Voice Settings - Thêm emotional baseline + naturalness
 */
export const VOICE_SETTINGS = {
  // === MALE VOICES ===
  Mark: { pitch: 0.89, rate: 0.95, volume: 0.85, energy: 'medium', formality: 'professional' },
  Man: { pitch: 0.65, rate: 0.95, volume: 0.85, energy: 'medium', formality: 'casual' },
  Alex: { pitch: 0.88, rate: 0.95, volume: 0.85, energy: 'medium', formality: 'professional' },
  HR: { pitch: 0.45, rate: 0.95, volume: 0.85, energy: 'medium', formality: 'formal' },
  Training: { pitch: 0.87, rate: 0.95, volume: 0.85, energy: 'high', formality: 'professional' },
  Tom: { pitch: 1.06, rate: 0.95, volume: 0.85, energy: 'medium', formality: 'casual' },
  Peter: { pitch: 0.88, rate: 0.90, volume: 0.90, energy: 'low', formality: 'formal' },
  Kevin: { pitch: 0.85, rate: 0.95, volume: 0.85, energy: 'high', formality: 'casual' },
  John: { pitch: 0.82, rate: 0.88, volume: 0.90, energy: 'medium', formality: 'formal' },
  Ben: { pitch: 0.50, rate: 0.92, volume: 0.88, energy: 'high', formality: 'casual' },
  'Doctor Chen': { pitch: 0.38, rate: 0.90, volume: 0.85, energy: 'low', formality: 'formal' },
  'Professor Mitchell': { pitch: 0.45, rate: 0.88, volume: 0.87, energy: 'low', formality: 'formal' },
  'Dr. Harrison': { pitch: 0.87, rate: 0.88, volume: 0.87, energy: 'medium', formality: 'formal' },
  Mike: { pitch: 0.90, rate: 0.98, volume: 0.87, energy: 'high', formality: 'casual' },
  Professor: { pitch: 0.55, rate: 0.88, volume: 0.87, energy: 'low', formality: 'formal' },
  'Professor A': { pitch: 0.83, rate: 0.85, volume: 0.90, energy: 'low', formality: 'formal' },
  Waiter: { pitch: 0.92, rate: 0.95, volume: 0.85, energy: 'high', formality: 'casual' },
  Customer: { pitch: 0.88, rate: 0.98, volume: 0.88, energy: 'high', formality: 'casual' },
  Manager: { pitch: 0.80, rate: 0.90, volume: 0.92, energy: 'medium', formality: 'professional' },
  'HR Rep': { pitch: 0.88, rate: 0.92, volume: 0.86, energy: 'medium', formality: 'formal' },
  'Interviewer 1': { pitch: 0.86, rate: 0.92, volume: 0.87, energy: 'medium', formality: 'professional' },
  Candidate: { pitch: 0.92, rate: 0.95, volume: 0.84, energy: 'high', formality: 'formal' },
  'Client 1': { pitch: 0.87, rate: 0.95, volume: 0.86, energy: 'medium', formality: 'professional' },
  Parent: { pitch: 0.88, rate: 0.92, volume: 0.85, energy: 'medium', formality: 'casual' },
  'Travel Agent': { pitch: 0.90, rate: 0.95, volume: 0.87, energy: 'high', formality: 'professional' },
  Student: { pitch: 0.95, rate: 1.00, volume: 0.83, energy: 'high', formality: 'casual' },
  'Student 1': { pitch: 0.94, rate: 1.00, volume: 0.82, energy: 'high', formality: 'casual' },

  // === FEMALE VOICES ===
  Sarah: { pitch: 1.25, rate: 0.95, volume: 0.85, energy: 'high', formality: 'professional' },
  Trang: { pitch: 1.30, rate: 0.95, volume: 0.88, energy: 'medium', formality: 'casual' },
  Emma: { pitch: 1.28, rate: 0.92, volume: 0.90, energy: 'high', formality: 'casual' },
  Jennifer: { pitch: 1.28, rate: 0.92, volume: 0.90, energy: 'medium', formality: 'professional' },
  Anna: { pitch: 1.32, rate: 0.95, volume: 0.88, energy: 'high', formality: 'casual' },
  Linda: { pitch: 1.32, rate: 0.95, volume: 0.88, energy: 'medium', formality: 'professional' },
  Lisa: { pitch: 1.30, rate: 0.90, volume: 0.85, energy: 'medium', formality: 'formal' },
  'Sales Associate': { pitch: 1.28, rate: 0.98, volume: 0.88, energy: 'high', formality: 'casual' },
  'Interviewer 2': { pitch: 1.25, rate: 0.95, volume: 0.85, energy: 'medium', formality: 'professional' },
  Counselor: { pitch: 1.22, rate: 0.88, volume: 0.82, energy: 'low', formality: 'formal' },
  'Older Woman': { pitch: 1.20, rate: 0.85, volume: 0.80, energy: 'low', formality: 'formal' },
  'Client 2': { pitch: 1.28, rate: 0.95, volume: 0.87, energy: 'medium', formality: 'professional' },
  'Student 2': { pitch: 1.25, rate: 1.00, volume: 0.84, energy: 'high', formality: 'casual' },
  'Student B': { pitch: 1.25, rate: 1.00, volume: 0.84, energy: 'high', formality: 'casual' },

  // === NEUTRAL ===
  Narrator: { pitch: 1.0, rate: 0.95, volume: 0.90, energy: 'medium', formality: 'formal' },

  // === DEFAULT ===
  default: { pitch: 1.0, rate: 0.95, volume: 0.85, energy: 'medium', formality: 'neutral' }
};

/**
 * 📊 Emotion Adjustments - Áp dụng cho TTS
 * Web Speech API chỉ support pitch + rate + volume
 */
export const EMOTION_ADJUSTMENTS = {
  excited: {
    pitchMultiplier: 1.15,
    rateMultiplier: 1.15,
    volumeMultiplier: 1.1,
    pauseAfter: 200
  },
  happy: {
    pitchMultiplier: 1.08,
    rateMultiplier: 1.05,
    volumeMultiplier: 1.05,
    pauseAfter: 100
  },
  sad: {
    pitchMultiplier: 0.92,
    rateMultiplier: 0.85,
    volumeMultiplier: 0.95,
    pauseAfter: 300
  },
  angry: {
    pitchMultiplier: 1.05,
    rateMultiplier: 1.2,
    volumeMultiplier: 1.15,
    pauseAfter: 150
  },
  neutral: {
    pitchMultiplier: 1.0,
    rateMultiplier: 1.0,
    volumeMultiplier: 1.0,
    pauseAfter: 0
  }
};

/**
 * 🎨 Optimized Speaker Themes
 */
export const SPEAKER_THEMES = {
  Mark: { gradient: 'from-blue-50 to-blue-100', border: 'border-blue-400', text: 'text-blue-900' },
  'Dr.Chen': { gradient: 'from-blue-50 to-blue-100', border: 'border-blue-400', text: 'text-blue-900' },
  Sarah: { gradient: 'from-pink-50 to-rose-100', border: 'border-pink-400', text: 'text-pink-900' },
  Anna: { gradient: 'from-pink-50 to-rose-100', border: 'border-pink-400', text: 'text-pink-900' },
  Mike: { gradient: 'from-green-50 to-emerald-100', border: 'border-green-400', text: 'text-green-900' },
  'Client 1': { gradient: 'from-emerald-50 to-emerald-100', border: 'border-emerald-400', text: 'text-emerald-900' },
  John: { gradient: 'from-purple-50 to-violet-100', border: 'border-purple-400', text: 'text-purple-900' },
  Counselor: { gradient: 'from-purple-50 to-violet-100', border: 'border-purple-400', text: 'text-purple-900' },
  Waiter: { gradient: 'from-yellow-50 to-amber-100', border: 'border-yellow-400', text: 'text-yellow-900' },
  'Client 2': { gradient: 'from-amber-50 to-amber-100', border: 'border-amber-400', text: 'text-amber-900' },
  'Older Woman': { gradient: 'from-orange-50 to-orange-100', border: 'border-orange-400', text: 'text-orange-900' },
  Professor: { gradient: 'from-indigo-50 to-indigo-100', border: 'border-indigo-400', text: 'text-indigo-900' },
  'Professor A': { gradient: 'from-indigo-50 to-indigo-100', border: 'border-indigo-400', text: 'text-indigo-900' },
  Customer: { gradient: 'from-teal-50 to-teal-100', border: 'border-teal-400', text: 'text-teal-900' },
  'Student 1': { gradient: 'from-teal-50 to-teal-100', border: 'border-teal-400', text: 'text-teal-900' },
  'Travel Agent': { gradient: 'from-cyan-50 to-cyan-100', border: 'border-cyan-400', text: 'text-cyan-900' },
  'Student B': { gradient: 'from-cyan-50 to-cyan-100', border: 'border-cyan-400', text: 'text-cyan-900' },
  'Sales Associate': { gradient: 'from-rose-50 to-rose-100', border: 'border-rose-400', text: 'text-rose-900' },
  Manager: { gradient: 'from-slate-50 to-slate-100', border: 'border-slate-400', text: 'text-slate-900' },
  Narrator: { gradient: 'from-gray-50 to-gray-100', border: 'border-gray-400', text: 'text-gray-900' },
  'Interviewer 1': { gradient: 'from-sky-50 to-sky-100', border: 'border-sky-400', text: 'text-sky-900' },
  'Interviewer 2': { gradient: 'from-lime-50 to-lime-100', border: 'border-lime-400', text: 'text-lime-900' },
  Candidate: { gradient: 'from-fuchsia-50 to-fuchsia-100', border: 'border-fuchsia-400', text: 'text-fuchsia-900' },
  default: { gradient: 'from-gray-50 to-gray-100', border: 'border-gray-400', text: 'text-gray-900' }
};

/**
 * 🎭 Speaker Icons
 */
export const SPEAKER_ICONS = {
  'Travel Agent': '✈️', 'Client 1': '👨‍💼', 'Client 2': '👩‍💼', Manager: '💼',
  'HR Rep': '👔', 'Interviewer 1': '🎤', 'Interviewer 2': '📋', Candidate: '📝',
  Professor: '👨‍🏫', 'Professor A': '👨‍🏫', 'Professor Mitchell': '🔬', 'Dr. Harrison': '🧬',
  'Student 1': '🧑‍🎓', 'Student 2': '👩‍🎓', 'Student B': '🎓', Student: '📖',
  Waiter: '👨‍🍳', Customer: '🛒', 'Sales Associate': '🛍️',
  Counselor: '🧑‍⚕️', 'Doctor Chen': '👩‍⚕️',
  Mark: '🧑‍🔬', Sarah: '👩‍💻', Anna: '👩‍🎨', Ben: '👨', Alex: '🧑‍🏫',
  Mike: '👨‍💻', Kevin: '🧑‍🔧', John: '👨‍⚖️', Tom: '🧑‍🎓', Peter: '👨‍🎓',
  Emma: '👩‍🎤', Trang: '👩‍🌾', Lisa: '👩‍⚕️', Jennifer: '👩‍🏫', Linda: '👩‍💼',
  'Older Woman': '👵', Parent: '👪', Man: '👨', Woman: '👩',
  Narrator: '📖', HR: '🏢', Training: '🎓',
  default: '👤'
};

// ==================== ENHANCED UTILITY FUNCTIONS ====================

const voiceCache = new Map();
const themeCache = new Map();
const genderCache = new Map();
let allSpeakersCache = null;

export const getSpeakerVoice = (speakerName) => {
  if (voiceCache.has(speakerName)) {
    return voiceCache.get(speakerName);
  }
  const voice = VOICE_SETTINGS[speakerName] || VOICE_SETTINGS.default;
  voiceCache.set(speakerName, voice);
  return voice;
};

export const getSpeakerColor = (speakerName) => {
  if (themeCache.has(speakerName)) {
    return themeCache.get(speakerName);
  }
  const theme = SPEAKER_THEMES[speakerName] || SPEAKER_THEMES.default;
  const colorClass = `bg-gradient-to-br ${theme.gradient}`;
  themeCache.set(speakerName, colorClass);
  return colorClass;
};

export const getSpeakerIcon = (speakerName) => {
  return SPEAKER_ICONS[speakerName] || SPEAKER_ICONS.default;
};

/**
 * ✨ NEW: Apply emotion to voice settings
 */
export const applyEmotionToVoice = (speakerName, emotion = 'neutral') => {
  const baseVoice = getSpeakerVoice(speakerName);
  const emotionMod = EMOTION_ADJUSTMENTS[emotion] || EMOTION_ADJUSTMENTS.neutral;
  
  return {
    rate: Math.max(0.5, Math.min(2.0, baseVoice.rate * emotionMod.rateMultiplier)),
    pitch: Math.max(0.5, Math.min(2.0, baseVoice.pitch * emotionMod.pitchMultiplier)),
    volume: Math.max(0.0, Math.min(1.0, baseVoice.volume * emotionMod.volumeMultiplier)),
    pauseAfter: emotionMod.pauseAfter
  };
};

/**
 * ✨ NEW: Get TTS options with emotion support
 */
export const getSpeakerTTSOptions = (speakerName, emotion = 'neutral', rateMultiplier = 1.0, pitchMultiplier = 1.0) => {
  const voice = applyEmotionToVoice(speakerName, emotion);
  
  return {
    rate: Math.max(0.5, Math.min(2.0, voice.rate * rateMultiplier)),
    pitch: Math.max(0.5, Math.min(2.0, voice.pitch * pitchMultiplier)),
    volume: voice.volume,
    pauseAfter: voice.pauseAfter
  };
};

/**
 * ✨ NEW: Process text with natural pauses
 * Thêm pause trước question marks, dấu chấm, ellipsis
 */
export const processTextForNaturalSpeech = (text) => {
  return text
    .replace(/([.!?])\s+/g, '$1 <break time="300ms"/> ') // Pause after sentences
    .replace(/\.\.\./g, '<break time="200ms"/>') // Pause for ellipsis
    .replace(/,/g, '<break time="150ms"/>'); // Short pause for commas
};

/**
 * ✨ NEW: Detect and adjust for questions
 */
export const isQuestion = (text) => {
  return text.trim().endsWith('?');
};

/**
 * ✨ NEW: Analyze emotion from text
 */
export const analyzeTextEmotion = (text) => {
  if (!text || typeof text !== 'string') return 'neutral';
  
  const lower = text.toLowerCase();
  
  // Excited patterns
  if (/\b(wow|amazing|great|excellent|fantastic|awesome|incredible)\b/.test(lower) || 
      (text.match(/!/g) || []).length >= 2) {
    return 'excited';
  }
  
  // Angry patterns
  if (/\b(angry|mad|terrible|awful|horrible|hate)\b/.test(lower) || 
      (text.match(/!/g) || []).length >= 1 && text.length < 30) {
    return 'angry';
  }
  
  // Happy patterns
  if (/\b(happy|glad|love|wonderful|delighted)\b/.test(lower)) {
    return 'happy';
  }
  
  // Sad patterns
  if (/\b(sad|sorry|regret|disappointed|upset)\b/.test(lower)) {
    return 'sad';
  }
  
  return 'neutral';
};

export const isFemaleVoice = (speakerName) => {
  const cacheKey = `female_${speakerName}`;
  if (genderCache.has(cacheKey)) {
    return genderCache.get(cacheKey);
  }
  const result = GENDER_CATEGORIES.FEMALE.includes(speakerName);
  genderCache.set(cacheKey, result);
  return result;
};

export const isMaleVoice = (speakerName) => {
  const cacheKey = `male_${speakerName}`;
  if (genderCache.has(cacheKey)) {
    return genderCache.get(cacheKey);
  }
  const result = GENDER_CATEGORIES.MALE.includes(speakerName);
  genderCache.set(cacheKey, result);
  return result;
};

export const getAllSpeakers = () => {
  if (allSpeakersCache) {
    return allSpeakersCache;
  }
  allSpeakersCache = [
    ...GENDER_CATEGORIES.FEMALE,
    ...GENDER_CATEGORIES.MALE,
    ...GENDER_CATEGORIES.NEUTRAL
  ].filter((v, i, a) => a.indexOf(v) === i);
  return allSpeakersCache;
};

export const isValidVoiceSettings = (settings) => {
  if (!settings || typeof settings !== 'object') return false;
  const { pitch, rate, volume } = settings;
  return (
    typeof pitch === 'number' && pitch >= 0.5 && pitch <= 2.0 &&
    typeof rate === 'number' && rate >= 0.1 && rate <= 10.0 &&
    (!volume || (typeof volume === 'number' && volume >= 0.0 && volume <= 1.0))
  );
};

export const clearCaches = () => {
  voiceCache.clear();
  themeCache.clear();
  genderCache.clear();
  allSpeakersCache = null;
  console.log('✅ All caches cleared');
};

// ==================== USAGE EXAMPLE ====================

/**
 * 📝 Usage trong TTS synthesis:
 * 
 * const text = "This is amazing!";
 * const speaker = "Sarah";
 * const emotion = analyzeTextEmotion(text);
 * const options = getSpeakerTTSOptions(speaker, emotion);
 * 
 * const utterance = new SpeechSynthesisUtterance(text);
 * utterance.pitch = options.pitch;
 * utterance.rate = options.rate;
 * utterance.volume = options.volume;
 * 
 * if (isQuestion(text)) {
 *   utterance.pitch *= 1.05; // Slightly raise pitch for questions
 * }
 * 
 * window.speechSynthesis.speak(utterance);
 * 
 * if (options.pauseAfter) {
 *   setTimeout(() => {
 *     // Next speech or action
 *   }, options.pauseAfter);
 * }
 */

export default {
  GENDER_CATEGORIES,
  VOICE_SETTINGS,
  EMOTION_ADJUSTMENTS,
  SPEAKER_THEMES,
  SPEAKER_ICONS,
  getSpeakerVoice,
  getSpeakerColor,
  getSpeakerIcon,
  getSpeakerTTSOptions,
  applyEmotionToVoice,
  processTextForNaturalSpeech,
  isQuestion,
  analyzeTextEmotion,
  isFemaleVoice,
  isMaleVoice,
  getAllSpeakers,
  isValidVoiceSettings,
  clearCaches
};

export const VOICE_CONFIG = {
  FEMALE_SPEAKERS: GENDER_CATEGORIES.FEMALE,
  MALE_SPEAKERS: GENDER_CATEGORIES.MALE,
  SPEAKER_CONFIG: VOICE_SETTINGS
};

export const SPEAKER_STYLES = Object.fromEntries(
  Object.entries(SPEAKER_THEMES).map(([name, theme]) => [
    name,
    `bg-gradient-to-br ${theme.gradient} border ${theme.border} ${theme.text}`
  ])
);
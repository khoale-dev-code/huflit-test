/**
 * Voice Configuration Module
 * Quản lý cấu hình giọng nói, màu sắc và biểu tượng cho speakers
 */

// ==================== VOICE SETTINGS ====================

/**
 * Danh sách speakers theo giới tính
 */
export const GENDER_CATEGORIES = {
  FEMALE: ['Woman', 'Sarah', 'Anna', 'Client 2', 'Sales Associate', 'Older Woman', 
           'Student B', 'Student 2', 'Counselor', 'Emma', 'Lisa', 'Dr. Chen'],
  MALE: ['Man', 'Mark', 'Ben', 'Client 1', 'Professor', 'John', 'Mike', 'Waiter', 
         'Customer', 'Manager', 'HR Rep', 'Interviewer 1', 'Interviewer 2', 
         'Candidate', 'Professor A', 'Student 1', 'Student', 'Parent', 
         'Travel Agent', 'Narrator', 'Smith', 'Tom'],
  NEUTRAL: ['Narrator', 'System', 'AI Assistant']
};

/**
 * Cấu hình giọng nói chi tiết cho từng speaker
 * pitch: cao độ giọng (0.5 - 2.0, default: 1.0)
 * rate: tốc độ nói (0.1 - 10.0, default: 1.0)
 * volume: âm lượng (0.0 - 1.0, default: 1.0)
 */
export const VOICE_SETTINGS = {
  // Professional Speakers
 Mark: { 
    pitch: 0.65, 
    rate: 1.55, 
    volume: 0.55, 
    voice_name: "standard_male_1", 
    timbre_modifier: "warm" // Hoặc một modifier nào đó
},
 Emma: { 
      pitch: 1.35, 
      rate: 0.75, 
      volume: 1.0,
      break_after: 0.8, // Dừng lâu hơn
      style: "calm"
    },
  Sarah: { pitch: 1.32, rate: 0.85, volume: 1.0,style: "cheerful" },
  Mike: { pitch: 0.89, rate: 1.05, volume: 1.0,style: "friendly" },
  John: { pitch: 0.95, rate: 1.1, volume: 1.0, style: "serious",break_after: 1.0,delay_before: 0.5   },
  Ben: { pitch: 0.72, rate: 1.0, volume: 1.0, style: "confident" },
  Smith: { pitch: 0.72, rate: 1.0, volume: 1.0, style: "authoritative" },
  Anna: { pitch: 1.45, rate: 0.75, volume: 1.0, style: "enthusiastic" },
  Lisa: { pitch: 1.55, rate: 0.25, volume: 1.0, style: "soothing" },
  
  // Academic Speakers
  Professor: { pitch: 0.58, rate: 0.85, volume: 1.0 },
  'Professor A': { pitch: 0.28, rate: 0.87, volume: 1.0 },
  Student: { pitch: 1.1, rate: 0.95, volume: 1.0 },
  'Student 1': { pitch: 1.05, rate: 0.95, volume: 1.0 },
  'Student 2': { pitch: 1.18, rate: 0.92, volume: 1.0 },
  'Student B': { pitch: 1.12, rate: 0.93, volume: 1.0 },
  
  // Service Industry
  Waiter: { pitch: 0.58, rate: 0.78, volume: 1.0, style: "polite" },
  'Sales Associate': { pitch: 1.22, rate: 0.98, volume: 1.0 },
  Customer: { pitch: 1.85, rate: 0.92, volume: 1.0 },
  
  // Professional Roles
  Manager: { pitch: 0.82, rate: 0.88, volume: 1.0 },
  'HR Rep': { pitch: 0.58, rate: 0.90, volume: 1.0 },
  'Interviewer 1': { pitch: 0.83, rate: 0.90, volume: 1.0 },
  'Interviewer 2': { pitch: 0.90, rate: 0.92, volume: 1.0 },
  Candidate: { pitch: 1.0, rate: 0.94, volume: 1.0 },
  
  // Special Characters
  'Older Woman': { pitch: 1.5, rate: 0.85, volume: 0.95 },
  Counselor: { pitch: 1.10, rate: 0.88, volume: 1.0 },
  'Travel Agent': { pitch: 0.87, rate: 0.95, volume: 1.0 },
  'Client 1': { pitch: 0.84, rate: 0.93, volume: 1.0 },
  'Client 2': { pitch: 1.16, rate: 0.91, volume: 1.0 },
  Parent: { pitch: 0.86, rate: 0.89, volume: 1.0 },
  
  // Narrator
  Narrator: { pitch: 1.0, rate: 0.9, volume: 1.0 },
  
  // Default fallback
  default: { pitch: 1.0, rate: 0.9, volume: 1.0 }
};

// ==================== VISUAL STYLES ====================

/**
 * Color themes cho từng speaker
 * Sử dụng Tailwind CSS gradient classes
 */
export const SPEAKER_THEMES = {
  // Blue tones - Professional males
  Mark: {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-900',
    shadow: 'shadow-blue-200'
  },
  
  // Pink/Rose tones - Professional females
  Sarah: {
    gradient: 'from-pink-50 to-rose-100',
    border: 'border-pink-400',
    text: 'text-pink-900',
    shadow: 'shadow-pink-200'
  },
  Anna: {
    gradient: 'from-pink-50 to-rose-100',
    border: 'border-pink-400',
    text: 'text-pink-900',
    shadow: 'shadow-pink-200'
  },
  
  // Green tones
  Mike: {
    gradient: 'from-green-50 to-emerald-100',
    border: 'border-green-400',
    text: 'text-green-900',
    shadow: 'shadow-green-200'
  },
  'Client 1': {
    gradient: 'from-emerald-50 to-emerald-100',
    border: 'border-emerald-400',
    text: 'text-emerald-900',
    shadow: 'shadow-emerald-200'
  },
  'Student 2': {
    gradient: 'from-emerald-50 to-emerald-100',
    border: 'border-emerald-400',
    text: 'text-emerald-900',
    shadow: 'shadow-emerald-200'
  },
  
  // Purple/Violet tones
  John: {
    gradient: 'from-purple-50 to-violet-100',
    border: 'border-purple-400',
    text: 'text-purple-900',
    shadow: 'shadow-purple-200'
  },
  Counselor: {
    gradient: 'from-purple-50 to-violet-100',
    border: 'border-purple-400',
    text: 'text-purple-900',
    shadow: 'shadow-purple-200'
  },
  'HR Rep': {
    gradient: 'from-violet-50 to-violet-100',
    border: 'border-violet-400',
    text: 'text-violet-900',
    shadow: 'shadow-violet-200'
  },
  
  // Yellow/Amber tones
  Waiter: {
    gradient: 'from-yellow-50 to-amber-100',
    border: 'border-yellow-400',
    text: 'text-yellow-900',
    shadow: 'shadow-yellow-200'
  },
  'Client 2': {
    gradient: 'from-amber-50 to-amber-100',
    border: 'border-amber-400',
    text: 'text-amber-900',
    shadow: 'shadow-amber-200'
  },
  
  // Orange tones
  'Older Woman': {
    gradient: 'from-orange-50 to-orange-100',
    border: 'border-orange-400',
    text: 'text-orange-900',
    shadow: 'shadow-orange-200'
  },
  
  // Indigo tones - Academic
  Professor: {
    gradient: 'from-indigo-50 to-indigo-100',
    border: 'border-indigo-400',
    text: 'text-indigo-900',
    shadow: 'shadow-indigo-200'
  },
  'Professor A': {
    gradient: 'from-indigo-50 to-indigo-100',
    border: 'border-indigo-400',
    text: 'text-indigo-900',
    shadow: 'shadow-indigo-200'
  },
  
  // Teal/Cyan tones
  Customer: {
    gradient: 'from-teal-50 to-teal-100',
    border: 'border-teal-400',
    text: 'text-teal-900',
    shadow: 'shadow-teal-200'
  },
  'Student 1': {
    gradient: 'from-teal-50 to-teal-100',
    border: 'border-teal-400',
    text: 'text-teal-900',
    shadow: 'shadow-teal-200'
  },
  'Travel Agent': {
    gradient: 'from-cyan-50 to-cyan-100',
    border: 'border-cyan-400',
    text: 'text-cyan-900',
    shadow: 'shadow-cyan-200'
  },
  'Student B': {
    gradient: 'from-cyan-50 to-cyan-100',
    border: 'border-cyan-400',
    text: 'text-cyan-900',
    shadow: 'shadow-cyan-200'
  },
  
  // Rose tones
  'Sales Associate': {
    gradient: 'from-rose-50 to-rose-100',
    border: 'border-rose-400',
    text: 'text-rose-900',
    shadow: 'shadow-rose-200'
  },
  
  // Slate/Gray tones
  Manager: {
    gradient: 'from-slate-50 to-slate-100',
    border: 'border-slate-400',
    text: 'text-slate-900',
    shadow: 'shadow-slate-200'
  },
  Narrator: {
    gradient: 'from-gray-50 to-gray-100',
    border: 'border-gray-400',
    text: 'text-gray-900',
    shadow: 'shadow-gray-200'
  },
  
  // Sky/Lime tones
  'Interviewer 1': {
    gradient: 'from-sky-50 to-sky-100',
    border: 'border-sky-400',
    text: 'text-sky-900',
    shadow: 'shadow-sky-200'
  },
  'Interviewer 2': {
    gradient: 'from-lime-50 to-lime-100',
    border: 'border-lime-400',
    text: 'text-lime-900',
    shadow: 'shadow-lime-200'
  },
  
  // Fuchsia tones
  Candidate: {
    gradient: 'from-fuchsia-50 to-fuchsia-100',
    border: 'border-fuchsia-400',
    text: 'text-fuchsia-900',
    shadow: 'shadow-fuchsia-200'
  }
};

/**
 * Icon emoji cho từng speaker
 */
export const SPEAKER_ICONS = {
  // Professional
  'Travel Agent': '✈️',
  'Client 1': '👨‍💼',
  'Client 2': '👩‍💼',
  Manager: '💼',
  'HR Rep': '👔',
  'Interviewer 1': '💼',
  'Interviewer 2': '💼',
  Candidate: '📝',
  
  // Academic
  Professor: '👨‍🏫',
  'Professor A': '👨‍🏫',
  'Student 1': '🧑‍🎓',
  'Student 2': '👩‍🎓',
  'Student B': '🧑‍🎓',
  Student: '🧑‍🎓',
  
  // Service
  Waiter: '👨‍🍳',
  Customer: '🛒',
  'Sales Associate': '🛍️',
  
  // Healthcare/Counseling
  Counselor: '🧑‍⚕️',
  
  // General
  Mark: '🧑‍🔬',
  Sarah: '👩',
  Anna: '👩',
  Ben: '👨',
  Mike: '👨',
  John: '👨',
  Tom: '🧑‍🎓',
  Emma: '👩',
  Lisa: '👩',
  'Older Woman': '👵',
  Parent: '👪',
  
  // Special
  Narrator: '📖',
  
  // Default
  default: '👤'
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Lấy voice settings cho speaker
 * @param {string} speakerName - Tên speaker
 * @returns {Object} Voice settings
 */
export const getVoiceSettings = (speakerName) => {
  return VOICE_SETTINGS[speakerName] || VOICE_SETTINGS.default;
};

/**
 * Lấy theme style cho speaker (string format cho className)
 * @param {string} speakerName - Tên speaker
 * @returns {string} Tailwind CSS classes
 */
export const getSpeakerStyle = (speakerName) => {
  const theme = SPEAKER_THEMES[speakerName];
  if (!theme) {
    return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-400 text-gray-900';
  }
  return `bg-gradient-to-br ${theme.gradient} ${theme.border} ${theme.text}`;
};

/**
 * Lấy theme object cho speaker (object format cho styling động)
 * @param {string} speakerName - Tên speaker
 * @returns {Object} Theme object
 */
export const getSpeakerTheme = (speakerName) => {
  return SPEAKER_THEMES[speakerName] || {
    gradient: 'from-gray-50 to-gray-100',
    border: 'border-gray-400',
    text: 'text-gray-900',
    shadow: 'shadow-gray-200'
  };
};

/**
 * Lấy icon cho speaker
 * @param {string} speakerName - Tên speaker
 * @returns {string} Emoji icon
 */
export const getSpeakerIcon = (speakerName) => {
  return SPEAKER_ICONS[speakerName] || SPEAKER_ICONS.default;
};

/**
 * Kiểm tra speaker có phải là nữ
 * @param {string} speakerName - Tên speaker
 * @returns {boolean}
 */
export const isFemaleVoice = (speakerName) => {
  return GENDER_CATEGORIES.FEMALE.includes(speakerName);
};

/**
 * Kiểm tra speaker có phải là nam
 * @param {string} speakerName - Tên speaker
 * @returns {boolean}
 */
export const isMaleVoice = (speakerName) => {
  return GENDER_CATEGORIES.MALE.includes(speakerName);
};

/**
 * Lấy tất cả speakers
 * @returns {Array<string>}
 */
export const getAllSpeakers = () => {
  return [
    ...GENDER_CATEGORIES.FEMALE,
    ...GENDER_CATEGORIES.MALE,
    ...GENDER_CATEGORIES.NEUTRAL
  ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
};

/**
 * Validate voice settings
 * @param {Object} settings - Voice settings object
 * @returns {boolean}
 */
export const isValidVoiceSettings = (settings) => {
  if (!settings || typeof settings !== 'object') return false;
  
  const { pitch, rate, volume } = settings;
  
  return (
    pitch >= 0.5 && pitch <= 2.0 &&
    rate >= 0.1 && rate <= 10.0 &&
    (!volume || (volume >= 0.0 && volume <= 1.0))
  );
};

/**
 * Tạo speaker configuration mới
 * @param {string} name - Tên speaker
 * @param {Object} config - Configuration object
 * @returns {Object} Complete speaker config
 */
export const createSpeakerConfig = (name, config = {}) => {
  return {
    name,
    voice: config.voice || VOICE_SETTINGS.default,
    theme: config.theme || getSpeakerTheme(name),
    icon: config.icon || getSpeakerIcon(name),
    gender: config.gender || 'neutral'
  };
};

// ==================== LEGACY SUPPORT ====================

/**
 * Backward compatibility với code cũ
 */
export const VOICE_CONFIG = {
  FEMALE_SPEAKERS: GENDER_CATEGORIES.FEMALE,
  MALE_SPEAKERS: GENDER_CATEGORIES.MALE,
  SPEAKER_CONFIG: VOICE_SETTINGS
};

export const SPEAKER_STYLES = Object.fromEntries(
  Object.entries(SPEAKER_THEMES).map(([name, theme]) => [
    name,
    `bg-gradient-to-br ${theme.gradient} ${theme.border} ${theme.text}`
  ])
);

// ==================== EXPORT DEFAULT ====================

export default {
  GENDER_CATEGORIES,
  VOICE_SETTINGS,
  SPEAKER_THEMES,
  SPEAKER_ICONS,
  getVoiceSettings,
  getSpeakerStyle,
  getSpeakerTheme,
  getSpeakerIcon,
  isFemaleVoice,
  isMaleVoice,
  getAllSpeakers,
  isValidVoiceSettings,
  createSpeakerConfig,
  // Legacy
  VOICE_CONFIG,
  SPEAKER_STYLES
};
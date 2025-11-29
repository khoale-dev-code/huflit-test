// ==================== ENHANCED VOICE CONFIGURATION ====================

export const GENDER_CATEGORIES = {
  FEMALE: ['Woman', 'Sarah', 'Anna','Linda', 'Client 2', 'Sales Associate', 'Older Woman', 
           'Student B', 'Student 2', 'Counselor', 'Emma','Trang','Jennifer' ,'Lisa', 'Doctor Chen'],
  MALE: ['Man','Kevin', 'Mark', 'Dr.Chen','Ben', 'Client 1', 'Professor', 'John', 'Mike', 'Waiter', 
         'Customer', 'Manager', 'HR Rep', 'Interviewer 1', 'Interviewer 2', 
         'Candidate', 'Professor A', 'Student 1', 'Student', 'Parent', 
         'Travel Agent', 'Narrator','Dr. Harrison', 'Smith', 'Tom','Peter','Alex','Training','HR','Professor Mitchell',],
  NEUTRAL: ['Narrator', 'System', 'AI Assistant']
};

/**
 * Enhanced voice settings với emotional tones và speech patterns
 */
export const ENHANCED_VOICE_SETTINGS = {
  // Professional Males - điều chỉnh để tự nhiên hơn
  Mark: { 
    pitch: 0.69,
    rate: 1.0,
    volume: 0.85,
    style: "professional",
    emotion: "confident",
    speechPattern: "articulate",
    pauseFrequency: "medium",
    emphasis: "moderate",
    voice_name: "standard_male_1",
    timbre_modifier: "warm"
  },   
  Alex: { 
    pitch: 0.69,
    rate: 1.0,
    volume: 0.85,
    style: "professional",
    emotion: "confident",
    speechPattern: "articulate",
    pauseFrequency: "medium",
    emphasis: "moderate",
    voice_name: "standard_male_1",
    timbre_modifier: "warm"
  }, 
  HR: { 
    pitch: 0.32,
    rate: 1.0,
    volume: 0.85,
    style: "professional",
    emotion: "confident",
    speechPattern: "articulate",
    pauseFrequency: "medium",
    emphasis: "moderate",
    voice_name: "standard_male_1",
    timbre_modifier: "warm"
  }, 
  Training: { 
    pitch: 0.79,
    rate: 1.0,
    volume: 0.85,
    style: "professional",
    emotion: "confident",
    speechPattern: "articulate",
    pauseFrequency: "medium",
    emphasis: "moderate",
    voice_name: "standard_male_1",
    timbre_modifier: "warm"
  }, 
  Tom: { 
    pitch: 0.66,
    rate: 1.0,
    volume: 0.55,
    style: "professional",
    emotion: "confident",
    speechPattern: "articulate",
    pauseFrequency: "medium",
    emphasis: "moderate",
    voice_name: "standard_male_1",
    timbre_modifier: "warm"
  }, 
  Peter: { 
    pitch: 0.69,
    rate: 0.33,
    volume: 0.95,
    style: "professional",
    emotion: "confident",
    speechPattern: "articulate",
    pauseFrequency: "low",
    emphasis: "appropriate",
    voice_name: "deep",
    timbre_modifier: "warm"
  }, 
  Kevin: { 
    pitch: 0.59,
    rate: 1.0,
    volume: 0.85,
    style: "professional",
    emotion: "confident",
    speechPattern: "articulate",
    pauseFrequency: "medium",
    emphasis: "moderate",
    voice_name: "standard_male_1",
    timbre_modifier: "warm"
  },
  
  John: { 
    pitch: 0.75,
    rate: 1.1,
    volume: 0.9,
    style: "serious",
    emotion: "authoritative",
    speechPattern: "deliberate",
    pauseFrequency: "high",
    emphasis: "strong",
    break_after: 1.0,
    delay_before: 0.5
  },

  Ben: { 
    pitch: 1.002,
    rate: 0.35,
    volume: 1.30,
    pauseFrequency: "low",
    emotional: "friendly",
    style: "approachable",},

'Doctor Chen': { 
    pitch: 1.22,
    rate: 0.3,
    volume: 0.79,
    style: "professional",
    emotion: "caring",
    speechPattern: "measured",
    pauseFrequency: "medium",
    emphasis: "clear"
  },
  'Professor Mitchell': { 
    pitch: 1.0,
    rate: 0.88,
    volume: 0.89,
    style: "professional",
    emotion: "caring",
    speechPattern: "measured",
    pauseFrequency: "medium",
    emphasis: "clear"
  },  
  'Dr. Harrison': { 
    pitch: 1.32,
    rate: 0.88,
    volume: 0.89,
    style: "professional",
    emotion: "caring",
    speechPattern: "measured",
    pauseFrequency: "medium",
    emphasis: "clear"
  },

  Mike: { 
    pitch: 0.38,
    rate: 1.05,
    volume: 0.87,
    style: "friendly",
    emotion: "approachable",
    speechPattern: "conversational",
    pauseFrequency: "low",
    emphasis: "natural"
  },

  // Professional Females - thêm sắc thái
  Sarah: { 
    pitch: 1.25,
    rate: 0.55,
    volume: 0.68,
    style: "cheerful",
    emotion: "friendly",
    speechPattern: "flowing",
    pauseFrequency: "low",
    emphasis: "light"
  },
  Trang: { 
    pitch: 1.35,
    rate: 0.65,
    volume: 0.88,
    style: "cheerful",
    emotion: "friendly",
    speechPattern: "flowing",
    pauseFrequency: "sarcastic",
    emphasis: "light"
  },

  Emma: { 
    pitch: 1.35,
    rate: 0.85,
    volume: 0.92,
    style: "calm",
    emotion: "reassuring",
    speechPattern: "measured",
    pauseFrequency: "medium",
    emphasis: "subtle",
    break_after: 0.8
  }, 
  Jennifer: { 
    pitch: 1.35,
    rate: 0.85,
    volume: 0.92,
    style: "calm",
    emotion: "reassuring",
    speechPattern: "measured",
    pauseFrequency: "medium",
    emphasis: "subtle",
    break_after: 0.8
  },

  Anna: { 
    pitch: 1.42,
    rate: 0.88,
    volume: 0.9,
    style: "enthusiastic",
    emotion: "energetic",
    speechPattern: "expressive",
    pauseFrequency: "low",
    emphasis: "dynamic"
  },
  Linda: { 
    pitch: 1.42,
    rate: 0.88,
    volume: 0.9,
    style: "enthusiastic",
    emotion: "energetic",
    speechPattern: "expressive",
    pauseFrequency: "low",
    emphasis: "dynamic"
  },

  Lisa: { 
    pitch: 1.38,
    rate: 0.82,
    volume: 0.85,
    style: "soothing",
    emotion: "compassionate",
    speechPattern: "gentle",
    pauseFrequency: "high",
    emphasis: "soft"
  },

  // Academic Characters
  Professor: { 
    pitch: 0.98,
    rate: 0.88,
    volume: 0.87,
    style: "lecturing",
    emotion: "knowledgeable",
    speechPattern: "rhythmic",
    pauseFrequency: "high",
    emphasis: "academic"
  },

  'Professor A': { 
    pitch: 0.92,
    rate: 0.05,
    volume: 1.85,
    style: "authoritative",
    emotion: "wise",
    speechPattern: "deliberate",
    pauseFrequency: "high",
    emphasis: "emphatic"
  },

  'Student 1': { 
    pitch: 1.15,
    rate: 1.05,
    volume: 0.82,
    style: "youthful",
    emotion: "enthusiastic",
    speechPattern: "energetic",
    pauseFrequency: "low",
    emphasis: "expressive"
  },

  'Student 2': { 
    pitch: 1.18,
    rate: 1.02,
    volume: 0.84,
    style: "curious",
    emotion: "inquisitive",
    speechPattern: "questioning",
    pauseFrequency: "medium",
    emphasis: "rising"
  },

  Student: { 
    pitch: 1.12,
    rate: 1.08,
    volume: 0.83,
    style: "youthful",
    emotion: "eager",
    speechPattern: "quick",
    pauseFrequency: "low",
    emphasis: "varied"
  },

  // Service Industry với tính cách
  Waiter: { 
    pitch: 1.08,
    rate: 0.92,
    volume: 0.85,
    style: "polite",
    emotion: "accommodating",
    speechPattern: "courteous",
    pauseFrequency: "medium",
    emphasis: "gentle"
  },

  'Sales Associate': { 
    pitch: 1.28,
    rate: 1.02,
    volume: 0.9,
    style: "persuasive",
    emotion: "helpful",
    speechPattern: "engaging",
    pauseFrequency: "low",
    emphasis: "convincing"
  },

  Customer: { 
    pitch: 1.05,
    rate: 1.1,
    volume: 0.88,
    style: "demanding",
    emotion: "expectant",
    speechPattern: "direct",
    pauseFrequency: "medium",
    emphasis: "strong"
  },

  // Professional Roles
  Manager: { 
    pitch: 0.62,
    rate: 0.65,
    volume: 1.58,
    style: "directive",
    emotion: "decisive",
    speechPattern: "commanding",
    pauseFrequency: "medium",
    emphasis: "clear"
  },

  'HR Rep': { 
    pitch: 1.0,
    rate: 0.9,
    volume: 0.86,
    style: "professional",
    emotion: "neutral",
    speechPattern: "formal",
    pauseFrequency: "medium",
    emphasis: "precise"
  },

  'Interviewer 1': { 
    pitch: 0.95,
    rate: 0.92,
    volume: 0.87,
    style: "assessing",
    emotion: "analytical",
    speechPattern: "probing",
    pauseFrequency: "high",
    emphasis: "intentional"
  },

  'Interviewer 2': { 
    pitch: 1.02,
    rate: 0.95,
    volume: 0.85,
    style: "friendly",
    emotion: "welcoming",
    speechPattern: "conversational",
    pauseFrequency: "medium",
    emphasis: "warm"
  },

  Candidate: { 
    pitch: 1.08,
    rate: 1.02,
    volume: 0.84,
    style: "nervous",
    emotion: "anxious",
    speechPattern: "cautious",
    pauseFrequency: "high",
    emphasis: "measured"
  },

  // Emotional Range cho các tình huống
  Counselor: { 
    pitch: 1.12,
    rate: 0.78,
    volume: 0.8,
    style: "soothing",
    emotion: "empathetic",
    speechPattern: "comforting",
    pauseFrequency: "high",
    emphasis: "soft"
  },

  // Special Characters với đặc điểm riêng
  'Older Woman': { 
    pitch: 1.25,
    rate: 0.75,
    volume: 0.78,
    style: "wise",
    emotion: "experienced",
    speechPattern: "deliberate",
    pauseFrequency: "high",
    emphasis: "meaningful"
  },

  Parent: { 
    pitch: 1.05,
    rate: 0.88,
    volume: 0.85,
    style: "caring",
    emotion: "concerned",
    speechPattern: "gentle",
    pauseFrequency: "medium",
    emphasis: "reassuring"
  },

  'Travel Agent': { 
    pitch: 1.15,
    rate: 0.95,
    volume: 0.87,
    style: "helpful",
    emotion: "accommodating",
    speechPattern: "informative",
    pauseFrequency: "medium",
    emphasis: "clear"
  },

  'Client 1': { 
    pitch: 0.96,
    rate: 0.98,
    volume: 0.86,
    style: "business",
    emotion: "professional",
    speechPattern: "direct",
    pauseFrequency: "medium",
    emphasis: "focused"
  },

  'Client 2': { 
    pitch: 1.22,
    rate: 0.94,
    volume: 0.89,
    style: "detail-oriented",
    emotion: "particular",
    speechPattern: "precise",
    pauseFrequency: "medium",
    emphasis: "specific"
  },

  // Narrator với nhiều sắc thái
  Narrator: { 
    pitch: 1.0,
    rate: 0.9,
    volume: 0.9,
    style: "neutral",
    emotion: "balanced",
    speechPattern: "consistent",
    pauseFrequency: "medium",
    emphasis: "standard"
  },

  // Default fallback với tính cách
  default: { 
    pitch: 1.0,
    rate: 1.0,
    volume: 0.85,
    style: "neutral",
    emotion: "neutral",
    speechPattern: "standard",
    pauseFrequency: "medium",
    emphasis: "normal"
  }
};

// Kế thừa cho tương thích ngược
export const VOICE_SETTINGS = ENHANCED_VOICE_SETTINGS;

// ==================== CONVERSATION DYNAMICS ====================

/**
 * Cấu hình tương tác giữa các nhân vật
 */
export const CONVERSATION_DYNAMICS = {
  // Emotional arcs trong hội thoại
  EMOTIONAL_RANGE: {
    neutral: { pitchVariation: 0.0, rateVariation: 0.0, volumeVariation: 0.0 },
    excited: { pitchVariation: 0.15, rateVariation: 0.25, volumeVariation: 0.1 },
    angry: { pitchVariation: -0.1, rateVariation: 0.3, volumeVariation: 0.15 },
    sad: { pitchVariation: -0.08, rateVariation: -0.2, volumeVariation: -0.1 },
    happy: { pitchVariation: 0.12, rateVariation: 0.15, volumeVariation: 0.05 },
    nervous: { pitchVariation: 0.08, rateVariation: 0.2, volumeVariation: -0.05 },
    confident: { pitchVariation: -0.05, rateVariation: -0.1, volumeVariation: 0.08 }
  },

  // Speech patterns đặc trưng
  SPEECH_PATTERNS: {
    articulate: { pauseLength: 0.3, wordSpacing: 1.0, sentencePause: 0.8 },
    flowing: { pauseLength: 0.1, wordSpacing: 0.8, sentencePause: 0.5 },
    deliberate: { pauseLength: 0.5, wordSpacing: 1.2, sentencePause: 1.2 },
    energetic: { pauseLength: 0.15, wordSpacing: 0.7, sentencePause: 0.4 },
    comforting: { pauseLength: 0.4, wordSpacing: 1.1, sentencePause: 1.0 },
    commanding: { pauseLength: 0.35, wordSpacing: 1.1, sentencePause: 0.9 },
    conversational: { pauseLength: 0.2, wordSpacing: 0.9, sentencePause: 0.6 }
  },

  // Character relationships ảnh hưởng đến tone
  RELATIONSHIP_TONES: {
    formal: { pitchModifier: -0.05, rateModifier: -0.1, volumeModifier: -0.03 },
    casual: { pitchModifier: 0.08, rateModifier: 0.05, volumeModifier: 0.02 },
    respectful: { pitchModifier: -0.03, rateModifier: -0.05, volumeModifier: -0.02 },
    friendly: { pitchModifier: 0.1, rateModifier: 0.08, volumeModifier: 0.03 },
    authoritative: { pitchModifier: -0.08, rateModifier: -0.12, volumeModifier: 0.05 }
  },

  // Context modifiers cho các tình huống cụ thể
  CONTEXT_MODIFIERS: {
    question: { pitchVariation: 0.1, rateModifier: -0.05 },
    exclamation: { pitchVariation: 0.2, rateModifier: 0.1, volumeModifier: 0.1 },
    whisper: { pitchVariation: -0.1, volumeModifier: -0.5 },
    emphasis: { pitchVariation: 0.15, rateModifier: -0.1, volumeModifier: 0.08 }
  }
};

// ==================== VISUAL STYLES WITH EMOTIONAL VARIANTS ====================

/**
 * Enhanced color themes với emotional states
 */
export const ENHANCED_SPEAKER_THEMES = {
  // Blue tones - Professional males
  Mark: {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-900',
    shadow: 'shadow-blue-200',
    emotional: {
      excited: 'from-blue-100 to-blue-200 border-blue-500',
      angry: 'from-red-50 to-red-100 border-red-400',
      happy: 'from-blue-100 to-green-100 border-green-400'
    }
  },
    "Dr.Chen": {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-900',
    shadow: 'shadow-blue-200',
    emotional: {
      excited: 'from-blue-100 to-blue-200 border-blue-500',
      angry: 'from-red-50 to-red-100 border-red-400',
      happy: 'from-blue-100 to-green-100 border-green-400'
    }
  },

  
  // Pink/Rose tones - Professional females
  Sarah: {
    gradient: 'from-pink-50 to-rose-100',
    border: 'border-pink-400',
    text: 'text-pink-900',
    shadow: 'shadow-pink-200',
    emotional: {
      excited: 'from-pink-100 to-pink-200 border-pink-500',
      angry: 'from-red-100 to-orange-100 border-orange-400',
      happy: 'from-pink-100 to-yellow-100 border-yellow-400'
    }
  },

  Anna: {
    gradient: 'from-pink-50 to-rose-100',
    border: 'border-pink-400',
    text: 'text-pink-900',
    shadow: 'shadow-pink-200',
    emotional: {
      excited: 'from-rose-100 to-pink-200 border-rose-500',
      happy: 'from-pink-100 to-lime-100 border-lime-400'
    }
  },

  // Green tones
  Mike: {
    gradient: 'from-green-50 to-emerald-100',
    border: 'border-green-400',
    text: 'text-green-900',
    shadow: 'shadow-green-200',
    emotional: {
      excited: 'from-green-100 to-emerald-200 border-emerald-500',
      confident: 'from-emerald-100 to-teal-100 border-teal-400'
    }
  },

  'Client 1': {
    gradient: 'from-emerald-50 to-emerald-100',
    border: 'border-emerald-400',
    text: 'text-emerald-900',
    shadow: 'shadow-emerald-200',
    emotional: {
      serious: 'from-emerald-100 to-blue-100 border-blue-400',
      concerned: 'from-emerald-50 to-gray-100 border-gray-400'
    }
  },

  // Purple/Violet tones
  John: {
    gradient: 'from-purple-50 to-violet-100',
    border: 'border-purple-400',
    text: 'text-purple-900',
    shadow: 'shadow-purple-200',
    emotional: {
      authoritative: 'from-purple-100 to-indigo-100 border-indigo-400',
      angry: 'from-purple-100 to-red-100 border-red-400'
    }
  },

  Counselor: {
    gradient: 'from-purple-50 to-violet-100',
    border: 'border-purple-400',
    text: 'text-purple-900',
    shadow: 'shadow-purple-200',
    emotional: {
      comforting: 'from-violet-100 to-blue-100 border-blue-400',
      empathetic: 'from-purple-100 to-pink-100 border-pink-400'
    }
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
  },

  // Emotional variants mặc định
  emotionalDefaults: {
    excited: { gradient: 'from-yellow-50 to-orange-100', border: 'border-orange-400' },
    angry: { gradient: 'from-red-50 to-red-100', border: 'border-red-400' },
    sad: { gradient: 'from-blue-50 to-blue-200', border: 'border-blue-400' },
    happy: { gradient: 'from-green-50 to-lime-100', border: 'border-lime-400' },
    nervous: { gradient: 'from-gray-50 to-gray-200', border: 'border-gray-400' },
    confident: { gradient: 'from-teal-50 to-cyan-100', border: 'border-cyan-400' }
  }
};

// Kế thừa cho tương thích ngược
export const SPEAKER_THEMES = ENHANCED_SPEAKER_THEMES;

/**
 * Icon emoji cho từng speaker - FIXED: Sử dụng string thay vì object
 */
export const SPEAKER_ICONS = {
  // ===== PROFESSIONAL / CORPORATE =====
  'Travel Agent': '✈️',
  'Client 1': '👨‍💼',
  'Client 2': '👩‍💼',
  Manager: '💼',
  'HR Rep': '👔',
  'Interviewer 1': '🎤',
  'Interviewer 2': '📋',
  Candidate: '📝',
  CEO: '👑',
  CFO: '💰',
  'Executive A': '🏢',
  'Executive B': '📊',
  
  // ===== ACADEMIC / RESEARCH =====
  Professor: '👨‍🏫',
  'Professor A': '👨‍🏫',
  'Professor Mitchell': '🔬',
  'Dr. Harrison': '🧬',
  'Dr. Rodriguez': '🧠',
  'Dr. James Chen': '📐',
  'Dr. Martinez': '📈',
  'Dr. Patel': '🔍',
  'Dr. Elena Rodriguez': '🧬',
  'Dr. James Chen': '📊',
  'Dr. Margaret Whitmore': '📚',
  'Student 1': '🧑‍🎓',
  'Student 2': '👩‍🎓',
  'Student B': '🎓',
  Student: '📖',
  'Academic Presenter': '🎓',
  Researcher: '🔬',
  
  // ===== SERVICE / RETAIL =====
  Waiter: '👨‍🍳',
  Customer: '🛒',
  'Sales Associate': '🛍️',
  'Sales Representative': '💳',
  Bartender: '🍹',
  'Restaurant Staff': '🍽️',
  
  // ===== HEALTHCARE / COUNSELING =====
  Counselor: '🧑‍⚕️',
  'Doctor Chen': '👩‍⚕️',
  Doctor: '⚕️',
  Nurse: '🩺',
  Therapist: '🧘',
  'Health Professional': '💊',
  
  // ===== GOVERNMENT / INSTITUTIONAL =====
  'HR Director': '🏛️',
  HR: '🏢',
  Training: '🎓',
  Administrator: '📋',
  Officer: '🕵️',
  Official: '⚖️',
  
  // ===== BUSINESS / FINANCE =====
  'Marketing Director': '📢',
  'Business Owner': '🏪',
  Consultant: '💡',
  Analyst: '📊',
  Accountant: '💹',
  Entrepreneur: '🚀',
  
  // ===== MEDIA / JOURNALISM =====
  'Editor-in-Chief': '📰',
  Journalist: '📡',
  Presenter: '🎙️',
  
  // ===== GENERAL PEOPLE (Diverse) =====
  Mark: '🧑‍🔬',
  Sarah: '👩‍💻',
  Anna: '👩‍🎨',
  Ben: '👨',
  Alex: '🧑‍🏫',
  Mike: '👨‍💻',
  Kevin: '🧑‍🔧',
  John: '👨‍⚖️',
  Tom: '🧑‍🎓',
  Peter: '👨‍🎓',
  Emma: '👩‍🎤',
  Trang: '👩‍🌾',
  Lisa: '👩‍⚕️',
  Jennifer: '👩‍🏫',
  Linda: '👩‍💼',
  Jody: '👩‍💻',
  'Jody Annesly': '👩‍💼',
  Angela: '👩‍🎓',
  'Uncle Robertson': '👨‍🏫',
  Natalie: '👩‍💼',
  'Natalie Obi': '👩‍💼',
  
  // ===== FAMILY ROLES =====
  Mother: '👩',
  Father: '👨',
  Sister: '👧',
  Brother: '👦',
  Aunt: '👩‍🦰',
  Uncle: '👨‍🦱',
  Grandmother: '👵',
  Grandfather: '👴',
  'Older Woman': '👵',
  'Older Man': '👴',
  Parent: '👪',
  Family: '👨‍👩‍👧‍👦',
  Girlfriend: '💕',
  Boyfriend: '💍',
  
  // ===== SPECIAL ROLES =====
  Narrator: '📖',
  Speaker: '🎙️',
  Host: '🎬',
  Guest: '🎭',
  Participant: '👥',
  Team: '👨‍👩‍👦',
  Group: '👫',
  
  // ===== DIALOGUE PARTICIPANTS (Generic) =====
  'Person A': '🧑',
  'Person B': '👤',
  'Man': '👨',
  'Woman': '👩',
  
  // ===== DEFAULT =====
  default: '👤'
};
/**
 * Emotional icon variants - tách riêng để sử dụng khi cần
 */
export const EMOTIONAL_ICONS = {
  // Emotional variants cho các nhân vật chính
  Mark: {
    default: '🧑‍🔬',
    confident: '💪',
    professional: '👨‍💼',
    excited: '🚀'
  },
  Sarah: {
    default: '👩',
    cheerful: '😊',
    friendly: '👋',
    excited: '🌟'
  },
  // ... thêm emotional variants cho các nhân vật khác khi cần
};

// ==================== ENHANCED UTILITY FUNCTIONS ====================

/**
 * Lấy voice settings cho speaker
 */
export const getVoiceSettings = (speakerName) => {
  return ENHANCED_VOICE_SETTINGS[speakerName] || ENHANCED_VOICE_SETTINGS.default;
};

/**
 * Tính toán voice settings động dựa trên context
 */
export const getDynamicVoiceSettings = (speakerName, context = {}) => {
  const baseSettings = getVoiceSettings(speakerName);
  const dynamicSettings = { ...baseSettings };
  
  // Áp dụng emotional variation
  if (context.emotion && context.emotion !== 'neutral') {
    const emotionConfig = CONVERSATION_DYNAMICS.EMOTIONAL_RANGE[context.emotion];
    if (emotionConfig) {
      dynamicSettings.pitch = Math.max(0.5, Math.min(2.0, 
        baseSettings.pitch * (1 + emotionConfig.pitchVariation)));
      dynamicSettings.rate = Math.max(0.1, Math.min(10.0, 
        baseSettings.rate * (1 + emotionConfig.rateVariation)));
      dynamicSettings.volume = Math.max(0.0, Math.min(1.0, 
        (baseSettings.volume || 0.85) + (emotionConfig.volumeVariation || 0)));
    }
  }

  // Áp dụng relationship tone
  if (context.relationship && context.relationship !== 'neutral') {
    const relationConfig = CONVERSATION_DYNAMICS.RELATIONSHIP_TONES[context.relationship];
    if (relationConfig) {
      dynamicSettings.pitch = Math.max(0.5, Math.min(2.0, 
        dynamicSettings.pitch + (relationConfig.pitchModifier || 0)));
      dynamicSettings.rate = Math.max(0.1, Math.min(10.0, 
        dynamicSettings.rate + (relationConfig.rateModifier || 0)));
      dynamicSettings.volume = Math.max(0.0, Math.min(1.0, 
        dynamicSettings.volume + (relationConfig.volumeModifier || 0)));
    }
  }

  // Áp dụng context modifiers
  if (context.modifier) {
    const modifierConfig = CONVERSATION_DYNAMICS.CONTEXT_MODIFIERS[context.modifier];
    if (modifierConfig) {
      dynamicSettings.pitch = Math.max(0.5, Math.min(2.0, 
        dynamicSettings.pitch + (modifierConfig.pitchVariation || 0)));
      dynamicSettings.rate = Math.max(0.1, Math.min(10.0, 
        dynamicSettings.rate + (modifierConfig.rateModifier || 0)));
      dynamicSettings.volume = Math.max(0.0, Math.min(1.0, 
        dynamicSettings.volume + (modifierConfig.volumeModifier || 0)));
    }
  }

  // Áp dụng speech pattern settings
  if (baseSettings.speechPattern && !context.suppressPattern) {
    const patternConfig = CONVERSATION_DYNAMICS.SPEECH_PATTERNS[baseSettings.speechPattern];
    if (patternConfig) {
      dynamicSettings.pauseLength = patternConfig.pauseLength;
      dynamicSettings.wordSpacing = patternConfig.wordSpacing;
      dynamicSettings.sentencePause = patternConfig.sentencePause;
    }
  }

  return dynamicSettings;
};

/**
 * Phân tích text để tự động detect emotion và context
 */
export const analyzeTextEmotion = (text) => {
  const lowerText = text.toLowerCase().trim();
  
  // Emotion detection based on keywords và punctuation
  const excitementWords = /\b(wow|amazing|great|excellent|fantastic|perfect|incredible)\b/;
  const happyWords = /\b(happy|glad|pleased|delighted|love|wonderful|nice|good)\b/;
  const angryWords = /\b(angry|mad|furious|hate|terrible|awful|horrible|annoying)\b/;
  const sadWords = /\b(sad|sorry|unfortunate|regret|disappointed|upset|cry)\b/;
  const nervousWords = /\b(nervous|anxious|worried|concerned|unsure|hesitant)\b/;
  const confidentWords = /\b(confident|certain|sure|definitely|absolutely|clear)\b/;
  
  // Check punctuation
  const hasExclamation = text.includes('!');
  const hasQuestion = text.includes('?');
  const hasEllipsis = text.includes('...');
  
  // Determine emotion
  if (excitementWords.test(lowerText) || (hasExclamation && lowerText.length < 30)) {
    return 'excited';
  }
  if (angryWords.test(lowerText)) {
    return 'angry';
  }
  if (sadWords.test(lowerText) || hasEllipsis) {
    return 'sad';
  }
  if (happyWords.test(lowerText)) {
    return 'happy';
  }
  if (nervousWords.test(lowerText) || (hasQuestion && lowerText.includes('maybe'))) {
    return 'nervous';
  }
  if (confidentWords.test(lowerText)) {
    return 'confident';
  }
  if (hasQuestion) {
    return 'inquisitive';
  }
  
  return 'neutral';
};

/**
 * Detect context modifiers từ text
 */
export const detectContextModifiers = (text) => {
  const lowerText = text.toLowerCase();
  
  if (text.endsWith('?') || lowerText.startsWith('what') || lowerText.startsWith('how') || 
      lowerText.startsWith('why') || lowerText.startsWith('when')) {
    return 'question';
  }
  
  if (text.endsWith('!') && text.length < 50) {
    return 'exclamation';
  }
  
  if (lowerText.includes('whisper') || lowerText.includes('quiet') || text.length < 20) {
    return 'whisper';
  }
  
  if (text.includes('**') || text.includes('*') || lowerText.includes('important')) {
    return 'emphasis';
  }
  
  return null;
};

/**
 * Tạo conversation context
 */
export const createConversationContext = (currentSpeaker, previousSpeaker, dialogueHistory = [], currentText = '') => {
  const context = {
    emotion: 'neutral',
    relationship: 'neutral',
    modifier: null,
    intensity: 'normal',
    suppressPattern: false
  };

  // Analyze current text for emotion và modifiers
  if (currentText) {
    context.emotion = analyzeTextEmotion(currentText);
    context.modifier = detectContextModifiers(currentText);
  }

  // Determine relationship based on speaker roles
  if (previousSpeaker) {
    const professionalRoles = ['Manager', 'HR Rep', 'Professor', 'Professor A', 'CEO'];
    const subordinateRoles = ['Student', 'Candidate', 'Employee', 'Intern'];
    const serviceRoles = ['Waiter', 'Sales Associate', 'Customer Service'];
    
    const isCurrentProfessional = professionalRoles.includes(currentSpeaker);
    const isPreviousProfessional = professionalRoles.includes(previousSpeaker);
    const isCurrentSubordinate = subordinateRoles.includes(currentSpeaker);
    const isPreviousSubordinate = subordinateRoles.includes(previousSpeaker);
    
    if ((isCurrentProfessional && isPreviousSubordinate) || 
        (isPreviousProfessional && isCurrentSubordinate)) {
      context.relationship = 'formal';
    } else if (serviceRoles.includes(currentSpeaker) || serviceRoles.includes(previousSpeaker)) {
      context.relationship = 'respectful';
    } else if (currentSpeaker === previousSpeaker) {
      context.relationship = 'casual';
    } else {
      context.relationship = 'friendly';
    }
  }

  // Analyze dialogue history for emotional context
  if (dialogueHistory.length > 0) {
    const recentEmotions = dialogueHistory
      .slice(-3)
      .map(d => analyzeTextEmotion(d.text))
      .filter(e => e !== 'neutral');
    
    if (recentEmotions.length > 0) {
      // Use the most frequent recent emotion
      const emotionCounts = recentEmotions.reduce((acc, emotion) => {
        acc[emotion] = (acc[emotion] || 0) + 1;
        return acc;
      }, {});
      
      const dominantEmotion = Object.keys(emotionCounts).reduce((a, b) => 
        emotionCounts[a] > emotionCounts[b] ? a : b
      );
      
      if (context.emotion === 'neutral') {
        context.emotion = dominantEmotion;
      }
    }
  }

  // Suppress pattern for very short sentences
  if (currentText && currentText.length < 10) {
    context.suppressPattern = true;
  }

  return context;
};

/**
 * Lấy theme style cho speaker với emotional state
 */
export const getSpeakerStyle = (speakerName, emotion = 'neutral') => {
  const theme = ENHANCED_SPEAKER_THEMES[speakerName];
  
  if (!theme) {
    const emotionalDefault = ENHANCED_SPEAKER_THEMES.emotionalDefaults[emotion];
    if (emotionalDefault && emotion !== 'neutral') {
      return `bg-gradient-to-br ${emotionalDefault.gradient} border ${emotionalDefault.border} text-gray-900`;
    }
    return 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-400 text-gray-900';
  }
  
  if (emotion !== 'neutral' && theme.emotional && theme.emotional[emotion]) {
    return `bg-gradient-to-br ${theme.emotional[emotion]} border ${theme.border} ${theme.text}`;
  }
  
  return `bg-gradient-to-br ${theme.gradient} border ${theme.border} ${theme.text}`;
};

/**
 * Lấy theme object cho speaker (object format cho styling động)
 */
export const getSpeakerTheme = (speakerName, emotion = 'neutral') => {
  const theme = ENHANCED_SPEAKER_THEMES[speakerName];
  
  if (!theme) {
    const emotionalDefault = ENHANCED_SPEAKER_THEMES.emotionalDefaults[emotion];
    if (emotionalDefault && emotion !== 'neutral') {
      return {
        gradient: emotionalDefault.gradient,
        border: emotionalDefault.border,
        text: 'text-gray-900',
        shadow: 'shadow-gray-200'
      };
    }
    return {
      gradient: 'from-gray-50 to-gray-100',
      border: 'border-gray-400',
      text: 'text-gray-900',
      shadow: 'shadow-gray-200'
    };
  }
  
  if (emotion !== 'neutral' && theme.emotional && theme.emotional[emotion]) {
    const emotionalStyle = theme.emotional[emotion];
    return {
      ...theme,
      gradient: emotionalStyle.split(' ')[0] + ' ' + emotionalStyle.split(' ')[1],
      border: emotionalStyle.split(' ')[3]
    };
  }
  
  return theme;
};

/**
 * Lấy icon cho speaker - FIXED: Luôn trả về string
 */
export const getSpeakerIcon = (speakerName, emotion = 'neutral') => {
  const baseIcon = SPEAKER_ICONS[speakerName] || SPEAKER_ICONS.default;
  
  // Nếu có emotional variant và emotion không phải neutral, thử lấy emotional icon
  if (emotion !== 'neutral' && EMOTIONAL_ICONS[speakerName] && EMOTIONAL_ICONS[speakerName][emotion]) {
    return EMOTIONAL_ICONS[speakerName][emotion];
  }
  
  return baseIcon;
};

/**
 * Kiểm tra speaker có phải là nữ
 */
export const isFemaleVoice = (speakerName) => {
  return GENDER_CATEGORIES.FEMALE.includes(speakerName);
};

/**
 * Kiểm tra speaker có phải là nam
 */
export const isMaleVoice = (speakerName) => {
  return GENDER_CATEGORIES.MALE.includes(speakerName);
};

/**
 * Lấy tất cả speakers
 */
export const getAllSpeakers = () => {
  return [
    ...GENDER_CATEGORIES.FEMALE,
    ...GENDER_CATEGORIES.MALE,
    ...GENDER_CATEGORIES.NEUTRAL
  ].filter((v, i, a) => a.indexOf(v) === i);
};

/**
 * Validate voice settings
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
 */
export const createSpeakerConfig = (name, config = {}) => {
  return {
    name,
    voice: config.voice || getVoiceSettings(name),
    theme: config.theme || getSpeakerTheme(name),
    icon: config.icon || getSpeakerIcon(name),
    gender: config.gender || (
      isFemaleVoice(name) ? 'female' :
      isMaleVoice(name) ? 'male' : 'neutral'
    )
  };
};

/**
 * Enhanced speech synthesis với emotional context
 */
export const speakWithEmotion = (speakerName, text, context = {}) => {
  const dynamicSettings = getDynamicVoiceSettings(speakerName, context);
  
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply basic settings
    utterance.pitch = dynamicSettings.pitch;
    utterance.rate = dynamicSettings.rate;
    utterance.volume = dynamicSettings.volume;
    
    // Try to find a suitable voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const preferredGender = isFemaleVoice(speakerName) ? 'female' : 
                            isMaleVoice(speakerName) ? 'male' : null;
      
      const suitableVoice = voices.find(voice => {
        if (preferredGender === 'female') {
          return voice.name.toLowerCase().includes('female') || 
                 voice.name.toLowerCase().includes('woman');
        } else if (preferredGender === 'male') {
          return voice.name.toLowerCase().includes('male') || 
                 voice.name.toLowerCase().includes('man');
        }
        return true;
      });
      
      if (suitableVoice) {
        utterance.voice = suitableVoice;
      }
    }
    
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    
    window.speechSynthesis.speak(utterance);
  });
};

// ==================== CONVERSATION MANAGER ====================

/**
 * Quản lý hội thoại với emotional context
 */
export class ConversationManager {
  constructor() {
    this.dialogueHistory = [];
    this.currentContext = {};
  }

  addDialogue(speaker, text) {
    const dialogue = {
      speaker,
      text,
      timestamp: Date.now(),
      emotion: analyzeTextEmotion(text),
      modifier: detectContextModifiers(text)
    };
    
    this.dialogueHistory.push(dialogue);
    return dialogue;
  }

  getConversationContext(currentSpeaker, currentText = '') {
    const previousDialogue = this.dialogueHistory[this.dialogueHistory.length - 1];
    const previousSpeaker = previousDialogue ? previousDialogue.speaker : null;
    
    return createConversationContext(
      currentSpeaker,
      previousSpeaker,
      this.dialogueHistory,
      currentText
    );
  }

  async speakDialogue(speaker, text) {
    const context = this.getConversationContext(speaker, text);
    const dialogue = this.addDialogue(speaker, text);
    
    await speakWithEmotion(speaker, text, context);
    return { dialogue, context };
  }

  clearHistory() {
    this.dialogueHistory = [];
    this.currentContext = {};
  }

  getHistory() {
    return [...this.dialogueHistory];
  }
}

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
    `bg-gradient-to-br ${theme.gradient} border ${theme.border} ${theme.text}`
  ])
);

// ==================== EXPORT DEFAULT ====================

export default {
  // Core configurations
  GENDER_CATEGORIES,
  VOICE_SETTINGS: ENHANCED_VOICE_SETTINGS,
  SPEAKER_THEMES: ENHANCED_SPEAKER_THEMES,
  SPEAKER_ICONS,
  EMOTIONAL_ICONS,
  
  // Dynamics and context
  CONVERSATION_DYNAMICS,
  
  // Core functions
  getVoiceSettings,
  getDynamicVoiceSettings,
  getSpeakerStyle,
  getSpeakerTheme,
  getSpeakerIcon,
  isFemaleVoice,
  isMaleVoice,
  getAllSpeakers,
  isValidVoiceSettings,
  createSpeakerConfig,
  
  // Enhanced functions
  analyzeTextEmotion,
  detectContextModifiers,
  createConversationContext,
  speakWithEmotion,
  
  // Conversation management
  ConversationManager,
  
  // Legacy
  VOICE_CONFIG,
  SPEAKER_STYLES
};
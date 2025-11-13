/**
 * Voice Expression System
 * Định nghĩa các tham số để làm nhấn nhá âm thanh
 */

export const VOICE_EMOTIONS = {
  NEUTRAL: {
    rate: 0.9,
    pitch: 1.0,
    volume: 0.9,
    label: 'Neutral',
    description: 'Normal speaking tone'
  },
  HAPPY: {
    rate: 1.1,
    pitch: 1.15,
    volume: 1.0,
    label: 'Happy',
    description: 'Cheerful, upbeat tone'
  },
  SAD: {
    rate: 0.75,
    pitch: 0.85,
    volume: 0.8,
    label: 'Sad',
    description: 'Slow, low tone'
  },
  ANGRY: {
    rate: 0.95,
    pitch: 1.25,
    volume: 1.0,
    label: 'Angry',
    description: 'Intense, high pitch'
  },
  EXCITED: {
    rate: 1.25,
    pitch: 1.3,
    volume: 1.0,
    label: 'Excited',
    description: 'Fast, energetic tone'
  },
  SERIOUS: {
    rate: 0.8,
    pitch: 0.9,
    volume: 0.95,
    label: 'Serious',
    description: 'Slow, formal tone'
  },
  CONFUSED: {
    rate: 0.85,
    pitch: 1.1,
    volume: 0.9,
    label: 'Confused',
    description: 'Questioning, slightly higher pitch'
  },
  WHISPER: {
    rate: 0.7,
    pitch: 0.95,
    volume: 0.6,
    label: 'Whisper',
    description: 'Soft, quiet tone'
  },
  LOUD: {
    rate: 0.9,
    pitch: 1.05,
    volume: 1.0,
    label: 'Loud',
    description: 'Prominent, confident tone'
  }
};

/**
 * Phát hiện emotion từ text (keyword matching)
 */
export const detectEmotionFromText = (text) => {
  const lowerText = text.toLowerCase();

  // Happy indicators
  if (/great|good|wonderful|excellent|amazing|fantastic|love|happy|joy|yes|hurray/i.test(lowerText)) {
    return VOICE_EMOTIONS.HAPPY;
  }

  // Angry indicators
  if (/angry|furious|mad|hate|terrible|awful|disgusting|unacceptable/i.test(lowerText)) {
    return VOICE_EMOTIONS.ANGRY;
  }

  // Excited indicators
  if (/wow|amazing|incredible|awesome|fantastic|thrilling|exciting|urgent/i.test(lowerText)) {
    return VOICE_EMOTIONS.EXCITED;
  }

  // Sad indicators
  if (/sad|depressed|unhappy|unfortunate|terrible|lost|pain|crying/i.test(lowerText)) {
    return VOICE_EMOTIONS.SAD;
  }

  // Serious indicators
  if (/important|critical|serious|must|required|essential|vital|urgent/i.test(lowerText)) {
    return VOICE_EMOTIONS.SERIOUS;
  }

  // Confused indicators
  if (/what\?|why\?|how\?|confused|unclear|not sure|question/i.test(lowerText)) {
    return VOICE_EMOTIONS.CONFUSED;
  }

  // Default
  return VOICE_EMOTIONS.NEUTRAL;
};

/**
 * Emphasis patterns - cách nhấn nhá text
 */
export const EMPHASIS_PATTERNS = {
  // Phát hiện chữ in hoa và tăng volume/pitch
  UPPERCASE: {
    test: (text) => /[A-Z]{2,}/.test(text),
    apply: (params) => ({
      ...params,
      pitch: params.pitch * 1.15,
      volume: Math.min(params.volume * 1.1, 1.0),
      rate: params.rate * 0.95
    }),
    label: 'Uppercase Emphasis'
  },

  // Phát hiện dấu chấm than và tăng pitch
  EXCLAMATION: {
    test: (text) => /!/.test(text),
    apply: (params) => ({
      ...params,
      pitch: params.pitch * 1.2,
      volume: Math.min(params.volume * 1.05, 1.0),
      rate: params.rate * 0.9
    }),
    label: 'Exclamation'
  },

  // Phát hiện dấu hỏi - tăng pitch cuối câu
  QUESTION: {
    test: (text) => /\?/.test(text),
    apply: (params) => ({
      ...params,
      pitch: params.pitch * 1.1,
      rate: params.rate * 0.95
    }),
    label: 'Question'
  },

  // Phát hiện dấu ba chấm - giảm speed
  ELLIPSIS: {
    test: (text) => /\.{2,}|…/.test(text),
    apply: (params) => ({
      ...params,
      rate: params.rate * 0.7,
      pitch: params.pitch * 0.9
    }),
    label: 'Ellipsis (pause)'
  },

  // Từ giữa dấu ngoặc - giảm volume (emphasis)
  PARENTHESIS: {
    test: (text) => /\([^)]+\)/.test(text),
    apply: (params) => ({
      ...params,
      volume: Math.max(params.volume * 0.85, 0.5),
      rate: params.rate * 1.05
    }),
    label: 'Parenthesis (softer)'
  },

  // Từ trong dấu ngoặc vuông - tăng volume
  BRACKET: {
    test: (text) => /\[[^\]]+\]/.test(text),
    apply: (params) => ({
      ...params,
      volume: Math.min(params.volume * 1.15, 1.0),
      pitch: params.pitch * 1.1
    }),
    label: 'Bracket (louder)'
  },

  // Từ có dấu gạch dưới hoặc ngôi sao - tăng pitch
  STRESS: {
    test: (text) => /_[\w\s]+_|\*[\w\s]+\*/.test(text),
    apply: (params) => ({
      ...params,
      pitch: params.pitch * 1.25,
      volume: Math.min(params.volume * 1.1, 1.0),
      rate: params.rate * 0.85
    }),
    label: 'Stress emphasis'
  }
};

/**
 * Pause patterns - cách chèn pause để nhấn nhá
 */
export const PAUSE_PATTERNS = {
  SHORT: 200,    // 200ms
  MEDIUM: 500,   // 500ms
  LONG: 1000,    // 1s
  VERY_LONG: 1500 // 1.5s
};

/**
 * Text transformation để tạo natural pauses
 */
export const addPausesToText = (text) => {
  return text
    // Thêm pause dài hơn sau period
    .replace(/\./g, '.\u0020')
    // Thêm pause ngắn sau comma
    .replace(/,/g, ',\u0020')
    // Thêm pause vừa sau semicolon
    .replace(/;/g, ';\u0020')
    // Thêm pause dài sau question mark
    .replace(/\?/g, '?\u0020')
    // Thêm pause dài sau exclamation
    .replace(/!/g, '!\u0020');
};

/**
 * Stress modifier - nhấn nhá từ cụ thể
 * Sử dụng: "I *really* love this" -> "really" sẽ được nhấn nhá
 */
export const STRESS_MARKERS = {
  ASTERISK: /\*([^*]+)\*/g,      // *word*
  UNDERSCORE: /_([^_]+)_/g,       // _word_
  DOUBLE_CAPS: /\b([A-Z]{2,})\b/g // WORD
};

/**
 * Get final voice parameters sau khi áp dụng tất cả effects
 */
export const getFinalVoiceParams = (baseParams, text, emotionOverride = null) => {
  // 1. Start với base params
  let params = { ...baseParams };

  // 2. Áp dụng emotion detection (nếu không override)
  if (!emotionOverride) {
    const detectedEmotion = detectEmotionFromText(text);
    params = {
      rate: params.rate * (detectedEmotion.rate / VOICE_EMOTIONS.NEUTRAL.rate),
      pitch: params.pitch * (detectedEmotion.pitch / VOICE_EMOTIONS.NEUTRAL.pitch),
      volume: Math.min(params.volume * (detectedEmotion.volume / VOICE_EMOTIONS.NEUTRAL.volume), 1.0)
    };
  } else {
    params = {
      rate: params.rate * (emotionOverride.rate / VOICE_EMOTIONS.NEUTRAL.rate),
      pitch: params.pitch * (emotionOverride.pitch / VOICE_EMOTIONS.NEUTRAL.pitch),
      volume: Math.min(params.volume * (emotionOverride.volume / VOICE_EMOTIONS.NEUTRAL.volume), 1.0)
    };
  }

  // 3. Áp dụng emphasis patterns
  for (const [key, pattern] of Object.entries(EMPHASIS_PATTERNS)) {
    if (pattern.test(text)) {
      params = pattern.apply(params);
    }
  }

  // 4. Clamp values
  return {
    rate: Math.max(0.5, Math.min(2.0, params.rate)),
    pitch: Math.max(0.5, Math.min(2.0, params.pitch)),
    volume: Math.max(0.0, Math.min(1.0, params.volume))
  };
};

/**
 * Clean text để loại bỏ markers nhưng giữ lại content
 */
export const cleanTextMarkers = (text) => {
  return text
    .replace(/\*([^*]+)\*/g, '$1')      // *word* -> word
    .replace(/_([^_]+)_/g, '$1')        // _word_ -> word
    .replace(/\[[^\]]+\]/g, (match) => match.slice(1, -1)) // [text] -> text
    .replace(/\([^)]+\)/g, (match) => match.slice(1, -1)); // (text) -> text
};

/**
 * Extract emotion marker từ text
 * Ví dụ: "{HAPPY} Great job!" -> emotion = HAPPY
 */
export const extractEmotionMarker = (text) => {
  const match = text.match(/^\{([A-Z_]+)\}\s*/);
  if (match && VOICE_EMOTIONS[match[1]]) {
    return {
      emotion: VOICE_EMOTIONS[match[1]],
      cleanText: text.replace(/^\{[A-Z_]+\}\s*/, '')
    };
  }
  return {
    emotion: null,
    cleanText: text
  };
};
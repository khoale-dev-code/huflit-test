import React, { useState } from 'react';
import { Smile, Volume2, TrendingUp } from 'lucide-react';
import { VOICE_EMOTIONS } from '../config/voiceExpression';

/**
 * Emotion Selector Component
 * Cho phép người dùng chọn emotion để áp dụng khi phát
 */
export const EmotionSelector = ({ 
  selectedEmotion = 'NEUTRAL',
  onEmotionChange,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const emotions = Object.entries(VOICE_EMOTIONS).map(([key, emotion]) => ({
    key,
    ...emotion
  }));

  const selected = VOICE_EMOTIONS[selectedEmotion];
  const emotionEmojis = {
    NEUTRAL: '😐',
    HAPPY: '😊',
    SAD: '😢',
    ANGRY: '😠',
    EXCITED: '🤩',
    SERIOUS: '😶',
    CONFUSED: '😕',
    WHISPER: '🤫',
    LOUD: '😤'
  };

  if (compact) {
    return (
      <div className="flex gap-2 flex-wrap">
        {emotions.map(emotion => (
          <button
            key={emotion.key}
            onClick={() => onEmotionChange?.(emotion.key)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedEmotion === emotion.key
                ? 'bg-blue-500 text-white shadow-lg scale-110'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title={emotion.description}
          >
            {emotionEmojis[emotion.key]} {emotion.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Smile className="w-5 h-5 text-blue-600" />
        <h4 className="font-bold text-gray-900">Voice Expression</h4>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 rounded-lg hover:from-blue-200 hover:to-purple-200 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emotionEmojis[selectedEmotion]}</span>
          <div className="text-left">
            <p className="font-bold text-gray-900">{selected.label}</p>
            <p className="text-xs text-gray-600">{selected.description}</p>
          </div>
        </div>
        <span className="text-xl">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {emotions.map(emotion => (
            <button
              key={emotion.key}
              onClick={() => {
                onEmotionChange?.(emotion.key);
                setIsOpen(false);
              }}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                selectedEmotion === emotion.key
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <p className="text-3xl mb-1">{emotionEmojis[emotion.key]}</p>
              <p className="font-bold text-sm text-gray-900">{emotion.label}</p>
              <p className="text-xs text-gray-600 mt-1">{emotion.description}</p>
              
              {/* Mini voice indicators */}
              <div className="flex justify-center gap-1 mt-2 text-xs">
                <span title="Speed" className="flex items-center gap-1">
                  ⚡ {(emotion.rate * 100).toFixed(0)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-xs text-yellow-800">
        <p className="font-semibold mb-1">💡 Tips:</p>
        <ul className="list-disc list-inside space-y-1 text-yellow-700">
          <li>Use *text* or _text_ to stress words</li>
          <li>Use {"{EMOTION}"} prefix to force emotion</li>
          <li>Uppercase and punctuation auto-adjust</li>
          <li>Combine markers for stronger effect</li>
        </ul>
      </div>
    </div>
  );
};

/**
 * Mini Expression Indicator
 * Hiển thị loại expression hiện tại
 */
export const ExpressionIndicator = ({ 
  emotion = 'NEUTRAL',
  hasEmphasis = false,
  suggestions = []
}) => {
  const emotionEmojis = {
    NEUTRAL: '😐', HAPPY: '😊', SAD: '😢', ANGRY: '😠',
    EXCITED: '🤩', SERIOUS: '😶', CONFUSED: '😕',
    WHISPER: '🤫', LOUD: '😤'
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border-2 border-blue-300 rounded-lg">
      <span className="text-lg">{emotionEmojis[emotion]}</span>
      <span className="text-xs font-semibold text-blue-900">{emotion}</span>
      
      {hasEmphasis && (
        <span className="ml-auto flex items-center gap-1 px-2 py-1 bg-blue-200 rounded-full text-xs font-semibold text-blue-900">
          <Volume2 className="w-3 h-3" />
          Emphasis
        </span>
      )}

      {suggestions.length > 0 && (
        <div className="absolute top-full mt-2 bg-white border-2 border-blue-300 rounded-lg p-2 text-xs whitespace-nowrap shadow-lg">
          {suggestions.map((s, i) => (
            <p key={i} className="text-gray-700">• {s}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmotionSelector;
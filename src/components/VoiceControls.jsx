import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ChevronUp, ChevronDown, Volume2, Zap, AlertCircle } from 'lucide-react';

const VoiceControls = ({ allVoices = [], updateVoice, rate = 1, onRateChange }) => {
  // States
  const [selectedMaleIndex, setSelectedMaleIndex] = useState(0);
  const [selectedFemaleIndex, setSelectedFemaleIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [previewVoice, setPreviewVoice] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadingVoices, setIsLoadingVoices] = useState(allVoices.length === 0);

  // Refs
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);
  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  // Khởi tạo speech synthesis an toàn
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      try {
        if (synthRef.current && synthRef.current.speaking) {
          synthRef.current.cancel();
        }
      } catch (err) {
        console.error('Cleanup error:', err);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Voice detection keywords
  const VOICE_KEYWORDS = useMemo(
    () => ({
      female: ['female', 'zira', 'hazel', 'samantha', 'victoria', 'woman', 'f '],
      male: ['male', 'david', 'mark', 'george', 'james', 'man', 'm '],
    }),
    []
  );

  const PRESET_RATES = useMemo(() => [0.7, 0.9, 1.0, 1.2, 1.4], []);

  // Initialize voices on component mount or when allVoices changes
  useEffect(() => {
    if (allVoices.length === 0) {
      setIsLoadingVoices(true);
      setError(null);
      return;
    }

    setIsLoadingVoices(false);
    setError(null);

    try {
      // Find female voice
      let femaleIndex = allVoices.findIndex(v => {
        if (!v || !v.name) return false;
        const name = v.name.toLowerCase();
        return VOICE_KEYWORDS.female.some(keyword => name.includes(keyword));
      });
      femaleIndex = femaleIndex !== -1 ? femaleIndex : 0;

      // Find male voice (different from female)
      let maleIndex = allVoices.findIndex(
        (v, idx) => {
          if (!v || !v.name) return false;
          return (
            idx !== femaleIndex &&
            VOICE_KEYWORDS.male.some(keyword => v.name.toLowerCase().includes(keyword))
          );
        }
      );
      maleIndex = maleIndex !== -1 ? maleIndex : (allVoices.length > 1 ? 1 : 0);

      setSelectedFemaleIndex(femaleIndex);
      setSelectedMaleIndex(maleIndex);

      // Call updateVoice with proper error handling
      if (typeof updateVoice === 'function') {
        try {
          updateVoice(true, maleIndex);
          updateVoice(false, femaleIndex);
        } catch (err) {
          console.error('Error updating voices:', err);
          setError('Lỗi: Không thể cập nhật lựa chọn giọng nói');
        }
      }
    } catch (err) {
      console.error('Error initializing voices:', err);
      setError('Lỗi: Không thể khởi tạo danh sách giọng nói');
    }
  }, [allVoices, VOICE_KEYWORDS, updateVoice]);

  // Handle male voice change
  const handleMaleChange = useCallback(
    (e) => {
      try {
        const index = Number(e.target.value);
        if (index < 0 || index >= allVoices.length) {
          setError('Lỗi: Chỉ số giọng nói không hợp lệ');
          return;
        }
        setSelectedMaleIndex(index);
        if (typeof updateVoice === 'function') {
          updateVoice(true, index);
        }
        setError(null);
      } catch (err) {
        console.error('Error changing male voice:', err);
        setError('Lỗi: Không thể thay đổi giọng nam');
      }
    },
    [allVoices, updateVoice]
  );

  // Handle female voice change
  const handleFemaleChange = useCallback(
    (e) => {
      try {
        const index = Number(e.target.value);
        if (index < 0 || index >= allVoices.length) {
          setError('Lỗi: Chỉ số giọng nói không hợp lệ');
          return;
        }
        setSelectedFemaleIndex(index);
        if (typeof updateVoice === 'function') {
          updateVoice(false, index);
        }
        setError(null);
      } catch (err) {
        console.error('Error changing female voice:', err);
        setError('Lỗi: Không thể thay đổi giọng nữ');
      }
    },
    [allVoices, updateVoice]
  );

  // Preview voice with proper error handling - Cải tiến cho mobile
  const handlePreview = useCallback(
    (voiceIndex, gender) => {
      try {
        if (!synthRef.current) {
          setError('Lỗi: Speech Synthesis không khả dụng');
          return;
        }

        // Cancel previous speech
        if (synthRef.current.speaking) {
          synthRef.current.cancel();
        }

        // Validate voice index
        if (voiceIndex < 0 || voiceIndex >= allVoices.length) {
          setError('Lỗi: Chỉ số giọng nói không hợp lệ để nghe thử');
          return;
        }

        const voice = allVoices[voiceIndex];
        if (!voice || !voice.name) {
          setError('Lỗi: Giọng nói không khả dụng');
          return;
        }

        const text =
          gender === 'male'
            ? 'Hello, I am the male voice for your listening practice.'
            : 'Hello, I am the female voice for your listening practice.';

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.rate = Math.max(0.5, Math.min(2, rate || 1));
        utterance.pitch = gender === 'male' ? 0.9 : 1.1;
        utterance.volume = 1;

        utterance.onstart = () => {
          if (isMountedRef.current) {
            setPreviewVoice(gender);
            setError(null);
          }
        };

        utterance.onend = () => {
          if (isMountedRef.current) {
            setPreviewVoice(null);
          }
        };

        utterance.onerror = (e) => {
          console.error('Speech error:', e);
          if (isMountedRef.current) {
            setPreviewVoice(null);
            setError(`Lỗi phát âm thanh: ${e.error || 'Lỗi không xác định'}`);
          }
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
      } catch (err) {
        console.error('Preview error:', err);
        setPreviewVoice(null);
        setError('Lỗi: Không thể nghe thử giọng nói');
      }
    },
    [allVoices, rate]
  );

  // Get rate label with proper validation
  const getRateLabel = useCallback(() => {
    const validRate = Math.max(0.5, Math.min(1.5, rate || 1));
    if (validRate <= 0.7) return 'Rất chậm';
    if (validRate <= 0.9) return 'Chậm';
    if (validRate <= 1.1) return 'Bình thường';
    if (validRate <= 1.3) return 'Nhanh';
    return 'Rất nhanh';
  }, [rate]);

  // Get rate color with proper validation
  const getRateColor = useCallback(() => {
    const validRate = Math.max(0.5, Math.min(1.5, rate || 1));
    if (validRate <= 0.7) return 'text-orange-900';
    if (validRate <= 0.9) return 'text-yellow-700';
    if (validRate <= 1.1) return 'text-orange-500';
    if (validRate <= 1.3) return 'text-orange-600';
    return 'text-red-600';
  }, [rate]);

  // Handle rate change with validation
  const handleRateChange = useCallback(
    (e) => {
      try {
        const newRate = Number(e.target.value);
        if (isNaN(newRate) || newRate < 0.5 || newRate > 1.5) {
          setError('Lỗi: Giá trị tốc độ không hợp lệ');
          return;
        }
        if (typeof onRateChange === 'function') {
          onRateChange(newRate);
        }
        setError(null);
      } catch (err) {
        console.error('Error changing rate:', err);
        setError('Lỗi: Không thể thay đổi tốc độ');
      }
    },
    [onRateChange]
  );

  // Handle preset rate click
  const handlePresetRate = useCallback(
    (preset) => {
      try {
        if (typeof onRateChange === 'function') {
          onRateChange(preset);
        }
        setError(null);
      } catch (err) {
        console.error('Error setting preset rate:', err);
        setError('Lỗi: Không thể đặt tốc độ');
      }
    },
    [onRateChange]
  );

  // Get current voice display
  const getCurrentMaleVoice = useMemo(
    () => allVoices[selectedMaleIndex],
    [allVoices, selectedMaleIndex]
  );

  const getCurrentFemaleVoice = useMemo(
    () => allVoices[selectedFemaleIndex],
    [allVoices, selectedFemaleIndex]
  );

  return (
    <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-6 px-2 sm:px-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-orange-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-orange-300">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 flex-shrink-0" />
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Cài đặt Giọng Nói</h2>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex-shrink-0"
              aria-label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
            >
              {isExpanded ? 'Thu gọn' : 'Mở'}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-b-2 border-red-300 px-4 sm:px-6 py-2 sm:py-3">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-red-800 break-words">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Expandable Content */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Loading State */}
            {isLoadingVoices && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 sm:p-4 text-center">
                <p className="text-sm sm:text-base text-blue-800 font-semibold">⏳ Đang tải danh sách giọng nói...</p>
              </div>
            )}

            {/* Voice Selection Grid */}
            {!isLoadingVoices && allVoices.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Male Voice */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-4 sm:p-5 border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start sm:items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b-2 border-yellow-300 gap-2 flex-wrap">
                    <label className="text-xs sm:text-sm font-bold text-orange-800 flex items-center gap-2 flex-shrink-0">
                      <span className="text-xl sm:text-2xl">👨</span>
                      <span className="hidden sm:inline">Giọng Nam</span>
                      <span className="sm:hidden">Nam</span>
                    </label>
                    <button
                      onClick={() => handlePreview(selectedMaleIndex, 'male')}
                      disabled={previewVoice === 'male'}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-xs font-bold rounded-full transition-all hover:scale-105 disabled:cursor-not-allowed shadow-md disabled:opacity-60 active:scale-95 whitespace-nowrap flex-shrink-0"
                    >
                      {previewVoice === 'male' ? '🔊 Đang...' : '🔊 Thử'}
                    </button>
                  </div>

                  <select
                    value={selectedMaleIndex}
                    onChange={handleMaleChange}
                    disabled={allVoices.length === 0}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-orange-400 rounded-lg text-xs sm:text-base bg-white hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-medium text-gray-800 shadow-inner disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    {allVoices.map((voice, index) => (
                      <option key={`male-${index}`} value={index}>
                        {voice?.name || 'Unknown'} ({voice?.lang || 'N/A'})
                      </option>
                    ))}
                  </select>

                  {getCurrentMaleVoice && (
                    <div className="mt-2 sm:mt-3 text-xs text-orange-700 bg-yellow-200 rounded-lg p-2 sm:p-3 border border-yellow-300 font-semibold truncate">
                      ✓ {getCurrentMaleVoice.name}
                    </div>
                  )}
                </div>

                {/* Female Voice */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-4 sm:p-5 border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start sm:items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b-2 border-yellow-300 gap-2 flex-wrap">
                    <label className="text-xs sm:text-sm font-bold text-orange-800 flex items-center gap-2 flex-shrink-0">
                      <span className="text-xl sm:text-2xl">👩</span>
                      <span className="hidden sm:inline">Giọng Nữ</span>
                      <span className="sm:hidden">Nữ</span>
                    </label>
                    <button
                      onClick={() => handlePreview(selectedFemaleIndex, 'female')}
                      disabled={previewVoice === 'female'}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-xs font-bold rounded-full transition-all hover:scale-105 disabled:cursor-not-allowed shadow-md disabled:opacity-60 active:scale-95 whitespace-nowrap flex-shrink-0"
                    >
                      {previewVoice === 'female' ? '🔊 Đang...' : '🔊 Thử'}
                    </button>
                  </div>

                  <select
                    value={selectedFemaleIndex}
                    onChange={handleFemaleChange}
                    disabled={allVoices.length === 0}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-orange-400 rounded-lg text-xs sm:text-base bg-white hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-medium text-gray-800 shadow-inner disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    {allVoices.map((voice, index) => (
                      <option key={`female-${index}`} value={index}>
                        {voice?.name || 'Unknown'} ({voice?.lang || 'N/A'})
                      </option>
                    ))}
                  </select>

                  {getCurrentFemaleVoice && (
                    <div className="mt-2 sm:mt-3 text-xs text-orange-700 bg-yellow-200 rounded-lg p-2 sm:p-3 border border-yellow-300 font-semibold truncate">
                      ✓ {getCurrentFemaleVoice.name}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Speed Control */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-xl p-4 sm:p-6 border-2 border-orange-400 shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-5 pb-3 border-b-2 border-orange-300 gap-2">
                <label className="text-sm sm:text-base font-bold text-orange-900 flex items-center gap-2 flex-shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  Tốc độ đọc
                </label>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className={`text-2xl sm:text-3xl font-black ${getRateColor()}`}>
                    {Math.max(0.5, Math.min(1.5, rate || 1)).toFixed(1)}x
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-orange-700 bg-yellow-300 px-2 sm:px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    {getRateLabel()}
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="mb-3 sm:mb-4">
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={Math.max(0.5, Math.min(1.5, rate || 1))}
                  onChange={handleRateChange}
                  className="w-full h-2 sm:h-3 bg-gray-300 rounded-full appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 transition-all"
                />

                {/* Scale Markers */}
                <div className="flex justify-between text-xs text-gray-600 mt-2 px-1 font-bold">
                  <span>0.5x</span>
                  <span className="hidden sm:inline">0.8x</span>
                  <span className="text-orange-600">1.0x</span>
                  <span className="hidden sm:inline">1.2x</span>
                  <span>1.5x</span>
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-5 sm:grid-cols-5 gap-1 sm:gap-2">
                {PRESET_RATES.map(preset => (
                  <button
                    key={preset}
                    onClick={() => handlePresetRate(preset)}
                    className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-md duration-200 active:scale-95 ${
                      Math.abs((rate || 1) - preset) < 0.01
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                        : 'bg-white text-orange-600 hover:bg-yellow-50 border-2 border-orange-300 hover:border-orange-500'
                    }`}
                  >
                    {preset}x
                  </button>
                ))}
              </div>
            </div>

            {/* Tips Box */}
            <div className="bg-yellow-50 border-l-4 border-orange-500 rounded-lg p-3 sm:p-4 shadow-inner">
              <div className="flex gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl flex-shrink-0">💡</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-orange-900 mb-2 text-sm sm:text-base">Mẹo sử dụng:</h4>
                  <ul className="text-xs sm:text-sm text-gray-800 space-y-1">
                    <li>✓ Chọn giọng nam/nữ khác nhau để hội thoại tự nhiên</li>
                    <li>✓ Nhấn <strong>"Thử"</strong> để kiểm tra giọng trước</li>
                    <li>✓ Tốc độ <strong>1.0x</strong> là bình thường, <strong>0.8x</strong> cho người mới</li>
                    <li>✓ Tốc độ <strong>1.2x-1.5x</strong> giúp thử thách ở level cao</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceControls;
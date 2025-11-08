import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ChevronUp, ChevronDown, Volume2, Zap, AlertCircle } from 'lucide-react';

const VoiceControls = ({ allVoices = [], updateVoice, rate = 1, onRateChange }) => {
  // States
  const [selectedMaleIndex, setSelectedMaleIndex] = useState(0);
  const [selectedFemaleIndex, setSelectedFemaleIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [previewVoice, setPreviewVoice] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadingVoices, setIsLoadingVoices] = useState(false);

  // Refs
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const timeoutRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Voice detection keywords
  const VOICE_KEYWORDS = useMemo(
    () => ({
      female: ['female', 'zira', 'hazel', 'samantha', 'victoria', 'woman'],
      male: ['male', 'david', 'mark', 'george', 'james', 'man'],
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
        const name = v.name?.toLowerCase() || '';
        return VOICE_KEYWORDS.female.some(keyword => name.includes(keyword));
      });
      femaleIndex = femaleIndex !== -1 ? femaleIndex : 0;

      // Find male voice (different from female)
      let maleIndex = allVoices.findIndex(
        (v, idx) =>
          idx !== femaleIndex &&
          VOICE_KEYWORDS.male.some(keyword => v.name?.toLowerCase().includes(keyword))
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
          setError('Failed to update voice selection');
        }
      }
    } catch (err) {
      console.error('Error initializing voices:', err);
      setError('Failed to initialize voices');
    }
  }, [allVoices, VOICE_KEYWORDS]);

  // Handle male voice change
  const handleMaleChange = useCallback(
    (e) => {
      try {
        const index = Number(e.target.value);
        if (index < 0 || index >= allVoices.length) {
          setError('Invalid voice index');
          return;
        }
        setSelectedMaleIndex(index);
        if (typeof updateVoice === 'function') {
          updateVoice(true, index);
        }
        setError(null);
      } catch (err) {
        console.error('Error changing male voice:', err);
        setError('Failed to change male voice');
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
          setError('Invalid voice index');
          return;
        }
        setSelectedFemaleIndex(index);
        if (typeof updateVoice === 'function') {
          updateVoice(false, index);
        }
        setError(null);
      } catch (err) {
        console.error('Error changing female voice:', err);
        setError('Failed to change female voice');
      }
    },
    [allVoices, updateVoice]
  );

  // Preview voice with proper error handling
  const handlePreview = useCallback(
    (voiceIndex, gender) => {
      try {
        // Cancel previous speech
        if (synthRef.current.speaking) {
          synthRef.current.cancel();
        }

        // Validate voice index
        if (voiceIndex < 0 || voiceIndex >= allVoices.length) {
          setError('Invalid voice index for preview');
          return;
        }

        const voice = allVoices[voiceIndex];
        if (!voice) {
          setError('Voice not available');
          return;
        }

        const text =
          gender === 'male'
            ? 'Hello, I am the male voice for your listening practice.'
            : 'Hello, I am the female voice for your listening practice.';

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.rate = Math.max(0.1, Math.min(2, rate));
        utterance.pitch = gender === 'male' ? 0.9 : 1.1;
        utterance.volume = 1;

        utterance.onstart = () => {
          setPreviewVoice(gender);
          setError(null);
        };

        utterance.onend = () => {
          setPreviewVoice(null);
        };

        utterance.onerror = (e) => {
          console.error('Speech error:', e);
          setPreviewVoice(null);
          setError(`Speech error: ${e.error || 'Unknown error'}`);
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
      } catch (err) {
        console.error('Preview error:', err);
        setPreviewVoice(null);
        setError('Failed to preview voice');
      }
    },
    [allVoices, rate]
  );

  // Get rate label with proper validation
  const getRateLabel = useCallback(() => {
    const validRate = Math.max(0.5, Math.min(1.5, rate));
    if (validRate <= 0.7) return 'Rất chậm';
    if (validRate <= 0.9) return 'Chậm';
    if (validRate <= 1.1) return 'Bình thường';
    if (validRate <= 1.3) return 'Nhanh';
    return 'Rất nhanh';
  }, [rate]);

  // Get rate color with proper validation
  const getRateColor = useCallback(() => {
    const validRate = Math.max(0.5, Math.min(1.5, rate));
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
          setError('Invalid rate value');
          return;
        }
        if (typeof onRateChange === 'function') {
          onRateChange(newRate);
        }
        setError(null);
      } catch (err) {
        console.error('Error changing rate:', err);
        setError('Failed to change rate');
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
        setError('Failed to set rate');
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
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-orange-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-6 py-4 border-b-2 border-orange-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cài đặt Giọng Nói</h2>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              aria-label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
            >
              {isExpanded ? 'Thu gọn' : 'Mở rộng'}
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
          <div className="bg-red-50 border-b-2 border-red-300 px-6 py-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Expandable Content */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 space-y-6">
            {/* Loading State */}
            {isLoadingVoices && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 text-center">
                <p className="text-blue-800 font-semibold">⏳ Đang tải danh sách giọng nói...</p>
              </div>
            )}

            {/* Voice Selection Grid */}
            {!isLoadingVoices && allVoices.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Male Voice */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-5 border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-yellow-300">
                    <label className="text-sm font-bold text-orange-800 flex items-center gap-2">
                      <span className="text-2xl">👨</span>
                      Giọng Nam
                    </label>
                    <button
                      onClick={() => handlePreview(selectedMaleIndex, 'male')}
                      disabled={previewVoice === 'male'}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-xs font-bold rounded-full transition-all hover:scale-105 disabled:cursor-not-allowed shadow-md disabled:opacity-60 active:scale-95"
                    >
                      {previewVoice === 'male' ? '🔊 Đang phát...' : '🔊 Nghe thử'}
                    </button>
                  </div>

                  <select
                    value={selectedMaleIndex}
                    onChange={handleMaleChange}
                    disabled={allVoices.length === 0}
                    className="w-full px-4 py-3 border-2 border-orange-400 rounded-lg text-base bg-white hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-medium text-gray-800 shadow-inner disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    {allVoices.map((voice, index) => (
                      <option key={`male-${index}`} value={index}>
                        {voice?.name || 'Unknown'} ({voice?.lang || 'N/A'})
                      </option>
                    ))}
                  </select>

                  {getCurrentMaleVoice && (
                    <div className="mt-3 text-xs text-orange-700 bg-yellow-200 rounded-lg p-3 border border-yellow-300 font-semibold">
                      ✓ Đã chọn: {getCurrentMaleVoice.name}
                    </div>
                  )}
                </div>

                {/* Female Voice */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-5 border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-yellow-300">
                    <label className="text-sm font-bold text-orange-800 flex items-center gap-2">
                      <span className="text-2xl">👩</span>
                      Giọng Nữ
                    </label>
                    <button
                      onClick={() => handlePreview(selectedFemaleIndex, 'female')}
                      disabled={previewVoice === 'female'}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-xs font-bold rounded-full transition-all hover:scale-105 disabled:cursor-not-allowed shadow-md disabled:opacity-60 active:scale-95"
                    >
                      {previewVoice === 'female' ? '🔊 Đang phát...' : '🔊 Nghe thử'}
                    </button>
                  </div>

                  <select
                    value={selectedFemaleIndex}
                    onChange={handleFemaleChange}
                    disabled={allVoices.length === 0}
                    className="w-full px-4 py-3 border-2 border-orange-400 rounded-lg text-base bg-white hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-medium text-gray-800 shadow-inner disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    {allVoices.map((voice, index) => (
                      <option key={`female-${index}`} value={index}>
                        {voice?.name || 'Unknown'} ({voice?.lang || 'N/A'})
                      </option>
                    ))}
                  </select>

                  {getCurrentFemaleVoice && (
                    <div className="mt-3 text-xs text-orange-700 bg-yellow-200 rounded-lg p-3 border border-yellow-300 font-semibold">
                      ✓ Đã chọn: {getCurrentFemaleVoice.name}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Speed Control */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-xl p-6 border-2 border-orange-400 shadow-lg">
              <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-orange-300">
                <label className="text-base font-bold text-orange-900 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-red-600" />
                  Tốc độ đọc
                </label>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-black ${getRateColor()}`}>
                    {Math.max(0.5, Math.min(1.5, rate)).toFixed(1)}x
                  </span>
                  <span className="text-sm font-bold text-orange-700 bg-yellow-300 px-3 py-1 rounded-full shadow-md">
                    {getRateLabel()}
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={Math.max(0.5, Math.min(1.5, rate))}
                  onChange={handleRateChange}
                  className="w-full h-3 bg-gray-300 rounded-full appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 transition-all"
                />

                {/* Scale Markers */}
                <div className="flex justify-between text-xs text-gray-600 mt-2 px-1 font-bold">
                  <span>0.5x</span>
                  <span>0.8x</span>
                  <span className="text-orange-600">1.0x</span>
                  <span>1.2x</span>
                  <span>1.5x</span>
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {PRESET_RATES.map(preset => (
                  <button
                    key={preset}
                    onClick={() => handlePresetRate(preset)}
                    className={`py-2 px-2 rounded-lg font-bold text-sm transition-all shadow-md duration-200 active:scale-95 ${
                      Math.abs(rate - preset) < 0.01
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
            <div className="bg-yellow-50 border-l-4 border-orange-500 rounded-lg p-4 shadow-inner">
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-orange-900 mb-2">Mẹo sử dụng:</h4>
                  <ul className="text-sm text-gray-800 space-y-1">
                    <li>✓ Chọn giọng nam/nữ khác nhau để hội thoại tự nhiên hơn</li>
                    <li>✓ Nhấn <strong>"Nghe thử"</strong> để kiểm tra giọng trước khi luyện tập</li>
                    <li>✓ Tốc độ <strong>1.0x</strong> là bình thường, <strong>0.8x</strong> cho người mới bắt đầu</li>
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
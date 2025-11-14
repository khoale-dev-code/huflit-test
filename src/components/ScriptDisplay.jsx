import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Volume2, Play, Pause, FileText, Filter, Loader2, RefreshCw, Copy, Sliders, Users, Search, X, Sparkles, Star, Zap } from 'lucide-react';
import { useVoices } from './hooks/useVoices';
import { useScriptParser } from './hooks/useScriptParser';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { getSpeakerColor, getSpeakerIcon, getSpeakerTTSOptions, copyScriptToClipboard, scrollToElement } from './utils/scriptUtils';
import VoiceMetricsBadge from './VoiceMetricsBadge';

// Component cho hiệu ứng đóm tròn nền
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Các đóm tròn lớn - background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-300/15 rounded-full blur-3xl animate-float-medium" />
      <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-beige-400/10 rounded-full blur-2xl animate-float-fast" />
      
      {/* Các đóm tròn nhỏ di chuyển */}
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-amber-400/40 rounded-full animate-bounce-slow" />
      <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-orange-500/30 rounded-full animate-bounce-medium" />
      <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-yellow-500/50 rounded-full animate-bounce-fast" />
      <div className="absolute top-1/4 right-1/2 w-5 h-5 bg-beige-600/20 rounded-full animate-bounce-slow" />
      
      {/* Hiệu ứng sparkle */}
      <div className="absolute top-3/4 left-1/4 animate-pulse">
        <Sparkles className="w-4 h-4 text-amber-400/60" />
      </div>
    </div>
  );
};

const ScriptDisplay = ({
  script,
  partTitle = "Script",
  showByDefault = true
}) => {
  const [isExpanded, setIsExpanded] = useState(showByDefault);
  const [highlightedSpeaker, setHighlightedSpeaker] = useState(null);
  const [isScriptPlaying, setIsScriptPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0.9);
  const [playbackPitch, setPlaybackPitch] = useState(1.0);
  const [playbackVolume, setPlaybackVolume] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [showMetrics, setShowMetrics] = useState(false);
  const [activeTab, setActiveTab] = useState('script');

  const contentScrollRef = useRef(null);

  // ==================== HOOKS ====================

  const {
    allVoices,
    getSpeakerVoice,
    synthRef,
    error: voicesError,
    reloadVoices,
    getPerformanceLevel,
    autoOptimizeSettings,
    getVoiceMetrics,
    trackSpeechAttempt,
    resetMetrics: resetVoiceMetrics,
    warmupVoices
  } = useVoices();

  const { parsedScript, speakers, speakerCounts } = useScriptParser(script);

  const {
    currentPlayingIndex,
    setCurrentPlayingIndex,
    playingTime,
    isPaused,
    pauseScript,
    resumeScript,
    stopScript,
    speakNextInQueue,
    queueConversations,
    optimizeConversations,
    getTTSMetrics,
    resetMetrics: resetTTSMetrics
  } = useTextToSpeech({
    getSpeakerVoice,
    synthRef,
    isScriptPlaying,
    filteredConversations: []
  });

  // ==================== STATE ====================

  const filteredConversations = useMemo(() => {
    return parsedScript.filter(conv => {
      const speakerMatch = !highlightedSpeaker || conv.speaker === highlightedSpeaker;
      const textMatch = !searchTerm || conv.text.toLowerCase().includes(searchTerm.toLowerCase());
      return speakerMatch && textMatch;
    });
  }, [parsedScript, highlightedSpeaker, searchTerm]);

  const performanceLevel = getPerformanceLevel();
  const optimizedSettings = autoOptimize ? autoOptimizeSettings() : { rate: playbackRate, pitch: playbackPitch, volume: playbackVolume };

  // ==================== AUTO-SCROLL ====================

  useEffect(() => {
    scrollToElement(`conv-${currentPlayingIndex}`, autoScroll && currentPlayingIndex !== -1);
  }, [currentPlayingIndex, autoScroll]);

  // ==================== PLAYBACK FUNCTIONS ====================

  const handlePlayScript = useCallback(async () => {
    if (!synthRef.current || allVoices.length === 0) return;

    if (isScriptPlaying) {
      if (isPaused) {
        resumeScript();
        setIsScriptPlaying(true);
      } else {
        pauseScript();
        setIsScriptPlaying(false);
      }
      return;
    }

    // Prepare optimized conversations
    const toPlay = autoOptimize ? optimizeConversations(filteredConversations) : filteredConversations;

    // Warmup voices if performance allows
    if (performanceLevel.warmupEnabled && speakers.length > 0) {
      await warmupVoices(speakers.slice(0, 3));
    }

    const hasQueue = queueConversations(
      toPlay,
      (speaker) => getSpeakerTTSOptions(speaker, optimizedSettings.rate, optimizedSettings.volume),
      false
    );

    if (hasQueue) {
      setIsScriptPlaying(true);
      setCurrentPlayingIndex(-1);
      speakNextInQueue();
    }
  }, [
    filteredConversations,
    isScriptPlaying,
    isPaused,
    allVoices,
    pauseScript,
    resumeScript,
    queueConversations,
    speakNextInQueue,
    synthRef,
    setCurrentPlayingIndex,
    autoOptimize,
    optimizeConversations,
    performanceLevel,
    speakers,
    warmupVoices,
    optimizedSettings
  ]);

  const handlePlayConversation = useCallback((index) => {
    if (!synthRef.current || allVoices.length === 0) return;

    stopScript();

    const conv = filteredConversations[index];
    if (conv) {
      queueConversations(
        [conv],
        (speaker) => getSpeakerTTSOptions(speaker, optimizedSettings.rate, optimizedSettings.volume),
        false
      );
      setCurrentPlayingIndex(index);
      speakNextInQueue();
    }
  }, [
    filteredConversations,
    optimizedSettings,
    queueConversations,
    speakNextInQueue,
    stopScript,
    synthRef,
    allVoices,
    setCurrentPlayingIndex
  ]);

  const handleCopy = useCallback(() => {
    copyScriptToClipboard(filteredConversations);
  }, [filteredConversations]);

  const handleStop = useCallback(() => {
    stopScript();
    setIsScriptPlaying(false);
  }, [stopScript]);

  const handleResetMetrics = useCallback(() => {
    resetVoiceMetrics();
    resetTTSMetrics();
  }, [resetVoiceMetrics, resetTTSMetrics]);

  // ==================== RENDER ====================

  if (voicesError) {
    return (
      <div className="relative z-10 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-3xl p-8 text-center shadow-2xl w-full max-w-3xl mx-auto backdrop-blur-sm" role="alert">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-xl font-bold text-red-800 mb-3">TTS Service Error</h4>
        <p className="text-sm text-red-700 mb-6">{voicesError}</p>
        <button onClick={reloadVoices} className="inline-flex items-center gap-3 text-sm bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl">
          <RefreshCw className="w-4 h-4" /> Retry Loading Voices
        </button>
      </div>
    );
  }

  if (allVoices.length === 0) {
    return (
      <div className="relative z-10 w-full bg-gradient-to-br from-white to-beige-50 rounded-3xl shadow-2xl border-2 border-beige-200 overflow-hidden max-w-3xl mx-auto backdrop-blur-sm">
        <div className="p-12 flex flex-col items-center justify-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
          </div>
          <p className="text-center text-lg text-amber-800 font-semibold">Loading AI Voices...</p>
          <p className="text-center text-sm text-amber-600 mt-2">Preparing the best voice experience</p>
        </div>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="relative z-10 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-amber-300 rounded-3xl p-8 text-center shadow-2xl w-full max-w-3xl mx-auto backdrop-blur-sm" role="alert">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <p className="text-xl font-bold text-amber-800">Script Not Available</p>
        <p className="text-sm text-amber-700 mt-2">Please check the script source</p>
      </div>
    );
  }

  return (
    <div className="relative w-full space-y-6 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Hiệu ứng nền */}
      <FloatingParticles />
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(10px) translateY(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes bounce-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bounce-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-medium { animation: bounce-medium 2s ease-in-out infinite; }
        .animate-bounce-fast { animation: bounce-fast 1.5s ease-in-out infinite; }
      `}</style>

      {/* Metrics Badge */}
      {showMetrics && (
        <VoiceMetricsBadge
          voiceMetrics={getVoiceMetrics()}
          ttsMetrics={getTTSMetrics()}
          performanceLevel={performanceLevel}
          isPlaying={isScriptPlaying}
        />
      )}

      {/* Main Component */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-beige-200 overflow-hidden transition-all duration-500 hover:shadow-3xl" role="region" aria-label={`${partTitle} Script`}>
        
        {/* Header với gradient mới */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-6 sm:p-8 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 transition-all duration-500 group relative overflow-hidden"
          aria-expanded={isExpanded}
        >
          {/* Hiệu ứng shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Script & Transcript</h3>
              <div className="flex items-center gap-3 text-amber-100 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{partTitle}</span>
                <span>{parsedScript.length} lines</span>
                <span>{speakers.length} speakers</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 relative z-10">
            {isScriptPlaying && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-100 font-bold">{playingTime} lines</span>
              </div>
            )}
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              {isExpanded ? 
                <ChevronUp className="w-6 h-6 text-white transition-transform" /> : 
                <ChevronDown className="w-6 h-6 text-white transition-transform" />
              }
            </div>
          </div>
        </button>

        {/* Content */}
        {isExpanded && (
          <div className="space-y-6 p-6 sm:p-8">
            
            {/* Tab Navigation */}
            <div className="flex border-b-2 border-beige-200">
              <button
                onClick={() => setActiveTab('script')}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
                  activeTab === 'script' 
                    ? 'border-amber-500 text-amber-700' 
                    : 'border-transparent text-gray-500 hover:text-amber-600'
                }`}
              >
                Script Content
              </button>
              <button
                onClick={() => setActiveTab('speakers')}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
                  activeTab === 'speakers' 
                    ? 'border-amber-500 text-amber-700' 
                    : 'border-transparent text-gray-500 hover:text-amber-600'
                }`}
              >
                Speakers ({speakers.length})
              </button>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={handlePlayScript}
                disabled={allVoices.length === 0}
                className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {isScriptPlaying ? (isPaused ? <Play className="w-5 h-5 relative z-10" /> : <Pause className="w-5 h-5 relative z-10" />) : <Play className="w-5 h-5 relative z-10" />}
                <span className="relative z-10">{isScriptPlaying ? (isPaused ? 'RESUME' : 'PAUSE') : 'PLAY ALL'}</span>
              </button>

              {isScriptPlaying && (
                <button
                  onClick={handleStop}
                  className="bg-white border-2 border-red-300 text-red-600 hover:bg-red-50 font-bold rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <X className="w-5 h-5" />
                  <span>Stop</span>
                </button>
              )}

              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`bg-white border-2 font-bold rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                  showSettings ? 'border-amber-400 text-amber-600 bg-amber-50' : 'border-beige-300 text-gray-600 hover:border-amber-400'
                }`}
              >
                <Sliders className="w-5 h-5" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleCopy}
                className="bg-white border-2 border-beige-300 text-gray-600 hover:border-amber-400 hover:text-amber-600 font-bold rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Copy className="w-5 h-5" />
                <span>Copy Script</span>
              </button>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-amber-800">Voice Settings</h4>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowMetrics(!showMetrics)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-amber-300 rounded-xl text-amber-700 font-semibold hover:bg-amber-50 transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      Metrics
                    </button>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={autoOptimize}
                          onChange={(e) => setAutoOptimize(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-12 h-6 rounded-full transition-colors ${
                          autoOptimize ? 'bg-amber-500' : 'bg-gray-300'
                        }`} />
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          autoOptimize ? 'transform translate-x-6' : ''
                        }`} />
                      </div>
                      <span className="text-sm font-semibold text-amber-800">Auto-optimize</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-amber-700 flex justify-between">
                      <span>Speed: {(optimizedSettings.rate * 100).toFixed(0)}%</span>
                      {autoOptimize && <span className="text-xs text-amber-500">Auto</span>}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={optimizedSettings.rate}
                      onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                      disabled={autoOptimize}
                      className="w-full h-2 bg-gradient-to-r from-amber-200 to-orange-300 rounded-lg cursor-pointer disabled:cursor-not-allowed accent-amber-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-amber-700 flex justify-between">
                      <span>Pitch: {(optimizedSettings.pitch * 100).toFixed(0)}%</span>
                      {autoOptimize && <span className="text-xs text-amber-500">Auto</span>}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={optimizedSettings.pitch}
                      onChange={(e) => setPlaybackPitch(parseFloat(e.target.value))}
                      disabled={autoOptimize}
                      className="w-full h-2 bg-gradient-to-r from-amber-200 to-orange-300 rounded-lg cursor-pointer disabled:cursor-not-allowed accent-amber-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-amber-700 flex justify-between">
                      <span>Volume: {(optimizedSettings.volume * 100).toFixed(0)}%</span>
                      {autoOptimize && <span className="text-xs text-amber-500">Auto</span>}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={optimizedSettings.volume}
                      onChange={(e) => setPlaybackVolume(parseFloat(e.target.value))}
                      disabled={autoOptimize}
                      className="w-full h-2 bg-gradient-to-r from-amber-200 to-orange-300 rounded-lg cursor-pointer disabled:cursor-not-allowed accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative group">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 transition-colors group-hover:text-amber-600" />
              <input
                type="text"
                placeholder="Search in script..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-beige-300 focus:border-amber-400 outline-none text-base bg-white/80 backdrop-blur-sm transition-all duration-300 focus:bg-white focus:shadow-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-amber-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Script Content */}
            <div 
              ref={contentScrollRef} 
              className="p-6 space-y-4 max-h-[600px] overflow-y-auto bg-gradient-to-br from-beige-50 to-amber-50/30 rounded-2xl border-2 border-beige-200 backdrop-blur-sm scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent"
            >
              {filteredConversations.map((conv, index) => (
                <div
                  key={`${conv.speaker}-${index}`}
                  id={`conv-${index}`}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group hover:shadow-lg ${
                    currentPlayingIndex === index
                      ? 'ring-4 ring-amber-400 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-xl scale-[1.02]'
                      : `${getSpeakerColor(conv.speaker)} hover:border-amber-300`
                  }`}
                  onClick={() => handlePlayConversation(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0 transition-transform group-hover:scale-110">
                      {getSpeakerIcon(conv.speaker)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-base text-gray-800 bg-white/80 px-3 py-1 rounded-full border border-beige-300">
                          {conv.speaker}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayConversation(index);
                          }}
                          className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full flex-shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 shadow-lg hover:shadow-xl"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-base break-words">
                        {conv.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptDisplay;
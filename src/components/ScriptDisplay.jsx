import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Volume2, Play, Pause, FileText, Filter, Loader2, RefreshCw, Copy, Sliders, Users, Search, X } from 'lucide-react';
import { useVoices } from './hooks/useVoices';
import { useScriptParser } from './hooks/useScriptParser';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { getSpeakerColor, getSpeakerIcon, getSpeakerTTSOptions, copyScriptToClipboard, scrollToElement } from './utils/scriptUtils';
import VoiceMetricsBadge from './VoiceMetricsBadge';

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
      await warmupVoices(speakers.slice(0, 3)); // Warmup top 3 speakers
    }

    const hasQueue = queueConversations(
      toPlay,
      (speaker) => getSpeakerTTSOptions(speaker, optimizedSettings.rate, optimizedSettings.volume),
      false // Already optimized
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
      <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-400 rounded-2xl p-6 text-center shadow-xl w-full max-w-3xl mx-auto" role="alert">
        <h4 className="text-lg font-bold text-red-800 mb-2">TTS Service Error</h4>
        <p className="text-sm text-red-700 mb-4">{voicesError}</p>
        <button onClick={reloadVoices} className="inline-flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition-all">
          <RefreshCw className="w-4 h-4" /> Retry Loading
        </button>
      </div>
    );
  }

  if (allVoices.length === 0) {
    return (
      <div className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden max-w-3xl mx-auto">
        <div className="p-12 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-500 mb-4 animate-spin" />
          <p className="text-center text-sm text-gray-600 font-semibold">Loading voices...</p>
        </div>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-2xl p-6 text-center shadow-xl w-full max-w-3xl mx-auto" role="alert">
        <p className="text-lg font-bold text-yellow-800">Script not available</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 max-w-5xl mx-auto">
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
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-300 overflow-hidden" role="region" aria-label={`${partTitle} Script`}>
        
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-5 sm:p-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-3">
            <FileText className="w-7 h-7 text-white" />
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Script & Transcript</h3>
              <p className="text-xs sm:text-sm text-blue-100">{partTitle} • {parsedScript.length} lines • {speakers.length} speakers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isScriptPlaying && <span className="text-xs text-green-200 font-bold">{playingTime} lines</span>}
            {isExpanded ? <ChevronUp className="w-6 h-6 text-white" /> : <ChevronDown className="w-6 h-6 text-white" />}
          </div>
        </button>

        {/* Content */}
        {isExpanded && (
          <div className="space-y-4 p-4 sm:p-6">
            
            {/* Controls */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handlePlayScript}
                disabled={allVoices.length === 0}
                className="flex-1 min-w-[140px] py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                {isScriptPlaying ? (isPaused ? <Play /> : <Pause />) : <Play />}
                <span>{isScriptPlaying ? (isPaused ? 'RESUME' : 'PAUSE') : 'PLAY ALL'}</span>
              </button>

              {isScriptPlaying && (
                <button
                  onClick={handleStop}
                  className="py-3 px-5 bg-white border-2 border-red-400 text-red-700 font-bold rounded-xl hover:bg-red-50 flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  <span className="hidden sm:inline">Stop</span>
                </button>
              )}

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="py-3 px-5 bg-white border-2 border-blue-400 text-blue-700 font-bold rounded-xl hover:bg-blue-50 flex items-center gap-2"
              >
                <Sliders className="w-5 h-5" />
                <span className="hidden sm:inline">Settings</span>
              </button>

              <button
                onClick={handleCopy}
                className="py-3 px-5 bg-white border-2 border-purple-400 text-purple-700 font-bold rounded-xl hover:bg-purple-50 flex items-center gap-2"
              >
                <Copy className="w-5 h-5" />
                <span className="hidden sm:inline">Copy</span>
              </button>

              <button
                onClick={() => setShowMetrics(!showMetrics)}
                className="py-3 px-5 bg-white border-2 border-yellow-400 text-yellow-700 font-bold rounded-xl hover:bg-yellow-50"
              >
                📊
              </button>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg space-y-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoOptimize}
                    onChange={(e) => setAutoOptimize(e.target.checked)}
                    className="w-4 h-4 rounded accent-purple-600"
                  />
                  <span className="text-sm font-semibold text-gray-700">Auto-optimize text & performance</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700">Speed: {(optimizedSettings.rate * 100).toFixed(0)}%</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={optimizedSettings.rate}
                      onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                      disabled={autoOptimize}
                      className="w-full h-2 bg-blue-200 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Pitch: {(optimizedSettings.pitch * 100).toFixed(0)}%</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={optimizedSettings.pitch}
                      onChange={(e) => setPlaybackPitch(parseFloat(e.target.value))}
                      disabled={autoOptimize}
                      className="w-full h-2 bg-purple-200 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700">Volume: {(optimizedSettings.volume * 100).toFixed(0)}%</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={optimizedSettings.volume}
                      onChange={(e) => setPlaybackVolume(parseFloat(e.target.value))}
                      disabled={autoOptimize}
                      className="w-full h-2 bg-green-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search in script..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg border-2 border-blue-300 focus:border-blue-500 outline-none text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Script Content */}
            <div ref={contentScrollRef} className="p-4 space-y-3 max-h-[500px] overflow-y-auto bg-gray-50 rounded-lg">
              {filteredConversations.map((conv, index) => (
                <div
                  key={`${conv.speaker}-${index}`}
                  id={`conv-${index}`}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    currentPlayingIndex === index
                      ? 'ring-2 ring-green-500 border-green-400 shadow-lg'
                      : getSpeakerColor(conv.speaker)
                  }`}
                  onClick={() => handlePlayConversation(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{getSpeakerIcon(conv.speaker)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm mb-1">{conv.speaker}</p>
                      <p className="text-sm break-words">{conv.text}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayConversation(index);
                      }}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex-shrink-0"
                    >
                      <Play className="w-4 h-4" />
                    </button>
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
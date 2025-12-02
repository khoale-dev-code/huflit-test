import React, { Suspense, useState, useMemo, useCallback, useRef, useEffect, memo } from 'react';
import { ChevronDown, ChevronUp, FileText, Play, Pause, Copy, Sliders, Search, X, Star, Zap, RefreshCw, Loader2 } from 'lucide-react';
import { useVoices } from '../hooks/useVoices';
import { useScriptParser } from '../hooks/useScriptParser';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { getSpeakerColor, getSpeakerIcon, getSpeakerTTSOptions, copyScriptToClipboard, scrollToElement } from '../utils/scriptUtils';
import VoiceMetricsBadge from '../VoiceMetricsBadge';

// ✅ Optimized Background
const OptimizedBackground = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl" />
    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-amber-400/8 rounded-full blur-2xl" />
  </div>
));

OptimizedBackground.displayName = 'OptimizedBackground';

// ✅ Error State (Mobile Optimized)
const ErrorState = memo(({ error, onRetry }) => (
  <div className="relative z-10 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-lg sm:rounded-3xl p-4 sm:p-8 text-center shadow-lg w-full max-w-3xl mx-auto backdrop-blur-sm" role="alert">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
      <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
    </div>
    <h4 className="text-base sm:text-xl font-bold text-red-800 mb-2 sm:mb-3">TTS Error</h4>
    <p className="text-xs sm:text-sm text-red-700 mb-3 sm:mb-6">{error}</p>
    <button 
      onClick={onRetry} 
      className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-8 rounded-lg sm:rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95"
    >
      <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Retry
    </button>
  </div>
));

ErrorState.displayName = 'ErrorState';

// ✅ Loading State (Mobile Optimized)
const LoadingState = memo(() => (
  <div className="relative z-10 w-full bg-gradient-to-br from-white to-amber-50 rounded-lg sm:rounded-3xl shadow-lg border-2 border-amber-200 overflow-hidden max-w-3xl mx-auto backdrop-blur-sm">
    <div className="p-6 sm:p-12 flex flex-col items-center justify-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-2xl flex items-center justify-center shadow-lg">
        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin" />
      </div>
      <p className="text-center text-base sm:text-lg text-amber-800 font-semibold mt-2 sm:mt-4">Loading Voices...</p>
      <p className="text-center text-xs sm:text-sm text-amber-600 mt-1 sm:mt-2">Preparing voice</p>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';

// ✅ Empty State (Mobile Optimized)
const EmptyState = memo(() => (
  <div className="relative z-10 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-amber-300 rounded-lg sm:rounded-3xl p-4 sm:p-8 text-center shadow-lg w-full max-w-3xl mx-auto backdrop-blur-sm" role="alert">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
    </div>
    <p className="text-base sm:text-xl font-bold text-amber-800">No Script</p>
    <p className="text-xs sm:text-sm text-amber-700 mt-1 sm:mt-2">Check source</p>
  </div>
));

EmptyState.displayName = 'EmptyState';

// ✅ Controls Grid (Mobile Optimized)
const ControlsGrid = memo(({ 
  isScriptPlaying, 
  isPaused, 
  allVoicesLength,
  showSettings,
  onPlayScript,
  onStop,
  onToggleSettings,
  onCopy 
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
    <button
      onClick={onPlayScript}
      disabled={allVoicesLength === 0}
      className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg sm:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden active:scale-95 text-xs sm:text-sm"
    >
      <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      {isScriptPlaying ? (isPaused ? <Play className="w-3.5 h-3.5 sm:w-4" /> : <Pause className="w-3.5 h-3.5 sm:w-4" />) : <Play className="w-3.5 h-3.5 sm:w-4" />}
      <span className="hidden sm:inline">{isScriptPlaying ? (isPaused ? 'RESUME' : 'PAUSE') : 'PLAY'}</span>
      <span className="inline sm:hidden">{isScriptPlaying ? (isPaused ? 'R' : 'P') : 'Play'}</span>
    </button>

    {isScriptPlaying && (
      <button
        onClick={onStop}
        className="bg-white border-2 border-red-300 text-red-600 hover:bg-red-50 font-bold rounded-lg sm:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 text-xs sm:text-sm"
      >
        <X className="w-3.5 h-3.5 sm:w-4" />
        <span className="hidden sm:inline">STOP</span>
      </button>
    )}

    <button
      onClick={onToggleSettings}
      className={`bg-white border-2 font-bold rounded-lg sm:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 text-xs sm:text-sm ${
        showSettings ? 'border-amber-400 text-amber-600 bg-amber-50' : 'border-amber-200 text-gray-600 hover:border-amber-400'
      }`}
    >
      <Sliders className="w-3.5 h-3.5 sm:w-4" />
      <span className="hidden sm:inline">SETTINGS</span>
      <span className="inline sm:hidden">⚙</span>
    </button>

    <button
      onClick={onCopy}
      className="bg-white border-2 border-amber-200 text-gray-600 hover:border-amber-400 hover:text-amber-600 font-bold rounded-lg sm:rounded-2xl p-2.5 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 text-xs sm:text-sm"
    >
      <Copy className="w-3.5 h-3.5 sm:w-4" />
      <span className="hidden sm:inline">COPY</span>
    </button>
  </div>
));

ControlsGrid.displayName = 'ControlsGrid';

// ✅ Settings Panel (Mobile Optimized)
const SettingsPanel = memo(({ 
  optimizedSettings, 
  autoOptimize,
  showMetrics,
  onRateChange,
  onPitchChange,
  onVolumeChange,
  onAutoOptimizeChange,
  onToggleMetrics
}) => (
  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg sm:rounded-2xl p-3 sm:p-5 md:p-6 space-y-3 sm:space-y-4 backdrop-blur-sm">
    <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
      <h4 className="text-sm sm:text-lg font-bold text-amber-800">Voice</h4>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onToggleMetrics}
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-white border-2 border-amber-300 rounded-lg text-amber-700 font-semibold text-xs hover:bg-amber-50 transition-colors active:scale-95"
        >
          <Star className="w-3.5 h-3.5 sm:w-4" />
        </button>
        <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={autoOptimize}
            onChange={onAutoOptimizeChange}
            className="sr-only"
          />
          <div className={`w-9 h-5 sm:w-11 sm:h-6 rounded-full transition-colors ${autoOptimize ? 'bg-amber-500' : 'bg-gray-300'}`} />
          <span className="text-xs sm:text-sm font-semibold text-amber-800">Auto</span>
        </label>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-bold text-amber-700 flex justify-between">
          <span>Speed</span>
          <span>{(optimizedSettings.rate * 100).toFixed(0)}%</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={optimizedSettings.rate}
          onChange={onRateChange}
          disabled={autoOptimize}
          className="w-full h-2 bg-gradient-to-r from-amber-200 to-orange-300 rounded-lg cursor-pointer disabled:cursor-not-allowed accent-amber-500"
        />
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-bold text-amber-700 flex justify-between">
          <span>Pitch</span>
          <span>{(optimizedSettings.pitch * 100).toFixed(0)}%</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={optimizedSettings.pitch}
          onChange={onPitchChange}
          disabled={autoOptimize}
          className="w-full h-2 bg-gradient-to-r from-amber-200 to-orange-300 rounded-lg cursor-pointer disabled:cursor-not-allowed accent-amber-500"
        />
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-bold text-amber-700 flex justify-between">
          <span>Vol</span>
          <span>{(optimizedSettings.volume * 100).toFixed(0)}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={optimizedSettings.volume}
          onChange={onVolumeChange}
          disabled={autoOptimize}
          className="w-full h-2 bg-gradient-to-r from-amber-200 to-orange-300 rounded-lg cursor-pointer disabled:cursor-not-allowed accent-amber-500"
        />
      </div>
    </div>
  </div>
));

SettingsPanel.displayName = 'SettingsPanel';

// ✅ Search Bar (Mobile Optimized)
const SearchBar = memo(({ searchTerm, onSearchChange }) => (
  <div className="relative group">
    <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-amber-500 transition-colors group-hover:text-amber-600" />
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={onSearchChange}
      className="w-full pl-9 sm:pl-12 pr-9 sm:pr-12 py-2 sm:py-3 rounded-lg sm:rounded-2xl border-2 border-amber-200 focus:border-amber-400 outline-none text-xs sm:text-sm bg-white/80 backdrop-blur-sm transition-all duration-200 focus:bg-white focus:shadow-lg"
    />
    {searchTerm && (
      <button
        onClick={() => onSearchChange({ target: { value: '' } })}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-amber-600 transition-colors active:scale-95"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    )}
  </div>
));

SearchBar.displayName = 'SearchBar';

// ✅ Conversation Item (Mobile Optimized)
const ConversationItem = memo(({ 
  conv, 
  index, 
  isPlaying, 
  onPlay 
}) => (
  <div
    id={`conv-${index}`}
    className={`p-2.5 sm:p-4 rounded-lg sm:rounded-2xl border-2 transition-all duration-200 cursor-pointer group hover:shadow-lg active:scale-95 ${
      isPlaying
        ? 'ring-4 ring-amber-400 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg scale-[1.01]'
        : `${getSpeakerColor(conv.speaker)} hover:border-amber-300`
    }`}
    onClick={() => onPlay(index)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onPlay(index)}
  >
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="text-lg sm:text-2xl flex-shrink-0 transition-transform group-hover:scale-110">
        {getSpeakerIcon(conv.speaker)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
          <p className="font-bold text-xs sm:text-sm text-gray-800 bg-white/80 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-amber-200 truncate">
            {conv.speaker}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(index);
            }}
            className="p-1 sm:p-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full flex-shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md hover:shadow-lg active:scale-90"
          >
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed text-xs sm:text-sm break-words">
          {conv.text}
        </p>
      </div>
    </div>
  </div>
));

ConversationItem.displayName = 'ConversationItem';

// ✅ Script Content Area (Mobile Optimized)
const ScriptContent = memo(({ 
  filteredConversations, 
  currentPlayingIndex,
  onPlayConversation 
}) => (
  <div className="p-2.5 sm:p-4 md:p-6 space-y-2 sm:space-y-3 max-h-[500px] sm:max-h-[600px] overflow-y-auto bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-lg sm:rounded-2xl border-2 border-amber-200 backdrop-blur-sm scrollbar-thin">
    {filteredConversations.map((conv, index) => (
      <ConversationItem
        key={`${conv.speaker}-${index}`}
        conv={conv}
        index={index}
        isPlaying={currentPlayingIndex === index}
        onPlay={onPlayConversation}
      />
    ))}
  </div>
));

ScriptContent.displayName = 'ScriptContent';

// ✅ Header (Mobile Optimized)
const ScriptHeader = memo(({ 
  isExpanded, 
  onToggleExpand, 
  partTitle, 
  parsedScriptLength, 
  speakersLength, 
  isScriptPlaying,
  playingTime 
}) => (
  <button
    onClick={onToggleExpand}
    className="w-full flex items-center justify-between p-3 sm:p-5 md:p-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 transition-all duration-300 group relative overflow-hidden"
    aria-expanded={isExpanded}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    
    <div className="flex items-center gap-2 sm:gap-3 relative z-10 min-w-0">
      <div className="p-1.5 sm:p-2.5 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-2xl border border-white/30 shadow-lg flex-shrink-0">
        <FileText className="w-5 h-5 sm:w-6 md:w-7 text-white" />
      </div>
      <div className="text-left min-w-0">
        <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-white truncate">Script</h3>
        <div className="flex items-center gap-1 sm:gap-2 text-amber-100 text-xs flex-wrap">
          <span className="bg-white/20 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full backdrop-blur-sm truncate">{partTitle}</span>
          <span className="hidden sm:inline text-amber-200">•</span>
          <span className="hidden sm:inline text-xs">{parsedScriptLength} lines</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-1 sm:gap-2 relative z-10 flex-shrink-0">
      {isScriptPlaying && (
        <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-100 font-bold">{playingTime}</span>
        </div>
      )}
      <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/30">
        {isExpanded ? 
          <ChevronUp className="w-4 h-4 sm:w-5 text-white transition-transform" /> : 
          <ChevronDown className="w-4 h-4 sm:w-5 text-white transition-transform" />
        }
      </div>
    </div>
  </button>
));

ScriptHeader.displayName = 'ScriptHeader';

// ✅ Main Component
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
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [showMetrics, setShowMetrics] = useState(false);

  const contentScrollRef = useRef(null);

  const {
    allVoices,
    getSpeakerVoice,
    synthRef,
    error: voicesError,
    reloadVoices,
    getPerformanceLevel,
    autoOptimizeSettings,
    getVoiceMetrics,
    warmupVoices
  } = useVoices();

  const { parsedScript, speakers } = useScriptParser(script);

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
    getTTSMetrics
  } = useTextToSpeech({
    getSpeakerVoice,
    synthRef,
    isScriptPlaying
  });

  const filteredConversations = useMemo(() => {
    return parsedScript.filter(conv => {
      const speakerMatch = !highlightedSpeaker || conv.speaker === highlightedSpeaker;
      const textMatch = !searchTerm || conv.text.toLowerCase().includes(searchTerm.toLowerCase());
      return speakerMatch && textMatch;
    });
  }, [parsedScript, highlightedSpeaker, searchTerm]);

  const performanceLevel = useMemo(() => getPerformanceLevel(), [getPerformanceLevel]);

  const optimizedSettings = useMemo(() => {
    return autoOptimize ? autoOptimizeSettings() : { rate: playbackRate, pitch: playbackPitch, volume: playbackVolume };
  }, [autoOptimize, autoOptimizeSettings, playbackRate, playbackPitch, playbackVolume]);

  useEffect(() => {
    if (autoOptimize && currentPlayingIndex !== -1) {
      scrollToElement(`conv-${currentPlayingIndex}`, true);
    }
  }, [currentPlayingIndex, autoOptimize]);

  const handlePlayScript = useCallback(async () => {
    if (!synthRef.current || allVoices.length === 0) return;

    if (isScriptPlaying) {
      if (isPaused) {
        try {
          resumeScript();
          setIsScriptPlaying(true);
        } catch (error) {
          console.warn('⚠️ Resume error:', error);
        }
      } else {
        pauseScript();
        setIsScriptPlaying(false);
      }
      return;
    }

    const toPlay = autoOptimize ? optimizeConversations(filteredConversations) : filteredConversations;

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
      
      setTimeout(() => {
        try {
          speakNextInQueue();
        } catch (error) {
          console.warn('⚠️ Speak error:', error);
        }
      }, 100);
    }
  }, [filteredConversations, isScriptPlaying, isPaused, allVoices.length, pauseScript, resumeScript, queueConversations, speakNextInQueue, synthRef, setCurrentPlayingIndex, autoOptimize, optimizeConversations, performanceLevel, speakers, warmupVoices, optimizedSettings]);

  const handlePlayConversation = useCallback((index) => {
    if (!synthRef.current || allVoices.length === 0) return;

    try {
      stopScript();
      const conv = filteredConversations[index];
      if (conv) {
        setTimeout(() => {
          try {
            queueConversations(
              [conv],
              (speaker) => getSpeakerTTSOptions(speaker, optimizedSettings.rate, optimizedSettings.volume),
              false
            );
            setCurrentPlayingIndex(index);
            setTimeout(() => speakNextInQueue(), 50);
          } catch (error) {
            console.warn('⚠️ Queue error:', error);
          }
        }, 100);
      }
    } catch (error) {
      console.warn('⚠️ Play error:', error);
    }
  }, [filteredConversations, optimizedSettings, queueConversations, speakNextInQueue, stopScript, synthRef, allVoices.length, setCurrentPlayingIndex]);

  const handleCopy = useCallback(() => {
    copyScriptToClipboard(filteredConversations);
  }, [filteredConversations]);

  const handleStop = useCallback(() => {
    try {
      stopScript();
    } catch (error) {
      console.warn('⚠️ Stop error:', error);
    }
    setIsScriptPlaying(false);
  }, [stopScript]);

  if (voicesError) return <ErrorState error={voicesError} onRetry={reloadVoices} />;
  if (allVoices.length === 0) return <LoadingState />;
  if (!script) return <EmptyState />;

  return (
    <div className="relative w-full space-y-2.5 sm:space-y-4 max-w-6xl mx-auto px-2 sm:px-3 md:px-4">
      <OptimizedBackground />
      
      {showMetrics && (
        <Suspense fallback={<div className="h-16 sm:h-20 bg-amber-100 rounded-lg animate-pulse" />}>
          <VoiceMetricsBadge
            voiceMetrics={getVoiceMetrics()}
            ttsMetrics={getTTSMetrics()}
            performanceLevel={performanceLevel}
            isPlaying={isScriptPlaying}
          />
        </Suspense>
      )}

      <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-lg sm:rounded-2xl md:rounded-3xl shadow-lg border-2 border-amber-200 overflow-hidden transition-all duration-300 hover:shadow-xl" role="region" aria-label={`${partTitle} Script`}>
        
        <ScriptHeader
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          partTitle={partTitle}
          parsedScriptLength={parsedScript.length}
          speakersLength={speakers.length}
          isScriptPlaying={isScriptPlaying}
          playingTime={playingTime}
        />

        {isExpanded && (
          <div className="space-y-2.5 sm:space-y-4 p-3 sm:p-4 md:p-6">
            
            <ControlsGrid
              isScriptPlaying={isScriptPlaying}
              isPaused={isPaused}
              allVoicesLength={allVoices.length}
              showSettings={showSettings}
              onPlayScript={handlePlayScript}
              onStop={handleStop}
              onToggleSettings={() => setShowSettings(!showSettings)}
              onCopy={handleCopy}
            />

            {showSettings && (
              <SettingsPanel
                optimizedSettings={optimizedSettings}
                autoOptimize={autoOptimize}
                showMetrics={showMetrics}
                onRateChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                onPitchChange={(e) => setPlaybackPitch(parseFloat(e.target.value))}
                onVolumeChange={(e) => setPlaybackVolume(parseFloat(e.target.value))}
                onAutoOptimizeChange={(e) => setAutoOptimize(e.target.checked)}
                onToggleMetrics={() => setShowMetrics(!showMetrics)}
              />
            )}

            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
            />

            <ScriptContent
              filteredConversations={filteredConversations}
              currentPlayingIndex={currentPlayingIndex}
              onPlayConversation={handlePlayConversation}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ScriptDisplay.displayName = 'ScriptDisplay';

export default ScriptDisplay;
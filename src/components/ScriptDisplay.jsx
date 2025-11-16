import React, { Suspense, useState, useMemo, useCallback, useRef, useEffect, memo } from 'react';
import { ChevronDown, ChevronUp, FileText, Play, Pause, Copy, Sliders, Search, X, Star, Zap, RefreshCw, Loader2 } from 'lucide-react';
import { useVoices } from './hooks/useVoices';
import { useScriptParser } from './hooks/useScriptParser';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { getSpeakerColor, getSpeakerIcon, getSpeakerTTSOptions, copyScriptToClipboard, scrollToElement } from './utils/scriptUtils';
import VoiceMetricsBadge from './VoiceMetricsBadge';

// ✅ Optimized Background - Removed animations
const OptimizedBackground = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl" />
    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-amber-400/8 rounded-full blur-2xl" />
  </div>
));

OptimizedBackground.displayName = 'OptimizedBackground';

// ✅ Error State Component
const ErrorState = memo(({ error, onRetry }) => (
  <div className="relative z-10 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-3xl p-8 text-center shadow-lg w-full max-w-3xl mx-auto backdrop-blur-sm" role="alert">
    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
      <Zap className="w-8 h-8 text-white" />
    </div>
    <h4 className="text-xl font-bold text-red-800 mb-3">TTS Service Error</h4>
    <p className="text-sm text-red-700 mb-6">{error}</p>
    <button 
      onClick={onRetry} 
      className="inline-flex items-center gap-3 text-sm bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95"
    >
      <RefreshCw className="w-4 h-4" /> Retry Loading Voices
    </button>
  </div>
));

ErrorState.displayName = 'ErrorState';

// ✅ Loading State Component
const LoadingState = memo(() => (
  <div className="relative z-10 w-full bg-gradient-to-br from-white to-amber-50 rounded-3xl shadow-lg border-2 border-amber-200 overflow-hidden max-w-3xl mx-auto backdrop-blur-sm">
    <div className="p-12 flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
      <p className="text-center text-lg text-amber-800 font-semibold mt-4">Loading AI Voices...</p>
      <p className="text-center text-sm text-amber-600 mt-2">Preparing the best voice experience</p>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';

// ✅ Empty State Component
const EmptyState = memo(() => (
  <div className="relative z-10 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-amber-300 rounded-3xl p-8 text-center shadow-lg w-full max-w-3xl mx-auto backdrop-blur-sm" role="alert">
    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
      <FileText className="w-8 h-8 text-white" />
    </div>
    <p className="text-xl font-bold text-amber-800">Script Not Available</p>
    <p className="text-sm text-amber-700 mt-2">Please check the script source</p>
  </div>
));

EmptyState.displayName = 'EmptyState';

// ✅ Controls Grid - Memoized
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    <button
      onClick={onPlayScript}
      disabled={allVoicesLength === 0}
      className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden active:scale-95"
    >
      <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      {isScriptPlaying ? (isPaused ? <Play className="w-4 h-4 sm:w-5" /> : <Pause className="w-4 h-4 sm:w-5" />) : <Play className="w-4 h-4 sm:w-5" />}
      <span className="text-xs sm:text-sm">{isScriptPlaying ? (isPaused ? 'RESUME' : 'PAUSE') : 'PLAY ALL'}</span>
    </button>

    {isScriptPlaying && (
      <button
        onClick={onStop}
        className="bg-white border-2 border-red-300 text-red-600 hover:bg-red-50 font-bold rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
      >
        <X className="w-4 h-4 sm:w-5" />
        <span className="text-xs sm:text-sm">STOP</span>
      </button>
    )}

    <button
      onClick={onToggleSettings}
      className={`bg-white border-2 font-bold rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
        showSettings ? 'border-amber-400 text-amber-600 bg-amber-50' : 'border-amber-200 text-gray-600 hover:border-amber-400'
      }`}
    >
      <Sliders className="w-4 h-4 sm:w-5" />
      <span className="text-xs sm:text-sm">SETTINGS</span>
    </button>

    <button
      onClick={onCopy}
      className="bg-white border-2 border-amber-200 text-gray-600 hover:border-amber-400 hover:text-amber-600 font-bold rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
    >
      <Copy className="w-4 h-4 sm:w-5" />
      <span className="text-xs sm:text-sm">COPY</span>
    </button>
  </div>
));

ControlsGrid.displayName = 'ControlsGrid';

// ✅ Settings Panel - Memoized
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
  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 sm:p-6 space-y-4 backdrop-blur-sm">
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <h4 className="text-base sm:text-lg font-bold text-amber-800">Voice Settings</h4>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMetrics}
          className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-amber-300 rounded-lg text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-colors active:scale-95"
        >
          <Star className="w-4 h-4" />
          <span className="hidden sm:inline">Metrics</span>
        </button>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={autoOptimize}
            onChange={onAutoOptimizeChange}
            className="sr-only"
          />
          <div className={`w-11 h-6 rounded-full transition-colors ${autoOptimize ? 'bg-amber-500' : 'bg-gray-300'}`} />
          <div className={`absolute left-1 w-4 h-4 bg-white rounded-full transition-transform ${autoOptimize ? 'translate-x-5' : ''}`} style={{position: 'relative'}} />
          <span className="text-xs sm:text-sm font-semibold text-amber-800">Auto</span>
        </label>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-amber-700 flex justify-between">
          <span>Speed: {(optimizedSettings.rate * 100).toFixed(0)}%</span>
          {autoOptimize && <span className="text-xs text-amber-500">Auto</span>}
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
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-amber-700 flex justify-between">
          <span>Pitch: {(optimizedSettings.pitch * 100).toFixed(0)}%</span>
          {autoOptimize && <span className="text-xs text-amber-500">Auto</span>}
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
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-bold text-amber-700 flex justify-between">
          <span>Volume: {(optimizedSettings.volume * 100).toFixed(0)}%</span>
          {autoOptimize && <span className="text-xs text-amber-500">Auto</span>}
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

// ✅ Search Bar - Memoized
const SearchBar = memo(({ searchTerm, onSearchChange }) => (
  <div className="relative group">
    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 transition-colors group-hover:text-amber-600" />
    <input
      type="text"
      placeholder="Search in script..."
      value={searchTerm}
      onChange={onSearchChange}
      className="w-full pl-12 pr-12 py-3 rounded-2xl border-2 border-amber-200 focus:border-amber-400 outline-none text-sm bg-white/80 backdrop-blur-sm transition-all duration-200 focus:bg-white focus:shadow-lg"
    />
    {searchTerm && (
      <button
        onClick={() => onSearchChange({ target: { value: '' } })}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-amber-600 transition-colors active:scale-95"
      >
        <X className="w-5 h-5" />
      </button>
    )}
  </div>
));

SearchBar.displayName = 'SearchBar';

// ✅ Conversation Item - Memoized
const ConversationItem = memo(({ 
  conv, 
  index, 
  isPlaying, 
  onPlay 
}) => (
  <div
    id={`conv-${index}`}
    className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer group hover:shadow-lg active:scale-95 ${
      isPlaying
        ? 'ring-4 ring-amber-400 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg scale-[1.01]'
        : `${getSpeakerColor(conv.speaker)} hover:border-amber-300`
    }`}
    onClick={() => onPlay(index)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onPlay(index)}
  >
    <div className="flex items-start gap-3">
      <div className="text-2xl flex-shrink-0 transition-transform group-hover:scale-110">
        {getSpeakerIcon(conv.speaker)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <p className="font-bold text-sm text-gray-800 bg-white/80 px-2.5 py-1 rounded-full border border-amber-200">
            {conv.speaker}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(index);
            }}
            className="p-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full flex-shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md hover:shadow-lg active:scale-90"
          >
            <Play className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed text-sm break-words">
          {conv.text}
        </p>
      </div>
    </div>
  </div>
));

ConversationItem.displayName = 'ConversationItem';

// ✅ Script Content Area - Memoized
const ScriptContent = memo(({ 
  filteredConversations, 
  currentPlayingIndex,
  onPlayConversation 
}) => (
  <div className="p-4 sm:p-6 space-y-3 max-h-[600px] overflow-y-auto bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-2xl border-2 border-amber-200 backdrop-blur-sm scrollbar-thin">
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

// ✅ Header - Memoized
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
    className="w-full flex items-center justify-between p-5 sm:p-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 transition-all duration-300 group relative overflow-hidden"
    aria-expanded={isExpanded}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    
    <div className="flex items-center gap-3 relative z-10 min-w-0">
      <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg flex-shrink-0">
        <FileText className="w-6 h-6 sm:w-7 text-white" />
      </div>
      <div className="text-left min-w-0">
        <h3 className="text-lg sm:text-2xl font-bold text-white truncate">Script & Transcript</h3>
        <div className="flex items-center gap-2 text-amber-100 text-xs sm:text-sm flex-wrap">
          <span className="bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm truncate">{partTitle}</span>
          <span className="hidden sm:inline">{parsedScriptLength} lines</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{speakersLength} speakers</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2 relative z-10 flex-shrink-0">
      {isScriptPlaying && (
        <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-100 font-bold">{playingTime}</span>
        </div>
      )}
      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
        {isExpanded ? 
          <ChevronUp className="w-5 h-5 text-white transition-transform" /> : 
          <ChevronDown className="w-5 h-5 text-white transition-transform" />
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
  // ==================== STATE ====================
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

  // ==================== MEMOIZED VALUES ====================
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

  // ==================== AUTO-SCROLL ====================
  useEffect(() => {
    if (autoOptimize && currentPlayingIndex !== -1) {
      scrollToElement(`conv-${currentPlayingIndex}`, true);
    }
  }, [currentPlayingIndex, autoOptimize]);

  // ==================== CALLBACKS ====================
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
      speakNextInQueue();
    }
  }, [filteredConversations, isScriptPlaying, isPaused, allVoices.length, pauseScript, resumeScript, queueConversations, speakNextInQueue, synthRef, setCurrentPlayingIndex, autoOptimize, optimizeConversations, performanceLevel, speakers, warmupVoices, optimizedSettings]);

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
  }, [filteredConversations, optimizedSettings, queueConversations, speakNextInQueue, stopScript, synthRef, allVoices.length, setCurrentPlayingIndex]);

  const handleCopy = useCallback(() => {
    copyScriptToClipboard(filteredConversations);
  }, [filteredConversations]);

  const handleStop = useCallback(() => {
    stopScript();
    setIsScriptPlaying(false);
  }, [stopScript]);

  // ==================== RENDER ====================
  if (voicesError) {
    return <ErrorState error={voicesError} onRetry={reloadVoices} />;
  }

  if (allVoices.length === 0) {
    return <LoadingState />;
  }

  if (!script) {
    return <EmptyState />;
  }

  return (
    <div className="relative w-full space-y-4 max-w-6xl mx-auto px-3 sm:px-4">
      <OptimizedBackground />
      
      {showMetrics && (
        <Suspense fallback={<div className="h-20 bg-amber-100 rounded-lg animate-pulse" />}>
          <VoiceMetricsBadge
            voiceMetrics={getVoiceMetrics()}
            ttsMetrics={getTTSMetrics()}
            performanceLevel={performanceLevel}
            isPlaying={isScriptPlaying}
          />
        </Suspense>
      )}

      <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg border-2 border-amber-200 overflow-hidden transition-all duration-300 hover:shadow-xl" role="region" aria-label={`${partTitle} Script`}>
        
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
          <div className="space-y-4 p-4 sm:p-6">
            
            {/* Tab Navigation */}
            <div className="flex border-b-2 border-amber-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab('script')}
                className={`px-4 py-2.5 font-semibold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'script' 
                    ? 'border-amber-500 text-amber-700' 
                    : 'border-transparent text-gray-500 hover:text-amber-600'
                }`}
              >
                Script
              </button>
              <button
                onClick={() => setActiveTab('speakers')}
                className={`px-4 py-2.5 font-semibold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'speakers' 
                    ? 'border-amber-500 text-amber-700' 
                    : 'border-transparent text-gray-500 hover:text-amber-600'
                }`}
              >
                Speakers ({speakers.length})
              </button>
            </div>

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
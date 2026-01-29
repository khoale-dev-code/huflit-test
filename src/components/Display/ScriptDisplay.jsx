import React, { useState, useMemo, useCallback, useEffect, memo, useRef } from 'react';
import { Play, Pause, Square, RotateCcw, Loader2, AlertCircle, Volume2 } from 'lucide-react';
import { useVoices } from '../hooks/useVoices';
import { useScriptParser } from '../hooks/useScriptParser';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { getSpeakerColor, getSpeakerIcon, getSpeakerTTSOptions } from '../utils/scriptUtils';

// ==================== STATE COMPONENTS ====================
const ErrorState = memo(({ error, onRetry }) => (
  <div className="w-full flex items-center justify-center p-4 bg-white rounded-xl border border-red-200">
    <div className="max-w-md w-full">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-50 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">Oops! Something went wrong</h3>
        <p className="text-sm text-slate-600 text-center mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    </div>
  </div>
));
ErrorState.displayName = 'ErrorState';

const LoadingState = memo(() => (
  <div className="w-full flex items-center justify-center p-8 bg-white rounded-xl border border-slate-200">
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-12 h-12">
        <Loader2 className="w-full h-full text-blue-500 animate-spin" />
      </div>
      <p className="text-slate-600 font-medium">Loading voices...</p>
    </div>
  </div>
));
LoadingState.displayName = 'LoadingState';

const EmptyState = memo(() => (
  <div className="w-full flex items-center justify-center p-8 bg-white rounded-xl border border-slate-200">
    <div className="text-center">
      <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <Volume2 className="w-8 h-8 text-slate-500" />
      </div>
      <p className="text-slate-600 font-medium">No script to display</p>
    </div>
  </div>
));
EmptyState.displayName = 'EmptyState';

// ==================== CONVERSATION ITEM ====================
const ConversationItem = memo(({
  conv,
  index,
  isPlaying
}) => {
  const Icon = getSpeakerIcon(conv.speaker);
  
  return (
    <div
      id={`conv-${index}`}
      className={`transition-all duration-300 rounded-xl p-4 border-l-4 transform origin-left ${
        isPlaying
          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500 scale-105 shadow-md'
          : 'bg-white border-slate-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`text-2xl flex-shrink-0 transition-transform duration-300 ${
          isPlaying ? 'scale-110' : ''
        }`}>
          {Icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-xs uppercase tracking-wide mb-1 transition-colors ${
            isPlaying ? 'text-blue-600' : 'text-slate-600'
          }`}>
            {conv.speaker}
          </p>
          <p className={`text-sm leading-relaxed break-words transition-colors ${
            isPlaying ? 'text-slate-900 font-medium' : 'text-slate-700'
          }`}>
            {conv.text}
          </p>
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  return prev.isPlaying === next.isPlaying &&
         prev.conv.speaker === next.conv.speaker &&
         prev.conv.text === next.conv.text;
});
ConversationItem.displayName = 'ConversationItem';

// ==================== SCRIPT CONTENT ====================
const ScriptContent = memo(({
  conversations,
  currentIndex
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (currentIndex >= 0) {
      const element = document.getElementById(`conv-${currentIndex}`);
      if (element && containerRef.current) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto space-y-2 pr-2 scroll-smooth min-h-0"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f1f5f9'
      }}
    >
      {conversations.map((conv, index) => (
        <ConversationItem
          key={`${conv.speaker}-${index}`}
          conv={conv}
          index={index}
          isPlaying={currentIndex === index}
        />
      ))}
    </div>
  );
});
ScriptContent.displayName = 'ScriptContent';

// ==================== CONTROL BUTTONS ====================
const ControlButtons = memo(({
  isPlaying,
  isPaused,
  isDisabled,
  onPlay,
  onPause,
  onStop
}) => (
  <div className="flex items-center gap-2 w-full">
    {!isPlaying ? (
      <button
        onClick={onPlay}
        disabled={isDisabled}
        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        title="Play"
      >
        <Play className="w-5 h-5 fill-current" />
        <span className="text-sm">Play</span>
      </button>
    ) : (
      <>
        <button
          onClick={onPause}
          className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          title="Pause"
        >
          <Pause className="w-5 h-5 fill-current" />
          <span className="text-sm">Pause</span>
        </button>
        <button
          onClick={onStop}
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          title="Stop"
        >
          <Square className="w-5 h-5 fill-current" />
          <span className="text-sm">Stop</span>
        </button>
      </>
    )}
  </div>
));
ControlButtons.displayName = 'ControlButtons';

// ==================== HEADER ====================
const Header = memo(({ title, lineCount, isPlaying, isPaused, playingTime, currentSpeaker }) => (
  <div className="w-full bg-white border-b border-slate-200 px-6 py-4 md:py-5">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{title}</h1>
        <p className="text-sm text-slate-600">{lineCount} lines</p>
      </div>
      
      {(isPlaying || isPaused) && (
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 rounded-lg border border-blue-200 flex-shrink-0">
          {isPlaying && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-900">{playingTime}</span>
              {currentSpeaker && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="text-sm font-medium text-slate-700">{currentSpeaker}</span>
                </>
              )}
            </div>
          )}
          {isPaused && (
            <span className="text-sm font-medium text-slate-700">⏸ Paused</span>
          )}
        </div>
      )}
    </div>
  </div>
));
Header.displayName = 'Header';

// ==================== MAIN COMPONENT ====================
const ScriptDisplay = ({
  script,
  partTitle = "Script",
  showByDefault = true
}) => {
  const [isScriptPlaying, setIsScriptPlaying] = useState(false);
  const [pausedIndex, setPausedIndex] = useState(-1);
  
  const {
    allVoices,
    getSpeakerVoice,
    synthRef,
    error: voicesError,
    reloadVoices,
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
    queueConversations
  } = useTextToSpeech({
    getSpeakerVoice,
    synthRef,
    isScriptPlaying
  });

  const handlePlay = useCallback(async () => {
    if (!synthRef.current || allVoices.length === 0 || parsedScript.length === 0) return;
    
    if (isPaused && pausedIndex >= 0) {
      resumeScript();
      setIsScriptPlaying(true);
      setPausedIndex(-1);
      return;
    }

    if (speakers.length > 0) {
      await warmupVoices(speakers.slice(0, 3));
    }

    const hasQueue = queueConversations(
      parsedScript,
      (speaker) => getSpeakerTTSOptions(speaker, 0.9, 1),
      false
    );

    if (hasQueue) {
      setIsScriptPlaying(true);
      setCurrentPlayingIndex(-1);
      setPausedIndex(-1);
      
      setTimeout(() => {
        try {
          speakNextInQueue();
        } catch (error) {
          console.warn('Speech error:', error);
          setIsScriptPlaying(false);
        }
      }, 100);
    }
  }, [parsedScript, synthRef, allVoices.length, speakers, warmupVoices, queueConversations, speakNextInQueue, setCurrentPlayingIndex, isPaused, pausedIndex, resumeScript]);

  const handlePause = useCallback(() => {
    pauseScript();
    setIsScriptPlaying(false);
    setPausedIndex(currentPlayingIndex);
  }, [pauseScript, currentPlayingIndex]);

  const handleStop = useCallback(() => {
    stopScript();
    setIsScriptPlaying(false);
    setPausedIndex(-1);
    setCurrentPlayingIndex(-1);
  }, [stopScript, setCurrentPlayingIndex]);

  if (voicesError) {
    return <ErrorState error={voicesError} onRetry={reloadVoices} />;
  }

  if (allVoices.length === 0) {
    return <LoadingState />;
  }

  if (!script || parsedScript.length === 0) {
    return <EmptyState />;
  }

  const currentSpeaker = currentPlayingIndex >= 0 ? parsedScript[currentPlayingIndex]?.speaker : null;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col relative z-30">
      {/* Header - Fixed Height */}
      <div className="flex-shrink-0">
        <Header
          title={partTitle}
          lineCount={parsedScript.length}
          isPlaying={isScriptPlaying}
          isPaused={isPaused}
          playingTime={playingTime}
          currentSpeaker={currentSpeaker}
        />
      </div>

      {/* Script Content - Takes remaining space */}
      <div className="flex-1 overflow-y-auto min-h-[200px] p-4">
        <ScriptContent
          conversations={parsedScript}
          currentIndex={currentPlayingIndex}
        />
      </div>

      {/* Pause Indicator - Fixed Height */}
      {isPaused && pausedIndex >= 0 && (
        <div className="flex-shrink-0 px-4 py-3 bg-amber-50 border-t border-amber-200 flex items-center gap-3">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-900">Paused at</p>
            <p className="text-xs text-amber-700">{parsedScript[pausedIndex]?.speaker}</p>
          </div>
        </div>
      )}

      {/* Control Buttons - Fixed Height, Always Visible */}
      <div className="flex-shrink-0 px-4 py-4 bg-gradient-to-t from-white to-slate-50 border-t border-slate-200">
        <ControlButtons
          isPlaying={isScriptPlaying}
          isPaused={isPaused}
          isDisabled={allVoices.length === 0}
          onPlay={handlePlay}
          onPause={handlePause}
          onStop={handleStop}
        />
      </div>
    </div>
  );
};

ScriptDisplay.displayName = 'ScriptDisplay';
export default memo(ScriptDisplay);
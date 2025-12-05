import React, { useState, useMemo, useCallback, useEffect, memo, useRef } from 'react';
import { ChevronDown, ChevronUp, FileText, Play, Pause, Square, RefreshCcw, Loader2, AlertCircle, Volume2 } from 'lucide-react';
import { useVoices } from '../hooks/useVoices';
import { useScriptParser } from '../hooks/useScriptParser';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { getSpeakerColor, getSpeakerIcon, getSpeakerTTSOptions } from '../utils/scriptUtils';

// ==================== SUB-COMPONENTS ====================

const ErrorState = memo(({ error, onRetry }) => (
  <div className="w-full min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-red-300 flex items-center justify-center p-4">
    <div className="w-full max-w-xl bg-gradient-to-b from-red-600 to-red-800 border-8 border-yellow-400 rounded-2xl p-6 shadow-2xl text-center" style={{ boxShadow: '0 0 40px rgba(234,179,8,0.6)' }}>
      <AlertCircle className="w-12 h-12 text-yellow-300 mx-auto mb-3 animate-bounce" />
      <p className="text-yellow-100 font-bold text-base md:text-lg mb-2">⚠ ERROR ⚠</p>
      <p className="text-yellow-50 text-xs md:text-sm font-mono mb-4 break-words">{error}</p>
      <button 
        onClick={onRetry} 
        className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold rounded-lg transition-all active:scale-95 font-mono text-xs md:text-sm border-3 border-yellow-600 shadow-lg"
      >
        <RefreshCcw className="w-3 h-3 md:w-4 md:h-4 inline mr-1.5" /> RETRY
      </button>
    </div>
  </div>
));
ErrorState.displayName = 'ErrorState';

const LoadingState = memo(() => (
  <div className="w-full min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-red-300 flex items-center justify-center p-4">
    <div className="w-full max-w-xl bg-gradient-to-b from-blue-500 to-blue-700 border-8 border-yellow-400 rounded-2xl p-6 text-center" style={{ boxShadow: '0 0 40px rgba(234,179,8,0.6)' }}>
      <Loader2 className="w-10 h-10 text-yellow-300 animate-spin mx-auto mb-3" />
      <p className="text-yellow-200 font-mono font-bold text-xs md:text-sm">INITIALIZING...</p>
    </div>
  </div>
));
LoadingState.displayName = 'LoadingState';

const EmptyState = memo(() => (
  <div className="w-full min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-red-300 flex items-center justify-center p-4">
    <div className="w-full max-w-xl bg-gradient-to-b from-blue-500 to-blue-700 border-8 border-yellow-400 rounded-2xl p-6 text-center" style={{ boxShadow: '0 0 40px rgba(234,179,8,0.6)' }}>
      <FileText className="w-10 h-10 text-yellow-300/60 mx-auto mb-3" />
      <p className="text-yellow-300 font-mono font-bold text-xs md:text-sm">NO SCRIPT</p>
    </div>
  </div>
));
EmptyState.displayName = 'EmptyState';

const ControlButtons = memo(({ 
  isPlaying, 
  isPaused,
  isDisabled,
  onPlay,
  onPause,
  onStop
}) => (
  <div className="flex items-center justify-center gap-2 w-full">
    {!isPlaying ? (
      <button
        onClick={onPlay}
        disabled={isDisabled}
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-b from-green-400 via-green-500 to-green-600 hover:from-green-300 hover:via-green-400 hover:to-green-500 disabled:from-gray-400 disabled:via-gray-450 disabled:to-gray-500 text-black font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all active:scale-95 border-3 md:border-4 border-green-700 disabled:border-gray-600 text-sm md:text-base font-mono tracking-wider"
        title="Play"
      >
        <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
        <span>PLAY</span>
      </button>
    ) : (
      <>
        <button
          onClick={onPause}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 text-black font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all active:scale-95 border-3 md:border-4 border-yellow-700 text-sm md:text-base font-mono tracking-wider"
          title="Pause"
        >
          <Pause className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          <span>PAUSE</span>
        </button>

        <button
          onClick={onStop}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-b from-red-500 via-red-600 to-red-700 hover:from-red-400 hover:via-red-500 hover:to-red-600 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all active:scale-95 border-3 md:border-4 border-red-800 text-sm md:text-base font-mono tracking-wider"
          title="Stop"
        >
          <Square className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          <span>STOP</span>
        </button>
      </>
    )}
  </div>
));
ControlButtons.displayName = 'ControlButtons';

const ConversationItem = memo(({ 
  conv, 
  index, 
  isPlaying
}) => {
  const Icon = getSpeakerIcon(conv.speaker);
  
  return (
    <div
      id={`conv-${index}`}
      className={`transition-all duration-300 transform rounded-lg border-2 font-mono text-xs md:text-sm ${
        isPlaying
          ? 'scale-105 bg-gradient-to-r from-yellow-300 to-orange-300 border-orange-600 shadow-lg ring-2 ring-yellow-400 p-2.5 md:p-3'
          : 'bg-gradient-to-r from-cyan-200 to-cyan-100 border-cyan-500 hover:border-cyan-600 p-2.5 md:p-3 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="text-lg md:text-2xl flex-shrink-0">
          {Icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-xs mb-0.5 uppercase tracking-wider ${
            isPlaying 
              ? 'text-orange-900' 
              : 'text-cyan-900'
          }`}>
            {conv.speaker}
          </p>
          <p className={`leading-relaxed text-xs break-words ${
            isPlaying 
              ? 'text-orange-800' 
              : 'text-cyan-900'
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

const ScriptContent = memo(({ 
  conversations, 
  currentIndex
}) => (
  <div className="h-72 md:h-96 lg:h-[28rem] overflow-y-auto space-y-1.5 md:space-y-2 pr-2 bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg p-3 md:p-4 border-2 md:border-3 border-blue-300" style={{ scrollbarColor: '#f59e0b #dbeafe' }}>
    {conversations.map((conv, index) => (
      <ConversationItem
        key={`${conv.speaker}-${index}`}
        conv={conv}
        index={index}
        isPlaying={currentIndex === index}
      />
    ))}
  </div>
));
ScriptContent.displayName = 'ScriptContent';

const StatusBar = memo(({ title, lineCount, isPlaying, isPaused, playingTime, currentSpeaker }) => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b-2 md:border-b-3 border-blue-900 px-3 md:px-4 py-2 md:py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-1.5 md:gap-2 font-mono text-xs">
    <div className="flex items-center gap-1 md:gap-1.5 flex-wrap w-full md:w-auto">
      <div className="flex items-center gap-0.5 md:gap-1">
        <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-amber-400 animate-pulse flex-shrink-0" />
        <span className="text-amber-400 font-bold uppercase tracking-wide">SCRIPT</span>
      </div>
      <span className="text-amber-400 font-bold hidden sm:inline">•</span>
      <span className="text-amber-300 font-bold truncate text-xs">{title}</span>
      <span className="text-amber-400 font-bold hidden sm:inline">•</span>
      <span className="text-amber-200 text-xs">{lineCount}L</span>
    </div>
    <div className="flex items-center gap-1 md:gap-1.5 flex-wrap">
      {isPlaying && (
        <div className="flex items-center gap-0.5 bg-green-500/30 px-2 md:px-2.5 py-1 rounded border border-green-400">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
          <span className="text-green-100 font-bold uppercase text-xs">{playingTime}</span>
          {currentSpeaker && (
            <>
              <span className="text-amber-400 hidden sm:inline">•</span>
              <span className="text-amber-300 font-bold uppercase hidden sm:inline truncate text-xs">{currentSpeaker}</span>
            </>
          )}
        </div>
      )}
      {isPaused && (
        <span className="text-amber-400 font-bold uppercase animate-pulse bg-amber-500/30 px-2 md:px-2.5 py-1 rounded border border-amber-400 text-xs">⏸</span>
      )}
    </div>
  </div>
));
StatusBar.displayName = 'StatusBar';

// ==================== MAIN COMPONENT ====================

const ScriptDisplay = ({
  script,
  partTitle = "Script",
  showByDefault = true
}) => {
  const [isExpanded, setIsExpanded] = useState(showByDefault);
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

  useEffect(() => {
    if (currentPlayingIndex >= 0) {
      const element = document.getElementById(`conv-${currentPlayingIndex}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }, [currentPlayingIndex]);

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
    <div className="w-full min-h-screen flex items-center justify-center p-2 md:p-6 lg:p-8 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
      {/* TV Container - Proportional Square */}
      <div className="relative w-full max-w-sm lg:max-w-3xl">
        {/* Antenna - Left */}
        <div className="absolute -top-20 md:-top-28 left-1/4 z-20 flex flex-col items-center">
          <div 
            className="w-0.5 md:w-1 h-20 md:h-28 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 rounded-full shadow-lg"
            style={{ 
              transform: 'rotate(-40deg)', 
              transformOrigin: 'bottom center',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
            }}
          />
        </div>

        {/* Antenna - Right */}
        <div className="absolute -top-20 md:-top-28 right-1/4 z-20 flex flex-col items-center">
          <div 
            className="w-0.5 md:w-1 h-20 md:h-28 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 rounded-full shadow-lg"
            style={{ 
              transform: 'rotate(40deg)', 
              transformOrigin: 'bottom center',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
            }}
          />
        </div>

        {/* TV Body - Square Aspect Ratio */}
        <div 
          className="w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative"
          style={{
            background: 'linear-gradient(135deg, #5c2e0f 0%, #8b4513 25%, #a0522d 50%, #8b4513 75%, #5c2e0f 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.4)'
          }}
        >
          {/* Wood grain texture */}
          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.4) 1px, transparent 2px, transparent 80px)',
            pointerEvents: 'none'
          }} />
          
          {/* Padding for screen */}
          <div className="h-full p-3 md:p-5 flex flex-col relative z-10">
            {/* Screen Bezel - Orange/Brown */}
            <div 
              className="flex-1 rounded-lg md:rounded-2xl overflow-hidden shadow-xl flex flex-col"
              style={{
                background: 'linear-gradient(135deg, #d97706 0%, #f97316 50%, #d97706 100%)',
                boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.3), inset 0 -4px 12px rgba(0,0,0,0.4), 0 0 40px rgba(217,119,6,0.5)',
                padding: '12px 12px 10px 12px'
              }}
            >
              {/* Status Bar */}
              <StatusBar
                title={partTitle}
                lineCount={parsedScript.length}
                isPlaying={isScriptPlaying}
                isPaused={isPaused}
                playingTime={playingTime}
                currentSpeaker={currentSpeaker}
              />

              {/* Screen Content - Blue */}
              <div className="flex-1 bg-gradient-to-b from-blue-200 via-blue-100 to-cyan-100 mt-2 md:mt-3 p-3 md:p-4 rounded-lg relative z-10 flex flex-col overflow-hidden">
                {/* Light scanlines */}
                <div className="absolute inset-0 pointer-events-none rounded-lg" style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 2px, transparent 2px, transparent 4px)' }} />
                
                <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
                  {/* Script Content */}
                  <div className="flex-1 overflow-hidden mb-3">
                    <ScriptContent
                      conversations={parsedScript}
                      currentIndex={currentPlayingIndex}
                    />
                  </div>

                  {/* Control Panel */}
                  <div className="bg-gradient-to-b from-blue-300 to-blue-200 border-2 border-blue-500 rounded-lg p-2.5 md:p-3 space-y-2 md:space-y-3 shadow-lg flex-shrink-0">
                    {isPaused && pausedIndex >= 0 && (
                      <div className="bg-yellow-200 border-l-2 border-yellow-600 px-2 md:px-3 py-1.5 rounded text-xs">
                        <p className="text-yellow-900 font-mono font-bold uppercase tracking-tight">
                          ⏸ <span className="text-xs">{parsedScript[pausedIndex]?.speaker}</span>
                        </p>
                      </div>
                    )}
                    
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
              </div>

              {/* Speaker Grille */}
              <div className="mt-2 md:mt-3 h-3 md:h-4 bg-gradient-to-b from-orange-400 to-orange-600 border-t-2 border-orange-700 flex items-center justify-center gap-0.5 px-3 rounded-b-lg">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex-1 h-0.5 bg-orange-900/60 rounded-full" />
                ))}
              </div>
            </div>

            {/* Bottom Control Area */}
            <div className="mt-3 md:mt-4 flex items-center justify-between px-4 md:px-5">
              <div className="text-amber-50 font-mono text-xs font-bold drop-shadow-sm">VOL</div>
              <div className="flex gap-1 md:gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 md:w-2.5 h-4 md:h-5 bg-gradient-to-b from-amber-200 to-amber-700 rounded-sm border border-amber-900 shadow-md" />
                ))}
              </div>
              <div className="text-amber-50 font-mono text-xs font-bold drop-shadow-sm">CH</div>
            </div>
          </div>
        </div>

        {/* TV Stand/Base */}
        <div className="relative -mt-px flex justify-center z-10">
          {/* Base left leg */}
          <div className="absolute bottom-0 left-1/4 w-2 md:w-3 h-5 md:h-6 bg-gradient-to-b from-amber-900 to-yellow-900 rounded-b-lg shadow-lg" style={{ transform: 'skewX(-10deg)' }} />
          
          {/* Base right leg */}
          <div className="absolute bottom-0 right-1/4 w-2 md:w-3 h-5 md:h-6 bg-gradient-to-b from-amber-900 to-yellow-900 rounded-b-lg shadow-lg" style={{ transform: 'skewX(10deg)' }} />
          
          {/* Base platform */}
          <div className="w-4/5 h-3 md:h-5 bg-gradient-to-b from-amber-800 to-yellow-900 rounded-b-2xl shadow-xl border-2 border-t-0 border-amber-900" />
        </div>
      </div>
    </div>
  );
};

ScriptDisplay.displayName = 'ScriptDisplay';

export default memo(ScriptDisplay);
import { useState, useCallback, useRef, useEffect } from 'react';

export const useTextToSpeech = ({ 
  getSpeakerVoice, 
  synthRef, 
  isScriptPlaying, 
  filteredConversations 
}) => {
  // ==================== STATE ====================
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);
  const [playingTime, setPlayingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // ==================== REFS ====================
  const utteranceQueueRef = useRef([]);
  const currentUtteranceRef = useRef(null);
  const isPlayingRef = useRef(false);
  const pausedUtteranceRef = useRef(null);
  const isStoppingRef = useRef(false);
  const isMountedRef = useRef(true);
  const playbackTimeoutRef = useRef(null);
  const retryCountRef = useRef(0);
  const lastSuccessTimeRef = useRef(Date.now());
  
  const metricsRef = useRef({
    totalUtterances: 0,
    totalDuration: 0,
    errorCount: 0,
    interruptCount: 0,
    retryCount: 0
  });

  // ==================== CONSTANTS ====================
  const CONFIG = {
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 300,
    INTER_UTTERANCE_DELAY: 150, // Tăng delay giữa các câu để tự nhiên hơn
    CHUNK_SIZE: 180, // Giảm chunk size để phát âm chính xác hơn
    TIMEOUT_THRESHOLD: 5000,
    MIN_RATE: 0.7, // Tốc độ tối thiểu chậm hơn để rõ ràng
    MAX_RATE: 1.3, // Tốc độ tối đa không quá nhanh
    OPTIMAL_RATE: 0.95, // Tốc độ tối ưu cho sự tự nhiên
  };

  // ==================== SAFETY CHECKS ====================

  const isSynthAvailable = useCallback(() => {
    return synthRef?.current && typeof synthRef.current.speak === 'function';
  }, [synthRef]);

  const safeSetState = useCallback((setter, value) => {
    if (isMountedRef.current) {
      setter(value);
    }
  }, []);

  // ==================== ADVANCED TEXT OPTIMIZATION ====================

  /**
   * 🎨 Tối ưu hóa text cho TTS - Cải thiện chất lượng phát âm
   */
  const optimizeText = useCallback((text) => {
    if (!text || typeof text !== 'string') return '';
    
    return text
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      
      // Fix common abbreviations for better pronunciation
      .replace(/\bMr\./gi, 'Mister')
      .replace(/\bMrs\./gi, 'Missus')
      .replace(/\bMs\./gi, 'Miss')
      .replace(/\bDr\./gi, 'Doctor')
      .replace(/\bProf\./gi, 'Professor')
      .replace(/\bSt\./gi, 'Saint')
      
      // Fix numbers for natural reading
      .replace(/(\d+)%/g, '$1 percent')
      .replace(/\$(\d+)/g, '$1 dollars')
      .replace(/(\d+)°C/g, '$1 degrees Celsius')
      .replace(/(\d+)°F/g, '$1 degrees Fahrenheit')
      
      // Add natural pauses with SSML-like markers (converted to punctuation)
      .replace(/\s*\.\.\.\s*/g, '... ') // Ellipsis pause
      .replace(/\s*--\s*/g, ' — ') // Em dash pause
      
      // Fix sentence spacing for natural rhythm
      .replace(/([.!?])\s+/g, '$1  ') // Double space after sentence
      .replace(/([,;:])\s*/g, '$1 ') // Single space after comma
      
      // Remove problematic characters but keep important punctuation
      .replace(/[^\w\s.,!?'"\-—]/g, '')
      
      // Clean up multiple punctuation
      .replace(/([.!?]){2,}/g, '$1')
      
      // Final trim and normalize
      .trim()
      .replace(/\s+/g, ' ');
  }, []);

  /**
   * 🔪 Chunk text intelligently tại ranh giới tự nhiên
   */
  const chunkText = useCallback((text, maxLength = CONFIG.CHUNK_SIZE) => {
    if (!text || text.length <= maxLength) return [text];

    const chunks = [];
    
    // Ưu tiên cắt tại dấu câu chính
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    
    let currentChunk = '';
    
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;
      
      // Nếu câu hiện tại + chunk quá dài
      if ((currentChunk + trimmed).length > maxLength) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
        }
        
        // Nếu câu đơn lẻ quá dài, cắt tại dấu phẩy
        if (trimmed.length > maxLength) {
          const subParts = trimmed.split(/([,;:])/g);
          let subChunk = '';
          
          for (const part of subParts) {
            if ((subChunk + part).length > maxLength) {
              if (subChunk) chunks.push(subChunk.trim());
              subChunk = part;
            } else {
              subChunk += part;
            }
          }
          
          if (subChunk) currentChunk = subChunk;
        } else {
          currentChunk = trimmed;
        }
      } else {
        currentChunk += (currentChunk ? ' ' : '') + trimmed;
      }
    }
    
    if (currentChunk) chunks.push(currentChunk.trim());
    
    return chunks.length > 0 ? chunks : [text];
  }, []);

  /**
   * 📦 Optimize toàn bộ conversations
   */
  const optimizeConversations = useCallback((conversations, chunkSize = CONFIG.CHUNK_SIZE) => {
    if (!Array.isArray(conversations) || conversations.length === 0) return [];
    
    return conversations.flatMap((conv, convIndex) => {
      if (!conv || !conv.text) return [];
      
      const optimized = optimizeText(conv.text);
      if (!optimized) return [];
      
      const chunks = chunkText(optimized, chunkSize);
      
      return chunks.map((chunk, chunkIndex) => ({
        ...conv,
        text: chunk,
        chunkIndex,
        totalChunks: chunks.length,
        isChunked: chunks.length > 1,
        originalIndex: convIndex,
        // Thêm metadata để xử lý tốt hơn
        isFirstChunk: chunkIndex === 0,
        isLastChunk: chunkIndex === chunks.length - 1
      }));
    });
  }, [optimizeText, chunkText]);

  // ==================== CLEANUP ====================

  const cleanupUtterance = useCallback(() => {
    if (currentUtteranceRef.current) {
      try {
        const utterance = currentUtteranceRef.current;
        utterance.onend = null;
        utterance.onerror = null;
        utterance.onpause = null;
        utterance.onresume = null;
        utterance.onstart = null;
        utterance.onboundary = null;
        currentUtteranceRef.current = null;
      } catch (err) {
        console.warn('⚠️ Error cleaning up utterance:', err);
      }
    }
  }, []);

  const clearPlaybackTimeout = useCallback(() => {
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }
  }, []);

  // ==================== SPEECH CONTROL ====================

  const stopAllSpeech = useCallback(() => {
    isStoppingRef.current = true;
    clearPlaybackTimeout();
    
    try {
      if (isSynthAvailable()) {
        synthRef.current.cancel();
      }
    } catch (err) {
      console.error('❌ Error stopping speech:', err);
    }
    
    // Reset stopping flag sau khi cancel
    playbackTimeoutRef.current = setTimeout(() => {
      isStoppingRef.current = false;
    }, 100);
  }, [synthRef, isSynthAvailable, clearPlaybackTimeout]);

  const pauseScript = useCallback(() => {
    if (!isSynthAvailable()) return;

    try {
      if (synthRef.current.speaking && !synthRef.current.paused) {
        pausedUtteranceRef.current = currentUtteranceRef.current;
        synthRef.current.pause();
        safeSetState(setIsPaused, true);
        isPlayingRef.current = false;
        console.log('⏸️ Script paused');
      }
    } catch (err) {
      console.error('❌ Error pausing speech:', err);
      stopAllSpeech();
    }
  }, [synthRef, isSynthAvailable, stopAllSpeech, safeSetState]);

  const resumeScript = useCallback(() => {
    if (!isSynthAvailable()) return;

    try {
      if (synthRef.current.paused) {
        synthRef.current.resume();
        safeSetState(setIsPaused, false);
        isPlayingRef.current = true;
        console.log('▶️ Script resumed');
      }
    } catch (err) {
      console.error('❌ Error resuming speech:', err);
      // Nếu resume fail, thử phát lại từ vị trí hiện tại
      if (pausedUtteranceRef.current) {
        speakNextInQueue();
      }
    }
  }, [synthRef, isSynthAvailable, safeSetState]);

  const stopScript = useCallback(() => {
    console.log('⏹️ Stopping script');
    stopAllSpeech();
    cleanupUtterance();
    utteranceQueueRef.current = [];
    pausedUtteranceRef.current = null;
    retryCountRef.current = 0;
    safeSetState(setCurrentPlayingIndex, -1);
    safeSetState(setPlayingTime, 0);
    safeSetState(setIsPaused, false);
    isPlayingRef.current = false;
  }, [stopAllSpeech, cleanupUtterance, safeSetState]);

  // ==================== ADVANCED PLAYBACK ====================

  /**
   * 🎙️ Speak next utterance with advanced error handling
   */
  const speakNextInQueue = useCallback(() => {
    // Safety checks
    if (!isSynthAvailable() || !isMountedRef.current) {
      return;
    }

    // Đợi utterance hiện tại kết thúc
    if (currentUtteranceRef.current) {
      return;
    }

    // Queue empty - kết thúc script
    if (utteranceQueueRef.current.length === 0) {
      if (isPlayingRef.current) {
        console.log('✅ Script finished');
        safeSetState(setCurrentPlayingIndex, -1);
        safeSetState(setPlayingTime, 0);
        isPlayingRef.current = false;
      }
      return;
    }

    // Lấy utterance tiếp theo
    const next = utteranceQueueRef.current.shift();
    if (!next || !next.text) {
      return speakNextInQueue();
    }

    // Tìm index trong danh sách gốc
    const newIndex = Array.isArray(filteredConversations) 
      ? filteredConversations.findIndex(
          conv => conv?.speaker === next.speaker && 
                  conv?.text?.includes(next.text.substring(0, 50))
        )
      : -1;

    if (newIndex !== -1) {
      safeSetState(setCurrentPlayingIndex, newIndex);
    }

    // Lấy voice cho speaker
    const voice = getSpeakerVoice(next.speaker);
    if (!voice) {
      console.warn(`⚠️ No voice for ${next.speaker}, skipping`);
      metricsRef.current.errorCount++;
      return speakNextInQueue();
    }

    try {
      // 🎨 Tạo utterance với cấu hình tối ưu
      const utterance = new SpeechSynthesisUtterance(next.text);
      utterance.voice = voice;
      
      // 🎯 Tối ưu hóa tham số cho sự tự nhiên
      const options = next.options || {};
      utterance.rate = Math.max(
        CONFIG.MIN_RATE, 
        Math.min(CONFIG.MAX_RATE, options.rate || CONFIG.OPTIMAL_RATE)
      );
      utterance.pitch = Math.max(0.8, Math.min(1.2, options.pitch || 1));
      utterance.volume = Math.max(0.8, Math.min(1, options.volume || 1));
      utterance.lang = voice.lang || 'en-US';

      currentUtteranceRef.current = utterance;
      lastSuccessTimeRef.current = Date.now();
      
      // 📊 Update metrics
      safeSetState(setPlayingTime, prev => prev + 1);

      // ==================== EVENT HANDLERS ====================

      utterance.onstart = () => {
        if (!isMountedRef.current) return;
        retryCountRef.current = 0; // Reset retry khi bắt đầu thành công
        console.log(`🎤 Speaking: "${next.text.substring(0, 30)}..."`);
      };

      utterance.onend = () => {
        if (!isMountedRef.current) return;
        
        // 📊 Metrics
        metricsRef.current.totalUtterances++;
        const duration = Date.now() - lastSuccessTimeRef.current;
        metricsRef.current.totalDuration += duration;
        
        console.log(`✓ Finished (${duration}ms)`);
        
        cleanupUtterance();
        
        // ⏭️ Tiếp tục với delay tự nhiên
        if (isPlayingRef.current) {
          const delay = next.isLastChunk 
            ? CONFIG.INTER_UTTERANCE_DELAY * 1.5  // Pause dài hơn giữa các speaker
            : CONFIG.INTER_UTTERANCE_DELAY;       // Pause ngắn trong cùng speaker
          
          playbackTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current && isPlayingRef.current) {
              speakNextInQueue();
            }
          }, delay);
        }
      };

      utterance.onerror = (event) => {
        if (!isMountedRef.current) return;
        
        const errorType = event.error;
        console.warn(`⚠️ Speech error: ${errorType}`);
        
        // Xử lý interrupted khi đang stopping
        if (errorType === 'interrupted' && isStoppingRef.current) {
          cleanupUtterance();
          return;
        }

        // Xử lý interrupted khi queue empty (bình thường)
        if (errorType === 'interrupted' && utteranceQueueRef.current.length === 0) {
          cleanupUtterance();
          return;
        }

        // Xử lý canceled
        if (errorType === 'canceled') {
          cleanupUtterance();
          return;
        }

        // Track metrics
        if (errorType === 'interrupted') {
          metricsRef.current.interruptCount++;
        } else {
          metricsRef.current.errorCount++;
        }

        cleanupUtterance();
        
        // 🔄 Retry logic cho các lỗi khác
        if (errorType !== 'interrupted' && 
            errorType !== 'canceled' && 
            retryCountRef.current < CONFIG.MAX_RETRY_ATTEMPTS) {
          
          retryCountRef.current++;
          metricsRef.current.retryCount++;
          
          console.log(`🔄 Retry attempt ${retryCountRef.current}/${CONFIG.MAX_RETRY_ATTEMPTS}`);
          
          // Đưa utterance lại vào đầu queue
          utteranceQueueRef.current.unshift(next);
          
          playbackTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current && isPlayingRef.current) {
              speakNextInQueue();
            }
          }, CONFIG.RETRY_DELAY);
        } else {
          // Đã hết retry hoặc lỗi không retry được
          if (retryCountRef.current >= CONFIG.MAX_RETRY_ATTEMPTS) {
            console.error(`❌ Max retries reached for: "${next.text.substring(0, 30)}..."`);
          }
          
          // Skip và tiếp tục
          if (isPlayingRef.current) {
            playbackTimeoutRef.current = setTimeout(() => {
              if (isMountedRef.current) {
                retryCountRef.current = 0;
                speakNextInQueue();
              }
            }, CONFIG.RETRY_DELAY);
          }
        }
      };

      // 🎯 Speak!
      synthRef.current.speak(utterance);
      
    } catch (err) {
      console.error('❌ Error creating utterance:', err);
      metricsRef.current.errorCount++;
      cleanupUtterance();
      
      // Retry hoặc skip
      if (retryCountRef.current < CONFIG.MAX_RETRY_ATTEMPTS) {
        retryCountRef.current++;
        utteranceQueueRef.current.unshift(next);
        
        playbackTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            speakNextInQueue();
          }
        }, CONFIG.RETRY_DELAY);
      } else {
        retryCountRef.current = 0;
        playbackTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            speakNextInQueue();
          }
        }, CONFIG.RETRY_DELAY);
      }
    }
  }, [
    synthRef, 
    getSpeakerVoice, 
    filteredConversations, 
    cleanupUtterance, 
    isSynthAvailable, 
    safeSetState
  ]);

  // ==================== QUEUE MANAGEMENT ====================

  /**
   * 📋 Queue conversations với tối ưu hóa
   */
  const queueConversations = useCallback((conversations, getTTSOptions, autoOptimize = true) => {
    if (!isSynthAvailable() || !Array.isArray(conversations) || conversations.length === 0) {
      console.warn('⚠️ Cannot queue: invalid input or synth unavailable');
      return false;
    }

    try {
      console.log(`📋 Queueing ${conversations.length} conversations`);
      
      // Stop hiện tại
      isStoppingRef.current = true;
      stopAllSpeech();
      cleanupUtterance();
      
      // Reset state
      utteranceQueueRef.current = [];
      pausedUtteranceRef.current = null;
      retryCountRef.current = 0;
      safeSetState(setPlayingTime, 0);

      // Optimize conversations
      const toQueue = autoOptimize 
        ? optimizeConversations(conversations) 
        : conversations;
      
      console.log(`📦 Optimized to ${toQueue.length} chunks`);
      
      // Build queue
      const queue = toQueue
        .filter(conv => conv && conv.text && conv.speaker)
        .map(conv => ({
          text: conv.text,
          speaker: conv.speaker,
          isFirstChunk: conv.isFirstChunk,
          isLastChunk: conv.isLastChunk,
          options: typeof getTTSOptions === 'function' 
            ? getTTSOptions(conv.speaker) 
            : { 
                rate: CONFIG.OPTIMAL_RATE, 
                pitch: 1, 
                volume: 1 
              }
        }));

      if (queue.length === 0) {
        console.warn('⚠️ No valid items to queue');
        isStoppingRef.current = false;
        return false;
      }

      utteranceQueueRef.current = queue;
      isPlayingRef.current = true;
      
      console.log(`✅ Queued ${queue.length} utterances`);
      
      // Reset stopping flag
      playbackTimeoutRef.current = setTimeout(() => {
        isStoppingRef.current = false;
      }, 100);
      
      return true;
      
    } catch (err) {
      console.error('❌ Error queueing conversations:', err);
      isStoppingRef.current = false;
      isPlayingRef.current = false;
      return false;
    }
  }, [
    synthRef, 
    stopAllSpeech, 
    cleanupUtterance, 
    optimizeConversations, 
    isSynthAvailable, 
    safeSetState
  ]);

  // ==================== METRICS ====================

  const getTTSMetrics = useCallback(() => {
    const { totalUtterances, totalDuration, errorCount, interruptCount, retryCount } = metricsRef.current;
    
    const avgDuration = totalUtterances > 0 ? Math.round(totalDuration / totalUtterances) : 0;
    const errorRate = totalUtterances > 0 ? ((errorCount / totalUtterances) * 100).toFixed(2) : '0.00';
    const successRate = totalUtterances > 0 ? (((totalUtterances - errorCount) / totalUtterances) * 100).toFixed(2) : '0.00';
    
    return {
      totalUtterances,
      totalDuration: Math.round(totalDuration / 1000), // Convert to seconds
      errorCount,
      interruptCount,
      retryCount,
      avgDuration,
      errorRate: `${errorRate}%`,
      successRate: `${successRate}%`,
      queueLength: utteranceQueueRef.current.length,
      isPlaying: isPlayingRef.current
    };
  }, []);

  const resetMetrics = useCallback(() => {
    metricsRef.current = {
      totalUtterances: 0,
      totalDuration: 0,
      errorCount: 0,
      interruptCount: 0,
      retryCount: 0
    };
    console.log('📊 Metrics reset');
  }, []);

  const isSpeaking = useCallback(() => {
    return isSynthAvailable() && (synthRef.current?.speaking ?? false);
  }, [synthRef, isSynthAvailable]);

  // ==================== HEALTH CHECK ====================

  /**
   * 🏥 Kiểm tra health của TTS engine
   */
  const checkHealth = useCallback(() => {
    const now = Date.now();
    const timeSinceLastSuccess = now - lastSuccessTimeRef.current;
    
    return {
      isHealthy: isSynthAvailable() && timeSinceLastSuccess < CONFIG.TIMEOUT_THRESHOLD,
      synthAvailable: isSynthAvailable(),
      timeSinceLastSuccess,
      currentUtterance: currentUtteranceRef.current !== null,
      queueLength: utteranceQueueRef.current.length,
      isPlaying: isPlayingRef.current
    };
  }, [isSynthAvailable]);

  // ==================== LIFECYCLE ====================

  useEffect(() => {
    isMountedRef.current = true;
    lastSuccessTimeRef.current = Date.now();
    
    console.log('🎙️ TTS Hook initialized');
    
    return () => {
      console.log('🔚 TTS Hook cleanup');
      isMountedRef.current = false;
      clearPlaybackTimeout();
      stopScript();
    };
  }, [stopScript, clearPlaybackTimeout]);

  // ==================== RETURN ====================

  return {
    // State
    currentPlayingIndex,
    setCurrentPlayingIndex,
    playingTime,
    setPlayingTime,
    isPaused,
    
    // Controls
    pauseScript,
    resumeScript,
    stopScript,
    speakNextInQueue,
    queueConversations,
    isSpeaking,
    
    // Text optimization
    optimizeText,
    chunkText,
    optimizeConversations,
    
    // Metrics & Health
    getTTSMetrics,
    resetMetrics,
    checkHealth,
    
    // Refs (for advanced usage)
    utteranceQueueRef,
    currentUtteranceRef,
    
    // Config
    CONFIG
  };
};
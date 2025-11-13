import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle, Zap } from 'lucide-react';

/**
 * Simple Voice Metrics Badge
 * Compact display of voice performance
 */
export const VoiceMetricsBadge = ({ 
  voiceMetrics, 
  ttsMetrics,
  performanceLevel,
  isPlaying = false 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Determine status color
  const getStatusColor = () => {
    if (!voiceMetrics) return 'gray';
    if (voiceMetrics.successRate < 80) return 'red';
    if (voiceMetrics.successRate < 95) return 'yellow';
    return 'green';
  };

  const statusColor = getStatusColor();
  const statusColors = {
    green: 'text-green-600 bg-green-50 border-green-300',
    yellow: 'text-yellow-600 bg-yellow-50 border-yellow-300',
    red: 'text-red-600 bg-red-50 border-red-300',
    gray: 'text-gray-600 bg-gray-50 border-gray-300'
  };

  if (!voiceMetrics && !ttsMetrics) return null;

  return (
    <div className="space-y-2">
      {/* Compact Badge */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${statusColors[statusColor]}`}
      >
        <Activity className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
        <span>Performance</span>
        
        {voiceMetrics && (
          <span className="ml-auto text-xs">
            {voiceMetrics.successRate}% • {voiceMetrics.speakAttempts} attempts
          </span>
        )}
        
        {voiceMetrics?.errorCount > 0 && (
          <AlertCircle className="w-4 h-4" />
        )}
      </button>

      {/* Detailed View */}
      {showDetails && (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 space-y-3 text-sm">
          
          {/* Voice Metrics */}
          {voiceMetrics && (
            <div className="space-y-2 pb-3 border-b-2 border-gray-200">
              <h4 className="font-bold text-gray-900">Voice System</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-600">Voice Load</p>
                  <p className="font-semibold text-gray-900">{voiceMetrics.voiceLoadTime}ms</p>
                </div>
                <div>
                  <p className="text-gray-600">Cached</p>
                  <p className="font-semibold text-gray-900">{voiceMetrics.cachedVoices}</p>
                </div>
                <div>
                  <p className="text-gray-600">Success Rate</p>
                  <p className="font-semibold text-green-600">{voiceMetrics.successRate}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Errors</p>
                  <p className={`font-semibold ${voiceMetrics.errorCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {voiceMetrics.errorCount}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TTS Metrics */}
          {ttsMetrics && (
            <div className="space-y-2 pb-3 border-b-2 border-gray-200">
              <h4 className="font-bold text-gray-900">Text-to-Speech</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-600">Utterances</p>
                  <p className="font-semibold text-gray-900">{ttsMetrics.totalUtterances}</p>
                </div>
                <div>
                  <p className="text-gray-600">Avg Duration</p>
                  <p className="font-semibold text-gray-900">{ttsMetrics.avgDuration}ms</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Time</p>
                  <p className="font-semibold text-gray-900">{Math.round(ttsMetrics.totalDuration / 1000)}s</p>
                </div>
                <div>
                  <p className="text-gray-600">Error Rate</p>
                  <p className={`font-semibold ${parseFloat(ttsMetrics.errorRate) > 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {ttsMetrics.errorRate}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Performance Level */}
          {performanceLevel && (
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">Device Performance</h4>
              <div className="text-xs space-y-1">
                <p className="text-gray-600">
                  Level: <span className="font-semibold text-blue-600">{performanceLevel.label}</span>
                </p>
                <p className="text-gray-600">
                  Recommended Speed: <span className="font-semibold">{performanceLevel.rate}x</span>
                </p>
                <p className="text-gray-600">
                  Max Chunk Size: <span className="font-semibold">{performanceLevel.chunkSize} chars</span>
                </p>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => setShowDetails(false)}
            className="w-full mt-2 px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceMetricsBadge;
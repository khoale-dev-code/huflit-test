import React from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import './AudioControls.css'; // Import CSS separately

const AudioControls = ({ 
  status, 
  progress, 
  playAudio, 
  pauseAudio, 
  stopAudio, 
  partData, 
  selectedPart, 
  currentQuestionIndex, 
  testType 
}) => {
  if (testType !== 'listening' || !partData) return null;

  const handlePlay = () => {
    const script = selectedPart === 'part1' 
      ? partData.questions[currentQuestionIndex]?.script || '' 
      : partData.script || '';
    
    if (!script) {
      alert('Vui lòng chọn một Part trước!');
      return;
    }
    playAudio(script);
  };

  // Determine status style based on status string
  const getStatusStyle = () => {
    if (status.includes('▶️')) {
      return {
        bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
        text: 'text-green-800',
        border: 'border-green-300',
        icon: '🟢',
        animate: 'animate-pulse'
      };
    } else if (status.includes('⏸️')) {
      return {
        bg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
        text: 'text-yellow-800',
        border: 'border-yellow-300',
        icon: '🟡',
        animate: ''
      };
    } else {
      return {
        bg: 'bg-gradient-to-r from-red-50 to-rose-50',
        text: 'text-red-800',
        border: 'border-red-300',
        icon: '🔴',
        animate: ''
      };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-orange-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-3xl">🎵</span>
        Điều khiển Audio
      </h2>

      {/* Status Display */}
      <div 
        className={`
          ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} ${statusStyle.animate}
          text-center p-5 rounded-xl mb-6 
          font-bold text-lg border-2 
          backdrop-blur-sm
          transition-all duration-300
          shadow-md
        `}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl">{statusStyle.icon}</span>
          <span>{status}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Tiến độ phát:</span>
          <span className="text-sm font-bold text-orange-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="audio-progress-bar h-full transition-all duration-300 rounded-full relative overflow-hidden"
            style={{
              width: `${progress}%`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Button Group */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Play Button */}
        <button
          className="
            group relative
            bg-gradient-to-r from-orange-500 to-yellow-500
            text-white px-5 py-4 rounded-xl 
            font-bold 
            transition-all duration-300 
            overflow-hidden
            hover:-translate-y-1 hover:shadow-xl
            active:translate-y-0
            shadow-lg shadow-orange-500/30
            flex items-center justify-center gap-2
          "
          onClick={handlePlay}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Play className="w-5 h-5 relative z-10" />
          <span className="relative z-10 hidden sm:inline">Play</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>

        {/* Pause Button */}
        <button
          className="
            group relative
            bg-gradient-to-r from-yellow-500 to-amber-500
            text-white px-5 py-4 rounded-xl 
            font-bold 
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl
            active:translate-y-0
            shadow-lg shadow-yellow-500/30
            flex items-center justify-center gap-2
          "
          onClick={pauseAudio}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Pause className="w-5 h-5 relative z-10" />
          <span className="relative z-10 hidden sm:inline">Pause</span>
        </button>

        {/* Stop Button */}
        <button
          className="
            group relative
            bg-gradient-to-r from-red-500 to-rose-500
            text-white px-5 py-4 rounded-xl 
            font-bold 
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl
            active:translate-y-0
            shadow-lg shadow-red-500/30
            flex items-center justify-center gap-2
          "
          onClick={stopAudio}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Square className="w-5 h-5 relative z-10" />
          <span className="relative z-10 hidden sm:inline">Stop</span>
        </button>

        {/* Repeat Button */}
        <button
          className="
            group relative
            bg-gradient-to-r from-emerald-500 to-green-500
            text-white px-5 py-4 rounded-xl 
            font-bold 
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl
            active:translate-y-0
            shadow-lg shadow-emerald-500/30
            flex items-center justify-center gap-2
          "
          onClick={handlePlay}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <RotateCcw className="w-5 h-5 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative z-10 hidden sm:inline">Repeat</span>
        </button>
      </div>

      {/* Helper Text */}
      <div className="mt-4 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
        <p className="text-sm text-gray-700 font-medium">
          <span className="font-bold text-orange-600">💡 Tip:</span> Audio sẽ được phát 2 lần tự động. Sử dụng Pause để tạm dừng và Repeat để nghe lại.
        </p>
      </div>
    </div>
  );
};

export default AudioControls;


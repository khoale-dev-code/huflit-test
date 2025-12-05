// import React, { useState, useEffect } from 'react';
// import { 
//   Play, Pause, Square, RotateCcw, Volume2, VolumeX,
//   Radio, Waves, Headphones, Info, Zap, Timer, Activity
// } from 'lucide-react';

// const AudioControls = ({ 
//   status, 
//   progress, 
//   playAudio, 
//   pauseAudio, 
//   stopAudio, 
//   partData, 
//   selectedPart, 
//   currentQuestionIndex, 
//   testType 
// }) => {
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playCount, setPlayCount] = useState(0);
//   const [showTip, setShowTip] = useState(true);

//   // Reset play count when question changes
//   useEffect(() => {
//     setPlayCount(0);
//   }, [currentQuestionIndex, selectedPart]);

//   if (testType !== 'listening' || !partData) return null;

//   const handlePlay = () => {
//     let script = '';
//     if (selectedPart === 'part1') {
//       // For Part 1: Use shared script for the whole conversation
//       script = partData.script || '';
//     } else {
//       // For other parts: Use question-specific script if available, else part script
//       script = partData.questions?.[currentQuestionIndex]?.script || partData.script || '';
//     }
    
//     if (!script.trim()) {
//       alert('⚠️ Vui lòng chọn một Part có script trước!');
//       return;
//     }
//     setPlayCount(prev => prev + 1);
//     playAudio(script);
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   // Determine current status
//   const isPlaying = status.includes('▶️');
//   const isPaused = status.includes('⏸️');
//   const isStopped = !isPlaying && !isPaused;

//   // Status configuration với màu theme
//   const statusConfig = {
//     playing: {
//       icon: Waves,
//       text: 'Đang phát',
//       emoji: '🔊',
//       bgGradient: 'from-orange-500 to-yellow-500',
//       bgColor: 'bg-orange-50',
//       textColor: 'text-orange-700',
//       borderColor: 'border-orange-400',
//       dotColor: 'bg-orange-500'
//     },
//     paused: {
//       icon: Radio,
//       text: 'Tạm dừng',
//       emoji: '⏸️',
//       bgGradient: 'from-amber-500 to-yellow-400',
//       bgColor: 'bg-amber-50',
//       textColor: 'text-amber-700',
//       borderColor: 'border-amber-400',
//       dotColor: 'bg-amber-500'
//     },
//     stopped: {
//       icon: Headphones,
//       text: 'Sẵn sàng',
//       emoji: '🎧',
//       bgGradient: 'from-gray-400 to-gray-500',
//       bgColor: 'bg-gray-50',
//       textColor: 'text-gray-700',
//       borderColor: 'border-gray-400',
//       dotColor: 'bg-gray-500'
//     }
//   };

//   const currentStatus = isPlaying ? statusConfig.playing : 
//                         isPaused ? statusConfig.paused : 
//                         statusConfig.stopped;

//   const StatusIcon = currentStatus.icon;

//   return (
//     <div className="w-full">
//       {/* CSS for animations */}
//       <style dangerouslySetInnerHTML={{__html: `
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//         @keyframes wave {
//           0%, 100% { transform: scaleY(1); }
//           50% { transform: scaleY(1.5); }
//         }
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }
//         .animate-wave {
//           animation: wave 1s ease-in-out infinite;
//         }
//       `}} />

//       {/* Main Control Card */}
//       <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border-2 border-orange-200">
        
//         {/* Header Section */}
//         <div className="relative bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-5 border-b-2 border-orange-200">
//           <div className="flex items-center justify-between gap-3">
//             {/* Status Display */}
//             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//               <div className={`relative p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${currentStatus.bgGradient} shadow-lg flex-shrink-0`}>
//                 <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                 {isPlaying && (
//                   <>
//                     <div className="absolute inset-0 rounded-xl bg-white/30 animate-ping"></div>
//                     <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse"></div>
//                   </>
//                 )}
//               </div>
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
//                   <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-900 truncate">
//                     Điều khiển Audio
//                   </h3>
//                   <span className="text-xs sm:text-sm font-semibold text-orange-600 bg-orange-100 px-1.5 sm:px-2 py-0.5 rounded-lg border border-orange-300 flex-shrink-0">
//                     {selectedPart?.toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600">
//                   <span className={`flex items-center gap-1 font-semibold ${currentStatus.textColor}`}>
//                     <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${currentStatus.dotColor} ${isPlaying ? 'animate-pulse' : ''}`}></span>
//                     {currentStatus.text}
//                   </span>
//                   <span className="text-gray-400">•</span>
//                   <span className="font-semibold">
//                     {playCount > 0 ? `${playCount} lần phát` : 'Chưa phát'}
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Volume Control */}
//             <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
//               <button
//                 onClick={toggleMute}
//                 className="p-1.5 sm:p-2 rounded-lg bg-orange-100 hover:bg-orange-200 border border-orange-300 transition-all group"
//                 title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
//               >
//                 {isMuted ? (
//                   <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-700" />
//                 ) : (
//                   <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-700 group-hover:scale-110 transition-transform" />
//                 )}
//               </button>
              
//               {/* Volume Slider - Desktop only */}
//               <div className="hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-200">
//                 <Volume2 className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.1"
//                   value={isMuted ? 0 : volume}
//                   onChange={(e) => {
//                     setVolume(parseFloat(e.target.value));
//                     if (parseFloat(e.target.value) > 0) setIsMuted(false);
//                   }}
//                   className="w-20 h-1.5 bg-orange-200 rounded-lg appearance-none cursor-pointer
//                     [&::-webkit-slider-thumb]:appearance-none
//                     [&::-webkit-slider-thumb]:w-3.5
//                     [&::-webkit-slider-thumb]:h-3.5
//                     [&::-webkit-slider-thumb]:rounded-full
//                     [&::-webkit-slider-thumb]:bg-gradient-to-r
//                     [&::-webkit-slider-thumb]:from-orange-500
//                     [&::-webkit-slider-thumb]:to-yellow-500
//                     [&::-webkit-slider-thumb]:cursor-pointer
//                     [&::-webkit-slider-thumb]:shadow-lg
//                     [&::-webkit-slider-thumb]:border-2
//                     [&::-webkit-slider-thumb]:border-white"
//                 />
//                 <span className="text-xs text-gray-700 font-bold w-8 text-right">
//                   {Math.round((isMuted ? 0 : volume) * 100)}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Progress Section */}
//         <div className="p-3 sm:p-4 md:p-5">
//           {/* Progress Bar */}
//           <div className="mb-3 sm:mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-1.5">
//                 <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
//                 Tiến độ phát
//               </span>
//               <span className="text-xs sm:text-sm font-black text-orange-700 bg-orange-100 px-2 sm:px-3 py-1 rounded-lg border-2 border-orange-300">
//                 {Math.round(progress)}%
//               </span>
//             </div>
            
//             {/* Enhanced Progress Bar */}
//             <div className="relative h-3 sm:h-4 bg-white/80 backdrop-blur-sm rounded-full overflow-hidden border-2 border-orange-200 shadow-inner">
//               {/* Progress Fill */}
//               <div
//                 className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-400 rounded-full transition-all duration-300 ease-out shadow-lg"
//                 style={{ width: `${progress}%` }}
//               >
//                 {/* Shimmer Effect */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                
//                 {/* Animated Dot */}
//                 {isPlaying && progress > 0 && (
//                   <div className="absolute -right-1.5 sm:-right-2 top-1/2 -translate-y-1/2 flex items-center justify-center">
//                     <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg border-2 border-orange-500 animate-pulse"></div>
//                     <div className="absolute w-5 h-5 sm:w-6 sm:h-6 bg-orange-400/30 rounded-full animate-ping"></div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Wave Animation */}
//             {isPlaying && (
//               <div className="flex items-center justify-center gap-0.5 sm:gap-1 mt-2 sm:mt-3">
//                 {[...Array(20)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-0.5 sm:w-1 bg-gradient-to-t from-orange-500 to-yellow-500 rounded-full animate-wave"
//                     style={{
//                       height: `${Math.random() * 16 + 8}px`,
//                       animationDelay: `${i * 0.05}s`
//                     }}
//                   ></div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Control Buttons Grid */}
//           <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
//             {/* Play Button - 2 columns */}
//             <button
//               onClick={handlePlay}
//               disabled={isPlaying}
//               className="col-span-2 group relative bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-1 active:translate-y-0 disabled:hover:translate-y-0 disabled:hover:shadow-none overflow-hidden border-2 border-white/50"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//               <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
//                 <Play className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
//                 <span className="text-xs sm:text-sm md:text-base font-black">Phát Audio</span>
//               </div>
//             </button>

//             {/* Pause Button */}
//             <button
//               onClick={pauseAudio}
//               disabled={!isPlaying}
//               className="group relative bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/50 hover:-translate-y-1 active:translate-y-0 disabled:hover:translate-y-0 disabled:hover:shadow-none overflow-hidden border-2 border-white/50"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//               <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
//                 <Pause className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
//                 <span className="text-[10px] sm:text-xs font-bold">Tạm dừng</span>
//               </div>
//             </button>

//             {/* Stop Button */}
//             <button
//               onClick={stopAudio}
//               disabled={isStopped}
//               className="group relative bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-red-500/50 hover:-translate-y-1 active:translate-y-0 disabled:hover:translate-y-0 disabled:hover:shadow-none overflow-hidden border-2 border-white/50"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//               <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
//                 <Square className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
//                 <span className="text-[10px] sm:text-xs font-bold">Dừng</span>
//               </div>
//             </button>
//           </div>

//           {/* Repeat Button - Full Width */}
//           <button
//             onClick={handlePlay}
//             className="group w-full relative bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 hover:from-orange-500 hover:via-yellow-500 hover:to-orange-600 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-400/50 hover:-translate-y-1 active:translate-y-0 overflow-hidden border-2 border-white/50"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//             <div className="relative z-10 flex items-center justify-center gap-2">
//               <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
//               <span className="text-xs sm:text-sm md:text-base font-black">Nghe lại (Repeat)</span>
//             </div>
//           </button>
//         </div>

//         {/* Info/Tip Section */}
//         {showTip && (
//           <div className="relative p-3 sm:p-4 md:p-5 border-t-2 border-orange-200 bg-gradient-to-br from-orange-100/50 to-yellow-100/50 backdrop-blur-sm">
//             <button
//               onClick={() => setShowTip(false)}
//               className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 transition-colors bg-white/80 rounded-lg p-1 hover:bg-white border border-orange-200"
//               title="Đóng"
//             >
//               ✕
//             </button>
            
//             <div className="flex items-start gap-2 sm:gap-3 pr-6 sm:pr-8">
//               <div className="flex-shrink-0 p-1.5 sm:p-2 bg-orange-200 rounded-lg border border-orange-300">
//                 <Info className="w-4 h-4 sm:w-5 sm:h-5 text-orange-700" />
//               </div>
//               <div className="flex-1">
//                 <h4 className="text-xs sm:text-sm font-black text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-1.5">
//                   <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
//                   Mẹo sử dụng
//                 </h4>
//                 <ul className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs text-gray-700">
//                   <li className="flex items-start gap-1.5">
//                     <span className="text-orange-600 font-bold mt-0.5 flex-shrink-0">•</span>
//                     <span>Audio sẽ được <strong className="text-gray-900">phát tự động 2 lần</strong> liên tiếp</span>
//                   </li>
//                   <li className="flex items-start gap-1.5">
//                     <span className="text-orange-600 font-bold mt-0.5 flex-shrink-0">•</span>
//                     <span>Nhấn <strong className="text-gray-900">Tạm dừng</strong> để dừng tạm thời, <strong className="text-gray-900">Nghe lại</strong> để phát từ đầu</span>
//                   </li>
//                   <li className="flex items-start gap-1.5">
//                     <span className="text-orange-600 font-bold mt-0.5 flex-shrink-0">•</span>
//                     <span>Trải nghiệm tốt nhất với <strong className="text-gray-900">tai nghe 🎧</strong></span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Stats Cards */}
//         <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
//           {/* Status Card */}
//           <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 shadow-lg border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl group">
//             <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
//               <div className={`${currentStatus.bgColor} p-1 sm:p-1.5 rounded-lg border ${currentStatus.borderColor} group-hover:scale-110 transition-transform`}>
//                 <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
//               </div>
//               <span className="text-[10px] sm:text-xs text-gray-600 font-bold">Trạng thái</span>
//             </div>
//             <p className="text-xs sm:text-sm font-black text-gray-900 truncate">
//               {currentStatus.emoji} {currentStatus.text}
//             </p>
//           </div>

//           {/* Plays Card */}
//           <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 shadow-lg border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl group">
//             <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
//               <div className="bg-blue-100 p-1 sm:p-1.5 rounded-lg border border-blue-300 group-hover:scale-110 transition-transform">
//                 <Radio className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
//               </div>
//               <span className="text-[10px] sm:text-xs text-gray-600 font-bold">Lượt phát</span>
//             </div>
//             <p className="text-xs sm:text-sm font-black text-gray-900">
//               {playCount} <span className="text-gray-400 text-[10px] sm:text-xs">/ ∞</span>
//             </p>
//           </div>

//           {/* Volume Card */}
//           <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 shadow-lg border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl group">
//             <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
//               <div className="bg-orange-100 p-1 sm:p-1.5 rounded-lg border border-orange-300 group-hover:scale-110 transition-transform">
//                 <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
//               </div>
//               <span className="text-[10px] sm:text-xs text-gray-600 font-bold">Âm lượng</span>
//             </div>
//             <p className="text-xs sm:text-sm font-black text-gray-900">
//               {isMuted ? '🔇 Tắt' : `🔊 ${Math.round(volume * 100)}%`}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AudioControls;
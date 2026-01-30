import React, { useState, memo, useMemo, useEffect } from 'react';
import { 
  Play, Pause, Square, Volume2, VolumeX, 
  AlertCircle, Loader2, ChevronDown, Info, Lightbulb 
} from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

// ==================== UTILS: ĐỊNH NGHĨA MÀU NHÂN VẬT ====================
const getSpeakerStyle = (name) => {
  const themes = [
    { text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
    { text: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' },
    { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % themes.length;
  return themes[index];
};

// ==================== SUB-COMPONENT: NỘI DUNG SCRIPT ====================
const ScriptContent = memo(({ script }) => {
  const lines = useMemo(() => script.split('\n').filter(line => line.trim()), [script]);

  return (
    <div className="p-6 md:p-10 space-y-10">
      <div className="flex gap-4 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl animate-in fade-in zoom-in duration-500">
        <div className="bg-blue-500 p-2 rounded-lg h-fit">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 text-sm italic">Lưu ý khi sử dụng Script:</h4>
          <p className="text-sm text-blue-800/80 leading-relaxed mt-1">
            Bạn nên nghe ít nhất 2 lần trước khi nhìn Script. Khi đọc, hãy chú ý vào 
            <strong> nối âm</strong> và <strong>ngữ điệu</strong> của nhân vật để cải thiện kỹ năng nói.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {lines.map((line, index) => {
          const isSpeaker = line.includes(':') && !line.startsWith(' ');
          const trimmedLine = line.trim();

          if (isSpeaker) {
            const [name, ...contentParts] = trimmedLine.split(':');
            const content = contentParts.join(':').trim();
            const style = getSpeakerStyle(name.trim());

            return (
              <div 
                key={index} 
                className="group flex flex-col gap-2.5 animate-in slide-in-from-left duration-500 fill-mode-both"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className={`w-fit px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-tighter border ${style.bg} ${style.text} ${style.border}`}>
                  {name.trim()}
                </span>
                <p className="text-[17px] text-slate-800 leading-relaxed font-semibold group-hover:text-blue-600 transition-colors">
                  {content}
                </p>
              </div>
            );
          }

          return (
            <div 
              key={index} 
              className="py-2 border-l-4 border-slate-100 pl-4 italic animate-in fade-in duration-1000"
            >
              <p className="text-sm text-slate-400 font-medium">{trimmedLine}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ==================== MAIN COMPONENT: SCRIPT DISPLAY ====================
const ScriptDisplay = memo(({
  script = '',
  audioUrl = null,
  partTitle = 'Bài nghe chi tiết',
  isPartPlayed = false,  // 👈 Prop để check đã nghe hay chưa
  onAudioEnd = null,     // 👈 Callback khi audio kết thúc
}) => {
  const {
    isPlaying, currentTime, duration, volume, error, isLoading,
    play, pause, stop, seek, setVolume, formatTime,
  } = useAudioPlayer(audioUrl);

  const [showScript, setShowScript] = useState(false);

  // ✨ KEY LOGIC: Trigger callback khi audio kết thúc
  useEffect(() => {
    // Điều kiện:
    // 1. Audio đang phát xong (isPlaying = false)
    // 2. Đã có thời lượng video (duration > 0)
    // 3. Vị trí hiện tại gần cuối (currentTime >= duration - 1)
    // 4. onAudioEnd callback có tồn tại
    
    if (!isPlaying && duration > 0 && currentTime >= duration - 1 && onAudioEnd) {
      console.log(`✅ Audio kết thúc! Gọi callback onAudioEnd`);
      onAudioEnd();
    }
  }, [isPlaying, duration, currentTime, onAudioEnd]);

  if (!script) return null;

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      
      {/* 1. Header & Audio Controls */}
      <div className="p-6 md:p-8 bg-slate-50/80 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{partTitle}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className={`flex h-2 w-2 rounded-full animate-pulse ${isPartPlayed ? 'bg-emerald-500' : 'bg-blue-500'}`} />
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                {isPartPlayed ? '✓ Đã nghe xong' : audioUrl ? 'Sẵn sàng phát' : 'Không có audio'}
              </p>
            </div>
          </div>

          {audioUrl && (
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-mono font-bold text-blue-600">
                {formatTime(currentTime)} <span className="text-slate-300 mx-1">/</span> {formatTime(duration)}
              </span>
              <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Nút điều khiển âm thanh */}
        {audioUrl && (
          <div className="flex items-center gap-4 mt-8">
            {!isPlaying ? (
              <button 
                onClick={() => play()}
                disabled={isLoading || isPartPlayed}  // 👈 Disable nếu đã nghe
                className={`flex-[2] py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg ${
                  isPartPlayed
                    ? 'bg-emerald-600 opacity-60 cursor-not-allowed text-white'
                    : isLoading
                    ? 'bg-slate-300 text-slate-600'
                    : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                }`}
                title={isPartPlayed ? 'Đã nghe rồi, không thể nghe lại' : 'Bấm để nghe audio'}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Đang tải...</span>
                  </>
                ) : isPartPlayed ? (
                  <>
                    <span className="text-xl">✓</span>
                    <span>Đã nghe</span>
                  </>
                ) : (
                  <>
                    <Play className="fill-current w-5 h-5" />
                    <span>Nghe Audio</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex-[2] flex gap-3">
                <button 
                  onClick={pause} 
                  className="flex-1 py-4 bg-amber-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-amber-600"
                >
                  <Pause className="fill-current w-5 h-5" /> Tạm dừng
                </button>
                <button 
                  onClick={stop} 
                  className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-slate-900"
                >
                  <Square className="fill-current w-5 h-5" /> Dừng
                </button>
              </div>
            )}
            <div className="flex-1 hidden md:flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <Volume2 className="w-5 h-5 text-slate-400" />
              <input 
                type="range" min="0" max="1" step="0.1" value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        )}

        {/* Status message khi đã nghe */}
        {isPartPlayed && (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 animate-in fade-in">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-semibold text-emerald-900 text-sm">Nghe xong rồi!</p>
              <p className="text-xs text-emerald-700 mt-1">Bạn có thể tập trung trả lời các câu hỏi</p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Toggle Bar */}
      <div className="px-6 py-4 bg-white flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" />
          <span className="text-[13px] font-bold text-slate-500 uppercase tracking-tight">Kịch bản chi tiết</span>
        </div>
        <button
          onClick={() => setShowScript(!showScript)}
          className={`group flex items-center gap-3 px-6 py-2.5 rounded-xl font-bold transition-all duration-500 ${
            showScript 
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' 
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span>{showScript ? 'Ẩn' : 'Hiện'} Script</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${showScript ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* 3. Script Content Area */}
      <div 
        className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          showScript ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white">
          <ScriptContent script={script} />
        </div>
      </div>

      {/* 4. Placeholder khi ẩn */}
      {!showScript && (
        <div className="py-16 flex flex-col items-center justify-center gap-4 text-slate-300">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
          <p className="text-sm font-medium italic">Kịch bản đang được ẩn để bạn tập trung nghe</p>
        </div>
      )}
    </div>
  );
});

ScriptDisplay.displayName = 'ScriptDisplay';

export default ScriptDisplay;
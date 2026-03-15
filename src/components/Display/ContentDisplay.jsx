// ============================================================
// ContentDisplay.jsx — Hỗ trợ TOEIC & Dynamic Array
// ============================================================
import React, { useMemo, memo } from 'react';
import { AlertCircle, Headphones, BookOpen, FileText, Loader2, ArrowRight, PenTool, Mic, ImageIcon } from 'lucide-react';
import ReadingDisplay from './Readingdisplay';
import ScriptDisplay from './ScriptDisplay';

/* ─── Design tokens (Đồng bộ với QuestionDisplay) ───── */
const C = {
  blue: '#1CB0F6', blueDark: '#1899D6', blueBg: '#EAF6FE', blueBorder: '#BAE3FB',
  green: '#58CC02', greenDark: '#46A302', greenBg: '#F0FAE8',
  yellow: '#FFC200', yellowDark: '#D9A600', yellowBg: '#FFFBEA',
  purple: '#CE82FF', purpleDark: '#B975E5', purpleBg: '#F8EEFF', purpleBorder: '#eec9ff',
  n50: '#F8FAFC', n100: '#F1F5F9', n200: '#E2E8F0',
  n400: '#94A3B8', n500: '#64748B', n600: '#475569', n800: '#1E293B',
  white: '#FFFFFF',
};

// Cấu hình UI cho từng loại kỹ năng
const TYPE_UI = {
  listening: { icon: Headphones, color: 'text-[#1CB0F6]', bg: 'bg-[#EAF6FE]', border: 'border-[#BAE3FB]', title: 'Phần Nghe' },
  reading:   { icon: BookOpen,   color: 'text-[#58CC02]', bg: 'bg-[#f1faeb]', border: 'border-[#bcf096]', title: 'Phần Đọc' },
  writing:   { icon: PenTool,    color: 'text-[#FF9600]', bg: 'bg-[#FFFBEA]', border: 'border-[#FFD8A8]', title: 'Phần Viết' },
  speaking:  { icon: Mic,        color: 'text-[#CE82FF]', bg: 'bg-[#F8EEFF]', border: 'border-[#eec9ff]', title: 'Phần Nói' }
};

// ── MediaContent (Xử lý Audio/Script) ──
const MediaContent = memo(({
  partData, isPartPlayed, onAudioStart, onAudioEnd
}) => {
  const script = useMemo(() => {
    if (!partData) return '';
    if (partData.script) return partData.script;
    if (partData.text) return partData.text;
    return '';
  }, [partData]);

  const audioUrl = partData?.audioUrl || null;
  const partTitle = partData?.title || `Phần Thi`;

  // 🚀 LOGIC QUAN TRỌNG: Nếu đây là Part 1, 2 (không có audio tổng), 
  // ta trả về null để tránh hiện khung trống, vì Audio đã nằm trong từng câu hỏi.
  if (!audioUrl && !script) return null;

  return (
    <div className="animate-in fade-in duration-500 w-full">
      <ScriptDisplay
        script={script}
        audioUrl={audioUrl}
        partTitle={partTitle}
        isPartPlayed={isPartPlayed}
        onAudioStart={onAudioStart}
        onAudioEnd={onAudioEnd}
      />
    </div>
  );
});
MediaContent.displayName = 'MediaContent';

// ── TextContent (Cho Reading / Writing / Speaking Prompt) ──
const TextContent = memo(({ partData }) => {
  const content = partData?.text || partData?.description || partData?.instruction || '';
  if (!content.trim()) return null;

  // Sử dụng màu tím cho Reading giống trang Admin
  const isReading = partData.type === 'reading';

  return (
    <div className={`rounded-[24px] border-2 border-b-[6px] p-6 md:p-8 shadow-sm animate-in fade-in duration-500 w-full ${isReading ? 'bg-[#F8EEFF] border-[#eec9ff]' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-black/5">
        <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border-b-[3px] shadow-sm ${isReading ? 'bg-white text-[#CE82FF]' : 'bg-blue-50 text-blue-500'}`}>
           {isReading ? <FileText size={20} strokeWidth={2.5} /> : <PenTool size={20} strokeWidth={2.5} />}
        </div>
        <h3 className={`text-lg font-black leading-none pt-1 ${isReading ? 'text-[#CE82FF]' : 'text-slate-800'}`}>
          {partData.title || 'Nội dung hướng dẫn'}
        </h3>
      </div>
      
      <div className={`prose max-w-none text-[15px] sm:text-[16px] leading-relaxed font-bold whitespace-pre-wrap ${isReading ? 'text-purple-900/80' : 'text-slate-700'}`}>
        {content}
      </div>
    </div>
  );
});
TextContent.displayName = 'TextContent';

// ── EmptyState ──
const EmptyState = memo(({ type = 'no-part', onSelectPart }) => {
  const states = {
    'no-part': {
      icon: AlertCircle, iconColor: 'text-[#1CB0F6]', iconBg: 'bg-[#EAF6FE]',
      title: 'Chưa chọn phần thi',
      description: 'Vui lòng chọn một phần thi để bắt đầu làm bài.',
      cta: 'Chọn phần thi ngay',
    },
    'no-content': {
      icon: FileText, iconColor: 'text-[#FF9600]', iconBg: 'bg-[#FFFBEA]',
      title: 'Đang cập nhật',
      description: 'Nội dung cho phần này đang được biên soạn.',
      cta: null,
    },
  };

  const state = states[type] || states['no-part'];
  const Icon = state.icon;

  return (
    <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-10 shadow-sm animate-in zoom-in-95 duration-300 w-full flex flex-col items-center text-center">
      <div className={`w-20 h-20 rounded-[24px] ${state.iconBg} flex items-center justify-center mb-6 shadow-inner border-b-[4px] border-black/5`}>
        <Icon className={`w-10 h-10 ${state.iconColor}`} strokeWidth={2.5} />
      </div>
      <p className="text-slate-900 font-black text-2xl mb-2">{state.title}</p>
      <p className="text-slate-500 font-bold max-w-sm leading-relaxed">{state.description}</p>
      
      {state.cta && onSelectPart && (
        <button
          onClick={onSelectPart}
          className="mt-8 flex items-center gap-2 px-8 py-3.5 bg-[#1CB0F6] border-b-[4px] border-[#1899D6] hover:brightness-105 text-white rounded-2xl text-sm font-black uppercase tracking-wider transition-all active:border-b-0 active:translate-y-[4px]"
        >
          {state.cta}
          <ArrowRight className="w-5 h-5" strokeWidth={3} />
        </button>
      )}
    </div>
  );
});

// ── ContentDisplay (MAIN) ──
const ContentDisplay = memo(({
  partData,
  selectedPart,
  testType,
  isPartPlayed,
  onAudioStart,
  onAudioEnd,
  onSelectPart,
  isLoading = false,
}) => {

  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-20 text-center shadow-sm">
        <Loader2 className="w-10 h-10 text-[#1CB0F6] animate-spin mx-auto mb-4" strokeWidth={3} />
        <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Đang tải...</p>
      </div>
    );
  }

  if (!partData) return <EmptyState type="no-part" onSelectPart={onSelectPart} />;

  const pType = partData.type || testType;

  // Render dựa trên loại Part
  switch (pType) {
    case 'listening':
      // 🎧 Chỉ hiện MediaContent nếu có Audio Url hoặc Script (Thường là Part 3, 4)
      return (
        <div className="w-full">
          <MediaContent
            partData={partData}
            isPartPlayed={isPartPlayed}
            onAudioStart={onAudioStart}
            onAudioEnd={onAudioEnd}
          />
        </div>
      );

    case 'reading':
      // 📖 Nếu có text đoạn văn (Part 6, 7) thì hiện khung đọc
      if (partData.text || partData.passageText) {
         return <TextContent partData={partData} />;
      }
      // Các phần như Part 5 không có đoạn văn chung thì ẩn hẳn ContentDisplay
      return null; 

    case 'writing':
    case 'speaking':
      return (
        <div className="flex flex-col gap-4 w-full">
          <TextContent partData={partData} />
          {partData.audioUrl && (
            <MediaContent 
              partData={partData} 
              isPartPlayed={isPartPlayed}
              onAudioStart={onAudioStart}
              onAudioEnd={onAudioEnd}
            />
          )}
        </div>
      );

    default:
      return null;
  }
});

export default ContentDisplay;
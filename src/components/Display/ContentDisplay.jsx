// ============================================================
// ContentDisplay.jsx — Hỗ trợ Dynamic Array (Mảng Part Động)
// ============================================================
import React, { useMemo, memo } from 'react';
import { AlertCircle, Headphones, BookOpen, FileText, Loader2, ArrowRight, PenTool, Mic } from 'lucide-react';
import ReadingDisplay from './Readingdisplay';
import ScriptDisplay from './ScriptDisplay';

// Cấu hình UI cho từng loại kỹ năng
const TYPE_UI = {
  listening: { icon: Headphones, color: 'text-blue-500',   bg: 'bg-blue-50',   title: 'Phần Nghe' },
  reading:   { icon: BookOpen,   color: 'text-amber-500',  bg: 'bg-amber-50',  title: 'Phần Đọc' },
  writing:   { icon: PenTool,    color: 'text-emerald-500',bg: 'bg-emerald-50',title: 'Phần Viết' },
  speaking:  { icon: Mic,        color: 'text-purple-500', bg: 'bg-purple-50', title: 'Phần Nói' }
};

// ── InfoCard ──
const InfoCard = memo(({ icon: Icon, label, value, color = 'blue' }) => {
  const colorMap = {
    blue:    'text-blue-600 bg-blue-50',
    purple:  'text-purple-600 bg-purple-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    amber:   'text-amber-600 bg-amber-50',
  };
  return (
    <div className="flex items-center gap-3 p-3 md:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-md transition-all duration-300">
      <div className={`p-2.5 rounded-[14px] ${colorMap[color]}`}>
        <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm md:text-base font-black text-slate-800 truncate">{value}</p>
      </div>
    </div>
  );
});
InfoCard.displayName = 'InfoCard';

// ── MediaContent (Xử lý Audio/Script cho Listening & Speaking) ──
const MediaContent = memo(({
  partData, isPartPlayed, onAudioStart, onAudioEnd
}) => {
  const script = useMemo(() => {
    if (!partData) return '';
    if (partData.script) return partData.script;
    if (partData.text) return partData.text;
    if (partData.questions && Array.isArray(partData.questions)) {
      const scripts = partData.questions.filter(q => q.script).map(q => q.script).join('\n\n---\n\n');
      if (scripts.trim()) return scripts;
    }
    if (partData.description) return partData.description;
    return '';
  }, [partData]);

  const audioUrl = partData?.audioUrl || null;
  const partTitle = partData?.title || `Phần Thi`;

  // Nếu không có Audio VÀ không có Script thì hiện Empty
  if (!script && !audioUrl) {
    const ui = TYPE_UI[partData?.type] || TYPE_UI.listening;
    const Icon = ui.icon;
    return (
      <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 text-center shadow-sm animate-in fade-in duration-300">
        <div className={`w-14 h-14 rounded-[18px] ${ui.bg} border border-slate-100 flex items-center justify-center mx-auto mb-5 shadow-inner`}>
          <Icon className={`w-7 h-7 ${ui.color}`} strokeWidth={2} />
        </div>
        <p className="text-slate-800 font-black text-lg">Chưa có dữ liệu Media</p>
        <p className="text-slate-500 text-sm mt-1 font-medium">Nội dung (Audio/Script) cho phần này sẽ sớm được cập nhật.</p>
        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          {partTitle}
        </div>
      </div>
    );
  }

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

// ── TextContent (Cho Writing / Reading / Speaking Prompt) ──
const TextContent = memo(({ partData }) => {
  const content = partData?.text || partData?.description || partData?.instruction || '';
  if (!content.trim()) return null;

  return (
    <div className="bg-white rounded-[24px] border border-slate-200/80 p-6 md:p-8 shadow-sm animate-in fade-in duration-500 w-full">
      {partData?.title && (
        <h3 className="text-lg font-black text-slate-800 mb-4 pb-4 border-b border-slate-100">
          {partData.title}
        </h3>
      )}
      <div className="prose prose-slate max-w-none text-[15px] leading-relaxed font-medium text-slate-700 whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
});
TextContent.displayName = 'TextContent';


// ── EmptyState — with CTA ──
const EmptyState = memo(({ type = 'no-part', onSelectPart }) => {
  const states = {
    'no-part': {
      icon: AlertCircle, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', bg: 'bg-white',
      title: 'Chưa chọn phần thi',
      description: 'Vui lòng chọn một phần thi (Part) từ danh sách phía trên để bắt đầu.',
      cta: 'Lên chọn Part ngay',
    },
    'no-content': {
      icon: FileText, iconColor: 'text-amber-500', iconBg: 'bg-amber-50', bg: 'bg-white',
      title: 'Nội dung đang cập nhật',
      description: 'Dữ liệu cho phần thi này chưa được tải lên hệ thống. Vui lòng thử phần khác.',
      cta: null,
    },
  };

  const state = states[type] || states['no-part'];
  const Icon = state.icon;

  return (
    <div className={`${state.bg} rounded-[24px] border border-slate-200/80 p-8 shadow-sm animate-in fade-in zoom-in-95 duration-300 w-full`}>
      <div className="text-center py-6 flex flex-col items-center">
        <div className={`w-16 h-16 rounded-[20px] ${state.iconBg} flex items-center justify-center mb-5 shadow-inner`}>
          <Icon className={`w-8 h-8 ${state.iconColor}`} strokeWidth={2} />
        </div>
        <p className="text-slate-900 font-black text-xl mb-2">{state.title}</p>
        <p className="text-slate-500 text-sm font-medium max-w-sm">{state.description}</p>
        
        {state.cta && onSelectPart && (
          <button
            onClick={onSelectPart}
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-bold transition-all active:scale-[0.96] border border-blue-200/50"
          >
            {state.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
});
EmptyState.displayName = 'EmptyState';

// ── ContentDisplay (MAIN COMPONENT) ──
const ContentDisplay = memo(({
  partData,
  selectedPart, // Ở dạng mảng, selectedPart có thể là part.id (VD: "part_173...")
  currentQuestionIndex,
  testType,
  examId,
  isPartPlayed,
  onAudioStart,
  onAudioEnd,
  onSelectPart,
  isLoading = false,
}) => {

  // 1. Trạng thái Đang tải (Spinner)
  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 text-center shadow-sm animate-in fade-in duration-300">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
          <p className="text-slate-900 font-bold text-lg">Đang tải nội dung...</p>
        </div>
      </div>
    );
  }

  // 2. Không có dữ liệu part
  if (!partData) {
    return <EmptyState type="no-part" onSelectPart={onSelectPart} />;
  }

  const contentKey = `${partData.id || selectedPart}`;
  const pType = partData.type || testType; // Tự động nhận diện loại part

  // 3. Xử lý hiển thị dựa trên Loại Part (part.type)
  switch (pType) {
    case 'listening':
      return (
        <div key={contentKey}>
          <MediaContent
            partData={partData}
            isPartPlayed={isPartPlayed}
            onAudioStart={onAudioStart}
            onAudioEnd={onAudioEnd}
          />
        </div>
      );

    case 'reading':
      // Nếu có component ReadingDisplay riêng thì dùng, không thì dùng TextContent chung
      if (partData.text) {
         return (
          <div key={contentKey} className="animate-in fade-in duration-500">
            {ReadingDisplay ? <ReadingDisplay data={partData} /> : <TextContent partData={partData} />}
          </div>
        );
      }
      // Nếu Reading Part không có đoạn văn (VD: part 5 grammar) thì không cần hiện content block.
      return null; 

    case 'writing':
    case 'speaking':
      // Writing và Speaking hiển thị đề bài/prompt
      return (
        <div key={contentKey}>
          <TextContent partData={partData} />
          {/* Nếu có Audio đi kèm (như Speaking) */}
          {partData.audioUrl && (
             <div className="mt-4">
                <MediaContent partData={partData} />
             </div>
          )}
        </div>
      );

    default:
      // Trường hợp không có content nào
      return <EmptyState type="no-content" />;
  }
});
ContentDisplay.displayName = 'ContentDisplay';

export { ContentDisplay as default, EmptyState, MediaContent as ListeningContent };
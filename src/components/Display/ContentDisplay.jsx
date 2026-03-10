// ============================================================
// ContentDisplay.jsx — Fix Bug Blank Screen & Chuẩn UI Google
// ============================================================
import React, { useMemo, memo } from 'react';
import { AlertCircle, Headphones, FileText, Loader2, ArrowRight } from 'lucide-react';
import ReadingDisplay from './Readingdisplay';
import ScriptDisplay from './ScriptDisplay';

const getAudioPath = (examId, partId) => {
  if (!examId || !partId) return null;
  return `/public/data/audio/${examId}/listening/${partId}.mp3`;
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

// ── ListeningContent ──
const ListeningContent = memo(({
  partData, selectedPart, testType, examId, isPartPlayed, onAudioStart, onAudioEnd
}) => {
  const partNumber = selectedPart.replace('part', '');

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

  const audioUrl = useMemo(() => {
    if (!examId) return null;
    return partData?.audioUrl || getAudioPath(examId, selectedPart);
  }, [examId, selectedPart, partData]);

  const partTitle = useMemo(() => partData?.title || `Part ${partNumber} - Phần Nghe`, [partData, partNumber]);

  if (!script) {
    return (
      <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 text-center shadow-sm animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-[18px] bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <Headphones className="w-7 h-7 text-slate-400" strokeWidth={2} />
        </div>
        <p className="text-slate-800 font-black text-lg">Chưa có kịch bản</p>
        <p className="text-slate-500 text-sm mt-1 font-medium">Kịch bản cho phần này sẽ sớm được cập nhật.</p>
        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          Part {partNumber}
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
ListeningContent.displayName = 'ListeningContent';

// ── EmptyState — with CTA ──
const EmptyState = memo(({ type = 'no-part', onSelectPart }) => {
  const states = {
    'no-part': {
      icon: AlertCircle,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50',
      bg: 'bg-white',
      border: 'border-slate-200/80',
      title: 'Chưa chọn phần thi',
      description: 'Vui lòng chọn một phần thi (Part) từ danh sách phía trên để bắt đầu.',
      cta: 'Lên chọn Part ngay',
    },
    'no-content': {
      icon: FileText,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50',
      bg: 'bg-white',
      border: 'border-slate-200/80',
      title: 'Nội dung đang cập nhật',
      description: 'Dữ liệu cho phần thi này chưa được tải lên hệ thống. Vui lòng thử phần khác.',
      cta: null,
    },
  };

  const state = states[type] || states['no-part'];
  const Icon = state.icon;

  return (
    <div className={`${state.bg} rounded-[24px] border ${state.border} p-8 shadow-sm animate-in fade-in zoom-in-95 duration-300 w-full`}>
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
  selectedPart,
  currentQuestionIndex,
  testType,
  examId,
  isPartPlayed,
  onAudioStart,
  onAudioEnd,
  onSelectPart,
  isLoading = false,
}) => {
  const content = useMemo(() => {
    if (!partData) return '';
    if (testType === 'listening') {
      if (partData.script) return partData.script;
      if (partData.text) return partData.text;
      if (partData.questions && Array.isArray(partData.questions)) {
        return partData.questions.filter(q => q.script).map(q => q.script).join('\n\n');
      }
      return '';
    }
    return partData.text || '';
  }, [partData, testType]);

  const contentKey = `${testType}-${selectedPart}`;

  // 1. Trạng thái Đang tải (Spinner)
  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] border border-slate-200/80 p-8 text-center shadow-sm animate-in fade-in duration-300">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
          <p className="text-slate-900 font-bold text-lg">Đang tải nội dung...</p>
          {selectedPart && <p className="text-slate-500 text-sm mt-1 font-medium">Part {selectedPart.replace('part', '')}</p>}
        </div>
      </div>
    );
  }

  // ✅ FIX BUG: 2. Kiểm tra nếu partData rỗng thì HIỆN EMPTY STATE TRƯỚC!
  if (!partData) {
    return <EmptyState type="no-part" onSelectPart={onSelectPart} />;
  }

  // 3. ĐẶC THÙ READING PART 5: Part 5 không có bài đọc chung -> Ẩn khung hiển thị (Return null ở đây mới đúng)
  if (testType === 'reading' && selectedPart === 'part5') {
    return null;
  }

  // 4. Nếu có dữ liệu nhưng nội dung text rỗng
  if (!content.trim()) {
    return <EmptyState type="no-content" />;
  }

  // 5. Render phần Đọc
  if (testType === 'reading') {
    return (
      <div key={contentKey} className="animate-in fade-in duration-500">
        <ReadingDisplay data={partData} />
      </div>
    );
  }

  // 6. Render phần Nghe
  if (testType === 'listening') {
    return (
      <div key={contentKey}>
        <ListeningContent
          partData={partData}
          selectedPart={selectedPart}
          testType={testType}
          examId={examId}
          isPartPlayed={isPartPlayed}
          onAudioStart={onAudioStart}
          onAudioEnd={onAudioEnd}
        />
      </div>
    );
  }

  return null;
});
ContentDisplay.displayName = 'ContentDisplay';

export { ContentDisplay as default, EmptyState, ListeningContent };
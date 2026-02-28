// ============================================================
// ContentDisplay.jsx — Fixed z-index, padding, empty state CTA
// ============================================================
import React, { useMemo, memo } from 'react';
import { AlertCircle, Headphones, FileText } from 'lucide-react';
import ReadingDisplay from './Readingdisplay';
import ScriptDisplay from './ScriptDisplay';

const getAudioPath = (examId, partId) => {
  if (!examId || !partId) return null;
  return `/public/data/audio/${examId}/listening/${partId}.mp3`;
};

// ── InfoCard ──
const InfoCard = memo(({ icon: Icon, label, value, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'text-indigo-600 bg-indigo-50',
    purple: 'text-purple-600 bg-purple-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    amber: 'text-amber-600 bg-amber-50',
  };
  return (
    <div className="flex items-center gap-2 p-2 md:p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
      <div className={`p-1.5 md:p-2 rounded-lg ${colorMap[color]}`}>
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</p>
        <p className="text-xs md:text-sm font-bold text-slate-900 truncate">{value}</p>
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
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 text-center">
        {/* ✅ Fixed: smaller icon, standard padding */}
        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Headphones className="w-6 h-6 text-slate-400" strokeWidth={1.5} />
        </div>
        <p className="text-slate-900 font-bold text-base">Chưa có kịch bản</p>
        <p className="text-slate-500 text-sm mt-1">Kịch bản cho phần này sẽ sớm có</p>
        <p className="text-slate-400 text-xs mt-2">Part: {partNumber}</p>
      </div>
    );
  }

  return (
    // ✅ Fixed: removed z-20, it's unnecessary here
    <div className="animate-in fade-in duration-300 w-full">
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

// ── EmptyState — now with CTA ──
const EmptyState = memo(({ type = 'no-part', onSelectPart }) => {
  const states = {
    'no-part': {
      icon: AlertCircle,
      iconColor: 'text-slate-400',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      title: 'Chọn Part để bắt đầu',
      description: 'Vui lòng chọn một phần thi từ danh sách trên',
      cta: 'Chọn Part',
    },
    'no-content': {
      icon: FileText,
      iconColor: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      title: 'Không có nội dung',
      description: 'Nội dung cho phần này chưa được tải hoặc cập nhật',
      cta: null,
    },
  };

  const state = states[type] || states['no-part'];
  const Icon = state.icon;

  return (
    <div className={`${state.bg} rounded-xl border-2 ${state.border} p-8 animate-in fade-in duration-300 w-full`}>
      <div className="text-center py-6">
        {/* ✅ Fixed: w-12 h-12 instead of w-14/w-16 for mobile */}
        <div className="w-12 h-12 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Icon className={`w-6 h-6 ${state.iconColor}`} strokeWidth={1.5} />
        </div>
        <p className="text-slate-900 font-bold text-lg mb-1">{state.title}</p>
        <p className="text-slate-600 text-sm">{state.description}</p>
        {/* ✅ Google UX: always provide a next action */}
        {state.cta && onSelectPart && (
          <button
            onClick={onSelectPart}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {state.cta} →
          </button>
        )}
      </div>
    </div>
  );
});
EmptyState.displayName = 'EmptyState';

// ── ContentDisplay ──
const ContentDisplay = memo(({
  partData, selectedPart, currentQuestionIndex, testType, examId,
  isPartPlayed, onAudioStart, onAudioEnd,
  onSelectPart, // optional: scroll user up to part selector
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

  if (testType === 'reading' && selectedPart === 'part5') return null;
  if (!partData) return <EmptyState type="no-part" onSelectPart={onSelectPart} />;
  if (!content.trim()) return <EmptyState type="no-content" />;

  if (testType === 'reading') return <ReadingDisplay data={partData} />;

  if (testType === 'listening') {
    return (
      <ListeningContent
        partData={partData}
        selectedPart={selectedPart}
        testType={testType}
        examId={examId}
        isPartPlayed={isPartPlayed}
        onAudioStart={onAudioStart}
        onAudioEnd={onAudioEnd}
      />
    );
  }

  return null;
});
ContentDisplay.displayName = 'ContentDisplay';
export { ContentDisplay as default, EmptyState, ListeningContent };

 
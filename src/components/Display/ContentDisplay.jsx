// ContentDisplay.jsx
import React, { memo } from 'react';
import { AlertCircle, FileText, Loader2, ArrowRight } from 'lucide-react';
import ReadingDisplay from './Readingdisplay';
import ScriptDisplay from './ScriptDisplay';

/* ─── Helpers ────────────────────────────────────────────── */

/**
 * Lấy nội dung văn bản từ partData. Ưu tiên script.
 */
function getTextContent(partData) {
  return (
    partData?.script      || 
    partData?.content     ||
    partData?.text        ||
    partData?.passageText ||
    ''
  );
}

/**
 * Lấy script (transcript) từ partData.
 */
function getScript(partData) {
  return partData?.script || partData?.content || partData?.text || '';
}

/**
 * Lấy danh sách group có audio riêng bên trong questions[].
 * Dùng cho Part 3/4 TOEIC — mỗi group có audioUrl + script riêng.
 */
function getGroupsWithAudio(partData) {
  if (!Array.isArray(partData?.questions)) return [];
  return partData.questions.filter(
    (q) => q.type === 'group' && q.audioUrl
  );
}

/* ─── MediaContent ───────────────────────────────────────── */
const MediaContent = memo(({
  audioUrl,
  script,
  partTitle,
  isPartPlayed,
  onAudioStart,
  onAudioEnd,
}) => {
  if (!audioUrl && !script) return null;

  return (
    <div className="animate-in fade-in duration-500 w-full">
      <ScriptDisplay
        script={script || ''}
        audioUrl={audioUrl || null}
        partTitle={partTitle}
        isPartPlayed={isPartPlayed}
        onAudioStart={onAudioStart}
        onAudioEnd={onAudioEnd}
      />
    </div>
  );
});
MediaContent.displayName = 'MediaContent';

/* ─── GroupAudioList ─────────────────────────────────────── */
const GroupAudioList = memo(({
  groups,
  partTitle,
  isPartPlayed,
  onAudioStart,
  onAudioEnd,
}) => {
  if (!groups.length) return null;

  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in duration-500">
      {groups.map((group, idx) => {
        const isLast = idx === groups.length - 1;
        const label = group.title || `${partTitle} — Đoạn ${idx + 1}`;

        return (
          <div
            key={group.id}
            // 🚀 FIX: Chuyển toàn bộ Inline Styles sang Tailwind
            className="rounded-3xl border-2 border-[#eec9ff] bg-[#F8EEFF] overflow-hidden shadow-sm"
          >
            {/* Header nhóm */}
            <div className="px-5 py-3.5 flex items-center gap-3 border-b-2 border-[#eec9ff] bg-white">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[#eec9ff] border-b-4 bg-[#F8EEFF] shrink-0">
                <FileText size={18} className="text-[#B975E5]" strokeWidth={3} />
              </div>
              <span className="text-[13px] font-nunito font-black uppercase tracking-widest text-[#B975E5] pt-0.5">
                {label}
              </span>
            </div>

            {/* Audio + script của group */}
            <div className="p-5">
              <MediaContent
                audioUrl={group.audioUrl}
                script={getScript(group)}
                partTitle={label}
                isPartPlayed={isPartPlayed}
                onAudioStart={onAudioStart}
                onAudioEnd={isLast ? onAudioEnd : undefined}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});
GroupAudioList.displayName = 'GroupAudioList';

/* ─── ReadingContent ─────────────────────────────────────── */
const ReadingContent = memo(({ partData }) => {
  const data = {
    text:        getTextContent(partData),
    title:       partData.title       || '',
    description: partData.description || partData.instruction || '',
    questions:   partData.questions   || [],
  };

  if (!data.text.trim()) return null;

  return (
    <div className="animate-in fade-in duration-500 w-full">
      <ReadingDisplay data={data} />
    </div>
  );
});
ReadingContent.displayName = 'ReadingContent';

/* ─── EmptyState ─────────────────────────────────────────── */
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
  if (!Icon) return null;

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 border-b-[6px] p-10 shadow-sm animate-in zoom-in-95 duration-300 w-full flex flex-col items-center text-center">
      <div className={`w-20 h-20 rounded-2xl ${state.iconBg} flex items-center justify-center mb-6 border-b-4 border-black/5`}>
        <Icon className={`w-10 h-10 ${state.iconColor}`} strokeWidth={3} />
      </div>
      <p className="text-slate-800 font-nunito font-black text-2xl mb-2">{state.title}</p>
      <p className="text-slate-500 font-nunito font-bold max-w-sm leading-relaxed">{state.description}</p>
      
      {state.cta && onSelectPart && (
        <button
          onClick={onSelectPart}
          className="mt-8 flex items-center gap-2 px-8 py-4 bg-[#1CB0F6] border-b-4 border-[#1899D6] active:border-b-0 active:translate-y-[4px] text-white rounded-2xl text-[14px] font-nunito font-black uppercase tracking-widest transition-all outline-none shadow-sm"
        >
          {state.cta}
          <ArrowRight className="w-5 h-5" strokeWidth={3} />
        </button>
      )}
    </div>
  );
});
EmptyState.displayName = 'EmptyState';

/* ═══════════════════════════════════════════════════════════
   MAIN — ContentDisplay
═══════════════════════════════════════════════════════════ */
const ContentDisplay = memo(({
  partData,
  testType,
  isPartPlayed,
  onAudioStart,
  onAudioEnd,
  onSelectPart,
  isLoading = false,
}) => {

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border-2 border-slate-200 border-b-[6px] p-20 text-center shadow-sm">
        <Loader2 className="w-12 h-12 text-[#1CB0F6] animate-spin mx-auto mb-4" strokeWidth={3} />
        <p className="text-slate-400 font-nunito font-black uppercase tracking-widest text-[13px]">Đang tải...</p>
      </div>
    );
  }

  if (!partData) return <EmptyState type="no-part" onSelectPart={onSelectPart} />;

  const pType = partData.type || testType;

  /* ── LISTENING ─────────────────────────────────────────── */
  if (pType === 'listening') {
    const partAudioUrl = partData.audioUrl || null;
    const partScript   = getScript(partData);
    const groupsWithAudio = getGroupsWithAudio(partData);

    if (partAudioUrl) {
      return (
        <div className="w-full">
          <MediaContent
            audioUrl={partAudioUrl}
            script={partScript}
            partTitle={partData.title || 'Phần Nghe'}
            isPartPlayed={isPartPlayed}
            onAudioStart={onAudioStart}
            onAudioEnd={onAudioEnd}
          />
        </div>
      );
    }

    // 🚀 FIX LỚN: Trả về GroupAudioList thay vì trả về null
    if (groupsWithAudio.length > 0) {
      return (
        <GroupAudioList
          groups={groupsWithAudio}
          partTitle={partData.title || 'Bài Nghe Nhóm'}
          isPartPlayed={isPartPlayed}
          onAudioStart={onAudioStart}
          onAudioEnd={onAudioEnd}
        />
      );
    }

    return null;
  }

  /* ── READING ───────────────────────────────────────────── */
  if (pType === 'reading') {
    return <ReadingContent partData={partData} />;
  }

  /* ── WRITING / SPEAKING ────────────────────────────────── */
  if (pType === 'writing' || pType === 'speaking') {
    const content = getTextContent(partData);
    const hasAudio = !!partData?.audioUrl;

    if (!content.trim() && !hasAudio) return null;

    return (
      <div className="flex flex-col gap-6 w-full">
        {content.trim() && <ReadingContent partData={partData} />}
        {hasAudio && (
          <MediaContent
            audioUrl={partData.audioUrl}
            script={getScript(partData)}
            partTitle={partData.title || 'Phần Thi'}
            isPartPlayed={isPartPlayed}
            onAudioStart={onAudioStart}
            onAudioEnd={onAudioEnd}
          />
        )}
      </div>
    );
  }

  return null;
});

ContentDisplay.displayName = 'ContentDisplay';
export default ContentDisplay;
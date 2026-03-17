// ContentDisplay.jsx
import React, { useMemo, memo } from 'react';
import {
  AlertCircle, Headphones, BookOpen, FileText,
  Loader2, ArrowRight, PenTool, Mic
} from 'lucide-react';
import ReadingDisplay from './Readingdisplay'; // Đảm bảo đúng tên file của bạn (chữ d thường/hoa)
import ScriptDisplay from './ScriptDisplay';

/* ─── Design tokens ─────────────────────────────────────── */
const C = {
  blue: '#1CB0F6', blueDark: '#1899D6', blueBg: '#EAF6FE', blueBorder: '#BAE3FB',
  green: '#58CC02', greenDark: '#46A302', greenBg: '#F0FAE8',
  purple: '#CE82FF', purpleDark: '#B975E5', purpleBg: '#F8EEFF', purpleBorder: '#eec9ff',
  n200: '#E2E8F0', n400: '#94A3B8', n500: '#64748B', n800: '#1E293B',
  white: '#FFFFFF',
};

/* ─── Helpers ────────────────────────────────────────────── */

/**
 * 🚀 ĐÃ SỬA: Lấy nội dung văn bản từ partData.
 * Bổ sung partData.script lên ưu tiên hàng đầu để tương thích với cấu trúc Admin mới.
 */
function getTextContent(partData) {
  return (
    partData?.script      || // <--- ĐÂY LÀ CHÌA KHÓA GIẢI QUYẾT VẤN ĐỀ
    partData?.content     ||
    partData?.text        ||
    partData?.passageText ||
    // Loại bỏ việc lấy description/instruction làm nội dung bài đọc để tránh bị hiển thị trùng lặp nhầm
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
            className="rounded-[20px] border-2 overflow-hidden"
            style={{ background: C.purpleBg, borderColor: C.purpleBorder }}
          >
            {/* Header nhóm */}
            <div
              className="px-4 py-3 flex items-center gap-2.5 border-b-2"
              style={{ background: C.white, borderColor: C.purpleBorder }}
            >
              <div
                className="w-8 h-8 rounded-[10px] flex items-center justify-center border-2 shrink-0"
                style={{ background: C.purpleBg, borderColor: C.purpleBorder }}
              >
                <FileText size={16} color={C.purpleDark} strokeWidth={2.5} />
              </div>
              <span
                className="text-[12px] font-black uppercase tracking-wider pt-0.5"
                style={{ color: C.purpleDark, fontFamily: '"Baloo 2", sans-serif' }}
              >
                {label}
              </span>
            </div>

            {/* Audio + script của group */}
            <div className="p-4">
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
  // ReadingDisplay nhận prop `data` với shape { text, title, description, questions }
  const data = {
    text:        getTextContent(partData),
    title:       partData.title       || '',
    description: partData.description || partData.instruction || '',
    questions:   partData.questions   || [],
  };

  // Nếu không có nội dung gì → không render (Ví dụ Part 5 ngữ pháp TOEIC)
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
EmptyState.displayName = 'EmptyState';

/* ═══════════════════════════════════════════════════════════
   MAIN — ContentDisplay
═══════════════════════════════════════════════════════════ */
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

    if (groupsWithAudio.length > 0) return null;
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
      <div className="flex flex-col gap-4 w-full">
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
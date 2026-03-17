import { memo, useState, useCallback } from 'react';
import {
  BarChart3, SearchX, Layers, Volume2, BookOpen,
  CheckCircle2, XCircle, ChevronDown, ChevronRight,
  Music, Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnswerReviewCard from './AnswerReviewCard';
import { FILTER_TYPES } from '../../../hooks/Result/useFilteredQuestions';

/* ─── Design tokens ─────────────────────────────────────── */
const C = {
  blue: '#1CB0F6', blueDark: '#1899D6', blueBg: '#EAF6FE', blueBorder: '#BAE3FB',
  green: '#58CC02', greenDark: '#46A302', greenBg: '#F0FAE8',
  purple: '#CE82FF', purpleDark: '#B975E5', purpleBg: '#F8EEFF', purpleBorder: '#eec9ff',
  n100: '#F1F5F9', n200: '#E2E8F0', n400: '#94A3B8', n500: '#64748B', n800: '#1E293B',
  white: '#FFFFFF', red: '#FF4B4B',
};
const F = { body: '"Nunito", "Baloo 2", sans-serif', display: '"Baloo 2", "Nunito", sans-serif' };

/* ─── Empty States ───────────────────────────────────────── */
const EmptyAllQuestions = () => (
  <div className="text-center py-12 bg-white border-2 border-dashed border-slate-300 rounded-[20px]">
    <div className="w-12 h-12 bg-slate-100 rounded-[12px] flex items-center justify-center mx-auto mb-3 border-b-[3px] border-slate-200">
      <SearchX className="w-6 h-6 text-slate-400" strokeWidth={2.5} />
    </div>
    <p className="text-[15px] font-display font-bold text-slate-600">Không có câu hỏi nào</p>
  </div>
);

const EmptyWrongQuestions = () => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', bounce: 0.4 }}
    className="text-center py-10 px-4 rounded-[24px] border-2 border-b-[4px]"
    style={{ background: C.greenBg, borderColor: C.green }}
  >
    <p className="text-[40px] leading-none mb-3">🎉</p>
    <p className="font-display font-black text-[20px]" style={{ color: C.green }}>
      Tuyệt vời! Không có câu sai
    </p>
    <p className="font-body font-bold text-[14px] mt-1.5" style={{ color: C.greenDark + 'CC' }}>
      Bạn đã trả lời đúng tất cả câu hỏi. Thật xuất sắc!
    </p>
  </motion.div>
);

/* ─── FilterTabs ─────────────────────────────────────────── */
const FilterTabs = memo(({ activeFilter, onFilterChange }) => (
  <div className="flex p-1 rounded-[12px] border-2 border-slate-200/50" style={{ background: 'rgba(226,232,240,0.6)' }}>
    {[
      { key: FILTER_TYPES.ALL,   label: 'TẤT CẢ' },
      { key: FILTER_TYPES.WRONG, label: 'CÂU SAI' },
    ].map(({ key, label }) => (
      <button
        key={key}
        onClick={() => onFilterChange(key)}
        className="px-4 py-1.5 text-[11px] sm:text-[12px] font-display font-bold rounded-[8px] transition-all outline-none border-2"
        style={
          activeFilter === key
            ? {
                background: C.white,
                color: key === FILTER_TYPES.WRONG ? C.red : C.blue,
                borderColor: C.n200,
                borderBottomWidth: 3,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                transform: 'translateY(-1px)',
              }
            : {
                borderColor: 'transparent',
                color: C.n500,
              }
        }
      >
        {label}
      </button>
    ))}
  </div>
));
FilterTabs.displayName = 'FilterTabs';

/* ─── TranscriptBlock ────────────────────────────────────── */
/**
 * Hiển thị transcript sau khi nộp bài.
 * Dùng cho cả group (Part 3/4) lẫn câu đơn lẻ (Part 1/2).
 * Có thể collapse để tiết kiệm không gian.
 */
const TranscriptBlock = memo(({ script, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  if (!script) return null;

  return (
    <div
      className="rounded-[16px] border-2 overflow-hidden transition-all"
      style={{ background: C.blueBg, borderColor: C.blueBorder }}
    >
      {/* Toggle header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 outline-none transition-colors hover:bg-white/40"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-[10px] flex items-center justify-center border-2 shrink-0"
            style={{
              background: '#DAEEFB',
              borderColor: C.blueBorder,
              boxShadow: `0 2px 0 ${C.blueBorder}`,
            }}
          >
            <Volume2 size={15} color={C.blue} strokeWidth={2.5} />
          </div>
          <span
            className="text-[11px] font-black uppercase tracking-wider pt-0.5"
            style={{ fontFamily: F.display, color: C.blue }}
          >
            Nội dung bài nghe
          </span>
        </div>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200"
          style={{
            background: '#DAEEFB',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        >
          <ChevronDown size={15} color={C.blue} strokeWidth={3} />
        </div>
      </button>

      {/* Transcript content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-4 pt-3 border-t-2 border-dashed"
              style={{ borderColor: C.blueBorder }}
            >
              <p
                className="text-[14px] font-bold italic leading-relaxed m-0"
                style={{ color: C.n500 }}
              >
                "{script}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
TranscriptBlock.displayName = 'TranscriptBlock';

/* ─── PassageBlock ───────────────────────────────────────── */
/**
 * Hiển thị đoạn văn bài đọc (Part 6/7) trong kết quả.
 * Luôn hiển thị (không cần collapse vì đây là ngữ liệu tham khảo).
 */
const PassageBlock = memo(({ content, imageUrl, audioUrl }) => {
  if (!content && !imageUrl && !audioUrl) return null;

  return (
    <div
      className="rounded-[16px] border-2 overflow-hidden mb-3"
      style={{ background: C.purpleBg, borderColor: C.purpleBorder }}
    >
      <div className="px-4 py-3 border-b-2 flex items-center gap-2" style={{ borderColor: C.purpleBorder }}>
        <BookOpen size={15} color={C.purpleDark} strokeWidth={2.5} />
        <span
          className="text-[11px] font-black uppercase tracking-wider"
          style={{ fontFamily: F.display, color: C.purpleDark }}
        >
          Nội dung đoạn văn / bài đọc
        </span>
      </div>
      <div className="p-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Passage"
            className="max-w-full max-h-[300px] rounded-[12px] border-2 object-contain bg-white p-1 mb-3"
            style={{ borderColor: C.purpleBorder }}
          />
        )}
        {audioUrl && (
          <div
            className="flex items-center gap-3 p-3 rounded-[12px] border-2 mb-3"
            style={{ background: C.blueBg, borderColor: C.blueBorder }}
          >
            <Music size={16} color={C.blue} />
            <audio src={audioUrl} controls className="h-8 flex-1" />
          </div>
        )}
        {content && (
          <p
            className="text-[14px] font-bold leading-relaxed m-0 whitespace-pre-wrap"
            style={{ color: C.n800 }}
          >
            {content}
          </p>
        )}
      </div>
    </div>
  );
});
PassageBlock.displayName = 'PassageBlock';

/* ─── GroupResultBlock ───────────────────────────────────── */
/**
 * Render một group trong trang kết quả:
 * 1. Nhãn "Nhóm câu X–Y"
 * 2. Audio player + TranscriptBlock (nếu có script)
 * 3. PassageBlock (nếu có content / bài đọc)
 * 4. Danh sách AnswerReviewCard cho từng subQuestion
 */
const GroupResultBlock = memo(({ group, globalIndexStart, answers, expandedId, onToggle }) => {
  const validSubs = (group.subQuestions ?? []).filter((sq) => !sq.isExample);
  const labelTo = globalIndexStart + validSubs.length - 1;

  return (
    <div
      className="rounded-[24px] border-2 border-b-[4px] overflow-hidden"
      style={{ background: C.purpleBg, borderColor: C.purpleBorder }}
    >
      {/* ── Group header ── */}
      <div
        className="px-4 py-3 flex items-center gap-3 border-b-2"
        style={{ background: C.white, borderColor: C.purpleBorder }}
      >
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center border-2 shrink-0"
          style={{
            background: C.purpleBg,
            borderColor: C.purpleBorder,
            boxShadow: `0 2px 0 ${C.purpleBorder}`,
          }}
        >
          <Layers size={16} color={C.purpleDark} strokeWidth={2.5} />
        </div>
        <div>
          <span
            className="text-[13px] font-black uppercase tracking-wider block"
            style={{ fontFamily: F.display, color: C.purpleDark }}
          >
            Nhóm câu hỏi
          </span>
          <span
            className="text-[11px] font-bold"
            style={{ color: C.purpleDark + '99' }}
          >
            Câu {globalIndexStart}–{labelTo}
          </span>
        </div>
      </div>

      {/* ── Nội dung group ── */}
      <div className="p-4 space-y-3">
        {/* Audio chung của group (Part 3/4) + Transcript */}
        {group.audioUrl && (
          <div
            className="flex items-center gap-3 p-3 rounded-[14px] border-2"
            style={{ background: C.blueBg, borderColor: C.blueBorder }}
          >
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center border-2 shrink-0"
              style={{ background: '#DAEEFB', borderColor: C.blueBorder, boxShadow: `0 2px 0 ${C.blueBorder}` }}
            >
              <Headphones size={15} color={C.blue} strokeWidth={2.5} />
            </div>
            <audio src={group.audioUrl} controls className="h-8 flex-1" />
          </div>
        )}

        {/* Transcript của group — ẩn mặc định, click để xem */}
        <TranscriptBlock script={group.script} defaultOpen={false} />

        {/* Đoạn văn / bài đọc (Part 6/7) */}
        <PassageBlock
          content={group.content}
          imageUrl={group.imageUrl && !group.audioUrl ? group.imageUrl : null}
          audioUrl={null}
        />

        {/* Danh sách câu hỏi con */}
        <div className="space-y-2">
          {group.subQuestions?.map((sq, idx) => {
            if (sq.isExample) return null;
            const num = globalIndexStart + validSubs.slice(0, validSubs.indexOf(sq)).length;
            const ua = answers[sq.id];
            const isCorrect = ua === sq.correct;

            return (
              <AnswerReviewCard
                key={sq.id}
                question={sq}
                questionNum={num}
                isCorrect={isCorrect}
                userAnswer={ua}
                correctAnswer={sq.correct}
                options={sq.options}
                isExpanded={expandedId === sq.id}
                onToggle={onToggle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});
GroupResultBlock.displayName = 'GroupResultBlock';

/* ─── StandaloneQuestionBlock ────────────────────────────── */
/**
 * Render câu hỏi đơn lẻ trong trang kết quả.
 * Nếu câu có script (Part 1/2), hiện TranscriptBlock bên dưới card.
 */
const StandaloneQuestionBlock = memo(({ question, globalNum, answers, expandedId, onToggle }) => {
  const ua = answers[question.id];
  const isCorrect = ua === question.correct;

  return (
    <div className="space-y-2">
      <AnswerReviewCard
        question={question}
        questionNum={globalNum}
        isCorrect={isCorrect}
        userAnswer={ua}
        correctAnswer={question.correct}
        options={question.options}
        isExpanded={expandedId === question.id}
        onToggle={onToggle}
      />
      {/* Transcript Part 1/2 — hiện sau card, ẩn mặc định */}
      <TranscriptBlock script={question.script} defaultOpen={false} />
    </div>
  );
});
StandaloneQuestionBlock.displayName = 'StandaloneQuestionBlock';

/* ════════════════════════════════════════════════════════════
   MAIN — ResultsDetailList
════════════════════════════════════════════════════════════ */
const ResultsDetailList = memo(({ filteredQuestions, answers, activeFilter, onFilterChange }) => {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const isEmpty = filteredQuestions.length === 0;

  /* ── Tính globalNum bắt đầu từ 1, đếm đúng qua group ── */
  let globalNum = 1;

  return (
    <div className="space-y-4 font-sans" style={{ fontFamily: F.body }}>

      {/* ── Sticky Header ── */}
      <div
        className="sticky top-0 z-30 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-slate-200/50 mb-2"
        style={{ background: 'rgba(244,247,250,0.92)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center border-2 border-b-[3px] shrink-0"
            style={{ background: C.blueBg, borderColor: C.blueBorder }}
          >
            <BarChart3 size={18} color={C.blue} strokeWidth={2.5} />
          </div>
          <h3
            className="font-display font-black text-[16px] sm:text-[18px] text-slate-800 uppercase tracking-wide pt-0.5"
            style={{ fontFamily: F.display }}
          >
            Chi tiết đáp án
          </h3>
        </div>
        <FilterTabs activeFilter={activeFilter} onFilterChange={onFilterChange} />
      </div>

      {/* ── Empty States ── */}
      {isEmpty ? (
        activeFilter === FILTER_TYPES.WRONG ? (
          <EmptyWrongQuestions />
        ) : (
          <EmptyAllQuestions />
        )
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((item) => {
            /* ── Group ── */
            if (item.type === 'group') {
              const validSubs = (item.subQuestions ?? []).filter((sq) => !sq.isExample);
              const startIndex = globalNum;
              globalNum += validSubs.length;

              return (
                <GroupResultBlock
                  key={item.id}
                  group={item}
                  globalIndexStart={startIndex}
                  answers={answers}
                  expandedId={expandedId}
                  onToggle={handleToggle}
                />
              );
            }

            /* ── Câu đơn lẻ ── */
            if (item.isExample) return null;
            const num = globalNum++;

            return (
              <StandaloneQuestionBlock
                key={item.id}
                question={item}
                globalNum={num}
                answers={answers}
                expandedId={expandedId}
                onToggle={handleToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
});

ResultsDetailList.displayName = 'ResultsDetailList';
export default ResultsDetailList;
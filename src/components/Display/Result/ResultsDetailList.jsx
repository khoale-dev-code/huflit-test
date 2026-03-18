// src/components/Display/Result/ResultsDetailList.jsx
import React, { memo, useState, useCallback, useMemo } from 'react';
import {
  BarChart3, SearchX, Layers, Volume2, BookOpen,
  ChevronDown, Music, Headphones, Award
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion'; // 🚀 FIX: Alias Motion
import AnswerReviewCard from './AnswerReviewCard';
import { FILTER_TYPES } from '../../../hooks/Result/useFilteredQuestions';

/* ─── ANIMATION VARIANTS ────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 300, damping: 24 } 
  }
};

/* ─── EMPTY STATES (Gamified 3D) ─────────────────────── */

const EmptyAllQuestions = () => (
  <Motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16 md:py-24 bg-white border-2 border-dashed border-slate-300 rounded-[32px] shadow-sm flex flex-col items-center"
  >
    <div className="w-16 h-16 bg-slate-100 rounded-[20px] flex items-center justify-center mb-6 border-b-[4px] border-slate-200">
      <SearchX className="w-8 h-8 text-slate-400" strokeWidth={2.5} />
    </div>
    <p className="text-[20px] font-display font-black text-slate-600 uppercase tracking-wider">Không có dữ liệu</p>
    <p className="text-[15px] font-body font-bold text-slate-400 mt-2">Bài thi này chưa có câu hỏi nào được ghi nhận.</p>
  </Motion.div>
);

const EmptyWrongQuestions = () => (
  <Motion.div 
    initial={{ scale: 0.9, opacity: 0, y: 20 }} 
    animate={{ scale: 1, opacity: 1, y: 0 }} 
    transition={{ type: "spring", bounce: 0.5, damping: 15 }}
    className="text-center py-12 md:py-20 px-6 md:px-12 bg-hub-green-bg border-2 border-hub-green-border border-b-[10px] rounded-[40px] shadow-sm flex flex-col items-center relative overflow-hidden"
  >
    <div className="absolute -top-10 -right-10 opacity-10 transform rotate-12">
      <Award className="w-[180px] h-[180px] text-hub-green" strokeWidth={3} />
    </div>
    
    <Motion.div 
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="text-[70px] leading-none mb-6 drop-shadow-md relative z-10"
    >
      🎉
    </Motion.div>
    <p className="text-hub-green font-display font-black text-[32px] leading-tight uppercase tracking-widest relative z-10">
      Tuyệt đỉnh!
    </p>
    <div className="bg-white/60 backdrop-blur-sm px-8 py-4 rounded-[20px] border-2 border-hub-green-border/50 mt-5 inline-block relative z-10 shadow-sm">
      <p className="text-hub-green-dark font-body font-bold text-[16px] md:text-[18px] m-0">
        Bạn không làm sai bất kỳ câu nào. Chúc mừng nhé!
      </p>
    </div>
  </Motion.div>
);

/* ─── FILTER TABS ────────────────────────────── */

const FilterTabs = memo(({ activeFilter, onFilterChange }) => (
  <div className="flex gap-2 p-1.5 bg-slate-100 rounded-[22px] border-2 border-slate-200/60 shadow-inner">
    <button
      onClick={() => onFilterChange(FILTER_TYPES.ALL)}
      className={`px-6 py-2.5 text-[14px] font-display font-black uppercase tracking-wider rounded-[16px] transition-all outline-none border-2 border-b-[4px] ${
        activeFilter === FILTER_TYPES.ALL
          ? 'bg-hub-blue text-white border-hub-blue-dark shadow-sm -translate-y-0.5'
          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 active:border-b-2 active:translate-y-1'
      }`}
    >
      Tất cả
    </button>
    <button
      onClick={() => onFilterChange(FILTER_TYPES.WRONG)}
      className={`px-6 py-2.5 text-[14px] font-display font-black uppercase tracking-wider rounded-[16px] transition-all outline-none border-2 border-b-[4px] ${
        activeFilter === FILTER_TYPES.WRONG
          ? 'bg-hub-red text-white border-hub-red-dark shadow-sm -translate-y-0.5'
          : 'bg-white border-slate-200 text-slate-500 hover:bg-hub-red-bg hover:text-hub-red active:border-b-2 active:translate-y-1'
      }`}
    >
      Câu sai
    </button>
  </div>
));
FilterTabs.displayName = 'FilterTabs';

/* ─── TRANSCRIPT BLOCK ──────────────────────────────────────────── */
const TranscriptBlock = memo(({ script, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  if (!script) return null;

  return (
    <div className="rounded-[20px] border-2 border-hub-blue-border bg-hub-blue-bg overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 outline-none transition-colors hover:bg-white/40"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#DAEEFB] border-2 border-hub-blue-border border-b-[3px] flex items-center justify-center shrink-0 shadow-sm">
            <Volume2 className="w-5 h-5 text-hub-blue" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-display font-black uppercase tracking-wider pt-1 text-hub-blue">
            Nội dung bài nghe
          </span>
        </div>
        <div className={`w-9 h-9 rounded-full bg-[#DAEEFB] flex items-center justify-center transition-transform duration-300 shadow-sm border border-hub-blue-border/50 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-hub-blue" strokeWidth={3} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t-2 border-dashed border-hub-blue-border/80">
              <p className="text-[15px] md:text-[16px] font-body font-bold italic leading-relaxed text-slate-600 m-0 bg-white/50 p-4 rounded-xl">
                "{script}"
              </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
TranscriptBlock.displayName = 'TranscriptBlock';

/* ─── PASSAGE BLOCK ─────────────────────────────────────────────── */
const PassageBlock = memo(({ content, imageUrl, audioUrl }) => {
  if (!content && !imageUrl && !audioUrl) return null;

  return (
    <div className="rounded-[24px] border-2 border-hub-purple-border bg-hub-purple-bg overflow-hidden mb-6 shadow-sm">
      <div className="px-6 py-4 border-b-2 border-hub-purple-border/60 bg-white flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-hub-purple-dark" strokeWidth={2.5} />
        <span className="text-[13px] font-display font-black uppercase tracking-wider text-hub-purple-dark pt-1">
          Nội dung ngữ cảnh
        </span>
      </div>
      <div className="p-5 space-y-5">
        {imageUrl && (
          <div className="bg-white p-2 rounded-[18px] border-2 border-hub-purple-border/50 inline-block shadow-sm">
            <img src={imageUrl} alt="Context" className="max-w-full max-h-[400px] object-contain rounded-[12px]" />
          </div>
        )}
        {audioUrl && (
          <div className="flex items-center gap-4 p-3 rounded-[18px] border-2 border-hub-blue-border bg-hub-blue-bg shadow-sm">
            <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center border-2 border-hub-blue-border border-b-[4px] text-hub-blue shrink-0">
              <Music className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <audio src={audioUrl} controls className="h-10 flex-1 outline-none" />
          </div>
        )}
        {content && (
          <p className="text-[16px] font-body font-bold leading-relaxed text-slate-700 m-0 whitespace-pre-wrap bg-white/70 p-5 rounded-[20px] border border-hub-purple-border/30">
            {content}
          </p>
        )}
      </div>
    </div>
  );
});
PassageBlock.displayName = 'PassageBlock';

/* ─── GROUP RESULT BLOCK ────────────────────────────────────────── */
const GroupResultBlock = memo((props) => {
  const { group, globalIndexStart, answers, expandedId, onToggle } = props;
  const validSubs = useMemo(() => (group.subQuestions ?? []).filter((sq) => !sq.isExample), [group.subQuestions]);
  const labelTo = globalIndexStart + validSubs.length - 1;

  return (
    <Motion.div variants={itemVariants} className="rounded-[32px] border-2 border-hub-purple-border border-b-[8px] bg-hub-purple-bg overflow-hidden shadow-sm">
      <div className="px-6 py-5 flex items-center gap-4 border-b-2 border-hub-purple-border bg-white">
        <div className="w-12 h-12 rounded-[14px] bg-hub-purple-bg border-2 border-hub-purple-border border-b-[4px] flex items-center justify-center shrink-0 shadow-sm">
          <Layers className="w-6 h-6 text-hub-purple-dark" strokeWidth={2.5} />
        </div>
        <div>
          <span className="text-[16px] font-display font-black uppercase tracking-wider text-hub-purple-dark block leading-none mb-1">
            Nhóm câu hỏi
          </span>
          <span className="text-[13px] font-body font-bold text-slate-500">
            Câu {globalIndexStart} – {labelTo}
          </span>
        </div>
      </div>

      <div className="p-5 md:p-8 space-y-6 bg-white/40">
        {group.audioUrl && (
          <div className="flex items-center gap-4 p-3 rounded-[20px] border-2 border-hub-blue-border bg-hub-blue-bg shadow-sm">
            <div className="w-12 h-12 rounded-[14px] bg-[#DAEEFB] border-2 border-hub-blue-border border-b-[4px] flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-hub-blue" strokeWidth={2.5} />
            </div>
            <audio src={group.audioUrl} controls className="h-10 flex-1 outline-none" />
          </div>
        )}

        <TranscriptBlock script={group.script} />

        <PassageBlock
          content={group.content}
          imageUrl={group.imageUrl && !group.audioUrl ? group.imageUrl : null}
        />

        <div className="space-y-6 pt-4 border-t-2 border-hub-purple-border/30">
          {group.subQuestions?.map((sq) => {
            if (sq.isExample) return null;
            // 🚀 FIX: Tính số thứ tự chuẩn cho Group Question
            const relativeIdx = validSubs.indexOf(sq);
            const num = globalIndexStart + relativeIdx;
            const ua = answers[sq.id];

            return (
              <AnswerReviewCard
                key={sq.id}
                question={sq}
                questionNum={num}
                isCorrect={ua === sq.correct}
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
    </Motion.div>
  );
});
GroupResultBlock.displayName = 'GroupResultBlock';

/* ─── STANDALONE QUESTION BLOCK ─────────────────────────────────── */
const StandaloneQuestionBlock = memo(({ question, globalNum, answers, expandedId, onToggle }) => {
  const ua = answers[question.id];

  return (
    <Motion.div variants={itemVariants} className="space-y-4">
      <AnswerReviewCard
        question={question}
        questionNum={globalNum}
        isCorrect={ua === question.correct}
        userAnswer={ua}
        correctAnswer={question.correct}
        options={question.options}
        isExpanded={expandedId === question.id}
        onToggle={onToggle}
      />
      <TranscriptBlock script={question.script} />
    </Motion.div>
  );
});
StandaloneQuestionBlock.displayName = 'StandaloneQuestionBlock';

/* ════════════════════════════════════════════════════════════
   MAIN — ResultsDetailList
════════════════════════════════════════════════════════════ */
const ResultsDetailList = memo((props) => {
  const { filteredQuestions, answers, activeFilter, onFilterChange } = props;
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const isEmpty = filteredQuestions.length === 0;

  // Biến đếm số câu hỏi gốc (globalIndex)
  let globalNum = 1;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">

      {/* STICKY HEADER & TABS */}
      <div className="sticky top-0 z-30 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b-2 border-slate-200/50 bg-white/90 backdrop-blur-md -mx-4 px-4 sm:mx-0 sm:px-0 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-[16px] md:rounded-[22px] bg-hub-blue-bg border-2 border-hub-blue-border border-b-[5px] flex items-center justify-center shrink-0 shadow-sm">
            <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-hub-blue" strokeWidth={2.5} />
          </div>
          <h3 className="font-display font-black text-[20px] md:text-[28px] text-slate-800 uppercase tracking-wider pt-1">
            Chi tiết đáp án
          </h3>
        </div>
        <FilterTabs activeFilter={activeFilter} onFilterChange={onFilterChange} />
      </div>

      {/* CONTENT LIST */}
      {isEmpty ? (
        activeFilter === FILTER_TYPES.WRONG ? (
          <EmptyWrongQuestions />
        ) : (
          <EmptyAllQuestions />
        )
      ) : (
        <Motion.div 
          className="space-y-8 md:space-y-12 pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredQuestions.map((item) => {
            
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
        </Motion.div>
      )}
    </div>
  );
});

ResultsDetailList.displayName = 'ResultsDetailList';

export default ResultsDetailList;
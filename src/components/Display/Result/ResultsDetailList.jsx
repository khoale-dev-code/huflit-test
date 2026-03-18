// src/components/Display/Result/ResultsDetailList.jsx
import { memo, useState, useCallback } from 'react';
import {
  BarChart3, SearchX, Layers, Volume2, BookOpen,
  ChevronDown, Music, Headphones, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnswerReviewCard from './AnswerReviewCard';
import { FILTER_TYPES } from '../../../hooks/Result/useFilteredQuestions';

/* ─── ANIMATION VARIANTS ────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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

/* ─── EMPTY STATES (Responsive Gamified 3D) ─────────────────────── */

const EmptyAllQuestions = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16 md:py-24 bg-white border-2 border-dashed border-slate-300 rounded-[28px] md:rounded-[32px] shadow-sm flex flex-col items-center"
  >
    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-[16px] md:rounded-[20px] flex items-center justify-center mb-4 md:mb-6 border-b-[4px] border-slate-200">
      <SearchX className="w-8 h-8 md:w-10 md:h-10 text-slate-400" strokeWidth={2.5} />
    </div>
    <p className="text-[18px] md:text-[22px] font-display font-black text-slate-600 uppercase tracking-wider">Không có dữ liệu</p>
    <p className="text-[14px] md:text-[16px] font-body font-bold text-slate-400 mt-1 md:mt-2">Bài thi này chưa có câu hỏi nào được ghi nhận.</p>
  </motion.div>
);

const EmptyWrongQuestions = () => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0, y: 20 }} 
    animate={{ scale: 1, opacity: 1, y: 0 }} 
    transition={{ type: "spring", bounce: 0.5, damping: 15 }}
    className="text-center py-12 md:py-20 px-6 md:px-12 bg-hub-green-bg border-2 border-hub-green-border border-b-[8px] md:border-b-[12px] rounded-[32px] md:rounded-[40px] shadow-sm flex flex-col items-center relative overflow-hidden"
  >
    {/* Background decoration */}
    <div className="absolute -top-10 -right-10 md:-top-16 md:-right-16 opacity-20 transform rotate-12">
      <Award className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] text-hub-green" strokeWidth={3} />
    </div>
    
    <motion.div 
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="text-[60px] md:text-[80px] leading-none mb-4 md:mb-6 drop-shadow-md relative z-10"
    >
      🎉
    </motion.div>
    <p className="text-hub-green font-display font-black text-[24px] sm:text-[28px] md:text-[36px] leading-tight uppercase tracking-widest relative z-10">
      Tuyệt đỉnh!
    </p>
    <div className="bg-white/60 backdrop-blur-sm px-5 py-2.5 md:px-8 md:py-4 rounded-[16px] md:rounded-[20px] border-2 border-hub-green-border/50 mt-3 md:mt-5 inline-block relative z-10 shadow-sm">
      <p className="text-hub-green-dark font-body font-bold text-[14px] sm:text-[15px] md:text-[18px] m-0">
        Bạn không làm sai bất kỳ câu nào. Chúc mừng nhé!
      </p>
    </div>
  </motion.div>
);

/* ─── FILTER TABS (Responsive Pills) ────────────────────────────── */

const FilterTabs = memo(({ activeFilter, onFilterChange }) => (
  <div className="flex gap-2 p-1.5 md:p-2 bg-slate-100 rounded-[20px] md:rounded-[24px] border-2 border-slate-200/60 shrink-0 w-full sm:w-auto shadow-inner">
    <button
      onClick={() => onFilterChange(FILTER_TYPES.ALL)}
      className={`flex-1 sm:flex-none px-5 py-2.5 md:px-8 md:py-3 text-[13px] md:text-[15px] font-display font-black uppercase tracking-wider rounded-[14px] md:rounded-[18px] transition-all outline-none border-2 border-b-[4px] ${
        activeFilter === FILTER_TYPES.ALL
          ? 'bg-hub-blue text-white border-hub-blue-dark shadow-sm translate-y-[-2px]'
          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 active:border-b-[2px] active:translate-y-[2px]'
      }`}
    >
      Tất cả
    </button>
    <button
      onClick={() => onFilterChange(FILTER_TYPES.WRONG)}
      className={`flex-1 sm:flex-none px-5 py-2.5 md:px-8 md:py-3 text-[13px] md:text-[15px] font-display font-black uppercase tracking-wider rounded-[14px] md:rounded-[18px] transition-all outline-none border-2 border-b-[4px] ${
        activeFilter === FILTER_TYPES.WRONG
          ? 'bg-hub-red text-white border-hub-red-dark shadow-sm translate-y-[-2px]'
          : 'bg-white border-slate-200 text-slate-500 hover:bg-hub-red-bg hover:text-hub-red active:border-b-[2px] active:translate-y-[2px]'
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
    <div className="rounded-[16px] md:rounded-[20px] border-2 border-hub-blue-border bg-hub-blue-bg overflow-hidden transition-all">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-4 outline-none transition-colors hover:bg-white/40"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-[10px] md:rounded-[12px] bg-[#DAEEFB] border-2 border-hub-blue-border border-b-[3px] flex items-center justify-center shrink-0 shadow-sm">
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-hub-blue" strokeWidth={2.5} />
          </div>
          <span className="text-[12px] md:text-[14px] font-display font-black uppercase tracking-wider pt-0.5 text-hub-blue">
            Nội dung bài nghe
          </span>
        </div>
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#DAEEFB] flex items-center justify-center transition-transform duration-300 shadow-sm border border-hub-blue-border/50 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-hub-blue" strokeWidth={3} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-3 md:px-7 md:pb-7 md:pt-4 border-t-2 border-dashed border-hub-blue-border/80">
              <p className="text-[14px] md:text-[16px] font-body font-bold italic leading-relaxed text-slate-600 m-0">
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

/* ─── PASSAGE BLOCK ─────────────────────────────────────────────── */
const PassageBlock = memo(({ content, imageUrl, audioUrl }) => {
  if (!content && !imageUrl && !audioUrl) return null;

  return (
    <div className="rounded-[16px] md:rounded-[20px] border-2 border-hub-purple-border bg-hub-purple-bg overflow-hidden mb-4 shadow-sm">
      <div className="px-4 py-3 md:px-6 md:py-4 border-b-2 border-hub-purple-border/60 bg-white/50 flex items-center gap-2 md:gap-3">
        <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-hub-purple-dark" strokeWidth={2.5} />
        <span className="text-[12px] md:text-[14px] font-display font-black uppercase tracking-wider text-hub-purple-dark">
          Nội dung bài đọc / Ngữ cảnh
        </span>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-5">
        {imageUrl && (
          <div className="bg-white p-2 md:p-3 rounded-[16px] border-2 border-hub-purple-border/50 inline-block shadow-sm">
            <img src={imageUrl} alt="Passage" className="max-w-full max-h-[300px] md:max-h-[400px] object-contain rounded-[10px]" />
          </div>
        )}
        {audioUrl && (
          <div className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-[16px] border-2 border-hub-blue-border bg-hub-blue-bg shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-[12px] flex items-center justify-center border border-hub-blue-border text-hub-blue shrink-0">
              <Music className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
            </div>
            <audio src={audioUrl} controls className="h-10 md:h-12 flex-1 outline-none" />
          </div>
        )}
        {content && (
          <p className="text-[15px] md:text-[17px] font-body font-bold leading-relaxed text-slate-700 m-0 whitespace-pre-wrap bg-white/60 p-4 md:p-6 rounded-[16px] md:rounded-[20px] border border-hub-purple-border/30">
            {content}
          </p>
        )}
      </div>
    </div>
  );
});
PassageBlock.displayName = 'PassageBlock';

/* ─── GROUP RESULT BLOCK ────────────────────────────────────────── */
const GroupResultBlock = memo(({ group, globalIndexStart, answers, expandedId, onToggle }) => {
  const validSubs = (group.subQuestions ?? []).filter((sq) => !sq.isExample);
  const labelTo = globalIndexStart + validSubs.length - 1;

  return (
    <motion.div variants={itemVariants} className="rounded-[24px] md:rounded-[32px] border-2 border-hub-purple-border border-b-[6px] md:border-b-[8px] bg-hub-purple-bg overflow-hidden shadow-sm">
      {/* Group Header */}
      <div className="px-5 py-4 md:px-6 md:py-5 flex items-center gap-3 md:gap-4 border-b-2 border-hub-purple-border bg-white">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-[12px] md:rounded-[14px] bg-hub-purple-bg border-2 border-hub-purple-border border-b-[3px] flex items-center justify-center shrink-0 shadow-sm">
          <Layers className="w-[18px] h-[18px] md:w-6 md:h-6 text-hub-purple-dark" strokeWidth={2.5} />
        </div>
        <div>
          <span className="text-[14px] md:text-[17px] font-display font-black uppercase tracking-wider text-hub-purple-dark block leading-none mb-1">
            Nhóm câu hỏi
          </span>
          <span className="text-[12px] md:text-[14px] font-body font-bold text-slate-500">
            Câu {globalIndexStart} – {labelTo}
          </span>
        </div>
      </div>

      {/* Group Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white/40">
        {/* Audio (Part 3/4) */}
        {group.audioUrl && (
          <div className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-[16px] border-2 border-hub-blue-border bg-hub-blue-bg shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-[12px] bg-[#DAEEFB] border-2 border-hub-blue-border border-b-[3px] flex items-center justify-center shrink-0">
              <Headphones className="w-[18px] h-[18px] md:w-5 md:h-5 text-hub-blue" strokeWidth={2.5} />
            </div>
            <audio src={group.audioUrl} controls className="h-10 md:h-12 flex-1 outline-none" />
          </div>
        )}

        {/* Transcript (Part 3/4) */}
        <TranscriptBlock script={group.script} defaultOpen={false} />

        {/* Passage (Part 6/7) */}
        <PassageBlock
          content={group.content}
          imageUrl={group.imageUrl && !group.audioUrl ? group.imageUrl : null}
          audioUrl={null}
        />

        {/* Sub-questions List */}
        <div className="space-y-4 md:space-y-5 pt-2 md:pt-4">
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
    </motion.div>
  );
});
GroupResultBlock.displayName = 'GroupResultBlock';

/* ─── STANDALONE QUESTION BLOCK ─────────────────────────────────── */
const StandaloneQuestionBlock = memo(({ question, globalNum, answers, expandedId, onToggle }) => {
  const ua = answers[question.id];
  const isCorrect = ua === question.correct;

  return (
    <motion.div variants={itemVariants} className="space-y-3 md:space-y-4">
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
      <TranscriptBlock script={question.script} defaultOpen={false} />
    </motion.div>
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

  /* Logic tính globalNum bắt đầu từ 1, đếm đúng qua group (KHÔNG THAY ĐỔI) */
  let globalNum = 1;

  return (
    // Bọc toàn bộ trong max-w-5xl để Desktop không bị bè ra hai bên
    <div className="w-full max-w-5xl mx-auto space-y-6 md:space-y-8">

      {/* ── STICKY HEADER & TABS ── */}
      <div className="sticky top-0 z-30 py-4 md:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-200/50 bg-white/80 backdrop-blur-md -mx-4 px-4 sm:mx-0 sm:px-0 transition-all">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-[12px] md:rounded-[16px] bg-hub-blue-bg border-2 border-hub-blue-border border-b-[3px] md:border-b-[4px] flex items-center justify-center shrink-0 shadow-sm">
            <BarChart3 className="w-5 h-5 md:w-7 md:h-7 text-hub-blue" strokeWidth={2.5} />
          </div>
          <h3 className="font-display font-black text-[18px] sm:text-[20px] md:text-[26px] text-slate-800 uppercase tracking-wider pt-0.5">
            Chi tiết đáp án
          </h3>
        </div>
        <FilterTabs activeFilter={activeFilter} onFilterChange={onFilterChange} />
      </div>

      {/* ── NỘI DUNG CHÍNH (LIST HOẶC EMPTY STATE) ── */}
      {isEmpty ? (
        activeFilter === FILTER_TYPES.WRONG ? (
          <EmptyWrongQuestions />
        ) : (
          <EmptyAllQuestions />
        )
      ) : (
        <motion.div 
          className="space-y-6 md:space-y-8 pb-12 md:pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredQuestions.map((item) => {
            
            /* ── GROUP (Phần đọc đoạn văn / nghe đoạn hội thoại) ── */
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

            /* ── SINGLE QUESTION (Câu hỏi rời) ── */
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
        </motion.div>
      )}
    </div>
  );
});

ResultsDetailList.displayName = 'ResultsDetailList';
export default ResultsDetailList;
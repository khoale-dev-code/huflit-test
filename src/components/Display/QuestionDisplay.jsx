import { memo, useState, useRef, useCallback, useMemo } from 'react';
import {
  CheckCircle, AlertCircle, Volume2, Check,
  Sparkles, ChevronDown, Send, Image as ImageIcon,
  FileText, Star, Pin, Lock
} from 'lucide-react';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';
import ConfirmModal from './ConfirmModal';
import { MiniAudioPlayer } from './MiniAudioPlayer';

/* ─── Design tokens ─────────────────────────────────────── */
const C = {
  blue: '#1CB0F6', blueDark: '#1899D6', blueBg: '#EAF6FE', blueBorder: '#BAE3FB',
  green: '#58CC02', greenDark: '#46A302', greenBg: '#F0FAE8',
  yellow: '#FFC200', yellowDark: '#D9A600', yellowBg: '#FFFBEA', yellowBorder: '#FFD8A8',
  purple: '#CE82FF', purpleDark: '#B975E5', purpleBg: '#F8EEFF', purpleBorder: '#eec9ff',
  n50: '#F8FAFC', n100: '#F1F5F9', n200: '#E2E8F0',
  n400: '#94A3B8', n500: '#64748B', n600: '#475569', n700: '#334155', n800: '#1E293B',
  white: '#FFFFFF', red: '#FF4B4B',
};
const F = { body: '"Nunito", "Baloo 2", sans-serif', display: '"Baloo 2", "Nunito", sans-serif' };

/* ─── ProgressBar ────────────────────────────────────────── */
const ProgressBar = memo(({ percentage }) => (
  <div
    className="h-2.5 w-full rounded-full overflow-hidden border-[1.5px]"
    style={{ background: C.n200, borderColor: C.n200 }}
  >
    <div
      className="h-full rounded-full relative overflow-hidden transition-all duration-700 ease-out"
      style={{
        width: `${percentage}%`,
        background: percentage === 100 ? C.green : C.blue,
      }}
    >
      <div
        className="absolute top-0.5 left-1 right-1 h-[3px] rounded-full"
        style={{ background: 'rgba(255,255,255,0.35)' }}
      />
    </div>
  </div>
));

/* ─── Script Display (Khối hiển thị Lời thoại) ─────────── */
const ScriptDisplay = memo(({ script, isReviewMode }) => {
  const [open, setOpen] = useState(false);
  if (!script) return null;

  return (
    <div className="mb-4 rounded-[20px] border-2 overflow-hidden transition-all shadow-sm" style={{ background: C.blueBg, borderColor: C.blueBorder }}>
      <button 
        onClick={() => isReviewMode ? setOpen(o => !o) : null} 
        className={`w-full flex items-center justify-between px-4 py-3 bg-transparent border-none outline-none transition-colors ${isReviewMode ? 'cursor-pointer hover:bg-white/40' : 'cursor-not-allowed opacity-80'}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[12px] border-2 flex items-center justify-center shrink-0" style={{ background: '#DAEEFB', borderColor: C.blueBorder, boxShadow: `0 3px 0 ${C.blueBorder}` }}>
            {isReviewMode ? <Volume2 size={18} color={C.blue} strokeWidth={2.5} /> : <Lock size={16} color={C.blue} strokeWidth={2.5} />}
          </div>
          <span className="text-[12px] font-black uppercase tracking-wider pt-0.5" style={{ fontFamily: F.display, color: C.blue }}>
            {isReviewMode ? 'Nội dung âm thanh (Transcript)' : 'Transcript (Đã khóa lúc làm bài)'}
          </span>
        </div>
        {isReviewMode && (
          <div className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300" style={{ background: '#DAEEFB', transform: open ? 'rotate(180deg)' : 'none' }}>
            <ChevronDown size={18} color={C.blue} strokeWidth={3} />
          </div>
        )}
      </button>
      {open && isReviewMode && (
        <div className="px-5 pb-4 pt-2 border-t-2 border-dashed" style={{ borderColor: C.blueBorder }}>
          <p className="text-[15px] font-bold italic leading-relaxed m-0 text-slate-600">"{script}"</p>
        </div>
      )}
    </div>
  );
});

/* ─── Question Option ────────────────────────────────────── */
const QuestionOption = memo(({ option, index, isSelected, onSelect, questionId, disabled, isCorrectExample }) => {
  const label = String.fromCharCode(65 + index);
  const isExampleState = disabled && isCorrectExample;
  const isActuallySelected = isSelected || isExampleState;

  return (
    <label
      className={`block mb-2 last:mb-0 ${disabled ? 'cursor-default' : 'cursor-pointer'} ${disabled && !isCorrectExample ? 'opacity-60' : 'opacity-100'}`}
    >
      <input
        type="radio"
        className="hidden"
        name={`q-${questionId}`}
        checked={isActuallySelected}
        onChange={onSelect}
        disabled={disabled}
      />
      <div
        className="flex items-center gap-3.5 px-4 py-3 rounded-[18px] border-2 transition-all duration-150 active:translate-y-1"
        style={{
          borderColor: isActuallySelected
            ? (isExampleState ? C.yellow : C.blue)
            : C.n200,
          boxShadow: `0 ${isActuallySelected ? 2 : 4}px 0 ${isActuallySelected
            ? (isExampleState ? C.yellowDark + '60' : C.blueDark + '60')
            : C.n200}`,
          background: isActuallySelected
            ? (isExampleState ? C.yellowBg : C.blueBg)
            : C.white,
          transform: isActuallySelected ? 'translateY(-2px)' : 'none',
        }}
      >
        <div
          className="w-9 h-9 rounded-[12px] shrink-0 flex items-center justify-center text-[14px] font-black border-2 transition-colors"
          style={{
            fontFamily: F.display,
            background: isActuallySelected
              ? (isExampleState ? C.yellow : C.blue)
              : C.n100,
            color: isActuallySelected ? C.white : C.n400,
            borderColor: isActuallySelected
              ? (isExampleState ? C.yellowDark : C.blueDark)
              : C.n200,
          }}
        >
          {isActuallySelected ? <Check size={16} strokeWidth={4} /> : label}
        </div>
        <span
          className="flex-1 text-[15px] leading-snug font-bold"
          style={{ color: isActuallySelected ? (isExampleState ? C.yellowDark : C.blueDark) : C.n600 }}
        >
          {option}
        </span>
      </div>
    </label>
  );
});

/* ─── Question Card ──────────────────────────────────────── */
const QuestionCard = memo(({ question, globalIndex, options, selectedAnswer, onAnswerSelect, isReviewMode }) => {
  const isExample = question.isExample;

  return (
    <article
      className="p-5 mb-5 rounded-[28px] border-2 border-b-[6px] shadow-sm overflow-hidden"
      style={{
        background: isExample ? C.yellowBg : C.white,
        borderColor: isExample ? C.yellowBorder : C.n200,
        borderBottomColor: isExample ? C.yellow : C.n200,
      }}
    >
      {/* Audio riêng trên câu đơn lẻ (Part 1, 2) */}
      {question.audioUrl && (
        <div className="mb-4">
          <MiniAudioPlayer audioUrl={question.audioUrl} />
        </div>
      )}

      {/* 🚀 HIỂN THỊ TRANSCRIPT CỦA CÂU LẺ Ở ĐÂY (VÍ DỤ PART 1, 2) */}
      {(isReviewMode || isExample) && question.script && (
        <ScriptDisplay script={question.script} isReviewMode={isReviewMode || isExample} />
      )}

      {question.imageUrl && (
        <div
          className="mb-5 p-2 rounded-[20px] border-2 flex justify-center items-center bg-white"
          style={{ borderColor: isExample ? '#FFD8A8' : C.n200 }}
        >
          <img
            src={question.imageUrl}
            alt="Minh hoạ"
            loading="lazy"
            className="max-w-full max-h-[300px] object-contain rounded-xl"
          />
        </div>
      )}

      {isExample && (
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] mb-4"
          style={{ background: '#FF960020', border: '1px solid #FF960040' }}
        >
          <Star size={14} color="#FF9600" strokeWidth={3} fill="#FF9600" />
          <span className="text-[11px] font-black uppercase tracking-wider text-[#FF9600]">
            Câu Ví Dụ
          </span>
        </div>
      )}

      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-[38px] h-[38px] rounded-[13px] shrink-0 flex items-center justify-center border-2"
          style={{
            background: isExample ? '#FF9600' : C.blue,
            borderColor: isExample ? '#E58700' : C.blueDark,
            boxShadow: `0 3px 0 ${isExample ? '#E58700' : C.blueDark}`,
          }}
        >
          <span className="text-[14px] font-black text-white" style={{ fontFamily: F.display }}>
            {isExample ? 'VD' : globalIndex}
          </span>
        </div>
        <h3 className="text-[16px] font-black m-0 leading-relaxed pt-1.5 text-slate-800">
          {question.question || (
            <span className="italic opacity-50">Chọn đáp án đúng theo Audio / Hình ảnh</span>
          )}
        </h3>
      </div>

      <div className="flex flex-col gap-1">
        {options?.map((opt, i) => (
          <QuestionOption
            key={`${question.id}-${i}`}
            index={i}
            option={opt}
            isSelected={selectedAnswer === i}
            onSelect={() => !isExample && !isReviewMode && onAnswerSelect(question.id, i)}
            questionId={question.id}
            disabled={isExample || isReviewMode}
            isCorrectExample={isExample && question.correct === i}
          />
        ))}
      </div>
    </article>
  );
});

/* ─── Group Audio Banner (Sticky) ───────────────────────── */
const GroupAudioBanner = memo(({ audioUrl, labelFrom, labelTo }) => {
  if (!audioUrl) return null;

  return (
    <div
      className="sticky z-10 -mx-4 px-4 py-3 mb-5"
      style={{
        top: 64,
        background: 'rgba(248, 238, 255, 0.97)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `2px solid ${C.purpleBorder}`,
        borderTop: `2px solid ${C.purpleBorder}`,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[8px]"
          style={{ background: C.purpleBg, border: `1.5px solid ${C.purpleBorder}` }}
        >
          <Pin size={11} color={C.purple} strokeWidth={3} />
          <span
            className="text-[10px] font-black uppercase tracking-widest"
            style={{ color: C.purple, fontFamily: F.display }}
          >
            Audio dùng cho câu {labelFrom}–{labelTo}
          </span>
        </div>
      </div>
      <MiniAudioPlayer audioUrl={audioUrl} />
    </div>
  );
});

/* ─── Question Group Card ────────────────────────────────── */
const QuestionGroupCard = memo(({ group, globalIndexStart, answers, onAnswerSelect, isReviewMode }) => {
  const validSubCount = useMemo(
    () => group.subQuestions?.filter(q => !q.isExample).length || 0,
    [group.subQuestions]
  );
  const labelTo = globalIndexStart + validSubCount - 1;

  return (
    <div className="mb-8">
      {/* ── Khung bối cảnh (Passage / Đoạn văn) ── */}
      <div
        className="p-6 mb-1 rounded-[28px] border-2 border-b-[6px] shadow-sm"
        style={{ background: C.purpleBg, borderColor: C.purpleBorder }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-[12px] bg-white border-2 flex items-center justify-center shadow-sm"
            style={{ borderColor: C.purpleBorder }}
          >
            <FileText size={20} color={C.purpleDark} strokeWidth={2.5} />
          </div>
          <span
            className="text-[14px] font-black uppercase tracking-wider"
            style={{ color: C.purpleDark, fontFamily: F.display }}
          >
            Dùng cho câu {globalIndexStart}–{labelTo}
          </span>
        </div>

        {/* 🚀 HIỂN THỊ TRANSCRIPT CỦA GROUP Ở ĐÂY (VÍ DỤ PART 3, 4) */}
        {group.script && (
          <ScriptDisplay script={group.script} isReviewMode={isReviewMode} />
        )}

        {group.imageUrl && (
          <img
            src={group.imageUrl}
            alt="Passage"
            className="max-w-full max-h-[450px] rounded-2xl border-2 object-contain bg-white p-1 mb-4 shadow-inner"
            style={{ borderColor: C.purpleBorder }}
          />
        )}

        {group.content && (
          <div
            className="p-5 bg-white rounded-[20px] border-2 shadow-inner"
            style={{ borderColor: C.purpleBorder }}
          >
            <p className="text-[16px] font-bold leading-relaxed m-0 text-slate-700 whitespace-pre-wrap">
              {group.content}
            </p>
          </div>
        )}
      </div>

      {/* ── Câu hỏi con ── */}
      <div
        className="pl-3 md:pl-6 border-l-[4px] border-dashed"
        style={{ borderColor: C.purpleBorder }}
      >
        <GroupAudioBanner
          audioUrl={group.audioUrl}
          labelFrom={globalIndexStart}
          labelTo={labelTo}
        />

        {group.subQuestions?.map((sq, idx) => {
          const currentGlobalIndex =
            globalIndexStart +
            group.subQuestions.slice(0, idx).filter(q => !q.isExample).length;

          return (
            <QuestionCard
              key={sq.id}
              globalIndex={currentGlobalIndex}
              question={sq}
              options={sq.options}
              selectedAnswer={answers[sq.id]}
              onAnswerSelect={onAnswerSelect}
              isReviewMode={isReviewMode}
            />
          );
        })}
      </div>
    </div>
  );
});

/* ─── Submit Card ────────────────────────────────────────── */
const SubmitCard = ({ isAllAnswered, answersCount, totalQuestions, isSignedIn, onSubmit }) => (
  <div
    className="mt-6 p-6 rounded-[28px] border-2 border-b-[6px] flex flex-col gap-4 shadow-lg transition-all"
    style={{
      borderColor: isAllAnswered ? C.green : C.n200,
      borderBottomColor: isAllAnswered ? C.greenDark : C.n200,
      background: isAllAnswered ? C.greenBg : C.white,
    }}
  >
    <div className="flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-[16px] shrink-0 flex items-center justify-center border-2"
        style={{
          background: isAllAnswered ? C.green : C.n100,
          borderColor: isAllAnswered ? C.greenDark : C.n200,
          boxShadow: `0 4px 0 ${isAllAnswered ? C.greenDark : C.n200}`,
        }}
      >
        {isAllAnswered
          ? <CheckCircle size={24} color="#fff" strokeWidth={2.5} />
          : <AlertCircle size={24} color={C.n400} strokeWidth={2.5} />}
      </div>
      <div>
        <p className="text-[17px] font-black m-0 text-slate-800">
          {isAllAnswered ? 'Sẵn sàng nộp bài!' : 'Tiếp tục cố gắng!'}
        </p>
        <p className="text-[13px] font-bold mt-1 mb-0 text-slate-500">
          {isAllAnswered
            ? 'Kiểm tra lại một lần nữa trước khi nộp nhé.'
            : `Bạn vẫn còn ${totalQuestions - answersCount} câu hỏi chưa trả lời.`}
        </p>
      </div>
    </div>
    <button
      onClick={onSubmit}
      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-[20px] text-[16px] font-black uppercase tracking-widest text-white cursor-pointer transition-all active:translate-y-1 active:shadow-none"
      style={{
        background: isAllAnswered ? C.green : C.blue,
        boxShadow: `0 5px 0 ${isAllAnswered ? C.greenDark : C.blueDark}`,
        fontFamily: F.display,
      }}
    >
      <Send size={18} strokeWidth={3} />
      {isSignedIn ? 'Nộp bài & Lưu kết quả' : 'Nộp bài ngay'}
    </button>
  </div>
);

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT — QuestionDisplay
════════════════════════════════════════════════════════════ */
const QuestionDisplay = memo(({ selectedPart, selectedExam, partData, answers, onAnswerSelect, showResults, onSubmit }) => {
  const { isSignedIn } = useUnifiedAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);

  /* ── Tính tổng câu hỏi hợp lệ (không tính câu ví dụ) ── */
  const allValidQuestions = useMemo(() => {
    let questions = [];
    partData?.questions?.forEach(q => {
      if (q.type === 'group') {
        const validSubQs = q.subQuestions?.filter(sq => !sq.isExample) || [];
        questions = [...questions, ...validSubQs];
      } else if (!q.isExample) {
        questions.push(q);
      }
    });
    return questions;
  }, [partData]);

  /* ── Đếm số câu đã trả lời ── */
  const answersCount = useMemo(() => {
    let count = 0;
    allValidQuestions.forEach(q => {
      if (answers[q.id] !== undefined && answers[q.id] !== null) count++;
    });
    return count;
  }, [answers, allValidQuestions]);

  const totalQuestions = allValidQuestions.length;
  const percentage = totalQuestions > 0 ? Math.round((answersCount / totalQuestions) * 100) : 0;
  const isAllAnswered = answersCount === totalQuestions && totalQuestions > 0;

  const handleSubmit = useCallback(() => {
    if (!isAllAnswered) {
      setConfirmOpen(true);
      return;
    }
    onSubmit();
  }, [isAllAnswered, onSubmit]);

  if (!partData?.questions || showResults) return null;

  /* ── Render danh sách câu hỏi với globalIndex tự tăng ── */
  let globalQIndex = 1;
  const isReviewMode = false; // Ở trang này luôn là false vì đây là trang làm bài. Nếu bạn tái sử dụng trang này cho kết quả thì đổi thành = showResults.

  return (
    <div
      className="relative z-0 min-h-screen pb-24"
      style={{ background: C.n50, isolation: 'isolate' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800;900&family=Nunito:wght@600;700;800;900&display=swap');
        @keyframes bounceIn {
          0%  { transform: scale(0.9); opacity: 0; }
          100%{ transform: scale(1);   opacity: 1; }
        }
        .bounce-in { animation: bounceIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275) both; }
      `}</style>

      {/* ══ STICKY HEADER (z-20, nằm dưới Navbar chính z-50) ══ */}
      <header
        className="sticky top-0 z-20 px-4 py-3 border-b-2 shadow-md bg-white/95 backdrop-blur-md"
        style={{ borderColor: C.n200 }}
      >
        <div className="max-w-[680px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-[12px] flex items-center justify-center border-2 shadow-sm"
                style={{ background: C.blueBg, borderColor: C.blueBorder }}
              >
                <Sparkles size={18} color={C.blue} strokeWidth={2.5} />
              </div>
              <span className="text-[14px] font-black uppercase tracking-wider text-slate-600">
                Bài tập HubStudy
              </span>
            </div>

            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border-2 transition-all"
              style={{
                borderColor: isAllAnswered ? C.green : C.n200,
                background: isAllAnswered ? C.greenBg : C.white,
              }}
            >
              {isAllAnswered && (
                <Check size={14} color={C.green} strokeWidth={4} className="mr-0.5" />
              )}
              <span
                className="text-[13px] font-black"
                style={{ color: isAllAnswered ? C.greenDark : C.n600 }}
              >
                {answersCount} / {totalQuestions}
              </span>
            </div>
          </div>
          <ProgressBar percentage={percentage} />
        </div>
      </header>

      {/* ══ MAIN CONTENT ══ */}
      <main className="max-w-[680px] mx-auto px-4 pt-6">

        {partData.imageUrl && (
          <div
            className="bounce-in mb-6 p-5 rounded-[28px] border-2 border-b-[6px] flex flex-col items-center gap-3 bg-white shadow-sm"
            style={{ borderColor: C.n200 }}
          >
            <div className="flex items-center gap-2 w-full mb-1">
              <ImageIcon size={20} color={C.n400} />
              <span className="text-[14px] font-black uppercase text-slate-400">
                Hình ảnh tổng quát
              </span>
            </div>
            <img
              src={partData.imageUrl}
              alt="Part context"
              loading="lazy"
              className="max-w-full max-h-[400px] rounded-2xl border-2 shadow-inner p-1"
              style={{ borderColor: C.n200 }}
            />
          </div>
        )}

        {/* ── Render từng câu hỏi / nhóm câu hỏi ── */}
        {partData.questions.map((q) => {
          if (q.type === 'group') {
            const startIndex = globalQIndex;
            globalQIndex += (q.subQuestions?.filter(sq => !sq.isExample).length || 0);

            return (
              <QuestionGroupCard
                key={q.id}
                group={q}
                globalIndexStart={startIndex}
                answers={answers}
                onAnswerSelect={onAnswerSelect}
                isReviewMode={isReviewMode}
              />
            );
          }

          const currentIndex = globalQIndex;
          if (!q.isExample) globalQIndex++;

          return (
            <QuestionCard
              key={q.id}
              globalIndex={currentIndex}
              question={q}
              options={q.options}
              selectedAnswer={answers[q.id]}
              onAnswerSelect={onAnswerSelect}
              isReviewMode={isReviewMode}
            />
          );
        })}

        {/* ── Nút nộp bài ── */}
        <SubmitCard
          isAllAnswered={isAllAnswered}
          answersCount={answersCount}
          totalQuestions={totalQuestions}
          isSignedIn={isSignedIn}
          onSubmit={handleSubmit}
        />
      </main>

      <ConfirmModal
        open={confirmOpen}
        answersCount={answersCount}
        totalQuestions={totalQuestions}
        onConfirm={() => { setConfirmOpen(false); onSubmit(); }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
});

QuestionDisplay.displayName = 'QuestionDisplay';
export default QuestionDisplay;
import React, { useState, useCallback, useMemo, useEffect, useRef, memo } from 'react';
import {
  Lightbulb, ChevronDown, ChevronUp, Brain,
  Copy, Check, Target, Zap, Volume2, VolumeX,
} from 'lucide-react';
import useVoiceExpression from '../../hooks/useVoiceExpression';
import AIAdviceBox from '../../components/AIAdviceBox';
import useGroqAdvisor from '../../hooks/useGroqAdvisor';

const MAX_PREVIEW_LENGTH = 300;

const ENCOURAGE_PHRASES = [
  'Chời đất, trớt quớt rồi mầy ơi! Mà hổng sao, xáp lại đây tao chỉ cho nghe cái một nè.',
  'Haha bậy bậy, sai rồi ông nội ơi! Cứ tà tà, tui với ông dòm lại chỗ này chút xíu nghen.',
  'Trật đường rầy rồi bạn hiền! Mà kệ tía nó, có sai mơi mốt mới nhớ dai, xúm vô phân tích nghen.',
  'Ủa trật hở ta? Mà hổng sao hổng sao, tui với bạn dòm lại cái này chút xíu là gỡ được hà.',
  'Sai bét nhè rồi cha nội! Thôi kệ đi, ngó vô đây tao nói một phát là thông tới óc liền á.',
  'Trật lất trật lơ rồi ní ơi! Mà vầy cũng ngon, dám mần là bá cháy rồi. Giờ dòm đáp án coi sao hen!',
];

const CLOSING_PHRASES = [
  'Nhớ chưa mầy? Lấy cuốn sổ ghi vô lẹ đi, mơi mốt đừng có để trật lất vậy nữa nghe chưa!',
  'Thấy chưa! Có chút xíu vậy chớ mấy, lần sau là ní làm cái một, hổng có làm khó được ní đâu.',
  'Ngon lành chưa ông nội? Nhai đi nhai lại một hồi là thuộc lòng luôn á, ráng lên nghen!',
  'Thấu hiểu chưa bạn hiền? Cứ găm cái này vô đầu là đi thi hổng sợ sai lệch đi đâu hết trơn á!',
  'Vậy là êm ru rồi đó!',
  'Thấy nó dễ ợt chưa?',
];

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const indexToLetter = (index) => {
  if (index === undefined || index === null || index < 0) return '?';
  return String.fromCharCode(65 + index);
};

// ─── MentorVoiceButton ───────────────────────
const MentorVoiceButton = memo(({ isActive, onClick }) => (
  <button
    onClick={onClick}
    title={isActive ? 'Dừng giọng Mentor' : 'Nghe Mentor khích lệ'}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 active:scale-95 shadow-sm ${
      isActive ? 'bg-indigo-600 text-white shadow-indigo-200/50' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:shadow'
    }`}
  >
    {isActive ? <><VolumeX className="w-4 h-4" /> Đang phát...</> : <><Volume2 className="w-4 h-4" /> AI Mentor</>}
  </button>
));
MentorVoiceButton.displayName = 'MentorVoiceButton';

// ─── SandwichFeedback ────────────────────────
const SandwichFeedback = memo(({ encourage, closing, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-3 mb-6">
      <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-indigo-50/80 border border-indigo-100/50">
        <span className="text-xl shrink-0 mt-0.5">🤗</span>
        <p className="text-sm font-medium text-indigo-900 leading-relaxed">{encourage}</p>
      </div>
      {closing && (
        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-amber-50/80 border border-amber-100/50">
          <span className="text-xl shrink-0 mt-0.5">💪</span>
          <p className="text-sm font-medium text-amber-900 leading-relaxed">{closing}</p>
        </div>
      )}
    </div>
  );
});
SandwichFeedback.displayName = 'SandwichFeedback';

// ─── ComparisonCard ──────────────────────────
const ComparisonCard = memo(({ userAnswer, correctAnswer, selectedAnswerText, correctAnswerText, isCorrect }) => (
  <div className="flex flex-col sm:flex-row gap-3 mb-6">
    <div className={`flex-1 p-5 rounded-2xl border transition-colors ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
          {indexToLetter(userAnswer)}
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Lựa chọn của bạn</span>
      </div>
      <p className={`text-sm font-medium leading-relaxed ${isCorrect ? 'text-emerald-900' : 'text-slate-700'}`}>{selectedAnswerText}</p>
    </div>
    {!isCorrect && (
      <div className="flex-1 p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
            {indexToLetter(correctAnswer)}
          </div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Đáp án đúng</span>
        </div>
        <p className="text-sm font-medium text-emerald-900 leading-relaxed">{correctAnswerText}</p>
      </div>
    )}
  </div>
));
ComparisonCard.displayName = 'ComparisonCard';

// ─── ExplanationText ─────────────────────────
const ExplanationText = memo(({ text, isExpanded, isLongExplanation, onExpandChange }) => {
  const displayedText = useMemo(() => {
    if (isExpanded || !isLongExplanation) return text;
    return text?.substring(0, MAX_PREVIEW_LENGTH);
  }, [text, isExpanded, isLongExplanation]);

  const renderFormattedText = useCallback((content) => {
    if (!content) return null;
    return content.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-blue-700 bg-blue-50/50 px-1.5 py-0.5 rounded-md">{part.slice(2, -2)}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-100 mb-6">
      <div className="flex items-center gap-2 mb-4 text-blue-600">
        <Brain className="w-5 h-5" />
        <span className="text-sm font-bold uppercase tracking-wide">Phân tích chuyên sâu</span>
      </div>
      <div className="relative">
        <div className={`text-[15px] leading-relaxed text-slate-700 transition-all duration-300 ${isLongExplanation && !isExpanded ? 'line-clamp-[8]' : ''}`}>
          {renderFormattedText(displayedText)}
          {isLongExplanation && !isExpanded && '...'}
        </div>
        {isLongExplanation && !isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-2xl" />
        )}
      </div>
      {isLongExplanation && (
        <button
          onClick={() => onExpandChange(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors active:scale-95 -ml-3"
        >
          {isExpanded ? <><ChevronUp className="w-4 h-4" /> Thu gọn</> : <><ChevronDown className="w-4 h-4" /> Xem toàn bộ nội dung</>}
        </button>
      )}
    </div>
  );
});
ExplanationText.displayName = 'ExplanationText';

// ─── InsightBox ──────────────────────────────
const InsightBox = memo(({ isCorrect }) => (
  <div className={`p-5 rounded-2xl mb-6 ${isCorrect ? 'bg-emerald-50' : 'bg-slate-50'}`}>
    <div className="flex gap-4">
      <div className={`p-2.5 rounded-xl h-fit ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
        {isCorrect ? <Zap className="w-5 h-5" /> : <Target className="w-5 h-5" />}
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 mb-1.5">{isCorrect ? 'Tiếp tục phát huy!' : 'Chiến thuật cải thiện'}</h4>
        <p className="text-sm leading-relaxed text-slate-600">
          {isCorrect
            ? 'Bạn đã làm rất tốt. Hãy chú ý các từ khóa trong phần giải thích để áp dụng cho các dạng bài nâng cao hơn.'
            : 'Đừng quá lo lắng. Hãy note lại cấu trúc ngữ pháp này vào sổ tay. Việc sai ở đây sẽ giúp bạn không bao giờ sai ở kỳ thi thật.'}
        </p>
      </div>
    </div>
  </div>
));
InsightBox.displayName = 'InsightBox';

// ─── CopyButton ──────────────────────────────
const CopyButton = memo(({ isCopied, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-300 active:scale-[0.98] ${
      isCopied ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200'
    }`}
  >
    {isCopied ? <><Check className="w-5 h-5" /> Đã lưu vào bộ nhớ</> : <><Copy className="w-5 h-5" /> Sao chép để ghi chú</>}
  </button>
));
CopyButton.displayName = 'CopyButton';

// ─── ExplanationHeader ───────────────────────
const ExplanationHeader = memo(({ isExpanded, isCorrect, onToggle, mentorActive, onMentorClick }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onToggle}
    onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    className={`w-full text-left transition-all duration-300 group cursor-pointer px-5 py-4 sm:px-6 sm:py-5 rounded-2xl active:scale-[0.99] ${
      isExpanded ? 'bg-slate-50' : isCorrect ? 'bg-emerald-50 hover:bg-emerald-100/50' : 'bg-rose-50 hover:bg-rose-100/50'
    }`}
  >
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-full transition-transform group-hover:scale-110 ${isCorrect ? 'bg-emerald-100' : 'bg-rose-100'}`}>
          <Lightbulb className={`w-5 h-5 ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`} />
        </div>
        <div>
          <p className="text-base font-bold text-slate-900">{isCorrect ? 'Giải thích chi tiết' : 'Phân tích đáp án'}</p>
          <p className="text-sm text-slate-500 mt-0.5">{isExpanded ? 'Nhấn để thu gọn' : 'Nhấn để mở rộng kiến thức'}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {!isCorrect && (
          <div onClick={(e) => e.stopPropagation()}>
            <MentorVoiceButton isActive={mentorActive} onClick={onMentorClick} />
          </div>
        )}
        <div className={`hidden sm:flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${isCorrect ? 'bg-emerald-100/50 text-emerald-700' : 'bg-rose-100/50 text-rose-700'}`}>
          {isCorrect ? 'Mastered' : 'Review'}
        </div>
        <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-slate-200/50' : 'bg-white/50'}`}>
          <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
    </div>
  </div>
));
ExplanationHeader.displayName = 'ExplanationHeader';

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const ExplanationSection = ({
  explanation,
  question,
  userAnswer,
  correctAnswer,
  isCorrect,
  questionId,
  options = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isExplanationExpanded, setIsExplanationExpanded] = useState(false);
  const [mentorActive, setMentorActive] = useState(false);
  const [sandwichVisible, setSandwichVisible] = useState(false);

  const headerRef = useRef(null);

  const { aiAdvice, loading: aiLoading, error: aiError, getAdvice } = useGroqAdvisor();
  const { speakSequence, stop } = useVoiceExpression();

  const encourageText = useMemo(() => pickRandom(ENCOURAGE_PHRASES), [questionId]);
  const closingText = useMemo(() => pickRandom(CLOSING_PHRASES), [questionId]);

  const selectedAnswerText = useMemo(
    () => userAnswer !== undefined && options[userAnswer]
      ? options[userAnswer].text || options[userAnswer]
      : 'Chưa chọn',
    [userAnswer, options],
  );

  const correctAnswerText = useMemo(
    () => options[correctAnswer]?.text || options[correctAnswer] || 'N/A',
    [correctAnswer, options],
  );

  const isLongExplanation = useMemo(() => explanation?.length > MAX_PREVIEW_LENGTH, [explanation]);

  useEffect(() => {
    if (!isCorrect && explanation) setIsExpanded(true);
  }, [isCorrect, explanation]);

  useEffect(() => {
    return () => stop();
  }, [questionId, stop]);

  useEffect(() => {
    if (!isCorrect && isExpanded && !aiAdvice && !aiLoading) {
      getAdvice(question, userAnswer, correctAnswer, explanation, options);
    }
  }, [isCorrect, isExpanded, aiAdvice, aiLoading, userAnswer, correctAnswer, question, explanation, options, getAdvice]);

  const handleToggle = useCallback(() => {
    const opening = !isExpanded;

    if (opening && headerRef.current) {
      // ─── SCROLL ANCHOR FIX ───────────────────────────────────────────
      // Problem: when content expands BELOW the clicked header, the browser
      // keeps the scroll position fixed, so the header visually "flies up".
      //
      // Solution: record the header's distance from the top of the viewport
      // BEFORE the expand, then after layout reflows, compensate exactly.
      // This makes the header stay perfectly still while content grows below.
      const el = headerRef.current;
      const distanceFromTop = el.getBoundingClientRect().top;
      const scrollBefore = window.scrollY;

      setIsExpanded(true);

      // Double rAF: first frame starts layout, second frame measures final positions
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newDistanceFromTop = el.getBoundingClientRect().top;
          const shift = newDistanceFromTop - distanceFromTop;
          if (Math.abs(shift) > 0.5) {
            window.scrollTo({ top: scrollBefore + shift, behavior: 'instant' });
          }
        });
      });
    } else {
      setIsExpanded(false);
    }
  }, [isExpanded]);

  const handleCopyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(explanation);
      } else {
        const ta = document.createElement('textarea');
        ta.value = explanation;
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, [explanation]);

  const handleMentorVoice = useCallback(() => {
    if (mentorActive) {
      stop();
      setMentorActive(false);
      return;
    }
    setMentorActive(true);
    setSandwichVisible(true);
    const knowledgeSummary = explanation
      ? `Về kiến thức, ${explanation.substring(0, 120)}...`
      : 'Hãy đọc kỹ phần giải thích bên dưới nhé.';
    speakSequence([
      { text: encourageText, mode: 'HAPPY', delay: 0 },
      { text: knowledgeSummary, mode: 'NEUTRAL', delay: 400 },
      { text: closingText, mode: 'HAPPY', delay: 400 },
    ]);
    const estimatedMs = (encourageText.length + knowledgeSummary.length + closingText.length) * 75 + 1200;
    setTimeout(() => setMentorActive(false), estimatedMs);
  }, [mentorActive, stop, speakSequence, encourageText, explanation, closingText]);

  if (!explanation) return null;

  return (
    <div className="w-full my-6 flex flex-col gap-3" ref={headerRef}>
      <ExplanationHeader
        isExpanded={isExpanded}
        isCorrect={isCorrect}
        onToggle={handleToggle}
        mentorActive={mentorActive}
        onMentorClick={handleMentorVoice}
      />

      {/* CSS Grid smooth expand — content grows downward, header stays put */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 pb-4">
            {!isCorrect && (
              <SandwichFeedback
                encourage={encourageText}
                closing={sandwichVisible ? closingText : null}
                isVisible={sandwichVisible}
              />
            )}
            {!isCorrect && <AIAdviceBox advice={aiAdvice} loading={aiLoading} error={aiError} />}
            <ComparisonCard
              userAnswer={userAnswer}
              correctAnswer={correctAnswer}
              selectedAnswerText={selectedAnswerText}
              correctAnswerText={correctAnswerText}
              isCorrect={isCorrect}
            />
            <ExplanationText
              text={explanation}
              isExpanded={isExplanationExpanded}
              isLongExplanation={isLongExplanation}
              onExpandChange={setIsExplanationExpanded}
            />
            <InsightBox isCorrect={isCorrect} />
            <CopyButton isCopied={isCopied} onClick={handleCopyToClipboard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ExplanationSection);
import React, { memo, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Headphones, BookOpen, Trophy, Check, Lock, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

/* ─────────────────────────────────────────────────────────────
   Step config
   ───────────────────────────────────────────────────────────── */
const STEPS = [
  { id: 'setup',     label: 'Chọn Đề',  subLabel: 'Chuẩn bị', xp: 0,  icon: Settings },
  { id: 'listening', label: 'Nghe',     subLabel: '30 phút',  xp: 10, icon: Headphones },
  { id: 'reading',   label: 'Đọc',      subLabel: '60 phút',  xp: 20, icon: BookOpen },
  { id: 'results',   label: 'Kết quả',  subLabel: 'Điểm số',  xp: 5,  icon: Trophy },
];

/* ─────────────────────────────────────────────────────────────
   Trail (Progress bar between steps)
   ───────────────────────────────────────────────────────────── */
const Trail = memo(({ filled }) => (
  <div className="flex-1 h-2 md:h-2.5 bg-gray-200 rounded-full mx-1 md:mx-1.5 relative overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: filled ? '100%' : '0%' }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-0 bottom-0 bg-green-500 rounded-full"
    >
      <div className="absolute top-0.5 left-1 right-1 h-px bg-white/40 rounded-full" />
    </motion.div>
  </div>
));
Trail.displayName = 'Trail';

/* ─────────────────────────────────────────────────────────────
   StepNode (Individual step button)
   ───────────────────────────────────────────────────────────── */
const StepNode = memo(({ step, idx, isCompleted, isCurrent, isLocked }) => {
  const Icon = step.icon;
  const nodeRef = useRef(null);

  let theme = {
    bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-400', iconBg: 'bg-transparent'
  };

  if (isCompleted) {
    theme = { bg: 'bg-green-500', border: 'border-green-600', text: 'text-white', iconBg: 'bg-white/15' };
  } else if (isCurrent) {
    theme = { bg: 'bg-blue-500', border: 'border-blue-600', text: 'text-white', iconBg: 'bg-white/15' };
  }

  return (
    <div className="relative flex flex-col items-center" ref={nodeRef}>
      
      {/* Tooltip for current step */}
      <AnimatePresence>
        {isCurrent && (
          <motion.div 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 8 }}
            className="absolute -top-8 md:-top-9 bg-gray-800 text-white text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg z-20"
          >
            Đang thi
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-800 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Button */}
      <motion.div
        animate={isCurrent ? { y: [-1, 1, -1] } : { y: 0 }}
        transition={isCurrent ? { repeat: Infinity, duration: 2.5, ease: "easeInOut" } : {}}
        className={`
          relative flex items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300 z-10 border-2
          ${theme.bg} ${theme.border} ${theme.text}
          ${isCurrent ? 'w-13 h-13 md:w-14 md:h-14 shadow-md' : 'w-11 h-11 md:w-12 md:h-12'}
        `}
      >
        {/* Inner highlight */}
        <div className={`absolute inset-1.5 rounded-lg md:rounded-xl ${theme.iconBg}`} />

        {isCompleted ? (
          <Check size={isCurrent ? 22 : 18} strokeWidth={3} className="relative z-10" />
        ) : isLocked ? (
          <Lock size={isCurrent ? 22 : 18} strokeWidth={2} className="relative z-10 opacity-50" />
        ) : (
          <Icon size={isCurrent ? 24 : 20} strokeWidth={2} className="relative z-10" />
        )}

        {/* Star on completion */}
        {isCompleted && idx === 3 && (
          <motion.div 
            initial={{ scale: 0, rotate: -45 }} 
            animate={{ scale: 1, rotate: 15 }} 
            className="absolute -top-1 -right-1 text-lg"
          >
            ⭐
          </motion.div>
        )}
      </motion.div>

      {/* Step Label */}
      <div className="mt-2 text-center w-max absolute top-full">
        <p className={`text-xs md:text-sm font-bold transition-colors
          ${isCurrent || isCompleted ? 'text-gray-700' : 'text-gray-500'}
        `}>
          {step.label}
        </p>
      </div>
    </div>
  );
});
StepNode.displayName = 'StepNode';

/* ─────────────────────────────────────────────────────────────
   MAIN StepIndicator
   ───────────────────────────────────────────────────────────── */
const StepIndicator = memo(({ currentMode, listeningComplete = false, streakDays = 3 }) => {
  let currentIndex = 0;
  if (currentMode === 'results') currentIndex = 3;
  else if (currentMode === 'exam' && listeningComplete) currentIndex = 2;
  else if (currentMode === 'exam') currentIndex = 1;

  const prevIndexRef = useRef(currentIndex);
  useEffect(() => {
    if (currentIndex > prevIndexRef.current && currentIndex > 0) {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
      });
    }
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  const totalXp = STEPS.slice(0, currentIndex).reduce((s, st) => s + st.xp, 0);

  return (
    <div className="w-full font-sans selection:bg-blue-200" style={{ fontFamily: '-apple-system, "Segoe UI", "Roboto", sans-serif' }}>
      
      {/* Stats Bar: XP & Streak */}
      <div className="flex items-center justify-between gap-2 mb-4 md:mb-5">
        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg">
          <span className="text-lg md:text-xl leading-none">⚡</span>
          <span className="text-xs md:text-sm font-bold text-blue-700">
            +{totalXp} XP
          </span>
        </div>

        {streakDays > 0 && (
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg">
            <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500 fill-orange-500" strokeWidth={1.5} />
            <span className="text-xs md:text-sm font-bold text-orange-700">
              {streakDays} ngày
            </span>
          </div>
        )}
      </div>

      {/* Steps Track */}
      <div className="flex items-center justify-between relative px-1 md:px-2 mb-8 md:mb-10">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent   = idx === currentIndex;
          const isLocked    = idx > currentIndex;

          return (
            <React.Fragment key={step.id}>
              <StepNode
                step={step}
                idx={idx}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isLocked={isLocked}
              />
              {idx < STEPS.length - 1 && (
                <Trail filled={idx < currentIndex} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
});

StepIndicator.displayName = 'StepIndicator';
export default StepIndicator;

/* ─────────────────────────────────────────────────────────────
   Minimal Variant (Compact version for headers)
   ───────────────────────────────────────────────────────────── */
export const StepIndicatorMinimal = memo(({ currentMode, listeningComplete = false }) => {
  let currentIndex = 0;
  if (currentMode === 'results') currentIndex = 3;
  else if (currentMode === 'exam' && listeningComplete) currentIndex = 2;
  else if (currentMode === 'exam') currentIndex = 1;

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-xl border border-gray-200 w-max mx-auto">
      {STEPS.map((step, idx) => {
        const done    = idx < currentIndex;
        const current = idx === currentIndex;

        let theme = "bg-gray-300 text-gray-500";
        if (done) theme = "bg-green-500 text-white shadow-sm";
        if (current) theme = "bg-blue-500 text-white shadow-sm";

        return (
          <React.Fragment key={step.id}>
            <div className={`flex items-center justify-center rounded-lg transition-all duration-300 ${theme} ${current ? 'w-8 h-8' : 'w-7 h-7'}`}>
              {done ? (
                <Check size={14} strokeWidth={3} />
              ) : (
                <step.icon size={current ? 16 : 14} strokeWidth={2} />
              )}
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-2.5 h-1 rounded-full transition-colors duration-500 ${idx < currentIndex ? 'bg-green-500' : 'bg-gray-300'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
});
StepIndicatorMinimal.displayName = 'StepIndicatorMinimal';
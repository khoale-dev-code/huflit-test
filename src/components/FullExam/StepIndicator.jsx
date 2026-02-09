import React, { memo } from 'react';

// ========================================
// ENHANCED STEP INDICATOR COMPONENT
// ========================================

/**
 * Enhanced StepIndicator - Beautiful, animated progress indicator
 * 
 * Features:
 * - Smooth animations & transitions
 * - Hover effects with tooltips
 * - Better visual hierarchy
 * - Responsive design
 * - Completed state with checkmark
 * - Current step highlight with glow
 */

const StepIndicator = memo(({ currentMode, listeningComplete = false }) => {
  const steps = [
    { id: 'setup', label: 'Select Exam', icon: '📋', description: 'Choose your exam' },
    { id: 'listening', label: 'Listening (30m)', icon: '🎧', description: 'Listening section' },
    { id: 'reading', label: 'Reading (60m)', icon: '📖', description: 'Reading section' },
    { id: 'results', label: 'Results', icon: '🏆', description: 'View your score' },
  ];

  let currentIndex = 0;
  if (currentMode === 'exam' && listeningComplete) currentIndex = 2;
  else if (currentMode === 'exam') currentIndex = 1;
  else if (currentMode === 'results') currentIndex = 3;

  return (
    <div className="mb-8 sm:mb-12">
      {/* Main Progress Container */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPending = idx > currentIndex;

          return (
            <div key={step.id} className="flex items-center flex-1 group">
              {/* Step Circle */}
              <div className="relative">
                {/* Glow effect for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-40 animate-pulse" 
                    style={{ 
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      width: '52px',
                      height: '52px',
                      marginLeft: '-4px',
                      marginTop: '-4px'
                    }}
                  />
                )}

                {/* Step Button */}
                <button
                  disabled
                  className={`
                    relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center 
                    font-bold text-lg sm:text-xl transition-all duration-500 ease-out
                    flex-shrink-0 cursor-default
                    ${isCompleted 
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/50' 
                      : isCurrent 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl shadow-blue-500/50 scale-110' 
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                    }
                  `}
                  title={step.description}
                >
                  <span className={`transition-all duration-300 ${isCurrent ? 'scale-110' : 'scale-100'}`}>
                    {isCompleted ? '✓' : step.icon}
                  </span>
                </button>
              </div>

              {/* Step Label */}
              <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                <p className={`
                  text-xs sm:text-sm font-bold transition-all duration-300 truncate
                  ${isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'}
                `}>
                  {step.label}
                </p>
                <p className={`
                  text-[10px] sm:text-xs mt-0.5 transition-colors duration-300 truncate
                  ${isCompleted || isCurrent ? 'text-slate-600' : 'text-slate-400'}
                `}>
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="relative flex-1 mx-1 sm:mx-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`
                      h-full rounded-full transition-all duration-700 ease-out
                      ${idx < currentIndex
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 w-full shadow-sm shadow-emerald-400/50'
                        : idx === currentIndex
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500 w-1/2 shadow-sm shadow-blue-400/50'
                        : 'bg-slate-200 w-0'
                      }
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Stats Bar (Optional - Remove if not needed) */}
      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Progress</p>
          <p className="text-2xl font-black text-slate-900">{Math.round((currentIndex / steps.length) * 100)}%</p>
        </div>
        <div className="w-px h-12 bg-slate-200" />
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Step</p>
          <p className="text-2xl font-black text-slate-900">{currentIndex + 1} of {steps.length}</p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx ={true}>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
});

StepIndicator.displayName = 'StepIndicator';

export default StepIndicator;

// ========================================
// ALTERNATIVE: Minimalist Version (if too fancy)
// ========================================

export const StepIndicatorMinimal = memo(({ currentMode, listeningComplete = false }) => {
  const steps = [
    { id: 'setup', label: 'Select Exam', icon: '📋' },
    { id: 'listening', label: 'Listening', icon: '🎧' },
    { id: 'reading', label: 'Reading', icon: '📖' },
    { id: 'results', label: 'Results', icon: '🏆' },
  ];

  let currentIndex = 0;
  if (currentMode === 'exam' && listeningComplete) currentIndex = 2;
  else if (currentMode === 'exam') currentIndex = 1;
  else if (currentMode === 'results') currentIndex = 3;

  return (
    <div className="mb-8 flex items-center justify-between gap-3">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;

        return (
          <div key={step.id} className="flex items-center flex-1">
            {/* Circle */}
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0
              transition-all duration-300
              ${isCompleted 
                ? 'bg-emerald-500 text-white' 
                : isCurrent 
                ? 'bg-blue-600 text-white shadow-lg scale-110' 
                : 'bg-slate-200 text-slate-400'
              }
            `}>
              {isCompleted ? '✓' : step.icon}
            </div>

            {/* Line */}
            {idx < steps.length - 1 && (
              <div className={`
                h-1 flex-1 mx-2 transition-colors duration-300
                ${idx < currentIndex ? 'bg-emerald-500' : 'bg-slate-200'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
});

StepIndicatorMinimal.displayName = 'StepIndicatorMinimal';

// ========================================
// ALTERNATIVE: Vertical Version (for mobile)
// ========================================

export const StepIndicatorVertical = memo(({ currentMode, listeningComplete = false }) => {
  const steps = [
    { id: 'setup', label: 'Select Exam', icon: '📋', description: 'Choose your exam' },
    { id: 'listening', label: 'Listening (30m)', icon: '🎧', description: 'Listen and answer' },
    { id: 'reading', label: 'Reading (60m)', icon: '📖', description: 'Read and answer' },
    { id: 'results', label: 'Results', icon: '🏆', description: 'View your score' },
  ];

  let currentIndex = 0;
  if (currentMode === 'exam' && listeningComplete) currentIndex = 2;
  else if (currentMode === 'exam') currentIndex = 1;
  else if (currentMode === 'results') currentIndex = 3;

  return (
    <div className="mb-8">
      <div className="flex flex-col">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.id} className="flex items-start">
              {/* Timeline Column */}
              <div className="flex flex-col items-center mr-4">
                {/* Step Circle */}
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                  transition-all duration-300
                  ${isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : isCurrent 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-slate-200 text-slate-400'
                  }
                `}>
                  {isCompleted ? '✓' : step.icon}
                </div>

                {/* Vertical Line */}
                {idx < steps.length - 1 && (
                  <div className={`
                    w-1 h-12 mt-2
                    ${idx < currentIndex ? 'bg-emerald-500' : 'bg-slate-200'}
                  `} />
                )}
              </div>

              {/* Step Info */}
              <div className="pt-2 pb-8">
                <p className={`
                  font-bold transition-colors duration-300
                  ${isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'}
                `}>
                  {step.label}
                </p>
                <p className={`
                  text-sm mt-1 transition-colors duration-300
                  ${isCompleted || isCurrent ? 'text-slate-600' : 'text-slate-400'}
                `}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

StepIndicatorVertical.displayName = 'StepIndicatorVertical';
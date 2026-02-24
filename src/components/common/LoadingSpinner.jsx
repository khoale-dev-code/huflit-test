import React, { memo } from 'react';

const LoadingSpinner = memo(({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
      <style>{`
        /* ✅ OPTIMIZED: GPU acceleration + smooth animations */
        
        @keyframes startround {
          0% {
            opacity: 0;
            transform: scale(0.8);
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.5));
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.3));
          }
        }

        @keyframes orbitSlow {
          0% {
            transform: translateX(-3em) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            opacity: 1;
          }
          50% {
            transform: translateX(3em) rotate(180deg);
            opacity: 1;
          }
          75% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(-3em) rotate(360deg);
            opacity: 0.3;
          }
        }

        @keyframes orbitFast {
          0% {
            transform: translateX(3em) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            transform: translateX(-3em) rotate(180deg);
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateX(3em) rotate(360deg);
            opacity: 0.3;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
            text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .earth-loader {
          position: relative;
          width: 6rem;
          height: 6rem;
          background: radial-gradient(circle at 35% 35%, #60A5FA, #3B82F6, #1E40AF);
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.2);
          
          /* ✅ GPU acceleration */
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
          
          box-shadow: 
            0 0 30px rgba(59, 130, 246, 0.4),
            inset -2px -2px 5px rgba(0, 0, 0, 0.2),
            inset 2px 2px 5px rgba(255, 255, 255, 0.1);
          
          animation: startround 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                    float 3s ease-in-out infinite 1.5s;
        }

        @media (min-width: 640px) {
          .earth-loader {
            width: 7.5rem;
            height: 7.5rem;
          }
        }

        @media (min-width: 768px) {
          .earth-loader {
            width: 8.5rem;
            height: 8.5rem;
          }
        }

        .land-mass {
          position: absolute;
          width: 6em;
          height: auto;
          
          /* ✅ GPU acceleration for smooth animations */
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .land-mass-1 {
          bottom: -1.8em;
          left: 0;
          animation: orbitSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.2s;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .land-mass-2 {
          top: -2.8em;
          left: 0;
          animation: orbitSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .land-mass-3 {
          top: -2.3em;
          left: 0;
          animation: orbitFast 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .land-mass-4 {
          bottom: -2em;
          left: 0;
          animation: orbitFast 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.2s;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        /* ✅ SVG optimization */
        .land-mass svg {
          display: block;
          width: 100%;
          height: auto;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        }

        .loading-text {
          animation: pulse-glow 2s ease-in-out infinite;
          letter-spacing: 0.1em;
          font-weight: 600;
        }

        .loading-dot {
          display: inline-block;
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        .loading-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        /* ✅ Accessibility - respect user preferences */
        @media (prefers-reduced-motion: reduce) {
          .earth-loader,
          .land-mass,
          .loading-text,
          .loading-dot {
            animation: none !important;
            opacity: 1 !important;
          }

          .earth-loader {
            filter: none;
          }
        }

        /* ✅ Dark mode optimization */
        @media (prefers-color-scheme: dark) {
          .earth-loader {
            box-shadow: 
              0 0 40px rgba(59, 130, 246, 0.5),
              inset -2px -2px 5px rgba(0, 0, 0, 0.4),
              inset 2px 2px 5px rgba(255, 255, 255, 0.1);
          }
        }

        /* ✅ Smooth transitions on slower devices */
        @media (max-width: 640px) {
          .earth-loader {
            animation: startround 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                      float 3s ease-in-out infinite 1.2s;
          }

          .land-mass {
            animation-duration: 3.5s !important;
          }
        }
      `}</style>

      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
        {/* Earth Loader Container */}
        <div className="relative">
          {/* Glow ring effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 blur-2xl animate-pulse -m-4"></div>

          {/* Earth Loader */}
          <div className="earth-loader">
            {/* Land masses - simplified and optimized */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 100" 
              className="land-mass land-mass-1"
              aria-hidden="true"
              role="presentation"
            >
              <path
                d="M50,20 Q60,25 65,35 Q62,45 50,50 Q40,48 35,40 Q40,25 50,20"
                fill="#10B981"
                opacity="0.9"
              />
            </svg>

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 100" 
              className="land-mass land-mass-2"
              aria-hidden="true"
              role="presentation"
            >
              <path
                d="M50,20 Q55,18 62,22 Q68,28 65,38 Q58,42 50,40 Q48,30 50,20"
                fill="#10B981"
                opacity="0.85"
              />
            </svg>

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 100" 
              className="land-mass land-mass-3"
              aria-hidden="true"
              role="presentation"
            >
              <path
                d="M50,50 Q60,52 68,58 Q65,68 52,70 Q40,68 38,58 Q42,52 50,50"
                fill="#059669"
                opacity="0.8"
              />
            </svg>

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 100" 
              className="land-mass land-mass-4"
              aria-hidden="true"
              role="presentation"
            >
              <path
                d="M50,50 Q40,48 32,52 Q28,62 38,68 Q50,70 52,60 Q52,55 50,50"
                fill="#059669"
                opacity="0.75"
              />
            </svg>
          </div>
        </div>

        {/* Loading Text with animated dots */}
        <div className="text-center">
          <p className="text-white text-base sm:text-lg md:text-xl font-semibold tracking-widest loading-text">
            {message}
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
          </p>
          <p className="text-blue-300 text-xs sm:text-sm mt-3 opacity-75">
            Preparing your experience
          </p>
        </div>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner };
export default LoadingSpinner;
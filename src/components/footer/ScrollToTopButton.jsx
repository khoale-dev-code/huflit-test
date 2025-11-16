import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrolled > 300);
    };

    // Throttle scroll event
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
        setTimeout(() => { ticking = false; }, 100);
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const scrollToTop = () => {
    // Disable button during scroll
    setIsVisible(false);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Re-enable after scroll completes
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(window.pageYOffset > 300);
    }, 1000);
  };

  return (
    <>
      {/* Progress Ring Background */}
      <div className={`fixed bottom-8 right-8 w-14 h-14 z-40 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
        
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-lg">
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
          />
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray={`${(scrollProgress / 100) * 163.36} 163.36`}
            className="transition-all duration-300"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Button */}
      <button
        onClick={scrollToTop}
        disabled={!isVisible}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full shadow-xl hover:shadow-2xl active:shadow-lg transition-all duration-300 z-50 flex items-center justify-center group transform ${
          isVisible 
            ? 'opacity-100 translate-y-0 hover:scale-110 active:scale-95' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        title="Lên đầu trang"
        aria-label="Scroll to top"
      >
        {/* Animated arrow icon */}
        <ArrowUp className="w-6 h-6 transition-all duration-300 group-hover:-translate-y-1.5 group-active:translate-y-0.5" />
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:animate-pulse"></div>
        </div>
      </button>
    </>
  );
};

export default ScrollToTopButton;
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Primary gradient colors
        'primary-orange': '#f97316',
        'primary-yellow': '#fbbf24',
        'primary-dark': '#0f172a',
        'primary-darker': '#1f2937',
        'purple-1': '#667eea',
        'purple-2': '#764ba2',
        'pink-1': '#f093fb',
        // Grammar / Education module
        grammar: {
          primary: '#00358E',
          'primary-hover': '#002a70',
          accent: '#FF7D00',
          'accent-hover': '#e67000',
          'accent-soft': 'rgba(255, 125, 0, 0.12)',
          blue: '#2563eb',
          'blue-soft': 'rgba(37, 99, 235, 0.08)',
          'blue-light': '#e0eaff',
        },
      },
      backgroundImage: {
        'gradient-app': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-success': 'linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%)',
        'gradient-navbar': 'linear-gradient(to right, #f97316, #fbbf24, #f97316)',
        'gradient-orange': 'linear-gradient(135deg, #f97316, #fbbf24)',
      },
      boxShadow: {
        'app': '0 30px 90px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'glass': '0 4px 6px -1px rgba(249, 115, 22, 0.1), 0 2px 4px -1px rgba(251, 191, 36, 0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'progress-shine': 'progressShine 2s linear infinite',
        'score-shine': 'scoreShine 2s ease infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-custom': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-down': 'slideDown 0.3s ease',
        'blob': 'blob 7s infinite', 
        'confetti': 'confetti 3s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'grammar-confetti': 'grammarConfetti 3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        progressShine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        scoreShine: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(102, 126, 234, 0.6)' },
        },
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        grammarConfetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-bottom))',
      },
      borderWidth: {
        '5': '5px',
      },
      backdropBlur: {
        'xl': '20px',
        '3xl': '32px',
      },
      screens: {
        'xs': '320px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      // Thêm max-width responsive
      maxWidth: {
        'screen-xs': '320px',
        'screen-sm': '480px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
      },
    },
  },
  plugins: [
    function ({ addBase, addComponents, addUtilities, theme }) {
      // Add base styles to prevent overflow
      addBase({
        'html': {
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '100vw',
        },
        'body': {
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '100vw',
          position: 'relative',
        },
        // Prevent horizontal scroll on all elements
        '*': {
          boxSizing: 'border-box',
        },
        // Mobile-specific optimizations
        '@media (max-width: 768px)': {
          'html, body': {
            overscrollBehavior: 'none',
            WebkitOverflowScrolling: 'touch',
          },
        },
      });

      // Add custom utilities
      addUtilities({
        '.letter-spacing-tight': {
          letterSpacing: '-0.3px',
        },
        '.text-shadow': {
          textShadow: '0 2px 20px rgba(102, 126, 234, 0.2)',
        },
        '.bg-glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
        },
        '.border-gradient': {
          borderImage: 'linear-gradient(90deg, #667eea, #764ba2) 1',
        },
        '.animation-delay-2000': {
          'animationDelay': '2000ms',
        },
        '.animation-delay-4000': {
          'animationDelay': '4000ms',
        },
        // Utilities to prevent overflow
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.prevent-overflow': {
          overflowX: 'hidden',
          maxWidth: '100vw',
          width: '100%',
        },
        '.safe-padding-x': {
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        },
        '.safe-padding-y': {
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        },
        // Text overflow utilities
        '.text-ellipsis-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        '.text-ellipsis-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        // Container utilities for responsive layouts
        '.container-fluid': {
          width: '100%',
          maxWidth: '100vw',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
          '@screen md': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
          '@screen lg': {
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem',
          },
        },
      });

      // Add custom components with responsive improvements
      addComponents({
        '.btn-base': {
          '@apply px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-bold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:-translate-y-0.5 text-sm sm:text-base': {},
        },
        '.btn-primary': {
          '@apply btn-base bg-gradient-primary text-white': {},
        },
        '.btn-secondary': {
          '@apply btn-base bg-slate-700 text-white hover:bg-slate-600': {},
        },
        '.btn-gradient-primary': {
          '@apply btn-base bg-gradient-to-r from-purple-1 to-purple-2 text-white': {},
        },
        '.card-glass': {
          '@apply bg-white/98 backdrop-blur-3xl rounded-2xl sm:rounded-3xl shadow-lg border border-white/50 p-4 sm:p-6': {},
        },
        '.input-base': {
          '@apply px-4 py-2.5 sm:px-5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base bg-white transition-all font-medium hover:border-purple-1 focus:outline-none focus:border-purple-1 w-full': {},
        },
        // Responsive container
        '.container-responsive': {
          '@apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {},
        },
        // Grid responsive
        '.grid-responsive': {
          '@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6': {},
        },
        // Card responsive
        '.card-responsive': {
          '@apply p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl': {},
        },
      });
    },
  ],
};
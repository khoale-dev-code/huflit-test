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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
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
    },
  },
  plugins: [
    function ({ addBase, addComponents, addUtilities, theme }) {
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
      });

      // Add custom components
      addComponents({
        '.btn-base': {
          '@apply px-6 py-4 rounded-2xl font-bold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:-translate-y-0.5': {},
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
          '@apply bg-white/98 backdrop-blur-3xl rounded-3xl shadow-lg border border-white/50': {},
        },
        '.input-base': {
          '@apply px-5 py-3 border-2 border-gray-300 rounded-xl text-base bg-white transition-all font-medium hover:border-purple-1 focus:outline-none focus:border-purple-1': {},
        },
      });
    },
  ],
};
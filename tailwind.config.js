/** @type {import('tailwindcss').Config} */
export default {
  // ✅ Đã rút gọn: Chỉ quét các file cần thiết trong src
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  
  theme: {
    extend: {
      // 🚀 1. HỆ THỐNG FONT CHỮ GAMIFICATION
      fontFamily: {
        sans: ['"Nunito"', 'sans-serif'], 
        body: ['"Nunito"', 'sans-serif'], 
        display: ['"Baloo 2"', 'cursive'], 
        nunito: ['"Nunito"', 'sans-serif'],
        inter: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },

      // 🚀 2. HỆ THỐNG MÀU SẮC CHUẨN
      colors: {
        hub: {
          blue: '#1CB0F6',
          'blue-dark': '#1899D6',
          'blue-bg': '#EAF6FE',
          'blue-border': '#BAE3FB',
          
          green: '#58CC02',
          'green-dark': '#46A302',
          'green-bg': '#F0FAE8',
          'green-border': '#bcf096',
          
          yellow: '#FFC200',
          'yellow-dark': '#D9A600',
          'yellow-bg': '#FFFBEA',
          'yellow-border': '#FFD8A8',
          
          purple: '#CE82FF',
          'purple-dark': '#B975E5',
          'purple-bg': '#F8EEFF',
          'purple-border': '#eec9ff',
          
          red: '#FF4B4B',
          'red-dark': '#E54343',
          'red-bg': '#fff0f0',
          'red-border': '#ffc1c1',
        },
        'primary-orange': '#f97316',
        'primary-yellow': '#fbbf24',
        'primary-dark': '#0f172a',
        grammar: {
          primary: '#00358E',
          'primary-hover': '#002a70',
          accent: '#FF7D00',
          'blue-light': '#e0eaff',
        },
      },

      borderWidth: {
        '3': '3px',
        '6': '6px',
      },

      animation: {
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 7s infinite', 
        'slide-down': 'slideDown 0.3s ease',
      },

      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  
  // Safelist giúp các class tạo động từ JS không bị xóa khi Build
  safelist: [
    { pattern: /^(text|bg|border)-hub-(blue|green|yellow|purple|red)(|-dark|-bg|-border)$/ },
  ],
  
  plugins: [
    function ({ addBase, addComponents, addUtilities }) {
      addBase({
        'html': { overflowX: 'hidden', width: '100%', maxWidth: '100vw' },
        'body': { overflowX: 'hidden', width: '100%', maxWidth: '100vw' },
      });

      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
        '.custom-scrollbar::-webkit-scrollbar': { width: '6px' },
        '.custom-scrollbar::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: '10px' },
      });

      // 🚀 COMPONENT CLASSES (Viết 1 lần dùng mãi mãi)
      addComponents({
        '.btn-3d': {
          '@apply flex items-center justify-center font-display font-black uppercase tracking-wider transition-all outline-none select-none active:translate-y-[2px]': {},
        },
        '.btn-3d-blue': {
          '@apply btn-3d bg-hub-blue text-white border-2 border-hub-blue-dark border-b-[4px] rounded-[16px] hover:bg-hub-blue-dark active:border-b-[2px]': {},
        },
        '.card-3d': {
          '@apply bg-white border-2 border-slate-200 border-b-[6px] rounded-[24px] shadow-sm': {},
        },
      });
    },
  ],
};
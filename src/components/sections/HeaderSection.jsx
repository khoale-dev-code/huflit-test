import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Zap, 
  BookOpen, 
  Headphones, 
  Play,
  ChevronRight,
  Star,
  Target,
  Trophy,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Styles Injection (Animations & Fonts) ---
const styleTag = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Quicksand:wght@700;800&display=swap');
  
  .font-quick { font-family: 'Quicksand', sans-serif; }
  .font-nunito { font-family: 'Nunito', sans-serif; }

  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(15px) rotate(-5deg); }
  }
  .animate-blob { animation: blob 7s infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }
  .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
`;

const HeaderSection = ({ isSignedIn, user, onStartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-[#F4F7FA] overflow-hidden selection:bg-blue-200 min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-16">
      <style>{styleTag}</style>

      {/* --- Dynamic Gamified Background --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Grid pattern giống giấy ô ly */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
        
        {/* Color Blobs */}
        <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-blue-300/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-[20%] right-[15%] w-72 h-72 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-1/2 w-80 h-80 bg-amber-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />

        {/* Floating Icons (Cảm giác Game) */}
        <div className="hidden md:flex absolute top-[25%] left-[10%] w-16 h-16 bg-white border-2 border-blue-200 border-b-[6px] rounded-[20px] items-center justify-center text-blue-500 animate-float-slow shadow-sm rotate-[-10deg]">
          <Headphones size={32} strokeWidth={2.5} />
        </div>
        <div className="hidden md:flex absolute top-[35%] right-[12%] w-14 h-14 bg-white border-2 border-amber-200 border-b-[6px] rounded-[16px] items-center justify-center text-amber-500 animate-float-delayed shadow-sm rotate-[12deg]">
          <Star size={28} fill="currentColor" />
        </div>
        <div className="hidden lg:flex absolute bottom-[25%] left-[15%] w-14 h-14 bg-white border-2 border-emerald-200 border-b-[6px] rounded-[16px] items-center justify-center text-emerald-500 animate-float-delayed shadow-sm rotate-[15deg]">
          <BookOpen size={26} strokeWidth={2.5} />
        </div>
      </div>

      {/* --- Center Hero Content --- */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        
        {/* Tagline Badge (3D Pill) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border-2 border-blue-200 border-b-[4px] text-blue-700 text-[13px] sm:text-[14px] font-quick font-bold mb-8 shadow-sm"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          Nền tảng luyện thi thông minh 2026
        </motion.div>

        {/* Big Headline (Chunky & Playful) */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="text-[40px] sm:text-[60px] md:text-[76px] font-quick font-black text-slate-800 tracking-tight leading-[1.1] mb-6 drop-shadow-sm"
        >
          Luyện HUBSTUDY <br />
          <span className="relative inline-block mt-2">
            <span className="text-[#1CB0F6] relative z-10">Không còn nỗi lo.</span>
            {/* Lượn sóng trang trí dưới chữ */}
            <svg className="absolute -bottom-3 left-0 w-full h-4 text-[#FFC800] z-0 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round"/></svg>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[16px] sm:text-[18px] md:text-[20px] text-slate-500 font-nunito font-bold max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Học như chơi, thi như thật! Trải nghiệm phòng thi ảo với ngân hàng đề cực khủng và AI phân tích điểm yếu thông minh.
        </motion.p>

        {/* Main CTA - Super Gamified Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative inline-block"
        >
          <button 
            onClick={onStartClick}
            className="group relative flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-[#58CC02] rounded-[24px] text-white font-quick font-black text-[18px] sm:text-[22px] uppercase tracking-wide border-2 border-[#46A302] border-b-[8px] hover:bg-[#46A302] hover:translate-y-[2px] hover:border-b-[6px] active:border-b-0 active:translate-y-[8px] transition-all outline-none shadow-[0_10px_20px_rgba(88,204,2,0.3)]"
          >
            <Play className="w-6 h-6 fill-white" strokeWidth={2} />
            Bắt đầu thi thử ngay
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform hidden sm:block" strokeWidth={4} />
          </button>
        </motion.div>

        {/* Stats Strip (Flashcards 3D) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-2 flex flex-wrap justify-center gap-4 sm:gap-6"
        >
          {[
            { icon: FileText, value: '500+', label: 'ĐỀ THI', color: 'text-[#1CB0F6]', bg: 'bg-[#EAF6FE]', border: 'border-[#BAE3FB]' },
            { icon: Target, value: '24/7', label: 'HỖ TRỢ', color: 'text-[#FF9600]', bg: 'bg-[#fff4e5]', border: 'border-[#ffdfb2]' },
            { icon: Trophy, value: 'Top 1', label: 'UY TÍN', color: 'text-[#58CC02]', bg: 'bg-[#f1faeb]', border: 'border-[#bcf096]' },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 md:gap-4 bg-white px-5 sm:px-6 py-3 sm:py-4 rounded-[20px] border-2 border-slate-200 border-b-[4px] hover:-translate-y-1 transition-transform shadow-sm min-w-[140px] sm:min-w-[180px] justify-center md:justify-start">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] ${stat.bg} border-2 ${stat.border} flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-[20px] sm:text-[24px] font-quick font-black text-slate-800 leading-none mb-1">{stat.value}</p>
                <p className="text-[10px] sm:text-[11px] font-quick font-extrabold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default HeaderSection;
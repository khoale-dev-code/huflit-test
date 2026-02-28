import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Zap, 
  BookOpen, 
  Headphones, 
  Play,
  Award,
  ChevronRight,
  User,
  LogOut,
  Settings
} from 'lucide-react';

// --- Styles Injection (Cho Animation mượt mà) ---
const styleTag = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }
  .animate-blob { animation: blob 7s infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }
  .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
`;

// --- Main Header (FIXED - Xóa orbiting cards) ---
const HeaderSection = ({ isSignedIn, user, authProvider }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-b from-slate-50 via-blue-50/30 to-white font-sans selection:bg-blue-200">
      <style>{styleTag}</style>

      {/* --- Dynamic Background (Màu sắc nhẹ nhàng) --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Grid nền nhẹ */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Các quả cầu màu di chuyển (Blobs) */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* --- Center Hero Content --- */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-16 sm:py-20 md:py-24">
        
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-6 animate-float-slow">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          Nền tảng luyện thi thông minh 2026
        </div>

        {/* Big Headline - CENTERED */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
          Luyện thi HUFLIT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">
            Không còn nỗi lo.
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Trải nghiệm phòng thi ảo sát thực tế. Ngân hàng đề thi phong phú và phân tích điểm yếu bằng công nghệ AI.
        </p>

        {/* Main CTA - Glow Effect */}
        <div className="relative group inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-200"></div>
          <button className="relative flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white rounded-xl leading-none text-slate-900 font-bold border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span className="text-sm sm:text-lg">Bắt đầu thi thử ngay</span>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform hidden sm:inline-flex flex-shrink-0" />
          </button>
        </div>

        {/* Stats Strip (Mobile Friendly) */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-16">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">500+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide mt-1">Đề thi</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">24/7</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide mt-1">Hỗ trợ</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-slate-900">Top 1</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide mt-1">Uy tín</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HeaderSection;
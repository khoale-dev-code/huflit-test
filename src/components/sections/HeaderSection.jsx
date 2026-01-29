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

// --- Floating Card Component (Vệ tinh) ---
const OrbitCard = ({ icon: Icon, title, subtitle, className, delayClass }) => (
  <div className={`
    absolute hidden lg:flex items-center gap-3 p-3 rounded-2xl 
    bg-white/80 backdrop-blur-md border border-white/50 shadow-lg shadow-blue-500/5
    hover:scale-110 transition-transform duration-300 cursor-default select-none
    ${className} ${delayClass}
  `}>
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center text-blue-600">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{subtitle}</p>
      <p className="text-sm font-bold text-slate-700">{title}</p>
    </div>
  </div>
);

// --- Main Header ---
const HeaderSection = ({ isSignedIn, user, authProvider }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-slate-50 font-sans selection:bg-blue-200">
      <style>{styleTag}</style>

      {/* --- 1. Dynamic Background (Màu Prep nhưng sống động) --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Grid nền nhẹ */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Các quả cầu màu di chuyển (Blobs) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* --- 3. Center Hero Content (Trái tim của giao diện) --- */}
      <div className="relative z-10 text-center max-w-4xl px-4 mt-16 sm:mt-0">
        
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8 animate-float-slow">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          Nền tảng luyện thi thông minh 2026
        </div>

        {/* Big Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
          Luyện thi HUFLIT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-blob">
            Không còn nỗi lo.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Trải nghiệm phòng thi ảo sát thực tế. Ngân hàng đề thi phong phú và phân tích điểm yếu bằng công nghệ AI.
        </p>

        {/* Main CTA - Glow Effect */}
        <div className="relative group inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-200"></div>
          <button className="relative flex items-center gap-3 px-8 py-4 bg-white rounded-xl leading-none text-slate-900 font-bold border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span className="text-lg">Bắt đầu thi thử ngay</span>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats Strip (Mobile Friendly) */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-wrap justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">500+</p>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Đề thi</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">24/7</p>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Hỗ trợ</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">Top 1</p>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Uy tín</p>
          </div>
        </div>

      </div>

      {/* --- 4. Orbiting Elements (Vệ tinh trang trí) --- */}
      {/* Vị trí được đặt absolute so với khung hình, tạo cảm giác bao quanh nội dung */}
      
      {/* Trái Trên: Listening */}
      <OrbitCard 
        icon={Headphones} 
        title="Listening Part 1" 
        subtitle="Đang luyện"
        className="top-[20%] left-[10%] -rotate-6"
        delayClass="animate-float-slow"
      />

      {/* Phải Trên: Reading */}
      <OrbitCard 
        icon={BookOpen} 
        title="Reading Part 4" 
        subtitle="Mới nhất"
        className="top-[25%] right-[10%] rotate-3"
        delayClass="animate-float-delayed"
      />

      {/* Trái Dưới: Điểm số */}
      <OrbitCard 
        icon={Award} 
        title="Target: 9.0" 
        subtitle="Mục tiêu"
        className="bottom-[20%] left-[15%] rotate-6"
        delayClass="animate-float-delayed"
      />

      {/* Phải Dưới: Streak */}
      <OrbitCard 
        icon={Zap} 
        title="5 Ngày Streak" 
        subtitle="Chăm chỉ"
        className="bottom-[25%] right-[12%] -rotate-3"
        delayClass="animate-float-slow"
      />

    </div>
  );
};

export default HeaderSection;
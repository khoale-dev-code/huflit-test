/**
 * NotFoundPage — Trang 404
 * Style: Gamification 3D (Duolingo-inspired), bright pastel, tactile depth
 * React 21 — không cần useCallback/memo thủ công
 */

import { useState, useEffect } from 'react';
import { Home, ArrowLeft, Rocket, Star } from 'lucide-react';

/* ─── Particle: ngôi sao nổi ──────────────────────────────────── */
function StarParticle({ x, y, size, delay, color }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top:  `${y}%`,
        width: size,
        height: size,
        background: color,
        animation: `twinkle ${2 + delay}s ease-in-out ${delay}s infinite`,
        opacity: 0,
      }}
    />
  );
}

/* ─── Floating Orb: quả cầu nền ──────────────────────────────── */
function FloatOrb({ cx, cy, size, color, duration, delay }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none blur-[60px]"
      style={{
        left: `${cx}%`,
        top:  `${cy}%`,
        width: size,
        height: size,
        background: color,
        opacity: 0.18,
        transform: 'translate(-50%,-50%)',
        animation: `orbFloat ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

/* ─── Meteor streak ───────────────────────────────────────────── */
function MeteorStreak({ top, delay }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top:    `${top}%`,
        right:  '-20px',
        width:  '120px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #FFD666, #FF9600)',
        borderRadius: '99px',
        animation: `meteorFly 1.8s ease-in ${delay}s forwards`,
        opacity: 0,
      }}
    />
  );
}

/* ─── Main 404 Character: Duolingo-style owl bobbing ─────────── */
function LostCharacter() {
  return (
    <div className="relative flex items-center justify-center" style={{ animation: 'charFloat 3s ease-in-out infinite' }}>
      {/* Glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 160, height: 160,
          background: 'radial-gradient(circle, rgba(28,176,246,0.15) 0%, transparent 70%)',
          animation: 'glowPulse 2.5s ease-in-out infinite',
        }}
      />

      {/* Body card — 3D tactile */}
      <div
        className="relative w-32 h-32 rounded-[28px] flex items-center justify-center text-6xl select-none"
        style={{
          background: 'linear-gradient(145deg, #EAF6FE 0%, #D6EEFB 100%)',
          border: '2.5px solid #BAE3FB',
          borderBottom: '6px solid #7EC8F0',
          boxShadow: '0 4px 0 #7EC8F0, 0 8px 24px rgba(28,176,246,0.12)',
        }}
      >
        {/* Wiggle arm */}
        <div
          className="absolute -right-5 top-1/2 text-3xl"
          style={{ transform: 'translateY(-50%)', animation: 'armWave 1.4s ease-in-out infinite' }}
        >
          👋
        </div>
        {/* Face */}
        <span style={{ animation: 'eyeBlink 4s steps(1) infinite' }}>🧑‍🚀</span>
      </div>

      {/* Speech bubble */}
      <div
        className="absolute -top-14 left-1/2 px-4 py-2 rounded-[16px] whitespace-nowrap text-[13px] font-black text-slate-700"
        style={{
          transform: 'translateX(-50%)',
          background: 'white',
          border: '2px solid #e2e8f0',
          borderBottom: '4px solid #e2e8f0',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          animation: 'bubblePop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.4s both',
        }}
      >
        Bạn lạc rồi! 😭
        {/* Bubble tail */}
        <div
          className="absolute left-1/2 -bottom-[10px]"
          style={{
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '10px solid #e2e8f0',
          }}
        />
        <div
          className="absolute left-1/2 -bottom-[7px]"
          style={{
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '9px solid white',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Score Badge (gamified 404 number) ──────────────────────── */
function ErrorCode() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      {['4', '0', '4'].map((digit, i) => (
        <div
          key={i}
          className="w-20 h-24 sm:w-24 sm:h-28 rounded-[22px] flex items-center justify-center text-5xl sm:text-6xl font-black select-none"
          style={{
            background: i === 1 ? '#EAF6FE' : i === 0 ? '#F8EEFF' : '#FFF8EA',
            border: `2.5px solid ${i === 1 ? '#BAE3FB' : i === 0 ? '#ddb8ff' : '#FFD8A8'}`,
            borderBottom: `6px solid ${i === 1 ? '#7EC8F0' : i === 0 ? '#B975E5' : '#FF9600'}`,
            color: i === 1 ? '#1CB0F6' : i === 0 ? '#CE82FF' : '#FF9600',
            boxShadow: `0 4px 0 ${i === 1 ? '#7EC8F0' : i === 0 ? '#B975E5' : '#FF9600'}22`,
            animation: `cardPop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + i * 0.12}s both`,
          }}
        >
          {digit}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════════════ */
export default function NotFoundPage() {
  const [stars]       = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x:    Math.random() * 100,
      y:    Math.random() * 100,
      size: `${Math.random() * 4 + 2}px`,
      delay: Math.random() * 3,
      color: ['#1CB0F6', '#CE82FF', '#FF9600', '#58CC02', '#FFD666'][i % 5],
    }))
  );

  const [meteors, setMeteors] = useState([]);
  const [flash,   setFlash]   = useState(false);
  const [score,   setScore]   = useState(0);

  /* Meteor periodically */
  useEffect(() => {
    const id = setInterval(() => {
      const m = { id: Date.now(), top: 10 + Math.random() * 60, delay: 0 };
      setMeteors((p) => [...p, m]);
      setTimeout(() => setMeteors((p) => p.filter((x) => x.id !== m.id)), 2200);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  /* Space bar flash easter egg */
  useEffect(() => {
    const fn = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setFlash(true);
        setScore((s) => s + 10);
        setTimeout(() => setFlash(false), 400);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative transition-colors duration-300"
      style={{
        fontFamily: '"Nunito", "Baloo 2", sans-serif',
        background: flash ? '#FFF8C4' : '#F4F7FA',
      }}
    >
      {/* ── Ambient orbs ── */}
      <FloatOrb cx={15}  cy={20}  size={320} color="#CE82FF" duration={8}  delay={0} />
      <FloatOrb cx={85}  cy={15}  size={280} color="#1CB0F6" duration={10} delay={2} />
      <FloatOrb cx={50}  cy={90}  size={360} color="#FF9600" duration={9}  delay={1} />

      {/* ── Twinkling stars ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {stars.map((s) => <StarParticle key={s.id} {...s} />)}
        {meteors.map((m) => <MeteorStreak key={m.id} top={m.top} delay={0} />)}
      </div>

      {/* ── Space score easter egg pill ── */}
      {score > 0 && (
        <div
          className="fixed top-5 right-5 flex items-center gap-2 px-4 py-2 rounded-[14px] text-[13px] font-black text-[#FF9600] z-50"
          style={{
            background: '#FFF8EA',
            border: '2px solid #FFD8A8',
            borderBottom: '4px solid #FF9600',
            boxShadow: '0 2px 12px rgba(255,150,0,0.15)',
            animation: 'cardPop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <Star size={14} strokeWidth={2.5} fill="#FF9600" /> {score} pts
        </div>
      )}

      {/* ── Main card ── */}
      <div
        className="relative z-10 w-full max-w-md"
        style={{
          animation: 'pageEntrance 0.7s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        {/* Big white card */}
        <div
          className="bg-white rounded-[32px] p-8 text-center"
          style={{
            border: '2.5px solid #e2e8f0',
            borderBottom: '6px solid #cbd5e1',
            boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
          }}
        >
          {/* Character */}
          <div className="flex justify-center mb-2">
            <LostCharacter />
          </div>

          {/* 404 Digit cards */}
          <ErrorCode />

          {/* Copy */}
          <h1
            className="text-[22px] sm:text-[26px] font-black text-slate-800 leading-tight mb-2"
            style={{ letterSpacing: '-0.02em' }}
          >
            Ê! Bạn lạc vào vũ trụ rồi 🚀
          </h1>
          <p className="text-[14px] font-bold text-slate-400 leading-relaxed mb-8 max-w-xs mx-auto">
            Trang này không tồn tại. Học bài mà để tui bơ vơ lâu quá vậy — bấm vào nút bên dưới nha! 😭
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[16px] text-[14px] font-black text-white uppercase tracking-wider transition-all outline-none"
              style={{
                background: '#1CB0F6',
                border: '2px solid #0d8ecf',
                borderBottom: '5px solid #0d8ecf',
                boxShadow: '0 2px 12px rgba(28,176,246,0.25)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
              onMouseDown={e  => e.currentTarget.style.transform = 'translateY(2px)'}
            >
              <Home size={17} strokeWidth={2.5} />
              Về trang chủ
            </a>

            <button
              onClick={() => window.history.back()}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[16px] text-[14px] font-black text-slate-600 uppercase tracking-wider transition-all outline-none"
              style={{
                background: '#f8fafc',
                border: '2px solid #e2e8f0',
                borderBottom: '5px solid #e2e8f0',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
              onMouseDown={e  => e.currentTarget.style.transform = 'translateY(2px)'}
            >
              <ArrowLeft size={17} strokeWidth={2.5} />
              Quay lại
            </button>
          </div>
        </div>

        {/* Easter egg hint */}
        <div
          className="mt-4 flex items-center justify-center gap-2 text-[12px] font-bold text-slate-400 cursor-default select-none"
          style={{ animation: 'fadeInUp 0.6s ease 1s both' }}
        >
          <Rocket size={13} strokeWidth={2.5} />
          Nhấn <kbd className="px-1.5 py-0.5 rounded-[6px] bg-white border border-slate-200 text-[11px] font-black text-slate-500 mx-1">Space</kbd>
          để nhận điểm thưởng ⭐
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50%       { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(-50%,-50%) scale(1); }
          50%       { transform: translate(-50%,-55%) scale(1.06); }
        }
        @keyframes meteorFly {
          0%   { transform: translateX(0)   rotate(-15deg); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateX(-110vw) rotate(-15deg); opacity: 0; }
        }
        @keyframes charFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes armWave {
          0%, 100% { transform: translateY(-50%) rotate(-10deg); }
          50%       { transform: translateY(-50%) rotate(20deg); }
        }
        @keyframes eyeBlink {
          0%, 92%, 100% { opacity: 1; }
          94%, 98%      { opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.12; }
          50%       { transform: translate(-50%,-50%) scale(1.2); opacity: 0.22; }
        }
        @keyframes bubblePop {
          from { transform: translateX(-50%) scale(0.5); opacity: 0; }
          to   { transform: translateX(-50%) scale(1);   opacity: 1; }
        }
        @keyframes cardPop {
          from { transform: scale(0.7) translateY(20px); opacity: 0; }
          to   { transform: scale(1)   translateY(0);    opacity: 1; }
        }
        @keyframes pageEntrance {
          from { transform: scale(0.92) translateY(24px); opacity: 0; }
          to   { transform: scale(1)    translateY(0);    opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(12px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
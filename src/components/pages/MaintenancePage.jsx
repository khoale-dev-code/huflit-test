/**
 * MaintenancePage — Trang bảo trì hệ thống
 * Connected to Firestore for dynamic config, countdown, notification signup
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Wrench, Mail, Phone, MessageCircle, Zap, Shield, Sparkles, Clock, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import { maintenanceService } from '../../services/maintenanceService';

/* ─── Floating Orb ──────────────────────────────────────────── */
function FloatOrb({ cx, cy, size, color, duration, delay }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none blur-[80px]"
      style={{
        left: `${cx}%`, top: `${cy}%`, width: size, height: size,
        background: color, opacity: 0.15, transform: 'translate(-50%,-50%)',
        animation: `orbFloat ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

/* ─── Particle ──────────────────────────────────────────────── */
function Particle({ x, y, size, color, duration, delay }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`, top: `${y}%`, width: size, height: size,
        background: color, opacity: 0.3,
        animation: `particleFloat ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

/* ─── Gear SVGs ─────────────────────────────────────────────── */
function GearLarge() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ animation: 'rotateGear 8s linear infinite' }}>
      <defs>
        <linearGradient id="gearGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#gearGrad1)" strokeWidth="2" strokeLinecap="round">
        <path d="M50 10 L54 2 L58 10 M50 90 L54 98 L58 90 M10 50 L2 54 L10 58 M90 50 L98 54 L90 58 M22 22 L16 16 L28 16 M78 22 L84 16 L72 16 M22 78 L16 84 L28 84 M78 78 L84 84 L72 84" />
        <circle cx="50" cy="50" r="35" /><circle cx="50" cy="50" r="22" /><circle cx="50" cy="50" r="8" />
      </g>
    </svg>
  );
}

function GearSmall() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ animation: 'rotateGearReverse 6s linear infinite' }}>
      <defs>
        <linearGradient id="gearGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#gearGrad2)" strokeWidth="2" strokeLinecap="round">
        <path d="M50 5 L53 0 L56 5 M50 95 L53 100 L56 95 M5 50 L0 53 L5 56 M95 50 L100 53 L95 56" />
        <circle cx="50" cy="50" r="32" /><circle cx="50" cy="50" r="20" /><circle cx="50" cy="50" r="7" />
      </g>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════════════ */
export default function MaintenancePage() {
  const [config, setConfig] = useState(null);
  const [email, setEmail] = useState('');
  const [notifyStatus, setNotifyStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = maintenanceService.subscribeToConfig(setConfig);
    return () => unsub();
  }, []);

  /* ── Particles ── */
  const particles = useMemo(
    () => Array.from({ length: 25 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: `${Math.random() * 4 + 2}px`,
      color: ['rgba(167,139,250,0.4)', 'rgba(96,165,250,0.4)', 'rgba(52,211,153,0.3)', 'rgba(245,87,108,0.3)'][i % 4],
      duration: Math.random() * 10 + 10, delay: Math.random() * 10,
    })), []
  );

  /* ── Countdown ── */
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    if (!config?.estimatedEndTime) return;
    const end = new Date(config.estimatedEndTime).getTime();
    const updateRemaining = () => {
      const diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setRemaining(diff);
    };
    updateRemaining();
    const id = setInterval(updateRemaining, 1000);
    return () => clearInterval(id);
  }, [config?.estimatedEndTime]);

  const hours = String(Math.floor(remaining / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');
  const showCountdown = remaining > 0;

  /* ── Notify handler ── */
  const handleNotify = useCallback(async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    const result = await maintenanceService.subscribeToNotifications(email.trim());
    setNotifyStatus(result);
    setSubmitting(false);
    if (result.success) setEmail('');
  }, [email]);

  const message = config?.message || 'Hệ thống đang được bảo trì. Vui lòng quay lại sau!';
  const contactEmail = config?.contactEmail || 'support@example.com';
  const contactPhone = config?.contactPhone || '';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative" style={{ fontFamily: '"Nunito", sans-serif', background: '#0a0a1a' }}>
      {/* ── Ambient orbs ── */}
      <FloatOrb cx={10} cy={15} size={400} color="linear-gradient(135deg, #667eea, #764ba2)" duration={20} delay={0} />
      <FloatOrb cx={90} cy={85} size={350} color="linear-gradient(135deg, #f093fb, #f5576c)" duration={20} delay={-5} />
      <FloatOrb cx={50} cy={50} size={300} color="linear-gradient(135deg, #4facfe, #00f2fe)" duration={20} delay={-10} />
      <FloatOrb cx={80} cy={20} size={250} color="linear-gradient(135deg, #43e97b, #38f9d7)" duration={20} delay={-15} />

      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom, #1a1a3e 0%, #0a0a1a 70%)' }} />
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="fixed inset-0 pointer-events-none z-[2]">
        {particles.map((p) => <Particle key={p.id} {...p} />)}
      </div>

      {/* ── Main Card ── */}
      <div className="relative z-10 w-full max-w-2xl" style={{ animation: 'cardAppear 1s ease-out' }}>
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', animation: 'shimmer 3s ease-in-out infinite' }} />

          {/* ── Gear Animation ── */}
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 flex items-center justify-center"><div className="w-[90px] h-[90px]"><GearLarge /></div></div>
            <div className="absolute top-2 right-0 w-14 h-14"><GearSmall /></div>
            <div className="absolute bottom-0 right-0" style={{ animation: 'wrenchBounce 2s ease-in-out infinite' }}>
              <Wrench className="w-6 h-6 text-emerald-400" strokeWidth={2.5} />
            </div>
          </div>

          {/* ── Status Badge ── */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6" style={{ background: 'rgba(255,193,7,0.15)', border: '1px solid rgba(255,193,7,0.3)', animation: 'badgePulse 2s ease-in-out infinite' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" style={{ animation: 'dotPulse 1.5s ease-in-out infinite' }} />
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Đang bảo trì</span>
          </div>

          {/* ── Title ── */}
          <h1 className="text-3xl sm:text-[42px] font-extrabold leading-tight mb-3" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Hệ thống đang được bảo trì
          </h1>

          {/* ── Message ── */}
          <p className="text-base text-white/60 leading-relaxed mb-10 max-w-lg mx-auto">
            {message}
            <span className="inline-flex gap-1 ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" style={{ animation: 'loadDot 1.4s ease-in-out infinite' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" style={{ animation: 'loadDot 1.4s ease-in-out 0.2s infinite' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" style={{ animation: 'loadDot 1.4s ease-in-out 0.4s infinite' }} />
            </span>
          </p>

          {/* ── Countdown ── */}
          {showCountdown && (
            <div className="mb-10">
              <div className="flex items-center justify-center gap-2 text-xs text-white/50 font-semibold uppercase tracking-widest mb-5">
                <Clock className="w-4 h-4" /> Thời gian dự kiến hoàn thành
              </div>
              <div className="flex justify-center gap-3 sm:gap-4">
                {[
                  { value: hours, label: 'Giờ' },
                  { value: minutes, label: 'Phút' },
                  { value: seconds, label: 'Giây' },
                ].map((item, i) => (
                  <div key={i} className="relative rounded-2xl px-4 py-5 min-w-[80px] sm:min-w-[90px]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #667eea, #a78bfa)' }} />
                    <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>{item.value}</div>
                    <div className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Features ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {[
              { icon: <Zap className="w-7 h-7 text-yellow-400" />, title: 'Tốc độ tốt hơn', desc: 'Tối ưu hiệu suất hệ thống' },
              { icon: <Shield className="w-7 h-7 text-blue-400" />, title: 'Bảo mật nâng cao', desc: 'Cập nhật bảo mật mới nhất' },
              { icon: <Sparkles className="w-7 h-7 text-purple-400" />, title: 'Tính năng mới', desc: 'Thêm nhiều cải tiến hấp dẫn' },
            ].map((feat, i) => (
              <div key={i} className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div className="mb-3">{feat.icon}</div>
                <h4 className="text-sm font-semibold text-white/85 mb-1">{feat.title}</h4>
                <p className="text-xs text-white/40">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Notification Signup ── */}
          <div className="mb-10 p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-center gap-2 text-xs text-white/50 font-semibold uppercase tracking-widest mb-4">
              <Bell className="w-4 h-4" /> Nhận thông báo khi hệ thống hoạt động lại
            </div>
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setNotifyStatus(null); }}
                placeholder="Nhập email của bạn..."
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
              <button type="submit" disabled={submitting}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #667eea, #a78bfa)', border: '1px solid rgba(167,139,250,0.3)' }}
              >
                {submitting ? 'Đang gửi...' : 'Thông báo cho tôi'}
              </button>
            </form>
            {notifyStatus && (
              <div className={`flex items-center justify-center gap-2 mt-3 text-sm font-medium ${notifyStatus.success ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {notifyStatus.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {notifyStatus.message}
              </div>
            )}
          </div>

          {/* ── Contact ── */}
          <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-center gap-2 text-xs text-white/50 font-semibold uppercase tracking-widest mb-5">
              <Phone className="w-4 h-4" /> Liên hệ hỗ trợ
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(96,165,250,0.2)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(96,165,250,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(96,165,250,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Mail className="w-4 h-4" /> Email Hỗ Trợ
              </a>
              {contactPhone && (
                <a href={`tel:${contactPhone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(52,211,153,0.2)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(52,211,153,0.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(52,211,153,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <Phone className="w-4 h-4" /> Hotline
                </a>
              )}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: '#a78bfa' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(167,139,250,0.2)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(167,139,250,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(167,139,250,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <MessageCircle className="w-4 h-4" /> Fanpage
              </a>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="mt-6 text-xs text-white/25">
            Được tạo với <span className="inline-block text-red-400" style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}>❤</span> bởi <strong className="text-white/40">HubStudy</strong> &copy; 2025
          </div>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes orbFloat { 0%,100%{transform:translate(-50%,-50%) scale(1)} 25%{transform:translate(calc(-50% + 50px),calc(-50% - 50px)) scale(1.1)} 50%{transform:translate(calc(-50% - 30px),calc(-50% + 30px)) scale(0.9)} 75%{transform:translate(calc(-50% + 40px),calc(-50% + 20px)) scale(1.05)} }
        @keyframes particleFloat { 0%,100%{transform:translate(0,0)} 33%{transform:translate(30px,-40px)} 66%{transform:translate(-20px,30px)} }
        @keyframes rotateGear { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes rotateGearReverse { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes wrenchBounce { 0%,100%{transform:rotate(-15deg) translateY(0)} 50%{transform:rotate(15deg) translateY(-5px)} }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes cardAppear { from{opacity:0;transform:translateY(40px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes badgePulse { 0%,100%{background:rgba(255,193,7,0.15)} 50%{background:rgba(255,193,7,0.25)} }
        @keyframes dotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,193,7,0.5)} 50%{box-shadow:0 0 0 8px rgba(255,193,7,0)} }
        @keyframes progressGradient { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes progressShine { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes loadDot { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
      `}</style>
    </div>
  );
}

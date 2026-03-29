/**
 * MaintenancePage — Trang bảo trì hệ thống (Gamification 3D Style)
 * Clean Code: 100% Tailwind CSS, No inline styles, Componentized
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Wrench, Mail, Phone, MessageCircle, Zap, Shield, Sparkles, Clock, Bell, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { maintenanceService } from '../../services/maintenanceService';

/* ─── 1. SUB-COMPONENTS (Tách nhỏ để Clean Code) ─────────────────────── */

const CloudBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[10%] left-[10%] w-24 sm:w-32 h-12 sm:h-16 bg-white/60 rounded-full blur-[2px] animate-[float_8s_ease-in-out_infinite]" />
    <div className="absolute top-[30%] right-[10%] w-32 sm:w-48 h-16 sm:h-24 bg-white/50 rounded-full blur-[3px] animate-[float_12s_ease-in-out_infinite_reverse]" />
    <div className="absolute bottom-[20%] left-[20%] w-28 sm:w-40 h-14 sm:h-20 bg-white/60 rounded-full blur-[2px] animate-[float_10s_ease-in-out_infinite]" />
    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-48 sm:w-64 h-24 sm:h-32 bg-blue-100/40 rounded-full blur-[30px] sm:blur-[40px] animate-[pulseBg_6s_ease-in-out_infinite]" />
  </div>
);

const CountdownBox = ({ value, label, color, bg, border }) => (
  <div className={`flex flex-1 max-w-[80px] sm:max-w-[100px] flex-col items-center justify-center py-3 sm:py-5 rounded-[16px] sm:rounded-[20px] border-2 border-b-[4px] sm:border-b-[6px] ${bg} ${border}`}>
    <span className={`text-2xl sm:text-3xl md:text-4xl font-black ${color} tabular-nums leading-none`}>
      {value}
    </span>
    <span className="text-[10px] sm:text-[12px] font-bold text-slate-500 uppercase mt-1.5 sm:mt-2">
      {label}
    </span>
  </div>
);

const FeatureCard = ({ icon, color, bg, title, desc }) => {
  const Icon = icon;
  return (
    <div className="flex sm:flex-col items-center text-left sm:text-center p-3 sm:p-4 rounded-[16px] sm:rounded-[20px] bg-slate-50 border-2 border-slate-100 hover:border-slate-200 transition-colors">
      <div className={`w-10 h-10 sm:mb-3 shrink-0 rounded-[12px] ${bg} ${color} flex items-center justify-center mr-3 sm:mr-0`}>
        <Icon size={20} strokeWidth={3} />
      </div>
      <div>
        <h4 className="text-[14px] font-black text-slate-700 sm:mb-0.5">{title}</h4>
        <p className="text-[12px] font-bold text-slate-500 hidden sm:block">{desc}</p>
      </div>
    </div>
  );
};

const ContactButton = ({ href, icon, colorClass, textMobile, textDesktop }) => {
  const Icon = icon;
  return (
    <a 
      href={href} 
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 bg-white border-2 border-slate-200 border-b-[3px] rounded-[12px] text-slate-500 ${colorClass} active:translate-y-[1px] active:border-b-[2px] transition-all font-bold text-[12px] sm:text-[13px] min-h-[44px]`}
    >
      <Icon size={16} strokeWidth={2.5} /> 
      <span className="hidden sm:inline">{textDesktop}</span>
      <span className="sm:hidden">{textMobile}</span>
    </a>
  );
};

/* ════════════════════════════════════════════════════════════════
   2. MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function MaintenancePage() {
  const [config, setConfig] = useState(null);
  const [email, setEmail] = useState('');
  const [notifyStatus, setNotifyStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [remaining, setRemaining] = useState(0);

  // Fetch Config
  useEffect(() => {
    const unsub = maintenanceService.subscribeToConfig(setConfig);
    return () => unsub();
  }, []);

  // Countdown Logic
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

  // Handle Form Submit
  const handleNotify = useCallback(async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setSubmitting(true);
    setNotifyStatus(null);
    try {
      const result = await maintenanceService.subscribeToNotifications(email.trim());
      setNotifyStatus(result);
      if (result.success) setEmail('');
    } catch {
      setNotifyStatus({ success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
    } finally {
      setSubmitting(false);
    }
  }, [email]);

  const message = config?.message || 'Chúng tôi đang nâng cấp hệ thống để mang lại trải nghiệm học tập tuyệt vời hơn cho bạn!';
  const contactEmail = config?.contactEmail || 'support@hubstudy.edu.vn';
  const contactPhone = config?.contactPhone || '0123 456 789';

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F4F7FA] relative font-['Nunito','Quicksand',sans-serif] selection:bg-blue-200 text-slate-800 overflow-hidden">
      
      <CloudBackground />

      <Motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full max-w-[640px] bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-slate-200 border-b-[6px] sm:border-b-[8px] max-h-[90dvh] overflow-y-auto custom-scrollbar"
      >
        
        {/* Header: Icon & Status */}
        <div className="flex flex-col items-center mb-6 sm:mb-8 mt-2">
          <Motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 sm:w-24 sm:h-24 mb-5 bg-[#EAF6FE] rounded-full border-4 border-[#BAE3FB] flex items-center justify-center shadow-inner shrink-0"
          >
            <Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-[#1CB0F6]" strokeWidth={2.5} />
          </Motion.div>

          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#FFC800]/10 border-2 border-[#FFC800]/30 rounded-full">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC800] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#FFC800]"></span>
            </span>
            <span className="text-[#E5B400] text-[11px] sm:text-[13px] font-black uppercase tracking-wider">Đang bảo trì</span>
          </div>
        </div>

        {/* Title & Message */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-slate-800 mb-3 sm:mb-4 leading-tight">
            Chúng tôi đang <span className="text-[#1CB0F6]">nâng cấp</span>!
          </h1>
          <p className="text-[14px] sm:text-[16px] font-bold text-slate-500 max-w-md mx-auto leading-relaxed px-2">
            {message}
          </p>
        </div>

        {/* Countdown Timer */}
        {showCountdown && (
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-2 text-[11px] sm:text-[12px] text-slate-400 font-black uppercase tracking-widest mb-3 sm:mb-4">
              <Clock size={16} strokeWidth={3} /> Dự kiến hoàn thành
            </div>
            <div className="flex justify-center gap-2 sm:gap-4 md:gap-5">
              <CountdownBox value={hours} label="Giờ" color="text-[#1CB0F6]" bg="bg-[#EAF6FE]" border="border-[#BAE3FB]" />
              <CountdownBox value={minutes} label="Phút" color="text-[#58CC02]" bg="bg-emerald-50" border="border-emerald-200" />
              <CountdownBox value={seconds} label="Giây" color="text-[#FF9600]" bg="bg-[#FFC800]/10" border="border-[#FFC800]/40" />
            </div>
          </div>
        )}

        {/* Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          <FeatureCard icon={Zap} color="text-[#FF9600]" bg="bg-[#FFC800]/10" title="Siêu tốc độ" desc="Tối ưu hiệu năng" />
          <FeatureCard icon={Shield} color="text-[#1CB0F6]" bg="bg-[#EAF6FE]" title="Bảo mật cao" desc="An toàn dữ liệu" />
          <FeatureCard icon={Sparkles} color="text-[#58CC02]" bg="bg-emerald-50" title="Tính năng mới" desc="Trải nghiệm thú vị" />
        </div>

        {/* Notification Form */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] border-2 border-slate-200 mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-[13px] text-slate-600 font-black uppercase tracking-wider mb-3 sm:mb-4 text-center">
            <Bell size={16} strokeWidth={3} className="text-[#FF9600] shrink-0" /> Nhận thông báo khi hoàn tất
          </div>
          <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setNotifyStatus(null); }}
              placeholder="Nhập email của bạn..."
              required
              className="flex-1 w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border-2 border-slate-200 rounded-[14px] sm:rounded-[16px] text-[16px] sm:text-[15px] font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-50 transition-all min-h-[48px]"
            />
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white text-[14px] sm:text-[15px] font-black uppercase tracking-wider rounded-[14px] sm:rounded-[16px] border-2 border-[#1899D6] border-b-[4px] active:border-b-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 min-h-[48px] flex items-center justify-center"
            >
              {submitting ? 'Đang gửi...' : 'Đăng ký'}
            </button>
          </form>
          
          <AnimatePresence>
            {notifyStatus && (
              <Motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className={`flex items-center justify-center gap-2 mt-3 sm:mt-4 text-[13px] sm:text-[14px] font-bold text-center ${notifyStatus.success ? 'text-[#58CC02]' : 'text-[#FF4B4B]'}`}
              >
                {notifyStatus.success ? <CheckCircle size={18} strokeWidth={3} className="shrink-0" /> : <AlertTriangle size={18} strokeWidth={3} className="shrink-0" />}
                <span>{notifyStatus.message}</span>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Footer */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <ContactButton href={`mailto:${contactEmail}`} icon={Mail} colorClass="hover:text-[#1CB0F6] hover:border-blue-200" textMobile="Email" textDesktop="Email hỗ trợ" />
          {contactPhone && (
            <ContactButton href={`tel:${contactPhone}`} icon={Phone} colorClass="hover:text-[#58CC02] hover:border-emerald-200" textMobile="Gọi" textDesktop="Hotline" />
          )}
          <ContactButton href="https://facebook.com" icon={MessageCircle} colorClass="hover:text-[#FF9600] hover:border-[#FFC800]/50" textMobile="Fanpage" textDesktop="Fanpage" />
        </div>

      </Motion.div>

      {/* ── MẢNG CSS DUY NHẤT (Cho Keyframes & Scrollbar Webkit) ── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes pulseBg {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.7; transform: translateX(-50%) scale(1.1); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}
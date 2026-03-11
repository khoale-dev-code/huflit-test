import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  Mail, Phone, MapPin, Facebook, Youtube, MessageCircle,
  BookOpen, Zap, Users, HelpCircle, Send,
  ChevronRight, Heart, TrendingUp, Award, Github,
  Sparkles, ExternalLink, Rocket, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SUB-COMPONENTS (GAMIFIED) ---

const FooterCard = memo(({ title, children, icon: Icon, iconColor, iconBg, borderDark }) => (
  <div className="flex flex-col gap-5">
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center border-b-[4px] shadow-sm ${iconBg} ${iconColor} ${borderDark}`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <h3 className="text-[18px] md:text-[20px] font-quick font-black text-slate-800 tracking-tight">{title}</h3>
    </div>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
));
FooterCard.displayName = 'FooterCard';

const SmartLink = memo(({ label, href, icon: Icon }) => (
  <a
    href={href}
    className="group flex items-center justify-between p-3.5 bg-white rounded-[20px] border-2 border-slate-200 border-b-[4px] hover:border-[#1CB0F6] hover:bg-blue-50 active:border-b-2 active:translate-y-[2px] transition-all outline-none cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-[14px] bg-slate-100 group-hover:bg-[#1CB0F6] flex items-center justify-center transition-colors">
        <Icon size={18} className="text-slate-500 group-hover:text-white" strokeWidth={2.5} />
      </div>
      <span className="text-[15px] font-nunito font-bold text-slate-600 group-hover:text-blue-700 transition-colors">{label}</span>
    </div>
    <ChevronRight size={20} strokeWidth={3} className="text-slate-300 group-hover:text-[#1CB0F6] transition-colors group-hover:translate-x-1" />
  </a>
));
SmartLink.displayName = 'SmartLink';

const SocialButton = memo(({ href, icon: Icon, hoverColor, borderHover }) => (
  <a 
    href={href} 
    className={`w-14 h-14 bg-white rounded-[20px] border-2 border-slate-200 border-b-[4px] flex items-center justify-center text-slate-400 ${hoverColor} ${borderHover} hover:-translate-y-1 active:border-b-2 active:translate-y-[2px] transition-all outline-none`}
  >
    <Icon size={24} strokeWidth={2.5} />
  </a>
));
SocialButton.displayName = 'SocialButton';

const StatusMessage = memo(({ message, type }) => {
  const theme = type === 'success' 
    ? 'bg-[#f1faeb] text-[#46A302] border-[#58CC02]' 
    : type === 'error' 
    ? 'bg-[#fff0f0] text-[#E54343] border-[#FF4B4B]' 
    : 'bg-[#EAF6FE] text-[#1899D6] border-[#1CB0F6]';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      className={`flex items-center gap-3 px-5 py-4 rounded-[20px] border-2 border-b-[4px] font-nunito font-bold text-[14px] ${theme}`}
    >
      <AlertCircle size={20} strokeWidth={2.5} className="shrink-0" />
      <span>{message}</span>
    </motion.div>
  );
});
StatusMessage.displayName = 'StatusMessage';

const ContactInfo = memo(() => (
  <div className="p-6 bg-[#1CB0F6] border-b-[6px] border-[#1899D6] rounded-[28px] text-white space-y-4 shadow-sm relative overflow-hidden">
    {/* Deco */}
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
    <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-black/10 rounded-full blur-xl" />
    
    <div className="relative z-10 flex items-center gap-4 bg-white/20 p-4 rounded-[20px] hover:bg-white/30 transition-colors cursor-pointer">
      <div className="w-12 h-12 rounded-[14px] bg-white text-[#1CB0F6] flex items-center justify-center shrink-0 shadow-sm">
        <Mail size={22} strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase font-quick font-black text-blue-100 tracking-widest mb-0.5">Email hỗ trợ</p>
        <p className="text-[15px] font-nunito font-bold truncate">lekhoale3009@gmail.com</p>
      </div>
    </div>
    <div className="relative z-10 flex items-center gap-4 bg-white/20 p-4 rounded-[20px] hover:bg-white/30 transition-colors cursor-pointer">
      <div className="w-12 h-12 rounded-[14px] bg-white text-[#1CB0F6] flex items-center justify-center shrink-0 shadow-sm">
        <Phone size={22} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[11px] uppercase font-quick font-black text-blue-100 tracking-widest mb-0.5">Hotline</p>
        <p className="text-[16px] font-nunito font-black tracking-wide">+84 383 196 830</p>
      </div>
    </div>
  </div>
));
ContactInfo.displayName = 'ContactInfo';

const DiscordForm = memo(({ isSubmitting, discord, setDiscord, message, setMessage, discordStatus, onSubmit }) => (
  <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[36px] shadow-sm border-2 border-slate-200 border-b-[8px]">
    
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-[#FFC800] border-b-[4px] border-[#E5B400] rounded-[20px] flex items-center justify-center shrink-0">
          <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-[22px] md:text-[26px] font-quick font-black text-slate-800 leading-none">Trao Đổi & Kết Nối</h3>
          <p className="text-[14px] font-nunito font-bold text-slate-500 mt-1">Gửi tin nhắn cho đội ngũ phát triển</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-[12px] font-quick font-black text-slate-500 mb-2 uppercase tracking-widest pl-2">
            👤 Discord Username
          </label>
          <input
            type="text" value={discord} onChange={(e) => setDiscord(e.target.value)} disabled={isSubmitting}
            placeholder="Ví dụ: khoa.le#1234"
            className="w-full px-5 py-4 rounded-[20px] bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none text-[15px] font-nunito font-bold text-slate-800 transition-all placeholder:text-slate-400 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-[12px] font-quick font-black text-slate-500 mb-2 uppercase tracking-widest pl-2">
            💬 Lời nhắn của bạn
          </label>
          <div className="relative">
            <textarea
              value={message} onChange={(e) => setMessage(e.target.value)} disabled={isSubmitting}
              placeholder="Chia sẻ góp ý, báo lỗi hoặc đặt câu hỏi... (Ít nhất 10 ký tự)"
              className="w-full px-5 py-4 rounded-[20px] bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none text-[15px] font-nunito font-bold text-slate-800 transition-all resize-none h-32 placeholder:text-slate-400 disabled:opacity-50 custom-scrollbar"
            />
            <div className={`absolute bottom-4 right-4 text-[12px] font-black px-2 py-1 rounded-lg ${message.length >= 10 ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
              {message.length}/10
            </div>
          </div>
        </div>
        
        {/* Submit Button (Gamified Green) */}
        <button
          onClick={onSubmit} disabled={isSubmitting}
          className="w-full py-4 md:py-5 mt-2 bg-[#58CC02] text-white rounded-[20px] font-quick font-black text-[16px] md:text-[18px] uppercase tracking-wider flex items-center justify-center gap-3 border-2 border-[#46A302] border-b-[6px] hover:bg-[#46A302] active:border-b-0 active:translate-y-[6px] transition-all outline-none disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-500 disabled:active:translate-y-0 disabled:active:border-b-[6px]"
        >
          {isSubmitting ? (
            <><div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> Đang gửi thư...</>
          ) : (
            <><Send size={22} strokeWidth={3} /> Gửi tin nhắn ngay</>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {discordStatus.message && (
          <StatusMessage message={discordStatus.message} type={discordStatus.type} />
        )}
      </AnimatePresence>

    </div>
  </div>
));
DiscordForm.displayName = 'DiscordForm';

const TopSection = memo(({ isSubmitting, discord, setDiscord, message, setMessage, discordStatus, onSubmit }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-20 items-center">
    <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-[14px] border-2 border-amber-200 text-amber-600 font-quick font-black text-[12px] uppercase tracking-widest">
        <Rocket size={16} strokeWidth={3} /> Đội ngũ hỗ trợ 24/7
      </div>
      <h2 className="text-[40px] md:text-[56px] font-quick font-black text-slate-800 leading-[1.1]">
        Luôn lắng nghe <br /> 
        <span className="text-[#1CB0F6] relative inline-block mt-2">
          Học viên
          <svg className="absolute -bottom-3 left-0 w-full h-4 text-[#FFC800] z-[-1] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round"/></svg>
        </span>
      </h2>
      <p className="text-slate-500 font-nunito font-bold text-[16px] md:text-[18px] max-w-md mx-auto lg:mx-0 leading-relaxed">
        Chúng tôi luôn ở đây để giúp bạn có trải nghiệm luyện thi tuyệt vời nhất. Đừng ngần ngại để lại lời nhắn nhé!
      </p>
    </div>

    <DiscordForm 
      isSubmitting={isSubmitting} discord={discord} setDiscord={setDiscord}
      message={message} setMessage={setMessage} discordStatus={discordStatus} onSubmit={onSubmit}
    />
  </div>
));
TopSection.displayName = 'TopSection';

const BottomSection = memo(() => (
  <div className="pt-8 border-t-2 border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 font-nunito">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#1CB0F6] rounded-[12px] flex items-center justify-center text-white font-quick font-black text-[18px] border-b-[3px] border-[#1899D6]">H</div>
      <span className="text-slate-400 font-bold text-[15px]">© 2026 <span className="text-slate-700 font-black">HUFLIT Exam</span>.</span>
    </div>

    <div className="flex items-center gap-6">
      {['Điều khoản', 'Bảo mật', 'Trợ giúp'].map((item, i) => (
        <a key={i} href="#" className="text-[14px] font-bold text-slate-400 hover:text-[#1CB0F6] transition-colors">{item}</a>
      ))}
    </div>

    <div className="flex items-center gap-1.5 text-slate-400 text-[14px] font-bold bg-white px-4 py-2 rounded-xl border-2 border-slate-100 shadow-sm">
      Crafted with <Heart size={16} className="text-[#FF4B4B] fill-[#FF4B4B] animate-bounce mx-0.5" /> by <span className="text-slate-700 font-black font-quick">KhoaLe</span>
    </div>
  </div>
));
BottomSection.displayName = 'BottomSection';

// --- MAIN COMPONENT ---
const Footer = memo(() => {
  const [discord, setDiscord] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discordStatus, setDiscordStatus] = useState({ type: null, message: '' });

  const handleDiscordSubmit = useCallback(async (e) => {
    e?.preventDefault();
    if (!discord.trim()) { setDiscordStatus({ type: 'error', message: 'Bạn quên nhập Username kìa!' }); return; }
    if (message.length < 10) { setDiscordStatus({ type: 'error', message: 'Lời nhắn cần có ít nhất 10 ký tự nhé!' }); return; }

    setIsSubmitting(true);
    setDiscordStatus({ type: 'info', message: 'Đang bay tới Discord...' });

    try {
      const webhookUrl = 'https://discord.com/api/webhooks/1456551898457833564/Mp-FcK12R8udXBLjEtNCnWcC71hX8aYuj00m_PwmoFPzuiY7wejp9_q7qYCvP-u0LWiH';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'HUFLIT Exam System',
          avatar_url: 'https://cdn-icons-png.flaticon.com/512/3588/3588592.png',
          embeds: [{
            color: 0x1CB0F6,
            title: '🎉 Lời Nhắn Mới Từ Học Viên',
            fields: [
              { name: '👤 Username', value: discord, inline: true },
              { name: '🕐 Thời gian', value: new Date().toLocaleString('vi-VN'), inline: true },
              { name: '💬 Tin Nhắn', value: message, inline: false },
            ],
            footer: { text: 'Gamified Exam System' },
            timestamp: new Date().toISOString(),
          }],
        }),
      });

      if (!response.ok) throw new Error('Failed to send');
      
      setDiscordStatus({ type: 'success', message: 'Tin nhắn đã được gửi thành công! Cảm ơn bạn 🎉' });
      setDiscord(''); setMessage('');
      setTimeout(() => setDiscordStatus({ type: null, message: '' }), 5000);
    } catch (error) {
      setDiscordStatus({ type: 'error', message: 'Có lỗi kết nối, vui lòng thử lại sau!' });
    } finally {
      setIsSubmitting(false);
    }
  }, [discord, message]);

  const learningLinks = useMemo(() => [
    { label: 'Thư viện Đề thi', icon: Sparkles },
    { label: 'Lộ trình Luyện tập', icon: TrendingUp },
    { label: 'Bí kíp 900+', icon: Zap },
  ], []);

  const supportLinks = useMemo(() => [
    { label: 'Cộng đồng Chém gió', icon: MessageCircle },
    { label: 'Hỏi đáp (FAQ)', icon: HelpCircle },
    { label: 'Bảng vàng Vinh danh', icon: Award },
  ], []);

  return (
    <footer className="relative bg-[#F4F7FA] pt-24 pb-12 overflow-hidden border-t-4 border-slate-200 selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#1CB0F6]/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FFC800]/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* TOP SECTION */}
        <TopSection 
          isSubmitting={isSubmitting} discord={discord} setDiscord={setDiscord}
          message={message} setMessage={setMessage} discordStatus={discordStatus} onSubmit={handleDiscordSubmit}
        />

        {/* MIDDLE SECTION: LINKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 mb-16">
          <FooterCard title="Tài Nguyên Học Tập" icon={BookOpen} iconBg="bg-indigo-100" iconColor="text-indigo-500" borderDark="border-indigo-200">
            {learningLinks.map((link, i) => <SmartLink key={i} label={link.label} href="#" icon={link.icon} />)}
          </FooterCard>

          <FooterCard title="Hỗ Trợ Thành Viên" icon={Users} iconBg="bg-emerald-100" iconColor="text-emerald-500" borderDark="border-emerald-200">
            {supportLinks.map((link, i) => <SmartLink key={i} label={link.label} href="#" icon={link.icon} />)}
          </FooterCard>

          <FooterCard title="Liên Hệ Trực Tiếp" icon={Phone} iconBg="bg-[#EAF6FE]" iconColor="text-[#1CB0F6]" borderDark="border-[#BAE3FB]">
            <ContactInfo />
          </FooterCard>
        </div>

        {/* SOCIAL LINKS (Gamified) */}
        <div className="flex justify-center gap-4 mb-16">
          <SocialButton href="#" icon={Facebook} hoverColor="hover:text-[#1877F2]" borderHover="hover:border-[#1877F2]" />
          <SocialButton href="#" icon={Youtube} hoverColor="hover:text-[#FF0000]" borderHover="hover:border-[#FF0000]" />
          <SocialButton href="#" icon={Github} hoverColor="hover:text-black" borderHover="hover:border-black" />
        </div>

        {/* BOTTOM SECTION */}
        <BottomSection />
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
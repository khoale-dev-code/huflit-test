import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  Mail, Phone, MapPin, Facebook, Youtube, MessageCircle,
  BookOpen, Zap, Users, HelpCircle, Send,
  ChevronRight, Heart, TrendingUp, Award, Github,
  Sparkles, ExternalLink, Rocket, AlertCircle
} from 'lucide-react';

// --- SUB-COMPONENTS (MEMOIZED) ---

const FooterCard = memo(({ title, children, icon: Icon }) => (
  <div className="flex flex-col gap-6 animate-in fade-in duration-500">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
    </div>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
));

FooterCard.displayName = 'FooterCard';

const SmartLink = memo(({ label, href, icon: Icon }) => (
  <a
    href={href}
    className="group flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-blue-50 cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300">
        <Icon size={14} className="text-slate-500 group-hover:text-white" />
      </div>
      <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-700">{label}</span>
    </div>
    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-blue-400 transition-all duration-300" />
  </a>
));

SmartLink.displayName = 'SmartLink';

const SocialButton = memo(({ href, icon: Icon, bgGradient, title }) => (
  <a 
    href={href} 
    className={`w-11 h-11 rounded-full ${bgGradient} text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300`}
    title={title}
  >
    <Icon size={20} />
  </a>
));

SocialButton.displayName = 'SocialButton';

const StatusMessage = memo(({ message, type }) => (
  <div
    className={`flex items-center gap-3 text-sm px-5 py-3.5 rounded-xl font-semibold transition-all border-2 animate-in fade-in duration-300 ${
      type === 'success'
        ? 'bg-green-50 text-green-700 border-green-300'
        : type === 'error'
        ? 'bg-red-50 text-red-700 border-red-300'
        : 'bg-blue-50 text-blue-700 border-blue-300'
    }`}
  >
    <AlertCircle size={18} className="flex-shrink-0" />
    <span>{message}</span>
  </div>
));

StatusMessage.displayName = 'StatusMessage';

const ContactInfo = memo(() => (
  <div className="p-6 bg-[#00358E] rounded-[24px] text-white space-y-4 shadow-xl">
    <div className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
      <div className="w-10 h-10 rounded-full bg-blue-800 group-hover:bg-[#FF7D00] flex items-center justify-center transition-colors duration-300">
        <Mail size={18} />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-blue-300">Email hỗ trợ</p>
        <p className="text-sm font-bold">lekhoale3009@gmail.com</p>
      </div>
    </div>
    <div className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
      <div className="w-10 h-10 rounded-full bg-blue-800 group-hover:bg-[#FF7D00] flex items-center justify-center transition-colors duration-300">
        <Phone size={18} />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-blue-300">Hotline</p>
        <p className="text-sm font-bold">+84 383 196 830</p>
      </div>
    </div>
  </div>
));

ContactInfo.displayName = 'ContactInfo';

const DiscordForm = memo(({ isSubmitting, discord, setDiscord, message, setMessage, discordStatus, onSubmit }) => (
  <div className="lg:col-span-7 bg-gradient-to-br from-white via-blue-50 to-white p-8 rounded-[32px] shadow-2xl shadow-blue-100/50 border border-blue-100 relative overflow-hidden animate-in fade-in duration-500">
    {/* Decorative background elements */}
    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-10 pointer-events-none" />
    
    <div className="relative z-10 space-y-6">
      {/* Header with Icon */}
      <div className="flex items-center justify-center gap-4 pb-2">
        <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg shadow-blue-300/50 hover:scale-110 transition-transform duration-300">
          <MessageCircle className="w-7 h-7 text-yellow-300" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#00358E]">Trao Đổi & Kết Nối</h3>
          <p className="text-xs text-slate-500 font-semibold">Liên hệ trực tiếp với đội ngũ</p>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-center text-slate-600 text-sm leading-relaxed px-2">
        Có câu hỏi hoặc đề xuất? Gửi tin nhắn trực tiếp đến đội ngũ HUFLIT Exam qua Discord ngay!
      </p>

      {/* Form Fields */}
      <div className="space-y-3 pt-2">
        {/* Discord Username Input */}
        <div className="relative animate-in fade-in duration-500" style={{ animationDelay: '100ms' }}>
          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
            👤 Discord Username
          </label>
          <input
            type="text"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            placeholder="Ví dụ: user#1234"
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 rounded-xl bg-white border-2 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400"
          />
        </div>

        {/* Message Textarea */}
        <div className="relative animate-in fade-in duration-500" style={{ animationDelay: '200ms' }}>
          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
            💬 Tin Nhắn Của Bạn
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Chia sẻ tâm sự, góp ý hoặc đặt câu hỏi của bạn... (Tối thiểu 10 ký tự)"
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 rounded-xl bg-white border-2 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium transition-all duration-300 resize-none h-24 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400"
          />
          <div className="absolute bottom-3 right-3 text-xs font-semibold text-slate-400">
            {message.length}/10
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-[#00358E] to-blue-700 hover:from-blue-800 hover:to-blue-900 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-300/50 transition-all duration-300 disabled:cursor-not-allowed text-base active:scale-95 animate-in fade-in duration-500"
          style={{ animationDelay: '300ms' }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2.5 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Đang gửi...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Gửi Tin Nhắn</span>
            </>
          )}
        </button>
      </div>

      {/* Status Message with Animation */}
      {discordStatus.message && (
        <StatusMessage message={discordStatus.message} type={discordStatus.type} />
      )}

      {/* Social Links */}
      <div className="pt-4 border-t border-slate-200 flex justify-center gap-4">
        <SocialButton href="#" icon={Facebook} bgGradient="bg-gradient-to-br from-[#1877F2] to-blue-700" title="Facebook" />
        <SocialButton href="#" icon={Github} bgGradient="bg-gradient-to-br from-[#24292F] to-black" title="Github" />
        <SocialButton href="#" icon={Youtube} bgGradient="bg-gradient-to-br from-[#FF0000] to-red-700" title="Youtube" />
      </div>
    </div>
  </div>
));

DiscordForm.displayName = 'DiscordForm';

const TopSection = memo(({ isSubmitting, discord, setDiscord, message, setMessage, discordStatus, onSubmit }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
    <div className="lg:col-span-5 space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest animate-in fade-in duration-500">
        <Rocket size={14} /> Chinh phục điểm cao ngay hôm nay
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-[#00358E] leading-tight animate-in fade-in duration-500" style={{ animationDelay: '100ms' }}>
        Nâng tầm kỹ năng <br /> 
        <span className="text-[#FF7D00] relative">
          Toeic & English
          <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
            <path d="M0 7C25 2 75 2 100 7" stroke="#FF7D00" strokeWidth="3" fill="none" opacity="0.3" />
          </svg>
        </span>
      </h2>
      <p className="text-slate-500 text-lg max-w-md animate-in fade-in duration-500" style={{ animationDelay: '200ms' }}>
        Hệ thống luyện thi thông minh giúp bạn tối ưu hóa thời gian và đạt kết quả mong muốn với lộ trình cá nhân hóa.
      </p>
    </div>

    <DiscordForm 
      isSubmitting={isSubmitting}
      discord={discord}
      setDiscord={setDiscord}
      message={message}
      setMessage={setMessage}
      discordStatus={discordStatus}
      onSubmit={onSubmit}
    />
  </div>
));

TopSection.displayName = 'TopSection';

const BottomSection = memo(() => (
  <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-[#00358E] rounded-lg flex items-center justify-center text-white font-black text-xs">H</div>
      <span className="text-slate-400 text-sm font-medium">© 2026 <span className="text-slate-900">HUFLIT Exam</span>. All rights reserved.</span>
    </div>

    <div className="flex items-center gap-8">
      {['Điều khoản', 'Bảo mật', 'Cookies'].map((item, i) => (
        <a key={i} href="#" className="text-sm text-slate-500 hover:text-blue-600 font-semibold transition-colors duration-300">{item}</a>
      ))}
    </div>

    <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
      Crafted with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> by <span className="text-slate-900 font-bold ml-1">Khoale</span>
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

  // Handle form submission with Discord webhook integration
  const handleDiscordSubmit = useCallback(async (e) => {
    e?.preventDefault();
    
    // Validate inputs
    if (!discord.trim()) {
      setDiscordStatus({ type: 'error', message: 'Vui lòng nhập Discord username' });
      return;
    }
    
    if (message.length < 10) {
      setDiscordStatus({ type: 'error', message: 'Tin nhắn phải có ít nhất 10 ký tự' });
      return;
    }

    setIsSubmitting(true);
    setDiscordStatus({ type: 'info', message: 'Đang gửi...' });

    try {
      // Send message to Discord webhook
      const webhookUrl = 'https://discord.com/api/webhooks/1456551898457833564/Mp-FcK12R8udXBLjEtNCnWcC71hX8aYuj00m_PwmoFPzuiY7wejp9_q7qYCvP-u0LWiH';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'HUFLIT Exam System',
          avatar_url: 'https://cdn-icons-png.flaticon.com/512/3588/3588592.png',
          embeds: [
            {
              color: 0x00358E,
              title: '📬 Tin Nhắn Mới Từ Khách Hàng',
              fields: [
                {
                  name: '👤 Discord Username',
                  value: discord,
                  inline: true,
                },
                {
                  name: '🕐 Thời gian',
                  value: new Date().toLocaleString('vi-VN'),
                  inline: true,
                },
                {
                  name: '💬 Tin Nhắn',
                  value: message,
                  inline: false,
                },
              ],
              footer: {
                text: 'HUFLIT Exam - Discord Integration',
              },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Success feedback
      setDiscordStatus({ type: 'success', message: 'Tin nhắn đã được gửi thành công! Cảm ơn bạn 🎉' });
      setDiscord('');
      setMessage('');
      
      // Clear success message after 5 seconds
      setTimeout(() => setDiscordStatus({ type: null, message: '' }), 5000);
    } catch (error) {
      console.error('Discord submission error:', error);
      setDiscordStatus({ type: 'error', message: 'Có lỗi xảy ra, vui lòng thử lại' });
    } finally {
      setIsSubmitting(false);
    }
  }, [discord, message]);

  // Memoize link data
  const learningLinks = useMemo(() => [
    { label: 'Thư viện đề thi', icon: Sparkles },
    { label: 'Lộ trình học tập', icon: TrendingUp },
    { label: 'Mẹo làm bài thi', icon: Zap },
  ], []);

  const supportLinks = useMemo(() => [
    { label: 'Cộng đồng thảo luận', icon: MessageCircle },
    { label: 'Câu hỏi thường gặp', icon: HelpCircle },
    { label: 'Vinh danh thủ khoa', icon: Award },
  ], []);

  return (
    <footer className="relative bg-[#F8FAFC] pt-24 pb-12 overflow-hidden border-t border-slate-200">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-200 rounded-full blur-[100px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-orange-200 rounded-full blur-[100px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP SECTION */}
        <TopSection 
          isSubmitting={isSubmitting}
          discord={discord}
          setDiscord={setDiscord}
          message={message}
          setMessage={setMessage}
          discordStatus={discordStatus}
          onSubmit={handleDiscordSubmit}
        />

        {/* MIDDLE SECTION: LINKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          <FooterCard title="Tài Nguyên Học Tập" icon={BookOpen}>
            {learningLinks.map((link, i) => (
              <SmartLink key={i} label={link.label} href="#" icon={link.icon} />
            ))}
          </FooterCard>

          <FooterCard title="Hỗ Trợ Thành Viên" icon={Users}>
            {supportLinks.map((link, i) => (
              <SmartLink key={i} label={link.label} href="#" icon={link.icon} />
            ))}
          </FooterCard>

          <FooterCard title="Liên Hệ Trực Tiếp" icon={Phone}>
            <ContactInfo />
          </FooterCard>
        </div>

        {/* BOTTOM SECTION */}
        <BottomSection />
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
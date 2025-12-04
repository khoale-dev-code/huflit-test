import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Facebook, Linkedin, Youtube, MessageCircle,
  BookOpen, Zap, Users, HelpCircle, ArrowUp, Send,
  ChevronRight, Heart, ShieldCheck, TrendingUp, Trophy,
  AlertCircle, Sparkles, Globe, Code, Award, Lightbulb,
  Github, MessageSquareText 
} from 'lucide-react';

// --- STYLES & ANIMATIONS ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    /* Keyframes for smooth transitions and effects */
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

    @keyframes pulse-shadow {
      0%, 100% { box-shadow: 0 0 15px rgba(255, 193, 7, 0.5); } /* Vàng */
      50% { box-shadow: 0 0 25px rgba(255, 193, 7, 0.8); }
    }
    .animate-pulse-shadow { animation: pulse-shadow 2s ease-in-out infinite; }
    
    @keyframes subtle-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    .animate-subtle-bounce-hover:hover {
        animation: subtle-bounce 0.8s ease-in-out infinite;
    }

    html { scroll-behavior: smooth; }
  `}} />
);

// --- UTILITY COMPONENTS (Giữ nguyên như bản thiết kế trước) ---

// Component cho các mục liên kết (Tài Nguyên, Dịch Vụ)
const LinkItem = ({ icon: Icon, label, href, description, delay = 0 }) => (
  <a
    href={href}
    className="group flex items-start gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:border-l-4 hover:border-yellow-500 active:scale-[0.98] transform animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="p-2 rounded-full bg-blue-100 group-hover:bg-blue-600 transition-colors flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate text-base">{label}</p>
      {description && <p className="text-sm text-gray-500 mt-0.5 leading-tight">{description}</p>}
    </div>
    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-transform translate-x-1 group-hover:translate-x-0 flex-shrink-0 mt-2" />
  </a>
);

// Component cho các nút Mạng Xã Hội
const SocialButton = ({ icon: Icon, label, href, color, delay = 0, hoverColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    aria-label={label}
    className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${color} text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 transform relative group overflow-hidden animate-fade-in active:scale-95`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${hoverColor}`}></div>
    <Icon className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:scale-110 transition-transform" />
  </a>
);

// Component Scroll To Top
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 bg-blue-600 hover:bg-blue-700 text-yellow-300 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 active:scale-90 group border-2 border-white ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto animate-pulse-shadow' : 'opacity-0 translate-y-12 pointer-events-none'
      }`}
      title="Lên đầu trang"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
};

// --- MAIN FOOTER COMPONENT ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [discord, setDiscord] = useState('');
  const [message, setMessage] = useState('');
  const [discordStatus, setDiscordStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Webhook URL TỪ YÊU CẦU CỦA BẠN
  const WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1445970968576266300/MQ5fL9u1d7V1lxubyU8Aa24Q0K40ezP-TG0bBXPp1b3qgcFFpax7SXX_Se5Q0DMzNm6y';

  const handleDiscordSubmit = async () => {
    if (!discord) {
      setDiscordStatus({ type: 'error', message: 'Vui lòng nhập Discord username' });
      return;
    }

    if (!message || message.trim().length < 10) {
      setDiscordStatus({ type: 'error', message: 'Tin nhắn phải có ít nhất 10 ký tự' });
      return;
    }

    setIsSubmitting(true);
    setDiscordStatus({ type: 'info', message: 'Đang gửi tin nhắn...' });

    try {
      const payload = {
        username: '📬 HUFLIT Trao Đổi & Kết Nối',
        avatar_url: 'https://cdn-icons-png.flaticon.com/512/4024/4024969.png', // Icon đại diện
        embeds: [
          {
            color: 0x2563EB, // Màu xanh dương cho embed
            title: '🎉 Tin Nhắn Mới Từ Thành Viên',
            description: message,
            fields: [
              {
                name: '👤 Discord Username',
                value: discord,
                inline: false
              },
              {
                name: '⏰ Thời Gian',
                value: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }), // Giờ Việt Nam
                inline: false
              }
            ],
            thumbnail: {
              url: 'https://cdn-icons-png.flaticon.com/512/4024/4024969.png'
            }
          }
        ]
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setDiscordStatus({ type: 'success', message: '✓ Gửi thành công! Cảm ơn bạn đã kết nối với chúng tôi.' });
        setDiscord('');
        setMessage('');
        setTimeout(() => setDiscordStatus({ type: '', message: '' }), 4000);
      } else {
        // Discord thường trả về status 200/204 nếu thành công. Bất kỳ lỗi nào khác sẽ bị bắt ở đây.
        throw new Error(`Failed to send (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('Discord Webhook Error:', error);
      setDiscordStatus({ type: 'error', message: 'Có lỗi xảy ra khi gửi tin. Vui lòng kiểm tra lại Username.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dữ liệu được tổ chức lại (Giữ nguyên)
  const resources = [
    { icon: BookOpen, label: 'Thư viện đề thi', href: '#', description: '500+ bài tập trắc nghiệm' },
    { icon: Zap, label: 'Tài liệu học tập', href: '#', description: 'Tài liệu độc quyền, miễn phí' },
    { icon: HelpCircle, label: 'Câu hỏi thường gặp', href: '#', description: 'Giải đáp nhanh chóng' },
  ];

  const services = [
    { icon: Users, label: 'Cộng đồng học tập', href: '#', description: 'Kết nối và trao đổi kinh nghiệm' },
    { icon: TrendingUp, label: 'Theo dõi tiến độ', href: '#', description: 'Báo cáo chi tiết quá trình học' },
    { icon: Award, label: 'Chứng chỉ', href: '#', description: 'Công nhận thành tích' },
  ];

  const contactDetails = [
    { icon: Mail, label: 'Email', value: 'lekhoale30092003@gmail.com', href: 'mailto:lekhoale30092003@gmail.com' },
    { icon: Phone, label: 'Hotline', value: '+84 383 196 830', href: 'tel:+84383196830' },
    { icon: MapPin, label: 'Địa chỉ', value: 'TP. Hồ Chí Minh, Việt Nam', href: '#' },
  ];

  // Cập nhật Social Links theo yêu cầu (Giữ nguyên)
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/dnkhoaoanoa/?locale=vi_VN', color: 'bg-blue-600', hoverColor: 'bg-blue-700' },
     { icon: Github, label: 'GitHub', href: 'https://github.com/khoale-dev-code', color: 'bg-gray-800', hoverColor: 'bg-gray-900' },
    { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@KhoaL%C3%AA-h7x', color: 'bg-red-600', hoverColor: 'bg-red-700' },
    { icon: Mail, label: 'Mail', href: 'mailto:lekhoale30092003@gmail.com', color: 'bg-yellow-500', hoverColor: 'bg-yellow-600' },
  ];

  const legalLinks = [
    { label: 'Điều khoản sử dụng', href: '#' },
    { label: 'Chính sách bảo mật', href: '#' },
    { label: 'Liên hệ hỗ trợ', href: '#' },
  ];

  // Styles (Giữ nguyên)
  const discordCardStyle = "relative bg-white rounded-xl border-2 border-yellow-400 p-6 shadow-xl hover:shadow-2xl transition-all duration-500";
  const discordHeaderStyle = "text-xl font-bold text-blue-700";
  const focusInputStyle = "focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <>
      <GlobalStyles />
      <footer className="bg-gray-50 text-gray-900 font-sans relative overflow-hidden">

        {/* --- MAIN CONTENT SECTION --- */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 z-10">

          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2">
              <span className="text-blue-600">HUFLIT</span>
              <span className="text-yellow-500 ml-3">Exam Prep</span>
            </h2>
           
          </div>

          {/* Content Grid - 4 Columns on Desktop, 2 on Tablet, 1 on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Column 1: Tài Nguyên */}
            <div className="animate-fade-in" style={{ animationDelay: '50ms' }}>
              <h3 className="text-lg font-bold text-blue-700 mb-5 border-b-2 border-yellow-400 pb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Tài Nguyên
              </h3>
              <nav className="space-y-2">
                {resources.map((item, idx) => (
                  <LinkItem key={idx} {...item} delay={100 + idx * 50} />
                ))}
              </nav>
            </div>

            {/* Column 2: Dịch Vụ */}
            <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
              <h3 className="text-lg font-bold text-blue-700 mb-5 border-b-2 border-yellow-400 pb-2 flex items-center gap-2">
                <Globe className="w-5 h-5 text-yellow-500" />
                Dịch Vụ
              </h3>
              <nav className="space-y-2">
                {services.map((item, idx) => (
                  <LinkItem key={idx} {...item} delay={200 + idx * 50} />
                ))}
              </nav>
            </div>
            
            {/* Column 3: Liên Hệ & Mạng Xã Hội */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '250ms' }}>
                <div>
                    <h3 className="text-lg font-bold text-blue-700 mb-5 border-b-2 border-yellow-400 pb-2 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-yellow-500" />
                        Thông Tin Liên Hệ
                    </h3>
                    <div className="space-y-3">
                        {contactDetails.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="group flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-yellow-50 active:scale-95 text-gray-700"
                                style={{ animationDelay: `${300 + idx * 50}ms` }}
                            >
                                <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-sm truncate">{item.label}</p>
                                    <p className="text-xs text-gray-600 mt-0.5 group-hover:text-blue-600 truncate">{item.value}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-blue-700 mb-5 border-b-2 border-yellow-400 pb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                        Kết Nối
                    </h3>
                    <div className="flex gap-4 flex-wrap">
                        {socialLinks.map((link, idx) => (
                            <SocialButton key={idx} {...link} delay={400 + idx * 50} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Column 4: Discord Connect Form */}
            <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className={discordCardStyle}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-3 bg-blue-600 rounded-xl animate-subtle-bounce-hover">
                    <MessageCircle className="w-6 h-6 text-yellow-300" />
                  </div>
                  <h3 className={discordHeaderStyle}>Trao Đổi & Kết Nối</h3>
                </div>

                <p className="text-xs text-gray-600 mb-4 text-center">Gửi tin nhắn trực tiếp đến đội ngũ qua Discord</p>

                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                    placeholder="Discord Username (VD: user#1234)"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white ${focusInputStyle} outline-none text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Chia sẻ tâm sự/góp ý của bạn... (Tối thiểu 10 ký tự)"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white ${focusInputStyle} outline-none text-sm font-medium transition-all resize-none h-20 disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  <button
                    onClick={handleDiscordSubmit}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-yellow-300 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Gửi Tin Nhắn</span>
                      </>
                    )}
                  </button>
                </div>

                {discordStatus.message && (
                  <div
                    className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg animate-fade-in ${
                      discordStatus.type === 'success'
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : discordStatus.type === 'error'
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-blue-100 text-blue-700 border border-blue-300' // Info/Loading
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">{discordStatus.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR (COPYRIGHT & LEGAL) --- */}
        <div className="bg-blue-900 border-t border-blue-700 relative">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center">
              
              {/* Copyright */}
              <div className="text-center md:text-left order-3 md:order-1">
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  © {currentYear} <span className="font-black text-white">HUFLIT Exam Prep</span>
                  <br />
                  <span className="text-yellow-400 text-xs">Made with</span>
                  <Heart className="w-3 h-3 inline ml-1 text-red-500 fill-red-500 mx-1 animate-pulse" />
                  <span className="text-yellow-400 text-xs">by Khoale</span>
                </p>
              </div>

              {/* Legal Links */}
              <div className="text-center order-2">
                <nav className="flex flex-wrap gap-2 md:gap-4 justify-center">
                  {legalLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors font-medium text-xs sm:text-sm relative group overflow-hidden"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Version */}
              <div className="text-center md:text-right order-1 md:order-3">
                <p className="text-gray-500 text-xs">
                  <span className="text-yellow-400 font-semibold">v2.1</span> • Designed for Excellence
                </p>
              </div>
            </div>
          </div>
        </div>

        <ScrollToTopButton />
      </footer>
    </>
  );
};

export default Footer;
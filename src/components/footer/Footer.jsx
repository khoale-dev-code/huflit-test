import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Youtube,
  BookOpen,
  FileText,
  Users,
  HelpCircle,
  ArrowUp,
  Send,
  ChevronRight,
  Heart,
  ShieldCheck,
  TrendingUp,
  Trophy,
  UserCircle,
  AlertCircle,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import logoImage from '../../assets/logo.png';

// --- GLOBAL STYLES & KEYFRAMES ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }

    @keyframes blob {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }
    .animate-blob { animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045); }

    @keyframes float {
      0% { transform: translateY(0px) translateX(0px); }
      50% { transform: translateY(-10px) translateX(5px); }
      100% { transform: translateY(0px) translateX(0px); }
    }

    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 5s ease infinite;
    }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }

    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }
    .animate-pulse-dot {
      animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    html { scroll-behavior: smooth; }
  `}} />
);
<img
  src={logoImage}
  alt="HUFLIT Logo"
  className="h-16 w-16 rounded-full object-cover"
/>
// --- UTILITY COMPONENTS ---
const LinkItem = ({ icon: Icon, label, href, description, delay = 0 }) => (
  <a
    href={href}
    className="group flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-amber-50 active:scale-95 transform hover:translate-x-1 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <Icon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
    <div className="flex-1">
      <p className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">{label}</p>
      {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
    </div>
    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-600 transition-all group-hover:translate-x-1" />
  </a>
);

const SocialButton = ({ icon: Icon, label, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    aria-label={label}
    className={`w-11 h-11 rounded-full ${color} text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-2 transform hover:rotate-12 relative group overflow-hidden`}
  >
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    <Icon className="w-5 h-5 relative z-10 group-hover:scale-125 transition-transform" />
  </a>
);

const StatCard = ({ icon: Icon, number, label, delay = 0 }) => (
  <div
    className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 hover:shadow-lg hover:border-amber-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="p-2 bg-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-amber-700" />
    </div>
    <p className="text-2xl font-black bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
      {number}
    </p>
    <p className="text-xs font-semibold text-gray-700 text-center mt-1">{label}</p>
  </div>
);

const OnlineUsersDisplay = ({ onlineCount = 0, totalUsers = 0 }) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8 animate-fade-in">
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative flex items-center justify-center">
          <Activity className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-green-700 leading-none">{onlineCount}</span>
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Online Now</span>
        </div>
      </div>
    </div>

    <div className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-300 shadow-md hover:shadow-xl transition-all duration-300">
        <Users className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
        <div className="flex flex-col">
          <span className="text-2xl font-black text-blue-700 leading-none">{totalUsers}</span>
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Total Users</span>
        </div>
      </div>
    </div>
  </div>
);

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute w-96 h-96 bg-gradient-to-r from-amber-300 to-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-0 -left-48 animate-blob"></div>
    <div className="absolute w-96 h-96 bg-gradient-to-r from-orange-300 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-40 right-0 animate-blob animation-delay-2000"></div>
    <div className="absolute w-96 h-96 bg-gradient-to-r from-amber-200 to-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -bottom-32 left-1/3 animate-blob animation-delay-4000"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/30 to-transparent"></div>
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-40 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float 6s infinite ease-in-out ${i * 0.5}s`
        }}
      ></div>
    ))}
  </div>
);

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY < 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <Zap className="w-4 h-4 text-amber-600 animate-bounce" />
        <p className="text-xs font-semibold text-gray-600">Khám phá thêm</p>
      </div>
    </div>
  );
};

// --- MAIN FOOTER COMPONENT ---
const Footer = ({ onlineCount = 0, totalUsers = 0 }) => {
  const currentYear = new Date().getFullYear();
  const [showTopButton, setShowTopButton] = useState(false);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = async () => {
    if (!email) {
      setEmailStatus({ type: 'error', message: 'Vui lòng nhập email' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailStatus({ type: 'error', message: 'Email không hợp lệ' });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setEmailStatus({ type: 'success', message: '✓ Đăng ký thành công! Cảm ơn bạn.' });
      setEmail('');
      setTimeout(() => setEmailStatus({ type: '', message: '' }), 4000);
    } catch (error) {
      setEmailStatus({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resources = [
    { icon: BookOpen, label: 'Thư viện đề thi', href: '#', description: '500+ bài tập chất lượng' },
    { icon: FileText, label: 'Tài liệu học tập', href: '#', description: 'Tài liệu miễn phí' },
    { icon: Users, label: 'Cộng đồng học tập', href: '#', description: 'Kết nối với bạn học' },
    { icon: HelpCircle, label: 'Câu hỏi thường gặp', href: '#', description: 'Giải đáp nhanh chóng' },
  ];

  const contactDetails = [
    { icon: Mail, label: 'lekhoale30092003@gmail.com', href: 'mailto:lekhoale30092003@gmail.com' },
    { icon: Phone, label: '+84 383196830', href: 'tel:+84383196830' },
    { icon: MapPin, label: 'TP. Hồ Chí Minh, Việt Nam', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'bg-blue-700 hover:bg-blue-800' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com', color: 'bg-red-600 hover:bg-red-700' },
  ];

  const legalLinks = [
    { label: 'Điều khoản sử dụng', href: '#' },
    { label: 'Chính sách bảo mật', href: '#' },
    { label: 'Liên hệ hỗ trợ', href: '#' },
  ];

  const stats = [
    { icon: UserCircle, number: '500', label: 'Người dùng' },
    { icon: Trophy, number: '★ 4.8', label: 'Đánh giá' },
    { icon: TrendingUp, number: '500+', label: 'Bài tập' },
  ];

  return (
    <>
      <GlobalStyles />
      <footer className="bg-white text-gray-900 font-sans relative">
        <div className="relative bg-gradient-to-b from-white via-amber-50/50 to-white border-t-2 border-amber-200 overflow-hidden">
          <AnimatedBackground />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10">
            {/* Brand Section */}
            <div className="mb-16 text-center">
              <div className="inline-flex items-center justify-center mb-6 animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <div className="relative p-2 bg-white rounded-full shadow-2xl ring-4 ring-amber-500/50 transition-transform duration-500 hover:scale-110 hover:ring-amber-600">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>                  
                  </div>
                </div>  
              </div>

              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4 animate-fade-in leading-tight">
                HUFLIT{' '}
                <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent animate-gradient">
                  Exam Prep
                </span>
              </h2>

              <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed animate-fade-in mb-8">
                Nền tảng luyện thi hàng đầu giúp bạn chinh phục các kỳ thi ngôn ngữ và chuyên ngành với độ chính xác cao nhất.
              </p>

              <OnlineUsersDisplay onlineCount={onlineCount} totalUsers={totalUsers} />
            </div>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12 rounded-full"></div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Resources Section */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-bold text-gray-900 pb-3 border-b-2 border-amber-400 flex-1">
                    Tài Nguyên
                  </h3>
                </div>
                <nav className="space-y-1">
                  {resources.map((item, idx) => (
                    <LinkItem key={idx} {...item} delay={idx * 50} />
                  ))}
                </nav>
              </div>

              {/* Contact & Social */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <h3 className="text-lg font-bold text-gray-900 pb-3 border-b-2 border-amber-400 flex-1">
                      Liên Hệ
                    </h3>
                  </div>
                  <nav className="space-y-3">
                    {contactDetails.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="flex items-start gap-3 group text-gray-700 hover:text-amber-700 transition-all duration-300 transform hover:translate-x-1"
                      >
                        <item.icon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-amber-200">
                  <p className="text-xs font-semibold text-gray-600 mb-4">Kết nối với chúng tôi</p>
                  <div className="flex gap-3 flex-wrap">
                    {socialLinks.map((link, idx) => (
                      <SocialButton key={idx} {...link} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-bold text-gray-900 pb-3 border-b-2 border-amber-400 flex-1">
                    Đăng Ký Nhận Tin
                  </h3>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></div>

                  <div className="relative bg-white rounded-2xl border-2 border-amber-200 p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
                        <ShieldCheck className="w-6 h-6 text-amber-700" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Không Spam!</p>
                        <p className="text-xs text-gray-600 mt-0.5">Chỉ những tin tức và tài liệu hữu ích từ HUFLIT</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSubmit()}
                          placeholder="Nhập email của bạn..."
                          disabled={isSubmitting}
                          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                          onClick={handleNewsletterSubmit}
                          disabled={isSubmitting}
                          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="hidden sm:inline">Đang xử lý</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span className="hidden sm:inline">Đăng Ký</span>
                            </>
                          )}
                        </button>
                      </div>

                      {emailStatus.message && (
                        <div
                          className={`flex items-center gap-2 text-sm px-3 py-3 rounded-lg animate-fade-in ${
                            emailStatus.type === 'success'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {emailStatus.message}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                      Chúng tôi tôn trọng quyền riêng tư của bạn.{' '}
                      <a href="#" className="text-amber-700 font-semibold hover:underline transition-colors">
                        Xem chính sách bảo mật
                      </a>
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} delay={idx * 100} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ScrollIndicator />
        </div>

        {/* Bottom Bar */}
        <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-2 border-amber-500 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/50 to-transparent"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Copyright */}
              <div className="text-center md:text-left animate-fade-in">
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  © {currentYear} <span className="font-black text-white">HUFLIT Exam Prep</span>
                  <br />
                  <span className="text-amber-500">Made with</span>
                  <Heart className="w-3 h-3 inline ml-1 text-red-500 fill-red-500 mx-1 animate-pulse" />
                  <span className="text-amber-500">by Khoale</span>
                </p>
              </div>

              {/* Legal Links */}
              <div className="text-center">
                <nav className="flex flex-wrap gap-3 justify-center">
                  {legalLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="text-gray-400 hover:text-amber-400 transition-colors font-medium text-xs sm:text-sm hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Additional Info */}
              <div className="text-center md:text-right">
                <p className="text-gray-500 text-xs">
                  <span className="text-amber-500 font-semibold">Version 1.0</span> • Designed for Quality
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 z-50 active:scale-95 group ${
            showTopButton
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-12 pointer-events-none'
          }`}
          title="Lên đầu trang"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      </footer>
    </>
  );
};

export default Footer;
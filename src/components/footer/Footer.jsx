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
  Zap, // For feature
  ShieldCheck, // For feature
  TrendingUp, // For stats
  Trophy, // For stats
  UserCircle // For stats
} from 'lucide-react';

// --- MAIN FOOTER COMPONENT ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  // Handle Scroll to Top Button visibility
  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data Definitions (Kept the same for content)
  const footerLinks = [
    { icon: BookOpen, label: 'Thư viện đề thi', href: '#', desc: 'Truy cập 500+ bài tập' },
    { icon: FileText, label: 'Tài liệu học tập', href: '#', desc: 'Tài liệu học miễn phí' },
    { icon: Users, label: 'Cộng đồng học tập', href: '#', desc: 'Tham gia cộng đồng' },
    { icon: HelpCircle, label: 'Câu hỏi thường gặp', href: '#', desc: 'Giải đáp thắc mắc' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'support@huflit.edu.vn', href: 'mailto:support@huflit.edu.vn', type: 'email' },
    { icon: Phone, label: '+84 383196830', href: 'tel:+84383196830', type: 'phone' },
    { icon: MapPin, label: 'TP. Hồ Chí Minh, Việt Nam', href: '#', type: 'location' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'bg-blue-700 hover:bg-blue-800' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com', color: 'bg-red-600 hover:bg-red-700' },
  ];

  const legalLinks = [
    { label: 'Điều khoản sử dụng', href: '#', icon: '📋' },
    { label: 'Chính sách bảo mật', href: '#', icon: '🔒' },
    { label: 'Liên hệ với chúng tôi', href: '#', icon: '📧' },
  ];
  
  const coreStats = [
    { icon: UserCircle, number: '0K+', label: 'Người dùng' },
    { icon: Trophy, number: '★', label: 'Đánh giá' },
    { icon: TrendingUp, number: '100+', label: 'Bài tập' },
  ];

  // Handle Newsletter Submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmailMessage('✓ Cảm ơn bạn đã đăng ký!');
      setEmail('');
      setTimeout(() => setEmailMessage(''), 3000);
    }
  };

  // Scroll function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // New structural minimalist container
    <footer className="bg-white border-t-8 border-orange-500/50 text-gray-700 font-inter">
      {/* Structural Top Section - Logo, Newsletter, and Primary Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Logo and Brand Identity */}
        <div className="text-center pb-12">
          <div className="flex justify-center mb-4">
            <img 
              src="/src/assets/logo.png" 
              alt="HUFLIT Logo" 
              className="h-16 w-auto transition-transform duration-500 hover:rotate-6 shadow-xl rounded-full"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x64/F97316/FFFFFF?text=Logo"; }}
            />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            HUFLIT <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Exam Prep</span>
          </h2>
          <p className="font-medium max-w-2xl mx-auto text-gray-500 text-sm">
            Nền tảng luyện thi chất lượng cao, giúp bạn tự tin chinh phục các bài kiểm tra ngôn ngữ và chuyên ngành.
          </p>
        </div>

        {/* Main Grid: Links, Contact/Stats, Features */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 border-t border-gray-200 pt-12">

          {/* Column 1 - Links (Structured) */}
          <div className="lg:col-span-1 space-y-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-4">
              Tài Nguyên
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-orange-600 transition-all duration-200 font-medium text-base flex items-center justify-between group py-1"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-orange-500 group-hover:scale-105" />
                        {link.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 2 - Contact & Social (Clean Block) */}
          <div className="lg:col-span-1 space-y-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-4">
              Liên Hệ & Hỗ Trợ
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <li key={idx}>
                    <a
                      href={info.href}
                      className="text-gray-600 hover:text-orange-600 transition-colors font-semibold text-base flex items-start gap-3 group"
                    >
                      <Icon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p>{info.label}</p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
             {/* Social Links */}
            <div className="flex gap-4 pt-4 border-t border-gray-100">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className={`w-10 h-10 rounded-full ${social.color} text-white flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-110`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Column 3 - Newsletter (High Contrast Card) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-4">
              Đăng Ký Nhận Tin
            </h4>
            <div className="bg-gray-100 rounded-xl p-6 border-4 border-transparent shadow-xl transition-all duration-300 hover:border-orange-200">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-orange-600" />
                <p className="text-lg font-bold text-gray-900">Không Spam, Chỉ Tin Tức Giá Trị!</p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    required
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-base transition-all font-medium shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-bold text-base transition-all duration-300 shadow-lg shadow-orange-500/50 transform hover:scale-[1.02] flex items-center gap-1"
                  >
                    <Send className="w-5 h-5" />
                    Đăng Ký
                  </button>
                </div>
                {emailMessage && (
                  <p className="text-sm text-green-600 font-bold mt-2">{emailMessage}</p>
                )}
              </form>
              <p className="text-xs text-gray-500 mt-3">Chúng tôi tôn trọng quyền riêng tư của bạn. Đăng ký để nhận tài liệu miễn phí mới nhất.</p>
            </div>
            
            {/* Quick Stats below Newsletter */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {coreStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-lg border border-gray-200 text-center hover:shadow-md transition-all"
                  >
                    <Icon className="w-6 h-6 mx-auto text-orange-500 mb-1" />
                    <p className="text-xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      {stat.number}
                    </p>
                    <p className="text-xs font-semibold text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR (CLEAN, STRUCTURAL DESIGN) --- */}
      <div className="bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left font-medium">
              © {currentYear} <span className="font-extrabold text-white">HUFLIT Exam Prep</span>
              <span className="ml-2 text-orange-400">| Made with</span>
              <Heart className="w-3 h-3 inline ml-1 text-red-500 fill-red-500 transition-transform hover:scale-125" />
              <span className="ml-1 text-orange-400">by Khoale.</span>
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 flex-wrap justify-center">
              {legalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors font-semibold text-sm flex items-center gap-2 hover:underline"
                >
                  <span>{link.icon}</span> 
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center font-bold group transform ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        title="Lên đầu trang"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer;
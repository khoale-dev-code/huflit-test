import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { 
  Mail, ArrowLeft, Send, Loader2, Target, CheckCircle2, 
  BookOpen, Users, Trophy, Zap, ShieldCheck 
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Import Firebase auth từ config của bạn
import { auth } from '../../config/firebase';

/* ─── SUB-COMPONENT: STAT CARD ──────────────────────────────── */
const StatCard = ({ icon: Icon, value, label, delay }) => {
  if (!Icon) return null;
  return (
    <Motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: 'spring' }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg"
    >
      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
        <Icon className="text-white" size={20} strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-white font-black text-lg leading-none">{value}</div>
        <div className="text-blue-100 text-xs font-bold mt-1 uppercase tracking-wider">{label}</div>
      </div>
    </Motion.div>
  );
};

/* ─── SUB-COMPONENT: INPUT FIELD ────────────────────────────── */
const InputField = ({ icon: Icon, label, ...props }) => {
  if (!Icon) return null;
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1CB0F6] transition-colors">
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <input
          {...props}
          className="w-full pl-12 pr-4 py-3.5 bg-[#F7F7F7] border-2 border-slate-200 border-b-4 rounded-2xl font-bold text-slate-700 outline-none transition-all focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-[#1CB0F6]/10 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT: Forgot Password
════════════════════════════════════════════════════════════════ */
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      // 🚀 THÊM CẤU HÌNH ĐỂ TRỎ LINK VỀ REACT APP (CÁCH 2)
      const actionCodeSettings = {
        // Lưu ý: Thay đổi URL này thành Domain thật của bạn khi Deploy lên mạng (vd: https://hubstudy.com/reset-password)
        url: 'http://localhost:5173/reset-password', 
        handleCodeInApp: true,
      };

      // Gửi email khôi phục kèm theo cấu hình URL
      await sendPasswordResetEmail(auth, email.trim(), actionCodeSettings);
      
      setIsSuccess(true);
    } catch (err) {
      const errorMap = {
        'auth/user-not-found': 'Không tìm thấy tài khoản với email này.',
        'auth/invalid-email': 'Định dạng email không hợp lệ.',
        'auth/too-many-requests': 'Bạn đã gửi yêu cầu quá nhiều lần. Vui lòng thử lại sau.'
      };
      setError(errorMap[err.code] || 'Đã có lỗi xảy ra. Vui lòng kiểm tra lại kết nối mạng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#F4F7FA]" style={{ fontFamily: '"Nunito", "Baloo 2", sans-serif' }}>
      
      {/* ── LEFT PANEL (Desktop Showcase - Giữ nguyên đồng bộ) ── */}
      <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden flex-col justify-center px-20 bg-gradient-to-br from-[#1CB0F6] via-[#1582D8] to-[#0D5EB9]">
        
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <Motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-20 -right-20 w-80 h-80 bg-sky-300 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <Motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl border-b-4 border-slate-200">
              <BookOpen className="text-[#1CB0F6]" size={28} strokeWidth={3} />
            </div>
            <span className="text-3xl font-black text-white tracking-tight">HUB<span className="text-yellow-300">STUDY</span></span>
          </Motion.div>

          <h1 className="text-5xl font-black text-white leading-tight mb-6 tracking-tight">
            Chinh phục đề thi<br />theo cách <span className="text-yellow-300 underline decoration-8 decoration-yellow-300/30">thông minh</span>.
          </h1>
          
          <p className="text-blue-100 text-lg font-bold mb-12 max-w-md">
            Đừng lo lắng, chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào tài khoản ngay lập tức.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard icon={Users} value="24,000+" label="Học viên" delay={0.1} />
            <StatCard icon={Trophy} value="98%" label="Đỗ mục tiêu" delay={0.2} />
            <StatCard icon={Zap} value="5,000+" label="Đề thi" delay={0.3} />
            <StatCard icon={ShieldCheck} value="Verified" label="Chất lượng" delay={0.4} />
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (Forgot Password Form) ── */}
      <div className="w-full lg:w-[50%] flex items-center justify-center p-6 bg-white lg:bg-transparent">
        <Motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px]"
        >
          {/* Form Container */}
          <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl lg:shadow-xl border-2 border-slate-100 border-b-8">
            
            <button 
              onClick={() => navigate('/login')}
              className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 border-2 border-slate-200 border-b-[3px] mb-6 hover:bg-slate-200 hover:text-slate-700 active:border-b-0 active:translate-y-[3px] transition-all outline-none"
              title="Quay lại"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </button>

            <h2 className="text-2xl font-black text-slate-800 mb-2">
              Quên mật khẩu? 🔒
            </h2>
            <p className="text-sm font-bold text-slate-400 mb-8 leading-relaxed">
              Nhập email liên kết với tài khoản của bạn. Chúng tôi sẽ gửi một liên kết để tạo mật khẩu mới.
            </p>

            {/* Trạng thái thành công */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <Motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-[#f1faeb] border-2 border-[#bcf096] rounded-2xl p-6 text-center shadow-sm"
                >
                  <div className="w-14 h-14 bg-[#58CC02] rounded-2xl flex items-center justify-center border-b-4 border-[#46A302] mx-auto mb-4 shadow-md">
                    <CheckCircle2 className="text-white" size={32} strokeWidth={3} />
                  </div>
                  <h3 className="text-[#46A302] font-black text-[18px] mb-2">Đã gửi liên kết!</h3>
                  <p className="text-[#58CC02] text-[14px] font-bold mb-6">
                    Vui lòng kiểm tra hộp thư đến (hoặc thư rác) của <span className="text-[#46A302] underline">{email}</span> để làm các bước tiếp theo.
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full py-3.5 bg-white border-2 border-slate-200 border-b-4 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[13px] hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] transition-all outline-none"
                  >
                    Quay lại đăng nhập
                  </button>
                </Motion.div>
              ) : (
                <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Trạng thái lỗi */}
                  <AnimatePresence mode="wait">
                    {error && (
                      <Motion.div 
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="mb-6 p-4 rounded-2xl bg-[#FFF0F0] border-2 border-[#ffc1c1] text-[#FF4B4B] text-[13px] font-bold flex items-center gap-2.5 shadow-sm"
                      >
                        <Target size={16} className="rotate-45 shrink-0" strokeWidth={3} /> {error}
                      </Motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Nhập Email */}
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <InputField 
                      label="Địa chỉ Email" icon={Mail} type="email" placeholder="email@vi-du.com" required
                      value={email} onChange={e => setEmail(e.target.value)}
                    />

                    <Motion.button
                      whileHover={{ translateY: -2 }}
                      whileTap={{ translateY: 2 }}
                      disabled={loading}
                      className="w-full py-4 bg-[#1CB0F6] text-white rounded-2xl font-black uppercase tracking-widest text-[14px] shadow-[0_4px_0_#1899D6] border-b-4 border-[#1899D6] active:border-b-0 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:translate-y-[4px] disabled:border-b-0 outline-none"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} strokeWidth={3} /> : <Send size={20} strokeWidth={3} />}
                      {loading ? 'Đang gửi...' : 'Gửi liên kết đặt lại'}
                    </Motion.button>
                  </form>
                </Motion.div>
              )}
            </AnimatePresence>
            
          </div>

          {/* Dòng link hỗ trợ */}
          <p className="mt-8 text-center text-slate-400 text-[13px] font-bold">
            Bạn cần trợ giúp?
            <a href="mailto:support@hubstudy.com" className="ml-1.5 text-[#1CB0F6] font-black hover:text-[#1899D6] transition-colors underline underline-offset-4">
              Liên hệ Support
            </a>
          </p>

        </Motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;  
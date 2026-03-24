import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { 
  Lock, ArrowRight, Loader2, Target, CheckCircle2, 
  BookOpen, ShieldCheck, KeyRound, AlertTriangle
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Import Firebase auth từ config của bạn
import { auth } from '../../config/firebase';

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
   MAIN COMPONENT: Reset Password
════════════════════════════════════════════════════════════════ */
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Lấy mã oobCode từ URL do Firebase gửi kèm
  const oobCode = searchParams.get('oobCode');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [emailToReset, setEmailToReset] = useState('');

  // Kiểm tra xem đường link (oobCode) có hợp lệ hoặc đã hết hạn chưa
  useEffect(() => {
    if (!oobCode) {
      setIsCodeValid(false);
      setError('Đường dẫn không hợp lệ hoặc bị thiếu mã xác thực.');
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        setEmailToReset(email); // Lấy được email của user nếu mã hợp lệ
      })
      .catch(() => {
        setIsCodeValid(false);
        setError('Đường dẫn đã hết hạn hoặc đã được sử dụng. Vui lòng yêu cầu gửi lại email mới.');
      });
  }, [oobCode]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      // Đổi mật khẩu trên Firebase
      await confirmPasswordReset(auth, oobCode, newPassword);
      setIsSuccess(true);
    } catch {
      setError('Đã có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#F4F7FA]" style={{ fontFamily: '"Nunito", "Baloo 2", sans-serif' }}>
      
      {/* ── LEFT PANEL (Giữ nguyên sự đồng bộ thương hiệu) ── */}
      <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden flex-col justify-center px-20 bg-gradient-to-br from-[#1CB0F6] via-[#1582D8] to-[#0D5EB9]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl border-b-4 border-slate-200">
              <BookOpen className="text-[#1CB0F6]" size={28} strokeWidth={3} />
            </div>
            <span className="text-3xl font-black text-white tracking-tight">HUB<span className="text-yellow-300">STUDY</span></span>
          </div>
          <h1 className="text-5xl font-black text-white leading-tight mb-6 tracking-tight">
            Bảo mật tuyệt đối<br />cho <span className="text-yellow-300 underline decoration-8 decoration-yellow-300/30">tài khoản</span> của bạn.
          </h1>
          <p className="text-blue-100 text-lg font-bold mb-12 max-w-md">
            Khôi phục quyền truy cập nhanh chóng và an toàn để tiếp tục hành trình học tập.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL (Form Đặt Lại Mật Khẩu) ── */}
      <div className="w-full lg:w-[50%] flex items-center justify-center p-6 bg-white lg:bg-transparent">
        <Motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[420px]">
          
          <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl lg:shadow-xl border-2 border-slate-100 border-b-8">
            
            <div className="w-16 h-16 bg-[#EAF6FE] rounded-2xl flex items-center justify-center border-b-4 border-[#BAE3FB] mb-6">
              <KeyRound className="text-[#1CB0F6]" size={32} strokeWidth={2.5} />
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-2">Tạo mật khẩu mới 🔑</h2>
            <p className="text-sm font-bold text-slate-400 mb-8 leading-relaxed">
              {emailToReset ? (
                <>Đang đặt lại mật khẩu cho <strong className="text-slate-600">{emailToReset}</strong></>
              ) : 'Vui lòng nhập mật khẩu mới bảo mật hơn.'}
            </p>

            {/* BÁO LỖI NẾU LINK HỎNG / HẾT HẠN */}
            {!isCodeValid ? (
              <div className="bg-[#FFF0F0] border-2 border-[#ffc1c1] border-b-[4px] rounded-2xl p-6 text-center shadow-sm mb-6">
                <AlertTriangle className="text-[#FF4B4B] mx-auto mb-3" size={36} strokeWidth={2.5} />
                <h3 className="text-[#E54343] font-black text-[16px] mb-2">Đường link không hợp lệ!</h3>
                <p className="text-[#FF4B4B] text-[13px] font-bold mb-5">{error}</p>
                <button
                  onClick={() => navigate('/forgot-password')}
                  className="w-full py-3.5 bg-white border-2 border-slate-200 border-b-4 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[13px] hover:bg-slate-50 active:border-b-0 active:translate-y-[4px] transition-all outline-none"
                >
                  Yêu cầu gửi link mới
                </button>
              </div>
            ) : isSuccess ? (
              /* THÀNH CÔNG */
              <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#f1faeb] border-2 border-[#bcf096] border-b-[4px] rounded-2xl p-6 text-center shadow-sm">
                <CheckCircle2 className="text-[#58CC02] mx-auto mb-3" size={40} strokeWidth={3} />
                <h3 className="text-[#46A302] font-black text-[18px] mb-2">Đổi mật khẩu thành công!</h3>
                <p className="text-[#58CC02] text-[13px] font-bold mb-6">Tài khoản của bạn đã được bảo mật. Bạn có thể đăng nhập bằng mật khẩu mới ngay bây giờ.</p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-4 bg-[#58CC02] text-white border-b-4 border-[#46A302] rounded-2xl font-black uppercase tracking-widest text-[14px] hover:brightness-105 active:border-b-0 active:translate-y-[4px] transition-all outline-none"
                >
                  Đăng nhập ngay
                </button>
              </Motion.div>
            ) : (
              /* FORM NHẬP MẬT KHẨU MỚI */
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AnimatePresence mode="wait">
                  {error && (
                    <Motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-6 p-4 rounded-2xl bg-[#FFF0F0] border-2 border-[#ffc1c1] text-[#FF4B4B] text-[13px] font-bold flex items-center gap-2.5 shadow-sm">
                      <Target size={16} className="rotate-45 shrink-0" strokeWidth={3} /> {error}
                    </Motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleResetPassword} className="space-y-6">
                  <InputField 
                    label="Mật khẩu mới" icon={Lock} type="password" placeholder="Tối thiểu 6 ký tự" required
                    value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  />
                  <InputField 
                    label="Xác nhận mật khẩu mới" icon={ShieldCheck} type="password" placeholder="Nhập lại mật khẩu" required
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  />

                  <Motion.button
                    whileHover={{ translateY: -2 }} whileTap={{ translateY: 2 }} disabled={loading}
                    className="w-full py-4 bg-[#1CB0F6] text-white rounded-2xl font-black uppercase tracking-widest text-[14px] shadow-[0_4px_0_#1899D6] border-b-4 border-[#1899D6] active:border-b-0 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:translate-y-[4px] disabled:border-b-0 outline-none"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} strokeWidth={3} /> : <ArrowRight size={20} strokeWidth={3} />}
                    {loading ? 'Đang xử lý...' : 'Lưu mật khẩu mới'}
                  </Motion.button>
                </form>
              </Motion.div>
            )}
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
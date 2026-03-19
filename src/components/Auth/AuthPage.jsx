 
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { 
  Mail, Lock, User, LogIn, ArrowRight, Loader2, 
  Zap, Trophy, BookOpen, Target, Users, ShieldCheck 
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

import { auth, googleProvider } from '../../config/firebase';
import { supabase } from '../../config/supabaseClient';

/* ─── DESIGN TOKENS (Xanh dương nhạt chủ đạo) ────────────────── */
const THEME = {
  primary: '#1CB0F6',
  primaryDark: '#1899D6',
  primaryLight: '#EAF6FE',
  primaryBorder: '#BAE3FB',
  success: '#58CC02',
  successDark: '#46A302',
  error: '#FF4B4B',
  errorBg: '#FFF0F0',
  textMain: '#4B4B4B',
  textMuted: '#AFB3B8',
  white: '#FFFFFF',
  bgGray: '#F7F7F7'
};

/* ─── SUB-COMPONENT: STAT CARD ──────────────────────────────── */
const StatCard = ({ icon: Icon, value, label, delay }) => {
  if (!Icon) return null; // ✅ Thêm kiểm tra an toàn cho Linter
  
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
  if (!Icon) return null; // ✅ Thêm kiểm tra an toàn cho Linter

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
          className="w-full pl-12 pr-4 py-3.5 bg-[#F7F7F7] border-2 border-slate-200 border-b-4 rounded-2xl font-bold text-slate-700 outline-none transition-all focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-[#1CB0F6]/10"
        />
      </div>
    </div>
  );
};  
/* ════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

  // Sync profile to Supabase (Optimized)
  const syncToSupabase = useCallback(async (user, providedName = '') => {
    try {
      const finalName = providedName?.trim() || user.displayName || 'Học viên';
      const now = new Date().toISOString();

      const profileData = {
        id: user.uid,
        email: user.email,
        full_name: finalName,
        avatar_url: user.photoURL || '',
        role: 'student',
        last_login: now
      };

      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert([profileData], { onConflict: 'id' });

      if (upsertError) throw upsertError;
    } catch (err) {
      console.error('Supabase Sync Error:', err.message);
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let cred;
      if (isLogin) {
        cred = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        if (!formData.fullName.trim()) throw new Error('Vui lòng nhập họ và tên');
        cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(cred.user, { displayName: formData.fullName.trim() });
      }
      
      await syncToSupabase(cred.user, formData.fullName);
      navigate('/');
    } catch (err) {
      const errorMap = {
        'auth/email-already-in-use': 'Email này đã được đăng ký.',
        'auth/wrong-password': 'Mật khẩu không chính xác.',
        'auth/user-not-found': 'Tài khoản không tồn tại.',
        'auth/weak-password': 'Mật khẩu cần ít nhất 6 ký tự.'
      };
      setError(errorMap[err.code] || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncToSupabase(result.user);
      navigate('/');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setError('Đăng nhập Google thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#F4F7FA]" style={{ fontFamily: '"Nunito", "Baloo 2", sans-serif' }}>
      
      {/* ── LEFT PANEL (Desktop Showcase) ── */}
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
            Hệ thống luyện thi chuẩn 2026 với giải thích chi tiết và lộ trình cá nhân hóa.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard icon={Users} value="24,000+" label="Học viên" delay={0.1} />
            <StatCard icon={Trophy} value="98%" label="Đỗ mục tiêu" delay={0.2} />
            <StatCard icon={Zap} value="5,000+" label="Đề thi" delay={0.3} />
            <StatCard icon={ShieldCheck} value="Verified" label="Chất lượng" delay={0.4} />
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (Auth Form) ── */}
      <div className="w-full lg:w-[50%] flex items-center justify-center p-6 bg-white lg:bg-transparent">
        <Motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px]"
        >
          {/* Form Container */}
          <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl lg:shadow-xl border-2 border-slate-100 border-b-8">
            
            {/* Tab Toggle */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-8 border-2 border-slate-200">
              {['Đăng nhập', 'Đăng ký'].map((label, idx) => {
                const active = (idx === 0) === isLogin;
                return (
                  <button
                    key={label}
                    onClick={() => { setIsLogin(idx === 0); setError(''); }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      active ? 'bg-white text-[#1CB0F6] shadow-sm border-b-2 border-[#1CB0F6]' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-2">
              {isLogin ? 'Chào mừng trở lại! 👋' : 'Bắt đầu hành trình 🚀'}
            </h2>
            <p className="text-sm font-bold text-slate-400 mb-8">
              {isLogin ? 'Tiếp tục rèn luyện để giữ vững phong độ.' : 'Tạo tài khoản để lưu lại tiến trình học tập.'}
            </p>

            <AnimatePresence mode="wait">
              {error && (
                <Motion.div 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-100 text-red-500 text-xs font-bold flex items-center gap-2"
                >
                  <Target size={14} className="rotate-45" /> {error}
                </Motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleAuth} className="space-y-5">
              {!isLogin && (
                <InputField 
                  label="Họ và tên" icon={User} type="text" placeholder="Nguyễn Văn A" required
                  value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              )}
              
              <InputField 
                label="Email" icon={Mail} type="email" placeholder="email@vi-du.com" required
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />

              <InputField 
                label="Mật khẩu" icon={Lock} type="password" placeholder="••••••••" required
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              />

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-xs font-black text-[#1CB0F6] hover:text-[#1899D6] uppercase tracking-wider">
                    Quên mật khẩu?
                  </button>
                </div>
              )}

              <Motion.button
                whileHover={{ translateY: -2 }}
                whileTap={{ translateY: 2 }}
                disabled={loading}
                className="w-full py-4 bg-[#1CB0F6] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_4px_0_#1899D6] border-b-4 border-[#1899D6] active:border-b-0 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : isLogin ? <LogIn size={18} /> : <ArrowRight size={18} />}
                {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
              </Motion.button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">hoặc</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <button
              onClick={handleGoogleAuth}
              type="button"
              className="w-full py-4 bg-white border-2 border-slate-200 border-b-4 rounded-2xl font-black text-slate-600 text-sm flex items-center justify-center gap-3 hover:bg-slate-50 active:border-b-0 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Tiếp tục với Google
            </button>
          </div>

          <p className="mt-8 text-center text-slate-400 text-sm font-bold">
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="ml-2 text-[#1CB0F6] font-black hover:underline underline-offset-4"
            >
              {isLogin ? 'Đăng ký ngay →' : 'Đăng nhập →'}
            </button>
          </p>
        </Motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
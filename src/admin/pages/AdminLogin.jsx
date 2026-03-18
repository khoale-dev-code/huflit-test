
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

const C = {
  blue: '#1CB0F6', blueDark: '#0d8ecf', blueBg: '#EAF6FE', blueBorder: '#BAE3FB',
  red: '#FF4B4B', redBg: '#FFF0F0', redBorder: '#ffd6d6',
  n100: '#F4F7FA', n200: '#e2e8f0', n400: '#94a3b8', n600: '#475569', n800: '#1e293b',
};

/* ─── Input field 3D ── */
const Field = ({ label, icon: Icon, error, right, ...props }) => (
  <div>
    <label className="block text-[10px] font-black uppercase tracking-[0.14em] mb-2 ml-0.5"
           style={{ color: C.n400 }}>{label}</label>
    <div className="relative">
      <Icon size={15} strokeWidth={2.5} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
           style={{ color: error ? C.red : C.n400 }} />
      <input
        {...props}
        className="w-full pl-11 pr-12 py-3.5 rounded-[16px] text-[14px] font-bold outline-none transition-all"
        style={{
          background: error ? C.redBg : C.n100,
          border: `2px solid ${error ? C.redBorder : C.n200}`,
          borderBottom: `4px solid ${error ? C.red : '#cbd5e1'}`,
          color: C.n800,
        }}
        onFocus={e => {
          if (!error) {
            e.target.style.border = `2px solid ${C.blue}`;
            e.target.style.borderBottom = `4px solid ${C.blueDark}`;
            e.target.style.background = 'white';
            e.target.style.boxShadow = `0 0 0 3px ${C.blueBg}`;
          }
        }}
        onBlur={e => {
          e.target.style.border = `2px solid ${error ? C.redBorder : C.n200}`;
          e.target.style.borderBottom = `4px solid ${error ? C.red : '#cbd5e1'}`;
          e.target.style.background = error ? C.redBg : C.n100;
          e.target.style.boxShadow = 'none';
        }}
      />
      {right && <div className="absolute right-4 top-1/2 -translate-y-1/2">{right}</div>}
    </div>
    <AnimatePresence>
      {error && (
        <Motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="flex items-center gap-1 text-[11px] font-bold mt-1.5 ml-0.5"
          style={{ color: C.red }}>
          <AlertCircle size={11} /> {error}
        </Motion.p>
      )}
    </AnimatePresence>
  </div>
);

/* ─── Google SVG ── */
const GoogleSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* ════════════════════════════════════════════════════════════ */
export default function AdminLogin() {
  const navigate = useNavigate();
  const { signIn, loading, isAdmin, error: roleError } = useAdminAuth();
  const { signInWithGoogle } = useFirebaseAuth();

  const [form,      setForm]      = useState({ email: '', password: '' });
  const [showPwd,   setShowPwd]   = useState(false);
  const [gLoading,  setGLoading]  = useState(false);
  const [banner,    setBanner]    = useState(null); // { type: 'error'|'ok', text }
  const [errors,    setErrors]    = useState({});

  useEffect(() => { if (isAdmin) navigate('/admin/dashboard', { replace: true }); }, [isAdmin, navigate]);
  useEffect(() => { if (roleError) setBanner({ type: 'error', text: roleError }); }, [roleError]);

  const busy = loading || gLoading;

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = {
      email:    !form.email    ? 'Email là bắt buộc'    : '',
      password: !form.password ? 'Mật khẩu là bắt buộc' : '',
    };
    if (errs.email || errs.password) return setErrors(errs);
    setBanner(null); setErrors({});
    try {
      await signIn(form.email, form.password);
    } catch {
      setBanner({ type: 'error', text: 'Email hoặc mật khẩu không chính xác.' });
    }
  };

  const handleGoogle = async () => {
    setGLoading(true); setBanner(null);
    const res = await signInWithGoogle();
    if (!res.success) { setBanner({ type: 'error', text: res.error }); setGLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
         style={{ background: C.n100, fontFamily: '"Nunito","Baloo 2",sans-serif' }}>

      {/* ── Ambient orbs ── */}
      <Motion.div animate={{ y: [-20, 20, -20] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'rgba(28,176,246,0.12)', filter: 'blur(80px)' }} />
      <Motion.div animate={{ y: [20, -20, 20] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2"
        style={{ background: 'rgba(206,130,255,0.10)', filter: 'blur(80px)' }} />

      {/* ── Grid texture ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
           style={{ backgroundImage: 'linear-gradient(to right,#e2e8f0 1px,transparent 1px),linear-gradient(to bottom,#e2e8f0 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* ══ Card ══ */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="bg-white rounded-[28px] p-8 space-y-6"
             style={{ border: `2px solid ${C.n200}`, borderBottom: `6px solid #cbd5e1`,
                      boxShadow: '0 12px 48px rgba(0,0,0,0.08)' }}>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[16px] flex items-center justify-center"
                 style={{ background: C.blueBg, border: `2px solid ${C.blueBorder}`,
                          borderBottom: `5px solid ${C.blue}`, boxShadow: `0 3px 0 ${C.blue}33` }}>
              <Shield size={22} style={{ color: C.blue }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[17px] font-black text-slate-800 leading-tight tracking-tight">
                HubStudy <span style={{ color: C.blue }}>Admin</span>
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: C.n400 }}>
                Security Gateway
              </p>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-[24px] font-black text-slate-800 tracking-tight leading-tight">
              Chào mừng trở lại! 👋
            </h1>
            <p className="text-[13px] font-bold mt-1" style={{ color: C.n400 }}>
              Nhập thông tin quản trị viên để tiếp tục.
            </p>
          </div>

          {/* Banner */}
          <AnimatePresence>
            {banner && (
              <Motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} className="overflow-hidden"
              >
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-[14px] text-[13px] font-bold"
                     style={{ background: banner.type === 'error' ? C.redBg : '#F0FAE8',
                              border: `2px solid ${banner.type === 'error' ? C.redBorder : '#b4e893'}`,
                              color: banner.type === 'error' ? C.red : '#46A302' }}>
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  {banner.text}
                </div>
              </Motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Field label="Email" icon={Shield} type="email" placeholder="admin@hubstudy.edu"
              value={form.email} error={errors.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />

            <Field label="Mật khẩu" icon={Shield} type={showPwd ? 'text' : 'password'}
              placeholder="••••••••" value={form.password} error={errors.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              right={
                <button type="button" onClick={() => setShowPwd(v => !v)} className="outline-none"
                        style={{ color: C.n400 }}>
                  {showPwd ? <EyeOff size={17} strokeWidth={2.5} /> : <Eye size={17} strokeWidth={2.5} />}
                </button>
              }
            />

            {/* Submit */}
            <button type="submit" disabled={busy}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-[16px] text-[14px] font-black uppercase tracking-wider transition-all outline-none mt-1"
              style={{
                background: C.blue, color: 'white',
                border: `2px solid ${C.blueDark}`, borderBottom: `5px solid ${C.blueDark}`,
                boxShadow: `0 4px 18px rgba(28,176,246,0.28)`,
                opacity: busy ? 0.7 : 1,
              }}
              onMouseEnter={e => { if (!busy) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
              onMouseDown={e  => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '3px'; }}
              onMouseUp={e    => { e.currentTarget.style.borderBottomWidth = '5px'; }}
            >
              {loading
                ? <Loader2 size={18} className="animate-spin" />
                : <><ArrowRight size={17} strokeWidth={2.5} /> Đăng nhập hệ thống</>}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: C.n200 }} />
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.n400 }}>hoặc</span>
            <div className="flex-1 h-px" style={{ background: C.n200 }} />
          </div>

          {/* Google */}
          <button type="button" onClick={handleGoogle} disabled={busy}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-[16px] text-[14px] font-black transition-all outline-none"
            style={{
              background: 'white', color: C.n800,
              border: `2px solid ${C.n200}`, borderBottom: `5px solid #cbd5e1`,
              opacity: busy ? 0.7 : 1,
            }}
            onMouseEnter={e => { if (!busy) { e.currentTarget.style.borderColor = C.blueBorder; e.currentTarget.style.transform = 'translateY(-2px)'; }}}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.n200; e.currentTarget.style.transform = ''; }}
            onMouseDown={e  => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '3px'; }}
            onMouseUp={e    => { e.currentTarget.style.borderBottomWidth = '5px'; }}
          >
            {gLoading
              ? <Loader2 size={18} className="animate-spin" style={{ color: C.blue }} />
              : <><GoogleSVG /> Tiếp tục với Google</>}
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-[11px] font-bold mt-4" style={{ color: C.n400 }}>
          © {new Date().getFullYear()} HubStudy Pulse · Secure Environment
        </p>
      </Motion.div>
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth'; // Import hook Google Login

/* ─── Google M3 CSS (Giữ nguyên của Khoa) ───────────────── */
const M3Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;500;600;700&family=Google+Sans+Text:wght@400;500&display=swap');

    .al-root * { box-sizing: border-box; }

    .al-root {
      font-family: 'Google Sans Text', system-ui, sans-serif;
      --m3-primary:        #1A56DB;
      --m3-primary-dark:   #0D47A1;
      --m3-on-primary:     #ffffff;
      --m3-surface:        #F7F8FF;
      --m3-surface-card:   #ffffff;
      --m3-outline:        #C4C6D0;
      --m3-outline-focus:  #1A56DB;
      --m3-error:          #BA1A1A;
      --m3-error-bg:       #FFF0EE;
      --m3-error-border:   #FFBAB1;
      --m3-success:        #006C51;
      --m3-success-bg:     #F0FDF9;
      --m3-on-surface:     #1A1B1F;
      --m3-on-surface-var: #44464F;
      --m3-scrim:          rgba(0,0,0,0.32);
    }

    /* Ripple */
    .m3-ripple {
      position: relative;
      overflow: hidden;
    }
    .m3-ripple::after {
      content: '';
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      transition: opacity 200ms;
      border-radius: inherit;
    }
    .m3-ripple:hover::after  { opacity: 0.08; }
    .m3-ripple:active::after { opacity: 0.16; }

    /* Outlined text field */
    .m3-field { position: relative; width: 100%; }

    .m3-field input {
      width: 100%;
      height: 56px;
      padding: 16px 16px 4px;
      font-family: 'Google Sans Text', system-ui, sans-serif;
      font-size: 16px;
      color: var(--m3-on-surface);
      background: var(--m3-surface-card);
      border: 1.5px solid var(--m3-outline);
      border-radius: 4px;
      outline: none;
      transition: border-color 200ms, box-shadow 200ms;
      caret-color: var(--m3-primary);
    }
    .m3-field input:focus {
      border-color: var(--m3-outline-focus);
      border-width: 2px;
    }
    .m3-field input.error {
      border-color: var(--m3-error);
    }
    .m3-field input.error:focus {
      border-color: var(--m3-error);
      border-width: 2px;
    }
    .m3-field input:disabled {
      background: #E1E2EC;
      color: #91939F;
      cursor: not-allowed;
    }

    /* Floating label */
    .m3-field label {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      font-family: 'Google Sans Text', system-ui, sans-serif;
      font-size: 16px;
      color: var(--m3-on-surface-var);
      pointer-events: none;
      transition: top 150ms cubic-bezier(0.4,0,0.2,1),
                  font-size 150ms cubic-bezier(0.4,0,0.2,1),
                  color 150ms;
      background: var(--m3-surface-card);
      padding: 0 4px;
      border-radius: 2px;
    }
    .m3-field input:focus ~ label,
    .m3-field input:not(:placeholder-shown) ~ label {
      top: 0;
      font-size: 12px;
      color: var(--m3-outline-focus);
    }
    .m3-field input.error ~ label,
    .m3-field input.error:focus ~ label {
      color: var(--m3-error);
    }
    .m3-field input:disabled ~ label {
      color: #91939F;
    }

    /* Supporting text */
    .m3-field .support {
      font-size: 12px;
      margin: 4px 16px 0;
      color: var(--m3-on-surface-var);
      min-height: 16px;
      transition: color 150ms;
    }
    .m3-field .support.error { color: var(--m3-error); }

    /* Filled button */
    .m3-btn-filled {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      height: 40px;
      padding: 0 24px;
      font-family: 'Google Sans', system-ui, sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.1px;
      color: var(--m3-on-primary);
      background: var(--m3-primary);
      border: none;
      border-radius: 100px;
      cursor: pointer;
      transition: background 200ms, box-shadow 200ms, transform 100ms;
    }
    .m3-btn-filled:hover:not(:disabled) {
      background: #1649C0;
      box-shadow: 0 1px 2px rgba(26,86,219,0.3), 0 2px 6px rgba(26,86,219,0.15);
    }
    .m3-btn-filled:active:not(:disabled) {
      background: var(--m3-primary-dark);
      transform: scale(0.98);
    }
    .m3-btn-filled:disabled {
      background: rgba(26,27,31,0.12);
      color: rgba(26,27,31,0.38);
      cursor: not-allowed;
      box-shadow: none;
    }

    /* Error/Success banner */
    .m3-error-banner, .m3-success-banner {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      animation: m3-slide-in 200ms ease;
    }
    .m3-error-banner { background: var(--m3-error-bg); border: 1px solid var(--m3-error-border); }
    .m3-success-banner { background: var(--m3-success-bg); border: 1px solid #A7F3D0; }

    @keyframes m3-slide-in {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Loading spinner */
    .m3-spinner {
      width: 20px; height: 20px;
      border: 2.5px solid rgba(255,255,255,0.4);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 700ms linear infinite;
    }
    .m3-spinner-dark {
      border-color: rgba(26,86,219,0.2);
      border-top-color: var(--m3-primary);
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Icon buttons & Checkbox */
    .m3-icon-btn {
      display: flex; align-items: center; justify-content: center;
      width: 36px; height: 36px; border: none; background: none;
      border-radius: 50%; cursor: pointer; color: var(--m3-on-surface-var);
      transition: background 150ms;
    }
    .m3-icon-btn:hover  { background: rgba(26,27,31,0.08); }
    .m3-icon-btn:active { background: rgba(26,27,31,0.16); }

    .m3-divider {
      display: flex; align-items: center; gap: 12px;
      color: var(--m3-on-surface-var); font-size: 12px; margin: 20px 0;
    }
    .m3-divider::before, .m3-divider::after {
      content: ''; flex: 1; height: 1px; background: var(--m3-outline);
    }

    .dot-bg {
      background-image: radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px);
      background-size: 28px 28px;
    }
    .m3-checkbox { width: 18px; height: 18px; accent-color: var(--m3-primary); cursor: pointer; }
  `}</style>
);

/* ─── Outlined Text Field ───────────────────────────────── */
const M3Field = ({ label, name, type = 'text', value, onChange, error, disabled, autoComplete, rightSlot }) => (
  <div className="m3-field">
    <input
      id={name} name={name} type={type} value={value}
      onChange={onChange} placeholder=" " autoComplete={autoComplete}
      disabled={disabled} className={error ? 'error' : ''}
      style={{ paddingRight: rightSlot ? 48 : 16 }}
    />
    <label htmlFor={name}>{label}</label>
    {rightSlot && (
      <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
        {rightSlot}
      </div>
    )}
    <div className={`support${error ? ' error' : ''}`}>{error || ''}</div>
  </div>
);

/* ─── Main Component ────────────────────────────────────── */
const AdminLogin = () => {
  const navigate = useNavigate();
  // Lấy hàm signIn (Email) và trạng thái từ hook Admin
  const { signIn, loading: adminLoading, isAdmin, error: adminRoleError } = useAdminAuth();
  // Lấy hàm đăng nhập Google từ hook Firebase
  const { signInWithGoogle } = useFirebaseAuth();

  const [showPwd, setShowPwd]   = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [banner, setBanner]     = useState(null); 
  const [fieldErr, setFieldErr] = useState({ email: '', password: '' });
  const [form, setForm]         = useState({ email: '', password: '', remember: false });
  const emailRef = useRef(null);

  // Gộp loading state
  const isAnyLoading = adminLoading || isGoogleLoading;

  // Xử lý chuyển hướng nếu đã là Admin
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdmin, navigate]);

  // Hiển thị lỗi từ hook Admin (VD: "Bạn không có quyền Admin")
  useEffect(() => {
    if (adminRoleError) {
      setBanner({ type: 'error', msg: adminRoleError });
      setIsGoogleLoading(false); // Reset loading nếu check role thất bại
    }
  }, [adminRoleError]);

  useEffect(() => { emailRef.current?.focus(); }, []);

  const validate = () => {
    const errs = { email: '', password: '' };
    let ok = true;
    if (!form.email.trim()) {
      errs.email = 'Email không được để trống';
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Địa chỉ email không hợp lệ';
      ok = false;
    }
    if (!form.password) {
      errs.password = 'Mật khẩu không được để trống';
      ok = false;
    } else if (form.password.length < 6) {
      errs.password = 'Mật khẩu tối thiểu 6 ký tự';
      ok = false;
    }
    setFieldErr(errs);
    return ok;
  };

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [e.target.name]: val }));
    if (e.target.name in fieldErr) setFieldErr((fe) => ({ ...fe, [e.target.name]: '' }));
    setBanner(null);
  };

  // Đăng nhập bằng Email / Mật khẩu
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setBanner(null);

    try {
      await signIn(form.email.trim(), form.password);
      // Nếu signIn thành công, useAdminAuth sẽ tự set isAdmin = true và trigger useEffect chuyển hướng
    } catch (err) {
      setBanner({ type: 'error', msg: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.' });
    }
  };

  // Đăng nhập bằng Google
  const handleGoogleSubmit = async () => {
    setIsGoogleLoading(true);
    setBanner(null);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        setBanner({ type: 'success', msg: 'Xác thực Google thành công! Đang kiểm tra quyền...' });
        // Sau khi Google Auth xong, onAuthStateChanged trong useAdminAuth sẽ tự chạy để check Supabase Role
      } else {
        setBanner({ type: 'error', msg: result.error || 'Đăng nhập Google thất bại.' });
        setIsGoogleLoading(false);
      }
    } catch (error) {
      setBanner({ type: 'error', msg: 'Có lỗi xảy ra khi gọi Google Login.' });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="al-root" style={{ minHeight: '100vh', display: 'flex', background: 'var(--m3-surface)' }}>
      <M3Styles />

      {/* ── Cột trái (Form Đăng nhập) ── */}
      <div className="lg-left" style={{
        flex: '0 0 100%', maxWidth: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
      }}>
        <div style={{
          width: '100%', maxWidth: 420, background: 'var(--m3-surface-card)',
          borderRadius: 28, padding: '40px 32px 36px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(26,86,219,0.06)',
          border: '1px solid var(--m3-outline)',
        }}>

          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{
              width: 40, height: 40, background: 'var(--m3-primary)', borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(26,86,219,0.35)', flexShrink: 0,
            }}>
              <Shield size={20} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{
                fontFamily: "'Google Sans Display', system-ui", fontWeight: 700,
                fontSize: 18, color: 'var(--m3-on-surface)', letterSpacing: '-0.3px',
              }}>HubStudy Admin</div>
              <div style={{ fontSize: 12, color: 'var(--m3-on-surface-var)', marginTop: 1 }}>
                Cổng quản trị hệ thống
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontFamily: "'Google Sans Display', system-ui", fontSize: 24, fontWeight: 600, color: 'var(--m3-on-surface)', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              Đăng nhập
            </h1>
            <p style={{ fontSize: 14, color: 'var(--m3-on-surface-var)', margin: 0 }}>
              Sử dụng tài khoản quản trị viên của bạn
            </p>
          </div>

          {/* Hiển thị lỗi / thành công */}
          {banner && (
            <div style={{ marginBottom: 20 }}>
              {banner.type === 'error' ? (
                <div className="m3-error-banner">
                  <AlertCircle size={18} color="var(--m3-error)" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 14, color: '#410002', lineHeight: 1.4 }}>{banner.msg}</span>
                </div>
              ) : (
                <div className="m3-success-banner">
                  <CheckCircle size={18} color="var(--m3-success)" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 14, color: '#003829', lineHeight: 1.4 }}>{banner.msg}</span>
                </div>
              )}
            </div>
          )}

          {/* Form Email / Pass */}
          <form onSubmit={handleEmailSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <M3Field
              label="Địa chỉ email" name="email" type="email"
              value={form.email} onChange={handleChange} error={fieldErr.email}
              disabled={isAnyLoading} autoComplete="email"
            />
            <M3Field
              label="Mật khẩu" name="password" type={showPwd ? 'text' : 'password'}
              value={form.password} onChange={handleChange} error={fieldErr.password}
              disabled={isAnyLoading} autoComplete="current-password"
              rightSlot={
                <button type="button" className="m3-icon-btn" onClick={() => setShowPwd((v) => !v)} tabIndex={-1}>
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 0 16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: 'var(--m3-on-surface-var)' }}>
                <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} className="m3-checkbox" disabled={isAnyLoading} />
                Ghi nhớ đăng nhập
              </label>
            </div>

            <button type="submit" disabled={isAnyLoading} className="m3-btn-filled" style={{ height: 48, fontSize: 15, borderRadius: 12 }}>
              {adminLoading ? <><div className="m3-spinner" /> Đang xác thực...</> : 'Đăng nhập Email'}
            </button>
          </form>

          {/* ── NÚT GOOGLE LOGIN ── */}
          <div className="m3-divider">Hoặc đăng nhập bằng</div>
          
          <button
            type="button"
            onClick={handleGoogleSubmit}
            disabled={isAnyLoading}
            className="m3-ripple"
            style={{
              width: '100%', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: '#fff', border: '1.5px solid var(--m3-outline)', borderRadius: 12, cursor: isAnyLoading ? 'not-allowed' : 'pointer',
              fontSize: 14, fontWeight: 600, color: 'var(--m3-on-surface)', fontFamily: "'Google Sans', system-ui",
              opacity: isAnyLoading ? 0.7 : 1, transition: 'background 0.2s'
            }}
          >
            {isGoogleLoading ? (
               <><div className="m3-spinner m3-spinner-dark" /> Đang kết nối...</>
            ) : (
               <>
                 <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
                 Tiếp tục với Google
               </>
            )}
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#91939F', marginTop: 28, marginBottom: 0 }}>
            © {new Date().getFullYear()} HubStudy · Hệ thống bảo mật
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .al-root { flex-direction: row; }
          .lg-left { flex: 0 0 45% !important; max-width: 45% !important; }
          .lg-right { display: flex !important; }
        }
      `}</style>

      {/* ── Cột phải (Giữ nguyên) ── */}
      <div className="lg-right" style={{
        display: 'none', flex: '0 0 55%', background: 'linear-gradient(135deg, #1A56DB 0%, #0D47A1 60%, #1565C0 100%)',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 56, position: 'relative', overflow: 'hidden',
      }}>
        <div className="dot-bg" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400 }}>
          {[
            { label: 'Học viên hoạt động', value: '10,000+', sub: 'Đang học hôm nay', color: '#ffffff' },
            { label: 'Đề thi được tạo',    value: '240+',    sub: 'Cập nhật liên tục', color: '#BBD6FF' },
            { label: 'Tỉ lệ hoàn thành',   value: '94.2%',   sub: 'Trung bình 30 ngày', color: '#A7F3D0' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '20px 24px',
              marginBottom: i < 2 ? 16 : 0, marginLeft: i === 1 ? 32 : 0,
            }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                {card.label}
              </div>
              <div style={{ fontFamily: "'Google Sans Display', system-ui", fontSize: 32, fontWeight: 700, color: card.color, lineHeight: 1.1, marginBottom: 4 }}>
                {card.value}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{card.sub}</div>
            </div>
          ))}

          <div style={{ marginTop: 36, textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Google Sans Display', system-ui", fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.5px', lineHeight: 1.3 }}>
              Quản lý toàn bộ<br />hệ thống từ một nơi
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>
              Theo dõi tiến trình học viên, cập nhật<br />đề thi và quản lý nội dung dễ dàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
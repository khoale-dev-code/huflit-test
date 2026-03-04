import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, ArrowRight, ShieldCheck, Globe, ChevronDown } from 'lucide-react';

// ─────────────────────────────────────────────
// Pure CSS injected once — no Tailwind dependency
// ─────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap');

  .wm-wrap * { font-family: 'Be Vietnam Pro', sans-serif; box-sizing: border-box; }

  .wm-scroll::-webkit-scrollbar { width: 3px; }
  .wm-scroll::-webkit-scrollbar-track { background: transparent; }
  .wm-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }

  .wm-grad-text {
    background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .wm-feature:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  .wm-btn-on {
    background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
    box-shadow: 0 4px 20px rgba(37,99,235,0.35);
    color: #fff;
    cursor: pointer;
  }
  .wm-btn-on:hover {
    box-shadow: 0 6px 28px rgba(37,99,235,0.45);
    transform: translateY(-1px);
  }
  .wm-btn-off {
    background: #F1F5F9;
    color: #94A3B8;
    cursor: not-allowed;
  }

  @keyframes wmFloat {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .wm-float { animation: wmFloat 5s ease-in-out infinite; }

  @keyframes wmBounce {
    0%,100% { transform: translateY(0); opacity: 0.5; }
    50% { transform: translateY(5px); opacity: 1; }
  }
  .wm-bounce { animation: wmBounce 1.4s ease-in-out infinite; }

  .wm-blob1 {
    position:absolute; width:200px; height:200px; border-radius:50%;
    background: radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%);
    top:-60px; right:-60px; pointer-events:none;
  }
  .wm-blob2 {
    position:absolute; width:160px; height:160px; border-radius:50%;
    background: radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%);
    bottom:10px; left:-40px; pointer-events:none;
  }
`;

// ─────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────
const FEATURES = [
  {
    Icon: Globe,
    title: 'Tài nguyên mở',
    desc: 'Hàng ngàn đề thi cập nhật hàng ngày từ các nguồn uy tín.',
    bg: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)',
    iconColor: '#2563EB',
    dot: '#93C5FD',
  },
  {
    Icon: ShieldCheck,
    title: 'An toàn & Bảo mật',
    desc: 'Dữ liệu mã hóa, quyền riêng tư được bảo vệ tuyệt đối.',
    bg: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)',
    iconColor: '#059669',
    dot: '#6EE7B7',
  },
  {
    Icon: Heart,
    title: 'Vì cộng đồng',
    desc: 'Phi lợi nhuận, đồng hành cùng học sinh sinh viên Việt Nam.',
    bg: 'linear-gradient(135deg,#FFF1F2,#FFE4E6)',
    iconColor: '#E11D48',
    dot: '#FCA5A5',
  },
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function WelcomeModal({ isOpen = false, onClose }) {
  const [canClose, setCanClose] = useState(false);
  const scrollRef = useRef(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset on reopen
  useEffect(() => {
    if (isOpen) {
      setCanClose(false);
      setTimeout(() => scrollRef.current?.scrollTo({ top: 0 }), 50);
    }
  }, [isOpen]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 32) setCanClose(true);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="wm-wrap"
          style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          {/* Inject CSS once */}
          <style>{GLOBAL_CSS}</style>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={canClose ? onClose : undefined}
            style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(10px)' }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 520,
              maxHeight: '92dvh',
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              borderRadius: '28px 28px 0 0',
              boxShadow: '0 -12px 60px rgba(0,0,0,0.25)',
              overflow: 'hidden',
            }}
          >
            {/* Pill */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 4 }}>
              <div style={{ width: 36, height: 4, borderRadius: 99, background: '#E2E8F0' }} />
            </div>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 12px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#2563EB,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>H</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>Hub Study</span>
              </div>

              <AnimatePresence>
                {canClose && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    onClick={onClose}
                    style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F5F9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={16} color="#64748B" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Scrollable body */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="wm-scroll"
              style={{ flex: 1, overflowY: 'auto' }}
            >
              {/* Hero */}
              <div style={{ background: 'linear-gradient(160deg,#EFF6FF 0%,#F5F3FF 55%,#FDF2F8 100%)', padding: '32px 24px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div className="wm-blob1" />
                <div className="wm-blob2" />

                <div className="wm-float" style={{ display: 'inline-flex', padding: 16, borderRadius: 24, background: 'rgba(255,255,255,0.85)', boxShadow: '0 4px 24px rgba(99,102,241,0.18)', marginBottom: 20 }}>
                  <Sparkles size={30} color="#4F46E5" fill="#4F46E5" fillOpacity={0.2} />
                </div>

                <h2 style={{ fontSize: 'clamp(20px,5vw,26px)', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, margin: '0 0 10px' }}>
                  Nâng tầm tri thức<br />
                  <span className="wm-grad-text">cùng Hub Study</span>
                </h2>

                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, margin: '0 auto', maxWidth: 300 }}>
                  Khám phá kho tài liệu học tập được cá nhân hóa — hoàn toàn miễn phí.
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                  {[['1000+', 'Đề thi'], ['50K+', 'Học sinh'], ['100%', 'Miễn phí']].map(([val, label]) => (
                    <div key={label} style={{ background: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: '8px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#2563EB' }}>{val}</div>
                      <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginTop: 1 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div style={{ padding: '20px 20px 8px' }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 0 }}>
                  Tại sao chọn chúng tôi
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {FEATURES.map(({ Icon, title, desc, bg, iconColor, dot }, i) => (
                    <motion.div
                      key={i}
                      className="wm-feature"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 18, background: bg, border: '1px solid rgba(255,255,255,0.9)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Icon size={20} color={iconColor} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{title}</span>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                        </div>
                        <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.55 }}>{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Donate QR */}
              <div style={{ margin: '16px 20px 28px', padding: '18px', borderRadius: 20, background: 'linear-gradient(135deg,#F8FAFF,#FDF4FF)', border: '1px solid #E0E7FF', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ background: '#fff', padding: 8, borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', flexShrink: 0 }}>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=SupportHubStudy"
                    alt="Donate QR"
                    style={{ width: 76, height: 76, display: 'block', borderRadius: 8 }}
                  />
                </div>
                <div>
                  <span style={{ display: 'inline-block', padding: '2px 8px', background: '#EDE9FE', color: '#7C3AED', fontSize: 10, fontWeight: 700, borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                    Ủng hộ dự án
                  </span>
                  <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: 0 }}>
                    Sự ủng hộ của bạn giúp duy trì máy chủ và phát triển thêm tính năng mới.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '12px 20px 20px', background: '#fff', borderTop: '1px solid #F1F5F9' }}>
              {!canClose && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10 }}>
                  <ChevronDown size={13} color="#94A3B8" className="wm-bounce" />
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>Cuộn xuống để tiếp tục</span>
                  <ChevronDown size={13} color="#94A3B8" className="wm-bounce" />
                </div>
              )}

              <button
                onClick={canClose ? onClose : undefined}
                disabled={!canClose}
                className={canClose ? 'wm-btn-on' : 'wm-btn-off'}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: 99,
                  border: 'none',
                  fontFamily: 'Be Vietnam Pro, sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.01em',
                }}
              >
                Bắt đầu học ngay
                <ArrowRight size={17} />
              </button>

              <p style={{ textAlign: 'center', fontSize: 11, color: '#CBD5E1', marginTop: 10, marginBottom: 0 }}>
                Bằng cách tiếp tục, bạn đồng ý với{' '}
                <span style={{ color: '#94A3B8', textDecoration: 'underline', cursor: 'pointer' }}>điều khoản sử dụng</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
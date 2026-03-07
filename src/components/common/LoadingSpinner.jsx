import React, { memo, useEffect, useState } from 'react';

/**
 * LoadingSpinner — Premium & Ultra Smooth Edition
 * ✅ GPU-only animations
 * ✅ Extremely smooth transitions and easings
 * ✅ CSS-driven progress bar for 60fps+ performance
 */

const VOCAB_PAIRS = [
  { word: 'eloquent',   hint: 'hùng hồn · lưu loát' },
  { word: 'persevere',  hint: 'kiên trì · bền bỉ' },
  { word: 'ephemeral',  hint: 'ngắn ngủi · thoáng qua' },
  { word: 'meticulous', hint: 'tỉ mỉ · cẩn thận' },
  { word: 'tenacious',  hint: 'quyết tâm · bền gan' },
  { word: 'luminous',   hint: 'sáng rực · tỏa sáng' },
  { word: 'resilient',  hint: 'kiên cường · bật lại' },
  { word: 'ambiguous',  hint: 'mơ hồ · hai nghĩa' },
];

const MESSAGES = [
  '✦ Đang nạp kho báu từ vựng cho bạn…',
  '✦ Khởi động bộ não chinh phục tiếng Anh…',
  '✦ Mở cánh cửa ngôn ngữ đang chờ bạn…',
  '✦ Đang pha một tách kiến thức nóng hổi…',
  '✦ Tập hợp đội quân từ vựng tinh nhuệ…',
  '✦ Chuẩn bị hành trình ngôn ngữ hôm nay…',
  '✦ Sắp xếp từng viên gạch tri thức cho bạn…',
];

const TIPS = [
  '💡 Lặp lại sau 24h giúp ghi nhớ lâu hơn 70%',
  '📖 Học qua ngữ cảnh hiệu quả hơn học thuần túy',
  '🎯 Mỗi ngày 10 từ mới = 3.650 từ mỗi năm',
  '🧠 Kết hợp hình ảnh & âm thanh giúp nhớ nhanh hơn',
  '✍️ Viết câu ví dụ giúp từ vựng khắc sâu vào não',
  '🔄 Spaced repetition là bí quyết của người giỏi nhất',
];

const LoadingSpinner = memo(() => {
  const [vIdx, setVIdx] = useState(0);
  const [mIdx, setMIdx] = useState(0);
  const [tIdx, setTIdx] = useState(0);
  
  // Trạng thái để kích hoạt animation
  const [fadeVocab, setFadeVocab] = useState(true);
  const [fadeMsg, setFadeMsg] = useState(true);
  const [fadeTip, setFadeTip] = useState(true);

  // Logic chuyển đổi mượt mà (Fade Out -> Đổi Data -> Fade In)
  const cycleData = (setIdx, dataLength, setFade) => {
    setFade(false); // Bắt đầu fade out
    setTimeout(() => {
      setIdx((prev) => (prev + 1) % dataLength); // Đổi data khi đang trong trạng thái mờ
      setFade(true); // Fade in trở lại
    }, 400); // 400ms khớp với thời gian animation v-out
  };

  useEffect(() => {
    const t = setInterval(() => cycleData(setVIdx, VOCAB_PAIRS.length, setFadeVocab), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => cycleData(setMIdx, MESSAGES.length, setFadeMsg), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => cycleData(setTIdx, TIPS.length, setFadeTip), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(155deg, #EBF5FF 0%, #F0F8FF 55%, #E6F2FC 100%)',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');
        .ls * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; margin: 0; padding: 0 }

        /* GPU-only keyframes */
        @keyframes ls-cw   { to { transform: rotate(360deg) } }
        @keyframes ls-ccw  { to { transform: rotate(-360deg) } }
        @keyframes ls-float{ 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes ls-blob { 0%, 100% { transform: scale(1); opacity: .18 } 50% { transform: scale(1.05); opacity: .25 } }
        
        /* Chuyển động vào/ra siêu mượt */
        @keyframes ls-in   { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes ls-out  { from { opacity: 1; transform: translateY(0) } to { opacity: 0; transform: translateY(-6px) } }
        @keyframes ls-enter{ from { opacity: 0; transform: translateY(15px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
        
        @keyframes ls-shim { 0% { transform: translateX(-150%) } 100% { transform: translateX(250%) } }
        
        /* Progress bar animation (Mượt 60fps) */
        @keyframes ls-progress {
          0% { width: 5%; }
          50% { width: 70%; }
          100% { width: 95%; }
        }

        .ls-cw   { animation: ls-cw   8s linear infinite; will-change: transform }
        .ls-ccw  { animation: ls-ccw  5s linear infinite; will-change: transform }
        .ls-slow { animation: ls-cw  18s linear infinite; will-change: transform }
        .ls-float{ animation: ls-float 4s ease-in-out infinite; will-change: transform }
        .ls-blob { animation: ls-blob 4s ease-in-out infinite; will-change: transform, opacity }
        .ls-enter{ animation: ls-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; will-change: transform, opacity }

        /* Classes áp dụng cho text */
        .v-in  { animation: ls-in  0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .v-out { animation: ls-out 0.4s cubic-bezier(0.7, 0, 0.84, 0) forwards; }

        .shim::after {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.5) 50%, transparent 100%);
          animation: ls-shim 3s ease-in-out infinite; will-change: transform
        }
          
        .progress-fill {
           animation: ls-progress 10s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
           will-change: width;
        }

        @media(prefers-reduced-motion: reduce){
          .ls-cw,.ls-ccw,.ls-slow,.ls-float,.ls-blob,.v-in,.v-out,.progress-fill{ animation: none!important }
          .v-in { opacity: 1; transform: none; }
          .progress-fill { width: 50%; }
        }
      `}</style>

      {/* ── Background blobs ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="ls-blob" style={{ position: 'absolute', top: '-10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(174,228,255,.5) 0%, transparent 70%)' }} />
        <div className="ls-blob" style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,101,192,.15) 0%, transparent 70%)', animationDelay: '2s' }} />
      </div>

      {/* ── Card ── */}
      <div className="ls ls-enter" style={{
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: 32,
        padding: '36px 40px 32px',
        boxShadow: '0 30px 60px rgba(21,101,192,.08), 0 10px 20px rgba(0,0,0,.04), inset 0 0 0 1px rgba(255,255,255,1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: 'calc(100vw - 36px)', maxWidth: 400,
      }}>

        {/* Top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: 'linear-gradient(90deg, #1A237E 0%, #1565C0 40%, #42A5F5 70%, #AEE4FF 100%)',
          borderTopLeftRadius: 32, borderTopRightRadius: 32
        }} />

        {/* ── Spinner ── */}
        <div style={{ position: 'relative', width: 112, height: 112, marginBottom: 28, flexShrink: 0 }}>
          {/* Outermost slow dashed */}
          <div className="ls-slow" style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1.5px dashed rgba(21,101,192,.3)',
          }} />

          {/* CW arc */}
          <div className="ls-cw" style={{
            position: 'absolute', inset: 8, borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#1565C0',
            borderRightColor: 'rgba(21,101,192,.15)',
          }} />

          {/* CCW arc */}
          <div className="ls-ccw" style={{
            position: 'absolute', inset: 18, borderRadius: '50%',
            border: '2.5px solid transparent',
            borderTopColor: '#AEE4FF',
            borderLeftColor: 'rgba(174,228,255,.3)',
          }} />

          {/* Orbiting dot — outer */}
          <div className="ls-cw" style={{ position: 'absolute', inset: 8, borderRadius: '50%' }}>
            <div style={{
              position: 'absolute', top: -4.5, left: '50%', marginLeft: -4.5,
              width: 9, height: 9, borderRadius: '50%',
              background: '#1A237E',
              boxShadow: '0 0 8px rgba(26,35,126,.5)',
            }} />
          </div>

          {/* Center icon */}
          <div className="ls-float" style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 54, height: 54, borderRadius: 18,
              background: 'linear-gradient(135deg, #1A237E, #1565C0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 24px rgba(21,101,192,.35), inset 0 2px 4px rgba(255,255,255,.2)',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2 6C2 6 5 5 8 5C10.5 5 12 6 12 6V20C12 20 10.5 19 8 19C5 19 2 20 2 20V6Z" fill="rgba(255,255,255,.95)" />
                <path d="M22 6C22 6 19 5 16 5C13.5 5 12 6 12 6V20C12 20 13.5 19 16 19C19 19 22 20 22 20V6Z" fill="rgba(255,255,255,.55)" />
                <path d="M7 9.5H10.5M7 12H10.5M13.5 9.5H17M13.5 12H17" stroke="rgba(174,228,255,.9)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Message ── */}
        <div style={{ height: 24, overflow: 'hidden', marginBottom: 20, width: '100%', textAlign: 'center', position: 'relative' }}>
          <p className={fadeMsg ? 'v-in' : 'v-out'}
             style={{ fontSize: 13, fontWeight: 600, color: '#475569', letterSpacing: '.01em', position: 'absolute', width: '100%' }}>
            {MESSAGES[mIdx]}
          </p>
        </div>

        {/* ── Word showcase card ── */}
        <div className="shim" style={{
          width: '100%',
          background: 'linear-gradient(135deg, rgba(241,245,249,0.7) 0%, rgba(226,232,240,0.5) 100%)',
          border: '1px solid rgba(255,255,255,0.8)',
          borderRadius: 20,
          padding: '16px 20px',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, position: 'relative' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.12em' }}>
              Word Preview
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>
                EN
              </span>
              <span style={{ background: '#f1f5f9', color: '#475569', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>
                VI
              </span>
            </div>
          </div>

          <div style={{ position: 'relative', height: 60 }}>
            {/* Vùng chứa chung cho chữ để cross-fade mượt */}
            <div className={fadeVocab ? 'v-in' : 'v-out'} style={{ position: 'absolute', width: '100%' }}>
              <p style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-.02em', lineHeight: 1.2, marginBottom: 4 }}>
                {VOCAB_PAIRS[vIdx].word}
              </p>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#64748b', fontStyle: 'italic' }}>
                {VOCAB_PAIRS[vIdx].hint}
              </p>
            </div>
          </div>
        </div>

        {/* ── Progress Bar Smooth ── */}
        <div style={{ width: '100%', marginBottom: 24 }}>
          <div style={{
            height: 8, borderRadius: 9999,
            background: '#e2e8f0',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div className="progress-fill" style={{
              height: '100%', borderRadius: 9999,
              background: 'linear-gradient(90deg, #3b82f6 0%, #0284c7 100%)',
              position: 'relative',
            }}>
              {/* Highlight bóng bẩy trên thanh */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                borderRadius: '9999px 9999px 0 0'
              }}/>
            </div>
          </div>
        </div>

        {/* ── Study tip ── */}
        <div style={{
          width: '100%', padding: '12px 16px',
          background: 'rgba(248, 250, 252, 0.8)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          borderRadius: 14,
          minHeight: 46,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative'
        }}>
          <p className={fadeTip ? 'v-in' : 'v-out'}
             style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, fontWeight: 500, textAlign: 'center', position: 'absolute', width: '90%' }}>
            {TIPS[tIdx]}
          </p>
        </div>
      </div>

      {/* Footer */}
      <p style={{
        marginTop: 24, fontSize: 11, fontWeight: 600,
        color: '#94a3b8', letterSpacing: '.1em', textTransform: 'uppercase',
      }}>
        Loading Study Environment
      </p>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner };
export default LoadingSpinner;
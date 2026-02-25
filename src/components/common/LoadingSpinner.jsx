import React, { memo, useEffect, useState } from 'react';

/**
 * LoadingSpinner — Premium Edition
 * ✅ GPU-only: transform + opacity animations only
 * ✅ Material Design 3 · Navy / Blue / #AEE4FF palette
 * ✅ Poetic Vietnamese loading messages
 * ✅ Vocabulary preview + study tips cycling
 */

const VOCAB_PAIRS = [
  { word: 'eloquent',    hint: 'hùng hồn · lưu loát' },
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
  const [vShow, setVShow] = useState(true);
  const [mShow, setMShow] = useState(true);
  const [prog, setProg] = useState(8);

  const cycleState = (show, setShow, setIdx, len, delay) => {
    setShow(false);
    setTimeout(() => { setIdx(i => (i + 1) % len); setShow(true); }, delay);
  };

  useEffect(() => {
    const t = setInterval(() => cycleState(vShow, setVShow, setVIdx, VOCAB_PAIRS.length, 340), 2400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => cycleState(mShow, setMShow, setMIdx, MESSAGES.length, 340), 3600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TIPS.length), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let v = 8;
    const t = setInterval(() => {
      v += Math.random() * 2.8 + 0.6;
      if (v > 91) v = 10;
      setProg(Math.min(v, 91));
    }, 160);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9999,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      background:'linear-gradient(155deg,#EBF5FF 0%,#F0F8FF 55%,#E6F2FC 100%)',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');
        .ls *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box;margin:0;padding:0}

        /* GPU-only keyframes */
        @keyframes ls-cw   {to{transform:rotate(360deg)}}
        @keyframes ls-ccw  {to{transform:rotate(-360deg)}}
        @keyframes ls-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes ls-blob {0%,100%{transform:scale(1);opacity:.18}50%{transform:scale(1.12);opacity:.28}}
        @keyframes ls-dot  {0%,70%,100%{transform:scale(.55);opacity:.2}35%{transform:scale(1.1);opacity:1}}
        @keyframes ls-in   {from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ls-out  {from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-9px)}}
        @keyframes ls-enter{from{opacity:0;transform:translateY(22px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes ls-shim {0%{transform:translateX(-110%)}100%{transform:translateX(220%)}}
        @keyframes ls-px1  {0%,100%{transform:translate(0,0)}55%{transform:translate(15px,-20px)}}
        @keyframes ls-px2  {0%,100%{transform:translate(0,0)}45%{transform:translate(-16px,-13px)}}
        @keyframes ls-px3  {0%,100%{transform:translate(0,0)}60%{transform:translate(13px,17px)}}
        @keyframes ls-px4  {0%,100%{transform:translate(0,0)}40%{transform:translate(-11px,18px)}}
        @keyframes ls-px5  {0%,100%{transform:translate(0,0)}50%{transform:translate(18px,9px)}}

        .ls-cw   {animation:ls-cw   6s linear infinite;will-change:transform}
        .ls-ccw  {animation:ls-ccw  4s linear infinite;will-change:transform}
        .ls-slow {animation:ls-cw  14s linear infinite;will-change:transform}
        .ls-float{animation:ls-float 3.2s ease-in-out infinite;will-change:transform}
        .ls-blob {animation:ls-blob 2.8s ease-in-out infinite;will-change:transform,opacity}
        .ls-enter{animation:ls-enter .7s cubic-bezier(.2,.8,.35,1) both;will-change:transform,opacity}

        .dot{width:8px;height:8px;border-radius:50%;background:#1565C0;display:inline-block;will-change:transform,opacity}
        .dot:nth-child(1){animation:ls-dot 1.5s ease-in-out infinite 0s}
        .dot:nth-child(2){animation:ls-dot 1.5s ease-in-out infinite .18s}
        .dot:nth-child(3){animation:ls-dot 1.5s ease-in-out infinite .36s}

        .v-in {animation:ls-in  .34s cubic-bezier(.2,.8,.4,1) both}
        .v-out{animation:ls-out .34s cubic-bezier(.4,0,1,1)   both}

        .shim::after{content:'';position:absolute;inset:0;border-radius:inherit;
          background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.65) 50%,transparent 100%);
          animation:ls-shim 2.4s ease-in-out infinite;will-change:transform}

        .px1{animation:ls-px1 4.6s ease-in-out infinite;will-change:transform}
        .px2{animation:ls-px2 3.9s ease-in-out infinite .7s;will-change:transform}
        .px3{animation:ls-px3 5.3s ease-in-out infinite .3s;will-change:transform}
        .px4{animation:ls-px4 4.2s ease-in-out infinite 1.1s;will-change:transform}
        .px5{animation:ls-px5 6.1s ease-in-out infinite .5s;will-change:transform}

        @media(prefers-reduced-motion:reduce){
          .ls-cw,.ls-ccw,.ls-slow,.ls-float,.ls-blob,.dot,.v-in,.v-out,.px1,.px2,.px3,.px4,.px5{animation:none!important}
          .dot{opacity:1;transform:none}
        }
      `}</style>

      {/* ── Background blobs ── */}
      <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
        <div className="ls-blob" style={{position:'absolute',top:'-8%',right:'-4%',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(174,228,255,.4) 0%,transparent 68%)'}}/>
        <div className="ls-blob" style={{position:'absolute',bottom:'-10%',left:'-6%',width:320,height:320,borderRadius:'50%',background:'radial-gradient(circle,rgba(21,101,192,.13) 0%,transparent 68%)',animationDelay:'1.3s'}}/>
        <div className="ls-blob" style={{position:'absolute',top:'38%',left:'38%',width:220,height:220,borderRadius:'50%',background:'radial-gradient(circle,rgba(26,35,126,.07) 0%,transparent 68%)',animationDelay:'.7s'}}/>

        {/* Floating dots */}
        {[
          {cls:'px1',x:'11%',y:'17%',r:10,c:'#AEE4FF',o:.55},
          {cls:'px2',x:'79%',y:'13%',r:7, c:'#C3E8FF',o:.45},
          {cls:'px3',x:'86%',y:'67%',r:13,c:'#B3DFFF',o:.45},
          {cls:'px4',x:'7%', y:'76%',r:9, c:'#AEE4FF',o:.5},
          {cls:'px5',x:'91%',y:'41%',r:6, c:'#D1EDFF',o:.35},
          {cls:'px1',x:'47%',y:'5%', r:5, c:'#C9EAFF',o:.35},
          {cls:'px3',x:'56%',y:'93%',r:8, c:'#AEE4FF',o:.4},
          {cls:'px2',x:'29%',y:'89%',r:6, c:'#D9F0FF',o:.3},
        ].map((p,i)=>(
          <div key={i} className={p.cls} style={{
            position:'absolute',left:p.x,top:p.y,
            width:p.r,height:p.r,borderRadius:'50%',
            background:p.c,opacity:p.o,
          }}/>
        ))}
      </div>

      {/* ── Card ── */}
      <div className="ls ls-enter" style={{
        position:'relative',
        background:'rgba(255,255,255,.93)',
        backdropFilter:'blur(24px)',
        border:'1.5px solid rgba(174,228,255,.55)',
        borderRadius:32,
        padding:'36px 40px 32px',
        boxShadow:'0 24px 64px rgba(21,101,192,.14),0 4px 16px rgba(0,0,0,.06),inset 0 0 0 1px rgba(255,255,255,.85)',
        display:'flex',flexDirection:'column',alignItems:'center',
        width:'calc(100vw - 36px)',maxWidth:400,
        overflow:'hidden',
      }}>

        {/* Top bar */}
        <div style={{
          position:'absolute',top:0,left:0,right:0,height:4,
          background:'linear-gradient(90deg,#1A237E 0%,#1565C0 40%,#42A5F5 70%,#AEE4FF 100%)',
        }}/>

        {/* ── Spinner ── */}
        <div style={{position:'relative',width:112,height:112,marginBottom:26,flexShrink:0}}>

          {/* Outermost slow dashed */}
          <div className="ls-slow" style={{
            position:'absolute',inset:0,borderRadius:'50%',
            border:'1.5px dashed rgba(174,228,255,.6)',
          }}/>

          {/* CW arc */}
          <div className="ls-cw" style={{
            position:'absolute',inset:9,borderRadius:'50%',
            border:'3px solid transparent',
            borderTopColor:'#1565C0',
            borderRightColor:'rgba(21,101,192,.25)',
          }}/>

          {/* CCW arc */}
          <div className="ls-ccw" style={{
            position:'absolute',inset:20,borderRadius:'50%',
            border:'2px solid transparent',
            borderTopColor:'#AEE4FF',
            borderLeftColor:'rgba(174,228,255,.4)',
          }}/>

          {/* Orbiting dot — outer */}
          <div className="ls-cw" style={{position:'absolute',inset:9,borderRadius:'50%'}}>
            <div style={{
              position:'absolute',top:-5,left:'50%',marginLeft:-5,
              width:10,height:10,borderRadius:'50%',
              background:'linear-gradient(135deg,#1A237E,#1565C0)',
              boxShadow:'0 0 0 3px rgba(21,101,192,.2)',
            }}/>
          </div>

          {/* Orbiting dot — inner */}
          <div className="ls-ccw" style={{position:'absolute',inset:20,borderRadius:'50%'}}>
            <div style={{
              position:'absolute',bottom:-4,left:'50%',marginLeft:-4,
              width:8,height:8,borderRadius:'50%',
              background:'#AEE4FF',
              boxShadow:'0 0 0 2px rgba(174,228,255,.5)',
            }}/>
          </div>

          {/* Center icon */}
          <div className="ls-float" style={{
            position:'absolute',inset:0,
            display:'flex',alignItems:'center',justifyContent:'center',
          }}>
            <div style={{
              width:52,height:52,borderRadius:17,
              background:'linear-gradient(145deg,#1A237E,#1565C0)',
              display:'flex',alignItems:'center',justifyContent:'center',
              boxShadow:'0 8px 24px rgba(21,101,192,.45),0 2px 6px rgba(0,0,0,.12)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2 6C2 6 5 5 8 5C10.5 5 12 6 12 6V20C12 20 10.5 19 8 19C5 19 2 20 2 20V6Z" fill="rgba(255,255,255,.95)"/>
                <path d="M22 6C22 6 19 5 16 5C13.5 5 12 6 12 6V20C12 20 13.5 19 16 19C19 19 22 20 22 20V6Z" fill="rgba(255,255,255,.55)"/>
                <path d="M7 9.5H10.5M7 12H10.5M13.5 9.5H17M13.5 12H17" stroke="rgba(174,228,255,.9)" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M20.5 1.5L21 3L22.5 3.5L21 4L20.5 5.5L20 4L18.5 3.5L20 3Z" fill="rgba(255,255,255,.9)"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Word showcase card ── */}
        <div className="shim" style={{
          width:'100%',
          background:'linear-gradient(135deg,rgba(174,228,255,.22) 0%,rgba(21,101,192,.07) 100%)',
          border:'1.5px solid rgba(174,228,255,.5)',
          borderRadius:18,
          padding:'14px 18px',
          marginBottom:18,
          position:'relative',
          overflow:'hidden',
        }}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8,position:'relative'}}>
            <span style={{fontSize:10,fontWeight:700,color:'#1565C0',textTransform:'uppercase',letterSpacing:'.1em'}}>
              Word Preview
            </span>
            <div style={{display:'flex',gap:4}}>
              <span style={{background:'#AEE4FF',color:'#0D47A1',borderRadius:20,padding:'2px 9px',fontSize:10,fontWeight:700}}>
                EN
              </span>
              <span style={{background:'#E3F2FD',color:'#1565C0',borderRadius:20,padding:'2px 9px',fontSize:10,fontWeight:700}}>
                VI
              </span>
            </div>
          </div>

          {/* Word */}
          <div style={{height:36,overflow:'hidden',marginBottom:3,position:'relative'}}>
            <p key={`w${vIdx}`} className={vShow?'v-in':'v-out'}
              style={{fontSize:28,fontWeight:800,color:'#1A237E',letterSpacing:'-.025em',lineHeight:1.2}}>
              {VOCAB_PAIRS[vIdx].word}
            </p>
          </div>

          {/* Meaning */}
          <div style={{height:20,overflow:'hidden',position:'relative'}}>
            <p key={`h${vIdx}`} className={vShow?'v-in':'v-out'}
              style={{fontSize:12,fontWeight:500,color:'#5F6368',fontStyle:'italic'}}>
              {VOCAB_PAIRS[vIdx].hint}
            </p>
          </div>
        </div>

        {/* ── Message ── */}
        <div style={{height:24,overflow:'hidden',marginBottom:16,width:'100%',textAlign:'center',position:'relative'}}>
          <p key={`msg${mIdx}`} className={mShow?'v-in':'v-out'}
            style={{fontSize:13,fontWeight:600,color:'#3C4043',letterSpacing:'.005em'}}>
            {MESSAGES[mIdx]}
          </p>
        </div>

        {/* ── Progress ── */}
        <div style={{width:'100%',marginBottom:14}}>
          <div style={{
            height:6,borderRadius:9999,
            background:'rgba(174,228,255,.3)',
            overflow:'visible',
            position:'relative',
          }}>
            <div style={{
              height:'100%',borderRadius:9999,
              width:`${prog}%`,
              background:'linear-gradient(90deg,#1A237E 0%,#1565C0 55%,#AEE4FF 100%)',
              transition:'width .16s ease-out',
              position:'relative',
            }}>
              {/* glowing tip */}
              <div style={{
                position:'absolute',right:-4,top:'50%',transform:'translateY(-50%)',
                width:12,height:12,borderRadius:'50%',
                background:'#1565C0',
                boxShadow:'0 0 10px rgba(21,101,192,.7)',
              }}/>
            </div>
          </div>
        </div>

        {/* ── Dots + percent ── */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',marginBottom:16}}>
          <div style={{display:'flex',gap:7,alignItems:'center'}}>
            <span className="dot"/>
            <span className="dot"/>
            <span className="dot"/>
          </div>
          <span style={{fontSize:12,fontWeight:800,color:'#1565C0'}}>
            {Math.round(prog)}%
          </span>
        </div>

        {/* ── Study tip ── */}
        <div style={{
          width:'100%',padding:'10px 14px',
          background:'rgba(26,35,126,.04)',
          border:'1px solid rgba(26,35,126,.07)',
          borderRadius:12,
        }}>
          <p key={`tip${tIdx}`} className="v-in"
            style={{fontSize:11,color:'#5F6368',lineHeight:1.6,fontWeight:500}}>
            {TIPS[tIdx]}
          </p>
        </div>
      </div>

      {/* Footer */}
      <p style={{
        marginTop:20,fontSize:11,fontWeight:600,
        color:'rgba(95,99,104,.55)',letterSpacing:'.07em',textTransform:'uppercase',
      }}>
        Vocabulary Master · A1 → C2
      </p>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner };
export default LoadingSpinner;
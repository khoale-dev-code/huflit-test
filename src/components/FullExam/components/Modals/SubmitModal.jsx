import React, { memo, useState, useEffect, useRef, useMemo } from 'react';
import { Flag, AlertTriangle, CheckCircle, ChevronRight, X, Headphones, BookOpen } from 'lucide-react';
import { EXAM_SECTIONS } from '../../constants/examConfig';

// 🚀 FIX: Import hàm tạo Key chuẩn của hệ thống
import { makeStandaloneKey, makeGroupKey } from '../../utils/answerKey';

const STYLE_ID = '__submitmodal_styles__';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes smFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    .sm-box { animation: smFadeIn .22s cubic-bezier(.4,0,.2,1); }
    .sm-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      font-weight: 700; font-size: 15px; border: none; cursor: pointer;
      border-radius: 12px; padding: 13px 24px; transition: all .15s;
      min-height: 48px; -webkit-tap-highlight-color: transparent;
    }
    .sm-btn:focus-visible { outline: 3px solid #1565C0; outline-offset: 3px; }
    .sm-btn:focus:not(:focus-visible) { outline: none; }
    .sm-btn:disabled { opacity: .45; cursor: not-allowed; }
    .sm-btn:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
    .sm-btn:active:not(:disabled) { transform: translateY(2px); }
  `;
  document.head.appendChild(s);
}

// ─────────────────────────────────────────────────────────────
// 💡 HOOK QUÉT DỮ LIỆU ĐỀ THI CHUẨN XÁC VỚI KEY GỐC
// ─────────────────────────────────────────────────────────────
function useAllPartStatuses(examData, answers) {
  return useMemo(() => {
    if (!examData?.parts) return [];
    
    const partsArr = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);
    let listeningIndex = 1;
    let readingIndex = 1;

    return partsArr.map((part) => {
      let answered = 0;
      let total = 0;
      
      const isListening = part.type === EXAM_SECTIONS.LISTENING;
      const displayIndex = isListening ? listeningIndex++ : readingIndex++;

      (part.questions || []).forEach((q, qIdx) => {
        if (q.type === 'group') {
          (q.subQuestions || []).forEach((sq, subIdx) => {
            if (sq.isExample) return;
            total++;
            // 🚀 Dùng đúng hàm tạo Key
            const key = makeGroupKey(part.type, part.id, q.id, subIdx);
            if (answers[key] !== undefined && answers[key] !== null) answered++;
          });
        } else {
          if (q.isExample) return;
          total++;
          // 🚀 Dùng đúng hàm tạo Key
          const key = makeStandaloneKey(part.type, part.id, qIdx);
          if (answers[key] !== undefined && answers[key] !== null) answered++;
        }
      });

      return {
        id: part.id, type: part.type, displayIndex, answered, total,
        complete: answered === total && total > 0,
      };
    });
  }, [examData, answers]);
}

// Lưới hiển thị trạng thái
const PartReviewGrid = memo(({ statuses }) => {
  const listeningParts = statuses.filter(s => s.type === EXAM_SECTIONS.LISTENING);
  const readingParts = statuses.filter(s => s.type === EXAM_SECTIONS.READING);

  const renderGrid = (parts, title, icon, colorTheme) => {
    if (parts.length === 0) return null;
    return (
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          {icon}
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: colorTheme, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h4>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
          {parts.map(({ id, displayIndex, answered, total, complete }) => (
            <div key={id} style={{ borderRadius: '12px', padding: '12px', border: `2px solid ${complete ? '#2E7D32' : '#F57F17'}`, background: complete ? '#F1F8E9' : '#FFFDE7', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#374151' }}>Phần {displayIndex}</span>
                {complete ? <CheckCircle size={16} color="#2E7D32" strokeWidth={3} /> : <AlertTriangle size={16} color="#F57F17" strokeWidth={3} />}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: complete ? '#2E7D32' : '#B45309' }}>
                {answered} / {total} <span style={{fontSize: '11px', fontWeight: 600}}>câu</span>
              </div>
              <div style={{ height: '5px', background: '#E2E8F0', borderRadius: '100px' }}>
                <div style={{ height: '100%', width: `${total > 0 ? Math.round((answered / total) * 100) : 0}%`, borderRadius: '100px', background: complete ? '#2E7D32' : '#F59E0B', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ margin: '16px 0', padding: '0 4px' }}>
      {renderGrid(listeningParts, 'Kỹ năng Nghe (Listening)', <Headphones size={16} color="#1CB0F6" strokeWidth={3}/>, '#1CB0F6')}
      {renderGrid(readingParts, 'Kỹ năng Đọc (Reading)', <BookOpen size={16} color="#58CC02" strokeWidth={3}/>, '#58CC02')}
    </div>
  );
});

export const SubmitModal = memo(({ visible, saveError, isOnline, isSubmitting, examData, answers, onConfirm, onCancel }) => {
  const [step, setStep] = useState('review');
  const firstFocusRef = useRef(null);
  const statuses = useAllPartStatuses(examData, answers);
  const unansweredCount = useMemo(() => statuses.reduce((sum, s) => sum + (s.total - s.answered), 0), [statuses]);

  useEffect(() => { if (visible) { setStep('review'); setTimeout(() => firstFocusRef.current?.focus(), 50); } }, [visible]);

  if (!visible) return null;
  const allDone = unansweredCount === 0;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.65)', backdropFilter: 'blur(5px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: '"Nunito", sans-serif' }}>
      <div className="sm-box" style={{ background: '#fff', borderRadius: '24px', padding: 'clamp(24px,4vw,32px)', maxWidth: '560px', width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button className="sm-btn" onClick={onCancel} style={{ position: 'absolute', top: '16px', right: '16px', background: '#F1F5F9', color: '#64748B', padding: '8px', borderRadius: '12px', minHeight: 'auto', border: '2px solid transparent' }}><X size={18} strokeWidth={3} /></button>

        {step === 'review' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              {allDone ? <CheckCircle size={32} color="#2E7D32" strokeWidth={2.5} /> : <AlertTriangle size={32} color="#F57F17" strokeWidth={2.5} />}
              <h2 style={{ fontSize: 'clamp(18px,3vw,22px)', fontWeight: 900, color: '#1A2330', margin: 0 }}>{allDone ? 'Sẵn sàng nộp bài!' : 'Kiểm tra trước khi nộp'}</h2>
            </div>
            {!allDone && <p style={{ fontSize: '15px', color: '#4A5568', lineHeight: 1.6, marginBottom: '8px', fontWeight: 600 }}>Bạn còn <strong style={{ color: '#B45309', fontSize: '18px' }}>{unansweredCount} câu</strong> chưa trả lời trong toàn bộ đề thi.</p>}
            
            <div style={{ background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '16px', padding: '16px', marginTop: '16px' }}>
              <PartReviewGrid statuses={statuses} />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: '24px' }}>
              <button className="sm-btn" onClick={onCancel} ref={firstFocusRef} style={{ background: '#fff', color: '#64748B', border: '2px solid #E2E8F0', borderBottomWidth: '4px' }}>Quay lại làm tiếp</button>
              <button className="sm-btn" onClick={() => setStep('confirm')} style={{ background: allDone ? '#58CC02' : '#FF9600', border: `2px solid ${allDone ? '#46A302' : '#E58700'}`, borderBottomWidth: '4px', color: '#fff' }}>{allDone ? 'Tiếp tục' : 'Vẫn nộp bài'} <ChevronRight size={18} strokeWidth={3} /></button>
            </div>
          </>
        )}

        {step === 'confirm' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>
              <div style={{ width: '64px', height: '64px', background: '#FFEBEE', border: '2px solid #EF9A9A', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Flag size={32} color="#C62828" strokeWidth={2.5}/></div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1A2330', margin: '0 0 10px' }}>Xác nhận nộp bài?</h2>
              <p style={{ fontSize: '15px', color: '#4A5568', lineHeight: 1.6, fontWeight: 600 }}>Sau khi nộp, hệ thống sẽ chấm điểm và không thể sửa đáp án.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="sm-btn" ref={firstFocusRef} onClick={() => setStep('review')} style={{ background: '#fff', color: '#64748B', border: '2px solid #E2E8F0', borderBottomWidth: '4px', flex: 1, maxWidth: '200px' }}>Quay lại</button>
              <button className="sm-btn" onClick={onConfirm} disabled={isSubmitting} style={{ background: '#FF4B4B', border: '2px solid #E54343', borderBottomWidth: '4px', color: '#fff', flex: 1, maxWidth: '200px' }}>{isSubmitting ? 'Đang nộp...' : 'Nộp bài ngay'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default SubmitModal;
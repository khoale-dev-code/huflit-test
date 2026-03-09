// src/admin/scripts/importExamsToFirebase.jsx
//
// ════════════════════════════════════════════════════════
// FIX: Vite không cho dynamic import với template string
// → Import trực tiếp từng file (static import)
// ════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

// ✅ Static import — Vite bắt buộc đường dẫn phải tĩnh
import { EXAM1_DATA } from '../../data/exams/exam1';
import { EXAM2_DATA } from '../../data/exams/exam2';
import { EXAM3_DATA } from '../../data/exams/exam3';
import { EXAM4_DATA } from '../../data/exams/exam4';
import { EXAM5_DATA } from '../../data/exams/exam5';
import { EXAM6_DATA } from '../../data/exams/exam6';

// ─── Danh sách exams cần import ───────────────────────
// duration: 90 phút (30p listening + 60p reading)
// category và level không cần thiết lúc này
const EXAMS = [
  EXAM1_DATA,
  EXAM2_DATA,
  EXAM3_DATA,
  EXAM4_DATA,
  EXAM5_DATA,
  EXAM6_DATA,
];

// ─── Helpers ──────────────────────────────────────────
const countQ = (parts = {}) =>
  Object.values(parts).reduce((n, p) => n + (p.questions?.length ?? 0), 0);

const listeningIds = (parts = {}) =>
  Object.entries(parts).filter(([, p]) => p.type === 'listening').map(([id]) => id);

const readingIds = (parts = {}) =>
  Object.entries(parts).filter(([, p]) => p.type === 'reading').map(([id]) => id);

// Kiểm tra trùng title — tránh upload duplicate
const checkExists = async (title) => {
  const snap = await getDocs(query(collection(db, 'exams'), where('title', '==', title)));
  return !snap.empty;
};

// Upload 1 exam lên Firestore
const uploadExam = async (rawData) => {
  if (!rawData) throw new Error('Data không tồn tại');

  const exists = await checkExists(rawData.title);
  if (exists) return { skipped: true, title: rawData.title };

  const parts = rawData.parts ?? {};
  const ref = await addDoc(collection(db, 'exams'), {
    title:          rawData.title       ?? 'Untitled',
    description:    rawData.description ?? '',
    duration:       90,          // 30p listening + 60p reading
    listeningTime:  30,
    readingTime:    60,
    showResults:    true,
    metadata:       rawData.metadata ?? {},
    parts,
    questions:      countQ(parts),
    listeningParts: listeningIds(parts),
    readingParts:   readingIds(parts),
    stats:          { participants: 0, completed: 0, avgScore: 0 },
    createdAt:      serverTimestamp(),
    updatedAt:      serverTimestamp(),
  });

  return { success: true, id: ref.id, title: rawData.title };
};

// ════════════════════════════════════════════════════════
// UI
// ════════════════════════════════════════════════════════
const LOG_COLOR = {
  info:    'text-gray-300',
  success: 'text-green-400',
  warn:    'text-yellow-400',
  error:   'text-red-400',
};

const ImportExamsPage = () => {
  const [logs,    setLogs]    = useState([]);
  const [running, setRunning] = useState(false);
  const [done,    setDone]    = useState(false);
  const [checked, setChecked] = useState(EXAMS.map((_, i) => i));

  const addLog = (msg, type = 'info') =>
    setLogs(prev => [...prev, { msg, type, ts: new Date().toLocaleTimeString() }]);

  const toggle = (i) =>
    setChecked(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  const handleImport = async () => {
    setRunning(true);
    setDone(false);
    setLogs([]);

    const toImport = EXAMS.filter((_, i) => checked.includes(i));
    addLog(`🚀 Bắt đầu import ${toImport.length} exam...`);

    let ok = 0, skip = 0, fail = 0;

    for (const data of toImport) {
      const label = data?.title ?? '???';
      addLog(`📤 "${label}"`);
      try {
        const r = await uploadExam(data);
        if (r.skipped) {
          addLog(`⏭️  Bỏ qua (đã tồn tại): "${r.title}"`, 'warn');
          skip++;
        } else {
          addLog(`✅ "${r.title}"  →  ID: ${r.id}`, 'success');
          ok++;
        }
      } catch (err) {
        addLog(`❌ "${label}" — ${err.message}`, 'error');
        fail++;
      }
    }

    addLog('─────────────────────────────────────────');
    addLog(`🎉 Xong! ✅ ${ok} thành công · ⏭️ ${skip} bỏ qua · ❌ ${fail} lỗi`);
    setRunning(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 font-mono">
      <div className="max-w-2xl mx-auto">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Import Exams → Firebase</h1>
          <p className="text-gray-400 text-sm">
            Upload dữ liệu local lên Firestore <code className="text-blue-400">exams</code>.
            Bộ đề trùng tiêu đề sẽ tự động bỏ qua.
          </p>
        </div>

        {/* Checklist */}
        <div className="mb-6">
          <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-3 font-bold">Chọn exams cần upload</p>
          <div className="grid grid-cols-2 gap-2">
            {EXAMS.map((data, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all select-none
                  ${checked.includes(i) ? 'border-blue-500 bg-blue-950/50' : 'border-gray-800 bg-gray-900 opacity-50'}`}
              >
                <input
                  type="checkbox"
                  checked={checked.includes(i)}
                  onChange={() => toggle(i)}
                  className="accent-blue-500 w-4 h-4 flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {data?.title ?? `Exam ${i + 1}`}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    90 phút · {countQ(data?.parts ?? {})} câu
                  </p>
                </div>
              </label>
            ))}
          </div>
          <div className="flex gap-4 mt-2.5">
            <button onClick={() => setChecked(EXAMS.map((_, i) => i))}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold">Chọn tất cả</button>
            <button onClick={() => setChecked([])}
              className="text-xs text-gray-500 hover:text-gray-300 font-bold">Bỏ chọn tất cả</button>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleImport}
          disabled={running || checked.length === 0}
          className={`w-full py-3.5 rounded-xl font-bold text-sm mb-6 transition-all
            ${running || checked.length === 0
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'}`}
        >
          {running ? '⏳ Đang upload...'
            : done   ? '✅ Xong — Chạy lại?'
            : `🚀 Bắt đầu Import (${checked.length} exam)`}
        </button>

        {/* Terminal log */}
        {logs.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800 bg-black/40">
              <span className="w-3 h-3 rounded-full bg-red-500/80"/>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"/>
              <span className="w-3 h-3 rounded-full bg-green-500/80"/>
              <span className="ml-2 text-xs text-gray-600">import.log</span>
            </div>
            <div className="p-4 space-y-1.5 max-h-96 overflow-y-auto text-xs">
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-3 ${LOG_COLOR[log.type]}`}>
                  <span className="text-gray-700 flex-shrink-0 tabular-nums">{log.ts}</span>
                  <span>{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {done && (
          <p className="mt-6 text-center text-xs text-gray-600">
            Xong rồi? Xóa route{' '}
            <code className="text-blue-400">/admin/import-exams</code>{' '}
            khỏi App.jsx
          </p>
        )}
      </div>
    </div>
  );
};

export default ImportExamsPage;
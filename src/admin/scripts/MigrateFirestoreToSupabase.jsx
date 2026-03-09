import React, { useState } from 'react';
import { db } from '../../config/firebase'; 
import { supabase } from '../../config/supabaseClient'; 
import { collection, getDocs } from 'firebase/firestore';
import { Loader2, Database, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const MigrateData = () => {
  const [status, setStatus] = useState('idle'); 
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const startMigration = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn bắt đầu di cư dữ liệu không?")) return;
    
    setStatus('migrating');
    setLogs([]);
    addLog('🚀 Bắt đầu quá trình di cư dữ liệu...');

    try {
      // 1. Lấy dữ liệu từ Firestore
      const querySnapshot = await getDocs(collection(db, 'exams'));
      const firestoreExams = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (firestoreExams.length === 0) {
        addLog('⚠️ Không tìm thấy dữ liệu trên Firestore.');
        setStatus('idle');
        return;
      }

      setProgress({ current: 0, total: firestoreExams.length });
      addLog(`🔍 Tìm thấy ${firestoreExams.length} bộ đề. Bắt đầu ánh xạ dữ liệu...`);

      // 2. Duyệt từng bộ đề
      for (let i = 0; i < firestoreExams.length; i++) {
        const exam = firestoreExams[i];
        
        /**
         * 🛡️ DATA MAPPING (Ánh xạ dữ liệu)
         * Chúng ta dọn dẹp data để khớp chính xác với cột SQL
         */
        const payload = {
          title: exam.title || "Untitled Exam",
          description: exam.description || "",
          duration: Number(exam.duration || 90),
          parts: exam.parts || {},
          listeningParts: exam.listeningParts || [],
          readingParts: exam.readingParts || [],
          stats: exam.stats || {},
          questions: Number(exam.questions || 0),
          listeningTime: Number(exam.listeningTime || 30),
          readingTime: Number(exam.readingTime || 60),
          showResults: exam.showResults !== undefined ? exam.showResults : true,
          metadata: exam.metadata || {}
        };

        // Gửi lên Supabase
        const { error } = await supabase
          .from('exams')
          .insert([payload]);

        if (error) {
          addLog(`❌ Lỗi tại bộ đề "${exam.title}": ${error.message}`);
          console.error("Payload lỗi:", payload);
        } else {
          addLog(`✅ Thành công: ${exam.title}`);
        }

        setProgress(prev => ({ ...prev, current: i + 1 }));
      }

      setStatus('success');
      addLog('🎉 QUÁ TRÌNH DI CƯ HOÀN TẤT!');
    } catch (err) {
      console.error(err);
      setStatus('error');
      addLog(`🚨 Lỗi hệ thống: ${err.message}`);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 mt-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
          <Database className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Migration Tool v2.0</h2>
          <p className="text-sm text-gray-500">Firestore NoSQL ➔ Supabase PostgreSQL</p>
        </div>
      </div>

      {/* Migration Flow Visual */}
      <div className="flex items-center justify-between mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nguồn</p>
          <div className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg font-bold text-xs">Firestore</div>
        </div>
        <div className="flex flex-col items-center">
          <ArrowRight className="text-slate-300 w-5 h-5" />
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Đích</p>
          <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg font-bold text-xs">Supabase</div>
        </div>
      </div>

      {/* Progress Bar */}
      {status === 'migrating' && (
        <div className="mb-8 space-y-3">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-600">Đang xử lý: {progress.current}/{progress.total}</span>
            <span className="text-blue-600">{Math.round((progress.current / progress.total) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300" 
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={startMigration}
        disabled={status === 'migrating'}
        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all
          ${status === 'migrating' 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200 active:scale-[0.98]'}`}
      >
        {status === 'migrating' ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : status === 'success' ? (
          <CheckCircle2 size={20} />
        ) : (
          <Database size={20} />
        )}
        {status === 'migrating' ? 'Đang thực hiện di cư...' : 'Bắt đầu chuyển dữ liệu'}
      </button>

      {/* Console Logs */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiến trình hệ thống:</p>
          {status === 'error' && <span className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10}/> LỖI XẢY RA</span>}
        </div>
        <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl h-60 overflow-y-auto font-mono text-[11px] leading-relaxed border border-slate-800 shadow-inner">
          {logs.length > 0 ? (
            logs.map((log, i) => (
              <div key={i} className={`mb-1 ${log.includes('❌') ? 'text-red-400' : log.includes('✅') ? 'text-emerald-400' : ''}`}>
                {log}
              </div>
            ))
          ) : (
            <div className="text-slate-600 italic"> sẵn sàng khởi động...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MigrateData;
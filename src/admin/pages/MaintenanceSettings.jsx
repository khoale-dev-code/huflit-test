// src/admin/pages/MaintenanceSettings.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield, Power, Clock, Mail, Phone, FileText, Image, Save,
  History, AlertTriangle, CheckCircle2, Users, Edit3
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { maintenanceService } from '../../services/maintenanceService';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';

/* ─── 1. SUB-COMPONENTS (Clean Code) ────────────────────────────── */

const FormInput = ({ icon, label, type = 'text', value, onChange, placeholder, isTextArea }) => {
  const InputIcon = icon;
  return (
    <div>
      <label className="flex items-center gap-2 text-[13px] font-black text-slate-500 mb-2 uppercase tracking-wider">
        <InputIcon className="w-4 h-4 text-slate-400" strokeWidth={3} /> {label}
      </label>
      {isTextArea ? (
        <textarea
          value={value} onChange={onChange} rows={3} placeholder={placeholder}
          className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-[16px] text-[15px] font-bold text-slate-700 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none placeholder:text-slate-400 placeholder:font-medium"
        />
      ) : (
        <input
          type={type} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-[16px] text-[15px] font-bold text-slate-700 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400 placeholder:font-medium"
        />
      )}
    </div>
  );
};

const LogItem = ({ log }) => {
  const isTurnOn = log.action_type === 'MAINTENANCE_ON';
  const isUpdate = log.action_type === 'UPDATE_MAINTENANCE_SETTINGS';
  
  const styles = isTurnOn 
    ? { bg: 'bg-[#FFC800]/10', text: 'text-[#FF9600]', border: 'border-[#FFC800]/40', icon: Power }
    : isUpdate 
      ? { bg: 'bg-[#EAF6FE]', text: 'text-[#1CB0F6]', border: 'border-[#BAE3FB]', icon: Edit3 }
      : { bg: 'bg-emerald-50', text: 'text-[#58CC02]', border: 'border-emerald-200', icon: CheckCircle2 };

  const LogIcon = styles.icon;

  return (
    <div className="flex items-start gap-3 p-3 rounded-[16px] bg-slate-50 border-2 border-transparent hover:border-slate-200 transition-colors">
      <div className={`w-10 h-10 shrink-0 rounded-[12px] flex items-center justify-center border-2 border-b-[4px] shadow-sm ${styles.bg} ${styles.text} ${styles.border}`}>
        <LogIcon size={18} strokeWidth={3} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-black text-slate-700 truncate">{log.target_name || 'Hành động hệ thống'}</p>
        <p className="text-[12px] font-bold text-slate-400">Bởi: {log.admin_name || 'Admin'}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[12px] font-black text-slate-500">{new Date(log.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{new Date(log.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</p>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   2. MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function MaintenanceSettings() {
  const { admin, loading: authLoading, signOut } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [config, setConfig] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);

  const [form, setForm] = useState({
    message: '',
    estimatedEndTime: '',
    contactEmail: '',
    contactPhone: '',
    backgroundUrl: '',
  });

  const loadData = useCallback(async () => {
    const [cfg, maintenanceLogs] = await Promise.all([
      maintenanceService.getConfig(),
      maintenanceService.getMaintenanceLogs(),
    ]);
    setConfig(cfg);
    setLogs(maintenanceLogs);
    setForm({
      message: cfg.message || '',
      estimatedEndTime: cfg.estimatedEndTime ? cfg.estimatedEndTime.slice(0, 16) : '',
      contactEmail: cfg.contactEmail || '',
      contactPhone: cfg.contactPhone || '',
      backgroundUrl: cfg.backgroundUrl || '',
    });
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    const unsub = maintenanceService.subscribeToConfig(setConfig);
    return () => unsub();
  }, []);

  const handleToggle = async () => {
    if (!admin) return;
    setSaving(true);
    try {
      await maintenanceService.toggleMaintenance(!config.isMaintenance, admin.id, admin.email);
      setSaveMsg({ type: 'success', text: config.isMaintenance ? 'Đã tắt chế độ bảo trì. Hệ thống Live!' : 'Đã bật chế độ bảo trì.' });
      await loadData();
    } catch {
      setSaveMsg({ type: 'error', text: 'Có lỗi xảy ra, vui lòng thử lại' });
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!admin) return;
    setSaving(true);
    try {
      const settings = {
        message: form.message,
        estimatedEndTime: form.estimatedEndTime ? new Date(form.estimatedEndTime).toISOString() : null,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        backgroundUrl: form.backgroundUrl,
      };
      await maintenanceService.updateSettings(settings, admin.id, admin.email);
      setSaveMsg({ type: 'success', text: 'Đã lưu cấu hình thành công!' });
      await loadData();
    } catch {
      setSaveMsg({ type: 'error', text: 'Có lỗi xảy ra khi lưu cài đặt' });
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const isActive = config?.isMaintenance === true;

  if (authLoading || loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F4F7FA] gap-3 font-['Nunito',sans-serif]">
      <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <p className="font-bold text-slate-500 text-[15px]">Đang tải dữ liệu...</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F4F7FA] overflow-hidden font-['Nunito','Quicksand',sans-serif] selection:bg-blue-200">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* ── Fixed Save Message Toast ── */}
        <AnimatePresence>
          {saveMsg && (
            <Motion.div
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              className={`absolute top-6 left-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-[16px] border-2 border-b-[4px] text-[14px] font-black shadow-lg ${
                saveMsg.type === 'success' ? 'bg-[#f1faeb] border-[#bcf096] border-b-[#46A302] text-[#58CC02]' : 'bg-[#fff0f0] border-[#ffc1c1] border-b-[#E54343] text-[#FF4B4B]'
              }`}
            >
              {saveMsg.type === 'success' ? <CheckCircle2 size={20} strokeWidth={3} /> : <AlertTriangle size={20} strokeWidth={3} />}
              {saveMsg.text}
            </Motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            {/* ── Header ── */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-[16px] bg-[#FF9600] text-white flex items-center justify-center border-b-[4px] border-[#E58800] shadow-sm shrink-0">
                <Shield size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-[28px] sm:text-[32px] font-black text-slate-800 tracking-tight leading-none">
                  Cài đặt <span className="text-[#FF9600]">Bảo trì</span>
                </h1>
                <p className="text-slate-500 text-[14px] font-bold mt-1.5">Quản lý trạng thái hệ thống và giao diện chờ</p>
              </div>
            </div>

            {/* ── 2 Column Grid Layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* CỘT TRÁI: ĐIỀU KHIỂN & FORM (Chiếm 7 cột) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Toggle Card */}
                <Motion.div
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  className={`rounded-[24px] border-2 border-b-[6px] p-6 sm:p-8 shadow-sm transition-colors duration-500 ${
                    isActive ? 'bg-[#FFF4E5] border-[#FFD8A8] border-b-[#FF9600]' : 'bg-white border-slate-200 border-b-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center border-2 border-b-[4px] shadow-sm shrink-0 transition-colors duration-500 ${
                        isActive ? 'bg-[#FF9600] border-[#E58800] text-white' : 'bg-slate-100 border-slate-200 text-slate-400'
                      }`}>
                        <Power className="w-7 h-7" strokeWidth={3} />
                      </div>
                      <div>
                        <h2 className={`text-[18px] font-black leading-tight ${isActive ? 'text-[#E58800]' : 'text-slate-800'}`}>
                          {isActive ? 'Hệ thống đang bảo trì' : 'Hệ thống hoạt động bình thường'}
                        </h2>
                        <p className="text-[13px] font-bold text-slate-500 mt-1">
                          {isActive ? 'Học viên sẽ thấy trang bảo trì và không thể đăng nhập.' : 'Tất cả tính năng đang mở cho học viên.'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleToggle} disabled={saving}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-[16px] border-2 border-b-[4px] font-black text-[14px] uppercase tracking-wider transition-all outline-none disabled:opacity-50 shrink-0 ${
                        isActive
                          ? 'bg-[#58CC02] text-white border-[#46A302] hover:bg-[#46A302]'
                          : 'bg-[#FF9600] text-white border-[#E58800] hover:bg-[#E58800]'
                      } active:border-b-2 active:translate-y-[2px]`}
                    >
                      <Power className="w-5 h-5" strokeWidth={3} />
                      {saving ? 'Xử lý...' : (isActive ? 'Tắt bảo trì (Mở site)' : 'Bật bảo trì')}
                    </button>
                  </div>
                </Motion.div>

                {/* Settings Form */}
                <Motion.div
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-sm overflow-hidden"
                >
                  <div className="px-6 py-4 border-b-2 border-slate-100 bg-slate-50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[12px] bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                      <FileText size={18} strokeWidth={3} className="text-slate-600" />
                    </div>
                    <div>
                      <h2 className="text-[16px] font-black text-slate-800 leading-tight">Nội dung trang chờ</h2>
                      <p className="text-[12px] font-bold text-slate-400">Tùy chỉnh thông báo gửi đến học viên</p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveSettings} className="p-6 space-y-5">
                    <FormInput icon={FileText} label="Thông báo hiển thị" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="VD: Hệ thống đang nâng cấp..." isTextArea />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormInput icon={Clock} type="datetime-local" label="Dự kiến hoàn thành" value={form.estimatedEndTime} onChange={(e) => setForm({ ...form, estimatedEndTime: e.target.value })} />
                      <FormInput icon={Phone} type="tel" label="Hotline hỗ trợ" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} placeholder="0123 456 789" />
                    </div>
                    
                    <FormInput icon={Mail} type="email" label="Email hỗ trợ" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} placeholder="support@hubstudy.edu.vn" />
                    <FormInput icon={Image} type="url" label="URL Hình nền (Tùy chọn)" value={form.backgroundUrl} onChange={(e) => setForm({ ...form, backgroundUrl: e.target.value })} placeholder="https://..." />

                    <div className="pt-4 border-t-2 border-slate-100">
                      <button type="submit" disabled={saving}
                        className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white border-2 border-[#1899D6] border-b-[4px] rounded-[16px] font-black text-[15px] uppercase tracking-wider active:border-b-[2px] active:translate-y-[2px] transition-all disabled:opacity-50"
                      >
                        <Save className="w-5 h-5" strokeWidth={3} />
                        {saving ? 'Đang lưu...' : 'Lưu cấu hình'}
                      </button>
                    </div>
                  </form>
                </Motion.div>
              </div>

              {/* CỘT PHẢI: SUBSCRIBERS & LOGS (Chiếm 5 cột) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Subscribers Card */}
                <Motion.div
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-sm p-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-[12px] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[3px] flex items-center justify-center shadow-sm shrink-0">
                      <Users size={18} strokeWidth={3} className="text-[#1CB0F6]" />
                    </div>
                    <div>
                      <h2 className="text-[16px] font-black text-slate-800 leading-tight">Khách hàng theo dõi</h2>
                      <p className="text-[12px] font-bold text-slate-400">Đăng ký nhận thông báo email</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F4F7FA] rounded-[16px] p-5 border-2 border-slate-100 text-center">
                    <span className="text-[36px] font-black text-[#1CB0F6] leading-none block mb-1">
                      {(config?.notificationSubscribers || []).length}
                    </span>
                    <span className="text-[13px] font-bold text-slate-500 uppercase tracking-widest">Lượt đăng ký</span>
                  </div>

                  {(config?.notificationSubscribers || []).length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
                      {config.notificationSubscribers.map((email, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white border-2 border-slate-200 rounded-[10px] text-[12px] font-bold text-slate-600">
                          {email}
                        </span>
                      ))}
                    </div>
                  )}
                </Motion.div>

                {/* Activity Log Card */}
                <Motion.div
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] shadow-sm flex flex-col h-[400px]"
                >
                  <div className="px-6 py-4 border-b-2 border-slate-100 bg-slate-50 flex items-center gap-3 shrink-0 rounded-t-[20px]">
                    <div className="w-10 h-10 rounded-[12px] bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                      <History size={18} strokeWidth={3} className="text-slate-600" />
                    </div>
                    <div>
                      <h2 className="text-[16px] font-black text-slate-800 leading-tight">Lịch sử hoạt động</h2>
                      <p className="text-[12px] font-bold text-slate-400">Các thay đổi gần đây</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                    {logs.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                        <History size={32} strokeWidth={2} className="mb-2" />
                        <p className="text-[14px] font-bold">Chưa có lịch sử.</p>
                      </div>
                    ) : (
                      logs.map((log) => <LogItem key={log.id} log={log} />)
                    )}
                  </div>
                </Motion.div>

              </div>
            </div>

          </div>
        </main>
      </div>
      
      {/* ── Scrollbar CSS ── */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}
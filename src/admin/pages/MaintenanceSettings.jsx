// src/admin/pages/MaintenanceSettings.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield, Power, Clock, Mail, Phone, FileText, Image, Save,
  Activity, History, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { maintenanceService } from '../../services/maintenanceService';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';

const MaintenanceSettings = () => {
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

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const unsub = maintenanceService.subscribeToConfig((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsub();
  }, []);

  const handleToggle = async () => {
    if (!admin) return;
    setSaving(true);
    try {
      await maintenanceService.toggleMaintenance(!config.isMaintenance, admin.id, admin.email);
      setSaveMsg({ type: 'success', text: config.isMaintenance ? 'Đã tắt chế độ bảo trì' : 'Đã bật chế độ bảo trì' });
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
      setSaveMsg({ type: 'success', text: 'Đã lưu cài đặt' });
      await loadData();
    } catch {
      setSaveMsg({ type: 'error', text: 'Có lỗi xảy ra khi lưu' });
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const isActive = config?.isMaintenance === true;

  if (authLoading || loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F4F7FA] gap-3">
      <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <p className="font-display font-bold text-slate-500 text-[15px]">Đang tải...</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F4F7FA] overflow-hidden" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            {/* ── Header ── */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#FF9600] text-white flex items-center justify-center border-b-[4px] border-[#E58800] shadow-sm">
                <Shield size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-[28px] font-display font-black text-slate-800 tracking-tight leading-none">
                  Chế độ <span className="text-[#FF9600]">Bảo trì</span>
                </h1>
                <p className="text-slate-500 text-[13px] font-body font-bold mt-1">Bật/tắt bảo trì hệ thống và tùy chỉnh trang bảo trì</p>
              </div>
            </div>

            {/* ── Save Message ── */}
            {saveMsg && (
              <Motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 px-4 py-3 rounded-[14px] border-2 text-[14px] font-display font-bold ${
                  saveMsg.type === 'success'
                    ? 'bg-[#f1faeb] border-[#bcf096] text-[#58CC02]'
                    : 'bg-[#fff0f0] border-[#ffc1c1] text-[#FF4B4B]'
                }`}
              >
                {saveMsg.type === 'success' ? <CheckCircle2 size={18} strokeWidth={2.5} /> : <AlertTriangle size={18} strokeWidth={2.5} />}
                {saveMsg.text}
              </Motion.div>
            )}

            {/* ── Toggle Card ── */}
            <Motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`rounded-[24px] border-2 border-b-[4px] p-6 sm:p-8 shadow-sm ${
                isActive
                  ? 'bg-gradient-to-br from-[#FFF4E5] to-[#FFF0F0] border-[#FFD8A8] border-b-[#FF9600]'
                  : 'bg-white border-slate-200 border-b-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center border-2 border-b-[4px] shadow-sm ${
                    isActive
                      ? 'bg-[#FF9600] border-[#E58800]'
                      : 'bg-slate-100 border-slate-200'
                  }`}>
                    <Power className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-display font-black text-slate-800 leading-tight">
                      {isActive ? 'Bảo trì đang bật' : 'Bảo trì đang tắt'}
                    </h2>
                    <p className="text-[13px] font-body font-bold text-slate-500 mt-0.5">
                      {isActive
                        ? 'Người dùng thông thường không thể truy cập hệ thống'
                        : 'Hệ thống hoạt động bình thường'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleToggle}
                  disabled={saving}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-[16px] border-2 border-b-[4px] font-display font-black text-[15px] uppercase tracking-wider transition-all outline-none disabled:opacity-50 ${
                    isActive
                      ? 'bg-white text-[#58CC02] border-[#bcf096] border-b-[#46A302] hover:bg-[#58CC02] hover:text-white hover:border-[#46A302]'
                      : 'bg-[#FF9600] text-white border-[#E58800] border-b-[#CC7A00] hover:brightness-110'
                  } active:border-b-2 active:translate-y-[2px]`}
                >
                  <Power className="w-5 h-5" strokeWidth={2.5} />
                  {saving ? 'Đang xử lý...' : (isActive ? 'Tắt bảo trì' : 'Bật bảo trì')}
                </button>
              </div>
            </Motion.div>

            {/* ── Settings Form ── */}
            <Motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b-2 border-slate-100 bg-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                  <FileText size={20} strokeWidth={2.5} className="text-slate-600" />
                </div>
                <div>
                  <h2 className="text-[16px] font-display font-black text-slate-800 leading-tight">Tùy chỉnh trang bảo trì</h2>
                  <p className="text-[12px] font-body font-bold text-slate-400">Thông tin hiển thị cho người dùng</p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 space-y-5">
                {/* Message */}
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-display font-bold text-slate-600 mb-2 uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-slate-400" /> Thông báo
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => updateForm('message', e.target.value)}
                    rows={3}
                    placeholder="Nội dung thông báo bảo trì..."
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-[14px] text-[14px] font-body font-medium text-slate-700 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none placeholder:text-slate-400"
                  />
                </div>

                {/* Estimated End Time */}
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-display font-bold text-slate-600 mb-2 uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-slate-400" /> Thời gian dự kiến hoàn thành
                  </label>
                  <input
                    type="datetime-local"
                    value={form.estimatedEndTime}
                    onChange={(e) => updateForm('estimatedEndTime', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-[14px] text-[14px] font-body font-medium text-slate-700 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-display font-bold text-slate-600 mb-2 uppercase tracking-wider">
                    <Mail className="w-4 h-4 text-slate-400" /> Email hỗ trợ
                  </label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => updateForm('contactEmail', e.target.value)}
                    placeholder="support@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-[14px] text-[14px] font-body font-medium text-slate-700 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-display font-bold text-slate-600 mb-2 uppercase tracking-wider">
                    <Phone className="w-4 h-4 text-slate-400" /> Số điện thoại hỗ trợ
                  </label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => updateForm('contactPhone', e.target.value)}
                    placeholder="0123456789"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-[14px] text-[14px] font-body font-medium text-slate-700 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Background URL */}
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-display font-bold text-slate-600 mb-2 uppercase tracking-wider">
                    <Image className="w-4 h-4 text-slate-400" /> URL hình nền (tuỳ chọn)
                  </label>
                  <input
                    type="url"
                    value={form.backgroundUrl}
                    onChange={(e) => updateForm('backgroundUrl', e.target.value)}
                    placeholder="https://example.com/background.jpg"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-[14px] text-[14px] font-body font-medium text-slate-700 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button type="submit" disabled={saving}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1CB0F6] text-white border-2 border-[#1899D6] border-b-[4px] rounded-[16px] font-display font-black text-[14px] uppercase tracking-wider hover:brightness-105 active:border-b-2 active:translate-y-[4px] transition-all outline-none disabled:opacity-50 shadow-sm"
                  >
                    <Save className="w-4 h-4" strokeWidth={2.5} />
                    {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
                  </button>
                </div>
              </form>
            </Motion.div>

            {/* ── Activity Log ── */}
            <Motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm overflow-hidden"
            >
              <div className="px-5 py-4 border-b-2 border-slate-100 bg-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                  <History size={20} strokeWidth={2.5} className="text-slate-600" />
                </div>
                <div>
                  <h2 className="text-[16px] font-display font-black text-slate-800 leading-tight">Lịch sử bảo trì</h2>
                  <p className="text-[12px] font-body font-bold text-slate-400">Các lần bật/tắt gần đây</p>
                </div>
              </div>

              <div className="overflow-x-auto custom-scrollbar p-2">
                <div className="space-y-2">
                  {logs.length === 0 ? (
                    <div className="py-10 text-center text-[14px] font-body font-bold text-slate-400">
                      Chưa có lịch sử bảo trì.
                    </div>
                  ) : (
                    logs.map((log) => {
                      const isOn = log.action_type === 'MAINTENANCE_ON';
                      const isUpdate = log.action_type === 'UPDATE_MAINTENANCE_SETTINGS';
                      return (
                        <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-[16px] hover:bg-slate-50 border-2 border-transparent hover:border-slate-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 border-2 border-b-[3px] shadow-sm ${
                              isOn ? 'bg-[#fff0f0] text-[#FF4B4B] border-[#ffc1c1]'
                                : isUpdate ? 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]'
                                : 'bg-[#f1faeb] text-[#58CC02] border-[#bcf096]'
                            }`}>
                              {isOn ? <Power size={18} strokeWidth={2.5} /> : isUpdate ? <FileText size={18} strokeWidth={2.5} /> : <CheckCircle2 size={18} strokeWidth={2.5} />}
                            </div>
                            <div>
                              <p className="text-[14px] font-display font-bold text-slate-800">{log.target_name || '—'}</p>
                              <p className="text-[11px] font-body font-bold text-slate-400 mt-0.5">Bởi: {log.admin_name || 'Admin'}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end pl-12 sm:pl-0">
                            <span className="text-[11px] font-display font-bold text-slate-400 mt-0.5">
                              {new Date(log.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} • {new Date(log.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </Motion.div>

            {/* ── Subscribers Info ── */}
            <Motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[3px] flex items-center justify-center shadow-sm">
                  <Mail size={20} strokeWidth={2.5} className="text-[#1CB0F6]" />
                </div>
                <div>
                  <h2 className="text-[16px] font-display font-black text-slate-800 leading-tight">Người đăng ký thông báo</h2>
                  <p className="text-[12px] font-body font-bold text-slate-400">Email muốn được thông báo khi hệ thống hoạt động lại</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-[14px] p-4 border-2 border-slate-100">
                <p className="text-[14px] font-body font-bold text-slate-600">
                  <span className="text-[24px] font-display font-black text-[#1CB0F6]">
                    {(config?.notificationSubscribers || []).length}
                  </span>{' '}
                  người đăng ký
                </p>
                {(config?.notificationSubscribers || []).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {config.notificationSubscribers.map((email, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-[8px] bg-white border-2 border-slate-200 text-[12px] font-body font-bold text-slate-600">
                        {email}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Motion.div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default MaintenanceSettings;

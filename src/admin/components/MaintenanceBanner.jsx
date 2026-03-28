// src/admin/components/MaintenanceBanner.jsx
import React from 'react';
import { motion as Motion } from 'framer-motion';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMaintenance } from '../../hooks/useMaintenance';

const MaintenanceBanner = () => {
  const { config, loading } = useMaintenance();
  const navigate = useNavigate();

  if (loading || !config?.isMaintenance) return null;

  return (
    <Motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 sm:mx-6 lg:mx-8 mt-4 px-5 py-3.5 rounded-[16px] flex items-center justify-between gap-4 border-2 border-b-[4px] shadow-sm"
      style={{
        background: 'linear-gradient(135deg, #FFF4E5 0%, #FFF0F0 100%)',
        borderColor: '#FFD8A8',
        borderBottomColor: '#FF9600',
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-[12px] bg-[#FF9600] border-b-[3px] border-[#E58800] flex items-center justify-center flex-shrink-0 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-display font-black text-slate-800 leading-tight">
            Chế độ bảo trì đang bật
          </p>
          <p className="text-[12px] font-body font-bold text-slate-500 truncate">
            Người dùng thông thường không thể truy cập hệ thống
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate('/admin/maintenance')}
        className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-white border-2 border-[#FFD8A8] border-b-[3px] rounded-[12px] text-[#FF9600] font-display font-bold text-[12px] uppercase tracking-wider hover:bg-[#FF9600] hover:text-white hover:border-[#E58800] active:border-b-[1px] active:translate-y-[2px] transition-all outline-none shadow-sm"
      >
        Quản lý <ExternalLink className="w-3.5 h-3.5" strokeWidth={3} />
      </button>
    </Motion.div>
  );
};

export default MaintenanceBanner;

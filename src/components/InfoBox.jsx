import React from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

/**
 * Component InfoBox hiện đại và linh hoạt.
 * Dùng để hiển thị các hộp thông báo/chi tiết nổi bật.
 * @param {string} title - Tiêu đề của hộp thông tin.
 * @param {React.ReactNode} children - Nội dung bên trong hộp thông tin.
 * @param {('info'|'success'|'warning'|'error')} type - Loại thông báo (mặc định: 'info').
 */
const InfoBox = ({ title, children, type = 'info' }) => {
  
  // 1. Logic xác định Style và Icon dựa trên Type
  const styles = {
    info: {
      icon: Info,
      bg: 'bg-blue-50/70 border-blue-200',
      text: 'text-blue-800',
      titleColor: 'text-blue-900',
      iconColor: 'text-blue-500',
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-green-50/70 border-green-200',
      text: 'text-green-800',
      titleColor: 'text-green-900',
      iconColor: 'text-green-500',
    },
    warning: {
      icon: AlertTriangle,
      // Sử dụng màu cam/vàng (giống theme trước) cho Warning
      bg: 'bg-yellow-50/70 border-yellow-200',
      text: 'text-yellow-800',
      titleColor: 'text-yellow-900',
      iconColor: 'text-yellow-500',
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-50/70 border-red-200',
      text: 'text-red-800',
      titleColor: 'text-red-900',
      iconColor: 'text-red-500',
    },
  };

  const currentStyle = styles[type] || styles.info;
  const Icon = currentStyle.icon;

  return (
    <div 
      className={`p-6 rounded-xl border shadow-lg transition-all duration-300 ${currentStyle.bg} hover:shadow-xl`}
      role="alert" // Cải thiện khả năng tiếp cận (Accessibility)
    >
      <div className="flex items-start gap-4">
        
        {/* Icon */}
        <div className={`flex-shrink-0 p-2 rounded-full ${currentStyle.iconColor} bg-white/70 backdrop-blur-sm shadow-md`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          
          {/* Title */}
          <h3 className={`text-xl font-bold mb-2 ${currentStyle.titleColor} flex items-center`}>
            {title}
          </h3>
          
          {/* Content */}
          <div className={`text-base leading-relaxed ${currentStyle.text}`}>
            {typeof children === 'string' ? <p>{children}</p> : children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
// src/admin/pages/Exams/components/ReusableSettingCard.jsx
import React from 'react';
import { Check, X } from 'lucide-react';

/**
 * Reusable Setting Card Component
 * Dùng cho các tùy chọn cấu hình với toggle switch và mô tả
 * 
 * Props:
 * - title: Tiêu đề chính
 * - description: Mô tả nhỏ bên dưới
 * - icon: Icon component từ lucide-react (optional)
 * - value: Trạng thái hiện tại (boolean)
 * - onChange: Callback khi toggle
 * - variant: 'primary' | 'accent' | 'success' (style mặc định: primary)
 * - badge: Badge text (optional)
 */
const ReusableSettingCard = ({
  title,
  description,
  icon: Icon,
  value,
  onChange,
  variant = 'primary',
  badge,
}) => {
  const variantStyles = {
    primary: {
      bg: 'from-blue-50 to-blue-100/50',
      toggle: 'bg-blue-600',
      icon: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700',
    },
    accent: {
      bg: 'from-purple-50 to-purple-100/50',
      toggle: 'bg-purple-600',
      icon: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-700',
    },
    success: {
      bg: 'from-green-50 to-green-100/50',
      toggle: 'bg-green-600',
      icon: 'text-green-600',
      badge: 'bg-green-100 text-green-700',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="group relative">
      {/* Gradient background blur effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${styles.bg} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
      
      {/* Main card */}
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        {/* Top accent bar */}
        <div className={`h-1 bg-gradient-to-r ${styles.bg}`} />

        {/* Content */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5">
          {/* Left section */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {Icon && (
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${styles.bg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <Icon className={`w-5 h-5 ${styles.icon}`} />
              </div>
            )}
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm md:text-base font-bold text-gray-900">
                  {title}
                </h3>
                {badge && (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${styles.badge}`}>
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-gray-600 mt-1 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Toggle switch */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onChange(!value)}
              className={`relative w-full sm:w-14 h-8 rounded-full transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                value 
                  ? `${styles.toggle} focus:ring-offset-green-100 shadow-lg` 
                  : 'bg-gray-300 focus:ring-offset-gray-100'
              }`}
              aria-pressed={value}
              aria-label={`Toggle ${title}`}
            >
              {/* Animated background */}
              <div className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ${value ? 'bg-white/20' : ''}`} />

              {/* Toggle circle with icon */}
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 transform ${
                  value ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                {value ? (
                  <Check className="w-3.5 h-3.5 text-green-600 animate-in fade-in duration-200" />
                ) : (
                  <X className="w-3.5 h-3.5 text-gray-400 animate-in fade-in duration-200" />
                )}
              </div>

              {/* Text indicator for mobile */}
              <span className="sm:hidden absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                {value ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom decoration line - animates on hover */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${styles.bg} transition-all duration-300 group-hover:w-full origin-left`} style={{ width: value ? '100%' : '0%' }} />
      </div>
    </div>
  );
};

export default ReusableSettingCard;
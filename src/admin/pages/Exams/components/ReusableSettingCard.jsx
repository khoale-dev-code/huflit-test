// src/admin/pages/Exams/components/ReusableSettingCard.jsx
import React from 'react';
import { Check, X } from 'lucide-react';

const ReusableSettingCard = ({
  title,
  description,
  icon: Icon,
  value,
  onChange,
  variant = 'primary',
  badge,
}) => {
  // ─── Cấu hình màu sắc chuẩn Gamification ───
  const variantStyles = {
    primary: {
      cardActive: 'bg-[#EAF6FE] border-[#BAE3FB]',
      iconBox: 'bg-white border-[#BAE3FB] text-[#1CB0F6]',
      titleActive: 'text-[#1CB0F6]',
      badge: 'bg-[#1CB0F6] text-white border-[#1899D6]',
      toggleBg: 'bg-[#1CB0F6] border-[#1899D6]',
    },
    accent: {
      cardActive: 'bg-[#F8EEFF] border-[#eec9ff]',
      iconBox: 'bg-white border-[#eec9ff] text-[#CE82FF]',
      titleActive: 'text-[#CE82FF]',
      badge: 'bg-[#CE82FF] text-white border-[#B975E5]',
      toggleBg: 'bg-[#CE82FF] border-[#B975E5]',
    },
    success: {
      cardActive: 'bg-[#f1faeb] border-[#bcf096]',
      iconBox: 'bg-white border-[#bcf096] text-[#58CC02]',
      titleActive: 'text-[#58CC02]',
      badge: 'bg-[#58CC02] text-white border-[#46A302]',
      toggleBg: 'bg-[#58CC02] border-[#46A302]',
    },
  };

  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <label 
      className={`
        relative flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer p-4 sm:p-5 
        rounded-[24px] border-2 border-b-[4px] transition-all duration-200 group font-sans
        ${value 
          ? `${styles.cardActive} shadow-sm translate-y-[-2px]` 
          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        }
      `}
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      <div className="flex items-start gap-4 pr-0 sm:pr-4 mb-4 sm:mb-0">
        
        {/* ── Icon Box 3D ── */}
        {Icon && (
          <div className={`
            w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border-2 border-b-[3px] shadow-sm transition-colors
            ${value ? styles.iconBox : 'bg-slate-50 border-slate-200 text-slate-400'}
          `}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
        )}
        
        {/* ── Text Content ── */}
        <div className="pt-0.5 flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <h3 className={`text-[16px] sm:text-[17px] font-display font-black leading-none m-0 transition-colors ${value ? styles.titleActive : 'text-slate-800'}`}>
              {title}
            </h3>
            {badge && (
              <span className={`px-2 py-0.5 rounded-[8px] text-[10px] font-display font-black uppercase tracking-widest border-b-[2px] shadow-sm ${value ? styles.badge : 'bg-slate-200 text-slate-500 border-slate-300'}`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-[13px] font-body font-bold text-slate-500 leading-snug m-0">
            {description}
          </p>
        </div>
      </div>

      {/* ── Toggle Switch Gamified ── */}
      <div className="flex items-center justify-end w-full sm:w-auto shrink-0 border-t-2 border-slate-100 sm:border-none pt-3 sm:pt-0">
        <div className={`
          relative w-14 h-8 rounded-full p-1 transition-colors duration-300 border-2 shadow-inner
          ${value ? styles.toggleBg : 'bg-slate-200 border-slate-300'}
        `}>
          {/* Checkbox ẩn để chuẩn Accessiblity */}
          <input 
            type="checkbox" 
            className="sr-only" 
            checked={value} 
            onChange={(e) => onChange(e.target.checked)} 
            aria-label={`Toggle ${title}`}
          />
          
          {/* Cục tròn (Knob) */}
          <div className={`
            w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center transform transition-transform duration-300
            ${value ? 'translate-x-6' : 'translate-x-0'}
          `}>
            {value ? (
              <Check className={`w-3.5 h-3.5 ${styles.titleActive.replace('text-', 'text-')}`} strokeWidth={4} />
            ) : (
              <X className="w-3.5 h-3.5 text-slate-300" strokeWidth={4} />
            )}
          </div>
        </div>
        
        {/* Label ON/OFF cho Mobile (chỉ hiện khi màn hình siêu nhỏ nếu cần) */}
        <span className={`ml-3 sm:hidden text-[13px] font-display font-black uppercase tracking-wider ${value ? styles.titleActive : 'text-slate-400'}`}>
          {value ? 'BẬT' : 'TẮT'}
        </span>
      </div>

    </label>
  );
};

export default ReusableSettingCard;
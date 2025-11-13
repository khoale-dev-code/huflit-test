import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const CollapsibleSection = ({ 
  title, 
  icon: Icon, 
  isOpen, 
  onToggle, 
  children,
  variant = 'default' 
}) => {
  const variants = {
    default: 'border-orange-200 hover:border-orange-300',
    info: 'border-blue-200 hover:border-blue-300',
    controls: 'border-purple-200 hover:border-purple-300'
  };

  return (
    <div className="mb-3 sm:mb-4">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-2.5 sm:p-3 md:p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border-2 ${variants[variant]} transition-all hover:shadow-lg group`}
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900 flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />}
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 group-hover:scale-110 transition-transform" />
        ) : (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 group-hover:scale-110 transition-transform" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-2 animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
};
export default CollapsibleSection;

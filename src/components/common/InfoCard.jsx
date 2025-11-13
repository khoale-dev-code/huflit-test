import React from 'react';

export const InfoCard = ({ icon: Icon, title, items, variant = 'default' }) => {
  const variants = {
    default: { bg: 'bg-orange-50/95', border: 'border-orange-200', text: 'text-orange-600' },
    info: { bg: 'bg-blue-50/95', border: 'border-blue-200', text: 'text-blue-600' },
    warning: { bg: 'bg-yellow-50/95', border: 'border-yellow-200', text: 'text-yellow-600' },
    success: { bg: 'bg-green-50/95', border: 'border-green-200', 'text': 'text-green-600' }
  };

  const style = variants[variant];

  return (
    <div className={`p-2.5 sm:p-3 md:p-4 ${style.bg} backdrop-blur-sm rounded-xl shadow-md border-2 ${style.border}`}>
      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        {Icon && <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${style.text}`} />}
        {title}
      </h3>
      <ul className="space-y-1.5 text-gray-800 text-xs sm:text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className={`${style.text} font-bold mt-0.5 flex-shrink-0`}>•</span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default InfoCard;

import { memo } from 'react';
import { Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Hero header section của trang kết quả (Gamified 3D & Compact)
 */
const ResultsHeader = memo(({ 
  title = 'Hoàn thành xuất sắc!', 
  subtitle = 'Tuyệt vời! Bạn vừa chinh phục thêm một thử thách mới.' 
}) => (
  <div className="w-full bg-white border-b-[4px] border-slate-200 pt-8 pb-10 sm:pt-10 sm:pb-12 px-4 text-center font-sans relative overflow-hidden" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
    
    {/* Khối Icon Cúp Vàng 3D + Hiệu ứng Nhận Thưởng */}
    <div className="relative inline-block mb-4 sm:mb-5">
      {/* Hào quang tỏa sáng phía sau */}
      <div className="absolute inset-0 bg-[#FFC800] blur-2xl opacity-20 rounded-full scale-[2]" />
      
      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
        className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#FFC800] rounded-full flex items-center justify-center mx-auto z-10 border-4 border-white shadow-[0_6px_0_#E5B400]"
      >
        <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-1" strokeWidth={2.5} />
        
        {/* Các ngôi sao bay lên xung quanh (Sparkles) */}
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0 }} 
          animate={{ opacity: 1, y: -15, scale: 1 }} 
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }} 
          className="absolute -top-2 -left-4"
        >
           <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC800] fill-[#FFC800] drop-shadow-sm" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0 }} 
          animate={{ opacity: 1, y: -20, scale: 1 }} 
          transition={{ delay: 0.6, type: "spring", stiffness: 300 }} 
          className="absolute -top-4 -right-2"
        >
           <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC800] fill-[#FFC800] drop-shadow-sm" />
        </motion.div>
      </motion.div>
    </div>

    {/* Tiêu đề & Mô tả (Gọn gàng, dễ đọc) */}
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3 }}
    >
      <h1 className="text-[22px] sm:text-[26px] font-display font-black text-slate-800 tracking-tight leading-tight mb-1.5 sm:mb-2">
        {title}
      </h1>
      <p className="text-[13px] sm:text-[15px] font-body font-bold text-slate-500 max-w-md mx-auto leading-relaxed">
        {subtitle}
      </p>
    </motion.div>

  </div>
));

ResultsHeader.displayName = 'ResultsHeader';
export default ResultsHeader;
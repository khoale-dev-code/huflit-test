import React from 'react';

// --- Sub-components (Giữ nguyên logic nhưng đơn giản hóa CSS nếu cần) ---

const FeatureTag = ({ emoji, label, color }) => {
  // Đơn giản hóa các class màu, loại bỏ gradient phức tạp nếu không cần
  const colors = {
    blue: 'bg-blue-100 border-blue-300 text-blue-700',
    purple: 'bg-purple-100 border-purple-300 text-purple-700',
    green: 'bg-green-100 border-green-300 text-green-700',
  };

  return (
    <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 ${colors[color]} rounded-full border transition duration-150 ease-in-out hover:shadow-md`}>
      <span className="text-sm sm:text-base">{emoji}</span>
      <span className="text-xs sm:text-sm font-semibold">{label}</span>
    </div>
  );
};

const UserGreeting = ({ user, authProvider }) => (
  // Loại bỏ hiệu ứng blur và shadow phức tạp, sử dụng shadow/gradient nhẹ hơn
  <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2 rounded-full border border-green-300 bg-green-50 shadow-md transition-all duration-300 hover:bg-green-100">
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base overflow-hidden flex-shrink-0">
      {user.photoURL ? (
        <img src={user.photoURL} alt={user.displayName || 'Ảnh đại diện'} className="w-full h-full object-cover" />
      ) : (
        user.displayName?.charAt(0) || user.email?.charAt(0) || '👤'
      )}
    </div>

    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
      <span className="text-sm text-green-800 font-medium whitespace-nowrap">
        Xin chào,{' '}
        <span className="font-bold text-green-700">
          {user.displayName || user.email?.split('@')[0] || 'Bạn'}
        </span>
      </span>
    </div>

    <div className="hidden sm:block h-5 w-px bg-green-200"></div>
    <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        authProvider === 'clerk' 
          ? 'bg-orange-200 text-orange-800' 
          : 'bg-blue-200 text-blue-800'
      }`}>
        {authProvider === 'clerk' ? 'Clerk' : 'Firebase'}
      </span>
    </div>
  </div>
);

// --- Main Component ---

export const HeaderSection = ({ isSignedIn, user, authProvider }) => (
  // Loại bỏ `animate-blob` và các div tạo hiệu ứng nền phức tạp
  <header className="relative text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 pt-8">
    
    {/* Loại bỏ: Các div tạo hiệu ứng blob nặng nề */}
    {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">...</div> */}

    <div className="relative z-10">
      
      {/* 1. Tiêu đề chính (giảm độ phức tạp của shadow/gradient) */}
      <div className="inline-block mb-4 sm:mb-6 group">
        <div className="relative p-1 bg-amber-200 rounded-3xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
          <div className="relative bg-white rounded-3xl px-6 sm:px-8 py-4 sm:py-5 backdrop-filter backdrop-blur-sm border border-amber-300">
            
            {/* Tag Premium (giảm hiệu ứng xoay) */}
            <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-3 py-0.5 rounded-full text-xs sm:text-sm font-bold shadow-md">
              ⭐ Premium
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500">
              HUFLIT Test Practice
            </h1>

            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="h-1 w-6 bg-orange-400 rounded-full"></div>
              <p className="text-sm sm:text-base text-amber-700 font-bold tracking-wider uppercase">
                Luyện thi chuyên nghiệp
              </p>
              <div className="h-1 w-6 bg-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Đoạn mô tả (Giữ nguyên) */}
      <div className="mb-6 sm:mb-8 px-2">
        <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Nền tảng luyện thi HUFLIT toàn diện với
          <span className="block sm:inline mx-1 text-orange-600 font-bold">Listening & Reading</span>
          đa giọng nói, giúp bạn thành thạo mọi kỹ năng.
        </p>
      </div>

      {/* 3. Feature Tags (Đã đơn giản hóa component con) */}
      <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-3 sm:gap-4 px-2">
        <FeatureTag emoji="📚" label="500+ Bài Tập" color="blue" />
        <FeatureTag emoji="🎧" label="Đa Giọng Nói" color="purple" />
        <FeatureTag emoji="⚡" label="Thi Thực Tế" color="green" />
        <FeatureTag emoji="🎓" label="Full Exam Mode" color="purple" />
      </div>

      {/* 4. User Status */}
      {isSignedIn && user && (
        <UserGreeting user={user} authProvider={authProvider} />
      )}

      {!isSignedIn && (
        // Đơn giản hóa button đăng nhập
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full bg-amber-100 border border-amber-300 shadow-md transition-all hover:shadow-lg">
          <span className="text-lg sm:text-xl">🚀</span>
          <span className="text-sm text-amber-800 font-bold">
            Đăng nhập để bắt đầu luyện thi
          </span>
        </div>
      )}
    </div>
  </header>
);

export default HeaderSection;
import React from 'react';

export const HeaderSection = ({ isSignedIn, user, authProvider }) => (
  <header className="relative text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-72 h-72 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 -left-40 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 -right-40 animate-blob animation-delay-2000"></div>
    </div>

    <div className="relative z-10">
      <div className="inline-block mb-4 sm:mb-6 md:mb-8 group">
        <div className="relative p-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:shadow-orange-500/50 group-hover:scale-105">
          <div className="relative bg-gradient-to-br from-white to-amber-50 rounded-3xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 backdrop-blur-xl">
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg transform transition-transform group-hover:rotate-12">
              ⭐ Premium
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 drop-shadow-lg">
              HUFLIT Test Practice
            </h1>

            <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
              <p className="text-xs sm:text-sm md:text-base text-amber-700 font-bold tracking-wider uppercase">
                Luyện thi chuyên nghiệp
              </p>
              <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8 px-2">
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 font-semibold max-w-3xl mx-auto leading-relaxed">
          Nền tảng luyện thi HUFLIT toàn diện với
          <span className="block sm:inline mx-1 text-amber-700 font-black">Listening & Reading</span>
          đa giọng nói, giúp bạn thành thạo mọi kỹ năng
        </p>
      </div>

      <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-3 sm:gap-6 px-2">
        <FeatureTag emoji="📚" label="500+ Bài Tập" color="blue" />
        <FeatureTag emoji="🎧" label="Đa Giọng Nói" color="purple" />
        <FeatureTag emoji="⚡" label="Thi Thực Tế" color="green" />
        <FeatureTag emoji="🎓" label="Full Exam Mode" color="purple" />
      </div>

      {isSignedIn && user && (
        <UserGreeting user={user} authProvider={authProvider} />
      )}

      {!isSignedIn && (
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 shadow-lg">
          <span className="text-lg sm:text-xl animate-bounce">🚀</span>
          <span className="text-xs sm:text-sm text-amber-800 font-bold">
            Đăng nhập để bắt đầu luyện thi
          </span>
        </div>
      )}
    </div>
  </header>
);

// Sub-components
const FeatureTag = ({ emoji, label, color }) => {
  const colors = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-800',
    purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-800',
    green: 'from-green-50 to-green-100 border-green-200 text-green-800',
  };

  return (
    <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r ${colors[color]} rounded-lg border`}>
      <span className="text-lg sm:text-xl">{emoji}</span>
      <span className="text-xs sm:text-sm font-bold">{label}</span>
    </div>
  );
};

const UserGreeting = ({ user, authProvider }) => (
  <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-transparent bg-gradient-to-r from-emerald-50 to-green-50 shadow-lg hover:shadow-xl transform transition-all duration-300 group/greeting">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur opacity-50 group-hover/greeting:opacity-100 transition-opacity"></div>
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base overflow-hidden">
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName || 'Ảnh đại diện'} className="w-full h-full object-cover" />
        ) : (
          user.displayName?.charAt(0) || user.email?.charAt(0) || '👤'
        )}
      </div>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-xs sm:text-sm text-green-800 font-bold">
        Xin chào,{' '}
        <span className="font-black text-green-700">
          {user.displayName || user.email?.split('@')[0] || 'Bạn'}
        </span>
      </span>
    </div>

    <div className="hidden sm:block h-6 w-px bg-green-300"></div>
    <div className="hidden sm:flex items-center gap-2">
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
        authProvider === 'clerk' 
          ? 'bg-orange-100 text-orange-700' 
          : 'bg-blue-100 text-blue-700'
      }`}>
        {authProvider === 'clerk' ? '🔐 Clerk' : '🔥 Firebase'}
      </span>
      <div className="flex items-center gap-1 text-xs font-semibold text-green-700">
        <span className="inline-block w-6 h-6 bg-white rounded-full flex items-center justify-center text-green-600 font-bold">
          ✓
        </span>
        Sẵn sàng thi
      </div>
    </div>
  </div>
);
export default HeaderSection;

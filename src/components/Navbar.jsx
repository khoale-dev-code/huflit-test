import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Headphones, BookOpen, GraduationCap, Sparkles, 
  ChevronDown, LogOut, User, Menu, X, Flame, Languages, Home, FileText
} from 'lucide-react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useStreak } from './hooks/useStreak';
import { ROUTES } from '../config/routes';
import logo from '../assets/logo.png';

const Navbar = ({ testType, onTestTypeChange, practiceType, onPracticeTypeChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSignedIn, signInWithGoogle, signOut } = useFirebaseAuth();
  const { streak } = useStreak();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuItems = [
    { id: 'listening', label: 'Luyện Nghe', icon: Headphones, type: 'test', path: ROUTES.TEST },
    { id: 'reading', label: 'Luyện Đọc', icon: BookOpen, type: 'test', path: ROUTES.TEST },
    { id: 'full', label: 'Thi Thử', icon: GraduationCap, type: 'exam', path: ROUTES.FULL_EXAM },
    { id: 'grammar', label: 'Ngữ Pháp', icon: Sparkles, type: 'practice', path: ROUTES.GRAMMAR },
    { id: 'vocabulary', label: 'Từ Vựng', icon: Languages, type: 'practice', path: ROUTES.VOCABULARY },
  ];

  const bottomMenuItems = [
    { id: 'home', label: 'Trang chủ', icon: Home, path: ROUTES.HOME },
    ...menuItems.slice(0, 2),
  ];

  // Scroll effect - Navbar luôn hiển thị, không bị ẩn
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Body overflow management
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((item) => {
    if (item.type === 'test') onTestTypeChange?.(item.id);
    if (item.type === 'practice') onPracticeTypeChange?.(item.id);
    navigate(item.path);
    setMobileOpen(false);
    setShowProfileMenu(false);
  }, [onTestTypeChange, onPracticeTypeChange, navigate]);

  const handleLogoClick = useCallback(() => {
    navigate(ROUTES.HOME);
    setMobileOpen(false);
  }, [navigate]);

  const isItemActive = (item) => {
    const pathMatch = location.pathname === item.path;
    if (item.type === 'test') return pathMatch && testType === item.id;
    if (item.type === 'practice') return pathMatch && practiceType === item.id;
    return pathMatch;
  };

  const handleSignOut = useCallback(() => {
    signOut();
    setShowProfileMenu(false);
    setMobileOpen(false);
  }, [signOut]);

  const handleProfileClick = useCallback(() => {
    navigate(ROUTES.PROFILE);
    setShowProfileMenu(false);
    setMobileOpen(false);
  }, [navigate]);

  // ✅ FIX: Thêm function handleAnswersClick
  const handleAnswersClick = useCallback(() => {
    navigate(ROUTES.ANSWERS);
    setShowProfileMenu(false);
    setMobileOpen(false);
  }, [navigate]);

  const NavButton = ({ item, isActive, onClick }) => {
    const Icon = item.icon;
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
          isActive
            ? 'bg-[#00358E] text-white shadow-md'
            : 'text-slate-700 hover:bg-slate-100'
        }`}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span>{item.label}</span>
      </button>
    );
  };

  const BottomNavItem = ({ item, isActive, onClick }) => {
    const Icon = item.icon;
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`flex flex-col items-center justify-center gap-1.5 py-2 px-3 rounded-xl transition-all relative group ${
          isActive
            ? 'text-[#00358E]'
            : 'text-slate-600 hover:text-[#00358E]'
        }`}
      >
        <div className={`p-2 rounded-lg transition-all ${
          isActive
            ? 'bg-blue-100'
            : 'group-hover:bg-slate-100'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-semibold text-center whitespace-nowrap">{item.label}</span>
        {isActive && (
          <motion.div
            layoutId="bottom-active"
            className="absolute bottom-0 h-1 w-8 bg-[#00358E] rounded-full"
          />
        )}
      </motion.button>
    );
  };

  return (
    <>
      {/* NAVBAR - LUÔN HIỂN THỊ, STICKY POSITION */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-xl shadow-md border-b border-white/40'
            : 'bg-white/30 backdrop-blur-lg border-b border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2 cursor-pointer group flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-[#00358E] rounded-lg flex items-center justify-center shadow-lg">
                <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-[#00358E] font-black text-lg leading-tight">HUFLIT</h1>
                <p className="text-[#FF7D00] text-xs font-bold tracking-wider uppercase">Exam Center</p>
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
              {menuItems.map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  isActive={isItemActive(item)}
                  onClick={() => handleNavClick(item)}
                />
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Streak Badge */}
              {isSignedIn && streak > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden xs:flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100"
                >
                  <Flame className="w-4 h-4 text-[#FF7D00] fill-[#FF7D00] animate-pulse" />
                  <span className="text-[#FF7D00] font-bold text-xs sm:text-sm">{streak} Ngày</span>
                </motion.div>
              )}

              {/* Auth Button / Profile */}
              {isSignedIn ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                    />
                    <ChevronDown className="hidden sm:block w-4 h-4 text-slate-400" />
                  </motion.button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {showProfileMenu && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-20"
                          onClick={() => setShowProfileMenu(false)}
                        />
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-30"
                        >
                          <button 
                            onClick={handleProfileClick}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                          >
                            <User className="w-4 h-4" />
                            <span>Trang cá nhân</span>
                          </button>
                          {/* ✅ FIX: Thêm nút Đáp Án */}
                          <button 
                            onClick={handleAnswersClick}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Đáp Án</span>
                          </button>
                          <div className="border-t border-slate-100 my-1" />
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Đăng xuất</span>
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={signInWithGoogle}
                  className="bg-[#00358E] text-white px-4 sm:px-6 py-2 rounded-lg font-bold text-xs sm:text-sm hover:bg-[#002763] transition-all whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Đăng nhập</span>
                  <span className="sm:hidden">Login</span>
                </motion.button>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-slate-600" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-64 sm:w-72 bg-white/95 backdrop-blur-xl z-30 lg:hidden overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-4 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-slate-800">Menu</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileOpen(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="p-3 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                      isItemActive(item)
                        ? 'bg-gradient-to-r from-[#00358E] to-[#002763] text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* User Section */}
              {isSignedIn && user && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-slate-200 p-3 space-y-3"
                >
                  {/* User Card */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 border border-slate-200">
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Streak Card */}
                  {streak > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-50 to-yellow-50 px-3 py-3 rounded-xl border border-orange-200"
                    >
                      <Flame className="w-5 h-5 text-[#FF7D00] fill-[#FF7D00] animate-pulse flex-shrink-0" />
                      <div className="text-center">
                        <p className="text-[#FF7D00] font-bold text-sm">{streak}</p>
                        <p className="text-[#FF7D00] text-xs font-semibold">ngày liên tiếp</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleProfileClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-blue-100 rounded-lg transition-colors font-semibold text-sm"
                  >
                    <User className="w-4 h-4" />
                    <span>Trang cá nhân</span>
                  </motion.button>
                  
                  {/* ✅ FIX: Thêm nút Đáp Án ở mobile */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAnswersClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-blue-100 rounded-lg transition-colors font-semibold text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Đáp Án</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors font-semibold text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation for Mobile - Luôn hiển thị */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 sm:hidden bg-white/50 backdrop-blur-xl border-t border-white/30 shadow-lg z-30"
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-around px-2 py-3">
          {bottomMenuItems.map((item) => (
            <BottomNavItem
              key={item.id}
              item={item}
              isActive={isItemActive(item)}
              onClick={() => handleNavClick(item)}
            />
          ))}
          {/* More Menu */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center justify-center gap-1.5 py-2 px-3 rounded-xl hover:bg-slate-100 transition-all"
          >
            <div className="p-2 rounded-lg hover:bg-slate-200">
              <Menu className="w-5 h-5 text-slate-600" />
            </div>
            <span className="text-[10px] font-semibold text-slate-600">Thêm</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Spacer - Điều chỉnh theo navbar height */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navbar;
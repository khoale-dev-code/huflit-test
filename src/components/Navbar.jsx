import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Headphones, BookOpen, BookMarked, Sparkles, User, ChevronDown, LogOut, Settings, Play } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import ClerkAuth from './ClerkAuth';
import logo from '../assets/logo.png';

export default function Navbar({
  testType,
  onTestTypeChange,
  practiceType,
  onPracticeTypeChange,
  onProfileClick,
}) {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const testMenuItems = [
    {
      id: 'listening',
      label: 'Nghe',
      subtext: 'Listening',
      icon: Headphones,
      gradient: 'from-amber-400 to-orange-500',
      onClick: () => onTestTypeChange('listening'),
      isActive: testType === 'listening',
    },
    {
      id: 'reading',
      label: 'Đọc',
      subtext: 'Reading',
      icon: BookOpen,
      gradient: 'from-yellow-400 to-amber-500',
      onClick: () => onTestTypeChange('reading'),
      isActive: testType === 'reading',
    },
  ];

  const practiceMenuItems = [
    {
      id: 'grammar',
      label: 'Ngữ Pháp',
      subtext: 'Grammar',
      icon: BookMarked,
      gradient: 'from-orange-400 to-amber-500',
      onClick: () => onPracticeTypeChange('grammar'),
      isActive: practiceType === 'grammar' && !testType,
    },
    {
      id: 'vocabulary',
      label: 'Từ Vựng',
      subtext: 'Vocabulary',
      icon: Sparkles,
      gradient: 'from-amber-400 to-orange-500',
      onClick: () => onPracticeTypeChange('vocabulary'),
      isActive: practiceType === 'vocabulary' && !testType,
    },
  ];

  const handleMenuClick = (item) => {
    item.onClick();
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    if (onProfileClick) {
      onProfileClick();
    } else {
      const profileSection = document.getElementById('user-profile-section');
      if (profileSection) {
        profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSignOut = async () => {
    setShowProfileMenu(false);
    await signOut();
  };

  const NavItem = ({ item, isMobile = false }) => {
    const IconComponent = item.icon;
    const { isActive } = item;

    if (isMobile) {
      return (
        <button
          onClick={() => handleMenuClick(item)}
          className={`w-full px-4 py-3.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 group ${
            isActive
              ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <div
            className={`p-2.5 rounded-lg transition-all ${
              isActive
                ? 'bg-white/25'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 group-hover:from-amber-200 group-hover:to-orange-200'
            }`}
          >
            <IconComponent
              className={`w-5 h-5 ${isActive ? 'text-white' : 'text-orange-600'}`}
            />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold">{item.label}</p>
            <p className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
              {item.subtext}
            </p>
          </div>
          {isActive && (
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-md"></div>
          )}
        </button>
      );
    }

    return (
      <button
        onClick={() => handleMenuClick(item)}
        className={`relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2.5 group overflow-hidden ${
          isActive
            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-orange-200/50`
            : 'text-slate-700 hover:text-slate-900 relative'
        }`}
      >
        {/* Background effect for inactive */}
        {!isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}

        <IconComponent
          className={`w-4 h-4 relative z-10 transition-transform duration-300 ${ // Sửa w-4.5 h-4.5 thành w-4 h-4
            isActive ? 'scale-110' : 'group-hover:scale-110'
          }`}
        />
        <span className="relative z-10 whitespace-nowrap">{item.label}</span>

        {isActive && (
          <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white/60"></div>
        )}
      </button>
    );
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-100/50'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Đã sửa lỗi cú pháp */}
          <div className="flex-shrink-0">
            <a // Thêm thẻ <a> để sửa lỗi
              href="/"
              className="flex items-center gap-2.5 group transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative bg-white p-2 rounded-xl shadow-md border border-amber-100 group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h1 className="hidden sm:block text-xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
                HUFLIT
              </h1>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Test Section */}
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-amber-600 font-bold" />
              <div className="flex gap-2">
                {testMenuItems.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gradient-to-b from-amber-200 via-orange-300 to-amber-200"></div>

            {/* Practice Section */}
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-500 font-bold" />
              <div className="flex gap-2">
                {practiceMenuItems.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="h-6 w-px bg-gradient-to-b from-amber-200 via-orange-300 to-amber-200"></div>

            {isSignedIn && user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2.5 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border-1.5 border-amber-200 hover:border-orange-400 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || user.firstName}
                    className="w-8 h-8 rounded-full ring-2 ring-amber-300 group-hover:ring-orange-400 transition-all"
                  />
                  <p className="text-sm font-semibold text-slate-700 hidden xl:block">
                    {user.firstName}
                  </p>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-600 transition-transform duration-300 hidden xl:block ${
                      showProfileMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-amber-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.imageUrl}
                          alt={user.fullName || user.firstName}
                          className="w-12 h-12 rounded-lg border-2 border-white shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm truncate">
                            {user.fullName || user.firstName}
                          </p>
                          <p className="text-xs text-white/85 truncate">
                            {user.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors group"
                      >
                        <User className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-slate-700">
                          Xem Profile
                        </span>
                      </button>
                      <div className="h-px bg-amber-100 mx-3 my-1"></div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors group"
                      >
                        <LogOut className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-slate-700">
                          Đăng Xuất
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hover:scale-105 transition-transform duration-300">
                <ClerkAuth />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {isSignedIn && user ? (
              <button
                onClick={handleProfileClick}
                className="relative"
              >
                <img
                  src={user.imageUrl}
                  alt={user.fullName || user.firstName}
                  className="w-9 h-9 rounded-full ring-2 ring-amber-300 hover:ring-orange-400 transition-all shadow-sm"
                />
              </button>
            ) : (
              <ClerkAuth />
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isOpen
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-amber-100 pt-3 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
            {/* Test Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-2">
                <Play className="w-4 h-4 text-amber-600" />
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                  Bài Thi
                </p>
              </div>
              {testMenuItems.map((item) => (
                <NavItem key={item.id} item={item} isMobile />
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-amber-100"></div>

            {/* Practice Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-2">
                <Settings className="w-4 h-4 text-slate-500" />
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                  Thực Hành
                </p>
              </div>
              {practiceMenuItems.map((item) => (
                <NavItem key={item.id} item={item} isMobile />
              ))}
            </div>

            {/* Mobile Profile Actions */}
            {isSignedIn && user && (
              <>
                <div className="h-px bg-amber-100"></div>
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-3.5 rounded-lg font-medium text-slate-700 bg-slate-50 hover:bg-amber-50 transition-all flex items-center gap-3 group"
                >
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 group-hover:from-amber-200 group-hover:to-orange-200">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <span>Xem Profile</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3.5 rounded-lg font-medium text-slate-700 bg-slate-50 hover:bg-red-50 transition-all flex items-center gap-3 group"
                >
                  <div className="p-2.5 rounded-lg bg-red-100 group-hover:bg-red-200">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <span>Đăng Xuất</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
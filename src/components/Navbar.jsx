import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Headphones, BookOpen, BookMarked, Sparkles, User, ChevronDown, LogOut, Settings } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      id: 'listening',
      label: 'Listening',
      icon: Headphones,
      gradient: 'from-orange-400 to-amber-500',
      hoverGradient: 'from-orange-500 to-amber-600',
      onClick: () => onTestTypeChange('listening'),
      isActive: testType === 'listening'
    },
    {
      id: 'reading',
      label: 'Reading',
      icon: BookOpen,
      gradient: 'from-amber-400 to-yellow-500',
      hoverGradient: 'from-amber-500 to-yellow-600',
      onClick: () => onTestTypeChange('reading'),
      isActive: testType === 'reading'
    },
    {
      id: 'grammar',
      label: 'Grammar',
      icon: BookMarked,
      gradient: 'from-yellow-400 to-orange-500',
      hoverGradient: 'from-yellow-500 to-orange-600',
      onClick: () => onPracticeTypeChange('grammar'),
      isActive: practiceType === 'grammar'
    },
    {
      id: 'vocabulary',
      label: 'Vocabulary',
      icon: Sparkles,
      gradient: 'from-orange-400 to-rose-400',
      hoverGradient: 'from-orange-500 to-rose-500',
      onClick: () => onPracticeTypeChange('vocabulary'),
      isActive: practiceType === 'vocabulary'
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
      // Scroll to profile section
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

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-amber-50/98 via-orange-50/98 to-amber-50/98 backdrop-blur-xl shadow-lg border-b border-orange-200/50' 
          : 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section - Enhanced */}
          <div className="flex-shrink-0">
            <button className="relative group">
              <div className="relative flex items-center justify-center p-2">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500 scale-95 group-hover:scale-110"></div>
                
                {/* Logo container */}
                <div className="relative bg-gradient-to-br from-white to-amber-50 p-2 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 border border-orange-200/50">
                  <img 
                    src={logo} 
                    alt="Logo" 
                    className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Menu - Modern Design */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`relative group px-5 py-2.5 rounded-2xl font-semibold text-sm lg:text-base transition-all duration-300 flex items-center gap-2.5 overflow-hidden ${
                    item.isActive
                      ? 'text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:text-gray-900 bg-white/80 hover:bg-white shadow-sm hover:shadow-md hover:scale-105'
                  }`}
                >
                  {/* Active gradient background */}
                  {item.isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} transition-all duration-300`}></div>
                  )}
                  
                  {/* Hover gradient background */}
                  {!item.isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.hoverGradient} opacity-0 group-hover:opacity-10 transition-all duration-300`}></div>
                  )}
                  
                  {/* Icon with animation */}
                  <IconComponent className={`w-4 h-4 lg:w-5 lg:h-5 relative z-10 transition-transform duration-300 ${
                    item.isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-12'
                  }`} />
                  
                  {/* Label */}
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Active indicator dot */}
                  {item.isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Section - Auth & Profile */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-orange-300 to-transparent"></div>
            
            {isSignedIn && user ? (
              <div className="relative" ref={profileMenuRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="group flex items-center gap-3 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-lg border border-orange-200/50 hover:border-orange-300 transition-all duration-300 hover:scale-105"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={user.imageUrl}
                      alt={user.fullName || user.firstName}
                      className="w-9 h-9 rounded-full ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  
                  {/* Name */}
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-bold text-gray-900">{user.firstName || 'User'}</p>
                    <p className="text-xs text-gray-600">Profile</p>
                  </div>
                  
                  {/* Dropdown Icon */}
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-orange-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* User Info */}
                    <div className="px-4 py-4 bg-gradient-to-r from-orange-500 to-amber-500">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.imageUrl}
                          alt={user.fullName || user.firstName}
                          className="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div>
                          <p className="font-bold text-white text-sm">{user.fullName || user.firstName}</p>
                          <p className="text-xs text-white/90">{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors"
                      >
                        <User className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-semibold text-gray-700">Xem Profile</span>
                      </button>

                      <div className="h-px bg-gray-200 mx-4 my-2"></div>

                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-semibold text-gray-700">Đăng Xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="transform transition-transform duration-300 hover:scale-105">
                <ClerkAuth />
              </div>
            )}
          </div>

          {/* Mobile Menu Button & Auth */}
          <div className="md:hidden flex items-center gap-3">
            {isSignedIn && user ? (
              <button
                onClick={handleProfileClick}
                className="relative"
              >
                <img
                  src={user.imageUrl}
                  alt={user.fullName || user.firstName}
                  className="w-9 h-9 rounded-full ring-2 ring-orange-300 hover:ring-orange-500 transition-all"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </button>
            ) : (
              <div className="transform transition-transform duration-300 hover:scale-105">
                <ClerkAuth />
              </div>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isOpen
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg rotate-90'
                  : 'bg-white/80 text-gray-700 hover:bg-white shadow-sm hover:shadow-md'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {isOpen && (
          <div className="md:hidden border-t border-orange-200/50 pt-4 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 animate-in slide-in-from-left ${
                    item.isActive
                      ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg scale-105'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    item.isActive 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-r ' + item.gradient + ' bg-opacity-10'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.isActive && (
                    <div className="w-2 h-2 rounded-full bg-white shadow-md animate-pulse"></div>
                  )}
                </button>
              );
            })}

            {/* Mobile Profile & Sign Out */}
            {isSignedIn && user && (
              <>
                <div className="h-px bg-orange-200 my-2"></div>
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold bg-white/80 text-gray-700 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-r from-orange-400 to-amber-500 bg-opacity-10">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="flex-1 text-left">Xem Profile</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold bg-white/80 text-gray-700 hover:bg-red-50 hover:shadow-md transition-all"
                >
                  <div className="p-2 rounded-lg bg-red-500 bg-opacity-10">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="flex-1 text-left">Đăng Xuất</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
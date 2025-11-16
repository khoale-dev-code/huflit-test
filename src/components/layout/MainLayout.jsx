// src/components/layout/MainLayout.jsx
import React from 'react';
import Navbar from '../Navbar';
import Footer from '../footer/Footer';
import ScrollToTopButton from '../footer/ScrollToTopButton';

const MainLayout = ({ 
  children, 
  testType, 
  onTestTypeChange, 
  practiceType, 
  onPracticeTypeChange,
  user,
  onAuthClick,
  onChatClick,
  onProfileClick,
  viewMode,
  onlineCount,   // ✅ NHẬN TỪ APP
  totalUsers     // ✅ NHẬN TỪ APP
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex flex-col">
      <AnnouncementBanner />
      
      <Navbar
        testType={testType}
        onTestTypeChange={onTestTypeChange}
        practiceType={practiceType}
        onPracticeTypeChange={onPracticeTypeChange}
        user={user}
        onAuthClick={onAuthClick}
        onChatClick={onChatClick}
        onProfileClick={onProfileClick}
        viewMode={viewMode}
        onlineCount={onlineCount}   // ✅ TRUYỀN VÀO NAVBAR
        totalUsers={totalUsers}
      />

      <main className="flex-1 pt-20 pb-16 px-3 sm:px-4 md:px-6 lg:px-8">
        {children}
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
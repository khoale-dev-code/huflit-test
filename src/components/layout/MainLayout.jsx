// src/components/layout/MainLayout.jsx
import React from 'react';
import Navbar from '../Navbar';
import Footer from '../footer/Footer';

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
  onlineCount,
  totalUsers,
  onAnswersClick
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex flex-col overflow-visible">
      
      {/* Navbar */}
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
        onlineCount={onlineCount}
        totalUsers={totalUsers}
        onAnswersClick={onAnswersClick}
      />

      {/* Main Content - NO OVERFLOW RESTRICTIONS */}
      <main className="flex-1 pt-20 pb-16 px-3 sm:px-4 md:px-6 lg:px-8 overflow-visible w-full relative z-0">
        {children}
      </main>

      {/* Footer */}
      <Footer 
        onlineCount={onlineCount}
        totalUsers={totalUsers}
      />
      
    </div>
  );
};

export default MainLayout;
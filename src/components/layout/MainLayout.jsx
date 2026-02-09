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
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* Navbar - Fixed at top */}
      <div className="sticky top-0 z-50">
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
      </div>

      {/* Main Content Container */}
      <main className="flex-1 w-full">
        {/* Padding wrapper - Giảm padding top từ py-6 sm:py-8 */}
        <div className="h-full px-4 sm:px-6 md:px-8 lg:px-10 pt-0 pb-6 sm:pb-8">
          {/* Max width container */}
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto border-t border-slate-200 bg-white">
        <Footer 
          onlineCount={onlineCount}
          totalUsers={totalUsers}
        />
      </footer>
      
    </div>
  );
};

export default MainLayout;
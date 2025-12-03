// src/pages/HomePage.jsx

import React, { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { useAppState } from '../hooks/useAppState';
import { useOnlineUsers } from '../hooks/useOnlineUsers';
import MemoizedHeaderSection from '../components/sections/HeaderSection';
import { 
  GraduationCap, 
  BookOpen, 
  Target, 
  Zap, 
  Users, 
  ArrowRight, 
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Star,
  BarChart3,
  Sparkles,
  FileText,
  Headphones,
  BookMarked,
  Trophy,
  Brain,
  LineChart
} from 'lucide-react';

// Memoized Feature Card với animation gradient
const MemoizedFeatureCard = memo(({ icon: Icon, title, description, gradient, onClick }) => (
  <button
    onClick={onClick}
    className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 text-left w-full"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-300">
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-3">{description}</p>
    <div className={`flex items-center text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
      Bắt đầu ngay <ArrowRight className="w-4 h-4 ml-1" />
    </div>
  </button>
));

MemoizedFeatureCard.displayName = 'MemoizedFeatureCard';

// Stat Card hiện đại
const MemoizedStatCard = memo(({ icon: Icon, value, label, gradient, trend }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-500`}></div>
    <div className="relative z-10">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <p className="text-4xl font-extrabold text-gray-800 mb-2">{value}</p>
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      {trend && (
        <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
          <TrendingUp className="w-4 h-4" />
          <span>{trend}</span>
        </div>
      )}
    </div>
  </div>
));

MemoizedStatCard.displayName = 'MemoizedStatCard';

// Benefit Item
const BenefitItem = memo(({ icon: Icon, title, description }) => (
  <div className="flex gap-4 items-start">
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-md">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
));

BenefitItem.displayName = 'BenefitItem';

const HomePage = memo(() => {
  const navigate = useNavigate();
  const { onlineCount } = useOnlineUsers();
  const { isSignedIn, user, handleTestTypeChange } = useAppState();

  // Số liệu thực tế
  const totalUsers = 550;
  const totalExercises = 450;
  const passRate = 92;

  const handleStartPractice = useCallback(() => {
    handleTestTypeChange('listening');
    navigate(ROUTES.TEST);
  }, [handleTestTypeChange, navigate]);

  const handleStartFullExam = useCallback(() => {
    handleTestTypeChange('full');
    navigate(ROUTES.FULL_EXAM);
  }, [handleTestTypeChange, navigate]);

  const handleGoToGrammar = useCallback(() => {
    navigate(ROUTES.GRAMMAR);
  }, [navigate]);

  const handleGoToVocabulary = useCallback(() => {
    navigate(ROUTES.VOCABULARY);
  }, [navigate]);

  const handleGoToProfile = useCallback(() => {
    navigate(ROUTES.PROFILE);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <MemoizedHeaderSection isSignedIn={isSignedIn} user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Hero Section - Cải tiến */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 p-8 md:p-16 shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold mb-8 shadow-lg">
              <Sparkles className="w-5 h-5" />
              Hệ Thống Ôn Luyện Chính Thức HUFLIT
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Chinh Phục<br />
              <span className="text-yellow-200">Chuẩn Đầu Ra Tiếng Anh</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Luyện tập theo cấu trúc đề thi thực tế của trường. 
              Hệ thống bài tập phong phú với giải thích chi tiết và theo dõi tiến độ cá nhân.
            </p>

            {/* User Status */}
            {isSignedIn ? (
              <div className="mb-10">
                <div className="inline-flex items-center gap-4 px-8 py-5 bg-white/15 backdrop-blur-lg border-2 border-white/30 text-white rounded-2xl font-bold shadow-2xl">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center shadow-lg">
                    <Award className="w-7 h-7 text-orange-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm opacity-90 font-normal">Chào mừng trở lại,</p>
                    <p className="text-xl font-bold">{user?.name || 'Học viên HUFLIT'}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={handleStartFullExam}
                className="group px-10 py-5 bg-white text-orange-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 text-lg"
              >
                <GraduationCap className="w-6 h-6" />
                Làm Đề Thi Thử
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {!isSignedIn && (
                <button
                  onClick={handleGoToProfile}
                  className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
                >
                  Đăng Nhập / Đăng Ký
                </button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/90 text-base">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle className="w-6 h-6" />
                <span>100% Miễn Phí</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Users className="w-6 h-6" />
                <span>{totalUsers}+ Sinh Viên</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Star className="w-6 h-6 fill-white/90" />
                <span>Đề Thi Chuẩn Trường</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Số liệu thực tế */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Thống Kê Hệ Thống
            </h2>
            <p className="text-gray-600 text-lg">
              Con số biết nói về chất lượng đào tạo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MemoizedStatCard 
              icon={Users} 
              value={totalUsers} 
              label="Sinh viên đang học" 
              gradient="from-blue-500 to-blue-600"
              trend="+50 tuần này"
            />
            <MemoizedStatCard 
              icon={TrendingUp} 
              value={onlineCount || 242} 
              label="Đang online ngay lúc này" 
              gradient="from-green-500 to-emerald-600"
              trend="Cao điểm"
            />
            <MemoizedStatCard 
              icon={BookOpen} 
              value={totalExercises} 
              label="Bài tập & đề thi" 
              gradient="from-orange-500 to-amber-600"
              trend="+30 tháng này"
            />
            <MemoizedStatCard 
              icon={Trophy} 
              value={`${passRate}%`}
              label="Tỷ lệ đạt chuẩn" 
              gradient="from-purple-500 to-pink-600"
              trend="Tăng 5%"
            />
          </div>
        </section>

        {/* Main Features - 4 tính năng chính */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Hệ Thống Ôn Luyện Toàn Diện
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Mô phỏng 100% cấu trúc đề thi chuẩn đầu ra của trường với các phương pháp học tập hiệu quả
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MemoizedFeatureCard
              icon={Headphones}
              title="Luyện Nghe"
              description="Hơn 200+ bài tập nghe theo cấu trúc đề thi thực tế với audio chất lượng cao và transcript đầy đủ."
              gradient="from-blue-500 to-cyan-500"
              onClick={handleStartPractice}
            />
            <MemoizedFeatureCard
              icon={FileText}
              title="Luyện Đọc"
              description="150+ bài đọc hiểu đa dạng chủ đề với các câu hỏi được phân tích và giải thích chi tiết."
              gradient="from-green-500 to-emerald-500"
              onClick={handleStartPractice}
            />
            <MemoizedFeatureCard
              icon={Target}
              title="Ngữ Pháp"
              description="40+ chủ đề ngữ pháp quan trọng với hệ thống bài tập từ cơ bản đến nâng cao."
              gradient="from-orange-500 to-amber-500"
              onClick={handleGoToGrammar}
            />
            <MemoizedFeatureCard
              icon={BookMarked}
              title="Từ Vựng"
              description="2000+ từ vựng học thuật theo chủ đề với flashcard thông minh và quiz tương tác."
              gradient="from-purple-500 to-pink-500"
              onClick={handleGoToVocabulary}
            />
          </div>
        </section>

        {/* Full Exam Highlight */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-4">
                <Trophy className="w-4 h-4" />
                Tính năng nổi bật
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Thi Thử Đề Chuẩn Đầu Ra
              </h2>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                Làm bài thi thử với cấu trúc 100% giống đề thi thực tế. 
                Có timer chính xác, phân tích kết quả chi tiết và lưu lịch sử điểm số.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Đề thi đầy đủ cả 4 kỹ năng: Nghe - Đọc  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Tự động chấm điểm và phân tích lỗi sai</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Lưu lại kết quả để theo dõi tiến bộ</span>
                </li>
              </ul>
              <button
                onClick={handleStartFullExam}
                className="group px-8 py-4 bg-white text-purple-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Bắt Đầu Thi Thử
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/90 font-semibold">Thời gian làm bài</span>
                  <Clock className="w-5 h-5 text-white/90" />
                </div>
                <p className="text-4xl font-bold text-white mb-6">90 phút</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <span>Phần Nghe</span>
                    <span className="font-semibold">30 phút</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <span>Phần Đọc</span>
                    <span className="font-semibold">60 phút</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-between text-white">
                    <span className="font-semibold">Tổng số câu</span>
                    <span className="text-2xl font-bold">60 câu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tại Sao Chọn Chúng Tôi?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hệ thống được thiết kế dành riêng cho sinh viên HUFLIT
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <BenefitItem
              icon={Brain}
              title="Đề Thi Chuẩn Trường"
              description="100% cấu trúc đề thi giống với đề thi chuẩn đầu ra thực tế của trường, giúp bạn làm quen và tự tin hơn."
            />
            <BenefitItem
              icon={LineChart}
              title="Theo Dõi Tiến Độ"
              description="Hệ thống phân tích chi tiết điểm mạnh, điểm yếu và đưa ra lộ trình học tập phù hợp cho từng cá nhân."
            />
            <BenefitItem
              icon={Zap}
              title="Học Mọi Lúc Mọi Nơi"
              description="Truy cập dễ dàng trên mọi thiết bị. Học bất cứ khi nào bạn muốn, không giới hạn thời gian."
            />
            <BenefitItem
              icon={Award}
              title="Miễn Phí Hoàn Toàn"
              description="Tất cả tài liệu, bài tập và đề thi đều hoàn toàn miễn phí cho sinh viên HUFLIT. Không có chi phí ẩn."
            />
          </div>
        </section>

        {/* Progress Section - Chỉ hiện khi đã đăng nhập */}
        {isSignedIn && (
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-10 h-10 text-blue-600" />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">Tiến Độ Học Tập</h2>
                    <p className="text-gray-600">Theo dõi và cải thiện kết quả</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Xem chi tiết lịch sử làm bài, phân tích điểm mạnh yếu và nhận gợi ý 
                  cải thiện từ hệ thống để đạt điểm cao hơn.
                </p>

                <button 
                  onClick={handleGoToProfile}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:shadow-xl flex items-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  Xem Dashboard
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700 font-semibold text-lg">Hoàn thành tuần này</span>
                    <span className="text-blue-600 font-bold text-2xl">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all duration-1000 shadow-md" 
                      style={{width: '68%'}}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-3xl font-bold text-blue-600 mb-1">12</p>
                    <p className="text-xs text-gray-600">Bài đã làm</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-3xl font-bold text-green-600 mb-1">85</p>
                    <p className="text-xs text-gray-600">Điểm TB</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-3xl font-bold text-purple-600 mb-1">8h</p>
                    <p className="text-xs text-gray-600">Thời gian học</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="text-center py-16 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
}}></div>
</div>
<div className="relative z-10 max-w-4xl mx-auto px-6">
        <Award className="w-20 h-20 text-white mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Sẵn Sàng Đạt Chuẩn Đầu Ra?
        </h2>
        <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed">
          Tham gia cùng <span className="font-bold">{totalUsers} sinh viên HUFLIT</span> đang ôn luyện mỗi ngày
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleStartFullExam}
            className="group px-12 py-5 bg-white text-orange-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-3 text-lg"
          >
            <Trophy className="w-6 h-6" />
            Làm Đề Thi Thử Ngay
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>

  </div>
</div>
);
});
HomePage.displayName = 'HomePage';
export default HomePage;    
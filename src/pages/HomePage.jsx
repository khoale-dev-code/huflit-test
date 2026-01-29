import React, { memo, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, ArrowRight, Zap, TrendingUp,
  Headphones, FileText, Brain, Database, Rocket, MousePointer2, Star
} from 'lucide-react'

import { ROUTES } from '../config/routes'
import { useAppState } from '../hooks/useAppState'
import { useOnlineUsers } from '../hooks/useOnlineUsers'
import MemoizedHeaderSection from '../components/sections/HeaderSection'

/* ===================== SMALL PURE COMPONENTS ===================== */

const StatCard = memo(({ Icon, value, label }) => (
  <div className="flex flex-col items-center md:items-start p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <span className="text-3xl font-black text-slate-900">{value}</span>
    <span className="text-xs font-bold text-slate-400 uppercase mt-1">{label}</span>
  </div>
))

const FeatureCard = memo(({ Icon, title, description, gradient, number, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer bg-white border border-slate-100 p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
  >
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6`}>
      <Icon className="w-6 h-6 text-white" />
    </div>

    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">{description}</p>

    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
      <span>Khám phá bài học</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
    </div>

    <div className="absolute top-4 right-6 text-5xl font-black text-slate-50 italic select-none">
      0{number}
    </div>
  </div>
))

/* ===================== MAIN ===================== */

const HomePage = memo(() => {
  const navigate = useNavigate()
  const { onlineCount } = useOnlineUsers()
  const { isSignedIn, user, handleTestTypeChange } = useAppState()

  /* stable callbacks */
  const goFullTest = useCallback(() => {
    handleTestTypeChange('full')
    navigate(ROUTES.FULL_EXAM)
  }, [navigate, handleTestTypeChange])

  const goListening = useCallback(() => {
    handleTestTypeChange('listening')
    navigate(ROUTES.TEST)
  }, [navigate, handleTestTypeChange])

  const goReading = useCallback(() => {
    handleTestTypeChange('reading')
    navigate(ROUTES.TEST)
  }, [navigate, handleTestTypeChange])

  const features = useMemo(() => [
    {
      number: '1',
      Icon: Headphones,
      title: 'Listening Lab',
      description: 'Hệ thống bài nghe mô phỏng thực tế với tốc độ linh hoạt.',
      gradient: 'from-blue-600 to-blue-400',
      onClick: goListening
    },
    {
      number: '2',
      Icon: FileText,
      title: 'Reading Pro',
      description: 'Kho dữ liệu bài đọc phong phú kèm giải thích từ vựng.',
      gradient: 'from-cyan-500 to-teal-400',
      onClick: goReading
    },
    {
      number: '3',
      Icon: Brain,
      title: 'Grammar Master',
      description: 'Học ngữ pháp qua sơ đồ tư duy và bài tập áp dụng.',
      gradient: 'from-indigo-600 to-blue-500',
      onClick: () => navigate(ROUTES.GRAMMAR)
    },
    {
      number: '4',
      Icon: Database,
      title: 'Vocab Vault',
      description: 'Ghi nhớ từ vựng qua phương pháp Spaced Repetition.',
      gradient: 'from-violet-600 to-purple-500',
      onClick: () => navigate(ROUTES.VOCABULARY)
    }
  ], [goListening, goReading, navigate])

  return (
    <div className="min-h-screen bg-[#FDFEFF] text-slate-900 font-sans">
      <MemoizedHeaderSection isSignedIn={isSignedIn} user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-28">

        {/* HERO */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight">
              Luyện thi <br />
              <span className="text-blue-600">Thông minh hơn</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium">
              Prep.vn (HUFLIT Edition) đồng hành cùng bạn chinh phục chuẩn đầu ra.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={goFullTest}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition"
              >
                <Rocket className="w-5 h-5 inline mr-2" />
                Thi thử Full Test
              </button>

              <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition">
                <MousePointer2 className="w-5 h-5 inline mr-2" />
                Dùng thử Free
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              alt="Students learning"
              loading="lazy"
              decoding="async"
              className="rounded-[3rem] shadow-xl"
            />
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard Icon={Users} value="5,000+" label="Học viên tin dùng" />
          <StatCard Icon={Zap} value={onlineCount || '320'} label="Đang luyện tập" />
          <StatCard Icon={Star} value="4.9/5" label="Đánh giá chất lượng" />
          <StatCard Icon={TrendingUp} value="95%" label="Tỉ lệ đạt chuẩn" />
        </section>

        {/* FEATURES */}
        <section className="space-y-12">
          <h2 className="text-3xl sm:text-4xl font-black text-center lg:text-left">
            Luyện tập <span className="text-blue-600">đa kỹ năng</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <FeatureCard key={f.number} {...f} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 rounded-[3rem] px-8 py-16 text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-white">
            Bắt đầu lộ trình đạt điểm cao ngay!
          </h2>
          <button
            onClick={goFullTest}
            className="mt-8 bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-xl shadow-lg hover:scale-105 transition"
          >
            VÀO THI NGAY <ArrowRight className="inline ml-2" />
          </button>
        </section>

      </main>
    </div>
  )
})

HomePage.displayName = 'HomePage'
export default HomePage

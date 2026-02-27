import React, { memo, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, ArrowRight, Zap, TrendingUp,
  Headphones, FileText, Brain, Database, Rocket, Star, Flame
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ROUTES } from '../config/routes'
import { useAppState } from '../hooks/useAppState'
import { useOnlineUsers } from '../hooks/useOnlineUsers'
import MemoizedHeaderSection from '../components/sections/HeaderSection'

// ==========================================
// Static Data
// ==========================================
const STATS = [
  { Icon: Users, value: '5K+', label: 'Học viên' },
  { Icon: Zap, value: null, label: 'Online' },
  { Icon: Star, value: '4.9', label: 'Rating' },
  { Icon: TrendingUp, value: '95%', label: 'Pass' },
]

const FEATURES = [
  {
    id: 'listening',
    Icon: Headphones,
    title: 'Listening',
    desc: 'Bài nghe mô phỏng',
    gradient: 'from-blue-600 to-blue-500',
  },
  {
    id: 'reading',
    Icon: FileText,
    title: 'Reading',
    desc: 'Kho bài đọc phong phú',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    id: 'grammar',
    Icon: Brain,
    title: 'Grammar',
    desc: 'Ngữ pháp qua tập',
    gradient: 'from-indigo-600 to-blue-600',
  },
  {
    id: 'vocabulary',
    Icon: Database,
    title: 'Vocab',
    desc: 'Ghi nhớ từ vựng',
    gradient: 'from-violet-600 to-purple-600',
  },
]

// ==========================================
// Stat Card
// ==========================================
const StatCard = memo(({ Icon, value, label, onlineCount, isOnline }) => {
  const displayValue = isOnline ? (onlineCount || '320') : value

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-2.5 xs:p-3 sm:p-4">
      <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
        <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-blue-600" aria-hidden="true" />
      </div>
      <p className="text-lg xs:text-xl sm:text-2xl font-black text-slate-900">{displayValue}</p>
      <p className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-slate-600 uppercase mt-0.5">{label}</p>
    </div>
  )
})

StatCard.displayName = 'StatCard'

// ==========================================
// Feature Card
// ==========================================
const FeatureCard = memo(({ Icon, title, desc, gradient, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left bg-white border border-slate-200 p-3 xs:p-3.5 sm:p-4 rounded-lg hover:shadow-sm transition-shadow"
    >
      <div className={`w-8 h-8 xs:w-9 xs:h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-2 flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" aria-hidden="true" />
      </div>

      <h3 className="text-sm xs:text-base font-bold text-slate-900 mb-0.5">{title}</h3>
      <p className="text-xs text-slate-600 leading-tight">{desc}</p>

      <div className="flex items-center gap-1 text-blue-600 font-semibold text-xs mt-2">
        Khám phá
        <ArrowRight className="w-3 h-3" aria-hidden="true" />
      </div>
    </motion.button>
  )
})

FeatureCard.displayName = 'FeatureCard'

// ==========================================
// Main HomePage
// ==========================================
const HomePage = memo(() => {
  const navigate = useNavigate()
  const { onlineCount } = useOnlineUsers()
  const { isSignedIn, user, handleTestTypeChange } = useAppState()

  // Handlers
  const handleFullTest = useCallback(() => {
    navigate(ROUTES.FULL_EXAM)
  }, [navigate])

  const handleFeatureClick = useCallback((featureId) => {
    if (featureId === 'listening') {
      handleTestTypeChange('listening')
      navigate(ROUTES.TEST)
    } else if (featureId === 'reading') {
      handleTestTypeChange('reading')
      navigate(ROUTES.TEST)
    } else if (featureId === 'grammar') {
      handleTestTypeChange('grammar')
      navigate(ROUTES.GRAMMAR)
    } else if (featureId === 'vocabulary') {
      handleTestTypeChange('vocabulary')
      navigate(ROUTES.VOCABULARY)
    }
  }, [navigate, handleTestTypeChange])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MemoizedHeaderSection isSignedIn={isSignedIn} user={user} />

      <main className="w-full">
        {/* ========== HERO ========== */}
        <section className="px-4 xs:px-4 sm:px-6 py-4 xs:py-5 sm:py-8">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-1.5 bg-blue-50 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-lg border border-blue-200 mb-3 xs:mb-4 text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="font-semibold text-slate-700">Năm 2026</span>
            </motion.div>

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 xs:space-y-4 sm:space-y-5"
            >
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black leading-tight">
                Luyện thi <br className="hidden xs:block" />
                <span className="text-blue-600">HUFLIT</span>
              </h1>

              <p className="text-xs xs:text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-md">
                HUFLIT Exam Center giúp chinh phục TOEIC hiệu quả với phương pháp luyện tập thông minh
              </p>

              {/* Buttons */}
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-2.5 pt-1">
                <motion.button
                  onClick={handleFullTest}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-bold text-xs xs:text-sm shadow-md hover:shadow-lg transition-shadow hover:bg-blue-700"
                >
                  <Rocket className="w-3.5 h-3.5 xs:w-4 xs:h-4 inline mr-1.5" aria-hidden="true" />
                  Thi Thử
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-slate-100 text-slate-900 rounded-lg font-bold text-xs xs:text-sm hover:bg-slate-200 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 xs:w-4 xs:h-4 inline mr-1.5" aria-hidden="true" />
                  Free
                </motion.button>
              </div>

              {/* Online Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-1.5 bg-orange-50 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-lg border border-orange-200 text-xs"
              >
                <Flame className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-orange-500 flex-shrink-0" aria-hidden="true" />
                <span className="font-semibold text-slate-700">{onlineCount || 320}+ đang luyện</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ========== STATS ========== */}
        <section className="px-4 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <StatCard
                    Icon={stat.Icon}
                    value={stat.value}
                    label={stat.label}
                    onlineCount={onlineCount}
                    isOnline={stat.Icon === Zap}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FEATURES ========== */}
        <section className="px-4 xs:px-4 sm:px-6 py-4 xs:py-5 sm:py-8">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl xs:text-2xl sm:text-4xl font-black mb-3 xs:mb-4 sm:mb-5"
            >
              Luyện tập <span className="text-blue-600">4 kỹ năng</span>
            </motion.h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <FeatureCard
                    Icon={f.Icon}
                    title={f.title}
                    desc={f.desc}
                    gradient={f.gradient}
                    onClick={() => handleFeatureClick(f.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA ========== */}
        <section className="px-4 xs:px-4 sm:px-6 py-4 xs:py-5 sm:py-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl xs:rounded-2xl px-4 xs:px-6 sm:px-8 py-6 xs:py-8 sm:py-10 text-center"
            >
              <h2 className="text-xl xs:text-2xl sm:text-4xl font-black text-white mb-2 xs:mb-3">
                Bắt đầu ngay!
              </h2>
              
              <p className="text-blue-100 text-xs xs:text-sm mb-4 xs:mb-5 font-medium">
                Luyện tập thông minh, đạt kết quả nhanh chóng
              </p>

              <motion.button
                onClick={handleFullTest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-1.5 bg-white text-blue-600 px-5 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg font-bold text-xs xs:text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                <Rocket className="w-3.5 h-3.5 xs:w-4 xs:h-4" aria-hidden="true" />
                <span>VÀO THI</span>
                <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4" aria-hidden="true" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer spacer - no extra space */}
      <div className="h-2" />
    </div>
  )
})

HomePage.displayName = 'HomePage'
export default HomePage
import React, { memo, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, ArrowRight, Zap, TrendingUp,
  Headphones, FileText, Brain, Database, Rocket, Star, Flame
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ROUTES } from '../config/routes'
import { useAppState } from '../hooks/useAppState'
import MemoizedHeaderSection from '../components/sections/HeaderSection'

// ==========================================
// Static Data - Memoized outside component
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
// Stat Card - Memoized
// ==========================================
const StatCard = memo(({ Icon, value, label, onlineCount, isOnline }) => {
  const displayValue = useMemo(() => 
    isOnline ? (onlineCount || '320') : value,
    [isOnline, onlineCount, value]
  )

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
// Feature Card - Memoized
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
// Main HomePage - FULLY FIXED
// ==========================================
const HomePage = memo(() => {
  const navigate = useNavigate()
  const { isSignedIn, user, handleTestTypeChange } = useAppState()

  // ✅ Memoized handlers
  const handleFullTest = useCallback(() => {
    navigate(ROUTES.FULL_EXAM)
  }, [navigate])

  const handleFeatureClick = useCallback((featureId) => {
    switch (featureId) {
      case 'listening':
        handleTestTypeChange('listening')
        navigate(ROUTES.TEST)
        break
      case 'reading':
        handleTestTypeChange('reading')
        navigate(ROUTES.TEST)
        break
      case 'grammar':
        handleTestTypeChange('grammar')
        navigate(ROUTES.GRAMMAR)
        break
      case 'vocabulary':
        handleTestTypeChange('vocabulary')
        navigate(ROUTES.VOCABULARY)
        break
      default:
        break
    }
  }, [navigate, handleTestTypeChange])

  // ✅ Memoized header props
  const headerProps = useMemo(() => ({
    isSignedIn,
    user,
  }), [isSignedIn, user])

  return (
    <div className="w-full bg-white">
      <MemoizedHeaderSection {...headerProps} />

      <main className="w-full">
        {/* ========== HERO ========== */}
        <section className="px-4 xs:px-4 sm:px-6 py-4 xs:py-5 sm:py-8">
          <div className="max-w-6xl mx-auto">
            {/* ✅ Badge - Centered */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-1.5 bg-blue-50 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-lg border border-blue-200 mb-3 xs:mb-4 text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="font-semibold text-slate-700">Năm 2026</span>
            </motion.div>

            {/* ✅ Hero Content - All centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 xs:space-y-4 sm:space-y-5 text-center"
            >
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black leading-tight text-slate-900">
                Luyện thi <br className="hidden xs:block" />
                <span className="text-blue-600">HUFLIT</span>
                <br />
                <span className="text-slate-900">Không còn nỗi lo.</span>
              </h1>

              <p className="text-xs xs:text-sm sm:text-base text-slate-600 font-medium leading-relaxed mx-auto max-w-2xl">
                Trải nghiệm phòng thi ảo sát thực tế. Ngân hàng đề thi phong phú và phân tích điểm yếu bằng công nghệ AI.
              </p>

              {/* ✅ Buttons - Centered */}
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-2.5 pt-1 justify-center">
                <motion.button
                  onClick={handleFullTest}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-bold text-xs xs:text-sm shadow-md hover:shadow-lg transition-shadow hover:bg-blue-700"
                >
                  <Rocket className="w-3.5 h-3.5 xs:w-4 xs:h-4 inline mr-1.5" aria-hidden="true" />
                  Bắt đầu thi thử ngay
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-slate-100 text-slate-900 rounded-lg font-bold text-xs xs:text-sm hover:bg-slate-200 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 xs:w-4 xs:h-4 inline mr-1.5" aria-hidden="true" />
                  Chế độ miễn phí
                </motion.button>
              </div>

              {/* ✅ Online Badge - Centered */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center"
              >
                <div className="inline-flex items-center gap-1.5 bg-orange-50 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-lg border border-orange-200 text-xs">
                  <Flame className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-orange-500 flex-shrink-0" aria-hidden="true" />
                  <span className="font-semibold text-slate-700">320+ đang luyện</span>
                </div>
              </motion.div>
            </motion.div>

            {/* ✅ Stats Info Cards - Below Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-3 xs:gap-4 mt-6 xs:mt-8 sm:mt-10"
            >
              <div className="bg-slate-50 rounded-lg p-3 xs:p-4 border border-slate-200 text-center">
                <p className="text-lg xs:text-2xl sm:text-3xl font-black text-slate-900">500+</p>
                <p className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-slate-600 uppercase mt-1">Đề thi</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 xs:p-4 border border-slate-200 text-center">
                <p className="text-lg xs:text-2xl sm:text-3xl font-black text-slate-900">24/7</p>
                <p className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-slate-600 uppercase mt-1">Hỗ trợ</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 xs:p-4 border border-slate-200 text-center">
                <p className="text-lg xs:text-2xl sm:text-3xl font-black text-slate-900">Top 1</p>
                <p className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-slate-600 uppercase mt-1">Uy tín</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== FEATURES ========== */}
        <section className="px-4 xs:px-4 sm:px-6 py-4 xs:py-5 sm:py-8">
          <div className="max-w-6xl mx-auto">
            {/* ✅ Title - Centered */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-4 xs:mb-5 sm:mb-6"
            >
              <h2 className="text-xl xs:text-2xl sm:text-4xl font-black mb-1">
                Luyện tập <span className="text-blue-600">4 kỹ năng</span>
              </h2>
              <p className="text-xs xs:text-sm text-slate-600">Toàn diện từ Listening, Reading, Grammar đến Vocabulary</p>
            </motion.div>

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

        {/* ========== STATS ========== */}
        <section className="px-4 xs:px-4 sm:px-6 py-4 xs:py-5 sm:py-8 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            {/* ✅ Title - Centered */}
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-lg xs:text-xl sm:text-2xl font-black mb-4 xs:mb-5 sm:mb-6"
            >
              Được tin tưởng bởi hàng ngàn học viên
            </motion.h2>

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
                    onlineCount={null}
                    isOnline={stat.Icon === Zap}
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
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl xs:rounded-2xl px-4 xs:px-6 sm:px-8 py-8 xs:py-10 sm:py-12 text-center"
            >
              <h2 className="text-xl xs:text-2xl sm:text-4xl font-black text-white mb-2 xs:mb-3">
                Sẵn sàng bắt đầu?
              </h2>
              
              <p className="text-blue-100 text-xs xs:text-sm mb-4 xs:mb-5 sm:mb-6 font-medium max-w-2xl mx-auto">
                Luyện tập thông minh, đạt kết quả nhanh chóng. Bắt đầu hành trình chinh phục HUFLIT của bạn ngay hôm nay.
              </p>

              <motion.button
                onClick={handleFullTest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-1.5 bg-white text-blue-600 px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 rounded-lg font-bold text-xs xs:text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                <Rocket className="w-3.5 h-3.5 xs:w-4 xs:h-4" aria-hidden="true" />
                <span>VÀO THI NGAY</span>
                <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4" aria-hidden="true" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ✅ No extra spacing */}
      <div className="h-2" />
    </div>
  )
})

HomePage.displayName = 'HomePage'
export default HomePage
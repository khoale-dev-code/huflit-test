import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Zap, TrendingUp,
  Headphones, FileText, Brain, Database, Rocket, Star,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ROUTES } from '../config/routes'
import { useAppState } from '../hooks/useAppState'
import MemoizedHeaderSection from '../components/sections/HeaderSection'

// ─── Static data ───────────────────────────────────────────────────────────────
const STATS = [
  { Icon: Users,      value: '5K+', label: 'Học viên' },
  { Icon: Zap,        value: '320', label: 'Online'   },
  { Icon: Star,       value: '4.9', label: 'Rating'   },
  { Icon: TrendingUp, value: '95%', label: 'Pass'     },
]

const FEATURES = [
  { id: 'listening',  Icon: Headphones, title: 'Listening', desc: 'Bài nghe mô phỏng thực tế',  gradient: 'from-blue-600 to-blue-500'     },
  { id: 'reading',    Icon: FileText,   title: 'Reading',   desc: 'Kho bài đọc phong phú',       gradient: 'from-cyan-500 to-teal-500'     },
  { id: 'grammar',    Icon: Brain,      title: 'Grammar',   desc: 'Ngữ pháp qua thực hành',      gradient: 'from-indigo-600 to-blue-600'   },
  { id: 'vocabulary', Icon: Database,   title: 'Vocab',     desc: 'Ghi nhớ từ vựng thông minh',  gradient: 'from-violet-600 to-purple-600' },
]

// ─── FeatureCard ───────────────────────────────────────────────────────────────
const FeatureCard = memo(({ Icon, title, desc, gradient, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="w-full text-left bg-white border border-slate-200 p-3 xs:p-3.5 sm:p-4 rounded-xl hover:shadow-md transition-all duration-200"
  >
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3`}>
      <Icon className="w-4 h-4 text-white" aria-hidden="true" />
    </div>
    <h3 className="text-sm xs:text-base font-bold text-slate-900 mb-0.5">{title}</h3>
    <p className="text-xs text-slate-500 leading-tight mb-3">{desc}</p>
    <div className="flex items-center gap-1 text-blue-600 font-semibold text-xs">
      Khám phá <ArrowRight className="w-3 h-3" aria-hidden="true" />
    </div>
  </motion.button>
))
FeatureCard.displayName = 'FeatureCard'

// ─── StatCard ──────────────────────────────────────────────────────────────────
const StatCard = memo(({ Icon, value, label }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-3 xs:p-4 text-center">
    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mx-auto mb-2">
      <Icon className="w-4 h-4 text-blue-600" aria-hidden="true" />
    </div>
    <p className="text-xl xs:text-2xl font-black text-slate-900">{value}</p>
    <p className="text-[9px] xs:text-[10px] font-bold text-slate-500 uppercase tracking-wide mt-0.5">{label}</p>
  </div>
))
StatCard.displayName = 'StatCard'

// ─── HomePage ──────────────────────────────────────────────────────────────────
// Phân chia trách nhiệm rõ ràng:
//   HeaderSection  → Hero: headline + CTA button + stats strip (500+/24/7/Top1)
//   HomePage body  → Features cards + Stats cards + CTA banner
//
// Trước đây HomePage tự render lại toàn bộ hero (headline, CTA, stats) bên trong
// <main> → gây duplicate với HeaderSection đứng ngay phía trên.
const HomePage = memo(() => {
  const navigate = useNavigate()
  const { isSignedIn, user, handleTestTypeChange } = useAppState()

  const handleFullTest = useCallback(() => navigate(ROUTES.FULL_EXAM), [navigate])

  const handleFeatureClick = useCallback((id) => {
    const actions = {
      listening:  () => { handleTestTypeChange('listening');  navigate(ROUTES.TEST)       },
      reading:    () => { handleTestTypeChange('reading');    navigate(ROUTES.TEST)       },
      grammar:    () => { handleTestTypeChange('grammar');    navigate(ROUTES.GRAMMAR)    },
      vocabulary: () => { handleTestTypeChange('vocabulary'); navigate(ROUTES.VOCABULARY) },
    }
    actions[id]?.()
  }, [navigate, handleTestTypeChange])

  return (
    <div className="w-full bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────────
          HeaderSection chứa: headline, description, CTA button, stats strip.
          HomePage KHÔNG lặp lại các nội dung này bên dưới.
      ────────────────────────────────────────────────────────────────────── */}
      <MemoizedHeaderSection isSignedIn={isSignedIn} user={user} />

      <main className="w-full">

        {/* ═══ FEATURES ══════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 py-10 sm:py-14">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6 sm:mb-8"
            >
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                Luyện tập <span className="text-blue-600">4 kỹ năng</span>
              </h2>
              <p className="text-xs xs:text-sm text-slate-500">
                Toàn diện từ Listening, Reading, Grammar đến Vocabulary
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
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

        {/* ═══ STATS ═════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 py-10 sm:py-14 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-lg xs:text-xl sm:text-2xl font-black text-slate-900 mb-6 sm:mb-8"
            >
              Được tin tưởng bởi hàng ngàn học viên
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <StatCard Icon={s.Icon} value={s.value} label={s.label} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA BANNER ════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 py-10 sm:py-14">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl px-6 sm:px-10 py-10 sm:py-14 text-center"
            >
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-white mb-3">
                Sẵn sàng bắt đầu?
              </h2>
              <p className="text-blue-100 text-xs xs:text-sm mb-6 font-medium max-w-xl mx-auto leading-relaxed">
                Luyện tập thông minh, đạt kết quả nhanh chóng. Bắt đầu hành trình chinh phục HUFLIT ngay hôm nay.
              </p>
              <motion.button
                onClick={handleFullTest}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                <Rocket className="w-4 h-4" aria-hidden="true" />
                VÀO THI NGAY
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  )
})

HomePage.displayName = 'HomePage'
export default HomePage
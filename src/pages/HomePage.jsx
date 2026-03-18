// D:\freetime\huflit-test\src\pages\HomePage.jsx
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Zap, TrendingUp, Target,
  Headphones, FileText, Brain, Database, Rocket, Star,
  Users, Sparkles, Briefcase, Globe, Award, Flame
} from 'lucide-react'
import { motion as Motion } from 'framer-motion' // Đổi thành Motion (viết Hoa) để pass regex
import { ROUTES } from '../config/routes'
import { useAppState } from '../hooks/useAppState'
import MemoizedHeaderSection from '../components/sections/HeaderSection'

// ─── Gamified Theme Data ───────────────────────────────────────────────────────
const STATS = [
  { icon: Users,      value: '5K+', label: 'Học viên', theme: { bg: 'bg-[#EAF6FE]', text: 'text-[#1CB0F6]', border: 'border-[#BAE3FB]' } },
  { icon: Zap,        value: '320', label: 'Online',   theme: { bg: 'bg-[#fff4e5]', text: 'text-[#FF9600]', border: 'border-[#ffdfb2]' } },
  { icon: Star,       value: '4.9', label: 'Rating',   theme: { bg: 'bg-[#FFC800]/10', text: 'text-[#FFC800]', border: 'border-[#FFC800]/30' } },
  { icon: TrendingUp, value: '95%', label: 'Pass',     theme: { bg: 'bg-[#f1faeb]', text: 'text-[#58CC02]', border: 'border-[#bcf096]' } },
]

const FEATURES = [
  { 
    id: 'listening',  icon: Headphones, title: 'Listening', desc: 'Bài nghe mô phỏng thực tế',  
    theme: { bg: 'bg-[#1CB0F6]', iconBg: 'bg-[#1899D6]', hoverBorder: 'hover:border-[#1CB0F6]' } 
  },
  { 
    id: 'reading',    icon: FileText,   title: 'Reading',   desc: 'Kho bài đọc phong phú',       
    theme: { bg: 'bg-[#58CC02]', iconBg: 'bg-[#46A302]', hoverBorder: 'hover:border-[#58CC02]' } 
  },
  { 
    id: 'grammar',    icon: Brain,      title: 'Grammar',   desc: 'Ngữ pháp qua thực hành',      
    theme: { bg: 'bg-[#CE82FF]', iconBg: 'bg-[#B975E5]', hoverBorder: 'hover:border-[#CE82FF]' } 
  },
  { 
    id: 'vocabulary', icon: Database,   title: 'Vocab',     desc: 'Ghi nhớ từ vựng thông minh',  
    theme: { bg: 'bg-[#FF9600]', iconBg: 'bg-[#E58700]', hoverBorder: 'hover:border-[#FF9600]' } 
  },
]

const EXAM_TYPES = [
  {
    id: 'toeic',
    title: 'TOEIC',
    subtitle: 'Chinh phục đỉnh cao',
    desc: 'Bộ đề thi chuẩn format mới nhất. Rèn luyện phản xạ thực chiến cho kỹ năng Nghe & Đọc.',
    badge: 'Phổ biến',
    badgeTheme: 'bg-[#fff0f0] text-[#FF4B4B] border-[#ffc1c1]',
    icon: Briefcase,
    theme: { bg: 'bg-[#EAF6FE]', text: 'text-[#1CB0F6]', border: 'border-[#BAE3FB]', iconBg: 'bg-[#1CB0F6]' }
  },
  {
    id: 'ielts',
    title: 'IELTS',
    subtitle: 'Vươn tầm quốc tế',
    desc: 'Kho đề Academic & General Training phong phú. Bám sát xu hướng ra đề thực tế.',
    badge: 'Học thuật',
    badgeTheme: 'bg-[#F8EEFF] text-[#CE82FF] border-[#eec9ff]',
    icon: Globe,
    theme: { bg: 'bg-[#f1faeb]', text: 'text-[#58CC02]', border: 'border-[#bcf096]', iconBg: 'bg-[#58CC02]' }
  },
  {
    id: 'thpt',
    title: 'THPT Quốc Gia',
    subtitle: 'Vượt ải đại học',
    desc: 'Trọn bộ đề thi minh họa và chính thức được cập nhật chuẩn cấu trúc mới nhất năm 2026.',
    badge: 'MỚI 2026',
    badgeTheme: 'bg-[#FFFBEA] text-[#FF9600] border-[#FFD8A8]',
    badgeIcon: Flame,
    icon: Award,
    theme: { bg: 'bg-[#FFF0F0]', text: 'text-[#FF4B4B]', border: 'border-[#ffc1c1]', iconBg: 'bg-[#FF4B4B]' }
  }
]

// ─── Gamified FeatureCard ──────────────────────────────────────────────────────
const FeatureCard = memo((props) => {
  const { icon: IconComponent, title, desc, theme, onClick } = props
  return (
    <Motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      className={`w-full text-left bg-white border-2 border-slate-200 border-b-[6px] p-5 sm:p-6 rounded-[28px] transition-colors duration-200 active:border-b-2 active:translate-y-[4px] outline-none ${theme.hoverBorder} group shadow-sm`}
    >
      <div className={`w-14 h-14 rounded-[18px] ${theme.bg} flex items-center justify-center mb-5 shadow-sm border-b-[4px] ${theme.iconBg} transition-transform group-hover:scale-110`}>
        <IconComponent className="w-7 h-7 text-white" strokeWidth={2.5} aria-hidden="true" />
      </div>
      <h3 className="text-[18px] sm:text-[20px] font-quick font-black text-slate-800 mb-1.5">{title}</h3>
      <p className="text-[14px] font-nunito font-bold text-slate-500 leading-snug mb-5">{desc}</p>
      <div className="flex items-center gap-1.5 text-slate-400 font-extrabold text-[13px] uppercase tracking-wider group-hover:text-slate-600 transition-colors">
        Khám phá <ArrowRight className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
      </div>
    </Motion.button>
  )
})
FeatureCard.displayName = 'FeatureCard'

// ─── Gamified ExamTypeCard ─────────────────────────────────────────────────────
const ExamTypeCard = memo((props) => {
  const { data, onClick } = props
  const { icon: IconComponent, title, subtitle, desc, badge, badgeTheme, badgeIcon: BadgeIcon, theme } = data
  return (
    <Motion.button
      onClick={onClick}
      whileHover={{ y: -6 }}
      className={`relative w-full text-left bg-white border-2 border-slate-200 border-b-[8px] p-6 md:p-8 rounded-[32px] transition-all duration-200 active:border-b-[3px] active:translate-y-[5px] outline-none hover:border-blue-200 group shadow-sm flex flex-col h-full`}
    >
      <div className={`absolute -top-4 right-6 px-3 py-1.5 rounded-[12px] border-2 border-b-[4px] font-quick font-black text-[12px] uppercase tracking-wider shadow-sm flex items-center gap-1.5 z-10 ${badgeTheme}`}>
        {BadgeIcon && <BadgeIcon size={14} strokeWidth={3} />}
        {badge}
      </div>

      <div className={`w-16 h-16 rounded-[20px] ${theme.bg} flex items-center justify-center mb-5 border-2 ${theme.border} border-b-[4px] shadow-sm group-hover:scale-110 transition-transform`}>
        <IconComponent className={`w-8 h-8 ${theme.text}`} strokeWidth={2.5} />
      </div>
      
      <div className="flex-1">
        <h3 className={`text-[24px] sm:text-[28px] font-quick font-black mb-1 ${theme.text}`}>{title}</h3>
        <p className="text-[14px] font-display font-black text-slate-400 uppercase tracking-widest mb-3">{subtitle}</p>
        <p className="text-[15px] font-nunito font-bold text-slate-600 leading-relaxed mb-6">{desc}</p>
      </div>

      <div className={`w-full py-3.5 rounded-[16px] border-2 border-slate-100 font-quick font-black text-[15px] uppercase tracking-wider text-center text-slate-500 group-hover:bg-slate-50 group-hover:text-blue-500 transition-colors`}>
        Vào luyện đề
      </div>
    </Motion.button>
  )
})
ExamTypeCard.displayName = 'ExamTypeCard'

// ─── Gamified StatCard ─────────────────────────────────────────────────────────
const StatCard = memo((props) => {
  const { icon: IconComponent, value, label, theme } = props
  return (
    <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-4 sm:p-5 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform shadow-sm">
      <div className={`w-12 h-12 rounded-[16px] ${theme.bg} ${theme.border} border-2 flex items-center justify-center mb-3`}>
        <IconComponent className={`w-6 h-6 ${theme.text}`} strokeWidth={2.5} aria-hidden="true" />
      </div>
      <p className="text-[24px] sm:text-[28px] font-black text-slate-800 font-quick leading-none mb-1.5">{value}</p>
      <p className="text-[11px] sm:text-[12px] font-extrabold text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  )
})
StatCard.displayName = 'StatCard'

// ─── HomePage ──────────────────────────────────────────────────────────────────
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
    <div className="w-full bg-[#F4F7FA] min-h-screen font-sans selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <MemoizedHeaderSection isSignedIn={isSignedIn} user={user} />
      <main className="w-full pb-20">
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-[26px] sm:text-[36px] font-black text-slate-800 mb-3 font-quick">
                Mở khóa <span className="text-[#1CB0F6] inline-block relative">
                  4 Kỹ năng
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFC800] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
                </span>
              </h2>
              <p className="text-[15px] sm:text-[17px] font-bold text-slate-500">
                Xây dựng nền tảng tiếng Anh vững chắc một cách dễ dàng và thú vị.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {FEATURES.map((f, i) => (
                <Motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                >
                  <FeatureCard
                    icon={f.icon}
                    title={f.title}
                    desc={f.desc}
                    theme={f.theme}
                    onClick={() => handleFeatureClick(f.id)}
                  />
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-12 sm:py-16 bg-slate-50 border-y-2 border-slate-200">
          <div className="max-w-6xl mx-auto">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14"
            >
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#FFFBEA] border-2 border-[#FFD8A8] border-b-[4px] rounded-[16px] mb-5 shadow-sm">
                <Target className="w-5 h-5 text-[#FF9600]" strokeWidth={3} />
                <span className="font-quick font-black text-[14px] text-[#FF9600] uppercase tracking-widest">Đấu trường trí tuệ</span>
              </div>
              <h2 className="text-[28px] sm:text-[40px] font-black text-slate-800 mb-4 font-quick">
                Chọn Đấu Trường Của Bạn
              </h2>
              <p className="text-[15px] sm:text-[17px] font-bold text-slate-500 max-w-2xl mx-auto">
                Từ các chứng chỉ quốc tế đến kỳ thi quan trọng nhất cấp 3. Hãy chọn mục tiêu và bắt đầu chinh phục!
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {EXAM_TYPES.map((exam, i) => (
                <Motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 150 }}
                  className="h-full"
                >
                  <ExamTypeCard data={exam} onClick={handleFullTest} />
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-8 sm:mb-12"
            >
              <Sparkles className="text-[#FFC800]" size={28} strokeWidth={2.5} />
              <h2 className="text-center text-[24px] sm:text-[32px] font-black text-slate-800 font-quick">
                Cộng đồng học tập sôi nổi
              </h2>
              <Sparkles className="text-[#FFC800]" size={28} strokeWidth={2.5} />
            </Motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((s, i) => (
                <Motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <StatCard icon={s.icon} value={s.value} label={s.label} theme={s.theme} />
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-12 pb-24">
          <div className="max-w-4xl mx-auto">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-[#1CB0F6] border-b-[8px] border-[#1899D6] rounded-[36px] px-6 sm:px-12 py-12 sm:py-16 text-center overflow-hidden shadow-xl"
            >
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white opacity-10 rounded-full blur-[40px]" />
              <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-white opacity-10 rounded-full blur-[30px]" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center mb-6 shadow-lg border-b-[4px] border-slate-200">
                  <Rocket className="w-10 h-10 text-[#FF9600]" strokeWidth={2.5} />
                </div>
                <h2 className="text-[28px] sm:text-[40px] font-black text-white mb-4 font-quick leading-tight">
                  Sẵn sàng cất cánh?
                </h2>
                <p className="text-white/90 text-[15px] sm:text-[18px] font-bold mb-8 max-w-xl mx-auto leading-relaxed">
                  Đừng chỉ học, hãy chơi với ngôn ngữ! Bắt đầu hành trình chinh phục điểm cao cùng HubStudy ngay bây giờ.
                </p>
                <Motion.button
                  onClick={handleFullTest}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-[#58CC02] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[24px] font-quick font-black text-[18px] sm:text-[20px] uppercase tracking-wider shadow-[0_8px_0_#46A302] hover:bg-[#46A302] hover:shadow-[0_4px_0_#46A302] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px] transition-all outline-none border-2 border-[#46A302]"
                >
                  VÀO THI NGAY
                  <ArrowRight className="w-6 h-6" strokeWidth={3} aria-hidden="true" />
                </Motion.button>
              </div>
            </Motion.div>
          </div>
        </section>
      </main>
    </div>
  )
})

HomePage.displayName = 'HomePage'
export default HomePage
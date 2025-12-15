<div align="center">

# 🎓 HUFLIT Test Practice

### *Nền tảng luyện thi chuẩn đầu ra HUFLIT - Hỗ trợ sinh viên hoàn thành chứng chỉ ngoại ngữ*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-ff8c42?style=for-the-badge&labelColor=1a1a1a)](https://huflit-test.vercel.app)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Firebase](https://img.shields.io/badge/Firebase_10-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

**[🚀 Truy cập ứng dụng](https://huflit-test.vercel.app)**

</div>

---

## 📖 Giới thiệu

**HUFLIT Test Practice** là nền tảng luyện thi trực tuyến được phát triển dành riêng cho sinh viên **Trường Đại học Ngoại ngữ - Tin học TP.HCM (HUFLIT)**, giúp các bạn ôn tập và chuẩn bị cho kỳ thi chuẩn đầu ra ngoại ngữ - một yêu cầu bắt buộc để hoàn thành chương trình và tốt nghiệp.

### 🎯 Mục đích

- ✅ Hỗ trợ sinh viên HUFLIT ôn luyện theo **đúng cấu trúc đề thi** của trường
- ✅ Cung cấp môi trường luyện thi **miễn phí, dễ tiếp cận**
- ✅ Giúp sinh viên **hoàn thành chứng chỉ ngoại ngữ** để tốt nghiệp
- ✅ Theo dõi tiến độ học tập và cải thiện điểm số

### 📝 Cấu trúc đề thi

Đề thi chuẩn đầu ra HUFLIT gồm **2 phần chính**, mỗi phần có **4 Parts**:

```
📊 CẤU TRÚC ĐỀ THI CHUẨN ĐẦU RA HUFLIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎧 PHẦN 1: LISTENING (Nghe hiểu)
├─ Part 1: Photographs (Mô tả hình ảnh)
├─ Part 2: Question-Response (Hỏi - Đáp)
├─ Part 3: Conversations (Hội thoại)
└─ Part 4: Short Talks (Bài nói ngắn)

📖 PHẦN 2: READING (Đọc hiểu)
├─ Part 5: Incomplete Sentences (Hoàn thành câu)
├─ Part 6: Text Completion (Hoàn thành đoạn văn)
├─ Part 7: Reading Comprehension (Đọc hiểu)
└─ Part 8: Extended Reading (Đọc hiểu mở rộng)
```

---

## ✨ Tính năng chính

### 🎧 Phần Listening (Nghe)

```javascript
const listeningFeatures = {
  voices: ["Nam/Nữ tự nhiên", "Điều chỉnh được"],
  speed: "0.5x - 2.0x (phù hợp mọi trình độ)",
  replay: "Nghe lại không giới hạn (Practice Mode)",
  parts: 4,
  modes: ["Practice", "Test", "Review"]
};
```

**Tính năng nổi bật:**
- 🗣️ Text-to-Speech với giọng nam/nữ tự nhiên
- ⚡ Tốc độ phát từ 0.5x → 2.0x
- 🔁 Nghe lại nhiều lần (chế độ luyện tập)
- 🎯 Đề thi theo chuẩn HUFLIT

### 📖 Phần Reading (Đọc)

```javascript
const readingFeatures = {
  parts: 4,
  layout: "2 cột (Desktop) / 1 cột (Mobile)",
  autoScore: true,
  explanation: "Chi tiết từng câu",
  highlight: "Hỗ trợ đánh dấu văn bản"
};
```

**Tính năng nổi bật:**
- 📝 4 Parts theo chuẩn đề thi HUFLIT
- 🖥️ Giao diện 2 cột tiện lợi (Desktop)
- ✅ Chấm điểm và giải thích tự động
- 💡 Xem đáp án + lý giải chi tiết

### 👤 Quản lý tiến độ

```javascript
const progressTracking = {
  auth: ["Google OAuth", "Email/Password"],
  autoSave: "Mỗi 2 giây",
  sync: "Firebase Realtime",
  statistics: {
    byPart: true,
    byTest: true,
    history: "Toàn bộ bài làm"
  }
};
```

**Tính năng nổi bật:**
- 🔐 Đăng nhập bảo mật (Google/Email)
- 💾 Lưu tiến độ tự động
- 📊 Thống kê chi tiết theo Part
- 🏆 Lịch sử bài thi đầy đủ

---

## 🚀 Bắt đầu sử dụng

### 📱 Cho sinh viên

```bash
# Bước 1: Truy cập website
https://huflit-test.vercel.app

# Bước 2: Đăng nhập (Google hoặc Email)
Click "Đăng nhập" → Chọn phương thức

# Bước 3: Chọn phần thi
Listening (🎧) hoặc Reading (📖)

# Bước 4: Chọn Part muốn luyện
Part 1, 2, 3, hoặc 4

# Bước 5: Bắt đầu làm bài
Practice Mode (luyện tập) hoặc Test Mode (thi thử)
```

### 💻 Cho developers

**Yêu cầu hệ thống:**
```bash
Node.js >= 16.x
npm >= 8.x
Git >= 2.0
```

**Clone và chạy local:**
```bash
# Clone repository
git clone https://github.com/khoale-dev-code/huflit-test.git
cd huflit-test

# Cài đặt dependencies
npm install

# Tạo file .env.local
cp .env.example .env.local
# Điền thông tin Firebase & Clerk

# Chạy development server
npm run dev
# Mở http://localhost:5173
```

**Build production:**
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

```javascript
const techStack = {
  frontend: {
    framework: "React 18.2.0",
    router: "React Router v6",
    styling: "Tailwind CSS 3",
    icons: "Lucide React",
    build: "Vite 5.x"
  },
  backend: {
    database: "Firebase Firestore",
    auth: "Clerk + Firebase Auth",
    storage: "Firebase Storage",
    hosting: "Vercel"
  },
  features: {
    tts: "Web Speech API",
    state: "Zustand + Context API",
    forms: "React Hook Form"
  }
};
```

---

## 📁 Cấu trúc dự án

```
huflit-test/
├── src/
│   ├── components/         # React components
│   │   ├── layout/         # Layout components
│   │   ├── auth/           # Authentication
│   │   ├── display/        # Question/Content display
│   │   ├── controls/       # Audio/Voice controls
│   │   └── common/         # Shared components
│   │
│   ├── hooks/              # Custom hooks
│   │   ├── useAppState.js  # Global state
│   │   ├── useAudio.js     # Audio playback
│   │   ├── useVoices.js    # Text-to-speech
│   │   └── useAutoSave.js  # Auto-save logic
│   │
│   ├── data/               # Exam data
│   │   ├── examData.js     # Questions by part
│   │   └── vocabularyData.js
│   │
│   ├── config/             # Configuration
│   │   ├── firebase.js     # Firebase config
│   │   └── routes.js       # App routes
│   │
│   ├── utils/              # Utilities
│   │   ├── scoringEngine.js
│   │   └── validators.js
│   │
│   └── pages/              # Pages
│       ├── HomePage.jsx
│       ├── TestPage.jsx
│       └── ResultsPage.jsx
│
├── public/                 # Static files
├── .env.example            # Environment template
└── package.json
```

---

## ⚙️ Cấu hình

### Environment Variables

Tạo file `.env.local`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

# App Configuration
VITE_APP_URL=http://localhost:5173
```

### Firebase Setup

1. Tạo project tại [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** (Google + Email/Password)
3. Tạo **Firestore Database**
4. Copy config vào `.env.local`

### Clerk Setup

1. Tạo application tại [Clerk Dashboard](https://dashboard.clerk.com)
2. Enable Google OAuth
3. Copy Publishable Key vào `.env.local`

---

## 🎮 Hướng dẫn sử dụng

### Chế độ Listening

```javascript
// 1. Chuẩn bị
selectVoice("Female/Male");  // Chọn giọng
setSpeed(1.0);               // Tốc độ 1x

// 2. Làm bài
playAudio();                 // Phát audio
selectAnswer("A");           // Chọn đáp án
nextQuestion();              // Câu tiếp theo

// 3. Kết thúc
submitTest();                // Nộp bài
viewResults();               // Xem kết quả
```

### Chế độ Reading

```javascript
// 1. Đọc đoạn văn (Cột trái)
readPassage();

// 2. Trả lời câu hỏi (Cột phải)
selectAnswer("B");
nextQuestion();

// 3. Hoàn thành
submitTest();
reviewAnswers();             // Xem lại đáp án
```

### Practice vs Test Mode

```
┌─────────────────┬─────────────────┐
│ Practice Mode   │ Test Mode       │
├─────────────────┼─────────────────┤
│ ✓ Nghe lại      │ ✗ Nghe 1 lần    │
│ ✓ Xem đáp án    │ ✗ Không xem     │
│ ✗ Không tính giờ│ ✓ Có đếm giờ    │
│ ✓ Bỏ qua được   │ ✗ Không bỏ qua  │
└─────────────────┴─────────────────┘
```

---

## 📊 Tính năng nâng cao

### Auto-Save System

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    saveProgress({
      answers,
      currentQuestion,
      timeSpent,
      timestamp: new Date().toISOString()
    });
  }, 2000); // Tự động lưu mỗi 2 giây
  
  return () => clearTimeout(timer);
}, [answers, currentQuestion]);
```

### Analytics Tracking

```javascript
// Track exam completion
logEvent(analytics, 'exam_complete', {
  exam_type: 'listening',
  part: 'part1',
  score: 85,
  time_spent: 720
});
```

---

## 🐛 Troubleshooting

### Audio không phát

```bash
✓ Click vào trang trước khi phát (Chrome requirement)
✓ Cho phép audio trong browser settings
✓ Thử browser khác (Chrome/Edge recommended)
✓ Clear cache: Ctrl + Shift + R
```

### Không lưu được tiến độ

```bash
✓ Kiểm tra đã đăng nhập chưa
✓ Check Firebase rules
✓ Xem browser console (F12)
✓ Verify internet connection
```

### Build errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Check Node version
node -v  # >= 16.x

# Verify .env.local exists
ls -la .env.local
```

---

## 🤝 Đóng góp

### Cách đóng góp

```bash
# 1. Fork repository
# 2. Tạo branch mới
git checkout -b feature/amazing-feature

# 3. Commit changes
git commit -m "feat: add amazing feature"

# 4. Push và tạo Pull Request
git push origin feature/amazing-feature
```

### Guidelines

```javascript
const contributionRules = {
  commits: "feat|fix|docs|style|refactor|test|chore",
  code: {
    style: "Prettier + ESLint",
    comments: "JSDoc cho functions",
    tests: "Write tests for new features"
  },
  pr: {
    size: "< 400 lines changed",
    description: "Chi tiết + link issues"
  }
};
```

---

## 📞 Liên hệ & Hỗ trợ

<div align="center">

| Kênh | Thông tin |
|------|-----------|
| 🌐 Website | [huflit-test.vercel.app](https://huflit-test.vercel.app) |
| 📧 Email | khoale.dev.code@gmail.com |
| 🐙 GitHub | [github.com/khoale-dev-code](https://github.com/khoale-dev-code) |
| 💼 LinkedIn | [linkedin.com/in/khoale-dev](https://linkedin.com/in/khoale-dev) |
| 🐛 Issues | [GitHub Issues](https://github.com/khoale-dev-code/huflit-test/issues) |

</div>

---

## 📜 License

```
MIT License

Copyright (c) 2025 a Le

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

[Xem full license](LICENSE)

---

## 🙏 Acknowledgments

### Cảm ơn đặc biệt

- 🎓 **HUFLIT University** - Cảm hứng và môi trường học tập
- 👥 **Sinh viên HUFLIT** - Người dùng đầu tiên và feedback quý báu
- 🌟 **Open Source Community** - Công cụ và thư viện tuyệt vời

### Tech Credits

```
React • Firebase • Clerk • Tailwind CSS • Vite
Vercel • Web Speech API • Lucide Icons
```

---

<div align="center">

## 🎉 Chúc các bạn sinh viên HUFLIT ôn tập tốt!

**Made with ❤️ for HUFLIT students**

*"Education is the most powerful weapon which you can use to change the world."*  
— Nelson Mandela

---

### 🌟 Support the project

[![Star on GitHub](https://img.shields.io/github/stars/khoale-dev-code/huflit-test?style=social)](https://github.com/khoale-dev-code/huflit-test)
[![Fork on GitHub](https://img.shields.io/github/forks/khoale-dev-code/huflit-test?style=social)](https://github.com/khoale-dev-code/huflit-test/fork)

---

**Version:** 1.0.0 | **Last Updated:** December 2025  
**Status:** 🟢 Active Development | **License:** MIT

© 2024 HUFLIT Test Practice. Built for HUFLIT students.

[⬆️ Back to Top](#-huflit-test-practice)

</div>
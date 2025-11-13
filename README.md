<div align="center">

# 🎧 HUFLIT Test Practice

### *Nền tảng luyện thi HUFLIT 
& Firebase*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-orange?style=for-the-badge)](https://huflit-test.vercel.app)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🚀 Truy cập ngay](https://huflit-test.vercel.app) • [📖 Tài liệu](https://github.com/khoale-dev-code/huflit-test#readme) • [🐛 Báo lỗi](https://github.com/khoale-dev-code/huflit-test/issues) • [✨ Đề xuất](https://github.com/khoale-dev-code/huflit-test/issues/new)

 
</div>

---

## 📋 Mục lục

- [✨ Tính năng nổi bật](#-tính-năng-nổi-bật)
- [🎬 Demo & Screenshots](#-demo--screenshots)
- [🚀 Bắt đầu nhanh](#-bắt-đầu-nhanh)
- [🛠️ Công nghệ](#️-công-nghệ)
- [📁 Cấu trúc dự án](#-cấu-trúc-dự-án)
- [🎮 Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [🔒 Bảo mật](#-bảo-mật)
- [🤝 Đóng góp](#-đóng-góp)
- [📞 Liên hệ](#-liên-hệ)

---

## ✨ Tính năng nổi bật

<table>
<tr>
<td width="50%">

### 🎧 Listening Test
- 🗣️ **Đa giọng nói**: Nam/Nữ tự nhiên
- ⚡ **Tốc độ linh hoạt**: 0.5x - 2.0x
- 🔁 **Nghe lại**: Không giới hạn
- 🎯 **4 Parts**: Part 1-4 đầy đủ

</td>
<td width="50%">

### 📖 Reading Test
- 📝 **Đọc hiểu**: Part 5-7
- 🧠 **Ngữ pháp**: Bài tập tương tác
- 📚 **Từ vựng**: Học theo chủ đề
- ✅ **Chấm tự động**: Kết quả tức thì

</td>
</tr>
<tr>
<td width="50%">

### 👤 Xác thực & Profile
- 🔐 **Clerk Auth**: Google, Email
- 💾 **Lưu tiến độ**: Tự động
- 📊 **Thống kê**: Chi tiết từng part
- 🏆 **Lịch sử**: Xem lại mọi lúc

</td>
<td width="50%">

### 🎨 Giao diện & UX
- 📱 **Responsive**: Mọi thiết bị
- 🌈 **Theme đẹp**: Gradient cam/vàng
- ⚡ **Hiệu ứng**: Animation mượt
- 🚀 **Tốc độ**: Tối ưu performance

</td>
</tr>
</table>

---

## 🎬 Demo & Screenshots

### 🌐 **Live Demo**
👉 **[https://huflit-test.vercel.app](https://huflit-test.vercel.app)**

<div align="center">

</div>

---

## 🚀 Bắt đầu nhanh

### 📋 Yêu cầu

```bash
Node.js >= 16.x
npm >= 8.x hoặc yarn >= 1.22.x
```

### ⚡ Cài đặt trong 3 bước

```bash
# 1️⃣ Clone repository
git clone https://github.com/khoale-dev-code/huflit-test.git
cd huflit-test

# 2️⃣ Cài đặt dependencies
npm install

# 3️⃣ Chạy development server
npm run dev
```

### 🔧 Cấu hình Environment Variables

Tạo file `.env` trong thư mục gốc:

```env
# 🔥 Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# 🔐 Clerk Configuration
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

### 📦 Build & Deploy

```bash
# Build cho production
npm run build

# Preview build locally
npm run preview

# Deploy lên Vercel (tự động với Git push)
git push origin main
```

---

## 🛠️ Công nghệ

<div align="center">

### Frontend Stack

![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend & Services

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### Tools & Libraries

![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge)
![Web_Speech_API](https://img.shields.io/badge/Web_Speech_API-4285F4?style=for-the-badge&logo=google&logoColor=white)

</div>

### 📦 Dependencies chính

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "firebase": "^10.x.x",
  "@clerk/clerk-react": "^4.x.x",
  "lucide-react": "^0.x.x",
  "tailwindcss": "^3.x.x"
}
```

---

## 📁 Cấu trúc dự án

```
huflit-test/
│
├── 📂 public/                 # Static assets
│   └── favicon.ico
│
├── 📂 src/
│   ├── 📂 components/         # React components
│   │   ├── 🧩 Navbar.jsx
│   │   ├── 🧩 PartSelector.jsx
│   │   ├── 🧩 QuestionDisplay.jsx
│   │   ├── 🧩 ResultsDisplay.jsx
│   │   ├── 🧩 UserProfile.jsx
│   │   ├── 🧩 AuthModal.jsx
│   │   ├── 🧩 VoiceControls.jsx
│   │   ├── 🧩 AudioControls.jsx
│   │   └── 📂 footer/
│   │
│   ├── 📂 hooks/              # Custom React hooks
│   │   ├── 🪝 useVoices.js
│   │   ├── 🪝 useAudio.js
│   │   ├── 🪝 useUserProgress.js
│   │   ├── 🪝 useClerkAuth.js
│   │   ├── 🪝 useClerkFirebaseSync.js
│   │   └── 🪝 useAutoSaveProgress.js
│   │
│   ├── 📂 data/               # Exam data & content
│   │   └── 📄 examData.js
│   │
│   ├── 📂 config/             # Configuration
│   │   └── ⚙️ firebase.js
│   │
│   ├── 📄 App.jsx             # Main app component
│   ├── 📄 main.jsx            # Entry point
│   └── 📄 index.css           # Global styles
│
├── 📄 .env                    # Environment variables (⚠️ KHÔNG commit)
├── 📄 .gitignore
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 tailwind.config.js
└── 📄 README.md
```

---

## 🎮 Hướng dẫn sử dụng

### 1️⃣ Đăng nhập

```
🔐 Click "Đăng nhập" → Chọn Google/Email → Xác thực
```

### 2️⃣ Chọn bài thi

<table>
<tr>
<td width="50%">

**Listening Test** 🎧
- Part 1: Photographs
- Part 2: Question-Response
- Part 3: Conversations
- Part 4: Short Talks

</td>
<td width="50%">

**Reading Test** 📖
- Part 5: Incomplete Sentences
- Part 6: Text Completion
- Part 7: Reading Comprehension

</td>
</tr>
</table>

### 3️⃣ Làm bài

#### 🎧 Listening Mode

```
1. Chọn giọng nam/nữ cho từng vai
2. Điều chỉnh tốc độ phát (0.5x - 2.0x)
3. Click "▶️ Play Audio" để nghe
4. Chọn đáp án trong khi nghe
5. Nghe lại không giới hạn
```

#### 📖 Reading Mode

```
1. Đọc kỹ đoạn văn/câu hỏi
2. Chọn đáp án phù hợp
3. Review lại câu trả lời
4. Submit khi hoàn thành
```

### 4️⃣ Xem kết quả

```
📊 Điểm số: Tự động tính
✅ Đáp án đúng: Highlight xanh
❌ Đáp án sai: Highlight đỏ
💾 Lưu Firebase: Tự động (nếu đã login)
```

### 5️⃣ Theo dõi tiến độ

```
👤 User Profile → 📈 Xem thống kê → 🏆 Lịch sử bài làm
```

---

## 🔒 Bảo mật

### ⚠️ Files KHÔNG được commit

```gitignore
# 🔐 Sensitive files
.env
.env.local
.env.production
serviceAccountKey.json
scripts/serviceAccountKey.json
**/*serviceAccountKey*.json

# 📦 Dependencies
node_modules/
dist/

# 🔧 IDE
.vscode/
.idea/
```

### 🛡️ Best Practices

| ✅ DO | ❌ DON'T |
|-------|----------|
| Dùng environment variables | Hard-code API keys |
| Gitignore sensitive files | Commit .env file |
| Rotate keys nếu bị lộ | Reuse compromised keys |
| Sử dụng Firebase Security Rules | Public database |

---

## 📊 Chấm điểm

<div align="center">

| Phần thi | Điểm/câu | Số câu | Tổng điểm |
|----------|----------|--------|-----------|
| 🎧 Listening (Part 1-4) | 5 điểm | Varies | ≤ 50 điểm |
| 📖 Reading (Part 5-7) | 2.5 điểm | Varies | ≤ 50 điểm |
| **TỔNG** | - | - | **100 điểm** |

</div>

---

## 🌐 Trình duyệt được hỗ trợ

<div align="center">

| Browser | Listening | Reading | Voice Quality |
|---------|-----------|---------|---------------|
| ![Chrome](https://img.shields.io/badge/Chrome-4285F4?style=flat-square&logo=google-chrome&logoColor=white) | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| ![Edge](https://img.shields.io/badge/Edge-0078D7?style=flat-square&logo=microsoft-edge&logoColor=white) | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| ![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=flat-square&logo=firefox&logoColor=white) | ✅ | ✅ | ⭐⭐⭐ |
| ![Safari](https://img.shields.io/badge/Safari-000000?style=flat-square&logo=safari&logoColor=white) | ⚠️ | ✅ | ⭐⭐ |

</div>

> 💡 **Khuyến nghị**: Sử dụng Chrome hoặc Edge để có trải nghiệm giọng nói tốt nhất

---

## 🤝 Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp! 🎉

### 🔄 Quy trình đóng góp

```bash
# 1️⃣ Fork repository
# 2️⃣ Clone fork của bạn
git clone https://github.com/YOUR_USERNAME/huflit-test.git

# 3️⃣ Tạo branch mới
git checkout -b feature/AmazingFeature

# 4️⃣ Commit changes
git commit -m '✨ Add some AmazingFeature'

# 5️⃣ Push to branch
git push origin feature/AmazingFeature

# 6️⃣ Mở Pull Request
```

### 📝 Commit Convention

```
✨ feat: Thêm tính năng mới
🐛 fix: Sửa lỗi
📚 docs: Cập nhật tài liệu
💄 style: Thay đổi UI/styling
♻️ refactor: Tái cấu trúc code
⚡ perf: Cải thiện performance
✅ test: Thêm/sửa tests
🔧 chore: Cập nhật công cụ/config
```

---

## 📄 License

Dự án này được phát hành dưới giấy phép **MIT License**.

```
MIT License - Copyright (c) 2024 Khoa Le
```

Xem chi tiết tại [LICENSE](LICENSE)

---

## 👨‍💻 Tác giả

<div align="center">

### Khoa Le

[![GitHub](https://img.shields.io/badge/GitHub-khoale--dev--code-181717?style=for-the-badge&logo=github)](https://github.com/khoale-dev-code)
[![Email](https://img.shields.io/badge/Email-Contact_Me-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

*Full-stack Developer | React Enthusiast | EdTech Builder*

</div>

---

## 🙏 Ghi nhận

Dự án này được xây dựng với sự hỗ trợ của:

<div align="center">

| Service | Purpose |
|---------|---------|
| [Clerk](https://clerk.com/) | Authentication & User Management |
| [Firebase](https://firebase.google.com/) | Realtime Database & Hosting |
| [Vercel](https://vercel.com/) | Deployment & CDN |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS Framework |
| [Lucide Icons](https://lucide.dev/) | Beautiful Icon Library |
| [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Text-to-Speech |

</div>

---

## 📞 Liên hệ & Hỗ trợ

<div align="center">

### Cần giúp đỡ? 🤔

[![Report Bug](https://img.shields.io/badge/🐛_Report-Bug-red?style=for-the-badge)](https://github.com/khoale-dev-code/huflit-test/issues)
[![Request Feature](https://img.shields.io/badge/✨_Request-Feature-blue?style=for-the-badge)](https://github.com/khoale-dev-code/huflit-test/issues/new)
[![Ask Question](https://img.shields.io/badge/❓_Ask-Question-yellow?style=for-the-badge)](https://github.com/khoale-dev-code/huflit-test/discussions)

</div>

---

<div align="center">

### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=khoale-dev-code/huflit-test&type=Date)](https://star-history.com/#khoale-dev-code/huflit-test&Date)

---

**Made with ❤️ by [Khoa Le](https://github.com/khoale-dev-code)**

⭐ *Nếu thấy dự án hữu ích, hãy star repo này nhé!* ⭐

[⬆ Back to top](#-huflit-test-practice)

</div>

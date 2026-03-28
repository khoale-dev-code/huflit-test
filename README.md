<div align="center">

# 🎧 HubStudy Learning English

**Nền tảng hiện đại cho chuẩn bị kỳ thi TOEIC với các tính năng AI tiên tiến**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Now-ff8c42?style=for-the-badge&labelColor=1a1a1a)](https://huflit-test.vercel.app)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

</div>

---

## 📚 Giới thiệu

**HubStudy** là một ứng dụng web toàn diện được thiết kế để giúp học sinh chuẩn bị cho kỳ thi HUFLIT English Exit Exam (theo định dạng TOEIC). Nó cung cấp một bộ công cụ học tập hiệu quả với tính năng theo dõi tiến độ theo thời gian thực và phản hồi được tăng cường bằng AI.

---

## ✨ Tính Năng Chính

### 📖 Học Tập Toàn Diện
- **Định dạng TOEIC hoàn chỉnh**: Thực hành tất cả các phần của các bài kiểm tra Listening và Reading
- **Hơn 100 bài tập**: Cơ sở dữ liệu câu hỏi phong phú từ các kỳ thi thật
- **Phân tích chi tiết**: Giải thích từng câu và lý do lựa chọn đúng

### 🤖 Công Nghệ AI
- **Trợ lý AI thông minh**: Nhận phản hồi cá nhân hóa từ Groq API
- **Lời khuyên điểm yếu**: Xác định lĩnh vực cần cải thiện dựa trên kết quả kiểm tra
- **Hỗ trợ Chat theo thời gian thực**: Đặt câu hỏi và nhận trả lời tức thì từ AI

### 👤 Quản Lý Tài Khoản
- **Xác thực Firebase**: Đăng nhập an toàn qua Google hoặc Email/Password
- **Lưu trữ dữ liệu đám mây**: Đồng bộ tiến độ trên tất cả các thiết bị
- **Dashboard cá nhân**: Theo dõi các bài tập đã hoàn thành và điểm số

### 📊 Theo Dõi Tiến Độ
- **Thống kê chi tiết**: Xem biểu đồ tiến độ và phân tích hiệu suất
- **Báo cáo sinh động**: Trực quan hóa điểm số và những điểm yếu
- **Lịch sử kiểm tra**: Xem lại tất cả các bài tập trước đó

### 🎵 Tính Năng Bổ Sung
- **Text-to-Speech**: Phát âm từ tiếng Anh chuẩn bằng FPT.AI TTS
- **Giao diện đa ngôn ngữ**: Hỗ trợ Tiếng Việt và Tiếng Anh
- **Responsive Design**: Hoạt động hoàn hảo trên máy tính, tablet và điện thoại

---

## 🛠️ Công Nghệ

<table>
  <tr>
    <th>Danh Mục</th>
    <th>Công Nghệ</th>
  </tr>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>React 19, Vite, Tailwind CSS, Zustand, Framer Motion, Recharts</td>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>Node.js, Express.js, Socket.IO</td>
  </tr>
  <tr>
    <td><strong>Cơ sở dữ liệu</strong></td>
    <td>Firebase (Authentication, Firestore, Storage), Supabase</td>
  </tr>
  <tr>
    <td><strong>API & Dịch vụ</strong></td>
    <td>Groq API (AI), FPT.AI (Text-to-Speech)</td>
  </tr>
  <tr>
    <td><strong>Testing</strong></td>
    <td>Vitest, React Testing Library</td>
  </tr>
  <tr>
    <td><strong>DevOps</strong></td>
    <td>Vercel (Frontend), GitHub Actions, gh-pages</td>
  </tr>
</table>

---

## 📁 Cấu Trúc Dự Án

Dự án này là một **monorepo** chứa hai phần chính:

```
huflit-test/
├── 📂 Backend/                    # Máy chủ chat Node.js
│   ├── 📄 server.js              # Entry point
│   ├── 📂 routes/                # API endpoints
│   ├── 📄 package.json
│   └── 📄 .env
│
├── 📂 src/                        # Mã nguồn React frontend
│   ├── 📄 App.jsx                # Component chính
│   ├── 📂 components/            # Các component tái sử dụng
│   │   ├── 📂 Auth/
│   │   ├── 📂 Quiz/
│   │   ├── 📂 Dashboard/
│   │   └── 📂 Chat/
│   ├── 📂 contexts/              # React Contexts
│   │   └── 📄 AuthContext.jsx
│   ├── 📂 hooks/                 # Custom React hooks
│   ├── 📂 services/              # API services
│   │   ├── 📄 groqService.js
│   │   ├── 📄 firebaseService.js
│   │   └── 📄 chatService.js
│   ├── 📂 config/                # Cấu hình dự án
│   │   ├── 📄 firebase.js
│   │   └── 📄 supabase.js
│   ├── 📂 styles/                # CSS files
│   └── 📄 main.jsx
│
├── 📂 public/                     # Tài nguyên tĩnh
├── 📄 package.json               # Dependencies frontend
├── 📄 vite.config.js             # Cấu hình Vite
├── 📄 tailwind.config.js         # Cấu hình Tailwind CSS
├── 📄 .env                        # Biến môi trường frontend
└── 📄 README.md                  # Tệp này
```

---

## 🚀 Hướng Dẫn Cài Đặt

### 📋 Yêu Cầu

- **Node.js**: v18.0 hoặc cao hơn
- **npm**: v9.0 hoặc cao hơn (hoặc `yarn`)
- **Git**: Để clone repository

### ⚙️ Bước 1: Clone Repository

```bash
git clone https://github.com/khoale-dev-code/huflit-test.git
cd huflit-test
```

### 🔐 Bước 2: Cấu Hình Biến Môi Trường

#### A. Frontend (Tệp `.env` ở thư mục gốc)

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys
VITE_GROQ_API_KEY=your_groq_api_key
VITE_FPT_TTS_KEY=your_fpt_tts_key

# Development Settings (optional)
VITE_USE_EMULATOR=false
```

#### B. Backend (Tệp `.env` ở `/Backend`)

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# API Keys
GROQ_API_KEY=your_groq_api_key

# Socket.IO Configuration
CORS_ORIGIN=http://localhost:5173
```

> **💡 Lưu ý**: Để lấy các khóa này, bạn cần tạo tài khoản trên:
> - [Firebase Console](https://console.firebase.google.com)
> - [Supabase Dashboard](https://app.supabase.com)
> - [Groq Console](https://console.groq.com)
> - [FPT.AI Portal](https://fpt.ai)

### 📦 Bước 3: Cài Đặt Dependencies

```bash
# Cài đặt dependencies frontend
npm install

# Cài đặt dependencies backend
cd Backend
npm install
cd ..
```

### ▶️ Bước 4: Chạy Ứng Dụng

#### Terminal 1: Khởi động Backend

```bash
# Từ thư mục gốc
npm run start:backend

# HOẶC
cd Backend && npm start
```

Backend sẽ chạy tại `http://localhost:8080` (hoặc port được định nghĩa trong `.env`)

#### Terminal 2: Khởi động Frontend

```bash
# Từ thư mục gốc
npm run dev
```

Frontend sẽ chạy tại `http://localhost:5173`

> **💡 Mẹo**: Mở 2 terminal cùng lúc để chạy cả frontend và backend đồng thời.

---

## 📝 Các Script Hữu Ích

```bash
# Frontend scripts (từ thư mục gốc)
npm run dev              # Khởi động dev server
npm run build            # Build production
npm run preview          # Xem preview build
npm run lint             # Kiểm tra code style
npm run test             # Chạy unit tests

# Backend scripts (từ /Backend)
npm start                # Khởi động server
npm run dev              # Khởi động với nodemon (auto-reload)
npm test                 # Chạy tests
```

---

## 🔗 API Endpoints (Backend)

### Socket.IO Events (Real-time Chat)

```javascript
// Client -> Server
socket.emit('send-message', { userId, message, room });
socket.emit('join-room', { userId, room });

// Server -> Client
socket.on('receive-message', (data) => { /* ... */ });
socket.on('user-joined', (data) => { /* ... */ });
```

### REST API (nếu có)

```bash
GET    /api/health           # Kiểm tra trạng thái server
POST   /api/ai/advice        # Lấy lời khuyên từ AI
GET    /api/user/progress    # Lấy tiến độ người dùng
```

---

## 🧪 Testing

```bash
# Chạy tất cả các tests
npm run test

# Chạy tests với coverage
npm run test:coverage

# Chạy tests trong chế độ watch
npm run test:watch
```

---

## 🌐 Triển Khai (Deployment)

### Frontend trên Vercel

1. Push code lên GitHub
2. Kết nối repository với [Vercel](https://vercel.com)
3. Vercel tự động build và deploy mỗi khi push code
4. Cấu hình biến môi trường trong settings Vercel

### Backend trên Render / Railway

1. Push Backend code lên GitHub
2. Kết nối với [Render](https://render.com) hoặc [Railway](https://railway.app)
3. Cấu hình biến môi trường
4. Deploy tự động

---

## 📖 Hướng Dẫn Sử Dụng

### Cho Học Sinh

1. **Đăng ký/Đăng nhập**: Sử dụng Google hoặc Email
2. **Chọn bài tập**: Chọn phần (Listening/Reading) và cấp độ
3. **Làm bài kiểm tra**: Trả lời các câu hỏi và nhấn submit
4. **Xem kết quả**: Kiểm tra điểm số và lời giải thích chi tiết
5. **Nhận lời khuyên**: Sử dụng AI Advisor để cải thiện

### Cho Quản Trị Viên

1. Truy cập Firebase Console để quản lý dữ liệu
2. Sử dụng Supabase Dashboard để quản lý cơ sở dữ liệu
3. Giám sát logs trong Vercel hoặc Render

---

## 🤝 Đóng Góp

Chúng tôi rất chào đón các đóng góp! Để đóng góp:

1. Fork repository
2. Tạo branch cho feature mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

---

## 🐛 Báo Cáo Lỗi

Nếu bạn phát hiện bug, vui lòng [tạo issue](https://github.com/khoale-dev-code/huflit-test/issues) với:

- Mô tả chi tiết về lỗi
- Các bước để tái tạo lỗi
- Kỳ vọng vs hành vi thực tế
- Ảnh chụp màn hình nếu có

---

## 📄 License

Dự án này được cấp phép theo **MIT License**. Xem file [LICENSE](LICENSE) để biết chi tiết.

---

## 👨‍💻 Tác Giả

**Khoai Lê** - [GitHub](https://github.com/khoale-dev-code)

---

## 🙏 Cảm Ơn

- [Groq](https://groq.com) - AI API
- [Firebase](https://firebase.google.com) - Authentication & Database
- [Supabase](https://supabase.com) - Backend-as-a-Service
- [FPT.AI](https://fpt.ai) - Text-to-Speech
- [React](https://react.dev) - Frontend Framework
- Tất cả những người đã hỗ trợ và đóng góp cho dự án này ❤️

---

<div align="center">

### ⭐ Nếu bạn thích dự án này, hãy cho nó một sao! ⭐

</div>
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // ==========================================
  // 1. Thư mục và file bỏ qua (Ignores)
  // ==========================================
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "build/**",
      "firebase-debug.log",
      ".firebase/**",
      "coverage/**"
    ]
  },

  // ==========================================
  // 2. Cấu hình chính cho dự án React (Frontend)
  // ==========================================
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest", // Hỗ trợ cú pháp JS mới nhất
      sourceType: "module",  // Đồng bộ với "type": "module" trong package.json
      parserOptions: {
        ecmaFeatures: {
          jsx: true,         // Kích hoạt phân tích cú pháp JSX
        },
      },
      globals: {
        ...globals.browser,  // window, document, localStorage...
        ...globals.es2020,   // Promise, Set, Map...
        ...globals.node,     // process, __dirname... (phòng hờ lỡ dùng trong file cấu hình Vite)
      },
    },
    // Khai báo các plugins cần thiết
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    // Giúp ESLint tự động nhận diện đúng phiên bản React đang cài đặt (React 19)
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Kế thừa các bộ quy tắc chuẩn an toàn nhất
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // --- SỬA LỖI JSX (Như lỗi thẻ <Icon />) ---
      "react/jsx-uses-vars": "error", // Xác nhận biến dùng trong JSX là hợp lệ
      "react/jsx-uses-react": "off",  // Đi kèm với rule bên dưới
      "react/react-in-jsx-scope": "off", // KHÔNG cần import React từ bản 17+
      "react/prop-types": "off", // Tắt cảnh báo prop-types (ít dùng trong dự án hiện đại)

      // --- VITE & HMR ---
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // --- CUSTOM RULES CHẶT CHẼ ---
      "no-restricted-globals": ["error", "name", "length"],
      "prefer-arrow-callback": "error",
      "quotes": ["error", "double", { "allowTemplateLiterals": true }],
      
      // Cho phép khai báo biến có dấu _ ở đầu mà không báo lỗi "unused" (Clean Code tip)
      "no-unused-vars": ["warn", { 
        "varsIgnorePattern": "^(React|_)", 
        "argsIgnorePattern": "^_" 
      }],
    },
  },

  // ==========================================
  // 3. Cấu hình riêng cho Scripts & Cloud Functions (Backend)
  // ==========================================
  {
    files: ["scripts/**/*.js", "functions/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node, // Môi trường thuần Node.js
      },
    },
    rules: {
      // Trong scripts thường dùng console.log rất nhiều để debug, nên tắt cảnh báo này
      "no-console": "off", 
    },
  },

  // ==========================================
  // 4. Cấu hình riêng cho môi trường Testing (Vitest)
  // ==========================================
  {
    files: ["**/*.spec.*", "**/*.test.*"],
    languageOptions: {
      globals: {
        ...globals.jest, // Hỗ trợ describe, it, expect...
      },
    },
    rules: {
      "no-undef": "off", // Thường các test runner tự inject global variables
    }
  }
];
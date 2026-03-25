// src/services/socketService.js
import { io } from 'socket.io-client';

// URL của Backend Server (Hiện tại đang chạy ở máy local của bạn)
const SOCKET_URL = 'http://localhost:5000'; 

// Khởi tạo kết nối nhưng KHÔNG tự động connect (autoConnect: false)
// Chỉ khi nào bấm nút "Người lạ ẩn danh" thì mới gọi socket.connect()
export const socket = io(SOCKET_URL, {
  autoConnect: false 
});
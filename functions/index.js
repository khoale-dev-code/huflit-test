/**
 * Import function triggers từ bộ lọc v2 (chuẩn hiện đại nhất)
 */
import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Cấu hình tối ưu để kiểm soát chi phí (Cost Control)
setGlobalOptions({ maxInstances: 10 });

/**
 * Example Function: helloWorld
 * Mình đã mở comment để biến 'onRequest' và 'logger' được sử dụng,
 * từ đó xóa bỏ lỗi 'no-unused-vars'.
 */
export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
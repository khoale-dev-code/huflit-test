const sharp = require('sharp');
const path = require('path');

// Tạo logo192.png
sharp(path.join(__dirname, 'public/logo.png'))
  .resize(192, 192)
  .toFile(path.join(__dirname, 'public/logo192.png'), (err, info) => {
    if (err) console.error('❌ Lỗi logo192:', err);
    else console.log('✅ logo192.png tạo thành công');
  });

// Tạo logo512.png
sharp(path.join(__dirname, 'public/logo.png'))
  .resize(512, 512)
  .toFile(path.join(__dirname, 'public/logo512.png'), (err, info) => {
    if (err) console.error('❌ Lỗi logo512:', err);
    else console.log('✅ logo512.png tạo thành công');
  });
const sharp = require('sharp');
const path = require('path');

sharp(path.join(__dirname, 'public/logo.png'))
  .resize(64, 64)
  .toFile(path.join(__dirname, 'public/favicon.png'), (err, info) => {
    if (err) console.error('❌ Lỗi:', err);
    else console.log('✅ favicon.png tạo thành công');
  });
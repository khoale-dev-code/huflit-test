const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

sharp(path.join(__dirname, 'public/logo.png'))
  .resize(64, 64)
  .png()
  .toBuffer((err, data) => {
    if (err) {
      console.error('❌ Lỗi:', err);
    } else {
      fs.writeFileSync(path.join(__dirname, 'public/favicon.ico'), data);
      console.log('✅ favicon.ico tạo thành công');
    }
  });
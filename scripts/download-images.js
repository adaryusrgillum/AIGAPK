const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (e) => { file.close(); fs.unlinkSync(dest); reject(e); });
  });
}

async function main() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  const imagesDir = path.join(assetsDir, 'images');
  
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
  
  const downloads = [
    // Main logo (500px wide)
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/Abel-Insurance-Group-Logo-500.png?lossy=2&strip=1&webp=0', path.join(assetsDir, 'logo.png')],
    // Large logo (800px)
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/Abel-Insurance-Group-Logo-800.png?lossy=2&strip=1&webp=0', path.join(assetsDir, 'logo-large.png')],
    // Logo icon (square, for app icon base)
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/Abel-Insurance-Group-Logo-Icon-500x500.png?lossy=2&strip=1&webp=0', path.join(assetsDir, 'logo-icon.png')],
    // Logo icon (original full size)
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/Abel-Insurance-Group-Logo-Icon.png?lossy=2&strip=1&webp=0', path.join(assetsDir, 'logo-icon-full.png')],
    // Favicon (192px)
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/cropped-Abel-Insurance-Group-Favicon-192x192.png?lossy=2&strip=1&webp=0', path.join(assetsDir, 'website-favicon.png')],
    // Open Graph image
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/Abel-Insurance-Group-Open-Graph.jpg?lossy=2&strip=1&webp=0', path.join(assetsDir, 'og-image.jpg')],
    // Hero background (WV mountains)
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/Abel-Insurance-Group-Aerial-View-of-a-River-Between-Two-Mountains-on-a-Sunny-Day-in-West-Virginia.jpg?lossy=2&strip=1&webp=0', path.join(imagesDir, 'hero-wv-mountains.jpg')],
    // Office sign
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/About-Our-Agency-Closeup-View-of-the-Abel-Insurance-Group-Sign-Outside-the-Office-in-West-Virginia.jpg?lossy=2&strip=1&webp=0', path.join(imagesDir, 'office-sign.jpg')],
    // Personal insurance image
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/Personal-Insurance-Cheerful-Parents-Having-Fun-Playing-with-Their-Daughter-at-Home.jpg?lossy=2&strip=1&webp=0', path.join(imagesDir, 'personal-insurance.jpg')],
    // Business insurance image
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/06/Business-Insurance-View-of-Cheerful-Small-Business-Owner-Hanging-Up-an-Open-Sign-on-her-Shop.jpg?lossy=2&strip=1&webp=0', path.join(imagesDir, 'business-insurance.jpg')],
    // Carrier logos
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/07/Carrier-Progressive-150x150.png?lossy=2&strip=1&webp=0', path.join(imagesDir, 'carrier-progressive.png')],
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/07/Carrier-Liberty-Mutual-150x150.png?lossy=2&strip=1&webp=0', path.join(imagesDir, 'carrier-liberty-mutual.png')],
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/07/Carrier-Travelers-150x150.png?lossy=2&strip=1&webp=0', path.join(imagesDir, 'carrier-travelers.png')],
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/07/Carrier-American-Modern-150x150.png?lossy=2&strip=1&webp=0', path.join(imagesDir, 'carrier-american-modern.png')],
    ['https://b4149331.smushcdn.com/4149331/wp-content/uploads/2025/07/Carrier-Hagerty-150x150.png?lossy=2&strip=1&webp=0', path.join(imagesDir, 'carrier-hagerty.png')],
  ];
  
  for (const [url, dest] of downloads) {
    const name = path.basename(dest);
    try {
      await download(url, dest);
      const stat = fs.statSync(dest);
      console.log(`OK ${name} (${Math.round(stat.size / 1024)}KB)`);
    } catch (err) {
      console.log(`FAIL ${name}: ${err.message}`);
    }
  }
  
  console.log('\nAll downloads complete!');
}

main().catch(console.error);

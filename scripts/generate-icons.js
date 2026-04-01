const sharp = require('sharp');
const path = require('path');

const PRIMARY = '#1B3A5C';

async function generate() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  const logoIcon = path.join(assetsDir, 'logo-icon-full.png');

  // icon.png - 1024x1024 (logo icon on navy background with rounded corners)
  const logoForIcon = await sharp(logoIcon).resize(680, 680, { fit: 'inside' }).png().toBuffer();
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: PRIMARY } })
    .composite([{ input: logoForIcon, gravity: 'centre' }])
    .png()
    .toFile(path.join(assetsDir, 'icon.png'));
  console.log('Created icon.png');

  // adaptive-icon.png - 1024x1024 (logo icon on navy, smaller for safe zone)
  const logoForAdaptive = await sharp(logoIcon).resize(500, 500, { fit: 'inside' }).png().toBuffer();
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: PRIMARY } })
    .composite([{ input: logoForAdaptive, gravity: 'centre' }])
    .png()
    .toFile(path.join(assetsDir, 'adaptive-icon.png'));
  console.log('Created adaptive-icon.png');

  // splash-icon.png - 1024x1024 (logo on navy background)
  const logoForSplash = await sharp(logoIcon).resize(400, 400, { fit: 'inside' }).png().toBuffer();
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: PRIMARY } })
    .composite([{ input: logoForSplash, gravity: 'centre' }])
    .png()
    .toFile(path.join(assetsDir, 'splash-icon.png'));
  console.log('Created splash-icon.png');

  // favicon.png - 48x48
  await sharp(logoIcon)
    .resize(48, 48, { fit: 'inside' })
    .png()
    .toFile(path.join(assetsDir, 'favicon.png'));
  console.log('Created favicon.png');

  console.log('All icons generated from real logo!');
}

generate().catch(console.error);

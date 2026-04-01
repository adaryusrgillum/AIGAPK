const sharp = require('sharp');
const path = require('path');

const PRIMARY = '#1B3A5C';
const GOLD = '#C8A951';
const WHITE = '#FFFFFF';

function createIconSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const shieldW = size * 0.52;
  const shieldH = size * 0.58;
  const sx = cx - shieldW / 2;
  const sy = cy - shieldH / 2 - size * 0.02;
  // Shield path
  const shield = `M ${cx} ${sy}
    L ${sx + shieldW} ${sy + shieldH * 0.18}
    L ${sx + shieldW} ${sy + shieldH * 0.6}
    Q ${sx + shieldW} ${sy + shieldH * 0.85} ${cx} ${sy + shieldH}
    Q ${sx} ${sy + shieldH * 0.85} ${sx} ${sy + shieldH * 0.6}
    L ${sx} ${sy + shieldH * 0.18}
    Z`;
  // Checkmark inside shield
  const checkScale = size * 0.15;
  const checkX = cx - checkScale * 0.7;
  const checkY = cy + size * 0.02;
  const check = `M ${checkX} ${checkY}
    L ${checkX + checkScale * 0.5} ${checkY + checkScale * 0.5}
    L ${checkX + checkScale * 1.4} ${checkY - checkScale * 0.4}`;

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="${PRIMARY}"/>
  <path d="${shield}" fill="${GOLD}" opacity="0.9"/>
  <path d="${shield}" fill="none" stroke="${WHITE}" stroke-width="${size * 0.012}" opacity="0.3"/>
  <path d="${check}" fill="none" stroke="${WHITE}" stroke-width="${size * 0.04}" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${cx}" y="${cy + shieldH / 2 + size * 0.1}" text-anchor="middle" fill="${WHITE}" font-size="${size * 0.07}" font-weight="700" font-family="Arial, sans-serif">ABEL INSURANCE</text>
  <text x="${cx}" y="${cy + shieldH / 2 + size * 0.155}" text-anchor="middle" fill="${GOLD}" font-size="${size * 0.055}" font-weight="600" font-family="Arial, sans-serif">GROUP</text>
</svg>`;
}

function createAdaptiveIconSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const shieldW = size * 0.36;
  const shieldH = size * 0.42;
  const sx = cx - shieldW / 2;
  const sy = cy - shieldH / 2 - size * 0.06;
  const shield = `M ${cx} ${sy}
    L ${sx + shieldW} ${sy + shieldH * 0.18}
    L ${sx + shieldW} ${sy + shieldH * 0.6}
    Q ${sx + shieldW} ${sy + shieldH * 0.85} ${cx} ${sy + shieldH}
    Q ${sx} ${sy + shieldH * 0.85} ${sx} ${sy + shieldH * 0.6}
    L ${sx} ${sy + shieldH * 0.18}
    Z`;
  const checkScale = size * 0.1;
  const checkX = cx - checkScale * 0.7;
  const checkY = cy - size * 0.02;
  const check = `M ${checkX} ${checkY}
    L ${checkX + checkScale * 0.5} ${checkY + checkScale * 0.5}
    L ${checkX + checkScale * 1.4} ${checkY - checkScale * 0.4}`;

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${PRIMARY}"/>
  <path d="${shield}" fill="${GOLD}" opacity="0.9"/>
  <path d="${check}" fill="none" stroke="${WHITE}" stroke-width="${size * 0.03}" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${cx}" y="${cy + shieldH / 2 + size * 0.06}" text-anchor="middle" fill="${WHITE}" font-size="${size * 0.055}" font-weight="700" font-family="Arial, sans-serif">ABEL INSURANCE</text>
  <text x="${cx}" y="${cy + shieldH / 2 + size * 0.11}" text-anchor="middle" fill="${GOLD}" font-size="${size * 0.042}" font-weight="600" font-family="Arial, sans-serif">GROUP</text>
</svg>`;
}

function createSplashSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const shieldW = size * 0.2;
  const shieldH = size * 0.24;
  const sx = cx - shieldW / 2;
  const sy = cy - shieldH / 2 - size * 0.04;
  const shield = `M ${cx} ${sy}
    L ${sx + shieldW} ${sy + shieldH * 0.18}
    L ${sx + shieldW} ${sy + shieldH * 0.6}
    Q ${sx + shieldW} ${sy + shieldH * 0.85} ${cx} ${sy + shieldH}
    Q ${sx} ${sy + shieldH * 0.85} ${sx} ${sy + shieldH * 0.6}
    L ${sx} ${sy + shieldH * 0.18}
    Z`;
  const checkScale = size * 0.06;
  const checkX = cx - checkScale * 0.7;
  const checkY = cy - size * 0.015;
  const check = `M ${checkX} ${checkY}
    L ${checkX + checkScale * 0.5} ${checkY + checkScale * 0.5}
    L ${checkX + checkScale * 1.4} ${checkY - checkScale * 0.4}`;

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${PRIMARY}"/>
  <path d="${shield}" fill="${GOLD}" opacity="0.9"/>
  <path d="${check}" fill="none" stroke="${WHITE}" stroke-width="${size * 0.015}" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${cx}" y="${cy + shieldH / 2 + size * 0.04}" text-anchor="middle" fill="${WHITE}" font-size="${size * 0.035}" font-weight="700" font-family="Arial, sans-serif">ABEL INSURANCE GROUP</text>
  <text x="${cx}" y="${cy + shieldH / 2 + size * 0.075}" text-anchor="middle" fill="${GOLD}" font-size="${size * 0.02}" font-weight="600" font-family="Arial, sans-serif">Local Knowledge, Innovative Solutions</text>
</svg>`;
}

async function generate() {
  const assetsDir = path.join(__dirname, '..', 'assets');

  // icon.png - 1024x1024
  await sharp(Buffer.from(createIconSvg(1024)))
    .png()
    .toFile(path.join(assetsDir, 'icon.png'));
  console.log('Created icon.png');

  // adaptive-icon.png - 1024x1024
  await sharp(Buffer.from(createAdaptiveIconSvg(1024)))
    .png()
    .toFile(path.join(assetsDir, 'adaptive-icon.png'));
  console.log('Created adaptive-icon.png');

  // splash-icon.png - 1024x1024
  await sharp(Buffer.from(createSplashSvg(1024)))
    .png()
    .toFile(path.join(assetsDir, 'splash-icon.png'));
  console.log('Created splash-icon.png');

  // favicon.png - 48x48
  await sharp(Buffer.from(createIconSvg(512)))
    .resize(48, 48)
    .png()
    .toFile(path.join(assetsDir, 'favicon.png'));
  console.log('Created favicon.png');

  console.log('All icons generated!');
}

generate().catch(console.error);

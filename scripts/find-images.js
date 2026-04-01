const https = require('https');
const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const html = await get('https://www.abelinsgroup.com');
  console.log('Page length:', html.length);
  
  const urls = new Set();
  
  // Match all URLs that look like images
  const patterns = [
    /https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp|gif|ico)/gi,
    /\/wp-content\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp|gif|svg)/gi,
    /smushcdn[^\s"'<>]+/gi,
  ];
  
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null) {
      urls.add(m[0]);
    }
  }
  
  // Also check for favicon
  const favMatch = html.match(/rel=["'][^"']*icon["'][^>]*href=["']([^"']+)["']/i);
  if (favMatch) urls.add(favMatch[1]);
  const favMatch2 = html.match(/href=["']([^"']+)["'][^>]*rel=["'][^"']*icon["']/i);
  if (favMatch2) urls.add(favMatch2[1]);
  
  // Check og:image
  const ogMatch = html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogMatch) urls.add(ogMatch[1]);
  const ogMatch2 = html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (ogMatch2) urls.add(ogMatch2[1]);
  
  console.log('\n=== Image URLs ===');
  for (const u of urls) {
    console.log(u);
  }
}

main().catch(e => { console.error(e.message); process.exit(1); });

import { createWriteStream, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const outDir = join(__dirname, '..', 'public', 'site');
mkdirSync(outDir, { recursive: true });

const IMAGES = [
  { url: 'https://strapi.bellegemsfriethuisje.be/uploads/20220417_104452_dea8c2695a.jpg', name: 'hero.jpg' },
  { url: 'https://strapi.bellegemsfriethuisje.be/uploads/large_20220417_104452_dea8c2695a.jpg', name: 'story-exterior.jpg' },
  { url: 'https://strapi.bellegemsfriethuisje.be/uploads/20220417_105458_b3b7e1d676.jpg', name: 'story-interior.jpg' },
  { url: 'https://strapi.bellegemsfriethuisje.be/uploads/20220417_105146_6ff5e0da63.jpg', name: 'story-dining.jpg' },
  { url: 'https://strapi.bellegemsfriethuisje.be/uploads/DSC_07923_c92311a02a.jpg', name: 'story-hall.jpg' },
  { url: 'https://strapi.bellegemsfriethuisje.be/uploads/20220417_104808_7d920f05c2.jpg', name: 'story-entrance.jpg' },
  { url: 'https://strapi.bellegemsfriethuisje.be/uploads/small_DSC_1740_Half_haantje_6b1846afc8.jpg', name: 'featured-halfhaantje.jpg' },
  { url: 'https://strapi.bellegemsfriethuisje.be/uploads/medium_20220417_105904_aad992e322.jpg', name: 'cta-bg.jpg' },
  { url: 'https://strapi.bellegemsfriethuisje.be/uploads/20230520_DSC_07914_921e483a24.jpg', name: 'locaties.jpg' },
];

for (const { url, name } of IMAGES) {
  const dest = join(outDir, name);
  process.stdout.write(`Downloading ${name}… `);
  const res = await fetch(url);
  if (!res.ok) { console.log(`FAILED (${res.status})`); continue; }
  const buf = await res.arrayBuffer();
  const { writeFileSync } = await import('fs');
  writeFileSync(dest, Buffer.from(buf));
  console.log(`${(buf.byteLength / 1024).toFixed(0)}KB`);
}

console.log(`\nDone — run "npm run optimize-images" to convert to WebP + AVIF`);

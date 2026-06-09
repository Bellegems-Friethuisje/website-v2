import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const dataDir = join(root, 'data');

const EXTS = ['.jpg', '.jpeg', '.png'];
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 65; // AVIF quality scale differs from WebP

function* walkDir(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkDir(full);
    else if (entry.isFile()) yield full;
  }
}

let converted = 0;
let savedBytes = 0;
const renamedPaths = new Map();

for (const filePath of walkDir(publicDir)) {
  const ext = extname(filePath).toLowerCase();
  if (!EXTS.includes(ext)) continue;

  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const avifPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.avif');
  const srcMtime = statSync(filePath).mtimeMs;

  const webpUpToDate = existsSync(webpPath) && statSync(webpPath).mtimeMs >= srcMtime;
  const avifUpToDate = existsSync(avifPath) && statSync(avifPath).mtimeMs >= srcMtime;

  if (webpUpToDate && avifUpToDate) {
    unlinkSync(filePath);
    continue;
  }

  const originalSize = statSync(filePath).size;

  const resized = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  await Promise.all([
    webpUpToDate ? null : resized.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath),
    avifUpToDate ? null : resized.clone().avif({ quality: AVIF_QUALITY }).toFile(avifPath),
  ]);

  const newSize = (existsSync(webpPath) ? statSync(webpPath).size : 0)
                + (existsSync(avifPath) ? statSync(avifPath).size : 0);
  savedBytes += originalSize - newSize / 2;
  converted++;

  const relOrig = '/' + relative(publicDir, filePath).replace(/\\/g, '/');
  const relWebp = '/' + relative(publicDir, webpPath).replace(/\\/g, '/');
  renamedPaths.set(relOrig, relWebp);

  unlinkSync(filePath);

  const webpKB = existsSync(webpPath) ? (statSync(webpPath).size / 1024).toFixed(0) : '-';
  const avifKB = existsSync(avifPath) ? (statSync(avifPath).size / 1024).toFixed(0) : '-';
  console.log(`${relOrig} → webp:${webpKB}KB avif:${avifKB}KB (was ${(originalSize / 1024).toFixed(0)}KB)`);
}

console.log(`\nConverted ${converted} images`);

if (renamedPaths.size === 0) {
  console.log('No path changes — JSON files unchanged.');
  process.exit(0);
}

let jsonUpdates = 0;

for (const filePath of walkDir(dataDir)) {
  if (extname(filePath) !== '.json') continue;

  let src = readFileSync(filePath, 'utf-8');
  let updated = src;

  for (const [oldPath, newPath] of renamedPaths) {
    updated = updated.replaceAll(oldPath, newPath);
  }

  if (updated !== src) {
    writeFileSync(filePath, updated, 'utf-8');
    console.log(`Updated ${relative(root, filePath)}`);
    jsonUpdates++;
  }
}

console.log(`Updated ${jsonUpdates} JSON file(s).`);

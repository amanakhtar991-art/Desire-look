/* One-off image optimizer for Desire Look.
   Re-encodes the logo + all JPEGs to web-sane sizes, emits WebP siblings,
   and writes img-dims.json (output pixel dimensions) so generate.js can
   stamp explicit width/height on every <img> (kills CLS). Originals remain
   recoverable from git history. */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMG = path.join(__dirname, "assets", "img");
const dims = {};

async function jpg(file, maxSide) {
  const src = path.join(IMG, file);
  const buf = fs.readFileSync(src);
  const out = sharp(buf).rotate().resize({
    width: maxSide,
    height: maxSide,
    fit: "inside",
    withoutEnlargement: true,
  });
  const jpgBuf = await out.clone().jpeg({ quality: 72, mozjpeg: true, progressive: true }).toBuffer();
  fs.writeFileSync(src, jpgBuf);
  const webpBuf = await out.clone().webp({ quality: 70 }).toBuffer();
  fs.writeFileSync(src.replace(/\.jpe?g$/i, ".webp"), webpBuf);
  const meta = await sharp(jpgBuf).metadata();
  dims[file] = { w: meta.width, h: meta.height };
  dims[file.replace(/\.jpe?g$/i, ".webp")] = { w: meta.width, h: meta.height };
  console.log(`${file}  ${meta.width}x${meta.height}  jpg ${(jpgBuf.length / 1024) | 0}KB  webp ${(webpBuf.length / 1024) | 0}KB`);
}

async function logo() {
  const src = path.join(IMG, "logo.png");
  // navbar logo displays ~40px tall; keep it crisp at ~3x and reuse as apple-touch-icon
  const out = sharp(fs.readFileSync(src)).resize({ width: 360, height: 360, fit: "inside", withoutEnlargement: true });
  const pngBuf = await out.png({ compressionLevel: 9, palette: true, quality: 82 }).toBuffer();
  fs.writeFileSync(src, pngBuf);
  const meta = await sharp(pngBuf).metadata();
  dims["logo.png"] = { w: meta.width, h: meta.height };
  console.log(`logo.png  ${meta.width}x${meta.height}  ${(pngBuf.length / 1024) | 0}KB`);
}

(async () => {
  await logo();
  await jpg("banner.jpg", 900);
  for (let i = 1; i <= 35; i++) await jpg(`gallery-${String(i).padStart(2, "0")}.jpg`, 1200);
  fs.writeFileSync(path.join(__dirname, "img-dims.json"), JSON.stringify(dims, null, 0));
  console.log("\nWrote img-dims.json");
})();

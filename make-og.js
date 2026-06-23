/* Build social share assets:
   - assets/img/og-cover.jpg  (1200x630 branded Open Graph / Twitter card)
   - assets/img/apple-touch-icon.png (180x180 square app icon)
   Run after image source changes: node make-og.js */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const IMG = path.join(__dirname, "assets", "img");

async function ogCover() {
  const W = 1200, H = 630, photoW = 460;
  const bg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3d0d16"/><stop offset="0.55" stop-color="#7a1f2e"/><stop offset="1" stop-color="#3d0d16"/>
      </linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <circle cx="120" cy="120" r="220" fill="#c9a24b" opacity="0.10"/>
    </svg>`
  );
  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .name{font-family:Georgia,'Times New Roman',serif;font-weight:700;fill:#ffffff}
        .it{font-family:Georgia,serif;font-style:italic;fill:#e3c989}
        .sans{font-family:Arial,Helvetica,sans-serif;fill:#f1ddd0}
        .gold{font-family:Arial,Helvetica,sans-serif;font-weight:700;fill:#e3c989}
      </style>
      <text x="74" y="210" class="name" font-size="96">Desire Look</text>
      <text x="78" y="262" class="it" font-size="38">Bridal Makeup Studio &amp; Beauty Salon</text>
      <text x="78" y="345" class="sans" font-size="32">HD &amp; Airbrush Bridal &#183; Party &#183; Hair</text>
      <text x="78" y="390" class="sans" font-size="32">Mehndi &#183; Skin &amp; Facial &#183; Nails</text>
      <text x="78" y="470" class="gold" font-size="30">Serving Jharkhand &amp; Bihar</text>
      <rect x="78" y="500" width="250" height="62" rx="31" fill="#c9a24b"/>
      <text x="203" y="540" text-anchor="middle" font-family="Arial" font-weight="700" font-size="27" fill="#3d0d16">Book Your Look</text>
      <rect x="${W - photoW}" y="0" width="6" height="${H}" fill="#c9a24b"/>
    </svg>`
  );
  const photo = await sharp(path.join(IMG, "banner.jpg"))
    .resize(photoW, H, { fit: "cover", position: "top" })
    .toBuffer();
  await sharp(bg)
    .composite([{ input: photo, left: W - photoW, top: 0 }, { input: overlay, left: 0, top: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(IMG, "og-cover.jpg"));
  console.log("og-cover.jpg written (1200x630)");
}

async function appleIcon() {
  const S = 180;
  const bg = Buffer.from(
    `<svg width="${S}" height="${S}" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a1f2e"/><stop offset="1" stop-color="#3d0d16"/></linearGradient></defs>
      <rect width="${S}" height="${S}" rx="38" fill="url(#g)"/>
    </svg>`
  );
  const logo = await sharp(path.join(IMG, "logo-full.png")).resize(150, 150, { fit: "inside" }).toBuffer();
  await sharp(bg).composite([{ input: logo, gravity: "center" }]).png().toFile(path.join(IMG, "apple-touch-icon.png"));
  console.log("apple-touch-icon.png written (180x180)");
}

(async () => { await ogCover(); await appleIcon(); })();

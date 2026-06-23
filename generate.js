/* Static-site generator for Desire Look — service pages, gallery, blog */
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;

const PHONE = "+91 92794 66630";
const WA = "919279466630";
const MAP = "https://maps.app.goo.gl/T7hxQ1yfMJhzLqQP9";
const SITE = "https://desirelook.in";
const EMAIL = "desirelook.official@gmail.com";
const INSTA = "https://www.instagram.com/the_desire_look_official";
const CITY_LIST = ["Dhanbad","Bokaro","Jamshedpur","Ramgarh","Ranchi","Hazaribagh","Giridih","Deoghar","Chas","Phusro","Jharia","Sindri","Chaibasa","Dumka","Patna","Gaya","Bhagalpur","Muzaffarpur","Begusarai","Bihar Sharif","Nawada","Jamui","Aurangabad","Sasaram"];
const CITY_PILLS = CITY_LIST.map((c) => `<span>${c}</span>`).join("");
const TOPBAR = `<div class="topbar">
  <div class="container topbar__row">
    <a class="topbar__offer" href="#contact">🎉 Get <b>20% OFF</b></a>
    <div class="topbar__marquee" aria-label="Areas we serve"><div class="topbar__track">📍&nbsp; ${CITY_PILLS}${CITY_PILLS}</div></div>
  </div>
</div>`;
const WA_TEXT = encodeURIComponent("Hello Desire Look! I found you through your website and would like to know more.");
const WA_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.515zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
const IG_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07c-1.27.06-2.15.26-2.91.56-.79.3-1.46.71-2.13 1.38C1.34 2.68.93 3.35.63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 002.13-1.38 5.9 5.9 0 001.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 00-1.38-2.13A5.9 5.9 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-10.4a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z"/></svg>';
const MAIL_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.4l-8 5-8-5V6l8 5 8-5z"/></svg>';
const PIN_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z"/></svg>';
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.055168739842!2d86.1497383!3d23.673985000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f423c7a6da08fd%3A0x830f14d4ec03c004!2sDesire%20Look!5e0!3m2!1sen!2sin!4v1782009904568!5m2!1sen!2sin';
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Poppins:wght@300;400;500;600&display=swap";

// Output pixel dimensions of every optimized image (written by optimize-images.js).
// Lets us stamp explicit width/height on each <img> so the browser reserves space (zero CLS).
const DIMS = JSON.parse(fs.readFileSync(path.join(ROOT, "img-dims.json"), "utf8"));

// Minify the stylesheet once and inline it into every page's <head>. Inlining
// removes the one render-blocking CSS request (faster FCP/LCP), and stripping
// comments/whitespace satisfies the "minify CSS" audit. style.min.css is also
// written to disk so the hand-written index.html/services.html can inline the
// exact same string.
const CSS_MIN = fs
  .readFileSync(path.join(ROOT, "assets/css/style.css"), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{}:;,>])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();
fs.writeFileSync(path.join(ROOT, "assets/css/style.min.css"), CSS_MIN);
function whOf(src) {
  const d = DIMS[src.split("/").pop()];
  return d ? ` width="${d.w}" height="${d.h}"` : "";
}
// Responsive <picture>: WebP first (with JPEG fallback), explicit dimensions, and either
// eager+high-priority (above-the-fold hero) or native lazy loading. Pass {io:true} to defer
// far-below-the-fold images via the IntersectionObserver loader in main.js (with a <noscript>).
function pic(src, alt, opts) {
  opts = opts || {};
  const webp = src.replace(/\.jpe?g$/i, ".webp");
  const wh = whOf(src);
  const cls = opts.cls ? ` class="${opts.cls}"` : "";
  if (opts.io) {
    const ph = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";
    return (
      `<picture><source type="image/webp" data-srcset="${webp}"><img class="io-lazy${opts.cls ? " " + opts.cls : ""}" src="${ph}" data-src="${src}"${wh} alt="${alt}" decoding="async"></picture>` +
      `<noscript><img src="${src}"${wh} alt="${alt}" loading="lazy"></noscript>`
    );
  }
  const load = opts.eager
    ? ' fetchpriority="high" loading="eager" decoding="async"'
    : ' loading="lazy" decoding="async"';
  return `<picture><source type="image/webp" srcset="${webp}"><img src="${src}"${wh} alt="${alt}"${cls}${load}></picture>`;
}

// depth: "" for root, "../" for subfolders
function head({ title, desc, canonical, depth, ogimg, preload }) {
  const a = depth;
  const pre = preload
    ? `\n<link rel="preload" as="image" href="${a}${preload}" fetchpriority="high">`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/${ogimg || "assets/img/banner.jpg"}">
<meta property="og:locale" content="en_IN">
<meta name="theme-color" content="#7a1f2e">
<link rel="icon" type="image/svg+xml" href="${a}favicon.svg">
<link rel="apple-touch-icon" href="${a}assets/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="${FONTS_HREF}" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${FONTS_HREF}"></noscript>${pre}
<style>${CSS_MIN}</style>`;
}

function topbarHeader(depth, active) {
  const a = depth;
  const lk = (href, label, key) =>
    `<a href="${a}${href}"${active === key ? ' class="active"' : ""}>${label}</a>`;
  return `</head>
<body>
<div class="sitebar">
${TOPBAR}
<header class="site-header">
  <div class="container nav">
    <a class="brand" href="${a}index.html"><img class="brand__logo" src="${a}assets/img/logo.png"${whOf("logo.png")} fetchpriority="high" decoding="async" alt="Desire Look — Bridal Makeup Studio & Beauty Salon, Dhanbad"></a>
    <nav class="nav__links" aria-label="Primary">
      ${lk("index.html", "Home", "home")}
      ${lk("services.html", "Services", "services")}
      ${lk("gallery.html", "Gallery", "gallery")}
      ${lk("index.html#areas", "Areas")}
      ${lk("index.html#reviews", "Reviews")}
      ${lk("index.html#about", "About")}
      ${lk("blog.html", "Blog", "blog")}
      ${lk("index.html#faq", "FAQs")}
      <a class="btn btn--gold nav__mobile-book" href="#contact">Book Appointment</a>
    </nav>
    <div class="nav__cta"><a href="#contact" class="btn btn--gold">Book Appointment</a><button class="nav__toggle" aria-label="Menu"><span></span><span></span><span></span></button></div>
  </div>
</header>
</div>
<div class="nav-scrim"></div>
<main>`;
}

function footer(depth) {
  const a = depth;
  return `</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${a}index.html"><span class="brand__mark">D</span><span><span class="brand__name">Desire Look</span><span class="brand__tag">Bridal Studio & Salon</span></span></a>
      <p>Jharkhand & Bihar's premier bridal makeup studio & beauty salon — crafting the look you desire for every celebration.</p>
      <div class="footer-social"><a href="${INSTA}" target="_blank" rel="noopener" aria-label="Instagram">${IG_SVG}</a><a href="mailto:${EMAIL}" aria-label="Email">${MAIL_SVG}</a><a href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA_SVG}</a><a href="${MAP}" target="_blank" rel="noopener" aria-label="Google Maps">${PIN_SVG}</a></div>
    </div>
    <div><h4>Quick Links</h4><ul><li><a href="${a}index.html">Home</a></li><li><a href="${a}services.html">Services</a></li><li><a href="${a}gallery.html">Gallery</a></li><li><a href="${a}blog.html">Blog</a></li><li><a href="${a}index.html#about">About Us</a></li><li><a href="#contact">Contact</a></li></ul></div>
    <div><h4>Services</h4><ul><li><a href="${a}services/bridal-makeup.html">Bridal Makeup</a></li><li><a href="${a}services/party-makeup.html">Party Makeup</a></li><li><a href="${a}services/hair-styling.html">Hair Styling</a></li><li><a href="${a}services/skin-facial.html">Skin & Facial</a></li><li><a href="${a}services/mehndi-nails.html">Mehndi & Nails</a></li><li><a href="${a}services/threading-waxing.html">Threading & Waxing</a></li></ul></div>
    <div><h4>Get In Touch</h4><ul><li>📍 Jharkhand &amp; Bihar, India</li><li>📞 <a href="tel:+${WA}">${PHONE}</a></li><li>✉️ <a href="mailto:${EMAIL}">${EMAIL}</a></li><li>🕘 Mon–Sun: 9 AM – 8 PM</li><li><a href="${MAP}" target="_blank" rel="noopener">📍 Get Directions</a></li></ul></div>
  </div>
  <div class="footer-bottom">© <span data-year>2026</span> Desire Look · Bridal Makeup Studio & Beauty Salon · Jharkhand & Bihar · All Rights Reserved</div>
</footer>
<div class="fab-stack">
  <a class="fab fab--call" href="tel:+${WA}" aria-label="Call Desire Look"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/></svg></a>
  <a class="fab fab--wa" id="waFloat" href="https://wa.me/${WA}?text=${WA_TEXT}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_SVG}</a>
  <a class="fab fab--book" href="#contact">📅 Book Appointment</a>
</div>
<div class="modal" id="bookModal" inert>
  <div class="modal__backdrop" data-close></div>
  <div class="modal__card" role="dialog" aria-modal="true" aria-label="Book an appointment">
    <button class="modal__close" data-close aria-label="Close">&times;</button>
    <span class="eyebrow">Quick Booking</span>
    <h3>Book Your Appointment</h3>
    <p>Share a few details — we'll confirm instantly on WhatsApp.</p>
    <form class="book-form" data-book>
      <div class="field"><label for="m-name">Full Name</label><input id="m-name" type="text" name="name" required placeholder="Your name" aria-label="Full name"></div>
      <div class="field"><label for="m-phone">Phone Number</label><input id="m-phone" type="tel" name="phone" required placeholder="+91 ..." aria-label="Phone number"></div>
      <div class="field"><label for="m-service">Service</label><select id="m-service" name="service" aria-label="Service"><option>Bridal Makeup</option><option>Party &amp; Occasion Makeup</option><option>Hair Styling &amp; Spa</option><option>Skin &amp; Facial</option><option>Mehndi &amp; Nails</option><option>Threading &amp; Waxing</option></select></div>
      <div class="field"><label for="m-date">Preferred Date</label><input id="m-date" type="date" name="date" aria-label="Preferred date"></div>
      <button type="submit" class="btn btn--gold" style="width:100%">Send Booking Request</button>
    </form>
  </div>
</div>
<div class="lightbox"><button class="lightbox__close" aria-label="Close">×</button><img src="" alt="Gallery preview"></div>
<script src="${a}assets/js/main.js" defer></script>
</body>
</html>`;
}

function ctaBand(depth) {
  return `<section class="cta-band"><div class="container reveal"><h2>Ready to Book Your Look?</h2><p>Tell us your event and date — we'll craft the perfect package for you.</p><a href="#contact" class="btn btn--gold">Book Appointment</a></div></section>`;
}

function contactSection(depth) {
  return `<section class="section section--tint" id="contact">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Visit / Book Us</span>
      <h2>Let's Create Your Look</h2>
      <p>Reach us across Jharkhand &amp; Bihar or reserve your appointment online. We'd love to be part of your special day.</p>
    </div>
    <div class="contact">
      <div class="reveal">
        <form class="book-form" data-book>
          <h3>Book an Appointment</h3>
          <p>Fill in your details — we'll confirm on WhatsApp.</p>
          <div class="field"><label for="c-name">Full Name</label><input id="c-name" type="text" name="name" required placeholder="Your name" aria-label="Full name"></div>
          <div class="field"><label for="c-phone">Phone Number</label><input id="c-phone" type="tel" name="phone" required placeholder="+91 ..." aria-label="Phone number"></div>
          <div class="field"><label for="c-service">Service</label>
            <select id="c-service" name="service" aria-label="Service">
              <option>Bridal Makeup</option>
              <option>Party &amp; Occasion Makeup</option>
              <option>Hair Styling &amp; Spa</option>
              <option>Skin &amp; Facial</option>
              <option>Mehndi &amp; Nails</option>
              <option>Threading &amp; Waxing</option>
            </select>
          </div>
          <div class="field"><label for="c-date">Preferred Date</label><input id="c-date" type="date" name="date" aria-label="Preferred date"></div>
          <div class="field"><label for="c-message">Message</label><textarea id="c-message" name="message" rows="3" placeholder="Tell us about your event..." aria-label="Message"></textarea></div>
          <button type="submit" class="btn btn--gold" style="width:100%">Send Booking Request</button>
        </form>
      </div>
      <div class="contact__info reveal">
        <div class="info-row"><span class="ic">📍</span><div><b>Service Area</b><span>Desire Look — serving Jharkhand &amp; Bihar, India</span></div></div>
        <div class="info-row"><span class="ic">📞</span><div><b>Phone / WhatsApp</b><a href="tel:+${WA}">${PHONE}</a></div></div>
        <div class="info-row"><span class="ic">🕘</span><div><b>Working Hours</b><span>Mon – Sun: 9:00 AM – 8:00 PM</span></div></div>
        <div class="info-row"><span class="ic">🧭</span><div><b>Directions</b><a href="${MAP}" target="_blank" rel="noopener">Open in Google Maps →</a></div></div>
        <div class="map-wrap">
          <button type="button" class="map-facade" data-map-embed="${MAP_EMBED}" aria-label="Load Google Map of the Desire Look location">
            <span class="map-facade__pin" aria-hidden="true">📍</span>
            <span class="map-facade__txt">View Us on Google Maps</span>
            <span class="map-facade__sub">Tap to load the interactive map</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* ===================== SERVICE PAGES ===================== */
const SERVICES = [
  {
    slug: "bridal-makeup",
    name: "Bridal Makeup",
    hero: "assets/img/gallery-01.jpg",
    intro:
      "Your wedding day deserves a look that's unmistakably you — only more radiant. At Desire Look, our senior artists specialise in HD, airbrush and traditional bridal makeup designed to last from the first ritual to the last dance, looking just as flawless in person as it does in every photograph.",
    body: [
      ["A Bridal Look Built Around You", "There is no single 'perfect' bridal look — there's the one that's perfect for <em>you</em>. We begin with a detailed consultation covering your outfit, jewellery, skin type, venue lighting and the mood you want, then build a custom look around it. Whether you dream of a soft, dewy glow or a bold, regal statement, every product and stroke is chosen to flatter your features."],
      ["Long-Lasting, Photo-Ready Finish", "Indian weddings are long, warm and emotional. Our HD and airbrush techniques use premium, sweat- and humidity-resistant products so your makeup stays put through every ceremony, every hug and every happy tear — while still looking crisp and natural under both daylight and camera flash."],
      ["Trials, Touch-Ups & On-Location Service", "We strongly recommend a pre-wedding trial so there are zero surprises on the big day. On the day itself, our team can come to your home, hotel or venue and stay on hand for touch-ups. From draping to the final hair pin, we handle the details so you can simply enjoy your moment."],
    ],
    list: [
      ["Bridal / Reception Makeup (MAC)", "₹12,000", "2h 30m"],
      ["Bridal / Reception Makeup (Studio)", "₹15,000", "2h 30m"],
      ["Bridal / Reception Makeup (Airbrush)", "₹20,000", "2h 30m"],
      ["Bridal / Reception Makeup (Airbrush HD)", "₹25,000", "3h"],
      ["Engagement / Sangeet Makeup (MAC)", "₹7,000", "1h 30m"],
      ["Engagement / Sangeet Makeup (Studio)", "₹9,000", "1h 30m"],
      ["Outstation Bridal Makeup (Studio)", "₹25,000", "on-site"],
      ["Bridal Trial Makeup", "₹4,000", "1h 30m"],
    ],
    faqs: [
      ["How far in advance should I book?", "For wedding-season dates (Oct–Feb), book 1–2 months ahead. A small advance locks in your slot and trial date."],
      ["Do you travel to my venue?", "Yes — we offer on-location bridal service to homes, hotels and venues. Travel charges depend on distance."],
      ["Is a trial included?", "Trials are available separately or bundled in our bridal packages. We highly recommend one to finalise your look."],
    ],
    gallery: ["gallery-01", "gallery-04", "gallery-06", "gallery-08"],
  },
  {
    slug: "party-makeup",
    name: "Party & Occasion Makeup",
    hero: "assets/img/gallery-12.jpg",
    intro:
      "Engagement, sangeet, reception, anniversary or a festive night out — every occasion deserves a look that turns heads. Desire Look creates fresh, glamorous and long-lasting party makeup tailored to your outfit and the moment.",
    body: [
      ["Looks for Every Celebration", "From subtle daytime elegance to full evening glam, we adapt your look to the event, the lighting and your personal style. Tell us the vibe — glowing and natural, bold and dramatic, or trendy and editorial — and we'll bring it to life."],
      ["Made for Photos & Long Nights", "Our HD party makeup is built for the camera and for hours of celebration. Smudge-resistant eyes, long-wear lips and a flawless base mean you stay picture-perfect from the first toast to the last song."],
      ["Complete the Look", "Pair your makeup with hairstyling, saree draping and nail finishing in a single visit. We make it effortless to walk out fully ready, head to toe."],
    ],
    list: [
      ["Party Makeup (MAC)", "₹5,000", "1h"],
      ["Party Makeup (Studio)", "₹6,000", "1h 15m"],
      ["Engagement / Sangeet Makeup (MAC)", "₹7,000", "1h 30m"],
      ["Engagement / Sangeet Makeup (Studio)", "₹9,000", "1h 30m"],
      ["Outstation Makeup (Studio)", "₹25,000", "on-site"],
      ["Saree / Dupatta Draping", "₹800", "20m"],
    ],
    faqs: [
      ["Can I get ready for a same-day event?", "Yes, subject to availability. Call or WhatsApp us and we'll fit you in wherever we can."],
      ["Do you do group bookings?", "Absolutely — we love getting the whole family or friend group ready. Book early so we can plan timings."],
      ["Will my makeup last all night?", "Our HD party makeup is designed for long wear and photographs beautifully throughout the event."],
    ],
    gallery: ["gallery-12", "gallery-16", "gallery-20", "gallery-09"],
  },
  {
    slug: "hair-styling",
    name: "Hair Styling & Spa",
    hero: "assets/img/gallery-02.jpg",
    intro:
      "Great makeup deserves great hair. From statement bridal hairstyles to nourishing hair spa, keratin and smoothening, our stylists complete your look and keep your hair healthy.",
    body: [
      ["Bridal & Occasion Hairstyling", "Sleek buns, romantic curls, voluminous braids or elegant open styles dressed with flowers and accessories — we craft a hairstyle that complements your face shape, outfit and makeup for a balanced, complete look."],
      ["Hair Care & Treatments", "Healthy hair photographs better and styles easier. Our hair spa deeply conditions, while keratin and smoothening treatments tame frizz and add lasting shine and manageability — ideal in the months leading up to your wedding."],
      ["Everyday Styling", "Need to look polished fast? Our blow-dry, curls and haircut services give you a fresh, salon-finished style for work, parties or any day you want to feel good."],
    ],
    list: [
      ["Bridal Hairstyling", "₹1,500+", "1h"],
      ["Hair Spa", "₹1,200+", "45m"],
      ["Keratin Treatment", "₹4,000+", "3h"],
      ["Hair Smoothening", "₹3,500+", "3h"],
      ["Blow Dry & Styling", "₹600+", "30m"],
      ["Haircut & Trim", "₹500+", "40m"],
    ],
    faqs: [
      ["How long does keratin last?", "Typically 3–5 months depending on hair type and aftercare. We'll guide you on maintenance."],
      ["Can you do a hairstyle to match my outfit?", "Yes — share a photo of your outfit and inspiration and we'll design a matching style."],
      ["Is hair spa good before a wedding?", "Definitely. A few sessions before the wedding leave hair softer, shinier and easier to style."],
    ],
    gallery: ["gallery-02", "gallery-05", "gallery-13", "gallery-17"],
  },
  {
    slug: "skin-facial",
    name: "Skin & Facial",
    hero: "assets/img/gallery-25.jpg",
    intro:
      "Beautiful makeup starts with healthy, glowing skin. Our facials, clean-ups and complete pre-bridal skincare packages prep your skin so it looks its best — bare or made up.",
    body: [
      ["Facials for Every Skin Type", "From a luxurious gold facial for instant radiance to refreshing fruit facials and targeted de-tan clean-ups, we choose treatments suited to your skin's needs for a clear, glowing complexion."],
      ["Complete Pre-Bridal Skin Packages", "Wedding-day glow is built over months, not minutes. Our multi-session pre-bridal packages combine facials, clean-ups, de-tan and body care on a timeline tailored to your wedding date, so your skin peaks at the right moment."],
      ["Gentle, Quality Products", "We use trusted, skin-friendly products and hygienic techniques. Sensitive skin? Let us know and we'll customise accordingly."],
    ],
    list: [
      ["Gold Facial", "₹1,500+", "1h"],
      ["Fruit Facial", "₹800+", "45m"],
      ["Pre-Bridal Skin Package", "₹8,000+", "multi"],
      ["De-Tan Clean-Up", "₹600+", "30m"],
      ["Face Bleach & De-Tan", "₹500+", "30m"],
      ["Body Polishing", "₹2,500+", "1h 30m"],
    ],
    faqs: [
      ["When should I start pre-bridal skincare?", "Ideally 2–3 months before the wedding for the best, lasting results."],
      ["How often should I get a facial?", "Once every 3–4 weeks is a good rhythm; we'll tailor it to your skin and timeline."],
      ["Are the products safe for sensitive skin?", "Yes — we use gentle, skin-friendly products and patch-test when needed. Just inform us of any allergies."],
    ],
    gallery: ["gallery-25", "gallery-27", "gallery-30", "gallery-33"],
  },
  {
    slug: "mehndi-nails",
    name: "Mehndi & Nails",
    hero: "assets/img/gallery-08.jpg",
    intro:
      "Complete your celebration with intricate mehndi and beautiful nails. From elaborate bridal henna to chic nail art and extensions, our artists add the perfect finishing touches.",
    body: [
      ["Bridal & Party Mehndi", "Our henna artists create everything from rich, detailed full-hand-and-feet bridal designs to quick, elegant party motifs. We use quality, deep-staining henna for a beautiful, long-lasting colour."],
      ["Nail Extensions & Art", "Get celebration-ready nails with gel and acrylic extensions in any shape, finished with custom nail art, gel polish or classic French. Perfect to match your outfit and jewellery."],
      ["Hand & Foot Care", "Round it off with a relaxing manicure and pedicure to keep your hands and feet looking as polished as the rest of you."],
    ],
    list: [
      ["Bridal Mehndi", "₹5,000+", "2h+"],
      ["Party Mehndi", "₹500+", "30m"],
      ["Nail Extensions", "₹1,500+", "1h 30m"],
      ["Nail Art", "₹400+", "30m"],
      ["Gel Polish", "₹700+", "45m"],
      ["Manicure & Pedicure", "₹900+", "1h"],
    ],
    faqs: [
      ["How early should bridal mehndi be applied?", "Usually 1–2 days before the wedding so the colour deepens to its richest tone."],
      ["How long do nail extensions last?", "Typically 2–3 weeks with proper care before a refill is needed."],
      ["Can you do designs from a reference photo?", "Yes — bring your inspiration and our artists will recreate or adapt it for you."],
    ],
    gallery: ["gallery-08", "gallery-10", "gallery-18", "gallery-22"],
  },
  {
    slug: "threading-waxing",
    name: "Threading & Waxing",
    hero: "assets/img/gallery-15.jpg",
    intro:
      "Smooth, well-groomed skin is the foundation of any look. Our quick, hygienic threading and waxing services keep you polished and ready, any day of the week.",
    body: [
      ["Precise Threading", "Our experienced technicians shape brows to suit your face and offer gentle upper-lip, chin and full-face threading for a clean, defined finish — fast and with minimal discomfort."],
      ["Smooth Waxing", "From underarms to full-body waxing, we use quality wax for silky-smooth, long-lasting results. Sensitive areas are handled with extra care."],
      ["Quick & Hygienic", "All tools are sanitised and single-use where applicable. Pop in between appointments and walk out feeling fresh and groomed."],
    ],
    list: [
      ["Eyebrow Threading", "₹40", "10m"],
      ["Upper Lip / Chin", "₹30", "5m"],
      ["Full Face Threading", "₹200+", "20m"],
      ["Full Body Waxing", "₹1,200+", "1h"],
      ["Underarms Waxing", "₹150", "15m"],
      ["Arms / Legs Waxing", "₹400+", "30m"],
    ],
    faqs: [
      ["Do I need an appointment for threading?", "Walk-ins are welcome for quick services, but booking ahead avoids any wait."],
      ["Which wax do you use?", "We use quality waxes suited to skin type, including gentle options for sensitive skin."],
      ["How often should I wax?", "Every 3–4 weeks keeps skin consistently smooth, though it varies by person."],
    ],
    gallery: ["gallery-15", "gallery-19", "gallery-24", "gallery-28"],
  },
];

function serviceSchema(s) {
  return `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Service","name":"${s.name}","serviceType":"${s.name}","provider":{"@type":"BeautySalon","name":"Desire Look","address":{"@type":"PostalAddress","addressLocality":"Dhanbad","addressRegion":"Jharkhand","addressCountry":"IN"},"telephone":"+${WA}"},"areaServed":["Jharkhand","Bihar"],"url":"${SITE}/services/${s.slug}.html"}
</script>`;
}

function buildService(s, idx) {
  const depth = "../";
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  const html =
    head({
      title: `${s.name} in Dhanbad | Desire Look`,
      desc: `${s.intro.slice(0, 150)}`,
      canonical: `${SITE}/services/${s.slug}.html`,
      depth,
      ogimg: s.hero,
      preload: s.hero,
    }) +
    serviceSchema(s) +
    topbarHeader(depth, "services") +
    `
<section class="page-hero">
  <div class="page-hero__bg" style="background-image:url('${depth}${s.hero}')"></div>
  <div class="page-hero__ov"></div>
  <div class="container page-hero__inner">
    <h1>${s.name}</h1>
    <div class="breadcrumb"><a href="${depth}index.html">Home</a><span>/</span><a href="${depth}services.html">Services</a><span>/</span>${s.name}</div>
  </div>
</section>

<section class="section">
  <div class="container prose">
    <p class="lead reveal">${s.intro}</p>
    ${s.body
      .map(
        ([h, p]) =>
          `<div class="reveal"><h2>${h}</h2><p>${p}</p></div>`
      )
      .join("\n    ")}
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Service Menu</span><h2>${s.name} — Prices</h2><p>Starting prices; final cost varies with customisation and length.</p></div>
    <div class="svc-rows reveal" style="max-width:900px;margin:0 auto">
      ${s.list
        .map(
          ([n, pr, t]) =>
            `<div class="svc-row"><div><h4>${n}</h4></div><div class="price"><b>${pr}</b><span>${t}</span></div></div>`
        )
        .join("\n      ")}
    </div>
    <div style="text-align:center;margin-top:34px" class="reveal"><a href="#contact" class="btn btn--wine">Book ${s.name}</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Our Work</span><h2>${s.name} Gallery</h2></div>
    <div class="gallery-grid reveal" style="grid-template-columns:repeat(4,1fr)">
      ${s.gallery
        .map(
          (g) =>
            `<a href="${depth}assets/img/${g}.jpg" data-lightbox>${pic(`${depth}assets/img/${g}.jpg`, `${s.name} by Desire Look`)}</a>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Good To Know</span><h2>${s.name} FAQs</h2></div>
    <div class="faq reveal">
      ${s.faqs
        .map(
          ([q, a]) =>
            `<div class="faq__item"><button class="faq__q">${q} <span class="ic">+</span></button><div class="faq__a"><div>${a}</div></div></div>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Explore More</span><h2>Other Services</h2></div>
    <div class="cards js-carousel">
      ${others
        .map(
          (o) =>
            `<article class="card reveal"><a class="card__media" href="${o.slug}.html" aria-label="${o.name}">${pic(`${depth}${o.hero}`, o.name)}</a><div class="card__body"><h3>${o.name}</h3><p>${o.intro.slice(0, 90)}…</p><div class="card__meta"><a class="card__link" href="${o.slug}.html" aria-label="View ${o.name} service">View Service →</a></div></div></article>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>

` +
    contactSection(depth) +
    footer(depth);
  fs.writeFileSync(path.join(ROOT, "services", `${s.slug}.html`), html);
  console.log("service:", s.slug);
}

SERVICES.forEach(buildService);

/* ===================== GALLERY PAGE ===================== */
(function buildGallery() {
  const depth = "";
  let imgs = "";
  for (let i = 1; i <= 35; i++) {
    const n = String(i).padStart(2, "0");
    imgs += `<a href="assets/img/gallery-${n}.jpg" data-lightbox>${pic(`assets/img/gallery-${n}.jpg`, `Desire Look bridal makeup gallery image ${i}`, { io: true })}</a>\n      `;
  }
  const html =
    head({
      title: "Gallery | Bridal Makeup & Beauty Work — Desire Look Dhanbad",
      desc: "Browse the Desire Look gallery — real brides, party makeup, hair, mehndi and beauty transformations created at our Dhanbad studio.",
      canonical: `${SITE}/gallery.html`,
      depth,
      preload: "assets/img/gallery-20.jpg",
    }) +
    topbarHeader(depth, "gallery") +
    `
<section class="page-hero">
  <div class="page-hero__bg" style="background-image:url('assets/img/gallery-20.jpg')"></div>
  <div class="page-hero__ov"></div>
  <div class="container page-hero__inner"><h1>Our Gallery</h1><div class="breadcrumb"><a href="index.html">Home</a><span>/</span>Gallery</div></div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Portfolio</span><h2>Real Brides, Real Glow</h2><p>A look at the makeup, hair and bridal transformations created at Desire Look. Click any image to view.</p></div>
    <div class="gallery-grid reveal">
      ${imgs}
    </div>
  </div>
</section>
` +
    contactSection(depth) +
    footer(depth);
  fs.writeFileSync(path.join(ROOT, "gallery.html"), html);
  console.log("gallery built");
})();

/* ===================== BLOG ===================== */
const POSTS = [
  {
    slug: "how-to-prepare-for-bridal-makeup",
    title: "How to Prepare for Your Bridal Makeup Day",
    date: "June 10, 2026",
    img: "assets/img/gallery-04.jpg",
    excerpt: "A simple checklist to help you get camera-ready and stress-free before the big morning.",
    body: [
      ["", "Your wedding morning sets the tone for the entire day. A little preparation goes a long way in helping your bridal makeup look flawless and last for hours. Here's how to get ready for your appointment at Desire Look."],
      ["Prep Your Skin in Advance", "The best bridal makeup sits on healthy, hydrated skin. Start a simple skincare routine a few weeks before — cleanse, moisturise and stay hydrated. Avoid trying brand-new products right before the wedding, and book a facial 5–7 days prior (not the day before) so skin is calm and glowing."],
      ["Do a Trial First", "A pre-wedding makeup trial removes all the guesswork. You'll see exactly how your look photographs, test it for longevity, and tweak anything you'd like changed — so your wedding morning is calm and confident."],
      ["The Morning Of", "Eat a proper breakfast and stay hydrated. Wash and dry your hair as advised by your stylist. Wear a front-open shirt so you don't disturb your hair and makeup when changing. Keep your outfit, jewellery and accessories ready in one place."],
      ["Bring Your Inspiration", "Share reference photos, your outfit colour and jewellery with your artist. The more we know, the better we can tailor your look to feel completely you."],
    ],
    quote: "The brides who prep their skin and do a trial always have the smoothest, happiest wedding mornings.",
    faqs: [
      ["When should I wash my hair before the wedding?", "Usually the night before or the morning of, depending on your hairstyle — your stylist will advise."],
      ["Should I get a facial the day before?", "No — schedule it 5–7 days before so any redness settles and skin looks its best."],
    ],
  },
  {
    slug: "hd-vs-airbrush-makeup",
    title: "HD vs Airbrush Makeup: Which Is Right for You?",
    date: "June 4, 2026",
    img: "assets/img/gallery-16.jpg",
    excerpt: "The real difference between the two most-requested bridal finishes — and how to choose.",
    body: [
      ["", "'Should I get HD or airbrush makeup?' is one of the most common questions brides ask us. Both deliver a beautiful, long-lasting finish — the right choice depends on your skin, your event and the look you want."],
      ["What Is HD Makeup?", "High-definition makeup uses finely milled, light-reflecting products applied by hand. It gives buildable coverage and a flawless finish that looks stunning in photos and HD video. It's versatile and works beautifully for most skin types and looks."],
      ["What Is Airbrush Makeup?", "Airbrush makeup is sprayed on in a fine mist using a special device, creating an ultra-lightweight, even, second-skin finish. It's highly long-lasting and resistant to sweat and humidity — ideal for long events and warm weather."],
      ["How to Choose", "Want buildable coverage and a classic, radiant glam? HD is a great fit. Want the lightest possible feel with maximum longevity for an all-day, outdoor or summer wedding? Airbrush shines. During your consultation we assess your skin and event and recommend the best option — sometimes a combination of both."],
    ],
    quote: "There's no universally 'better' option — only the one that's better for your skin, your venue and your day.",
    faqs: [
      ["Does airbrush makeup look natural?", "Yes — when applied well it gives a smooth, lightweight, natural-looking finish."],
      ["Which lasts longer?", "Both last long; airbrush tends to edge ahead in heat and humidity. We'll guide you based on your event."],
    ],
  },
  {
    slug: "pre-bridal-skincare-timeline",
    title: "The 3-Month Pre-Bridal Skincare Timeline",
    date: "May 28, 2026",
    img: "assets/img/gallery-25.jpg",
    excerpt: "Glowing wedding-day skin starts months in advance. Here's exactly what to do, and when.",
    body: [
      ["", "Wedding-day glow isn't created in a single facial — it's built gradually. Follow this simple three-month timeline for naturally radiant skin that needs minimal help from makeup."],
      ["3 Months Before", "Book a skin consultation to identify your skin type and concerns. Begin a consistent routine: gentle cleanser, moisturiser, sunscreen daily. Start monthly facials and address concerns like tan, dullness or breakouts early."],
      ["1–2 Months Before", "Continue regular facials and clean-ups. Add targeted treatments such as de-tan or brightening as advised. Focus on hydration, sleep and a balanced diet — they show on your skin."],
      ["The Final 2 Weeks", "Stick to your tested routine — no experimenting now. Get a facial 5–7 days before the wedding, never the day before. Stay hydrated, limit salty and oily food, and rest well."],
      ["The Day Before", "Keep it simple: cleanse, moisturise, and sleep early. Let your skincare and your artist do the rest tomorrow."],
    ],
    quote: "Consistency beats intensity — small daily care for three months outperforms any last-minute treatment.",
    faqs: [
      ["Can I start later than 3 months?", "Yes — even 4–6 weeks of consistent care helps. Earlier simply gives better, calmer results."],
      ["Do I need expensive products?", "No. A consistent, suitable routine matters more than price. We'll recommend what fits your skin."],
    ],
  },
  {
    slug: "choosing-bridal-hairstyle",
    title: "Choosing the Perfect Bridal Hairstyle",
    date: "May 20, 2026",
    img: "assets/img/gallery-13.jpg",
    excerpt: "From sleek buns to romantic curls — how to pick a bridal hairstyle that suits you.",
    body: [
      ["", "Your hairstyle frames your face and balances your entire bridal look. Here's how to choose one that complements your features, outfit and the occasion."],
      ["Consider Your Outfit & Jewellery", "A heavy maang tikka or statement earrings pair beautifully with an updo that keeps the focus on your face. Lighter jewellery gives you freedom for open, flowing styles. Always plan hair and jewellery together."],
      ["Match the Style to the Event", "A structured bun or braid often suits the main ceremony and heavy lehengas, while soft curls or half-up styles feel perfect for receptions and sangeet nights. You can change your look across functions."],
      ["Think About Comfort & Longevity", "You'll wear this style for many hours. We build hairstyles that hold all day yet feel comfortable, using accessories and flowers to add that bridal touch."],
    ],
    quote: "The best bridal hairstyle balances your makeup and jewellery — nothing competes, everything harmonises.",
    faqs: [
      ["Can I bring a reference photo?", "Please do — photos help us understand exactly what you want and adapt it to your hair."],
      ["Will my hairstyle last all day?", "Yes — we set bridal styles to hold through long events while keeping them comfortable."],
    ],
  },
  {
    slug: "bridal-mehndi-trends-2026",
    title: "Bridal Mehndi Designs & Trends for 2026",
    date: "May 12, 2026",
    img: "assets/img/gallery-08.jpg",
    excerpt: "The mehndi styles brides are loving this season — from minimal to full bridal detail.",
    body: [
      ["", "Mehndi is one of the most cherished bridal traditions. This season brings a beautiful mix of timeless detail and modern, personal touches. Here's what's trending in 2026."],
      ["Detailed Full-Hand Bridal Mehndi", "Classic, intricate full-hand-and-feet designs remain the heart of bridal mehndi — featuring fine net work, florals and traditional motifs that tell a story."],
      ["Personalised Motifs", "Brides increasingly add personal elements — couple portraits, wedding dates, or symbols meaningful to their love story — woven subtly into the design."],
      ["Minimal & Modern Styles", "For engagements and smaller functions, lighter, airy designs with negative space and delicate patterns are hugely popular and elegant."],
      ["Getting the Richest Colour", "Apply mehndi 1–2 days before the event, keep it on as long as possible, and avoid water afterwards for deep, lasting colour. We use quality henna for a beautiful natural stain."],
    ],
    quote: "Great mehndi is part artistry, part timing — apply early and care for it, and the colour rewards you.",
    faqs: [
      ["How long does bridal mehndi take?", "Detailed bridal designs can take 2–4 hours depending on intricacy and coverage."],
      ["When will the colour be darkest?", "Usually 24–48 hours after application, once fully developed."],
    ],
  },
  {
    slug: "makeup-tips-last-all-day",
    title: "7 Makeup Tips to Make It Last All Day",
    date: "May 5, 2026",
    img: "assets/img/gallery-20.jpg",
    excerpt: "Professional tricks to keep your makeup fresh from morning rituals to the last dance.",
    body: [
      ["", "Long Indian celebrations test any makeup look. These are the professional habits we use at Desire Look to keep your makeup flawless for hours."],
      ["1. Start With Prepped Skin", "Clean, moisturised, primed skin is the foundation of long-wear makeup. Hydrated skin holds product better and looks fresher for longer."],
      ["2. Use a Primer", "Primer creates a smooth canvas, blurs pores and helps everything stay put through heat and emotion."],
      ["3. Set With Powder & Spray", "Lightly setting the base with powder and finishing with a setting spray locks the look in place — essential for warm weather and long events."],
      ["4. Choose Long-Wear Formulas", "HD and airbrush bases, waterproof mascara and transfer-resistant lip colours dramatically extend wear."],
      ["5. Carry a Small Touch-Up Kit", "Blotting paper, lipstick and a compact let you refresh quickly between functions."],
      ["6. Don't Over-Touch Your Face", "The less you touch, the longer it lasts. Dab, don't rub, if you need to fix anything."],
      ["7. Trust a Professional", "The single biggest factor in all-day wear is technique. A skilled artist builds your look to last from the first ritual to the final photo."],
    ],
    quote: "Longevity is 50% products and 50% technique — both matter, and that's exactly what a pro brings.",
    faqs: [
      ["Does setting spray really help?", "Yes — it melds powder and base together for a longer-lasting, more natural finish."],
      ["How do I fix oily shine during the day?", "Gently blot with tissue or blotting paper, then lightly re-powder. Avoid piling on product."],
    ],
  },
];

function postSchema(p) {
  return `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BlogPosting","headline":"${p.title.replace(/"/g, "")}","image":"${SITE}/${p.img}","datePublished":"2026","author":{"@type":"Organization","name":"Desire Look"},"publisher":{"@type":"Organization","name":"Desire Look"},"mainEntityOfPage":"${SITE}/blog/${p.slug}.html"}
</script>`;
}

function buildPost(p, idx) {
  const depth = "../";
  const more = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const html =
    head({
      title: `${p.title} | Desire Look Blog`,
      desc: p.excerpt,
      canonical: `${SITE}/blog/${p.slug}.html`,
      depth,
      ogimg: p.img,
      preload: p.img,
    }) +
    postSchema(p) +
    topbarHeader(depth, "blog") +
    `
<section class="page-hero">
  <div class="page-hero__bg" style="background-image:url('${depth}${p.img}')"></div>
  <div class="page-hero__ov"></div>
  <div class="container page-hero__inner">
    <h1>${p.title}</h1>
    <div class="breadcrumb"><a href="${depth}index.html">Home</a><span>/</span><a href="${depth}blog.html">Blog</a></div>
    <div class="post-meta"><span>✦ By Desire Look</span><span>•</span><span>${p.date}</span></div>
  </div>
</section>

<section class="section">
  <div class="container prose">
    ${p.body
      .map(([h, t], i) => {
        const para = i === 0 ? `<p class="lead reveal">${t}</p>` : `<div class="reveal">${h ? `<h2>${h}</h2>` : ""}<p>${t}</p></div>`;
        return para;
      })
      .join("\n    ")}
    <blockquote class="reveal">${p.quote}</blockquote>
    <h2 class="reveal">Frequently Asked Questions</h2>
    <div class="faq reveal" style="margin-top:10px">
      ${p.faqs
        .map(
          ([q, a]) =>
            `<div class="faq__item"><button class="faq__q">${q} <span class="ic">+</span></button><div class="faq__a"><div>${a}</div></div></div>`
        )
        .join("\n      ")}
    </div>
    <div style="text-align:center;margin-top:36px" class="reveal"><a href="#contact" class="btn btn--gold">Book Your Appointment</a></div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Keep Reading</span><h2>More From the Journal</h2></div>
    <div class="blog-grid">
      ${more
        .map(
          (m) =>
            `<article class="post reveal"><a class="post__media" href="${m.slug}.html" aria-label="${m.title.replace(/"/g, "")}">${pic(`${depth}${m.img}`, m.title.replace(/"/g, ""))}</a><div class="post__body"><span class="post__date">${m.date}</span><h3>${m.title}</h3><p>${m.excerpt}</p><a class="card__link" href="${m.slug}.html" aria-label="Read: ${m.title.replace(/"/g, "")}">Read More →</a></div></article>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>
` +
    contactSection(depth) +
    footer(depth);
  fs.writeFileSync(path.join(ROOT, "blog", `${p.slug}.html`), html);
  console.log("post:", p.slug);
}

POSTS.forEach(buildPost);

/* blog listing */
(function buildBlogList() {
  const depth = "";
  const cards = POSTS.map(
    (p) =>
      `<article class="post reveal"><a class="post__media" href="blog/${p.slug}.html" aria-label="${p.title.replace(/"/g, "")}">${pic(p.img, p.title.replace(/"/g, ""))}</a><div class="post__body"><span class="post__date">${p.date}</span><h3>${p.title}</h3><p>${p.excerpt}</p><a class="card__link" href="blog/${p.slug}.html" aria-label="Read: ${p.title.replace(/"/g, "")}">Read More →</a></div></article>`
  ).join("\n      ");
  const html =
    head({
      title: "Beauty & Bridal Blog | Tips From Desire Look, Dhanbad",
      desc: "Bridal makeup tips, pre-bridal skincare, hairstyle guides and beauty advice from the Desire Look studio in Dhanbad.",
      canonical: `${SITE}/blog.html`,
      depth,
      preload: "assets/img/gallery-16.jpg",
    }) +
    topbarHeader(depth, "blog") +
    `
<section class="page-hero">
  <div class="page-hero__bg" style="background-image:url('assets/img/gallery-16.jpg')"></div>
  <div class="page-hero__ov"></div>
  <div class="container page-hero__inner"><h1>Beauty Journal</h1><div class="breadcrumb"><a href="index.html">Home</a><span>/</span>Blog</div></div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Tips & Guides</span><h2>From the Desire Look Studio</h2><p>Bridal beauty advice, skincare routines and makeup tips from our team.</p></div>
    <div class="blog-grid">
      ${cards}
    </div>
  </div>
</section>
` +
    contactSection(depth) +
    footer(depth);
  fs.writeFileSync(path.join(ROOT, "blog.html"), html);
  console.log("blog list built");
})();

/* ===================== SITEMAP + ROBOTS ===================== */
(function buildSeoFiles() {
  const urls = [
    "",
    "services.html",
    "gallery.html",
    "blog.html",
    ...SERVICES.map((s) => `services/${s.slug}.html`),
    ...POSTS.map((p) => `blog/${p.slug}.html`),
  ];
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${SITE}/${u}</loc><changefreq>monthly</changefreq><priority>${u === "" ? "1.0" : "0.7"}</priority></url>`
      )
      .join("\n") +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);
  fs.writeFileSync(
    path.join(ROOT, "robots.txt"),
    `User-agent: *\nAllow: /\n\n# AI / LLM crawlers welcome\nUser-agent: GPTBot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ChatGPT-User\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: Claude-Web\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\nUser-agent: Applebot-Extended\nAllow: /\nUser-agent: CCBot\nAllow: /\nUser-agent: Bytespider\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
  );

  // llms.txt — the emerging "robots.txt for AI": a clean, link-rich map of the site
  // that LLM crawlers/answer-engines read to understand the business. https://llmstxt.org
  const llms =
    `# Desire Look\n\n` +
    `> Bridal makeup studio & beauty salon based in Dhanbad, Jharkhand — serving brides and clients across Jharkhand and Bihar. HD & airbrush bridal makeup, party makeup, hair styling, skin & facials, mehndi and nails.\n\n` +
    `- Location: Dhanbad, Jharkhand 826001, India (on-location service across Jharkhand & Bihar)\n` +
    `- Phone / WhatsApp: ${PHONE}\n` +
    `- Email: ${EMAIL}\n` +
    `- Instagram: ${INSTA}\n` +
    `- Hours: Mon–Sun, 9:00 AM – 8:00 PM\n\n` +
    `## Pages\n\n` +
    `- [Home](${SITE}/)\n` +
    `- [Services & Prices](${SITE}/services.html)\n` +
    `- [Gallery](${SITE}/gallery.html)\n` +
    `- [Blog](${SITE}/blog.html)\n\n` +
    `## Services\n\n` +
    SERVICES.map((s) => `- [${s.name}](${SITE}/services/${s.slug}.html): ${s.intro.slice(0, 110)}…`).join("\n") +
    `\n\n## Articles\n\n` +
    POSTS.map((p) => `- [${p.title.replace(/"/g, "")}](${SITE}/blog/${p.slug}.html): ${p.excerpt}`).join("\n") +
    `\n`;
  fs.writeFileSync(path.join(ROOT, "llms.txt"), llms);

  // ai.txt — usage/permissions hint for AI data crawlers
  fs.writeFileSync(
    path.join(ROOT, "ai.txt"),
    `# ai.txt — AI crawler guidance for Desire Look (${SITE})\n# Public marketing content. Crawling & answer-engine citation permitted.\nUser-Agent: *\nAllow: /\nContent-Usage: ai-summarize=allow, ai-train=allow\nContact: ${EMAIL}\nSitemap: ${SITE}/sitemap.xml\nLLM-Index: ${SITE}/llms.txt\n`
  );
  console.log("sitemap + robots + llms.txt + ai.txt built");
})();

// Inline the same minified CSS into the two hand-written pages so they also
// drop the render-blocking stylesheet request and stay in sync with the build.
(function inlineCssIntoHandwritten() {
  const styleTag = `<style id="dl-css">${CSS_MIN}</style>`;
  ["index.html", "services.html"].forEach((f) => {
    const p = path.join(ROOT, f);
    let html = fs.readFileSync(p, "utf8");
    if (html.indexOf('id="dl-css"') !== -1) {
      html = html.replace(/<style id="dl-css">[\s\S]*?<\/style>/, () => styleTag);
    } else {
      html = html.replace(/<link rel="stylesheet" href="assets\/css\/style\.css">/, () => styleTag);
    }
    fs.writeFileSync(p, html);
  });
  console.log("inlined CSS into index.html + services.html");
})();

console.log("\nAll pages generated.");

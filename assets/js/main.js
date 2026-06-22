/* Desire Look — shared interactions + WhatsApp lead-source (UTM) tracking */
(function () {
  "use strict";

  var WA_NUMBER = "919279466630";

  /* ---------- sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    // header stays fixed/visible at all times — just add a shadow once scrolled
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // fixed top bar: offset the page by its height so content isn't hidden under it
  var sitebar = document.querySelector(".sitebar");
  function padForBar() {
    if (!sitebar) return;
    var hh = sitebar.offsetHeight;
    document.body.style.paddingTop = hh + "px";
    document.documentElement.style.scrollPaddingTop = hh + 12 + "px";
  }
  if (sitebar) {
    padForBar();
    window.addEventListener("load", padForBar);
    window.addEventListener("resize", padForBar);
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  var scrim = document.querySelector(".nav-scrim");
  // whole menu state lives on ONE class (body.nav-open) so it can't get half-applied
  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  function closeNav() { setNav(false); }
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      setNav(!document.body.classList.contains("nav-open"));
    });
  }
  if (links) links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });
  if (scrim) scrim.addEventListener("click", closeNav);

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__item");
      var ans = item.querySelector(".faq__a");
      var isOpen = item.classList.contains("open");
      item.classList.toggle("open", !isOpen);
      ans.style.maxHeight = isOpen ? null : ans.scrollHeight + "px";
    });
  });

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- lightbox ---------- */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    document.querySelectorAll("[data-lightbox]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        lbImg.src = a.getAttribute("href") || a.dataset.lightbox;
        lb.classList.add("open");
      });
    });
    lb.addEventListener("click", function () { lb.classList.remove("open"); });
  }

  /* ---------- booking popup (lead form modal) ---------- */
  var modal = document.getElementById("bookModal");
  function openModal() {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    var first = modal.querySelector("input[name=name]");
    if (first) setTimeout(function () { first.focus(); }, 80);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }
  if (modal) {
    // any styled "Book" button (and the top-bar offer + floating bar) opens the popup
    document
      .querySelectorAll('a.btn[href="#contact"], a.fab--book, a.topbar__offer, a.strip')
      .forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          closeNav();
          openModal();
        });
      });
    modal.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  /* =========================================================
     LEAD-SOURCE / UTM TRACKING
     Captures where a visitor came from (UTM params, ad clicks,
     referrer) using first-touch attribution stored in
     localStorage, and attaches it to every WhatsApp lead so
     you can see the source of each enquiry.
     Tag your links like:
       https://desirelook.in/?utm_source=instagram&utm_medium=bio&utm_campaign=bridal
     ========================================================= */
  function ls(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }
  function getLeadSource() {
    var qs = new URLSearchParams(location.search);
    var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
    var d = {};
    keys.forEach(function (k) {
      var v = qs.get(k);
      if (v) lsSet("dl_" + k, v);            // first-touch persist
      d[k] = v || ls("dl_" + k) || "";
    });
    if (!ls("dl_first_ref")) lsSet("dl_first_ref", document.referrer || "direct");
    if (!ls("dl_landing")) lsSet("dl_landing", location.pathname + location.search);
    d.referrer = ls("dl_first_ref") || document.referrer || "direct";
    d.landing = ls("dl_landing") || location.pathname;
    d.page = location.pathname;
    return d;
  }
  function friendlySource(d) {
    if (d.utm_source) return d.utm_source + (d.utm_medium ? " / " + d.utm_medium : "");
    if (d.gclid) return "Google Ads";
    if (d.fbclid) return "Meta Ads (FB/IG)";
    var r = d.referrer || "";
    if (!r || r === "direct") return "Direct / typed URL";
    if (/google\./i.test(r)) return "Google (organic search)";
    if (/instagram\./i.test(r)) return "Instagram";
    if (/facebook\./i.test(r) || /fb\.com/i.test(r)) return "Facebook";
    if (/youtube\./i.test(r)) return "YouTube";
    return r;
  }
  function sourceBlock() {
    var d = getLeadSource();
    var lines = ["", "--- Lead info (auto) ---", "Source: " + friendlySource(d)];
    if (d.utm_campaign) lines.push("Campaign: " + d.utm_campaign);
    if (d.utm_content) lines.push("Content: " + d.utm_content);
    lines.push("Page: " + d.page);
    lines.push("Landing: " + d.landing);
    return lines.join("\n");
  }
  function waLink(message) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
  }

  /* prefill the floating WhatsApp button with source info */
  var waFloat = document.getElementById("waFloat");
  if (waFloat) {
    waFloat.href = waLink(
      "Hello Desire Look! I found you through your website and would like to know more." +
        sourceBlock()
    );
  }

  /* ---------- booking form -> WhatsApp (with source) ---------- */
  document.querySelectorAll("form[data-book]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || "").toString().trim(); };
      var msg =
        "Hello Desire Look! I'd like to book an appointment.\n" +
        "Name: " + get("name") + "\n" +
        "Phone: " + get("phone") + "\n" +
        "Service: " + get("service") + "\n" +
        "Preferred date: " + get("date") + "\n" +
        "Message: " + get("message") +
        sourceBlock();
      window.open(waLink(msg), "_blank");
    });
  });

  /* ---------- Flickity carousels (with prev/next arrows) ---------- */
  function initCarousels() {
    if (!window.Flickity) return;
    document.querySelectorAll(".js-carousel").forEach(function (el) {
      if (el.classList.contains("flickity-enabled")) return;
      // carousel cells must stay visible (don't depend on scroll-reveal)
      el.querySelectorAll(".reveal").forEach(function (r) { r.classList.add("in"); });
      new window.Flickity(el, {
        cellAlign: "left",
        contain: true,
        groupCells: true,
        pageDots: true,
        prevNextButtons: true,
        wrapAround: false,
        imagesLoaded: true,
        adaptiveHeight: false
      });
    });
  }
  initCarousels();
  window.addEventListener("load", initCarousels);

  /* ---------- footer year ---------- */
  var yy = document.querySelector("[data-year]");
  if (yy) yy.textContent = new Date().getFullYear();
})();

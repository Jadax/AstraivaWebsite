/* ==========================================================================
   Astraiva — site interactions
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var THEME_KEY = "astraiva-theme";
  var storage = (function () {
    try { var s = window.localStorage; s.getItem("x"); return s; } catch (e) { return null; }
  })();

  /* ---------- Theme ----------
     The inline script in <head> is the single source of the initial theme.
     This module only syncs the toggle/meta and responds to clicks. */
  var themeToggle = document.getElementById("theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", t === "light" ? "true" : "false");
      themeToggle.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
    }
    if (themeMeta) themeMeta.setAttribute("content", t === "dark" ? "#0c0c11" : "#faf9f6");
    if (storage) storage.setItem(THEME_KEY, t);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
  applyTheme(root.getAttribute("data-theme") || "dark");

  /* ---------- Scroll lock (shared by menu + modal) ---------- */
  function lockScroll(lock) {
    if (lock) root.setAttribute("data-scroll-lock", "true");
    else root.removeAttribute("data-scroll-lock");
  }

  /* ---------- Sticky header ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    var closeMenu = function () {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      lockScroll(false);
    };

    menuToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      lockScroll(open);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (e) {
      if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && e.target !== menuToggle) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  /* ---------- Starfield ---------- */
  var starsEl = document.getElementById("stars");
  if (starsEl && !reduceMotion) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 70; i++) {
      var s = document.createElement("span");
      var size = Math.random() < 0.85 ? 2 : 3;
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
      s.style.animationDuration = (3 + Math.random() * 4).toFixed(2) + "s";
      frag.appendChild(s);
    }
    starsEl.appendChild(frag);
  }

  /* ---------- Marquee ---------- */
  var marquee = document.getElementById("marquee-track");
  if (marquee) {
    var names = [
      "Crown of Scars", "Stumped!", "LinguaTomo", "VibeGaffer",
      "ThetaForge", "HorizonAI", "Rovyniq", "GPRO Strategy Tool",
      "TM Advisor", "FTP Advisor"
    ];
    var chunk = names.map(function (n) { return "<span>" + n + "</span>"; }).join("");
    marquee.innerHTML = chunk + chunk;
    if (reduceMotion) marquee.style.animation = "none";
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");
    if (!btn || !answer) return;
    btn.addEventListener("click", function () {
      var open = item.getAttribute("data-open") === "true";
      item.setAttribute("data-open", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (open) answer.style.maxHeight = "";
      else answer.style.maxHeight = answer.scrollHeight + "px";
    });
  });

  /* ---------- Quick-view modal ---------- */
  var productDataEl = document.getElementById("product-data");
  var PRODUCTS = productDataEl ? JSON.parse(productDataEl.textContent) : {};
  var modal = document.getElementById("quick-modal");

  if (modal) {
    var qm = {
      kicker: document.getElementById("qm-kicker"),
      title: document.getElementById("qm-title"),
      badge: document.getElementById("qm-badge"),
      tag: document.getElementById("qm-tag"),
      desc: document.getElementById("qm-desc"),
      features: document.getElementById("qm-features"),
      chips: document.getElementById("qm-chips"),
      links: document.getElementById("qm-links"),
      media: document.getElementById("qm-media")
    };
    var closeBtn = document.getElementById("qm-close");
    var lastFocus = null;

    function openModal(key) {
      var p = PRODUCTS[key];
      if (!p) return;
      qm.kicker.textContent = p.kicker;
      qm.title.textContent = p.name;
      qm.badge.className = "badge badge-" + p.status;
      qm.badge.textContent = p.statusLabel;
      qm.tag.textContent = p.tagline;
      qm.desc.textContent = p.long;
      qm.features.innerHTML = p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("");
      qm.chips.innerHTML = p.chips.map(function (c) { return "<span class=\"chip\">" + c + "</span>"; }).join("");
      qm.links.innerHTML = p.links.map(function (l) {
        return "<a href=\"" + l.href + "\" target=\"_blank\" rel=\"noopener\">" + l.label + " <span aria-hidden=\"true\">↗</span></a>";
      }).join("");
      qm.media.innerHTML = p.media.map(function (m) {
        return "<figure class=\"qm-shot\"><img src=\"assets/img/" + m.src + "\" alt=\"" + m.alt + "\" width=\"1280\" height=\"720\" loading=\"lazy\"></figure>";
      }).join("");
      lastFocus = document.activeElement;
      modal.showModal();
      lockScroll(true);
      closeBtn.focus();
    }

    function closeModal() {
      modal.close();
      lockScroll(false);
      if (lastFocus) lastFocus.focus();
    }

    document.querySelectorAll("[data-product]").forEach(function (btn) {
      btn.addEventListener("click", function () { openModal(btn.dataset.product); });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    modal.addEventListener("close", function () { lockScroll(false); });

    modal.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusables = modal.querySelectorAll("a[href], button:not([disabled])");
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

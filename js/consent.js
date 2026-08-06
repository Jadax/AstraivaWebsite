/* Consent-first analytics loader (Google Analytics + Microsoft Clarity).
   Trackers only load after the visitor accepts; refusing never loads them.
   Consent choice is remembered in localStorage (essential, device-local). */
(function () {
  "use strict";

  var KEY = "astraiva-consent";
  var GA_ID = "G-ZN6JMVQ74L";
  var CLARITY_ID = "xy2ltqxa1p";

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function write(state) {
    try { localStorage.setItem(KEY, state); } catch (e) {}
  }

  window.astraivaResetConsent = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    window.location.reload();
  };

  function prefix() {
    var depth = location.pathname.split("/").filter(Boolean).length;
    return depth > 1 ? "../".repeat(depth - 1) : "";
  }

  function loadTrackers() {
    if (window.__astraivaTrackers) return;
    window.__astraivaTrackers = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(g);
    window.gtag("config", GA_ID);

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
    window.clarity("consent", "true");
  }

  function dismiss() {
    var b = document.getElementById("astraiva-consent");
    if (b) b.classList.add("hidden");
  }

  function showBanner() {
    var b = document.getElementById("astraiva-consent");
    if (!b) return;
    b.classList.remove("hidden");
    document.getElementById("astraiva-consent-accept").addEventListener("click", function () {
      write("granted");
      loadTrackers();
      dismiss();
    });
    document.getElementById("astraiva-consent-decline").addEventListener("click", function () {
      write("denied");
      dismiss();
    });
  }

  var banner = document.createElement("div");
  banner.id = "astraiva-consent";
  banner.className = "consent-banner hidden";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Cookie consent");
  banner.setAttribute("aria-modal", "false");
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML =
    '<div class="consent-banner-inner">' +
      '<p class="consent-banner-text"><strong>One thing to know:</strong> we use Google Analytics and Microsoft Clarity to see which pages are useful and how you use the site, anonymous visitor stats and session insights only. They only run if you accept. Your theme preference stays on your device.</p>' +
      '<div class="consent-banner-actions">' +
        '<a class="consent-banner-link" href="' + prefix() + 'privacy.html">Privacy policy</a>' +
        '<button class="btn btn-ghost" type="button" id="astraiva-consent-decline">Decline</button>' +
        '<button class="btn btn-primary" type="button" id="astraiva-consent-accept">Accept</button>' +
      '</div>' +
    '</div>';

  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(banner);
    var state = read();
    if (state === "granted") {
      loadTrackers();
    } else if (!state) {
      showBanner();
    }
  });
})();
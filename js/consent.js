/* Consent-first Google Analytics loader.
   GA only loads after the visitor accepts; refusing never loads it.
   Consent choice is remembered in localStorage (essential, device-local). */
(function () {
  "use strict";

  var KEY = "astraiva-consent";
  var GA_ID = "G-ZN6JMVQ74L";

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function write(state) {
    try { localStorage.setItem(KEY, state); } catch (e) {}
  }

  function prefix() {
    var depth = location.pathname.split("/").filter(Boolean).length;
    return depth > 1 ? "../".repeat(depth - 1) : "";
  }

  function loadGtag() {
    if (window.__astraivaGtag) return;
    window.__astraivaGtag = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.gtag("config", GA_ID);
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
      loadGtag();
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
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML =
    '<div class="consent-banner-inner">' +
      '<p class="consent-banner-text"><strong>One thing to know:</strong> we use Google Analytics to see which pages are useful — anonymous visitor stats only. It only runs if you accept. Your theme preference stays on your device.</p>' +
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
      loadGtag();
    } else if (!state) {
      showBanner();
    }
  });
})();

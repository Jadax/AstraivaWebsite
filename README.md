# Astraiva, Company Website

The official Astraiva site. A static, zero-dependency site (HTML + CSS + JS) showcasing
everything the studio ships: games, apps, tools and browser scripts. **Live at
https://astraiva.app** (GitHub Pages + custom domain).

- **Company:** Astraiva, founded by Tushant Sharma
- **Contact:** astraiva.apps@gmail.com
- **Domain:** `astraiva.app` (bought at Spaceship, DNS below)
- **Featured:** Crown of Scars, Stumped!, LinguaTomo, Wishweaver's Rest, VibeGaffer, SriCalendar,
  Silvae, ThetaForge, HorizonAI, Rovyniq, GPRO Strategy Tool, TM Advisor, FTP Advisor
- **Features:** dark/light theme toggle (persisted), subtle starfield, scroll reveals, quick-view
  modals, FAQ accordion, mobile-first, accessible, reduced-motion aware

## Project structure

```
├── index.html                  # Homepage, all sections + product data + JSON-LD
├── privacy.html                # Site privacy policy
├── terms.html                  # Terms of use (site + apps)
├── apps/                       # Per-app landing pages (SEO + store links)
│   ├── crown-of-scars.html
│   ├── stumped.html
│   ├── linguatomo.html
│   └── silvae.html
├── privacy/                    # Per-app privacy policies (required by Google Play)
│   ├── crown-of-scars.html
│   ├── stumped.html
│   ├── linguatomo.html
│   └── silvae.html
├── css/style.css               # Design system + dark/light themes + modal/FAQ/legal
├── js/main.js                  # Theme, reveals, starfield, marquee, nav, modal, FAQ
├── favicon.svg                 # Favicon (SVG)
├── apple-touch-icon.png        # iOS home-screen icon (uses the real logo)
├── robots.txt                  # Crawler rules + sitemap reference
├── sitemap.xml                 # All pages, URLs point at astraiva.app
└── assets/img/                 # Optimized screenshots + logo
```

## Run locally

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Hosting, GitHub Pages + astraiva.app (all $0 except the domain)

The site is deployed to **GitHub Pages** from the `main` branch of this repo
(`https://github.com/Jadax/AstraivaWebsite`) and served at **https://astraiva.app**.

### DNS records (set at Spaceship)

| Type  | Host      | Value                             |
|-------|-----------|-----------------------------------|
| A     | `@`       | `185.199.108.153`                 |
| A     | `@`       | `185.199.109.153`                 |
| A     | `@`       | `185.199.110.153`                 |
| A     | `@`       | `185.199.111.153`                 |
| CNAME | `www`     | `jadax.github.io`                 |

Then in the repo: **Settings → Pages → Custom domain** set to `astraiva.app` and **Enforce HTTPS**
enabled. GitHub auto-redirects `www.astraiva.app` → `astraiva.app` and issues the TLS certificate.

### Deploying changes

```powershell
git add -A
git commit -m "describe the change"
git push origin main
```

GitHub Pages rebuilds and deploys automatically (~1–2 min).

## App-store pages

Google Play requires a unique, live **privacy-policy URL** per app, plus a support email and a
data-safety declaration. Everything is already hosted here:

| App            | Privacy policy                          | Landing page                     |
|----------------|-----------------------------------------|----------------------------------|
| Crown of Scars | `https://astraiva.app/privacy/crown-of-scars.html` | `https://astraiva.app/apps/crown-of-scars.html` |
| Stumped!       | `https://astraiva.app/privacy/stumped.html`        | `https://astraiva.app/apps/stumped.html`        |
| LinguaTomo     | `https://astraiva.app/privacy/linguatomo.html`     | `https://astraiva.app/apps/linguatomo.html`     |
| Silvae         | `https://astraiva.app/privacy/silvae.html`         | `https://astraiva.app/apps/silvae.html`         |
| Site-wide      | `https://astraiva.app/privacy.html`     |,                                |
| Terms          | `https://astraiva.app/terms.html`       |,                                |

**Play Console checklist (per app):**
1. Support email: `astraiva.apps@gmail.com` (required).
2. Privacy policy URL: the per-app page above (required when the app requests data permissions;
   recommended regardless).
3. Data Safety form: answer it separately for each app and match the app's dedicated privacy
   policy. Do not declare "no data collected" for an app that uses accounts, sync, weather or
   photo-identification services.
4. Target audience / content ratings: set to match the game (cricket sim / deck roguelike).
5. When an app goes live on Play, swap the landing page's "Coming soon" note for the real store
   link (`https://play.google.com/store/apps/details?id=com.astraiva.<app>`), and add the same URL
   to its card in `index.html` (`#product-data` → `links`).

## SEO, what's already done

- **Semantic HTML**, one `h1`, hierarchical `h2/h3`, descriptive alt text.
- **Meta**, keyword-rich title + description, `author`, `robots`, `theme-color`, canonical per page.
- **Open Graph / Twitter**, title, description, image, URL, locale (all `astraiva.app`).
- **Structured data (JSON-LD)**, `Organization` + `WebSite` on every page; homepage adds an
  `ItemList` of all 13 products as `SoftwareApplication` and a `FAQPage` matching the on-page FAQ;
  each app landing page has a `SoftwareApplication` block.
- **`robots.txt`** + **`sitemap.xml`** listing the public landing, policy, support and contact URLs.
- **Content for long-tail search**, the FAQ targets real queries, and the per-app landing pages
  target "<app name>" search terms.

### To keep Google indexing astraiva.app

1. **Google Search Console**, add the `astraiva.app` property, submit `sitemap.xml`.
2. **URL Inspection** → request indexing for `/`.
3. **Bing Webmaster Tools** (also feeds Copilot/ChatGPT search).
4. Re-verify once HTTPS is enforced and the old `jadax.github.io/AstraivaWebsite/` URL stops
   being the canonical address.

### Honest expectations about "page 1 on Google"

The technical SEO is done, but ranking depends on more than code:
- New domains take time (weeks to months) and need repeated crawling.
- Content & links matter most: publish screenshots as games ship, add changelogs, and get listed
  on indie-game directories and socials.
- Long-tail queries ("LinguaTomo Japanese app", "Stumped! cricket sim") are where a small site
  wins first, those are the terms these pages are written to catch.

## Maintenance notes

- **No credentials live in this repo**, it's pure static. Never add API keys, tokens or passwords.
- The `og:image` on legal/landing pages uses an app screenshot; swap to fresh art as it ships.
- When a product's status changes (private → live), update its entry in `#product-data` on
  `index.html` (status, links) and re-push.

Built with hand-written HTML/CSS/JS. No frameworks and no build step. Optional website analytics load only after visitor consent; the apps and tools do not include tracking SDKs.

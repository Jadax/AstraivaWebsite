# Astraiva — Company Website

The official Astraiva site. A single-page, zero-dependency static site (HTML + CSS + JS) that
showcases everything the studio ships: games, apps, tools and browser scripts.

- **Company:** Astraiva — founded by Tushant Sharma
- **Contact:** astraiva.apps@gmail.com
- **Featured:** Crown of Scars, Stumped!, LinguaTomo, VibeGaffer, ThetaForge, HorizonAI, Rovyniq,
  GPRO Strategy Tool, TM Advisor, FTP Advisor
- **Features:** dark/light theme toggle (persisted), subtle starfield, scroll reveals,
  mobile-first, accessible, reduced-motion aware

## Run locally

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Project structure

```
├── index.html            # Single page — all sections
├── css/style.css         # Design system + dark/light themes
├── js/main.js            # Theme toggle, reveals, starfield, marquee, nav
├── favicon.svg           # Favicon (SVG)
├── apple-touch-icon.png  # iOS home-screen icon (uses the real logo)
└── assets/img/           # Optimized screenshots + logo
```

## What to update before launch

- **`og:image`, `canonical`, `robots.txt` and `sitemap.xml` all use `https://astraiva.com/`.**
  If you go live on a free subdomain first (e.g. `jadax.github.io/astraiva-site/`), update these
  to the real URL so Google indexes the right address.
- **Email** is already set to `astraiva.apps@gmail.com` (hero, studio, contact).
- Product cards for private/in-development projects intentionally have **no external links**.
  As products ship, add store URLs to the relevant card's `card-links` block and its entry in the
  `#product-data` JSON.
- Swap in fresh screenshots whenever you have better art — drop a file into `assets/img/` and
  update the `<img src>` and the product's `media` list (keep width/height for layout stability).
- **No credentials live in this repo** — it's pure static. Keep it that way: never add API keys,
  tokens or passwords anywhere in this folder.

## Site features

- Fully responsive (320px phones → wide desktops), both themes, reduced-motion aware.
- **Quick-view modals** — every product card has a "Details" button (and hovering the media on
  featured cards shows a "Quick view" hint). Opens a dialog with extended description, feature
  list, tech chips and extra screenshots. Keyboard friendly: Escape closes, focus returns.
- **FAQ accordion** (matches the FAQPage structured data).
- Mobile menu + modals lock page scroll while open.

---

## Hosting & domain — $0 budget plan

Everything below is **free forever** for a static site like this. The **only** thing that costs
money is buying a custom domain name (`~$10/yr` for a `.com`) — and you don't need one to go live.

### Free, right now (0 minutes, $0)

| Step | What | Cost |
|---|---|---|
| 1 | **Deploy to GitHub Pages** — you already have a GitHub account. Push this folder to a repo (e.g. `astraiva-site`), then Settings → Pages → deploy from main. You get `https://jadax.github.io/astraiva-site/` with free HTTPS. | $0 |
| 2 | Add `jadax.github.io/astraiva-site/` to **Google Search Console** and submit `robots.txt`/`sitemap.xml` (update URLs in this repo to your real address first). | $0 |
| 3 | Link the live URL into Google Play / App Store listings as your privacy-policy page. | $0 |

### Free, better, when you have a few minutes

| Option | URL you get | Notes |
|---|---|---|
| **Cloudflare Pages** | `https://astraiva-site.pages.dev` | Best free tier: global CDN, free SSL, free security headers. Recommended once you have a domain. |
| **Netlify** | `https://astraiva-site.netlify.app` | Drag-and-drop deploy of this folder works as-is. |
| **Vercel** | `https://astraiva-site.vercel.app` | Great if you later move to React/Next.js. |

All three accept a custom domain for free later.

### Custom domain (the only cost — wait until you're earning)

- **Porkbun** or **Cloudflare Registrar** — `.com` ≈ $10/yr, WHOIS privacy included.
- Point it at whichever host you chose; HTTPS is automatic on Pages/Vercel/Netlify.
- The site's `canonical`, `og:image`, `robots.txt` and `sitemap.xml` are already written for
  `https://astraiva.com/` — so when the domain goes live, SEO is instantly correct.

**Avoid** WordPress/shared-hosting: slower, bigger attack surface, ongoing maintenance. A static
site on a CDN is the single lowest-risk hosting model for store submissions.

---

## SEO — what's already done

- **Semantic HTML** — one `h1`, hierarchical `h2/h3`, `section`/`article`, descriptive alt text.
- **Meta** — keyword-rich title + description, `author`, `robots`, `theme-color`, canonical.
- **Open Graph / Twitter** — title, description, image, URL, locale.
- **Structured data (JSON-LD)** — `Organization`, `WebSite`, `ItemList` of all 10 products as
  `SoftwareApplication`, and `FAQPage` matching the on-page FAQ.
- **`robots.txt`** + **`sitemap.xml`**.
- **Content for long-tail search** — a 6-question FAQ targets real queries ("Is LinguaTomo free?",
  "What is Crown of Scars?", "Who is the founder of Astraiva?").

### To get indexed (after first deploy)

1. Add the live URL to **Google Search Console** and submit `sitemap.xml`.
2. Fetch the homepage with **URL Inspection** → Request indexing.
3. Set **Bing Webmaster Tools** too (it also feeds Copilot/ChatGPT search).
4. Ping **IndexNow** (Bing/Cloudflare) for instant discovery.

### Honest expectations about "page 1 on Google"

The technical SEO is done — but ranking depends on more than code:
- **New domains take time** (weeks to months) and need repeated crawling.
- **Content & links matter most** — publish updates (screenshots as games ship, a changelog, the
  products going live on Steam/Play) and get listed on indie-game directories and socials.
- **Long-tail queries** (e.g. "FTP Advisor Tampermonkey", "LinguaTomo Japanese app") are where a
  small site wins first — those are the terms this page is written to catch.

---

## Local run

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Project structure

```
├── index.html            # Single page — all sections + product data + JSON-LD
├── privacy.html          # Privacy policy (for app-store listings)
├── robots.txt            # Crawler rules + sitemap reference
├── sitemap.xml           # sitemap (URLs point at astraiva.com)
├── css/style.css         # Design system + dark/light themes + modal/FAQ/legal
├── js/main.js            # Theme, reveals, starfield, marquee, nav, modal, FAQ
├── favicon.svg           # Favicon (SVG)
├── apple-touch-icon.png  # iOS home-screen icon (uses the real logo)
└── assets/img/           # Optimized screenshots + logo
```

---

## Hosting recommendations

You said this site will be referenced in Google Play Console / App Store submissions, so the bar
is: **always-on, HTTPS, fast, and impossible to take down by accident.** Research across 2026
hosting comparisons (Cloudflare Pages, Vercel, Netlify, GitHub Pages all ranked) supports the
following.

### Recommended stack (my pick)

| Layer | Choice | Why |
|---|---|---|
| **Hosting** | **Cloudflare Pages** (free) | Free SSL/HTTPS, global CDN with unlimited bandwidth, ~zero attack surface, custom domain support. The same company also protects the domain. |
| **Domain** | **Porkbun** or **Cloudflare Registrar** | Transparent renewals (~$10/yr for `.com`), WHOIS privacy included for free, easy DNS management. |

Why this combo:

- **Google Play / Apple review teams** require a reachable website (e.g. privacy policy). A static
  site on a CDN with free HTTPS is exactly what they want — no 500s, no maintenance windows.
- **Static + CDN = safe.** No server, no database, no logins → nothing to hack. It's the single
  lowest-risk hosting model in 2026.
- **Free tier is genuinely free.** No bandwidth limits to trip over if a store listing goes viral.

### Alternative options (also excellent)

| Host | Best for | Notes |
|---|---|---|
| **Vercel** | If you later want React/Next.js | Generous free tier, instant deploys |
| **Netlify** | Same as Vercel, simpler defaults | Drag-and-drop deploy of this folder works out of the box |
| **GitHub Pages** | You already live there | Free, but no headers/CSP control and less protection tooling |

**Avoid** WordPress/shared-hosting for this: slower, bigger attack surface, ongoing maintenance —
all downside for a portfolio.

### Deploy steps (Cloudflare Pages, ~10 minutes)

1. Register `astraiva.com` at **Porkbun** or **Cloudflare Registrar**.
2. Create a free **Cloudflare** account → **Workers & Pages** → **Create** → **Pages**.
3. **Connect to Git** (recommended) or drag-and-drop the contents of this folder.
   - If uploading directly, upload `index.html`, `css/`, `js/`, `assets/`, `favicon.svg`,
     `apple-touch-icon.png` — the whole repo root as-is.
4. In the Pages project → **Custom domains** → add `astraiva.com` (Cloudflare DNS handles the rest).
5. Enable **HTTPS** (it's automatic on Pages).

For the app stores:

- **Google Play Console:** Developer account → app listing → Privacy Policy must be a live URL.
  Put `https://astraiva.com/` (or a `/privacy` page you add later) in the listing.
- **Apple App Store:** The App Privacy section needs the same live policy URL.
- Add the **App Store verification** for your Apple developer profile later; a normal HTTPS page
  is all that's required at this stage.

### Optional quick wins

- Add a `robots.txt` + `sitemap.xml` once you own the domain (SEO).
- Point the email links to a real mailbox early — reviewers sometimes reach out.
- Keep the theme toggle — reviewers and users both expect dark mode on dev tools in 2026.

---

Built with hand-written HTML/CSS/JS. No frameworks, no trackers, no build step.

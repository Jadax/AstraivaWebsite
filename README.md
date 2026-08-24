# Astraiva Website

Static, zero-dependency site (hand-written HTML + CSS + JS, no build step) for Astraiva,
the independent studio of Tushant Sharma. Live at https://astraiva.app via GitHub Pages.

| Key | Value |
|---|---|
| Repo | `github.com/Jadax/AstraivaWebsite` (branch `main` auto-deploys, ~1–2 min) |
| Contact | astraiva.apps@gmail.com (Web3Forms form on `contact.html` + `support.html`) |
| Analytics | GA + Clarity, consent-gated by `js/consent.js`; nothing loads before "Accept" |
| Run locally | `python -m http.server 4173` → http://localhost:4173 |

## File map

```
index.html          Homepage: hero, featured work (games/apps), tools, browser tools,
                    studio, FAQ, contact CTA. Holds #product-data JSON (below) + JSON-LD
                    (Organization, WebSite, ItemList of all products, FAQPage).
apps/*.html         Landing pages: crown-of-scars, stumped, linguatomo, silvae.
privacy/*.html      Per-product privacy policies (same four products).
privacy.html        Site-wide privacy policy.  terms.html  ToS.  support.html  Support.
contact.html        Contact page (form).  thank-you.html  Post-submit redirect target.
404.html            Served at ANY missing URL by GitHub Pages → absolute paths only.
js/main.js          All interactions: theme, nav, starfield, marquee, reveals, FAQ,
                    quick-view modal (reads #product-data), contact form (Web3Forms).
js/consent.js       Consent banner + consent-gated tracker loader.
css/style.css       Design tokens (dark default, [data-theme="light"] overrides),
                    components, responsive (breakpoints: 920px, 680px), reduced-motion.
css/fonts.css       Self-hosted Inter + Space Grotesk (@font-face, unicode-range subsets).
sitemap.xml         Every public page.  robots.txt allows all, references sitemap.
```

## Architecture: `#product-data` is the single source of truth

`index.html` contains `<script type="application/json" id="product-data">` — one object per
product. `js/main.js` parses it and drives both the **quick-view modal** and the **marquee**
(product names). When editing product info, update these locations so they stay in sync:

| Location | What it holds |
|---|---|
| `#product-data` (index.html) | kicker, name, status, statusLabel, tagline, long, features[], chips[], media[], links[] — feeds modal + marquee |
| Card markup (index.html) | Visible card: title, badge, tag, desc, chips, links (duplicates the JSON on purpose: cards render without JS) |
| ItemList JSON-LD (index.html) | One `SoftwareApplication` per product; keep positions sequential |
| `apps/<product>.html` | Landing page (only for products with a public page) |
| `privacy/<product>.html` | Policy (only for products that hold user data) |
| `sitemap.xml` | Add new public pages |
| `support.html` | One `.support-topic` per product with repo/contact links |

### Adding a product (checklist)

1. Card markup in the right section of `index.html` (`featured-grid` = games/apps,
   `tool-grid` = tools, `browser-list` = Tampermonkey scripts).
2. Entry in `#product-data` (modal + marquee pick it up automatically).
3. ItemList JSON-LD entry; renumber positions.
4. If it has a landing/privacy page: create it from an existing page in `apps/` or
   `privacy/` (nav, footer, JSON-LD, canonical are all relative-path aware), then add to
   `sitemap.xml` and cross-link from the card + modal `links`.
5. If it holds user data: add its providers to the third-party list in `privacy.html`.

### Content rules (enforced by prior audits)

- **Never overstate status.** Platform chips must match reality: "Web" live + "Mobile soon",
  not "Android/iOS" for unreleased builds. Status labels: `dev` → "In development",
  `live` → "Live · Free", `free` → "Free · Open source", `private` for unreleased/private.
- **Claims must match the product's own privacy policy** (e.g. Silvae photo-ID is
  server-side via Plant.id/PlantNet — never call it "on-device"; Silvae requires an account).
- Free claims: no ads, no paywalls, no data selling — keep consistent across cards, FAQs,
  `privacy.html` and JSON-LD (FAQPage JSON-LD text must equal the on-page FAQ answer).

## Conventions

- Relative paths inside the site; absolute (`/css/...`) only in `404.html` (served at
  arbitrary depths). Subpages use `../` prefixes.
- Theme: inline `<head>` script sets `data-theme` before CSS paint (prevents flash);
  `js/main.js` only syncs the toggle. Never remove that inline script.
- Accessibility: skip links, `aria-expanded`/`aria-pressed` state, focus trap in modal,
  `prefers-reduced-motion` disables starfield/marquee/reveals.
- Images: 1280×720 JPGs in `assets/img/`, always with `width`/`height` + `loading="lazy"`.
- No comments unless explaining a non-obvious invariant; no frameworks, no dependencies.

## Deployment

```powershell
git add -A; git commit -m "change"; git push origin main
```

DNS (Spaceship): A `@` → 185.199.108.153 / .109 / .110 / .111, CNAME `www` → `jadax.github.io`.
Repo Settings → Pages → custom domain `astraiva.app`, Enforce HTTPS.

## App-store reference

Google Play needs a live privacy-policy URL per app. Hosted here:

| App | Privacy policy | Landing |
|---|---|---|
| Crown of Scars | /privacy/crown-of-scars.html | /apps/crown-of-scars.html |
| Stumped! | /privacy/stumped.html | /apps/stumped.html |
| LinguaTomo | /privacy/linguatomo.html | /apps/linguatomo.html |
| Silvae | /privacy/silvae.html | /apps/silvae.html |

Play Console per app: support email `astraiva.apps@gmail.com`; privacy URL from the table;
Data Safety form must match that app's policy (never declare "no data collected" for apps
with accounts, sync, weather or photo-ID). When a store listing goes live, swap the landing
page's "coming soon" note for the store URL and add it to the product's `links` in
`#product-data`.

## Maintenance notes

- No secrets in this repo — pure static, and there should never be credentials here.
- When a product's status changes, update: card badge, `#product-data` (status/statusLabel/
  links), ItemList JSON-LD, and any landing-page callout — all in the same commit.
- SEO basics are done (meta, OG/Twitter, canonical, JSON-LD, sitemap); keep FAQPage JSON-LD
  text identical to the rendered FAQ.

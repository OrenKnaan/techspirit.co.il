# טכנורוחניק — Project Map

> **"ביום מקטיר קטורות. בלילה בונה אתרים."**  
> A landing page for Oren Knaan's web design practice, targeting spiritual practitioners and holistic therapists in the Israeli market.

---

## Table of Contents

1. [Project Intent](#1-project-intent)
2. [Site Structure & URL Map](#2-site-structure--url-map)
3. [Landing Page Sections](#3-landing-page-sections)
4. [Design System](#4-design-system)
5. [Third-Party Integrations](#5-third-party-integrations)
6. [Analytics & Funnel Tracking](#6-analytics--funnel-tracking)
7. [SEO — Current State](#7-seo--current-state)
8. [SEO — Pending](#8-seo--pending)
9. [Deployment & Hosting](#9-deployment--hosting)
10. [Roadmap](#10-roadmap)

---

## 1. Project Intent

### Who it's for
Spiritual business owners — holistic therapists, coaches, ceremony facilitators, yoga teachers, alternative medicine practitioners — operating in Israel and seeking a professional web presence that speaks their language.

### The problem it solves
Generic web design agencies don't understand the spiritual/holistic world. The site positions Oren as someone who lives in both worlds: a tech entrepreneur who's also deeply immersed in consciousness and spiritual practice (anthroposophy, biodynamic farming, etc.). The tagline **"הטכנורוחניק"** (Techno-Spiritualist) is the brand concept: the bridge between the two worlds.

### Conversion strategy
Single-page scroll funnel with two exit points:
1. **WhatsApp** — for warm leads who want direct contact (low friction)
2. **Contact form** — for leads who prefer async and want to feel less pressured

The funnel is ordered by trust-building: Pain → Proof → Process → Portfolio → Testimonials → About → Guarantee → FAQ → CTA.

### Target market
- Location: Israel
- Language: Hebrew (RTL)
- Profile: Solopreneurs in the spiritual/wellness sector, often non-technical, value authenticity over corporate polish

---

## 2. Site Structure & URL Map

```
techspirit.co.il/
├── /                   → index.html          Main landing page (public, indexed)
├── /privacy/           → privacy/index.html  Privacy policy (noindex)
├── /terms/             → terms/index.html    Terms of service (noindex)
├── /thank-you/         → thank-you/index.html  Post-form confirmation (noindex)
└── /analytics/         → analytics/index.html  Private analytics dashboard (noindex)
```

**URL pattern:** Directory-based clean URLs (no `.html` extension). Each subpage lives in its own folder with an `index.html`. Works on any static host with no server config required.

**HTTPS redirect:** Inline JS at the top of every page — fires before any assets load.  
**`/index.html` fix:** `history.replaceState` silently rewrites to `/` in the browser bar.

---

## 3. Landing Page Sections

| Section | HTML ID | Purpose | Primary CTA |
|---------|---------|---------|-------------|
| Nav | — | Brand mark + quick access | WhatsApp button |
| Hero | `#hero` | Hook + slideshow of site examples | WhatsApp button |
| Pain | `#pain` | 4 pain cards (FA icons) | — |
| Proof bar | `#proof` | 4 animated counters (+50 projects, etc.) | — |
| Process | `#process` | 3-step workflow (coffee → build → launch) | — |
| Portfolio | `#portfolio-preview` | 2×2 image grid + text list of more sites | Individual site links |
| Testimonials | `#testimonials` | 4 real client testimonials | — |
| About | `#about` | מי אני? — Oren's story + spiritual background | — |
| Guarantee | — | 14-day satisfaction guarantee | — |
| FAQ | `#faq` | 5 accordion items | — |
| Final CTA | — | Strong close | WhatsApp button |
| Contact | `#contact` | Async contact form + Ganesha illustration | Form submit |
| Footer | — | Nav links + legal links | — |

### Hero slideshow
Cycles through portfolio screenshots every 3.5 seconds using `setInterval` + CSS opacity transitions (`active` class toggle).

### Animated counters
IntersectionObserver triggers count-up animation when the proof bar enters viewport.

### Portfolio sites referenced
- [childhoodworld.co.il](https://childhoodworld.co.il/)
- [tarbutalhasaf.co.il](https://tarbutalhasaf.co.il/)
- [antro-seminar.org](https://antro-seminar.org/) (סופיה - מדרשה למדע הרוח)
- [dr-talmon.co.il](https://dr-talmon.co.il/)
- Ohad Galon (in the 2×2 grid)

---

## 4. Design System

### Color palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--teal-dark` | `#162828` | Page background, nav, footer, dark sections |
| `--teal` | `#2D6B6B` | Primary brand color, headings, accents |
| `--teal-mid` | `#3D8585` | Hover states, secondary accents |
| `--terra` | `#C4502A` | Accent / emphasis (warm, earthy) |
| `--terra-hi` | `#E06840` | Terra hover state |
| `--gold` | `#D4A843` | Secondary accent (proof bar, badges) |
| `--cream` | `#F5F0E6` | Light section backgrounds |
| `--parchment` | `#FAF7F0` | Lightest section background (about, legal pages) |
| `--charcoal` | `#2C2420` | Body text on light backgrounds |
| `--white` | `#FFFFFF` | Text on dark backgrounds |

### Typography

| Role | Font | Source |
|------|------|--------|
| Headings (`--fh`) | Secular One | Google Fonts |
| Body (`--fb`) | Heebo (300–900) | Google Fonts |

### Icons
Font Awesome 6.5.1 — loaded from cdnjs CDN (`all.min.css`).  
Used for: pain cards, process steps, FAQ toggles, footer social links.

### Layout
- RTL (`dir="rtl"`, `lang="he"`)
- CSS custom properties throughout
- CSS Grid for multi-column sections
- Float layout for mobile About section (intentional: keeps heading + lead beside image)
- IntersectionObserver for scroll-reveal animations

### Key asset
`Images/Assets/monk.webp` — used as favicon, nav icon (36×36), hero badge, footer image (90×90), and on thank-you / analytics pages.

---

## 5. Third-Party Integrations

### Formspree
- **What:** Processes the contact form, forwards submissions to email.
- **Form ID:** `xbdbnwwb`
- **Endpoint:** `https://formspree.io/f/xbdbnwwb`
- **Method:** AJAX fetch (not native form submit) — result is a redirect to `/thank-you/`
- **Hidden fields:** `_subject` = "ליד חדש מהאתר - טכנורוחניק", `_language` = "he"
- **Account:** orenknaan@gmail.com on formspree.io

### Google Analytics 4
- **Measurement ID:** `G-PQ99J1QETR`
- **Property ID:** `539942045`
- **Loaded via:** `gtag.js` on all public pages
- **Conversion event fired on:** `thank-you/index.html` page load (`main_form_submit` + `generate_lead`)
- **Account:** Google account orenknaan@gmail.com

### Google Fonts
- Secular One, Heebo — loaded with `preconnect` for performance
- No self-hosting; relies on Google CDN

### Font Awesome
- Version: 6.5.1
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`

### Google Identity Services (analytics dashboard only)
- **Purpose:** OAuth login for the private analytics dashboard
- **OAuth Client ID:** stored in `analytics/index.html` (lines ~348–349)
- **Scope:** `https://www.googleapis.com/auth/analytics.readonly`
- **Google Cloud project:** techspirit.co.il project
- Authorized origins must include `https://techspirit.co.il` in Google Cloud Console → Credentials

### WhatsApp
- All CTA buttons link to: `https://wa.me/972544757906?text=היי%20אורן%2C%20אני%20רוצה%20לעשות%20איתך%20פרויקט.`
- Pre-filled message reduces friction for cold leads

---

## 6. Analytics & Funnel Tracking

### Custom events (GA4)

| Event name | Trigger |
|-----------|---------|
| `section_pain` | Pain section enters viewport (30% threshold) |
| `section_process` | Process section enters viewport |
| `section_portfolio` | Portfolio section enters viewport |
| `section_testimonials` | Testimonials section enters viewport |
| `section_faq` | FAQ section enters viewport |
| `section_contact` | Contact section enters viewport |
| `cta_whatsapp_click` | Any WhatsApp button clicked |
| `main_form_submit` | Page load on `/thank-you/` |
| `generate_lead` | Page load on `/thank-you/` (currency: ILS, value: 1) |

### Custom dimension
`cta_location` — passed with `cta_whatsapp_click` events, contains the `section.id` of the closest section to the clicked button.  
**Must be registered** in GA4 Admin → Custom Definitions → Custom Dimensions for the WA breakdown in the dashboard to work.

### Analytics dashboard (`/analytics/`)
Private branded page (noindex). Features:
- Google Sign-In via OAuth (only listed test users can access)
- 7/30/90-day date range switcher
- Summary cards: visits, form submits, conversion rate, WA clicks
- 8-step funnel visualization with color-coded drop-off indicators
- WhatsApp clicks breakdown by page section
- Calls GA4 Data API directly from browser using the OAuth token

---

## 7. SEO — Current State

### Page: `/` (index.html)

| Element | Value |
|---------|-------|
| `<title>` | אתר לרוחך \| אורן כנען - הטכנורוחניק |
| Meta description | אתר שמדבר את השפה שלכם - לבעלי עסקים רוחניים, מטפלים ומנחות. בניית אתרים עם נשמה, על ידי אורן כנען - הטכנורוחניק. |
| `lang` / `dir` | `he` / `rtl` |
| Canonical | ✅ `https://techspirit.co.il/` |
| Open Graph | ✅ `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale` (he_IL), `og:site_name` |
| Twitter/X Card | ✅ `summary_large_image` — title, description, image |
| OG image | ✅ `Images/Assets/techspirit-social.jpg` (1200×630) |
| Structured data | ❌ not set |
| Robots | indexed (default) |

### Other pages

| Page | Robots | Rationale |
|------|--------|-----------|
| `/privacy/` | `noindex, nofollow` | Legal page, no SEO value |
| `/terms/` | `noindex, nofollow` | Legal page, no SEO value |
| `/thank-you/` | `noindex, nofollow` | Conversion page, must not be indexed |
| `/analytics/` | `noindex, nofollow` | Private tool |

### Technical
- ✅ HTTPS (JS redirect on all pages; hosting panel toggle recommended as backup)
- ✅ Mobile responsive
- ✅ Hebrew RTL declared
- ✅ Favicon set (monk.webp)
- ✅ `sitemap.xml` — `https://techspirit.co.il/` only; all `<loc>` entries use HTTPS
- ✅ `robots.txt` — `Allow: /`, `Disallow: /analytics/`, `Disallow: /thank-you/`, points to sitemap
- ✅ Google Search Console — Domain Property verified; sitemap submitted

---

## 8. SEO — Pending

### High priority

- [x] **`robots.txt`** — Allow `/`, disallow `/analytics/`, `/thank-you/`
- [x] **`sitemap.xml`** — Single-page site; `https://techspirit.co.il/` only; HTTPS enforced in all `<loc>` entries
- [x] **Google Search Console** — Domain Property verified; sitemap submitted; monitor Core Web Vitals
- [x] **Open Graph tags** — `og:title`, `og:description`, `og:image`, `og:url`, `og:locale` (he_IL)
- [x] **Canonical tag** — `<link rel="canonical" href="https://techspirit.co.il/">` on index
- [x] **Twitter/X Card** — `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [x] **OG image** — `techspirit-social.jpg` (1200×630) committed and live

### Medium priority

- [ ] **Structured data** — `LocalBusiness` schema on index: name, address, phone, URL, service area
- [ ] **FAQ schema** — JSON-LD on the FAQ accordion section
- [ ] **Alt text audit** — Ensure all portfolio and endorser images have descriptive Hebrew alt text
- [ ] **HTTPS at server level** — Enable hosting panel "Force HTTPS" toggle as backup to the JS redirect
- [ ] **NAP in footer** — Confirm name/phone/email in footer matches Google Business Profile exactly

### Lower priority

- [ ] **Page speed audit** — Run Lighthouse / PageSpeed Insights; target LCP < 2.5s
- [ ] **Image optimisation** — Convert remaining JPG/PNG portfolio images to WebP; add `loading="lazy"` and explicit dimensions
- [ ] **Self-host fonts** — Reduce Google Fonts dependency for privacy and speed
- [ ] **Google Business Profile** — Create and optimise for local Israeli searches
- [ ] **Israeli directory citations** — d.co.il, b144, xnet, zap (NAP must match exactly)
- [ ] **Hreflang** — Not needed yet (Hebrew-only site)

---

## 9. Deployment & Hosting

### Repository
- **GitHub:** `https://github.com/OrenKnaan/techspirit.co.il`
- **Branch:** `main` (production = main)
- **Workflow:** Edit locally → `git commit` → `git push` → live immediately

### Hosting
- Shared hosting (Israeli provider)
- Served as static HTML/CSS/JS — no build step, no framework
- No `.htaccess` support on current plan
- SSL certificate installed

### Local development
No build tooling. Open `index.html` directly in browser or use any static server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## 10. Roadmap

### In progress / planned
- [ ] **Lead magnet quiz** — "מה סוג הנוכחות הדיגיטלית שהעסק שלך צריך?" — personality quiz with email capture gate before results. Secondary CTA for visitors not ready to WhatsApp.
- [x] **SEO foundation** — robots.txt, sitemap.xml, canonical, Open Graph, Twitter Card, OG image, Search Console verified (see §8)
- [ ] **SEO next layer** — Structured data (LocalBusiness + FAQ schema), alt text audit, image optimisation (see §8)
- [ ] **Meta Pixel** — Placeholder ready in `thank-you/index.html`; activate when Pixel ID is available

### Owner info
**Oren Knaan** — עוסק פטור 038741278  
📞 054-4757906  
📧 oren@techspirit.co.il  
🌐 techspirit.co.il

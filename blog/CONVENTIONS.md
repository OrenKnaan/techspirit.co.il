# Blog Post Conventions — הטכנורוחניק

## File structure

Each post lives at `/blog/slug/index.html`.  
Future (unpublished) posts live at `/blog/future-posts/slug/`.  
Move to `/blog/slug/` when publishing; update `blog/index.html` and `sitemap.xml`.

Slug format: short Hebrew keyphrase, 2–4 words, hyphens, no stop-words.  
Example: `בחירת-בונה-אתרים` ✓ &nbsp; `איך-לבחור-בונה-אתרים-שמתאים-לך` ✗

---

## Head — required meta tags (in order)

```html
<meta charset="UTF-8">
<script>if(location.protocol==='http:')location.replace(...);</script>   <!-- https redirect -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[post title] | הטכנורוחניק</title>
<meta name="description" content="...">        <!-- 140–160 chars -->
<link rel="canonical" href="https://techspirit.co.il/blog/[slug]/">
<link rel="icon" type="image/webp" href="../../Images/Assets/monk.webp">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:url" content="https://techspirit.co.il/blog/[slug]/">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://techspirit.co.il/Images/Assets/techspirit-social.jpg">
<meta property="og:locale" content="he_IL">
<meta property="og:site_name" content="הטכנורוחניק">
<meta property="article:published_time" content="YYYY-MM-DD">
<meta property="article:modified_time" content="YYYY-MM-DD">
<meta property="article:author" content="אורן כנען">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://techspirit.co.il/Images/Assets/techspirit-social.jpg">
```

---

## Stylesheets & scripts

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="../blog.css">          <!-- shared styles -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-PQ99J1QETR"></script>
<script>window.dataLayer=...gtag('config','G-PQ99J1QETR');</script>
```

No inline `<style>` blocks. All shared CSS lives in `blog/blog.css`.

---

## JSON-LD schemas (3 blocks, in order)

### 1. BlogPosting
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "author": { "@type": "Person", "name": "אורן כנען", "url": "https://techspirit.co.il" },
  "publisher": {
    "@type": "Organization", "name": "הטכנורוחניק",
    "logo": { "@type": "ImageObject", "url": "https://techspirit.co.il/Images/Assets/monk.webp" }
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "url": "https://techspirit.co.il/blog/[slug]/",
  "inLanguage": "he",
  "image": "https://techspirit.co.il/Images/Assets/techspirit-social.jpg",
  "description": "..."   // same as meta description
}
```

### 2. FAQPage
13–14 Q&A items. Each `acceptedAnswer.text` must be plain text (no HTML).  
Questions = high-value Hebrew keyphrases people actually search.

### 3. BreadcrumbList
```json
{
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "בית", "item": "https://techspirit.co.il/" },
    { "@type": "ListItem", "position": 2, "name": "בלוג", "item": "https://techspirit.co.il/blog/" },
    { "@type": "ListItem", "position": 3, "name": "[og:title]", "item": "https://techspirit.co.il/blog/[slug]/" }
  ]
}
```

---

## HTML structure (body)

```
<header class="sh">  nav with logo + blog link + CTA button
<main>
  <div class="c"><nav class="bc2">  breadcrumb trail (visual)
  <article class="aw">
    <header class="ah">
      <div class="at">  category tag
      <h1 class="ah1">  title
      <div class="am">  date · read time · author
      <p class="al">  lead paragraph (lede)
    <div class="ab">  article body
      h2 sections, h3 subsections, p, ul, strong
      .q-card  for highlight boxes with numbered questions
      .hb  for tip/highlight boxes
    <section class="faq">
      <h2>שאלות ותשובות על …</h2>
      <details class="fi"> × 13–14 items (accordion)
    <div class="bio">  author bio
    <div class="cta">  CTA block → WhatsApp
    <section class="rel">  related posts (3 cards)
<footer>
```

---

## FAQ accordion

```html
<details class="fi">
  <summary>
    <span class="fq">Question text?</span>
  </summary>
  <div class="fa-wrap">
    <p class="fa-short">One-sentence answer.</p>
    <p class="fa-detail">Detailed paragraph, 3–5 sentences.</p>
  </div>
</details>
```

---

## Author bio

```html
<div class="bio">
  <img src="../../Images/Assets/monk.webp" alt="אורן כנען">
  <div>
    <h3>אורן כנען - הטכנורוחניק</h3>
    <p>בונה אתרים לעסקים רוחניים ומטפלים בישראל. [one sentence specific to this post's topic].</p>
  </div>
</div>
```

---

## CTA block

```html
<div class="cta">
  <h2>...</h2>
  <p>בניית אתרים לעסקים מודעים בישראל...</p>
  <a href="https://techspirit.co.il/#contact" class="btn">
    <i class="fab fa-whatsapp"></i>בואו נדבר
  </a>
</div>
```

Marketing copy uses **מודעים** (not רוחניים, not מטפלים).  
Author bios use **רוחניים ומטפלים בישראל** (factual description).

---

## Links

**Outbound** (2 per post): contextual, inline in body text. External authoritative sources only.  
Use `target="_blank" rel="noopener noreferrer"`.

**Inbound** (2 per post): contextual cross-links to other posts in `/blog/`.  
No `target="_blank"` for internal links.

**Related posts section** (.rel): 3 cards, links to canonical blog URLs.

---

## Dates

All dates must match in **4 places** when updated:
1. `article:published_time` OG meta
2. `article:modified_time` OG meta
3. `datePublished` / `dateModified` in BlogPosting JSON-LD
4. Visible date in `.am` header (`19 ביוני 2023` format)
5. `sitemap.xml` `<lastmod>`
6. `blog/index.html` posts array `date` field

---

## Publishing a future post

1. `mv blog/future-posts/[slug] blog/[slug]`
2. Update `blog/index.html` — add post object to `posts` array
3. Update `sitemap.xml` — add `<url>` entry
4. Update internal links in other posts if needed
5. Update `article:modified_time` to today's date
6. Submit URL to Google Search Console for indexing

---

## Writing style

- Short sentences. Active voice. First person.
- "איך" not "כיצד"
- No em-dashes. No corporate language. No "AI touch".
- No comments in HTML unless the WHY is non-obvious.

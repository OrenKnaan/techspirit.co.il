# Mobile UI Guidelines

Patterns and bugs found while fixing mobile layout/animation issues on this site. Use this as a checklist when adding new sections or touching existing ones.

## Viewport height: use `svh`, not `dvh`, for anything that must stay still

`100dvh` (dynamic viewport height) recalculates live as the mobile browser's address bar shows/hides during scroll. Any section sized with `height: 100dvh` or `min-height: 100dvh` will visibly grow and shrink as the user scrolls — it is not a one-time measurement.

- `100svh` (small viewport height) is locked to the smallest possible viewport (address bar visible) and never changes. Use it for full-screen mobile sections that must hold a constant size.
- `100lvh` (large viewport height) is the opposite — locked to the largest size (address bar hidden). Rarely what you want on mobile.
- Apply the `svh` override inside the mobile media query only; desktop browser chrome doesn't have this live-resize behavior, so `dvh`/`min-height` there is fine.

Fixed in: `#websites`, `#faq`.

## `@media (min-height: …)` queries can re-fire mid-scroll on mobile

Same root cause as above: `window.innerHeight` (and therefore the `height` media feature) changes as the address bar shows/hides. A cascade of `@media (min-height: Xpx)` rules used to progressively reveal more content on taller viewports (e.g. more FAQ items) will **re-evaluate during scroll on mobile**, causing content to appear/disappear and the section to visibly change height.

- This is a legitimate, useful pattern on desktop (responding to actual window resizes).
- On mobile it's a bug. Gate these rules with `and (min-width: 769px)` (or your desktop breakpoint) so they're inert on phones, and let mobile show a fixed default set instead. A manual "show more" button (driven by JS + inline `style.display`, not a CSS class) is unaffected by this gating and still works.

Fixed in: `#faq`'s `.faq-hidden` reveal cascade.

## Don't let `display:flex` rows silently clip — `overflow-x:hidden` hides the evidence

A flex row with no `flex-wrap` will overflow its container once enough items don't fit. If the page has a global `overflow-x: hidden` (common, to prevent unwanted horizontal scroll), the overflowing items are **silently clipped with no visual indication** — no scrollbar, nothing in DevTools jumps out. This is easy to ship unnoticed.

- Add `flex-wrap: wrap` to any flex row of variable-count items (nav links, tag lists, etc.) unless you've verified it always fits at the narrowest supported width.
- Remember `<ul>`/`<ol>` have a default `padding-inline-start` (~40px) and `margin` in most browsers. If a list is a flex/grid container, that padding eats into the available width and skews centering. Reset `margin`/`padding` explicitly on the list rather than relying on a global reset to have caught it.

Fixed in: footer `.f-links`.

## Fixed-position UI can overlap page content at scroll extremes

A `position: fixed` element (back-to-top button, sticky CTA, etc.) occupies a constant spot in the *viewport*, regardless of document length. If real content (e.g. a footer's last line) ever scrolls to land in that same screen region — which it will, by definition, once the user reaches the bottom of the page — the fixed element will sit on top of it.

- When adding a fixed element anchored to a screen edge, check what page content ends up underneath it at max scroll, especially on mobile where viewports are short.
- Fix by reserving clearance (extra padding) on the content side, sized to the fixed element's footprint (height + offset) plus a margin — not by guessing.

Fixed in: footer bottom padding vs. `#btt` back-to-top button.

## Two "mobile menus" can be two different elements — use that

Don't assume a mobile hamburger menu is the same `<ul>` as desktop nav with a CSS toggle. Check the actual HTML/JS first (`grep` for the click handler's target id). If the mobile menu is a genuinely separate DOM element, its link text, order, and styling can differ freely from desktop without any CSS trickery (`data-` attributes, duplicate spans, etc.) — just edit its markup directly.

Confirmed in: `#mob` (mobile full-screen menu) vs `.nav-links` (desktop nav) — entirely separate elements.

## Adding margin/rounded corners to a scroll-snap carousel slide

A horizontally-swiping `scroll-snap` carousel typically sizes each slide to exactly `flex: 0 0 100%; width: 100%` so one slide = one screen. If you naively add `margin` to give the image breathing room, the slide's box now exceeds 100% width, breaking the snap math (slides 2+ start landing off-screen).

Correct structure: keep the **outer slide element** at exactly 100% width as the scroll-snap unit, with `box-sizing: border-box` and symmetric `padding` (the padding *is* the margin, visually) and no radius/shadow/overflow-clipping on it. Put a **separate inner wrapper** around the image/overlay/link with `position: relative`, the `border-radius`, `overflow: hidden`, and `box-shadow`. Absolutely-positioned children (`inset: 0` overlays, full-card link targets) need to live inside that inner wrapper too, since `inset/absolute` resolves against the nearest positioned ancestor's padding box — if they stayed direct children of the padded outer slide, they'd ignore the padding and bleed back out to the edges.

Fixed in: `#websites` mobile carousel (`.port-item` outer + new `.port-card` inner).

## Timed reveal animations: re-check delays against *actual* mobile timing, not desktop's

When a desktop entrance sequence (hero monk → pulse → third eye → title, each with its own `animation-delay`) gets a simplified mobile variant for performance/simplicity (e.g. the eye riding the monk's own fade-in instead of a separate scaleY "opening" animation), any *other* element whose timing was synced to the desktop delay (e.g. a pulse ring meant to play "when the eye appears") will silently drift out of sync on mobile, because the mobile element it's supposed to match now fires at a different delay. Whenever you add a mobile-specific override for one animated element's timing, search for anything else whose delay was tuned to match it, and override that too.

Fixed in: `.monk-wrap::before` (pulse) delay re-synced to the third eye's mobile-specific delay after the eye's mobile animation/timing changed twice in this session.

## Fixed-background parallax: use `clip-path: inset(0)`, never `mask-image`

The "parallax window" trick — a `position:fixed` background inside an `overflow:hidden` or clipped wrapper — breaks on Safari if you clip the wrapper with `mask-image`.

**Why:** WebKit treats `mask-image` as creating a new **containing block**. A `position:fixed` child resolves against its containing block, not the viewport. The child then behaves like `position:absolute` relative to the masked ancestor, scrolling with the page and destroying the parallax.

**Fix:** Use `clip-path: inset(0)` on the wrapper instead. `clip-path` clips visually without creating a containing block, so `position:fixed` children correctly resolve against the viewport.

```css
/* Wrong — breaks position:fixed on Safari */
.img-div-bg-wrap { mask-image: linear-gradient(#000, #000); }

/* Correct */
.img-div-bg-wrap { clip-path: inset(0); }
```

The child keeps `position: fixed; inset: 0` on both desktop and mobile. No JS needed, no special mobile overrides.

Note: `overflow: hidden` on a scrolling parent also breaks `position:sticky` (it becomes the scroll container) — `clip-path` avoids that too.

## Preventing address-bar resize on `position:fixed` elements

`position: fixed; inset: 0` stretches the element from `top: 0` to `bottom: 0`, which tracks the **dynamic** viewport height. As the mobile browser's address bar shows/hides, `bottom: 0` moves and the element visibly grows/shrinks.

For the fixed-background parallax trick, the element must be tall enough to fill the screen at both address-bar states, but must **not animate** between them. Use:

```css
@media (max-width: 768px) {
  .img-div-bg {
    bottom: auto;           /* ignore bottom anchor */
    height: 100vh;          /* fallback */
    height: 100lvh;         /* = largest viewport (address bar hidden) — never shrinks */
  }
}
```

`100lvh` is a **fixed, one-time snapshot** of the largest possible viewport height. It is set once at load and never recomputes during scroll. The element is always tall enough to fill the screen regardless of address-bar state, and it never resizes mid-scroll.

Contrast with the first guideline (`svh` for static sections): use `svh` when you want the section sized to the *smallest* viewport (safest, no overflow). Use `lvh` only for fixed-position background elements that deliberately over-fill the viewport to avoid the resize dance.

## `background-size: cover` on a `100lvh`-tall fixed element over-crops on mobile

When the parallax background element is `height: 100lvh` (typically ~844px on an iPhone), `background-size: cover` computes scale against that full 844px tall box — even though the visible "window" into it is only the ~280px divider section. A wide landscape image gets scaled to fill 844px vertically, then cropped to the container width. On a narrow phone (390px wide) this means extreme horizontal crop: you see only a narrow center column of the image.

Fix by explicitly setting `background-size` on mobile to a value smaller than `cover` would produce:

```css
@media (max-width: 768px) {
  .img-div-bg {
    background-size: 180% auto; /* or experiment: 150%–250% depending on aspect ratio */
  }
}
```

`background-size: X% auto` sizes width to X% of the container width and height proportionally — completely independent of the 100lvh box height. Start around `180%–200%` and adjust per image. Use screenshots at multiple scroll positions to verify no gaps appear at the edges of the divider.

## Gate entrance animations with `animation-play-state` to prevent off-screen completion

On slow mobile connections, a hero section's entrance animations (logo fade-in, monk reveal, etc.) may **complete before the user sees them** — the images finish loading while the user is still above the fold, or the browser renders the keyframes during page load before paint. The hero plays through its 2-second animation in the background and the user arrives to find everything already settled.

Pattern: start all entrance animations paused, release them only when the key asset loads:

```css
/* Paused by default */
.hero-logo, .monk-wrap::before, h1.hero-t, .hero-tagline {
  animation-play-state: paused;
}
/* Released when ready */
html.hero-ready .hero-logo,
html.hero-ready .monk-wrap::before,
html.hero-ready h1.hero-t,
html.hero-ready .hero-tagline {
  animation-play-state: running;
}
```

```js
// Add class when hero image loads (or after timeout safety)
const logo = document.querySelector('.hero-logo');
const release = () => document.documentElement.classList.add('hero-ready');
if (logo.complete) { release(); } else {
  logo.addEventListener('load', release);
  logo.addEventListener('error', release);
  setTimeout(release, 4000);
}
```

Place the script immediately after the hero section's closing `</section>` tag (not in `<head>`, not deferred) so it executes as soon as the hero HTML is parsed.

## `animation` shorthand resets `animation-play-state` — use longhands when the gate matters

If an animation is externally gated (e.g. via `animation-play-state: paused` / `running` on a parent class), any mobile override that re-applies the `animation` **shorthand** will reset `animation-play-state` back to its default (`running`), silently bypassing the gate.

```css
/* Wrong — resets play-state to running, breaks the gate */
@media (max-width: 768px) {
  .hero-logo { animation: heroFadeIn 1.2s ease forwards; }
}

/* Correct — longhands only, play-state is left alone */
@media (max-width: 768px) {
  .hero-logo {
    animation-name: heroImgInMobile;
    animation-duration: 1.2s;
    animation-timing-function: ease;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
    /* animation-play-state: NOT set — inherited from the gate rule */
  }
}
```

The rule: any mobile override that changes animation timing or name **must** use longhands, not the shorthand, if `animation-play-state` is controlled elsewhere in the cascade.

## Prefer native CSS over JS for scroll-based effects on mobile

JavaScript scroll listeners (`requestAnimationFrame` + `window.scrollY`) run on the **main thread**. iOS momentum/inertia scroll runs on the **compositor thread**, which advances independently of JS. By the time the rAF fires, the scroll position has already moved further — creating visible lag/stutter on parallax or scroll-linked animations.

Order of preference:

1. **Pure CSS `position:fixed` + `clip-path: inset(0)` wrapper** — zero JS, zero lag, compositor-native. This is the right solution for the fixed-background parallax pattern.
2. **CSS scroll-driven animations** (`animation-timeline: view()`) — also compositor-native, no JS. Landed in Chrome 115, Safari 26. Gate with `@supports(animation-timeline: scroll())` for progressive enhancement. Avoid shipping this as the sole path while Safari 26 adoption is still low (2025–2026).
3. **JS + rAF** — last resort. Acceptable for one-shot effects that fire once and stop, not for continuous tracking during scroll.

The `position:fixed` approach for parallax backgrounds requires zero runtime JS and has no stutter by design — it was always the right solution once the `clip-path` containing-block fix was applied.

## Playwright headless Chromium cannot validate mobile-Safari-specific layout bugs

Playwright headless has no real browser chrome, so:

- `window.innerHeight`, `vh`, `dvh`, `lvh`, and `svh` are **all identical** — there is no address bar to show/hide. Calling `page.setViewportSize({height: 600})` causes `100lvh` to recompute to 600, not simulate an address bar state change.
- `clip-path` vs `mask-image` containing-block behavior is WebKit-specific. Chromium doesn't exhibit the bug, so a Playwright test will pass even with the broken `mask-image` version.

What Playwright can validly test on mobile:
- Visual layout at a narrow viewport (e.g. 390×844) — screenshot comparison
- Computed CSS values (`getComputedStyle`) to verify rules are applied
- Animation delays and keyframe structure
- Scroll-position-dependent layout (via `page.evaluate` + `scrollTo`)

For address-bar resize and WebKit-specific containing-block bugs, **test on a real device or BrowserStack** with Safari on iOS.

## Verifying mobile behavior

Visual screenshots from headless Chromium can't simulate the address bar collapsing — there's no real browser chrome to shrink. To verify a `dvh`-jitter fix, test the *symptom* instead: render the same page at two different viewport heights (e.g. 812px and 700px, standing in for "address bar hidden" vs "visible") and assert the thing that should be stable (item count, section height, computed `min-height`) is identical at both. For carousel/animation timing, read computed styles (`animationDelay`, `opacity`, `transform`) at specific `waitForTimeout` offsets rather than eyeballing screenshots alone — it's exact and catches off-by-one-keyframe mistakes screenshots won't.

# Arumaldo Design System

Single source of truth for colors, typography, spacing, components, and page patterns.
Use this file to generate any Arumaldo-branded page — proposals, demos, comparison pages, emails.

---

## 1. Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

| Role | Family | Weights |
|------|--------|---------|
| Headings, display, prices, logo | `Fraunces` serif | 400, 600, 700 — italic variant available |
| Body, labels, UI | `Inter` sans-serif | 400, 500, 600 |

**Rules**
- All `<h1>`, `<h2>`, `<h3>` headings → Fraunces
- All prices, stat numbers → Fraunces
- Logo wordmark → Fraunces, ~20px, letter-spacing -.2px
- Body copy, buttons, labels, form elements → Inter

---

## 2. Color Tokens

```css
:root {
  /* Brand palette */
  --cave:   #1A1F1C;   /* Primary dark — backgrounds, nav, dark sections */
  --green:  #3B5E3F;   /* Primary green — CTAs, accents, active states */
  --green2: #4D7A52;   /* Green hover state */
  --sun:    #C9980A;   /* Gold — prices, highlights, secondary CTA */
  --sun2:   #E8B420;   /* Gold hover state */

  /* Neutral / surface */
  --paper:  #F0EBDF;   /* Warm off-white — light section backgrounds */
  --paper2: #E2DDD0;   /* Warm grey — borders, dividers, subtle backgrounds */
  --ink:    #1A1F1C;   /* Same as cave — body text on light backgrounds */
  --ink2:   #3D4440;   /* Secondary text on light backgrounds */
  --muted:  #6B7370;   /* Tertiary text, footnotes, placeholder copy */
  --white:  #FFFFFF;   /* Pure white — card backgrounds */

  /* Derived / used in code */
  /* Footer background: #0f1411 (darker than cave) */
  /* Hero italic green: #83b588 (lighter green for italic in dark context) */
  /* Success/active tint: #e8f0e9 (very light green) */
  /* Error red: #c0392b */
  /* Error bg: #fef2f2 */
}
```

### Color Usage Rules

| Element | Color |
|---------|-------|
| Dark section background (hero, footer, nav) | `--cave` |
| Light section background | `--paper` or `--white` |
| Primary CTA button | `--green` bg, `--white` text |
| Primary CTA hover | `--green2` |
| Gold / price CTA button | `--sun` bg, `--cave` text |
| Gold hover | `--sun2` |
| Prices, stat numbers, highlights | `--sun` |
| Heading text on light bg | `--cave` |
| Heading text on dark bg | `--paper` |
| Body text on light bg | `--ink2` |
| Body text on dark bg | `rgba(240,235,223,.7)` |
| Muted / small print | `--muted` |
| Borders on light bg | `--paper2` |
| Borders on dark bg | `rgba(255,255,255,.1)` |
| Focus ring | `--green`, 2px solid, offset 3px |
| Error | `#c0392b` |
| Italic / accent in headings | `--green` (light bg) or `#83b588` (dark bg) |

---

## 3. Spacing & Shape Tokens

```css
:root {
  --r:    10px;                      /* Default border-radius */
  --rl:   16px;                      /* Large border-radius — cards, panels */
  --ease: cubic-bezier(.16,1,.3,1);  /* Spring easing — all transitions */
}
```

### Spacing Scale (multiples of 4)

| Token | Value | Use |
|-------|-------|-----|
| `4px` | `4px` | Micro gaps, icon padding |
| `8px` | `8px` | Tight gaps, badge padding |
| `12px` | `12px` | Inner card padding (small) |
| `16px` | `16px` | Default gap, heading margin-bottom |
| `20px` | `20px` | Component gap |
| `24px` | `24px` | Grid gap, section inner spacing |
| `28px–32px` | — | Card padding (medium) |
| `36px–40px` | — | Card padding (large) |
| `48px` | `48px` | Section horizontal padding (desktop) |
| `64px` | `64px` | Section padding (mobile) |
| `96px` | `96px` | Section padding (desktop) |
| `104px–120px` | — | Hero padding (desktop) |

### Container

```css
max-width: 1120px;
margin: 0 auto;
padding: 96px 48px; /* desktop */
padding: 64px 24px; /* mobile ≤768px */
```

---

## 4. Typography Scale

```css
/* Display / Hero H1 */
font-family: 'Fraunces', serif;
font-size: clamp(40px, 6.2vw, 76px);
line-height: 1.07;
color: var(--paper); /* on dark bg */

/* Section H2 headline */
font-family: 'Fraunces', serif;
font-size: clamp(28px, 3.5vw, 42px);
line-height: 1.14;
color: var(--cave);

/* Card H3 */
font-family: 'Fraunces', serif;
font-size: 19px–22px;
color: var(--cave);

/* Lead / subtitle */
font-family: 'Inter', sans-serif;
font-size: 17px–18px;
line-height: 1.7–1.72;
color: var(--ink2);

/* Body / description */
font-size: 14px–15px;
line-height: 1.6–1.65;
color: var(--ink2);

/* Small / meta */
font-size: 12px–13.5px;
color: var(--muted);

/* Eyebrow label */
font-size: 11px;
font-weight: 600;
letter-spacing: 1.3px;
text-transform: uppercase;

/* Stat number */
font-family: 'Fraunces', serif;
font-size: clamp(32px, 4vw, 48px);
line-height: 1;

/* Price */
font-family: 'Fraunces', serif;
font-size: 19px–21px;
color: var(--sun);
```

---

## 5. Component Library (CSS)

Paste this block into any Arumaldo-branded HTML page:

```css
/* ── Reset ───────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { font-family: 'Inter', sans-serif; background: #fff; color: #1A1F1C; line-height: 1.65; overflow-x: hidden; }
img, svg { display: block; max-width: 100%; }
a, button { cursor: pointer; }
:focus-visible { outline: 2px solid #3B5E3F; outline-offset: 3px; border-radius: 4px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}

/* ── Tokens ───────────────────────────────────────────── */
:root {
  --cave:#1A1F1C; --green:#3B5E3F; --green2:#4D7A52;
  --sun:#C9980A; --sun2:#E8B420;
  --paper:#F0EBDF; --paper2:#E2DDD0;
  --ink:#1A1F1C; --ink2:#3D4440; --muted:#6B7370; --white:#FFFFFF;
  --r:10px; --rl:16px; --ease:cubic-bezier(.16,1,.3,1);
}

/* ── Eyebrow ──────────────────────────────────────────── */
.eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--green); color: var(--white);
  font-size: 11px; font-weight: 600; letter-spacing: 1.3px;
  text-transform: uppercase; padding: 5px 12px; border-radius: 4px;
  margin-bottom: 20px;
}
.eyebrow.gold { background: var(--sun); color: var(--cave); }

/* ── Headlines ────────────────────────────────────────── */
h2.headline {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 3.5vw, 42px); line-height: 1.14;
  color: var(--cave); margin-bottom: 16px;
}
h2.headline em { font-style: italic; color: var(--green); }
.lead { font-size: 17px; color: var(--ink2); max-width: 560px; line-height: 1.7; }

/* ── Buttons ──────────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  text-decoration: none; font-family: 'Inter', sans-serif;
  font-weight: 600; font-size: 15px; border-radius: var(--r);
  padding: 13px 28px; border: none; cursor: pointer; line-height: 1;
  transition: background 180ms var(--ease), color 180ms var(--ease),
              transform 120ms var(--ease), box-shadow 180ms var(--ease);
}
.btn:active { transform: scale(.97); }
.btn-primary { background: var(--green); color: var(--white); }
.btn-primary:hover { background: var(--green2); }
.btn-gold { background: var(--sun); color: var(--cave); }
.btn-gold:hover { background: var(--sun2); }
.btn-ghost-dark { border: 1.5px solid rgba(255,255,255,.22); color: var(--paper); background: transparent; padding: 12px 26px; }
.btn-ghost-dark:hover { border-color: rgba(255,255,255,.5); background: rgba(255,255,255,.05); }
.btn-lg { padding: 15px 38px; font-size: 16px; }
.btn svg { width: 17px; height: 17px; flex-shrink: 0; }

/* ── Section ──────────────────────────────────────────── */
.section { max-width: 1120px; margin: 0 auto; padding: 96px 48px; }
.section-bg-paper { background: var(--paper); }
.section-bg-cave  { background: var(--cave); }

/* ── Card ─────────────────────────────────────────────── */
.card {
  background: var(--white); border: 1.5px solid var(--paper2);
  border-radius: var(--rl); padding: 36px 30px;
  transition: border-color 200ms, box-shadow 200ms, transform 180ms;
}
.card:hover { border-color: var(--green); box-shadow: 0 6px 24px rgba(59,94,63,.1); transform: translateY(-2px); }
.card.featured { border-color: var(--green); background: #f0f5f0; }
.card-dark { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: var(--rl); padding: 28px; }

/* ── Badge ────────────────────────────────────────────── */
.badge { background: var(--green); color: var(--white); font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; }
.badge.gold { background: var(--sun); color: var(--cave); }
.badge.muted { background: var(--paper2); color: var(--ink2); }

/* ── Icon box ─────────────────────────────────────────── */
.icon-box { width: 44px; height: 44px; background: var(--paper); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--green); flex-shrink: 0; }
.icon-box svg { width: 24px; height: 24px; }

/* ── Check list ───────────────────────────────────────── */
.check-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.check-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 13.5px; color: var(--ink2); }
.check-list li svg { color: var(--green); flex-shrink: 0; margin-top: 2px; width: 14px; height: 14px; }
.check-list.on-dark li { color: rgba(240,235,223,.75); }
.check-list.on-dark li svg { color: var(--green2); }

/* ── Price row ────────────────────────────────────────── */
.price-row { display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,.06); border-radius: var(--r); padding: 14px 18px; transition: background 180ms; }
.price-row:hover { background: rgba(255,255,255,.1); }
.price-row-label { font-size: 14px; color: var(--paper); font-weight: 500; }
.price-row-sub { font-size: 12px; color: rgba(240,235,223,.45); margin-top: 2px; }
.price-row-amount { font-family: 'Fraunces', serif; font-size: 21px; color: var(--sun); white-space: nowrap; }

/* ── Trust item ───────────────────────────────────────── */
.trust-item { display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 500; color: var(--ink2); }
.trust-item svg { color: var(--green); flex-shrink: 0; width: 16px; height: 16px; }

/* ── Two-col grid ─────────────────────────────────────── */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1120px; margin: 0 auto; padding: 96px 48px; }

/* ── Divider ──────────────────────────────────────────── */
.divider { border: none; border-top: 1px solid var(--paper2); margin: 0; }
.divider-dark { border-top-color: rgba(255,255,255,.08); }

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 1024px) {
  .two-col { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 768px) {
  .section { padding: 64px 24px; }
  .two-col { padding: 64px 24px; }
}
@media (max-width: 560px) {
  .card { padding: 24px; }
}
```

---

## 6. Comparison Page Pattern

This is the intended layout for the demo generation engine's **"Before vs. After"** comparison page. Each customer sees their current site (Before) alongside the Arumaldo-built version (After).

### Page Structure

```
┌─────────────────────────────────────────────────────────┐
│  NAV  — dark cave bar, Arumaldo logo left               │
├─────────────────────────────────────────────────────────┤
│  HERO  — dark cave bg                                   │
│  Eyebrow: "Your Website Transformation"                 │
│  H1: "[Business Name] — Before & After"                │
│  Subtext: "Here's what we're building for you."         │
│  CTA: "View Full Proposal →" (gold button)              │
├───────────────────┬─────────────────────────────────────┤
│  BEFORE           │  AFTER                              │
│  ─────────────    │  ──────────────────────────────     │
│  Screenshot /     │  Arumaldo demo (iframe or image)    │
│  description of   │                                     │
│  current site     │  Badges: Mobile-ready, Fast,        │
│                   │  Custom design, SEO-optimized        │
│  Weakness tags:   │                                     │
│  • Not mobile     │  Strength tags (green checks):      │
│  • No SSL         │  • Mobile-first                     │
│  • Template look  │  • SSL included                     │
│  • Slow load      │  • Custom design                    │
│                   │  • Built for conversion              │
├───────────────────┴─────────────────────────────────────┤
│  WHAT CHANGES — 3-column cards                          │
│  (Design  |  Performance  |  Content)                   │
├─────────────────────────────────────────────────────────┤
│  PACKAGE — which package, what's included               │
├─────────────────────────────────────────────────────────┤
│  CTA STRIP — dark bg, gold "Get Started" button         │
│  → links to proposal URL or payment link                │
└─────────────────────────────────────────────────────────┘
```

### Before Panel — Styling

```css
/* "Before" side — muted, faded, slightly degraded feel */
.before-panel {
  background: var(--paper);
  border: 1.5px solid var(--paper2);
  border-radius: var(--rl);
  padding: 28px;
  opacity: 0.85;
}
.before-label {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--paper2); color: var(--muted);
  font-size: 11px; font-weight: 600; letter-spacing: 1.2px;
  text-transform: uppercase; padding: 4px 10px; border-radius: 4px;
  margin-bottom: 16px;
}
.weakness-tag {
  display: inline-flex; align-items: center; gap: 6px;
  background: #fef2f2; color: #c0392b;
  font-size: 12px; font-weight: 500;
  padding: 4px 10px; border-radius: 20px;
  border: 1px solid #fcd5d5;
}
```

### After Panel — Styling

```css
/* "After" side — premium, vibrant, Arumaldo branded */
.after-panel {
  background: var(--white);
  border: 2px solid var(--green);
  border-radius: var(--rl);
  padding: 28px;
  box-shadow: 0 8px 32px rgba(59,94,63,.12);
}
.after-label {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--green); color: var(--white);
  font-size: 11px; font-weight: 600; letter-spacing: 1.2px;
  text-transform: uppercase; padding: 4px 10px; border-radius: 4px;
  margin-bottom: 16px;
}
.strength-tag {
  display: inline-flex; align-items: center; gap: 6px;
  background: #e8f0e9; color: var(--green);
  font-size: 12px; font-weight: 500;
  padding: 4px 10px; border-radius: 20px;
  border: 1px solid #c5d9c7;
}
```

### Comparison Split Layout

```css
.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 48px;
}
.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fraunces', serif;
  font-size: 28px;
  color: var(--muted);
  /* On mobile, show between panels */
}
@media (max-width: 768px) {
  .comparison-grid { grid-template-columns: 1fr; padding: 40px 24px; }
}
```

### URL Parameters for the Comparison Page

The demo generation engine should pass these params when rendering a comparison page:

| Param | Type | Example | Purpose |
|-------|------|---------|---------|
| `pid` | string | `ABC-001` | Proposal ID — shows in header |
| `name` | string | `Maria Garcia` | Customer first name |
| `biz` | string | `Garcia Law` | Business name |
| `lang` | `en` \| `es` | `es` | Language |
| `pkg` | `1p` \| `mp` | `mp` | Package (One-Page or Multi-Page) |
| `proposal_url` | URL | `https://...` | CTA links to this proposal |
| `demo_url` | URL | `https://...` | After panel shows this demo |
| `current_url` | URL | `https://...` | Before panel screenshot source |

---

## 7. SVG Icon Snippets (inline, no emoji)

These are the most-used icons across Arumaldo pages. Use `width` + `height` attributes; style with `color` via `currentColor`.

```html
<!-- Check / confirm -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="2.5 8 6.5 12 13.5 4"/>
</svg>

<!-- Arrow right -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="3" y1="8" x2="13" y2="8"/>
  <polyline points="9 4 13 8 9 12"/>
</svg>

<!-- X / close -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
  <line x1="4" y1="4" x2="12" y2="12"/>
  <line x1="12" y1="4" x2="4" y2="12"/>
</svg>

<!-- Warning / alert -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 2L14.5 13H1.5L8 2Z"/>
  <line x1="8" y1="7" x2="8" y2="10"/>
  <circle cx="8" cy="12" r=".5" fill="currentColor"/>
</svg>

<!-- Globe / website -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10" cy="10" r="8"/>
  <path d="M2 10h16M10 2a14 14 0 010 16M10 2a14 14 0 000 16"/>
</svg>

<!-- Mobile -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="5" y="2" width="10" height="16" rx="2"/>
  <line x1="10" y1="15" x2="10" y2="15" stroke-width="2" stroke-linecap="round"/>
</svg>

<!-- Lock / security -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="9" width="12" height="9" rx="2"/>
  <path d="M7 9V6a3 3 0 016 0v3"/>
</svg>

<!-- Lightning / fast -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="13 2 7 11 11 11 7 18"/>
</svg>
```

---

## 8. Page Shell Template

Minimal boilerplate for any new Arumaldo-branded HTML page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PAGE TITLE — Arumaldo</title>
  <meta name="robots" content="noindex" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

  <style>
    /* Paste full component CSS from Section 5 here */
  </style>
</head>
<body>

<!-- Nav -->
<nav style="position:sticky;top:0;z-index:200;background:rgba(26,31,28,.94);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.06);padding:0 48px;height:60px;display:flex;align-items:center;">
  <a href="https://arumaldo.com" style="font-family:'Fraunces',serif;font-size:20px;color:#F0EBDF;text-decoration:none;letter-spacing:-.2px;">Arumaldo</a>
</nav>

<!-- PAGE CONTENT HERE -->

<!-- Footer -->
<footer style="background:#0f1411;padding:28px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
  <span style="font-family:'Fraunces',serif;font-size:18px;color:#F0EBDF;">Arumaldo</span>
  <span style="font-size:12px;color:#2d3532;">© 2025 Arumaldo</span>
</footer>

</body>
</html>
```

---

## 9. Demo Engine Integration Notes

When generating a comparison page:

**"Before" content to collect / scrape from customer's current site:**
- Screenshot of homepage (full-width, above-the-fold crop + full-page)
- Domain URL
- Detected issues to surface as weakness tags: no SSL, not mobile-responsive, page speed score, generic template, outdated design, missing CTA, no contact form

**"After" content to inject:**
- `demo_url` → iframe embed or screenshot of the Arumaldo-built demo
- Package name and what's included
- Strength tags auto-generated from Arumaldo's standard deliverables

**Tone rules for generated copy:**
- Never disparage the customer's current site in harsh terms — use neutral language: "current site", "your existing presence"
- Weakness tags are factual (missing SSL, not mobile-optimized) not judgmental
- "After" copy is aspirational and specific to the business

**Language switching:**
All copy objects should have `en` and `es` keys. Render based on `?lang=` URL param, default `en`.

---

*Arumaldo · arumaldo.com · Design system v1*

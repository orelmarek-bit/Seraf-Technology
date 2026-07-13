# Seraf Technology — Project Handoff

> Context document for continuing this project in a new session. Read this first.

---

## 1. What this project is

A website for **Seraf Technology** — a **physical-security company** (NOT a generic IT
company) selling **autonomous mobile solar-powered surveillance towers** (models: BASIC,
BASIC SOLAR, PRO Lights). 15+ years, licensed technical security service, Slovakia.

- **Tagline:** "Každý pohyb pod kontrolou" / "Every movement under control".
- **Bilingual:** Slovak (default) + English via `next-intl`. Routes `/sk` and `/en`.
- **Location on disk:** `D:\CLAUDE AI\seraf-technology`
- **Design benchmark:** premium security-tech (Verkada/Flock) with Stripe/Linear/**Lucien** polish.

## 2. Tech stack

Next.js 15 (App Router, SSG) · TypeScript · Tailwind CSS · next-intl (SK/EN) · Framer Motion ·
Lucide icons · react-hook-form + zod (forms) · next-mdx-remote (blog) · self-hosted Google fonts.
Dark-only (`forcedTheme="dark"`).

## 3. There are TWO designs in this repo

### (A) Main site — DONE, deploy-ready
The original, fully-approved build at `/[locale]/…` (e.g. `/sk`, `/en`).
- Dark theme, **cyan accent** (`#22d3ee`), fonts **Space Grotesk** (display) + **Inter** (body).
- Pages: home, products (+ `[slug]` + compare), solutions (+ `[slug]`), how-it-works, why-seraf,
  references, blog (MDX + sample posts), quote, contact, legal (`[doc]`).
- Full SEO: per-locale metadata, canonical + hreflang, OG images, JSON-LD, sitemap, robots, favicon.
- Honest trust: no fabricated testimonials — placeholder "slots" only.
- Content in `src/content/*.ts` using a `pick(locale)` helper (each string written once with both
  languages inline). See `README.md` for deploy/handoff.
- **NOTE:** an earlier "How it works" scrollytelling was built then **removed** at the user's request.

### (B) `/v2` — Lucien-style variant — IN PROGRESS (current focus)
A parallel, separate homepage at `/[locale]/v2` (e.g. `/en/v2`), inspired by **lucien.com**.
Does NOT touch the main site. `robots: noindex`.

**Palette (Lucien):** navy `#080D2C` · blue `#5C9CFF` · white. Scoped via a `.theme-v2` class in
`globals.css` that overrides the token variables — so Tailwind utilities render in this palette on
this page only.

**Fonts (Lucien-matched):** `IBM Plex Sans` (body) + `IBM Plex Mono` (labels/eyebrows) — both exact
free matches — and **Hanken Grotesk** as a free stand-in for Lucien's paid *GT Planar* display face.
Defined in `src/lib/fonts.ts`, registered on `<html>` in the layout.
Helper utilities in `globals.css`: `.font-display-v2`, `.font-mono-v2`, `.text-gradient-v2`,
`.aurora-v2`, `.eyebrow-v2`, and `@keyframes v2-flow`.

**Global nav/footer are hidden on `/v2`** via `src/components/layout/chrome-gate.tsx` (returns null on
`/v2`); v2 renders its own nav/footer.

## 4. `/v2` structure & components (`src/components/v2/`)

Page: `src/app/[locale]/v2/page.tsx`
```
<div className="theme-v2">
  <NavV2/>            // minimal Lucien nav
  <IntroDoors/>       // auto-play logo-door intro overlay
  <HeroV2/>           // Lucien hero
  <section><SectionIntro .../></section>   // "How it works" eyebrow + headline
  <ScrollyCircle/>    // the circular "Threat Loop" HUD (the big one)
  <ComparisonV2/>     // Guards vs fixed CCTV vs Seraf tower table (comparison-v2.tsx)
  <ProductsV2/>       // 3 tower models + tower showcase w/ annotations (products-v2.tsx)
  <ApplicationsV2/>   // 6 use-cases / Využitie (applications-v2.tsx)
  <WhyV2/>            // stats band + 6 benefit pillars (why-v2.tsx)
  <FaqV2/>            // native <details> accordion (faq-v2.tsx)
  <ContactV2/>        // closing CTA + phone/email/LinkedIn (contact-v2.tsx)
  <FooterV2/>         // giant "SERAF" wordmark footer
</div>
```
**Content reuse:** the added sections consume the EXISTING bilingual getters from the main
site's content layer — `getProducts` (`content/products.ts`), `getSolutions`
(`content/solutions.ts`), `getPillars`/`getStats`/`getFaqs` (`content/home.ts`), and `SITE`
(`content/site.ts`). No content was re-authored; it's the same data as the original
seraftechnology.com site, re-skinned in the v2 palette. Product cards link to the main-site
`/products/[slug]` detail pages; the CTA links to `/quote` (those pages are still cyan-themed —
v2 re-skin of inner pages is not done yet).

- **nav-v2.tsx** — `→ About` left; centered logo + `SERAF TECHNOLOGY` wordmark (mono, tracked). Client;
  hidden during the intro, **fades in** on the `seraf-intro-open` window event; always visible on
  return visits / mobile. `z-50`. (The "Book a Demo" CTA was removed.)
- **hero-doors.tsx (`IntroDoors`)** — **auto-play "elevator doors" intro.** Shows only on the
  **first visit per session** (`sessionStorage['seraf-intro-seen']`), **desktop only** (≥768px),
  and not with reduced-motion. The **original logo (crisp vector)** is shown huge, split into two
  clipped door panels; the wordmark **"SERAF"** sits above the left half and **"TECHNOLOGY"** above
  the right half. After an 800 ms hold the halves **auto-slide apart** (inline CSS transition,
  `SLIDE_MS = 3600 ms`) to uncover the hero, then the overlay removes itself. Scroll is locked during
  the intro; dispatches `seraf-intro-open` when parting (nav listens). Return/mobile/reduced skip it.
- **hero-v2.tsx** — Lucien hero: aurora glow, huge **white→blue gradient headline** ("Every movement
  under control"), subline, and a cycling mono **SpecTicker** (spec-ticker.tsx).
- **section-intro.tsx** — Lucien signature: mono eyebrow in a thin box → vertical connector line →
  big light headline.
- **scrolly-circle.tsx** — the circular **"Threat Loop" HUD** (see §5).
- **footer-v2.tsx** — mono `→` links + a **giant "SERAF"** wordmark finale.

## 5. The "Threat Loop" HUD (`scrolly-circle.tsx`) — key detail

Recreation of a user-provided concept image (`public/Threat Loop.png`) as clean animatable layers,
in the navy/`#5C9CFF` palette. A **pinned scroll section (~420vh)** where a radar dial reveals **4
acts cumulatively** as you scroll: `reveal 0` (tower only) → 1 DEPLOY → 2 DETECT → 3 DETER → 4 RESPOND.
Progressive enhancement: desktop ≥1024px → pinned HUD; mobile/reduced-motion → static 4-card list.
**Loop semantics (user-confirmed 2026-07-13):** DEPLOY is a ONE-TIME act — its label is an
annotation above the tower, NOT part of the circle. The recurring loop is only the 3 acts:
DETECT (right, 0°) → DETER (bottom-left, 120°) → RESPOND (top-left, 240°), dividers at
60/180/300°, 3 clockwise arrows incl. RESPOND→DETECT closing the cycle.

- **Dial (SVG):** outer ring + 72 ticks; one faint inner ring; 4 diagonal **wedge dividers** (glow);
  4 **clockwise glowing arrows OUTSIDE the ring** (thin, small arrowheads, **solid** — the flowing-dash
  animation was removed), revealing per act.
- **DETECT radar:** a gradient **fan** filling the right wedge + **"motion-detector" waves** — 3 thin
  arcs that expand from centre outward (SMIL `animate` on `d`, Aliens-tracker style).
- **Centre:** dark platform disc + blue glow + a **volumetric spotlight cone from the tower/camera top**
  + a **lamp** at the camera reflector. The **tower starts DARK** (`brightness .5`) and **lights up**
  (`brightness 1.28`) at DEPLOY (reveal ≥ 1), with a CSS transition. Tower = `/hud/tower.png`.
- **Labels** (Space Grotesk bold) sit **outside the ring**, centred on each axis: DEPLOY/NASADENIE (top),
  DETECT/DETEKCIA (right, vertical), DETER/ODSTRAŠENIE (bottom), RESPOND/REAKCIA (left, vertical).
- **DEPLOY:** "24/7 · LIVE" pill (moved down to clear the ring) + lamp + cone.
- **DETECT:** "AI lock-on", "360°", walking-person silhouette inside cyan lock-on brackets, wolf
  silhouette + "filtered" pill. Both silhouettes are `h-14` (same size).
- **DETER:** "Siren shockwave", glowing "121 dB", expanding siren rings, running-person silhouette
  (`h-14`). (Stroboscopic flash was removed.)
- **RESPOND (top→bottom):** a vertical notification chain reflecting the real flow —
  "ALARM" label → ↓ arrow → operator avatar + PCO node ("PCO operator notified") → ↓ arrow →
  police shield + "158" ("Police alerted"). All labels bilingual. (Layout confirmed by the user
  2026-07-12: threat detected → PCO operator notified → operator calls police.)

## 6. Assets (`public/`)

- `logo.png` — real client logo, background-removed transparent (254×166; white poles + `#03A7C6`
  cameras). Used at nav size on both sites.
- `hud/logo-vector.svg` — **crisp auto-traced SVG of the original logo** (exact match, resolution-
  independent). Used for the giant intro. *(User decided to KEEP the original logo; new-logo concepts
  A/B/C were explored and dropped.)*
- `hud/tower.png` — the **real tower**, white background removed via luminance-key, real colours, transparent
  (237×1269). Used in the HUD centre. (`public/tower.png` in root is a stray white-bg version — do NOT use.)
- `hud/person-walk.png`, `hud/person-run.png`, `hud/wolf.png` — silhouettes (AI-generated black-on-white,
  keyed to white-on-transparent for the dark theme).
- `Threat Loop.png` — the concept image the HUD is based on. `tower real.png` — a raw provided tower.

## 7. GOTCHAS — read before editing (these cost real time)

1. **Tailwind arbitrary `duration-[Xms]` may not compile** → animation silently falls back to ~150 ms.
   Use **inline `style={{ transition }}`** for critical durations (this is why the intro was "too fast").
2. **Framer Motion `x`/`y`/`scale`/`rotate` overrides Tailwind `-translate-*` centering** (same `transform`).
   Put positioning translate on a **static wrapper**, animate the inner element (or centre via flex /
   negative margins).
3. **NEVER `npm run build` while the dev server is running** → corrupts `.next` (vendor-chunks
   MODULE_NOT_FOUND). Stop server, `rm -rf .next`, then build.
4. **Static export** (`out/`) is gated behind `BUILD_STATIC=true` in `next.config.mjs`. Before exporting
   you must temporarily move aside: `src/middleware.ts`, `src/app/[locale]/opengraph-image.tsx`,
   `src/app/manifest.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/[locale]/[...rest]/`
   (they can't be statically exported), then restore. Recreate `out/index.html` (redirect to `./sk/`).
5. **Middleware matcher** must exclude `icon|opengraph-image|sitemap|robots|manifest` or i18n 404s them.
6. **Image processing:** `sharp` is installed. Run offline node scripts with
   `NODE_PATH="D:/CLAUDE AI/seraf-technology/node_modules"`. Techniques used: **edge flood-fill**
   (photos whose dark interior resembles the bg — e.g. towers), **luminance key** (flat colour on light
   bg — e.g. the white-bg tower & silhouettes), **relative color-key** (flat 2-colour logo). `potrace`
   was used to vectorize the logo, then uninstalled.
7. **In-app Browser pane was flaky this session** (screenshot renderer + safety classifier timed out).
   Verified via DOM/console checks + `sharp`-rendered PNG previews read back with the Read tool. The
   **user reviews live** in their own browser.

## 8. Running & servers

- **Dev:** `npm install` then `npm run dev` → `http://localhost:3000` (redirects to `/sk`).
  - Main site: `/sk`, `/en`. Variant: `/sk/v2`, `/en/v2`.
  - Preview-server name in `.claude/launch.json`: **`seraf-next`** (port 3000).
- **Intro replays once per session** — to re-watch it: open a **new tab**, or run
  `sessionStorage.removeItem('seraf-intro-seen')` in the console and reload.
- **Static review bundle:** `seraf-review` server = `python -m http.server 8788 --directory out`.
- **Deploy:** Vercel (see `README.md`). Env: `NEXT_PUBLIC_WEB3FORMS_KEY` (form), `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
  (cookieless analytics).

## 9. Checkpoints (git)

Repo is initialized in `seraf-technology/`.
- Tag **`test1`** = state before the recent v2 changes.
- Tag **`test2`** = v2 intro + HUD.
- Tag **`v3`** = v2 homepage with full content sections (user-requested checkpoint, 2026-07-12).
  After v3: conversion quick wins (nav CTA + locale switcher, hero CTA pair, trust strip,
  2s skippable intro, clickable app cards), self-hosted licence PDF (`public/docs/`),
  v2-themed quote page at `/v2/quote` (all v2 CTAs point there), RESPOND chain fix.
  Restore with `git reset --hard <tag>`.

## 10. Open items / next steps

- **The v2 world is now complete and self-contained.** Inner pages exist under `/v2/*`:
  `products/[slug]`, `solutions/[slug]`, `why-seraf`, `contact`, `legal/[doc]`, `quote` —
  all built on `ShellV2` + `PageIntroV2` (`src/components/v2/shell-v2.tsx`), all `noindex`,
  all reusing the shared bilingual content getters. Every v2 link (nav, footer, cards, CTAs)
  stays inside `/v2/*`. The old cyan main site remains untouched at the root paths.
- **DEV-SERVER GOTCHA (recurring this session):** preview-managed dev servers die between
  turns; repeated kills mid-write corrupt `.next` → every route 500s with
  `SyntaxError: Unexpected non-whitespace character after JSON` from manifest reads.
  Fix: stop server, `rm -rf .next`, restart, then warm routes **sequentially** (parallel
  fetch storms on a cold server also trigger manifest read/write races on Windows).
- **Logo:** keep the **original** (confirmed). Vectorized copy at `hud/logo-vector.svg`.
- **RESPOND** act layout came from an ambiguous request — confirm/adjust with the user.
- Pending fine-tuning the user may want: intro logo/wordmark size & spacing, HUD spacing, act pacing,
  tower brightness, arrow/label sizes.
- **True 3D** (Lucien uses Cinema 4D) is not feasible here; the tower uses a "2.5D" photo + glow
  treatment. A rotatable/morphing 3D tower would need a 3D artist → render an image sequence; the HUD
  could be adapted to play such a sequence later.
- Nothing has been visually signed-off this session (screenshots were unavailable) — **have the user
  eyeball `/en/v2` and the HUD** and collect the next round of tweaks.

## 11. Lucien.com reference (for the v2 direction)

AI-security site by studio BRIGHTSCOUT; Webflow + Figma + Cinema 4D; Awwwards Honorable Mention.
- Colours `#080D2C` navy / `#5C9CFF` blue / white. Fonts **GT Planar** (display, light weight, huge,
  1:1 leading) + **IBM Plex Sans** (body) + **IBM Plex Mono** (mono eyebrows/labels/specs).
- Signatures: mono eyebrow-in-a-box + connector line + big light headline; crisp white pill CTA; C4D
  3D chip on blue aurora glows; **pinned scroll sections**; annotated product-dashboard; **giant footer
  wordmark**; gradient (white→blue) text. We adopt the *system*, not a pixel copy.

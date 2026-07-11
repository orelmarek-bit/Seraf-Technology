# Seraf Technology — Website

A premium, bilingual (Slovak / English) marketing site for **Seraf Technology** — autonomous mobile surveillance towers with AI cameras, solar power and 24/7 monitoring.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and Lucide icons. Fully static (SSG), first-class light **and** dark themes, SEO-ready.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Quick start (local)](#quick-start-local)
3. [Environment variables](#environment-variables)
4. [Making the form send for real (Web3Forms)](#making-the-form-send-for-real-web3forms)
5. [Analytics](#analytics)
6. [Deploying to Vercel](#deploying-to-vercel)
7. [Connecting the domain](#connecting-the-domain)
8. [Editing content](#editing-content)
9. [Project structure](#project-structure)
10. [Pre-launch checklist](#pre-launch-checklist)

---

## Tech stack

| | |
|---|---|
| Framework | **Next.js 15** (App Router, SSG) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** (semantic design tokens, light + dark) |
| i18n | **next-intl** — Slovak (default) + English, routes `/sk` and `/en` |
| Animation | **Framer Motion** (respects `prefers-reduced-motion`) |
| Icons | **Lucide** |
| Forms | **react-hook-form** + **zod** validation, delivered via **Web3Forms** |
| Blog | **MDX** via `next-mdx-remote` |
| Fonts | **Space Grotesk** (display) + **Inter** (body), self-hosted via `next/font` |

---

## Quick start (local)

Requirements: **Node.js 18.18+** (Node 20+ recommended) and npm.

```bash
npm install
cp .env.example .env.local   # then fill in values (optional for local dev)
npm run dev                  # http://localhost:3000  (redirects to /sk)
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # lint
```

> The site defaults to Slovak. English is at `/en`. Use the language switcher (top-right) to toggle.

---

## Environment variables

See [`.env.example`](./.env.example). All are **optional** — the site builds and runs without them (the form falls back to a demo mode, analytics stays off).

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Makes the quote/contact form actually send email. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables cookieless Plausible analytics for the given domain. |

Add these in **Vercel → Project → Settings → Environment Variables** for Production (and Preview if desired).

---

## Making the form send for real (Web3Forms)

The quote form is wired but **not connected to a real inbox by default** (it simulates a successful send so you can demo it).

To make it send:

1. Go to **https://web3forms.com** and create a free access key, using the receiving inbox **info@seraftechnology.com**.
2. Set `NEXT_PUBLIC_WEB3FORMS_KEY=<your-key>` in `.env.local` (local) and in Vercel (production).
3. Redeploy. Submissions now arrive by email at that inbox.

Fields captured: name, company, email, phone, use case, site location, number of towers/area, message.

> Want a different provider later (e.g. Resend)? Only `src/components/blocks/quote-form.tsx` needs changing — the UI stays identical.

---

## Analytics

Cookieless **Plausible** is pre-wired and inert until configured (so no cookie banner is required):

1. Add your site at **https://plausible.io**.
2. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=seraftechnology.com` in Vercel.
3. Redeploy.

Prefer **Vercel Analytics**? Run `npm i @vercel/analytics` and render `<Analytics />` from `@vercel/analytics/next` inside `src/components/analytics.tsx`.

---

## Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In **Vercel → Add New → Project**, import the repo. Framework preset **Next.js** is auto-detected — no build settings to change.
3. Add environment variables (see above).
4. **Deploy.** Every push to the main branch redeploys automatically; pull requests get preview URLs.

No server or database is required — the whole site is statically generated.

---

## Connecting the domain

1. In **Vercel → Project → Settings → Domains**, add `seraftechnology.com` (and `www.seraftechnology.com`).
2. Follow Vercel's DNS instructions at your registrar (either point the `A`/`CNAME` records to Vercel, or switch nameservers).
3. Vercel provisions HTTPS automatically.

> **Important:** the canonical URL, sitemap, robots and JSON-LD all read from `SITE.url` in [`src/content/site.ts`](./src/content/site.ts). It is already set to `https://seraftechnology.com`. If you deploy to a different domain, update it there.

---

## Editing content

Almost all copy lives in typed content modules under [`src/content/`](./src/content/) — each string is written **once** with both languages inline using a `pick(locale)` helper, so translations never drift.

| File | What it holds |
|---|---|
| `site.ts` | Company constants — phone, email, LinkedIn, domain |
| `home.ts` | Hero stats, how-it-works steps, "why" pillars, FAQs |
| `products.ts` | The three towers (name, features, specs) |
| `solutions.ts` | The six use cases |
| `blog.ts` | Blog posts (MDX body, bilingual) |
| `legal.ts` | Privacy / Cookies / Terms placeholder text |
| `messages/{sk,en}.json` | Navigation, footer, and form labels |

To add a **blog post**: add an entry to the array in `src/content/blog.ts` (both languages) — it appears automatically in the listing and sitemap.

---

## Project structure

```
src/
├─ app/
│  ├─ [locale]/            # all pages (sk, en)
│  │  ├─ layout.tsx        # html, providers, navbar/footer, metadata, JSON-LD
│  │  ├─ page.tsx          # home
│  │  ├─ products/ …       # overview, [slug], compare
│  │  ├─ solutions/ …      # overview, [slug]
│  │  ├─ how-it-works, why-seraf, references, quote, contact
│  │  ├─ blog/ …           # listing + [slug] (MDX)
│  │  ├─ legal/[doc]/      # privacy, cookies, terms
│  │  ├─ not-found.tsx     # localized 404
│  │  └─ opengraph-image.tsx
│  ├─ sitemap.ts, robots.ts, manifest.ts, icon.tsx
│  └─ globals.css          # design tokens (light + dark)
├─ components/
│  ├─ ui/                  # Button, Badge, Input, Accordion, …
│  ├─ blocks/              # ProductCard, CompareTable, QuoteForm, HomeHero, …
│  ├─ layout/              # Navbar, Footer, Section
│  └─ seo/                 # JSON-LD helper
├─ content/               # all site copy (see above)
├─ i18n/                  # next-intl routing + request config
├─ lib/                   # seo, schema, fonts, utils
└─ middleware.ts          # locale routing
```

---

## Pre-launch checklist

- [ ] **Logo** — the header/footer logo in `src/components/brand/logo.tsx` is a clean SVG recreation. Replace it with the client's official asset if available.
- [ ] **Imagery** — the design is illustration/abstract-led and needs no photos, but the Solutions/References areas are ready for real deployment photos when available.
- [ ] **Web3Forms key** set in Vercel, and a **test submission** confirmed arriving at info@seraftechnology.com.
- [ ] **Analytics** domain set (if desired).
- [ ] **Legal pages reviewed by a lawyer** — Privacy, Cookies and Terms currently contain clearly-marked placeholder text (`src/content/legal.ts`).
- [ ] **Real references / case studies** added to `src/content/blog.ts` and the References page when clients consent (no fabricated testimonials are shipped).
- [ ] **Domain** connected and HTTPS active.
- [ ] Re-run `npm run build` to confirm a clean production build.

---

Created with care — modern, fast, accessible, and bilingual by design.

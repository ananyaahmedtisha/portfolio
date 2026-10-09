# Ananya Ahmed Tisha — Cinematic Bioscience Portfolio

Next.js 14 (App Router) + Tailwind + Framer Motion + Supabase CMS. Photo-centric, 9:16 sci-cinema, fully editable from hidden `/admin`.

## Quick start

```cmd
cd ananya-tisha-portfolio
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000 · CMS at http://localhost:3000/admin

Without Supabase env vars the site runs on real fallback data in `lib/siteData.js` — design review never blocks.

## Connect Supabase (5 min)

1. Create project at supabase.com → copy URL + anon key into `.env.local` (see `.env.example`).
2. SQL Editor → run `supabase/schema.sql`, then `supabase/seed.sql` (injects all CV data: 7 experiences, 4 projects, 7 achievements, 6 portfolio placeholders, 22 skills).
3. Storage → create public buckets `portfolio-media` + `resumes`. Uncomment storage policies at bottom of schema.sql and run them.
4. Authentication → Add user (Tisha's email + password) → sign in at `/admin`.
5. In Admin → Media tab upload: portrait, 9:16 MP4s, poster scans, resume PDF → paste URLs into Profile/Portfolio rows → Save. Live instantly.

## What's editable from /admin

Profile/hero/bio/contact/CGPA, Experiences timeline, Projects, Portfolio (image/video + category filter), Achievements, Skills (4 groups incl. Research Interests), Inbox (contact messages), Media uploads, Resume URL.

## Deploy on Vercel

Import this folder as project root → add `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Deploy.

## Animations included

Microbe canvas field, fluid gradient hero, scroll parallax + reveal, macro-zoom hovers, marquee, masonry stagger, timeline draw, lightbox, custom 9:16 video cards.

## Suggested next upgrades (my recommendations)

1. **Lab Notebook blog** (`posts` table + MDX) — gut-microbiome explainers boost SEO + show writing.
2. **Ask-my-research chatbot** — RAG over bio/publications for recruiters.
3. **FoodSense live embed** — iframe + status badge from foodsensebd.vercel.app.
4. **ORCID / Google Scholar auto-sync** — cron pulls publications into CMS.
5. **CV download tracking** — count resume clicks in Supabase for impact metrics.
6. **Bilingual toggle (EN/BN)** — AMR outreach content in Bangla widens reach.
7. **QR resume + NFC card** — point posters/exhibitions to `/?utm=poster`.

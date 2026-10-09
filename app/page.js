'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Download, Briefcase, GraduationCap, Award, Camera, PenLine, FolderKanban, Sparkles } from 'lucide-react';
import { PROFILE as FB_PROFILE, PORTFOLIO as FB_PORTFOLIO, EXPERIENCES as FB_EXP, PROJECTS as FB_PROJ, ACHIEVEMENTS as FB_ACH, BLOG_POSTS as FB_BLOG } from '@/lib/siteData';
import { getSupabaseBrowser } from '@/lib/supabaseClient';
import { SectionHead, fadeUp } from '@/components/ui';
import { MovingGallery } from '@/components/MovingGallery';

function MicrobeField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, raf;
    const dots = [];
    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 24; i++) {
      dots.push({
        x: Math.random(), y: Math.random(),
        r: 6 + Math.random() * 26,
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0006,
        hue: Math.random() > 0.5 ? '32,178,170' : '15,48,87',
        a: 0.08 + Math.random() * 0.14,
      });
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < -0.1) d.x = 1.1; if (d.x > 1.1) d.x = -0.1;
        if (d.y < -0.1) d.y = 1.1; if (d.y > 1.1) d.y = -0.1;
        const x = d.x * w, y = d.y * h, r = d.r * devicePixelRatio;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${d.hue},${d.a + 0.12})`);
        g.addColorStop(1, `rgba(${d.hue},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    }
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

const SEGMENTS = [
  { href: '/academic', icon: GraduationCap, t: 'Academic Background', d: 'Education from school to university.' },
  { href: '/experience', icon: Briefcase, t: 'Professional Experience', d: 'Internships, leadership and community service.' },
  { href: '/projects', icon: FolderKanban, t: 'Projects & Publications', d: 'FoodSense, science animation and editorials.' },
  { href: '/achievements', icon: Award, t: 'Awards & Recognition', d: 'Posters, photography, art and writing.' },
  { href: '/blog', icon: PenLine, t: 'Writings & Reflections', d: 'Essays on microbiology and beyond.' },
  { href: '/gallery', icon: Camera, t: 'Curated Gallery', d: 'Selected photography, art and design work.' },
];

const FOCUS_AREAS = ['Food Microbiology', 'AMR Awareness', 'Dairy Fermentation', '3D Science Animation', 'Public Health'];

function Typewriter() {
  const [text, setText] = useState('');
  useEffect(() => {
    let word = 0, char = 0, deleting = false, timer;
    function step() {
      const current = FOCUS_AREAS[word];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(step, 1600);
          return;
        }
        timer = setTimeout(step, 55);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          word = (word + 1) % FOCUS_AREAS.length;
          timer = setTimeout(step, 350);
          return;
        }
        timer = setTimeout(step, 28);
      }
    }
    timer = setTimeout(step, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <span>
      <span className="font-bold text-seafoam-dark">{text}</span>
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-seafoam-dark align-middle" />
    </span>
  );
}

export default function Home() {
  const [profile, setProfile] = useState(FB_PROFILE);
  const [portfolio, setPortfolio] = useState(FB_PORTFOLIO);
  const [exp0, setExp0] = useState(FB_EXP[0]);
  const [proj0, setProj0] = useState(FB_PROJ[0]);
  const [ach0, setAch0] = useState(FB_ACH[0]);

  useEffect(() => {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    (async () => {
      try {
        const { data: prof } = await sb.from('profile').select('*').order('created_at').limit(1).maybeSingle();
        if (prof) {
          setProfile((p) => ({
            ...p,
            full_name: prof.full_name || p.full_name,
            tagline: prof.tagline || p.tagline,
            bio: prof.bio || p.bio,
            portrait_url: prof.portrait_url || prof.hero_image_url || p.portrait_url,
            resume_url: prof.resume_url || '',
            university: prof.university || p.university,
            cgpa: prof.cgpa ?? p.cgpa,
          }));
        }
        const { data: port } = await sb.from('portfolio_items').select('*').order('sort_order');
        if (port && port.length) {
          setPortfolio(port.map((x) => ({
            id: x.id, title: x.title, category: x.category, media_type: x.media_type,
            media_url: x.media_url, description: x.description, year: x.year,
            show_on_home: x.show_on_home !== false,
          })));
        }
        const { data: exps } = await sb.from('experiences').select('*').order('sort_order').limit(1);
        if (exps?.length) setExp0({ role: exps[0].role, organization: exps[0].organization, description: exps[0].description, id: exps[0].id });
        const { data: projs } = await sb.from('projects').select('*').order('sort_order').limit(1);
        if (projs?.length) setProj0({ title: projs[0].title, description: projs[0].description, id: projs[0].id });
        const { data: achs } = await sb.from('achievements').select('*').order('sort_order').limit(1);
        if (achs?.length) setAch0({ title: achs[0].title, description: achs[0].description, id: achs[0].id });
      } catch {}
    })();
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      {/* HERO */}
      <section className="hero-gradient relative overflow-hidden rounded-[2rem] border border-white/60 p-7 shadow-blue-soft md:p-12 dark:border-white/10">
        <MicrobeField />
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-drift rounded-full bg-seafoam/20 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="inline-flex items-center gap-2.5 rounded-full border border-deepsea/15 bg-white/70 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-deepsea/80 dark:border-white/15 dark:bg-white/10 dark:text-white/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-seafoam opacity-60" />
                <span className="h-2.5 w-2.5 rounded-full bg-seafoam-dark" />
              </span>
              Open to Opportunities · Dhaka, Bangladesh
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-display mt-5 text-4xl font-extrabold leading-[1.04] md:text-6xl">
              Ananya Ahmed <span className="bg-gradient-to-r from-seafoam-dark to-seafoam bg-clip-text text-transparent">Tisha</span>
            </motion.h1>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="font-display mt-4 space-y-1 text-base font-bold md:text-lg">
              <p>{profile.degree} · {profile.university}</p>
              <p>Millennium Fellow · Project Manager & Science Communicator</p>
            </motion.div>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="tjustify mt-4 max-w-2xl leading-relaxed text-deepsea/70">{profile.bio}</motion.p>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-4 text-[15px] text-deepsea/75">
              <span className="mr-2 inline-block text-seafoam-dark">▸</span>
              Exploring: <Typewriter />
            </motion.p>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={5} className="mt-3 text-sm font-medium text-deepsea/55">
              {profile.university} · {profile.degree}
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6} className="mt-6 flex flex-wrap gap-3">
              {profile.resume_url ? (
                <a href={profile.resume_url} target="_blank" className="rounded-full bg-deepsea px-6 py-3 font-display text-sm font-bold text-white shadow-blue-soft transition hover:-translate-y-0.5 hover:bg-seafoam-dark">
                  Download CV ↓
                </a>
              ) : (
                <Link href="/contact" className="rounded-full bg-deepsea px-6 py-3 font-display text-sm font-bold text-white shadow-blue-soft transition hover:-translate-y-0.5 hover:bg-seafoam-dark">
                  Download CV ↓
                </Link>
              )}
              <Link href="/contact" className="rounded-full border border-deepsea/25 px-6 py-3 font-display text-sm font-bold transition hover:-translate-y-0.5 hover:border-seafoam hover:text-seafoam-dark dark:border-white/25">
                Contact Me
              </Link>
              <a href={`https://${profile.linkedin}`} target="_blank" className="rounded-full border border-deepsea/25 px-6 py-3 font-display text-sm font-bold transition hover:-translate-y-0.5 hover:border-seafoam hover:text-seafoam-dark dark:border-white/25">
                LinkedIn ↗
              </a>
              <a href={`mailto:${profile.email}`} className="rounded-full border border-deepsea/25 px-6 py-3 font-display text-sm font-bold transition hover:-translate-y-0.5 hover:border-seafoam hover:text-seafoam-dark dark:border-white/25">
                Email ↗
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mx-auto w-full max-w-[320px]">
            <div className="glass overflow-hidden rounded-[2rem] p-2.5 shadow-blue-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.portrait_url} alt={profile.full_name} className="aspect-[4/5] w-full rounded-[1.6rem] object-cover" />
            </div>
            <div className="mt-4 text-center">
              <a href={`mailto:${profile.email}`} className="font-display block truncate text-sm font-bold transition hover:text-seafoam-dark">{profile.email}</a>
              <a href={`tel:${profile.phone}`} className="mt-1 block text-sm text-deepsea/60 transition hover:text-seafoam-dark">{profile.phone}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl font-extrabold md:text-2xl">Selected Work</h2>
          <Link href="/gallery" className="flex items-center gap-1 text-sm font-bold text-seafoam-dark hover:underline">View Gallery <ArrowUpRight size={15} /></Link>
        </div>
        <div className="glass rounded-3xl p-4 shadow-card">
          <MovingGallery items={portfolio} />
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="mt-12">
        <SectionHead kicker="Portfolio" title="Explore the Portfolio" sub="Six collections spanning research, creativity and communication." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTS.map((s, i) => (
            <motion.div key={s.href} variants={fadeUp} initial="hidden" whileInView="show" custom={i % 3} viewport={{ once: true }}>
              <Link href={s.href} className="glass macro-zoom group block rounded-3xl p-7 shadow-card transition hover:-translate-y-1.5 hover:shadow-blue-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-seafoam-pale text-seafoam-dark transition group-hover:scale-110 group-hover:bg-seafoam group-hover:text-white"><s.icon /></span>
                <span className="font-display mt-4 block text-lg font-extrabold">{s.t}</span>
                <span className="mt-1 block text-sm text-deepsea/65">{s.d}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-seafoam-dark">View <ArrowUpRight size={15} /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          { k: 'Experience', href: `/experience/${exp0.id}`, label: `${exp0.role} · ${exp0.organization}`, d: exp0.description },
          { k: 'Project', href: `/projects/${proj0.id}`, label: proj0.title, d: proj0.description },
          { k: 'Recognition', href: `/achievements/${ach0.id}`, label: ach0.title, d: ach0.description },
        ].map((c, i) => (
          <motion.div key={c.href} variants={fadeUp} initial="hidden" whileInView="show" custom={i} viewport={{ once: true }}>
            <Link href={c.href} className="glass block h-full rounded-3xl p-6 shadow-card transition hover:-translate-y-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-seafoam-dark">{c.k}</p>
              <p className="font-display mt-2 font-extrabold">{c.label}</p>
              <p className="mt-1 line-clamp-2 text-sm text-deepsea/65">{c.d}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-seafoam-dark">View Details <ArrowUpRight size={15} /></span>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* BLOG TEASER */}
      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl font-extrabold md:text-2xl">Latest Writings</h2>
          <Link href="/blog" className="flex items-center gap-1 text-sm font-bold text-seafoam-dark hover:underline">All Writings <ArrowUpRight size={15} /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {FB_BLOG.map((b, i) => (
            <motion.div key={b.id} variants={fadeUp} initial="hidden" whileInView="show" custom={i} viewport={{ once: true }}>
              <Link href={`/blog/${b.id}`} className="glass block h-full overflow-hidden rounded-3xl shadow-card transition hover:-translate-y-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.cover} alt={b.title} className="h-40 w-full object-cover" />
                <span className="block p-5">
                  <span className="font-display block font-extrabold">{b.title}</span>
                  <span className="mt-1 block text-sm text-deepsea/60">{b.excerpt}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] } }),
};

export function SectionHead({ kicker, title, sub }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-70px' }} className="mb-8 max-w-3xl">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-seafoam-dark">
        <Sparkles size={14} /> {kicker}
      </div>
      <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">{title}</h1>
      {sub && <p className="font-serif2 mt-3 text-lg italic text-deepsea/65">{sub}</p>}
    </motion.div>
  );
}

export function Card({ href, children, className = '' }) {
  const cls = `glass macro-zoom block rounded-3xl p-6 shadow-card transition hover:-translate-y-1 hover:shadow-blue-soft ${className}`;
  if (href) return <Link href={href} className={cls}>{children}<span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-seafoam-dark">Open details <ArrowUpRight size={15} /></span></Link>;
  return <div className={cls}>{children}</div>;
}

/* Infinite moving photo strip — see components/MovingGallery.jsx */
export function MovingGallery() {
  return null;
}

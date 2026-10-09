import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getPortfolio } from '@/lib/liveData';
import { SectionHead } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Ananya Ahmed Tisha' };
export const revalidate = 60;

const CATS = ['All', 'Animation', 'Poster', 'Art', 'Photography'];

export default async function GalleryPage({ searchParams }) {
  const PORTFOLIO = await getPortfolio();
  const f = searchParams?.cat || 'All';
  const items = (f === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === f)).filter((p) => p.media_url);
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionHead kicker="Portfolio" title="Curated Gallery" sub="A selection of photography, artwork and design." />
      <div className="mb-6 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <Link key={c} href={c === 'All' ? '/gallery' : `/gallery?cat=${c}`} className={`rounded-full px-4 py-2 text-xs font-bold transition ${f === c ? 'bg-deepsea text-white' : 'glass hover:-translate-y-0.5'}`}>{c}</Link>
        ))}
      </div>
      <div className="masonry">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i % 3}>
            <Link href={`/gallery/${p.id}`} className="macro-zoom group relative block min-h-[16rem] overflow-hidden rounded-3xl bg-deepsea-900 shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.media_url} alt={p.title} loading="lazy" className="w-full object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-seafoam px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{p.category}</span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deepsea-900/90 to-transparent p-4 pt-10 text-white">
                <span className="font-display block text-sm font-bold">{p.title}</span>
                <span className="flex items-center gap-1 text-xs text-white/70">{p.year} · View <ArrowUpRight size={13} /></span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

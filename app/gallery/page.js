import Link from 'next/link';
import { getPortfolio } from '@/lib/liveData';
import { SectionHead } from '@/components/ui';
import Reveal from '@/components/Reveal';
import LightImage from '@/components/LightImage';

export const metadata = { title: 'Ananya Ahmed Tisha' };
export const revalidate = 60;

export default async function GalleryPage({ searchParams }) {
  const PORTFOLIO = await getPortfolio();
  const f = searchParams?.cat || 'All';
  const CATS = ['All', ...new Set(PORTFOLIO.map((p) => p.category).filter(Boolean))];
  const items = (f === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === f)).filter((p) => p.media_url && p.show_in_gallery !== false);
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionHead kicker="Portfolio" title="Curated Gallery" sub="A selection of photography, artwork and design. Click any picture for fullscreen." />
      <div className="mb-6 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <Link key={c} href={c === 'All' ? '/gallery' : `/gallery?cat=${c}`} className={`rounded-full px-4 py-2 text-xs font-bold transition ${f === c ? 'bg-deepsea text-white' : 'glass hover:-translate-y-0.5'}`}>{c}</Link>
        ))}
      </div>
      <div className="masonry">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i % 3}>
            <div className="group relative block min-h-[16rem] overflow-hidden rounded-3xl bg-deepsea-900 shadow-card">
              <LightImage src={p.media_url} alt={p.title} caption={`${p.title}${p.year ? ` · ${p.year}` : ''}`} className="w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-seafoam px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{p.category}</span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deepsea-900/90 to-transparent p-4 pt-10 text-white">
                <span className="font-display block text-sm font-bold">{p.title}</span>
                <span className="block text-xs text-white/70">{p.year}</span>
              </span>
              <Link href={`/gallery/${p.id}`} onClick={(e) => e.stopPropagation()} className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-deepsea transition hover:bg-white">
                Details →
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

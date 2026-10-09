import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { getProjects } from '@/lib/liveData';
import { SectionHead } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Ananya Ahmed Tisha' };
export const revalidate = 60;

export default async function ProjectsPage() {
  const PROJECTS = await getProjects();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionHead kicker="Work" title="Selected Projects" sub="Research initiatives, creative series and editorial contributions." />
      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i % 2}>
            <article className="glass h-full overflow-hidden rounded-3xl shadow-card transition hover:-translate-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.cover && <img src={p.cover} alt={p.title} className="h-52 w-full object-cover" />}
              <div className="p-6">
                {p.featured && <span className="mb-2 inline-block rounded-full bg-seafoam px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Featured</span>}
                <h2 className="font-display text-xl font-extrabold">{p.title}</h2>
                <p className="text-sm font-semibold text-seafoam-dark">{p.subtitle}</p>
                <p className="mt-2 line-clamp-2 text-sm text-deepsea/65">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">{(p.tags || []).map((t) => <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-deepsea/65">{t}</span>)}</div>
                <div className="mt-4 flex gap-4">
                  <Link href={`/projects/${p.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-seafoam-dark">View Details <ArrowUpRight size={15} /></Link>
                  {p.link_url && <a href={p.link_url} target="_blank" className="inline-flex items-center gap-1 text-sm font-bold text-deepsea/60">Live Site <ExternalLink size={14} /></a>}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

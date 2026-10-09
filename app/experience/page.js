import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getExperiences } from '@/lib/liveData';
import { SectionHead } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Ananya Ahmed Tisha' };
export const revalidate = 60;

export default async function ExperiencePage() {
  const EXPERIENCES = await getExperiences();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionHead kicker="Career" title="Professional Experience" sub="Internships, leadership roles and community service." />
      <div className="grid gap-5 md:grid-cols-2">
        {EXPERIENCES.map((e, i) => (
          <Reveal key={e.id} delay={i % 2}>
            <Link href={`/experience/${e.id}`} className="glass macro-zoom group block h-full overflow-hidden rounded-3xl shadow-card transition hover:-translate-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {e.cover && <img src={e.cover} alt={e.role} className="h-52 w-full object-cover" />}
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-deepsea px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{e.category}</span>
                  {e.period && <span className="rounded-full bg-seafoam-pale px-3 py-1 text-[11px] font-bold text-seafoam-dark">{e.period}</span>}
                </div>
                <h2 className="font-display mt-3 text-lg font-extrabold">{e.role}</h2>
                <p className="text-sm font-semibold text-seafoam-dark">{e.organization}</p>
                <p className="mt-2 line-clamp-2 text-sm text-deepsea/65">{e.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-seafoam-dark">View Details <ArrowUpRight size={15} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

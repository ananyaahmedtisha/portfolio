import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { getAcademics } from '@/lib/liveData';
import { SectionHead } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Ananya Ahmed Tisha' };
export const revalidate = 60;

export default async function AcademicPage() {
  const ACADEMICS = await getAcademics();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionHead kicker="Education" title="Academic Background" sub="Education and qualifications, from school to university." />
      <div className="grid gap-5 md:grid-cols-3">
        {ACADEMICS.map((a, i) => (
          <Reveal key={a.id} delay={i % 3}>
            <article className="glass h-full overflow-hidden rounded-3xl shadow-card transition hover:-translate-y-1">
              {a.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.image_url} alt={a.institution} className="h-44 w-full object-cover" />
              ) : (
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-seafoam-pale to-alice text-seafoam-dark"><GraduationCap size={40} /></div>
              )}
              <div className="p-6">
                <span className="rounded-full bg-deepsea px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{a.level}</span>
                <h2 className="font-display mt-3 font-extrabold">{a.institution}</h2>
                <p className="text-sm font-semibold text-seafoam-dark">{a.program}</p>
                <p className="mt-1 text-xs font-bold text-deepsea/50">{a.period} · {a.result}</p>
                <p className="tjustify mt-3 text-sm leading-relaxed text-deepsea/70">{a.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8">
        <p className="text-sm text-deepsea/60">For transcripts or references, please <Link href="/contact" className="font-bold text-seafoam-dark">get in touch</Link>.</p>
      </Reveal>
    </div>
  );
}

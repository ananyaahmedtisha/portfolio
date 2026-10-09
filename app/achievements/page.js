import Link from 'next/link';
import { ArrowUpRight, Award } from 'lucide-react';
import { getAchievements } from '@/lib/liveData';
import { SectionHead } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Ananya Ahmed Tisha' };
export const revalidate = 60;

export default async function AchievementsPage() {
  const ACHIEVEMENTS = await getAchievements();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionHead kicker="Recognition" title="Awards & Achievements" sub="Honors across research, photography, art and writing." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => (
          <Reveal key={a.id} delay={i % 3}>
            <Link href={`/achievements/${a.id}`} className="glass group block h-full overflow-hidden rounded-3xl shadow-card transition hover:-translate-y-1">
              <div className="flex items-center justify-between bg-gradient-to-r from-deepsea to-seafoam-dark p-4 text-white">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"><Award size={15} /> {a.award_placement}</span>
                <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold">{a.year}</span>
              </div>
              <div className="p-5">
                <span className="rounded-full bg-seafoam-pale px-3 py-1 text-[11px] font-bold text-seafoam-dark">{a.category}</span>
                <h2 className="font-display mt-2 font-extrabold">{a.title}</h2>
                <p className="mt-1 text-sm text-deepsea/65">{a.event_name}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-seafoam-dark">View Details <ArrowUpRight size={15} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

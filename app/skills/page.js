import { FlaskConical, Palette, Dna, Leaf } from 'lucide-react';
import { getSkills } from '@/lib/liveData';
import { SectionHead } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Ananya Ahmed Tisha' };
export const revalidate = 60;

const ICONS = [Palette, FlaskConical, Dna, Leaf];

export default async function SkillsPage() {
  const SKILLS = await getSkills();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionHead kicker="Capabilities" title="Skills & Expertise" sub="Technical proficiency, creative tools and research focus." />
      <div className="grid gap-5 md:grid-cols-2">
        {Object.entries(SKILLS).map(([group, items], gi) => {
          const Icon = ICONS[gi % ICONS.length];
          return (
            <Reveal key={group} delay={gi % 2}>
              <div className="glass h-full rounded-3xl p-7 shadow-card transition hover:-translate-y-1">
                <h2 className="font-display flex items-center gap-2 font-extrabold"><Icon className="text-seafoam-dark" /> {group}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span key={s} className="rounded-full border border-seafoam/30 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-seafoam hover:text-white">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAchievements } from '@/lib/liveData';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const list = await getAchievements();
  return list.map((a) => ({ id: String(a.id) }));
}

export default async function AchievementDetail({ params }) {
  const list = await getAchievements();
  const a = list.find((x) => String(x.id) === params.id);
  if (!a) return notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
      <Link href="/achievements" className="text-sm font-bold text-seafoam-dark">← All achievements</Link>
      <div className="glass mt-4 overflow-hidden rounded-3xl shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {a.cover && <img src={a.cover} alt={a.title} className="h-72 w-full object-cover" />}
        <div className="p-7">
          <span className="rounded-full bg-seafoam px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{a.award_placement} · {a.year}</span>
          <h1 className="font-display mt-3 text-3xl font-extrabold">{a.title}</h1>
          <p className="font-semibold text-seafoam-dark">{a.event_name}</p>
          {a.organizer && <p className="text-sm text-deepsea/55">{a.organizer}</p>}
          <p className="tjustify mt-4 leading-relaxed text-deepsea/75">{a.description}</p>
        </div>
      </div>
      {a.photos?.length > 0 && (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {a.photos.map((p, i) => (
            <figure key={i} className="glass overflow-hidden rounded-3xl shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.caption} className="h-64 w-full object-cover" />
              {p.caption && <figcaption className="p-4 text-sm text-deepsea/70">{p.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

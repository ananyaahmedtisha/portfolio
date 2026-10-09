import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getExperiences } from '@/lib/liveData';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const list = await getExperiences();
  return list.map((e) => ({ id: String(e.id) }));
}

export default async function ExperienceDetail({ params }) {
  const list = await getExperiences();
  const e = list.find((x) => String(x.id) === params.id);
  if (!e) return notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
      <Link href="/experience" className="text-sm font-bold text-seafoam-dark">← All experience</Link>
      <div className="glass mt-4 overflow-hidden rounded-3xl shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {e.cover && <img src={e.cover} alt={e.role} className="h-72 w-full object-cover" />}
        <div className="p-7">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-deepsea px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{e.category}</span>
            {e.period && <span className="rounded-full bg-seafoam-pale px-3 py-1 text-[11px] font-bold text-seafoam-dark">{e.period}</span>}
          </div>
          <h1 className="font-display mt-3 text-3xl font-extrabold">{e.role}</h1>
          <p className="font-semibold text-seafoam-dark">{e.organization}</p>
          <p className="tjustify mt-4 leading-relaxed text-deepsea/75">{e.description}</p>
        </div>
      </div>
      {e.photos?.length > 0 && (
        <>
          <h2 className="font-display mt-8 text-xl font-extrabold">Photos ({e.photos.length})</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {e.photos.map((p, i) => (
              <figure key={i} className="glass overflow-hidden rounded-3xl shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.caption} className="h-64 w-full object-cover" />
                {p.caption && <figcaption className="p-4 text-sm text-deepsea/70">{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

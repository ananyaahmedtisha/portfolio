import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { getProjects } from '@/lib/liveData';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const list = await getProjects();
  return list.map((p) => ({ id: String(p.id) }));
}

export default async function ProjectDetail({ params }) {
  const list = await getProjects();
  const p = list.find((x) => String(x.id) === params.id);
  if (!p) return notFound();
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
      <Link href="/projects" className="text-sm font-bold text-seafoam-dark">← All projects</Link>
      <div className="glass mt-4 overflow-hidden rounded-3xl shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {p.cover && <img src={p.cover} alt={p.title} className="h-72 w-full object-cover" />}
        <div className="p-7">
          <h1 className="font-display text-3xl font-extrabold">{p.title}</h1>
          <p className="font-semibold text-seafoam-dark">{p.subtitle}</p>
          <p className="tjustify mt-4 leading-relaxed text-deepsea/75">{p.long || p.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{(p.tags || []).map((t) => <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-semibold">{t}</span>)}</div>
          {p.link_url && <a href={p.link_url} target="_blank" className="mt-4 inline-flex items-center gap-1 font-bold text-seafoam-dark">{p.link_label || p.link_url} <ExternalLink size={15} /></a>}
        </div>
      </div>
      {p.photos?.length > 0 && (
        <>
          <h2 className="font-display mt-8 text-xl font-extrabold">Photos</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {p.photos.map((ph, i) => (
              <figure key={i} className="glass overflow-hidden rounded-3xl shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ph.url} alt={ph.caption} className="h-64 w-full object-cover" />
                {ph.caption && <figcaption className="p-4 text-sm text-deepsea/70">{ph.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPortfolio } from '@/lib/liveData';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const list = await getPortfolio();
  return list.map((p) => ({ id: String(p.id) }));
}

export default async function GalleryDetail({ params }) {
  const list = await getPortfolio();
  const p = list.find((x) => String(x.id) === params.id);
  if (!p) return notFound();
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 md:px-6">
      <Link href="/gallery" className="text-sm font-bold text-seafoam-dark">← Gallery</Link>
      <div className="glass-strong mt-4 overflow-hidden rounded-3xl p-4 shadow-card">
        {p.media_type === 'video' ? (
          <video src={p.media_url} controls className="max-h-[75vh] w-full rounded-2xl bg-black object-contain" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.media_url} alt={p.title} className="max-h-[75vh] w-full rounded-2xl object-contain" />
        )}
        <div className="p-4">
          <span className="rounded-full bg-seafoam px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{p.category} · {p.year}</span>
          <h1 className="font-display mt-2 text-2xl font-extrabold">{p.title}</h1>
          <p className="tjustify mt-1 text-deepsea/70">{p.description}</p>
        </div>
      </div>
    </div>
  );
}

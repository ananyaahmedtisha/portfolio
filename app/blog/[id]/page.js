import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogById, getBlogPosts } from '@/lib/liveData';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const list = await getBlogPosts();
  return list.map((b) => ({ id: String(b.id) }));
}

export default async function BlogDetail({ params }) {
  const b = await getBlogById(params.id);
  if (!b) return notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 md:px-6">
      <Link href="/blog" className="text-sm font-bold text-seafoam-dark">← All posts</Link>
      {b.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={b.cover} alt={b.title} className="mt-4 h-72 w-full rounded-3xl object-cover shadow-card" />
      )}
      <p className="mt-5 text-xs font-bold text-deepsea/45">{b.date}{b.date && ' · '}{b.read_minutes} min read</p>
      <h1 className="font-display mt-2 text-3xl font-extrabold md:text-4xl">{b.title}</h1>
      <p className="font-serif2 mt-2 text-lg italic text-deepsea/65">{b.excerpt}</p>
      <div className="glass tjustify mt-6 whitespace-pre-line rounded-3xl p-7 leading-relaxed text-deepsea/80">{b.body}</div>
    </article>
  );
}

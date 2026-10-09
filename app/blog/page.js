import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/liveData';
import { SectionHead } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Ananya Ahmed Tisha' };
export const revalidate = 60;

export default async function BlogPage() {
  const BLOG_POSTS = await getBlogPosts();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionHead kicker="Journal" title="Writings & Reflections" sub="Essays and notes on science, culture and society." />
      <div className="grid gap-5 md:grid-cols-3">
        {BLOG_POSTS.map((b, i) => (
          <Reveal key={b.id} delay={i % 3}>
            <Link href={`/blog/${b.id}`} className="glass block h-full overflow-hidden rounded-3xl shadow-card transition hover:-translate-y-1">
              {b.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.cover} alt={b.title} className="h-44 w-full object-cover" />
              ) : (
                <div className="h-44 bg-gradient-to-br from-seafoam-pale to-alice" />
              )}
              <div className="p-6">
                <p className="text-xs font-bold text-deepsea/45">{b.date}{b.date && ' · '}{b.read_minutes} min read</p>
                <h2 className="font-display mt-2 font-extrabold">{b.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-deepsea/65">{b.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-seafoam-dark">Read Article <ArrowUpRight size={15} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

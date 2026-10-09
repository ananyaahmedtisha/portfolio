'use client';

import { useState } from 'react';
import Link from 'next/link';

/* Infinite moving photo strip — only items with a working image */
export function MovingGallery({ items }) {
  const [failed, setFailed] = useState({});
  const row = (items || []).filter((p) => p.media_url && !failed[p.id]);
  if (row.length === 0) return null;
  const doubled = [...row, ...row];
  return (
    <div className="overflow-hidden rounded-3xl">
      <div className="flex w-max animate-marquee gap-4 py-2">
        {doubled.map((p, i) => (
          <Link key={`${p.id}-${i}`} href={`/gallery/${p.id}`} className="group relative block h-64 w-52 shrink-0 overflow-hidden rounded-2xl bg-deepsea-900 shadow-card md:h-72 md:w-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.media_url}
              alt={p.title}
              loading="lazy"
              onError={() => setFailed((f) => ({ ...f, [p.id]: true }))}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deepsea-900/90 via-deepsea-900/40 to-transparent p-3 pt-10 text-left text-white">
              <span className="font-display block truncate text-xs font-bold">{p.title}</span>
              <span className="block text-[11px] text-white/70">{p.category}{p.year ? ` · ${p.year}` : ''}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

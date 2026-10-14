'use client';

import { useState } from 'react';
import LightImage from '@/components/LightImage';

/* Infinite moving photo strip — click any frame for fullscreen */
export function MovingGallery({ items }) {
  const [failed, setFailed] = useState({});
  const row = (items || []).filter((p) => p.media_url && p.show_on_home !== false && !failed[p.id]);
  if (row.length === 0) return null;
  const doubled = [...row, ...row];
  return (
    <div className="overflow-hidden rounded-3xl">
      <div className="flex w-max animate-marquee gap-4 py-2">
        {doubled.map((p, i) => (
          <div key={`${p.id}-${i}`} className="group relative block h-64 w-52 shrink-0 overflow-hidden rounded-2xl bg-deepsea-900 shadow-card md:h-72 md:w-64">
            <LightImage
              src={p.media_url}
              alt={p.title}
              caption={`${p.title}${p.year ? ` · ${p.year}` : ''}`}
              onError={() => setFailed((f) => ({ ...f, [p.id]: true }))}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deepsea-900/90 via-deepsea-900/40 to-transparent p-3 pt-10 text-left text-white">
              <span className="font-display block truncate text-xs font-bold">{p.title}</span>
              <span className="block text-[11px] text-white/70">{p.category}{p.year ? ` · ${p.year}` : ''}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

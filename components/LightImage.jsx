'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

/* Click any picture → fullscreen view. Safe inside links (does not navigate). */
export default function LightImage({ src, alt = '', className = '', caption = '', onError }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open ]);

  if (!src) return null;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        onError={onError}
        className={`${className} cursor-zoom-in`}
      />
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-deepsea-900/90 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Close fullscreen"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white p-2.5 text-deepsea shadow-card transition hover:scale-105"
          >
            <X size={18} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-blue-soft"
          />
          {(caption || alt) && (
            <p className="mt-4 max-w-2xl text-center text-sm text-white/80">{caption || alt}</p>
          )}
        </div>
      )}
    </>
  );
}

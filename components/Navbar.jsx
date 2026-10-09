'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/siteData';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto max-w-7xl px-4 pt-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-blue-soft md:px-5">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="font-display text-base font-extrabold md:text-lg">Ananya Ahmed Tisha</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact" className="mr-1 hidden rounded-full bg-deepsea px-5 py-2.5 text-sm font-bold text-white transition hover:bg-seafoam-dark sm:block">
              Hire Me <ArrowUpRight className="ml-1 inline" size={15} />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Pages menu"
              aria-expanded={open}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl bg-deepsea text-white transition hover:bg-seafoam-dark"
            >
              <span className={`block h-[2.5px] w-6 rounded bg-white transition-transform ${open ? 'translate-y-[7.5px] rotate-45' : ''}`} />
              <span className={`block h-[2.5px] w-6 rounded bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-[2.5px] w-6 rounded bg-white transition-transform ${open ? '-translate-y-[7.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Compact dropdown panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="glass-strong absolute right-4 top-full z-50 mt-2 w-64 rounded-2xl p-2 shadow-blue-soft"
            >
              {NAV_LINKS.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${
                      active ? 'bg-deepsea text-white' : 'text-deepsea/80 hover:bg-seafoam-pale'
                    }`}
                  >
                    {l.label}
                    <ArrowUpRight size={14} className={active ? 'text-white' : 'text-seafoam-dark'} />
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

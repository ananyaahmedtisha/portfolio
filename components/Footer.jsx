import Link from 'next/link';
import { PROFILE } from '@/lib/siteData';

const EXPLORE = [
  { href: '/academic', label: 'Academic Background' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
      <div className="rounded-[2rem] bg-[#111314] px-8 py-10 text-white md:px-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-extrabold">{PROFILE.full_name}</p>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-white/80">{PROFILE.tagline}</p>
          </div>
          <div>
            <p className="font-display font-extrabold">Explore</p>
            <ul className="mt-3 space-y-2.5 text-[15px]">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/85 transition hover:text-seafoam-light">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display font-extrabold">Contact Us</p>
            <p className="mt-3 text-[15px] text-white/85">{PROFILE.email}</p>
            <p className="mt-1.5 text-[15px] text-white/85">Dhaka, Bangladesh</p>
            <Link href="/contact" className="mt-2.5 inline-block font-bold text-seafoam-light transition hover:text-white">
              Send a message →
            </Link>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-white/60">© 2026 Ananya Ahmed Tisha</p>
      </div>
    </footer>
  );
}

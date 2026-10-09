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
      <div className="glass rounded-[2rem] px-8 py-10 shadow-blue-soft md:px-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-extrabold">{PROFILE.full_name}</p>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-deepsea/70">{PROFILE.tagline}</p>
          </div>
          <div>
            <p className="font-display font-extrabold">Explore</p>
            <ul className="mt-3 space-y-2.5 text-[15px]">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-deepsea/75 transition hover:text-seafoam-dark">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display font-extrabold">Contact Us</p>
            <p className="mt-3 text-[15px] text-deepsea/75">{PROFILE.email}</p>
            <p className="mt-1.5 text-[15px] text-deepsea/75">Dhaka, Bangladesh</p>
            <Link href="/contact" className="mt-2.5 inline-block font-bold text-seafoam-dark transition hover:underline">
              Send a message →
            </Link>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-deepsea/55">© 2026 Ananya Ahmed Tisha</p>
      </div>
    </footer>
  );
}

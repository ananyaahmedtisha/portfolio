import { PROFILE } from '@/lib/siteData';
import { Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
      <div className="glass rounded-2xl px-6 py-6 text-center shadow-card">
        <div className="flex flex-col items-center justify-center gap-2 text-sm font-semibold text-deepsea/80 sm:flex-row sm:gap-6">
          <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 transition hover:text-seafoam-dark"><Mail size={15} /> {PROFILE.email}</a>
          <a href={`https://${PROFILE.linkedin}`} target="_blank" className="flex items-center gap-2 transition hover:text-seafoam-dark"><Linkedin size={15} /> LinkedIn</a>
        </div>
        <p className="mt-3 text-xs text-deepsea/55">© 2026 Ananya Ahmed Tisha</p>
      </div>
    </footer>
  );
}

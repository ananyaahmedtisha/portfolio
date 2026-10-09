'use client';

import { useState } from 'react';
import { Mail, Linkedin, Send } from 'lucide-react';
import { PROFILE } from '@/lib/siteData';
import { SectionHead } from '@/components/ui';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [sent, setSent] = useState(false);

  async function submit(e) {
    e.preventDefault();
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } catch {}
    setSent(true);
    setForm({ name: '', email: '', subject: '', body: '' });
    setTimeout(() => setSent(false), 6000);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <SectionHead kicker="Contact" title="Get in Touch" sub="For research opportunities, collaborations and commissions." />
      <div className="glass grid overflow-hidden rounded-[2rem] shadow-blue-soft md:grid-cols-2">
        <div className="bg-gradient-to-br from-deepsea via-deepsea-800 to-seafoam-dark p-8 text-white md:p-12">
          <h2 className="font-display text-2xl font-extrabold">Direct lines</h2>
          <div className="mt-6 space-y-4 text-sm">
            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 transition hover:bg-white/20"><Mail /> {PROFILE.email}</a>
            <a href={`https://${PROFILE.linkedin}`} target="_blank" className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 transition hover:bg-white/20"><Linkedin /> {PROFILE.linkedin}</a>
          </div>
          <p className="mt-8 text-xs text-white/55">Hire for: research internships · FoodSense collabs · science communication · poster/design work.</p>
        </div>
        <form onSubmit={submit} className="bg-white/70 p-8 md:p-12">
          <h3 className="font-display text-xl font-extrabold">Send a message</h3>
          <p className="text-sm text-deepsea/60">I typically respond within a few days.</p>
          <div className="mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="rounded-2xl border border-deepsea/10 bg-white px-4 py-3 text-sm outline-none focus:border-seafoam" />
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="rounded-2xl border border-deepsea/10 bg-white px-4 py-3 text-sm outline-none focus:border-seafoam" />
            </div>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject — Hire / Collaborate / Internship" className="rounded-2xl border border-deepsea/10 bg-white px-4 py-3 text-sm outline-none focus:border-seafoam" />
            <textarea required rows={5} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Tell me about the opportunity…" className="rounded-2xl border border-deepsea/10 bg-white px-4 py-3 text-sm outline-none focus:border-seafoam" />
            <button className="flex items-center justify-center gap-2 rounded-full bg-seafoam px-6 py-3.5 font-display text-sm font-bold text-white shadow-glow transition hover:bg-seafoam-dark">
              <Send size={15} /> {sent ? 'Message received — thank you!' : 'Send message'}
            </button>
            {sent && <p className="text-sm font-semibold text-seafoam-dark">Saved ✓ I’ll reply from {PROFILE.email}.</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

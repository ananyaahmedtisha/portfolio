'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Eye, EyeOff } from 'lucide-react';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const sb = url && anon ? createClient(url, anon) : null;
const inputCls = 'w-full rounded-xl border border-deepsea/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-seafoam focus:ring-2 focus:ring-seafoam/20';

export default function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!sb) return;
    const { data: sub } = sb.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
    sb.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    const t = setTimeout(() => setReady((r) => r), 4000);
    return () => { sub.subscription.unsubscribe(); clearTimeout(t); };
  }, []);

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    if (pw.length < 6) {
      setMsg('Password must be at least 6 characters.');
      return;
    }
    if (pw !== pw2) {
      setMsg('Passwords do not match.');
      return;
    }
    const { error } = await sb.auth.updateUser({ password: pw });
    if (error) {
      setMsg('Reset failed: ' + error.message);
    } else {
      setDone(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-alice p-4">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-3xl p-8 shadow-blue-soft">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam-dark">Password recovery</p>
        <h1 className="font-display mt-2 text-2xl font-extrabold">Set a new password</h1>
        {done ? (
          <div className="mt-5">
            <p className="rounded-xl bg-seafoam-pale p-4 text-sm font-semibold text-deepsea">Password updated successfully.</p>
            <Link href="/admin" className="mt-4 inline-block rounded-xl bg-deepsea px-6 py-3 text-sm font-bold text-white">Back to sign in</Link>
          </div>
        ) : (
          <div className="mt-5 grid gap-3">
            <div className="relative">
              <input className={`${inputCls} pr-12`} placeholder="New password" type={show ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-deepsea/50 hover:text-seafoam-dark">
                {show ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <input className={inputCls} placeholder="Confirm new password" type={show ? 'text' : 'password'} value={pw2} onChange={(e) => setPw2(e.target.value)} />
            <button className="rounded-xl bg-deepsea py-3 font-bold text-white hover:bg-seafoam-dark">Update password</button>
            {!ready && <p className="text-xs text-deepsea/50">Open this page via the recovery link in your email, then set the password.</p>}
            {msg && <p className="text-sm font-semibold text-red-600">{msg}</p>}
          </div>
        )}
      </form>
    </div>
  );
}

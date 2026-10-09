import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, body: text } = body;
    if (!name || !email || !text) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && anon && !url.includes('your-project')) {
      const sb = createClient(url, anon);
      const { error } = await sb.from('messages').insert([{ name, email, subject, body: text }]);
      if (error) throw error;
      return NextResponse.json({ ok: true, stored: true });
    }
    console.log('Contact (no Supabase configured):', { name, email, subject, text });
    return NextResponse.json({ ok: true, stored: false });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

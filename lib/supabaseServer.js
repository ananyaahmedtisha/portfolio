import { createClient } from '@supabase/supabase-js';

export function getServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon || url.includes('your-project')) return null;
  return createClient(url, anon);
}

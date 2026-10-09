import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  Boolean(url && anon && !url.includes('your-project'));

let browserClient = null;

export function getSupabaseBrowser() {
  if (!isSupabaseConfigured) return null;
  if (browserClient) return browserClient;
  browserClient = createClient(url, anon);
  return browserClient;
}

export async function fetchTable(table, orderBy = null, orderAsc = true) {
  const sb = getSupabaseBrowser();
  if (!sb) return { data: null, error: 'not-configured' };
  let q = sb.from(table).select('*');
  if (orderBy) q = q.order(orderBy, { ascending: orderAsc });
  const { data, error } = await q;
  return { data, error };
}

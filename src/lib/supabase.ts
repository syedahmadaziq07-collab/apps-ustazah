import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = rawUrl?.trim() || '';
const supabaseAnonKey = rawKey?.trim() || '';

export const isSupabaseConnected = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConnected
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (import.meta.env.DEV) {
  if (isSupabaseConnected) {
    console.log('[Supabase] URL exists: true');
    console.log('[Supabase] Key exists: true (first 10 chars: ' + supabaseAnonKey.substring(0, 10) + '****)');
    console.log('[Supabase] Client created: true');
  } else {
    console.log('[Supabase] URL exists: ' + Boolean(rawUrl?.trim()));
    console.log('[Supabase] Key exists: ' + Boolean(rawKey?.trim()));
    console.log('[Supabase] Client created: false');
  }
}

export type SupabaseHealthStatus = 'loading' | 'connected' | 'env_missing' | 'request_failed' | 'table_inaccessible';

export async function checkSupabaseHealth(): Promise<SupabaseHealthStatus> {
  if (!isSupabaseConnected || !supabase) {
    return 'env_missing';
  }
  try {
    const { error } = await supabase
      .from('emotions')
      .select('id', { count: 'exact', head: true });
    if (error) {
      if (import.meta.env.DEV) {
        console.log('[Supabase] Health check error:', error.code, error.message);
      }
      if (error.code === '42P01' || /does not exist|relation/.test(error.message)) {
        return 'table_inaccessible';
      }
      return 'request_failed';
    }
    if (import.meta.env.DEV) {
      console.log('[Supabase] Health check: success');
    }
    return 'connected';
  } catch (err) {
    if (import.meta.env.DEV) {
      console.log('[Supabase] Health check error: unexpected', err);
    }
    return 'request_failed';
  }
}

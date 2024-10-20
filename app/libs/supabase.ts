import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NODE_ENV !== 'production'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL!
    : process.env.SUPABASE_URL!,
  process.env.NODE_ENV !== 'production'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    : process.env.SUPABASE_ANON_KEY!,
);

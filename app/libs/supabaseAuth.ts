import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/supabase/schema';

export const supabaseAuth = createBrowserSupabaseClient<Database>();

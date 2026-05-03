'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/app/libs/supabaseServer';
import type { Database } from '@/supabase/schema';

type Props = Database['public']['Tables']['raws_data']['Insert'];

export async function postHelp(data: Props) {
  try {
    const supabase = createSupabaseServerClient();
    const result = await supabase.from('raws_data').insert(data);
    if (result.error) {
      throw new Error(result.error.message);
    }
    revalidatePath('/dashboard');
    return { status: result.status };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/app/libs/supabaseServer';

type Props = {
  id: string;
};

export async function deleteRecord({ id }: Props) {
  try {
    const supabase = createSupabaseServerClient();
    const result = await supabase
      .from('raws_data')
      .update({ del_flag: true })
      .eq('id', id);

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

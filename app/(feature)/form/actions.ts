'use server';

import { createSupabaseServerClient } from '@/app/libs/supabaseServer';

type Props = {
  person: string;
  comments: string;
  dish: number;
  curtain: number;
  prepareEat: number;
  landry: number;
  special: number;
};

export async function postHelp(data: Props) {
  const supabase = createSupabaseServerClient();
  const result = await supabase.from('raws_data').insert([data]);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return { status: result.status };
}

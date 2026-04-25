import { createSupabaseServerClient } from '@/app/libs/supabaseServer';
import { FormClient } from './FormClient';

export default async function Page() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from('helps_list').select('*, prices_list (*)');

  return <FormClient pricesList={data ?? []} />;
}

import { createSupabaseServerClient } from '@/app/libs/supabaseServer';
import { FormClient } from './FormClient';

export default async function Page() {
  const supabase = createSupabaseServerClient();
  const [
    { data: pricesList, error: pricesListError },
    { data: membersList, error: membersListError },
  ] = await Promise.all([
    supabase.from('helps_list').select('*, prices_list (*)'),
    supabase.from('members_list').select('name'),
  ]);

  if (pricesListError) {
    throw new Error(pricesListError.message);
  }

  if (membersListError) {
    throw new Error(membersListError.message);
  }

  const memberNames = [...new Set((membersList ?? []).map(({ name }) => name))].sort((a, b) =>
    a.localeCompare(b),
  );

  return <FormClient pricesList={pricesList ?? []} memberNames={memberNames} />;
}

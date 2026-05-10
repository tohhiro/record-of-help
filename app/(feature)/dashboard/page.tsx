import { createSupabaseServerClient } from '@/app/libs/supabaseServer';
import { DashboardClient } from './DashboardClient';

export default async function Page() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('members_list').select('name');
  if (error) {
    throw new Error(error.message);
  }

  const memberNames = [...new Set((data ?? []).map(({ name }) => name))].sort((a, b) =>
    a.localeCompare(b),
  );

  const memberOptions = [
    { value: 'all', label: 'All' },
    ...memberNames.map((name) => ({ value: name, label: name })),
  ];

  return <DashboardClient memberOptions={memberOptions} />;
}

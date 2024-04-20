import { supabase } from '@/app/libs/supabase';
import useSWR from 'swr';

const fetcher = async ({ email }: { email: string | null }) => {
  try {
    const fetchSupabase = () => supabase.from('members_list').select('admin').eq('email', email);
    const { data, error } = await fetchSupabase();
    return { data, error };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const useFetchMember = ({ email }: { email: string | null }) => {
  const { data, error, isLoading } = useSWR('member_list', () => fetcher({ email }), {
    suspense: true,
    fallbackData: { data: null, error: null },
  });

  return {
    data,
    error,
    isLoading,
  };
};

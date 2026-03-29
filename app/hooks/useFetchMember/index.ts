import { supabase } from '@/app/libs/supabase';
import { type PostgrestError } from '@supabase/supabase-js';
import useSWR from 'swr';

type MemberResult = {
  data: { admin: boolean }[] | null;
  error: PostgrestError | null;
};

const fetcher = async (email: string): Promise<MemberResult> => {
  try {
    const { data, error } = await supabase.from('members_list').select('admin').eq('email', email);
    return { data, error };
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
};

export const useFetchMember = (email: string | null) => {
  const { data, error, isLoading } = useSWR(
    email ? `admin_auth_${email}` : null,
    email ? () => fetcher(email) : null,
  );
  return {
    memberData: data?.data ?? null,
    postgrestError: data?.error ?? null,
    swrError: error,
    isLoading,
  };
};

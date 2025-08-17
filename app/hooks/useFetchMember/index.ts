import { supabase } from '@/app/libs/supabase';
import { type PostgrestError } from '@supabase/supabase-js';
import { mutate } from 'swr';

type ReturnProps = {
  result:
    | {
        data:
          | {
              admin: boolean;
            }[]
          | null;
        error: PostgrestError | null;
      }
    | undefined;
};

const fetcher = async ({ email }: { email: string | null }) => {
  try {
    const fetchSupabase = () => supabase.from('members_list').select('admin').eq('email', email);
    const { data, error } = await fetchSupabase();
    return { data, error };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const useFetchMember = () => {
  const fetchAuth = async ({ email }: { email: string | null }): Promise<ReturnProps> => {
    const result = await mutate(`admin_auth_${email}`, fetcher({ email }));
    return {
      result,
    };
  };
  return {
    fetchAuth,
  };
};

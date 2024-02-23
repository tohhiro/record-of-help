import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../libs/supabase';
import useSWR from 'swr';

export type ResponseType = {
  data: {
    created_at: string;
    help: string;
    id: string;
    label: string;
    update_at: string | null;
    prices_list: {
      created_at: string;
      help_id: string | null;
      id: number;
      price: number;
      update_at: string | null;
    }[];
  }[];
  error: PostgrestError;
  isLoading: boolean;
};

const fetcher = async () => {
  const fetchSupabase = () => supabase.from('helps_list').select('*, prices_list (*)');
  try {
    const { data, error } = await fetchSupabase();
    return { data, error };
  } catch (error) {
    throw new Error(String(error));
  }
};
export const useFetchPricesList = (): ResponseType | undefined => {
  const { data, error, isLoading } = useSWR('helps_list_and_prices_list', fetcher, {
    suspense: true,
    fallbackData: { data: null, error: null },
  });

  return {
    ...data,
    ...error,
    isLoading,
  };
};

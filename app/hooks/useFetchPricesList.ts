import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../libs/supabase';
import useSWR from 'swr';

type ResponseType = {
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
};

const fetcher = async () => {
  try {
    const { data, error } = await supabase.from('helps_list').select('*, prices_list (*)');
    return { data, error };
  } catch (error) {
    throw new Error(String(error));
  }
};
export const useFetchPricesList = (): ResponseType | undefined => {
  const { data, error } = useSWR('helps_list_and_prices_list', fetcher, {
    suspense: true,
    fallbackData: { data: null, error: null },
  });

  return {
    ...data,
    ...error,
  };
};

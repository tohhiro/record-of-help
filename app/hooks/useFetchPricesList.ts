import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../libs/supabase';
import useSWR from 'swr';

type ResponseType = {
  data:
    | {
        created_at: string;
        help: string;
        id: string;
        label: string;
        update_at: string | null;
        prices_list: {
          created_at: string;
          help_id: string | null;
          id: string;
          price: number;
          update_at: string | null;
        }[];
      }[]
    | null;
  error: PostgrestError | null;
};

export const useFetchPricesList = (): ResponseType | undefined => {
  const fetcher = async () => {
    const { data, error } = await supabase.from('helps_list').select('*, prices_list (*)');
    return { data, error };
  };

  const { data, error } = useSWR('helps_list_and_prices_list', fetcher);

  return {
    ...data,
    ...error,
  };
};

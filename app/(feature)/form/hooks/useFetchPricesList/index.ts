import { supabase } from '@/app/libs/supabase';
import { PricesHelpsList } from '@/app/types';
import useSWR from 'swr';

const fetcher = async () => {
  try {
    const fetchSupabase = () => supabase.from('helps_list').select('*, prices_list (*)');
    const { data, error } = await fetchSupabase();
    return { data, error };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const useFetchPricesList = (): PricesHelpsList | undefined => {
  const { data, error } = useSWR('helps_list_and_prices_list', fetcher, {
    suspense: true,
  });

  return {
    ...data,
    ...error,
  };
};

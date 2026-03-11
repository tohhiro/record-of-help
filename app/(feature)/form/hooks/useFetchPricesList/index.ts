import { supabase } from '@/app/libs/supabase';
import { type PricesHelpsList } from '@/app/types';
import useSWR from 'swr';

const fetchSupabase = async () => {
  const { data, error } = await supabase.from('helps_list').select('*, prices_list (*)');
  return { data, error };
};

export const useFetchPricesList = (): PricesHelpsList | undefined => {
  const { data, error } = useSWR('helps_list_and_prices_list', fetchSupabase, {
    suspense: true,
  });

  return {
    data: data?.data ?? [],
    error: error ?? null,
  };
};

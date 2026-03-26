import { supabase } from '@/app/libs/supabase';
import { type PricesHelpsList } from '@/app/types';
import useSWR from 'swr';

const fetchSupabase = async () => {
  try {
    const { data, error } = await supabase.from('helps_list').select('*, prices_list (*)');
    return { data, error };
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
};

export const useFetchPricesList = (): PricesHelpsList => {
  const { data } = useSWR('helps_list_and_prices_list', fetchSupabase, {
    suspense: true,
  });

  return {
    data: data?.data ?? [],
    error: data?.error ?? null,
  };
};

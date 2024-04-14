import { supabaseAuth } from '@/app/libs/supabaseAuth';
import useSWR from 'swr';
import type { PricesHelpsList } from '@/app/types';

const fetcher = async () => {
  try {
    const fetchSupabase = () => supabaseAuth.from('helps_list').select('*, prices_list (*)');
    const { data, error } = await fetchSupabase();
    return { data, error };
  } catch (error) {
    throw new Error(String(error));
  }
};
export const useFetchPricesList = (): PricesHelpsList | undefined => {
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

import { supabase } from '@/app/libs/supabase';
import { type PricesHelpsList } from '@/app/types';
import useSWR from 'swr';

const fetchSupabase = () => supabase.from('helps_list').select('*, prices_list (*)');

export const useFetchPricesList = (): PricesHelpsList | undefined => {
  const { data, error } = useSWR('helps_list_and_prices_list', fetchSupabase, {
    suspense: true,
  });

  return {
    ...data,
    ...error,
  };
};

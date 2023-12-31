import { supabase } from '../libs/supabase';
import useSWR from 'swr';

export const useFetchPricesList = () => {
  const fetcher = async () => {
    const { data, error } = await supabase.from('helps_list').select('*, prices_list (*)');
    return { data, error };
  };

  const { data, error } = useSWR('helps_list_and_prices_list', fetcher, { refreshInterval: 1000 });

  const pricesList = data?.data?.map((item) => ({
    id: item.id,
    label: item.label,
    column: item.help,
    value: item.prices_list[0].price,
  }));

  return {
    success: () => {
      return pricesList;
    },
    error: () => {
      return error;
    },
  };
};

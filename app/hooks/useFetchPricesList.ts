import { supabase } from '../libs/supabase';
import useSWR from 'swr';

export const useFetchPricesList = () => {
  const fetcher = async () => {
    const { data, error } = await supabase.from('helps_list').select('*, prices_list (*)');
    return { data, error };
  };

  const { data, error } = useSWR('helps_list_and_prices_list', fetcher);
  // TODO: ここでデータを整形する

  // FIXME: 整形されたデータを返す
  return {
    success: () => {
      return { ...data };
    },
    error: () => {
      return error;
    },
  };
};

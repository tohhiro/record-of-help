import { supabase } from '../libs/supabase';
import useSWR from 'swr';

export const useFetchRawsData = () => {
  const fetcher = async () => {
    const { data, error } = await supabase.from('raws_data').select('*');
    return { data, error };
  };

  const { data, error } = useSWR('raws_data', fetcher);
  return {
    success: () => {
      return { ...data };
    },
    error: () => {
      return error;
    },
  };
};

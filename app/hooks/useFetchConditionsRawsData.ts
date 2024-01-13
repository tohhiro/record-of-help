import { supabase } from '../libs/supabase';
import useSWR from 'swr';

export const useFetchConditionsRawsData = (args: {
  person: string;
  startDate: string;
  endDate: string;
}) => {
  const fetcher = async () => {
    const { data, error } = await supabase
      .from('raws_data')
      .select('*')
      .eq('person', args.person)
      .gte('created_at', args.startDate)
      .lte('created_at', args.endDate)
      .order('created_at', { ascending: true });
    return { data, error };
  };

  const { data, error } = useSWR('conditions_raws_data', fetcher);
  return {
    success: () => {
      return { ...data };
    },
    error: () => {
      return error;
    },
  };
};

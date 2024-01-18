import { supabase } from '../libs/supabase';
import useSWR, { mutate } from 'swr';

const allFetcher = async () => {
  const { data, error } = await supabase.from('raws_data').select('*');
  return { data, error };
};

const conditionsFetcher = async (args: { person: string; startDate: string; endDate: string }) => {
  const fetchPerson = () => {
    if (args.person === 'all') {
      return supabase
        .from('raws_data')
        .select('*')
        .gte('created_at', args.startDate)
        .lte('created_at', args.endDate)
        .order('created_at', { ascending: true });
    }
    return supabase
      .from('raws_data')
      .select('*')
      .eq('person', args.person)
      .gte('created_at', args.startDate)
      .lte('created_at', args.endDate)
      .order('created_at', { ascending: true });
  };

  const { data, error } = await fetchPerson();
  return { data, error };
};

export const useFetchRawsData = () => {
  const { data, error } = useSWR('raws_data', allFetcher);

  const mutateFetch = async (args: { person: string; startDate: string; endDate: string }) => {
    const result = await mutate('raws_data', conditionsFetcher({ ...args }));
    return { result };
  };

  return {
    success: () => {
      return { ...data };
    },
    error: () => {
      return error;
    },
    conditionsFetch: (args: { person: string; startDate: string; endDate: string }) => {
      return mutateFetch(args);
    },
  };
};

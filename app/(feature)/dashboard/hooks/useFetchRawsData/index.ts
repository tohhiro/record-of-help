import { supabase } from '@/app/libs/supabase';
import type { Database } from '@/supabase/schema';
import { useCallback, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { getNowMonthFirstLast } from './helpers';

type Props = Database['public']['Tables']['raws_data']['Row'][] | null;

export type ConditionsArgsType = {
  startDate: string;
  endDate: string;
  person?: string;
};

const conditionsFetcher = async (args: ConditionsArgsType) => {
  try {
    const commonSupabaseFetcher = supabase
      .from('raws_data')
      .select('*')
      .eq('del_flag', false)
      .order('created_at', { ascending: true });

    const fetchPerson = () => {
      if (!args.person) {
        return commonSupabaseFetcher
          .gte('created_at', `${args.startDate} 00:00:00`)
          .lte('created_at', `${args.endDate} 23:59:59`);
      }
      return commonSupabaseFetcher
        .gte('created_at', `${args.startDate} 00:00:00`)
        .lte('created_at', `${args.endDate} 23:59:59`)
        .eq('person', args.person);
    };

    const { data, error } = await fetchPerson();
    return { data, error };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const useFetchRawsData = () => {
  const [rawsData, setRawsData] = useState<Props | null>(null);

  const { startDate, endDate } = getNowMonthFirstLast();
  const sendingData: ConditionsArgsType = {
    person: '',
    startDate,
    endDate,
  };

  const fetcher = () => conditionsFetcher({ ...sendingData });

  const { data } = useSWR('raws_data', fetcher);
  useEffect(() => {
    setRawsData(data?.data || null);
  }, [data]);

  const mutateFetch = useCallback(async (args: ConditionsArgsType) => {
    const swrKey = `raws_data_conditions/${args.startDate}/${args.endDate}/${args.person}`;
    const result = await mutate(swrKey, conditionsFetcher({ ...args }));
    setRawsData(() => result?.data || null);
  }, []);

  return {
    success: {
      rawsData,
    },
    conditionsFetch: (args: ConditionsArgsType) => {
      mutateFetch(args);
    },
  };
};

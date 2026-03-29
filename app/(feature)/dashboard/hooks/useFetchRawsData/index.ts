import { supabase } from '@/app/libs/supabase';
import type { Database } from '@/supabase/schema';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
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
    throw error instanceof Error ? error : new Error(String(error));
  }
};

export const useFetchRawsData = () => {
  const { startDate, endDate } = getNowMonthFirstLast();
  const [conditions, setConditions] = useState<ConditionsArgsType>({
    person: '',
    startDate,
    endDate,
  });

  const swrKey = `raws_data/${conditions.startDate}/${conditions.endDate}/${conditions.person}`;

  const { data, mutate } = useSWR(swrKey, () => conditionsFetcher(conditions));

  const rawsData: Props = data?.data ?? null;

  const conditionsFetch = useCallback((args: ConditionsArgsType) => {
    setConditions({
      ...args,
      person: args.person ?? '',
    });
    // 同一条件での再検索時もデータを再取得する
    mutate();
  }, [mutate]);

  return {
    success: {
      rawsData,
    },
    conditionsFetch,
  };
};

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

  const conditionsFetch = useCallback(
    (args: ConditionsArgsType) => {
      const nextConditions: ConditionsArgsType = {
        ...args,
        person: args.person ?? '',
      };
      const { startDate: s, endDate: e, person: p } = nextConditions;
      const nextKey = `raws_data/${s}/${e}/${p}`;

      setConditions(nextConditions);

      // 同一条件での再検索時のみ、現在のキーで明示的に再取得する
      if (nextKey === swrKey) {
        mutate();
      }
    },
    [mutate, swrKey],
  );

  return {
    success: {
      rawsData,
    },
    conditionsFetch,
  };
};

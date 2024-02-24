'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../libs/supabase';
import useSWR, { mutate } from 'swr';
import type { Database } from '../../supabase/schema';

type Props = Database['public']['Tables']['raws_data']['Row'][] | null;

type ConditionsArgsType = {
  startDate: string;
  endDate: string;
  person?: string;
};

const getNowMonthFirstLast = () => {
  const nowDate = new Date();
  const nowMonthFirst = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
  const nowMonthLast = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);
  return {
    startDate: nowMonthFirst.toISOString().split('T')[0],
    endDate: nowMonthLast.toISOString().split('T')[0],
  };
};

const commonSupabaseFetcher = supabase
  .from('raws_data')
  .select('*')
  .order('created_at', { ascending: true });

const conditionsFetcher = async (args: ConditionsArgsType) => {
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
};

export const useFetchRawsData = () => {
  const [rawsData, setRawsData] = useState<Props | null>(null);
  const { startDate, endDate } = getNowMonthFirstLast();
  const sendingData: ConditionsArgsType = {
    person: '',
    startDate,
    endDate,
  };

  const { data } = useSWR('raws_data', () => conditionsFetcher({ ...sendingData }));
  useEffect(() => {
    setRawsData(data?.data || null);
  }, [data]);

  const mutateFetch = async (args: ConditionsArgsType) => {
    const result = await mutate('raws_data_conditions', conditionsFetcher({ ...args }));
    setRawsData(result?.data || null);
  };

  return {
    success: {
      rawsData,
    },
    conditionsFetch: (args: ConditionsArgsType) => {
      mutateFetch(args);
    },
  };
};

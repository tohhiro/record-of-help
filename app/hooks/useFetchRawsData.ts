'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../libs/supabase';
import useSWR, { mutate } from 'swr';
import type { Database } from '../../supabase/schema';

type Props = Database['public']['Tables']['raws_data']['Row'][] | null;

type ConditionsArgsType = {
  person: string;
  startDate: string;
  endDate: string;
};

const commonSupabaseFetcher = () => {
  return supabase.from('raws_data').select('*').order('created_at', { ascending: true });
};

const allFetcher = async () => {
  const { data, error } = await commonSupabaseFetcher();
  return { data, error };
};

const conditionsFetcher = async (args: ConditionsArgsType) => {
  const fetchPerson = () => {
    if (args.person === 'all') {
      return commonSupabaseFetcher()
        .gte('created_at', `${args.startDate} 00:00:00`)
        .lte('created_at', `${args.endDate} 23:59:59`);
    }
    return commonSupabaseFetcher()
      .gte('created_at', `${args.startDate} 00:00:00`)
      .lte('created_at', `${args.endDate} 23:59:59`)
      .eq('person', args.person);
  };

  const { data, error } = await fetchPerson();
  return { data, error };
};

export const useFetchRawsData = () => {
  const [rawsData, setRawsData] = useState<Props | null>(null);
  const { data, error } = useSWR('raws_data', allFetcher);

  useEffect(() => {
    setRawsData(data?.data || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const mutateFetch = async (args: ConditionsArgsType) => {
    const result = await mutate('raws_data_conditions', conditionsFetcher({ ...args }));
    setRawsData(result?.data || null);
  };

  return {
    success: {
      rawsData,
    },
    error: {
      error,
    },
    conditionsFetch: (args: ConditionsArgsType) => {
      mutateFetch(args);
    },
  };
};

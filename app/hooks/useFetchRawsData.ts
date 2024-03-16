'use client';
import { useState } from 'react';
import { supabase } from '../libs/supabase';
import { mutate } from 'swr';
import type { Database } from '../../supabase/schema';

type Props = Database['public']['Tables']['raws_data']['Row'][] | null;

export type ConditionsArgsType = {
  startDate: string;
  endDate: string;
  person?: string;
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

  const mutateFetch = async (args: ConditionsArgsType) => {
    const result = await mutate('raws_data_conditions', conditionsFetcher({ ...args }));
    setRawsData(() => result?.data || null);
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

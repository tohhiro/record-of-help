import { supabase } from '@/app/libs/supabase';
import useSWRMutation from 'swr/mutation';

export type Props = {
  person: string;
  comments: string;
  dish: number;
  curtain: number;
  prepareEat: number;
  landry: number;
  special: number;
};

const postHelpToSupabase = async (tableName: string, { arg }: { arg: Props }) => {
  const result = await supabase.from(tableName).insert([arg]);
  return result;
};

export const usePostHelp = () => {
  const { trigger, isMutating } = useSWRMutation('raws_data', postHelpToSupabase);

  const postHelp = async (args: Props) => {
    try {
      const error = await trigger(args);
      return { status: error.status, message: error.statusText };
    } catch (e) {
      throw new Error(JSON.stringify(e));
    }
  };

  return {
    postHelp,
    isMutating,
  };
};

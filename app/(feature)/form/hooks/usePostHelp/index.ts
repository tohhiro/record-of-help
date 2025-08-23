import { supabase } from '@/app/libs/supabase';
import useSWRMutation from 'swr/mutation';

type Props = {
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

  const postHelp = async (
    args: Props,
    cb: { onSuccess: () => void; onError: (_error: any) => void },
  ) => {
    try {
      const result = await trigger(args);

      if (result.status >= 200 && result.status < 300) {
        cb.onSuccess();
      } else {
        cb.onError(result);
        throw new Error(result.statusText);
      }

      return { status: result.status, message: result.statusText };
    } catch (e) {
      cb.onError(e);
      throw e;
    }
  };
  return {
    postHelp,
    isMutating,
  };
};

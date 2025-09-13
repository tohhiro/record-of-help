import { supabase } from '@/app/libs/supabase';
import useSWRMutation from 'swr/mutation';

export type Props = {
  id: string;
};

const deleteRecordMutation = async (_key: string, { arg }: { arg: Props }) => {
  const result = await supabase.from('raws_data').update({ del_flag: true }).eq('id', arg.id);

  return result;
};

export const useDeleteRecord = () => {
  const { trigger, isMutating } = useSWRMutation('delete-raws-data', deleteRecordMutation);

  const deleteRecord = async (args: Props) => {
    try {
      const result = await trigger(args);
      return { status: result.status, message: result.statusText };
    } catch (e) {
      throw new Error(JSON.stringify(e));
    }
  };

  return {
    deleteRecord,
    isMutating,
  };
};

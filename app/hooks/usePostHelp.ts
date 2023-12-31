import { supabase } from '../libs/supabase';

type Props = {
  person: string;
  comments: string;
  dish: number;
  curtain: number;
  prepareEat: number;
  landry: number;
  towel: number;
};

export const usePostHelp = () => {
  const postHelp = async (args: Props) => {
    const { data, error } = await supabase.from('raws_data').insert([args]);
    return { data, error };
  };
  return { postHelp };
};

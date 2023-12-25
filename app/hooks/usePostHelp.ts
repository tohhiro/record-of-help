import { supabase } from '../libs/supabase';

type Props = {
  person: string;
  comments: string;
  dish: boolean;
  curtain: boolean;
  prepareEat: boolean;
  landry: boolean;
  towel: boolean;
};

export const usePostHelp = () => {
  const postHelp = async (args: Props) => {
    const { data, error } = await supabase.from('raws_data').insert([args]);
    return { data, error };
  };
  return { postHelp };
};

import { supabaseAuth } from '@/app/libs/supabaseAuth';

export type Props = {
  person: string;
  comments: string;
  dish: number;
  curtain: number;
  prepareEat: number;
  landry: number;
  special: number;
};

export const usePostHelp = () => {
  const postHelp = async (args: Props) => {
    const { data, error } = await supabaseAuth.from('raws_data').insert([args]);
    return { data, error };
  };
  return { postHelp };
};

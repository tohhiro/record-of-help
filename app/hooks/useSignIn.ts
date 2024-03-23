import { supabase } from '@/app/libs/supabase';

export type Props = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const signIn = async (args: Props) => {
    const { data, error } = (await supabase.auth.signInWithPassword({ ...args })) || {};

    return { data, error };
  };
  return { signIn };
};

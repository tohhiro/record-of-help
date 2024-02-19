import { supabase } from '../libs/supabase';

export type Props = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const signIn = async (args: Props) => {
    const { data, error } = await supabase.auth.signInWithPassword({ ...args });
    return { data, error };
  };
  return { signIn };
};

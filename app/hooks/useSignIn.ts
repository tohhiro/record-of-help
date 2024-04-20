import { supabase } from '@/app/libs/supabase';

export type Props = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const signIn = async (args: Props) => {
    const result = await supabase.auth.signInWithPassword({ ...args });

    const error = result?.error || null;

    return { error };
  };
  return { signIn };
};

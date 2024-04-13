import { supabaseAuth } from '@/app/libs/supabaseAuth';
import { supabase } from '@/app/libs/supabase';

export type Props = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const signIn = async (args: Props) => {
    await supabaseAuth.auth.signInWithPassword({ ...args });
    const { error } = (await supabase.auth.signInWithPassword({ ...args })) || {};

    return { error };
  };
  return { signIn };
};

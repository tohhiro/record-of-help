import { supabase } from '../libs/supabase';

export const useSignIn = () => {
  const signIn = async (args: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ ...args });
    return { data, error };
  };
  return { signIn };
};

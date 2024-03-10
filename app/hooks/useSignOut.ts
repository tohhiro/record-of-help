import { supabase } from '../libs/supabase';

export const useSignOut = async () => {
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return { signOut };
};

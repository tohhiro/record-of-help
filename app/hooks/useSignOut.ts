import { supabase } from '../libs/supabase';

export const useSignOut = () => {
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return { signOut };
};

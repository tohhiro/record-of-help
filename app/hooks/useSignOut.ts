import { supabase } from '../libs/supabase';

export const useSignOut = () => {
  const signOut = async () => {
    const error = await supabase.auth.signOut();
    if (error) {
      return error;
    }
  };
  return { signOut };
};

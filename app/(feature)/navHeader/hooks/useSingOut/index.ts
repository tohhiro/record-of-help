import { supabase } from '@/app/libs/supabase';

export const useSignOut = () => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    return { error };
  };

  return { signOut };
};

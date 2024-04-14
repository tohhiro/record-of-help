import { supabaseAuth } from '@/app/libs/supabaseAuth';

export const useSignOut = () => {
  const signOut = async () => {
    const error = await supabaseAuth.auth.signOut();
    if (error) {
      return error;
    }
  };

  return { signOut };
};

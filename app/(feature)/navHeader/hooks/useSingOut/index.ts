import { supabase } from '@/app/libs/supabase';

export const useSignOut = () => {
  const signOut = async (cb?: { onError: (_error: Error) => void }) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      cb?.onError(error);
    }
  };

  return { signOut };
};

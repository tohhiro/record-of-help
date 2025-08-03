import { supabase } from '@/app/libs/supabase';

export type Props = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const signIn = async (
    args: Props,
    cb: { onSuccess: () => void; onError: (_error: any) => void },
  ) => {
    const result = await supabase.auth.signInWithPassword({ ...args });

    if (result.data.session && result.data.user) {
      cb.onSuccess();
    } else {
      cb.onError(result.error);
      throw new Error(result.error?.message || 'Unknown error occurred');
    }
  };
  return { signIn };
};

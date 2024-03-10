import { supabase } from '../libs/supabase';

export type Props = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const signIn = async (args: Props) => {
    const { error } = await supabase.auth.signInWithPassword({ ...args });
    // eslint-disable-next-line no-alert
    alert(error?.message);
  };
  return { signIn };
};

import { supabase } from '@/app/libs/supabase';

export type Props = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const signIn = async (
    args: Props,
    cb: { onSuccess: (_isAdmin: boolean) => void; onError: (_error: any) => void },
  ) => {
    const result = await supabase.auth.signInWithPassword({ ...args });

    if (result.data.session && result.data.user) {
      // ログイン後に直接メンバー情報を取得してisAdminを判定
      let isAdmin = false;
      try {
        const { data } = await supabase
          .from('members_list')
          .select('admin')
          .eq('email', result.data.user.email || null)
          .single();
        isAdmin = data?.admin === true;
      } catch {
        // クエリ失敗時は非adminとしてフォールバック
      }
      cb.onSuccess(isAdmin);
    } else {
      cb.onError(result.error);
      throw new Error(result.error?.message || 'Unknown error occurred');
    }
  };
  return { signIn };
};

import { supabase } from '@/app/libs/supabase';
import { useStore } from '@/app/store';

export type Props = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const { updateLoginUser } = useStore();

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

      // ログイン直後にZustandストアを更新（SupabaseListenerのフォールバック）
      updateLoginUser({
        id: result.data.user.id,
        email: result.data.user.email!,
        auth: isAdmin,
      });

      cb.onSuccess(isAdmin);
    } else {
      cb.onError(result.error);
      throw new Error(result.error?.message || 'Unknown error occurred');
    }
  };
  return { signIn };
};

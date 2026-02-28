import { supabase } from '@/app/libs/supabase';
import { useStore } from '@/app/store';

export type Props = {
  email: string;
  password: string;
};

/**
 * signInWithPassword 後、認証Cookieが document.cookie に書き込まれるまで待機する。
 * webkit では Cookie の反映に遅延があり、即座にナビゲーションすると
 * middleware がセッションを認識できずログインページにリダイレクトされる。
 * タイムアウト時は reject し、呼び出し側でリトライ／エラー表示に回す。
 */
const waitForAuthCookie = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const maxWait = 3000;
    const start = Date.now();
    const check = () => {
      if (document.cookie.includes('sb-')) {
        resolve();
      } else if (Date.now() - start > maxWait) {
        reject(new Error('認証Cookieの反映がタイムアウトしました'));
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });

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

      // webkit対応: Cookie反映を待ってからナビゲーション
      try {
        await waitForAuthCookie();
      } catch {
        // タイムアウト時もナビゲーションを試行（リトライで成功する場合がある）
        console.warn('認証Cookieの反映待ちがタイムアウトしました。ナビゲーションを続行します。');
      }

      cb.onSuccess(isAdmin);
    } else {
      cb.onError(result.error);
      throw new Error(result.error?.message || 'Unknown error occurred');
    }
  };
  return { signIn };
};

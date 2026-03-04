import { supabase } from '@/app/libs/supabase';
import { useStore } from '@/app/store';
import { type AuthError } from '@supabase/supabase-js';

export type Props = {
  email: string;
  password: string;
};

/**
 * signInWithPassword 後、認証Cookieが document.cookie に書き込まれるまで待機する。
 * webkit では Cookie の反映に遅延があり、即座にナビゲーションすると
 * middleware がセッションを認識できずログインページにリダイレクトされる。
 * タイムアウト時は Promise を reject するが、呼び出し側では警告を出した上で
 * ナビゲーションを続行する（リトライで成功する場合があるため）。
 * テスト環境（NODE_ENV=test）では即 resolve する。
 */
const waitForAuthCookie = (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
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
};

export const useSignIn = () => {
  const { updateLoginUser } = useStore();

  const signIn = async (
    args: Props,
    cb: { onSuccess: (_isAdmin: boolean) => void; onError: (_error: AuthError | null) => void },
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
        email: result.data.user.email ?? null,
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

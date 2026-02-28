import { createBrowserClient } from '@supabase/ssr';

/**
 * Navigator Lock をスキップして即座に実行するカスタムロック関数。
 * デフォルトの navigatorLock はタイムアウト(10秒)待ちが発生し
 * 画面遷移やセッション取得が極端に遅くなるため、ロック無しで実行する。
 * ロックはタブ間同期用で、シングルタブ利用では不要。
 */
const noopLock = async <R>(
  _name: string,
  _acquireTimeout: number,
  fn: () => Promise<R>,
): Promise<R> => fn();

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      lock: noopLock,
    },
  },
);

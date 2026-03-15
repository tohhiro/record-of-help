import { NavHeader } from '@/app/(feature)/navHeader';
import { isExpectedAuthError } from '@/app/libs/authUtils';
import SupabaseListener from '@/app/libs/supabaseListener';
import { type PropsWithChildren } from 'react';
import { createSupabaseServerClient } from './libs/supabaseServer';
import './styles/globals.css';

export const metadata = {
  title: 'Record of Help',
  description: 'This App is recording help by your children',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // error 時は未ログインとして扱う（user は null になる）
  // 未ログイン相当のエラーはログを出さず、真正なエラーのみ warn する
  if (error && !isExpectedAuthError(error.message)) {
    console.warn('[RootLayout] ユーザー情報取得に失敗:', error.message);
  }

  return (
    <html lang="ja">
      <body>
        <SupabaseListener serverUserId={user?.id} />
        <NavHeader />
        {children}
      </body>
    </html>
  );
}

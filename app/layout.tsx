import { NavHeader } from '@/app/(feature)/navHeader';
import SupabaseListener from '@/app/libs/supabaseListener';
import { type PropsWithChildren } from 'react';
import { supabase } from './libs/supabase';
import './styles/globals.css';

export const metadata = {
  title: 'Record of Help',
  description: 'This App is recording help by your children',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="ja">
      <body>
        <SupabaseListener accessToken={session?.access_token} />
        <NavHeader />
        {children}
      </body>
    </html>
  );
}

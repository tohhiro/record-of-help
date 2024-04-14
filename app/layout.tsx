import { PropsWithChildren } from 'react';
import './styles/globals.css';
import { NavHeader } from '@/app/(feature)/navHeader';
import SupabaseListener from '@/app/libs/supabaseListener';
import { supabaseAuth } from './libs/supabaseAuth';

export const metadata = {
  title: 'Record of Help',
  description: 'This App is recording help by your children',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const {
    data: { session },
  } = await supabaseAuth.auth.getSession();

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

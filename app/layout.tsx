import { PropsWithChildren } from 'react';
import './styles/globals.css';
import { NavHeader } from '@/app/(feature)/navHeader';
import { headers, cookies } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/supabase/schema';
import SupabaseListener from '@/app/libs/supabaseListener';

export const metadata = {
  title: 'Record of Help',
  description: 'This App is recording help by your children',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies });
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

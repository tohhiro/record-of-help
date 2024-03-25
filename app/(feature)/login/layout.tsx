import { PropsWithChildren } from 'react';
import { headers, cookies } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/supabase/schema';
import SupabaseListener from './supabaseListener';

export const metadata = {
  title: 'Record of Help | Login',
  description: 'This App is recording help by your children',
};

export default async function LoginLayout({ children }: PropsWithChildren) {
  const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <>
      <SupabaseListener accessToken={session?.access_token} />
      {children}
    </>
  );
}

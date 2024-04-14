'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseAuth } from '@/app/libs/supabaseAuth';
import { useStore } from '@/app/store';

const SupabaseListener: React.FC<{ accessToken?: string }> = ({ accessToken }) => {
  const router = useRouter();
  const { updateLoginUser } = useStore();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabaseAuth.auth.getSession();
      if (data.session) {
        updateLoginUser({
          id: data.session?.user.id,
          email: data.session?.user.email!,
        });
      }
    };
    getUserInfo();
    supabaseAuth.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id!, email: session?.user.email! });
      if (session?.access_token !== accessToken) router.refresh();
    });
  }, [accessToken, router, updateLoginUser]);

  return null;
};

export default SupabaseListener;

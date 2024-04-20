'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/libs/supabase';
import { useStore } from '@/app/store';

const SupabaseListener: React.FC<{ accessToken?: string }> = ({ accessToken }) => {
  const router = useRouter();
  const { updateLoginUser } = useStore();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession();
      console.log('listenerのdata', data);
      if (data.session) {
        updateLoginUser({
          id: data.session?.user.id,
          email: data.session?.user.email!,
        });
      }
    };
    getUserInfo();
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id!, email: session?.user.email! });
      if (session?.access_token !== accessToken) router.refresh();
    });
  }, [accessToken, router, updateLoginUser]);

  return null;
};

export default SupabaseListener;

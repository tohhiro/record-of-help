'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/libs/supabase';
import { useStore } from '@/app/store';
import { useFetchMember } from '@/app/hooks/useFetchMember';

const SupabaseListener: React.FC<{ accessToken?: string }> = ({ accessToken }) => {
  const router = useRouter();
  const { updateLoginUser } = useStore();
  const { fetchAuth } = useFetchMember();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession();
      const auth = await fetchAuth({ email: data.session?.user.email || null });

      if (data.session) {
        updateLoginUser({
          id: data.session?.user.id,
          email: data.session?.user.email!,
          auth: auth.result?.data?.[0]?.admin!,
        });
      }
    };
    getUserInfo();
    supabase.auth.onAuthStateChange(async (_, session) => {
      const auth = await fetchAuth({ email: session?.user.email || null });

      updateLoginUser({
        id: session?.user.id!,
        email: session?.user.email!,
        auth: auth.result?.data?.[0]?.admin!,
      });
      if (session?.access_token !== accessToken) router.refresh();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, router, updateLoginUser]);

  return null;
};

export default SupabaseListener;

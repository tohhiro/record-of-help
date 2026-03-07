'use client';
import { useFetchMember } from '@/app/hooks';
import { supabase } from '@/app/libs/supabase';
import { useStore } from '@/app/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SupabaseListener: React.FC<{ accessToken?: string }> = ({ accessToken }) => {
  const router = useRouter();
  const { updateLoginUser } = useStore();
  const { fetchAuth } = useFetchMember();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          const auth = await fetchAuth({ email: data.session?.user.email || null });
          updateLoginUser({
            id: data.session?.user.id,
            email: data.session?.user.email ?? null,
            auth: auth.result?.data?.[0]?.admin === true,
          });
        }
      } catch (error) {
        console.warn('[SupabaseListener] セッション取得に失敗:', error);
      }
    };
    getUserInfo();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session) {
        updateLoginUser({ id: null, email: null, auth: undefined });
        return;
      }
      try {
        const auth = await fetchAuth({ email: session.user.email || null });
        updateLoginUser({
          id: session.user.id,
          email: session.user.email ?? null,
          auth: auth.result?.data?.[0]?.admin === true,
        });
      } catch (error) {
        // fetchAuth失敗時でも基本情報は更新（authはundefinedのまま）
        console.warn('[SupabaseListener] admin判定に失敗:', error);
        updateLoginUser({
          id: session.user.id,
          email: session.user.email ?? null,
          auth: undefined,
        });
      }
      if (session.access_token !== accessToken) router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, router, updateLoginUser]);

  return null;
};

export default SupabaseListener;

'use client';
import { useFetchMember } from '@/app/hooks';
import { isExpectedAuthError } from '@/app/libs/authUtils';
import { supabase } from '@/app/libs/supabase';
import { useStore } from '@/app/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SupabaseListener: React.FC<{ serverUserId?: string }> = ({ serverUserId }) => {
  const router = useRouter();
  const { updateLoginUser } = useStore();
  const { fetchAuth } = useFetchMember();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          // 未ログイン相当のエラーはログを出さず、真正なエラーのみ warn する
          if (!isExpectedAuthError(error.message)) {
            console.warn('[SupabaseListener] ユーザー情報取得に失敗:', error.message);
          }
          return;
        }
        if (user) {
          const auth = await fetchAuth({ email: user.email || null });
          updateLoginUser({
            id: user.id,
            email: user.email ?? null,
            auth: auth.result?.data?.[0]?.admin === true,
          });
        }
      } catch (error) {
        console.warn('[SupabaseListener] 予期しないエラー:', error);
      }
    };
    getUserInfo();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session) {
        updateLoginUser({ id: null, email: null, auth: undefined });
        if (serverUserId) router.refresh();
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
      if (session.user.id !== serverUserId) router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverUserId, router, updateLoginUser]);

  return null;
};

export default SupabaseListener;

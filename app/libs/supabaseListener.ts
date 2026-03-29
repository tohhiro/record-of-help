'use client';
import { useFetchMember } from '@/app/hooks';
import { isExpectedAuthError } from '@/app/libs/authUtils';
import { supabase } from '@/app/libs/supabase';
import { useStore } from '@/app/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SupabaseListener: React.FC<{ serverUserId?: string }> = ({ serverUserId }) => {
  const router = useRouter();
  const { updateLoginUser } = useStore();
  const [userInfo, setUserInfo] = useState<{ id: string; email: string | null } | null>(null);
  const { result, error: memberError, isLoading } = useFetchMember(userInfo?.email ?? null);

  // member情報が取得できたらstoreを更新
  useEffect(() => {
    if (!userInfo) return;
    if (isLoading) return;
    if (memberError) {
      console.warn('[SupabaseListener] admin判定に失敗:', memberError);
      updateLoginUser({ id: userInfo.id, email: userInfo.email, auth: undefined });
    } else if (result) {
      updateLoginUser({
        id: userInfo.id,
        email: userInfo.email,
        auth: result.data?.[0]?.admin === true,
      });
    }
  }, [userInfo, result, memberError, isLoading, updateLoginUser]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          if (!isExpectedAuthError(error.message)) {
            console.warn('[SupabaseListener] ユーザー情報取得に失敗:', error.message);
          }
          return;
        }
        if (user) {
          setUserInfo({ id: user.id, email: user.email ?? null });
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
        setUserInfo(null);
        if (serverUserId) router.refresh();
        return;
      }
      setUserInfo({ id: session.user.id, email: session.user.email ?? null });
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

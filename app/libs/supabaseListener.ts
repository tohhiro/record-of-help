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
  const member = useFetchMember(userInfo?.email ?? null);
  const { memberData, postgrestError, swrError, isLoading } = member;

  // member情報が取得できたらstoreのauth情報を更新
  useEffect(() => {
    if (!userInfo) return;
    if (isLoading) return;
    if (swrError || postgrestError) {
      console.warn('[SupabaseListener] admin判定に失敗:', swrError || postgrestError);
      updateLoginUser({ id: userInfo.id, email: userInfo.email, auth: undefined });
    } else if (memberData) {
      updateLoginUser({
        id: userInfo.id,
        email: userInfo.email,
        auth: memberData[0]?.admin === true,
      });
    } else if (!userInfo.email) {
      // emailがnullの場合、SWRキーがnullでフェッチされないためauth undefinedで確定
      updateLoginUser({ id: userInfo.id, email: userInfo.email, auth: undefined });
    }
  }, [userInfo, memberData, postgrestError, swrError, isLoading, updateLoginUser]);

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
          // id/emailを先にstoreに反映（authはmember取得後に更新）
          const info = { id: user.id, email: user.email ?? null };
          updateLoginUser({ ...info, auth: undefined });
          setUserInfo(info);
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
      // id/emailを先にstoreに反映（authはmember取得後に更新）
      const info = { id: session.user.id, email: session.user.email ?? null };
      updateLoginUser({ ...info, auth: undefined });
      setUserInfo(info);
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

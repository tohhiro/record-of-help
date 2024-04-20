'use client';
import { Header } from '@/app/components/Header';
import { useSignOut } from '@/app/hooks/useSignOut';
import { useRouter } from 'next/navigation';
import { useStore } from '@/app/store';
import { useFetchMember } from '@/app/hooks/useFetchMember';

const navItemsWithAdmin = {
  Form: './form',
  Dashboard: './dashboard',
};

const navItemsWithMember = {
  Dashboard: './dashboard',
};

export const NavHeader = () => {
  const { signOut } = useSignOut();
  const router = useRouter();
  const loginUser = useStore((state) => state.loginUser.email);
  const { data } = useFetchMember({ email: loginUser });
  const auth = data.data?.[0]?.admin;

  const onSubmit = async () => {
    const out = await signOut();
    if (out?.error) {
      // eslint-disable-next-line no-alert
      alert('ログアウトに失敗しました。');
    } else {
      router.replace('/login');
    }
  };
  return (
    <Header
      links={auth ? navItemsWithAdmin : navItemsWithMember}
      onClick={onSubmit}
      loginUser={loginUser}
    />
  );
};

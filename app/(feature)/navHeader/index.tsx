'use client';
import { useSignOut } from '@/app/(feature)/navHeader/hooks';
import { Header } from '@/app/components/Header';
import { useStore } from '@/app/store';
import { useRouter } from 'next/navigation';

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
  const { loginUser, updateLoginUser } = useStore((state) => state);

  const onSubmit = async () => {
    try {
      // FIXME: 本来は、signOutが成功してからrouter.refresh()を実行するべきだが、帰り値がないため判定ができない
      router.replace('/login');
      updateLoginUser({ id: '', email: '', auth: undefined });
      await signOut();
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('ログアウトに失敗しました。');
    }
  };

  return (
    <Header
      links={loginUser.auth ? navItemsWithAdmin : navItemsWithMember}
      onClick={onSubmit}
      loginUser={loginUser.email}
    />
  );
};

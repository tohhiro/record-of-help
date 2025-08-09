'use client';
import { Header } from '@/app/components/Header';
import { useStore } from '@/app/store';
import { useSignOut } from './hooks';

const navItemsWithAdmin = {
  Form: './form',
  Dashboard: './dashboard',
};

const navItemsWithMember = {
  Dashboard: './dashboard',
};

export const NavHeader = () => {
  const { signOut } = useSignOut();
  const { loginUser, updateLoginUser } = useStore((state) => state);

  const onSubmit = async () => {
    updateLoginUser({ id: '', email: '', auth: undefined });
    await signOut({
      onError: (error) => {
        // eslint-disable-next-line no-alert
        alert(`ログアウトに失敗しました。\n ${error.message}`);
      },
    });
  };

  return (
    <Header
      links={loginUser.auth ? navItemsWithAdmin : navItemsWithMember}
      onClick={onSubmit}
      loginUser={loginUser.email}
    />
  );
};

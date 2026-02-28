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
  const { loginUser } = useStore((state) => state);

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut({
      onError: (error) => {
        // eslint-disable-next-line no-alert
        alert(`ログアウトに失敗しました。\n ${error.message}`);
      },
    });
    // ハードナビゲーションでサーバー側のセッションもクリア
    window.location.href = '/login';
  };

  return (
    <Header
      links={loginUser.auth ? navItemsWithAdmin : navItemsWithMember}
      onClick={onSubmit}
      loginUser={loginUser.email}
    />
  );
};

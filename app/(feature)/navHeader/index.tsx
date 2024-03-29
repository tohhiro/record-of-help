'use client';
import { Header, NavType } from '@/app/components/Header';
import { useSignOut } from '@/app/hooks/useSignOut';
import { useRouter } from 'next/navigation';

const navItems: NavType = {
  Form: './form',
  Dashboard: './dashboard',
};

export const NavHeader = () => {
  const { signOut } = useSignOut();
  const router = useRouter();

  const onSubmit = async () => {
    const out = await signOut();
    if (out?.error) {
      // eslint-disable-next-line no-alert
      alert('ログアウトに失敗しました。');
    } else {
      router.replace('/login');
    }
  };
  return <Header links={navItems} onClick={onSubmit} />;
};

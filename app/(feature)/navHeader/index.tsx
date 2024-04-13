'use client';
import { Header, NavType } from '@/app/components/Header';
import { useSignOut } from '@/app/hooks/useSignOut';
import { useRouter } from 'next/navigation';
import { useStore } from '@/app/store';

const navItems: NavType = {
  Form: './form',
  Dashboard: './dashboard',
};

export const NavHeader = () => {
  const { signOut } = useSignOut();
  const router = useRouter();
  const loginUser = useStore((state) => state.loginUser.email);

  const onSubmit = async () => {
    const out = await signOut();
    if (out?.error) {
      // eslint-disable-next-line no-alert
      alert('ログアウトに失敗しました。');
    } else {
      document.cookie = 'key1=supabase-auth-token; max-age=0';
      router.replace('/login');
    }
  };
  return <Header links={navItems} onClick={onSubmit} loginUser={loginUser} />;
};

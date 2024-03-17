'use client';
import { Header, NavType } from '../../components/Header';
import { useSignOut } from '../../hooks/useSignOut';
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
    if (!out || !out.error) router.replace('/login');
  };
  return <Header links={navItems} onClick={onSubmit} />;
};

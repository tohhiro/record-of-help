import { PropsWithChildren } from 'react';
import './styles/globals.css';
import { Header } from './components/Header';
import type { NavType } from './components/Header';
import { RecoilRoot } from 'recoil';

export const metadata = {
  title: 'Record of Help',
  description: 'This App is recording help by your children',
};

const navItems: NavType = {
  Form: './form',
  Dashboard: './dashboard',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <RecoilRoot>
          <Header links={navItems} />
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}

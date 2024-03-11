import { PropsWithChildren } from 'react';
import './styles/globals.css';
import { NavHeader } from './(feature)/navHeader';

export const metadata = {
  title: 'Record of Help',
  description: 'This App is recording help by your children',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <NavHeader />
        {children}
      </body>
    </html>
  );
}

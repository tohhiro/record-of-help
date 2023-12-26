import React, { PropsWithChildren } from 'react';
import '../../styles/globals.css';
import { Header } from '../../components/Header';

export const metadata = {
  title: 'Record of Help | Dashboard',
  description: 'This App is recording help by your children',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

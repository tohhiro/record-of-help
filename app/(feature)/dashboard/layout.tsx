import { type PropsWithChildren } from 'react';

export const metadata = {
  title: 'Record of Help | Dashboard',
  description: 'This App is recording help by your children',
};

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

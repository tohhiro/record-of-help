import { type PropsWithChildren } from 'react';

export const metadata = {
  title: 'Record of Help | Login',
  description: 'This App is recording help by your children',
};

export default function LoginLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
